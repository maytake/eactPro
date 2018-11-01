

const dataMenu = {
  list: [{
    key: '1',
    pkParentfunc: '1',
    name: '系统管理',
    icon: 'setting',
    url: '/system',
    code: '01',
  },
  {
    key: '2',
    pkParentfunc: '2',
    name: '基础数据',
    icon: 'bar-chart',
    url: '/system',
    code: '02',
  }],
  pagination: { 
      total: 46, 
      pageSize: 10, 
      defaultCurrent: 1
  }
};

const content = {
  name: "系统管理",
  code:'01',
  icon: 'setting',
  urlPath: "/system/resource",
}


export default {
  'GET /api/MenuManage': dataMenu,
  'POST /api/AddMenu': (req, res) => {
    res.send({ status: 'ok', msg: '提交成功！' });
  },
  'GET /api/RomoveMenu': (req, res) => {
    res.send({ status: 'ok', msg: '删除成功！' });
  },
  'GET /api/getMenuUpdate': (req, res) => {
      res.send({ status: 'ok', content,});
  },
};
