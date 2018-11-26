import { getRoleList, RemoveRoleList } from '@/services/roleApi';
import { message } from 'antd';
export default {
  namespace: 'role',
  state: {
    data: {},
    commonResult: {},
  },

  effects: {
    *fetchData({ payload, callback }, { call, put }) {
      const response = yield call(getRoleList, payload);
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

    *remove({ payload, callback }, { call, put }) {
      const response = yield call(RemoveRoleList, payload);
      if (response.errCode === 0) {
        yield put({
          type: 'commonResult',
          payload: response,
        });
        message.success('删除成功！');
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
        data: payload.data||{},
      };
    },

  },
};
