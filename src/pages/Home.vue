<template>
  <p text-center py-3>hello ysf</p>
  <section flex-c gap-2>
    <UPButton
      :timeout="2000"
      class="customBtn"
      scope="scope.mobile"
      text="授权mobile"
      btn
      @click="btnClick"
    />
    <UPButton
      :timeout="2000"
      class="customBtn"
      scope="scope.auth"
      text="授权auth"
      btn
      @click="btnClick"
    />
    <button btn @click="wakeShare">share</button>
  </section>
</template>

<script setup lang="ts">
  import { Toast } from 'vant';

  function btnClick(isSuccess: boolean, result: any) {
    console.log(result);
    if (!isSuccess) {
      Toast.fail(result.errmsg);
    } else {
      Toast.success('授权成功');
    }
  }

  function wakeShare() {
    console.log(111);
    upsdk.pluginReady(function () {
      console.log(222);
      upsdk.showFlashInfo({
        msg: '绑定银行卡成功',
      });
      upsdk.createWebView({
        url: 'https://qxwouffjun.feishu.cn/docs/doccnCYISz6edfYReFiF6DZ4SSY', // 新webview容器中运行的目标页面地址
        isFinish: '1', //是否关闭当前的窗口,'1':关闭，'0':不关闭
      });
    });
  }
</script>

<style lang="scss" scoped></style>
