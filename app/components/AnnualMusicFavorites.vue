<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { AnnualMusicFavorites } from '~/types/content'
import ToggleLink from '~/components/ToggleLink.vue'

const props = defineProps<{ years: AnnualMusicFavorites[] }>()
const { t } = useI18n()
const availableYears = computed(() =>
  props.years.map((entry) => entry.year).sort((a, b) => a - b)
)
const selectedYear = ref(availableYears.value[0] ?? 2020)
const selected = computed(() =>
  props.years.find((entry) => entry.year === selectedYear.value)
)
const rankings = computed(() => [
  {
    id: 'songs',
    title: t('site.music.annualSongs'),
    pending: t('site.music.pendingSong'),
    entries: selected.value?.songs ?? [],
  },
  {
    id: 'albums',
    title: t('site.music.annualAlbums'),
    pending: t('site.music.pendingAlbum'),
    entries: selected.value?.albums ?? [],
  },
])
const pending = computed(() =>
  rankings.value.some((list) => list.entries.length < 8)
)

watch(availableYears, (years) => {
  if (!years.includes(selectedYear.value) && years[0] !== undefined) {
    selectedYear.value = years[0]
  }
})
</script>

<template>
  <section
    v-if="availableYears.length"
    class="annual-favorites"
    aria-labelledby="annual-favorites-title"
  >
    <header class="annual-header">
      <h2 id="annual-favorites-title">{{ t('site.music.annualTitle') }}</h2>
      <p>{{ t('site.music.annualDescription') }}</p>
      <div class="year-control">
        <ToggleLink
          :aria-label="t('site.music.annualYear')"
          :links="
            availableYears.map((year) => ({
              id: String(year),
              label: String(year),
              ariaLabel: String(year),
            }))
          "
          :active-id="String(selectedYear)"
          @select="selectedYear = Number($event)"
        />
      </div>
      <p v-if="pending" class="annual-pending">
        {{ t('site.music.annualPending') }}
      </p>
    </header>

    <div class="annual-lists">
      <div
        v-for="ranking in rankings"
        :key="ranking.id"
        class="annual-category"
      >
        <h3 :id="`annual-${ranking.id}-title`">
          {{ ranking.title }} · {{ selectedYear }}
        </h3>
        <ol
          class="annual-ranking"
          :data-ranking="ranking.id"
          :aria-labelledby="`annual-${ranking.id}-title`"
        >
          <li
            v-for="rank in 8"
            :key="rank"
            :class="{ 'is-pending': !ranking.entries[rank - 1] }"
          >
            <template v-if="ranking.entries[rank - 1]">
              <p class="annual-entry-title">
                <cite>{{ ranking.entries[rank - 1]!.title }}</cite>
              </p>
              <p class="annual-entry-artist">
                {{ ranking.entries[rank - 1]!.artist }}
              </p>
            </template>
            <p v-else>{{ ranking.pending }}</p>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>

<style scoped>
.annual-favorites,
.annual-header,
.annual-category {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}

.annual-favorites {
  gap: 2rem;
}

h2,
h3,
p {
  margin: 0;
}

h2,
h3 {
  font-size: 1rem;
  line-height: 1.5;
}

.year-control :deep(.link-container) {
  gap: 0.5rem 0.875rem;
}

.annual-lists {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 2rem;
}

.annual-ranking {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-left: 1.75rem;
  margin: 0;
}

.annual-ranking li {
  padding-left: 0.25rem;
  overflow-wrap: anywhere;
}

.annual-pending,
.annual-entry-artist,
.is-pending {
  color: var(--theme-text-soft);
}

@media (max-width: 700px) {
  .annual-lists {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
