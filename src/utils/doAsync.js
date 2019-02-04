import axios from 'axios';
import _ from 'lodash';

const BASE_URL = 'https://cors-anywhere.herokuapp.com/http://my-lib.ru/api';
const ACTION_TYPES = ['REQUEST', 'SUCCESS', 'FAILURE'];

export const createActionTypes = preActionType => (
  _.fromPairs(ACTION_TYPES.map(type => [type, `${preActionType}_${type}`]))
);

export const typedMutations = (actionTypes, extend = {}) => ({
  ..._.fromPairs(_.map(actionTypes, typeValue => [typeValue, _.noop])),
  ...extend,
});

const doAsync = (store, { path, types }) => {
  store.commit(types.REQUEST);

  axios(`${BASE_URL}/${path}`, {})
    .then((response) => {
      store.commit(types.SUCCESS, response);
    })
    .catch(() => {
      store.commit(types.FAILURE);
    });
};

export default doAsync;
