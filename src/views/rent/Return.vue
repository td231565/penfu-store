<template>
  <div v-loading.fullscreen.lock="isLoading">
    <header class="bg-blue d-flex align-items-center p-2">
      <div class="w-1-3">
        <router-link to="/">
          <i class="el-icon-arrow-left text-white"></i>
        </router-link>
      </div>
      <p class="w-1-3 my-0 text-center text-white">{{ isScan ? '掃碼輸入' : '歸還輸入'}}</p>
    </header>
    <template v-if="isScan">
      <QrcodeStream @decode="onDecode" @init="handlerQrcodeInit">
        <div class="position-relative w-100 h-100">
          <div class="scan-block">
            <div v-for="num in 4" :key="num" class="scan-block-corner"></div>
          </div>
        </div>
      </QrcodeStream>
      <div class="mt-5 d-flex justify-content-center">
        <button class="btn rounded bg-white text-blue" @click="isScan = false">輸入歸還號碼</button>
        <label for="uploadQrcodePic" class="btn rounded bg-white ms-4 overflow-hidden">
          <span class="text-blue">從圖片</span>
          <!-- <button class="btn rounded text-decoration-none bg-white text-blue ms-4">從圖片</button> -->
          <QrcodeCapture accept="image/*" id="uploadQrcodePic" @decode="onDecode"></QrcodeCapture>
        </label>
      </div>
    </template>
    <template v-else>
      <div class="w-70 mx-auto">
        <p>請輸入歸還序號</p>
        <el-input v-model="orderUuid" placeholder="請輸入 qrcode 下方序號"></el-input>
      </div>
      <div class="mt-5 w-50 mx-auto">
        <div class="d-flex justify-content-between w-100">
          <button class="btn rounded bg-white text-blue" @click="orderUuid = ''">重新填寫</button>
          <button class="btn rounded ms-3" @click="submitInput">確認</button>
        </div>
        <button class="btn rounded bg-white text-blue w-100 mt-3" @click="isScan = true">掃描 QR-Code</button>
      </div>
    </template>
  </div>
</template>

<script>
import { QrcodeStream, QrcodeCapture } from 'vue-qrcode-reader'

export default {
  name: 'ReturnScan',
  components: { QrcodeStream, QrcodeCapture },
  data() {
    return {
      isScan: true,
      orderUuid: '',
      isLoading: true
    }
  },
  watch: {
    isScan(status) {
      if (status) {
        this.isLoading = true
      }
    }
  },
  methods: {
    onDecode(str) {
      this.orderUuid = str
      this.gotoCheck(str)
    },
    submitInput() {
      if (!this.orderUuid) { return }
      this.gotoCheck(this.orderUuid)
    },
    async handlerQrcodeInit(promise) {
      try {
        const { capabilities } = await promise
      // successfully initialized
      } catch (error) {
        console.log(error)
        if (error.name === 'NotAllowedError') {
        // user denied camera access permisson
        } else if (error.name === 'NotFoundError') {
        // no suitable camera device installed
        } else if (error.name === 'NotSupportedError') {
        // page is not served over HTTPS (or localhost)
        } else if (error.name === 'NotReadableError') {
        // maybe camera is already in use
        } else if (error.name === 'OverconstrainedError') {
        // did you requested the front camera although there is none?
        } else if (error.name === 'StreamApiNotSupportedError') {
        // browser seems to be lacking features
        }
      } finally {
        // hide loading indicator
        this.isLoading = false
      }
    },
    gotoCheck(uuid) {
      this.$router.push(`/return/success/${uuid}`)
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
