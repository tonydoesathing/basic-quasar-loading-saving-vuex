<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App',
  created() {
    if (!this.$store.state.loadedFiles) {
      this.$store.dispatch('loadFiles');
    }
  },
};
</script>

<style>
</style>
