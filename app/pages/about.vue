<script setup lang="ts">
const { t } = useI18n()
const { text } = useLocalizedText()
const { data: about } = await useAsyncData('about-content', () =>
  queryCollection('about').first()
)
const { data: links } = await useAsyncData('site-links', () =>
  queryCollection('links').first()
)

const contactLinks = computed(() =>
  links.value
    ? [
        links.value.personalEmail,
        links.value.academicEmail,
        links.value.github,
        links.value.linkedin,
        links.value.instagram,
      ]
    : []
)

const resumeLinks = computed(() =>
  links.value ? [links.value.cvEs, links.value.cvEn] : []
)
</script>

<template>
  <PageShell
    :title="t('site.pages.about.title')"
    :description="t('site.pages.about.description')"
  >
    <div v-if="about" class="text-sections about-sections">
      <section>
        <p v-for="paragraph in about.biography" :key="text(paragraph)">
          {{ text(paragraph) }}
        </p>
      </section>

      <section>
        <h2>{{ text(about.sections.education) }}</h2>
        <ol class="education-list">
          <li
            v-for="item in about.education"
            :key="`${text(item.date)}-${text(item.program)}`"
          >
            <p>{{ text(item.date) }}</p>
            <p>{{ text(item.program) }}</p>
            <p>{{ item.institution }}</p>
          </li>
        </ol>
      </section>

      <section>
        <h2>{{ text(about.sections.interests) }}</h2>
        <p>{{ text(about.interests) }}</p>
      </section>

      <section>
        <h2>{{ text(about.sections.contact) }}</h2>
        <p class="inline-links">
          <template v-for="(link, index) in contactLinks" :key="link.href">
            <span v-if="index" aria-hidden="true"> · </span>
            <a
              :href="link.href"
              :class="{ 'external-link': link.external }"
              :target="link.external ? '_blank' : undefined"
              :rel="link.external ? 'noreferrer' : undefined"
              :aria-label="
                link.external
                  ? `${text(link.label)}, ${t('ui.accessibility.opensInNewTab')}`
                  : undefined
              "
              >{{ text(link.label) }}</a
            >
          </template>
        </p>
      </section>

      <section>
        <h2>{{ text(about.sections.resumes) }}</h2>
        <p class="inline-links">
          <template v-for="(link, index) in resumeLinks" :key="link.href">
            <span v-if="index" aria-hidden="true"> · </span>
            <a
              :href="link.href"
              :class="{ 'external-link': link.external }"
              :target="link.external ? '_blank' : undefined"
              :rel="link.external ? 'noreferrer' : undefined"
              :aria-label="
                link.external
                  ? `${text(link.label)}, ${t('ui.accessibility.opensInNewTab')}`
                  : undefined
              "
              >{{ text(link.label) }}</a
            >
          </template>
        </p>
      </section>
    </div>
  </PageShell>
</template>

<style scoped>
.text-sections {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4rem;
}

.text-sections section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.text-sections section > * {
  margin: 0;
}

.text-sections h2 {
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.5;
}

.education-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.education-list li {
  display: grid;
  gap: 0.25rem;
}

.education-list p {
  margin: 0;
}

.education-list li p:first-child {
  color: var(--theme-text-soft);
}

.inline-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0 0.3rem;
}
</style>
