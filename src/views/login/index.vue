<template>
  <div class="login">
    <!-- 头部 -->
    <van-nav-bar title="会员登陆" left-arrow @click-left="$router.go(-1)"></van-nav-bar>
    <!-- 主体 -->
    <div class="main">
      <h1>手机号登陆</h1>
      <p>未注册的手机号登陆后将自动注册</p>
      <input v-model="model" type="text" placeholder="请输入手机号码">
      <input v-model="picCode" type="text" placeholder="请输入图形验证码"><img v-if="picUrl" :src="picUrl" alt="" @click="getPicCode">
      <input v-model='smgCode' type="text" placeholder="请输入短信验证码"><button class="yan" @click="getCode">{{ totalSecond === second ? '获取验证码' : `${second}秒后重新发送` }}</button>
      <button class="deng" @click="login">登陆</button>
    </div>
  </div>
</template>

<script>
// import request from '@/utils/request'
import { getPicCode, getMsgCode, codeLogin } from '@/api/login'
// import { Toast } from 'vant'
export default {
  name: 'LoginIndex',
  data () {
    return {
      picKey: '', // 请求传递的验证码唯一标识
      picUrl: '', // 请求渲染图片地址
      totalSecond: 60, // 总秒数
      second: 60, // 当前秒数
      timer: null, // 定时器id
      model: '', // 手机号
      picCode: '', // 图形验证码
      smgCode: '' // 验证码
    }
  },
  async created () {
    this.getPicCode()
  },
  methods: {
    async getPicCode () {
      const { data: { base64, key } } = await getPicCode()
      this.picUrl = base64 // 存储地址
      this.picKey = key // 唯一标识
      // console.log(res)
      // 组件使用 toast
      // Toast('图片刷新成功')
      // this.$toast('图片刷新成功')
    },
    // 校验 手机号 和 图形验证马
    validFn () {
      // 通过校验 返回 true 不通过 返回 false
      if (!/^1[3-9]\d{9}$/.test(this.model)) {
        this.$toast('请输入正确的手机号')
        return false
      }
      if (!/^\w{4}$/.test(this.picCode)) {
        this.$toast('请输入正确的图形验证码')
        return false
      }
      return true
    },
    async getCode () {
      if (!this.validFn()) {
        // 如果没通过校验 没必要 往下走
        return
      }
      // 发送请求
      await getMsgCode(this.picCode, this.picKey, this.model)
      // console.log(res)
      this.$toast('短信发送成功')
      // 当目前没有定时器开着 且 当前 totalSecond === second 才可以倒计时
      if (this.totalSecond === this.second && !this.timer) {
        // 开启定时器
        this.timer = setInterval(() => {
          this.second--
          if (this.second <= 0) {
            clearInterval(this.timer)
            this.timer = null // 重置定时器id
            this.second = this.totalSecond // 归为
          }
        }, 1000)
      }
    },
    // 登陆
    async login () {
      if (!this.validFn()) {
        return 0
      }

      if (!/^\d{6}$/.test(this.smgCode)) {
        this.$toast('请输入正确的验证吗')
      }

      const res = await codeLogin(this.model, this.smgCode)
      this.$store.commit('user/setUserInfo', res.data)
      // console.log(res)
      this.$toast('登陆成功')
      // 进行判断 地址栏有无回跳地址
      // 如果有 证明从别的页面 调过来登陆 需要会跳
      // 如果没有 正常去首页
      const url = this.$route.query.backUrl || '/'
      // console.log(url)
      // this.$router.push(url)
      // push 方法会保留 上一个页面 当登陆页面 跳到 下一个页面时 点击返回 响应 $router.back() 就又会回到登陆页
      this.$router.replace(url)
    }
  },
  destroyed () {
    // 离开页面清除定时器
    clearInterval(this.timer)
  }
}
</script>

<style lang="less">
  .main {
    width: 100%;
    padding: 40px 30px;
    h1 {
      font-weight: 400;
    }
    p {
      color: #b6b4b4;
      margin-bottom: 40px;
    }
    input {
      width: 200px;
      height: 30px;
      border: none;
      font-size: 16px;
      padding-left: 10px;
      margin-bottom: 40px;
    }
    img {
      vertical-align: middle;
      width: 100px;
      height: 30px;
    }
    .yan {
      width: 100px;
      height: 30px;
      color: orange;
      border: none;
      text-align: center
    }
    .deng {
      color: #fff;
      width: 100%;
      height: 50px;
      background-color: orange;
      border: none;
      border-radius: 40px;
    }
  }
</style>
