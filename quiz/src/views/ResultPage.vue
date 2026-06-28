<template>
  <div class="result-page">
    <!-- Header -->
    <header class="result-header">
      <h1 class="result-header__title">答题结果</h1>
      <TThemeToggle />
    </header>

    <!-- Statistics Cards -->
    <section class="stats-row">
      <div class="stat-card stat-card--fade" style="--delay: 0">
        <div class="stat-card__value">{{ totalQuestions }}</div>
        <div class="stat-card__label">总题数</div>
      </div>
      <div class="stat-card stat-card--fade stat-card--success" style="--delay: 1">
        <div class="stat-card__value">{{ unseenCount }}</div>
        <div class="stat-card__sub">{{ unseenPercent }}%</div>
        <div class="stat-card__label">未看答案</div>
      </div>
      <div class="stat-card stat-card--fade stat-card--warning" style="--delay: 2">
        <div class="stat-card__value">{{ seenCount }}</div>
        <div class="stat-card__sub">{{ seenPercent }}%</div>
        <div class="stat-card__label">看过答案</div>
      </div>
      <div class="stat-card stat-card--fade" style="--delay: 3">
        <div class="stat-card__value">{{ formattedTime }}</div>
        <div class="stat-card__label">用时</div>
      </div>
    </section>

    <!-- Difficulty Breakdown -->
    <section class="section">
      <h2 class="section__title">难度分布</h2>
      <div class="difficulty-list">
        <div v-for="d in difficultyStats" :key="d.level" class="difficulty-row">
          <div class="difficulty-row__header">
            <span class="difficulty-row__label">{{ d.label }}</span>
            <span class="difficulty-row__stat">{{ d.unseen }}/{{ d.total }} 题 未看答案</span>
          </div>
          <TProgressBar :value="d.total > 0 ? (d.unseen / d.total) * 100 : 0" color="var(--color-primary)" />
        </div>
      </div>
    </section>

    <!-- Category Breakdown -->
    <section class="section">
      <h2 class="section__title">分类统计</h2>
      <div class="category-list">
        <div v-for="c in categoryStats" :key="c.category" class="category-row">
          <div class="category-row__header">
            <span class="category-row__label">{{ c.categoryLabel }}</span>
            <span class="category-row__stat">
              <span :style="{ color: 'var(--color-warning)' }">{{ c.seen }}</span>看过 /
              <span :style="{ color: 'var(--color-success)' }">{{ c.unseen }}</span>未看
              / 共{{ c.total }}题
            </span>
          </div>
          <TProgressBar :value="c.total > 0 ? (c.unseen / c.total) * 100 : 0" color="var(--color-success)" />
        </div>
      </div>
    </section>

    <!-- Learning Suggestions -->
    <section class="section">
      <h2 class="section__title">学习建议</h2>
      <div class="suggestion-card">
        <p class="suggestion-card__text">{{ mainSuggestion }}</p>
        <div v-if="weakCategories.length" class="suggestion-card__weak">
          <span class="suggestion-card__weak-label">薄弱方向：</span>
          <TTag v-for="wc in weakCategories" :key="wc.category" type="warning">{{ wc.categoryLabel }}</TTag>
        </div>
      </div>
    </section>

    <!-- Question Review List -->
    <section class="section">
      <h2 class="section__title">题目回顾</h2>
      <div class="review-list">
        <div
          v-for="q in sortedQuestions"
          :key="q.id"
          class="review-item"
          :class="{ 'review-item--seen': isSeen(q.id), 'review-item--expanded': expandedId === q.id }"
          @click="toggleExpand(q.id)"
        >
          <div class="review-item__header">
            <span class="review-item__status">{{ isSeen(q.id) ? '✗' : '✓' }}</span>
            <span class="review-item__index">{{ q.questionIndex }}</span>
            <TTag :type="difficultyTagType(q.difficulty)">{{ difficultyLabel(q.difficulty) }}</TTag>
            <TTag type="default">{{ q.categoryLabel }}</TTag>
            <span class="review-item__brief">{{ truncate(q.question, 60) }}</span>
          </div>
          <div v-if="expandedId === q.id" class="review-item__detail">
              <p class="review-item__question">{{ q.question }}</p>
              <div v-if="q.answer" class="review-item__answer">
                <div class="review-item__answer-label">参考答案</div>
                <div class="review-item__answer-md markdown-body" v-html="getAnswerHtml(q.answer)" />
              </div>
            </div>
        </div>
      </div>
    </section>

    <!-- Action Buttons -->
    <div class="action-row">
      <TButton variant="primary" size="large" @click="restart">重新答题</TButton>
      <TButton v-if="seenCount > 0" variant="secondary" size="large" @click="reviewWrong">查看错题</TButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { marked } from 'marked'
