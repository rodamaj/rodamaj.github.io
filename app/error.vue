<script setup lang="ts">
import { computed } from 'vue'
import { siteConfig } from '~/config/site'

defineProps<{
  error: unknown
}>()

const { t } = useI18n()
const requestUrl = useRequestURL()

const isHome = computed(() => requestUrl.pathname === '/')

const reloadPage = () => {
  window.location.reload()
}

useHead(() => ({
  title: t('ui.error.title'),
}))
</script>

<template>
  <main class="site-container error-page">
    <div class="site-content error-content">
      <header class="error-message">
        <h1>{{ siteConfig.identity.name }}</h1>
        <p>{{ t('ui.error.title') }}</p>
        <p>{{ t('ui.error.description') }}</p>
      </header>

      <p class="separator" aria-hidden="true">––</p>

      <button
        v-if="isHome"
        type="button"
        class="retry-button"
        @click="reloadPage"
      >
        {{ t('ui.error.retry') }}
      </button>
      <a v-else href="/" class="back-link">{{ t('ui.error.home') }}</a>
    </div>
  </main>
</template>

<style scoped>
.error-page {
  align-items: center;
}

.error-content,
.error-message {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.error-message {
  gap: 1rem;
}

.error-message > *,
.error-content > a,
.error-content > button {
  margin: 0;
}

.error-message h1 {
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.5;
}

.separator {
  margin: 2rem 0;
}

.back-link::before {
  display: inline-block;
  margin-right: 0.25rem;
  text-decoration: none;
  content: '←';
}

.retry-button {
  border: 0;
  padding: 0;
  background: transparent;
  color: var(--theme-link);
  font: inherit;
  text-transform: inherit;
  text-decoration: underline;
  text-underline-offset: 0.12em;
  cursor: pointer;
}

.retry-button:hover {
  color: var(--theme-link-hover);
}
</style>
