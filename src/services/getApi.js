import { stringify } from 'qs';
import request from '@/utils/request';

// resource
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
    },
  });
}


// home
export async function UpdateInfo() {
  return request('/api/updateInfo');
}


// user
export async function getUserList(params) {
  return request(`/api/UserList?${stringify(params)}`);
}

export async function getUserUpdate(params) {
  return request(`/api/getUpdate?${stringify(params)}`);
}

export async function RemoveUserList(params) {
  return request(`/api/RomoveUser?${stringify(params)}`);
}

export async function AddUserList(params) {
  return request('/api/AddResource', {
    method: 'POST',
    body:params
  });
}

export async function SetUserPassword(params) {
  return request('/api/SetUserPassword', {
    method: 'POST',
    body:params,
  });
}

export async function ChangeStatus(params) {
  return request(`/api/ChangeStatus?${stringify(params)}`);
}

