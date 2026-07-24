<script setup lang="ts">
import { getRouteLayoutState } from '~/utils/routeLayout'

const localeHead = useLocaleHead()
const colorMode = useColorMode()
const route = useRoute()

const routeLayout = computed(() => getRouteLayoutState(route.path))

useHead(() => {
  const direction = localeHead.value.htmlAttrs?.dir

  return {
    htmlAttrs: {
      lang: localeHead.value.htmlAttrs?.lang,
      dir:
        direction === 'ltr' || direction === 'rtl' || direction === 'auto'
          ? direction
          : undefined,
    },
    link: localeHead.value.link,
    meta: [
      ...(localeHead.value.meta ?? []),
      {
        name: 'theme-color',
        content: colorMode.value === 'dark' ? '#0f1419' : '#f6f2e8',
      },
    ],
  }
})
</script>

<template>
  <div class="app">
    <NuxtRouteAnnouncer />

    <div
      v-if="routeLayout.hasHomeContext"
      class="context-view"
      :class="{ 'has-panel': routeLayout.hasPanel }"
    >
      <HomeView :panel="routeLayout.hasPanel" />

      <Transition name="side-panel">
        <div v-show="routeLayout.hasPanel" class="side-panel">
          <div class="side-panel-scroll">
            <NuxtPage />
          </div>
        </div>
      </Transition>
    </div>

    <NuxtPage v-else />
  </div>
</template>
