import { Resource, AddResource, getUserUpdate, RemoveResource } from '@/services/getApi';

export default {
  namespace: 'resource',

  state: {
    updateResult:{},
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
    *getUpdate({ payload, callback }, { call, put }) {
      const response = yield call(getUserUpdate, payload);
      yield put({
        type: 'getUpdateList',
        payload: response,
      });
      if (callback) callback(response);
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
    getUpdateList(state, { payload }) {
      return {
        ...state,
        updateResult: payload,
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
