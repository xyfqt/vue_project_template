import request from "@/utils/request"
import StringUtils from '@/utils/StringUtils'

export default {
  infoDetail(data){
    return request({
      url: '/api/business/school-info/detail',
      method: 'post',
      data:StringUtils.json2FormData(data)
    });
  },
  articleDetail(data){
    return request({
      url: '/api/business/school/detail',
      method: 'post',
      data:StringUtils.json2FormData(data)
    });
  }
}
