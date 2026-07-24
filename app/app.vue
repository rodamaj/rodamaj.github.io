<script setup lang="ts">
const localeHead = useLocaleHead()
const colorMode = useColorMode()
const route = useRoute()

const panelRoutes = new Set(['/about', '/science', '/engineering'])
const isIndex = computed(() => route.path === '/')
const hasPanel = computed(() => panelRoutes.has(route.path))
const hasHomeContext = computed(() => isIndex.value || hasPanel.value)

useHead(() => ({
  htmlAttrs: {
    lang: localeHead.value.htmlAttrs?.lang,
    dir: localeHead.value.htmlAttrs?.dir,
  },
  link: localeHead.value.link,
  meta: [
    ...(localeHead.value.meta ?? []),
    {
      name: 'theme-color',
      content: colorMode.value === 'dark' ? '#0f1419' : '#f6f2e8',
    },
  ],
}))
</script>

<template>
  <div class="app">
    <NuxtRouteAnnouncer />

    <div
      v-if="hasHomeContext"
      class="context-view"
      :class="{ 'has-panel': hasPanel }"
    >
      <HomeView :panel="hasPanel" />

      <Transition name="side-panel">
        <div v-show="hasPanel" class="side-panel">
          <div class="side-panel-scroll">
            <NuxtPage />
          </div>
        </div>
      </Transition>
    </div>

    <NuxtPage v-else />
  </div>
</template>
