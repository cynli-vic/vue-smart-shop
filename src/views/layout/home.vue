<template>
  <div class="home top">
    <!-- 顶部 -->
    <div class="header">
      <!-- 导航栏 -->
      <van-nav-bar title="智慧商城" class="title-nav" />
      <!-- 搜索 -->
      <van-search
        v-model="value"
        placeholder="请输入搜索关键词"
        shape="round"
        background="#f1f1f2"
        @click="$router.push('/search')"
      />
    </div>
    <!-- 首页轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in bannerList" :key="item.imgUrl">
        <img :src="item.imgUrl" alt="" width="100%">
      </van-swipe-item>
    </van-swipe>
    <!-- 小图标 -->
    <div class="small-img">
      <ul>
        <li v-for="item in navList" :key="item.imgUrl">
          <img :src="item.imgUrl" alt="" width="60px" height="60px">
          <p>新品首发</p>
        </li>
      </ul>
    </div>
    <!-- 图片 -->
    <img src="@/assets/QQ20261024-095106.png" alt="" width="100%" style="margin-top: 10px;">
    <!-- 猜你喜欢 -->
    <p class="love">-----猜你喜欢-----</p>
    <div class="you-love">
      <goodsItem v-for="item in proList" :key="item.goods_id" :item="item"></goodsItem>
    </div>
  </div>
</template>

<script>
import goodsItem from '@/components/goodsItem.vue'
import { getHomeData } from '@/api/home'
export default {
  name: 'HomeIndex',
  data () {
    return {
      value: '',
      bannerList: [], // 轮播
      navList: [], // 导航
      proList: [] // 商品
    }
  },
  components: {
    goodsItem
  },
  async created () {
    const { data: { pageData } } = await getHomeData()
    // console.log(res)
    // console.log(pageData)
    this.bannerList = pageData.items[1].data
    this.navList = pageData.items[3].data
    this.proList = pageData.items[6].data
  }
}
</script>

<style scoped lang="less">
  .home {
    width: 100%;
    .header {
      position: sticky;
      top: 0;
      left: 0;
      z-index: 100;
    }
    .my-swipe .van-swipe-item {
      color: #fff;
      font-size: 20px;
      line-height: 150px;
      text-align: center;
      background-color: #39a9ed;
    }
    .small-img {
      display: flex;
      justify-content: flex-start;
      ul {
        li {
          display: inline-block;
          padding: 10px;
        }
      }
    }
    .love {
      font-size: 20px;
      margin: 10px 0;
      text-align: center;
    }
    .you-love {
      border: 0 10px;
      margin-bottom: 60px;
    }
  }
  .home .my-swipe .van-swipe-item {
      background-color: #fff;
      line-height: 0;
  }
</style>
