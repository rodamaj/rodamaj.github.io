<script setup lang="ts">
definePageMeta({ i18n: false })
const { locale, locales, setLocale } = useI18n()
const colorMode = useColorMode()

const onLangSelected = (lang: string) => {
  setLocale(lang as 'en' | 'es')
}

const onThemeSelected = (theme: string) => {
  colorMode.preference = theme as 'light' | 'dark'
}
</script>

<template>
  <div class="main-container">
    <main class="content">
      <h1 class="name">Josué Amador-Rojas</h1>
      <p>{{ $t('profession') }}</p>
      <p>{{ $t('ocupation') }}</p>

      <p>––</p>

      <nav class="link-nav">
        <a href="mailto:bjamadorr@gmail.com" class="contact-link"
          >bjamadorr@gmail.com</a
        >
        <a
          href="https://www.linkedin.com/in/rodamaj/"
          target="_blank"
          class="contact-link"
          >LinkedIn</a
        >
        <a
          href="https://www.github.com/rodamaj"
          target="_blank"
          class="contact-link"
          >GitHub</a
        >
        <a
          href="https://www.instagram.com/rodamaj"
          target="_blank"
          class="contact-link"
          >Instagram</a
        >
        <a href="/cv/jar_cv_es_v3.pdf" target="_blank" class="cv-link">{{
          $t('es-cv-label')
        }}</a>
        <a href="/cv/jar_cv_en_v3.pdf" target="_blank" class="cv-link">{{
          $t('en-cv-label')
        }}</a>
      </nav>

      <p>––</p>

      <div class="settings">
        <ToggleLink
          :links="
            locales.map((locale) => ({ label: locale.code, id: locale.code }))
          "
          :active-id="locale"
          @select="onLangSelected"
        />

        <ToggleLink
          :links="[
            { label: $t('light-theme-label'), id: 'light' },
            { label: $t('dark-theme-label'), id: 'dark' },
          ]"
          :active-id="colorMode.preference"
          @select="onThemeSelected"
        />
      </div>
    </main>
  </div>
</template>

<style scoped>
.main-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100dvh;
}

@media (min-width: 700px) {
  .content {
    min-width: 600px;
  }
}

@media (max-width: 700px) {
  .main-container {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}

.content h1,
h2,
h3,
h4,
h5,
h6,
p {
  font-size: 1rem;
  line-height: 1.5;
}

.name {
  font-weight: bold;
}

.link-nav,
.settings {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
}

a {
  color: inherit;
}
</style>
