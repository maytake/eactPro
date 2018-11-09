import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { LoginIn, LoginOut } from '@/services/getApi';
import { message } from 'antd';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(LoginIn, payload);
      yield put({
        type: 'changeLoginStatus',
        payload:{...response, currentAuthority: 'admin',} ,
      });
      // Login successfully
      if (response&&response.errCode === 0) {
        localStorage.setItem('userToken',response.userToken);
        reloadAuthorized();
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.startsWith('/#')) {
              redirect = redirect.substr(2);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }
        yield put(routerRedux.replace(redirect || '/'));
      }else{
        message.success(response.errMsg);
      }
    },


    *logout({ payload }, {call, put }) {
      const response = yield call(LoginOut, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
          currentAuthority: 'guest',
        },
      });
      if (response&&response.errCode === 0) {
        localStorage.removeItem('userToken');
        reloadAuthorized();
        yield put(
          routerRedux.push({
            pathname: '/user/login',
            search: stringify({
              redirect: window.location.href,
            }),
          })
        );
      }else{
        message.success(response.errMsg);
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};
