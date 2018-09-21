const menus = [

  {
    path: '/dashboard',
    name: 'dashboard',
    icon: 'dashboard',
    routes: [
      {
        path: '/dashboard/analysis',
        name: 'analysis',
        authority: ['user'],
      },
      {
        path: '/dashboard/monitor',
        name: 'monitor',
      },
      {
        path: '/dashboard/workplace',
        name: 'workplace',
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
      },
      {
        path: '/form/step-form',
        name: 'stepform',
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

          },
          {
            path: '/form/step-form/confirm',
            name: 'confirm',
          },
          {
            path: '/form/step-form/result',
            name: 'result',
          },
        ],
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
      },
      {
        path: '/list/basic-list',
        name: 'basiclist',
      },
      {
        path: '/list/card-list',
        name: 'cardlist',
      },
      {
        path: '/list/search',
        name: 'searchlist',
        routes: [
          {
            path: '/list/search/articles',
            name: 'articles',
          },
          {
            path: '/list/search/projects',
            name: 'projects',
          },
          {
            path: '/list/search/applications',
            name: 'applications',
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
      },

      {
        path: '/profile/advanced',
        name: 'advanced',
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
      },
      {
        path: '/exception/404',
        name: 'not-find',
      },
      {
        path: '/exception/500',
        name: 'server-error',
      },
      {
        path: '/exception/trigger',
        name: 'trigger',
        hideInMenu: true,
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
      },
      {
        path: '/account/settings',
        name: 'settings',
      },
    ],
  },
  {
    component: '404',
  },

];

export default {
  'GET /api/menus': menus
};
