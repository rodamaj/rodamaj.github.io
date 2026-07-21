<script setup lang="ts">
const { content, text } = useSiteContent()
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
    :title="content.pages.about.title"
    :description="content.pages.about.description"
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
              >{{ text(link.label) }}</a
            >
          </template>
        </p>
      </section>
    </div>
  </PageShell>
</template>
