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
                name: '会员信息',
                component: './member/MemberProfile/JoinMember',
              },
            ],
          },
        ]
      },
      {
        path: '/dashboard',
        name: 'dashboard',
        icon: 'dashboard',
        routes: [
          {
            path: '/dashboard/analysis',
            name: 'analysis',
            component: './Dashboard/Analysis',
            authority: ['user','admin'],
          },
          {
            path: '/dashboard/monitor',
            name: 'monitor',
            component: './Dashboard/Monitor',
          },
          {
            path: '/dashboard/workplace',
            name: 'workplace',
            component: './Dashboard/Workplace',
          },
        ],
      },
      // forms
      {
        path: '/form',
        icon: 'form',
        name: 'form',
        routes: [
          {
            path: '/form/basic-form',
            name: 'basicform',
            component: './Forms/BasicForm',
          },
          {
            path: '/form/step-form',
            name: 'stepform',
            component: './Forms/StepForm',
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/form/step-form',
                name: 'stepform',
                redirect: '/form/step-form/info',
              },
              {
                path: '/form/step-form/info',
                name: 'info',
                component: './Forms/StepForm/Step1',
              },
              {
                path: '/form/step-form/confirm',
                name: 'confirm',
                component: './Forms/StepForm/Step2',
              },
              {
                path: '/form/step-form/result',
                name: 'result',
                component: './Forms/StepForm/Step3',
              },
            ],
          },
          {
            path: '/form/advanced-form',
            name: 'advancedform',
            authority: ['admin','user'],
            component: './Forms/AdvancedForm',
          },
        ],
      },
      // list
      {
        path: '/list',
        icon: 'table',
        name: 'list',
        routes: [
          {
            path: '/list/table-list',
            name: 'searchtable',
            component: './List/TableList',
          },
          {
            path: '/list/basic-list',
            name: 'basiclist',
            component: './List/BasicList',
          },
          {
            path: '/list/card-list',
            name: 'cardlist',
            component: './List/CardList',
          },
          {
            path: '/list/search',
            name: 'searchlist',
            component: './List/List',
            routes: [
              {
                path: '/list/search',
                redirect: '/list/search/articles',
              },
              {
                path: '/list/search/articles',
                name: 'articles',
                component: './List/Articles',
              },
              {
                path: '/list/search/projects',
                name: 'projects',
                component: './List/Projects',
              },
              {
                path: '/list/search/applications',
                name: 'applications',
                component: './List/Applications',
              },
            ],
          },
        ],
      },
      {
        path: '/profile',
        name: 'profile',
        icon: 'profile',
        routes: [
          // profile
          {
            path: '/profile/basic',
            name: 'basic',
            component: './Profile/BasicProfile',
          },
          {
            path: '/profile/advanced',
            name: 'advanced',
            authority: ['admin','user'],
            component: './Profile/AdvancedProfile',
          },
        ],
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
        name: 'account',
        icon: 'user',
        path: '/account',
        routes: [
          {
            path: '/account/center',
            name: 'center',
            component: './Account/Center/Center',
            routes: [
              {
                path: '/account/center',
                redirect: '/account/center/articles',
              },
              {
                path: '/account/center/articles',
                component: './Account/Center/Articles',
              },
              {
                path: '/account/center/applications',
                component: './Account/Center/Applications',
              },
              {
                path: '/account/center/projects',
                component: './Account/Center/Projects',
              },
            ],
          },
          {
            path: '/account/settings',
            name: 'settings',
            component: './Account/Settings/Info',
            routes: [
              {
                path: '/account/settings',
                redirect: '/account/settings/base',
              },
              {
                path: '/account/settings/base',
                component: './Account/Settings/BaseView',
              },
              {
                path: '/account/settings/security',
                component: './Account/Settings/SecurityView',
              },
              {
                path: '/account/settings/binding',
                component: './Account/Settings/BindingView',
              },
              {
                path: '/account/settings/notification',
                component: './Account/Settings/NotificationView',
              },
            ],
          },

        ],
      },
      {
        component: '404',
      },
    ],
  },
];
