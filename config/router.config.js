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
    authority: ['admin', 'user'],
    routes: [
      // dashboard
      { path: '/', redirect: '/system/role' },
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
            path: '/system/resource',
            name: '资源管理',
            component: './System/Resource/Resource',
          },
          {
            path: '/system/role/addrole',
            name: '添加角色',
            component: './System/Role/AddRole',
          },
        ],
      },
      {
        component: '404',
      },
    ],
  },
];
