import { stringify } from 'qs';
import request from '@/utils/request';

// test
export async function Login(params) {
  return request('/CRM/mbe3/mgrParentFunc/page.json', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}


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

// MenuManage
export async function MenuManage(params) {
  return request(`/api/MenuManage?${stringify(params)}`);
}

export async function RomoveMenu(params) {
  return request(`/api/RomoveMenu?${stringify(params)}`);
}

export async function getMenuUpdate(params) {
  return request(`/api/getMenuUpdate?${stringify(params)}`);
}

export async function AddMenu(params) {
  return request('/api/AddMenu', {
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

// role
export async function getRoleList(params) {
  return request(`/api/RoleList?${stringify(params)}`);
}

export async function AddRoleList(params) {
  return request('/api/AddRole', {
    method: 'POST',
    body:params
  });
}

export async function RemoveRoleList(params) {
  return request(`/api/RomoveRole?${stringify(params)}`);
}

export async function getRoleUpdate(params) {
  return request(`/api/getRoleUpdate?${stringify(params)}`);
}