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
            aria-label="Menu"
          >
            <q-icon name="menu" />
          </q-btn>

          <q-toolbar-title>
            Quasar App
          </q-toolbar-title>
        </q-toolbar>
    </q-layout-header>
    <q-page-container>
      <!-- This is where pages get injected -->
      <q-page padding>
        <h2>{{$route.params.id}}</h2>
      </q-page>
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  // name: 'PageName',
};
</script>

<style>
</style>
