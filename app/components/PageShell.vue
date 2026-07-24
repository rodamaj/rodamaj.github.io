<script setup lang="ts">
import type { LocalizedText } from '~/content/site'

const { title, description = undefined } = defineProps<{
  title: LocalizedText
  description?: LocalizedText
}>()

const { content, text } = useSiteContent()

useSeoMeta({
  title: () => text(title),
  description: () =>
    description ? text(description) : text(content.identity.statement),
})
</script>

<template>
  <div class="site-container">
    <main class="site-content page-content">
      <header class="page-header">
        <h1 class="page-title">
          <span class="page-title-origin">
            <NuxtLink to="/" class="name-link page-title-origin-link">{{
              content.identity.name
            }}</NuxtLink>
            <span class="page-title-origin-text">{{
              content.identity.name
            }}</span>
            <span aria-hidden="true"> / </span>
          </span>
          {{ text(title) }}
        </h1>
        <p v-if="description" class="page-description">
          {{ text(description) }}
        </p>
      </header>

      <slot></slot>

      <footer class="page-footer">
        <p aria-hidden="true">––</p>
        <NuxtLink to="/" class="page-index-link">
          {{ text(content.labels.index) }}
        </NuxtLink>
        <NuxtLink to="/" class="panel-close-link">
          {{ text(content.labels.closePanel) }}
        </NuxtLink>
        <SettingsSection />
      </footer>
    </main>
  </div>
</template>
