export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './User/Login' },
      { path: '/user/register', component: './User/Register' },
      { path: '/user/register-result', component: './User/RegisterResult' },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      // dashboard
      { path: '/', redirect: '/system/updateInfo' },
      {
        path: '/home',
        name: 'home',
        icon: 'home',
        component: './Home/Home',
      },
      {
        path: '/changepassword',
        name: 'changepassword',
        component: './ChangePassword/ChangePassword',
      },
      {
        path: '/system',
        name: '系统管理',
        icon: 'setting',
        routes: [
          {
            path: '/system/updateInfo',
            name: '系统更新信息',
            component: './System/UpdateInfo/UpdateInfo',
          },
          {
            path: '/system/role',
            name: '角色管理',
            component: './System/Role/Role',
          },
          {
            path: '/system/user',
            name: '用户管理',
            component: './System/User/User',
          },
          {
            path: '/system/menuManage',
            name: '菜单管理',
            component: './System/MenuManage/MenuManage',
          },
          {
            path: '/system/resource',
            name: '资源管理',
            component: './System/Resource/Resource',
          },
          {
            path: '/system/role/addrole',
            name: '添加角色',
            component: './System/Role/AddRole',
          },
          {
            path: '/system/user/adduser',
            name: '添加用户',
            component: './System/User/AddUser',
          },
          {
            path: '/system/adminConfig',
            name: '后台参数配置',
            component: './System/AdminConfig/AdminConfig',
          },
          {
            path: '/system/adminSwitch',
            name: '后台按钮开关',
            component: './System/AdminSwitch/AdminSwitch',
          },
          {
            path: '/system/crmNotice',
            name: 'CRM更新信息',
            component: './System/CrmNotice/CrmNotice',
          },
          {
            path: '/system/cron',
            name: '定时任务管理',
            component: './System/Cron/Cron',
          },

        ],
      },
      {
        path: '/base',
        name: '基础数据',
        icon: 'bar-chart',
        routes: [
          {
            path: '/base/memberRights',
            name: '会员权益',
            component: './Base/MemberRights/MemberRights',
          },
        ],
      },
      {
        path: '/member',
        name: '会员管理',
        icon: 'user',
        routes: [
          {
            path: '/member/memberProfile',
            name: '会员档案',
            component: './member/MemberProfile/MemberProfile',
          },
          {
            path: '/member/memberProfile/addMember',
            name: '新建会员档案',
            component: './member/MemberProfile/AddMember',
            routes: [
              {
                path: '/member/memberProfile/addMember',
                redirect: '/member/memberProfile/addMember/memberInfo',
              },
              {
                path: '/member/memberProfile/addMember/memberInfo',
                name: '会员信息',
                component: './member/MemberProfile/MemberInfo',
              },
              {
                path: '/member/memberProfile/addMember/becomeMember',
                name: '入会信息',
                component: './member/MemberProfile/JoinMember',
              },
              {
                path: '/member/memberProfile/addMember/carInfo',
                name: '车辆管理',
                component: './member/MemberProfile/CarInfo',
              },
              {
                path: '/member/memberProfile/addMember/carInfo/addCarInfo/:carId?',
                name: '车辆管理',
                component: './member/MemberProfile/AddCarInfo',
              },
            ],
          },
        ]
      },
  
  

      {
        name: 'result',
        icon: 'check-circle-o',
        path: '/result',
        routes: [
          // result
          {
            path: '/result/success',
            name: 'success',
            component: './Result/Success',
          },
          { path: '/result/fail', name: 'fail', component: './Result/Error' },
        ],
      },
      {
        name: 'exception',
        icon: 'warning',
        path: '/exception',
        routes: [
          // exception
          {
            path: '/exception/403',
            name: 'not-permission',
            component: './Exception/403',
          },
          {
            path: '/exception/404',
            name: 'not-find',
            component: './Exception/404',
          },
          {
            path: '/exception/500',
            name: 'server-error',
            component: './Exception/500',
          },
          {
            path: '/exception/trigger',
            name: 'trigger',
            hideInMenu: true,
            component: './Exception/TriggerException',
          },
        ],
      },
      {
        component: '404',
      },
    ],
  },
];
