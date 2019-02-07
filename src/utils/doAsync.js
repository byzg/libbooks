import axios from 'axios';
import _ from 'lodash';
import humps from 'humps';

const BASE_URL = 'https://cors-anywhere.herokuapp.com/http://my-lib.ru/api';
const ACTION_TYPES = ['REQUEST', 'SUCCESS', 'FAILURE'];

export const createActionTypes = preActionType => (
  _.fromPairs(ACTION_TYPES.map(type => [type, `${preActionType}_${type}`]))
);

export const typedMutations = (actionTypes, extend = {}) => ({
  ..._.fromPairs(_.map(actionTypes, typeValue => [typeValue, _.noop])),
  ...extend,
});

const doAsync = (store, { path, types, params }) => {
  store.commit(types.REQUEST, { params });

  return axios.get(`${BASE_URL}${path}`, { params })
    .then((response) => {
      store.commit(types.SUCCESS, humps.camelizeKeys({ ...response, ...params }));
    })
    .catch(() => {
      store.commit(types.FAILURE);
    });
};

export default doAsync;
