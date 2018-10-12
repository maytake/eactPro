
import { queryHomeDec } from '@/services/api';

export default {
  namespace: 'adminConfig',

  state: {
    Introduction: []
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
        Introduction:payload
      };
    },
  },
};