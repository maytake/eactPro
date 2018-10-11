
import { Resource, addResource } from '@/services/getApi';

export default {
  namespace: 'resource',

  state: {
    dataSource: []
  },

  effects: {
    *fetchResource({ payload }, { call, put }) {
      const response = yield call(Resource, payload);
      yield put({
        type: 'queryList',
        payload: response
      });
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addResource, payload);
      yield put({
        type: 'queryList',
        payload: response,
      });
      if (callback) callback();
    },
  },

  reducers: {
    queryList(state, {payload}) {
      return {
        ...state,
        dataSource:payload
      };
    },
  },
};