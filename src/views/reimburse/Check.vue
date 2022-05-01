<template>
  <div v-loading.fullscreen.lock="isLoading">
    <header class="bg-blue d-flex align-items-center p-2">
      <div class="w-1-3">
        <router-link to="/">
          <i class="el-icon-arrow-left text-white"></i>
        </router-link>
      </div>
      <p class="w-1-3 my-0 text-center text-white">核銷確認</p>
    </header>
    <div class="rounded-3 w-90 mx-auto border border-secondary mt-3 px-3 py-2">
      <p class="my-2">
        <span>序號：</span>
        <span class="fw-bold">{{ orderData.uuid }}</span>
      </p>
      <p class="my-2">
        <span>活動：</span>
        <span class="fw-bold">一般票券</span>
      </p>
      <p class="my-2">
        <span>金額：</span>
        <span class="fw-bold">{{ orderData.price }} 元</span>
      </p>
      <p class="my-2">
        <span>票券：</span>
        <span class="fw-bold">{{ orderData.title }}</span>
      </p>
    </div>
    <div v-if="!isReimburse" class="mt-5 d-flex justify-content-center">
      <router-link to="/reimburse/input" class="text-decoration-none">
        <button class="btn rounded bg-white text-blue">重新輸入</button>
      </router-link>
      <button class="btn rounded ms-3" @click="reimburseOrder(orderData.uuid)">確認</button>
    </div>
    <div v-else class="my-4">
      <div class="d-flex justify-content-center align-items-center my-4">
        <i class="el-icon-circle-check text-blue" style="font-size: 56px"></i>
        <div class="ms-3">
          <h1 class="text-blue my-1">核銷成功</h1>
          <p class="text-blue my-0">此單據已核銷成功</p>
        </div>
      </div>
      <div class="d-flex justify-content-center">
        <router-link to="/reimburse/list" class="text-decoration-none">
          <button class="btn rounded">核銷紀錄</button>
        </router-link>
        <router-link to="/reimburse/input" class="text-decoration-none ms-3">
          <button class="btn rounded">完成</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ReimburseCheck',
  data() {
    return {
      isLoading: false,
      orderData: {},
      isReimburse: false
    }
  },
  created() {
    const uuid = this.$route.params.id
    this.getOrderData(uuid)
  },
  methods: {
    getOrderData(orderUuid) {
      this.isLoading = true
      const url = `https://pengfu-app.herokuapp.com/api/order/uuid/${orderUuid}`
      axios.get(url).then(res => {
        this.orderData = res.data.order
        this.isLoading = false
      })
    },
    reimburseOrder(uuid) {
      this.isLoading = true
      const url = `https://pengfu-app.herokuapp.com/api/order/${uuid}`
      axios.patch(url, { status: 3 }).then(() => {
        this.isReimburse = true
        this.isLoading = false
      }).catch(err => {
        console.log(err)
        this.isLoading = false
        this.$message.error('核銷失敗')
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
