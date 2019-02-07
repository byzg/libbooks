import _ from 'lodash';

import doAsync, { createActionTypes, typedMutations } from '../utils/doAsync';

const RECEIVE = createActionTypes('RECEIVE');

export default {
  namespaced: true,
  state: {
    list: {},
  },
  mutations: {
    ...typedMutations(RECEIVE, {
      [RECEIVE.SUCCESS](state, payload) {
        const { data, user } = payload;
        state.list = {
          ..._.keyBy(
            data.map(shelf => ({
              ...shelf,
              slug: shelf.slug.substr(1),
              sorts: [
                {
                  title: 'По дате добавления',
                  name: 'created',
                },
                {
                  title: 'По названию',
                  name: 'work__default_edition__title',
                },
                {
                  title: 'По общему рейтингу',
                  name: 'work__rating_score',
                },
              ],
            })),
            'slug',
          ),
          reader1: {
            slug: 'reader1',
            name: 'Прочитано',
            user,
            sorts: [
              {
                title: 'По ID',
                name: 'id',
              },
              {
                title: 'По оценке',
                name: 'score',
              },
            ],
          },
        };
      },
    }),
  },
  actions: {
    receive(store, user) {
      return doAsync(store, {
        types: RECEIVE,
        path: '/userbooks/bookshelf',
        params: {
          user,
        },
      });
    },
  },
};
