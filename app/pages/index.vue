<script setup lang="ts">
const { content, text } = useSiteContent()

const primaryLinks = [
  {
    label: content.labels.moreAndContact,
    href: '/about',
    external: false,
  },
]

useSeoMeta({
  title: () => text(content.labels.index),
  description: () => text(content.identity.statement),
  ogTitle: content.identity.name,
  ogDescription: () => text(content.identity.statement),
  ogType: 'website',
})
</script>

<template>
  <div class="site-container home-container">
    <main class="site-content home-content">
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

      <nav aria-label="secciones principales" class="home-navigation">
        <section v-for="item in content.navigation" :key="item.id">
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
    </main>
  </div>
</template>
