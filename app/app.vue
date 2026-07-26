<script setup lang="ts">
import { getRouteLayoutState } from '~/utils/routeLayout'

const localeHead = useLocaleHead()
const colorMode = useColorMode()
const route = useRoute()
const isHydrated = ref(false)

const routeLayout = computed(() => getRouteLayoutState(route.path))

onMounted(() => {
  isHydrated.value = true
})

useHead(() => {
  const direction = localeHead.value.htmlAttrs?.dir

  return {
    htmlAttrs: {
      lang: localeHead.value.htmlAttrs?.lang,
      dir:
        direction === 'ltr' || direction === 'rtl' || direction === 'auto'
          ? direction
          : undefined,
    },
    link: localeHead.value.link,
    meta: [
      ...(localeHead.value.meta ?? []),
      {
        name: 'theme-color',
        content: colorMode.value === 'dark' ? '#0f1419' : '#f6f2e8',
      },
    ],
  }
})
</script>

<template>
  <div class="app" :data-hydrated="isHydrated">
    <NuxtRouteAnnouncer />

    <div
      v-if="routeLayout.hasHomeContext"
      class="context-view"
      :class="{ 'has-panel': routeLayout.hasPanel }"
    >
      <HomeView :panel="routeLayout.hasPanel" />

      <Transition name="side-panel">
        <div v-show="routeLayout.hasPanel" class="side-panel">
          <div class="side-panel-scroll">
            <NuxtPage />
          </div>
        </div>
      </Transition>
    </div>

    <NuxtPage v-else />
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
}

.context-view,
.side-panel {
  min-height: 100dvh;
}

.context-view.has-panel > :deep(.home-container) {
  display: none;
}

.side-panel {
  width: 100%;
}

.side-panel-scroll {
  min-height: 100dvh;
}

.side-panel-scroll > :deep(.site-container) {
  width: 100%;
}

@media (min-width: 1200px) {
  .context-view {
    display: flex;
    align-items: flex-start;
    overflow-x: clip;
  }

  .context-view.has-panel {
    height: 100dvh;
    min-height: 0;
    overflow: hidden;
  }

  .context-view > :deep(.home-container) {
    flex: 0 0 100%;
    transition: flex-basis 450ms cubic-bezier(0.22, 1, 0.36, 1);
  }

  .context-view.has-panel > :deep(.home-container) {
    display: flex;
    flex-basis: 50%;
    height: 100dvh;
    min-height: 0;
    align-items: flex-start;
    overflow-y: auto;
    overscroll-behavior-y: contain;
  }

  .context-view.has-panel > :deep(.home-container > .home-content) {
    margin-block: auto;
  }

  .side-panel {
    position: relative;
    flex: 0 0 50%;
    width: auto;
    height: 100dvh;
    min-height: 0;
    overflow: hidden;
  }

  .side-panel-scroll {
    height: 100%;
    min-height: 0;
    overflow-y: auto;
    overscroll-behavior-y: contain;
  }

  .side-panel::before {
    position: absolute;
    top: 4rem;
    bottom: 4rem;
    left: 0;
    width: 1px;
    background: var(--theme-divider);
    content: '';
  }

  .side-panel-enter-active,
  .side-panel-leave-active {
    transition:
      opacity 320ms ease,
      transform 450ms cubic-bezier(0.22, 1, 0.36, 1);
  }

  .side-panel-enter-from,
  .side-panel-leave-to {
    opacity: 0;
    transform: translateX(3rem);
  }

  .context-view .side-panel :deep(.page-title-origin-link),
  .context-view .side-panel :deep(.page-index-link),
  .context-view .side-panel :deep(.page-footer .settings-section) {
    display: none;
  }

  .context-view .side-panel :deep(.page-title-origin-text),
  .context-view .side-panel :deep(.panel-close-link) {
    display: inline;
  }
}

@media (prefers-reduced-motion: reduce) {
  .context-view > :deep(.home-container),
  .side-panel-enter-active,
  .side-panel-leave-active {
    transition: none;
  }
}
</style>
