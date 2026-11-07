<template>
  <div class="myorder">
    <div class="top">
      <!-- 导航栏 -->
      <van-nav-bar
        title="订单"
        left-arrow
        @click-left="$router.back()"
      />
      <!-- 定位 -->
      <van-tabs v-model="active" sticky>
        <van-tab title="全部" name="all"></van-tab>
        <van-tab title="待支付" name="payment"></van-tab>
        <van-tab title="待发货" name="delivery"></van-tab>
        <van-tab title="待收货" name="received"></van-tab>
        <van-tab title="待评价" name="comment"></van-tab>
      </van-tabs>
    </div>
    <div class="con">
      <OrderListItem v-for="item in List" :item="item" :key="item.order_id"></OrderListItem>
    </div>
  </div>
</template>

<script>
import { getMyOrderList } from '@/api/order'
import OrderListItem from '@/components/OrderListItem.vue'
export default {
  name: 'MyorderIndex',
  data () {
    return {
      active: this.$route.query.dataType || 'all',
      page: 1,
      List: []
    }
  },
  components: {
    OrderListItem
  },
  methods: {
    async getOrderList () {
      const { data: { list } } = await getMyOrderList(this.active, this.page)
      console.log(list.data)
      list.data.forEach(item => {
        item.total_num = 0
        item.goods.forEach(goods => {
          item.total_num += goods.total_num
        })
      })
      this.List = list.data
    }
  },
  watch: {
    active: {
      immediate: true,
      handler () {
        this.getOrderList()
      }
    }
  }
}
</script>

<style scoped lang="less">
  .myorder {
    .top {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
    }
    .con {
      width: 100%;
      margin-top: 100px;
    }
  }
  .van-nav-bar .van-icon {
    color: black;
  }
</style>
