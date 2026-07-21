<script setup lang="ts">
const { content } = useSiteContent()
</script>

<template>
  <PageShell
    :title="content.pages.science.title"
    :description="content.pages.science.description"
  >
    <EditorialList :entries="content.science" />
  </PageShell>
</template>