import TButton from '@/components/TButton.vue'
import TTag from '@/components/TTag.vue'
import TProgressBar from '@/components/TProgressBar.vue'
import TThemeToggle from '@/components/TThemeToggle.vue'

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
const expandedId = ref<string | null>(null)

const questions = ref<Question[]>([])
const answers = ref<AnswerState>({})
const startTime = ref(0)
const endTime = ref(0)

onMounted(() => {
  const raw = sessionStorage.getItem('quiz-result')
  if (!raw) {
    router.replace('/')
    return
  }
  try {
    const result: QuizResult = JSON.parse(raw)
    questions.value = result.questions
    answers.value = result.answers
    startTime.value = result.startTime
    endTime.value = result.endTime
  } catch {
    router.replace('/')
  }
})

const totalQuestions = computed(() => questions.value.length)

const isSeen = (id: string) => answers.value[id]?.seenAnswer === true

const seenCount = computed(() => questions.value.filter(q => isSeen(q.id)).length)
const unseenCount = computed(() => totalQuestions.value - seenCount.value)
const seenPercent = computed(() => totalQuestions.value > 0 ? Math.round((seenCount.value / totalQuestions.value) * 100) : 0)
const unseenPercent = computed(() => totalQuestions.value > 0 ? Math.round((unseenCount.value / totalQuestions.value) * 100) : 0)

const formattedTime = computed(() => {
  const diff = Math.max(0, Math.floor((endTime.value - startTime.value) / 1000))
  const m = Math.floor(diff / 60)
  const s = diff % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
})

// Difficulty breakdown
const difficultyStats = computed(() => {
  const levels: { level: 1 | 2 | 3; label: string }[] = [
    { level: 1, label: '基础★' },
    { level: 2, label: '进阶★★' },
    { level: 3, label: '专家★★★' }
  ]
  return levels.map(({ level, label }) => {
    const qs = questions.value.filter(q => q.difficulty === level)
    const total = qs.length
    const unseen = qs.filter(q => !isSeen(q.id)).length
    return { level, label, total, unseen }
  })
})

// Category breakdown
const categoryStats = computed(() => {
  const map = new Map<string, { category: string; categoryLabel: string; total: number; seen: number; unseen: number }>()
  for (const q of questions.value) {
    if (!map.has(q.category)) {
      map.set(q.category, { category: q.category, categoryLabel: q.categoryLabel, total: 0, seen: 0, unseen: 0 })
    }
    const entry = map.get(q.category)!
    entry.total++
    if (isSeen(q.id)) {
      entry.seen++
    } else {
      entry.unseen++
    }
  }
  return Array.from(map.values()).sort((a, b) => (b.seen / b.total) - (a.seen / a.total))
})

// Learning suggestions
const seenRatio = computed(() => totalQuestions.value > 0 ? seenCount.value / totalQuestions.value : 0)

const mainSuggestion = computed(() => {
  if (seenRatio.value > 0.7) return '建议重新复习基础知识，巩固薄弱点'
  if (seenRatio.value >= 0.4) return '部分知识点掌握不牢固，建议针对性复习'
  return '掌握情况良好！继续保持'
})

