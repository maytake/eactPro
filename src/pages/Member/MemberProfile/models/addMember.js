
import { Login } from '@/services/getApi';

export default {
  namespace: 'addmember',

  state: {
    Introduction: []
  },

  effects: {
    *fetchData({ payload }, { call, put }) {
      const response = yield call(Login,payload);
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
