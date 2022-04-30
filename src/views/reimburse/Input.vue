<template>
  <div>
    <header class="bg-blue d-flex align-items-center p-2">
      <div class="w-1-3">
        <router-link to="/">
          <i class="el-icon-arrow-left text-white"></i>
        </router-link>
      </div>
      <p class="w-1-3 my-0 text-center text-white">掃碼輸入</p>
    </header>
    <QrcodeStream @decode="onDecode">
      <div class="position-relative w-100 h-100">
        <div class="scan-block">
          <div v-for="num in 4" :key="num" class="scan-block-corner"></div>
        </div>
      </div>
    </QrcodeStream>
    <div class="mt-5 d-flex justify-content-center">
      <router-link to="/landing" class="text-decoration-none">
        <button class="btn rounded bg-white text-blue">輸入核銷號碼</button>
      </router-link>
      <label for="uploadQrcodePic" class="btn rounded bg-white ms-4 overflow-hidden">
        <span class="text-blue">從圖片</span>
        <!-- <button class="btn rounded text-decoration-none bg-white text-blue ms-4">從圖片</button> -->
        <QrcodeCapture accept="image/*" id="uploadQrcodePic" @decode="onDecode"></QrcodeCapture>
      </label>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { QrcodeStream, QrcodeCapture } from 'vue-qrcode-reader'

export default {
  name: 'ReimburseInput',
  components: { QrcodeStream, QrcodeCapture },
  data() {
    return {
      decodeUrl: ''
    }
  },
  methods: {
    onDecode(str) {
      this.decodeUrl = str
      this.reimburseOrder(str)
    },
    reimburseOrder(id) {
      const url = `https://pengfu-app.herokuapp.com/api/order/${id}`
      axios.patch(url, { status: 3 }).then(() => {
        this.$message({ message: '核銷成功', type: 'success' })
      }).catch(err => {
        console.log(err)
        this.$message.error('核銷失敗')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
$corner-border: 7px;
$corner-radius: 15px;

.scan-block{
  width: 70%;
  height: 70%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  &-corner {
    width: calc(100% / 4);
    height: calc(100% / 3.5);
    position: absolute;
    border-style: solid;
    border-color: #000;
    &:nth-of-type(1) {
      top: 0;
      left: 0;
      border-width: $corner-border 0 0 $corner-border;
      border-radius: $corner-radius 0 0 0;
    }
    &:nth-of-type(2) {
      top: 0;
      right: 0;
      border-width: $corner-border $corner-border 0 0;
      border-radius: 0 $corner-radius 0 0;
    }
    &:nth-of-type(3) {
      bottom: 0;
      left: 0;
      border-width: 0 0 $corner-border $corner-border;
      border-radius: 0 0 0 $corner-radius;
    }
    &:nth-of-type(4) {
      bottom: 0;
      right: 0;
      border-width: 0 $corner-border $corner-border 0;
      border-radius: 0 0 $corner-radius 0;
    }
  }
}

#uploadQrcodePic {
  width: 1px;
  height: 1px;
}
</style>
