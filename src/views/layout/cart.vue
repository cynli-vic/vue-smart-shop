<template>
  <div class="cart">
    <van-nav-bar
      title="购物车"
      fixed
    />
    <div v-if="islogin && cartList.length > 0">
      <!-- 编辑 -->
      <div class="edit">
        <span>共<i> {{ cartTotal }} </i>件商品</span>
        <span @click="isEdit = !isEdit">编辑</span>
      </div>
      <!-- 商品 -->
      <div class="content">
        <div class="carts" v-for="item in cartList" :key="item.goods_id">
          <div><van-checkbox @click="toggleCheck(item.goods_id)" :value="item.ischecked"></van-checkbox></div>
          <img :src="item.goods.goods_image" alt="" width="200px" height="200px">
          <div class="right">
            <div class="text-ellipsis-2 right-on">{{ item.goods.goods_name }}</div>
            <div class="right-bottom">
              <span class="new">￥<i>{{ item.goods.goods_price_min }}</i></span>
              <!-- 既希望保留原本的形参 又需要通过调用函数传参 通过 => 箭头函数包装一层 -->
              <CountBox :value="item.goods_num" @input="(value) => changeCount(value, item.goods_id, item.goods_sku_id)"></CountBox>
            </div>
          </div>
        </div>
      </div>
      <!-- 底部结算 -->
      <div class="nav">
        <div class="left" @click="toggleALLCheck"><van-checkbox :value="isALLChecked"></van-checkbox>全选</div>
        <div class="right">合计：￥<i>{{ selPrice }}</i>
          <button class="gopy" v-if="!isEdit" :class="{ disabled: selCount === 0 }" @click="goPay">结算({{ selCount }})</button>
          <button @click="handledel" class="del" v-else :class="{ disabled: selCount === 0 }">删除</button>
        </div>
      </div>
    </div>
    <div v-else class="empty">
      <img src="@/assets/empty.webp" alt="">
      <p>您的购物车是空的，快去逛逛吧</p>
      <button @click="$router.push('/home')">去逛逛</button>
    </div>
  </div>
</template>

<script>
import CountBox from '@/components/CountBox.vue'
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'CartIndex',
  data () {
    return {
      isEdit: false
    }
  },
  components: {
    CountBox
  },
  created () {
    // 必须是登陆过的用户才能获取
    if (this.$store.getters.token) {
      this.$store.dispatch('cart/getCartAction')
    }
  },
  computed: {
    ...mapState('cart', ['cartList']),
    ...mapGetters('cart', ['cartTotal', 'selCartList', 'selCount', 'selPrice', 'isALLChecked']),
    islogin () {
      return this.$store.getters.token
    }
  },
  methods: {
    toggleCheck (goodsId) {
      this.$store.commit('cart/toggleCheck', goodsId)
    },
    toggleALLCheck () {
      this.$store.commit('cart/toggleALLCheck', !this.isALLChecked)
    },
    changeCount (goodsNum, goodsId, goodsSkuId) {
      // 调用 vuex 的 action 对数据进行修改
      this.$store.dispatch('cart/changeCountAction', {
        goodsNum,
        goodsId,
        goodsSkuId
      })
    },
    async handledel () {
      if (this.selCount === 0) {
        return
      }
      await this.$store.dispatch('cart/delSelectAction')
      this.isEdit = false
    },
    goPay () {
      // 判断有没有选中商品
      if (this.selCount > 0) {
        // 有选中的商品才进行跳转
        this.$router.push({
          path: '/pay',
          query: {
            mode: 'cart',
            cartIds: this.selCartList.map(item => item.id).join(',') // 'cartId, cartId, cartId'
          }
        })
      }
    }
  },
  watch: {
    isEdit (value) {
      if (value) {
        this.$store.commit('cart/toggleALLCheck', false)
      } else {
        this.$store.commit('cart/toggleALLCheck', true)
      }
    }
  }
}
</script>

<style scoped lang="less">
  .cart {
    width: 100%;
    min-height: 580px;
    padding: 0 5px 3px 5px;
    background-color: #eae8e8;
    .edit {
      display: flex;
      justify-content: space-between;
      margin-top: 46px;
      height: 30px;
      line-height: 35px;
      i {
        color: orange;
        font-style: normal;
      }
    }
    .content {
      width: 100%;
      margin-bottom: 80px;
      .carts {
        width: 100%;
        display: flex;
        justify-content: space-around;
        background-color: #fff;
        gap: 3px;
        align-items: center;
        padding: 5px 5px;
        margin-top: 10px;
        img {
        width: 115px;
        height: 115px;
        }
        .right {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 12px 0;
          .right-on {
            font-size: 16px;
            margin-bottom: 40px;
          }
          .right-bottom {
            display: flex;
            justify-content: space-between;
            span {
            color: orange;
            font-size: 10px;
            i {
              font-size: 16px;
              font-style: normal;
            }
          }
          }
        }
      }
    }
    .nav {
      position: fixed;
      bottom: 50px;
      left: 0;
      display: flex;
      justify-content: space-between;
      width: 100%;
      height: 40px;
      background-color: #fff;
      border-bottom: 1px solid rgba(0,0,0,.3);
      .left {
        display: flex;
        align-items: center;
        gap: 5px;
      }
      .right {
        i {
          font-size: 18px;
          font-style: normal;
          color: orange;
        }
        .gopy,
        .del {
          width: 100px;
          height: 38px;
          text-align: center;
          line-height: 38px;
          color: #fff;
          background-color: #fa2f21;
          border-radius: 40px;
          appearance: none;
          border: none;
          margin-left: 10px;
        }
        .disabled {
          background-color: #ff9779;
        }
      }
    }
    .empty {
      width: 100%;
      padding-top: 200px;
      text-align: center;
      img {
        width: 100px;
        height: 100px;
        margin-bottom: 10px;
      }
      button {
        width: 100px;
        height: 30px;
        border-radius: 30px;
        background-color: orange;
        color: #fff;
        border: none;
        margin-top: 10px;
        appearance: none;
      }
    }
  }
</style>
