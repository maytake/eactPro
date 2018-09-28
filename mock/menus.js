const menus = [
  {
    path: '/system',
    name: '系统管理',
    icon: 'setting',
    routes: [
      {
        path: '/system/role',
        name: '角色管理',
      },
      {
        path: '/system/user',
        name: '用户管理',
      },
      {
        path: '/system/resource',
        name: '资源管理',
      },
      {
        path: '/system/adminConfig',
        name: '后台参数配置',
      },
      {
        path: '/system/adminSwitch',
        name: '后台按钮开关',
      },
      {
        path: '/system/crmNotice',
        name: 'CRM更新信息',
      },
      {
        path: '/system/cron',
        name: '定时任务管理',
      },
    ],
  },
  {
    path: '/base',
    name: '基础数据',
    icon: 'bar-chart',
    routes: [
      {
        path: '/base/brand',
        name: '品牌',
      },
      {
        path: '/base/cars',
        name: '车系',
      },
      {
        path: '/base/carType',
        name: '车型',
      },
      {
        path: '/base/profile',
        name: '自定义档案',
      },
      {
        path: '/base/imageManagement',
        name: '图片管理',
      },
      {
        path: '/base/memberRights',
        name: '会员权益',
      },
      {
        path: '/base/bankAccount',
        name: '银行账户管理',
      },
      {
        path: '/base/article',
        name: '统一文章配置',
      },
      {
        path: '/base/QRCode',
        name: '二维码管理',
      },
    ],
  },
  {
    path: '/organization',
    name: '组织管理',
    icon: 'cluster',
    routes: [ 
      {
        path: '/organization/headOffice',
        name: '总部',
      },
      {
        path: '/organization/group',
        name: '集团',
      },
      {
        path: '/organization/area',
        name: '区域',
      },
      {
        path: '/organization/4sShop',
        name: '4S店',
      },
      {
        path: '/organization/department',
        name: '部门',
      },
    ]
  },
  {
    path: '/rule',
    name: '规则管理',
    icon: 'file-sync',
    routes: []
  },
  {
    path: '/member',
    name: '会员管理',
    icon: 'user',
    routes: []
  },
  {
    path: '/points',
    name: '积分管理',
    icon: 'appstore',
    routes: []
  },
  {
    path: '/service',
    name: '服务管理',
    icon: 'appstore',
    routes: []
  },
  {
    path: '/business',
    name: '业务管理',
    icon: 'appstore',
    routes: []
  },
  {
    path: '/packages ',
    name: '套餐管理',
    icon: 'appstore',
    routes: []
  },
  {
    path: '/consume',
    name: '消费管理',
    icon: 'appstore',
    routes: []
  },
  {
    path: '/level',
    name: '等级管理',
    icon: 'appstore',
    routes: []
  },
  {
    path: '/mission',
    name: '任务管理',
    icon: 'appstore',
    routes: []
  },
  {
    path: '/activity',
    name: '活动管理',
    icon: 'appstore',
    routes: []
  },
  {
    path: '/app',
    name: 'App管理',
    icon: 'appstore',
    routes: []
  },
  {
    path: '/workOrder; ',
    name: '工单管理',
    icon: 'appstore',
    routes: []
  },
  {
    path: '/communicate',
    name: '沟通管理',
    icon: 'appstore',
    routes: []
  },
  
  {
    component: '404',
  },

];

export default {
  'GET /api/menus': menus
};
