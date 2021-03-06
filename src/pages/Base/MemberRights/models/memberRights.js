
import { queryMenus } from '@/services/getApi';

export default {
  namespace: 'memberRights',

  state: {
    Introduction: []
  },

  effects: {
    *fetchData({ payload }, { call, put }) {
      const response = yield call(queryMenus,payload);
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
