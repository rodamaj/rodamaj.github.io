<script setup lang="ts">
const localeHead = useLocaleHead()

useHead(() => ({
  htmlAttrs: {
    lang: localeHead.value.htmlAttrs?.lang,
    dir: localeHead.value.htmlAttrs?.dir,
  },
  link: localeHead.value.link,
  meta: localeHead.value.meta,
}))
</script>

<template>
  <div class="app">
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>
