<template>
  <div class="content">
    <div class="particulars">
      <div class="date">
        <span>{{ item.create_time }}</span>
        <span class="orange">{{ item.state_text }}</span>
      </div>
      <div class="img_test" v-for="(goods, index) in item.goods" :key="index">
        <img :src="goods.goods_image" alt="">
        <div class="test">
          <div class="text-ellipsis-2 cart_name">{{ goods.goods_name }}</div>
          <div class="price_total">
            <p>$ {{ goods.total_pay_price }}</p>
            <p>x {{ goods.total_num }}</p>
          </div>
        </div>
      </div>
      <div class="price">
        共 {{ item.total_num }} 件商品,总金额${{ item.total_price }}
      </div>
      <div class="bot">
        <div class="but" v-if="item.order_status === 10">
          <span v-if="item.pay_status === 10">立刻支付</span>
          <span v-else-if="item.delivery_status === 10">申请取消</span>
          <span v-else-if="item.delivery_status === 20 || item.delivery_status === 30">确认收货</span>
        </div>
        <div class="but" v-if="item.order_status === 30">
          评价
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      Type: Array
    }
  }
}
</script>

<style scoped lang="less">
  .content {
      width: 100%;
      min-height: 230px;
      border: 10px;
      background-color: #f9f9f9;
      padding: 0 10px 10px 10px;
      .particulars {
        width: 100%;
        min-height: 230px;
        background-color: #fff;
        padding: 0 10px;
        margin-top: 10px;
        .date {
          width: 100%;
          height: 30px;
          line-height: 30px;
          display: flex;
          justify-content: space-between;
          .orange {
            color: orange;
          }
        }
        .img_test {
          width: 100%;
          height: 100px;
          display: flex;
          gap: 10px;
          margin-top: 10px;
          img {
            width: 100px;
            aspect-ratio: 1/1;
          }
          .test {
            width: 300px;
            height: 40px;
            display: flex;
            justify-content: space-between;
            .cart_name {
              width: 150px;
              height: 35px;
            }
            .price_total {
              p {
                text-align: right;
                color: #787777;
              }
            }
          }
        }
        .price {
          text-align: right;
        }
        .bot {
          margin-top: 10px;
          display: flex;
          justify-self: end;
          .but {
            width: 80px;
            height: 28px;
            text-align: center;
            line-height: 27px;
            border-radius: 5px;
            border: 2px solid rgba(0,0,0,.3);
          }
        }
      }
    }
</style>
