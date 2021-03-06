
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
export async function GetList(params) {
  return postData('/CRM/mbe3/mgrMembermgcust/page.json', params);
}
  
export async function startMember(params) {
  return postData('/CRM/mbe3/mgrMembermgcust/start.json', params);
}

export async function stopMember(params) {
  return postData('/CRM/mbe3/mgrMembermgcust/stop.json', params);
}

export async function batchStartMember(params) {
  return postData('/CRM/mbe3/mgrMembermgcust/starts.json', params);
}

export async function batchStopMember(params) {
  return postData('/CRM/mbe3/mgrMembermgcust/stops.json', params);
}

export async function deleteMember(params) {
  return postData('/CRM/mbe3/mgrMembermgcust/delete.json', params);
}

// addmember
export async function creatMember(params) {
  return postData('/CRM/mbe3/mgrMembermgcust/create.json', params);
}

export async function toCreatMember(params) {
  return postData('/CRM/mbe3/mgrMembermgcust/toCreate.json', params);
}

export async function toUpdateMember(params) {
  return postData('/CRM/mbe3/mgrMembermgcust/toUpdate.json', params);
}

export async function joinMember(params) {
  return postData('/CRM/mbe3/mgrMembermgcust/summary.json', params);
}

export async function memberTags(params) {
  return postData('/CRM/mbe3/mgrDefdoclist/refinfodes.json', params);
}

export async function updateMember(params) {
  return postData('/CRM/mbe3/mgrMembermgcust/update.json', params);
}

// carInfo
export async function carInfo(params) {
  return postData('/CRM/mbe3/mgrMembermgcar/carList.json', params);
}

export async function startCar(params) {
  return postData('/CRM/mbe3/mgrMembermgcar/start.json', params);
}

export async function stopCar(params) {
  return postData('/CRM/mbe3/mgrMembermgcar/stop.json', params);
}

export async function setCar(params) {
  return postData('/CRM/mbe3/mgrMembermgcar/turnDefault.json', params);
}

// addCarInfo
export async function toCarUpdata(params) {
  return postData('/CRM/mbe3/mgrMembermgcar/toUpdate.json', params);
}

export async function carUpdata(params) {
  return postData('/CRM/mbe3/mgrMembermgcar/update.json', params);
}

export async function getBrand(params) {
  return postData('/CRM/mbe3/mgrBrand/page.json', params);
}

export async function getCars(params) {
  return postData('/CRM/mbe3/mgrCarseries/page.json', params);
}

export async function getModels(params) {
  return postData('/CRM/mbe3/mgrCartype/page.json', params);
}

export async function getShops(params) {
  return postData('/CRM/mbe3/mgrFourspointmg/page.json', params);
}

export async function getConsultant(params) {
  return postData('/CRM/mbe3/mgrAccount/page.json', params);
}