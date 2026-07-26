<script setup lang="ts">
import { siteConfig } from '~/config/site'

const { t } = useI18n()
</script>

<template>
  <PageShell
    :title="t('site.pages.music.title')"
    :description="t('site.pages.music.description')"
  >
    <section class="returning-records">
      <header class="section-header">
        <h2>{{ t('site.music.returningTitle') }}</h2>
        <p>{{ t('site.music.noParticularOrder') }}</p>
      </header>

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

    <section class="playlist-section">
      <header class="section-header">
        <h2>{{ t('site.music.playlistTitle') }}</h2>
        <p>{{ t('site.music.playlistDescription') }}</p>
      </header>
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

    <aside class="discogs-profile">
      <p>{{ t('site.music.discogsDescription') }}</p>
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
    </aside>
  </PageShell>
</template>

<style scoped>
.returning-records {
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 2rem;
}

.returning-records > * {
  margin: 0;
}

.section-header {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.section-header > * {
  margin: 0;
}

.section-header h2 {
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.5;
}

.section-header p,
.record-details,
.placeholder {
  color: var(--theme-text-soft);
}

.record-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
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

.playlist-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 4rem;
}

.playlist-section > * {
  margin: 0;
}

.discogs-profile {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-top: 4rem;
}

.discogs-profile p {
  margin: 0;
}

.discogs-profile p:first-child {
  color: var(--theme-text-soft);
}
</style>
