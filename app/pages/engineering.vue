<script setup lang="ts">
import type { EditorialEntry } from '~/content/site'

const { content } = useSiteContent()
const { data: entries } = await useAsyncData('engineering-entries', () =>
  queryCollection('engineering').order('order', 'ASC').all()
)
</script>

<template>
  <PageShell
    :title="content.pages.engineering.title"
    :description="content.pages.engineering.description"
  >
    <EditorialList :entries="(entries ?? []) as EditorialEntry[]" />
  </PageShell>
</template>
