import request from '@/utils/request'

// 订单结算确认
// mode: cart => obj { cartsId, }
// mode: buynow => obj { goodsId, goodsNum, goodsskuId }
export const checkOrder = (mode, obj) => {
  return request.get('/checkout/order', {
    params: {
      mode: mode, // cart  buynow
      delivery: 10, // 配送方式：10-快递配送，20-门店自提
      couponId: 0, // 优惠卷ID 0不使用
      isUsePoints: 0, // 是否使用积分 0-不使用，1-使用
      ...obj // 将传过来的对象动态展开
    }
  })
}

// 提交订单
// mode: cart => obj { cartsId, remark }
// mode: buynow => obj { goodsId, goodsNum, goodsskuId }
export const submitOrder = (mode, obj) => {
  return request.post('/checkout/submit', {
    mode,
    delivery: 10, // 10 快递配送 20门店自提
    couponId: 0,
    isUsePoints: 0,
    payType: 10, // 余额支付
    ...obj
  })
}

// 获取订单 我的订单
export const getMyOrderList = (dataType, page) => {
  return request.get('/order/list', {
    params: {
      dataType,
      page
    }
  })
}
