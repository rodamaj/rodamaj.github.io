<script setup lang="ts">
import type { EditorialEntry } from '~/types/content'

const { t } = useI18n()
const { data: entries } = await useAsyncData('engineering-entries', () =>
  queryCollection('engineering').order('order', 'ASC').all()
)
</script>

<template>
  <PageShell
    :title="t('site.pages.engineering.title')"
    :description="t('site.pages.engineering.description')"
  >
    <EditorialList :entries="(entries ?? []) as EditorialEntry[]" />
  </PageShell>
</template>
