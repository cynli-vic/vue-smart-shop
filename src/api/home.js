import request from '@/utils/request'
// 获取首页数据
export const getHomeData = () => {
  // return request.get('/page/detail', {
  //   params: {
  //     pageId: 0
  //   }
  // })
  return request.get('/page/detail&pageId=0')
}
