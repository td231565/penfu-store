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
      <span class="text-blue">核銷總金額：{{ totalPrice }}元</span>
      <span class="text-blue">核銷張數：{{ list.length }}張</span>
    </div>
    <div v-if="isShowSearch" class="w-90 mx-auto mt-3 reimburse-search">
      <el-select v-model="queryData.category" placeholder="請選擇活動類別" class="border-blue w-100">
        <el-option
          v-for="item in categoryOptions"
          :key="item"
          :label="item"
          :value="item" />
      </el-select>
      <div class="d-flex align-items-center my-2">
        <el-date-picker
          v-model="queryData.startDate"
          type="date"
          placeholder="開始時間"
          class="border-blue" />
        <span class="mx-2">至</span>
        <el-date-picker
          v-model="queryData.endDate"
          type="date"
          placeholder="結束時間"
          class="border-blue" />
      </div>
      <el-input placeholder="請輸入查詢序號" v-model="queryData.uuid" class="border-blue" />
      <div class="d-flex justify-content-center mt-3">
        <button class="btn rounded-3">查詢</button>
      </div>
    </div>
    <ul class="w-90 mx-auto mt-3">
      <li
        v-for="(item, idx) in list"
        :key="item.sid"
        class="rounded-3 p-3 border"
        :class="{
          'mt-3': idx !== 0,
          'border-gray': idx % 2 === 0,
          'border-lightblue': idx % 2 === 1,
          'bg-lightblue': idx % 2 === 1
        }">
        <div class="text-end">
          <span class="rounded-pill bg-blue text-white px-2">{{ item.validTime.replace('T', ' ').slice(0, -3) }}</span>
        </div>
        <p class="my-0">序號：{{ item.uuid }}</p>
        <p class="my-1">活動：{{ item.productCategory }}</p>
        <p class="my-1">金額：{{ item.price }} 元</p>
        <p class="my-0">票券：{{ item.title }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ReimburseList',
  data() {
    return {
      isLoading: false,
      isShowSearch: false,
      list: [],
      options: [
        { label: '123', value: '123' }
      ],
      queryData: {
        category: '',
        startDate: '',
        endDate: '',
        sid: ''
      }
    }
  },
  computed: {
    totalPrice() {
      return this.list.reduce((all, curr) => all + parseInt(curr.price), 0)
    },
    categoryOptions() {
      return Array.from(new Set(this.list.map(({ productCategory }) => productCategory)))
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.isLoading = true
      const url = 'https://pengfu-app.herokuapp.com/api/order/'
      axios.get(url).then(res => {
        this.list = res.data.order
        this.isLoading = false
      }).catch(err => {
        console.log(err)
        this.$message.error('讀取失敗')
        this.isLoading = false
      })
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
