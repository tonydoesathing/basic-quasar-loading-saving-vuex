<template>
    <q-page padding>
      <q-list highlight separator v-if="loadedFiles">
        <q-item v-for="(p, index) in posts" :key="index"
        @click.native="$router.push({ name: 'Post', params: { id: p } })">
          <q-item-main :label="p"/>
        </q-item>
      </q-list>
    </q-page>
</template>

<script>
export default {
  name: 'Home',
  computed: {
    posts() {
      return this.$store.state.posts;
    },
    loadedFiles() {
      return this.$store.state.loadedFiles;
    },
  },
};
// { name: 'Post', params: { id: p } }
/* <q-list highlight>
        <q-item v-for="(p, index) in posts" :key="index"
        @click.native="$router.push({ name: 'Post', params: { id: p } })">
          <q-item-main :label="p"/>
        </q-item>
      </q-list>
*/
</script>

<style>
</style>
