
import { carInfo, startCar, stopCar,setCar } from '@/services/memberApi';
import { message } from 'antd';
export default {
  namespace: 'carInfo',
  state: {
    carInfoList:{},
    commonRes:{},
  },

  effects: {
    *getCarInfo({ payload, callback }, { call, put }) {
      const response = yield call(carInfo, payload);
      if(!response){return;}
      if (response.errCode === 0) {
        yield put({
          type: 'carInfoResult',
          payload: response,
        });
        if (callback) callback(response);
      } else {
        message.error(response.errMsg);
      }
    },
    *start({ payload, callback }, { call, put }) {
      const response = yield call(startCar, payload);
      if(!response){return;}
      if (response.errCode === 0) {
        yield put({
          type: 'carInfoResult',
          payload: response,
        });
        if (callback) callback(response);
      } else {
        message.error(response.errMsg);
      }
    },
    *stop({ payload, callback }, { call, put }) {
      const response = yield call(stopCar, payload);
      if(!response){return;}
      if (response.errCode === 0) {
        yield put({
          type: 'carInfoResult',
          payload: response,
        });
        if (callback) callback(response);
      } else {
        message.error(response.errMsg);
      }
    },
    *setDefault({ payload, callback }, { call, put }) {
      const response = yield call(setCar, payload);
      if(!response){return;}
      if (response.errCode === 0) {
        yield put({
          type: 'carInfoResult',
          payload: response,
        });
        if (callback) callback(response);
      } else {
        message.error(response.errMsg);
      }
    },
    
  },

  reducers: {
    carInfoResult(state, { payload }) {
      console.log(payload)
      return {
        ...state,
        carInfoList: payload?payload.data:{},
      };
    },
    startResult(state, { payload }) {
      console.log(payload)
      return {
        ...state,
        commonRes: payload,
      };
    },
    stopResult(state, { payload }) {
      console.log(payload)
      return {
        ...state,
        commonRes: payload,
      };
    },
    setResult(state, { payload }) {
      console.log(payload)
      return {
        ...state,
        commonRes: payload,
      };
    },
  },
};
