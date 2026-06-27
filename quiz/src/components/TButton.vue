<template>
  <button
    class="t-button"
    :class="[
      `t-button--${resolvedType}`,
      `t-button--${size}`,
      { 't-button--block': block, 't-button--disabled': disabled }
    ]"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  type?: 'primary' | 'secondary' | 'ghost' | 'default'
  variant?: 'primary' | 'secondary' | 'ghost' | 'default'
  size?: 'small' | 'medium' | 'large'
  block?: boolean
  disabled?: boolean
}>(), {
  type: 'default',
  variant: undefined,
  size: 'medium'
})

const resolvedType = computed(() => props.variant ?? props.type)

defineEmits<{
  click: [e: MouseEvent]
}>()
</script>

<style scoped>
.t-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  cursor: pointer;
  font-weight: 500;
  transition: all var(--transition-fast);
  background: var(--bg-card);
  color: var(--text-primary);
  white-space: nowrap;
  user-select: none;
}

.t-button--medium {
  padding: 8px 16px;
  font-size: 14px;
}

.t-button--small {
  padding: 4px 12px;
  font-size: 13px;
}

.t-button--large {
  padding: 12px 24px;
  font-size: 16px;
}

.t-button--primary {
  background: var(--color-primary);
  color: var(--color-primary-text);
  border-color: var(--color-primary);
}

.t-button--primary:hover:not(.t-button--disabled) {
  background: var(--color-primary-hover);
  border-color: var(--color-primary-hover);
}

.t-button--secondary {
  background: var(--bg-elevated);
  color: var(--text-primary);
  border-color: var(--border-color);
}

.t-button--secondary:hover:not(.t-button--disabled) {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.t-button--default {
  background: var(--bg-card);
  color: var(--text-primary);
  border-color: var(--border-color);
}

.t-button--default:hover:not(.t-button--disabled) {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.t-button--ghost {
  background: transparent;
  border-color: transparent;
  color: var(--text-secondary);
}

.t-button--ghost:hover:not(.t-button--disabled) {
  background: var(--bg-elevated);
  color: var(--text-primary);
}

.t-button--block {
  display: flex;
  width: 100%;
}

.t-button--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
