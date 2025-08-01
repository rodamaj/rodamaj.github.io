<script setup lang="ts">
const onLangSelected = (lang: string) => {
  console.log(`Language selected: ${lang}`)
}

const onThemeSelected = (theme: string) => {
  console.log(`Theme selected: ${theme}`)
}
</script>

<template>
  <div class="main-container">
    <main class="content">
      <h1 class="name">Josué Amador-Rojas</h1>
      <p>Ingeniero de software</p>
      <p>Estudiante de Ciencias de la Computación, Universidad de Costa Rica</p>

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
        <a href="/cv/jar_cv_es_v3.pdf" target="_blank" class="cv-link"
          >Currículo en español</a
        >
        <a href="/cv/jar_cv_en_v3.pdf" target="_blank" class="cv-link"
          >Currículo en inglés</a
        >
      </nav>

      <p>––</p>

      <div class="settings">
        <ToggleLink
          :links="[
            { label: 'en', id: 'en' },
            { label: 'es', id: 'es' },
          ]"
          @select="onLangSelected"
        />

        <ToggleLink
          :links="[
            { label: 'light', id: 'light' },
            { label: 'dark', id: 'dark' },
          ]"
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
  height: 100vh;
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
