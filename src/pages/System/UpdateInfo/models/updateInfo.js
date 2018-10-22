
import { UpdateInfo } from '@/services/getApi';

export default {
  namespace: 'updateInfo',

  state: {
    information: []
  },

  effects: {
    *queryInfo(_, { call, put }) {
      const response = yield call(UpdateInfo);
      yield put({
        type: 'updateIF',
        payload: response
      });
    },
  },

  reducers: {
    updateIF(state, {payload}) {
      return {
        ...state,
        information:payload
      };
    },
  },
};
