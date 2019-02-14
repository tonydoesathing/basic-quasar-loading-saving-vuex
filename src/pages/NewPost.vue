<template>
  <q-page padding>
    <!-- content -->
    <q-input v-model="text" float-label="Post title" placeholder="title" />
    <q-btn
      dense
      round
      @click="addPost()"
      aria-label="Check"
    >
      <q-icon name="check" />
    </q-btn>
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
  data() {
    return {
      text: '',
    };
  },
  methods: {
    addPost() {
      this.$store.dispatch('addPost', this.text).then(() => {
        this.text = '';
        this.$router.go(-1);
      }).catch((err) => {
        console.log(err);
      });
    },
  },
};
</script>

<style>
</style>
