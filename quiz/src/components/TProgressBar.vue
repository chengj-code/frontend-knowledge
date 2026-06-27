<template>
  <div class="t-progress-bar" :style="{ height: `${height}px` }">
    <div class="t-progress-bar__fill" :style="fillStyle" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  value: number
  percentage?: number
  height?: number
  color?: string
}>(), {
  height: 8
})

const percentage = computed(() => {
  return props.percentage ?? props.value
})

const fillStyle = computed(() => ({
  width: `${Math.min(100, Math.max(0, percentage.value))}%`,
  background: props.color || 'var(--color-primary)'
}))
</script>

<style scoped>
.t-progress-bar {
  width: 100%;
  background: var(--bg-elevated);
  border-radius: 999px;
  overflow: hidden;
}

.t-progress-bar__fill {
  height: 100%;
  border-radius: 999px;
  transition: width 0.3s ease;
}
</style>
