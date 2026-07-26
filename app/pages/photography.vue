<script setup lang="ts">
import type { PhotographEntry } from '~/content/site'

const { content, text } = useSiteContent()
const { data } = await useAsyncData('photography-entries', () =>
  queryCollection('photography')
    .order('date', 'DESC')
    .order('order', 'ASC')
    .all()
)
const entries = computed(() => (data.value ?? []) as PhotographEntry[])

useSeoMeta({
  ogTitle: () => text(content.pages.photography.title),
  ogDescription: () => text(content.pages.photography.description),
  ogType: 'website',
  ogImage:
    'https://rodamaj.github.io/images/photography/research-city-facade/1600.jpg',
  ogImageAlt: () =>
    entries.value[0] ? text(entries.value[0].image.alt) : undefined,
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <PageShell
    :title="content.pages.photography.title"
    :description="content.pages.photography.description"
  >
    <PhotographList v-if="entries.length" :entries="entries" />
    <section v-else class="empty-state">
      <h2>{{ text(content.pages.photography.title) }}</h2>
    </section>
  </PageShell>
</template>
