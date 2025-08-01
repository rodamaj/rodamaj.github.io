<script setup lang="ts"></script>

<template>
  <div class="main-container">
    <main class="content">
      <SummarySection />

      <p>––</p>

      <LinkSection />

      <p>––</p>

      <SettingsSection />
    </main>
  </div>
</template>

<style scoped>
.main-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100dvh;
  text-transform: lowercase;
}

@media (min-width: 700px) {
  .content {
    min-width: 600px;
  }
}

@media (max-width: 700px) {
  .main-container {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}
</style>
