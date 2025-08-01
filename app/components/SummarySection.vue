<script setup lang="ts">
import PlainTextSection from './PlainTextSection.vue'
</script>

<template>
  <PlainTextSection>
    <h1 class="name">Josué Amador-Rojas</h1>
    <p>{{ $t('profession') }}</p>
    <p>{{ $t('ocupation') }}</p>
  </PlainTextSection>
</template>

<style scoped>
.name {
  font-weight: bold;
}
</style>
