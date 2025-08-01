<template>
  <div class="summary-container">
    <h1 class="name">Josué Amador-Rojas</h1>
    <p>{{ $t('profession') }}</p>
    <p>{{ $t('ocupation') }}</p>
  </div>
</template>

<style scoped>
.name {
  font-weight: bold;
}

h1,
p {
  font-size: inherit;
  line-height: inherit;
  margin: inherit;
}

.summary-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
}
</style>