const weakCategories = computed(() => {
  return categoryStats.value
    .filter(c => c.total > 0 && c.seen / c.total > 0.5)
    .slice(0, 3)
})

// Question review
const sortedQuestions = computed(() => {
  return [...questions.value].sort((a, b) => {
    const aSeen = isSeen(a.id) ? 0 : 1
    const bSeen = isSeen(b.id) ? 0 : 1
    if (aSeen !== bSeen) return aSeen - bSeen // seen first
    return b.difficulty - a.difficulty // higher difficulty first
  })
})

function toggleExpand(id: string) {
  expandedId.value = expandedId.value === id ? null : id
}

function truncate(text: string, len: number) {
  return text.length > len ? text.slice(0, len) + '…' : text
}

function difficultyLabel(d: 1 | 2 | 3) {
  return d === 1 ? '基础' : d === 2 ? '进阶' : '专家'
}

function getAnswerHtml(answer: string) {
  if (!answer) return ''
  return marked.parse(answer) as string
}

function difficultyTagType(d: 1 | 2 | 3): 'success' | 'warning' | 'danger' {
  return d === 1 ? 'success' : d === 2 ? 'warning' : 'danger'
}

function restart() {
  sessionStorage.removeItem('quiz-result')
  router.push('/')
}

function reviewWrong() {
  const seenQuestions = questions.value.filter(q => isSeen(q.id))
  sessionStorage.setItem('quiz-config', JSON.stringify({
    questions: seenQuestions,
    totalQuestions: seenQuestions.length,
    startTime: Date.now()
  }))
  router.push('/quiz')
}
</script>

<style scoped>
.result-page {
  min-height: 100vh;
  padding-bottom: 40px;
}

/* Header */
.result-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.result-header__title {
  font-size: 24px;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
}

/* Statistics Cards */
.stats-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 28px;
}

@media (max-width: 600px) {
  .stats-row {
    grid-template-columns: repeat(2, 1fr);
  }
}

.stat-card {
  background: var(--bg-card);
  box-shadow: var(--shadow-card);
  border-radius: 12px;
  padding: 20px 16px;
  text-align: center;
  transition: box-shadow 0.2s ease;
}

.stat-card:hover {
  box-shadow: var(--shadow-card-hover);
}

.stat-card--fade {
  animation: fadeUp 0.5s ease forwards;
  animation-delay: calc(var(--delay) * 0.1s);
  opacity: 0;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.stat-card__value {
  font-size: 32px;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.2;
}

.stat-card--success .stat-card__value {
  color: var(--color-success);
}

.stat-card--warning .stat-card__value {
  color: var(--color-warning);
}

.stat-card__sub {
  font-size: 13px;
  color: var(--text-tertiary);
  margin-top: 2px;
}

.stat-card__label {
  font-size: 13px;
  color: var(--text-secondary);
  margin-top: 6px;
}

/* Sections */
.section {
  margin-bottom: 28px;
}

.section__title {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 14px 0;
}

/* Difficulty Breakdown */
.difficulty-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.difficulty-row {
  background: var(--bg-card);
  box-shadow: var(--shadow-card);
  border-radius: 10px;
  padding: 14px 18px;
}

.difficulty-row__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.difficulty-row__label {
  font-weight: 600;
  font-size: 14px;
  color: var(--text-primary);
}

.difficulty-row__stat {
  font-size: 13px;
  color: var(--text-secondary);
}

/* Category Breakdown */
.category-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.category-row {
  background: var(--bg-surface);
  border-radius: 8px;
  padding: 12px 16px;
}

.category-row__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}

.category-row__label {
  font-weight: 600;
  font-size: 14px;
  color: var(--text-primary);
}

.category-row__stat {
  font-size: 12px;
  color: var(--text-secondary);
}

/* Learning Suggestions */
.suggestion-card {
  background: var(--bg-card);
  box-shadow: var(--shadow-card);
  border-radius: 10px;
  padding: 18px 20px;
}

