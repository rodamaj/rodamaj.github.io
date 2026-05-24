<script setup lang="ts">
const localeHead = useLocaleHead()
const colorMode = useColorMode()

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
    <NuxtPage />
  </div>
</template>
