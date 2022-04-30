<template>
  <div>
    <p class="fw-bold text-center">店家聯盟核銷</p>
    <img src="@/assets/image/pengfu_logo.png" alt="" class="d-block w-35 mx-auto my-3">
    <router-link to="/reimburse/input" class="text-decoration-none">
      <div class="d-flex align-items-center px-3 py-2 inset-shadow" style="background-color: #ee6a5a;">
        <div style="flex: 2;" class="ps-1">
          <h3 class="my-0 text-white">掃描核銷</h3>
          <p class="my-0 fw-bold text-white">掃描消費者QRCode來做核銷</p>
        </div>
        <div style="flex: 1;" class="pt-3">
          <img src="@/assets/image/scan.png" alt="" class="d-block w-100">
        </div>
      </div>
    </router-link>
    <router-link to="/reimburse/list" class="text-decoration-none">
      <div class="d-flex align-items-center px-3 pb-2 inset-shadow" style="background-color: #ab7ecf;">
        <div style="flex: 1;" class="pt-3">
          <img src="@/assets/image/write_off.png" alt="" class="d-block w-100" style="height: 108px;">
        </div>
        <div style="flex: 2;" class="pe-1">
          <h3 class="my-0 text-white text-end">核銷紀錄</h3>
          <p class="my-0 fw-bold text-white text-end">查看核銷時間、筆數以及金額</p>
        </div>
      </div>
    </router-link>
    <router-link to="/info" class="text-decoration-none">
      <div class="d-flex align-items-center ps-3 py-1 inset-shadow" style="background-color: #00c49b;">
        <div style="flex: 2;" class="ps-1">
          <h3 class="my-0 text-white">店家資料</h3>
          <p class="my-0 fw-bold text-white">查看與修改店家資料與匯款資訊</p>
        </div>
        <div style="flex: 1;" class="pt-3 pb-2">
          <img src="@/assets/image/store_data.png" alt="" class="d-block w-100">
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Landing'
}
</script>

<style lang="scss" scoped>
.inset-shadow {
  box-shadow: inset 0 0 8px 6px #fff;
}
</style>
