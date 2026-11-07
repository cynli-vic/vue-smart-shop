<template>
  <div class="prodetail">
    <!-- 导航栏 -->
    <van-nav-bar
      title="商品详情页"
      left-arrow
      @click-left="$router.back()"
      fixed
    />
    <!-- 轮播图 -->
    <div class="page">
      <van-swipe autoplay="3000" @change="onChange">
        <van-swipe-item v-for="(item, index) in images" :key="index">
          <img :src="item.external_url" alt="">
        </van-swipe-item>
        <template #indicator>
          <div class="custom-indicator">{{ current + 1 }}/{{ images.length }}</div>
        </template>
      </van-swipe>
      <p class="p">
        <span>
          <span class="new">￥{{ detail.goods_price_min }}</span>
          <span class="old">￥{{ detail.goods_price_max }}</span>
        </span>
        <span class="yishou">已售 {{ detail.goods_sales }}件</span>
      </p>
      <p>{{ detail.goods_name }}</p>
    </div>
    <!-- 7天无理由 -->
    <p class="seven">
      <span>
        <van-icon name="passed" color="red" />七天无理由退货
        <van-icon name="passed" color="red" />48小时发货</span>
      <span><van-icon name="arrow" /></span>
    </p>
    <!-- 商品评价 -->
    <div class="evalute">
      <p class="evalute_total">
        <span>商品评价 ({{ total }}条)</span>
        <span style="color: gray;">查看更多 &gt; </span>
      </p>
      <div class="evalute_content" v-for="item in comment_list" :key="item.comment_id">
        <p class="xing">
          <img :src="item.avata_url || defaultimg" alt="">
          <span>{{ item.user.nick_name }}</span>
          <van-rate
            :value="item.score / 2"
            :size="25"
            color="#ffd21e"
            void-icon="star"
            void-color="#eee"
          />
        </p>
        <p class="text-ellipsis-2">{{ item.content }}</p>
        <p style="color: gray">{{ item.create_time }}</p>
      </div>
    </div>
    <!-- 商品描述 -->
    <div class="desc" v-html="detail.content">
    </div>
    <!-- 底部导航栏 -->
    <div class="but">
      <div @click="$router.push('/home')">
        <van-icon name="home-o" size="34" />
        <p>首页</p>
      </div>
      <div @click="$router.push('/cart')">
        <van-icon name="shopping-cart-o" size="34" :badge="cartTotal" />
        <p>购物车</p>
      </div>
      <div class="join" @click="addFn">加入购物车</div>
      <div class="buy" @click="buyFn">立即购买</div>
    </div>
    <!-- 加入购物车/立即购买的弹层 -->
     <van-action-sheet v-model="show" :title="mode === 'cart' ? '加入购物车' : '立即购买'">
      <div class="content">
        <div class="cart_on">
          <img :src="detail.goods_image" alt="">
          <div class="cart_right">
            <p class="cart_on_right"><span>￥</span><span class="pri">{{ detail.goods_price_min }}</span></p>
            <p>库存{{ detail.stock_total }}</p>
          </div>
        </div>
        <div class="cart_bot">
          <span>数量</span>
          <span><CountBox v-model="addCount"></CountBox></span>
        </div>
        <!-- 有库存才显示购买或加入按钮 -->
        <div class="showbtn" v-if="detail.stock_total>0">
          <div class="carts" v-if="mode === 'cart'" @click="addCart">加入购物车</div>
          <div class="buys" v-else @click="goBuyNow">立即购买</div>
        </div>
        <div class="none_btn" v-else>该商品以抢完</div>
      </div>
    </van-action-sheet>

  </div>
</template>

