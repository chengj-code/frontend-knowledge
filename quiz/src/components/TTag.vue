<template>
  <span class="t-tag" :class="[`t-tag--${resolvedType}`]">
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  type?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
  color?: string
}>(), {
  type: 'default',
  variant: undefined
})

const resolvedType = computed(() => props.variant ?? props.type)
</script>

<style scoped>
.t-tag {
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.5;
}

.t-tag--default {
  background: var(--bg-elevated);
  color: var(--text-secondary);
}

.t-tag--primary {
  background: var(--color-primary-dim);
  color: var(--color-primary);
}

.t-tag--success {
  background: rgba(16, 185, 129, 0.1);
  color: var(--difficulty-1);
}

.t-tag--warning {
  background: rgba(245, 158, 11, 0.1);
  color: var(--difficulty-2);
}

.t-tag--danger {
  background: rgba(239, 68, 68, 0.1);
  color: var(--difficulty-3);
}

.t-tag--info {
  background: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
}
</style>
