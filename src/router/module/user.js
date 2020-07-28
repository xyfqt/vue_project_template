const userRouter = [
  {
    path: '/private',
    name: 'PrivateAgreement',
    meta:{title:"隐私政策"},
    component: () => import(/* webpackChunkName: "PrivateAgreement" */ '../../views/user/PrivateAgreement.vue')
  },
  {
    path: '/agreement',
    name: 'Agreement',
    meta:{title:"用户协议"},
    component: () => import(/* webpackChunkName: "Agreement" */ '../../views/user/Agreement.vue')
  },
  {
    path: '/privacyPolicy',
    name: 'AuthAgreement',
    meta:{title:"授权说明"},
    component: () => import(/* webpackChunkName: "AuthAgreement" */ '../../views/user/AuthAgreement.vue')
  },
  {
    path: '/register/:inviteCode',
    name: 'Register',
    meta:{title:"注册"},
    component: () => import(/* webpackChunkName: "Register" */ '../../views/user/Register.vue')
  },
  {
    path: '/registerSuccess',
    name: 'Success',
    meta:{title:"注册成功"},
    component: () => import(/* webpackChunkName: "Success" */ '../../views/user/Success.vue')
  },
]
export default userRouter
