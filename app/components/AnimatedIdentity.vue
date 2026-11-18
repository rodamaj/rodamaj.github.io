<script setup lang="ts">
const props = defineProps<{ name: string }>()

const root = ref<HTMLElement | null>(null)
const ready = ref(false)
const wordWidth = ref(0)
const positions = ref<Record<string, string>[]>([])
const characters = computed(() => [...props.name])
// Reuse these seven glyphs from the alias through to their final positions.
const baseIndices = [11, 10, 9, 8, 7, 6, 0]
const stages = [baseIndices, [0, null, 6, 7, 8, 9, 10, 11]]
let observer: ResizeObserver | undefined
let disposed = false

const measure = () => {
  const element = root.value
  if (!element) return
  const origin = element.getBoundingClientRect().left
  const layouts = [
    ...element.querySelectorAll<HTMLElement>('.identity-measure'),
  ]
  const coordinates = layouts.map((layout) => {
    const result = new Map<number, number>()
    for (const glyph of layout.querySelectorAll<HTMLElement>('[data-index]')) {
      result.set(
        Number(glyph.dataset.index),
        glyph.getBoundingClientRect().left - origin
      )
    }
    return result
  })
  const final = coordinates[2]
  if (!final) return

  const width = layouts[0]?.getBoundingClientRect().width ?? 0
  wordWidth.value = width
  positions.value = characters.value.map((_, index) => {
    const finalX = final.get(index) ?? 0
    const glyph = layouts[2]?.querySelector<HTMLElement>(
      `[data-index="${index}"]`
    )
    const glyphWidth = glyph?.getBoundingClientRect().width ?? 0
    const mirror = (x: number) => `${width - x - glyphWidth}px`
    const anchor = index < 6 ? 0 : 11
    const startX = coordinates[1]?.get(anchor) ?? 0
    return {
      '--start': `${coordinates[0]?.get(index) ?? 0}px`,
      '--ordered': mirror(coordinates[1]?.get(index) ?? startX),
      '--final': mirror(finalX),
    }
  })
  ready.value = true
}

onMounted(async () => {
  await document.fonts.ready
  if (disposed) return
  measure()
  observer = new ResizeObserver(measure)
  if (root.value) observer.observe(root.value)
})

onBeforeUnmount(() => {
  disposed = true
  observer?.disconnect()
})
</script>

<template>
  <h1 ref="root" class="animated-identity" :class="{ 'is-ready': ready }">
    <span class="sr-only">{{ name }}</span>
    <span class="identity-fallback" aria-hidden="true">
      <span v-for="(character, index) in characters" :key="index">{{
        character === ' ' ? '\u00a0' : character
      }}</span>
    </span>
    <span
      class="identity-animation"
      :style="{ width: `${wordWidth}px` }"
      aria-hidden="true"
    >
      <span
        v-for="(character, index) in characters"
        :key="index"
        class="identity-glyph"
        :class="
          baseIndices.includes(index) ? 'identity-base' : 'identity-extra'
        "
        :data-index="index"
        :style="positions[index]"
        ><span class="identity-face">{{
          character === ' ' ? '\u00a0' : character
        }}</span></span
      >
    </span>
    <span
      v-for="(stage, stageIndex) in stages"
      :key="stageIndex"
      class="identity-measure"
      aria-hidden="true"
    >
      <span
        v-for="(index, slot) in stage"
        :key="slot"
        :data-index="index ?? undefined"
        >{{ index === null ? '\u00a0' : characters[index] }}</span
      >
    </span>
    <span class="identity-measure" aria-hidden="true">
      <span
        v-for="(character, index) in characters"
        :key="index"
        :data-index="index"
        >{{ character === ' ' ? '\u00a0' : character }}</span
      >
    </span>
  </h1>
</template>

<style scoped>
.animated-identity {
  position: relative;
  margin: 0;
  font: inherit;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.5;
}

.identity-fallback,
.identity-measure {
  display: inline-flex;
  white-space: pre;
}

.identity-measure {
  position: absolute;
  top: 0;
  left: 0;
  visibility: hidden;
  pointer-events: none;
}

.identity-animation {
  position: absolute;
  top: 0;
  left: 0;
  height: 1.5em;
  display: none;
  animation: rotate-alias 5.6s cubic-bezier(0.45, 0, 0.2, 1) both;
}

.is-ready .identity-fallback {
  visibility: hidden;
}

.is-ready .identity-animation {
  display: block;
}

.identity-glyph {
  position: absolute;
  top: 0;
  left: 0;
  white-space: pre;
  animation: move-glyph 5.6s cubic-bezier(0.45, 0, 0.2, 1) both;
}

.identity-face {
  display: block;
  animation: unmirror-letter 5.6s cubic-bezier(0.45, 0, 0.2, 1) both;
}

.identity-extra .identity-face {
  animation: none;
  transform: rotateY(180deg);
}

.identity-base {
  z-index: 2;
  background: var(--theme-bg);
}

.identity-extra {
  z-index: 1;
  animation: emerge-glyph 5.6s cubic-bezier(0.45, 0, 0.2, 1) both;
}

@keyframes rotate-alias {
  0%,
  14% {
    transform: rotateY(0deg);
  }
  30%,
  100% {
    transform: rotateY(180deg);
  }
}

@keyframes unmirror-letter {
  0%,
  38% {
    transform: rotateY(0deg);
  }
  52%,
  100% {
    transform: rotateY(180deg);
  }
}

@keyframes move-glyph {
  0%,
  60% {
    transform: translateX(var(--start));
  }
  74%,
  80% {
    transform: translateX(var(--ordered));
  }
  100% {
    transform: translateX(var(--final));
  }
}

@keyframes emerge-glyph {
  0%,
  80% {
    transform: translateX(var(--ordered));
    clip-path: inset(0 100% 0 0);
  }
  100% {
    transform: translateX(var(--final));
    clip-path: inset(0 0 0 0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .is-ready .identity-fallback {
    visibility: visible;
  }

  .is-ready .identity-animation {
    display: none;
  }

  .identity-animation,
  .identity-face,
  .identity-glyph {
    animation: none;
  }
}
</style>
