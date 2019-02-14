<template>
  <q-layout> <!-- Be sure to play with the Layout demo on docs -->

    <!-- (Optional) The Header -->
    <q-layout-header>
      <q-toolbar
          color="primary"
          :inverted="$q.theme === 'ios'"
        >
          <q-btn
            flat
            dense
            round
            @click="$router.go(-1)"
            aria-label="Close"
          >
            <q-icon name="close" />
          </q-btn>

          <q-toolbar-title>
            New Post
          </q-toolbar-title>
        </q-toolbar>
    </q-layout-header>

    <q-page-container>
      <!-- This is where pages get injected -->
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  name: 'NewPostLayout',
  data() {
    return {
    };
  },
};
</script>

<style>
</style>
