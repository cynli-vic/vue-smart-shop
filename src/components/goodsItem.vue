<template>
    <div v-if="item.goods_id" class="bet" @click="$router.push(`/prodetail/${item.goods_id}`)">
      <img :src="item.goods_image" alt="" width="200px" height="200px">
      <div class="right">
        <p class="text-ellipsis-2 right-on">{{ item.goods_name }}</p>
        <p class="right-mid">已售{{ item.goods_sales }}件</p>
        <p class="right-bottom">
          <span class="new">￥{{ item.goods_price_min }} </span>
          <span class="old">￥{{ item.goods_price_max }}</span>
        </p>
      </div>
    </div>
</template>

<script>
export default {
  name: 'goodsItem',
  props: {
    item: {
      type: Object,
      default: () => {
        return {}
      }
    }
  }
}
</script>

<style lang="less">
  .bet {
    display: flex;
    justify-content: space-between;
    margin-top: 5px;
    .right-on {
      font-size: 20px;
    }
    .right-mid {
      color: gray;
    }
    .right-bottom {
      .new {
        color: orangered;
        font-size: 20px;
      }
      .old {
        text-decoration: line-through;
        color: gray;
      }
    }
  }
</style>
