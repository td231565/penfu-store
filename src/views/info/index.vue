<template>
  <div v-loading.fullscreen.lock="isLoading">
    <header class="bg-blue d-flex align-items-center p-2">
      <div class="w-1-3">
        <router-link to="/landing">
          <i class="el-icon-arrow-left text-white"></i>
        </router-link>
      </div>
      <p class="w-1-3 my-0 text-center text-white">店家資料</p>
      <div class="w-1-3 text-end">
        <span class="text-white">儲存</span>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  name: 'StoreInfo',
  data() {
    return {
      infoData: {
        name: '',
        tel: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
