
import { GetList, stopMember, batchStartMember, batchStopMember, deleteMember, } from '@/services/memberApi';
import { message } from 'antd';
export default {
  namespace: 'memberProfile',

  state: {
    dataSource: [],
    commonRes:{},
  },

  effects: {
    *fetchData({ payload }, { call, put }) {
      const response = yield call(GetList, payload);
      if (response&&response.errCode === 0) {
        yield put({
          type: 'queryList',
          payload: response,
        });
      } else {
        message.error(response.errMsg);
      }
    },

    *stop({ payload, callback }, { call, put }) {
      const response = yield call(stopMember, payload);
      if (response&&response.errCode === 0) {
        yield put({
          type: 'commonResult',
          payload: response,
        });
        message.success('停用成功');
        if (callback) callback(response);
      } else {
        message.error(response.errMsg);
      }
    },
    *batchStart({ payload, callback }, { call, put }) {
      const response = yield call(batchStartMember, payload);
      if (response&&response.errCode === 0) {
        yield put({
          type: 'commonResult',
          payload: response,
        });
        message.success('启用成功');
        if (callback) callback(response);
      } else {
        message.error(response.errMsg);
      }
    },
    *batchStop({ payload, callback }, { call, put }) {
      const response = yield call(batchStopMember, payload);
      if (response&&response.errCode === 0) {
        yield put({
          type: 'commonResult',
          payload: response,
        });
        message.success('停用成功');
        if (callback) callback(response);
      } else {
        message.error(response.errMsg);
      }
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(deleteMember, payload);
      if (response&&response.errCode === 0) {
        yield put({
          type: 'commonResult',
          payload: response,
        });
        message.success('停用成功');
        if (callback) callback(response);
      } else {
        message.error(response.errMsg);
      }
    },
  },

  reducers: {
    queryList(state, { payload }) {
      return {
        ...state,
        dataSource: payload.data,
      };
    },
    commonResult(state, { payload }) {
      return {
        ...state,
        commonRes: payload,
      };
    },

  },
};
