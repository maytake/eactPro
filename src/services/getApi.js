import { stringify } from 'qs';
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

// menu
export async function queryMenus(params) {
  return postData('/CRM/mbe3/mgrFunction/menu.json', params);
}

// resource
export async function Resource(params) {
  return postData('/CRM/mbe3/mgrFunction/page.json', params);
}

export async function RemoveResource(params) {
  return postData('/CRM/mbe3/mgrFunction/delete.json', params);
}

export async function AddResource(params) {
  return postData('/CRM/mbe3/mgrFunction/create.json', params);

}

export async function resourceToUpdate(params) {
  return postData('/CRM/mbe3/mgrFunction/toUpdate.json', params);

}

export async function resourceUpdate(params) {
  return postData('/CRM/mbe3/mgrFunction/update.json', params);
}

export async function resourceCategory(params) {
  return postData('/CRM/mbe3/mgrParentFunc/cateList.json', params);

}

// MenuManage
export async function MenuManage(params) {
  return postData('/CRM/mbe3/mgrParentFunc/page.json', params);

}

export async function RomoveMenu(params) {
  return postData('/CRM/mbe3/mgrParentFunc/delete.json', params);

}

export async function getMenuUpdate(params) {
  return postData('/CRM/mbe3/mgrParentFunc/update.json', params);
}

export async function AddMenu(params) {
  return postData('/CRM/mbe3/mgrParentFunc/create.json', params);
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


// change password
export async function changePassword(params) {
  return postData('/CRM/mbe3/mgrLogin/updatePwd.json', params);
}

// LoginIn
export async function LoginIn(params) {
  return postData('/CRM/mbe3/mgrLogin/userLogin.json', params);

}

// LoginOut
export async function LoginOut(params) {
  return postData('/CRM/mbe3/mgrLogin/userLogout.json', params);
}