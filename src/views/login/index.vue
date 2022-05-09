<template>
  <div v-loading.fullscreen.lock="isLoading">
    <h3 class="text-center">店家聯盟核銷</h3>
    <img src="@/assets/image/store_league.jpg" alt="" class="d-block w-100">
    <div class="w-70 mx-auto mt-4">
      <el-input placeholder="帳號" v-model="loginInfo.username"></el-input>
      <el-input placeholder="密碼" type="password" v-model="loginInfo.password" class="mt-2"></el-input>
      <div class="d-flex justify-content-between align-items-end mt-3">
        <el-checkbox v-model="isRememberPwd">記住密碼</el-checkbox>
        <router-link to="/password/forgot" class="text-decoration-none">
          <p class="fs-7 my-0 text-secondary cursor-pointer">忘記密碼</p>
        </router-link>
      </div>
      <button class="btn rounded my-3 w-100" @click="login">登入</button>
      <!-- <p class="text-end fs-7 text-secondary cursor-pointer">立即註冊</p> -->
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapMutations } from 'vuex'

export default {
  name: 'Login',
  data() {
    return {
      loginInfo: {
        username: '',
        password: ''
      },
      isRememberPwd: false,
      isLoading: false
    }
  },
  mounted() {
    const storeLoginName = window.localStorage.getItem('storeLoginName')
    if (storeLoginName) {
      this.loginInfo.username = storeLoginName
      this.loginInfo.password = window.localStorage.getItem('storeLoginPwd')
      this.isRememberPwd = true
    }
  },
  watch: {
    isRememberPwd(status) {
      if (!status) {
        window.localStorage.removeItem('storeLoginName')
        window.localStorage.removeItem('storeLoginPwd')
      }
    }
  },
  methods: {
    ...mapMutations(['setStoreId']),
    login() {
      this.isLoading = true
      if (this.isRememberPwd) {
        window.localStorage.setItem('storeLoginName', this.loginInfo.username)
        window.localStorage.setItem('storeLoginPwd', this.loginInfo.password)
      }
      const url = 'https://pengfu-app.herokuapp.com/api/users/login'
      axios.post(url, this.loginInfo).then(res => {
        const { id, status } = res.data
        this.setStoreId(id)
        // 第一次登入導去改密碼
        const nextRoute = Number(status) === 1 ? 'PasswordSetting' : 'Landing'
        this.$router.push({ name: nextRoute })
        this.isLoading = false
      }).catch(err => {
        console.log(err)
        this.$message.error('登入失敗')
        this.isLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
