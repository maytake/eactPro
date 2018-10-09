
import { queryTest } from '@/services/api';

export default {
  namespace: 'resource',

  state: {
    data: []
  },

  effects: {
    *fetchBasic({ payload }, { call, put }) {
      const response = yield call(queryTest, payload);
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