.suggestion-card__text {
  font-size: 15px;
  color: var(--text-primary);
  margin: 0 0 12px 0;
  line-height: 1.6;
}

.suggestion-card__weak {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.suggestion-card__weak-label {
  font-size: 13px;
  color: var(--text-secondary);
  flex-shrink: 0;
}

/* Question Review List */
.review-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.review-item {
  background: var(--bg-card);
  box-shadow: var(--shadow-card);
  border-radius: 8px;
  padding: 12px 16px;
  cursor: pointer;
  transition: box-shadow 0.2s ease;
  border-left: 3px solid transparent;
}

.review-item:hover {
  box-shadow: var(--shadow-card-hover);
}

.review-item--seen {
  border-left-color: var(--color-warning);
}

.review-item:not(.review-item--seen) {
  border-left-color: var(--color-success);
}

.review-item__header {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.review-item__status {
  font-size: 16px;
  font-weight: 700;
  flex-shrink: 0;
}

.review-item--seen .review-item__status {
  color: var(--color-warning);
}

.review-item:not(.review-item--seen) .review-item__status {
  color: var(--color-success);
}

.review-item__index {
  font-weight: 600;
  font-size: 13px;
  color: var(--text-secondary);
  flex-shrink: 0;
}

.review-item__brief {
  font-size: 13px;
  color: var(--text-secondary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
  min-width: 0;
}

.review-item__detail {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid var(--border-color);
}

.review-item__question {
  font-size: 14px;
  color: var(--text-primary);
  line-height: 1.7;
  margin: 0 0 10px 0;
  white-space: pre-wrap;
}

.review-item__answer {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.review-item__answer-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-primary);
}

.review-item__answer-md {
  background: var(--bg-surface);
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 13px;
  line-height: 1.7;
}

.markdown-body {
  color: var(--text-secondary);
  line-height: 1.7;
  font-size: 13px;
}

.markdown-body :deep(h1),
.markdown-body :deep(h2),
.markdown-body :deep(h3),
.markdown-body :deep(h4) {
  color: var(--text-primary);
  font-weight: 600;
  margin: 14px 0 6px;
  line-height: 1.4;
}

.markdown-body :deep(h1) { font-size: 18px; }
.markdown-body :deep(h2) { font-size: 16px; }
.markdown-body :deep(h3) { font-size: 15px; }
.markdown-body :deep(h4) { font-size: 14px; }

.markdown-body :deep(p) {
  margin: 6px 0;
}

.markdown-body :deep(ul),
.markdown-body :deep(ol) {
  margin: 6px 0;
  padding-left: 22px;
}

.markdown-body :deep(li) {
  margin: 3px 0;
}

.markdown-body :deep(code) {
  background: var(--bg-card);
  padding: 2px 5px;
  border-radius: 4px;
  font-size: 12px;
  font-family: 'SF Mono', Monaco, 'Courier New', monospace;
  color: var(--color-primary);
}

.markdown-body :deep(pre) {
  background: var(--bg-card);
  padding: 10px 14px;
  border-radius: 6px;
  overflow-x: auto;
  margin: 8px 0;
}

.markdown-body :deep(pre code) {
  background: transparent;
  padding: 0;
  color: var(--text-secondary);
}

.markdown-body :deep(blockquote) {
  border-left: 3px solid var(--color-primary);
  padding-left: 10px;
  margin: 8px 0;
  color: var(--text-secondary);
  opacity: 0.9;
}

.markdown-body :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 8px 0;
  font-size: 12px;
}

.markdown-body :deep(th),
.markdown-body :deep(td) {
  border: 1px solid var(--border-color);
  padding: 6px 10px;
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
  margin: 12px 0;
}

/* Action Buttons */
.action-row {
  display: flex;
  gap: 16px;
  margin-top: 32px;
  justify-content: center;
}
</style>
