<script setup lang="ts">
import { computed } from 'vue'
import type { LinkInfo } from '~/types/ToggleLinkInfo'

const { links, activeId = undefined } = defineProps<{
  links: LinkInfo[]
  activeId?: string
}>()

const emit = defineEmits(['select'])

const selectedId = computed(() => activeId ?? links[0]?.id ?? '')

const onSelect = (id: string) => {
  if (selectedId.value === id) {
    return
  }

  emit('select', id)
}
</script>

<template>
  <div class="link-container" role="group">
    <button
      v-for="link in links"
      :key="link.id"
      type="button"
      class="link"
      :class="{ active: selectedId === link.id }"
      :aria-label="link.ariaLabel"
      :aria-pressed="selectedId === link.id"
      @click="onSelect(link.id)"
    >
      {{ link.label }}
    </button>
  </div>
</template>

<style scoped>
.link-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
}

.link {
  border: 0;
  padding: 0;
  background: transparent;
  color: inherit;
  font: inherit;
  text-transform: inherit;
  text-decoration: underline;
  cursor: pointer;
}

.active {
  font-weight: bold;
  text-decoration: none;
  cursor: default;
}

.link:focus-visible {
  outline-color: var(--theme-focus);
}
</style>
