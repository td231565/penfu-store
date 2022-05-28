<template>
  <div v-loading.fullscreen.lock="isLoading">
    <header class="bg-blue d-flex align-items-center p-2">
      <div class="w-1-3">
        <i class="el-icon-close text-white" @click="closeWindow"></i>
      </div>
      <p class="w-1-3 my-0 text-center text-white">歸還成功</p>
    </header>
    <div class="text-center">
      <p class="fs-2 my-2">歸還成功</p>
      <i class="el-icon-circle-check text-blue fw-bold" style="font-size: 88px;"></i>
    </div>
    <div class="mt-3 px-4">
      <div class="p-1 border-bottom border-blue d-flex justify-content-between align-items-center" style="height: 34px;">
        <span>租借方案</span>
        <span class="fw-bold">{{ planInfo.title }}</span>
      </div>
      <div class="p-1 border-bottom border-blue d-flex justify-content-between align-items-center" style="height: 34px;">
        <span>方案說明</span>
        <span class="fw-bold">{{ planInfo.description }}</span>
      </div>
      <div class="p-1 border-bottom border-blue d-flex justify-content-between align-items-center" style="height: 34px;">
        <span>使用時間</span>
        <span class="fw-bold">$ {{ dayjs(rentInfo.rentTime).format('YYYY-MM-DD HH:mm') }}</span>
      </div>
      <div class="p-1 border-bottom border-blue d-flex justify-content-between align-items-center" style="height: 34px;">
        <span>費用</span>
        <span class="fw-bold">{{ rentInfo.actualCost }}</span>
      </div>
      <div class="p-1 border-bottom border-blue d-flex justify-content-between align-items-center text-blue" style="height: 34px;">
        <span>已付費用(含押金)</span>
        <span class="fw-bold">$ {{ rentInfo.paymentTotal }}</span>
      </div>
      <div class="p-1 border-bottom border-blue d-flex justify-content-between align-items-center text-blue" style="height: 34px;">
        <span>退還費用(含押金)</span>
        <span class="fw-bold">$ {{ rentInfo.paymentTotal - rentInfo.actualCost }}</span>
      </div>
    </div>
    <div class="mt-4 px-4 pb-3 d-flex justify-content-center">
      <!-- <button class="btn me-4 w-35 rounded-3">列印</button> -->
      <button class="btn w-35 rounded-3" @click="closeWindow">確認</button>
    </div>
  </div>
</template>

<script>
import axios from '@/api'
import dayjs from 'dayjs'

export default {
  name: 'ReturnSuccess',
  data() {
    return {
      isLoading: false,
      code: '',
      rentInfo: {},
      planInfo: {},
      dayjs: dayjs
    }
  },
  created() {
    this.getOrderWriteoffcode(this.$route.params.orderId)
  },
  methods: {
    getOrderWriteoffcode(orderId) {
      this.isLoading = true
      axios.get(`car_order/${orderId}`).then(res => {
        const { writeOffCode, planID } = res.data.carOrder
        Promise.all([this.returnBike(orderId, writeOffCode), this.getPlanDetail(planID)]).then(() => {
          this.isLoading = false
        }).catch(err => {
          console.log(err)
          this.isLoading = false
          this.$message.error('讀取資料失敗')
        })
      }).catch(err => {
        console.log(err)
        this.isLoading = false
        this.$message.error('讀取資料失敗')
      })
    },
    returnBike(orderId, code) {
      const url = 'car_order/return/write_off/'
      const data = {
        orderID: orderId,
        writeOffCode: code
      }
      return axios.post(url, data).then(res => {
        this.rentInfo = res.data.Order
      }).catch(err => {
        console.log(err)
        this.$message.error('歸還車輛失敗')
      })
    },
    getPlanDetail(planId) {
      axios.get(`plan/${planId}`).then(res => {
        this.planInfo = res.data.plan
      }).catch(err => {
        console.log(err)
        this.$message.error('讀取資料失敗')
      })
    },
    closeWindow() {
    }
  }
}
</script>

<style>

</style>
