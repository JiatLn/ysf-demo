<template>
  <button :scope="props.scope" :timeout="props.timeout" @click="handleClick">
    {{ text }}
  </button>
</template>

<script setup lang="ts">
  import { callNative } from '@/app/core';

  const props = defineProps<{
    scope: 'scope.mobile' | 'scope.auth';
    timeout: number;
    text: string;
  }>();

  const btnDisable = ref(false);
  const _count = ref(0);
  const _timeout = ref(0);

  const emits = defineEmits<{
    (e: 'click', isSuccess: boolean, msg: unknown): void;
  }>();

  function appletExplicitAuth(success: any, fail: any) {
    let iCanCall = callNative(
      function (data: any) {
        if (typeof success === 'function') {
          success(data);
        }
      },
      function (err: any) {
        if (typeof fail === 'function') {
          let cordovaError;
          // @ts-ignore
          if (window.cordova) {
            // @ts-ignore
            switch (window.cordova.errorRetStatus) {
              // @ts-ignore
              case window.cordova.callbackStatus.INVALID_ACTION:
                cordovaError = {
                  errcode: 'c03',
                  errmsg: 'INVALID_ACTION_EXCEPTION: 插件里面没有此方法！',
                };
                break;
              // @ts-ignore
              case window.cordova.callbackStatus.CLASS_NOT_FOUND_EXCEPTION:
                cordovaError = {
                  errcode: 'c04',
                  errmsg: 'CLASS_NOT_FOUND_EXCEPTION: 此插件没有实现！',
                };
                break;
              // @ts-ignore
              case window.cordova.callbackStatus.ILLEGAL_ACCESS_EXCEPTION:
                cordovaError = {
                  errcode: 'c02',
                  errmsg: 'ILLEGAL_ACCESS_EXCEPTION: 无权限访问此插件！',
                };
                break;
              default:
                break;
            }
          }
          if (cordovaError) {
            fail(cordovaError);
          } else {
            fail(err);
          }
        }
      },
      'UPWebSdk',
      'appletExplicitAuth',
      [{ scope: props.scope }]
    );
    if (!iCanCall) {
      setTimeout(() => {
        _count.value++;
        if (_count.value > _timeout.value / 20) {
          console.warn('请确定是否运行在云闪付APP中,且成功加载了upsdk.js');
          fail({
            errcode: '__ENV__10001',
            errmsg: '检测到未在云闪付APP中运行或未成功加载upsdk.js',
          });
        } else {
          appletExplicitAuth(success, fail);
        }
      }, 20);
    }
  }
  function handleClick() {
    if (btnDisable.value) return;
    if (props.timeout && isNaN(props.timeout)) {
      emits('click', false, {
        errcode: '__ENV__10002',
        errmsg: '检测到timeout值非法',
      });
      return;
    }
    _count.value = 0;
    _timeout.value = props.timeout || 2000; // 默认2s超时
    btnDisable.value = true; // 防止多次点击，直到回调中才释放
    appletExplicitAuth(
      (data: any) => {
        btnDisable.value = false;
        emits('click', true, data);
      },
      (err: any) => {
        btnDisable.value = false;
        emits('click', false, err);
      }
    );
  }
</script>

<style scoped lang="scss"></style>
