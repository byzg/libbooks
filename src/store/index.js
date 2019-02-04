import Vue from 'vue';
import Vuex from 'vuex';

import bookshelves from './bookshelves';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    bookshelves,
  },
});
