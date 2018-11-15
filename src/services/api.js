import { stringify } from 'qs';
import request from '@/utils/request';




export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request('/api/notices');
}


export async function queryHomeDec(params) {
  return request('/home/dec',{
    method: 'POST',
    body: params,
  });
}

export async function queryMenus() {
  return request('/api/menus');
}

