<template>
  <div v-loading.fullscreen.lock="isLoading">
    <header class="bg-blue d-flex align-items-center p-2">
      <div class="w-1-3">
        <router-link to="/landing">
          <i class="el-icon-arrow-left text-white"></i>
        </router-link>
      </div>
      <p class="w-1-3 my-0 text-center text-white">核銷紀錄</p>
      <div class="w-1-3 text-end">
        <i class="el-icon-search text-white" @click="isShowSearch = !isShowSearch"></i>
      </div>
    </header>
    <div class="w-90 mx-auto mt-3 rounded-3 border border-blue p-2 d-flex justify-content-between">
      <span class="text-blue">核銷總金額：{{ totalRevenue }}元</span>
      <span class="text-blue">核銷張數：{{ totalCount }}張</span>
    </div>
    <div v-if="isShowSearch" class="w-90 mx-auto mt-3 reimburse-search">
      <el-select v-model="queryData.category" placeholder="請選擇活動類別" class="border-blue w-100">
        <el-option
          v-for="item in categoryOptions"
          :key="item.label"
          :label="item.label"
          :value="item.value" />
      </el-select>
      <div class="d-flex align-items-center my-2">
        <el-date-picker
          v-model="queryData.startDate"
          type="date"
          placeholder="開始時間"
          class="border-blue"
          value-format="yyyy-MM-dd" />
        <span class="mx-2">至</span>
        <el-date-picker
          v-model="queryData.endDate"
          type="date"
          placeholder="結束時間"
          class="border-blue"
          value-format="yyyy-MM-dd" />
      </div>
      <el-input placeholder="請輸入查詢序號" v-model="queryData.uuid" class="border-blue" />
      <div class="d-flex justify-content-center mt-3">
        <button class="btn rounded-3" @click="getList(1)">查詢</button>
      </div>
    </div>
    <ul v-if="list.length > 0" class="w-90 mx-auto mt-3">
      <li
        v-for="(item, idx) in list"
        :key="item.uuid"
        class="rounded-3 p-3 border mb-3"
        :class="{
          'border-gray': idx % 2 === 0,
          'border-lightblue': idx % 2 === 1,
          'bg-lightblue': idx % 2 === 1
        }">
        <div v-if="item.category !== '伴手禮'" class="text-end">
          <span class="rounded-pill bg-blue text-white px-2 py-1">{{ item.validTime.replace('T', ' ').slice(0, -3) }}</span>
        </div>
        <p class="my-0">序號：{{ item.uuid }}</p>
        <p class="my-1">活動：{{ item.category }}</p>
        <p class="my-1">金額：{{ item.price }} 元</p>
        <p class="my-0">票券：{{ item.title }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from '@/api'

export default {
  name: 'ReimburseList',
  data() {
    return {
      isLoading: false,
      isShowSearch: false,
      list: [],
      categoryOptions: [
        { label: '全部', value: '' },
        { label: '票券', value: '票券' },
        { label: '伴手禮', value: '伴手禮' }
      ],
      queryData: {
        page: 1,
        numberPerPage: 20,
        startDate: '',
        endDate: '',
        uuid: '',
        category: '',
        businessID: 1
      },
      totalRevenue: 0,
      totalCount: 0
    }
  },
  created() {
    this.getList(1)
  },
  mounted() {
    window.addEventListener('scroll', this.handlerScrollButtom, false)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handlerScrollButtom, false)
  },
  methods: {
    getList(page) {
      this.isLoading = true
      const query = { ...this.queryData, page }
      axios.post('order/businessList/', query).then(res => {
        const { order, totalRevenue, totalCount } = res.data
        this.list = page === 1 ? order : [...this.list, ...order]
        this.totalRevenue = totalRevenue
        this.totalCount = totalCount
        this.queryData.page = page
        this.isLoading = false
      }).catch(err => {
        console.log(err)
        this.$message.error('讀取失敗')
        this.isLoading = false
      })
    },
    handlerScrollButtom() {
      const { scrollTop, offsetHeight } = document.documentElement
      const buttomOfWindow = scrollTop + window.innerHeight >= offsetHeight
      const { page, numberPerPage } = this.queryData
      if (buttomOfWindow && page * numberPerPage < this.totalCount) {
        const nextPage = Number(page + 1)
        this.getList(nextPage)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.border-lightblue {
  border-color: #cdedfa !important;
}
.bg-lightblue {
  background-color: #cdedfa !important;
}
.border-gray {
  border-color: #ddd !important;
}
</style>
