<script setup lang="ts">
import { siteConfig } from '~/config/site'
</script>

<template>
  <p class="copyright-notice">© 2021–2026 {{ siteConfig.identity.name }}</p>
</template>

<style scoped>
.copyright-notice {
  margin: 0;
  padding-top: 1.5rem;
  color: var(--theme-text-soft);
  font-size: inherit;
  line-height: inherit;
}
</style>
