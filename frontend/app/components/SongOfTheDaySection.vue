<script setup lang="ts">
import PlainTextSection from './PlainTextSection.vue'

const { t } = useI18n()
const { data: song } = useSongOfTheDay()
const artistNames = computed(() => song.value?.artists.join(', ') ?? '')
</script>

<template>
  <PlainTextSection v-if="song">
    <p>
      {{ t('song-of-the-day-label') }}: {{ song.title }}, {{ artistNames }}.
      <a :href="song.spotifyUrl" target="_blank" rel="noreferrer">
        Spotify<span class="sr-only">
          {{ ` ${t('opens-in-new-tab-label')}` }}
        </span>
      </a>
    </p>
  </PlainTextSection>
</template>

<style scoped>
a::after {
  content: '↗';
  display: inline-block;
  text-decoration: none;
  margin-left: 0.25rem;
  opacity: 0.75;
  font-size: 0.8rem;
}
</style>
