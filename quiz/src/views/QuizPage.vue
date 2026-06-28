<template>
  <div class="quiz-page">
    <!-- Top Bar -->
    <div class="top-bar">
      <div class="top-bar__info">
        <span class="top-bar__progress-text">{{ currentIndex + 1 }}/{{ totalQuestions }}</span>
        <span class="top-bar__timer">{{ formattedTime }}</span>
      </div>
      <TProgressBar :value="progressPercentage" />
      <TButton variant="secondary" class="top-bar__submit" @click="handleSubmit">交卷</TButton>
    </div>

    <!-- Question Number Navigation -->
    <div class="number-nav" ref="numberNavRef">
      <button
        v-for="(q, idx) in questions"
        :key="q.id"
        :ref="el => setNumberBtnRef(el as HTMLElement, idx)"
        :class="['number-nav__btn', { 'number-nav__btn--active': idx === currentIndex }]"
        @click="goToQuestion(idx)"
      >
        {{ idx + 1 }}
        <span v-if="answers[q.id]?.seenAnswer" class="number-nav__dot" />
      </button>
    </div>

    <!-- Question Content -->
    <Transition name="fade" mode="out-in">
      <div class="question-card" :key="currentQuestion?.id">
        <div class="question-card__tags">
          <TTag variant="default">{{ currentQuestion?.categoryLabel }}</TTag>
          <TTag :color="difficultyColor">{{ difficultyLabel }}</TTag>
          <TTag variant="default">{{ currentQuestion?.type }}</TTag>
        </div>

        <div class="question-card__text">{{ currentQuestion?.question }}</div>

        <!-- Self-Assessment -->
        <div class="question-card__assessment">
          <button
            :class="['assessment-btn', 'assessment-btn--no', { 'assessment-btn--active': !isSeenAnswer }]"
            @click="markNotSeen"
          >
            没看答案
          </button>
          <button
            :class="['assessment-btn', 'assessment-btn--yes', { 'assessment-btn--active': isSeenAnswer }]"
            @click="markSeen"
          >
            看过答案
          </button>
        </div>

        <!-- Answer Panel -->
        <div class="answer-panel">
          <template v-if="!answerExpanded">
            <TButton variant="default" @click="expandAnswer">查看参考答案</TButton>
          </template>
          <template v-else>
            <div class="answer-panel__content">
              <div class="answer-panel__title">参考答案</div>
              <div class="answer-panel__md markdown-body" v-html="answerHtml" />
            </div>
          </template>
        </div>
      </div>
    </Transition>

    <!-- Bottom Navigation -->
    <div class="bottom-nav">
      <TButton variant="default" :disabled="currentIndex === 0" @click="goPrev">上一题</TButton>
      <span class="bottom-nav__counter">第 {{ currentIndex + 1 }} 题 / 共 {{ totalQuestions }} 题</span>
      <TButton :variant="isLastQuestion ? 'secondary' : 'default'" @click="goNext">
        {{ isLastQuestion ? '交卷' : '下一题' }}
      </TButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { useRouter } from 'vue-router'
import { marked } from 'marked'
import TButton from '@/components/TButton.vue'
import TTag from '@/components/TTag.vue'
import TProgressBar from '@/components/TProgressBar.vue'

interface Question {
  id: string
  category: string
  categoryLabel: string
  questionIndex: string
  question: string
  difficulty: 1 | 2 | 3
  type: string
  answer: string
}

interface QuizConfig {
  questions: Question[]
  totalQuestions: number
  startTime: number
}

interface AnswerState {
  [questionId: string]: {
    seenAnswer: boolean
  }
}

interface QuizResult {
  questions: Question[]
  answers: AnswerState
  startTime: number
  endTime: number
  totalQuestions: number
  seenAnswerCount: number
}

const router = useRouter()

const questions = ref<Question[]>([])
const totalQuestions = ref(0)
const startTime = ref(0)
const currentIndex = ref(0)
const answers = ref<AnswerState>({})
const answerExpanded = ref(false)
const elapsedSeconds = ref(0)

let timerInterval: ReturnType<typeof setInterval> | null = null

// Number nav refs
const numberNavRef = ref<HTMLElement | null>(null)
const numberBtnRefs: Record<number, HTMLElement> = {}

function setNumberBtnRef(el: HTMLElement | null, idx: number) {
  if (el) numberBtnRefs[idx] = el
}

// Computed
const currentQuestion = computed(() => questions.value[currentIndex.value] ?? null)
const isLastQuestion = computed(() => currentIndex.value === totalQuestions.value - 1)
const progressPercentage = computed(() =>
  totalQuestions.value > 0 ? ((currentIndex.value + 1) / totalQuestions.value) * 100 : 0
)
const isSeenAnswer = computed(() => {
  const q = currentQuestion.value
  if (!q) return false
  return answers.value[q.id]?.seenAnswer ?? false
})

