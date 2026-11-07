<template>
  <div>
    <!-- 二级路由出口 -->
    <router-view></router-view>
    <van-tabbar v-model="active" active-color="#ee0a24" inactive-color="#000" router>
      <van-tabbar-item to="/home" name="/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/category" name="/category" icon="apps-o">分类页</van-tabbar-item>
      <van-tabbar-item to="/cart" name="/cart" icon="shopping-cart-o">购物车</van-tabbar-item>
      <van-tabbar-item to="/user" name="/user" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex',
  data () {
    return {
      active: '/home' // 初始化 高亮值
    }
  },
  created () {
    // 用当前路由路径初始化
    this.active = this.$route.path || '/home'
  },
  watch: {
    // 监听路由 当路由改变时 调整 当前active 数据
    '$route' (to) {
      this.active = to.path
    }
  }
}
</script>

<style>

</style>
