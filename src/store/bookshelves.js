import doAsync, { createActionTypes, typedMutations } from '../utils/doAsync';

const RECEIVE = createActionTypes('RECEIVE');

export default {
  namespaced: true,
  state: {
    list: [],
  },
  mutations: {
    ...typedMutations(RECEIVE, {
      [RECEIVE.SUCCESS](state, payload) {
        state.list = payload.data;
      },
    }),
  },
  actions: {
    receive(store) {
      doAsync(store, {
        types: RECEIVE,
        path: '/userbooks/bookshelf/?user=1',
      });
    },
  },
};
