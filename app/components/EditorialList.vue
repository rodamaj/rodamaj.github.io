<script setup lang="ts">
import type { EditorialEntry } from '~/content/site'

defineProps<{
  entries: readonly EditorialEntry[]
}>()

const { content, text } = useSiteContent()
</script>

<template>
  <ol class="editorial-list">
    <li v-for="entry in entries" :key="entry.id" class="editorial-entry">
      <p class="entry-date">{{ text(entry.date) }}</p>
      <article class="entry-body">
        <h2>{{ text(entry.title) }}</h2>

        <p v-for="paragraph in entry.description" :key="text(paragraph)">
          {{ text(paragraph) }}
        </p>

        <p v-if="entry.status" class="entry-status">{{ text(entry.status) }}</p>

        <p v-if="entry.technologies?.length" class="entry-technologies">
          <span>{{ text(content.labels.technologies) }}:</span>
          {{ entry.technologies.join(', ') }}
        </p>

        <p
          v-if="entry.context?.length || entry.links?.length"
          class="entry-meta"
        >
          <template v-for="(item, index) in entry.context" :key="text(item)">
            <span v-if="index" aria-hidden="true"> · </span>
            <span>{{ text(item) }}</span>
          </template>
          <template v-for="link in entry.links" :key="link.href">
            <span
              v-if="entry.context?.length || entry.links?.indexOf(link)"
              aria-hidden="true"
            >
              ·
            </span>
            <a
              :href="link.href"
              :class="{ 'external-link': link.external }"
              :target="link.external ? '_blank' : undefined"
              :rel="link.external ? 'noreferrer' : undefined"
              >{{ text(link.label) }}</a
            >
          </template>
        </p>
      </article>
    </li>
  </ol>
</template>
