!(function() {
  "using strict";
  function e() {}
  function t(e) {
    return null != e && e == e.window;
  }
  function n(e) {
    return "[object Function]" === Object.prototype.toString.call(e);
  }
  function a(e) {
    return e instanceof Array;
  }
  function o(e) {
    return "[object Object]" === Object.prototype.toString.call(e);
  }
  function i(e) {
    return "number" == typeof e.length;
  }
  function r(e) {
    return o(e) && !t(e) && e.__proto__ == Object.prototype;
  }
  function c(e, t, n) {
    return [].indexOf.call(t, e, n);
  }
  function l(e, t) {
    var n, a;
    if (i(e)) {
      for (n = 0; n < e.length; n++) if (t.call(e[n], n, e[n]) === !1) return e;
    } else for (a in e) if (t.call(e[a], a, e[a]) === !1) return e;
    return e;
  }
  function s(e, t, n) {
    for (var o in t)
      n && (r(t[o]) || a(t[o]))
        ? (r(t[o]) && !r(e[o]) && (e[o] = {}),
          a(t[o]) && !a(e[o]) && (e[o] = []),
          s(e[o], t[o], n))
        : void 0 !== t[o] && (e[o] = t[o]);
  }
  function u(e) {
    var t,
      n = [].slice.call(arguments, 1);
    return (
      "boolean" == typeof e && ((t = e), (e = n.shift())),
      n.forEach(function(n) {
        s(e, n, t);
      }),
      e
    );
  }
  function d() {
    function e(t, n, a, o, i) {
      return N
        ? void (N
            ? C(
                t,
                function(e) {
                  p(n, e);
                },
                a,
                o,
                i
              )
            : I
            ? p(n, V.ESDK_CONFIG_FAILED)
            : window.upsdk.ready(function() {
                e(t, n, a, o, i);
              }))
        : void p(n, V.ESDK_NEED_CONFIG_DONE);
    }
    function t(t, a, o, i, c) {
      t = t || {};
      var s = {};
      r(t) &&
        l(t, function(e, t) {
          n(t) || (s[e] = t);
        }),
        e(
          function(e) {
            var a = t.success;
            n(a) && (n(i) && (e = i(e)), a(e));
          },
          function(e) {
            var a = t.fail || t.cancel;
            a && (n(c) && (e = c(e)), a(e));
          },
          a,
          o,
          [s]
        );
    }
    (W = !0),
      "undefined" != typeof S && (window.upsdk.config(S), (S = void 0)),
      "undefined" != typeof m && (window.upsdk.appletConfig(m), (m = void 0)),
      "undefined" != typeof A && (window.upsdk.appletAuth(A), (A = void 0)),
      u(window.upsdk, {
        pay: function(e) {
          var n = h("pay", e, ["tn"]);
          if (n) return void p(e.fail || e.cancel, n);
          delete e.merchantId;
          var o = /\(updebug\s(\d+)\)/g.exec(E);
          a(o) && o.length >= 2 && "2" === o[1]
            ? (e.mode = "02")
            : (e.mode = "00"),
            t(e, "UPWebPay", "pay", null, function(e) {
              var t = "";
              if (e && "string" == typeof e) {
                var n = JSON.parse(e);
                n && "object" == typeof n && (e = n);
              }
              return (
                "object" == typeof e
                  ? (t = e.desc || e.msg || e.errmsg)
                  : "string" == typeof e && (t = e),
                t || (t = "鏀粯鎻掍欢璋冪敤澶辫触"),
                { msg: t }
              );
            });
        },
        qrPay: function(e) {
          t(e, "UPWebPay", "qrPay");
        },
        uPlanQrPay: function(e) {
          t(e, "UPWebPay", "qrCodePay");
        },
        addBankCard: function(e) {
          (e = e || {}),
            (e.scene = e.scene || "10007"),
            t(e, "UPWebBankCard", "addBankCard");
        },
        addBankCardWithSn: function(e) {
          (e = e || {}),
            (e.Sn = e.Sn || e.sn || e.SN),
            t(e, "UPWebBankCard", "addBankCardWithSn");
        },
        setNavigationBarTitle: function(t) {
          var n;
          (n = "string" == typeof t ? t : t && t.title),
            e(null, null, "UPWebBars", "setNavigationBarTitle", [n]);
        },
        setNavigationBarRightButton: function(e) {
          t(e, "UPWebBars", "setNavigationBarRightButton");
          var a = e && e.handler;
          n(a) &&
            (document.removeEventListener("rightbtnclick", Y),
            (Y = a),
            document.addEventListener("rightbtnclick", Y));
        },
        setTitleStyle: function(e) {
          t(e, "UPWebBars", "setTitleStyle");
        },
        closeWebApp: function(e) {
          t(e, "UPWebClosePage", "closeWebApp");
        },
        showFlashInfo: function(t) {
          var n;
          (n = "string" == typeof t ? t : t && t.msg),
            n && e(null, null, "UPWebUI", "showFlashInfo", [n]);
        },
        scanQRCode: function(e) {
          t(e, "UPWebUI", "scanQRCode", function(e) {
            return r(e) && e.value && (e = e.value), e;
          });
        },
        chooseImage: function(e) {
          (e.maxWidth && e.maxHeight) ||
            ((e.maxWidth = 500), (e.maxHeight = 1e3)),
            (e.sourceType = e.sourceType || "3"),
            t(e, "UPWebUI", "chooseImage", function(e) {
              "string" == typeof e && (e = JSON.parse(e));
              var t = e.url,
                n = "";
              if (t) {
                var a = t.lastIndexOf(".");
                n = t.substr(a + 1).trim();
              } else n = "jpg";
              return { base64: e.base64, type: n };
            });
        },
        scanQRCodeNew: function(e) {
          t(e, "UPWebUI", "scanQRCodeNew");
        },
        qrCodePay: function(e) {
          t(e, "UPWebUI", "qrCodePay");
        },
        showSharePopup: function(e) {
          function t(t) {
            var n = {
              title: e.title,
              content: e.desc,
              desc: e.desc,
              picUrl: e.picUrl,
              imgUrl: e.picUrl,
              shareUrl:
                e.shareUrl +
                (e.shareUrl.indexOf("?") < 0
                  ? "?channel=" + t
                  : "&channel=" + t),
              channel: t
            };
            switch (t) {
              case 0:
                b && (n.content = e.content + " " + e.shareUrl);
                break;
              case 1:
                n.content = e.content + " " + e.shareUrl;
                break;
              case 3:
              case 4:
              case 5:
              case 6:
                break;
              case 7:
                b || (n.shareUrl = e.title + " " + e.shareUrl);
            }
            return n;
          }
          e.title || (e.title = ""),
            e.desc || (e.desc = ""),
            (e.content = e.desc),
            e.picUrl ||
              (e.picUrl =
                "https://base.95516.com/s/wl/web/402/images/common/logo.png"),
            (e.imgUrl = e.picUrl),
            e.shareUrl || (e.shareUrl = location.href),
            (window.unionpayWalletShareContent_iOS = function(e) {
              var n = t(e);
              return (
                "function" == typeof shareCallback && (n = shareCallback(e, n)),
                JSON.stringify(n)
              );
            }),
            (window.unionpayWalletShareContent_Android = function(e) {
              var n = t(e);
              "function" == typeof shareCallback && (n = shareCallback(e, n)),
                share_utils &&
                  "function" == typeof share_utils.setCommonTemplate &&
                  share_utils.setCommonTemplate(JSON.stringify(n));
            }),
            C(null, null, "UPWebBars", "prefetchImage", [e]),
            C(null, null, "UPWalletPlugin", "showSharePopup", [e]);
        },
        getLocationCity: function(e) {
          (e = e || {}),
            (e.type = "0"),
            t(e, "UPWalletPlugin", "fetchNativeData", function(e) {
              return "string" == typeof e && (e = JSON.parse(e)), e.cityCd;
            });
        },
        getLocationGps: function(e) {
          (e = e || {}),
            (e.type = "1"),
            t(e, "UPWalletPlugin", "fetchNativeData");
        },
        verifyPayPwd: function(e) {
          t(e, "UPWebAccount", "verifyPayPwd");
        },
        getUserLogoutDate: function(e) {
          t(e, "UPWebAccount", "getUserLogoutDate");
        },
        chooseFileFromAlbum: function(e) {
          t(e, "UPWebNativeInfo", "chooseFileFromAlbum");
        },
        readAlbumData: function(e) {
          t(e, "UPWebNativeInfo", "readAlbumData");
        },
        startAudioRecording: function(e) {
          t(e, "UPWebNativeInfo", "startAudioRecording");
        },
        stopAudioRecording: function(e) {
          t(e, "UPWebNativeInfo", "stopAudioRecording");
        },
        readAudioRecordingData: function(e) {
          t(e, "UPWebNativeInfo", "readAudioRecordingData");
        },
        startVideoRecording: function(e) {
          t(e, "UPWebNativeInfo", "startVideoRecording");
        },
        readVideoRecordingData: function(e) {
          t(e, "UPWebNativeInfo", "readVideoRecordingData");
        },
        readFaceVideoData: function(e) {
          t(e, "UPWebNativeInfo", "readFaceVideoData");
        },
        readFaceImageData: function(e) {
          t(e, "UPWebNativeInfo", "readFaceImageData");
        },
        noteInfoChange: function(e) {
          t(e, "UPNotesInfoPlugin", "noteInfoChange");
        },
        openRNPage: function(e) {
          t(e, "UPWebNewPage", "openRNPage");
        },
        prepareApplet: function(e) {
          t(e, "UPWebNewPage", "prepareApplet");
        },
        openApplet: function(e) {
          t(e, "UPWebNewPage", "openApplet");
        },
        createWebView: function(t) {
          e(null, null, "UPWebNewPage", "createWebPage", [
            JSON.stringify({
              title: t.title,
              url: t.url,
              loading: "yes",
              toolbar: "no",
              isFinish: t.isFinish || "0"
            })
          ]);
        },
        navi: function(e) {
          t(e, "UPCarCodePlugin", "navi");
        },
        setScreenBrightness: function(e) {
          t(e, "UPCarCodePlugin", "setScreenBrightness");
        },
        getScreenBrightness: function(e) {
          t(e, "UPCarCodePlugin", "getScreenBrightness");
        },
        changeScreenShot: function(e) {
          t(e, "UPWebUI", "changeScreenShot");
        },
        monitorScreenShot: function(e) {
          t(e, "UPCarCodePlugin", "monitorScreenShot");
          var a = e && e.success;
          n(a) &&
            (document.removeEventListener("screenShotAction", Z),
            (Z = a),
            document.addEventListener("screenShotAction", Z));
        },
        removeScreenShot: function(e) {
          t(e, "UPCarCodePlugin", "removeScreenShot"),
            document.removeEventListener("screenShotAction", Z);
        },
        addCommonApp: function(e) {
          t(e, "UPAddCommonAppPlugin", "addCommonApp");
        },
        logEvent: function(e) {
          t(e, "UPWebAnalysis", "logEvent");
        },
        openBluetoothAdapter: function(e) {
          t(e, "UPWPluginBluetooth", "openBluetoothAdapter");
        },
        closeBluetoothAdapter: function(e) {
          t(e, "UPWPluginBluetooth", "closeBluetoothAdapter");
        },
        getBluetoothAdapterState: function(e) {
          t(e, "UPWPluginBluetooth", "getBluetoothAdapterState");
        },
        startBluetoothDevicesDiscovery: function(e) {
          t(e, "UPWPluginBluetooth", "startBluetoothDevicesDiscovery");
        },
        stopBluetoothDevicesDiscovery: function(e) {
          t(e, "UPWPluginBluetooth", "stopBluetoothDevicesDiscovery");
        },
        getBluetoothDevices: function(e) {
          t(e, "UPWPluginBluetooth", "getBluetoothDevices");
        },
        getConnectedBluetoothDevices: function(e) {
          t(e, "UPWPluginBluetooth", "getConnectedBluetoothDevices");
        },
        connectBLEDevice: function(e) {
          t(e, "UPWPluginBluetooth", "connectBLEDevice");
        },
        disconnectBLEDevice: function(e) {
          t(e, "UPWPluginBluetooth", "disconnectBLEDevice");
        },
        writeBLECharacteristicValue: function(e) {
          t(e, "UPWPluginBluetooth", "writeBLECharacteristicValue");
        },
        readBLECharacteristicValue: function(e) {
          t(e, "UPWPluginBluetooth", "readBLECharacteristicValue");
        },
        notifyBLECharacteristicValueChange: function(e) {
          t(e, "UPWPluginBluetooth", "notifyBLECharacteristicValueChange");
        },
        getBLEDeviceServices: function(e) {
          t(e, "UPWPluginBluetooth", "getBLEDeviceServices");
        },
        getBLEDeviceCharacteristics: function(e) {
          t(e, "UPWPluginBluetooth", "getBLEDeviceCharacteristics");
        },
        registerBluetoothDeviceFound: function(e) {
          t(e, "UPWPluginBluetooth", "registerBluetoothDeviceFound");
          var a = e && e.callback;
          n(a) &&
            (document.removeEventListener("BluetoothDeviceFound", ee),
            (ee = a),
            document.addEventListener("BluetoothDeviceFound", ee));
        },
        cancelBluetoothDeviceFound: function(e) {
          t(e, "UPWPluginBluetooth", "cancelBluetoothDeviceFound");
        },
        registerBLEConnectionStateChange: function(e) {
          t(e, "UPWPluginBluetooth", "registerBLEConnectionStateChange");
          var a = e && e.callback;
          n(a) &&
            (document.removeEventListener("BLEConnectionStateChange", te),
            (te = a),
            document.addEventListener("BLEConnectionStateChange", te));
        },
        cancelBLEConnectionStateChange: function(e) {
          t(e, "UPWPluginBluetooth", "cancelBLEConnectionStateChange");
        },
        registerBLECharacteristicValueChange: function(e) {
          t(e, "UPWPluginBluetooth", "registerBLECharacteristicValueChange");
          var a = e && e.callback;
          n(a) &&
            (document.removeEventListener("BLECharacteristicValueChange", ne),
            (ne = a),
            document.addEventListener("BLECharacteristicValueChange", ne));
        },
        cancelBLECharacteristicValueChange: function(e) {
          t(e, "UPWPluginBluetooth", "cancelBLECharacteristicValueChange");
        },
        registerBluetoothAdapterStateChange: function(e) {
          t(e, "UPWPluginBluetooth", "registerBluetoothAdapterStateChange");
          var a = e && e.callback;
          n(a) &&
            (document.removeEventListener("BluetoothAdapterStateChange", ae),
            (ae = a),
            document.addEventListener("BluetoothAdapterStateChange", ae));
        },
        cancelBluetoothAdapterStateChange: function(e) {
          t(e, "UPWPluginBluetooth", "cancelBluetoothAdapterStateChange");
        },
        openBluetoothSetting: function(e) {
          t(e, "UPWPluginBluetooth", "openBluetoothSetting");
        },
        getHCEState: function(e) {
          t(e, "UPHceManagerPlugin", "getHCEState");
        },
        startHCE: function(e) {
          t(e, "UPHceManagerPlugin", "startHCE");
        },
        stopHCE: function(e) {
          t(e, "UPHceManagerPlugin", "stopHCE");
        },
        sendHCEMessage: function(e) {
          t(e, "UPHceManagerPlugin", "sendHCEMessage");
        },
        onHCEMessage: function(e) {
          t(e, "UPHceManagerPlugin", "onHCEMessage");
        },
        openNFCSetting: function(e) {
          t(e, "UPHceManagerPlugin", "openNFCSetting");
        },
        saveData: function(e) {
          t(e, "UPXAppletDataPlugin", "saveData");
        },
        queryData: function(e) {
          t(e, "UPXAppletDataPlugin", "queryData");
        },
        deleteData: function(e) {
          t(e, "UPXAppletDataPlugin", "deleteData");
        },
        getAllKeys: function(e) {
          t(e, "UPXAppletDataPlugin", "getAllKeys");
        },
        deleteAllKeys: function(e) {
          t(e, "UPXAppletDataPlugin", "deleteAllKeys");
        },
        showShareMorePanel: function(e) {
          function t(t) {
            e.shareUrl +=
              e.shareUrl.indexOf("?") < 0 ? "?channel=" + t : "&channel=" + t;
            var n = {
              title: e.title,
              content: e.desc,
              desc: e.desc,
              picUrl: e.picUrl,
              imgUrl: e.picUrl,
              shareUrl: e.shareUrl,
              channel: t
            };
            switch (t) {
              case 0:
                b && (n.content = e.content + " " + e.shareUrl);
                break;
              case 1:
                n.content = e.content + " " + e.shareUrl;
                break;
              case 3:
              case 4:
              case 5:
              case 6:
                break;
              case 7:
                b || (n.shareUrl = e.title + " " + e.shareUrl);
            }
            return n;
          }
          e.title || (e.title = ""),
            e.desc || (e.desc = ""),
            (e.content = e.desc),
            e.picUrl ||
              (e.picUrl =
                "https://base.95516.com/s/wl/webV3/402/images/common/logo.png"),
            (e.imgUrl = e.picUrl),
            e.shareUrl || (e.shareUrl = location.href),
            e.shareList ||
              (e.shareList = [
                { shareId: "0", shareType: "1", shareData: {} },
                { shareId: "1", shareType: "1", shareData: {} },
                { shareId: "3", shareType: "1", shareData: {} },
                { shareId: "4", shareType: "1", shareData: {} },
                { shareId: "5", shareType: "1", shareData: {} },
                { shareId: "6", shareType: "1", shareData: {} },
                { shareId: "7", shareType: "1", shareData: {} }
              ]),
            (window.unionpayWalletShareContent_iOS = function(n) {
              var a = t(n);
              return (
                "function" == typeof e.shareCallback &&
                  (a = e.shareCallback(n, a)),
                JSON.stringify(a)
              );
            }),
            (window.unionpayWalletShareContent_Android = function(n) {
              var a = t(n);
              "function" == typeof e.shareCallback &&
                (a = e.shareCallback(n, a)),
                share_utils &&
                  "function" == typeof share_utils.setCommonTemplate &&
                  share_utils.setCommonTemplate(JSON.stringify(a));
            });
          var n = {};
          (n.shareList = e.shareList),
            C(null, null, "UPWebBars", "prefetchImage", [e]),
            C(e.success, e.fail, "UPSharePlugin", "showSharePopupNew", [n]);
        },
        shareSinglePlugin: function(e) {
          function t(t) {
            e.shareUrl +=
              e.shareUrl.indexOf("?") < 0 ? "?channel=" + t : "&channel=" + t;
            var n = {
              title: e.title,
              content: e.desc,
              desc: e.desc,
              picUrl: e.picUrl,
              imgUrl: e.picUrl,
              shareUrl: e.shareUrl,
              channel: t
            };
            switch (t) {
              case 0:
                b && (n.content = e.content + " " + e.shareUrl);
                break;
              case 1:
                n.content = e.content + " " + e.shareUrl;
                break;
              case 3:
              case 4:
              case 5:
              case 6:
                break;
              case 7:
                b || (n.shareUrl = e.title + " " + e.shareUrl);
            }
            return n;
          }
          e.title || (e.title = ""),
            e.desc || (e.desc = ""),
            (e.content = e.desc),
            e.picUrl ||
              (e.picUrl =
                "https://base.95516.com/s/wl/webV3/402/images/common/logo.png"),
            (e.imgUrl = e.picUrl),
            e.shareUrl || (e.shareUrl = location.href),
            e.shareId ||
              $.extend(e, { shareId: "3", shareType: "1", shareData: {} }),
            (window.unionpayWalletShareContent_iOS = function(n) {
              var a = t(n);
              return (
                "function" == typeof e.shareCallback &&
                  (a = e.shareCallback(n, a)),
                JSON.stringify(a)
              );
            }),
            (window.unionpayWalletShareContent_Android = function(n) {
              var a = t(n);
              "function" == typeof e.shareCallback &&
                (a = e.shareCallback(n, a)),
                share_utils &&
                  "function" == typeof share_utils.setCommonTemplate &&
                  share_utils.setCommonTemplate(JSON.stringify(a));
            });
          var n = {};
          (n.shareId = e.shareId),
            (n.shareType = e.shareType),
            (n.shareData = e.shareData),
            C(null, null, "UPWebBars", "prefetchImage", [e]),
            C(e.success, e.fail, "UPSharePlugin", "shareContent", [n]);
        },
        appletSharePopup: function(e) {
          t(e, "UPSharePlugin", "appletSharePopup");
        },
        setAppletShareInfo: function(e) {
          t(e, "UPSharePlugin", "setAppletShareInfo");
        },
        bioDetect: function(e) {
          t(e, "UPFacePlugin", "bioDetect");
        },
        addConsole: function(e) {
          t(e, "UPWLogPlugin", "addConsole");
        },
        recentlyUsedAppletList: function(e) {
          t(e, "UPWAppletCapacityPlugin", "recentlyUsedAppletList");
        },
        deleteRecentlyUsedApplet: function(e) {
          t(e, "UPWAppletCapacityPlugin", "deleteRecentlyUsedApplet");
        },
        collectApplet: function(e) {
          t(e, "UPWAppletCapacityPlugin", "collectApplet");
        },
        cancelCollectApplet: function(e) {
          t(e, "UPWAppletCapacityPlugin", "cancelCollectApplet");
        },
        getAppletCollectionList: function(e) {
          t(e, "UPWAppletCapacityPlugin", "getAppletCollectionList");
        },
        collectCurrentApplet: function(e) {
          t(e, "UPWAppletCapacityPlugin", "collectCurrentApplet");
        },
        getScreenParams: function(e) {
          t(e, "UPScreenParamsPlugin", "getScreenParams");
        },
        setSharedData: function(e) {
          t(e, "UPWPluginLiteApp", "setSharedData");
        },
        getSharedData: function(e) {
          t(e, "UPWPluginLiteApp", "getSharedData");
        },
        navigateTo: function(e) {
          t(e, "UPWPluginLiteApp", "navigateTo");
        },
        navigateBack: function(e) {
          t(e, "UPWPluginLiteApp", "navigateBack");
        },
        redirectTo: function(e) {
          t(e, "UPWPluginLiteApp", "redirectTo");
        },
        reLaunch: function(e) {
          t(e, "UPWPluginLiteApp", "reLaunch");
        },
        switchTab: function(e) {
          t(e, "UPWPluginLiteApp", "switchTab");
        },
        registerLifecycle: function(e) {
          var a = [
            "rerender",
            "onAppLoad",
            "onAppShow",
            "onAppHide",
            "onPageShow",
            "onPageHide",
            "onPageLoad"
          ];
          for (var o in e)
            e.hasOwnProperty(o) && a.indexOf(o) > -1 && n(e[o]) && U(o, e[o]);
          t(e, "UPWPluginLiteApp", "ready");
        }
      }),
      D.length &&
        ((N = !0),
        l(D, function(e, t) {
          n(t) && t();
        }));
  }
  function p(e, t) {
    t && "string" == typeof t && (t = { msg: t });
    var a;
    if (window.cordova)
      switch (window.cordova.errorRetStatus) {
        case window.cordova.callbackStatus.INVALID_ACTION:
          a = V.ESDK_PLUGIN_INVALID_ACTION;
          break;
        case window.cordova.callbackStatus.CLASS_NOT_FOUND_EXCEPTION:
          a = V.ESDK_PLUGIN_CLASS_NOT_FOUND;
          break;
        case window.cordova.callbackStatus.ILLEGAL_ACCESS_EXCEPTION:
          a = V.ESDK_PLUGIN_ILLEGAL_ACCESS;
      }
    if ((a && (t = a), n(e))) e(t);
    else if (t) {
      var o = t.errmsg || t.msg || t.desc,
        i = t.errcode || t.code;
      i && (o += " [" + i + "]"), g(o);
    }
    window.cordova &&
      (window.cordova.errorRetStatus = window.cordova.callbackStatus.OK);
  }
  function g(e) {
    O &&
      e &&
      (N && c("showFlashInfo", window.upsdk.jsApiList)
        ? C(null, null, "UPWebUI", "showFlashInfo", [e])
        : alert(e));
  }
  function h(e, t, n) {
    for (var a, o = 0; o < n.length; ++o)
      if (!t[n[o]]) {
        a = n[o];
        break;
      }
    if (a) {
      var i = e + "璋冪敤鏂规硶缂哄皯鍙傛暟" + a;
      return i;
    }
    return "";
  }
  function f(e) {
    n(w) && ("string" == typeof e && (e = { msg: e }), w(e));
  }
  function P() {
    window.upConsole = !0;
    var e = document.createElement("script");
    (e.type = "text/javascript"),
      (e.src = y),
      document.getElementsByTagName("head")[0].appendChild(e);
  }
  function v(e) {
    return e
      ? e.resultString
        ? e.resultString
        : e.resultParams
        ? e.resultParams
        : void 0
      : e;
  }
  function C(e, t, a, o, i) {
    G && window.cordova
      ? window.cordova.exec(e, t, a, o, i)
      : q &&
        window.WebViewJavascriptBridge &&
        window.WebViewJavascriptBridge.callHandler(
          a,
          o,
          i,
          function(t) {
            n(e) && e(v(t));
          },
          function(e) {
            n(t) && t(v(e));
          }
        );
  }
  function U(e, t) {
    b &&
    window.WebViewJavascriptBridge &&
    window.WebViewJavascriptBridge.registerHandler
      ? window.WebViewJavascriptBridge.registerHandler(e, t)
      : (document.removeEventListener(e, oe[e]),
        (oe[e] = t),
        document.addEventListener(e, oe[e]));
  }
  var S,
    m,
    A,
    w,
    B,
    y,
    E = navigator.userAgent.toLowerCase(),
    L =
      new RegExp(/(com.unionpay.chsp)/).test(E) ||
      new RegExp(/(com.unionpay.mobilepay)/).test(E),
    b = new RegExp(/iphone|ipad|ipod/).test(E),
    D = [],
    W = !1,
    N = !1,
    I = !1,
    _ = [],
    k = {},
    O = !1,
    T = /\(version\s(\d+)\)/g.exec(E),
    F = a(T) && T.length >= 2 && T[1],
    V = {
      ESDK_BAD_PARAMS: { errcode: "c00", errmsg: "鍙傛暟閿欒" },
      ESDK_CONFIG_FAILED: {
        errcode: "c01",
        errmsg: "绛惧悕鏈€氳繃, 涓嶈兘璁块棶鎻掍欢"
      },
      ESDK_PLUGIN_ILLEGAL_ACCESS: {
        errcode: "c02",
        errmsg: "ILLEGAL_ACCESS_EXCEPTION: 鏃犳潈闄愯闂鎻掍欢锛�"
      },
      ESDK_PLUGIN_INVALID_ACTION: {
        errcode: "c03",
        errmsg: "INVALID_ACTION_EXCEPTION: 鎻掍欢閲岄潰娌℃湁姝ゆ柟娉曪紒"
      },
      ESDK_PLUGIN_CLASS_NOT_FOUND: {
        errcode: "c04",
        errmsg: "CLASS_NOT_FOUND_EXCEPTION: 姝ゆ彃浠舵病鏈夊疄鐜帮紒"
      },
      ESDK_NEED_CONFIG_DONE: {
        errcode: "c05",
        errmsg: "config鎵ц鎴愬姛浠ュ悗鎵嶈兘璋冪敤鎻掍欢鏂规硶"
      },
      ESDK_NOT_IN_WALLET: {
        errcode: "c101",
        errmsg: "upsdk.js蹇呴』琚簯闂粯鍔犺浇"
      },
      ESDK_NEED_NEW_VERSION: {
        errcode: "c102",
        errmsg: "鎮ㄦ墜鏈轰笂浜戦棯浠樼増鏈お浣�,璇峰畨瑁呮柊鐗堟湰!"
      }
    };
  if (
    ((window.upsdk = window.upsdk || {}),
    (window.upsdk.isInsideWallet = L),
    (window.upsdk.checkSdkSupport = (function() {
      return !!F && (b ? F >= "422" : F >= "422");
    })()),
    L)
  ) {
    var R = document.createElement("script"),
      H = b ? "ios" : "android",
      j = /\(updebug\s(\d+)\)/g.exec(E)[1],
      x = /\(cordova\s([\d\.]+)\)/g.exec(E),
      K = x && x.length > 1 && x[1],
      G = x && K,
      J = /\(securitywebcache\s([\d\.]+)\)/g.exec(E),
      M = J && J.length > 1 && J[1],
      q = J && M,
      X = (function() {
        return {
          0: "https://open.95516.com/s/open/",
          2: "http://172.18.179.10/s/open/"
        }[j];
      })();
    y = X + "common/upconsole.min.js";
    var Q;
    if (G) Q = X + "common/cordova/" + H + "." + K + "/cordova.js";
    else {
      if (!q) return;
      Q = X + "common/jsbridge/" + H + "." + M + "/WebViewJavascriptBridge.js";
    }
    R.setAttribute("type", "text/javascript"),
      R.setAttribute("src", Q),
      document.getElementsByTagName("head")[0].appendChild(R),
      G ? document.addEventListener("deviceready", d) : q && (R.onload = d);
  }
  var z = [
    "pay",
    "addBankCard",
    "setNavigationBarTitle",
    "setNavigationBarRightButton",
    "closeWebApp",
    "showFlashInfo",
    "scanQRCode",
    "chooseImage",
    "getLocationCity",
    "getLocationGps",
    "verifyPayPwd",
    "showSharePopup",
    "chooseFileFromAlbum",
    "readAlbumData",
    "startAudioRecording",
    "stopAudioRecording",
    "readAudioRecordingData",
    "startVideoRecording",
    "readVideoRecordingData",
    "readFaceVideoData",
    "readFaceImageData",
    "noteInfoChange",
    "openRNPage",
    "navi",
    "setScreenBrightness",
    "getScreenBrightness",
    "changeScreenShot",
    "monitorScreenShot",
    "removeScreenShot",
    "addCommonApp",
    "logEvent",
    "openBluetoothAdapter",
    "closeBluetoothAdapter",
    "getBluetoothAdapterState",
    "startBluetoothDevicesDiscovery",
    "stopBluetoothDevicesDiscovery",
    "getBluetoothDevices",
    "getConnectedBluetoothDevices",
    "connectBLEDevice",
    "disconnectBLEDevice",
    "writeBLECharacteristicValue",
    "readBLECharacteristicValue",
    "notifyBLECharacteristicValueChange",
    "getBLEDeviceServices",
    "getBLEDeviceCharacteristics",
    "registerBluetoothDeviceFound",
    "cancelBluetoothDeviceFound",
    "registerBLEConnectionStateChange",
    "cancelBLEConnectionStateChange",
    "registerBLECharacteristicValueChange",
    "cancelBLECharacteristicValueChange",
    "registerBluetoothAdapterStateChange",
    "cancelBluetoothAdapterStateChange",
    "openBluetoothSetting",
    "getHCEState",
    "startHCE",
    "stopHCE",
    "sendHCEMessage",
    "onHCEMessage",
    "openNFCSetting",
    "scanQRCodeNew",
    "qrCodePay",
    "setTitleStyle",
    "prepareApplet",
    "openApplet",
    "createWebView",
    "saveData",
    "queryData",
    "deleteData",
    "getAllKeys",
    "deleteAllKeys",
    "addBankCardWithSn",
    "showShareMorePanel",
    "shareSinglePlugin",
    "addConsole",
    "recentlyUsedAppletList",
    "deleteRecentlyUsedApplet",
    "collectApplet",
    "cancelCollectApplet",
    "getAppletCollectionList",
    "getScreenParams",
    "qrPay",
    "uPlanQrPay",
    "collectCurrentApplet",
    "setSharedData",
    "getSharedData",
    "navigateTo",
    "navigateBack",
    "redirectTo",
    "reLaunch",
    "switchTab"
  ];
  (window.upsdk = window.upsdk || {}),
    l(z, function(t, n) {
      window.upsdk[n] = e;
    }),
    (window.upsdk.jsApiList = []);
  var Y = null,
    Z = null,
    ee = null,
    te = null,
    ne = null,
    ae = null,
    oe = {};
  u(window.upsdk, {
    config: function(e) {
      function t(e) {
        var t = {};
        return (
          a(e) &&
            l(e, function(e, n) {
              r(n) && (t[n.plugin] = n.actions);
            }),
          t
        );
      }
      if (!r(e)) return void p(null, V.ESDK_BAD_PARAMS);
      e.debug && ((O = !0), P(), delete e.debug);
      var o = h("config", e, ["appId", "nonceStr", "timestamp", "signature"]);
      if (!o && e.url) {
        var i = window.location.href.split("#")[0];
        e.url !== i &&
          (o = "绛惧悕鍥犲瓙url鍙栧€间笉姝ｇ‘, 姝ｇ‘鐨勫簲璇ユ槸" + i);
      }
      return o
        ? (p(null, o), void f(o))
        : ((o = ""),
          L || (o = V.ESDK_NOT_IN_WALLET),
          o
            ? void f(o)
            : void (W
                ? C(
                    function(e) {
                      (N = !0),
                        (I = !1),
                        "string" == typeof e && (e = JSON.parse(e)),
                        e.params && (e = e.params),
                        (k = (e && e.jsApiList && t(e.jsApiList)) || {});
                      var o = [];
                      l(k, function(e, t) {
                        a(t) && (o = o.concat(t));
                      });
                      var i = c("fetchNativeData", o);
                      i >= 0 &&
                        o.splice(i, 1, "getLocationCity", "getLocationGps"),
                        (window.upsdk.jsApiList = o),
                        O &&
                          window.uplog &&
                          window.uplog(
                            "you can use plugins:" + window.upsdk.jsApiList
                          ),
                        _.length &&
                          l(_, function(e, t) {
                            n(t) && t();
                          }),
                        g("config ok");
                    },
                    function(e) {
                      (I = !0),
                        (N = !1),
                        (B = e),
                        n(w) && w(e),
                        g("config error: " + e);
                    },
                    "UPWebSdk",
                    "config",
                    [e]
                  )
                : (S = e)));
    },
    ready: function(e) {
      n(e) && (N ? e() : _.push(e));
    },
    error: function(t) {
      (t = (n(t) && t) || e), I ? t(B) : (w = t);
    },
    appletConfig: function(e) {
      if (W) {
        var t = null,
          a = null;
        n(e.success) && ((t = e.success), delete e.success),
          n(e.fail) && ((a = e.fail), delete e.fail),
          C(
            function(e) {
              (N = !0), t(e);
            },
            function(e) {
              p(a, e);
            },
            "UPWebSdk",
            "appletConfig",
            [e]
          );
      } else m = e;
    },
    appletAuth: function(e) {
      if (W) {
        var t = null,
          a = null;
        n(e.success) && ((t = e.success), delete e.success),
          n(e.fail) && ((a = e.fail), delete e.fail),
          C(
            t,
            function(e) {
              p(a, e);
            },
            "UPWebSdk",
            "appletAuth",
            [e]
          );
      } else A = e;
    },
    pluginReady: function(e) {
      n(e) && (W ? ((N = !0), e()) : D.push(e));
    }
  }),
    "undefined" != typeof define &&
      define(function() {
        return window.upsdk;
      });
})();
