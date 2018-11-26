
import { getBrand, getCars, getModels, getShops, getConsultant } from '@/services/memberApi';
import { message } from 'antd';
export default {
    namespace: 'carInfoSelect',
    state: {
        carData: {},
        commonRes: {},
    },
    effects: {
        *getCarBrand({ payload, callback }, { call, put }) {
            const response = yield call(getBrand, payload);
            if (!response) { return; }
            if (response.errCode === 0) {
                yield put({
                    type: 'brandResult',
                    payload: response,
                });
                if (callback) callback(response);
            } else {
                message.error(response.errMsg);
            }
        },
        *getCarsInfo({ payload, callback }, { call, put }) {
            const response = yield call(getCars, payload);
            if (!response) { return; }
            if (response.errCode === 0) {
                yield put({
                    type: 'brandResult',
                    payload: response,
                });
                if (callback) callback(response);
            } else {
                message.error(response.errMsg);
            }
        },
        *getCarsModels({ payload, callback }, { call, put }) {
            const response = yield call(getModels, payload);
            if (!response) { return; }
            if (response.errCode === 0) {
                yield put({
                    type: 'brandResult',
                    payload: response,
                });
                if (callback) callback(response);
            } else {
                message.error(response.errMsg);
            }
        },
        *getCarsShops({ payload, callback }, { call, put }) {
            const response = yield call(getShops, payload);
            if (!response) { return; }
            if (response.errCode === 0) {
                yield put({
                    type: 'brandResult',
                    payload: response,
                });
                if (callback) callback(response);
            } else {
                message.error(response.errMsg);
            }
        },
        *getCarsConsultant({ payload, callback }, { call, put }) {
            const response = yield call(getConsultant, payload);
            if (!response) { return; }
            if (response.errCode === 0) {
                yield put({
                    type: 'brandResult',
                    payload: response,
                });
                if (callback) callback(response);
            } else {
                message.error(response.errMsg);
            }
        },
    },

    reducers: {
        brandResult(state, { payload }) {
            return {
                ...state,
                carData: payload ? payload.data : {},
            };
        },

    },
};
