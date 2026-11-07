<template>
  <div class="UserIndex">
    <!-- 账号 -->
    <div class="account" v-if="isLogin">
      <img :src="defaultimg" alt="">
      <div class="message">
        <div class="tel">{{ detail.nick_name }}</div>
        <div class="member"><van-icon name="diamond-o" />普通会员</div>
      </div>
    </div>
    <div class="account" v-else>
      <img :src="defaultimg" alt="">
      <div class="message">
        <div class="tel" style="color: goldenrod;">未登录</div>
        <div @click="$router.push('/login')">点击登陆账号</div>
      </div>
    </div>
    <!-- 账户余额、订单、服务 -->
    <div class="content">
      <div class="user_price">
        <div class="js">
          <p class="price">{{ detail.balance || 0}}</p>
          <p class="font">账户余额</p>
        </div>
        <div class="js">
          <p class="price">0</p>
          <p class="font">积分</p>
        </div>
        <div class="js">
          <p class="price">0</p>
          <p class="font">优惠卷</p>
        </div>
        <div class="js">
          <p class="ico_n"><van-icon name="paid" size="24" /></p>
          <p class="font">我的钱包</p>
        </div>
      </div>
      <div class="user_price top">
        <div class="js" @click="handle('all')">
          <p class="ico_n"><van-icon name="balance-list-o" size="24" /></p>
          <p class="font">全部订单</p>
        </div>
        <div class="js" @click="handle('payment')">
          <p class="ico_n"><van-icon name="clock-o" size="24" /></p>
          <p class="font">待支付</p>
        </div>
        <div class="js" @click="handle('delivery')">
          <p class="ico_n"><van-icon name="logistics" size="24" /></p>
          <p class="font">待发货</p>
        </div>
        <div class="js" @click="handle('received')">
          <p class="ico_n"><van-icon name="send-gift-o" size=24 /></p>
          <p class="font">待收货</p>
        </div>
      </div>
      <div class="my_service top">
        <h3>我的服务</h3>
        <div class="mu_service_js">
          <p class="icon_service"><van-icon name="records-o" color="orange" size="24" /></p>
          <p class="font">收货地址</p>
        </div>
        <div class="mu_service_js">
          <p class="icon_service"><van-icon name="gift-o" color="orange" size="24" /></p>
          <p class="font">领券中心</p>
        </div>
        <div class="mu_service_js">
          <p class="icon_service"><van-icon name="gift-card-o" color="orange" size="24" /></p>
          <p class="font">优惠卷</p>
        </div>
        <div class="mu_service_js">
          <p class="icon_service"><van-icon name="question-o" color="orange" size="24" /></p>
          <p class="font">我的帮助</p>
        </div>
        <div class="mu_service_js">
          <p class="icon_service"><van-icon name="balance-o" color="orange" size="24" /></p>
          <p class="font">我的积分</p>
        </div>
        <div class="mu_service_js">
          <p class="icon_service"><van-icon name="refund-o" color="orange" size="24" /></p>
          <p class="font">退换/售后</p>
        </div>
      </div>
    </div>
    <div class="exit" @click="logout" v-if="isLogin">
      退出登录
    </div>
  </div>
</template>

<script>
import defaultimg from '@/assets/defaultimg.png'
import { getUserInfoDetail } from '@/api/user'
export default {
  name: 'UserIndex',
  data () {
    return {
      defaultimg,
      detail: []
    }
  },
  created () {
    if (this.isLogin) {
      this.UserInfoDetail()
    }
  },
  methods: {
    handle (p) {
      this.$router.push({
        path: 'myorder',
        query: {
          dataType: p
        }
      })
    },
    async UserInfoDetail () {
      const { data: { userInfo } } = await getUserInfoDetail()
      // console.log(userInfo)
      this.detail = userInfo
    },
    logout () {
      if (this.isLogin) {
        this.$dialog.confirm({
          title: '温馨提示',
          message: '确认要退出吗？'
        }).then(() => {
          // 推出是一个动作 包含两小布： user 和 cart 重置
          this.$store.dispatch('user/logout')
        }).catch(() => {})
      }
    }
  },
  computed: {
    isLogin () {
      return this.$store.getters.token
    }
  }
}
</script>

<style scoped lang="less">
  .UserIndex {
    width: 100%;
    min-height: 600px;
    background-color: #f9f9f9;
    margin-bottom: 60px;
    padding: 0 0 10px 0;
    .account {
      width: 100%;
      height: 150px;
      background-color: #FFF8F1;
      display: flex;
      gap: 10px;
      padding: 50px 10px;
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
      .message {
        .tel,
        .member {
          height: 25px;
        }
        .tel {
          color: #B09F6A;
          font-size: 16px;
          line-height: 25px;
        }
        .member {
          width: 75px;
          background-color: #403835;
          line-height: 25px;
          color: #B4A9A3;
          text-align: center;
          border-radius: 7px;
        }
      }
    }
    .content {
      width: 100%;
      min-height: 400px;
      background-color: #fafafa;
      padding: 0 10px;
      .user_price {
        display: flex;
        justify-content: space-around;
        width: 100%;
        height: 100px;
        background-color: #fff;
        padding: 30px 0;
        .js {
          width: 80px;
          margin-left: 10px;
          .price {
            color: red;
            width: 100%;
            height: 10px;
            font-weight: 700;
            text-align: center;
            font-size: 14px;
            font-weight: 600;
          }
          .ico_n {
            width: 100%;
            height: 11px;
            text-align: center;
          }
        }
      }
      .top {
        margin-top: 10px;
      }
      .my_service {
        width: 100%;
        height: 200px;
        background-color: #fff;
        padding: 10px 10px;
        .mu_service_js {
          width: 80px;
          float: left;
          margin-top: 20px;
          margin-right: 3px;
          .icon_service {
            width: 100%;
            height: 11px;
            text-align: center;
          }
        }
      }
    }
    .exit {
      width: 200px;
      height: 30px;
      border: 1px solid rgba(0,0,0,.5);
      margin: 10px auto;
      text-align: center;
      line-height: 30px;
    }
  }

  .font {
    font-weight: 700;
    font-size: 14px;
    width: 100%;
    height: 20px;
    text-align: center;
    line-height: 20px;
    margin-top: 10px;
  }
</style>
