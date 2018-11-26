
import request from '@/utils/request';
import router from 'umi/router';
import { Modal } from 'antd';

// judgeExpire
const postData = async (url, params) => {
    const res = request(url, {
        method: 'POST',
        body: {
            ...params,
        },
    });
    const judgeExpire = await res;
    if (judgeExpire && judgeExpire.errCode === 1) {
        Modal.info({
            title: '用户信息已过期，请返回登录',
            onOk() {
                router.push('/user/login');
            },
        });
    }
    const err = new Promise((resolve) => {
        resolve({
            errCode: 2,
            errMsg: '接口出问题了',
        })
    });

    return judgeExpire&&res||err;
}

// member
export async function getRoleList(params) {
    return postData('/CRM/mbe3/mgrRole/page.json', params);
}

export async function RemoveRoleList(params) {
    return postData('/CRM/mbe3/mgrRole/delete.json', params);
}

export async function toAddRole(params) {
    return postData('/CRM/mbe3/mgrRole/toCreate.json', params);
}

export async function addRole(params) {
    return postData('/CRM/mbe3/mgrRole/create.json', params);
}

export async function toRoleUpdate(params) {
    return postData('/CRM/mbe3/mgrRole/toUpdate.json', params);
}

export async function getRoleUpdate(params) {
    return postData('/CRM/mbe3/mgrRole/update.json', params);
}

export async function permissions(params) {
    return postData('/CRM/mbe3/mgrRole/permList.json', params);
}

