<script setup lang="ts">
const { content, text } = useSiteContent()
</script>

<template>
  <PageShell
    :title="content.pages.photography.title"
    :description="content.pages.photography.description"
  >
    <div v-if="content.photography.entries.length" class="photograph-list">
      <figure
        v-for="photograph in content.photography.entries"
        :key="photograph.id"
      >
        <img :src="photograph.src" :alt="text(photograph.alt)" />
        <figcaption>
          <p v-if="photograph.note">{{ text(photograph.note) }}</p>
          <p
            v-if="photograph.date || photograph.location"
            class="photograph-metadata"
          >
            <template v-if="photograph.date">{{
              text(photograph.date)
            }}</template>
            <span
              v-if="photograph.date && photograph.location"
              aria-hidden="true"
            >
              ·
            </span>
            <template v-if="photograph.location">{{
              text(photograph.location)
            }}</template>
          </p>
        </figcaption>
      </figure>
    </div>
    <section v-else class="empty-state">
      <h2>{{ text(content.photography.emptyTitle) }}</h2>
      <p>{{ text(content.photography.emptyDescription) }}</p>
    </section>
  </PageShell>
</template>
