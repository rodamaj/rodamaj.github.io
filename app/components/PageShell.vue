<script setup lang="ts">
import { siteConfig } from '~/config/site'

const { title, description = undefined } = defineProps<{
  title: string
  description?: string
}>()

const { t } = useI18n()

useSeoMeta({
  title: () => title,
  description: () => description ?? t('site.identity.statement'),
})
</script>

<template>
  <div class="site-container">
    <main class="site-content page-content">
      <header class="page-header">
        <h1 class="page-title">
          <span class="page-title-origin">
            <NuxtLink to="/" class="name-link page-title-origin-link">{{
              siteConfig.identity.name
            }}</NuxtLink>
            <span aria-hidden="true"> / </span>
          </span>
          <span class="page-current-title">{{ title }}</span>
        </h1>
        <p v-if="description" class="page-description">
          {{ description }}
        </p>
      </header>

      <slot></slot>

      <footer class="page-footer">
        <p aria-hidden="true">––</p>
        <NuxtLink to="/" class="page-index-link">
          {{ t('ui.labels.index') }}
        </NuxtLink>
        <NuxtLink to="/" class="panel-close-link">
          {{ t('ui.actions.closePanel') }}
        </NuxtLink>
        <SettingsSection />
      </footer>
    </main>
  </div>
</template>

<style scoped>
.page-content {
  container-type: inline-size;
  padding-bottom: 2rem;
}

.page-header,
.page-footer {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.page-header {
  gap: 1rem;
  margin-bottom: 4rem;
}

.page-header > *,
.page-footer > * {
  margin: 0;
}

.page-title {
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
}

.page-current-title {
  font-weight: 700;
}

.page-description {
  color: var(--theme-text-soft);
}

.page-footer {
  gap: 1rem;
  margin-top: 5rem;
}

.panel-close-link {
  display: none;
}

.page-index-link::before,
.panel-close-link::before {
  display: inline-block;
  margin-right: 0.25rem;
  text-decoration: none;
}

.page-index-link::before {
  content: '←';
}

.panel-close-link::before {
  content: '×';
}

@media (max-width: 700px) {
  .page-header {
    margin-bottom: 3rem;
  }

  .page-footer {
    margin-top: 4rem;
  }
}
</style>
