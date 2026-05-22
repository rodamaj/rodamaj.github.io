<template>
  <div class="plain-text-container">
    <slot></slot>
  </div>
</template>

<style scoped>
.plain-text-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  font-size: 1rem;
  line-height: 1.5;
}

.plain-text-container > * {
  color: inherit;
  font-size: inherit;
  line-height: inherit;
  margin: 0;
}
</style>
