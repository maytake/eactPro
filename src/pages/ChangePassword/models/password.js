import router from 'umi/router';
import { message } from 'antd';
import { changePassword } from '@/services/getApi';
import { reloadAuthorized } from '@/utils/Authorized';
import { setAuthority } from '@/utils/authority';
export default {
  namespace: 'changepassword',

  state: {
    status: undefined,
  },

  effects: {
    *submitRegularForm({ payload }, { call, put }) { 
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
          currentAuthority: 'guest',
        },
      });
      const response =yield call(changePassword, payload);
      if(response&&response.errCode === 0){
        message.success('提交成功');
        localStorage.removeItem('userToken');
        reloadAuthorized();
        router.push({
          pathname: '/user/login',
        })
      
      }else{
        message.error(response.errMsg);
      }
    },

  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
      };
    },
  },
};
