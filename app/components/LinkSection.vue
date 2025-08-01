<template>
  <div class="link-container">
    <a href="mailto:bjamadorr@gmail.com" class="contact-link"
      >bjamadorr@gmail.com</a
    >
    <a
      href="https://www.linkedin.com/in/rodamaj/"
      target="_blank"
      rel="noreferrer"
      class="contact-link"
      >LinkedIn</a
    >
    <a
      href="https://www.github.com/rodamaj"
      target="_blank"
      rel="noreferrer"
      class="contact-link"
      >GitHub</a
    >
    <a
      href="https://www.instagram.com/rodamaj"
      target="_blank"
      rel="noreferrer"
      class="contact-link"
      >Instagram</a
    >
    <a href="/public-assets/cv/jar_cv_es.pdf" target="_blank" class="cv-link">{{
      $t('es-cv-label')
    }}</a>
    <a href="/public-assets/cv/jar_cv_en.pdf" target="_blank" class="cv-link">{{
      $t('en-cv-label')
    }}</a>
  </div>
</template>

<style scoped>
.link-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
}

a {
  color: inherit;
  font-size: inherit;
  line-height: inherit;
  margin: inherit;
}

a::after {
  content: '↗';
  display: inline-block;
  text-decoration: none;
  margin-left: 0.25rem;
  opacity: 0.75;
  font-size: 0.8rem;
}
</style>
