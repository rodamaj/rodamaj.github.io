<script setup lang="ts">
import { siteConfig } from '~/config/site'

const { t } = useI18n()

useSeoMeta({
  title: () => t('ui.labels.index'),
  description: () => t('site.identity.statement'),
  ogTitle: siteConfig.identity.name,
  ogDescription: () => t('site.identity.statement'),
  ogType: 'website',
})
</script>

<template>
  <!-- The visible index remains mounted by app.vue while panel routes are open. -->
  <div aria-hidden="true"></div>
</template>
