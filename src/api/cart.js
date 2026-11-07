import request from '@/utils/request'

// 加入购物车
export const addCart = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('/cart/add', {
    goodsId,
    goodsNum,
    goodsSkuId // 商品规格id 如 iphone 粉色 iphone 蓝色 这些 规格的id
  })
}

// 获取商品列表api
export const getCartList = () => {
  return request.get('/cart/list')
}

// 购物车商品数量更新
export const changeCount = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('/cart/update', {
    goodsId,
    goodsNum,
    goodsSkuId
  })
}

// 删除购物车商品
export const delSelect = (cartIds) => {
  return request.post('/cart/clear', {
    cartIds
  })
}
