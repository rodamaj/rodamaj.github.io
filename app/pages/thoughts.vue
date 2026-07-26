<script setup lang="ts">
import { siteConfig } from '~/config/site'

const { t } = useI18n()
const { text } = useLocalizedText()
</script>

<template>
  <PageShell
    :title="t('site.pages.thoughts.title')"
    :description="t('site.pages.thoughts.description')"
  >
    <ol v-if="siteConfig.thoughts.entries.length" class="thought-list">
      <li v-for="entry in siteConfig.thoughts.entries" :key="entry.slug">
        <NuxtLink :to="`/thoughts/${entry.slug}`" class="forward-link">{{
          text(entry.title)
        }}</NuxtLink>
      </li>
    </ol>
    <section v-else class="empty-state">
      <h2>{{ t('site.thoughts.emptyTitle') }}</h2>
      <p>{{ t('site.thoughts.emptyDescription') }}</p>
    </section>
  </PageShell>
</template>

<style scoped>
.thought-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
}

.empty-state > * {
  margin: 0;
}

.empty-state h2 {
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.5;
}
</style>
