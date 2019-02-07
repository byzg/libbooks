import doAsync, { createActionTypes, typedMutations } from '../utils/doAsync';

const RECEIVE = createActionTypes('RECEIVE');

export default {
  namespaced: true,
  state: {
    bookshelf: null,
    groups: [],
  },
  mutations: {
    ...typedMutations(RECEIVE, {
      [RECEIVE.REQUEST](state, payload) {
        const { params: { bookshelf, page } } = payload;
        if (state.bookshelf !== bookshelf || page === 1) state.groups = [];
        state.bookshelf = bookshelf;
      },
      [RECEIVE.SUCCESS](state, payload) {
        state.groups = [...state.groups, payload.data];
      },
    }),
  },
  actions: {
    receive(store, {
      userId: user, bookshelfId: bookshelf, page = 1, sort,
    }) {
      const attrs = bookshelf ? {
        path: '/userbooks/',
        params: {
          user,
          bookshelf,
          page,
          o: sort,
        },
      } : {
        path: '/rating/',
        params: {
          user,
          page,
          o: sort,
        },
      };
      return doAsync(store, {
        types: RECEIVE,
        ...attrs,
      });
    },
  },
};
