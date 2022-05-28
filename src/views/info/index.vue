<template>
  <div v-loading.fullscreen.lock="isLoading" class="store-info">
    <header class="bg-blue d-flex align-items-center p-2">
      <div class="w-1-3">
        <router-link to="/landing">
          <i class="el-icon-arrow-left text-white"></i>
        </router-link>
      </div>
      <p class="w-1-3 my-0 text-center text-white">店家資料</p>
      <div class="w-1-3 text-end">
        <span class="text-white" @click="updateStoreInfo">儲存</span>
      </div>
    </header>
    <h3 class="text-center">{{ infoData.name }}</h3>
    <div class="w-90 mx-auto">
      <div class="p-1 border-bottom border-blue d-flex justify-content-between align-items-center" style="height: 34px;">
        <div class="d-flex align-items-center">
          <i class="el-icon-user-solid text-blue me-1"></i>
          <p class="my-0">負責人</p>
        </div>
        <el-input v-model="infoData.representative" class="w-70 fw-bold" />
      </div>
      <div class="p-1 border-bottom border-blue d-flex justify-content-between align-items-center" style="height: 34px;">
        <div class="d-flex align-items-center">
          <i class="el-icon-phone text-blue me-1"></i>
          <p class="my-0">市話</p>
        </div>
        <el-input v-model="infoData.phoneNumber" class="w-70 fw-bold" />
      </div>
      <div class="p-1 border-bottom border-blue d-flex justify-content-between align-items-center" style="height: 34px;">
        <div class="d-flex align-items-center">
          <i class="el-icon-mobile-phone text-blue me-1"></i>
          <p class="my-0">手機</p>
        </div>
        <el-input v-model="infoData.cellphone" class="w-70 fw-bold" />
      </div>
      <div class="p-1 border-bottom border-blue d-flex justify-content-between align-items-center" style="height: 34px;">
        <div class="d-flex align-items-center">
          <i class="el-icon-location text-blue me-1"></i>
          <p class="my-0">地址</p>
        </div>
        <el-input v-model="infoData.address" class="w-70 fw-bold" />
      </div>
      <div class="p-1 border-bottom border-blue d-flex justify-content-between align-items-center" style="height: 34px;">
        <div class="d-flex align-items-center">
          <i class="el-icon-message text-blue me-1"></i>
          <p class="my-0">Email</p>
        </div>
        <el-input v-model="infoData.email" class="w-70 fw-bold" />
      </div>
      <div class="p-1 border-bottom border-blue d-flex justify-content-between align-items-center" style="height: 34px;">
        <div class="d-flex align-items-center">
          <i class="el-icon-s-platform text-blue me-1"></i>
          <p class="my-0">官方網站</p>
        </div>
        <el-input v-model="infoData.website" class="w-70 fw-bold" />
      </div>
      <div class="p-1 border-bottom border-blue d-flex justify-content-between align-items-center" style="height: 34px;">
        <div class="d-flex align-items-center">
          <i class="el-icon-user text-blue me-1"></i>
          <p class="my-0">帳戶名稱</p>
        </div>
        <el-input v-model="infoData.accountName" class="w-70 fw-bold" />
      </div>
      <div class="p-1 border-bottom border-blue d-flex justify-content-between align-items-center" style="height: 34px;">
        <div class="d-flex align-items-center">
          <i class="el-icon-office-building text-blue me-1"></i>
          <p class="my-0">銀行</p>
        </div>
        <el-input v-model="infoData.accountBank" class="w-70 fw-bold" />
      </div>
      <div class="p-1 border-bottom border-blue d-flex justify-content-between align-items-center" style="height: 34px;">
        <div class="d-flex align-items-center">
          <i class="el-icon-school text-blue me-1"></i>
          <p class="my-0">分行</p>
        </div>
        <el-input v-model="infoData.accountBankBranch" class="w-70 fw-bold" />
      </div>
      <div class="p-1 border-bottom border-blue d-flex justify-content-between align-items-center" style="height: 34px;">
        <div class="d-flex align-items-center">
          <i class="el-icon-bank-card text-blue me-1"></i>
          <p class="my-0">帳戶號碼</p>
        </div>
        <el-input v-model="infoData.accountSeries" class="w-70 fw-bold" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/api'
import { mapState } from 'vuex'

export default {
  name: 'StoreInfo',
  data() {
    return {
      isLoading: false,
      infoData: {}
    }
  },
  computed: {
    ...mapState(['storeId'])
  },
  created() {
    console.log('id ' + this.storeId)
    this.getStoreInfo(this.storeId)
  },
  methods: {
    getStoreInfo(id) {
      this.isLoading = true
      axios.get(`business_info/${id}`).then(res => {
        this.infoData = res.data.Business
        this.isLoading = false
      }).catch(err => {
        console.log(err)
        this.$message.error('讀取店家資料失敗')
        this.isLoading = false
      })
    },
    updateStoreInfo() {
      this.isLoading = true
      axios.patch('business_info/', this.infoData).then(() => {
        this.$message({ type: 'success', message: '更新店家資料成功' })
        this.isLoading = false
      }).catch(err => {
        console.log(err)
        this.$message.error('更新店家資料失敗')
        this.isLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
