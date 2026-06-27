<template>
  <div class="home-page">
    <!-- Header -->
    <header class="home-header">
      <div class="home-header__text">
        <h1 class="home-header__title">前端答题系统</h1>
        <p class="home-header__subtitle">选择主题，检验学习成果</p>
      </div>
      <TThemeToggle />
    </header>

    <!-- Loading -->
    <div v-if="loading" class="home-loading">
      <div class="home-loading__spinner"></div>
      <p>加载主题中...</p>
    </div>

    <!-- Topic Grid -->
    <template v-else>
      <section class="home-topics">
        <h2 class="home-section-title">选择主题</h2>
        <div class="home-topics__grid">
          <TCard
            v-for="cat in categories"
            :key="cat.category"
            :selected="selectedCategories.has(cat.category)"
            :clickable="true"
            @click="toggleCategory(cat.category)"
          >
            <div class="topic-card">
              <div class="topic-card__header">
                <span class="topic-card__label">{{ cat.categoryLabel }}</span>
                <span v-if="selectedCategories.has(cat.category)" class="topic-card__check">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </span>
              </div>
              <span class="topic-card__count">{{ cat.totalQuestions }} 题</span>
            </div>
          </TCard>
        </div>
      </section>

      <!-- Configuration Panel -->
      <section class="home-config">
        <h2 class="home-section-title">答题配置</h2>

        <div class="home-config__item">
          <label class="home-config__label">题目数量</label>
          <div class="home-config__options">
            <TButton
              v-for="n in questionCountOptions"
              :key="n"
              :type="questionCount === n ? 'primary' : 'secondary'"
              size="small"
              @click="questionCount = n"
            >
              {{ n }}
            </TButton>
          </div>
        </div>

        <div class="home-config__item">
          <label class="home-config__label">难度筛选</label>
          <div class="home-config__options">
            <TButton
              v-for="opt in difficultyOptions"
              :key="opt.value"
              :type="difficultyFilter === opt.value ? 'primary' : 'secondary'"
              size="small"
              @click="difficultyFilter = opt.value"
            >
              {{ opt.label }}
            </TButton>
          </div>
        </div>

        <div class="home-config__available">
          可选题目: <strong>{{ availableQuestionCount }}</strong> 道
        </div>
      </section>

      <!-- Start Button -->
      <div class="home-start">
        <TButton
          type="primary"
          size="large"
          :block="true"
          :disabled="selectedCategories.size === 0"
          @click="startQuiz"
        >
          开始答题
        </TButton>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import TButton from '@/components/TButton.vue'
import TCard from '@/components/TCard.vue'
import TThemeToggle from '@/components/TThemeToggle.vue'

interface Category {
  category: string
  categoryLabel: string
  totalQuestions: number
}

interface Question {
  id: string
  category: string
  categoryLabel: string
  questionIndex: string
  question: string
  difficulty: 1 | 2 | 3
  type: string
  keyPoints: string[]
}

interface QuizConfig {
  questions: Question[]
  totalQuestions: number
  startTime: number
}

const router = useRouter()
const base = import.meta.env.BASE_URL

// State
const loading = ref(true)
const categories = ref<Category[]>([])
const selectedCategories = ref<Set<string>>(new Set())
const questionCount = ref(10)
const difficultyFilter = ref(0) // 0 = all, 1/2/3 = specific

const questionCountOptions = [5, 10, 15, 20, 30]
const difficultyOptions = [
  { label: '全部', value: 0 },
  { label: '基础★', value: 1 },
  { label: '进阶★★', value: 2 },
  { label: '专家★★★', value: 3 }
]

// Fetched question data cache
const fetchedQuestions = ref<Map<string, Question[]>>(new Map())

