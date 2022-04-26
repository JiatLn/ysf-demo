function getCurrentScript() {
  var descriptor = Object.getOwnPropertyDescriptor(document, 'currentScript');
  // for chrome
  if (!descriptor && 'currentScript' in document && document.currentScript) {
    return document.currentScript;
  }

  // for other browsers with native support for currentScript
  if (descriptor && descriptor.get !== getCurrentScript && document.currentScript) {
    return document.currentScript;
  }

  // IE 8-10 support script readyState
  // IE 11+ & Firefox support stack trace
  try {
    throw new Error();
  } catch (err) {
    // Find the second match for the "at" string to get file src url from stack.
    var ieStackRegExp = /.*at [^(]*\((.*):(.+):(.+)\)$/gi,
      ffStackRegExp = /@([^@]*):(\d+):(\d+)\s*$/gi,
      stackDetails = ieStackRegExp.exec(err.stack) || ffStackRegExp.exec(err.stack),
      scriptLocation = (stackDetails && stackDetails[1]) || false,
      line = (stackDetails && stackDetails[2]) || false,
      currentLocation = document.location.href.replace(document.location.hash, ''),
      pageSource,
      inlineScriptSourceRegExp,
      inlineScriptSource,
      scripts = document.getElementsByTagName('script'); // Live NodeList collection

    if (scriptLocation === currentLocation) {
      pageSource = document.documentElement.outerHTML;
      inlineScriptSourceRegExp = new RegExp(
        '(?:[^\\n]+?\\n){0,' + (line - 2) + '}[^<]*<script>([\\d\\D]*?)<\\/script>[\\d\\D]*',
        'i'
      );
      inlineScriptSource = pageSource.replace(inlineScriptSourceRegExp, '$1').trim();
    }

    for (var i = 0; i < scripts.length; i++) {
      // If ready state is interactive, return the script tag
      if (scripts[i].readyState === 'interactive') {
        return scripts[i];
      }

      // If src matches, return the script tag
      if (scripts[i].src === scriptLocation) {
        return scripts[i];
      }

      // If inline source matches, return the script tag
      if (
        scriptLocation === currentLocation &&
        scripts[i].innerHTML &&
        scripts[i].innerHTML.trim() === inlineScriptSource
      ) {
        return scripts[i];
      }
    }

    // If no match, return null
    return null;
  }
}

if (typeof window !== 'undefined') {
  var currentScript = window.document.currentScript;
  if (true) {
    currentScript = getCurrentScript();

    // for backward compatibility, because previously we directly included the polyfill
    if (!('currentScript' in document)) {
      Object.defineProperty(document, 'currentScript', { get: getCurrentScript });
    }
  }

  var src = currentScript && currentScript.src.match(/(.+\/)[^/]+\.js(\?.*)?$/);
  if (src) {
    __webpack_require__.p = src[1] // eslint-disable-line
  }
}

const _agent = navigator.userAgent.toLowerCase();

const isJSBridgeEnv = /\(securitywebcache\s([\d\.]+)\)/g.test(_agent);
const isCordovaEnv = /\(cordova\s([\d\.]+)\)/g.test(_agent);

export function callNative(success: any, fail: any, plugin: any, action: any, paramArray: any) {
  let iCanCall = false;
  // @ts-ignore
  if (isCordovaEnv && window.cordova) {
    iCanCall = true;
    // @ts-ignore
    window.cordova.exec(success, fail, plugin, action, paramArray);
    // @ts-ignore
  } else if (isJSBridgeEnv && window.WebViewJavascriptBridge) {
    iCanCall = true;
    // @ts-ignore
    window.WebViewJavascriptBridge.callHandler(
      plugin,
      action,
      paramArray,
      function (data: any) {
        isFunction(success) && success(truncatedRespForJSBridge(data));
      },
      function (err: any) {
        isFunction(fail) && fail(truncatedRespForJSBridge(err));
      }
    );
  }
  return iCanCall;
}

function isFunction(value: any): boolean {
  return Object.prototype.toString.call(value) === '[object Function]';
}

function truncatedRespForJSBridge(data: any) {
  if (!data) {
    return data;
  } else if (data.resultString) {
    return data.resultString;
  } else if (data.resultParams) {
    return data.resultParams;
  }
}
