<template>
  <div>
    <header class="bg-blue d-flex align-items-center p-2">
      <div class="w-1-3">
        <router-link to="/">
          <i class="el-icon-arrow-left text-white"></i>
        </router-link>
      </div>
      <p class="w-1-3 my-0 text-center text-white">第一次輸入密碼</p>
    </header>
    <div class="w-70 mx-auto">
      <h2 class="text-blue">密碼設定</h2>
      <p class="my-0 text-blue">請修改預設密碼，完成後即可登入</p>
      <el-input placeholder="帳號" v-model="oldPwd" class="mt-5"></el-input>
      <el-input placeholder="密碼" v-model="newPwd" class="mt-2"></el-input>
      <el-input placeholder="密碼" v-model="repeatPwd" class="mt-2"></el-input>
      <div class="d-flex mt-3">
        <button class="btn rounded me-2">取消</button>
        <router-link to="/landing" class="text-decoration-none">
          <button class="btn rounded">確定</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PasswordSetting',
  data() {
    return {
      oldPwd: '',
      newPwd: '',
      repeatPwd: ''
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
