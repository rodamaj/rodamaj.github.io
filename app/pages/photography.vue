<script setup lang="ts">
import { siteUrl } from '~~/site.config.mjs'
import type { PhotographEntry } from '~/types/content'

const { t } = useI18n()
const { text } = useLocalizedText()
const { data } = await useAsyncData('photography-entries', () =>
  queryCollection('photography')
    .order('date', 'DESC')
    .order('order', 'ASC')
    .all()
)
const entries = computed(() => (data.value ?? []) as PhotographEntry[])

useSeoMeta({
  ogTitle: () => t('site.pages.photography.title'),
  ogDescription: () => t('site.pages.photography.description'),
  ogType: 'website',
  ogImage: `${siteUrl}/images/photography/research-city-facade/1600.jpg`,
  ogImageAlt: () =>
    entries.value[0] ? text(entries.value[0].image.alt) : undefined,
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <PageShell
    :title="t('site.pages.photography.title')"
    :description="t('site.pages.photography.description')"
  >
    <PhotographList v-if="entries.length" :entries="entries" />
    <section v-else class="empty-state">
      <h2>{{ t('site.pages.photography.title') }}</h2>
    </section>
  </PageShell>
</template>

<style scoped>
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
