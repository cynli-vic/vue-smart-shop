<template>
  <div class="searchlist">
    <!-- 导航栏 -->
    <van-nav-bar
      title="商品列表"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 搜索 -->
     <van-search
      :value="querySearch || '搜索商品'"
      show-action
      @click="$router.push('/search')"
    >
      <template #action>
        <van-icon name="apps-o" />
      </template>
    </van-search>
    <div class="show">
      <p class="order-by">
        <span>综合</span>
        <span>销量</span>
        <span>价格</span>
      </p>
      <GoodsItem v-for="item in proList" :key="item.goods_id" :item="item"></GoodsItem>
    </div>
  </div>
</template>

<script>
import { getProList } from '@/api/product'
import GoodsItem from '@/components/goodsItem.vue'
export default {
  name: 'SearchList',
  data () {
    return {
      page: 1,
      proList: []
    }
  },
  components: {
    GoodsItem
  },
  computed: {
    querySearch () {
      return this.$route.query.search
    }
  },
  async created () {
    const { data: { list } } = await getProList({
      categoryId: this.$route.query.categoryId,
      goodsName: this.querySearch,
      page: this.page
    })
    this.proList = list.data
    // console.log(this.proList)
  }
}
</script>

<style scoped lang="less">
  .searchlist {
    .van-search__action {
      font-size: 20px;
    }
    .van-search__action:active {
      background-color: #fff;
    }
    .van-search__content {
      border-radius: 10x;
    }
    .order-by {
      display: flex;
      justify-content: space-around;
      span {
        font-size: 16px;
        font-weight: 500;
      }
    }
  }
</style>
