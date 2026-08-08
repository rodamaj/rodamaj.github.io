<script setup lang="ts">
import { siteConfig } from '~/config/site'

const { panel = false } = defineProps<{
  panel?: boolean
}>()

const { t } = useI18n()
const route = useRoute()
const visibleNavigation = siteConfig.navigation.filter((item) => item.visible)
const currentPath = computed(() =>
  route.path.length > 1 ? route.path.replace(/\/+$/, '') : route.path
)
const isCurrentPage = (href: string) => currentPath.value === href

const primaryLinks = [
  {
    labelKey: 'ui.labels.about',
    href: '/about',
  },
]
</script>

<template>
  <div
    class="site-container home-container"
    :role="panel ? 'complementary' : 'main'"
    :aria-label="panel ? t('ui.labels.index') : undefined"
  >
    <div class="site-content home-content">
      <header class="home-intro">
        <h1>{{ siteConfig.identity.name }}</h1>
        <p>{{ t('site.identity.role') }}</p>
        <p>{{ t('site.identity.statement') }}</p>

        <p>
          <template v-for="link in primaryLinks" :key="link.href">
            <span
              v-if="isCurrentPage(link.href)"
              class="current-page"
              aria-current="page"
            >
              {{ t(link.labelKey) }}
            </span>
            <NuxtLink v-else :to="link.href" class="forward-link">
              {{ t(link.labelKey) }}
            </NuxtLink>
          </template>
        </p>
      </header>

      <p class="separator" aria-hidden="true">––</p>

      <nav :aria-label="t('site.navigation.mainLabel')" class="home-navigation">
        <section v-for="item in visibleNavigation" :key="item.id">
          <h2>
            <span
              v-if="isCurrentPage(item.href)"
              class="current-page"
              aria-current="page"
            >
              {{ t(`site.navigation.${item.id}.label`) }}
            </span>
            <NuxtLink v-else :to="item.href" class="forward-link">
              {{ t(`site.navigation.${item.id}.label`) }}
            </NuxtLink>
          </h2>
          <p>{{ t(`site.navigation.${item.id}.description`) }}</p>
        </section>
      </nav>

      <p class="separator" aria-hidden="true">––</p>

      <footer class="home-footer">
        <SettingsSection />
      </footer>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  align-items: center;
}

.home-intro,
.home-navigation,
.home-footer {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
}

.home-intro > *,
.home-navigation > section > *,
.home-footer > * {
  margin: 0;
}

.home-intro h1,
.home-navigation h2 {
  font-size: 1rem;
  line-height: 1.5;
}

.home-intro h1 {
  font-weight: 700;
}

.current-page {
  font-weight: 700;
}

.home-navigation {
  gap: 1.5rem;
}

.home-navigation h2 {
  font-weight: 400;
}

.home-navigation section {
  display: grid;
  gap: 0.25rem;
}

.separator {
  margin: 2rem 0;
}
</style>
