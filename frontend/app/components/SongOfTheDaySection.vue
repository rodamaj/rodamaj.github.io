<script setup lang="ts">
import PlainTextSection from './PlainTextSection.vue'

const { t } = useI18n()
const { data: song } = useSongOfTheDay()
</script>

<template>
  <PlainTextSection v-if="song">
    <p>
      {{ t('song-of-the-day-label') }}:
      <a :href="song.spotifyUrl" target="_blank" rel="noreferrer">
        {{ song.title }}, {{ song.artists.join(', ') }}
        <span class="sr-only"> {{ t('opens-in-new-tab-label') }}</span>
      </a>
    </p>
  </PlainTextSection>
</template>
