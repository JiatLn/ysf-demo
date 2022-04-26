<template>
  <div>大风车转转转</div>
  <button btn @click="toStore">兑换商城</button>
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

  const router = useRouter();

  function toStore() {
    router.push({
      name: 'Store',
    });
  }

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
    upsdk.pluginReady(() => {
      upsdk.showFlashInfo({
        msg: '测试支付成功！',
      });
      upsdk.pay({
        tn: 'that.message',
        success: () => {
          // 支付成功, 开发者执行后续操作。
          upsdk.showFlashInfo({
            msg: '测试支付成功！',
          });
        },
        fail: (err) => {
          // 支付失败, err.msg 是失败原因描述, 比如TN号不合法, 或者用户取消了交易 等等。
          upsdk.showFlashInfo({
            msg: err.msg,
          });
        },
      });
    });
  }
</script>

<style scoped lang="scss"></style>

<style lang="scss" scoped></style>
