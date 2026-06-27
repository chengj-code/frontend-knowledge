<template>
  <div
    class="t-card"
    :class="{ 't-card--selected': selected, 't-card--clickable': clickable }"
    @click="$emit('click', $event)"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  selected?: boolean
  clickable?: boolean
}>()

defineEmits<{
  click: [e: MouseEvent]
}>()
</script>

<style scoped>
.t-card {
  background: var(--bg-card);
  border: 2px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 16px;
  box-shadow: var(--shadow-card);
  transition: all var(--transition-normal);
}

.t-card--clickable {
  cursor: pointer;
}

.t-card--clickable:hover {
  box-shadow: var(--shadow-card-hover);
  border-color: var(--border-color-hover);
  transform: translateY(-1px);
}

.t-card--selected {
  border-color: var(--color-primary);
  background: var(--color-primary-dim);
}

.t-card--selected:hover {
  border-color: var(--color-primary);
}
</style>