<script>
import { getProdetail, getProComments } from '@/api/product'
import CountBox from '@/components/CountBox.vue'
import defaultimg from '@/assets/defaultUser.png'
import { addCart } from '@/api/cart'
import loginConfirm from '@/mixins/loginConfirm'
export default {
  name: 'ProdetailIndex',
  mixins: [loginConfirm],
  data () {
    return {
      current: 0,
      detail: [],
      images: [],
      total: 0, // 评价总数
      comment_list: [], // 评价列表
      defaultimg,
      show: false, // 控制弹层显示隐藏
      mode: 'cart', // 标记弹层状态
      addCount: 1, // 数字框绑定的数据
      cartTotal: 0
    }
  },
  components: {
    CountBox
  },
  methods: {
    onChange (index) {
      this.current = index
    },
    async getDetail () {
      const { data: { detail } } = await getProdetail(this.$route.params.id)
      // console.log(res)
      this.detail = detail
      this.images = detail.goods_images
      // console.log(detail.goods_images)
      // console.log(detail.content)
    },
    async getComments () {
      const { data: { list, total } } = await getProComments(this.$route.params.id, 3)
      // console.log(res)
      this.comment_list = list
      this.total = total
    },
    buyFn () {
      this.mode = 'buyNow'
      this.show = true
    },
    addFn () {
      this.mode = 'cart'
      this.show = true
    },
    async addCart () {
      // 未登录处理： 弹出确认框 1. 去登陆 2.再逛逛
      if (this.loginConfrim()) {
        return
      }
      // 正常请求
      this.totalCart()
      // console.log(res)
      this.$toast('加入购物车成功')
      this.show = false
    },
    // 购物车总数量
    async totalCart () {
      const { data: { cartTotal } } = await addCart(
        this.$route.params.id,
        this.addCount,
        this.detail.skuList[0].goods_sku_id
      )
      this.cartTotal = cartTotal
    },
    goBuyNow () {
      // 未登录处理： 弹出确认框 1. 去登陆 2.再逛逛
      if (this.loginConfrim()) {
        return
      }
      this.$router.push({
        path: '/pay',
        query: {
          mode: 'buyNow',
          goodsId: this.$route.params.id,
          goodsSkuId: this.detail.skuList[0].goods_sku_id,
          goodsNum: this.addCount
        }
      })
    }
  },
  created () {
    this.getDetail()
    this.getComments()
  }
}
</script>

<style scoped lang="less">
  .prodetail {
    .van-nav-bar .van-icon {
      color: black;
    }
    .page {
      width: 100%;
      margin-top: 46px;
      .van-swipe {
        width: 100%;
        aspect-ratio: 1 / 1;
        .custom-indicator {
          position: absolute;
          width: 40px;
          text-align: center;
          right: 10px;
          bottom: 20px;
          padding: 2px 5px;
          font-size: 12px;
          background: rgba(0, 0, 0, 0.1);
          border-radius: 10px;
        }
        img {
          width: 100%;
          height: 100%;
        }
      }
      .p {
        display: flex;
        justify-content: space-between;
        .new {
        color: orangered;
        font-size: 20px;
        }
        .old {
          text-decoration: line-through;
          color: gray;
        }
        .yishou {
          color: gray;
        }
      }
    }
    .but {
      position: fixed;
      bottom: 0;
      left: 0;
      display: flex;
      justify-content: space-evenly;
      width: 100%;
      height: 50px;
      border-top: 1px solid rgba(0,0,0,.3);
      text-align: center;
      padding-top: 3px;
      z-index: 444;
      background-color: #fff;
      .buy,
      .join {
        width: 120px;
        height: 40px;
        border-radius: 20px;
        line-height: 40px;
        color: #fff;
        margin-top: 3px;
      }
      .buy {
        background-color: orangered;
      }
      .join {
        background-color: rgb(255, 193, 78);
      }
    }
    .desc {
      width: 100%;
      margin-bottom: 40px;
    }
    .desc ::v-deep img {
      width: 100% !important;
      height: auto !important;
    }
    .evalute_total {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
    }
    .evalute {
      width: 100%;
      padding: 10px 5px;
      .evalute_content {
        width: 100%;
        margin-top: 10px;
        .xing {
          display: flex;
          align-items: center;
          gap: 8px;
          img {
            width: 20px;
            height: 20px;
          }
        }
        p {
          margin-top: 10px;
        }
      }
      .item_content {
      }
    }
    .seven {
      width: 100%;
      height: 40px;
      margin-top: 10px;
      background-color: rgb(249, 248, 248);
      display: flex;
      justify-content: space-between;
      padding: 0 5px;
      font-size: 16px;
      line-height: 40px;
    }
  }
  .content {
    padding: 0 6px;
    .cart_on {
      display: flex;
      justify-content: flex-start;
      gap: 5px;
      img {
        width: 100px;
        height: 100px;
      }
      .cart_right {
        .cart_on_right {
          color: rgb(255, 193, 78);
          .pri {
            font-size: 24px;
          }
        }
      }
    }
    .cart_bot {
      display: flex;
      justify-content: space-between;
      margin: 10px 0;
    }
    .buys,
    .carts,
    .none_btn {
      width: 300px;
      height: 40px;
      border-radius: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      margin: 10px auto;
    }
    .buys {
      background-color: orangered;
    }
    .carts {
      background-color: rgb(255, 193, 78);
    }
    .none_btn {
      background-color: rgb(198, 198, 198);
    }
  }
</style>
