<script setup lang="ts">
import type { EditorialEntry } from '~/types/content'

defineProps<{
  entries: readonly EditorialEntry[]
}>()

const { t } = useI18n()
const { text } = useLocalizedText()
</script>

<template>
  <ol class="editorial-list">
    <li v-for="entry in entries" :key="entry.id" class="editorial-entry">
      <p class="entry-date">{{ text(entry.date) }}</p>
      <article class="entry-body">
        <h2>{{ text(entry.title) }}</h2>

        <p v-for="paragraph in entry.description" :key="text(paragraph)">
          {{ text(paragraph) }}
        </p>

        <p class="entry-meta">
          <span class="entry-category">{{
            t(`site.projectCategories.${entry.category}`)
          }}</span>
          <template v-for="link in entry.links" :key="link.href">
            <span aria-hidden="true"> · </span>
            <a
              :href="link.href"
              :class="{ 'external-link': link.external }"
              :target="link.external ? '_blank' : undefined"
              :rel="link.external ? 'noreferrer' : undefined"
              :aria-label="
                link.external
                  ? `${text(link.label)}, ${t('ui.accessibility.opensInNewTab')}`
                  : undefined
              "
              >{{ text(link.label) }}</a
            >
          </template>
        </p>
      </article>
    </li>
  </ol>
</template>

<style scoped>
.editorial-list {
  display: flex;
  flex-direction: column;
  gap: 4rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.editorial-entry {
  display: grid;
  grid-template-columns: 7rem minmax(0, 1fr);
  gap: 1.5rem;
}

.entry-date {
  margin: 0;
  color: var(--theme-text-soft);
}

.entry-body {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
}

.entry-body > * {
  margin: 0;
}

.entry-body h2 {
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.5;
}

.entry-meta {
  margin-top: 0.25rem;
}

.entry-category {
  color: var(--theme-text-soft);
}

@container (max-width: 34rem) {
  .editorial-list {
    gap: 3rem;
  }

  .editorial-entry {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
}
</style>
