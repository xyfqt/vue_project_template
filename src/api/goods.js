import request from "@/utils/request"
import StringUtils from '@/utils/StringUtils'

export default {

  goodsDetail(data){
    return request({
      url: '/api/item/full-detail',
      method: 'post',
      data:StringUtils.json2FormData(data)
    });
  },
  giftDetail(data){
    return request({
      url: '/api/gift-item/detail',
      method: 'post',
      data:StringUtils.json2FormData(data)
    });
  },
  zeroGoods(data){
    return request({
      url: '/api/activityInfo/search',
      method: 'post',
      headers: data,
      data:data
    });
  },
  queryZeroCondition(data){
    return request({
      url: '/api/activityInfo/conformCodition',
      method: 'post',
      headers:data,
      data:data
    });
  },

}
