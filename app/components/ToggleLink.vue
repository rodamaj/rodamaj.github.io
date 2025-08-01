<script setup lang="ts">
import type { LinkInfo } from '~/types/ToggleLinkInfo'

const { links } = defineProps<{
  links: LinkInfo[]
}>()

const emit = defineEmits(['select'])

const activeLinkId = ref(links[0]?.id ?? '')

const onSelect = (id: string) => {
  activeLinkId.value = id
  emit('select', id)
}
</script>

<template>
  <div class="link-container">
    <a
      v-for="link in links"
      :key="link.id"
      class="link"
      :class="{ active: activeLinkId === link.id }"
      @click="() => onSelect(link.id)"
    >
      {{ link.label }}
    </a>
  </div>
</template>

<style scoped>
.link-container {
  display: flex;
  gap: 0.25rem;
}

.link {
  text-decoration: underline;
  cursor: pointer;
}

.active {
  font-weight: bold;
  text-decoration: none;
  cursor: default;
}
</style>
