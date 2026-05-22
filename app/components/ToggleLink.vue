<script setup lang="ts">
import type { LinkInfo } from '~/types/ToggleLinkInfo'

const { links, activeId = undefined } = defineProps<{
  links: LinkInfo[]
  activeId?: string
}>()

const emit = defineEmits(['select'])

const activeLinkId = ref(activeId ?? links[0]?.id ?? '')

watch(
  () => activeId,
  (nextActiveId) => {
    activeLinkId.value = nextActiveId ?? links[0]?.id ?? ''
  }
)

const onSelect = (id: string) => {
  if (activeLinkId.value === id) {
    return
  }

  activeLinkId.value = id
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
      :class="{ active: activeLinkId === link.id }"
      :aria-label="link.ariaLabel"
      :aria-pressed="activeLinkId === link.id"
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
  outline: 2px solid currentColor;
  outline-offset: 2px;
}
</style>
