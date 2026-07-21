<script setup lang="ts">
const { content } = useSiteContent()
</script>

<template>
  <PageShell
    :title="content.pages.engineering.title"
    :description="content.pages.engineering.description"
  >
    <EditorialList :entries="content.engineering" />
  </PageShell>
</template>
