<script setup lang="ts">
const props = defineProps<{ name: string }>()

const root = ref<HTMLElement | null>(null)
const ready = ref(false)
const wordWidth = ref(0)
const positions = ref<Record<string, string>[]>([])
const cursorPositions = ref<Record<string, string>>({})
const typingOrder = [1, 2, 3, 4, 5, 12, 13, 14, 15, 16, 17]
const characters = computed(() => [...props.name])
// Reuse these seven glyphs from the alias through to their final positions.
const baseIndices = [11, 10, 9, 8, 7, 6, 0]
const stages = [baseIndices]
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
  const final = coordinates[1]
  if (!final) return

  const width = layouts[0]?.getBoundingClientRect().width ?? 0
  wordWidth.value = width
  positions.value = characters.value.map((_, index) => {
    const finalX = final.get(index) ?? 0
    const glyph = layouts[1]?.querySelector<HTMLElement>(
      `[data-index="${index}"]`
    )
    const glyphWidth = glyph?.getBoundingClientRect().width ?? 0
    const mirror = (x: number) => `${width - x - glyphWidth}px`
    return {
      '--start': `${coordinates[0]?.get(index) ?? 0}px`,
      '--tension': `${(coordinates[0]?.get(index) ?? 0) + (index === 0 ? 0.6 : -0.4)}px`,
      '--release': `${width - finalX - glyphWidth + (index === 0 ? 0.8 : -1.6)}px`,
      '--final': mirror(finalX),
      '--type-at': `${4.48 + (typingOrder.indexOf(index) + 1) * 0.12}s`,
    }
  })
  const cursorStops = [1, 2, 3, 4, 5, 12, 13, 14, 15, 16, 17]
  cursorPositions.value = Object.fromEntries(
    cursorStops.map((index, stop) => [
      `--cursor-${stop}`,
      `${final.get(index) ?? 0}px`,
    ])
  )
  cursorPositions.value['--cursor-end'] =
    `${layouts[1]?.getBoundingClientRect().width ?? 0}px`
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
      class="identity-cursor"
      :style="cursorPositions"
      aria-hidden="true"
    ></span>
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
  transform-origin: center;
  will-change: transform;
  animation: unmirror-letter 5.6s cubic-bezier(0.37, 0, 0.63, 1) both;
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
  transform: translateX(var(--final));
  animation: reveal-glyph 1ms steps(1, end) var(--type-at) both;
}

.identity-cursor {
  position: absolute;
  top: 0.15em;
  left: 0;
  height: 1.1em;
  border-left: 1px solid currentColor;
  opacity: 0;
  pointer-events: none;
  animation:
    cursor-position 2s steps(1, end) 4.48s both,
    cursor-window 2s steps(1, end) 4.48s forwards,
    cursor-blink 0.6s steps(1, end) 4.48s infinite;
}

@keyframes cursor-position {
  0% {
    transform: translateX(var(--cursor-0));
  }
  6% {
    transform: translateX(var(--cursor-1));
  }
  12% {
    transform: translateX(var(--cursor-2));
  }
  18% {
    transform: translateX(var(--cursor-3));
  }
  24% {
    transform: translateX(var(--cursor-4));
  }
  30% {
    transform: translateX(var(--cursor-5));
  }
  36% {
    transform: translateX(var(--cursor-6));
  }
  42% {
    transform: translateX(var(--cursor-7));
  }
  48% {
    transform: translateX(var(--cursor-8));
  }
  54% {
    transform: translateX(var(--cursor-9));
  }
  60% {
    transform: translateX(var(--cursor-10));
  }
  66%,
  100% {
    transform: translateX(var(--cursor-end));
  }
}

@keyframes cursor-window {
  0%,
  99.99% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    visibility: hidden;
  }
}

@keyframes cursor-blink {
  0%,
  100% {
    border-color: currentColor;
  }
  50% {
    border-color: transparent;
  }
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
  36% {
    transform: perspective(24em) rotateY(0deg);
  }
  56%,
  100% {
    transform: perspective(24em) rotateY(180deg);
  }
}

@keyframes move-glyph {
  0%,
  60% {
    transform: translateX(var(--start));
  }
  65%,
  67% {
    transform: translateX(var(--tension));
    animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  }
  70% {
    transform: translateX(var(--release));
    animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }
  75%,
  100% {
    transform: translateX(var(--final));
  }
}

@keyframes reveal-glyph {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .is-ready .identity-fallback {
    visibility: visible;
  }

  .identity-cursor,
  .is-ready .identity-animation {
    display: none;
  }

  .identity-cursor,
  .identity-animation,
  .identity-face,
  .identity-glyph {
    animation: none;
  }
}
</style>
