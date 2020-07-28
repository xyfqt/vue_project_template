 const goodsRouter = [
  {
    path: '/gift-goods',
    name: 'GiftGoods',
    meta:{title:'礼包商品'},
    component: () => import(/* webpackChunkName: "GiftGoods" */ '../../views/goods/GiftGoods.vue')
  },

  {
    path: '/message-detail',
    name: 'MessageDetail',
    meta:{title:'消息详情'},
    component: () => import(/* webpackChunkName: "MessageDetail" */ '../../views/goods/MessageDetail.vue')
  },

  {
    path: '/productdDetail/:id/:inviteCode/:word',
    name: 'GoodsDetail',
    meta:{title:'商品详情'},
    component: () => import(/* webpackChunkName: "GoodsDetail" */ '../../views/goods/GoodsDetail.vue')
  },
   {
     path: '/zero-goods',
     name: 'ZeroGoods',
     meta:{title:'新人免单'},
     component: () => import(/* webpackChunkName: "ZeroGoods" */ '../../views/goods/ZeroGoods.vue')
   },
]
 export default goodsRouter