const difficultyColor = computed(() => {
  const d = currentQuestion.value?.difficulty
  if (d === 1) return 'blue'
  if (d === 2) return 'orange'
  return 'red'
})

const difficultyLabel = computed(() => {
  const d = currentQuestion.value?.difficulty
  if (d === 1) return '★☆☆'
  if (d === 2) return '★★☆'
  return '★★★'
})

const formattedTime = computed(() => {
  const mins = Math.floor(elapsedSeconds.value / 60)
  const secs = elapsedSeconds.value % 60
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
})

const answerHtml = computed(() => {
  if (!currentQuestion.value?.answer) return ''
  return marked.parse(currentQuestion.value.answer) as string
})

// Timer
function startTimer() {
  if (timerInterval) clearInterval(timerInterval)
  timerInterval = setInterval(() => {
    elapsedSeconds.value = Math.floor((Date.now() - startTime.value) / 1000)
  }, 1000)
}

// Navigation
function goToQuestion(idx: number) {
  if (idx < 0 || idx >= totalQuestions.value) return
  currentIndex.value = idx
}

function goPrev() {
  if (currentIndex.value > 0) {
    currentIndex.value--
  }
}

function goNext() {
  if (isLastQuestion.value) {
    handleSubmit()
    return
  }
  if (currentIndex.value < totalQuestions.value - 1) {
    currentIndex.value++
  }
}

// Answer state
function loadAnswers() {
  const raw = sessionStorage.getItem('quiz-answers')
  if (raw) {
    try {
      answers.value = JSON.parse(raw)
    } catch {
      answers.value = {}
    }
  }
}

function saveAnswers() {
  sessionStorage.setItem('quiz-answers', JSON.stringify(answers.value))
}

function expandAnswer() {
  answerExpanded.value = true
  const q = currentQuestion.value
  if (q) {
    if (!answers.value[q.id]) {
      answers.value[q.id] = { seenAnswer: true }
    } else {
      answers.value[q.id].seenAnswer = true
    }
    saveAnswers()
  }
}

function markSeen() {
  const q = currentQuestion.value
  if (!q) return
  if (!answers.value[q.id]) {
    answers.value[q.id] = { seenAnswer: true }
  } else {
    answers.value[q.id].seenAnswer = true
  }
  answerExpanded.value = true
  saveAnswers()
}

function markNotSeen() {
  const q = currentQuestion.value
  if (!q) return
  if (!answers.value[q.id]) {
    answers.value[q.id] = { seenAnswer: false }
  } else {
    answers.value[q.id].seenAnswer = false
  }
  saveAnswers()
}

// Submit
function handleSubmit() {
  const endTime = Date.now()
  const seenAnswerCount = Object.values(answers.value).filter(a => a.seenAnswer).length

  const result: QuizResult = {
    questions: questions.value,
    answers: { ...answers.value },
    startTime: startTime.value,
    endTime,
    totalQuestions: totalQuestions.value,
    seenAnswerCount
  }

  sessionStorage.setItem('quiz-result', JSON.stringify(result))
  router.push('/result')
}

// Keyboard
function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'ArrowLeft') {
    goPrev()
  } else if (e.key === 'ArrowRight') {
    goNext()
  }
}

// Scroll current number into view
function scrollToCurrentNumber() {
  nextTick(() => {
    const el = numberBtnRefs[currentIndex.value]
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
    }
  })
}

// Reset answer panel when switching questions
watch(currentIndex, () => {
  answerExpanded.value = false
  scrollToCurrentNumber()
})

