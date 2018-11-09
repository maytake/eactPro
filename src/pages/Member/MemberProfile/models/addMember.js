
import { creatMember, toCreatMember, toUpdateMember, startMember, memberTags, } from '@/services/memberApi';
import { message } from 'antd';
export default {
  namespace: 'addMemberProfile',

  state: {
    dataSource: {},
    commonRes:{},
    memberTags:[],
  },

  effects: {
    *defaultData({ payload }, { call, put }) {
      const response = yield call(toCreatMember, payload);
      if(!response){return;}
      if (response.errCode === 0) {
        yield put({
          type: 'queryList',
          payload: response,
        });
      } else {
        message.error(response.errMsg);
      }
    },
    *toUpdate({ payload }, { call, put }) {
      const response = yield call(toUpdateMember, payload);
      if(!response){return;}
      if(response.errCode === 0) {
        yield put({
          type: 'queryList',
          payload: response,
        });
      } else {
        message.error(response.errMsg);
      }
    },

    *getMemberTags({ payload, callback }, { call, put }) {
      const response = yield call(memberTags, payload);
      if(!response){return;}
      if (response.errCode === 0) {
        yield put({
          type: 'memberTags',
          payload: response,
        });
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
    memberTags(state, { payload }) {
      return {
        ...state,
        memberTags: payload.data,
      };
    },

  },
};
