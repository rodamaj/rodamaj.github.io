<script setup lang="ts">
const { content, text } = useSiteContent()

useSeoMeta({
  title: () => text(content.labels.index),
  description: () => text(content.identity.statement),
  ogTitle: content.identity.name,
  ogDescription: () => text(content.identity.statement),
  ogType: 'website',
})
</script>

<template>
  <!-- The visible index remains mounted by app.vue while panel routes are open. -->
  <div aria-hidden="true"></div>
</template>
