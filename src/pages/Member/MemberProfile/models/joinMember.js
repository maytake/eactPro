
import { joinMember } from '@/services/memberApi';
import { message } from 'antd';
export default {
  namespace: 'joinMember',
  state: {
    memberInfo:{}
  },

  effects: {
    *becomeMember({ payload, callback }, { call, put }) {
      const response = yield call(joinMember, payload);
    
      if (response.errCode === 0) {
        yield put({
          type: 'memberInfoResult',
          payload: response,
        });
        if (callback) callback(response);
      } else {
        message.error(response.errMsg);
      }
    },
    
  },

  reducers: {
    memberInfoResult(state, { payload }) {
      return {
        ...state,
        memberInfo: payload?payload.data:{},
      };
    },
  },
};
