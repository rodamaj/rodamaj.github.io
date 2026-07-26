<script setup lang="ts">
import { siteConfig } from '~/config/site'

const { t } = useI18n()
const { text } = useLocalizedText()
</script>

<template>
  <PageShell
    :title="t('site.pages.music.title')"
    :description="t('site.pages.music.description')"
  >
    <div class="text-sections">
      <section>
        <h2>{{ t('site.music.recentTitle') }}</h2>
        <div v-if="siteConfig.music.recentEntries.length">
          <article
            v-for="entry in siteConfig.music.recentEntries"
            :key="`${entry.artist}-${entry.title}`"
          >
            <p>{{ entry.artist }} — {{ entry.title }}</p>
            <p v-if="entry.note">{{ text(entry.note) }}</p>
          </article>
        </div>
        <p v-else class="placeholder pre-line">
          {{ t('site.music.recentPlaceholder') }}
        </p>
      </section>

      <section>
        <h2>{{ t('site.music.returningTitle') }}</h2>
        <div v-if="siteConfig.music.returningEntries.length">
          <p
            v-for="entry in siteConfig.music.returningEntries"
            :key="`${entry.artist}-${entry.title}`"
          >
            {{ entry.artist }} — {{ entry.title
            }}<template v-if="entry.year">, {{ entry.year }}</template>
          </p>
        </div>
        <p v-else class="placeholder">
          {{ t('site.music.returningPlaceholder') }}
        </p>
      </section>
    </div>
  </PageShell>
</template>

<style scoped>
.text-sections {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4rem;
}

.text-sections section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.text-sections section > * {
  margin: 0;
}

.text-sections h2 {
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.5;
}

.placeholder {
  color: var(--theme-text-soft);
}

.pre-line {
  white-space: pre-line;
}
</style>
