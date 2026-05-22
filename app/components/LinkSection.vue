<script setup lang="ts">
import PlainTextSection from './PlainTextSection.vue'
</script>

<template>
  <PlainTextSection>
    <a href="mailto:bjamadorr@gmail.com" class="contact-link"
      >bjamadorr@gmail.com</a
    >
    <a
      href="https://www.linkedin.com/in/rodamaj/"
      target="_blank"
      rel="noreferrer"
      :aria-label="`LinkedIn, ${$t('opens-in-new-tab-label')}`"
      class="contact-link"
      >LinkedIn</a
    >
    <a
      href="https://www.github.com/rodamaj"
      target="_blank"
      rel="noreferrer"
      :aria-label="`GitHub, ${$t('opens-in-new-tab-label')}`"
      class="contact-link"
      >GitHub</a
    >
    <a
      href="https://www.instagram.com/rodamaj"
      target="_blank"
      rel="noreferrer"
      :aria-label="`Instagram, ${$t('opens-in-new-tab-label')}`"
      class="contact-link"
      >Instagram</a
    >
    <a
      href="/public-assets/cv/jar_cv_es.pdf"
      target="_blank"
      :aria-label="`${$t('es-cv-label')}, ${$t('opens-in-new-tab-label')}`"
      class="cv-link"
      >{{ $t('es-cv-label') }}</a
    >
    <a
      href="/public-assets/cv/jar_cv_en.pdf"
      target="_blank"
      :aria-label="`${$t('en-cv-label')}, ${$t('opens-in-new-tab-label')}`"
      class="cv-link"
      >{{ $t('en-cv-label') }}</a
    >
  </PlainTextSection>
</template>

<style scoped>
a::after {
  content: '↗';
  display: inline-block;
  text-decoration: none;
  margin-left: 0.25rem;
  opacity: 0.75;
  font-size: 0.8rem;
}
</style>
