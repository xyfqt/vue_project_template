import request from "@/utils/request"
import StringUtils from '@/utils/StringUtils'

export default {

  getVerificationCode(data) {
    return request({
      url: '/api/code/send',
      method: 'post',
      data: StringUtils.json2FormData(data)
    });
  },
  register(data) {
    return request({
      url: '/api/user/register',
      method: 'post',
      headers:{
        platform:data.platform,
        sysVersion:data.sysVersion
      },
      data: data
    });
  },

}
