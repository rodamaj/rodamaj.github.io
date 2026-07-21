<script setup lang="ts">
import type { EditorialEntry } from '~/content/site'

const { content } = useSiteContent()
const { data: entries } = await useAsyncData('science-entries', () =>
  queryCollection('science').order('order', 'ASC').all()
)
</script>

<template>
  <PageShell
    :title="content.pages.science.title"
    :description="content.pages.science.description"
  >
    <EditorialList :entries="(entries ?? []) as EditorialEntry[]" />
  </PageShell>
</template>
