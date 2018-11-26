
import { toCarUpdata, carUpdata } from '@/services/memberApi';
import { message } from 'antd';
export default {
    namespace: 'addCarInfo',
    state: {
        entityData: {},
        carBrand: {},
        commonRes: {},
    },

    effects: {
        *toUpdate({ payload, callback }, { call, put }) {
            const response = yield call(toCarUpdata, payload);
            if (!response) { return; }
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
        *update({ payload, callback }, { call, put }) {
            const response = yield call(carUpdata, payload);
            if (!response) { return; }
            if (response.errCode === 0) {
                yield put({
                    type: 'commonRes',
                    payload: response,
                });
                message.success('车辆修改成功！');
                if (callback) callback(response);
            } else {
                message.error(response.errMsg);
            }
        },

    },

    reducers: {
        carInfoResult(state, { payload }) {
            return {
                ...state,
                entityData: payload ? payload.data : {},
            };
        },
        commonRes(state, { payload }) {
            return {
                ...state,
                commonRes: payload,
            };
        },
    },
};
