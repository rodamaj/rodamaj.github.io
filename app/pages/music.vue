<script setup lang="ts">
import { siteConfig } from '~/config/site'

const { t } = useI18n()
</script>

<template>
  <PageShell
    :title="t('site.pages.music.title')"
    :description="t('site.pages.music.description')"
  >
    <div class="text-sections music-sections">
      <section>
        <h2>{{ t('site.music.returningTitle') }}</h2>

        <ul v-if="siteConfig.music.returningEntries.length" class="record-list">
          <li
            v-for="entry in siteConfig.music.returningEntries"
            :key="`${entry.artist}-${entry.title}`"
          >
            <p class="record-title">
              <cite>{{ entry.title }}</cite>
            </p>
            <p class="record-details">
              {{ entry.artist
              }}<template v-if="entry.year">, {{ entry.year }}</template>
            </p>
          </li>
        </ul>

        <p v-else class="placeholder">
          {{ t('site.music.returningPlaceholder') }}
        </p>
      </section>

      <section>
        <h2>{{ t('site.music.playlistTitle') }}</h2>
        <p>
          <a
            :href="siteConfig.music.spotifyPlaylistUrl"
            class="external-link"
            target="_blank"
            rel="noreferrer"
            :aria-label="`${t('site.music.playlistLink')}, ${t('ui.accessibility.opensInNewTab')}`"
            >{{ t('site.music.playlistLink') }}</a
          >
        </p>
      </section>

      <section>
        <h2>{{ t('site.music.discogsTitle') }}</h2>
        <p>
          <a
            :href="siteConfig.music.discogsUrl"
            class="external-link"
            target="_blank"
            rel="noreferrer"
            :aria-label="`${t('site.music.discogsLink')}, ${t('ui.accessibility.opensInNewTab')}`"
            >{{ t('site.music.discogsLink') }}</a
          >
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
  width: 100%;
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

.record-details,
.placeholder {
  color: var(--theme-text-soft);
}

.record-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 0;
  margin: 0;
  list-style: none;
}

.record-list li {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}

.record-list p {
  margin: 0;
}

.record-title cite {
  font-style: italic;
}
</style>
