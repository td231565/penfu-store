<template>
  <div v-loading.fullscreen.lock="isLoading">
    <h3 class="text-center">店家聯盟核銷</h3>
    <div class="w-70 mx-auto">
      <el-input placeholder="帳號" v-model="name"></el-input>
      <el-input placeholder="密碼" v-model="password" class="mt-2"></el-input>
      <div class="d-flex justify-content-between align-items-end mt-3">
        <el-checkbox v-model="isRememberPwd">記住密碼</el-checkbox>
        <router-link to="/password/forgot" class="text-decoration-none">
          <p class="fs-7 my-0 text-secondary cursor-pointer">忘記密碼</p>
        </router-link>
      </div>
      <button class="btn rounded my-3 w-100" @click="login">登入</button>
      <p class="text-end fs-7 text-secondary cursor-pointer">立即註冊</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      name: '',
      password: '',
      isRememberPwd: false,
      isLoading: false
    }
  },
  methods: {
    login() {
      this.isLoading = true
      setTimeout(() => {
        this.$router.push({ name: 'Landing' })
        this.isLoading = false
      }, 1500)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
