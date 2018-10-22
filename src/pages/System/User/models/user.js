
import { Resource, AddResource, RemoveResource } from '@/services/getApi';

export default {
  namespace: 'userManagement',
  state: {
    dataSource: [],
    addResult: {},
    reomveResult: {},
  },

  effects: {
    *fetchResource({ payload }, { call, put }) {
      const response = yield call(Resource, payload);
      yield put({
        type: 'queryList',
        payload: response,
      });
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(AddResource, payload);
      yield put({
        type: 'addList',
        payload: response,
      });
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(RemoveResource, payload);
      yield put({
        type: 'removeList',
        payload: response,
      });
      if (callback) callback();
    },
  },

  reducers: {
    queryList(state, { payload }) {
      return {
        ...state,
        dataSource: payload,
      };
    },
    addList(state, { payload }) {
      return {
        ...state,
        addResult: payload,
      };
    },
    removeList(state, { payload }) {
      return {
        ...state,
        reomveResult: payload,
      };
    },
  },
};
