<script setup lang="ts">
import type { PhotographEntry } from '~/content/site'

defineProps<{
  entries: readonly PhotographEntry[]
}>()

const { content, locale, text } = useSiteContent()

const formatDate = (date: string) => {
  const language = locale.value === 'es' ? 'es-CR' : 'en-US'

  return new Intl.DateTimeFormat(language, {
    dateStyle: 'long',
    timeZone: 'UTC',
  }).format(new Date(`${date}T00:00:00Z`))
}

const srcset = (entry: PhotographEntry) =>
  entry.image.sources
    .map((source) => `${source.src} ${source.width}w`)
    .join(', ')

const details = (entry: PhotographEntry) =>
  [
    entry.device,
    text(content.photography.captureTypes[entry.captureType]),
    entry.focalLengthMm
      ? `${entry.focalLengthMm} mm`
      : text(content.photography.focalNotRetained),
  ].join(' · ')
</script>

<template>
  <ol class="photograph-list">
    <li
      v-for="(photograph, index) in entries"
      :id="photograph.slug"
      :key="photograph.slug"
      class="photograph-entry"
    >
      <figure>
        <img
          :src="photograph.image.src"
          :srcset="srcset(photograph)"
          sizes="(max-width: 700px) calc(100vw - 2.5rem), 600px"
          :width="photograph.image.width"
          :height="photograph.image.height"
          :alt="text(photograph.image.alt)"
          :loading="index === 0 ? 'eager' : 'lazy'"
          :fetchpriority="index === 0 ? 'high' : 'auto'"
          decoding="async"
        />

        <figcaption>
          <div class="photograph-context">
            <p>{{ text(photograph.location) }}</p>
            <time :datetime="photograph.date">{{
              formatDate(photograph.date)
            }}</time>
          </div>

          <p class="photograph-details">{{ details(photograph) }}</p>
        </figcaption>
      </figure>
    </li>
  </ol>
</template>

<style scoped>
.photograph-list {
  display: flex;
  flex-direction: column;
  gap: 5rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.photograph-entry {
  scroll-margin-top: 2rem;
}

.photograph-entry figure,
.photograph-entry p {
  margin: 0;
}

.photograph-entry figure,
.photograph-entry figcaption,
.photograph-context {
  display: grid;
}

.photograph-entry figure {
  gap: 1rem;
}

.photograph-entry img {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 3 / 4;
  background: var(--theme-divider);
  object-fit: cover;
}

.photograph-entry figcaption {
  gap: 1rem;
}

.photograph-context {
  gap: 0.25rem;
}

.photograph-context time,
.photograph-details {
  color: var(--theme-text-soft);
}

@media (max-width: 420px) {
  .photograph-list {
    gap: 4rem;
  }
}
</style>
