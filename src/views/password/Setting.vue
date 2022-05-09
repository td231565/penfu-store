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
      <el-input placeholder="舊密碼" v-model="oldPwd" class="mt-5"></el-input>
      <el-input placeholder="新密碼" v-model="newPwd" class="mt-2"></el-input>
      <el-input placeholder="請再輸入一次新密碼" v-model="repeatPwd" class="mt-2"></el-input>
      <div class="d-flex mt-3 justify-content-center">
        <!-- <button class="btn rounded me-2">取消</button> -->
        <!-- <router-link to="/landing" class="text-decoration-none">
          <button class="btn rounded">確定</button>
        </router-link> -->
        <button class="btn rounded" @click="changePassword">確定</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'

export default {
  name: 'PasswordSetting',
  data() {
    return {
      oldPwd: '',
      newPwd: '',
      repeatPwd: ''
    }
  },
  computed: {
    ...mapState(['storeId'])
  },
  methods: {
    changePassword() {
      if (this.repeatPwd !== this.newPwd) {
        this.$message.error('再次輸入的新密碼不相同')
        return
      }
      const url = 'https://pengfu-app.herokuapp.com/api/users/change_password/'
      axios.patch(url, {
        id: this.storeId,
        password: this.oldPwd,
        newPassword: this.newPwd
      }).then(() => {
        this.$message({ type: 'success', message: '更改密碼成功' })
        this.$router.push({ name: 'Landing' })
      }).catch(err => {
        console.log(err)
        this.$message.error('更改密碼失敗')
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
