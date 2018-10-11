import { stringify } from 'qs';
import request from '@/utils/request';

export async function Resource(params) {
  return request(`/api/Resource?${stringify(params)}`);
}

export async function RemoveResource(params) {
  return request(`/api/RomoveResource?${stringify(params)}`);
}

export async function AddResource(params) {
  return request('/api/AddResource', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}
