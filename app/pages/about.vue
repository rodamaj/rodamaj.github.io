<script setup lang="ts">
const { content, text } = useSiteContent()

const contactLinks = [
  content.links.personalEmail,
  content.links.academicEmail,
  content.links.github,
  content.links.linkedin,
  content.links.instagram,
]

const resumeLinks = [content.links.cvEs, content.links.cvEn]
</script>

<template>
  <PageShell
    :title="content.pages.about.title"
    :description="content.pages.about.description"
  >
    <div class="text-sections about-sections">
      <section>
        <p v-for="paragraph in content.about.biography" :key="text(paragraph)">
          {{ text(paragraph) }}
        </p>
      </section>

      <section>
        <h2>{{ text(content.about.sections.education) }}</h2>
        <ol class="education-list">
          <li
            v-for="item in content.about.education"
            :key="`${text(item.date)}-${text(item.program)}`"
          >
            <p>{{ text(item.date) }}</p>
            <p>{{ text(item.program) }}</p>
            <p>{{ item.institution }}</p>
          </li>
        </ol>
      </section>

      <section>
        <h2>{{ text(content.about.sections.interests) }}</h2>
        <p>{{ text(content.about.interests) }}</p>
      </section>

      <section>
        <h2>{{ text(content.about.sections.contact) }}</h2>
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
        <h2>{{ text(content.about.sections.resumes) }}</h2>
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

      <section>
        <h2>{{ text(content.about.sections.academicProfiles) }}</h2>
        <p class="placeholder">
          {{ text(content.about.academicProfilesPlaceholder) }}
        </p>
      </section>
    </div>
  </PageShell>
</template>
