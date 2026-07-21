<script setup lang="ts">
const { content, text } = useSiteContent()
</script>

<template>
  <PageShell
    :title="content.pages.music.title"
    :description="content.pages.music.description"
  >
    <div class="text-sections">
      <section>
        <h2>{{ text(content.music.recentTitle) }}</h2>
        <div v-if="content.music.recentEntries.length">
          <article
            v-for="entry in content.music.recentEntries"
            :key="`${entry.artist}-${entry.title}`"
          >
            <p>{{ entry.artist }} — {{ entry.title }}</p>
            <p v-if="entry.note">{{ text(entry.note) }}</p>
          </article>
        </div>
        <p v-else class="placeholder pre-line">
          {{ text(content.music.recentPlaceholder) }}
        </p>
      </section>

      <section>
        <h2>{{ text(content.music.returningTitle) }}</h2>
        <div v-if="content.music.returningEntries.length">
          <p
            v-for="entry in content.music.returningEntries"
            :key="`${entry.artist}-${entry.title}`"
          >
            {{ entry.artist }} — {{ entry.title
            }}<template v-if="entry.year">, {{ entry.year }}</template>
          </p>
        </div>
        <p v-else class="placeholder">
          {{ text(content.music.returningPlaceholder) }}
        </p>
      </section>
    </div>
  </PageShell>
</template>
