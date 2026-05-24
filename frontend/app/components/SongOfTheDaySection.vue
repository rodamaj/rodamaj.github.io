<script setup lang="ts">
import PlainTextSection from './PlainTextSection.vue'

const { t } = useI18n()
const { data: song } = useSongOfTheDay()
const artistNames = computed(() => song.value?.artists.join(', ') ?? '')
</script>

<template>
  <PlainTextSection v-if="song">
    <p>
      {{ t('song-of-the-day-label') }}:
      <a :href="song.spotifyUrl" target="_blank" rel="noreferrer">
        {{ song.title }}, {{ artistNames }}
        <span class="sr-only"> {{ t('opens-in-new-tab-label') }}</span>
      </a>
    </p>
  </PlainTextSection>
</template>
