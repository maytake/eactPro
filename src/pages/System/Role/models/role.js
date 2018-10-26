import { getRoleList, AddRoleList, RemoveRoleList, getRoleUpdate } from '@/services/getApi';

export default {
  namespace: 'role',

  state: {
    updateResult:{},
    addResult: {},
    reomveResult: {},
    data: {},
  },

  effects: {
    *fetchData({ payload }, { call, put }) {
      const response = yield call(getRoleList, payload);
      yield put({
        type: 'queryList',
        payload: response,
      });
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(AddRoleList, payload);
      yield put({
        type: 'queryList',
        payload: response,
      });
      if (callback) callback(response);
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(RemoveRoleList, payload);
      yield put({
        type: 'queryList',
        payload: response,
      });
      if (callback) callback(response);
    },
    *getUpdate({ payload, callback }, { call, put }) {
      const response = yield call(getRoleUpdate, payload);
      yield put({
        type: 'getUpdateList',
        payload: response,
      });
      if (callback) callback(response);
    },
  },

  reducers: {
    queryList(state, { payload }) {
      return {
        ...state,
        data: payload,
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
