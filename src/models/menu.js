
import { queryMenus } from '@/services/api';

export default {
    namespace: 'menu',

    state: {
        menuData: []
    },

    effects: {
        *fetchMenu(_, { call, put }) {
            const response = yield call(queryMenus);
            yield put({
                type: 'getMenuData',
                payload: response
            });
        },

    },

    reducers: {
        getMenuData(state, { payload }) {
            return {
                ...state,
                menuData: payload.data||[]
            };
        },
    },
};
