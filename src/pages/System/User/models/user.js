
import { queryHomeDec } from '@/services/api';

export default {
  namespace: 'userManagement',

  state: {
    data: []
  },

  effects: {
    *fetchBasic(_, { call, put }) {
      const response = yield call(queryHomeDec);
      yield put({
        type: 'show',
        payload: response
      });
    },

  },

  reducers: {
    show(state, {payload}) {
      return {
        ...state,
        data:payload
      };
    },
  },
};