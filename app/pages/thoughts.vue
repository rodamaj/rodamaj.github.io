<script setup lang="ts">
const { content, text } = useSiteContent()
</script>

<template>
  <PageShell
    :title="content.pages.thoughts.title"
    :description="content.pages.thoughts.description"
  >
    <ol v-if="content.thoughts.entries.length" class="thought-list">
      <li v-for="entry in content.thoughts.entries" :key="entry.slug">
        <NuxtLink :to="`/thoughts/${entry.slug}`" class="forward-link">{{
          text(entry.title)
        }}</NuxtLink>
      </li>
    </ol>
    <section v-else class="empty-state">
      <h2>{{ text(content.thoughts.emptyTitle) }}</h2>
      <p>{{ text(content.thoughts.emptyDescription) }}</p>
    </section>
  </PageShell>
</template>
