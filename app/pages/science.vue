<script setup lang="ts">
import type { EditorialEntry } from '~/types/content'

const { t } = useI18n()
const { data: entries } = await useAsyncData('science-entries', () =>
  queryCollection('science').order('order', 'ASC').all()
)
</script>

<template>
  <PageShell
    :title="t('site.pages.science.title')"
    :description="t('site.pages.science.description')"
  >
    <EditorialList :entries="(entries ?? []) as EditorialEntry[]" />
  </PageShell>
</template>
