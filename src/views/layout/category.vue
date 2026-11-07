<template>
  <div class="category">
    <!-- 导航栏 -->
    <van-nav-bar title="全部分类" />
    <!-- 搜索 -->
     <van-search
      shape="round"
      background="#dddddd"
      placeholder="请输入搜索关键词"
      @click="$router.push('/search')"
    />
    <div class="box">
      <div class="nav">
        <div class="categories">
          <ul>
            <li
             v-for="item in list"
             :key="item.category_id"
             @click="active(item.category_id)"
             :class="{actived: category_id === item.category_id}"
            >{{ item.name }}</li>
          </ul>
        </div>
      </div>
      <div class="right">
        <van-grid icon-size="80">
          <van-grid-item
           v-for="item in children"
           :key="item.image_id"
           square :icon="item.image.preview_url"
          :text="item.name"
          @click="$router.push(`/searchlist?categoryId=${item.category_id}`)" />
        </van-grid>
      </div>
    </div>
  </div>
</template>

<script>
import { getCategory } from '@/api/category'
export default {
  name: 'CategoryIndex',
  data () {
    return {
      list: [], // 左边导航栏
      children: [], // 右边图片文字
      category_id: 10016 // 响应active类
    }
  },
  methods: {
    active (id) {
      const res = this.list.find((item) => id === item.category_id)
      // console.log(res)
      // 修改右边数据 及 左边活动 actived类
      this.children = res.children
      this.category_id = res.category_id
    }
  },
  async created () {
    const { data } = await getCategory()
    // console.log(data)
    // console.log(data.list[0].children[0].image)
    // console.log(data.list[0].children)
    // 初始化热门推荐 数据 及 左边活动 actived类
    this.list = data.list
    this.children = this.list[0].children
    this.category_id = this.list[0].category_id
  }
}
</script>

<style scoped lang="less">
  .category {
    .categories {
      width: 100%;
      li {
        width: 100%;
        height: 40px;
        background-color: #ddd;
        text-align: center;
        line-height: 40px;
      }
      .actived {
        background-color: #fff;
        color: orangered
      }
    }
    .box {
      width: 100%;
      background-color: #fff;
      .nav {
      float: left;
      width: 25%;
      height: 480px;
      overflow-y: auto;
      }
      .van-grid-item {
        margin-left: 10px;
      }
      .right {
        float: left;
        overflow-y: auto;
        width: 75%;
        height: 480px;
      }
    }
  }
</style>
