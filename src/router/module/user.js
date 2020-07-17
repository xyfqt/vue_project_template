const userRouter = [
  {
    path: '/private',
    name: 'PrivateAgreement',
    component: () => import(/* webpackChunkName: "PrivateAgreement" */ '../../views/user/PrivateAgreement.vue')
  },
  {
    path: '/agreement',
    name: 'Agreement',
    component: () => import(/* webpackChunkName: "Agreement" */ '../../views/user/Agreement.vue')
  },
  {
    path: '/privacyPolicy',
    name: 'AuthAgreement',
    component: () => import(/* webpackChunkName: "AuthAgreement" */ '../../views/user/AuthAgreement.vue')
  },
  {
    path: '/register/:inviteCode',
    name: 'Register',
    component: () => import(/* webpackChunkName: "Register" */ '../../views/user/Register.vue')
  },
  {
    path: '/registerSuccess',
    name: 'Success',
    component: () => import(/* webpackChunkName: "Success" */ '../../views/user/Success.vue')
  },
]
export default userRouter
