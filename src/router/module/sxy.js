const sxyRouter = [
  {
    path: '/info-detail/:id',
    name: 'InfoDetail',
    meta:{title:'资讯详情'},
    component: () => import(/* webpackChunkName: "InfoDetail" */ '../../views/sxy/InfoDetail.vue')
  },
  {
    path: '/article-detail',
    name: 'ArticleDetail',
    meta:{title:'文章详情'},
    component: () => import(/* webpackChunkName: "ArticleDetail" */ '../../views/sxy/ArticleDetail.vue')
  },
]

export default sxyRouter

