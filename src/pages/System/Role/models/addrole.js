import { addRole,toAddRole, toRoleUpdate, getRoleUpdate,permissions } from '@/services/roleApi';
import { message } from 'antd';
export default {
  namespace: 'addRole',

  state: {
    commonResult: {},
    entity:{},
    permissions:{},
  },

  effects: {
    *toAdd({ payload, callback }, { call, put }) {
      const response = yield call(toAddRole, payload);
      if (response.errCode === 0) {
        yield put({
          type: 'queryList',
          payload: response,
        });
        if (callback) callback(response);
      } else {
        message.error(response.errMsg);
      }
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addRole, payload);
      if (response.errCode === 0) {
        yield put({
          type: 'commonResult',
          payload: response,
        });
        message.success('添加成功！');
        if (callback) callback(response);
      } else {
        message.error(response.errMsg);
      }
    },
    *toUpdate({ payload, callback }, { call, put }) {
      const response = yield call(toRoleUpdate, payload);
      if (response.errCode === 0) {
        yield put({
          type: 'queryList',
          payload: response,
        });
        if (callback) callback(response);
      } else {
        message.error(response.errMsg);
      }
    },
    *update({ payload, callback }, { call, put }) {
      const response = yield call(getRoleUpdate, payload);
      if (response.errCode === 0) {
        yield put({
          type: 'commonResult',
          payload: response,
        });
        message.success('更新成功！');
        if (callback) callback(response);
      } else {
        message.error(response.errMsg);
      }
    },
    *getPermissions({ payload, callback }, { call, put }) {
      const response = yield call(permissions, payload);
      if (response.errCode === 0) {
        yield put({
          type: 'queryPermissions',
          payload: response,
        });
        if (callback) callback(response);
      } else {
        message.error(response.errMsg);
      }
    },
  },

  reducers: {

    commonResult(state, { payload }) {
      return {
        ...state,
        commonResult: payload,
      };
    },
    queryList(state, { payload }) {
      return {
        ...state,
        entity: payload.data||{},
      };
    },
    queryPermissions(state, { payload }) {
      return {
        ...state,
        permissions: payload.data||{},
      };
    },
  },
};