// Lifecycle
onMounted(() => {
  const raw = sessionStorage.getItem('quiz-config')
  if (!raw) {
    router.replace('/')
    return
  }

  try {
    const config: QuizConfig = JSON.parse(raw)
    questions.value = config.questions
    totalQuestions.value = config.totalQuestions
    startTime.value = config.startTime
  } catch {
    router.replace('/')
    return
  }

  loadAnswers()
  answerExpanded.value = isSeenAnswer.value
  startTimer()
  scrollToCurrentNumber()

  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  if (timerInterval) {
    clearInterval(timerInterval)
    timerInterval = null
  }
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
.quiz-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: var(--bg-base);
  gap: 16px;
}

/* Top Bar */
.top-bar {
  background: var(--bg-card);
  padding: 16px;
  border-radius: 8px;
  box-shadow: var(--shadow-card);
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.top-bar__info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.top-bar__progress-text {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
}

.top-bar__timer {
  font-size: 14px;
  color: var(--text-secondary);
  font-variant-numeric: tabular-nums;
}

.top-bar__submit {
  align-self: flex-end;
}

/* Number Navigation */
.number-nav {
  display: flex;
  gap: 6px;
  overflow-x: auto;
  padding: 8px 4px;
  background: var(--bg-card);
  border-radius: 8px;
  box-shadow: var(--shadow-card);
  scrollbar-width: thin;
}

.number-nav::-webkit-scrollbar {
  height: 4px;
}

.number-nav::-webkit-scrollbar-thumb {
  background: var(--border-color);
  border-radius: 2px;
}

.number-nav__btn {
  position: relative;
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  background: var(--bg-surface);
  color: var(--text-secondary);
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.number-nav__btn:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.number-nav__btn--active {
  background: var(--color-primary);
  color: #fff;
  border-color: var(--color-primary);
}

.number-nav__btn--active:hover {
  background: var(--color-primary);
  color: #fff;
}

.number-nav__dot {
  position: absolute;
  top: 3px;
  right: 3px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-warning);
}

/* Question Card */
.question-card {
  background: var(--bg-card);
  padding: 24px;
  border-radius: 8px;
  box-shadow: var(--shadow-card);
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.question-card__tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.question-card__text {
  font-size: 16px;
  line-height: 1.7;
  color: var(--text-primary);
  white-space: pre-wrap;
}

/* Self Assessment */
.question-card__assessment {
  display: flex;
  gap: 12px;
}

.assessment-btn {
  flex: 1;
  padding: 10px 0;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 2px solid transparent;
}

.assessment-btn--no {
  background: var(--bg-surface);
  color: var(--text-secondary);
  border-color: var(--border-color);
}

.assessment-btn--no.assessment-btn--active {
  background: rgba(34, 197, 94, 0.08);
  color: #22c55e;
  border-color: #22c55e;
}

.assessment-btn--yes {
  background: var(--bg-surface);
  color: var(--text-secondary);
  border-color: var(--border-color);
}

.assessment-btn--yes.assessment-btn--active {
  background: rgba(245, 158, 11, 0.08);
  color: #f59e0b;
  border-color: #f59e0b;
}

/* Answer Panel */
.answer-panel {
  margin-top: 4px;
}

.answer-panel__content {
  background: var(--bg-surface);
  padding: 16px;
  border-radius: 8px;
}

.answer-panel__title {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 12px;
}

.answer-panel__md {
  font-size: 14px;
  line-height: 1.7;
  color: var(--text-secondary);
}

.markdown-body {
  color: var(--text-secondary);
  line-height: 1.7;
  font-size: 14px;
}

.markdown-body :deep(h1),
.markdown-body :deep(h2),
.markdown-body :deep(h3),
.markdown-body :deep(h4) {
  color: var(--text-primary);
  font-weight: 600;
  margin: 16px 0 8px;
  line-height: 1.4;
}

.markdown-body :deep(h1) { font-size: 20px; }
.markdown-body :deep(h2) { font-size: 18px; }
.markdown-body :deep(h3) { font-size: 16px; }
.markdown-body :deep(h4) { font-size: 15px; }

.markdown-body :deep(p) {
  margin: 8px 0;
}

.markdown-body :deep(ul),
.markdown-body :deep(ol) {
  margin: 8px 0;
  padding-left: 24px;
}

.markdown-body :deep(li) {
  margin: 4px 0;
}

.markdown-body :deep(code) {
  background: var(--bg-card);
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 13px;
  font-family: 'SF Mono', Monaco, 'Courier New', monospace;
  color: var(--color-primary);
}

.markdown-body :deep(pre) {
  background: var(--bg-card);
  padding: 12px 16px;
  border-radius: 8px;
  overflow-x: auto;
  margin: 10px 0;
}

.markdown-body :deep(pre code) {
  background: transparent;
  padding: 0;
  color: var(--text-secondary);
}

.markdown-body :deep(blockquote) {
  border-left: 3px solid var(--color-primary);
  padding-left: 12px;
  margin: 10px 0;
  color: var(--text-secondary);
  opacity: 0.9;
}

.markdown-body :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 10px 0;
  font-size: 13px;
}

.markdown-body :deep(th),
.markdown-body :deep(td) {
  border: 1px solid var(--border-color);
  padding: 8px 12px;
  text-align: left;
}

.markdown-body :deep(th) {
  background: var(--bg-card);
  font-weight: 600;
  color: var(--text-primary);
}

.markdown-body :deep(strong) {
  color: var(--text-primary);
  font-weight: 600;
}

.markdown-body :deep(a) {
  color: var(--color-primary);
  text-decoration: none;
}

.markdown-body :deep(a:hover) {
  text-decoration: underline;
}

.markdown-body :deep(hr) {
  border: none;
  border-top: 1px solid var(--border-color);
  margin: 16px 0;
}

/* Bottom Navigation */
.bottom-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
}

.bottom-nav__counter {
  font-size: 14px;
  color: var(--text-secondary);
}

/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
