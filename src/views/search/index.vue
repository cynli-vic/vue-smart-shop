<template>
  <div class="Search">
    <!-- 导航栏 -->
    <van-nav-bar
      title="商品搜索"
      left-arrow
      @click-left="$router.push('/home')"
    />
    <!-- 搜索 -->
    <van-search
      v-model="value"
      show-action
      placeholder="请输入搜索关键词"
      @search="onSearch"
      >
      <template #action>
        <div @click="onSearch(value)">搜索</div>
      </template>
    </van-search>
    <!-- 最近搜索 -->
    <div v-if="history.length>0" class="del">
    <p>
      <span>最近搜索</span>
      <span><i @click="clear" class="iconfont">&#xe615;</i></span>
    </p>
      <div class="ssuo">
        <div v-for="(item, index) in history" :key="index" @click="onSearch(item)" class="ss">{{ item }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getHistory, setHistory } from '@/utils/storage'
export default {
  name: 'SearchIndex',
  data () {
    return {
      value: '',
      history: getHistory()
    }
  },
  methods: {
    onSearch (item) {
      // indexOf 查找下标 没有则返回-1
      if (item === '') {
        return 0
      }
      const index = this.history.indexOf(item)
      if (index !== -1) {
        // 存在相同项，删除原有再追加放到最前面
        this.history.splice(index, 1)
        this.history.unshift(item)
      } else {
        this.history.unshift(item)
      }
      setHistory(this.history)

      // 跳转到 搜索列表页
      this.$router.push(`/searchlist?search=${item}`)
    },
    clear () {
      this.history = []
      setHistory([])
    }
  }
}
</script>

<style scoped lang="less">
  .Search {
    .van-search__action {
      background-color: red;
      color: white;
      width: 60px;
      text-align: center;
      margin-right: 10px;
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
    }
    p {
      display: flex;
      justify-content: space-between;
      padding: 0 10px;
      font-size: 16px;
      line-height: 25px;
    }
    .del {
      padding: 10px;
      .ssuo {
        .ss {
          width: 80px;
          height: 30px;
          float: left;
          color: black;
          background-color: rgb(201, 201, 201);
          line-height: 30px;
          text-align: center;
          border-radius: 10px;
          margin-right: 8px;
          margin-top: 4px;
        }
      }
    }
  }
</style>
