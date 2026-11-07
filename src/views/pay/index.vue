<template>
  <div class="pay">
    <!-- 导航栏 -->
     <van-nav-bar
      title="购物车"
      left-arrow
      fixed
      @click-left="$router.back()"
    />
    <!-- 地址栏 -->
    <div class="address">
      <van-icon name="logistics" />
      <div class="name_address" v-if="selectAddress.address_id">
        <p>{{ selectAddress.name }}{{ selectAddress.phone }}</p>
        <p>{{ longaddress }}</p>
      </div>
      <div class="name_address" v-else>
        请选择地址
      </div>
      <van-icon name="arrow" />
    </div>
    <!-- 彩带分割线 -->
    <div class="divider-wrapper">
      <div class="red_blue_strip"></div>
    </div>
    <!-- 商品详情 -->
    <div class="carts">
      <div class="bd" v-for="item in goodsList" :key="item.goods_id">
        <img :src="item.goods_image">
        <div class="content">
          <p class="text-ellipsis-2">{{ item.goods_name }}</p>
          <div class="bot"><span>x{{ item.total_num }}</span><span class="price">{{ item.goods_price_min }}</span></div>
        </div>
      </div>
    </div>
    <!-- 总价 -->
    <div class="count_total">
      <span>共 {{ order.orderTotalNum }} 件商品，合计：<i>￥{{ order.orderTotalPrice }}</i></span>
    </div>
    <hr>
    <!-- 结算金额详情 -->
    <div class="price_total">
      <p><span>订单总金额:</span><i>￥{{ order.orderTotalPrice }}</i></p>
      <p><span>优惠卷:</span><span>无优惠卷可用</span></p>
      <p><span>配送费用:</span><span v-if="!selectAddress">请选择配送地址</span><i v-else>+￥0.00</i></p>
    </div>
    <hr>
    <div class="payment">
      <p>支付方式</p>
      <p class="payment_pay"><span>余额支付（可用￥ {{ personal.balance }} 元）</span></p>
    </div>
    <hr>
    <div>
      <textarea name="" id="" placeholder="留言，50字内"></textarea>
    </div>
    <!-- 底部结算 -->
    <div class="nav">
      <span>合计：<i>￥{{ order.orderTotalPrice }}</i></span>
      <div class="pay" @click="submitOrder">提交订单</div>
    </div>
  </div>
</template>

<script>
import { addressList } from '@/api/address'
import { checkOrder, submitOrder } from '@/api/order'
export default {
  name: 'PayIndex',
  data () {
    return {
      addressList: [],
      order: [],
      personal: [],
      goodsList: [],
      remark: '' // 备注留言
    }
  },
  computed: {
    selectAddress () {
      // 这里非主线业务,所以直接获取第一项作为选中的地址
      return this.addressList[0] || []
    },
    longaddress () {
      // 将addressList中的省市区拼接成一个完整的地址
      const region = this.selectAddress.region
      return region.province + region.city + region.region + this.selectAddress.detail
    },
    mode () {
      return this.$route.query.mode
    },
    cartIds () {
      return this.$route.query.cartIds
    },
    goodsId () {
      return this.$route.query.goodsId
    },
    goodsSkuId () {
      return this.$route.query.goodsSkuId
    },
    goodsNum () {
      return this.$route.query.goodsNum
    }
  },
  created () {
    // 获取地址列表
    this.getAddressList()
    // 如果是购物车结算,则获取购物车选中的商品
    this.getOrderList()
  },
  methods: {
    async submitOrder () {
      if (this.mode === 'cart') {
        await submitOrder(this.mode, {
          cartIds: this.cartIds,
          remark: this.remark
        })
      }
      if (this.mode === 'buyNow') {
        await submitOrder(this.mode, {
          goodsId: this.goodsId,
          goodsNum: this.goodsNum,
          goodsSkuId: this.goodsSkuId,
          remark: this.remark
        })
      }
      this.$toast.success('支付成功')
      this.$router.replace('/myorder')
    },
    async getAddressList () {
      const { data: { list } } = await addressList()
      this.addressList = list
    },
    async getOrderList () {
      // 购物车结算
      if (this.mode === 'cart') {
        const { data: { order, personal } } = await checkOrder(this.mode, {
          cartIds: this.cartIds
        })
        this.order = order
        this.personal = personal
        this.goodsList = order.goodsList
      }
      // 立刻购买结算
      if (this.mode === 'buyNow') {
        const { data: { order, personal } } = await checkOrder(this.mode, {
          goodsId: this.goodsId,
          goodsSkuId: this.goodsSkuId,
          goodsNum: this.goodsNum
        })
        this.order = order
        this.personal = personal
        this.goodsList = order.goodsList
      }
      // console.log(order)
      // console.log(personal)
      // console.log(res)
    }
  }
}
</script>

<style scoped lang="less">
  .pay {
    .address {
      width: 100%;
      height: 50px;
      margin-top: 46px;
      padding: 0 20px;
      display: flex;
      align-items: center;
      gap: 10px;
      .name_address {
        width: 90%;
        p {
          width: 100%;
          height: 15px;
        }
      }
    }
    .divider-wrapper {
      width: 100%;
      overflow: hidden; /* 隐藏倾斜后露出的空白 */
      height: 10px; /* 控制彩条的高度 */
      .red_blue_strip {
        width: 100%;
        height: 10px; /* 控制彩条的高度 */
        /* 1. 画出色块 */
        background-image: repeating-linear-gradient(
          90deg,
          #B02E2E 0px, #B02E2E 10px,           /* 红色 */
          transparent 10px, transparent 20px,  /* 空白 */
          #2E6C86 20px, #2E6C86 30px,          /* 蓝色 */
          transparent 30px, transparent 40px   /* 空白 */
        );
        background-size: 40px 100%;
        /* 2. 让色块倾斜 */
        transform: skewX(-30deg); /* 负角度产生从左上到右下的倾斜感 */
        /* 3. 消除倾斜后两边露出的空白（可选） */
        width: 110%;
        margin-left: -5%;
      }
    }
    .carts {
      width: 100%;
      padding: 2px 5px;
      margin-top: 10px;
      .bd {
        width: 100%;
        display: flex;
        justify-content: space;
        gap: 5px;
        margin-top: 10px;
        img {
          width: 30%;
          aspect-ratio: 1 / 1;
        }
        .content {
          width: 70%;
          .bot {
          width: 250px;
          display: flex;
          justify-content: space-between;
            .price {
              color: orangered;
              font-size: 16px;
            }
          }
        }
      }
    }
    .count_total {
      width: 100%;
      height: 40px;
      display: flex;
      justify-content: flex-end;
      padding-right: 8px;
      font-size: 16px;
      font-weight: 500;
      i {
        color: orangered;
        font-style: normal;
        font-weight: 400;
      }
    }
    .price_total {
      width: 100%;
      padding: 0 0 10px 0;
      p {
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 0 8px;
        margin-top: 20px;
        font-size: 16px;
        i {
          color: orangered;
          font-style: normal;
        }
      }
    }
    .nav {
      width: 100%;
      height: 50px;
      position: fixed;
      bottom: 0;
      left: 0;
      display: flex;
      justify-content: space-between;
      line-height: 50px;
      padding-left: 10px;
      i {
        color: orangered;
        font-style: normal;
      }
      .pay {
        width: 150px;
        height: 50px;
        background-color: orangered;
        text-align: center;
        color: white;
      }
    }
  }
</style>
