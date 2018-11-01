import { MenuManage, AddMenu, getMenuUpdate, RomoveMenu } from '@/services/getApi';

export default {
  namespace: 'menuManage',

  state: {
    updateResult:{},
    data: {},
    addResult: {},
    reomveResult: {},
  },

  effects: {
    *fetchData({ payload }, { call, put }) {
      const response = yield call(MenuManage, payload);
      yield put({
        type: 'queryList',
        payload: response,
      });
    },
    *getUpdate({ payload, callback }, { call, put }) {
      const response = yield call(getMenuUpdate, payload);
      yield put({
        type: 'getUpdateList',
        payload: response,
      });
      if (callback) callback(response);
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(AddMenu, payload);
      yield put({
        type: 'addList',
        payload: response,
      });
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(RomoveMenu, payload);
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
