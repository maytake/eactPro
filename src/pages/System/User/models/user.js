
import { getUserList,  AddUserList, RemoveUserList, SetUserPassword, ChangeStatus } from '@/services/getApi';

export default {
  namespace: 'userManagement',
  state: {

    dataSource: {},
    addResult: {},
    reomveResult: {},
    setResult: {},
    statusResult: {},
  },

  effects: {
    *fetchUser({ payload }, { call, put }) {
      const response = yield call(getUserList, payload);
      yield put({
        type: 'queryList',
        payload: response,
      });
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(AddUserList, payload);
      yield put({
        type: 'addList',
        payload: response,
      });
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(RemoveUserList, payload);
      yield put({
        type: 'removeList',
        payload: response,
      });
      if (callback) callback();
    },
    *setPassword({ payload, callback }, { call, put }) {
      const response = yield call(SetUserPassword, payload);
      yield put({
        type: 'setList',
        payload: response,
      });
      if (callback) callback();
    },
    *changeStatus({ payload, callback }, { call, put }) {
      const response = yield call(ChangeStatus, payload);
      yield put({
        type: 'statusList',
        payload: response,
      });
      if (callback) callback(response);
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
    setList(state, { payload }) {
      return {
        ...state,
        setResult: payload,
      };
    },
    statusList(state, { payload }) {
      return {
        ...state,
        statusResult: payload,
      };
    },

  },
};
