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
            @click="leftDrawer = !leftDrawer"
            aria-label="Menu"
          >
            <q-icon name="menu" />
          </q-btn>

          <q-toolbar-title>
            Home
          </q-toolbar-title>
        </q-toolbar>
    </q-layout-header>

    <q-layout-drawer
        v-model="leftDrawer"
        :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
      >
        <q-list
          no-border
          link
          inset-delimiter
        >
          <q-list-header>Essential Links</q-list-header>
          <q-item>
            <q-item-side icon="school" />
            <q-item-main label="Docs" sublabel="quasar-framework.org" />
          </q-item>
          <q-item >
            <q-item-side icon="code" />
            <q-item-main label="GitHub" sublabel="github.com/quasarframework" />
          </q-item>
          <q-item >
            <q-item-side icon="chat" />
            <q-item-main label="Discord Chat Channel" sublabel="https://discord.gg/5TDhbDg" />
          </q-item>
          <q-item>
            <q-item-side icon="record_voice_over" />
            <q-item-main label="Forum" sublabel="forum.quasar-framework.org" />
          </q-item>
          <q-item >
            <q-item-side icon="rss feed" />
            <q-item-main label="Twitter" sublabel="@quasarframework" />
          </q-item>
        </q-list>
      </q-layout-drawer>
    <q-page-container>
      <!-- This is where pages get injected -->
      <router-view />
    </q-page-container>
    <q-btn
      round
      color="primary"
      @click="$router.push('NewPost')"
      class="fixed"
      icon="add"
      style="right: 18px; bottom: 18px"
    />
  </q-layout>
</template>

<script>
export default {
  name: 'HomeLayout',
  data() {
    return {
      leftDrawer: true,
    };
  },
};
</script>

<style>
</style>
