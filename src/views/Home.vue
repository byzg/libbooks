<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'home',
  methods: {
    ...mapActions({
      receiveBookshelves: 'bookshelves/receive',
    }),
  },
  mounted() {
    this.receiveBookshelves();
  },
  components: {
    HelloWorld,
  },
};
</script>
