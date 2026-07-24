<script setup lang="ts">
const { panel = false } = defineProps<{
  panel?: boolean
}>()

const { content, text } = useSiteContent()
const visibleNavigation = content.navigation.filter((item) => item.visible)

const primaryLinks = [
  {
    label: content.labels.moreAndContact,
    href: '/about',
  },
]
</script>

<template>
  <div
    class="site-container home-container"
    :role="panel ? 'complementary' : 'main'"
    :aria-label="panel ? text(content.labels.index) : undefined"
  >
    <div class="site-content home-content">
      <header class="home-intro">
        <h1>{{ content.identity.name }}</h1>
        <p>{{ text(content.identity.role) }}</p>
        <p>{{ text(content.identity.statement) }}</p>

        <p>
          <NuxtLink
            v-for="link in primaryLinks"
            :key="link.href"
            :to="link.href"
            class="forward-link"
          >
            {{ text(link.label) }}
          </NuxtLink>
        </p>
      </header>

      <p class="separator" aria-hidden="true">––</p>

      <nav aria-label="Secciones principales" class="home-navigation">
        <section v-for="item in visibleNavigation" :key="item.id">
          <h2>
            <NuxtLink :to="item.href" class="forward-link">{{
              text(item.label)
            }}</NuxtLink>
          </h2>
          <p>{{ text(item.description) }}</p>
        </section>
      </nav>

      <p class="separator" aria-hidden="true">––</p>

      <footer class="home-footer">
        <SettingsSection />
      </footer>
    </div>
  </div>
</template>
