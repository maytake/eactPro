import { Resource, AddResource, resourceCategory, resourceToUpdate, resourceUpdate, RemoveResource } from '@/services/getApi';
import { message } from 'antd';
export default {
  namespace: 'resource',

  state: {
    updateResult: {},
    dataSource: [],
    addResult: {},
    reomveResult: {},
    category: {},
  },

  effects: {
    *fetchResource({ payload }, { call, put }) {
      const response = yield call(Resource, payload);
      if (response&&response.errCode === 0) {
        yield put({
          type: 'queryList',
          payload: response,
        });
      } else {
        message.error(response.errMsg);
      }
    },
    *getUpdate({ payload, callback }, { call, put }) {
      const response = yield call(resourceUpdate, payload);
      if (response&&response.errCode === 0) {
        yield put({
          type: 'getUpdateList',
          payload: response,
        });
        message.success('编辑成功');
        if (callback) callback(response);
      } else {
        message.error(response.errMsg);
      }
    },
    *resourceToUpdate({ payload, callback }, { call, put }) {
      const response = yield call(resourceToUpdate, payload);
      if (response&&response.errCode === 0) {
        yield put({
          type: 'getUpdateList',
          payload: response,
        });
        if (callback) callback(response);
      } else {
        message.error(response.errMsg);
      }
    },
    *getCategory({ payload, callback }, { call, put }) {
      const response = yield call(resourceCategory, payload);
      if (response&&response.errCode === 0) {
        yield put({
          type: 'category',
          payload: response,
        });
        if (callback) callback(response);
      } else {
        message.error(response.errMsg);
      }
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(AddResource, payload);
      if (response&&response.errCode === 0) {
        yield put({
          type: 'addList',
          payload: response,
        });
        message.success('添加成功');
        if (callback) callback();
      } else {
        message.error(response.errMsg);
      }
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(RemoveResource, payload);
      if (response&&response.errCode === 0) {
        yield put({
          type: 'removeList',
          payload: response,
        });
        message.success('删除成功');
        if (callback) callback();
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
    category(state, { payload }) {
      return {
        ...state,
        category: payload,
      };
    },
  },
};
