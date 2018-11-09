import { MenuManage, AddMenu, getMenuUpdate, RomoveMenu } from '@/services/getApi';
import { message } from 'antd';
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
      if(response&&response.errCode===0){
        yield put({
          type: 'queryList',
          payload: response,
        });
      }else{
        message.error(response.errMsg);
      }
    },
    *getUpdate({ payload, callback }, { call, put }) {
      const response = yield call(getMenuUpdate, payload);
      if(response&&response.errCode===0){
        yield put({
          type: 'getUpdateList',
          payload: response,
        });
        message.success('编辑成功');
        if (callback) callback(response);
      }else{
        message.error(response.errMsg);
      }
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(AddMenu, payload);
      if(response&&response.errCode===0){
        yield put({
          type: 'addList',
          payload: response,
        });
        message.success('添加成功');
        if (callback) callback(response);
      }else{
        message.error(response.errMsg);
      }
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(RomoveMenu, payload);
      if(response&&response.errCode===0){
        yield put({
          type: 'removeList',
          payload: response,
        });
        message.success('删除成功');
        if (callback) callback(response);
      }else{
        message.error(response.errMsg);
      }
    },
  },

  reducers: {
    queryList(state, { payload }) {
      return {
        ...state,
        data: payload.data,
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
