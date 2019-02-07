import Vue from 'vue';
import Vuex from 'vuex';

import bookshelves from './bookshelves';
import books from './books';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    bookshelves,
    books,
  },
});
