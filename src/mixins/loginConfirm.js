export default {
  // 此处编写 vue 组件实例的配置项，通过一定语法，可以直接混入到组件内部
  // data methods computed 等 都可以往这里提供
  // 注意点：
  // 1.如果此处与组件内提供了同名的 data methods等 组件内优先级更高
  // 2.如果编写了生命周期函数，则mixins生命周期函数 和 组件中的生命周期函数，会用数组管理 统一执行
  methods: {
    loginConfrim () {
      // 判断token是否存在
      // 1. token不存在 弹提示框
      // 2. token存在 继续请求操作
      if (!this.$store.getters.token) {
        // 弹确认框
        this.$dialog.confirm({
          title: '温馨提示',
          message: '此时需要先登陆才能继续操作',
          confirmButtonText: '去登陆',
          cancelButtonText: '再逛逛'
        })
          .then(() => {
            // 如果希望跳转登陆成功后 需要回跳回来就需要携带参数 （当前路径地址）
            // this.$route.fullpath(会包含查询参数)
            // this.$route.path(只有路径)
            // push 方法会保留 上一个页面 当登陆页面 跳到 下一个页面时 点击返回 响应 $router.back() 就又会回到登陆页
            // replace 不会保留上一个 页面的 历史
            this.$router.replace({
              path: '/login',
              query: {
                backUrl: this.$route.fullPath
              }
            })
          })
          .catch(() => {})
        return true
      }
      return false
    }
  }
}