// Available question count based on selected categories and difficulty
const availableQuestionCount = computed(() => {
  let count = 0
  for (const cat of selectedCategories.value) {
    const questions = fetchedQuestions.value.get(cat)
    if (questions) {
      if (difficultyFilter.value === 0) {
        count += questions.length
      } else {
        count += questions.filter(q => q.difficulty === difficultyFilter.value).length
      }
    } else {
      // If not yet fetched, use total from categories
      const catData = categories.value.find(c => c.category === cat)
      if (catData) count += catData.totalQuestions
    }
  }
  return count
})

// Fetch categories
onMounted(async () => {
  try {
    const res = await fetch(`${base}data/categories.json`)
    categories.value = await res.json()
  } catch (e) {
    console.error('Failed to load categories:', e)
  } finally {
    loading.value = false
  }
})

function toggleCategory(category: string) {
  if (selectedCategories.value.has(category)) {
    selectedCategories.value.delete(category)
    selectedCategories.value = new Set(selectedCategories.value)
  } else {
    selectedCategories.value.add(category)
    selectedCategories.value = new Set(selectedCategories.value)
  }
}

async function startQuiz() {
  if (selectedCategories.value.size === 0) return

  // Fetch questions for all selected categories
  const allQuestions: Question[] = []

  for (const cat of selectedCategories.value) {
    let questions = fetchedQuestions.value.get(cat)
    if (!questions) {
      try {
        const res = await fetch(`${base}data/${cat}.json`)
        const data = await res.json()
        questions = data.questions as Question[]
        fetchedQuestions.value.set(cat, questions)
      } catch (e) {
        console.error(`Failed to load questions for ${cat}:`, e)
        continue
      }
    }
    allQuestions.push(...questions)
  }

  // Filter by difficulty
  let filtered = allQuestions
  if (difficultyFilter.value !== 0) {
    filtered = allQuestions.filter(q => q.difficulty === difficultyFilter.value)
  }

  // Randomly select questions
  const shuffled = [...filtered].sort(() => Math.random() - 0.5)
  const selected = shuffled.slice(0, Math.min(questionCount.value, shuffled.length))

  // Store in sessionStorage
  const config: QuizConfig = {
    questions: selected,
    totalQuestions: selected.length,
    startTime: Date.now()
  }
  sessionStorage.setItem('quiz-config', JSON.stringify(config))

  // Navigate to quiz page
  router.push('/quiz')
}
</script>

<style scoped>
.home-page {
  min-height: 100vh;
  background: var(--bg-base);
}

/* Header */
.home-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 0 16px;
}

.home-header__title {
  font-size: 24px;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
}

.home-header__subtitle {
  font-size: 14px;
  color: var(--text-secondary);
  margin: 4px 0 0;
}

/* Loading */
.home-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 0;
  color: var(--text-secondary);
}

.home-loading__spinner {
  width: 32px;
  height: 32px;
  border: 3px solid var(--border-color);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin-bottom: 12px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Section Title */
.home-section-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 16px;
}

/* Topic Grid */
.home-topics {
  margin-bottom: 32px;
}

.home-topics__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}

@media (min-width: 480px) {
  .home-topics__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 640px) {
  .home-topics__grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 960px) {
  .home-topics__grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

/* Topic Card */
.topic-card {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.topic-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.topic-card__label {
  font-size: 15px;
  font-weight: 600;
  color: var(--text-primary);
}

.topic-card__check {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: var(--color-primary);
  color: var(--color-primary-text);
  border-radius: 50%;
  flex-shrink: 0;
}

.topic-card__count {
  font-size: 13px;
  color: var(--text-secondary);
}

/* Configuration Panel */
.home-config {
  margin-bottom: 32px;
}

.home-config__item {
  margin-bottom: 16px;
}

.home-config__label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-secondary);
  margin-bottom: 8px;
}

.home-config__options {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.home-config__available {
  font-size: 14px;
  color: var(--text-secondary);
  padding-top: 8px;
}

.home-config__available strong {
  color: var(--color-primary);
}

/* Start Button */
.home-start {
  padding-bottom: 40px;
}
</style>
