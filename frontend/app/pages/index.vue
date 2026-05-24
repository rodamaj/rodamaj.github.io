<script setup lang="ts">
defineOptions({
  name: 'HomePage',
})

const { t } = useI18n()
const { data: song } = useSongOfTheDay()

useSeoMeta({
  title: 'Home',
  description: () =>
    `${t('profession')} - ${t('occupation')} - Josué Amador-Rojas`,
  ogTitle: 'Josué Amador-Rojas',
  ogDescription: () => `${t('profession')} - ${t('occupation')}`,
  ogType: 'website',
})
</script>

<template>
  <div class="main-container">
    <main class="content">
      <SummarySection />

      <p>––</p>

      <LinkSection />

      <template v-if="song">
        <p>––</p>

        <SongOfTheDaySection />
      </template>

      <p>––</p>

      <SettingsSection />
    </main>
  </div>
</template>

<style scoped>
.main-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100dvh;
  padding: 4rem 1.5rem;
  box-sizing: border-box;
  text-transform: lowercase;
}

.content {
  width: min(100%, 600px);
}

@media (min-width: 700px) {
  .main-container {
    align-items: center;
  }
}

@media (max-width: 700px) {
  .main-container {
    padding: 2rem 1.25rem;
  }
}
</style>
