<template>
  <div>
    <header class="bg-blue d-flex align-items-center p-2">
      <div class="w-1-3">
        <router-link to="/">
          <i class="el-icon-arrow-left text-white"></i>
        </router-link>
      </div>
      <p class="w-1-3 my-0 text-center text-white">忘記密碼</p>
    </header>
    <div class="w-70 mx-auto">
      <h2 class="text-blue">密碼設定</h2>
      <p class="my-0 text-blue">請聯絡鵬灣有限公司提供新密碼</p>
      <p class="my-0 text-blue">聯絡電話：0912345678</p>
      <router-link to="/">
        <button class="btn rounded mt-5 w-100 text-decoration-none">確定</button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PasswordForgot'
}
</script>

<style lang="scss" scoped>

</style>
