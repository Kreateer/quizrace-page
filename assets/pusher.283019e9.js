import { api } from "./axios.d1cedc7f.js";
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var pusher$1 = { exports: {} };
/*!
 * Pusher JavaScript Library v8.3.0
 * https://pusher.com/
 *
 * Copyright 2020, Pusher
 * Released under the MIT licence.
 */
(function(module, exports) {
  (function webpackUniversalModuleDefinition(root, factory) {
    module.exports = factory();
  })(window, function() {
    return function(modules) {
      var installedModules = {};
      function __webpack_require__(moduleId) {
        if (installedModules[moduleId]) {
          return installedModules[moduleId].exports;
        }
        var module2 = installedModules[moduleId] = {
          i: moduleId,
          l: false,
          exports: {}
        };
        modules[moduleId].call(module2.exports, module2, module2.exports, __webpack_require__);
        module2.l = true;
        return module2.exports;
      }
      __webpack_require__.m = modules;
      __webpack_require__.c = installedModules;
      __webpack_require__.d = function(exports2, name, getter) {
        if (!__webpack_require__.o(exports2, name)) {
          Object.defineProperty(exports2, name, { enumerable: true, get: getter });
        }
      };
      __webpack_require__.r = function(exports2) {
        if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
          Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
        }
        Object.defineProperty(exports2, "__esModule", { value: true });
      };
      __webpack_require__.t = function(value, mode) {
        if (mode & 1)
          value = __webpack_require__(value);
        if (mode & 8)
          return value;
        if (mode & 4 && typeof value === "object" && value && value.__esModule)
          return value;
        var ns = /* @__PURE__ */ Object.create(null);
        __webpack_require__.r(ns);
        Object.defineProperty(ns, "default", { enumerable: true, value });
        if (mode & 2 && typeof value != "string")
          for (var key in value)
            __webpack_require__.d(ns, key, function(key2) {
              return value[key2];
            }.bind(null, key));
        return ns;
      };
      __webpack_require__.n = function(module2) {
        var getter = module2 && module2.__esModule ? function getDefault() {
          return module2["default"];
        } : function getModuleExports() {
          return module2;
        };
        __webpack_require__.d(getter, "a", getter);
        return getter;
      };
      __webpack_require__.o = function(object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
      };
      __webpack_require__.p = "";
      return __webpack_require__(__webpack_require__.s = 2);
    }([
      function(module2, exports2, __webpack_require__) {
        var __extends = this && this.__extends || function() {
          var extendStatics = function(d, b) {
            extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
              d2.__proto__ = b2;
            } || function(d2, b2) {
              for (var p in b2)
                if (b2.hasOwnProperty(p))
                  d2[p] = b2[p];
            };
            return extendStatics(d, b);
          };
          return function(d, b) {
            extendStatics(d, b);
            function __() {
              this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
          };
        }();
        Object.defineProperty(exports2, "__esModule", { value: true });
        var INVALID_BYTE = 256;
        var Coder = function() {
          function Coder2(_paddingCharacter) {
            if (_paddingCharacter === void 0) {
              _paddingCharacter = "=";
            }
            this._paddingCharacter = _paddingCharacter;
          }
          Coder2.prototype.encodedLength = function(length) {
            if (!this._paddingCharacter) {
              return (length * 8 + 5) / 6 | 0;
            }
            return (length + 2) / 3 * 4 | 0;
          };
          Coder2.prototype.encode = function(data) {
            var out = "";
            var i = 0;
            for (; i < data.length - 2; i += 3) {
              var c = data[i] << 16 | data[i + 1] << 8 | data[i + 2];
              out += this._encodeByte(c >>> 3 * 6 & 63);
              out += this._encodeByte(c >>> 2 * 6 & 63);
              out += this._encodeByte(c >>> 1 * 6 & 63);
              out += this._encodeByte(c >>> 0 * 6 & 63);
            }
            var left = data.length - i;
            if (left > 0) {
              var c = data[i] << 16 | (left === 2 ? data[i + 1] << 8 : 0);
              out += this._encodeByte(c >>> 3 * 6 & 63);
              out += this._encodeByte(c >>> 2 * 6 & 63);
              if (left === 2) {
                out += this._encodeByte(c >>> 1 * 6 & 63);
              } else {
                out += this._paddingCharacter || "";
              }
              out += this._paddingCharacter || "";
            }
            return out;
          };
          Coder2.prototype.maxDecodedLength = function(length) {
            if (!this._paddingCharacter) {
              return (length * 6 + 7) / 8 | 0;
            }
            return length / 4 * 3 | 0;
          };
          Coder2.prototype.decodedLength = function(s) {
            return this.maxDecodedLength(s.length - this._getPaddingLength(s));
          };
          Coder2.prototype.decode = function(s) {
            if (s.length === 0) {
              return new Uint8Array(0);
            }
            var paddingLength = this._getPaddingLength(s);
            var length = s.length - paddingLength;
            var out = new Uint8Array(this.maxDecodedLength(length));
            var op = 0;
            var i = 0;
            var haveBad = 0;
            var v0 = 0, v1 = 0, v2 = 0, v3 = 0;
            for (; i < length - 4; i += 4) {
              v0 = this._decodeChar(s.charCodeAt(i + 0));
              v1 = this._decodeChar(s.charCodeAt(i + 1));
              v2 = this._decodeChar(s.charCodeAt(i + 2));
              v3 = this._decodeChar(s.charCodeAt(i + 3));
              out[op++] = v0 << 2 | v1 >>> 4;
              out[op++] = v1 << 4 | v2 >>> 2;
              out[op++] = v2 << 6 | v3;
              haveBad |= v0 & INVALID_BYTE;
              haveBad |= v1 & INVALID_BYTE;
              haveBad |= v2 & INVALID_BYTE;
              haveBad |= v3 & INVALID_BYTE;
            }
            if (i < length - 1) {
              v0 = this._decodeChar(s.charCodeAt(i));
              v1 = this._decodeChar(s.charCodeAt(i + 1));
              out[op++] = v0 << 2 | v1 >>> 4;
              haveBad |= v0 & INVALID_BYTE;
              haveBad |= v1 & INVALID_BYTE;
            }
            if (i < length - 2) {
              v2 = this._decodeChar(s.charCodeAt(i + 2));
              out[op++] = v1 << 4 | v2 >>> 2;
              haveBad |= v2 & INVALID_BYTE;
            }
            if (i < length - 3) {
              v3 = this._decodeChar(s.charCodeAt(i + 3));
              out[op++] = v2 << 6 | v3;
              haveBad |= v3 & INVALID_BYTE;
            }
            if (haveBad !== 0) {
              throw new Error("Base64Coder: incorrect characters for decoding");
            }
            return out;
          };
          Coder2.prototype._encodeByte = function(b) {
            var result = b;
            result += 65;
            result += 25 - b >>> 8 & 0 - 65 - 26 + 97;
            result += 51 - b >>> 8 & 26 - 97 - 52 + 48;
            result += 61 - b >>> 8 & 52 - 48 - 62 + 43;
            result += 62 - b >>> 8 & 62 - 43 - 63 + 47;
            return String.fromCharCode(result);
          };
          Coder2.prototype._decodeChar = function(c) {
            var result = INVALID_BYTE;
            result += (42 - c & c - 44) >>> 8 & -INVALID_BYTE + c - 43 + 62;
            result += (46 - c & c - 48) >>> 8 & -INVALID_BYTE + c - 47 + 63;
            result += (47 - c & c - 58) >>> 8 & -INVALID_BYTE + c - 48 + 52;
            result += (64 - c & c - 91) >>> 8 & -INVALID_BYTE + c - 65 + 0;
            result += (96 - c & c - 123) >>> 8 & -INVALID_BYTE + c - 97 + 26;
            return result;
          };
          Coder2.prototype._getPaddingLength = function(s) {
            var paddingLength = 0;
            if (this._paddingCharacter) {
              for (var i = s.length - 1; i >= 0; i--) {
                if (s[i] !== this._paddingCharacter) {
                  break;
                }
                paddingLength++;
              }
              if (s.length < 4 || paddingLength > 2) {
                throw new Error("Base64Coder: incorrect padding");
              }
            }
            return paddingLength;
          };
          return Coder2;
        }();
        exports2.Coder = Coder;
        var stdCoder = new Coder();
        function encode(data) {
          return stdCoder.encode(data);
        }
        exports2.encode = encode;
        function decode(s) {
          return stdCoder.decode(s);
        }
        exports2.decode = decode;
        var URLSafeCoder = function(_super) {
          __extends(URLSafeCoder2, _super);
          function URLSafeCoder2() {
            return _super !== null && _super.apply(this, arguments) || this;
          }
          URLSafeCoder2.prototype._encodeByte = function(b) {
            var result = b;
            result += 65;
            result += 25 - b >>> 8 & 0 - 65 - 26 + 97;
            result += 51 - b >>> 8 & 26 - 97 - 52 + 48;
            result += 61 - b >>> 8 & 52 - 48 - 62 + 45;
            result += 62 - b >>> 8 & 62 - 45 - 63 + 95;
            return String.fromCharCode(result);
          };
          URLSafeCoder2.prototype._decodeChar = function(c) {
            var result = INVALID_BYTE;
            result += (44 - c & c - 46) >>> 8 & -INVALID_BYTE + c - 45 + 62;
            result += (94 - c & c - 96) >>> 8 & -INVALID_BYTE + c - 95 + 63;
            result += (47 - c & c - 58) >>> 8 & -INVALID_BYTE + c - 48 + 52;
            result += (64 - c & c - 91) >>> 8 & -INVALID_BYTE + c - 65 + 0;
            result += (96 - c & c - 123) >>> 8 & -INVALID_BYTE + c - 97 + 26;
            return result;
          };
          return URLSafeCoder2;
        }(Coder);
        exports2.URLSafeCoder = URLSafeCoder;
        var urlSafeCoder = new URLSafeCoder();
        function encodeURLSafe(data) {
          return urlSafeCoder.encode(data);
        }
        exports2.encodeURLSafe = encodeURLSafe;
        function decodeURLSafe(s) {
          return urlSafeCoder.decode(s);
        }
        exports2.decodeURLSafe = decodeURLSafe;
        exports2.encodedLength = function(length) {
          return stdCoder.encodedLength(length);
        };
        exports2.maxDecodedLength = function(length) {
          return stdCoder.maxDecodedLength(length);
        };
        exports2.decodedLength = function(s) {
          return stdCoder.decodedLength(s);
        };
      },
      function(module2, exports2, __webpack_require__) {
        Object.defineProperty(exports2, "__esModule", { value: true });
        var INVALID_UTF16 = "utf8: invalid string";
        var INVALID_UTF8 = "utf8: invalid source encoding";
        function encode(s) {
          var arr = new Uint8Array(encodedLength(s));
          var pos = 0;
          for (var i = 0; i < s.length; i++) {
            var c = s.charCodeAt(i);
            if (c < 128) {
              arr[pos++] = c;
            } else if (c < 2048) {
              arr[pos++] = 192 | c >> 6;
              arr[pos++] = 128 | c & 63;
            } else if (c < 55296) {
              arr[pos++] = 224 | c >> 12;
              arr[pos++] = 128 | c >> 6 & 63;
              arr[pos++] = 128 | c & 63;
            } else {
              i++;
              c = (c & 1023) << 10;
              c |= s.charCodeAt(i) & 1023;
              c += 65536;
              arr[pos++] = 240 | c >> 18;
              arr[pos++] = 128 | c >> 12 & 63;
              arr[pos++] = 128 | c >> 6 & 63;
              arr[pos++] = 128 | c & 63;
            }
          }
          return arr;
        }
        exports2.encode = encode;
        function encodedLength(s) {
          var result = 0;
          for (var i = 0; i < s.length; i++) {
            var c = s.charCodeAt(i);
            if (c < 128) {
              result += 1;
            } else if (c < 2048) {
              result += 2;
            } else if (c < 55296) {
              result += 3;
            } else if (c <= 57343) {
              if (i >= s.length - 1) {
                throw new Error(INVALID_UTF16);
              }
              i++;
              result += 4;
            } else {
              throw new Error(INVALID_UTF16);
            }
          }
          return result;
        }
        exports2.encodedLength = encodedLength;
        function decode(arr) {
          var chars = [];
          for (var i = 0; i < arr.length; i++) {
            var b = arr[i];
            if (b & 128) {
              var min = void 0;
              if (b < 224) {
                if (i >= arr.length) {
                  throw new Error(INVALID_UTF8);
                }
                var n1 = arr[++i];
                if ((n1 & 192) !== 128) {
                  throw new Error(INVALID_UTF8);
                }
                b = (b & 31) << 6 | n1 & 63;
                min = 128;
              } else if (b < 240) {
                if (i >= arr.length - 1) {
                  throw new Error(INVALID_UTF8);
                }
                var n1 = arr[++i];
                var n2 = arr[++i];
                if ((n1 & 192) !== 128 || (n2 & 192) !== 128) {
                  throw new Error(INVALID_UTF8);
                }
                b = (b & 15) << 12 | (n1 & 63) << 6 | n2 & 63;
                min = 2048;
              } else if (b < 248) {
                if (i >= arr.length - 2) {
                  throw new Error(INVALID_UTF8);
                }
                var n1 = arr[++i];
                var n2 = arr[++i];
                var n3 = arr[++i];
                if ((n1 & 192) !== 128 || (n2 & 192) !== 128 || (n3 & 192) !== 128) {
                  throw new Error(INVALID_UTF8);
                }
                b = (b & 15) << 18 | (n1 & 63) << 12 | (n2 & 63) << 6 | n3 & 63;
                min = 65536;
              } else {
                throw new Error(INVALID_UTF8);
              }
              if (b < min || b >= 55296 && b <= 57343) {
                throw new Error(INVALID_UTF8);
              }
              if (b >= 65536) {
                if (b > 1114111) {
                  throw new Error(INVALID_UTF8);
                }
                b -= 65536;
                chars.push(String.fromCharCode(55296 | b >> 10));
                b = 56320 | b & 1023;
              }
            }
            chars.push(String.fromCharCode(b));
          }
          return chars.join("");
        }
        exports2.decode = decode;
      },
      function(module2, exports2, __webpack_require__) {
        module2.exports = __webpack_require__(3).default;
      },
      function(module2, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        class ScriptReceiverFactory {
          constructor(prefix2, name) {
            this.lastId = 0;
            this.prefix = prefix2;
            this.name = name;
          }
          create(callback) {
            this.lastId++;
            var number = this.lastId;
            var id = this.prefix + number;
            var name = this.name + "[" + number + "]";
            var called = false;
            var callbackWrapper = function() {
              if (!called) {
                callback.apply(null, arguments);
                called = true;
              }
            };
            this[number] = callbackWrapper;
            return { number, id, name, callback: callbackWrapper };
          }
          remove(receiver) {
            delete this[receiver.number];
          }
        }
        var ScriptReceivers = new ScriptReceiverFactory("_pusher_script_", "Pusher.ScriptReceivers");
        var Defaults = {
          VERSION: "8.3.0",
          PROTOCOL: 7,
          wsPort: 80,
          wssPort: 443,
          wsPath: "",
          httpHost: "sockjs.pusher.com",
          httpPort: 80,
          httpsPort: 443,
          httpPath: "/pusher",
          stats_host: "stats.pusher.com",
          authEndpoint: "/pusher/auth",
          authTransport: "ajax",
          activityTimeout: 12e4,
          pongTimeout: 3e4,
          unavailableTimeout: 1e4,
          userAuthentication: {
            endpoint: "/pusher/user-auth",
            transport: "ajax"
          },
          channelAuthorization: {
            endpoint: "/pusher/auth",
            transport: "ajax"
          },
          cdn_http: "http://js.pusher.com",
          cdn_https: "https://js.pusher.com",
          dependency_suffix: ""
        };
        var defaults = Defaults;
        class dependency_loader_DependencyLoader {
          constructor(options) {
            this.options = options;
            this.receivers = options.receivers || ScriptReceivers;
            this.loading = {};
          }
          load(name, options, callback) {
            var self = this;
            if (self.loading[name] && self.loading[name].length > 0) {
              self.loading[name].push(callback);
            } else {
              self.loading[name] = [callback];
              var request = runtime.createScriptRequest(self.getPath(name, options));
              var receiver = self.receivers.create(function(error) {
                self.receivers.remove(receiver);
                if (self.loading[name]) {
                  var callbacks = self.loading[name];
                  delete self.loading[name];
                  var successCallback = function(wasSuccessful) {
                    if (!wasSuccessful) {
                      request.cleanup();
                    }
                  };
                  for (var i = 0; i < callbacks.length; i++) {
                    callbacks[i](error, successCallback);
                  }
                }
              });
              request.send(receiver);
            }
          }
          getRoot(options) {
            var cdn;
            var protocol = runtime.getDocument().location.protocol;
            if (options && options.useTLS || protocol === "https:") {
              cdn = this.options.cdn_https;
            } else {
              cdn = this.options.cdn_http;
            }
            return cdn.replace(/\/*$/, "") + "/" + this.options.version;
          }
          getPath(name, options) {
            return this.getRoot(options) + "/" + name + this.options.suffix + ".js";
          }
        }
        var DependenciesReceivers = new ScriptReceiverFactory("_pusher_dependencies", "Pusher.DependenciesReceivers");
        var Dependencies = new dependency_loader_DependencyLoader({
          cdn_http: defaults.cdn_http,
          cdn_https: defaults.cdn_https,
          version: defaults.VERSION,
          suffix: defaults.dependency_suffix,
          receivers: DependenciesReceivers
        });
        const urlStore = {
          baseUrl: "https://pusher.com",
          urls: {
            authenticationEndpoint: {
              path: "/docs/channels/server_api/authenticating_users"
            },
            authorizationEndpoint: {
              path: "/docs/channels/server_api/authorizing-users/"
            },
            javascriptQuickStart: {
              path: "/docs/javascript_quick_start"
            },
            triggeringClientEvents: {
              path: "/docs/client_api_guide/client_events#trigger-events"
            },
            encryptedChannelSupport: {
              fullUrl: "https://github.com/pusher/pusher-js/tree/cc491015371a4bde5743d1c87a0fbac0feb53195#encrypted-channel-support"
            }
          }
        };
        const buildLogSuffix = function(key) {
          const urlPrefix = "See:";
          const urlObj = urlStore.urls[key];
          if (!urlObj)
            return "";
          let url;
          if (urlObj.fullUrl) {
            url = urlObj.fullUrl;
          } else if (urlObj.path) {
            url = urlStore.baseUrl + urlObj.path;
          }
          if (!url)
            return "";
          return `${urlPrefix} ${url}`;
        };
        var url_store = { buildLogSuffix };
        var AuthRequestType;
        (function(AuthRequestType2) {
          AuthRequestType2["UserAuthentication"] = "user-authentication";
          AuthRequestType2["ChannelAuthorization"] = "channel-authorization";
        })(AuthRequestType || (AuthRequestType = {}));
        class BadEventName extends Error {
          constructor(msg) {
            super(msg);
            Object.setPrototypeOf(this, new.target.prototype);
          }
        }
        class BadChannelName extends Error {
          constructor(msg) {
            super(msg);
            Object.setPrototypeOf(this, new.target.prototype);
          }
        }
        class RequestTimedOut extends Error {
          constructor(msg) {
            super(msg);
            Object.setPrototypeOf(this, new.target.prototype);
          }
        }
        class TransportPriorityTooLow extends Error {
          constructor(msg) {
            super(msg);
            Object.setPrototypeOf(this, new.target.prototype);
          }
        }
        class TransportClosed extends Error {
          constructor(msg) {
            super(msg);
            Object.setPrototypeOf(this, new.target.prototype);
          }
        }
        class UnsupportedFeature extends Error {
          constructor(msg) {
            super(msg);
            Object.setPrototypeOf(this, new.target.prototype);
          }
        }
        class UnsupportedTransport extends Error {
          constructor(msg) {
            super(msg);
            Object.setPrototypeOf(this, new.target.prototype);
          }
        }
        class UnsupportedStrategy extends Error {
          constructor(msg) {
            super(msg);
            Object.setPrototypeOf(this, new.target.prototype);
          }
        }
        class HTTPAuthError extends Error {
          constructor(status, msg) {
            super(msg);
            this.status = status;
            Object.setPrototypeOf(this, new.target.prototype);
          }
        }
        const ajax = function(context, query, authOptions, authRequestType, callback) {
          const xhr = runtime.createXHR();
          xhr.open("POST", authOptions.endpoint, true);
          xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
          for (var headerName in authOptions.headers) {
            xhr.setRequestHeader(headerName, authOptions.headers[headerName]);
          }
          if (authOptions.headersProvider != null) {
            let dynamicHeaders = authOptions.headersProvider();
            for (var headerName in dynamicHeaders) {
              xhr.setRequestHeader(headerName, dynamicHeaders[headerName]);
            }
          }
          xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
              if (xhr.status === 200) {
                let data;
                let parsed = false;
                try {
                  data = JSON.parse(xhr.responseText);
                  parsed = true;
                } catch (e) {
                  callback(new HTTPAuthError(200, `JSON returned from ${authRequestType.toString()} endpoint was invalid, yet status code was 200. Data was: ${xhr.responseText}`), null);
                }
                if (parsed) {
                  callback(null, data);
                }
              } else {
                let suffix = "";
                switch (authRequestType) {
                  case AuthRequestType.UserAuthentication:
                    suffix = url_store.buildLogSuffix("authenticationEndpoint");
                    break;
                  case AuthRequestType.ChannelAuthorization:
                    suffix = `Clients must be authorized to join private or presence channels. ${url_store.buildLogSuffix("authorizationEndpoint")}`;
                    break;
                }
                callback(new HTTPAuthError(xhr.status, `Unable to retrieve auth string from ${authRequestType.toString()} endpoint - received status: ${xhr.status} from ${authOptions.endpoint}. ${suffix}`), null);
              }
            }
          };
          xhr.send(query);
          return xhr;
        };
        var xhr_auth = ajax;
        function encode(s) {
          return btoa(utob(s));
        }
        var fromCharCode = String.fromCharCode;
        var b64chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        var cb_utob = function(c) {
          var cc = c.charCodeAt(0);
          return cc < 128 ? c : cc < 2048 ? fromCharCode(192 | cc >>> 6) + fromCharCode(128 | cc & 63) : fromCharCode(224 | cc >>> 12 & 15) + fromCharCode(128 | cc >>> 6 & 63) + fromCharCode(128 | cc & 63);
        };
        var utob = function(u) {
          return u.replace(/[^\x00-\x7F]/g, cb_utob);
        };
        var cb_encode = function(ccc) {
          var padlen = [0, 2, 1][ccc.length % 3];
          var ord = ccc.charCodeAt(0) << 16 | (ccc.length > 1 ? ccc.charCodeAt(1) : 0) << 8 | (ccc.length > 2 ? ccc.charCodeAt(2) : 0);
          var chars = [
            b64chars.charAt(ord >>> 18),
            b64chars.charAt(ord >>> 12 & 63),
            padlen >= 2 ? "=" : b64chars.charAt(ord >>> 6 & 63),
            padlen >= 1 ? "=" : b64chars.charAt(ord & 63)
          ];
          return chars.join("");
        };
        var btoa = window.btoa || function(b) {
          return b.replace(/[\s\S]{1,3}/g, cb_encode);
        };
        class Timer {
          constructor(set, clear, delay, callback) {
            this.clear = clear;
            this.timer = set(() => {
              if (this.timer) {
                this.timer = callback(this.timer);
              }
            }, delay);
          }
          isRunning() {
            return this.timer !== null;
          }
          ensureAborted() {
            if (this.timer) {
              this.clear(this.timer);
              this.timer = null;
            }
          }
        }
        var abstract_timer = Timer;
        function timers_clearTimeout(timer) {
          window.clearTimeout(timer);
        }
        function timers_clearInterval(timer) {
          window.clearInterval(timer);
        }
        class timers_OneOffTimer extends abstract_timer {
          constructor(delay, callback) {
            super(setTimeout, timers_clearTimeout, delay, function(timer) {
              callback();
              return null;
            });
          }
        }
        class timers_PeriodicTimer extends abstract_timer {
          constructor(delay, callback) {
            super(setInterval, timers_clearInterval, delay, function(timer) {
              callback();
              return timer;
            });
          }
        }
        var Util = {
          now() {
            if (Date.now) {
              return Date.now();
            } else {
              return new Date().valueOf();
            }
          },
          defer(callback) {
            return new timers_OneOffTimer(0, callback);
          },
          method(name, ...args) {
            var boundArguments = Array.prototype.slice.call(arguments, 1);
            return function(object) {
              return object[name].apply(object, boundArguments.concat(arguments));
            };
          }
        };
        var util = Util;
        function extend(target, ...sources) {
          for (var i = 0; i < sources.length; i++) {
            var extensions = sources[i];
            for (var property in extensions) {
              if (extensions[property] && extensions[property].constructor && extensions[property].constructor === Object) {
                target[property] = extend(target[property] || {}, extensions[property]);
              } else {
                target[property] = extensions[property];
              }
            }
          }
          return target;
        }
        function stringify() {
          var m = ["Pusher"];
          for (var i = 0; i < arguments.length; i++) {
            if (typeof arguments[i] === "string") {
              m.push(arguments[i]);
            } else {
              m.push(safeJSONStringify(arguments[i]));
            }
          }
          return m.join(" : ");
        }
        function arrayIndexOf(array, item) {
          var nativeIndexOf = Array.prototype.indexOf;
          if (array === null) {
            return -1;
          }
          if (nativeIndexOf && array.indexOf === nativeIndexOf) {
            return array.indexOf(item);
          }
          for (var i = 0, l = array.length; i < l; i++) {
            if (array[i] === item) {
              return i;
            }
          }
          return -1;
        }
        function objectApply(object, f) {
          for (var key in object) {
            if (Object.prototype.hasOwnProperty.call(object, key)) {
              f(object[key], key, object);
            }
          }
        }
        function keys(object) {
          var keys2 = [];
          objectApply(object, function(_, key) {
            keys2.push(key);
          });
          return keys2;
        }
        function values(object) {
          var values2 = [];
          objectApply(object, function(value) {
            values2.push(value);
          });
          return values2;
        }
        function apply(array, f, context) {
          for (var i = 0; i < array.length; i++) {
            f.call(context || window, array[i], i, array);
          }
        }
        function map(array, f) {
          var result = [];
          for (var i = 0; i < array.length; i++) {
            result.push(f(array[i], i, array, result));
          }
          return result;
        }
        function mapObject(object, f) {
          var result = {};
          objectApply(object, function(value, key) {
            result[key] = f(value);
          });
          return result;
        }
        function filter(array, test) {
          test = test || function(value) {
            return !!value;
          };
          var result = [];
          for (var i = 0; i < array.length; i++) {
            if (test(array[i], i, array, result)) {
              result.push(array[i]);
            }
          }
          return result;
        }
        function filterObject(object, test) {
          var result = {};
          objectApply(object, function(value, key) {
            if (test && test(value, key, object, result) || Boolean(value)) {
              result[key] = value;
            }
          });
          return result;
        }
        function flatten(object) {
          var result = [];
          objectApply(object, function(value, key) {
            result.push([key, value]);
          });
          return result;
        }
        function any(array, test) {
          for (var i = 0; i < array.length; i++) {
            if (test(array[i], i, array)) {
              return true;
            }
          }
          return false;
        }
        function collections_all(array, test) {
          for (var i = 0; i < array.length; i++) {
            if (!test(array[i], i, array)) {
              return false;
            }
          }
          return true;
        }
        function encodeParamsObject(data) {
          return mapObject(data, function(value) {
            if (typeof value === "object") {
              value = safeJSONStringify(value);
            }
            return encodeURIComponent(encode(value.toString()));
          });
        }
        function buildQueryString(data) {
          var params = filterObject(data, function(value) {
            return value !== void 0;
          });
          var query = map(flatten(encodeParamsObject(params)), util.method("join", "=")).join("&");
          return query;
        }
        function decycleObject(object) {
          var objects = [], paths = [];
          return function derez(value, path) {
            var i, name, nu;
            switch (typeof value) {
              case "object":
                if (!value) {
                  return null;
                }
                for (i = 0; i < objects.length; i += 1) {
                  if (objects[i] === value) {
                    return { $ref: paths[i] };
                  }
                }
                objects.push(value);
                paths.push(path);
                if (Object.prototype.toString.apply(value) === "[object Array]") {
                  nu = [];
                  for (i = 0; i < value.length; i += 1) {
                    nu[i] = derez(value[i], path + "[" + i + "]");
                  }
                } else {
                  nu = {};
                  for (name in value) {
                    if (Object.prototype.hasOwnProperty.call(value, name)) {
                      nu[name] = derez(value[name], path + "[" + JSON.stringify(name) + "]");
                    }
                  }
                }
                return nu;
              case "number":
              case "string":
              case "boolean":
                return value;
            }
          }(object, "$");
        }
        function safeJSONStringify(source) {
          try {
            return JSON.stringify(source);
          } catch (e) {
            return JSON.stringify(decycleObject(source));
          }
        }
        class logger_Logger {
          constructor() {
            this.globalLog = (message) => {
              if (window.console && window.console.log) {
                window.console.log(message);
              }
            };
          }
          debug(...args) {
            this.log(this.globalLog, args);
          }
          warn(...args) {
            this.log(this.globalLogWarn, args);
          }
          error(...args) {
            this.log(this.globalLogError, args);
          }
          globalLogWarn(message) {
            if (window.console && window.console.warn) {
              window.console.warn(message);
            } else {
              this.globalLog(message);
            }
          }
          globalLogError(message) {
            if (window.console && window.console.error) {
              window.console.error(message);
            } else {
              this.globalLogWarn(message);
            }
          }
          log(defaultLoggingFunction, ...args) {
            var message = stringify.apply(this, arguments);
            if (core_pusher.log) {
              core_pusher.log(message);
            } else if (core_pusher.logToConsole) {
              const log = defaultLoggingFunction.bind(this);
              log(message);
            }
          }
        }
        var logger = new logger_Logger();
        var jsonp = function(context, query, authOptions, authRequestType, callback) {
          if (authOptions.headers !== void 0 || authOptions.headersProvider != null) {
            logger.warn(`To send headers with the ${authRequestType.toString()} request, you must use AJAX, rather than JSONP.`);
          }
          var callbackName = context.nextAuthCallbackID.toString();
          context.nextAuthCallbackID++;
          var document2 = context.getDocument();
          var script = document2.createElement("script");
          context.auth_callbacks[callbackName] = function(data) {
            callback(null, data);
          };
          var callback_name = "Pusher.auth_callbacks['" + callbackName + "']";
          script.src = authOptions.endpoint + "?callback=" + encodeURIComponent(callback_name) + "&" + query;
          var head = document2.getElementsByTagName("head")[0] || document2.documentElement;
          head.insertBefore(script, head.firstChild);
        };
        var jsonp_auth = jsonp;
        class ScriptRequest {
          constructor(src) {
            this.src = src;
          }
          send(receiver) {
            var self = this;
            var errorString = "Error loading " + self.src;
            self.script = document.createElement("script");
            self.script.id = receiver.id;
            self.script.src = self.src;
            self.script.type = "text/javascript";
            self.script.charset = "UTF-8";
            if (self.script.addEventListener) {
              self.script.onerror = function() {
                receiver.callback(errorString);
              };
              self.script.onload = function() {
                receiver.callback(null);
              };
            } else {
              self.script.onreadystatechange = function() {
                if (self.script.readyState === "loaded" || self.script.readyState === "complete") {
                  receiver.callback(null);
                }
              };
            }
            if (self.script.async === void 0 && document.attachEvent && /opera/i.test(navigator.userAgent)) {
              self.errorScript = document.createElement("script");
              self.errorScript.id = receiver.id + "_error";
              self.errorScript.text = receiver.name + "('" + errorString + "');";
              self.script.async = self.errorScript.async = false;
            } else {
              self.script.async = true;
            }
            var head = document.getElementsByTagName("head")[0];
            head.insertBefore(self.script, head.firstChild);
            if (self.errorScript) {
              head.insertBefore(self.errorScript, self.script.nextSibling);
            }
          }
          cleanup() {
            if (this.script) {
              this.script.onload = this.script.onerror = null;
              this.script.onreadystatechange = null;
            }
            if (this.script && this.script.parentNode) {
              this.script.parentNode.removeChild(this.script);
            }
            if (this.errorScript && this.errorScript.parentNode) {
              this.errorScript.parentNode.removeChild(this.errorScript);
            }
            this.script = null;
            this.errorScript = null;
          }
        }
        class jsonp_request_JSONPRequest {
          constructor(url, data) {
            this.url = url;
            this.data = data;
          }
          send(receiver) {
            if (this.request) {
              return;
            }
            var query = buildQueryString(this.data);
            var url = this.url + "/" + receiver.number + "?" + query;
            this.request = runtime.createScriptRequest(url);
            this.request.send(receiver);
          }
          cleanup() {
            if (this.request) {
              this.request.cleanup();
            }
          }
        }
        var getAgent = function(sender, useTLS) {
          return function(data, callback) {
            var scheme = "http" + (useTLS ? "s" : "") + "://";
            var url = scheme + (sender.host || sender.options.host) + sender.options.path;
            var request = runtime.createJSONPRequest(url, data);
            var receiver = runtime.ScriptReceivers.create(function(error, result) {
              ScriptReceivers.remove(receiver);
              request.cleanup();
              if (result && result.host) {
                sender.host = result.host;
              }
              if (callback) {
                callback(error, result);
              }
            });
            request.send(receiver);
          };
        };
        var jsonp_timeline_jsonp = {
          name: "jsonp",
          getAgent
        };
        var jsonp_timeline = jsonp_timeline_jsonp;
        function getGenericURL(baseScheme, params, path) {
          var scheme = baseScheme + (params.useTLS ? "s" : "");
          var host = params.useTLS ? params.hostTLS : params.hostNonTLS;
          return scheme + "://" + host + path;
        }
        function getGenericPath(key, queryString) {
          var path = "/app/" + key;
          var query = "?protocol=" + defaults.PROTOCOL + "&client=js&version=" + defaults.VERSION + (queryString ? "&" + queryString : "");
          return path + query;
        }
        var ws = {
          getInitial: function(key, params) {
            var path = (params.httpPath || "") + getGenericPath(key, "flash=false");
            return getGenericURL("ws", params, path);
          }
        };
        var http = {
          getInitial: function(key, params) {
            var path = (params.httpPath || "/pusher") + getGenericPath(key);
            return getGenericURL("http", params, path);
          }
        };
        var sockjs = {
          getInitial: function(key, params) {
            return getGenericURL("http", params, params.httpPath || "/pusher");
          },
          getPath: function(key, params) {
            return getGenericPath(key);
          }
        };
        class callback_registry_CallbackRegistry {
          constructor() {
            this._callbacks = {};
          }
          get(name) {
            return this._callbacks[prefix(name)];
          }
          add(name, callback, context) {
            var prefixedEventName = prefix(name);
            this._callbacks[prefixedEventName] = this._callbacks[prefixedEventName] || [];
            this._callbacks[prefixedEventName].push({
              fn: callback,
              context
            });
          }
          remove(name, callback, context) {
            if (!name && !callback && !context) {
              this._callbacks = {};
              return;
            }
            var names = name ? [prefix(name)] : keys(this._callbacks);
            if (callback || context) {
              this.removeCallback(names, callback, context);
            } else {
              this.removeAllCallbacks(names);
            }
          }
          removeCallback(names, callback, context) {
            apply(names, function(name) {
              this._callbacks[name] = filter(this._callbacks[name] || [], function(binding) {
                return callback && callback !== binding.fn || context && context !== binding.context;
              });
              if (this._callbacks[name].length === 0) {
                delete this._callbacks[name];
              }
            }, this);
          }
          removeAllCallbacks(names) {
            apply(names, function(name) {
              delete this._callbacks[name];
            }, this);
          }
        }
        function prefix(name) {
          return "_" + name;
        }
        class dispatcher_Dispatcher {
          constructor(failThrough) {
            this.callbacks = new callback_registry_CallbackRegistry();
            this.global_callbacks = [];
            this.failThrough = failThrough;
          }
          bind(eventName, callback, context) {
            this.callbacks.add(eventName, callback, context);
            return this;
          }
          bind_global(callback) {
            this.global_callbacks.push(callback);
            return this;
          }
          unbind(eventName, callback, context) {
            this.callbacks.remove(eventName, callback, context);
            return this;
          }
          unbind_global(callback) {
            if (!callback) {
              this.global_callbacks = [];
              return this;
            }
            this.global_callbacks = filter(this.global_callbacks || [], (c) => c !== callback);
            return this;
          }
          unbind_all() {
            this.unbind();
            this.unbind_global();
            return this;
          }
          emit(eventName, data, metadata) {
            for (var i = 0; i < this.global_callbacks.length; i++) {
              this.global_callbacks[i](eventName, data);
            }
            var callbacks = this.callbacks.get(eventName);
            var args = [];
            if (metadata) {
              args.push(data, metadata);
            } else if (data) {
              args.push(data);
            }
            if (callbacks && callbacks.length > 0) {
              for (var i = 0; i < callbacks.length; i++) {
                callbacks[i].fn.apply(callbacks[i].context || window, args);
              }
            } else if (this.failThrough) {
              this.failThrough(eventName, data);
            }
            return this;
          }
        }
        class transport_connection_TransportConnection extends dispatcher_Dispatcher {
          constructor(hooks, name, priority, key, options) {
            super();
            this.initialize = runtime.transportConnectionInitializer;
            this.hooks = hooks;
            this.name = name;
            this.priority = priority;
            this.key = key;
            this.options = options;
            this.state = "new";
            this.timeline = options.timeline;
            this.activityTimeout = options.activityTimeout;
            this.id = this.timeline.generateUniqueID();
          }
          handlesActivityChecks() {
            return Boolean(this.hooks.handlesActivityChecks);
          }
          supportsPing() {
            return Boolean(this.hooks.supportsPing);
          }
          connect() {
            if (this.socket || this.state !== "initialized") {
              return false;
            }
            var url = this.hooks.urls.getInitial(this.key, this.options);
            try {
              this.socket = this.hooks.getSocket(url, this.options);
            } catch (e) {
              util.defer(() => {
                this.onError(e);
                this.changeState("closed");
              });
              return false;
            }
            this.bindListeners();
            logger.debug("Connecting", { transport: this.name, url });
            this.changeState("connecting");
            return true;
          }
          close() {
            if (this.socket) {
              this.socket.close();
              return true;
            } else {
              return false;
            }
          }
          send(data) {
            if (this.state === "open") {
              util.defer(() => {
                if (this.socket) {
                  this.socket.send(data);
                }
              });
              return true;
            } else {
              return false;
            }
          }
          ping() {
            if (this.state === "open" && this.supportsPing()) {
              this.socket.ping();
            }
          }
          onOpen() {
            if (this.hooks.beforeOpen) {
              this.hooks.beforeOpen(this.socket, this.hooks.urls.getPath(this.key, this.options));
            }
            this.changeState("open");
            this.socket.onopen = void 0;
          }
          onError(error) {
            this.emit("error", { type: "WebSocketError", error });
            this.timeline.error(this.buildTimelineMessage({ error: error.toString() }));
          }
          onClose(closeEvent) {
            if (closeEvent) {
              this.changeState("closed", {
                code: closeEvent.code,
                reason: closeEvent.reason,
                wasClean: closeEvent.wasClean
              });
            } else {
              this.changeState("closed");
            }
            this.unbindListeners();
            this.socket = void 0;
          }
          onMessage(message) {
            this.emit("message", message);
          }
          onActivity() {
            this.emit("activity");
          }
          bindListeners() {
            this.socket.onopen = () => {
              this.onOpen();
            };
            this.socket.onerror = (error) => {
              this.onError(error);
            };
            this.socket.onclose = (closeEvent) => {
              this.onClose(closeEvent);
            };
            this.socket.onmessage = (message) => {
              this.onMessage(message);
            };
            if (this.supportsPing()) {
              this.socket.onactivity = () => {
                this.onActivity();
              };
            }
          }
          unbindListeners() {
            if (this.socket) {
              this.socket.onopen = void 0;
              this.socket.onerror = void 0;
              this.socket.onclose = void 0;
              this.socket.onmessage = void 0;
              if (this.supportsPing()) {
                this.socket.onactivity = void 0;
              }
            }
          }
          changeState(state2, params) {
            this.state = state2;
            this.timeline.info(this.buildTimelineMessage({
              state: state2,
              params
            }));
            this.emit(state2, params);
          }
          buildTimelineMessage(message) {
            return extend({ cid: this.id }, message);
          }
        }
        class transport_Transport {
          constructor(hooks) {
            this.hooks = hooks;
          }
          isSupported(environment) {
            return this.hooks.isSupported(environment);
          }
          createConnection(name, priority, key, options) {
            return new transport_connection_TransportConnection(this.hooks, name, priority, key, options);
          }
        }
        var WSTransport = new transport_Transport({
          urls: ws,
          handlesActivityChecks: false,
          supportsPing: false,
          isInitialized: function() {
            return Boolean(runtime.getWebSocketAPI());
          },
          isSupported: function() {
            return Boolean(runtime.getWebSocketAPI());
          },
          getSocket: function(url) {
            return runtime.createWebSocket(url);
          }
        });
        var httpConfiguration = {
          urls: http,
          handlesActivityChecks: false,
          supportsPing: true,
          isInitialized: function() {
            return true;
          }
        };
        var streamingConfiguration = extend({
          getSocket: function(url) {
            return runtime.HTTPFactory.createStreamingSocket(url);
          }
        }, httpConfiguration);
        var pollingConfiguration = extend({
          getSocket: function(url) {
            return runtime.HTTPFactory.createPollingSocket(url);
          }
        }, httpConfiguration);
        var xhrConfiguration = {
          isSupported: function() {
            return runtime.isXHRSupported();
          }
        };
        var XHRStreamingTransport = new transport_Transport(extend({}, streamingConfiguration, xhrConfiguration));
        var XHRPollingTransport = new transport_Transport(extend({}, pollingConfiguration, xhrConfiguration));
        var Transports = {
          ws: WSTransport,
          xhr_streaming: XHRStreamingTransport,
          xhr_polling: XHRPollingTransport
        };
        var transports = Transports;
        var SockJSTransport = new transport_Transport({
          file: "sockjs",
          urls: sockjs,
          handlesActivityChecks: true,
          supportsPing: false,
          isSupported: function() {
            return true;
          },
          isInitialized: function() {
            return window.SockJS !== void 0;
          },
          getSocket: function(url, options) {
            return new window.SockJS(url, null, {
              js_path: Dependencies.getPath("sockjs", {
                useTLS: options.useTLS
              }),
              ignore_null_origin: options.ignoreNullOrigin
            });
          },
          beforeOpen: function(socket, path) {
            socket.send(JSON.stringify({
              path
            }));
          }
        });
        var xdrConfiguration = {
          isSupported: function(environment) {
            var yes = runtime.isXDRSupported(environment.useTLS);
            return yes;
          }
        };
        var XDRStreamingTransport = new transport_Transport(extend({}, streamingConfiguration, xdrConfiguration));
        var XDRPollingTransport = new transport_Transport(extend({}, pollingConfiguration, xdrConfiguration));
        transports.xdr_streaming = XDRStreamingTransport;
        transports.xdr_polling = XDRPollingTransport;
        transports.sockjs = SockJSTransport;
        var transports_transports = transports;
        class net_info_NetInfo extends dispatcher_Dispatcher {
          constructor() {
            super();
            var self = this;
            if (window.addEventListener !== void 0) {
              window.addEventListener("online", function() {
                self.emit("online");
              }, false);
              window.addEventListener("offline", function() {
                self.emit("offline");
              }, false);
            }
          }
          isOnline() {
            if (window.navigator.onLine === void 0) {
              return true;
            } else {
              return window.navigator.onLine;
            }
          }
        }
        var net_info_Network = new net_info_NetInfo();
        class assistant_to_the_transport_manager_AssistantToTheTransportManager {
          constructor(manager, transport, options) {
            this.manager = manager;
            this.transport = transport;
            this.minPingDelay = options.minPingDelay;
            this.maxPingDelay = options.maxPingDelay;
            this.pingDelay = void 0;
          }
          createConnection(name, priority, key, options) {
            options = extend({}, options, {
              activityTimeout: this.pingDelay
            });
            var connection = this.transport.createConnection(name, priority, key, options);
            var openTimestamp = null;
            var onOpen = function() {
              connection.unbind("open", onOpen);
              connection.bind("closed", onClosed);
              openTimestamp = util.now();
            };
            var onClosed = (closeEvent) => {
              connection.unbind("closed", onClosed);
              if (closeEvent.code === 1002 || closeEvent.code === 1003) {
                this.manager.reportDeath();
              } else if (!closeEvent.wasClean && openTimestamp) {
                var lifespan = util.now() - openTimestamp;
                if (lifespan < 2 * this.maxPingDelay) {
                  this.manager.reportDeath();
                  this.pingDelay = Math.max(lifespan / 2, this.minPingDelay);
                }
              }
            };
            connection.bind("open", onOpen);
            return connection;
          }
          isSupported(environment) {
            return this.manager.isAlive() && this.transport.isSupported(environment);
          }
        }
        const Protocol = {
          decodeMessage: function(messageEvent) {
            try {
              var messageData = JSON.parse(messageEvent.data);
              var pusherEventData = messageData.data;
              if (typeof pusherEventData === "string") {
                try {
                  pusherEventData = JSON.parse(messageData.data);
                } catch (e) {
                }
              }
              var pusherEvent = {
                event: messageData.event,
                channel: messageData.channel,
                data: pusherEventData
              };
              if (messageData.user_id) {
                pusherEvent.user_id = messageData.user_id;
              }
              return pusherEvent;
            } catch (e) {
              throw { type: "MessageParseError", error: e, data: messageEvent.data };
            }
          },
          encodeMessage: function(event) {
            return JSON.stringify(event);
          },
          processHandshake: function(messageEvent) {
            var message = Protocol.decodeMessage(messageEvent);
            if (message.event === "pusher:connection_established") {
              if (!message.data.activity_timeout) {
                throw "No activity timeout specified in handshake";
              }
              return {
                action: "connected",
                id: message.data.socket_id,
                activityTimeout: message.data.activity_timeout * 1e3
              };
            } else if (message.event === "pusher:error") {
              return {
                action: this.getCloseAction(message.data),
                error: this.getCloseError(message.data)
              };
            } else {
              throw "Invalid handshake";
            }
          },
          getCloseAction: function(closeEvent) {
            if (closeEvent.code < 4e3) {
              if (closeEvent.code >= 1002 && closeEvent.code <= 1004) {
                return "backoff";
              } else {
                return null;
              }
            } else if (closeEvent.code === 4e3) {
              return "tls_only";
            } else if (closeEvent.code < 4100) {
              return "refused";
            } else if (closeEvent.code < 4200) {
              return "backoff";
            } else if (closeEvent.code < 4300) {
              return "retry";
            } else {
              return "refused";
            }
          },
          getCloseError: function(closeEvent) {
            if (closeEvent.code !== 1e3 && closeEvent.code !== 1001) {
              return {
                type: "PusherError",
                data: {
                  code: closeEvent.code,
                  message: closeEvent.reason || closeEvent.message
                }
              };
            } else {
              return null;
            }
          }
        };
        var protocol_protocol = Protocol;
        class connection_Connection extends dispatcher_Dispatcher {
          constructor(id, transport) {
            super();
            this.id = id;
            this.transport = transport;
            this.activityTimeout = transport.activityTimeout;
            this.bindListeners();
          }
          handlesActivityChecks() {
            return this.transport.handlesActivityChecks();
          }
          send(data) {
            return this.transport.send(data);
          }
          send_event(name, data, channel) {
            var event = { event: name, data };
            if (channel) {
              event.channel = channel;
            }
            logger.debug("Event sent", event);
            return this.send(protocol_protocol.encodeMessage(event));
          }
          ping() {
            if (this.transport.supportsPing()) {
              this.transport.ping();
            } else {
              this.send_event("pusher:ping", {});
            }
          }
          close() {
            this.transport.close();
          }
          bindListeners() {
            var listeners = {
              message: (messageEvent) => {
                var pusherEvent;
                try {
                  pusherEvent = protocol_protocol.decodeMessage(messageEvent);
                } catch (e) {
                  this.emit("error", {
                    type: "MessageParseError",
                    error: e,
                    data: messageEvent.data
                  });
                }
                if (pusherEvent !== void 0) {
                  logger.debug("Event recd", pusherEvent);
                  switch (pusherEvent.event) {
                    case "pusher:error":
                      this.emit("error", {
                        type: "PusherError",
                        data: pusherEvent.data
                      });
                      break;
                    case "pusher:ping":
                      this.emit("ping");
                      break;
                    case "pusher:pong":
                      this.emit("pong");
                      break;
                  }
                  this.emit("message", pusherEvent);
                }
              },
              activity: () => {
                this.emit("activity");
              },
              error: (error) => {
                this.emit("error", error);
              },
              closed: (closeEvent) => {
                unbindListeners();
                if (closeEvent && closeEvent.code) {
                  this.handleCloseEvent(closeEvent);
                }
                this.transport = null;
                this.emit("closed");
              }
            };
            var unbindListeners = () => {
              objectApply(listeners, (listener, event) => {
                this.transport.unbind(event, listener);
              });
            };
            objectApply(listeners, (listener, event) => {
              this.transport.bind(event, listener);
            });
          }
          handleCloseEvent(closeEvent) {
            var action = protocol_protocol.getCloseAction(closeEvent);
            var error = protocol_protocol.getCloseError(closeEvent);
            if (error) {
              this.emit("error", error);
            }
            if (action) {
              this.emit(action, { action, error });
            }
          }
        }
        class handshake_Handshake {
          constructor(transport, callback) {
            this.transport = transport;
            this.callback = callback;
            this.bindListeners();
          }
          close() {
            this.unbindListeners();
            this.transport.close();
          }
          bindListeners() {
            this.onMessage = (m) => {
              this.unbindListeners();
              var result;
              try {
                result = protocol_protocol.processHandshake(m);
              } catch (e) {
                this.finish("error", { error: e });
                this.transport.close();
                return;
              }
              if (result.action === "connected") {
                this.finish("connected", {
                  connection: new connection_Connection(result.id, this.transport),
                  activityTimeout: result.activityTimeout
                });
              } else {
                this.finish(result.action, { error: result.error });
                this.transport.close();
              }
            };
            this.onClosed = (closeEvent) => {
              this.unbindListeners();
              var action = protocol_protocol.getCloseAction(closeEvent) || "backoff";
              var error = protocol_protocol.getCloseError(closeEvent);
              this.finish(action, { error });
            };
            this.transport.bind("message", this.onMessage);
            this.transport.bind("closed", this.onClosed);
          }
          unbindListeners() {
            this.transport.unbind("message", this.onMessage);
            this.transport.unbind("closed", this.onClosed);
          }
          finish(action, params) {
            this.callback(extend({ transport: this.transport, action }, params));
          }
        }
        class timeline_sender_TimelineSender {
          constructor(timeline, options) {
            this.timeline = timeline;
            this.options = options || {};
          }
          send(useTLS, callback) {
            if (this.timeline.isEmpty()) {
              return;
            }
            this.timeline.send(runtime.TimelineTransport.getAgent(this, useTLS), callback);
          }
        }
        class channel_Channel extends dispatcher_Dispatcher {
          constructor(name, pusher2) {
            super(function(event, data) {
              logger.debug("No callbacks on " + name + " for " + event);
            });
            this.name = name;
            this.pusher = pusher2;
            this.subscribed = false;
            this.subscriptionPending = false;
            this.subscriptionCancelled = false;
          }
          authorize(socketId, callback) {
            return callback(null, { auth: "" });
          }
          trigger(event, data) {
            if (event.indexOf("client-") !== 0) {
              throw new BadEventName("Event '" + event + "' does not start with 'client-'");
            }
            if (!this.subscribed) {
              var suffix = url_store.buildLogSuffix("triggeringClientEvents");
              logger.warn(`Client event triggered before channel 'subscription_succeeded' event . ${suffix}`);
            }
            return this.pusher.send_event(event, data, this.name);
          }
          disconnect() {
            this.subscribed = false;
            this.subscriptionPending = false;
          }
          handleEvent(event) {
            var eventName = event.event;
            var data = event.data;
            if (eventName === "pusher_internal:subscription_succeeded") {
              this.handleSubscriptionSucceededEvent(event);
            } else if (eventName === "pusher_internal:subscription_count") {
              this.handleSubscriptionCountEvent(event);
            } else if (eventName.indexOf("pusher_internal:") !== 0) {
              var metadata = {};
              this.emit(eventName, data, metadata);
            }
          }
          handleSubscriptionSucceededEvent(event) {
            this.subscriptionPending = false;
            this.subscribed = true;
            if (this.subscriptionCancelled) {
              this.pusher.unsubscribe(this.name);
            } else {
              this.emit("pusher:subscription_succeeded", event.data);
            }
          }
          handleSubscriptionCountEvent(event) {
            if (event.data.subscription_count) {
              this.subscriptionCount = event.data.subscription_count;
            }
            this.emit("pusher:subscription_count", event.data);
          }
          subscribe() {
            if (this.subscribed) {
              return;
            }
            this.subscriptionPending = true;
            this.subscriptionCancelled = false;
            this.authorize(this.pusher.connection.socket_id, (error, data) => {
              if (error) {
                this.subscriptionPending = false;
                logger.error(error.toString());
                this.emit("pusher:subscription_error", Object.assign({}, {
                  type: "AuthError",
                  error: error.message
                }, error instanceof HTTPAuthError ? { status: error.status } : {}));
              } else {
                this.pusher.send_event("pusher:subscribe", {
                  auth: data.auth,
                  channel_data: data.channel_data,
                  channel: this.name
                });
              }
            });
          }
          unsubscribe() {
            this.subscribed = false;
            this.pusher.send_event("pusher:unsubscribe", {
              channel: this.name
            });
          }
          cancelSubscription() {
            this.subscriptionCancelled = true;
          }
          reinstateSubscription() {
            this.subscriptionCancelled = false;
          }
        }
        class private_channel_PrivateChannel extends channel_Channel {
          authorize(socketId, callback) {
            return this.pusher.config.channelAuthorizer({
              channelName: this.name,
              socketId
            }, callback);
          }
        }
        class members_Members {
          constructor() {
            this.reset();
          }
          get(id) {
            if (Object.prototype.hasOwnProperty.call(this.members, id)) {
              return {
                id,
                info: this.members[id]
              };
            } else {
              return null;
            }
          }
          each(callback) {
            objectApply(this.members, (member, id) => {
              callback(this.get(id));
            });
          }
          setMyID(id) {
            this.myID = id;
          }
          onSubscription(subscriptionData) {
            this.members = subscriptionData.presence.hash;
            this.count = subscriptionData.presence.count;
            this.me = this.get(this.myID);
          }
          addMember(memberData) {
            if (this.get(memberData.user_id) === null) {
              this.count++;
            }
            this.members[memberData.user_id] = memberData.user_info;
            return this.get(memberData.user_id);
          }
          removeMember(memberData) {
            var member = this.get(memberData.user_id);
            if (member) {
              delete this.members[memberData.user_id];
              this.count--;
            }
            return member;
          }
          reset() {
            this.members = {};
            this.count = 0;
            this.myID = null;
            this.me = null;
          }
        }
        var __awaiter = function(thisArg, _arguments, P, generator) {
          function adopt(value) {
            return value instanceof P ? value : new P(function(resolve) {
              resolve(value);
            });
          }
          return new (P || (P = Promise))(function(resolve, reject) {
            function fulfilled(value) {
              try {
                step(generator.next(value));
              } catch (e) {
                reject(e);
              }
            }
            function rejected(value) {
              try {
                step(generator["throw"](value));
              } catch (e) {
                reject(e);
              }
            }
            function step(result) {
              result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
            }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
          });
        };
        class presence_channel_PresenceChannel extends private_channel_PrivateChannel {
          constructor(name, pusher2) {
            super(name, pusher2);
            this.members = new members_Members();
          }
          authorize(socketId, callback) {
            super.authorize(socketId, (error, authData) => __awaiter(this, void 0, void 0, function* () {
              if (!error) {
                authData = authData;
                if (authData.channel_data != null) {
                  var channelData = JSON.parse(authData.channel_data);
                  this.members.setMyID(channelData.user_id);
                } else {
                  yield this.pusher.user.signinDonePromise;
                  if (this.pusher.user.user_data != null) {
                    this.members.setMyID(this.pusher.user.user_data.id);
                  } else {
                    let suffix = url_store.buildLogSuffix("authorizationEndpoint");
                    logger.error(`Invalid auth response for channel '${this.name}', expected 'channel_data' field. ${suffix}, or the user should be signed in.`);
                    callback("Invalid auth response");
                    return;
                  }
                }
              }
              callback(error, authData);
            }));
          }
          handleEvent(event) {
            var eventName = event.event;
            if (eventName.indexOf("pusher_internal:") === 0) {
              this.handleInternalEvent(event);
            } else {
              var data = event.data;
              var metadata = {};
              if (event.user_id) {
                metadata.user_id = event.user_id;
              }
              this.emit(eventName, data, metadata);
            }
          }
          handleInternalEvent(event) {
            var eventName = event.event;
            var data = event.data;
            switch (eventName) {
              case "pusher_internal:subscription_succeeded":
                this.handleSubscriptionSucceededEvent(event);
                break;
              case "pusher_internal:subscription_count":
                this.handleSubscriptionCountEvent(event);
                break;
              case "pusher_internal:member_added":
                var addedMember = this.members.addMember(data);
                this.emit("pusher:member_added", addedMember);
                break;
              case "pusher_internal:member_removed":
                var removedMember = this.members.removeMember(data);
                if (removedMember) {
                  this.emit("pusher:member_removed", removedMember);
                }
                break;
            }
          }
          handleSubscriptionSucceededEvent(event) {
            this.subscriptionPending = false;
            this.subscribed = true;
            if (this.subscriptionCancelled) {
              this.pusher.unsubscribe(this.name);
            } else {
              this.members.onSubscription(event.data);
              this.emit("pusher:subscription_succeeded", this.members);
            }
          }
          disconnect() {
            this.members.reset();
            super.disconnect();
          }
        }
        var utf8 = __webpack_require__(1);
        var base64 = __webpack_require__(0);
        class encrypted_channel_EncryptedChannel extends private_channel_PrivateChannel {
          constructor(name, pusher2, nacl) {
            super(name, pusher2);
            this.key = null;
            this.nacl = nacl;
          }
          authorize(socketId, callback) {
            super.authorize(socketId, (error, authData) => {
              if (error) {
                callback(error, authData);
                return;
              }
              let sharedSecret = authData["shared_secret"];
              if (!sharedSecret) {
                callback(new Error(`No shared_secret key in auth payload for encrypted channel: ${this.name}`), null);
                return;
              }
              this.key = Object(base64["decode"])(sharedSecret);
              delete authData["shared_secret"];
              callback(null, authData);
            });
          }
          trigger(event, data) {
            throw new UnsupportedFeature("Client events are not currently supported for encrypted channels");
          }
          handleEvent(event) {
            var eventName = event.event;
            var data = event.data;
            if (eventName.indexOf("pusher_internal:") === 0 || eventName.indexOf("pusher:") === 0) {
              super.handleEvent(event);
              return;
            }
            this.handleEncryptedEvent(eventName, data);
          }
          handleEncryptedEvent(event, data) {
            if (!this.key) {
              logger.debug("Received encrypted event before key has been retrieved from the authEndpoint");
              return;
            }
            if (!data.ciphertext || !data.nonce) {
              logger.error("Unexpected format for encrypted event, expected object with `ciphertext` and `nonce` fields, got: " + data);
              return;
            }
            let cipherText = Object(base64["decode"])(data.ciphertext);
            if (cipherText.length < this.nacl.secretbox.overheadLength) {
              logger.error(`Expected encrypted event ciphertext length to be ${this.nacl.secretbox.overheadLength}, got: ${cipherText.length}`);
              return;
            }
            let nonce = Object(base64["decode"])(data.nonce);
            if (nonce.length < this.nacl.secretbox.nonceLength) {
              logger.error(`Expected encrypted event nonce length to be ${this.nacl.secretbox.nonceLength}, got: ${nonce.length}`);
              return;
            }
            let bytes = this.nacl.secretbox.open(cipherText, nonce, this.key);
            if (bytes === null) {
              logger.debug("Failed to decrypt an event, probably because it was encrypted with a different key. Fetching a new key from the authEndpoint...");
              this.authorize(this.pusher.connection.socket_id, (error, authData) => {
                if (error) {
                  logger.error(`Failed to make a request to the authEndpoint: ${authData}. Unable to fetch new key, so dropping encrypted event`);
                  return;
                }
                bytes = this.nacl.secretbox.open(cipherText, nonce, this.key);
                if (bytes === null) {
                  logger.error(`Failed to decrypt event with new key. Dropping encrypted event`);
                  return;
                }
                this.emit(event, this.getDataToEmit(bytes));
                return;
              });
              return;
            }
            this.emit(event, this.getDataToEmit(bytes));
          }
          getDataToEmit(bytes) {
            let raw = Object(utf8["decode"])(bytes);
            try {
              return JSON.parse(raw);
            } catch (_a) {
              return raw;
            }
          }
        }
        class connection_manager_ConnectionManager extends dispatcher_Dispatcher {
          constructor(key, options) {
            super();
            this.state = "initialized";
            this.connection = null;
            this.key = key;
            this.options = options;
            this.timeline = this.options.timeline;
            this.usingTLS = this.options.useTLS;
            this.errorCallbacks = this.buildErrorCallbacks();
            this.connectionCallbacks = this.buildConnectionCallbacks(this.errorCallbacks);
            this.handshakeCallbacks = this.buildHandshakeCallbacks(this.errorCallbacks);
            var Network = runtime.getNetwork();
            Network.bind("online", () => {
              this.timeline.info({ netinfo: "online" });
              if (this.state === "connecting" || this.state === "unavailable") {
                this.retryIn(0);
              }
            });
            Network.bind("offline", () => {
              this.timeline.info({ netinfo: "offline" });
              if (this.connection) {
                this.sendActivityCheck();
              }
            });
            this.updateStrategy();
          }
          connect() {
            if (this.connection || this.runner) {
              return;
            }
            if (!this.strategy.isSupported()) {
              this.updateState("failed");
              return;
            }
            this.updateState("connecting");
            this.startConnecting();
            this.setUnavailableTimer();
          }
          send(data) {
            if (this.connection) {
              return this.connection.send(data);
            } else {
              return false;
            }
          }
          send_event(name, data, channel) {
            if (this.connection) {
              return this.connection.send_event(name, data, channel);
            } else {
              return false;
            }
          }
          disconnect() {
            this.disconnectInternally();
            this.updateState("disconnected");
          }
          isUsingTLS() {
            return this.usingTLS;
          }
          startConnecting() {
            var callback = (error, handshake) => {
              if (error) {
                this.runner = this.strategy.connect(0, callback);
              } else {
                if (handshake.action === "error") {
                  this.emit("error", {
                    type: "HandshakeError",
                    error: handshake.error
                  });
                  this.timeline.error({ handshakeError: handshake.error });
                } else {
                  this.abortConnecting();
                  this.handshakeCallbacks[handshake.action](handshake);
                }
              }
            };
            this.runner = this.strategy.connect(0, callback);
          }
          abortConnecting() {
            if (this.runner) {
              this.runner.abort();
              this.runner = null;
            }
          }
          disconnectInternally() {
            this.abortConnecting();
            this.clearRetryTimer();
            this.clearUnavailableTimer();
            if (this.connection) {
              var connection = this.abandonConnection();
              connection.close();
            }
          }
          updateStrategy() {
            this.strategy = this.options.getStrategy({
              key: this.key,
              timeline: this.timeline,
              useTLS: this.usingTLS
            });
          }
          retryIn(delay) {
            this.timeline.info({ action: "retry", delay });
            if (delay > 0) {
              this.emit("connecting_in", Math.round(delay / 1e3));
            }
            this.retryTimer = new timers_OneOffTimer(delay || 0, () => {
              this.disconnectInternally();
              this.connect();
            });
          }
          clearRetryTimer() {
            if (this.retryTimer) {
              this.retryTimer.ensureAborted();
              this.retryTimer = null;
            }
          }
          setUnavailableTimer() {
            this.unavailableTimer = new timers_OneOffTimer(this.options.unavailableTimeout, () => {
              this.updateState("unavailable");
            });
          }
          clearUnavailableTimer() {
            if (this.unavailableTimer) {
              this.unavailableTimer.ensureAborted();
            }
          }
          sendActivityCheck() {
            this.stopActivityCheck();
            this.connection.ping();
            this.activityTimer = new timers_OneOffTimer(this.options.pongTimeout, () => {
              this.timeline.error({ pong_timed_out: this.options.pongTimeout });
              this.retryIn(0);
            });
          }
          resetActivityCheck() {
            this.stopActivityCheck();
            if (this.connection && !this.connection.handlesActivityChecks()) {
              this.activityTimer = new timers_OneOffTimer(this.activityTimeout, () => {
                this.sendActivityCheck();
              });
            }
          }
          stopActivityCheck() {
            if (this.activityTimer) {
              this.activityTimer.ensureAborted();
            }
          }
          buildConnectionCallbacks(errorCallbacks) {
            return extend({}, errorCallbacks, {
              message: (message) => {
                this.resetActivityCheck();
                this.emit("message", message);
              },
              ping: () => {
                this.send_event("pusher:pong", {});
              },
              activity: () => {
                this.resetActivityCheck();
              },
              error: (error) => {
                this.emit("error", error);
              },
              closed: () => {
                this.abandonConnection();
                if (this.shouldRetry()) {
                  this.retryIn(1e3);
                }
              }
            });
          }
          buildHandshakeCallbacks(errorCallbacks) {
            return extend({}, errorCallbacks, {
              connected: (handshake) => {
                this.activityTimeout = Math.min(this.options.activityTimeout, handshake.activityTimeout, handshake.connection.activityTimeout || Infinity);
                this.clearUnavailableTimer();
                this.setConnection(handshake.connection);
                this.socket_id = this.connection.id;
                this.updateState("connected", { socket_id: this.socket_id });
              }
            });
          }
          buildErrorCallbacks() {
            let withErrorEmitted = (callback) => {
              return (result) => {
                if (result.error) {
                  this.emit("error", { type: "WebSocketError", error: result.error });
                }
                callback(result);
              };
            };
            return {
              tls_only: withErrorEmitted(() => {
                this.usingTLS = true;
                this.updateStrategy();
                this.retryIn(0);
              }),
              refused: withErrorEmitted(() => {
                this.disconnect();
              }),
              backoff: withErrorEmitted(() => {
                this.retryIn(1e3);
              }),
              retry: withErrorEmitted(() => {
                this.retryIn(0);
              })
            };
          }
          setConnection(connection) {
            this.connection = connection;
            for (var event in this.connectionCallbacks) {
              this.connection.bind(event, this.connectionCallbacks[event]);
            }
            this.resetActivityCheck();
          }
          abandonConnection() {
            if (!this.connection) {
              return;
            }
            this.stopActivityCheck();
            for (var event in this.connectionCallbacks) {
              this.connection.unbind(event, this.connectionCallbacks[event]);
            }
            var connection = this.connection;
            this.connection = null;
            return connection;
          }
          updateState(newState, data) {
            var previousState = this.state;
            this.state = newState;
            if (previousState !== newState) {
              var newStateDescription = newState;
              if (newStateDescription === "connected") {
                newStateDescription += " with new socket ID " + data.socket_id;
              }
              logger.debug("State changed", previousState + " -> " + newStateDescription);
              this.timeline.info({ state: newState, params: data });
              this.emit("state_change", { previous: previousState, current: newState });
              this.emit(newState, data);
            }
          }
          shouldRetry() {
            return this.state === "connecting" || this.state === "connected";
          }
        }
        class channels_Channels {
          constructor() {
            this.channels = {};
          }
          add(name, pusher2) {
            if (!this.channels[name]) {
              this.channels[name] = createChannel(name, pusher2);
            }
            return this.channels[name];
          }
          all() {
            return values(this.channels);
          }
          find(name) {
            return this.channels[name];
          }
          remove(name) {
            var channel = this.channels[name];
            delete this.channels[name];
            return channel;
          }
          disconnect() {
            objectApply(this.channels, function(channel) {
              channel.disconnect();
            });
          }
        }
        function createChannel(name, pusher2) {
          if (name.indexOf("private-encrypted-") === 0) {
            if (pusher2.config.nacl) {
              return factory.createEncryptedChannel(name, pusher2, pusher2.config.nacl);
            }
            let errMsg = "Tried to subscribe to a private-encrypted- channel but no nacl implementation available";
            let suffix = url_store.buildLogSuffix("encryptedChannelSupport");
            throw new UnsupportedFeature(`${errMsg}. ${suffix}`);
          } else if (name.indexOf("private-") === 0) {
            return factory.createPrivateChannel(name, pusher2);
          } else if (name.indexOf("presence-") === 0) {
            return factory.createPresenceChannel(name, pusher2);
          } else if (name.indexOf("#") === 0) {
            throw new BadChannelName('Cannot create a channel with name "' + name + '".');
          } else {
            return factory.createChannel(name, pusher2);
          }
        }
        var Factory = {
          createChannels() {
            return new channels_Channels();
          },
          createConnectionManager(key, options) {
            return new connection_manager_ConnectionManager(key, options);
          },
          createChannel(name, pusher2) {
            return new channel_Channel(name, pusher2);
          },
          createPrivateChannel(name, pusher2) {
            return new private_channel_PrivateChannel(name, pusher2);
          },
          createPresenceChannel(name, pusher2) {
            return new presence_channel_PresenceChannel(name, pusher2);
          },
          createEncryptedChannel(name, pusher2, nacl) {
            return new encrypted_channel_EncryptedChannel(name, pusher2, nacl);
          },
          createTimelineSender(timeline, options) {
            return new timeline_sender_TimelineSender(timeline, options);
          },
          createHandshake(transport, callback) {
            return new handshake_Handshake(transport, callback);
          },
          createAssistantToTheTransportManager(manager, transport, options) {
            return new assistant_to_the_transport_manager_AssistantToTheTransportManager(manager, transport, options);
          }
        };
        var factory = Factory;
        class transport_manager_TransportManager {
          constructor(options) {
            this.options = options || {};
            this.livesLeft = this.options.lives || Infinity;
          }
          getAssistant(transport) {
            return factory.createAssistantToTheTransportManager(this, transport, {
              minPingDelay: this.options.minPingDelay,
              maxPingDelay: this.options.maxPingDelay
            });
          }
          isAlive() {
            return this.livesLeft > 0;
          }
          reportDeath() {
            this.livesLeft -= 1;
          }
        }
        class sequential_strategy_SequentialStrategy {
          constructor(strategies, options) {
            this.strategies = strategies;
            this.loop = Boolean(options.loop);
            this.failFast = Boolean(options.failFast);
            this.timeout = options.timeout;
            this.timeoutLimit = options.timeoutLimit;
          }
          isSupported() {
            return any(this.strategies, util.method("isSupported"));
          }
          connect(minPriority, callback) {
            var strategies = this.strategies;
            var current = 0;
            var timeout = this.timeout;
            var runner = null;
            var tryNextStrategy = (error, handshake) => {
              if (handshake) {
                callback(null, handshake);
              } else {
                current = current + 1;
                if (this.loop) {
                  current = current % strategies.length;
                }
                if (current < strategies.length) {
                  if (timeout) {
                    timeout = timeout * 2;
                    if (this.timeoutLimit) {
                      timeout = Math.min(timeout, this.timeoutLimit);
                    }
                  }
                  runner = this.tryStrategy(strategies[current], minPriority, { timeout, failFast: this.failFast }, tryNextStrategy);
                } else {
                  callback(true);
                }
              }
            };
            runner = this.tryStrategy(strategies[current], minPriority, { timeout, failFast: this.failFast }, tryNextStrategy);
            return {
              abort: function() {
                runner.abort();
              },
              forceMinPriority: function(p) {
                minPriority = p;
                if (runner) {
                  runner.forceMinPriority(p);
                }
              }
            };
          }
          tryStrategy(strategy, minPriority, options, callback) {
            var timer = null;
            var runner = null;
            if (options.timeout > 0) {
              timer = new timers_OneOffTimer(options.timeout, function() {
                runner.abort();
                callback(true);
              });
            }
            runner = strategy.connect(minPriority, function(error, handshake) {
              if (error && timer && timer.isRunning() && !options.failFast) {
                return;
              }
              if (timer) {
                timer.ensureAborted();
              }
              callback(error, handshake);
            });
            return {
              abort: function() {
                if (timer) {
                  timer.ensureAborted();
                }
                runner.abort();
              },
              forceMinPriority: function(p) {
                runner.forceMinPriority(p);
              }
            };
          }
        }
        class best_connected_ever_strategy_BestConnectedEverStrategy {
          constructor(strategies) {
            this.strategies = strategies;
          }
          isSupported() {
            return any(this.strategies, util.method("isSupported"));
          }
          connect(minPriority, callback) {
            return connect(this.strategies, minPriority, function(i, runners) {
              return function(error, handshake) {
                runners[i].error = error;
                if (error) {
                  if (allRunnersFailed(runners)) {
                    callback(true);
                  }
                  return;
                }
                apply(runners, function(runner) {
                  runner.forceMinPriority(handshake.transport.priority);
                });
                callback(null, handshake);
              };
            });
          }
        }
        function connect(strategies, minPriority, callbackBuilder) {
          var runners = map(strategies, function(strategy, i, _, rs) {
            return strategy.connect(minPriority, callbackBuilder(i, rs));
          });
          return {
            abort: function() {
              apply(runners, abortRunner);
            },
            forceMinPriority: function(p) {
              apply(runners, function(runner) {
                runner.forceMinPriority(p);
              });
            }
          };
        }
        function allRunnersFailed(runners) {
          return collections_all(runners, function(runner) {
            return Boolean(runner.error);
          });
        }
        function abortRunner(runner) {
          if (!runner.error && !runner.aborted) {
            runner.abort();
            runner.aborted = true;
          }
        }
        class websocket_prioritized_cached_strategy_WebSocketPrioritizedCachedStrategy {
          constructor(strategy, transports2, options) {
            this.strategy = strategy;
            this.transports = transports2;
            this.ttl = options.ttl || 1800 * 1e3;
            this.usingTLS = options.useTLS;
            this.timeline = options.timeline;
          }
          isSupported() {
            return this.strategy.isSupported();
          }
          connect(minPriority, callback) {
            var usingTLS = this.usingTLS;
            var info = fetchTransportCache(usingTLS);
            var cacheSkipCount = info && info.cacheSkipCount ? info.cacheSkipCount : 0;
            var strategies = [this.strategy];
            if (info && info.timestamp + this.ttl >= util.now()) {
              var transport = this.transports[info.transport];
              if (transport) {
                if (["ws", "wss"].includes(info.transport) || cacheSkipCount > 3) {
                  this.timeline.info({
                    cached: true,
                    transport: info.transport,
                    latency: info.latency
                  });
                  strategies.push(new sequential_strategy_SequentialStrategy([transport], {
                    timeout: info.latency * 2 + 1e3,
                    failFast: true
                  }));
                } else {
                  cacheSkipCount++;
                }
              }
            }
            var startTimestamp = util.now();
            var runner = strategies.pop().connect(minPriority, function cb(error, handshake) {
              if (error) {
                flushTransportCache(usingTLS);
                if (strategies.length > 0) {
                  startTimestamp = util.now();
                  runner = strategies.pop().connect(minPriority, cb);
                } else {
                  callback(error);
                }
              } else {
                storeTransportCache(usingTLS, handshake.transport.name, util.now() - startTimestamp, cacheSkipCount);
                callback(null, handshake);
              }
            });
            return {
              abort: function() {
                runner.abort();
              },
              forceMinPriority: function(p) {
                minPriority = p;
                if (runner) {
                  runner.forceMinPriority(p);
                }
              }
            };
          }
        }
        function getTransportCacheKey(usingTLS) {
          return "pusherTransport" + (usingTLS ? "TLS" : "NonTLS");
        }
        function fetchTransportCache(usingTLS) {
          var storage = runtime.getLocalStorage();
          if (storage) {
            try {
              var serializedCache = storage[getTransportCacheKey(usingTLS)];
              if (serializedCache) {
                return JSON.parse(serializedCache);
              }
            } catch (e) {
              flushTransportCache(usingTLS);
            }
          }
          return null;
        }
        function storeTransportCache(usingTLS, transport, latency, cacheSkipCount) {
          var storage = runtime.getLocalStorage();
          if (storage) {
            try {
              storage[getTransportCacheKey(usingTLS)] = safeJSONStringify({
                timestamp: util.now(),
                transport,
                latency,
                cacheSkipCount
              });
            } catch (e) {
            }
          }
        }
        function flushTransportCache(usingTLS) {
          var storage = runtime.getLocalStorage();
          if (storage) {
            try {
              delete storage[getTransportCacheKey(usingTLS)];
            } catch (e) {
            }
          }
        }
        class delayed_strategy_DelayedStrategy {
          constructor(strategy, { delay: number }) {
            this.strategy = strategy;
            this.options = { delay: number };
          }
          isSupported() {
            return this.strategy.isSupported();
          }
          connect(minPriority, callback) {
            var strategy = this.strategy;
            var runner;
            var timer = new timers_OneOffTimer(this.options.delay, function() {
              runner = strategy.connect(minPriority, callback);
            });
            return {
              abort: function() {
                timer.ensureAborted();
                if (runner) {
                  runner.abort();
                }
              },
              forceMinPriority: function(p) {
                minPriority = p;
                if (runner) {
                  runner.forceMinPriority(p);
                }
              }
            };
          }
        }
        class IfStrategy {
          constructor(test, trueBranch, falseBranch) {
            this.test = test;
            this.trueBranch = trueBranch;
            this.falseBranch = falseBranch;
          }
          isSupported() {
            var branch = this.test() ? this.trueBranch : this.falseBranch;
            return branch.isSupported();
          }
          connect(minPriority, callback) {
            var branch = this.test() ? this.trueBranch : this.falseBranch;
            return branch.connect(minPriority, callback);
          }
        }
        class FirstConnectedStrategy {
          constructor(strategy) {
            this.strategy = strategy;
          }
          isSupported() {
            return this.strategy.isSupported();
          }
          connect(minPriority, callback) {
            var runner = this.strategy.connect(minPriority, function(error, handshake) {
              if (handshake) {
                runner.abort();
              }
              callback(error, handshake);
            });
            return runner;
          }
        }
        function testSupportsStrategy(strategy) {
          return function() {
            return strategy.isSupported();
          };
        }
        var getDefaultStrategy = function(config, baseOptions, defineTransport) {
          var definedTransports = {};
          function defineTransportStrategy(name, type, priority, options, manager) {
            var transport = defineTransport(config, name, type, priority, options, manager);
            definedTransports[name] = transport;
            return transport;
          }
          var ws_options = Object.assign({}, baseOptions, {
            hostNonTLS: config.wsHost + ":" + config.wsPort,
            hostTLS: config.wsHost + ":" + config.wssPort,
            httpPath: config.wsPath
          });
          var wss_options = Object.assign({}, ws_options, {
            useTLS: true
          });
          var sockjs_options = Object.assign({}, baseOptions, {
            hostNonTLS: config.httpHost + ":" + config.httpPort,
            hostTLS: config.httpHost + ":" + config.httpsPort,
            httpPath: config.httpPath
          });
          var timeouts = {
            loop: true,
            timeout: 15e3,
            timeoutLimit: 6e4
          };
          var ws_manager = new transport_manager_TransportManager({
            minPingDelay: 1e4,
            maxPingDelay: config.activityTimeout
          });
          var streaming_manager = new transport_manager_TransportManager({
            lives: 2,
            minPingDelay: 1e4,
            maxPingDelay: config.activityTimeout
          });
          var ws_transport = defineTransportStrategy("ws", "ws", 3, ws_options, ws_manager);
          var wss_transport = defineTransportStrategy("wss", "ws", 3, wss_options, ws_manager);
          var sockjs_transport = defineTransportStrategy("sockjs", "sockjs", 1, sockjs_options);
          var xhr_streaming_transport = defineTransportStrategy("xhr_streaming", "xhr_streaming", 1, sockjs_options, streaming_manager);
          var xdr_streaming_transport = defineTransportStrategy("xdr_streaming", "xdr_streaming", 1, sockjs_options, streaming_manager);
          var xhr_polling_transport = defineTransportStrategy("xhr_polling", "xhr_polling", 1, sockjs_options);
          var xdr_polling_transport = defineTransportStrategy("xdr_polling", "xdr_polling", 1, sockjs_options);
          var ws_loop = new sequential_strategy_SequentialStrategy([ws_transport], timeouts);
          var wss_loop = new sequential_strategy_SequentialStrategy([wss_transport], timeouts);
          var sockjs_loop = new sequential_strategy_SequentialStrategy([sockjs_transport], timeouts);
          var streaming_loop = new sequential_strategy_SequentialStrategy([
            new IfStrategy(testSupportsStrategy(xhr_streaming_transport), xhr_streaming_transport, xdr_streaming_transport)
          ], timeouts);
          var polling_loop = new sequential_strategy_SequentialStrategy([
            new IfStrategy(testSupportsStrategy(xhr_polling_transport), xhr_polling_transport, xdr_polling_transport)
          ], timeouts);
          var http_loop = new sequential_strategy_SequentialStrategy([
            new IfStrategy(testSupportsStrategy(streaming_loop), new best_connected_ever_strategy_BestConnectedEverStrategy([
              streaming_loop,
              new delayed_strategy_DelayedStrategy(polling_loop, { delay: 4e3 })
            ]), polling_loop)
          ], timeouts);
          var http_fallback_loop = new IfStrategy(testSupportsStrategy(http_loop), http_loop, sockjs_loop);
          var wsStrategy;
          if (baseOptions.useTLS) {
            wsStrategy = new best_connected_ever_strategy_BestConnectedEverStrategy([
              ws_loop,
              new delayed_strategy_DelayedStrategy(http_fallback_loop, { delay: 2e3 })
            ]);
          } else {
            wsStrategy = new best_connected_ever_strategy_BestConnectedEverStrategy([
              ws_loop,
              new delayed_strategy_DelayedStrategy(wss_loop, { delay: 2e3 }),
              new delayed_strategy_DelayedStrategy(http_fallback_loop, { delay: 5e3 })
            ]);
          }
          return new websocket_prioritized_cached_strategy_WebSocketPrioritizedCachedStrategy(new FirstConnectedStrategy(new IfStrategy(testSupportsStrategy(ws_transport), wsStrategy, http_fallback_loop)), definedTransports, {
            ttl: 18e5,
            timeline: baseOptions.timeline,
            useTLS: baseOptions.useTLS
          });
        };
        var default_strategy = getDefaultStrategy;
        var transport_connection_initializer = function() {
          var self = this;
          self.timeline.info(self.buildTimelineMessage({
            transport: self.name + (self.options.useTLS ? "s" : "")
          }));
          if (self.hooks.isInitialized()) {
            self.changeState("initialized");
          } else if (self.hooks.file) {
            self.changeState("initializing");
            Dependencies.load(self.hooks.file, { useTLS: self.options.useTLS }, function(error, callback) {
              if (self.hooks.isInitialized()) {
                self.changeState("initialized");
                callback(true);
              } else {
                if (error) {
                  self.onError(error);
                }
                self.onClose();
                callback(false);
              }
            });
          } else {
            self.onClose();
          }
        };
        var http_xdomain_request_hooks = {
          getRequest: function(socket) {
            var xdr = new window.XDomainRequest();
            xdr.ontimeout = function() {
              socket.emit("error", new RequestTimedOut());
              socket.close();
            };
            xdr.onerror = function(e) {
              socket.emit("error", e);
              socket.close();
            };
            xdr.onprogress = function() {
              if (xdr.responseText && xdr.responseText.length > 0) {
                socket.onChunk(200, xdr.responseText);
              }
            };
            xdr.onload = function() {
              if (xdr.responseText && xdr.responseText.length > 0) {
                socket.onChunk(200, xdr.responseText);
              }
              socket.emit("finished", 200);
              socket.close();
            };
            return xdr;
          },
          abortRequest: function(xdr) {
            xdr.ontimeout = xdr.onerror = xdr.onprogress = xdr.onload = null;
            xdr.abort();
          }
        };
        var http_xdomain_request = http_xdomain_request_hooks;
        const MAX_BUFFER_LENGTH = 256 * 1024;
        class http_request_HTTPRequest extends dispatcher_Dispatcher {
          constructor(hooks, method, url) {
            super();
            this.hooks = hooks;
            this.method = method;
            this.url = url;
          }
          start(payload) {
            this.position = 0;
            this.xhr = this.hooks.getRequest(this);
            this.unloader = () => {
              this.close();
            };
            runtime.addUnloadListener(this.unloader);
            this.xhr.open(this.method, this.url, true);
            if (this.xhr.setRequestHeader) {
              this.xhr.setRequestHeader("Content-Type", "application/json");
            }
            this.xhr.send(payload);
          }
          close() {
            if (this.unloader) {
              runtime.removeUnloadListener(this.unloader);
              this.unloader = null;
            }
            if (this.xhr) {
              this.hooks.abortRequest(this.xhr);
              this.xhr = null;
            }
          }
          onChunk(status, data) {
            while (true) {
              var chunk = this.advanceBuffer(data);
              if (chunk) {
                this.emit("chunk", { status, data: chunk });
              } else {
                break;
              }
            }
            if (this.isBufferTooLong(data)) {
              this.emit("buffer_too_long");
            }
          }
          advanceBuffer(buffer) {
            var unreadData = buffer.slice(this.position);
            var endOfLinePosition = unreadData.indexOf("\n");
            if (endOfLinePosition !== -1) {
              this.position += endOfLinePosition + 1;
              return unreadData.slice(0, endOfLinePosition);
            } else {
              return null;
            }
          }
          isBufferTooLong(buffer) {
            return this.position === buffer.length && buffer.length > MAX_BUFFER_LENGTH;
          }
        }
        var State;
        (function(State2) {
          State2[State2["CONNECTING"] = 0] = "CONNECTING";
          State2[State2["OPEN"] = 1] = "OPEN";
          State2[State2["CLOSED"] = 3] = "CLOSED";
        })(State || (State = {}));
        var state = State;
        var autoIncrement = 1;
        class http_socket_HTTPSocket {
          constructor(hooks, url) {
            this.hooks = hooks;
            this.session = randomNumber(1e3) + "/" + randomString(8);
            this.location = getLocation(url);
            this.readyState = state.CONNECTING;
            this.openStream();
          }
          send(payload) {
            return this.sendRaw(JSON.stringify([payload]));
          }
          ping() {
            this.hooks.sendHeartbeat(this);
          }
          close(code, reason) {
            this.onClose(code, reason, true);
          }
          sendRaw(payload) {
            if (this.readyState === state.OPEN) {
              try {
                runtime.createSocketRequest("POST", getUniqueURL(getSendURL(this.location, this.session))).start(payload);
                return true;
              } catch (e) {
                return false;
              }
            } else {
              return false;
            }
          }
          reconnect() {
            this.closeStream();
            this.openStream();
          }
          onClose(code, reason, wasClean) {
            this.closeStream();
            this.readyState = state.CLOSED;
            if (this.onclose) {
              this.onclose({
                code,
                reason,
                wasClean
              });
            }
          }
          onChunk(chunk) {
            if (chunk.status !== 200) {
              return;
            }
            if (this.readyState === state.OPEN) {
              this.onActivity();
            }
            var payload;
            var type = chunk.data.slice(0, 1);
            switch (type) {
              case "o":
                payload = JSON.parse(chunk.data.slice(1) || "{}");
                this.onOpen(payload);
                break;
              case "a":
                payload = JSON.parse(chunk.data.slice(1) || "[]");
                for (var i = 0; i < payload.length; i++) {
                  this.onEvent(payload[i]);
                }
                break;
              case "m":
                payload = JSON.parse(chunk.data.slice(1) || "null");
                this.onEvent(payload);
                break;
              case "h":
                this.hooks.onHeartbeat(this);
                break;
              case "c":
                payload = JSON.parse(chunk.data.slice(1) || "[]");
                this.onClose(payload[0], payload[1], true);
                break;
            }
          }
          onOpen(options) {
            if (this.readyState === state.CONNECTING) {
              if (options && options.hostname) {
                this.location.base = replaceHost(this.location.base, options.hostname);
              }
              this.readyState = state.OPEN;
              if (this.onopen) {
                this.onopen();
              }
            } else {
              this.onClose(1006, "Server lost session", true);
            }
          }
          onEvent(event) {
            if (this.readyState === state.OPEN && this.onmessage) {
              this.onmessage({ data: event });
            }
          }
          onActivity() {
            if (this.onactivity) {
              this.onactivity();
            }
          }
          onError(error) {
            if (this.onerror) {
              this.onerror(error);
            }
          }
          openStream() {
            this.stream = runtime.createSocketRequest("POST", getUniqueURL(this.hooks.getReceiveURL(this.location, this.session)));
            this.stream.bind("chunk", (chunk) => {
              this.onChunk(chunk);
            });
            this.stream.bind("finished", (status) => {
              this.hooks.onFinished(this, status);
            });
            this.stream.bind("buffer_too_long", () => {
              this.reconnect();
            });
            try {
              this.stream.start();
            } catch (error) {
              util.defer(() => {
                this.onError(error);
                this.onClose(1006, "Could not start streaming", false);
              });
            }
          }
          closeStream() {
            if (this.stream) {
              this.stream.unbind_all();
              this.stream.close();
              this.stream = null;
            }
          }
        }
        function getLocation(url) {
          var parts = /([^\?]*)\/*(\??.*)/.exec(url);
          return {
            base: parts[1],
            queryString: parts[2]
          };
        }
        function getSendURL(url, session) {
          return url.base + "/" + session + "/xhr_send";
        }
        function getUniqueURL(url) {
          var separator = url.indexOf("?") === -1 ? "?" : "&";
          return url + separator + "t=" + +new Date() + "&n=" + autoIncrement++;
        }
        function replaceHost(url, hostname) {
          var urlParts = /(https?:\/\/)([^\/:]+)((\/|:)?.*)/.exec(url);
          return urlParts[1] + hostname + urlParts[3];
        }
        function randomNumber(max) {
          return runtime.randomInt(max);
        }
        function randomString(length) {
          var result = [];
          for (var i = 0; i < length; i++) {
            result.push(randomNumber(32).toString(32));
          }
          return result.join("");
        }
        var http_socket = http_socket_HTTPSocket;
        var http_streaming_socket_hooks = {
          getReceiveURL: function(url, session) {
            return url.base + "/" + session + "/xhr_streaming" + url.queryString;
          },
          onHeartbeat: function(socket) {
            socket.sendRaw("[]");
          },
          sendHeartbeat: function(socket) {
            socket.sendRaw("[]");
          },
          onFinished: function(socket, status) {
            socket.onClose(1006, "Connection interrupted (" + status + ")", false);
          }
        };
        var http_streaming_socket = http_streaming_socket_hooks;
        var http_polling_socket_hooks = {
          getReceiveURL: function(url, session) {
            return url.base + "/" + session + "/xhr" + url.queryString;
          },
          onHeartbeat: function() {
          },
          sendHeartbeat: function(socket) {
            socket.sendRaw("[]");
          },
          onFinished: function(socket, status) {
            if (status === 200) {
              socket.reconnect();
            } else {
              socket.onClose(1006, "Connection interrupted (" + status + ")", false);
            }
          }
        };
        var http_polling_socket = http_polling_socket_hooks;
        var http_xhr_request_hooks = {
          getRequest: function(socket) {
            var Constructor = runtime.getXHRAPI();
            var xhr = new Constructor();
            xhr.onreadystatechange = xhr.onprogress = function() {
              switch (xhr.readyState) {
                case 3:
                  if (xhr.responseText && xhr.responseText.length > 0) {
                    socket.onChunk(xhr.status, xhr.responseText);
                  }
                  break;
                case 4:
                  if (xhr.responseText && xhr.responseText.length > 0) {
                    socket.onChunk(xhr.status, xhr.responseText);
                  }
                  socket.emit("finished", xhr.status);
                  socket.close();
                  break;
              }
            };
            return xhr;
          },
          abortRequest: function(xhr) {
            xhr.onreadystatechange = null;
            xhr.abort();
          }
        };
        var http_xhr_request = http_xhr_request_hooks;
        var HTTP = {
          createStreamingSocket(url) {
            return this.createSocket(http_streaming_socket, url);
          },
          createPollingSocket(url) {
            return this.createSocket(http_polling_socket, url);
          },
          createSocket(hooks, url) {
            return new http_socket(hooks, url);
          },
          createXHR(method, url) {
            return this.createRequest(http_xhr_request, method, url);
          },
          createRequest(hooks, method, url) {
            return new http_request_HTTPRequest(hooks, method, url);
          }
        };
        var http_http = HTTP;
        http_http.createXDR = function(method, url) {
          return this.createRequest(http_xdomain_request, method, url);
        };
        var web_http_http = http_http;
        var Runtime = {
          nextAuthCallbackID: 1,
          auth_callbacks: {},
          ScriptReceivers,
          DependenciesReceivers,
          getDefaultStrategy: default_strategy,
          Transports: transports_transports,
          transportConnectionInitializer: transport_connection_initializer,
          HTTPFactory: web_http_http,
          TimelineTransport: jsonp_timeline,
          getXHRAPI() {
            return window.XMLHttpRequest;
          },
          getWebSocketAPI() {
            return window.WebSocket || window.MozWebSocket;
          },
          setup(PusherClass) {
            window.Pusher = PusherClass;
            var initializeOnDocumentBody = () => {
              this.onDocumentBody(PusherClass.ready);
            };
            if (!window.JSON) {
              Dependencies.load("json2", {}, initializeOnDocumentBody);
            } else {
              initializeOnDocumentBody();
            }
          },
          getDocument() {
            return document;
          },
          getProtocol() {
            return this.getDocument().location.protocol;
          },
          getAuthorizers() {
            return { ajax: xhr_auth, jsonp: jsonp_auth };
          },
          onDocumentBody(callback) {
            if (document.body) {
              callback();
            } else {
              setTimeout(() => {
                this.onDocumentBody(callback);
              }, 0);
            }
          },
          createJSONPRequest(url, data) {
            return new jsonp_request_JSONPRequest(url, data);
          },
          createScriptRequest(src) {
            return new ScriptRequest(src);
          },
          getLocalStorage() {
            try {
              return window.localStorage;
            } catch (e) {
              return void 0;
            }
          },
          createXHR() {
            if (this.getXHRAPI()) {
              return this.createXMLHttpRequest();
            } else {
              return this.createMicrosoftXHR();
            }
          },
          createXMLHttpRequest() {
            var Constructor = this.getXHRAPI();
            return new Constructor();
          },
          createMicrosoftXHR() {
            return new ActiveXObject("Microsoft.XMLHTTP");
          },
          getNetwork() {
            return net_info_Network;
          },
          createWebSocket(url) {
            var Constructor = this.getWebSocketAPI();
            return new Constructor(url);
          },
          createSocketRequest(method, url) {
            if (this.isXHRSupported()) {
              return this.HTTPFactory.createXHR(method, url);
            } else if (this.isXDRSupported(url.indexOf("https:") === 0)) {
              return this.HTTPFactory.createXDR(method, url);
            } else {
              throw "Cross-origin HTTP requests are not supported";
            }
          },
          isXHRSupported() {
            var Constructor = this.getXHRAPI();
            return Boolean(Constructor) && new Constructor().withCredentials !== void 0;
          },
          isXDRSupported(useTLS) {
            var protocol = useTLS ? "https:" : "http:";
            var documentProtocol = this.getProtocol();
            return Boolean(window["XDomainRequest"]) && documentProtocol === protocol;
          },
          addUnloadListener(listener) {
            if (window.addEventListener !== void 0) {
              window.addEventListener("unload", listener, false);
            } else if (window.attachEvent !== void 0) {
              window.attachEvent("onunload", listener);
            }
          },
          removeUnloadListener(listener) {
            if (window.addEventListener !== void 0) {
              window.removeEventListener("unload", listener, false);
            } else if (window.detachEvent !== void 0) {
              window.detachEvent("onunload", listener);
            }
          },
          randomInt(max) {
            const random = function() {
              const crypto = window.crypto || window["msCrypto"];
              const random2 = crypto.getRandomValues(new Uint32Array(1))[0];
              return random2 / Math.pow(2, 32);
            };
            return Math.floor(random() * max);
          }
        };
        var runtime = Runtime;
        var TimelineLevel;
        (function(TimelineLevel2) {
          TimelineLevel2[TimelineLevel2["ERROR"] = 3] = "ERROR";
          TimelineLevel2[TimelineLevel2["INFO"] = 6] = "INFO";
          TimelineLevel2[TimelineLevel2["DEBUG"] = 7] = "DEBUG";
        })(TimelineLevel || (TimelineLevel = {}));
        var timeline_level = TimelineLevel;
        class timeline_Timeline {
          constructor(key, session, options) {
            this.key = key;
            this.session = session;
            this.events = [];
            this.options = options || {};
            this.sent = 0;
            this.uniqueID = 0;
          }
          log(level, event) {
            if (level <= this.options.level) {
              this.events.push(extend({}, event, { timestamp: util.now() }));
              if (this.options.limit && this.events.length > this.options.limit) {
                this.events.shift();
              }
            }
          }
          error(event) {
            this.log(timeline_level.ERROR, event);
          }
          info(event) {
            this.log(timeline_level.INFO, event);
          }
          debug(event) {
            this.log(timeline_level.DEBUG, event);
          }
          isEmpty() {
            return this.events.length === 0;
          }
          send(sendfn, callback) {
            var data = extend({
              session: this.session,
              bundle: this.sent + 1,
              key: this.key,
              lib: "js",
              version: this.options.version,
              cluster: this.options.cluster,
              features: this.options.features,
              timeline: this.events
            }, this.options.params);
            this.events = [];
            sendfn(data, (error, result) => {
              if (!error) {
                this.sent++;
              }
              if (callback) {
                callback(error, result);
              }
            });
            return true;
          }
          generateUniqueID() {
            this.uniqueID++;
            return this.uniqueID;
          }
        }
        class transport_strategy_TransportStrategy {
          constructor(name, priority, transport, options) {
            this.name = name;
            this.priority = priority;
            this.transport = transport;
            this.options = options || {};
          }
          isSupported() {
            return this.transport.isSupported({
              useTLS: this.options.useTLS
            });
          }
          connect(minPriority, callback) {
            if (!this.isSupported()) {
              return failAttempt(new UnsupportedStrategy(), callback);
            } else if (this.priority < minPriority) {
              return failAttempt(new TransportPriorityTooLow(), callback);
            }
            var connected = false;
            var transport = this.transport.createConnection(this.name, this.priority, this.options.key, this.options);
            var handshake = null;
            var onInitialized = function() {
              transport.unbind("initialized", onInitialized);
              transport.connect();
            };
            var onOpen = function() {
              handshake = factory.createHandshake(transport, function(result) {
                connected = true;
                unbindListeners();
                callback(null, result);
              });
            };
            var onError = function(error) {
              unbindListeners();
              callback(error);
            };
            var onClosed = function() {
              unbindListeners();
              var serializedTransport;
              serializedTransport = safeJSONStringify(transport);
              callback(new TransportClosed(serializedTransport));
            };
            var unbindListeners = function() {
              transport.unbind("initialized", onInitialized);
              transport.unbind("open", onOpen);
              transport.unbind("error", onError);
              transport.unbind("closed", onClosed);
            };
            transport.bind("initialized", onInitialized);
            transport.bind("open", onOpen);
            transport.bind("error", onError);
            transport.bind("closed", onClosed);
            transport.initialize();
            return {
              abort: () => {
                if (connected) {
                  return;
                }
                unbindListeners();
                if (handshake) {
                  handshake.close();
                } else {
                  transport.close();
                }
              },
              forceMinPriority: (p) => {
                if (connected) {
                  return;
                }
                if (this.priority < p) {
                  if (handshake) {
                    handshake.close();
                  } else {
                    transport.close();
                  }
                }
              }
            };
          }
        }
        function failAttempt(error, callback) {
          util.defer(function() {
            callback(error);
          });
          return {
            abort: function() {
            },
            forceMinPriority: function() {
            }
          };
        }
        const { Transports: strategy_builder_Transports } = runtime;
        var strategy_builder_defineTransport = function(config, name, type, priority, options, manager) {
          var transportClass = strategy_builder_Transports[type];
          if (!transportClass) {
            throw new UnsupportedTransport(type);
          }
          var enabled = (!config.enabledTransports || arrayIndexOf(config.enabledTransports, name) !== -1) && (!config.disabledTransports || arrayIndexOf(config.disabledTransports, name) === -1);
          var transport;
          if (enabled) {
            options = Object.assign({ ignoreNullOrigin: config.ignoreNullOrigin }, options);
            transport = new transport_strategy_TransportStrategy(name, priority, manager ? manager.getAssistant(transportClass) : transportClass, options);
          } else {
            transport = strategy_builder_UnsupportedStrategy;
          }
          return transport;
        };
        var strategy_builder_UnsupportedStrategy = {
          isSupported: function() {
            return false;
          },
          connect: function(_, callback) {
            var deferred = util.defer(function() {
              callback(new UnsupportedStrategy());
            });
            return {
              abort: function() {
                deferred.ensureAborted();
              },
              forceMinPriority: function() {
              }
            };
          }
        };
        function validateOptions(options) {
          if (options == null) {
            throw "You must pass an options object";
          }
          if (options.cluster == null) {
            throw "Options object must provide a cluster";
          }
          if ("disableStats" in options) {
            logger.warn("The disableStats option is deprecated in favor of enableStats");
          }
        }
        const composeChannelQuery = (params, authOptions) => {
          var query = "socket_id=" + encodeURIComponent(params.socketId);
          for (var key in authOptions.params) {
            query += "&" + encodeURIComponent(key) + "=" + encodeURIComponent(authOptions.params[key]);
          }
          if (authOptions.paramsProvider != null) {
            let dynamicParams = authOptions.paramsProvider();
            for (var key in dynamicParams) {
              query += "&" + encodeURIComponent(key) + "=" + encodeURIComponent(dynamicParams[key]);
            }
          }
          return query;
        };
        const UserAuthenticator = (authOptions) => {
          if (typeof runtime.getAuthorizers()[authOptions.transport] === "undefined") {
            throw `'${authOptions.transport}' is not a recognized auth transport`;
          }
          return (params, callback) => {
            const query = composeChannelQuery(params, authOptions);
            runtime.getAuthorizers()[authOptions.transport](runtime, query, authOptions, AuthRequestType.UserAuthentication, callback);
          };
        };
        var user_authenticator = UserAuthenticator;
        const channel_authorizer_composeChannelQuery = (params, authOptions) => {
          var query = "socket_id=" + encodeURIComponent(params.socketId);
          query += "&channel_name=" + encodeURIComponent(params.channelName);
          for (var key in authOptions.params) {
            query += "&" + encodeURIComponent(key) + "=" + encodeURIComponent(authOptions.params[key]);
          }
          if (authOptions.paramsProvider != null) {
            let dynamicParams = authOptions.paramsProvider();
            for (var key in dynamicParams) {
              query += "&" + encodeURIComponent(key) + "=" + encodeURIComponent(dynamicParams[key]);
            }
          }
          return query;
        };
        const ChannelAuthorizer = (authOptions) => {
          if (typeof runtime.getAuthorizers()[authOptions.transport] === "undefined") {
            throw `'${authOptions.transport}' is not a recognized auth transport`;
          }
          return (params, callback) => {
            const query = channel_authorizer_composeChannelQuery(params, authOptions);
            runtime.getAuthorizers()[authOptions.transport](runtime, query, authOptions, AuthRequestType.ChannelAuthorization, callback);
          };
        };
        var channel_authorizer = ChannelAuthorizer;
        const ChannelAuthorizerProxy = (pusher2, authOptions, channelAuthorizerGenerator) => {
          const deprecatedAuthorizerOptions = {
            authTransport: authOptions.transport,
            authEndpoint: authOptions.endpoint,
            auth: {
              params: authOptions.params,
              headers: authOptions.headers
            }
          };
          return (params, callback) => {
            const channel = pusher2.channel(params.channelName);
            const channelAuthorizer = channelAuthorizerGenerator(channel, deprecatedAuthorizerOptions);
            channelAuthorizer.authorize(params.socketId, callback);
          };
        };
        function getConfig(opts, pusher2) {
          let config = {
            activityTimeout: opts.activityTimeout || defaults.activityTimeout,
            cluster: opts.cluster,
            httpPath: opts.httpPath || defaults.httpPath,
            httpPort: opts.httpPort || defaults.httpPort,
            httpsPort: opts.httpsPort || defaults.httpsPort,
            pongTimeout: opts.pongTimeout || defaults.pongTimeout,
            statsHost: opts.statsHost || defaults.stats_host,
            unavailableTimeout: opts.unavailableTimeout || defaults.unavailableTimeout,
            wsPath: opts.wsPath || defaults.wsPath,
            wsPort: opts.wsPort || defaults.wsPort,
            wssPort: opts.wssPort || defaults.wssPort,
            enableStats: getEnableStatsConfig(opts),
            httpHost: getHttpHost(opts),
            useTLS: shouldUseTLS(opts),
            wsHost: getWebsocketHost(opts),
            userAuthenticator: buildUserAuthenticator(opts),
            channelAuthorizer: buildChannelAuthorizer(opts, pusher2)
          };
          if ("disabledTransports" in opts)
            config.disabledTransports = opts.disabledTransports;
          if ("enabledTransports" in opts)
            config.enabledTransports = opts.enabledTransports;
          if ("ignoreNullOrigin" in opts)
            config.ignoreNullOrigin = opts.ignoreNullOrigin;
          if ("timelineParams" in opts)
            config.timelineParams = opts.timelineParams;
          if ("nacl" in opts) {
            config.nacl = opts.nacl;
          }
          return config;
        }
        function getHttpHost(opts) {
          if (opts.httpHost) {
            return opts.httpHost;
          }
          if (opts.cluster) {
            return `sockjs-${opts.cluster}.pusher.com`;
          }
          return defaults.httpHost;
        }
        function getWebsocketHost(opts) {
          if (opts.wsHost) {
            return opts.wsHost;
          }
          return getWebsocketHostFromCluster(opts.cluster);
        }
        function getWebsocketHostFromCluster(cluster) {
          return `ws-${cluster}.pusher.com`;
        }
        function shouldUseTLS(opts) {
          if (runtime.getProtocol() === "https:") {
            return true;
          } else if (opts.forceTLS === false) {
            return false;
          }
          return true;
        }
        function getEnableStatsConfig(opts) {
          if ("enableStats" in opts) {
            return opts.enableStats;
          }
          if ("disableStats" in opts) {
            return !opts.disableStats;
          }
          return false;
        }
        function buildUserAuthenticator(opts) {
          const userAuthentication = Object.assign(Object.assign({}, defaults.userAuthentication), opts.userAuthentication);
          if ("customHandler" in userAuthentication && userAuthentication["customHandler"] != null) {
            return userAuthentication["customHandler"];
          }
          return user_authenticator(userAuthentication);
        }
        function buildChannelAuth(opts, pusher2) {
          let channelAuthorization;
          if ("channelAuthorization" in opts) {
            channelAuthorization = Object.assign(Object.assign({}, defaults.channelAuthorization), opts.channelAuthorization);
          } else {
            channelAuthorization = {
              transport: opts.authTransport || defaults.authTransport,
              endpoint: opts.authEndpoint || defaults.authEndpoint
            };
            if ("auth" in opts) {
              if ("params" in opts.auth)
                channelAuthorization.params = opts.auth.params;
              if ("headers" in opts.auth)
                channelAuthorization.headers = opts.auth.headers;
            }
            if ("authorizer" in opts)
              channelAuthorization.customHandler = ChannelAuthorizerProxy(pusher2, channelAuthorization, opts.authorizer);
          }
          return channelAuthorization;
        }
        function buildChannelAuthorizer(opts, pusher2) {
          const channelAuthorization = buildChannelAuth(opts, pusher2);
          if ("customHandler" in channelAuthorization && channelAuthorization["customHandler"] != null) {
            return channelAuthorization["customHandler"];
          }
          return channel_authorizer(channelAuthorization);
        }
        class watchlist_WatchlistFacade extends dispatcher_Dispatcher {
          constructor(pusher2) {
            super(function(eventName, data) {
              logger.debug(`No callbacks on watchlist events for ${eventName}`);
            });
            this.pusher = pusher2;
            this.bindWatchlistInternalEvent();
          }
          handleEvent(pusherEvent) {
            pusherEvent.data.events.forEach((watchlistEvent) => {
              this.emit(watchlistEvent.name, watchlistEvent);
            });
          }
          bindWatchlistInternalEvent() {
            this.pusher.connection.bind("message", (pusherEvent) => {
              var eventName = pusherEvent.event;
              if (eventName === "pusher_internal:watchlist_events") {
                this.handleEvent(pusherEvent);
              }
            });
          }
        }
        function flatPromise() {
          let resolve, reject;
          const promise = new Promise((res, rej) => {
            resolve = res;
            reject = rej;
          });
          return { promise, resolve, reject };
        }
        var flat_promise = flatPromise;
        class user_UserFacade extends dispatcher_Dispatcher {
          constructor(pusher2) {
            super(function(eventName, data) {
              logger.debug("No callbacks on user for " + eventName);
            });
            this.signin_requested = false;
            this.user_data = null;
            this.serverToUserChannel = null;
            this.signinDonePromise = null;
            this._signinDoneResolve = null;
            this._onAuthorize = (err, authData) => {
              if (err) {
                logger.warn(`Error during signin: ${err}`);
                this._cleanup();
                return;
              }
              this.pusher.send_event("pusher:signin", {
                auth: authData.auth,
                user_data: authData.user_data
              });
            };
            this.pusher = pusher2;
            this.pusher.connection.bind("state_change", ({ previous, current }) => {
              if (previous !== "connected" && current === "connected") {
                this._signin();
              }
              if (previous === "connected" && current !== "connected") {
                this._cleanup();
                this._newSigninPromiseIfNeeded();
              }
            });
            this.watchlist = new watchlist_WatchlistFacade(pusher2);
            this.pusher.connection.bind("message", (event) => {
              var eventName = event.event;
              if (eventName === "pusher:signin_success") {
                this._onSigninSuccess(event.data);
              }
              if (this.serverToUserChannel && this.serverToUserChannel.name === event.channel) {
                this.serverToUserChannel.handleEvent(event);
              }
            });
          }
          signin() {
            if (this.signin_requested) {
              return;
            }
            this.signin_requested = true;
            this._signin();
          }
          _signin() {
            if (!this.signin_requested) {
              return;
            }
            this._newSigninPromiseIfNeeded();
            if (this.pusher.connection.state !== "connected") {
              return;
            }
            this.pusher.config.userAuthenticator({
              socketId: this.pusher.connection.socket_id
            }, this._onAuthorize);
          }
          _onSigninSuccess(data) {
            try {
              this.user_data = JSON.parse(data.user_data);
            } catch (e) {
              logger.error(`Failed parsing user data after signin: ${data.user_data}`);
              this._cleanup();
              return;
            }
            if (typeof this.user_data.id !== "string" || this.user_data.id === "") {
              logger.error(`user_data doesn't contain an id. user_data: ${this.user_data}`);
              this._cleanup();
              return;
            }
            this._signinDoneResolve();
            this._subscribeChannels();
          }
          _subscribeChannels() {
            const ensure_subscribed = (channel) => {
              if (channel.subscriptionPending && channel.subscriptionCancelled) {
                channel.reinstateSubscription();
              } else if (!channel.subscriptionPending && this.pusher.connection.state === "connected") {
                channel.subscribe();
              }
            };
            this.serverToUserChannel = new channel_Channel(`#server-to-user-${this.user_data.id}`, this.pusher);
            this.serverToUserChannel.bind_global((eventName, data) => {
              if (eventName.indexOf("pusher_internal:") === 0 || eventName.indexOf("pusher:") === 0) {
                return;
              }
              this.emit(eventName, data);
            });
            ensure_subscribed(this.serverToUserChannel);
          }
          _cleanup() {
            this.user_data = null;
            if (this.serverToUserChannel) {
              this.serverToUserChannel.unbind_all();
              this.serverToUserChannel.disconnect();
              this.serverToUserChannel = null;
            }
            if (this.signin_requested) {
              this._signinDoneResolve();
            }
          }
          _newSigninPromiseIfNeeded() {
            if (!this.signin_requested) {
              return;
            }
            if (this.signinDonePromise && !this.signinDonePromise.done) {
              return;
            }
            const { promise, resolve, reject: _ } = flat_promise();
            promise.done = false;
            const setDone = () => {
              promise.done = true;
            };
            promise.then(setDone).catch(setDone);
            this.signinDonePromise = promise;
            this._signinDoneResolve = resolve;
          }
        }
        class pusher_Pusher {
          static ready() {
            pusher_Pusher.isReady = true;
            for (var i = 0, l = pusher_Pusher.instances.length; i < l; i++) {
              pusher_Pusher.instances[i].connect();
            }
          }
          static getClientFeatures() {
            return keys(filterObject({ ws: runtime.Transports.ws }, function(t) {
              return t.isSupported({});
            }));
          }
          constructor(app_key, options) {
            checkAppKey(app_key);
            validateOptions(options);
            this.key = app_key;
            this.config = getConfig(options, this);
            this.channels = factory.createChannels();
            this.global_emitter = new dispatcher_Dispatcher();
            this.sessionID = runtime.randomInt(1e9);
            this.timeline = new timeline_Timeline(this.key, this.sessionID, {
              cluster: this.config.cluster,
              features: pusher_Pusher.getClientFeatures(),
              params: this.config.timelineParams || {},
              limit: 50,
              level: timeline_level.INFO,
              version: defaults.VERSION
            });
            if (this.config.enableStats) {
              this.timelineSender = factory.createTimelineSender(this.timeline, {
                host: this.config.statsHost,
                path: "/timeline/v2/" + runtime.TimelineTransport.name
              });
            }
            var getStrategy = (options2) => {
              return runtime.getDefaultStrategy(this.config, options2, strategy_builder_defineTransport);
            };
            this.connection = factory.createConnectionManager(this.key, {
              getStrategy,
              timeline: this.timeline,
              activityTimeout: this.config.activityTimeout,
              pongTimeout: this.config.pongTimeout,
              unavailableTimeout: this.config.unavailableTimeout,
              useTLS: Boolean(this.config.useTLS)
            });
            this.connection.bind("connected", () => {
              this.subscribeAll();
              if (this.timelineSender) {
                this.timelineSender.send(this.connection.isUsingTLS());
              }
            });
            this.connection.bind("message", (event) => {
              var eventName = event.event;
              var internal = eventName.indexOf("pusher_internal:") === 0;
              if (event.channel) {
                var channel = this.channel(event.channel);
                if (channel) {
                  channel.handleEvent(event);
                }
              }
              if (!internal) {
                this.global_emitter.emit(event.event, event.data);
              }
            });
            this.connection.bind("connecting", () => {
              this.channels.disconnect();
            });
            this.connection.bind("disconnected", () => {
              this.channels.disconnect();
            });
            this.connection.bind("error", (err) => {
              logger.warn(err);
            });
            pusher_Pusher.instances.push(this);
            this.timeline.info({ instances: pusher_Pusher.instances.length });
            this.user = new user_UserFacade(this);
            if (pusher_Pusher.isReady) {
              this.connect();
            }
          }
          channel(name) {
            return this.channels.find(name);
          }
          allChannels() {
            return this.channels.all();
          }
          connect() {
            this.connection.connect();
            if (this.timelineSender) {
              if (!this.timelineSenderTimer) {
                var usingTLS = this.connection.isUsingTLS();
                var timelineSender = this.timelineSender;
                this.timelineSenderTimer = new timers_PeriodicTimer(6e4, function() {
                  timelineSender.send(usingTLS);
                });
              }
            }
          }
          disconnect() {
            this.connection.disconnect();
            if (this.timelineSenderTimer) {
              this.timelineSenderTimer.ensureAborted();
              this.timelineSenderTimer = null;
            }
          }
          bind(event_name, callback, context) {
            this.global_emitter.bind(event_name, callback, context);
            return this;
          }
          unbind(event_name, callback, context) {
            this.global_emitter.unbind(event_name, callback, context);
            return this;
          }
          bind_global(callback) {
            this.global_emitter.bind_global(callback);
            return this;
          }
          unbind_global(callback) {
            this.global_emitter.unbind_global(callback);
            return this;
          }
          unbind_all(callback) {
            this.global_emitter.unbind_all();
            return this;
          }
          subscribeAll() {
            var channelName;
            for (channelName in this.channels.channels) {
              if (this.channels.channels.hasOwnProperty(channelName)) {
                this.subscribe(channelName);
              }
            }
          }
          subscribe(channel_name) {
            var channel = this.channels.add(channel_name, this);
            if (channel.subscriptionPending && channel.subscriptionCancelled) {
              channel.reinstateSubscription();
            } else if (!channel.subscriptionPending && this.connection.state === "connected") {
              channel.subscribe();
            }
            return channel;
          }
          unsubscribe(channel_name) {
            var channel = this.channels.find(channel_name);
            if (channel && channel.subscriptionPending) {
              channel.cancelSubscription();
            } else {
              channel = this.channels.remove(channel_name);
              if (channel && channel.subscribed) {
                channel.unsubscribe();
              }
            }
          }
          send_event(event_name, data, channel) {
            return this.connection.send_event(event_name, data, channel);
          }
          shouldUseTLS() {
            return this.config.useTLS;
          }
          signin() {
            this.user.signin();
          }
        }
        pusher_Pusher.instances = [];
        pusher_Pusher.isReady = false;
        pusher_Pusher.logToConsole = false;
        pusher_Pusher.Runtime = runtime;
        pusher_Pusher.ScriptReceivers = runtime.ScriptReceivers;
        pusher_Pusher.DependenciesReceivers = runtime.DependenciesReceivers;
        pusher_Pusher.auth_callbacks = runtime.auth_callbacks;
        var core_pusher = __webpack_exports__["default"] = pusher_Pusher;
        function checkAppKey(key) {
          if (key === null || key === void 0) {
            throw "You must pass your app key when you instantiate Pusher.";
          }
        }
        runtime.setup(pusher_Pusher);
      }
    ]);
  });
})(pusher$1);
var Pusher = /* @__PURE__ */ getDefaultExportFromCjs(pusher$1.exports);
let pusher = null;
const initPusher = () => {
  pusher = new Pusher("f7653b4fe4fd1abc49eb", {
    cluster: "eu",
    authEndpoint: "https://gamingdrv.stageit.se/api/pusher/auth",
    auth: {
      headers: {
        Accept: "application/json"
      }
    }
  });
  pusher.connection.bind("connected", () => {
    api.defaults.headers.common["X-Socket-Id"] = pusher.connection.socket_id;
  });
};
export { initPusher as i, pusher as p };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVzaGVyLjI4MzAxOWU5LmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcHVzaGVyLWpzL2Rpc3Qvd2ViL3B1c2hlci5qcyIsIi4uLy4uLy4uL3NyYy9ib290L3B1c2hlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiAqIFB1c2hlciBKYXZhU2NyaXB0IExpYnJhcnkgdjguMy4wXG4gKiBodHRwczovL3B1c2hlci5jb20vXG4gKlxuICogQ29weXJpZ2h0IDIwMjAsIFB1c2hlclxuICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBsaWNlbmNlLlxuICovXG5cbihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIlB1c2hlclwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJQdXNoZXJcIl0gPSBmYWN0b3J5KCk7XG59KSh3aW5kb3csIGZ1bmN0aW9uKCkge1xucmV0dXJuIC8qKioqKiovIChmdW5jdGlvbihtb2R1bGVzKSB7IC8vIHdlYnBhY2tCb290c3RyYXBcbi8qKioqKiovIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuLyoqKioqKi8gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbi8qKioqKiovIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuLyoqKioqKi9cbi8qKioqKiovIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbi8qKioqKiovIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuLyoqKioqKi8gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4vKioqKioqLyBcdFx0fVxuLyoqKioqKi8gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4vKioqKioqLyBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuLyoqKioqKi8gXHRcdFx0aTogbW9kdWxlSWQsXG4vKioqKioqLyBcdFx0XHRsOiBmYWxzZSxcbi8qKioqKiovIFx0XHRcdGV4cG9ydHM6IHt9XG4vKioqKioqLyBcdFx0fTtcbi8qKioqKiovXG4vKioqKioqLyBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4vKioqKioqLyBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG4vKioqKioqL1xuLyoqKioqKi8gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbi8qKioqKiovIFx0XHRtb2R1bGUubCA9IHRydWU7XG4vKioqKioqL1xuLyoqKioqKi8gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4vKioqKioqLyBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuLyoqKioqKi8gXHR9XG4vKioqKioqL1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4vKioqKioqLyBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuLyoqKioqKi8gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4vKioqKioqLyBcdFx0fVxuLyoqKioqKi8gXHR9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4vKioqKioqLyBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4vKioqKioqLyBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbi8qKioqKiovIFx0XHR9XG4vKioqKioqLyBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKioqKiovIFx0fTtcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuLyoqKioqKi8gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbi8qKioqKiovIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4vKioqKioqLyBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuLyoqKioqKi8gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4vKioqKioqLyBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4vKioqKioqLyBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbi8qKioqKiovIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuLyoqKioqKi8gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4vKioqKioqLyBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbi8qKioqKiovIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4vKioqKioqLyBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuLyoqKioqKi8gXHRcdHJldHVybiBucztcbi8qKioqKiovIFx0fTtcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuLyoqKioqKi8gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuLyoqKioqKi8gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbi8qKioqKiovIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4vKioqKioqLyBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuLyoqKioqKi8gXHRcdHJldHVybiBnZXR0ZXI7XG4vKioqKioqLyBcdH07XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcbi8qKioqKiovXG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8qKioqKiovIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMik7XG4vKioqKioqLyB9KVxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKioqKiovIChbXG4vKiAwICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG4vLyBDb3B5cmlnaHQgKEMpIDIwMTYgRG1pdHJ5IENoZXN0bnlraFxuLy8gTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUgZm9yIGRldGFpbHMuXG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICAgICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKlxuICogUGFja2FnZSBiYXNlNjQgaW1wbGVtZW50cyBCYXNlNjQgZW5jb2RpbmcgYW5kIGRlY29kaW5nLlxuICovXG4vLyBJbnZhbGlkIGNoYXJhY3RlciB1c2VkIGluIGRlY29kaW5nIHRvIGluZGljYXRlXG4vLyB0aGF0IHRoZSBjaGFyYWN0ZXIgdG8gZGVjb2RlIGlzIG91dCBvZiByYW5nZSBvZlxuLy8gYWxwaGFiZXQgYW5kIGNhbm5vdCBiZSBkZWNvZGVkLlxudmFyIElOVkFMSURfQllURSA9IDI1Njtcbi8qKlxuICogSW1wbGVtZW50cyBzdGFuZGFyZCBCYXNlNjQgZW5jb2RpbmcuXG4gKlxuICogT3BlcmF0ZXMgaW4gY29uc3RhbnQgdGltZS5cbiAqL1xudmFyIENvZGVyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIC8vIFRPRE8oZGNoZXN0KTogbWV0aG9kcyB0byBlbmNvZGUgY2h1bmstYnktY2h1bmsuXG4gICAgZnVuY3Rpb24gQ29kZXIoX3BhZGRpbmdDaGFyYWN0ZXIpIHtcbiAgICAgICAgaWYgKF9wYWRkaW5nQ2hhcmFjdGVyID09PSB2b2lkIDApIHsgX3BhZGRpbmdDaGFyYWN0ZXIgPSBcIj1cIjsgfVxuICAgICAgICB0aGlzLl9wYWRkaW5nQ2hhcmFjdGVyID0gX3BhZGRpbmdDaGFyYWN0ZXI7XG4gICAgfVxuICAgIENvZGVyLnByb3RvdHlwZS5lbmNvZGVkTGVuZ3RoID0gZnVuY3Rpb24gKGxlbmd0aCkge1xuICAgICAgICBpZiAoIXRoaXMuX3BhZGRpbmdDaGFyYWN0ZXIpIHtcbiAgICAgICAgICAgIHJldHVybiAobGVuZ3RoICogOCArIDUpIC8gNiB8IDA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChsZW5ndGggKyAyKSAvIDMgKiA0IHwgMDtcbiAgICB9O1xuICAgIENvZGVyLnByb3RvdHlwZS5lbmNvZGUgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICB2YXIgb3V0ID0gXCJcIjtcbiAgICAgICAgdmFyIGkgPSAwO1xuICAgICAgICBmb3IgKDsgaSA8IGRhdGEubGVuZ3RoIC0gMjsgaSArPSAzKSB7XG4gICAgICAgICAgICB2YXIgYyA9IChkYXRhW2ldIDw8IDE2KSB8IChkYXRhW2kgKyAxXSA8PCA4KSB8IChkYXRhW2kgKyAyXSk7XG4gICAgICAgICAgICBvdXQgKz0gdGhpcy5fZW5jb2RlQnl0ZSgoYyA+Pj4gMyAqIDYpICYgNjMpO1xuICAgICAgICAgICAgb3V0ICs9IHRoaXMuX2VuY29kZUJ5dGUoKGMgPj4+IDIgKiA2KSAmIDYzKTtcbiAgICAgICAgICAgIG91dCArPSB0aGlzLl9lbmNvZGVCeXRlKChjID4+PiAxICogNikgJiA2Myk7XG4gICAgICAgICAgICBvdXQgKz0gdGhpcy5fZW5jb2RlQnl0ZSgoYyA+Pj4gMCAqIDYpICYgNjMpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBsZWZ0ID0gZGF0YS5sZW5ndGggLSBpO1xuICAgICAgICBpZiAobGVmdCA+IDApIHtcbiAgICAgICAgICAgIHZhciBjID0gKGRhdGFbaV0gPDwgMTYpIHwgKGxlZnQgPT09IDIgPyBkYXRhW2kgKyAxXSA8PCA4IDogMCk7XG4gICAgICAgICAgICBvdXQgKz0gdGhpcy5fZW5jb2RlQnl0ZSgoYyA+Pj4gMyAqIDYpICYgNjMpO1xuICAgICAgICAgICAgb3V0ICs9IHRoaXMuX2VuY29kZUJ5dGUoKGMgPj4+IDIgKiA2KSAmIDYzKTtcbiAgICAgICAgICAgIGlmIChsZWZ0ID09PSAyKSB7XG4gICAgICAgICAgICAgICAgb3V0ICs9IHRoaXMuX2VuY29kZUJ5dGUoKGMgPj4+IDEgKiA2KSAmIDYzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIG91dCArPSB0aGlzLl9wYWRkaW5nQ2hhcmFjdGVyIHx8IFwiXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvdXQgKz0gdGhpcy5fcGFkZGluZ0NoYXJhY3RlciB8fCBcIlwiO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfTtcbiAgICBDb2Rlci5wcm90b3R5cGUubWF4RGVjb2RlZExlbmd0aCA9IGZ1bmN0aW9uIChsZW5ndGgpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9wYWRkaW5nQ2hhcmFjdGVyKSB7XG4gICAgICAgICAgICByZXR1cm4gKGxlbmd0aCAqIDYgKyA3KSAvIDggfCAwO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBsZW5ndGggLyA0ICogMyB8IDA7XG4gICAgfTtcbiAgICBDb2Rlci5wcm90b3R5cGUuZGVjb2RlZExlbmd0aCA9IGZ1bmN0aW9uIChzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1heERlY29kZWRMZW5ndGgocy5sZW5ndGggLSB0aGlzLl9nZXRQYWRkaW5nTGVuZ3RoKHMpKTtcbiAgICB9O1xuICAgIENvZGVyLnByb3RvdHlwZS5kZWNvZGUgPSBmdW5jdGlvbiAocykge1xuICAgICAgICBpZiAocy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgVWludDhBcnJheSgwKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcGFkZGluZ0xlbmd0aCA9IHRoaXMuX2dldFBhZGRpbmdMZW5ndGgocyk7XG4gICAgICAgIHZhciBsZW5ndGggPSBzLmxlbmd0aCAtIHBhZGRpbmdMZW5ndGg7XG4gICAgICAgIHZhciBvdXQgPSBuZXcgVWludDhBcnJheSh0aGlzLm1heERlY29kZWRMZW5ndGgobGVuZ3RoKSk7XG4gICAgICAgIHZhciBvcCA9IDA7XG4gICAgICAgIHZhciBpID0gMDtcbiAgICAgICAgdmFyIGhhdmVCYWQgPSAwO1xuICAgICAgICB2YXIgdjAgPSAwLCB2MSA9IDAsIHYyID0gMCwgdjMgPSAwO1xuICAgICAgICBmb3IgKDsgaSA8IGxlbmd0aCAtIDQ7IGkgKz0gNCkge1xuICAgICAgICAgICAgdjAgPSB0aGlzLl9kZWNvZGVDaGFyKHMuY2hhckNvZGVBdChpICsgMCkpO1xuICAgICAgICAgICAgdjEgPSB0aGlzLl9kZWNvZGVDaGFyKHMuY2hhckNvZGVBdChpICsgMSkpO1xuICAgICAgICAgICAgdjIgPSB0aGlzLl9kZWNvZGVDaGFyKHMuY2hhckNvZGVBdChpICsgMikpO1xuICAgICAgICAgICAgdjMgPSB0aGlzLl9kZWNvZGVDaGFyKHMuY2hhckNvZGVBdChpICsgMykpO1xuICAgICAgICAgICAgb3V0W29wKytdID0gKHYwIDw8IDIpIHwgKHYxID4+PiA0KTtcbiAgICAgICAgICAgIG91dFtvcCsrXSA9ICh2MSA8PCA0KSB8ICh2MiA+Pj4gMik7XG4gICAgICAgICAgICBvdXRbb3ArK10gPSAodjIgPDwgNikgfCB2MztcbiAgICAgICAgICAgIGhhdmVCYWQgfD0gdjAgJiBJTlZBTElEX0JZVEU7XG4gICAgICAgICAgICBoYXZlQmFkIHw9IHYxICYgSU5WQUxJRF9CWVRFO1xuICAgICAgICAgICAgaGF2ZUJhZCB8PSB2MiAmIElOVkFMSURfQllURTtcbiAgICAgICAgICAgIGhhdmVCYWQgfD0gdjMgJiBJTlZBTElEX0JZVEU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGkgPCBsZW5ndGggLSAxKSB7XG4gICAgICAgICAgICB2MCA9IHRoaXMuX2RlY29kZUNoYXIocy5jaGFyQ29kZUF0KGkpKTtcbiAgICAgICAgICAgIHYxID0gdGhpcy5fZGVjb2RlQ2hhcihzLmNoYXJDb2RlQXQoaSArIDEpKTtcbiAgICAgICAgICAgIG91dFtvcCsrXSA9ICh2MCA8PCAyKSB8ICh2MSA+Pj4gNCk7XG4gICAgICAgICAgICBoYXZlQmFkIHw9IHYwICYgSU5WQUxJRF9CWVRFO1xuICAgICAgICAgICAgaGF2ZUJhZCB8PSB2MSAmIElOVkFMSURfQllURTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaSA8IGxlbmd0aCAtIDIpIHtcbiAgICAgICAgICAgIHYyID0gdGhpcy5fZGVjb2RlQ2hhcihzLmNoYXJDb2RlQXQoaSArIDIpKTtcbiAgICAgICAgICAgIG91dFtvcCsrXSA9ICh2MSA8PCA0KSB8ICh2MiA+Pj4gMik7XG4gICAgICAgICAgICBoYXZlQmFkIHw9IHYyICYgSU5WQUxJRF9CWVRFO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpIDwgbGVuZ3RoIC0gMykge1xuICAgICAgICAgICAgdjMgPSB0aGlzLl9kZWNvZGVDaGFyKHMuY2hhckNvZGVBdChpICsgMykpO1xuICAgICAgICAgICAgb3V0W29wKytdID0gKHYyIDw8IDYpIHwgdjM7XG4gICAgICAgICAgICBoYXZlQmFkIHw9IHYzICYgSU5WQUxJRF9CWVRFO1xuICAgICAgICB9XG4gICAgICAgIGlmIChoYXZlQmFkICE9PSAwKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJCYXNlNjRDb2RlcjogaW5jb3JyZWN0IGNoYXJhY3RlcnMgZm9yIGRlY29kaW5nXCIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfTtcbiAgICAvLyBTdGFuZGFyZCBlbmNvZGluZyBoYXZlIHRoZSBmb2xsb3dpbmcgZW5jb2RlZC9kZWNvZGVkIHJhbmdlcyxcbiAgICAvLyB3aGljaCB3ZSBuZWVkIHRvIGNvbnZlcnQgYmV0d2Vlbi5cbiAgICAvL1xuICAgIC8vIEFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaIGFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6IDAxMjM0NTY3ODkgICsgICAvXG4gICAgLy8gSW5kZXg6ICAgMCAtIDI1ICAgICAgICAgICAgICAgICAgICAyNiAtIDUxICAgICAgICAgICAgICA1MiAtIDYxICAgNjIgIDYzXG4gICAgLy8gQVNDSUk6ICA2NSAtIDkwICAgICAgICAgICAgICAgICAgICA5NyAtIDEyMiAgICAgICAgICAgICA0OCAtIDU3ICAgNDMgIDQ3XG4gICAgLy9cbiAgICAvLyBFbmNvZGUgNiBiaXRzIGluIGIgaW50byBhIG5ldyBjaGFyYWN0ZXIuXG4gICAgQ29kZXIucHJvdG90eXBlLl9lbmNvZGVCeXRlID0gZnVuY3Rpb24gKGIpIHtcbiAgICAgICAgLy8gRW5jb2RpbmcgdXNlcyBjb25zdGFudCB0aW1lIG9wZXJhdGlvbnMgYXMgZm9sbG93czpcbiAgICAgICAgLy9cbiAgICAgICAgLy8gMS4gRGVmaW5lIGNvbXBhcmlzb24gb2YgQSB3aXRoIEIgdXNpbmcgKEEgLSBCKSA+Pj4gODpcbiAgICAgICAgLy8gICAgICAgICAgaWYgQSA+IEIsIHRoZW4gcmVzdWx0IGlzIHBvc2l0aXZlIGludGVnZXJcbiAgICAgICAgLy8gICAgICAgICAgaWYgQSA8PSBCLCB0aGVuIHJlc3VsdCBpcyAwXG4gICAgICAgIC8vXG4gICAgICAgIC8vIDIuIERlZmluZSBzZWxlY3Rpb24gb2YgQyBvciAwIHVzaW5nIGJpdHdpc2UgQU5EOiBYICYgQzpcbiAgICAgICAgLy8gICAgICAgICAgaWYgWCA9PSAwLCB0aGVuIHJlc3VsdCBpcyAwXG4gICAgICAgIC8vICAgICAgICAgIGlmIFggIT0gMCwgdGhlbiByZXN1bHQgaXMgQ1xuICAgICAgICAvL1xuICAgICAgICAvLyAzLiBTdGFydCB3aXRoIHRoZSBzbWFsbGVzdCBjb21wYXJpc29uIChiID49IDApLCB3aGljaCBpcyBhbHdheXNcbiAgICAgICAgLy8gICAgdHJ1ZSwgc28gc2V0IHRoZSByZXN1bHQgdG8gdGhlIHN0YXJ0aW5nIEFTQ0lJIHZhbHVlICg2NSkuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIDQuIENvbnRpbnVlIGNvbXBhcmluZyBiIHRvIGhpZ2hlciBBU0NJSSB2YWx1ZXMsIGFuZCBzZWxlY3RpbmdcbiAgICAgICAgLy8gICAgemVybyBpZiBjb21wYXJpc29uIGlzbid0IHRydWUsIG90aGVyd2lzZSBzZWxlY3RpbmcgYSB2YWx1ZVxuICAgICAgICAvLyAgICB0byBhZGQgdG8gcmVzdWx0LCB3aGljaDpcbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgICAgICAgYSkgdW5kb2VzIHRoZSBwcmV2aW91cyBhZGRpdGlvblxuICAgICAgICAvLyAgICAgICAgICBiKSBwcm92aWRlcyBuZXcgdmFsdWUgdG8gYWRkXG4gICAgICAgIC8vXG4gICAgICAgIHZhciByZXN1bHQgPSBiO1xuICAgICAgICAvLyBiID49IDBcbiAgICAgICAgcmVzdWx0ICs9IDY1O1xuICAgICAgICAvLyBiID4gMjVcbiAgICAgICAgcmVzdWx0ICs9ICgoMjUgLSBiKSA+Pj4gOCkgJiAoKDAgLSA2NSkgLSAyNiArIDk3KTtcbiAgICAgICAgLy8gYiA+IDUxXG4gICAgICAgIHJlc3VsdCArPSAoKDUxIC0gYikgPj4+IDgpICYgKCgyNiAtIDk3KSAtIDUyICsgNDgpO1xuICAgICAgICAvLyBiID4gNjFcbiAgICAgICAgcmVzdWx0ICs9ICgoNjEgLSBiKSA+Pj4gOCkgJiAoKDUyIC0gNDgpIC0gNjIgKyA0Myk7XG4gICAgICAgIC8vIGIgPiA2MlxuICAgICAgICByZXN1bHQgKz0gKCg2MiAtIGIpID4+PiA4KSAmICgoNjIgLSA0MykgLSA2MyArIDQ3KTtcbiAgICAgICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUocmVzdWx0KTtcbiAgICB9O1xuICAgIC8vIERlY29kZSBhIGNoYXJhY3RlciBjb2RlIGludG8gYSBieXRlLlxuICAgIC8vIE11c3QgcmV0dXJuIDI1NiBpZiBjaGFyYWN0ZXIgaXMgb3V0IG9mIGFscGhhYmV0IHJhbmdlLlxuICAgIENvZGVyLnByb3RvdHlwZS5fZGVjb2RlQ2hhciA9IGZ1bmN0aW9uIChjKSB7XG4gICAgICAgIC8vIERlY29kaW5nIHdvcmtzIHNpbWlsYXIgdG8gZW5jb2Rpbmc6IHVzaW5nIHRoZSBzYW1lIGNvbXBhcmlzb25cbiAgICAgICAgLy8gZnVuY3Rpb24sIGJ1dCBub3cgaXQgd29ya3Mgb24gcmFuZ2VzOiByZXN1bHQgaXMgYWx3YXlzIGluY3JlbWVudGVkXG4gICAgICAgIC8vIGJ5IHZhbHVlLCBidXQgdGhpcyB2YWx1ZSBiZWNvbWVzIHplcm8gaWYgdGhlIHJhbmdlIGlzIG5vdFxuICAgICAgICAvLyBzYXRpc2ZpZWQuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIERlY29kaW5nIHN0YXJ0cyB3aXRoIGludmFsaWQgdmFsdWUsIDI1Niwgd2hpY2ggaXMgdGhlblxuICAgICAgICAvLyBzdWJ0cmFjdGVkIHdoZW4gdGhlIHJhbmdlIGlzIHNhdGlzZmllZC4gSWYgbm9uZSBvZiB0aGUgcmFuZ2VzXG4gICAgICAgIC8vIGFwcGx5LCB0aGUgZnVuY3Rpb24gcmV0dXJucyAyNTYsIHdoaWNoIGlzIHRoZW4gY2hlY2tlZCBieVxuICAgICAgICAvLyB0aGUgY2FsbGVyIHRvIHRocm93IGVycm9yLlxuICAgICAgICB2YXIgcmVzdWx0ID0gSU5WQUxJRF9CWVRFOyAvLyBzdGFydCB3aXRoIGludmFsaWQgY2hhcmFjdGVyXG4gICAgICAgIC8vIGMgPT0gNDMgKGMgPiA0MiBhbmQgYyA8IDQ0KVxuICAgICAgICByZXN1bHQgKz0gKCgoNDIgLSBjKSAmIChjIC0gNDQpKSA+Pj4gOCkgJiAoLUlOVkFMSURfQllURSArIGMgLSA0MyArIDYyKTtcbiAgICAgICAgLy8gYyA9PSA0NyAoYyA+IDQ2IGFuZCBjIDwgNDgpXG4gICAgICAgIHJlc3VsdCArPSAoKCg0NiAtIGMpICYgKGMgLSA0OCkpID4+PiA4KSAmICgtSU5WQUxJRF9CWVRFICsgYyAtIDQ3ICsgNjMpO1xuICAgICAgICAvLyBjID4gNDcgYW5kIGMgPCA1OFxuICAgICAgICByZXN1bHQgKz0gKCgoNDcgLSBjKSAmIChjIC0gNTgpKSA+Pj4gOCkgJiAoLUlOVkFMSURfQllURSArIGMgLSA0OCArIDUyKTtcbiAgICAgICAgLy8gYyA+IDY0IGFuZCBjIDwgOTFcbiAgICAgICAgcmVzdWx0ICs9ICgoKDY0IC0gYykgJiAoYyAtIDkxKSkgPj4+IDgpICYgKC1JTlZBTElEX0JZVEUgKyBjIC0gNjUgKyAwKTtcbiAgICAgICAgLy8gYyA+IDk2IGFuZCBjIDwgMTIzXG4gICAgICAgIHJlc3VsdCArPSAoKCg5NiAtIGMpICYgKGMgLSAxMjMpKSA+Pj4gOCkgJiAoLUlOVkFMSURfQllURSArIGMgLSA5NyArIDI2KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuICAgIENvZGVyLnByb3RvdHlwZS5fZ2V0UGFkZGluZ0xlbmd0aCA9IGZ1bmN0aW9uIChzKSB7XG4gICAgICAgIHZhciBwYWRkaW5nTGVuZ3RoID0gMDtcbiAgICAgICAgaWYgKHRoaXMuX3BhZGRpbmdDaGFyYWN0ZXIpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSBzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNbaV0gIT09IHRoaXMuX3BhZGRpbmdDaGFyYWN0ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHBhZGRpbmdMZW5ndGgrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzLmxlbmd0aCA8IDQgfHwgcGFkZGluZ0xlbmd0aCA+IDIpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJCYXNlNjRDb2RlcjogaW5jb3JyZWN0IHBhZGRpbmdcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBhZGRpbmdMZW5ndGg7XG4gICAgfTtcbiAgICByZXR1cm4gQ29kZXI7XG59KCkpO1xuZXhwb3J0cy5Db2RlciA9IENvZGVyO1xudmFyIHN0ZENvZGVyID0gbmV3IENvZGVyKCk7XG5mdW5jdGlvbiBlbmNvZGUoZGF0YSkge1xuICAgIHJldHVybiBzdGRDb2Rlci5lbmNvZGUoZGF0YSk7XG59XG5leHBvcnRzLmVuY29kZSA9IGVuY29kZTtcbmZ1bmN0aW9uIGRlY29kZShzKSB7XG4gICAgcmV0dXJuIHN0ZENvZGVyLmRlY29kZShzKTtcbn1cbmV4cG9ydHMuZGVjb2RlID0gZGVjb2RlO1xuLyoqXG4gKiBJbXBsZW1lbnRzIFVSTC1zYWZlIEJhc2U2NCBlbmNvZGluZy5cbiAqIChTYW1lIGFzIEJhc2U2NCwgYnV0ICcrJyBpcyByZXBsYWNlZCB3aXRoICctJywgYW5kICcvJyB3aXRoICdfJykuXG4gKlxuICogT3BlcmF0ZXMgaW4gY29uc3RhbnQgdGltZS5cbiAqL1xudmFyIFVSTFNhZmVDb2RlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoVVJMU2FmZUNvZGVyLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFVSTFNhZmVDb2RlcigpIHtcbiAgICAgICAgcmV0dXJuIF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgIH1cbiAgICAvLyBVUkwtc2FmZSBlbmNvZGluZyBoYXZlIHRoZSBmb2xsb3dpbmcgZW5jb2RlZC9kZWNvZGVkIHJhbmdlczpcbiAgICAvL1xuICAgIC8vIEFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaIGFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6IDAxMjM0NTY3ODkgIC0gICBfXG4gICAgLy8gSW5kZXg6ICAgMCAtIDI1ICAgICAgICAgICAgICAgICAgICAyNiAtIDUxICAgICAgICAgICAgICA1MiAtIDYxICAgNjIgIDYzXG4gICAgLy8gQVNDSUk6ICA2NSAtIDkwICAgICAgICAgICAgICAgICAgICA5NyAtIDEyMiAgICAgICAgICAgICA0OCAtIDU3ICAgNDUgIDk1XG4gICAgLy9cbiAgICBVUkxTYWZlQ29kZXIucHJvdG90eXBlLl9lbmNvZGVCeXRlID0gZnVuY3Rpb24gKGIpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IGI7XG4gICAgICAgIC8vIGIgPj0gMFxuICAgICAgICByZXN1bHQgKz0gNjU7XG4gICAgICAgIC8vIGIgPiAyNVxuICAgICAgICByZXN1bHQgKz0gKCgyNSAtIGIpID4+PiA4KSAmICgoMCAtIDY1KSAtIDI2ICsgOTcpO1xuICAgICAgICAvLyBiID4gNTFcbiAgICAgICAgcmVzdWx0ICs9ICgoNTEgLSBiKSA+Pj4gOCkgJiAoKDI2IC0gOTcpIC0gNTIgKyA0OCk7XG4gICAgICAgIC8vIGIgPiA2MVxuICAgICAgICByZXN1bHQgKz0gKCg2MSAtIGIpID4+PiA4KSAmICgoNTIgLSA0OCkgLSA2MiArIDQ1KTtcbiAgICAgICAgLy8gYiA+IDYyXG4gICAgICAgIHJlc3VsdCArPSAoKDYyIC0gYikgPj4+IDgpICYgKCg2MiAtIDQ1KSAtIDYzICsgOTUpO1xuICAgICAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZShyZXN1bHQpO1xuICAgIH07XG4gICAgVVJMU2FmZUNvZGVyLnByb3RvdHlwZS5fZGVjb2RlQ2hhciA9IGZ1bmN0aW9uIChjKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSBJTlZBTElEX0JZVEU7XG4gICAgICAgIC8vIGMgPT0gNDUgKGMgPiA0NCBhbmQgYyA8IDQ2KVxuICAgICAgICByZXN1bHQgKz0gKCgoNDQgLSBjKSAmIChjIC0gNDYpKSA+Pj4gOCkgJiAoLUlOVkFMSURfQllURSArIGMgLSA0NSArIDYyKTtcbiAgICAgICAgLy8gYyA9PSA5NSAoYyA+IDk0IGFuZCBjIDwgOTYpXG4gICAgICAgIHJlc3VsdCArPSAoKCg5NCAtIGMpICYgKGMgLSA5NikpID4+PiA4KSAmICgtSU5WQUxJRF9CWVRFICsgYyAtIDk1ICsgNjMpO1xuICAgICAgICAvLyBjID4gNDcgYW5kIGMgPCA1OFxuICAgICAgICByZXN1bHQgKz0gKCgoNDcgLSBjKSAmIChjIC0gNTgpKSA+Pj4gOCkgJiAoLUlOVkFMSURfQllURSArIGMgLSA0OCArIDUyKTtcbiAgICAgICAgLy8gYyA+IDY0IGFuZCBjIDwgOTFcbiAgICAgICAgcmVzdWx0ICs9ICgoKDY0IC0gYykgJiAoYyAtIDkxKSkgPj4+IDgpICYgKC1JTlZBTElEX0JZVEUgKyBjIC0gNjUgKyAwKTtcbiAgICAgICAgLy8gYyA+IDk2IGFuZCBjIDwgMTIzXG4gICAgICAgIHJlc3VsdCArPSAoKCg5NiAtIGMpICYgKGMgLSAxMjMpKSA+Pj4gOCkgJiAoLUlOVkFMSURfQllURSArIGMgLSA5NyArIDI2KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuICAgIHJldHVybiBVUkxTYWZlQ29kZXI7XG59KENvZGVyKSk7XG5leHBvcnRzLlVSTFNhZmVDb2RlciA9IFVSTFNhZmVDb2RlcjtcbnZhciB1cmxTYWZlQ29kZXIgPSBuZXcgVVJMU2FmZUNvZGVyKCk7XG5mdW5jdGlvbiBlbmNvZGVVUkxTYWZlKGRhdGEpIHtcbiAgICByZXR1cm4gdXJsU2FmZUNvZGVyLmVuY29kZShkYXRhKTtcbn1cbmV4cG9ydHMuZW5jb2RlVVJMU2FmZSA9IGVuY29kZVVSTFNhZmU7XG5mdW5jdGlvbiBkZWNvZGVVUkxTYWZlKHMpIHtcbiAgICByZXR1cm4gdXJsU2FmZUNvZGVyLmRlY29kZShzKTtcbn1cbmV4cG9ydHMuZGVjb2RlVVJMU2FmZSA9IGRlY29kZVVSTFNhZmU7XG5leHBvcnRzLmVuY29kZWRMZW5ndGggPSBmdW5jdGlvbiAobGVuZ3RoKSB7XG4gICAgcmV0dXJuIHN0ZENvZGVyLmVuY29kZWRMZW5ndGgobGVuZ3RoKTtcbn07XG5leHBvcnRzLm1heERlY29kZWRMZW5ndGggPSBmdW5jdGlvbiAobGVuZ3RoKSB7XG4gICAgcmV0dXJuIHN0ZENvZGVyLm1heERlY29kZWRMZW5ndGgobGVuZ3RoKTtcbn07XG5leHBvcnRzLmRlY29kZWRMZW5ndGggPSBmdW5jdGlvbiAocykge1xuICAgIHJldHVybiBzdGRDb2Rlci5kZWNvZGVkTGVuZ3RoKHMpO1xufTtcblxuXG4vKioqLyB9KSxcbi8qIDEgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbi8vIENvcHlyaWdodCAoQykgMjAxNiBEbWl0cnkgQ2hlc3RueWtoXG4vLyBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBmb3IgZGV0YWlscy5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKlxuICogUGFja2FnZSB1dGY4IGltcGxlbWVudHMgVVRGLTggZW5jb2RpbmcgYW5kIGRlY29kaW5nLlxuICovXG52YXIgSU5WQUxJRF9VVEYxNiA9IFwidXRmODogaW52YWxpZCBzdHJpbmdcIjtcbnZhciBJTlZBTElEX1VURjggPSBcInV0Zjg6IGludmFsaWQgc291cmNlIGVuY29kaW5nXCI7XG4vKipcbiAqIEVuY29kZXMgdGhlIGdpdmVuIHN0cmluZyBpbnRvIFVURi04IGJ5dGUgYXJyYXkuXG4gKiBUaHJvd3MgaWYgdGhlIHNvdXJjZSBzdHJpbmcgaGFzIGludmFsaWQgVVRGLTE2IGVuY29kaW5nLlxuICovXG5mdW5jdGlvbiBlbmNvZGUocykge1xuICAgIC8vIENhbGN1bGF0ZSByZXN1bHQgbGVuZ3RoIGFuZCBhbGxvY2F0ZSBvdXRwdXQgYXJyYXkuXG4gICAgLy8gZW5jb2RlZExlbmd0aCgpIGFsc28gdmFsaWRhdGVzIHN0cmluZyBhbmQgdGhyb3dzIGVycm9ycyxcbiAgICAvLyBzbyB3ZSBkb24ndCBuZWVkIHJlcGVhdCB2YWxpZGF0aW9uIGhlcmUuXG4gICAgdmFyIGFyciA9IG5ldyBVaW50OEFycmF5KGVuY29kZWRMZW5ndGgocykpO1xuICAgIHZhciBwb3MgPSAwO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgYyA9IHMuY2hhckNvZGVBdChpKTtcbiAgICAgICAgaWYgKGMgPCAweDgwKSB7XG4gICAgICAgICAgICBhcnJbcG9zKytdID0gYztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjIDwgMHg4MDApIHtcbiAgICAgICAgICAgIGFycltwb3MrK10gPSAweGMwIHwgYyA+PiA2O1xuICAgICAgICAgICAgYXJyW3BvcysrXSA9IDB4ODAgfCBjICYgMHgzZjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjIDwgMHhkODAwKSB7XG4gICAgICAgICAgICBhcnJbcG9zKytdID0gMHhlMCB8IGMgPj4gMTI7XG4gICAgICAgICAgICBhcnJbcG9zKytdID0gMHg4MCB8IChjID4+IDYpICYgMHgzZjtcbiAgICAgICAgICAgIGFycltwb3MrK10gPSAweDgwIHwgYyAmIDB4M2Y7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpKys7IC8vIGdldCBvbmUgbW9yZSBjaGFyYWN0ZXJcbiAgICAgICAgICAgIGMgPSAoYyAmIDB4M2ZmKSA8PCAxMDtcbiAgICAgICAgICAgIGMgfD0gcy5jaGFyQ29kZUF0KGkpICYgMHgzZmY7XG4gICAgICAgICAgICBjICs9IDB4MTAwMDA7XG4gICAgICAgICAgICBhcnJbcG9zKytdID0gMHhmMCB8IGMgPj4gMTg7XG4gICAgICAgICAgICBhcnJbcG9zKytdID0gMHg4MCB8IChjID4+IDEyKSAmIDB4M2Y7XG4gICAgICAgICAgICBhcnJbcG9zKytdID0gMHg4MCB8IChjID4+IDYpICYgMHgzZjtcbiAgICAgICAgICAgIGFycltwb3MrK10gPSAweDgwIHwgYyAmIDB4M2Y7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGFycjtcbn1cbmV4cG9ydHMuZW5jb2RlID0gZW5jb2RlO1xuLyoqXG4gKiBSZXR1cm5zIHRoZSBudW1iZXIgb2YgYnl0ZXMgcmVxdWlyZWQgdG8gZW5jb2RlIHRoZSBnaXZlbiBzdHJpbmcgaW50byBVVEYtOC5cbiAqIFRocm93cyBpZiB0aGUgc291cmNlIHN0cmluZyBoYXMgaW52YWxpZCBVVEYtMTYgZW5jb2RpbmcuXG4gKi9cbmZ1bmN0aW9uIGVuY29kZWRMZW5ndGgocykge1xuICAgIHZhciByZXN1bHQgPSAwO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgYyA9IHMuY2hhckNvZGVBdChpKTtcbiAgICAgICAgaWYgKGMgPCAweDgwKSB7XG4gICAgICAgICAgICByZXN1bHQgKz0gMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjIDwgMHg4MDApIHtcbiAgICAgICAgICAgIHJlc3VsdCArPSAyO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGMgPCAweGQ4MDApIHtcbiAgICAgICAgICAgIHJlc3VsdCArPSAzO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGMgPD0gMHhkZmZmKSB7XG4gICAgICAgICAgICBpZiAoaSA+PSBzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoSU5WQUxJRF9VVEYxNik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpKys7IC8vIFwiZWF0XCIgbmV4dCBjaGFyYWN0ZXJcbiAgICAgICAgICAgIHJlc3VsdCArPSA0O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfVVRGMTYpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG5leHBvcnRzLmVuY29kZWRMZW5ndGggPSBlbmNvZGVkTGVuZ3RoO1xuLyoqXG4gKiBEZWNvZGVzIHRoZSBnaXZlbiBieXRlIGFycmF5IGZyb20gVVRGLTggaW50byBhIHN0cmluZy5cbiAqIFRocm93cyBpZiBlbmNvZGluZyBpcyBpbnZhbGlkLlxuICovXG5mdW5jdGlvbiBkZWNvZGUoYXJyKSB7XG4gICAgdmFyIGNoYXJzID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGIgPSBhcnJbaV07XG4gICAgICAgIGlmIChiICYgMHg4MCkge1xuICAgICAgICAgICAgdmFyIG1pbiA9IHZvaWQgMDtcbiAgICAgICAgICAgIGlmIChiIDwgMHhlMCkge1xuICAgICAgICAgICAgICAgIC8vIE5lZWQgMSBtb3JlIGJ5dGUuXG4gICAgICAgICAgICAgICAgaWYgKGkgPj0gYXJyLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoSU5WQUxJRF9VVEY4KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIG4xID0gYXJyWysraV07XG4gICAgICAgICAgICAgICAgaWYgKChuMSAmIDB4YzApICE9PSAweDgwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX1VURjgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBiID0gKGIgJiAweDFmKSA8PCA2IHwgKG4xICYgMHgzZik7XG4gICAgICAgICAgICAgICAgbWluID0gMHg4MDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGIgPCAweGYwKSB7XG4gICAgICAgICAgICAgICAgLy8gTmVlZCAyIG1vcmUgYnl0ZXMuXG4gICAgICAgICAgICAgICAgaWYgKGkgPj0gYXJyLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfVVRGOCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciBuMSA9IGFyclsrK2ldO1xuICAgICAgICAgICAgICAgIHZhciBuMiA9IGFyclsrK2ldO1xuICAgICAgICAgICAgICAgIGlmICgobjEgJiAweGMwKSAhPT0gMHg4MCB8fCAobjIgJiAweGMwKSAhPT0gMHg4MCkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoSU5WQUxJRF9VVEY4KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYiA9IChiICYgMHgwZikgPDwgMTIgfCAobjEgJiAweDNmKSA8PCA2IHwgKG4yICYgMHgzZik7XG4gICAgICAgICAgICAgICAgbWluID0gMHg4MDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChiIDwgMHhmOCkge1xuICAgICAgICAgICAgICAgIC8vIE5lZWQgMyBtb3JlIGJ5dGVzLlxuICAgICAgICAgICAgICAgIGlmIChpID49IGFyci5sZW5ndGggLSAyKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX1VURjgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgbjEgPSBhcnJbKytpXTtcbiAgICAgICAgICAgICAgICB2YXIgbjIgPSBhcnJbKytpXTtcbiAgICAgICAgICAgICAgICB2YXIgbjMgPSBhcnJbKytpXTtcbiAgICAgICAgICAgICAgICBpZiAoKG4xICYgMHhjMCkgIT09IDB4ODAgfHwgKG4yICYgMHhjMCkgIT09IDB4ODAgfHwgKG4zICYgMHhjMCkgIT09IDB4ODApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfVVRGOCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGIgPSAoYiAmIDB4MGYpIDw8IDE4IHwgKG4xICYgMHgzZikgPDwgMTIgfCAobjIgJiAweDNmKSA8PCA2IHwgKG4zICYgMHgzZik7XG4gICAgICAgICAgICAgICAgbWluID0gMHgxMDAwMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX1VURjgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGIgPCBtaW4gfHwgKGIgPj0gMHhkODAwICYmIGIgPD0gMHhkZmZmKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihJTlZBTElEX1VURjgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGIgPj0gMHgxMDAwMCkge1xuICAgICAgICAgICAgICAgIC8vIFN1cnJvZ2F0ZSBwYWlyLlxuICAgICAgICAgICAgICAgIGlmIChiID4gMHgxMGZmZmYpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfVVRGOCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGIgLT0gMHgxMDAwMDtcbiAgICAgICAgICAgICAgICBjaGFycy5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUoMHhkODAwIHwgKGIgPj4gMTApKSk7XG4gICAgICAgICAgICAgICAgYiA9IDB4ZGMwMCB8IChiICYgMHgzZmYpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNoYXJzLnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZShiKSk7XG4gICAgfVxuICAgIHJldHVybiBjaGFycy5qb2luKFwiXCIpO1xufVxuZXhwb3J0cy5kZWNvZGUgPSBkZWNvZGU7XG5cblxuLyoqKi8gfSksXG4vKiAyICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbi8vIHJlcXVpcmVkIHNvIHdlIGRvbid0IGhhdmUgdG8gZG8gcmVxdWlyZSgncHVzaGVyJykuZGVmYXVsdCBldGMuXG5tb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19yZXF1aXJlX18oMykuZGVmYXVsdDtcblxuXG4vKioqLyB9KSxcbi8qIDMgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIF9fd2VicGFja19leHBvcnRzX18sIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG4vLyBFU00gQ09NUEFUIEZMQUdcbl9fd2VicGFja19yZXF1aXJlX18ucihfX3dlYnBhY2tfZXhwb3J0c19fKTtcblxuLy8gQ09OQ0FURU5BVEVEIE1PRFVMRTogLi9zcmMvcnVudGltZXMvd2ViL2RvbS9zY3JpcHRfcmVjZWl2ZXJfZmFjdG9yeS50c1xuY2xhc3MgU2NyaXB0UmVjZWl2ZXJGYWN0b3J5IHtcbiAgICBjb25zdHJ1Y3RvcihwcmVmaXgsIG5hbWUpIHtcbiAgICAgICAgdGhpcy5sYXN0SWQgPSAwO1xuICAgICAgICB0aGlzLnByZWZpeCA9IHByZWZpeDtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB9XG4gICAgY3JlYXRlKGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMubGFzdElkKys7XG4gICAgICAgIHZhciBudW1iZXIgPSB0aGlzLmxhc3RJZDtcbiAgICAgICAgdmFyIGlkID0gdGhpcy5wcmVmaXggKyBudW1iZXI7XG4gICAgICAgIHZhciBuYW1lID0gdGhpcy5uYW1lICsgJ1snICsgbnVtYmVyICsgJ10nO1xuICAgICAgICB2YXIgY2FsbGVkID0gZmFsc2U7XG4gICAgICAgIHZhciBjYWxsYmFja1dyYXBwZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoIWNhbGxlZCkge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgY2FsbGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdGhpc1tudW1iZXJdID0gY2FsbGJhY2tXcmFwcGVyO1xuICAgICAgICByZXR1cm4geyBudW1iZXI6IG51bWJlciwgaWQ6IGlkLCBuYW1lOiBuYW1lLCBjYWxsYmFjazogY2FsbGJhY2tXcmFwcGVyIH07XG4gICAgfVxuICAgIHJlbW92ZShyZWNlaXZlcikge1xuICAgICAgICBkZWxldGUgdGhpc1tyZWNlaXZlci5udW1iZXJdO1xuICAgIH1cbn1cbnZhciBTY3JpcHRSZWNlaXZlcnMgPSBuZXcgU2NyaXB0UmVjZWl2ZXJGYWN0b3J5KCdfcHVzaGVyX3NjcmlwdF8nLCAnUHVzaGVyLlNjcmlwdFJlY2VpdmVycycpO1xuXG4vLyBDT05DQVRFTkFURUQgTU9EVUxFOiAuL3NyYy9jb3JlL2RlZmF1bHRzLnRzXG52YXIgRGVmYXVsdHMgPSB7XG4gICAgVkVSU0lPTjogXCI4LjMuMFwiLFxuICAgIFBST1RPQ09MOiA3LFxuICAgIHdzUG9ydDogODAsXG4gICAgd3NzUG9ydDogNDQzLFxuICAgIHdzUGF0aDogJycsXG4gICAgaHR0cEhvc3Q6ICdzb2NranMucHVzaGVyLmNvbScsXG4gICAgaHR0cFBvcnQ6IDgwLFxuICAgIGh0dHBzUG9ydDogNDQzLFxuICAgIGh0dHBQYXRoOiAnL3B1c2hlcicsXG4gICAgc3RhdHNfaG9zdDogJ3N0YXRzLnB1c2hlci5jb20nLFxuICAgIGF1dGhFbmRwb2ludDogJy9wdXNoZXIvYXV0aCcsXG4gICAgYXV0aFRyYW5zcG9ydDogJ2FqYXgnLFxuICAgIGFjdGl2aXR5VGltZW91dDogMTIwMDAwLFxuICAgIHBvbmdUaW1lb3V0OiAzMDAwMCxcbiAgICB1bmF2YWlsYWJsZVRpbWVvdXQ6IDEwMDAwLFxuICAgIHVzZXJBdXRoZW50aWNhdGlvbjoge1xuICAgICAgICBlbmRwb2ludDogJy9wdXNoZXIvdXNlci1hdXRoJyxcbiAgICAgICAgdHJhbnNwb3J0OiAnYWpheCdcbiAgICB9LFxuICAgIGNoYW5uZWxBdXRob3JpemF0aW9uOiB7XG4gICAgICAgIGVuZHBvaW50OiAnL3B1c2hlci9hdXRoJyxcbiAgICAgICAgdHJhbnNwb3J0OiAnYWpheCdcbiAgICB9LFxuICAgIGNkbl9odHRwOiBcImh0dHA6Ly9qcy5wdXNoZXIuY29tXCIsXG4gICAgY2RuX2h0dHBzOiBcImh0dHBzOi8vanMucHVzaGVyLmNvbVwiLFxuICAgIGRlcGVuZGVuY3lfc3VmZml4OiBcIlwiXG59O1xuLyogaGFybW9ueSBkZWZhdWx0IGV4cG9ydCAqLyB2YXIgZGVmYXVsdHMgPSAoRGVmYXVsdHMpO1xuXG4vLyBDT05DQVRFTkFURUQgTU9EVUxFOiAuL3NyYy9ydW50aW1lcy93ZWIvZG9tL2RlcGVuZGVuY3lfbG9hZGVyLnRzXG5cblxuY2xhc3MgZGVwZW5kZW5jeV9sb2FkZXJfRGVwZW5kZW5jeUxvYWRlciB7XG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgICAgICB0aGlzLnJlY2VpdmVycyA9IG9wdGlvbnMucmVjZWl2ZXJzIHx8IFNjcmlwdFJlY2VpdmVycztcbiAgICAgICAgdGhpcy5sb2FkaW5nID0ge307XG4gICAgfVxuICAgIGxvYWQobmFtZSwgb3B0aW9ucywgY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBpZiAoc2VsZi5sb2FkaW5nW25hbWVdICYmIHNlbGYubG9hZGluZ1tuYW1lXS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBzZWxmLmxvYWRpbmdbbmFtZV0ucHVzaChjYWxsYmFjayk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzZWxmLmxvYWRpbmdbbmFtZV0gPSBbY2FsbGJhY2tdO1xuICAgICAgICAgICAgdmFyIHJlcXVlc3QgPSBydW50aW1lLmNyZWF0ZVNjcmlwdFJlcXVlc3Qoc2VsZi5nZXRQYXRoKG5hbWUsIG9wdGlvbnMpKTtcbiAgICAgICAgICAgIHZhciByZWNlaXZlciA9IHNlbGYucmVjZWl2ZXJzLmNyZWF0ZShmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnJlY2VpdmVycy5yZW1vdmUocmVjZWl2ZXIpO1xuICAgICAgICAgICAgICAgIGlmIChzZWxmLmxvYWRpbmdbbmFtZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNhbGxiYWNrcyA9IHNlbGYubG9hZGluZ1tuYW1lXTtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHNlbGYubG9hZGluZ1tuYW1lXTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3NDYWxsYmFjayA9IGZ1bmN0aW9uICh3YXNTdWNjZXNzZnVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXdhc1N1Y2Nlc3NmdWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXF1ZXN0LmNsZWFudXAoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjYWxsYmFja3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrc1tpXShlcnJvciwgc3VjY2Vzc0NhbGxiYWNrKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmVxdWVzdC5zZW5kKHJlY2VpdmVyKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXRSb290KG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIGNkbjtcbiAgICAgICAgdmFyIHByb3RvY29sID0gcnVudGltZS5nZXREb2N1bWVudCgpLmxvY2F0aW9uLnByb3RvY29sO1xuICAgICAgICBpZiAoKG9wdGlvbnMgJiYgb3B0aW9ucy51c2VUTFMpIHx8IHByb3RvY29sID09PSAnaHR0cHM6Jykge1xuICAgICAgICAgICAgY2RuID0gdGhpcy5vcHRpb25zLmNkbl9odHRwcztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNkbiA9IHRoaXMub3B0aW9ucy5jZG5faHR0cDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2RuLnJlcGxhY2UoL1xcLyokLywgJycpICsgJy8nICsgdGhpcy5vcHRpb25zLnZlcnNpb247XG4gICAgfVxuICAgIGdldFBhdGgobmFtZSwgb3B0aW9ucykge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRSb290KG9wdGlvbnMpICsgJy8nICsgbmFtZSArIHRoaXMub3B0aW9ucy5zdWZmaXggKyAnLmpzJztcbiAgICB9XG59XG5cbi8vIENPTkNBVEVOQVRFRCBNT0RVTEU6IC4vc3JjL3J1bnRpbWVzL3dlYi9kb20vZGVwZW5kZW5jaWVzLnRzXG5cblxuXG52YXIgRGVwZW5kZW5jaWVzUmVjZWl2ZXJzID0gbmV3IFNjcmlwdFJlY2VpdmVyRmFjdG9yeSgnX3B1c2hlcl9kZXBlbmRlbmNpZXMnLCAnUHVzaGVyLkRlcGVuZGVuY2llc1JlY2VpdmVycycpO1xudmFyIERlcGVuZGVuY2llcyA9IG5ldyBkZXBlbmRlbmN5X2xvYWRlcl9EZXBlbmRlbmN5TG9hZGVyKHtcbiAgICBjZG5faHR0cDogZGVmYXVsdHMuY2RuX2h0dHAsXG4gICAgY2RuX2h0dHBzOiBkZWZhdWx0cy5jZG5faHR0cHMsXG4gICAgdmVyc2lvbjogZGVmYXVsdHMuVkVSU0lPTixcbiAgICBzdWZmaXg6IGRlZmF1bHRzLmRlcGVuZGVuY3lfc3VmZml4LFxuICAgIHJlY2VpdmVyczogRGVwZW5kZW5jaWVzUmVjZWl2ZXJzXG59KTtcblxuLy8gQ09OQ0FURU5BVEVEIE1PRFVMRTogLi9zcmMvY29yZS91dGlscy91cmxfc3RvcmUudHNcbmNvbnN0IHVybFN0b3JlID0ge1xuICAgIGJhc2VVcmw6ICdodHRwczovL3B1c2hlci5jb20nLFxuICAgIHVybHM6IHtcbiAgICAgICAgYXV0aGVudGljYXRpb25FbmRwb2ludDoge1xuICAgICAgICAgICAgcGF0aDogJy9kb2NzL2NoYW5uZWxzL3NlcnZlcl9hcGkvYXV0aGVudGljYXRpbmdfdXNlcnMnXG4gICAgICAgIH0sXG4gICAgICAgIGF1dGhvcml6YXRpb25FbmRwb2ludDoge1xuICAgICAgICAgICAgcGF0aDogJy9kb2NzL2NoYW5uZWxzL3NlcnZlcl9hcGkvYXV0aG9yaXppbmctdXNlcnMvJ1xuICAgICAgICB9LFxuICAgICAgICBqYXZhc2NyaXB0UXVpY2tTdGFydDoge1xuICAgICAgICAgICAgcGF0aDogJy9kb2NzL2phdmFzY3JpcHRfcXVpY2tfc3RhcnQnXG4gICAgICAgIH0sXG4gICAgICAgIHRyaWdnZXJpbmdDbGllbnRFdmVudHM6IHtcbiAgICAgICAgICAgIHBhdGg6ICcvZG9jcy9jbGllbnRfYXBpX2d1aWRlL2NsaWVudF9ldmVudHMjdHJpZ2dlci1ldmVudHMnXG4gICAgICAgIH0sXG4gICAgICAgIGVuY3J5cHRlZENoYW5uZWxTdXBwb3J0OiB7XG4gICAgICAgICAgICBmdWxsVXJsOiAnaHR0cHM6Ly9naXRodWIuY29tL3B1c2hlci9wdXNoZXItanMvdHJlZS9jYzQ5MTAxNTM3MWE0YmRlNTc0M2QxYzg3YTBmYmFjMGZlYjUzMTk1I2VuY3J5cHRlZC1jaGFubmVsLXN1cHBvcnQnXG4gICAgICAgIH1cbiAgICB9XG59O1xuY29uc3QgYnVpbGRMb2dTdWZmaXggPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgY29uc3QgdXJsUHJlZml4ID0gJ1NlZTonO1xuICAgIGNvbnN0IHVybE9iaiA9IHVybFN0b3JlLnVybHNba2V5XTtcbiAgICBpZiAoIXVybE9iailcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIGxldCB1cmw7XG4gICAgaWYgKHVybE9iai5mdWxsVXJsKSB7XG4gICAgICAgIHVybCA9IHVybE9iai5mdWxsVXJsO1xuICAgIH1cbiAgICBlbHNlIGlmICh1cmxPYmoucGF0aCkge1xuICAgICAgICB1cmwgPSB1cmxTdG9yZS5iYXNlVXJsICsgdXJsT2JqLnBhdGg7XG4gICAgfVxuICAgIGlmICghdXJsKVxuICAgICAgICByZXR1cm4gJyc7XG4gICAgcmV0dXJuIGAke3VybFByZWZpeH0gJHt1cmx9YDtcbn07XG4vKiBoYXJtb255IGRlZmF1bHQgZXhwb3J0ICovIHZhciB1cmxfc3RvcmUgPSAoeyBidWlsZExvZ1N1ZmZpeCB9KTtcblxuLy8gQ09OQ0FURU5BVEVEIE1PRFVMRTogLi9zcmMvY29yZS9hdXRoL29wdGlvbnMudHNcbnZhciBBdXRoUmVxdWVzdFR5cGU7XG4oZnVuY3Rpb24gKEF1dGhSZXF1ZXN0VHlwZSkge1xuICAgIEF1dGhSZXF1ZXN0VHlwZVtcIlVzZXJBdXRoZW50aWNhdGlvblwiXSA9IFwidXNlci1hdXRoZW50aWNhdGlvblwiO1xuICAgIEF1dGhSZXF1ZXN0VHlwZVtcIkNoYW5uZWxBdXRob3JpemF0aW9uXCJdID0gXCJjaGFubmVsLWF1dGhvcml6YXRpb25cIjtcbn0pKEF1dGhSZXF1ZXN0VHlwZSB8fCAoQXV0aFJlcXVlc3RUeXBlID0ge30pKTtcblxuLy8gQ09OQ0FURU5BVEVEIE1PRFVMRTogLi9zcmMvY29yZS9lcnJvcnMudHNcbmNsYXNzIEJhZEV2ZW50TmFtZSBleHRlbmRzIEVycm9yIHtcbiAgICBjb25zdHJ1Y3Rvcihtc2cpIHtcbiAgICAgICAgc3VwZXIobXNnKTtcbiAgICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKHRoaXMsIG5ldy50YXJnZXQucHJvdG90eXBlKTtcbiAgICB9XG59XG5jbGFzcyBCYWRDaGFubmVsTmFtZSBleHRlbmRzIEVycm9yIHtcbiAgICBjb25zdHJ1Y3Rvcihtc2cpIHtcbiAgICAgICAgc3VwZXIobXNnKTtcbiAgICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKHRoaXMsIG5ldy50YXJnZXQucHJvdG90eXBlKTtcbiAgICB9XG59XG5jbGFzcyBSZXF1ZXN0VGltZWRPdXQgZXh0ZW5kcyBFcnJvciB7XG4gICAgY29uc3RydWN0b3IobXNnKSB7XG4gICAgICAgIHN1cGVyKG1zZyk7XG4gICAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZih0aGlzLCBuZXcudGFyZ2V0LnByb3RvdHlwZSk7XG4gICAgfVxufVxuY2xhc3MgVHJhbnNwb3J0UHJpb3JpdHlUb29Mb3cgZXh0ZW5kcyBFcnJvciB7XG4gICAgY29uc3RydWN0b3IobXNnKSB7XG4gICAgICAgIHN1cGVyKG1zZyk7XG4gICAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZih0aGlzLCBuZXcudGFyZ2V0LnByb3RvdHlwZSk7XG4gICAgfVxufVxuY2xhc3MgVHJhbnNwb3J0Q2xvc2VkIGV4dGVuZHMgRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKG1zZykge1xuICAgICAgICBzdXBlcihtc2cpO1xuICAgICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YodGhpcywgbmV3LnRhcmdldC5wcm90b3R5cGUpO1xuICAgIH1cbn1cbmNsYXNzIFVuc3VwcG9ydGVkRmVhdHVyZSBleHRlbmRzIEVycm9yIHtcbiAgICBjb25zdHJ1Y3Rvcihtc2cpIHtcbiAgICAgICAgc3VwZXIobXNnKTtcbiAgICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKHRoaXMsIG5ldy50YXJnZXQucHJvdG90eXBlKTtcbiAgICB9XG59XG5jbGFzcyBVbnN1cHBvcnRlZFRyYW5zcG9ydCBleHRlbmRzIEVycm9yIHtcbiAgICBjb25zdHJ1Y3Rvcihtc2cpIHtcbiAgICAgICAgc3VwZXIobXNnKTtcbiAgICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKHRoaXMsIG5ldy50YXJnZXQucHJvdG90eXBlKTtcbiAgICB9XG59XG5jbGFzcyBVbnN1cHBvcnRlZFN0cmF0ZWd5IGV4dGVuZHMgRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKG1zZykge1xuICAgICAgICBzdXBlcihtc2cpO1xuICAgICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YodGhpcywgbmV3LnRhcmdldC5wcm90b3R5cGUpO1xuICAgIH1cbn1cbmNsYXNzIEhUVFBBdXRoRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gICAgY29uc3RydWN0b3Ioc3RhdHVzLCBtc2cpIHtcbiAgICAgICAgc3VwZXIobXNnKTtcbiAgICAgICAgdGhpcy5zdGF0dXMgPSBzdGF0dXM7XG4gICAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZih0aGlzLCBuZXcudGFyZ2V0LnByb3RvdHlwZSk7XG4gICAgfVxufVxuXG4vLyBDT05DQVRFTkFURUQgTU9EVUxFOiAuL3NyYy9ydW50aW1lcy9pc29tb3JwaGljL2F1dGgveGhyX2F1dGgudHNcblxuXG5cblxuY29uc3QgYWpheCA9IGZ1bmN0aW9uIChjb250ZXh0LCBxdWVyeSwgYXV0aE9wdGlvbnMsIGF1dGhSZXF1ZXN0VHlwZSwgY2FsbGJhY2spIHtcbiAgICBjb25zdCB4aHIgPSBydW50aW1lLmNyZWF0ZVhIUigpO1xuICAgIHhoci5vcGVuKCdQT1NUJywgYXV0aE9wdGlvbnMuZW5kcG9pbnQsIHRydWUpO1xuICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyk7XG4gICAgZm9yICh2YXIgaGVhZGVyTmFtZSBpbiBhdXRoT3B0aW9ucy5oZWFkZXJzKSB7XG4gICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKGhlYWRlck5hbWUsIGF1dGhPcHRpb25zLmhlYWRlcnNbaGVhZGVyTmFtZV0pO1xuICAgIH1cbiAgICBpZiAoYXV0aE9wdGlvbnMuaGVhZGVyc1Byb3ZpZGVyICE9IG51bGwpIHtcbiAgICAgICAgbGV0IGR5bmFtaWNIZWFkZXJzID0gYXV0aE9wdGlvbnMuaGVhZGVyc1Byb3ZpZGVyKCk7XG4gICAgICAgIGZvciAodmFyIGhlYWRlck5hbWUgaW4gZHluYW1pY0hlYWRlcnMpIHtcbiAgICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKGhlYWRlck5hbWUsIGR5bmFtaWNIZWFkZXJzW2hlYWRlck5hbWVdKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT09IDQpIHtcbiAgICAgICAgICAgIGlmICh4aHIuc3RhdHVzID09PSAyMDApIHtcbiAgICAgICAgICAgICAgICBsZXQgZGF0YTtcbiAgICAgICAgICAgICAgICBsZXQgcGFyc2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICAgICAgICAgIHBhcnNlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKG5ldyBIVFRQQXV0aEVycm9yKDIwMCwgYEpTT04gcmV0dXJuZWQgZnJvbSAke2F1dGhSZXF1ZXN0VHlwZS50b1N0cmluZygpfSBlbmRwb2ludCB3YXMgaW52YWxpZCwgeWV0IHN0YXR1cyBjb2RlIHdhcyAyMDAuIERhdGEgd2FzOiAke3hoci5yZXNwb25zZVRleHR9YCksIG51bGwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocGFyc2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKG51bGwsIGRhdGEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGxldCBzdWZmaXggPSAnJztcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGF1dGhSZXF1ZXN0VHlwZSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIEF1dGhSZXF1ZXN0VHlwZS5Vc2VyQXV0aGVudGljYXRpb246XG4gICAgICAgICAgICAgICAgICAgICAgICBzdWZmaXggPSB1cmxfc3RvcmUuYnVpbGRMb2dTdWZmaXgoJ2F1dGhlbnRpY2F0aW9uRW5kcG9pbnQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIEF1dGhSZXF1ZXN0VHlwZS5DaGFubmVsQXV0aG9yaXphdGlvbjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1ZmZpeCA9IGBDbGllbnRzIG11c3QgYmUgYXV0aG9yaXplZCB0byBqb2luIHByaXZhdGUgb3IgcHJlc2VuY2UgY2hhbm5lbHMuICR7dXJsX3N0b3JlLmJ1aWxkTG9nU3VmZml4KCdhdXRob3JpemF0aW9uRW5kcG9pbnQnKX1gO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKG5ldyBIVFRQQXV0aEVycm9yKHhoci5zdGF0dXMsIGBVbmFibGUgdG8gcmV0cmlldmUgYXV0aCBzdHJpbmcgZnJvbSAke2F1dGhSZXF1ZXN0VHlwZS50b1N0cmluZygpfSBlbmRwb2ludCAtIGAgK1xuICAgICAgICAgICAgICAgICAgICBgcmVjZWl2ZWQgc3RhdHVzOiAke3hoci5zdGF0dXN9IGZyb20gJHthdXRoT3B0aW9ucy5lbmRwb2ludH0uICR7c3VmZml4fWApLCBudWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgeGhyLnNlbmQocXVlcnkpO1xuICAgIHJldHVybiB4aHI7XG59O1xuLyogaGFybW9ueSBkZWZhdWx0IGV4cG9ydCAqLyB2YXIgeGhyX2F1dGggPSAoYWpheCk7XG5cbi8vIENPTkNBVEVOQVRFRCBNT0RVTEU6IC4vc3JjL2NvcmUvYmFzZTY0LnRzXG5mdW5jdGlvbiBlbmNvZGUocykge1xuICAgIHJldHVybiBidG9hKHV0b2IocykpO1xufVxudmFyIGZyb21DaGFyQ29kZSA9IFN0cmluZy5mcm9tQ2hhckNvZGU7XG52YXIgYjY0Y2hhcnMgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLyc7XG52YXIgYjY0dGFiID0ge307XG5mb3IgKHZhciBiYXNlNjRfaSA9IDAsIGwgPSBiNjRjaGFycy5sZW5ndGg7IGJhc2U2NF9pIDwgbDsgYmFzZTY0X2krKykge1xuICAgIGI2NHRhYltiNjRjaGFycy5jaGFyQXQoYmFzZTY0X2kpXSA9IGJhc2U2NF9pO1xufVxudmFyIGNiX3V0b2IgPSBmdW5jdGlvbiAoYykge1xuICAgIHZhciBjYyA9IGMuY2hhckNvZGVBdCgwKTtcbiAgICByZXR1cm4gY2MgPCAweDgwXG4gICAgICAgID8gY1xuICAgICAgICA6IGNjIDwgMHg4MDBcbiAgICAgICAgICAgID8gZnJvbUNoYXJDb2RlKDB4YzAgfCAoY2MgPj4+IDYpKSArIGZyb21DaGFyQ29kZSgweDgwIHwgKGNjICYgMHgzZikpXG4gICAgICAgICAgICA6IGZyb21DaGFyQ29kZSgweGUwIHwgKChjYyA+Pj4gMTIpICYgMHgwZikpICtcbiAgICAgICAgICAgICAgICBmcm9tQ2hhckNvZGUoMHg4MCB8ICgoY2MgPj4+IDYpICYgMHgzZikpICtcbiAgICAgICAgICAgICAgICBmcm9tQ2hhckNvZGUoMHg4MCB8IChjYyAmIDB4M2YpKTtcbn07XG52YXIgdXRvYiA9IGZ1bmN0aW9uICh1KSB7XG4gICAgcmV0dXJuIHUucmVwbGFjZSgvW15cXHgwMC1cXHg3Rl0vZywgY2JfdXRvYik7XG59O1xudmFyIGNiX2VuY29kZSA9IGZ1bmN0aW9uIChjY2MpIHtcbiAgICB2YXIgcGFkbGVuID0gWzAsIDIsIDFdW2NjYy5sZW5ndGggJSAzXTtcbiAgICB2YXIgb3JkID0gKGNjYy5jaGFyQ29kZUF0KDApIDw8IDE2KSB8XG4gICAgICAgICgoY2NjLmxlbmd0aCA+IDEgPyBjY2MuY2hhckNvZGVBdCgxKSA6IDApIDw8IDgpIHxcbiAgICAgICAgKGNjYy5sZW5ndGggPiAyID8gY2NjLmNoYXJDb2RlQXQoMikgOiAwKTtcbiAgICB2YXIgY2hhcnMgPSBbXG4gICAgICAgIGI2NGNoYXJzLmNoYXJBdChvcmQgPj4+IDE4KSxcbiAgICAgICAgYjY0Y2hhcnMuY2hhckF0KChvcmQgPj4+IDEyKSAmIDYzKSxcbiAgICAgICAgcGFkbGVuID49IDIgPyAnPScgOiBiNjRjaGFycy5jaGFyQXQoKG9yZCA+Pj4gNikgJiA2MyksXG4gICAgICAgIHBhZGxlbiA+PSAxID8gJz0nIDogYjY0Y2hhcnMuY2hhckF0KG9yZCAmIDYzKVxuICAgIF07XG4gICAgcmV0dXJuIGNoYXJzLmpvaW4oJycpO1xufTtcbnZhciBidG9hID0gd2luZG93LmJ0b2EgfHxcbiAgICBmdW5jdGlvbiAoYikge1xuICAgICAgICByZXR1cm4gYi5yZXBsYWNlKC9bXFxzXFxTXXsxLDN9L2csIGNiX2VuY29kZSk7XG4gICAgfTtcblxuLy8gQ09OQ0FURU5BVEVEIE1PRFVMRTogLi9zcmMvY29yZS91dGlscy90aW1lcnMvYWJzdHJhY3RfdGltZXIudHNcbmNsYXNzIFRpbWVyIHtcbiAgICBjb25zdHJ1Y3RvcihzZXQsIGNsZWFyLCBkZWxheSwgY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5jbGVhciA9IGNsZWFyO1xuICAgICAgICB0aGlzLnRpbWVyID0gc2V0KCgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLnRpbWVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50aW1lciA9IGNhbGxiYWNrKHRoaXMudGltZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBkZWxheSk7XG4gICAgfVxuICAgIGlzUnVubmluZygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGltZXIgIT09IG51bGw7XG4gICAgfVxuICAgIGVuc3VyZUFib3J0ZWQoKSB7XG4gICAgICAgIGlmICh0aGlzLnRpbWVyKSB7XG4gICAgICAgICAgICB0aGlzLmNsZWFyKHRoaXMudGltZXIpO1xuICAgICAgICAgICAgdGhpcy50aW1lciA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG59XG4vKiBoYXJtb255IGRlZmF1bHQgZXhwb3J0ICovIHZhciBhYnN0cmFjdF90aW1lciA9IChUaW1lcik7XG5cbi8vIENPTkNBVEVOQVRFRCBNT0RVTEU6IC4vc3JjL2NvcmUvdXRpbHMvdGltZXJzL2luZGV4LnRzXG5cbmZ1bmN0aW9uIHRpbWVyc19jbGVhclRpbWVvdXQodGltZXIpIHtcbiAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KHRpbWVyKTtcbn1cbmZ1bmN0aW9uIHRpbWVyc19jbGVhckludGVydmFsKHRpbWVyKSB7XG4gICAgd2luZG93LmNsZWFySW50ZXJ2YWwodGltZXIpO1xufVxuY2xhc3MgdGltZXJzX09uZU9mZlRpbWVyIGV4dGVuZHMgYWJzdHJhY3RfdGltZXIge1xuICAgIGNvbnN0cnVjdG9yKGRlbGF5LCBjYWxsYmFjaykge1xuICAgICAgICBzdXBlcihzZXRUaW1lb3V0LCB0aW1lcnNfY2xlYXJUaW1lb3V0LCBkZWxheSwgZnVuY3Rpb24gKHRpbWVyKSB7XG4gICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbmNsYXNzIHRpbWVyc19QZXJpb2RpY1RpbWVyIGV4dGVuZHMgYWJzdHJhY3RfdGltZXIge1xuICAgIGNvbnN0cnVjdG9yKGRlbGF5LCBjYWxsYmFjaykge1xuICAgICAgICBzdXBlcihzZXRJbnRlcnZhbCwgdGltZXJzX2NsZWFySW50ZXJ2YWwsIGRlbGF5LCBmdW5jdGlvbiAodGltZXIpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICByZXR1cm4gdGltZXI7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuLy8gQ09OQ0FURU5BVEVEIE1PRFVMRTogLi9zcmMvY29yZS91dGlsLnRzXG5cbnZhciBVdGlsID0ge1xuICAgIG5vdygpIHtcbiAgICAgICAgaWYgKERhdGUubm93KSB7XG4gICAgICAgICAgICByZXR1cm4gRGF0ZS5ub3coKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRGF0ZSgpLnZhbHVlT2YoKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgZGVmZXIoY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIG5ldyB0aW1lcnNfT25lT2ZmVGltZXIoMCwgY2FsbGJhY2spO1xuICAgIH0sXG4gICAgbWV0aG9kKG5hbWUsIC4uLmFyZ3MpIHtcbiAgICAgICAgdmFyIGJvdW5kQXJndW1lbnRzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChvYmplY3QpIHtcbiAgICAgICAgICAgIHJldHVybiBvYmplY3RbbmFtZV0uYXBwbHkob2JqZWN0LCBib3VuZEFyZ3VtZW50cy5jb25jYXQoYXJndW1lbnRzKSk7XG4gICAgICAgIH07XG4gICAgfVxufTtcbi8qIGhhcm1vbnkgZGVmYXVsdCBleHBvcnQgKi8gdmFyIHV0aWwgPSAoVXRpbCk7XG5cbi8vIENPTkNBVEVOQVRFRCBNT0RVTEU6IC4vc3JjL2NvcmUvdXRpbHMvY29sbGVjdGlvbnMudHNcblxuXG5mdW5jdGlvbiBleHRlbmQodGFyZ2V0LCAuLi5zb3VyY2VzKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzb3VyY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBleHRlbnNpb25zID0gc291cmNlc1tpXTtcbiAgICAgICAgZm9yICh2YXIgcHJvcGVydHkgaW4gZXh0ZW5zaW9ucykge1xuICAgICAgICAgICAgaWYgKGV4dGVuc2lvbnNbcHJvcGVydHldICYmXG4gICAgICAgICAgICAgICAgZXh0ZW5zaW9uc1twcm9wZXJ0eV0uY29uc3RydWN0b3IgJiZcbiAgICAgICAgICAgICAgICBleHRlbnNpb25zW3Byb3BlcnR5XS5jb25zdHJ1Y3RvciA9PT0gT2JqZWN0KSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0W3Byb3BlcnR5XSA9IGV4dGVuZCh0YXJnZXRbcHJvcGVydHldIHx8IHt9LCBleHRlbnNpb25zW3Byb3BlcnR5XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0YXJnZXRbcHJvcGVydHldID0gZXh0ZW5zaW9uc1twcm9wZXJ0eV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRhcmdldDtcbn1cbmZ1bmN0aW9uIHN0cmluZ2lmeSgpIHtcbiAgICB2YXIgbSA9IFsnUHVzaGVyJ107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHR5cGVvZiBhcmd1bWVudHNbaV0gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBtLnB1c2goYXJndW1lbnRzW2ldKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG0ucHVzaChzYWZlSlNPTlN0cmluZ2lmeShhcmd1bWVudHNbaV0pKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbS5qb2luKCcgOiAnKTtcbn1cbmZ1bmN0aW9uIGFycmF5SW5kZXhPZihhcnJheSwgaXRlbSkge1xuICAgIHZhciBuYXRpdmVJbmRleE9mID0gQXJyYXkucHJvdG90eXBlLmluZGV4T2Y7XG4gICAgaWYgKGFycmF5ID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiAtMTtcbiAgICB9XG4gICAgaWYgKG5hdGl2ZUluZGV4T2YgJiYgYXJyYXkuaW5kZXhPZiA9PT0gbmF0aXZlSW5kZXhPZikge1xuICAgICAgICByZXR1cm4gYXJyYXkuaW5kZXhPZihpdGVtKTtcbiAgICB9XG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBhcnJheS5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgaWYgKGFycmF5W2ldID09PSBpdGVtKSB7XG4gICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gLTE7XG59XG5mdW5jdGlvbiBvYmplY3RBcHBseShvYmplY3QsIGYpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSB7XG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBrZXkpKSB7XG4gICAgICAgICAgICBmKG9iamVjdFtrZXldLCBrZXksIG9iamVjdCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5mdW5jdGlvbiBrZXlzKG9iamVjdCkge1xuICAgIHZhciBrZXlzID0gW107XG4gICAgb2JqZWN0QXBwbHkob2JqZWN0LCBmdW5jdGlvbiAoXywga2V5KSB7XG4gICAgICAgIGtleXMucHVzaChrZXkpO1xuICAgIH0pO1xuICAgIHJldHVybiBrZXlzO1xufVxuZnVuY3Rpb24gdmFsdWVzKG9iamVjdCkge1xuICAgIHZhciB2YWx1ZXMgPSBbXTtcbiAgICBvYmplY3RBcHBseShvYmplY3QsIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICB2YWx1ZXMucHVzaCh2YWx1ZSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHZhbHVlcztcbn1cbmZ1bmN0aW9uIGFwcGx5KGFycmF5LCBmLCBjb250ZXh0KSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICBmLmNhbGwoY29udGV4dCB8fCB3aW5kb3csIGFycmF5W2ldLCBpLCBhcnJheSk7XG4gICAgfVxufVxuZnVuY3Rpb24gbWFwKGFycmF5LCBmKSB7XG4gICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcmVzdWx0LnB1c2goZihhcnJheVtpXSwgaSwgYXJyYXksIHJlc3VsdCkpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gbWFwT2JqZWN0KG9iamVjdCwgZikge1xuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICBvYmplY3RBcHBseShvYmplY3QsIGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG4gICAgICAgIHJlc3VsdFtrZXldID0gZih2YWx1ZSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIGZpbHRlcihhcnJheSwgdGVzdCkge1xuICAgIHRlc3QgPVxuICAgICAgICB0ZXN0IHx8XG4gICAgICAgICAgICBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gISF2YWx1ZTtcbiAgICAgICAgICAgIH07XG4gICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHRlc3QoYXJyYXlbaV0sIGksIGFycmF5LCByZXN1bHQpKSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaChhcnJheVtpXSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIGZpbHRlck9iamVjdChvYmplY3QsIHRlc3QpIHtcbiAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgb2JqZWN0QXBwbHkob2JqZWN0LCBmdW5jdGlvbiAodmFsdWUsIGtleSkge1xuICAgICAgICBpZiAoKHRlc3QgJiYgdGVzdCh2YWx1ZSwga2V5LCBvYmplY3QsIHJlc3VsdCkpIHx8IEJvb2xlYW4odmFsdWUpKSB7XG4gICAgICAgICAgICByZXN1bHRba2V5XSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIGZsYXR0ZW4ob2JqZWN0KSB7XG4gICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgIG9iamVjdEFwcGx5KG9iamVjdCwgZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcbiAgICAgICAgcmVzdWx0LnB1c2goW2tleSwgdmFsdWVdKTtcbiAgICB9KTtcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gYW55KGFycmF5LCB0ZXN0KSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAodGVzdChhcnJheVtpXSwgaSwgYXJyYXkpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59XG5mdW5jdGlvbiBjb2xsZWN0aW9uc19hbGwoYXJyYXksIHRlc3QpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICghdGVzdChhcnJheVtpXSwgaSwgYXJyYXkpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG59XG5mdW5jdGlvbiBlbmNvZGVQYXJhbXNPYmplY3QoZGF0YSkge1xuICAgIHJldHVybiBtYXBPYmplY3QoZGF0YSwgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IHNhZmVKU09OU3RyaW5naWZ5KHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KGVuY29kZSh2YWx1ZS50b1N0cmluZygpKSk7XG4gICAgfSk7XG59XG5mdW5jdGlvbiBidWlsZFF1ZXJ5U3RyaW5nKGRhdGEpIHtcbiAgICB2YXIgcGFyYW1zID0gZmlsdGVyT2JqZWN0KGRhdGEsIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZDtcbiAgICB9KTtcbiAgICB2YXIgcXVlcnkgPSBtYXAoZmxhdHRlbihlbmNvZGVQYXJhbXNPYmplY3QocGFyYW1zKSksIHV0aWwubWV0aG9kKCdqb2luJywgJz0nKSkuam9pbignJicpO1xuICAgIHJldHVybiBxdWVyeTtcbn1cbmZ1bmN0aW9uIGRlY3ljbGVPYmplY3Qob2JqZWN0KSB7XG4gICAgdmFyIG9iamVjdHMgPSBbXSwgcGF0aHMgPSBbXTtcbiAgICByZXR1cm4gKGZ1bmN0aW9uIGRlcmV6KHZhbHVlLCBwYXRoKSB7XG4gICAgICAgIHZhciBpLCBuYW1lLCBudTtcbiAgICAgICAgc3dpdGNoICh0eXBlb2YgdmFsdWUpIHtcbiAgICAgICAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgICAgICAgICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IG9iamVjdHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9iamVjdHNbaV0gPT09IHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geyAkcmVmOiBwYXRoc1tpXSB9O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG9iamVjdHMucHVzaCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgcGF0aHMucHVzaChwYXRoKTtcbiAgICAgICAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5hcHBseSh2YWx1ZSkgPT09ICdbb2JqZWN0IEFycmF5XScpIHtcbiAgICAgICAgICAgICAgICAgICAgbnUgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IHZhbHVlLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBudVtpXSA9IGRlcmV6KHZhbHVlW2ldLCBwYXRoICsgJ1snICsgaSArICddJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG51ID0ge307XG4gICAgICAgICAgICAgICAgICAgIGZvciAobmFtZSBpbiB2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwgbmFtZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBudVtuYW1lXSA9IGRlcmV6KHZhbHVlW25hbWVdLCBwYXRoICsgJ1snICsgSlNPTi5zdHJpbmdpZnkobmFtZSkgKyAnXScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBudTtcbiAgICAgICAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICAgICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG4gICAgfSkob2JqZWN0LCAnJCcpO1xufVxuZnVuY3Rpb24gc2FmZUpTT05TdHJpbmdpZnkoc291cmNlKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHNvdXJjZSk7XG4gICAgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShkZWN5Y2xlT2JqZWN0KHNvdXJjZSkpO1xuICAgIH1cbn1cblxuLy8gQ09OQ0FURU5BVEVEIE1PRFVMRTogLi9zcmMvY29yZS9sb2dnZXIudHNcblxuXG5jbGFzcyBsb2dnZXJfTG9nZ2VyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5nbG9iYWxMb2cgPSAobWVzc2FnZSkgPT4ge1xuICAgICAgICAgICAgaWYgKHdpbmRvdy5jb25zb2xlICYmIHdpbmRvdy5jb25zb2xlLmxvZykge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5jb25zb2xlLmxvZyhtZXNzYWdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG4gICAgZGVidWcoLi4uYXJncykge1xuICAgICAgICB0aGlzLmxvZyh0aGlzLmdsb2JhbExvZywgYXJncyk7XG4gICAgfVxuICAgIHdhcm4oLi4uYXJncykge1xuICAgICAgICB0aGlzLmxvZyh0aGlzLmdsb2JhbExvZ1dhcm4sIGFyZ3MpO1xuICAgIH1cbiAgICBlcnJvciguLi5hcmdzKSB7XG4gICAgICAgIHRoaXMubG9nKHRoaXMuZ2xvYmFsTG9nRXJyb3IsIGFyZ3MpO1xuICAgIH1cbiAgICBnbG9iYWxMb2dXYXJuKG1lc3NhZ2UpIHtcbiAgICAgICAgaWYgKHdpbmRvdy5jb25zb2xlICYmIHdpbmRvdy5jb25zb2xlLndhcm4pIHtcbiAgICAgICAgICAgIHdpbmRvdy5jb25zb2xlLndhcm4obWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmdsb2JhbExvZyhtZXNzYWdlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnbG9iYWxMb2dFcnJvcihtZXNzYWdlKSB7XG4gICAgICAgIGlmICh3aW5kb3cuY29uc29sZSAmJiB3aW5kb3cuY29uc29sZS5lcnJvcikge1xuICAgICAgICAgICAgd2luZG93LmNvbnNvbGUuZXJyb3IobWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmdsb2JhbExvZ1dhcm4obWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgbG9nKGRlZmF1bHRMb2dnaW5nRnVuY3Rpb24sIC4uLmFyZ3MpIHtcbiAgICAgICAgdmFyIG1lc3NhZ2UgPSBzdHJpbmdpZnkuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgaWYgKGNvcmVfcHVzaGVyLmxvZykge1xuICAgICAgICAgICAgY29yZV9wdXNoZXIubG9nKG1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGNvcmVfcHVzaGVyLmxvZ1RvQ29uc29sZSkge1xuICAgICAgICAgICAgY29uc3QgbG9nID0gZGVmYXVsdExvZ2dpbmdGdW5jdGlvbi5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgbG9nKG1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgfVxufVxuLyogaGFybW9ueSBkZWZhdWx0IGV4cG9ydCAqLyB2YXIgbG9nZ2VyID0gKG5ldyBsb2dnZXJfTG9nZ2VyKCkpO1xuXG4vLyBDT05DQVRFTkFURUQgTU9EVUxFOiAuL3NyYy9ydW50aW1lcy93ZWIvYXV0aC9qc29ucF9hdXRoLnRzXG5cbnZhciBqc29ucCA9IGZ1bmN0aW9uIChjb250ZXh0LCBxdWVyeSwgYXV0aE9wdGlvbnMsIGF1dGhSZXF1ZXN0VHlwZSwgY2FsbGJhY2spIHtcbiAgICBpZiAoYXV0aE9wdGlvbnMuaGVhZGVycyAhPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgIGF1dGhPcHRpb25zLmhlYWRlcnNQcm92aWRlciAhPSBudWxsKSB7XG4gICAgICAgIGxvZ2dlci53YXJuKGBUbyBzZW5kIGhlYWRlcnMgd2l0aCB0aGUgJHthdXRoUmVxdWVzdFR5cGUudG9TdHJpbmcoKX0gcmVxdWVzdCwgeW91IG11c3QgdXNlIEFKQVgsIHJhdGhlciB0aGFuIEpTT05QLmApO1xuICAgIH1cbiAgICB2YXIgY2FsbGJhY2tOYW1lID0gY29udGV4dC5uZXh0QXV0aENhbGxiYWNrSUQudG9TdHJpbmcoKTtcbiAgICBjb250ZXh0Lm5leHRBdXRoQ2FsbGJhY2tJRCsrO1xuICAgIHZhciBkb2N1bWVudCA9IGNvbnRleHQuZ2V0RG9jdW1lbnQoKTtcbiAgICB2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgY29udGV4dC5hdXRoX2NhbGxiYWNrc1tjYWxsYmFja05hbWVdID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgY2FsbGJhY2sobnVsbCwgZGF0YSk7XG4gICAgfTtcbiAgICB2YXIgY2FsbGJhY2tfbmFtZSA9IFwiUHVzaGVyLmF1dGhfY2FsbGJhY2tzWydcIiArIGNhbGxiYWNrTmFtZSArIFwiJ11cIjtcbiAgICBzY3JpcHQuc3JjID1cbiAgICAgICAgYXV0aE9wdGlvbnMuZW5kcG9pbnQgK1xuICAgICAgICAgICAgJz9jYWxsYmFjaz0nICtcbiAgICAgICAgICAgIGVuY29kZVVSSUNvbXBvbmVudChjYWxsYmFja19uYW1lKSArXG4gICAgICAgICAgICAnJicgK1xuICAgICAgICAgICAgcXVlcnk7XG4gICAgdmFyIGhlYWQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgICBoZWFkLmluc2VydEJlZm9yZShzY3JpcHQsIGhlYWQuZmlyc3RDaGlsZCk7XG59O1xuLyogaGFybW9ueSBkZWZhdWx0IGV4cG9ydCAqLyB2YXIganNvbnBfYXV0aCA9IChqc29ucCk7XG5cbi8vIENPTkNBVEVOQVRFRCBNT0RVTEU6IC4vc3JjL3J1bnRpbWVzL3dlYi9kb20vc2NyaXB0X3JlcXVlc3QudHNcbmNsYXNzIFNjcmlwdFJlcXVlc3Qge1xuICAgIGNvbnN0cnVjdG9yKHNyYykge1xuICAgICAgICB0aGlzLnNyYyA9IHNyYztcbiAgICB9XG4gICAgc2VuZChyZWNlaXZlcikge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciBlcnJvclN0cmluZyA9ICdFcnJvciBsb2FkaW5nICcgKyBzZWxmLnNyYztcbiAgICAgICAgc2VsZi5zY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICAgICAgc2VsZi5zY3JpcHQuaWQgPSByZWNlaXZlci5pZDtcbiAgICAgICAgc2VsZi5zY3JpcHQuc3JjID0gc2VsZi5zcmM7XG4gICAgICAgIHNlbGYuc2NyaXB0LnR5cGUgPSAndGV4dC9qYXZhc2NyaXB0JztcbiAgICAgICAgc2VsZi5zY3JpcHQuY2hhcnNldCA9ICdVVEYtOCc7XG4gICAgICAgIGlmIChzZWxmLnNjcmlwdC5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgICAgICAgICBzZWxmLnNjcmlwdC5vbmVycm9yID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJlY2VpdmVyLmNhbGxiYWNrKGVycm9yU3RyaW5nKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBzZWxmLnNjcmlwdC5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmVjZWl2ZXIuY2FsbGJhY2sobnVsbCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc2VsZi5zY3JpcHQub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmIChzZWxmLnNjcmlwdC5yZWFkeVN0YXRlID09PSAnbG9hZGVkJyB8fFxuICAgICAgICAgICAgICAgICAgICBzZWxmLnNjcmlwdC5yZWFkeVN0YXRlID09PSAnY29tcGxldGUnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlY2VpdmVyLmNhbGxiYWNrKG51bGwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNlbGYuc2NyaXB0LmFzeW5jID09PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICAgIGRvY3VtZW50LmF0dGFjaEV2ZW50ICYmXG4gICAgICAgICAgICAvb3BlcmEvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpKSB7XG4gICAgICAgICAgICBzZWxmLmVycm9yU2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgICAgICAgICBzZWxmLmVycm9yU2NyaXB0LmlkID0gcmVjZWl2ZXIuaWQgKyAnX2Vycm9yJztcbiAgICAgICAgICAgIHNlbGYuZXJyb3JTY3JpcHQudGV4dCA9IHJlY2VpdmVyLm5hbWUgKyBcIignXCIgKyBlcnJvclN0cmluZyArIFwiJyk7XCI7XG4gICAgICAgICAgICBzZWxmLnNjcmlwdC5hc3luYyA9IHNlbGYuZXJyb3JTY3JpcHQuYXN5bmMgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHNlbGYuc2NyaXB0LmFzeW5jID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgaGVhZCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07XG4gICAgICAgIGhlYWQuaW5zZXJ0QmVmb3JlKHNlbGYuc2NyaXB0LCBoZWFkLmZpcnN0Q2hpbGQpO1xuICAgICAgICBpZiAoc2VsZi5lcnJvclNjcmlwdCkge1xuICAgICAgICAgICAgaGVhZC5pbnNlcnRCZWZvcmUoc2VsZi5lcnJvclNjcmlwdCwgc2VsZi5zY3JpcHQubmV4dFNpYmxpbmcpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNsZWFudXAoKSB7XG4gICAgICAgIGlmICh0aGlzLnNjcmlwdCkge1xuICAgICAgICAgICAgdGhpcy5zY3JpcHQub25sb2FkID0gdGhpcy5zY3JpcHQub25lcnJvciA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLnNjcmlwdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnNjcmlwdCAmJiB0aGlzLnNjcmlwdC5wYXJlbnROb2RlKSB7XG4gICAgICAgICAgICB0aGlzLnNjcmlwdC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuc2NyaXB0KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5lcnJvclNjcmlwdCAmJiB0aGlzLmVycm9yU2NyaXB0LnBhcmVudE5vZGUpIHtcbiAgICAgICAgICAgIHRoaXMuZXJyb3JTY3JpcHQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLmVycm9yU2NyaXB0KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNjcmlwdCA9IG51bGw7XG4gICAgICAgIHRoaXMuZXJyb3JTY3JpcHQgPSBudWxsO1xuICAgIH1cbn1cblxuLy8gQ09OQ0FURU5BVEVEIE1PRFVMRTogLi9zcmMvcnVudGltZXMvd2ViL2RvbS9qc29ucF9yZXF1ZXN0LnRzXG5cblxuY2xhc3MganNvbnBfcmVxdWVzdF9KU09OUFJlcXVlc3Qge1xuICAgIGNvbnN0cnVjdG9yKHVybCwgZGF0YSkge1xuICAgICAgICB0aGlzLnVybCA9IHVybDtcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgICB9XG4gICAgc2VuZChyZWNlaXZlcikge1xuICAgICAgICBpZiAodGhpcy5yZXF1ZXN0KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHF1ZXJ5ID0gYnVpbGRRdWVyeVN0cmluZyh0aGlzLmRhdGEpO1xuICAgICAgICB2YXIgdXJsID0gdGhpcy51cmwgKyAnLycgKyByZWNlaXZlci5udW1iZXIgKyAnPycgKyBxdWVyeTtcbiAgICAgICAgdGhpcy5yZXF1ZXN0ID0gcnVudGltZS5jcmVhdGVTY3JpcHRSZXF1ZXN0KHVybCk7XG4gICAgICAgIHRoaXMucmVxdWVzdC5zZW5kKHJlY2VpdmVyKTtcbiAgICB9XG4gICAgY2xlYW51cCgpIHtcbiAgICAgICAgaWYgKHRoaXMucmVxdWVzdCkge1xuICAgICAgICAgICAgdGhpcy5yZXF1ZXN0LmNsZWFudXAoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLy8gQ09OQ0FURU5BVEVEIE1PRFVMRTogLi9zcmMvcnVudGltZXMvd2ViL3RpbWVsaW5lL2pzb25wX3RpbWVsaW5lLnRzXG5cblxudmFyIGdldEFnZW50ID0gZnVuY3Rpb24gKHNlbmRlciwgdXNlVExTKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkYXRhLCBjYWxsYmFjaykge1xuICAgICAgICB2YXIgc2NoZW1lID0gJ2h0dHAnICsgKHVzZVRMUyA/ICdzJyA6ICcnKSArICc6Ly8nO1xuICAgICAgICB2YXIgdXJsID0gc2NoZW1lICsgKHNlbmRlci5ob3N0IHx8IHNlbmRlci5vcHRpb25zLmhvc3QpICsgc2VuZGVyLm9wdGlvbnMucGF0aDtcbiAgICAgICAgdmFyIHJlcXVlc3QgPSBydW50aW1lLmNyZWF0ZUpTT05QUmVxdWVzdCh1cmwsIGRhdGEpO1xuICAgICAgICB2YXIgcmVjZWl2ZXIgPSBydW50aW1lLlNjcmlwdFJlY2VpdmVycy5jcmVhdGUoZnVuY3Rpb24gKGVycm9yLCByZXN1bHQpIHtcbiAgICAgICAgICAgIFNjcmlwdFJlY2VpdmVycy5yZW1vdmUocmVjZWl2ZXIpO1xuICAgICAgICAgICAgcmVxdWVzdC5jbGVhbnVwKCk7XG4gICAgICAgICAgICBpZiAocmVzdWx0ICYmIHJlc3VsdC5ob3N0KSB7XG4gICAgICAgICAgICAgICAgc2VuZGVyLmhvc3QgPSByZXN1bHQuaG9zdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKGVycm9yLCByZXN1bHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmVxdWVzdC5zZW5kKHJlY2VpdmVyKTtcbiAgICB9O1xufTtcbnZhciBqc29ucF90aW1lbGluZV9qc29ucCA9IHtcbiAgICBuYW1lOiAnanNvbnAnLFxuICAgIGdldEFnZW50XG59O1xuLyogaGFybW9ueSBkZWZhdWx0IGV4cG9ydCAqLyB2YXIganNvbnBfdGltZWxpbmUgPSAoanNvbnBfdGltZWxpbmVfanNvbnApO1xuXG4vLyBDT05DQVRFTkFURUQgTU9EVUxFOiAuL3NyYy9jb3JlL3RyYW5zcG9ydHMvdXJsX3NjaGVtZXMudHNcblxuZnVuY3Rpb24gZ2V0R2VuZXJpY1VSTChiYXNlU2NoZW1lLCBwYXJhbXMsIHBhdGgpIHtcbiAgICB2YXIgc2NoZW1lID0gYmFzZVNjaGVtZSArIChwYXJhbXMudXNlVExTID8gJ3MnIDogJycpO1xuICAgIHZhciBob3N0ID0gcGFyYW1zLnVzZVRMUyA/IHBhcmFtcy5ob3N0VExTIDogcGFyYW1zLmhvc3ROb25UTFM7XG4gICAgcmV0dXJuIHNjaGVtZSArICc6Ly8nICsgaG9zdCArIHBhdGg7XG59XG5mdW5jdGlvbiBnZXRHZW5lcmljUGF0aChrZXksIHF1ZXJ5U3RyaW5nKSB7XG4gICAgdmFyIHBhdGggPSAnL2FwcC8nICsga2V5O1xuICAgIHZhciBxdWVyeSA9ICc/cHJvdG9jb2w9JyArXG4gICAgICAgIGRlZmF1bHRzLlBST1RPQ09MICtcbiAgICAgICAgJyZjbGllbnQ9anMnICtcbiAgICAgICAgJyZ2ZXJzaW9uPScgK1xuICAgICAgICBkZWZhdWx0cy5WRVJTSU9OICtcbiAgICAgICAgKHF1ZXJ5U3RyaW5nID8gJyYnICsgcXVlcnlTdHJpbmcgOiAnJyk7XG4gICAgcmV0dXJuIHBhdGggKyBxdWVyeTtcbn1cbnZhciB3cyA9IHtcbiAgICBnZXRJbml0aWFsOiBmdW5jdGlvbiAoa2V5LCBwYXJhbXMpIHtcbiAgICAgICAgdmFyIHBhdGggPSAocGFyYW1zLmh0dHBQYXRoIHx8ICcnKSArIGdldEdlbmVyaWNQYXRoKGtleSwgJ2ZsYXNoPWZhbHNlJyk7XG4gICAgICAgIHJldHVybiBnZXRHZW5lcmljVVJMKCd3cycsIHBhcmFtcywgcGF0aCk7XG4gICAgfVxufTtcbnZhciBodHRwID0ge1xuICAgIGdldEluaXRpYWw6IGZ1bmN0aW9uIChrZXksIHBhcmFtcykge1xuICAgICAgICB2YXIgcGF0aCA9IChwYXJhbXMuaHR0cFBhdGggfHwgJy9wdXNoZXInKSArIGdldEdlbmVyaWNQYXRoKGtleSk7XG4gICAgICAgIHJldHVybiBnZXRHZW5lcmljVVJMKCdodHRwJywgcGFyYW1zLCBwYXRoKTtcbiAgICB9XG59O1xudmFyIHNvY2tqcyA9IHtcbiAgICBnZXRJbml0aWFsOiBmdW5jdGlvbiAoa2V5LCBwYXJhbXMpIHtcbiAgICAgICAgcmV0dXJuIGdldEdlbmVyaWNVUkwoJ2h0dHAnLCBwYXJhbXMsIHBhcmFtcy5odHRwUGF0aCB8fCAnL3B1c2hlcicpO1xuICAgIH0sXG4gICAgZ2V0UGF0aDogZnVuY3Rpb24gKGtleSwgcGFyYW1zKSB7XG4gICAgICAgIHJldHVybiBnZXRHZW5lcmljUGF0aChrZXkpO1xuICAgIH1cbn07XG5cbi8vIENPTkNBVEVOQVRFRCBNT0RVTEU6IC4vc3JjL2NvcmUvZXZlbnRzL2NhbGxiYWNrX3JlZ2lzdHJ5LnRzXG5cbmNsYXNzIGNhbGxiYWNrX3JlZ2lzdHJ5X0NhbGxiYWNrUmVnaXN0cnkge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLl9jYWxsYmFja3MgPSB7fTtcbiAgICB9XG4gICAgZ2V0KG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NhbGxiYWNrc1twcmVmaXgobmFtZSldO1xuICAgIH1cbiAgICBhZGQobmFtZSwgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICAgICAgdmFyIHByZWZpeGVkRXZlbnROYW1lID0gcHJlZml4KG5hbWUpO1xuICAgICAgICB0aGlzLl9jYWxsYmFja3NbcHJlZml4ZWRFdmVudE5hbWVdID1cbiAgICAgICAgICAgIHRoaXMuX2NhbGxiYWNrc1twcmVmaXhlZEV2ZW50TmFtZV0gfHwgW107XG4gICAgICAgIHRoaXMuX2NhbGxiYWNrc1twcmVmaXhlZEV2ZW50TmFtZV0ucHVzaCh7XG4gICAgICAgICAgICBmbjogY2FsbGJhY2ssXG4gICAgICAgICAgICBjb250ZXh0OiBjb250ZXh0XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZW1vdmUobmFtZSwgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICAgICAgaWYgKCFuYW1lICYmICFjYWxsYmFjayAmJiAhY29udGV4dCkge1xuICAgICAgICAgICAgdGhpcy5fY2FsbGJhY2tzID0ge307XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG5hbWVzID0gbmFtZSA/IFtwcmVmaXgobmFtZSldIDoga2V5cyh0aGlzLl9jYWxsYmFja3MpO1xuICAgICAgICBpZiAoY2FsbGJhY2sgfHwgY29udGV4dCkge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVDYWxsYmFjayhuYW1lcywgY2FsbGJhY2ssIGNvbnRleHQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVBbGxDYWxsYmFja3MobmFtZXMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlbW92ZUNhbGxiYWNrKG5hbWVzLCBjYWxsYmFjaywgY29udGV4dCkge1xuICAgICAgICBhcHBseShuYW1lcywgZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgICAgIHRoaXMuX2NhbGxiYWNrc1tuYW1lXSA9IGZpbHRlcih0aGlzLl9jYWxsYmFja3NbbmFtZV0gfHwgW10sIGZ1bmN0aW9uIChiaW5kaW5nKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICgoY2FsbGJhY2sgJiYgY2FsbGJhY2sgIT09IGJpbmRpbmcuZm4pIHx8XG4gICAgICAgICAgICAgICAgICAgIChjb250ZXh0ICYmIGNvbnRleHQgIT09IGJpbmRpbmcuY29udGV4dCkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAodGhpcy5fY2FsbGJhY2tzW25hbWVdLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9jYWxsYmFja3NbbmFtZV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHRoaXMpO1xuICAgIH1cbiAgICByZW1vdmVBbGxDYWxsYmFja3MobmFtZXMpIHtcbiAgICAgICAgYXBwbHkobmFtZXMsIGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5fY2FsbGJhY2tzW25hbWVdO1xuICAgICAgICB9LCB0aGlzKTtcbiAgICB9XG59XG5mdW5jdGlvbiBwcmVmaXgobmFtZSkge1xuICAgIHJldHVybiAnXycgKyBuYW1lO1xufVxuXG4vLyBDT05DQVRFTkFURUQgTU9EVUxFOiAuL3NyYy9jb3JlL2V2ZW50cy9kaXNwYXRjaGVyLnRzXG5cblxuY2xhc3MgZGlzcGF0Y2hlcl9EaXNwYXRjaGVyIHtcbiAgICBjb25zdHJ1Y3RvcihmYWlsVGhyb3VnaCkge1xuICAgICAgICB0aGlzLmNhbGxiYWNrcyA9IG5ldyBjYWxsYmFja19yZWdpc3RyeV9DYWxsYmFja1JlZ2lzdHJ5KCk7XG4gICAgICAgIHRoaXMuZ2xvYmFsX2NhbGxiYWNrcyA9IFtdO1xuICAgICAgICB0aGlzLmZhaWxUaHJvdWdoID0gZmFpbFRocm91Z2g7XG4gICAgfVxuICAgIGJpbmQoZXZlbnROYW1lLCBjYWxsYmFjaywgY29udGV4dCkge1xuICAgICAgICB0aGlzLmNhbGxiYWNrcy5hZGQoZXZlbnROYW1lLCBjYWxsYmFjaywgY29udGV4dCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBiaW5kX2dsb2JhbChjYWxsYmFjaykge1xuICAgICAgICB0aGlzLmdsb2JhbF9jYWxsYmFja3MucHVzaChjYWxsYmFjayk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICB1bmJpbmQoZXZlbnROYW1lLCBjYWxsYmFjaywgY29udGV4dCkge1xuICAgICAgICB0aGlzLmNhbGxiYWNrcy5yZW1vdmUoZXZlbnROYW1lLCBjYWxsYmFjaywgY29udGV4dCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICB1bmJpbmRfZ2xvYmFsKGNhbGxiYWNrKSB7XG4gICAgICAgIGlmICghY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHRoaXMuZ2xvYmFsX2NhbGxiYWNrcyA9IFtdO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5nbG9iYWxfY2FsbGJhY2tzID0gZmlsdGVyKHRoaXMuZ2xvYmFsX2NhbGxiYWNrcyB8fCBbXSwgYyA9PiBjICE9PSBjYWxsYmFjayk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICB1bmJpbmRfYWxsKCkge1xuICAgICAgICB0aGlzLnVuYmluZCgpO1xuICAgICAgICB0aGlzLnVuYmluZF9nbG9iYWwoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGVtaXQoZXZlbnROYW1lLCBkYXRhLCBtZXRhZGF0YSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZ2xvYmFsX2NhbGxiYWNrcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5nbG9iYWxfY2FsbGJhY2tzW2ldKGV2ZW50TmFtZSwgZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGNhbGxiYWNrcyA9IHRoaXMuY2FsbGJhY2tzLmdldChldmVudE5hbWUpO1xuICAgICAgICB2YXIgYXJncyA9IFtdO1xuICAgICAgICBpZiAobWV0YWRhdGEpIHtcbiAgICAgICAgICAgIGFyZ3MucHVzaChkYXRhLCBtZXRhZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZGF0YSkge1xuICAgICAgICAgICAgYXJncy5wdXNoKGRhdGEpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjYWxsYmFja3MgJiYgY2FsbGJhY2tzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2FsbGJhY2tzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2tzW2ldLmZuLmFwcGx5KGNhbGxiYWNrc1tpXS5jb250ZXh0IHx8IHdpbmRvdywgYXJncyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5mYWlsVGhyb3VnaCkge1xuICAgICAgICAgICAgdGhpcy5mYWlsVGhyb3VnaChldmVudE5hbWUsIGRhdGEpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn1cblxuLy8gQ09OQ0FURU5BVEVEIE1PRFVMRTogLi9zcmMvY29yZS90cmFuc3BvcnRzL3RyYW5zcG9ydF9jb25uZWN0aW9uLnRzXG5cblxuXG5cblxuY2xhc3MgdHJhbnNwb3J0X2Nvbm5lY3Rpb25fVHJhbnNwb3J0Q29ubmVjdGlvbiBleHRlbmRzIGRpc3BhdGNoZXJfRGlzcGF0Y2hlciB7XG4gICAgY29uc3RydWN0b3IoaG9va3MsIG5hbWUsIHByaW9yaXR5LCBrZXksIG9wdGlvbnMpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplID0gcnVudGltZS50cmFuc3BvcnRDb25uZWN0aW9uSW5pdGlhbGl6ZXI7XG4gICAgICAgIHRoaXMuaG9va3MgPSBob29rcztcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5wcmlvcml0eSA9IHByaW9yaXR5O1xuICAgICAgICB0aGlzLmtleSA9IGtleTtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICAgICAgdGhpcy5zdGF0ZSA9ICduZXcnO1xuICAgICAgICB0aGlzLnRpbWVsaW5lID0gb3B0aW9ucy50aW1lbGluZTtcbiAgICAgICAgdGhpcy5hY3Rpdml0eVRpbWVvdXQgPSBvcHRpb25zLmFjdGl2aXR5VGltZW91dDtcbiAgICAgICAgdGhpcy5pZCA9IHRoaXMudGltZWxpbmUuZ2VuZXJhdGVVbmlxdWVJRCgpO1xuICAgIH1cbiAgICBoYW5kbGVzQWN0aXZpdHlDaGVja3MoKSB7XG4gICAgICAgIHJldHVybiBCb29sZWFuKHRoaXMuaG9va3MuaGFuZGxlc0FjdGl2aXR5Q2hlY2tzKTtcbiAgICB9XG4gICAgc3VwcG9ydHNQaW5nKCkge1xuICAgICAgICByZXR1cm4gQm9vbGVhbih0aGlzLmhvb2tzLnN1cHBvcnRzUGluZyk7XG4gICAgfVxuICAgIGNvbm5lY3QoKSB7XG4gICAgICAgIGlmICh0aGlzLnNvY2tldCB8fCB0aGlzLnN0YXRlICE9PSAnaW5pdGlhbGl6ZWQnKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHVybCA9IHRoaXMuaG9va3MudXJscy5nZXRJbml0aWFsKHRoaXMua2V5LCB0aGlzLm9wdGlvbnMpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhpcy5zb2NrZXQgPSB0aGlzLmhvb2tzLmdldFNvY2tldCh1cmwsIHRoaXMub3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHV0aWwuZGVmZXIoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMub25FcnJvcihlKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZVN0YXRlKCdjbG9zZWQnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYmluZExpc3RlbmVycygpO1xuICAgICAgICBsb2dnZXIuZGVidWcoJ0Nvbm5lY3RpbmcnLCB7IHRyYW5zcG9ydDogdGhpcy5uYW1lLCB1cmwgfSk7XG4gICAgICAgIHRoaXMuY2hhbmdlU3RhdGUoJ2Nvbm5lY3RpbmcnKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGNsb3NlKCkge1xuICAgICAgICBpZiAodGhpcy5zb2NrZXQpIHtcbiAgICAgICAgICAgIHRoaXMuc29ja2V0LmNsb3NlKCk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzZW5kKGRhdGEpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUgPT09ICdvcGVuJykge1xuICAgICAgICAgICAgdXRpbC5kZWZlcigoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc29ja2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc29ja2V0LnNlbmQoZGF0YSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBwaW5nKCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZSA9PT0gJ29wZW4nICYmIHRoaXMuc3VwcG9ydHNQaW5nKCkpIHtcbiAgICAgICAgICAgIHRoaXMuc29ja2V0LnBpbmcoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBvbk9wZW4oKSB7XG4gICAgICAgIGlmICh0aGlzLmhvb2tzLmJlZm9yZU9wZW4pIHtcbiAgICAgICAgICAgIHRoaXMuaG9va3MuYmVmb3JlT3Blbih0aGlzLnNvY2tldCwgdGhpcy5ob29rcy51cmxzLmdldFBhdGgodGhpcy5rZXksIHRoaXMub3B0aW9ucykpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2hhbmdlU3RhdGUoJ29wZW4nKTtcbiAgICAgICAgdGhpcy5zb2NrZXQub25vcGVuID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBvbkVycm9yKGVycm9yKSB7XG4gICAgICAgIHRoaXMuZW1pdCgnZXJyb3InLCB7IHR5cGU6ICdXZWJTb2NrZXRFcnJvcicsIGVycm9yOiBlcnJvciB9KTtcbiAgICAgICAgdGhpcy50aW1lbGluZS5lcnJvcih0aGlzLmJ1aWxkVGltZWxpbmVNZXNzYWdlKHsgZXJyb3I6IGVycm9yLnRvU3RyaW5nKCkgfSkpO1xuICAgIH1cbiAgICBvbkNsb3NlKGNsb3NlRXZlbnQpIHtcbiAgICAgICAgaWYgKGNsb3NlRXZlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlU3RhdGUoJ2Nsb3NlZCcsIHtcbiAgICAgICAgICAgICAgICBjb2RlOiBjbG9zZUV2ZW50LmNvZGUsXG4gICAgICAgICAgICAgICAgcmVhc29uOiBjbG9zZUV2ZW50LnJlYXNvbixcbiAgICAgICAgICAgICAgICB3YXNDbGVhbjogY2xvc2VFdmVudC53YXNDbGVhblxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZVN0YXRlKCdjbG9zZWQnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnVuYmluZExpc3RlbmVycygpO1xuICAgICAgICB0aGlzLnNvY2tldCA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgb25NZXNzYWdlKG1lc3NhZ2UpIHtcbiAgICAgICAgdGhpcy5lbWl0KCdtZXNzYWdlJywgbWVzc2FnZSk7XG4gICAgfVxuICAgIG9uQWN0aXZpdHkoKSB7XG4gICAgICAgIHRoaXMuZW1pdCgnYWN0aXZpdHknKTtcbiAgICB9XG4gICAgYmluZExpc3RlbmVycygpIHtcbiAgICAgICAgdGhpcy5zb2NrZXQub25vcGVuID0gKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5vbk9wZW4oKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zb2NrZXQub25lcnJvciA9IGVycm9yID0+IHtcbiAgICAgICAgICAgIHRoaXMub25FcnJvcihlcnJvcik7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc29ja2V0Lm9uY2xvc2UgPSBjbG9zZUV2ZW50ID0+IHtcbiAgICAgICAgICAgIHRoaXMub25DbG9zZShjbG9zZUV2ZW50KTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zb2NrZXQub25tZXNzYWdlID0gbWVzc2FnZSA9PiB7XG4gICAgICAgICAgICB0aGlzLm9uTWVzc2FnZShtZXNzYWdlKTtcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHRoaXMuc3VwcG9ydHNQaW5nKCkpIHtcbiAgICAgICAgICAgIHRoaXMuc29ja2V0Lm9uYWN0aXZpdHkgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkFjdGl2aXR5KCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxuICAgIHVuYmluZExpc3RlbmVycygpIHtcbiAgICAgICAgaWYgKHRoaXMuc29ja2V0KSB7XG4gICAgICAgICAgICB0aGlzLnNvY2tldC5vbm9wZW4gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB0aGlzLnNvY2tldC5vbmVycm9yID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgdGhpcy5zb2NrZXQub25jbG9zZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIHRoaXMuc29ja2V0Lm9ubWVzc2FnZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGlmICh0aGlzLnN1cHBvcnRzUGluZygpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zb2NrZXQub25hY3Rpdml0eSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBjaGFuZ2VTdGF0ZShzdGF0ZSwgcGFyYW1zKSB7XG4gICAgICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcbiAgICAgICAgdGhpcy50aW1lbGluZS5pbmZvKHRoaXMuYnVpbGRUaW1lbGluZU1lc3NhZ2Uoe1xuICAgICAgICAgICAgc3RhdGU6IHN0YXRlLFxuICAgICAgICAgICAgcGFyYW1zOiBwYXJhbXNcbiAgICAgICAgfSkpO1xuICAgICAgICB0aGlzLmVtaXQoc3RhdGUsIHBhcmFtcyk7XG4gICAgfVxuICAgIGJ1aWxkVGltZWxpbmVNZXNzYWdlKG1lc3NhZ2UpIHtcbiAgICAgICAgcmV0dXJuIGV4dGVuZCh7IGNpZDogdGhpcy5pZCB9LCBtZXNzYWdlKTtcbiAgICB9XG59XG5cbi8vIENPTkNBVEVOQVRFRCBNT0RVTEU6IC4vc3JjL2NvcmUvdHJhbnNwb3J0cy90cmFuc3BvcnQudHNcblxuY2xhc3MgdHJhbnNwb3J0X1RyYW5zcG9ydCB7XG4gICAgY29uc3RydWN0b3IoaG9va3MpIHtcbiAgICAgICAgdGhpcy5ob29rcyA9IGhvb2tzO1xuICAgIH1cbiAgICBpc1N1cHBvcnRlZChlbnZpcm9ubWVudCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ob29rcy5pc1N1cHBvcnRlZChlbnZpcm9ubWVudCk7XG4gICAgfVxuICAgIGNyZWF0ZUNvbm5lY3Rpb24obmFtZSwgcHJpb3JpdHksIGtleSwgb3B0aW9ucykge1xuICAgICAgICByZXR1cm4gbmV3IHRyYW5zcG9ydF9jb25uZWN0aW9uX1RyYW5zcG9ydENvbm5lY3Rpb24odGhpcy5ob29rcywgbmFtZSwgcHJpb3JpdHksIGtleSwgb3B0aW9ucyk7XG4gICAgfVxufVxuXG4vLyBDT05DQVRFTkFURUQgTU9EVUxFOiAuL3NyYy9ydW50aW1lcy9pc29tb3JwaGljL3RyYW5zcG9ydHMvdHJhbnNwb3J0cy50c1xuXG5cblxuXG52YXIgV1NUcmFuc3BvcnQgPSBuZXcgdHJhbnNwb3J0X1RyYW5zcG9ydCh7XG4gICAgdXJsczogd3MsXG4gICAgaGFuZGxlc0FjdGl2aXR5Q2hlY2tzOiBmYWxzZSxcbiAgICBzdXBwb3J0c1Bpbmc6IGZhbHNlLFxuICAgIGlzSW5pdGlhbGl6ZWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIEJvb2xlYW4ocnVudGltZS5nZXRXZWJTb2NrZXRBUEkoKSk7XG4gICAgfSxcbiAgICBpc1N1cHBvcnRlZDogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gQm9vbGVhbihydW50aW1lLmdldFdlYlNvY2tldEFQSSgpKTtcbiAgICB9LFxuICAgIGdldFNvY2tldDogZnVuY3Rpb24gKHVybCkge1xuICAgICAgICByZXR1cm4gcnVudGltZS5jcmVhdGVXZWJTb2NrZXQodXJsKTtcbiAgICB9XG59KTtcbnZhciBodHRwQ29uZmlndXJhdGlvbiA9IHtcbiAgICB1cmxzOiBodHRwLFxuICAgIGhhbmRsZXNBY3Rpdml0eUNoZWNrczogZmFsc2UsXG4gICAgc3VwcG9ydHNQaW5nOiB0cnVlLFxuICAgIGlzSW5pdGlhbGl6ZWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxufTtcbnZhciBzdHJlYW1pbmdDb25maWd1cmF0aW9uID0gZXh0ZW5kKHtcbiAgICBnZXRTb2NrZXQ6IGZ1bmN0aW9uICh1cmwpIHtcbiAgICAgICAgcmV0dXJuIHJ1bnRpbWUuSFRUUEZhY3RvcnkuY3JlYXRlU3RyZWFtaW5nU29ja2V0KHVybCk7XG4gICAgfVxufSwgaHR0cENvbmZpZ3VyYXRpb24pO1xudmFyIHBvbGxpbmdDb25maWd1cmF0aW9uID0gZXh0ZW5kKHtcbiAgICBnZXRTb2NrZXQ6IGZ1bmN0aW9uICh1cmwpIHtcbiAgICAgICAgcmV0dXJuIHJ1bnRpbWUuSFRUUEZhY3RvcnkuY3JlYXRlUG9sbGluZ1NvY2tldCh1cmwpO1xuICAgIH1cbn0sIGh0dHBDb25maWd1cmF0aW9uKTtcbnZhciB4aHJDb25maWd1cmF0aW9uID0ge1xuICAgIGlzU3VwcG9ydGVkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBydW50aW1lLmlzWEhSU3VwcG9ydGVkKCk7XG4gICAgfVxufTtcbnZhciBYSFJTdHJlYW1pbmdUcmFuc3BvcnQgPSBuZXcgdHJhbnNwb3J0X1RyYW5zcG9ydCgoZXh0ZW5kKHt9LCBzdHJlYW1pbmdDb25maWd1cmF0aW9uLCB4aHJDb25maWd1cmF0aW9uKSkpO1xudmFyIFhIUlBvbGxpbmdUcmFuc3BvcnQgPSBuZXcgdHJhbnNwb3J0X1RyYW5zcG9ydChleHRlbmQoe30sIHBvbGxpbmdDb25maWd1cmF0aW9uLCB4aHJDb25maWd1cmF0aW9uKSk7XG52YXIgVHJhbnNwb3J0cyA9IHtcbiAgICB3czogV1NUcmFuc3BvcnQsXG4gICAgeGhyX3N0cmVhbWluZzogWEhSU3RyZWFtaW5nVHJhbnNwb3J0LFxuICAgIHhocl9wb2xsaW5nOiBYSFJQb2xsaW5nVHJhbnNwb3J0XG59O1xuLyogaGFybW9ueSBkZWZhdWx0IGV4cG9ydCAqLyB2YXIgdHJhbnNwb3J0cyA9IChUcmFuc3BvcnRzKTtcblxuLy8gQ09OQ0FURU5BVEVEIE1PRFVMRTogLi9zcmMvcnVudGltZXMvd2ViL3RyYW5zcG9ydHMvdHJhbnNwb3J0cy50c1xuXG5cblxuXG5cblxudmFyIFNvY2tKU1RyYW5zcG9ydCA9IG5ldyB0cmFuc3BvcnRfVHJhbnNwb3J0KHtcbiAgICBmaWxlOiAnc29ja2pzJyxcbiAgICB1cmxzOiBzb2NranMsXG4gICAgaGFuZGxlc0FjdGl2aXR5Q2hlY2tzOiB0cnVlLFxuICAgIHN1cHBvcnRzUGluZzogZmFsc2UsXG4gICAgaXNTdXBwb3J0ZWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcbiAgICBpc0luaXRpYWxpemVkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB3aW5kb3cuU29ja0pTICE9PSB1bmRlZmluZWQ7XG4gICAgfSxcbiAgICBnZXRTb2NrZXQ6IGZ1bmN0aW9uICh1cmwsIG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIG5ldyB3aW5kb3cuU29ja0pTKHVybCwgbnVsbCwge1xuICAgICAgICAgICAganNfcGF0aDogRGVwZW5kZW5jaWVzLmdldFBhdGgoJ3NvY2tqcycsIHtcbiAgICAgICAgICAgICAgICB1c2VUTFM6IG9wdGlvbnMudXNlVExTXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIGlnbm9yZV9udWxsX29yaWdpbjogb3B0aW9ucy5pZ25vcmVOdWxsT3JpZ2luXG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgYmVmb3JlT3BlbjogZnVuY3Rpb24gKHNvY2tldCwgcGF0aCkge1xuICAgICAgICBzb2NrZXQuc2VuZChKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICBwYXRoOiBwYXRoXG4gICAgICAgIH0pKTtcbiAgICB9XG59KTtcbnZhciB4ZHJDb25maWd1cmF0aW9uID0ge1xuICAgIGlzU3VwcG9ydGVkOiBmdW5jdGlvbiAoZW52aXJvbm1lbnQpIHtcbiAgICAgICAgdmFyIHllcyA9IHJ1bnRpbWUuaXNYRFJTdXBwb3J0ZWQoZW52aXJvbm1lbnQudXNlVExTKTtcbiAgICAgICAgcmV0dXJuIHllcztcbiAgICB9XG59O1xudmFyIFhEUlN0cmVhbWluZ1RyYW5zcG9ydCA9IG5ldyB0cmFuc3BvcnRfVHJhbnNwb3J0KChleHRlbmQoe30sIHN0cmVhbWluZ0NvbmZpZ3VyYXRpb24sIHhkckNvbmZpZ3VyYXRpb24pKSk7XG52YXIgWERSUG9sbGluZ1RyYW5zcG9ydCA9IG5ldyB0cmFuc3BvcnRfVHJhbnNwb3J0KGV4dGVuZCh7fSwgcG9sbGluZ0NvbmZpZ3VyYXRpb24sIHhkckNvbmZpZ3VyYXRpb24pKTtcbnRyYW5zcG9ydHMueGRyX3N0cmVhbWluZyA9IFhEUlN0cmVhbWluZ1RyYW5zcG9ydDtcbnRyYW5zcG9ydHMueGRyX3BvbGxpbmcgPSBYRFJQb2xsaW5nVHJhbnNwb3J0O1xudHJhbnNwb3J0cy5zb2NranMgPSBTb2NrSlNUcmFuc3BvcnQ7XG4vKiBoYXJtb255IGRlZmF1bHQgZXhwb3J0ICovIHZhciB0cmFuc3BvcnRzX3RyYW5zcG9ydHMgPSAodHJhbnNwb3J0cyk7XG5cbi8vIENPTkNBVEVOQVRFRCBNT0RVTEU6IC4vc3JjL3J1bnRpbWVzL3dlYi9uZXRfaW5mby50c1xuXG5jbGFzcyBuZXRfaW5mb19OZXRJbmZvIGV4dGVuZHMgZGlzcGF0Y2hlcl9EaXNwYXRjaGVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBpZiAod2luZG93LmFkZEV2ZW50TGlzdGVuZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ29ubGluZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmVtaXQoJ29ubGluZScpO1xuICAgICAgICAgICAgfSwgZmFsc2UpO1xuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ29mZmxpbmUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5lbWl0KCdvZmZsaW5lJyk7XG4gICAgICAgICAgICB9LCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaXNPbmxpbmUoKSB7XG4gICAgICAgIGlmICh3aW5kb3cubmF2aWdhdG9yLm9uTGluZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB3aW5kb3cubmF2aWdhdG9yLm9uTGluZTtcbiAgICAgICAgfVxuICAgIH1cbn1cbnZhciBuZXRfaW5mb19OZXR3b3JrID0gbmV3IG5ldF9pbmZvX05ldEluZm8oKTtcblxuLy8gQ09OQ0FURU5BVEVEIE1PRFVMRTogLi9zcmMvY29yZS90cmFuc3BvcnRzL2Fzc2lzdGFudF90b190aGVfdHJhbnNwb3J0X21hbmFnZXIudHNcblxuXG5jbGFzcyBhc3Npc3RhbnRfdG9fdGhlX3RyYW5zcG9ydF9tYW5hZ2VyX0Fzc2lzdGFudFRvVGhlVHJhbnNwb3J0TWFuYWdlciB7XG4gICAgY29uc3RydWN0b3IobWFuYWdlciwgdHJhbnNwb3J0LCBvcHRpb25zKSB7XG4gICAgICAgIHRoaXMubWFuYWdlciA9IG1hbmFnZXI7XG4gICAgICAgIHRoaXMudHJhbnNwb3J0ID0gdHJhbnNwb3J0O1xuICAgICAgICB0aGlzLm1pblBpbmdEZWxheSA9IG9wdGlvbnMubWluUGluZ0RlbGF5O1xuICAgICAgICB0aGlzLm1heFBpbmdEZWxheSA9IG9wdGlvbnMubWF4UGluZ0RlbGF5O1xuICAgICAgICB0aGlzLnBpbmdEZWxheSA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgY3JlYXRlQ29ubmVjdGlvbihuYW1lLCBwcmlvcml0eSwga2V5LCBvcHRpb25zKSB7XG4gICAgICAgIG9wdGlvbnMgPSBleHRlbmQoe30sIG9wdGlvbnMsIHtcbiAgICAgICAgICAgIGFjdGl2aXR5VGltZW91dDogdGhpcy5waW5nRGVsYXlcbiAgICAgICAgfSk7XG4gICAgICAgIHZhciBjb25uZWN0aW9uID0gdGhpcy50cmFuc3BvcnQuY3JlYXRlQ29ubmVjdGlvbihuYW1lLCBwcmlvcml0eSwga2V5LCBvcHRpb25zKTtcbiAgICAgICAgdmFyIG9wZW5UaW1lc3RhbXAgPSBudWxsO1xuICAgICAgICB2YXIgb25PcGVuID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY29ubmVjdGlvbi51bmJpbmQoJ29wZW4nLCBvbk9wZW4pO1xuICAgICAgICAgICAgY29ubmVjdGlvbi5iaW5kKCdjbG9zZWQnLCBvbkNsb3NlZCk7XG4gICAgICAgICAgICBvcGVuVGltZXN0YW1wID0gdXRpbC5ub3coKTtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIG9uQ2xvc2VkID0gY2xvc2VFdmVudCA9PiB7XG4gICAgICAgICAgICBjb25uZWN0aW9uLnVuYmluZCgnY2xvc2VkJywgb25DbG9zZWQpO1xuICAgICAgICAgICAgaWYgKGNsb3NlRXZlbnQuY29kZSA9PT0gMTAwMiB8fCBjbG9zZUV2ZW50LmNvZGUgPT09IDEwMDMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1hbmFnZXIucmVwb3J0RGVhdGgoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKCFjbG9zZUV2ZW50Lndhc0NsZWFuICYmIG9wZW5UaW1lc3RhbXApIHtcbiAgICAgICAgICAgICAgICB2YXIgbGlmZXNwYW4gPSB1dGlsLm5vdygpIC0gb3BlblRpbWVzdGFtcDtcbiAgICAgICAgICAgICAgICBpZiAobGlmZXNwYW4gPCAyICogdGhpcy5tYXhQaW5nRGVsYXkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYW5hZ2VyLnJlcG9ydERlYXRoKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGluZ0RlbGF5ID0gTWF0aC5tYXgobGlmZXNwYW4gLyAyLCB0aGlzLm1pblBpbmdEZWxheSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBjb25uZWN0aW9uLmJpbmQoJ29wZW4nLCBvbk9wZW4pO1xuICAgICAgICByZXR1cm4gY29ubmVjdGlvbjtcbiAgICB9XG4gICAgaXNTdXBwb3J0ZWQoZW52aXJvbm1lbnQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFuYWdlci5pc0FsaXZlKCkgJiYgdGhpcy50cmFuc3BvcnQuaXNTdXBwb3J0ZWQoZW52aXJvbm1lbnQpO1xuICAgIH1cbn1cblxuLy8gQ09OQ0FURU5BVEVEIE1PRFVMRTogLi9zcmMvY29yZS9jb25uZWN0aW9uL3Byb3RvY29sL3Byb3RvY29sLnRzXG5jb25zdCBQcm90b2NvbCA9IHtcbiAgICBkZWNvZGVNZXNzYWdlOiBmdW5jdGlvbiAobWVzc2FnZUV2ZW50KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB2YXIgbWVzc2FnZURhdGEgPSBKU09OLnBhcnNlKG1lc3NhZ2VFdmVudC5kYXRhKTtcbiAgICAgICAgICAgIHZhciBwdXNoZXJFdmVudERhdGEgPSBtZXNzYWdlRGF0YS5kYXRhO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBwdXNoZXJFdmVudERhdGEgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgcHVzaGVyRXZlbnREYXRhID0gSlNPTi5wYXJzZShtZXNzYWdlRGF0YS5kYXRhKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHsgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHB1c2hlckV2ZW50ID0ge1xuICAgICAgICAgICAgICAgIGV2ZW50OiBtZXNzYWdlRGF0YS5ldmVudCxcbiAgICAgICAgICAgICAgICBjaGFubmVsOiBtZXNzYWdlRGF0YS5jaGFubmVsLFxuICAgICAgICAgICAgICAgIGRhdGE6IHB1c2hlckV2ZW50RGF0YVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmIChtZXNzYWdlRGF0YS51c2VyX2lkKSB7XG4gICAgICAgICAgICAgICAgcHVzaGVyRXZlbnQudXNlcl9pZCA9IG1lc3NhZ2VEYXRhLnVzZXJfaWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcHVzaGVyRXZlbnQ7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHRocm93IHsgdHlwZTogJ01lc3NhZ2VQYXJzZUVycm9yJywgZXJyb3I6IGUsIGRhdGE6IG1lc3NhZ2VFdmVudC5kYXRhIH07XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGVuY29kZU1lc3NhZ2U6IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoZXZlbnQpO1xuICAgIH0sXG4gICAgcHJvY2Vzc0hhbmRzaGFrZTogZnVuY3Rpb24gKG1lc3NhZ2VFdmVudCkge1xuICAgICAgICB2YXIgbWVzc2FnZSA9IFByb3RvY29sLmRlY29kZU1lc3NhZ2UobWVzc2FnZUV2ZW50KTtcbiAgICAgICAgaWYgKG1lc3NhZ2UuZXZlbnQgPT09ICdwdXNoZXI6Y29ubmVjdGlvbl9lc3RhYmxpc2hlZCcpIHtcbiAgICAgICAgICAgIGlmICghbWVzc2FnZS5kYXRhLmFjdGl2aXR5X3RpbWVvdXQpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyAnTm8gYWN0aXZpdHkgdGltZW91dCBzcGVjaWZpZWQgaW4gaGFuZHNoYWtlJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgYWN0aW9uOiAnY29ubmVjdGVkJyxcbiAgICAgICAgICAgICAgICBpZDogbWVzc2FnZS5kYXRhLnNvY2tldF9pZCxcbiAgICAgICAgICAgICAgICBhY3Rpdml0eVRpbWVvdXQ6IG1lc3NhZ2UuZGF0YS5hY3Rpdml0eV90aW1lb3V0ICogMTAwMFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChtZXNzYWdlLmV2ZW50ID09PSAncHVzaGVyOmVycm9yJykge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBhY3Rpb246IHRoaXMuZ2V0Q2xvc2VBY3Rpb24obWVzc2FnZS5kYXRhKSxcbiAgICAgICAgICAgICAgICBlcnJvcjogdGhpcy5nZXRDbG9zZUVycm9yKG1lc3NhZ2UuZGF0YSlcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyAnSW52YWxpZCBoYW5kc2hha2UnO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBnZXRDbG9zZUFjdGlvbjogZnVuY3Rpb24gKGNsb3NlRXZlbnQpIHtcbiAgICAgICAgaWYgKGNsb3NlRXZlbnQuY29kZSA8IDQwMDApIHtcbiAgICAgICAgICAgIGlmIChjbG9zZUV2ZW50LmNvZGUgPj0gMTAwMiAmJiBjbG9zZUV2ZW50LmNvZGUgPD0gMTAwNCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAnYmFja29mZic7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjbG9zZUV2ZW50LmNvZGUgPT09IDQwMDApIHtcbiAgICAgICAgICAgIHJldHVybiAndGxzX29ubHknO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGNsb3NlRXZlbnQuY29kZSA8IDQxMDApIHtcbiAgICAgICAgICAgIHJldHVybiAncmVmdXNlZCc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoY2xvc2VFdmVudC5jb2RlIDwgNDIwMCkge1xuICAgICAgICAgICAgcmV0dXJuICdiYWNrb2ZmJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjbG9zZUV2ZW50LmNvZGUgPCA0MzAwKSB7XG4gICAgICAgICAgICByZXR1cm4gJ3JldHJ5JztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAncmVmdXNlZCc7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGdldENsb3NlRXJyb3I6IGZ1bmN0aW9uIChjbG9zZUV2ZW50KSB7XG4gICAgICAgIGlmIChjbG9zZUV2ZW50LmNvZGUgIT09IDEwMDAgJiYgY2xvc2VFdmVudC5jb2RlICE9PSAxMDAxKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdQdXNoZXJFcnJvcicsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBjb2RlOiBjbG9zZUV2ZW50LmNvZGUsXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGNsb3NlRXZlbnQucmVhc29uIHx8IGNsb3NlRXZlbnQubWVzc2FnZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cbn07XG4vKiBoYXJtb255IGRlZmF1bHQgZXhwb3J0ICovIHZhciBwcm90b2NvbF9wcm90b2NvbCA9IChQcm90b2NvbCk7XG5cbi8vIENPTkNBVEVOQVRFRCBNT0RVTEU6IC4vc3JjL2NvcmUvY29ubmVjdGlvbi9jb25uZWN0aW9uLnRzXG5cblxuXG5cbmNsYXNzIGNvbm5lY3Rpb25fQ29ubmVjdGlvbiBleHRlbmRzIGRpc3BhdGNoZXJfRGlzcGF0Y2hlciB7XG4gICAgY29uc3RydWN0b3IoaWQsIHRyYW5zcG9ydCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmlkID0gaWQ7XG4gICAgICAgIHRoaXMudHJhbnNwb3J0ID0gdHJhbnNwb3J0O1xuICAgICAgICB0aGlzLmFjdGl2aXR5VGltZW91dCA9IHRyYW5zcG9ydC5hY3Rpdml0eVRpbWVvdXQ7XG4gICAgICAgIHRoaXMuYmluZExpc3RlbmVycygpO1xuICAgIH1cbiAgICBoYW5kbGVzQWN0aXZpdHlDaGVja3MoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRyYW5zcG9ydC5oYW5kbGVzQWN0aXZpdHlDaGVja3MoKTtcbiAgICB9XG4gICAgc2VuZChkYXRhKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRyYW5zcG9ydC5zZW5kKGRhdGEpO1xuICAgIH1cbiAgICBzZW5kX2V2ZW50KG5hbWUsIGRhdGEsIGNoYW5uZWwpIHtcbiAgICAgICAgdmFyIGV2ZW50ID0geyBldmVudDogbmFtZSwgZGF0YTogZGF0YSB9O1xuICAgICAgICBpZiAoY2hhbm5lbCkge1xuICAgICAgICAgICAgZXZlbnQuY2hhbm5lbCA9IGNoYW5uZWw7XG4gICAgICAgIH1cbiAgICAgICAgbG9nZ2VyLmRlYnVnKCdFdmVudCBzZW50JywgZXZlbnQpO1xuICAgICAgICByZXR1cm4gdGhpcy5zZW5kKHByb3RvY29sX3Byb3RvY29sLmVuY29kZU1lc3NhZ2UoZXZlbnQpKTtcbiAgICB9XG4gICAgcGluZygpIHtcbiAgICAgICAgaWYgKHRoaXMudHJhbnNwb3J0LnN1cHBvcnRzUGluZygpKSB7XG4gICAgICAgICAgICB0aGlzLnRyYW5zcG9ydC5waW5nKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNlbmRfZXZlbnQoJ3B1c2hlcjpwaW5nJywge30pO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNsb3NlKCkge1xuICAgICAgICB0aGlzLnRyYW5zcG9ydC5jbG9zZSgpO1xuICAgIH1cbiAgICBiaW5kTGlzdGVuZXJzKCkge1xuICAgICAgICB2YXIgbGlzdGVuZXJzID0ge1xuICAgICAgICAgICAgbWVzc2FnZTogKG1lc3NhZ2VFdmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIHZhciBwdXNoZXJFdmVudDtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBwdXNoZXJFdmVudCA9IHByb3RvY29sX3Byb3RvY29sLmRlY29kZU1lc3NhZ2UobWVzc2FnZUV2ZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0KCdlcnJvcicsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdNZXNzYWdlUGFyc2VFcnJvcicsXG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvcjogZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IG1lc3NhZ2VFdmVudC5kYXRhXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocHVzaGVyRXZlbnQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBsb2dnZXIuZGVidWcoJ0V2ZW50IHJlY2QnLCBwdXNoZXJFdmVudCk7XG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAocHVzaGVyRXZlbnQuZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3B1c2hlcjplcnJvcic6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0KCdlcnJvcicsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ1B1c2hlckVycm9yJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogcHVzaGVyRXZlbnQuZGF0YVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAncHVzaGVyOnBpbmcnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdCgncGluZycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAncHVzaGVyOnBvbmcnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdCgncG9uZycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdCgnbWVzc2FnZScsIHB1c2hlckV2ZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYWN0aXZpdHk6ICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmVtaXQoJ2FjdGl2aXR5Jyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3I6IGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmVtaXQoJ2Vycm9yJywgZXJyb3IpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNsb3NlZDogY2xvc2VFdmVudCA9PiB7XG4gICAgICAgICAgICAgICAgdW5iaW5kTGlzdGVuZXJzKCk7XG4gICAgICAgICAgICAgICAgaWYgKGNsb3NlRXZlbnQgJiYgY2xvc2VFdmVudC5jb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlQ2xvc2VFdmVudChjbG9zZUV2ZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy50cmFuc3BvcnQgPSBudWxsO1xuICAgICAgICAgICAgICAgIHRoaXMuZW1pdCgnY2xvc2VkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHZhciB1bmJpbmRMaXN0ZW5lcnMgPSAoKSA9PiB7XG4gICAgICAgICAgICBvYmplY3RBcHBseShsaXN0ZW5lcnMsIChsaXN0ZW5lciwgZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnRyYW5zcG9ydC51bmJpbmQoZXZlbnQsIGxpc3RlbmVyKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICBvYmplY3RBcHBseShsaXN0ZW5lcnMsIChsaXN0ZW5lciwgZXZlbnQpID0+IHtcbiAgICAgICAgICAgIHRoaXMudHJhbnNwb3J0LmJpbmQoZXZlbnQsIGxpc3RlbmVyKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGhhbmRsZUNsb3NlRXZlbnQoY2xvc2VFdmVudCkge1xuICAgICAgICB2YXIgYWN0aW9uID0gcHJvdG9jb2xfcHJvdG9jb2wuZ2V0Q2xvc2VBY3Rpb24oY2xvc2VFdmVudCk7XG4gICAgICAgIHZhciBlcnJvciA9IHByb3RvY29sX3Byb3RvY29sLmdldENsb3NlRXJyb3IoY2xvc2VFdmVudCk7XG4gICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgdGhpcy5lbWl0KCdlcnJvcicsIGVycm9yKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYWN0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLmVtaXQoYWN0aW9uLCB7IGFjdGlvbjogYWN0aW9uLCBlcnJvcjogZXJyb3IgfSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8vIENPTkNBVEVOQVRFRCBNT0RVTEU6IC4vc3JjL2NvcmUvY29ubmVjdGlvbi9oYW5kc2hha2UvaW5kZXgudHNcblxuXG5cbmNsYXNzIGhhbmRzaGFrZV9IYW5kc2hha2Uge1xuICAgIGNvbnN0cnVjdG9yKHRyYW5zcG9ydCwgY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy50cmFuc3BvcnQgPSB0cmFuc3BvcnQ7XG4gICAgICAgIHRoaXMuY2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICAgICAgdGhpcy5iaW5kTGlzdGVuZXJzKCk7XG4gICAgfVxuICAgIGNsb3NlKCkge1xuICAgICAgICB0aGlzLnVuYmluZExpc3RlbmVycygpO1xuICAgICAgICB0aGlzLnRyYW5zcG9ydC5jbG9zZSgpO1xuICAgIH1cbiAgICBiaW5kTGlzdGVuZXJzKCkge1xuICAgICAgICB0aGlzLm9uTWVzc2FnZSA9IG0gPT4ge1xuICAgICAgICAgICAgdGhpcy51bmJpbmRMaXN0ZW5lcnMoKTtcbiAgICAgICAgICAgIHZhciByZXN1bHQ7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHByb3RvY29sX3Byb3RvY29sLnByb2Nlc3NIYW5kc2hha2UobSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZmluaXNoKCdlcnJvcicsIHsgZXJyb3I6IGUgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy50cmFuc3BvcnQuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocmVzdWx0LmFjdGlvbiA9PT0gJ2Nvbm5lY3RlZCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZpbmlzaCgnY29ubmVjdGVkJywge1xuICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uOiBuZXcgY29ubmVjdGlvbl9Db25uZWN0aW9uKHJlc3VsdC5pZCwgdGhpcy50cmFuc3BvcnQpLFxuICAgICAgICAgICAgICAgICAgICBhY3Rpdml0eVRpbWVvdXQ6IHJlc3VsdC5hY3Rpdml0eVRpbWVvdXRcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZmluaXNoKHJlc3VsdC5hY3Rpb24sIHsgZXJyb3I6IHJlc3VsdC5lcnJvciB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLnRyYW5zcG9ydC5jbG9zZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLm9uQ2xvc2VkID0gY2xvc2VFdmVudCA9PiB7XG4gICAgICAgICAgICB0aGlzLnVuYmluZExpc3RlbmVycygpO1xuICAgICAgICAgICAgdmFyIGFjdGlvbiA9IHByb3RvY29sX3Byb3RvY29sLmdldENsb3NlQWN0aW9uKGNsb3NlRXZlbnQpIHx8ICdiYWNrb2ZmJztcbiAgICAgICAgICAgIHZhciBlcnJvciA9IHByb3RvY29sX3Byb3RvY29sLmdldENsb3NlRXJyb3IoY2xvc2VFdmVudCk7XG4gICAgICAgICAgICB0aGlzLmZpbmlzaChhY3Rpb24sIHsgZXJyb3I6IGVycm9yIH0pO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnRyYW5zcG9ydC5iaW5kKCdtZXNzYWdlJywgdGhpcy5vbk1lc3NhZ2UpO1xuICAgICAgICB0aGlzLnRyYW5zcG9ydC5iaW5kKCdjbG9zZWQnLCB0aGlzLm9uQ2xvc2VkKTtcbiAgICB9XG4gICAgdW5iaW5kTGlzdGVuZXJzKCkge1xuICAgICAgICB0aGlzLnRyYW5zcG9ydC51bmJpbmQoJ21lc3NhZ2UnLCB0aGlzLm9uTWVzc2FnZSk7XG4gICAgICAgIHRoaXMudHJhbnNwb3J0LnVuYmluZCgnY2xvc2VkJywgdGhpcy5vbkNsb3NlZCk7XG4gICAgfVxuICAgIGZpbmlzaChhY3Rpb24sIHBhcmFtcykge1xuICAgICAgICB0aGlzLmNhbGxiYWNrKGV4dGVuZCh7IHRyYW5zcG9ydDogdGhpcy50cmFuc3BvcnQsIGFjdGlvbjogYWN0aW9uIH0sIHBhcmFtcykpO1xuICAgIH1cbn1cblxuLy8gQ09OQ0FURU5BVEVEIE1PRFVMRTogLi9zcmMvY29yZS90aW1lbGluZS90aW1lbGluZV9zZW5kZXIudHNcblxuY2xhc3MgdGltZWxpbmVfc2VuZGVyX1RpbWVsaW5lU2VuZGVyIHtcbiAgICBjb25zdHJ1Y3Rvcih0aW1lbGluZSwgb3B0aW9ucykge1xuICAgICAgICB0aGlzLnRpbWVsaW5lID0gdGltZWxpbmU7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgfVxuICAgIHNlbmQodXNlVExTLCBjYWxsYmFjaykge1xuICAgICAgICBpZiAodGhpcy50aW1lbGluZS5pc0VtcHR5KCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRpbWVsaW5lLnNlbmQocnVudGltZS5UaW1lbGluZVRyYW5zcG9ydC5nZXRBZ2VudCh0aGlzLCB1c2VUTFMpLCBjYWxsYmFjayk7XG4gICAgfVxufVxuXG4vLyBDT05DQVRFTkFURUQgTU9EVUxFOiAuL3NyYy9jb3JlL2NoYW5uZWxzL2NoYW5uZWwudHNcblxuXG5cblxuXG5jbGFzcyBjaGFubmVsX0NoYW5uZWwgZXh0ZW5kcyBkaXNwYXRjaGVyX0Rpc3BhdGNoZXIge1xuICAgIGNvbnN0cnVjdG9yKG5hbWUsIHB1c2hlcikge1xuICAgICAgICBzdXBlcihmdW5jdGlvbiAoZXZlbnQsIGRhdGEpIHtcbiAgICAgICAgICAgIGxvZ2dlci5kZWJ1ZygnTm8gY2FsbGJhY2tzIG9uICcgKyBuYW1lICsgJyBmb3IgJyArIGV2ZW50KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMucHVzaGVyID0gcHVzaGVyO1xuICAgICAgICB0aGlzLnN1YnNjcmliZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25QZW5kaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uQ2FuY2VsbGVkID0gZmFsc2U7XG4gICAgfVxuICAgIGF1dGhvcml6ZShzb2NrZXRJZCwgY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrKG51bGwsIHsgYXV0aDogJycgfSk7XG4gICAgfVxuICAgIHRyaWdnZXIoZXZlbnQsIGRhdGEpIHtcbiAgICAgICAgaWYgKGV2ZW50LmluZGV4T2YoJ2NsaWVudC0nKSAhPT0gMCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEJhZEV2ZW50TmFtZShcIkV2ZW50ICdcIiArIGV2ZW50ICsgXCInIGRvZXMgbm90IHN0YXJ0IHdpdGggJ2NsaWVudC0nXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5zdWJzY3JpYmVkKSB7XG4gICAgICAgICAgICB2YXIgc3VmZml4ID0gdXJsX3N0b3JlLmJ1aWxkTG9nU3VmZml4KCd0cmlnZ2VyaW5nQ2xpZW50RXZlbnRzJyk7XG4gICAgICAgICAgICBsb2dnZXIud2FybihgQ2xpZW50IGV2ZW50IHRyaWdnZXJlZCBiZWZvcmUgY2hhbm5lbCAnc3Vic2NyaXB0aW9uX3N1Y2NlZWRlZCcgZXZlbnQgLiAke3N1ZmZpeH1gKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5wdXNoZXIuc2VuZF9ldmVudChldmVudCwgZGF0YSwgdGhpcy5uYW1lKTtcbiAgICB9XG4gICAgZGlzY29ubmVjdCgpIHtcbiAgICAgICAgdGhpcy5zdWJzY3JpYmVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uUGVuZGluZyA9IGZhbHNlO1xuICAgIH1cbiAgICBoYW5kbGVFdmVudChldmVudCkge1xuICAgICAgICB2YXIgZXZlbnROYW1lID0gZXZlbnQuZXZlbnQ7XG4gICAgICAgIHZhciBkYXRhID0gZXZlbnQuZGF0YTtcbiAgICAgICAgaWYgKGV2ZW50TmFtZSA9PT0gJ3B1c2hlcl9pbnRlcm5hbDpzdWJzY3JpcHRpb25fc3VjY2VlZGVkJykge1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVTdWJzY3JpcHRpb25TdWNjZWVkZWRFdmVudChldmVudCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZXZlbnROYW1lID09PSAncHVzaGVyX2ludGVybmFsOnN1YnNjcmlwdGlvbl9jb3VudCcpIHtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlU3Vic2NyaXB0aW9uQ291bnRFdmVudChldmVudCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZXZlbnROYW1lLmluZGV4T2YoJ3B1c2hlcl9pbnRlcm5hbDonKSAhPT0gMCkge1xuICAgICAgICAgICAgdmFyIG1ldGFkYXRhID0ge307XG4gICAgICAgICAgICB0aGlzLmVtaXQoZXZlbnROYW1lLCBkYXRhLCBtZXRhZGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaGFuZGxlU3Vic2NyaXB0aW9uU3VjY2VlZGVkRXZlbnQoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25QZW5kaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc3Vic2NyaWJlZCA9IHRydWU7XG4gICAgICAgIGlmICh0aGlzLnN1YnNjcmlwdGlvbkNhbmNlbGxlZCkge1xuICAgICAgICAgICAgdGhpcy5wdXNoZXIudW5zdWJzY3JpYmUodGhpcy5uYW1lKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZW1pdCgncHVzaGVyOnN1YnNjcmlwdGlvbl9zdWNjZWVkZWQnLCBldmVudC5kYXRhKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBoYW5kbGVTdWJzY3JpcHRpb25Db3VudEV2ZW50KGV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC5kYXRhLnN1YnNjcmlwdGlvbl9jb3VudCkge1xuICAgICAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25Db3VudCA9IGV2ZW50LmRhdGEuc3Vic2NyaXB0aW9uX2NvdW50O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZW1pdCgncHVzaGVyOnN1YnNjcmlwdGlvbl9jb3VudCcsIGV2ZW50LmRhdGEpO1xuICAgIH1cbiAgICBzdWJzY3JpYmUoKSB7XG4gICAgICAgIGlmICh0aGlzLnN1YnNjcmliZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvblBlbmRpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbkNhbmNlbGxlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmF1dGhvcml6ZSh0aGlzLnB1c2hlci5jb25uZWN0aW9uLnNvY2tldF9pZCwgKGVycm9yLCBkYXRhKSA9PiB7XG4gICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN1YnNjcmlwdGlvblBlbmRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBsb2dnZXIuZXJyb3IoZXJyb3IudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0KCdwdXNoZXI6c3Vic2NyaXB0aW9uX2Vycm9yJywgT2JqZWN0LmFzc2lnbih7fSwge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnQXV0aEVycm9yJyxcbiAgICAgICAgICAgICAgICAgICAgZXJyb3I6IGVycm9yLm1lc3NhZ2VcbiAgICAgICAgICAgICAgICB9LCBlcnJvciBpbnN0YW5jZW9mIEhUVFBBdXRoRXJyb3IgPyB7IHN0YXR1czogZXJyb3Iuc3RhdHVzIH0gOiB7fSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wdXNoZXIuc2VuZF9ldmVudCgncHVzaGVyOnN1YnNjcmliZScsIHtcbiAgICAgICAgICAgICAgICAgICAgYXV0aDogZGF0YS5hdXRoLFxuICAgICAgICAgICAgICAgICAgICBjaGFubmVsX2RhdGE6IGRhdGEuY2hhbm5lbF9kYXRhLFxuICAgICAgICAgICAgICAgICAgICBjaGFubmVsOiB0aGlzLm5hbWVcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHVuc3Vic2NyaWJlKCkge1xuICAgICAgICB0aGlzLnN1YnNjcmliZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5wdXNoZXIuc2VuZF9ldmVudCgncHVzaGVyOnVuc3Vic2NyaWJlJywge1xuICAgICAgICAgICAgY2hhbm5lbDogdGhpcy5uYW1lXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBjYW5jZWxTdWJzY3JpcHRpb24oKSB7XG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uQ2FuY2VsbGVkID0gdHJ1ZTtcbiAgICB9XG4gICAgcmVpbnN0YXRlU3Vic2NyaXB0aW9uKCkge1xuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbkNhbmNlbGxlZCA9IGZhbHNlO1xuICAgIH1cbn1cblxuLy8gQ09OQ0FURU5BVEVEIE1PRFVMRTogLi9zcmMvY29yZS9jaGFubmVscy9wcml2YXRlX2NoYW5uZWwudHNcblxuY2xhc3MgcHJpdmF0ZV9jaGFubmVsX1ByaXZhdGVDaGFubmVsIGV4dGVuZHMgY2hhbm5lbF9DaGFubmVsIHtcbiAgICBhdXRob3JpemUoc29ja2V0SWQsIGNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnB1c2hlci5jb25maWcuY2hhbm5lbEF1dGhvcml6ZXIoe1xuICAgICAgICAgICAgY2hhbm5lbE5hbWU6IHRoaXMubmFtZSxcbiAgICAgICAgICAgIHNvY2tldElkOiBzb2NrZXRJZFxuICAgICAgICB9LCBjYWxsYmFjayk7XG4gICAgfVxufVxuXG4vLyBDT05DQVRFTkFURUQgTU9EVUxFOiAuL3NyYy9jb3JlL2NoYW5uZWxzL21lbWJlcnMudHNcblxuY2xhc3MgbWVtYmVyc19NZW1iZXJzIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgIH1cbiAgICBnZXQoaWQpIHtcbiAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh0aGlzLm1lbWJlcnMsIGlkKSkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBpZDogaWQsXG4gICAgICAgICAgICAgICAgaW5mbzogdGhpcy5tZW1iZXJzW2lkXVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVhY2goY2FsbGJhY2spIHtcbiAgICAgICAgb2JqZWN0QXBwbHkodGhpcy5tZW1iZXJzLCAobWVtYmVyLCBpZCkgPT4ge1xuICAgICAgICAgICAgY2FsbGJhY2sodGhpcy5nZXQoaWQpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHNldE15SUQoaWQpIHtcbiAgICAgICAgdGhpcy5teUlEID0gaWQ7XG4gICAgfVxuICAgIG9uU3Vic2NyaXB0aW9uKHN1YnNjcmlwdGlvbkRhdGEpIHtcbiAgICAgICAgdGhpcy5tZW1iZXJzID0gc3Vic2NyaXB0aW9uRGF0YS5wcmVzZW5jZS5oYXNoO1xuICAgICAgICB0aGlzLmNvdW50ID0gc3Vic2NyaXB0aW9uRGF0YS5wcmVzZW5jZS5jb3VudDtcbiAgICAgICAgdGhpcy5tZSA9IHRoaXMuZ2V0KHRoaXMubXlJRCk7XG4gICAgfVxuICAgIGFkZE1lbWJlcihtZW1iZXJEYXRhKSB7XG4gICAgICAgIGlmICh0aGlzLmdldChtZW1iZXJEYXRhLnVzZXJfaWQpID09PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmNvdW50Kys7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5tZW1iZXJzW21lbWJlckRhdGEudXNlcl9pZF0gPSBtZW1iZXJEYXRhLnVzZXJfaW5mbztcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0KG1lbWJlckRhdGEudXNlcl9pZCk7XG4gICAgfVxuICAgIHJlbW92ZU1lbWJlcihtZW1iZXJEYXRhKSB7XG4gICAgICAgIHZhciBtZW1iZXIgPSB0aGlzLmdldChtZW1iZXJEYXRhLnVzZXJfaWQpO1xuICAgICAgICBpZiAobWVtYmVyKSB7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5tZW1iZXJzW21lbWJlckRhdGEudXNlcl9pZF07XG4gICAgICAgICAgICB0aGlzLmNvdW50LS07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1lbWJlcjtcbiAgICB9XG4gICAgcmVzZXQoKSB7XG4gICAgICAgIHRoaXMubWVtYmVycyA9IHt9O1xuICAgICAgICB0aGlzLmNvdW50ID0gMDtcbiAgICAgICAgdGhpcy5teUlEID0gbnVsbDtcbiAgICAgICAgdGhpcy5tZSA9IG51bGw7XG4gICAgfVxufVxuXG4vLyBDT05DQVRFTkFURUQgTU9EVUxFOiAuL3NyYy9jb3JlL2NoYW5uZWxzL3ByZXNlbmNlX2NoYW5uZWwudHNcbnZhciBfX2F3YWl0ZXIgPSAodW5kZWZpbmVkICYmIHVuZGVmaW5lZC5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcblxuXG5cblxuY2xhc3MgcHJlc2VuY2VfY2hhbm5lbF9QcmVzZW5jZUNoYW5uZWwgZXh0ZW5kcyBwcml2YXRlX2NoYW5uZWxfUHJpdmF0ZUNoYW5uZWwge1xuICAgIGNvbnN0cnVjdG9yKG5hbWUsIHB1c2hlcikge1xuICAgICAgICBzdXBlcihuYW1lLCBwdXNoZXIpO1xuICAgICAgICB0aGlzLm1lbWJlcnMgPSBuZXcgbWVtYmVyc19NZW1iZXJzKCk7XG4gICAgfVxuICAgIGF1dGhvcml6ZShzb2NrZXRJZCwgY2FsbGJhY2spIHtcbiAgICAgICAgc3VwZXIuYXV0aG9yaXplKHNvY2tldElkLCAoZXJyb3IsIGF1dGhEYXRhKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBpZiAoIWVycm9yKSB7XG4gICAgICAgICAgICAgICAgYXV0aERhdGEgPSBhdXRoRGF0YTtcbiAgICAgICAgICAgICAgICBpZiAoYXV0aERhdGEuY2hhbm5lbF9kYXRhICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNoYW5uZWxEYXRhID0gSlNPTi5wYXJzZShhdXRoRGF0YS5jaGFubmVsX2RhdGEpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1lbWJlcnMuc2V0TXlJRChjaGFubmVsRGF0YS51c2VyX2lkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHlpZWxkIHRoaXMucHVzaGVyLnVzZXIuc2lnbmluRG9uZVByb21pc2U7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnB1c2hlci51c2VyLnVzZXJfZGF0YSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1lbWJlcnMuc2V0TXlJRCh0aGlzLnB1c2hlci51c2VyLnVzZXJfZGF0YS5pZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3VmZml4ID0gdXJsX3N0b3JlLmJ1aWxkTG9nU3VmZml4KCdhdXRob3JpemF0aW9uRW5kcG9pbnQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvZ2dlci5lcnJvcihgSW52YWxpZCBhdXRoIHJlc3BvbnNlIGZvciBjaGFubmVsICcke3RoaXMubmFtZX0nLCBgICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBgZXhwZWN0ZWQgJ2NoYW5uZWxfZGF0YScgZmllbGQuICR7c3VmZml4fSwgYCArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYG9yIHRoZSB1c2VyIHNob3VsZCBiZSBzaWduZWQgaW4uYCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjaygnSW52YWxpZCBhdXRoIHJlc3BvbnNlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYWxsYmFjayhlcnJvciwgYXV0aERhdGEpO1xuICAgICAgICB9KSk7XG4gICAgfVxuICAgIGhhbmRsZUV2ZW50KGV2ZW50KSB7XG4gICAgICAgIHZhciBldmVudE5hbWUgPSBldmVudC5ldmVudDtcbiAgICAgICAgaWYgKGV2ZW50TmFtZS5pbmRleE9mKCdwdXNoZXJfaW50ZXJuYWw6JykgPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlSW50ZXJuYWxFdmVudChldmVudCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgZGF0YSA9IGV2ZW50LmRhdGE7XG4gICAgICAgICAgICB2YXIgbWV0YWRhdGEgPSB7fTtcbiAgICAgICAgICAgIGlmIChldmVudC51c2VyX2lkKSB7XG4gICAgICAgICAgICAgICAgbWV0YWRhdGEudXNlcl9pZCA9IGV2ZW50LnVzZXJfaWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmVtaXQoZXZlbnROYW1lLCBkYXRhLCBtZXRhZGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaGFuZGxlSW50ZXJuYWxFdmVudChldmVudCkge1xuICAgICAgICB2YXIgZXZlbnROYW1lID0gZXZlbnQuZXZlbnQ7XG4gICAgICAgIHZhciBkYXRhID0gZXZlbnQuZGF0YTtcbiAgICAgICAgc3dpdGNoIChldmVudE5hbWUpIHtcbiAgICAgICAgICAgIGNhc2UgJ3B1c2hlcl9pbnRlcm5hbDpzdWJzY3JpcHRpb25fc3VjY2VlZGVkJzpcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZVN1YnNjcmlwdGlvblN1Y2NlZWRlZEV2ZW50KGV2ZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3B1c2hlcl9pbnRlcm5hbDpzdWJzY3JpcHRpb25fY291bnQnOlxuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlU3Vic2NyaXB0aW9uQ291bnRFdmVudChldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdwdXNoZXJfaW50ZXJuYWw6bWVtYmVyX2FkZGVkJzpcbiAgICAgICAgICAgICAgICB2YXIgYWRkZWRNZW1iZXIgPSB0aGlzLm1lbWJlcnMuYWRkTWVtYmVyKGRhdGEpO1xuICAgICAgICAgICAgICAgIHRoaXMuZW1pdCgncHVzaGVyOm1lbWJlcl9hZGRlZCcsIGFkZGVkTWVtYmVyKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3B1c2hlcl9pbnRlcm5hbDptZW1iZXJfcmVtb3ZlZCc6XG4gICAgICAgICAgICAgICAgdmFyIHJlbW92ZWRNZW1iZXIgPSB0aGlzLm1lbWJlcnMucmVtb3ZlTWVtYmVyKGRhdGEpO1xuICAgICAgICAgICAgICAgIGlmIChyZW1vdmVkTWVtYmVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdCgncHVzaGVyOm1lbWJlcl9yZW1vdmVkJywgcmVtb3ZlZE1lbWJlcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIGhhbmRsZVN1YnNjcmlwdGlvblN1Y2NlZWRlZEV2ZW50KGV2ZW50KSB7XG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uUGVuZGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnN1YnNjcmliZWQgPSB0cnVlO1xuICAgICAgICBpZiAodGhpcy5zdWJzY3JpcHRpb25DYW5jZWxsZWQpIHtcbiAgICAgICAgICAgIHRoaXMucHVzaGVyLnVuc3Vic2NyaWJlKHRoaXMubmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm1lbWJlcnMub25TdWJzY3JpcHRpb24oZXZlbnQuZGF0YSk7XG4gICAgICAgICAgICB0aGlzLmVtaXQoJ3B1c2hlcjpzdWJzY3JpcHRpb25fc3VjY2VlZGVkJywgdGhpcy5tZW1iZXJzKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBkaXNjb25uZWN0KCkge1xuICAgICAgICB0aGlzLm1lbWJlcnMucmVzZXQoKTtcbiAgICAgICAgc3VwZXIuZGlzY29ubmVjdCgpO1xuICAgIH1cbn1cblxuLy8gRVhURVJOQUwgTU9EVUxFOiAuL25vZGVfbW9kdWxlcy9Ac3RhYmxlbGliL3V0ZjgvbGliL3V0ZjguanNcbnZhciB1dGY4ID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKTtcblxuLy8gRVhURVJOQUwgTU9EVUxFOiAuL25vZGVfbW9kdWxlcy9Ac3RhYmxlbGliL2Jhc2U2NC9saWIvYmFzZTY0LmpzXG52YXIgYmFzZTY0ID0gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuLy8gQ09OQ0FURU5BVEVEIE1PRFVMRTogLi9zcmMvY29yZS9jaGFubmVscy9lbmNyeXB0ZWRfY2hhbm5lbC50c1xuXG5cblxuXG5cbmNsYXNzIGVuY3J5cHRlZF9jaGFubmVsX0VuY3J5cHRlZENoYW5uZWwgZXh0ZW5kcyBwcml2YXRlX2NoYW5uZWxfUHJpdmF0ZUNoYW5uZWwge1xuICAgIGNvbnN0cnVjdG9yKG5hbWUsIHB1c2hlciwgbmFjbCkge1xuICAgICAgICBzdXBlcihuYW1lLCBwdXNoZXIpO1xuICAgICAgICB0aGlzLmtleSA9IG51bGw7XG4gICAgICAgIHRoaXMubmFjbCA9IG5hY2w7XG4gICAgfVxuICAgIGF1dGhvcml6ZShzb2NrZXRJZCwgY2FsbGJhY2spIHtcbiAgICAgICAgc3VwZXIuYXV0aG9yaXplKHNvY2tldElkLCAoZXJyb3IsIGF1dGhEYXRhKSA9PiB7XG4gICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhlcnJvciwgYXV0aERhdGEpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBzaGFyZWRTZWNyZXQgPSBhdXRoRGF0YVsnc2hhcmVkX3NlY3JldCddO1xuICAgICAgICAgICAgaWYgKCFzaGFyZWRTZWNyZXQpIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhuZXcgRXJyb3IoYE5vIHNoYXJlZF9zZWNyZXQga2V5IGluIGF1dGggcGF5bG9hZCBmb3IgZW5jcnlwdGVkIGNoYW5uZWw6ICR7dGhpcy5uYW1lfWApLCBudWxsKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmtleSA9IE9iamVjdChiYXNlNjRbXCJkZWNvZGVcIl0pKHNoYXJlZFNlY3JldCk7XG4gICAgICAgICAgICBkZWxldGUgYXV0aERhdGFbJ3NoYXJlZF9zZWNyZXQnXTtcbiAgICAgICAgICAgIGNhbGxiYWNrKG51bGwsIGF1dGhEYXRhKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHRyaWdnZXIoZXZlbnQsIGRhdGEpIHtcbiAgICAgICAgdGhyb3cgbmV3IFVuc3VwcG9ydGVkRmVhdHVyZSgnQ2xpZW50IGV2ZW50cyBhcmUgbm90IGN1cnJlbnRseSBzdXBwb3J0ZWQgZm9yIGVuY3J5cHRlZCBjaGFubmVscycpO1xuICAgIH1cbiAgICBoYW5kbGVFdmVudChldmVudCkge1xuICAgICAgICB2YXIgZXZlbnROYW1lID0gZXZlbnQuZXZlbnQ7XG4gICAgICAgIHZhciBkYXRhID0gZXZlbnQuZGF0YTtcbiAgICAgICAgaWYgKGV2ZW50TmFtZS5pbmRleE9mKCdwdXNoZXJfaW50ZXJuYWw6JykgPT09IDAgfHxcbiAgICAgICAgICAgIGV2ZW50TmFtZS5pbmRleE9mKCdwdXNoZXI6JykgPT09IDApIHtcbiAgICAgICAgICAgIHN1cGVyLmhhbmRsZUV2ZW50KGV2ZW50KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmhhbmRsZUVuY3J5cHRlZEV2ZW50KGV2ZW50TmFtZSwgZGF0YSk7XG4gICAgfVxuICAgIGhhbmRsZUVuY3J5cHRlZEV2ZW50KGV2ZW50LCBkYXRhKSB7XG4gICAgICAgIGlmICghdGhpcy5rZXkpIHtcbiAgICAgICAgICAgIGxvZ2dlci5kZWJ1ZygnUmVjZWl2ZWQgZW5jcnlwdGVkIGV2ZW50IGJlZm9yZSBrZXkgaGFzIGJlZW4gcmV0cmlldmVkIGZyb20gdGhlIGF1dGhFbmRwb2ludCcpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICghZGF0YS5jaXBoZXJ0ZXh0IHx8ICFkYXRhLm5vbmNlKSB7XG4gICAgICAgICAgICBsb2dnZXIuZXJyb3IoJ1VuZXhwZWN0ZWQgZm9ybWF0IGZvciBlbmNyeXB0ZWQgZXZlbnQsIGV4cGVjdGVkIG9iamVjdCB3aXRoIGBjaXBoZXJ0ZXh0YCBhbmQgYG5vbmNlYCBmaWVsZHMsIGdvdDogJyArXG4gICAgICAgICAgICAgICAgZGF0YSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGNpcGhlclRleHQgPSBPYmplY3QoYmFzZTY0W1wiZGVjb2RlXCJdKShkYXRhLmNpcGhlcnRleHQpO1xuICAgICAgICBpZiAoY2lwaGVyVGV4dC5sZW5ndGggPCB0aGlzLm5hY2wuc2VjcmV0Ym94Lm92ZXJoZWFkTGVuZ3RoKSB7XG4gICAgICAgICAgICBsb2dnZXIuZXJyb3IoYEV4cGVjdGVkIGVuY3J5cHRlZCBldmVudCBjaXBoZXJ0ZXh0IGxlbmd0aCB0byBiZSAke3RoaXMubmFjbC5zZWNyZXRib3gub3ZlcmhlYWRMZW5ndGh9LCBnb3Q6ICR7Y2lwaGVyVGV4dC5sZW5ndGh9YCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IG5vbmNlID0gT2JqZWN0KGJhc2U2NFtcImRlY29kZVwiXSkoZGF0YS5ub25jZSk7XG4gICAgICAgIGlmIChub25jZS5sZW5ndGggPCB0aGlzLm5hY2wuc2VjcmV0Ym94Lm5vbmNlTGVuZ3RoKSB7XG4gICAgICAgICAgICBsb2dnZXIuZXJyb3IoYEV4cGVjdGVkIGVuY3J5cHRlZCBldmVudCBub25jZSBsZW5ndGggdG8gYmUgJHt0aGlzLm5hY2wuc2VjcmV0Ym94Lm5vbmNlTGVuZ3RofSwgZ290OiAke25vbmNlLmxlbmd0aH1gKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgYnl0ZXMgPSB0aGlzLm5hY2wuc2VjcmV0Ym94Lm9wZW4oY2lwaGVyVGV4dCwgbm9uY2UsIHRoaXMua2V5KTtcbiAgICAgICAgaWYgKGJ5dGVzID09PSBudWxsKSB7XG4gICAgICAgICAgICBsb2dnZXIuZGVidWcoJ0ZhaWxlZCB0byBkZWNyeXB0IGFuIGV2ZW50LCBwcm9iYWJseSBiZWNhdXNlIGl0IHdhcyBlbmNyeXB0ZWQgd2l0aCBhIGRpZmZlcmVudCBrZXkuIEZldGNoaW5nIGEgbmV3IGtleSBmcm9tIHRoZSBhdXRoRW5kcG9pbnQuLi4nKTtcbiAgICAgICAgICAgIHRoaXMuYXV0aG9yaXplKHRoaXMucHVzaGVyLmNvbm5lY3Rpb24uc29ja2V0X2lkLCAoZXJyb3IsIGF1dGhEYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGxvZ2dlci5lcnJvcihgRmFpbGVkIHRvIG1ha2UgYSByZXF1ZXN0IHRvIHRoZSBhdXRoRW5kcG9pbnQ6ICR7YXV0aERhdGF9LiBVbmFibGUgdG8gZmV0Y2ggbmV3IGtleSwgc28gZHJvcHBpbmcgZW5jcnlwdGVkIGV2ZW50YCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnl0ZXMgPSB0aGlzLm5hY2wuc2VjcmV0Ym94Lm9wZW4oY2lwaGVyVGV4dCwgbm9uY2UsIHRoaXMua2V5KTtcbiAgICAgICAgICAgICAgICBpZiAoYnl0ZXMgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgbG9nZ2VyLmVycm9yKGBGYWlsZWQgdG8gZGVjcnlwdCBldmVudCB3aXRoIG5ldyBrZXkuIERyb3BwaW5nIGVuY3J5cHRlZCBldmVudGApO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuZW1pdChldmVudCwgdGhpcy5nZXREYXRhVG9FbWl0KGJ5dGVzKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5lbWl0KGV2ZW50LCB0aGlzLmdldERhdGFUb0VtaXQoYnl0ZXMpKTtcbiAgICB9XG4gICAgZ2V0RGF0YVRvRW1pdChieXRlcykge1xuICAgICAgICBsZXQgcmF3ID0gT2JqZWN0KHV0ZjhbXCJkZWNvZGVcIl0pKGJ5dGVzKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKHJhdyk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKF9hKSB7XG4gICAgICAgICAgICByZXR1cm4gcmF3O1xuICAgICAgICB9XG4gICAgfVxufVxuXG4vLyBDT05DQVRFTkFURUQgTU9EVUxFOiAuL3NyYy9jb3JlL2Nvbm5lY3Rpb24vY29ubmVjdGlvbl9tYW5hZ2VyLnRzXG5cblxuXG5cblxuY2xhc3MgY29ubmVjdGlvbl9tYW5hZ2VyX0Nvbm5lY3Rpb25NYW5hZ2VyIGV4dGVuZHMgZGlzcGF0Y2hlcl9EaXNwYXRjaGVyIHtcbiAgICBjb25zdHJ1Y3RvcihrZXksIG9wdGlvbnMpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9ICdpbml0aWFsaXplZCc7XG4gICAgICAgIHRoaXMuY29ubmVjdGlvbiA9IG51bGw7XG4gICAgICAgIHRoaXMua2V5ID0ga2V5O1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgICAgICB0aGlzLnRpbWVsaW5lID0gdGhpcy5vcHRpb25zLnRpbWVsaW5lO1xuICAgICAgICB0aGlzLnVzaW5nVExTID0gdGhpcy5vcHRpb25zLnVzZVRMUztcbiAgICAgICAgdGhpcy5lcnJvckNhbGxiYWNrcyA9IHRoaXMuYnVpbGRFcnJvckNhbGxiYWNrcygpO1xuICAgICAgICB0aGlzLmNvbm5lY3Rpb25DYWxsYmFja3MgPSB0aGlzLmJ1aWxkQ29ubmVjdGlvbkNhbGxiYWNrcyh0aGlzLmVycm9yQ2FsbGJhY2tzKTtcbiAgICAgICAgdGhpcy5oYW5kc2hha2VDYWxsYmFja3MgPSB0aGlzLmJ1aWxkSGFuZHNoYWtlQ2FsbGJhY2tzKHRoaXMuZXJyb3JDYWxsYmFja3MpO1xuICAgICAgICB2YXIgTmV0d29yayA9IHJ1bnRpbWUuZ2V0TmV0d29yaygpO1xuICAgICAgICBOZXR3b3JrLmJpbmQoJ29ubGluZScsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMudGltZWxpbmUuaW5mbyh7IG5ldGluZm86ICdvbmxpbmUnIH0pO1xuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGUgPT09ICdjb25uZWN0aW5nJyB8fCB0aGlzLnN0YXRlID09PSAndW5hdmFpbGFibGUnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXRyeUluKDApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgTmV0d29yay5iaW5kKCdvZmZsaW5lJywgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy50aW1lbGluZS5pbmZvKHsgbmV0aW5mbzogJ29mZmxpbmUnIH0pO1xuICAgICAgICAgICAgaWYgKHRoaXMuY29ubmVjdGlvbikge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VuZEFjdGl2aXR5Q2hlY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMudXBkYXRlU3RyYXRlZ3koKTtcbiAgICB9XG4gICAgY29ubmVjdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuY29ubmVjdGlvbiB8fCB0aGlzLnJ1bm5lcikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5zdHJhdGVneS5pc1N1cHBvcnRlZCgpKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVN0YXRlKCdmYWlsZWQnKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnVwZGF0ZVN0YXRlKCdjb25uZWN0aW5nJyk7XG4gICAgICAgIHRoaXMuc3RhcnRDb25uZWN0aW5nKCk7XG4gICAgICAgIHRoaXMuc2V0VW5hdmFpbGFibGVUaW1lcigpO1xuICAgIH1cbiAgICBzZW5kKGRhdGEpIHtcbiAgICAgICAgaWYgKHRoaXMuY29ubmVjdGlvbikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29ubmVjdGlvbi5zZW5kKGRhdGEpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHNlbmRfZXZlbnQobmFtZSwgZGF0YSwgY2hhbm5lbCkge1xuICAgICAgICBpZiAodGhpcy5jb25uZWN0aW9uKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb25uZWN0aW9uLnNlbmRfZXZlbnQobmFtZSwgZGF0YSwgY2hhbm5lbCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZGlzY29ubmVjdCgpIHtcbiAgICAgICAgdGhpcy5kaXNjb25uZWN0SW50ZXJuYWxseSgpO1xuICAgICAgICB0aGlzLnVwZGF0ZVN0YXRlKCdkaXNjb25uZWN0ZWQnKTtcbiAgICB9XG4gICAgaXNVc2luZ1RMUygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudXNpbmdUTFM7XG4gICAgfVxuICAgIHN0YXJ0Q29ubmVjdGluZygpIHtcbiAgICAgICAgdmFyIGNhbGxiYWNrID0gKGVycm9yLCBoYW5kc2hha2UpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgIHRoaXMucnVubmVyID0gdGhpcy5zdHJhdGVneS5jb25uZWN0KDAsIGNhbGxiYWNrKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChoYW5kc2hha2UuYWN0aW9uID09PSAnZXJyb3InKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdCgnZXJyb3InLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnSGFuZHNoYWtlRXJyb3InLFxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3I6IGhhbmRzaGFrZS5lcnJvclxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aW1lbGluZS5lcnJvcih7IGhhbmRzaGFrZUVycm9yOiBoYW5kc2hha2UuZXJyb3IgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFib3J0Q29ubmVjdGluZygpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRzaGFrZUNhbGxiYWNrc1toYW5kc2hha2UuYWN0aW9uXShoYW5kc2hha2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5ydW5uZXIgPSB0aGlzLnN0cmF0ZWd5LmNvbm5lY3QoMCwgY2FsbGJhY2spO1xuICAgIH1cbiAgICBhYm9ydENvbm5lY3RpbmcoKSB7XG4gICAgICAgIGlmICh0aGlzLnJ1bm5lcikge1xuICAgICAgICAgICAgdGhpcy5ydW5uZXIuYWJvcnQoKTtcbiAgICAgICAgICAgIHRoaXMucnVubmVyID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBkaXNjb25uZWN0SW50ZXJuYWxseSgpIHtcbiAgICAgICAgdGhpcy5hYm9ydENvbm5lY3RpbmcoKTtcbiAgICAgICAgdGhpcy5jbGVhclJldHJ5VGltZXIoKTtcbiAgICAgICAgdGhpcy5jbGVhclVuYXZhaWxhYmxlVGltZXIoKTtcbiAgICAgICAgaWYgKHRoaXMuY29ubmVjdGlvbikge1xuICAgICAgICAgICAgdmFyIGNvbm5lY3Rpb24gPSB0aGlzLmFiYW5kb25Db25uZWN0aW9uKCk7XG4gICAgICAgICAgICBjb25uZWN0aW9uLmNsb3NlKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdXBkYXRlU3RyYXRlZ3koKSB7XG4gICAgICAgIHRoaXMuc3RyYXRlZ3kgPSB0aGlzLm9wdGlvbnMuZ2V0U3RyYXRlZ3koe1xuICAgICAgICAgICAga2V5OiB0aGlzLmtleSxcbiAgICAgICAgICAgIHRpbWVsaW5lOiB0aGlzLnRpbWVsaW5lLFxuICAgICAgICAgICAgdXNlVExTOiB0aGlzLnVzaW5nVExTXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZXRyeUluKGRlbGF5KSB7XG4gICAgICAgIHRoaXMudGltZWxpbmUuaW5mbyh7IGFjdGlvbjogJ3JldHJ5JywgZGVsYXk6IGRlbGF5IH0pO1xuICAgICAgICBpZiAoZGVsYXkgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLmVtaXQoJ2Nvbm5lY3RpbmdfaW4nLCBNYXRoLnJvdW5kKGRlbGF5IC8gMTAwMCkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmV0cnlUaW1lciA9IG5ldyB0aW1lcnNfT25lT2ZmVGltZXIoZGVsYXkgfHwgMCwgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5kaXNjb25uZWN0SW50ZXJuYWxseSgpO1xuICAgICAgICAgICAgdGhpcy5jb25uZWN0KCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBjbGVhclJldHJ5VGltZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLnJldHJ5VGltZXIpIHtcbiAgICAgICAgICAgIHRoaXMucmV0cnlUaW1lci5lbnN1cmVBYm9ydGVkKCk7XG4gICAgICAgICAgICB0aGlzLnJldHJ5VGltZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuICAgIHNldFVuYXZhaWxhYmxlVGltZXIoKSB7XG4gICAgICAgIHRoaXMudW5hdmFpbGFibGVUaW1lciA9IG5ldyB0aW1lcnNfT25lT2ZmVGltZXIodGhpcy5vcHRpb25zLnVuYXZhaWxhYmxlVGltZW91dCwgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVTdGF0ZSgndW5hdmFpbGFibGUnKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGNsZWFyVW5hdmFpbGFibGVUaW1lcigpIHtcbiAgICAgICAgaWYgKHRoaXMudW5hdmFpbGFibGVUaW1lcikge1xuICAgICAgICAgICAgdGhpcy51bmF2YWlsYWJsZVRpbWVyLmVuc3VyZUFib3J0ZWQoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzZW5kQWN0aXZpdHlDaGVjaygpIHtcbiAgICAgICAgdGhpcy5zdG9wQWN0aXZpdHlDaGVjaygpO1xuICAgICAgICB0aGlzLmNvbm5lY3Rpb24ucGluZygpO1xuICAgICAgICB0aGlzLmFjdGl2aXR5VGltZXIgPSBuZXcgdGltZXJzX09uZU9mZlRpbWVyKHRoaXMub3B0aW9ucy5wb25nVGltZW91dCwgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy50aW1lbGluZS5lcnJvcih7IHBvbmdfdGltZWRfb3V0OiB0aGlzLm9wdGlvbnMucG9uZ1RpbWVvdXQgfSk7XG4gICAgICAgICAgICB0aGlzLnJldHJ5SW4oMCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZXNldEFjdGl2aXR5Q2hlY2soKSB7XG4gICAgICAgIHRoaXMuc3RvcEFjdGl2aXR5Q2hlY2soKTtcbiAgICAgICAgaWYgKHRoaXMuY29ubmVjdGlvbiAmJiAhdGhpcy5jb25uZWN0aW9uLmhhbmRsZXNBY3Rpdml0eUNoZWNrcygpKSB7XG4gICAgICAgICAgICB0aGlzLmFjdGl2aXR5VGltZXIgPSBuZXcgdGltZXJzX09uZU9mZlRpbWVyKHRoaXMuYWN0aXZpdHlUaW1lb3V0LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZW5kQWN0aXZpdHlDaGVjaygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RvcEFjdGl2aXR5Q2hlY2soKSB7XG4gICAgICAgIGlmICh0aGlzLmFjdGl2aXR5VGltZXIpIHtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZpdHlUaW1lci5lbnN1cmVBYm9ydGVkKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYnVpbGRDb25uZWN0aW9uQ2FsbGJhY2tzKGVycm9yQ2FsbGJhY2tzKSB7XG4gICAgICAgIHJldHVybiBleHRlbmQoe30sIGVycm9yQ2FsbGJhY2tzLCB7XG4gICAgICAgICAgICBtZXNzYWdlOiBtZXNzYWdlID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2V0QWN0aXZpdHlDaGVjaygpO1xuICAgICAgICAgICAgICAgIHRoaXMuZW1pdCgnbWVzc2FnZScsIG1lc3NhZ2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHBpbmc6ICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbmRfZXZlbnQoJ3B1c2hlcjpwb25nJywge30pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFjdGl2aXR5OiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXNldEFjdGl2aXR5Q2hlY2soKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvcjogZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZW1pdCgnZXJyb3InLCBlcnJvcik7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2xvc2VkOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5hYmFuZG9uQ29ubmVjdGlvbigpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNob3VsZFJldHJ5KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXRyeUluKDEwMDApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGJ1aWxkSGFuZHNoYWtlQ2FsbGJhY2tzKGVycm9yQ2FsbGJhY2tzKSB7XG4gICAgICAgIHJldHVybiBleHRlbmQoe30sIGVycm9yQ2FsbGJhY2tzLCB7XG4gICAgICAgICAgICBjb25uZWN0ZWQ6IChoYW5kc2hha2UpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2aXR5VGltZW91dCA9IE1hdGgubWluKHRoaXMub3B0aW9ucy5hY3Rpdml0eVRpbWVvdXQsIGhhbmRzaGFrZS5hY3Rpdml0eVRpbWVvdXQsIGhhbmRzaGFrZS5jb25uZWN0aW9uLmFjdGl2aXR5VGltZW91dCB8fCBJbmZpbml0eSk7XG4gICAgICAgICAgICAgICAgdGhpcy5jbGVhclVuYXZhaWxhYmxlVGltZXIoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldENvbm5lY3Rpb24oaGFuZHNoYWtlLmNvbm5lY3Rpb24pO1xuICAgICAgICAgICAgICAgIHRoaXMuc29ja2V0X2lkID0gdGhpcy5jb25uZWN0aW9uLmlkO1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU3RhdGUoJ2Nvbm5lY3RlZCcsIHsgc29ja2V0X2lkOiB0aGlzLnNvY2tldF9pZCB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGJ1aWxkRXJyb3JDYWxsYmFja3MoKSB7XG4gICAgICAgIGxldCB3aXRoRXJyb3JFbWl0dGVkID0gY2FsbGJhY2sgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0LmVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdCgnZXJyb3InLCB7IHR5cGU6ICdXZWJTb2NrZXRFcnJvcicsIGVycm9yOiByZXN1bHQuZXJyb3IgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHJlc3VsdCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdGxzX29ubHk6IHdpdGhFcnJvckVtaXR0ZWQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMudXNpbmdUTFMgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU3RyYXRlZ3koKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJldHJ5SW4oMCk7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIHJlZnVzZWQ6IHdpdGhFcnJvckVtaXR0ZWQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZGlzY29ubmVjdCgpO1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBiYWNrb2ZmOiB3aXRoRXJyb3JFbWl0dGVkKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnJldHJ5SW4oMTAwMCk7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIHJldHJ5OiB3aXRoRXJyb3JFbWl0dGVkKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnJldHJ5SW4oMCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9O1xuICAgIH1cbiAgICBzZXRDb25uZWN0aW9uKGNvbm5lY3Rpb24pIHtcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uID0gY29ubmVjdGlvbjtcbiAgICAgICAgZm9yICh2YXIgZXZlbnQgaW4gdGhpcy5jb25uZWN0aW9uQ2FsbGJhY2tzKSB7XG4gICAgICAgICAgICB0aGlzLmNvbm5lY3Rpb24uYmluZChldmVudCwgdGhpcy5jb25uZWN0aW9uQ2FsbGJhY2tzW2V2ZW50XSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZXNldEFjdGl2aXR5Q2hlY2soKTtcbiAgICB9XG4gICAgYWJhbmRvbkNvbm5lY3Rpb24oKSB7XG4gICAgICAgIGlmICghdGhpcy5jb25uZWN0aW9uKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zdG9wQWN0aXZpdHlDaGVjaygpO1xuICAgICAgICBmb3IgKHZhciBldmVudCBpbiB0aGlzLmNvbm5lY3Rpb25DYWxsYmFja3MpIHtcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvbi51bmJpbmQoZXZlbnQsIHRoaXMuY29ubmVjdGlvbkNhbGxiYWNrc1tldmVudF0pO1xuICAgICAgICB9XG4gICAgICAgIHZhciBjb25uZWN0aW9uID0gdGhpcy5jb25uZWN0aW9uO1xuICAgICAgICB0aGlzLmNvbm5lY3Rpb24gPSBudWxsO1xuICAgICAgICByZXR1cm4gY29ubmVjdGlvbjtcbiAgICB9XG4gICAgdXBkYXRlU3RhdGUobmV3U3RhdGUsIGRhdGEpIHtcbiAgICAgICAgdmFyIHByZXZpb3VzU3RhdGUgPSB0aGlzLnN0YXRlO1xuICAgICAgICB0aGlzLnN0YXRlID0gbmV3U3RhdGU7XG4gICAgICAgIGlmIChwcmV2aW91c1N0YXRlICE9PSBuZXdTdGF0ZSkge1xuICAgICAgICAgICAgdmFyIG5ld1N0YXRlRGVzY3JpcHRpb24gPSBuZXdTdGF0ZTtcbiAgICAgICAgICAgIGlmIChuZXdTdGF0ZURlc2NyaXB0aW9uID09PSAnY29ubmVjdGVkJykge1xuICAgICAgICAgICAgICAgIG5ld1N0YXRlRGVzY3JpcHRpb24gKz0gJyB3aXRoIG5ldyBzb2NrZXQgSUQgJyArIGRhdGEuc29ja2V0X2lkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKCdTdGF0ZSBjaGFuZ2VkJywgcHJldmlvdXNTdGF0ZSArICcgLT4gJyArIG5ld1N0YXRlRGVzY3JpcHRpb24pO1xuICAgICAgICAgICAgdGhpcy50aW1lbGluZS5pbmZvKHsgc3RhdGU6IG5ld1N0YXRlLCBwYXJhbXM6IGRhdGEgfSk7XG4gICAgICAgICAgICB0aGlzLmVtaXQoJ3N0YXRlX2NoYW5nZScsIHsgcHJldmlvdXM6IHByZXZpb3VzU3RhdGUsIGN1cnJlbnQ6IG5ld1N0YXRlIH0pO1xuICAgICAgICAgICAgdGhpcy5lbWl0KG5ld1N0YXRlLCBkYXRhKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzaG91bGRSZXRyeSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUgPT09ICdjb25uZWN0aW5nJyB8fCB0aGlzLnN0YXRlID09PSAnY29ubmVjdGVkJztcbiAgICB9XG59XG5cbi8vIENPTkNBVEVOQVRFRCBNT0RVTEU6IC4vc3JjL2NvcmUvY2hhbm5lbHMvY2hhbm5lbHMudHNcblxuXG5cblxuY2xhc3MgY2hhbm5lbHNfQ2hhbm5lbHMge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmNoYW5uZWxzID0ge307XG4gICAgfVxuICAgIGFkZChuYW1lLCBwdXNoZXIpIHtcbiAgICAgICAgaWYgKCF0aGlzLmNoYW5uZWxzW25hbWVdKSB7XG4gICAgICAgICAgICB0aGlzLmNoYW5uZWxzW25hbWVdID0gY3JlYXRlQ2hhbm5lbChuYW1lLCBwdXNoZXIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmNoYW5uZWxzW25hbWVdO1xuICAgIH1cbiAgICBhbGwoKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZXModGhpcy5jaGFubmVscyk7XG4gICAgfVxuICAgIGZpbmQobmFtZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5jaGFubmVsc1tuYW1lXTtcbiAgICB9XG4gICAgcmVtb3ZlKG5hbWUpIHtcbiAgICAgICAgdmFyIGNoYW5uZWwgPSB0aGlzLmNoYW5uZWxzW25hbWVdO1xuICAgICAgICBkZWxldGUgdGhpcy5jaGFubmVsc1tuYW1lXTtcbiAgICAgICAgcmV0dXJuIGNoYW5uZWw7XG4gICAgfVxuICAgIGRpc2Nvbm5lY3QoKSB7XG4gICAgICAgIG9iamVjdEFwcGx5KHRoaXMuY2hhbm5lbHMsIGZ1bmN0aW9uIChjaGFubmVsKSB7XG4gICAgICAgICAgICBjaGFubmVsLmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuZnVuY3Rpb24gY3JlYXRlQ2hhbm5lbChuYW1lLCBwdXNoZXIpIHtcbiAgICBpZiAobmFtZS5pbmRleE9mKCdwcml2YXRlLWVuY3J5cHRlZC0nKSA9PT0gMCkge1xuICAgICAgICBpZiAocHVzaGVyLmNvbmZpZy5uYWNsKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFjdG9yeS5jcmVhdGVFbmNyeXB0ZWRDaGFubmVsKG5hbWUsIHB1c2hlciwgcHVzaGVyLmNvbmZpZy5uYWNsKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgZXJyTXNnID0gJ1RyaWVkIHRvIHN1YnNjcmliZSB0byBhIHByaXZhdGUtZW5jcnlwdGVkLSBjaGFubmVsIGJ1dCBubyBuYWNsIGltcGxlbWVudGF0aW9uIGF2YWlsYWJsZSc7XG4gICAgICAgIGxldCBzdWZmaXggPSB1cmxfc3RvcmUuYnVpbGRMb2dTdWZmaXgoJ2VuY3J5cHRlZENoYW5uZWxTdXBwb3J0Jyk7XG4gICAgICAgIHRocm93IG5ldyBVbnN1cHBvcnRlZEZlYXR1cmUoYCR7ZXJyTXNnfS4gJHtzdWZmaXh9YCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKG5hbWUuaW5kZXhPZigncHJpdmF0ZS0nKSA9PT0gMCkge1xuICAgICAgICByZXR1cm4gZmFjdG9yeS5jcmVhdGVQcml2YXRlQ2hhbm5lbChuYW1lLCBwdXNoZXIpO1xuICAgIH1cbiAgICBlbHNlIGlmIChuYW1lLmluZGV4T2YoJ3ByZXNlbmNlLScpID09PSAwKSB7XG4gICAgICAgIHJldHVybiBmYWN0b3J5LmNyZWF0ZVByZXNlbmNlQ2hhbm5lbChuYW1lLCBwdXNoZXIpO1xuICAgIH1cbiAgICBlbHNlIGlmIChuYW1lLmluZGV4T2YoJyMnKSA9PT0gMCkge1xuICAgICAgICB0aHJvdyBuZXcgQmFkQ2hhbm5lbE5hbWUoJ0Nhbm5vdCBjcmVhdGUgYSBjaGFubmVsIHdpdGggbmFtZSBcIicgKyBuYW1lICsgJ1wiLicpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhY3RvcnkuY3JlYXRlQ2hhbm5lbChuYW1lLCBwdXNoZXIpO1xuICAgIH1cbn1cblxuLy8gQ09OQ0FURU5BVEVEIE1PRFVMRTogLi9zcmMvY29yZS91dGlscy9mYWN0b3J5LnRzXG5cblxuXG5cblxuXG5cblxuXG52YXIgRmFjdG9yeSA9IHtcbiAgICBjcmVhdGVDaGFubmVscygpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBjaGFubmVsc19DaGFubmVscygpO1xuICAgIH0sXG4gICAgY3JlYXRlQ29ubmVjdGlvbk1hbmFnZXIoa2V5LCBvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiBuZXcgY29ubmVjdGlvbl9tYW5hZ2VyX0Nvbm5lY3Rpb25NYW5hZ2VyKGtleSwgb3B0aW9ucyk7XG4gICAgfSxcbiAgICBjcmVhdGVDaGFubmVsKG5hbWUsIHB1c2hlcikge1xuICAgICAgICByZXR1cm4gbmV3IGNoYW5uZWxfQ2hhbm5lbChuYW1lLCBwdXNoZXIpO1xuICAgIH0sXG4gICAgY3JlYXRlUHJpdmF0ZUNoYW5uZWwobmFtZSwgcHVzaGVyKSB7XG4gICAgICAgIHJldHVybiBuZXcgcHJpdmF0ZV9jaGFubmVsX1ByaXZhdGVDaGFubmVsKG5hbWUsIHB1c2hlcik7XG4gICAgfSxcbiAgICBjcmVhdGVQcmVzZW5jZUNoYW5uZWwobmFtZSwgcHVzaGVyKSB7XG4gICAgICAgIHJldHVybiBuZXcgcHJlc2VuY2VfY2hhbm5lbF9QcmVzZW5jZUNoYW5uZWwobmFtZSwgcHVzaGVyKTtcbiAgICB9LFxuICAgIGNyZWF0ZUVuY3J5cHRlZENoYW5uZWwobmFtZSwgcHVzaGVyLCBuYWNsKSB7XG4gICAgICAgIHJldHVybiBuZXcgZW5jcnlwdGVkX2NoYW5uZWxfRW5jcnlwdGVkQ2hhbm5lbChuYW1lLCBwdXNoZXIsIG5hY2wpO1xuICAgIH0sXG4gICAgY3JlYXRlVGltZWxpbmVTZW5kZXIodGltZWxpbmUsIG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIG5ldyB0aW1lbGluZV9zZW5kZXJfVGltZWxpbmVTZW5kZXIodGltZWxpbmUsIG9wdGlvbnMpO1xuICAgIH0sXG4gICAgY3JlYXRlSGFuZHNoYWtlKHRyYW5zcG9ydCwgY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIG5ldyBoYW5kc2hha2VfSGFuZHNoYWtlKHRyYW5zcG9ydCwgY2FsbGJhY2spO1xuICAgIH0sXG4gICAgY3JlYXRlQXNzaXN0YW50VG9UaGVUcmFuc3BvcnRNYW5hZ2VyKG1hbmFnZXIsIHRyYW5zcG9ydCwgb3B0aW9ucykge1xuICAgICAgICByZXR1cm4gbmV3IGFzc2lzdGFudF90b190aGVfdHJhbnNwb3J0X21hbmFnZXJfQXNzaXN0YW50VG9UaGVUcmFuc3BvcnRNYW5hZ2VyKG1hbmFnZXIsIHRyYW5zcG9ydCwgb3B0aW9ucyk7XG4gICAgfVxufTtcbi8qIGhhcm1vbnkgZGVmYXVsdCBleHBvcnQgKi8gdmFyIGZhY3RvcnkgPSAoRmFjdG9yeSk7XG5cbi8vIENPTkNBVEVOQVRFRCBNT0RVTEU6IC4vc3JjL2NvcmUvdHJhbnNwb3J0cy90cmFuc3BvcnRfbWFuYWdlci50c1xuXG5jbGFzcyB0cmFuc3BvcnRfbWFuYWdlcl9UcmFuc3BvcnRNYW5hZ2VyIHtcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgICAgIHRoaXMubGl2ZXNMZWZ0ID0gdGhpcy5vcHRpb25zLmxpdmVzIHx8IEluZmluaXR5O1xuICAgIH1cbiAgICBnZXRBc3Npc3RhbnQodHJhbnNwb3J0KSB7XG4gICAgICAgIHJldHVybiBmYWN0b3J5LmNyZWF0ZUFzc2lzdGFudFRvVGhlVHJhbnNwb3J0TWFuYWdlcih0aGlzLCB0cmFuc3BvcnQsIHtcbiAgICAgICAgICAgIG1pblBpbmdEZWxheTogdGhpcy5vcHRpb25zLm1pblBpbmdEZWxheSxcbiAgICAgICAgICAgIG1heFBpbmdEZWxheTogdGhpcy5vcHRpb25zLm1heFBpbmdEZWxheVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgaXNBbGl2ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGl2ZXNMZWZ0ID4gMDtcbiAgICB9XG4gICAgcmVwb3J0RGVhdGgoKSB7XG4gICAgICAgIHRoaXMubGl2ZXNMZWZ0IC09IDE7XG4gICAgfVxufVxuXG4vLyBDT05DQVRFTkFURUQgTU9EVUxFOiAuL3NyYy9jb3JlL3N0cmF0ZWdpZXMvc2VxdWVudGlhbF9zdHJhdGVneS50c1xuXG5cblxuY2xhc3Mgc2VxdWVudGlhbF9zdHJhdGVneV9TZXF1ZW50aWFsU3RyYXRlZ3kge1xuICAgIGNvbnN0cnVjdG9yKHN0cmF0ZWdpZXMsIG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5zdHJhdGVnaWVzID0gc3RyYXRlZ2llcztcbiAgICAgICAgdGhpcy5sb29wID0gQm9vbGVhbihvcHRpb25zLmxvb3ApO1xuICAgICAgICB0aGlzLmZhaWxGYXN0ID0gQm9vbGVhbihvcHRpb25zLmZhaWxGYXN0KTtcbiAgICAgICAgdGhpcy50aW1lb3V0ID0gb3B0aW9ucy50aW1lb3V0O1xuICAgICAgICB0aGlzLnRpbWVvdXRMaW1pdCA9IG9wdGlvbnMudGltZW91dExpbWl0O1xuICAgIH1cbiAgICBpc1N1cHBvcnRlZCgpIHtcbiAgICAgICAgcmV0dXJuIGFueSh0aGlzLnN0cmF0ZWdpZXMsIHV0aWwubWV0aG9kKCdpc1N1cHBvcnRlZCcpKTtcbiAgICB9XG4gICAgY29ubmVjdChtaW5Qcmlvcml0eSwgY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIHN0cmF0ZWdpZXMgPSB0aGlzLnN0cmF0ZWdpZXM7XG4gICAgICAgIHZhciBjdXJyZW50ID0gMDtcbiAgICAgICAgdmFyIHRpbWVvdXQgPSB0aGlzLnRpbWVvdXQ7XG4gICAgICAgIHZhciBydW5uZXIgPSBudWxsO1xuICAgICAgICB2YXIgdHJ5TmV4dFN0cmF0ZWd5ID0gKGVycm9yLCBoYW5kc2hha2UpID0+IHtcbiAgICAgICAgICAgIGlmIChoYW5kc2hha2UpIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhudWxsLCBoYW5kc2hha2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY3VycmVudCA9IGN1cnJlbnQgKyAxO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmxvb3ApIHtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudCA9IGN1cnJlbnQgJSBzdHJhdGVnaWVzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnQgPCBzdHJhdGVnaWVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGltZW91dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGltZW91dCA9IHRpbWVvdXQgKiAyO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMudGltZW91dExpbWl0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGltZW91dCA9IE1hdGgubWluKHRpbWVvdXQsIHRoaXMudGltZW91dExpbWl0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBydW5uZXIgPSB0aGlzLnRyeVN0cmF0ZWd5KHN0cmF0ZWdpZXNbY3VycmVudF0sIG1pblByaW9yaXR5LCB7IHRpbWVvdXQsIGZhaWxGYXN0OiB0aGlzLmZhaWxGYXN0IH0sIHRyeU5leHRTdHJhdGVneSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayh0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJ1bm5lciA9IHRoaXMudHJ5U3RyYXRlZ3koc3RyYXRlZ2llc1tjdXJyZW50XSwgbWluUHJpb3JpdHksIHsgdGltZW91dDogdGltZW91dCwgZmFpbEZhc3Q6IHRoaXMuZmFpbEZhc3QgfSwgdHJ5TmV4dFN0cmF0ZWd5KTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGFib3J0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcnVubmVyLmFib3J0KCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZm9yY2VNaW5Qcmlvcml0eTogZnVuY3Rpb24gKHApIHtcbiAgICAgICAgICAgICAgICBtaW5Qcmlvcml0eSA9IHA7XG4gICAgICAgICAgICAgICAgaWYgKHJ1bm5lcikge1xuICAgICAgICAgICAgICAgICAgICBydW5uZXIuZm9yY2VNaW5Qcmlvcml0eShwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuICAgIHRyeVN0cmF0ZWd5KHN0cmF0ZWd5LCBtaW5Qcmlvcml0eSwgb3B0aW9ucywgY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIHRpbWVyID0gbnVsbDtcbiAgICAgICAgdmFyIHJ1bm5lciA9IG51bGw7XG4gICAgICAgIGlmIChvcHRpb25zLnRpbWVvdXQgPiAwKSB7XG4gICAgICAgICAgICB0aW1lciA9IG5ldyB0aW1lcnNfT25lT2ZmVGltZXIob3B0aW9ucy50aW1lb3V0LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcnVubmVyLmFib3J0KCk7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sodHJ1ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBydW5uZXIgPSBzdHJhdGVneS5jb25uZWN0KG1pblByaW9yaXR5LCBmdW5jdGlvbiAoZXJyb3IsIGhhbmRzaGFrZSkge1xuICAgICAgICAgICAgaWYgKGVycm9yICYmIHRpbWVyICYmIHRpbWVyLmlzUnVubmluZygpICYmICFvcHRpb25zLmZhaWxGYXN0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRpbWVyKSB7XG4gICAgICAgICAgICAgICAgdGltZXIuZW5zdXJlQWJvcnRlZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FsbGJhY2soZXJyb3IsIGhhbmRzaGFrZSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYWJvcnQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAodGltZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGltZXIuZW5zdXJlQWJvcnRlZCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBydW5uZXIuYWJvcnQoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmb3JjZU1pblByaW9yaXR5OiBmdW5jdGlvbiAocCkge1xuICAgICAgICAgICAgICAgIHJ1bm5lci5mb3JjZU1pblByaW9yaXR5KHApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cbn1cblxuLy8gQ09OQ0FURU5BVEVEIE1PRFVMRTogLi9zcmMvY29yZS9zdHJhdGVnaWVzL2Jlc3RfY29ubmVjdGVkX2V2ZXJfc3RyYXRlZ3kudHNcblxuXG5jbGFzcyBiZXN0X2Nvbm5lY3RlZF9ldmVyX3N0cmF0ZWd5X0Jlc3RDb25uZWN0ZWRFdmVyU3RyYXRlZ3kge1xuICAgIGNvbnN0cnVjdG9yKHN0cmF0ZWdpZXMpIHtcbiAgICAgICAgdGhpcy5zdHJhdGVnaWVzID0gc3RyYXRlZ2llcztcbiAgICB9XG4gICAgaXNTdXBwb3J0ZWQoKSB7XG4gICAgICAgIHJldHVybiBhbnkodGhpcy5zdHJhdGVnaWVzLCB1dGlsLm1ldGhvZCgnaXNTdXBwb3J0ZWQnKSk7XG4gICAgfVxuICAgIGNvbm5lY3QobWluUHJpb3JpdHksIGNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiBjb25uZWN0KHRoaXMuc3RyYXRlZ2llcywgbWluUHJpb3JpdHksIGZ1bmN0aW9uIChpLCBydW5uZXJzKSB7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGVycm9yLCBoYW5kc2hha2UpIHtcbiAgICAgICAgICAgICAgICBydW5uZXJzW2ldLmVycm9yID0gZXJyb3I7XG4gICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChhbGxSdW5uZXJzRmFpbGVkKHJ1bm5lcnMpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGFwcGx5KHJ1bm5lcnMsIGZ1bmN0aW9uIChydW5uZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgcnVubmVyLmZvcmNlTWluUHJpb3JpdHkoaGFuZHNoYWtlLnRyYW5zcG9ydC5wcmlvcml0eSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sobnVsbCwgaGFuZHNoYWtlKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGNvbm5lY3Qoc3RyYXRlZ2llcywgbWluUHJpb3JpdHksIGNhbGxiYWNrQnVpbGRlcikge1xuICAgIHZhciBydW5uZXJzID0gbWFwKHN0cmF0ZWdpZXMsIGZ1bmN0aW9uIChzdHJhdGVneSwgaSwgXywgcnMpIHtcbiAgICAgICAgcmV0dXJuIHN0cmF0ZWd5LmNvbm5lY3QobWluUHJpb3JpdHksIGNhbGxiYWNrQnVpbGRlcihpLCBycykpO1xuICAgIH0pO1xuICAgIHJldHVybiB7XG4gICAgICAgIGFib3J0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBhcHBseShydW5uZXJzLCBhYm9ydFJ1bm5lcik7XG4gICAgICAgIH0sXG4gICAgICAgIGZvcmNlTWluUHJpb3JpdHk6IGZ1bmN0aW9uIChwKSB7XG4gICAgICAgICAgICBhcHBseShydW5uZXJzLCBmdW5jdGlvbiAocnVubmVyKSB7XG4gICAgICAgICAgICAgICAgcnVubmVyLmZvcmNlTWluUHJpb3JpdHkocCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG59XG5mdW5jdGlvbiBhbGxSdW5uZXJzRmFpbGVkKHJ1bm5lcnMpIHtcbiAgICByZXR1cm4gY29sbGVjdGlvbnNfYWxsKHJ1bm5lcnMsIGZ1bmN0aW9uIChydW5uZXIpIHtcbiAgICAgICAgcmV0dXJuIEJvb2xlYW4ocnVubmVyLmVycm9yKTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGFib3J0UnVubmVyKHJ1bm5lcikge1xuICAgIGlmICghcnVubmVyLmVycm9yICYmICFydW5uZXIuYWJvcnRlZCkge1xuICAgICAgICBydW5uZXIuYWJvcnQoKTtcbiAgICAgICAgcnVubmVyLmFib3J0ZWQgPSB0cnVlO1xuICAgIH1cbn1cblxuLy8gQ09OQ0FURU5BVEVEIE1PRFVMRTogLi9zcmMvY29yZS9zdHJhdGVnaWVzL3dlYnNvY2tldF9wcmlvcml0aXplZF9jYWNoZWRfc3RyYXRlZ3kudHNcblxuXG5cblxuY2xhc3Mgd2Vic29ja2V0X3ByaW9yaXRpemVkX2NhY2hlZF9zdHJhdGVneV9XZWJTb2NrZXRQcmlvcml0aXplZENhY2hlZFN0cmF0ZWd5IHtcbiAgICBjb25zdHJ1Y3RvcihzdHJhdGVneSwgdHJhbnNwb3J0cywgb3B0aW9ucykge1xuICAgICAgICB0aGlzLnN0cmF0ZWd5ID0gc3RyYXRlZ3k7XG4gICAgICAgIHRoaXMudHJhbnNwb3J0cyA9IHRyYW5zcG9ydHM7XG4gICAgICAgIHRoaXMudHRsID0gb3B0aW9ucy50dGwgfHwgMTgwMCAqIDEwMDA7XG4gICAgICAgIHRoaXMudXNpbmdUTFMgPSBvcHRpb25zLnVzZVRMUztcbiAgICAgICAgdGhpcy50aW1lbGluZSA9IG9wdGlvbnMudGltZWxpbmU7XG4gICAgfVxuICAgIGlzU3VwcG9ydGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdHJhdGVneS5pc1N1cHBvcnRlZCgpO1xuICAgIH1cbiAgICBjb25uZWN0KG1pblByaW9yaXR5LCBjYWxsYmFjaykge1xuICAgICAgICB2YXIgdXNpbmdUTFMgPSB0aGlzLnVzaW5nVExTO1xuICAgICAgICB2YXIgaW5mbyA9IGZldGNoVHJhbnNwb3J0Q2FjaGUodXNpbmdUTFMpO1xuICAgICAgICB2YXIgY2FjaGVTa2lwQ291bnQgPSBpbmZvICYmIGluZm8uY2FjaGVTa2lwQ291bnQgPyBpbmZvLmNhY2hlU2tpcENvdW50IDogMDtcbiAgICAgICAgdmFyIHN0cmF0ZWdpZXMgPSBbdGhpcy5zdHJhdGVneV07XG4gICAgICAgIGlmIChpbmZvICYmIGluZm8udGltZXN0YW1wICsgdGhpcy50dGwgPj0gdXRpbC5ub3coKSkge1xuICAgICAgICAgICAgdmFyIHRyYW5zcG9ydCA9IHRoaXMudHJhbnNwb3J0c1tpbmZvLnRyYW5zcG9ydF07XG4gICAgICAgICAgICBpZiAodHJhbnNwb3J0KSB7XG4gICAgICAgICAgICAgICAgaWYgKFsnd3MnLCAnd3NzJ10uaW5jbHVkZXMoaW5mby50cmFuc3BvcnQpIHx8IGNhY2hlU2tpcENvdW50ID4gMykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbWVsaW5lLmluZm8oe1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FjaGVkOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNwb3J0OiBpbmZvLnRyYW5zcG9ydCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhdGVuY3k6IGluZm8ubGF0ZW5jeVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgc3RyYXRlZ2llcy5wdXNoKG5ldyBzZXF1ZW50aWFsX3N0cmF0ZWd5X1NlcXVlbnRpYWxTdHJhdGVneShbdHJhbnNwb3J0XSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGltZW91dDogaW5mby5sYXRlbmN5ICogMiArIDEwMDAsXG4gICAgICAgICAgICAgICAgICAgICAgICBmYWlsRmFzdDogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjYWNoZVNraXBDb3VudCsrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgc3RhcnRUaW1lc3RhbXAgPSB1dGlsLm5vdygpO1xuICAgICAgICB2YXIgcnVubmVyID0gc3RyYXRlZ2llc1xuICAgICAgICAgICAgLnBvcCgpXG4gICAgICAgICAgICAuY29ubmVjdChtaW5Qcmlvcml0eSwgZnVuY3Rpb24gY2IoZXJyb3IsIGhhbmRzaGFrZSkge1xuICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgZmx1c2hUcmFuc3BvcnRDYWNoZSh1c2luZ1RMUyk7XG4gICAgICAgICAgICAgICAgaWYgKHN0cmF0ZWdpZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBzdGFydFRpbWVzdGFtcCA9IHV0aWwubm93KCk7XG4gICAgICAgICAgICAgICAgICAgIHJ1bm5lciA9IHN0cmF0ZWdpZXMucG9wKCkuY29ubmVjdChtaW5Qcmlvcml0eSwgY2IpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soZXJyb3IpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHN0b3JlVHJhbnNwb3J0Q2FjaGUodXNpbmdUTFMsIGhhbmRzaGFrZS50cmFuc3BvcnQubmFtZSwgdXRpbC5ub3coKSAtIHN0YXJ0VGltZXN0YW1wLCBjYWNoZVNraXBDb3VudCk7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sobnVsbCwgaGFuZHNoYWtlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBhYm9ydDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJ1bm5lci5hYm9ydCgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZvcmNlTWluUHJpb3JpdHk6IGZ1bmN0aW9uIChwKSB7XG4gICAgICAgICAgICAgICAgbWluUHJpb3JpdHkgPSBwO1xuICAgICAgICAgICAgICAgIGlmIChydW5uZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgcnVubmVyLmZvcmNlTWluUHJpb3JpdHkocCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cbn1cbmZ1bmN0aW9uIGdldFRyYW5zcG9ydENhY2hlS2V5KHVzaW5nVExTKSB7XG4gICAgcmV0dXJuICdwdXNoZXJUcmFuc3BvcnQnICsgKHVzaW5nVExTID8gJ1RMUycgOiAnTm9uVExTJyk7XG59XG5mdW5jdGlvbiBmZXRjaFRyYW5zcG9ydENhY2hlKHVzaW5nVExTKSB7XG4gICAgdmFyIHN0b3JhZ2UgPSBydW50aW1lLmdldExvY2FsU3RvcmFnZSgpO1xuICAgIGlmIChzdG9yYWdlKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB2YXIgc2VyaWFsaXplZENhY2hlID0gc3RvcmFnZVtnZXRUcmFuc3BvcnRDYWNoZUtleSh1c2luZ1RMUyldO1xuICAgICAgICAgICAgaWYgKHNlcmlhbGl6ZWRDYWNoZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKHNlcmlhbGl6ZWRDYWNoZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGZsdXNoVHJhbnNwb3J0Q2FjaGUodXNpbmdUTFMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufVxuZnVuY3Rpb24gc3RvcmVUcmFuc3BvcnRDYWNoZSh1c2luZ1RMUywgdHJhbnNwb3J0LCBsYXRlbmN5LCBjYWNoZVNraXBDb3VudCkge1xuICAgIHZhciBzdG9yYWdlID0gcnVudGltZS5nZXRMb2NhbFN0b3JhZ2UoKTtcbiAgICBpZiAoc3RvcmFnZSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgc3RvcmFnZVtnZXRUcmFuc3BvcnRDYWNoZUtleSh1c2luZ1RMUyldID0gc2FmZUpTT05TdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgIHRpbWVzdGFtcDogdXRpbC5ub3coKSxcbiAgICAgICAgICAgICAgICB0cmFuc3BvcnQ6IHRyYW5zcG9ydCxcbiAgICAgICAgICAgICAgICBsYXRlbmN5OiBsYXRlbmN5LFxuICAgICAgICAgICAgICAgIGNhY2hlU2tpcENvdW50OiBjYWNoZVNraXBDb3VudFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgfVxuICAgIH1cbn1cbmZ1bmN0aW9uIGZsdXNoVHJhbnNwb3J0Q2FjaGUodXNpbmdUTFMpIHtcbiAgICB2YXIgc3RvcmFnZSA9IHJ1bnRpbWUuZ2V0TG9jYWxTdG9yYWdlKCk7XG4gICAgaWYgKHN0b3JhZ2UpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGRlbGV0ZSBzdG9yYWdlW2dldFRyYW5zcG9ydENhY2hlS2V5KHVzaW5nVExTKV07XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLy8gQ09OQ0FURU5BVEVEIE1PRFVMRTogLi9zcmMvY29yZS9zdHJhdGVnaWVzL2RlbGF5ZWRfc3RyYXRlZ3kudHNcblxuY2xhc3MgZGVsYXllZF9zdHJhdGVneV9EZWxheWVkU3RyYXRlZ3kge1xuICAgIGNvbnN0cnVjdG9yKHN0cmF0ZWd5LCB7IGRlbGF5OiBudW1iZXIgfSkge1xuICAgICAgICB0aGlzLnN0cmF0ZWd5ID0gc3RyYXRlZ3k7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IHsgZGVsYXk6IG51bWJlciB9O1xuICAgIH1cbiAgICBpc1N1cHBvcnRlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RyYXRlZ3kuaXNTdXBwb3J0ZWQoKTtcbiAgICB9XG4gICAgY29ubmVjdChtaW5Qcmlvcml0eSwgY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIHN0cmF0ZWd5ID0gdGhpcy5zdHJhdGVneTtcbiAgICAgICAgdmFyIHJ1bm5lcjtcbiAgICAgICAgdmFyIHRpbWVyID0gbmV3IHRpbWVyc19PbmVPZmZUaW1lcih0aGlzLm9wdGlvbnMuZGVsYXksIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJ1bm5lciA9IHN0cmF0ZWd5LmNvbm5lY3QobWluUHJpb3JpdHksIGNhbGxiYWNrKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBhYm9ydDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRpbWVyLmVuc3VyZUFib3J0ZWQoKTtcbiAgICAgICAgICAgICAgICBpZiAocnVubmVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJ1bm5lci5hYm9ydCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmb3JjZU1pblByaW9yaXR5OiBmdW5jdGlvbiAocCkge1xuICAgICAgICAgICAgICAgIG1pblByaW9yaXR5ID0gcDtcbiAgICAgICAgICAgICAgICBpZiAocnVubmVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJ1bm5lci5mb3JjZU1pblByaW9yaXR5KHApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG59XG5cbi8vIENPTkNBVEVOQVRFRCBNT0RVTEU6IC4vc3JjL2NvcmUvc3RyYXRlZ2llcy9pZl9zdHJhdGVneS50c1xuY2xhc3MgSWZTdHJhdGVneSB7XG4gICAgY29uc3RydWN0b3IodGVzdCwgdHJ1ZUJyYW5jaCwgZmFsc2VCcmFuY2gpIHtcbiAgICAgICAgdGhpcy50ZXN0ID0gdGVzdDtcbiAgICAgICAgdGhpcy50cnVlQnJhbmNoID0gdHJ1ZUJyYW5jaDtcbiAgICAgICAgdGhpcy5mYWxzZUJyYW5jaCA9IGZhbHNlQnJhbmNoO1xuICAgIH1cbiAgICBpc1N1cHBvcnRlZCgpIHtcbiAgICAgICAgdmFyIGJyYW5jaCA9IHRoaXMudGVzdCgpID8gdGhpcy50cnVlQnJhbmNoIDogdGhpcy5mYWxzZUJyYW5jaDtcbiAgICAgICAgcmV0dXJuIGJyYW5jaC5pc1N1cHBvcnRlZCgpO1xuICAgIH1cbiAgICBjb25uZWN0KG1pblByaW9yaXR5LCBjYWxsYmFjaykge1xuICAgICAgICB2YXIgYnJhbmNoID0gdGhpcy50ZXN0KCkgPyB0aGlzLnRydWVCcmFuY2ggOiB0aGlzLmZhbHNlQnJhbmNoO1xuICAgICAgICByZXR1cm4gYnJhbmNoLmNvbm5lY3QobWluUHJpb3JpdHksIGNhbGxiYWNrKTtcbiAgICB9XG59XG5cbi8vIENPTkNBVEVOQVRFRCBNT0RVTEU6IC4vc3JjL2NvcmUvc3RyYXRlZ2llcy9maXJzdF9jb25uZWN0ZWRfc3RyYXRlZ3kudHNcbmNsYXNzIEZpcnN0Q29ubmVjdGVkU3RyYXRlZ3kge1xuICAgIGNvbnN0cnVjdG9yKHN0cmF0ZWd5KSB7XG4gICAgICAgIHRoaXMuc3RyYXRlZ3kgPSBzdHJhdGVneTtcbiAgICB9XG4gICAgaXNTdXBwb3J0ZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0cmF0ZWd5LmlzU3VwcG9ydGVkKCk7XG4gICAgfVxuICAgIGNvbm5lY3QobWluUHJpb3JpdHksIGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciBydW5uZXIgPSB0aGlzLnN0cmF0ZWd5LmNvbm5lY3QobWluUHJpb3JpdHksIGZ1bmN0aW9uIChlcnJvciwgaGFuZHNoYWtlKSB7XG4gICAgICAgICAgICBpZiAoaGFuZHNoYWtlKSB7XG4gICAgICAgICAgICAgICAgcnVubmVyLmFib3J0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYWxsYmFjayhlcnJvciwgaGFuZHNoYWtlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBydW5uZXI7XG4gICAgfVxufVxuXG4vLyBDT05DQVRFTkFURUQgTU9EVUxFOiAuL3NyYy9ydW50aW1lcy93ZWIvZGVmYXVsdF9zdHJhdGVneS50c1xuXG5cblxuXG5cblxuXG5mdW5jdGlvbiB0ZXN0U3VwcG9ydHNTdHJhdGVneShzdHJhdGVneSkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBzdHJhdGVneS5pc1N1cHBvcnRlZCgpO1xuICAgIH07XG59XG52YXIgZ2V0RGVmYXVsdFN0cmF0ZWd5ID0gZnVuY3Rpb24gKGNvbmZpZywgYmFzZU9wdGlvbnMsIGRlZmluZVRyYW5zcG9ydCkge1xuICAgIHZhciBkZWZpbmVkVHJhbnNwb3J0cyA9IHt9O1xuICAgIGZ1bmN0aW9uIGRlZmluZVRyYW5zcG9ydFN0cmF0ZWd5KG5hbWUsIHR5cGUsIHByaW9yaXR5LCBvcHRpb25zLCBtYW5hZ2VyKSB7XG4gICAgICAgIHZhciB0cmFuc3BvcnQgPSBkZWZpbmVUcmFuc3BvcnQoY29uZmlnLCBuYW1lLCB0eXBlLCBwcmlvcml0eSwgb3B0aW9ucywgbWFuYWdlcik7XG4gICAgICAgIGRlZmluZWRUcmFuc3BvcnRzW25hbWVdID0gdHJhbnNwb3J0O1xuICAgICAgICByZXR1cm4gdHJhbnNwb3J0O1xuICAgIH1cbiAgICB2YXIgd3Nfb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIGJhc2VPcHRpb25zLCB7XG4gICAgICAgIGhvc3ROb25UTFM6IGNvbmZpZy53c0hvc3QgKyAnOicgKyBjb25maWcud3NQb3J0LFxuICAgICAgICBob3N0VExTOiBjb25maWcud3NIb3N0ICsgJzonICsgY29uZmlnLndzc1BvcnQsXG4gICAgICAgIGh0dHBQYXRoOiBjb25maWcud3NQYXRoXG4gICAgfSk7XG4gICAgdmFyIHdzc19vcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgd3Nfb3B0aW9ucywge1xuICAgICAgICB1c2VUTFM6IHRydWVcbiAgICB9KTtcbiAgICB2YXIgc29ja2pzX29wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCBiYXNlT3B0aW9ucywge1xuICAgICAgICBob3N0Tm9uVExTOiBjb25maWcuaHR0cEhvc3QgKyAnOicgKyBjb25maWcuaHR0cFBvcnQsXG4gICAgICAgIGhvc3RUTFM6IGNvbmZpZy5odHRwSG9zdCArICc6JyArIGNvbmZpZy5odHRwc1BvcnQsXG4gICAgICAgIGh0dHBQYXRoOiBjb25maWcuaHR0cFBhdGhcbiAgICB9KTtcbiAgICB2YXIgdGltZW91dHMgPSB7XG4gICAgICAgIGxvb3A6IHRydWUsXG4gICAgICAgIHRpbWVvdXQ6IDE1MDAwLFxuICAgICAgICB0aW1lb3V0TGltaXQ6IDYwMDAwXG4gICAgfTtcbiAgICB2YXIgd3NfbWFuYWdlciA9IG5ldyB0cmFuc3BvcnRfbWFuYWdlcl9UcmFuc3BvcnRNYW5hZ2VyKHtcbiAgICAgICAgbWluUGluZ0RlbGF5OiAxMDAwMCxcbiAgICAgICAgbWF4UGluZ0RlbGF5OiBjb25maWcuYWN0aXZpdHlUaW1lb3V0XG4gICAgfSk7XG4gICAgdmFyIHN0cmVhbWluZ19tYW5hZ2VyID0gbmV3IHRyYW5zcG9ydF9tYW5hZ2VyX1RyYW5zcG9ydE1hbmFnZXIoe1xuICAgICAgICBsaXZlczogMixcbiAgICAgICAgbWluUGluZ0RlbGF5OiAxMDAwMCxcbiAgICAgICAgbWF4UGluZ0RlbGF5OiBjb25maWcuYWN0aXZpdHlUaW1lb3V0XG4gICAgfSk7XG4gICAgdmFyIHdzX3RyYW5zcG9ydCA9IGRlZmluZVRyYW5zcG9ydFN0cmF0ZWd5KCd3cycsICd3cycsIDMsIHdzX29wdGlvbnMsIHdzX21hbmFnZXIpO1xuICAgIHZhciB3c3NfdHJhbnNwb3J0ID0gZGVmaW5lVHJhbnNwb3J0U3RyYXRlZ3koJ3dzcycsICd3cycsIDMsIHdzc19vcHRpb25zLCB3c19tYW5hZ2VyKTtcbiAgICB2YXIgc29ja2pzX3RyYW5zcG9ydCA9IGRlZmluZVRyYW5zcG9ydFN0cmF0ZWd5KCdzb2NranMnLCAnc29ja2pzJywgMSwgc29ja2pzX29wdGlvbnMpO1xuICAgIHZhciB4aHJfc3RyZWFtaW5nX3RyYW5zcG9ydCA9IGRlZmluZVRyYW5zcG9ydFN0cmF0ZWd5KCd4aHJfc3RyZWFtaW5nJywgJ3hocl9zdHJlYW1pbmcnLCAxLCBzb2NranNfb3B0aW9ucywgc3RyZWFtaW5nX21hbmFnZXIpO1xuICAgIHZhciB4ZHJfc3RyZWFtaW5nX3RyYW5zcG9ydCA9IGRlZmluZVRyYW5zcG9ydFN0cmF0ZWd5KCd4ZHJfc3RyZWFtaW5nJywgJ3hkcl9zdHJlYW1pbmcnLCAxLCBzb2NranNfb3B0aW9ucywgc3RyZWFtaW5nX21hbmFnZXIpO1xuICAgIHZhciB4aHJfcG9sbGluZ190cmFuc3BvcnQgPSBkZWZpbmVUcmFuc3BvcnRTdHJhdGVneSgneGhyX3BvbGxpbmcnLCAneGhyX3BvbGxpbmcnLCAxLCBzb2NranNfb3B0aW9ucyk7XG4gICAgdmFyIHhkcl9wb2xsaW5nX3RyYW5zcG9ydCA9IGRlZmluZVRyYW5zcG9ydFN0cmF0ZWd5KCd4ZHJfcG9sbGluZycsICd4ZHJfcG9sbGluZycsIDEsIHNvY2tqc19vcHRpb25zKTtcbiAgICB2YXIgd3NfbG9vcCA9IG5ldyBzZXF1ZW50aWFsX3N0cmF0ZWd5X1NlcXVlbnRpYWxTdHJhdGVneShbd3NfdHJhbnNwb3J0XSwgdGltZW91dHMpO1xuICAgIHZhciB3c3NfbG9vcCA9IG5ldyBzZXF1ZW50aWFsX3N0cmF0ZWd5X1NlcXVlbnRpYWxTdHJhdGVneShbd3NzX3RyYW5zcG9ydF0sIHRpbWVvdXRzKTtcbiAgICB2YXIgc29ja2pzX2xvb3AgPSBuZXcgc2VxdWVudGlhbF9zdHJhdGVneV9TZXF1ZW50aWFsU3RyYXRlZ3koW3NvY2tqc190cmFuc3BvcnRdLCB0aW1lb3V0cyk7XG4gICAgdmFyIHN0cmVhbWluZ19sb29wID0gbmV3IHNlcXVlbnRpYWxfc3RyYXRlZ3lfU2VxdWVudGlhbFN0cmF0ZWd5KFtcbiAgICAgICAgbmV3IElmU3RyYXRlZ3kodGVzdFN1cHBvcnRzU3RyYXRlZ3koeGhyX3N0cmVhbWluZ190cmFuc3BvcnQpLCB4aHJfc3RyZWFtaW5nX3RyYW5zcG9ydCwgeGRyX3N0cmVhbWluZ190cmFuc3BvcnQpXG4gICAgXSwgdGltZW91dHMpO1xuICAgIHZhciBwb2xsaW5nX2xvb3AgPSBuZXcgc2VxdWVudGlhbF9zdHJhdGVneV9TZXF1ZW50aWFsU3RyYXRlZ3koW1xuICAgICAgICBuZXcgSWZTdHJhdGVneSh0ZXN0U3VwcG9ydHNTdHJhdGVneSh4aHJfcG9sbGluZ190cmFuc3BvcnQpLCB4aHJfcG9sbGluZ190cmFuc3BvcnQsIHhkcl9wb2xsaW5nX3RyYW5zcG9ydClcbiAgICBdLCB0aW1lb3V0cyk7XG4gICAgdmFyIGh0dHBfbG9vcCA9IG5ldyBzZXF1ZW50aWFsX3N0cmF0ZWd5X1NlcXVlbnRpYWxTdHJhdGVneShbXG4gICAgICAgIG5ldyBJZlN0cmF0ZWd5KHRlc3RTdXBwb3J0c1N0cmF0ZWd5KHN0cmVhbWluZ19sb29wKSwgbmV3IGJlc3RfY29ubmVjdGVkX2V2ZXJfc3RyYXRlZ3lfQmVzdENvbm5lY3RlZEV2ZXJTdHJhdGVneShbXG4gICAgICAgICAgICBzdHJlYW1pbmdfbG9vcCxcbiAgICAgICAgICAgIG5ldyBkZWxheWVkX3N0cmF0ZWd5X0RlbGF5ZWRTdHJhdGVneShwb2xsaW5nX2xvb3AsIHsgZGVsYXk6IDQwMDAgfSlcbiAgICAgICAgXSksIHBvbGxpbmdfbG9vcClcbiAgICBdLCB0aW1lb3V0cyk7XG4gICAgdmFyIGh0dHBfZmFsbGJhY2tfbG9vcCA9IG5ldyBJZlN0cmF0ZWd5KHRlc3RTdXBwb3J0c1N0cmF0ZWd5KGh0dHBfbG9vcCksIGh0dHBfbG9vcCwgc29ja2pzX2xvb3ApO1xuICAgIHZhciB3c1N0cmF0ZWd5O1xuICAgIGlmIChiYXNlT3B0aW9ucy51c2VUTFMpIHtcbiAgICAgICAgd3NTdHJhdGVneSA9IG5ldyBiZXN0X2Nvbm5lY3RlZF9ldmVyX3N0cmF0ZWd5X0Jlc3RDb25uZWN0ZWRFdmVyU3RyYXRlZ3koW1xuICAgICAgICAgICAgd3NfbG9vcCxcbiAgICAgICAgICAgIG5ldyBkZWxheWVkX3N0cmF0ZWd5X0RlbGF5ZWRTdHJhdGVneShodHRwX2ZhbGxiYWNrX2xvb3AsIHsgZGVsYXk6IDIwMDAgfSlcbiAgICAgICAgXSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB3c1N0cmF0ZWd5ID0gbmV3IGJlc3RfY29ubmVjdGVkX2V2ZXJfc3RyYXRlZ3lfQmVzdENvbm5lY3RlZEV2ZXJTdHJhdGVneShbXG4gICAgICAgICAgICB3c19sb29wLFxuICAgICAgICAgICAgbmV3IGRlbGF5ZWRfc3RyYXRlZ3lfRGVsYXllZFN0cmF0ZWd5KHdzc19sb29wLCB7IGRlbGF5OiAyMDAwIH0pLFxuICAgICAgICAgICAgbmV3IGRlbGF5ZWRfc3RyYXRlZ3lfRGVsYXllZFN0cmF0ZWd5KGh0dHBfZmFsbGJhY2tfbG9vcCwgeyBkZWxheTogNTAwMCB9KVxuICAgICAgICBdKTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyB3ZWJzb2NrZXRfcHJpb3JpdGl6ZWRfY2FjaGVkX3N0cmF0ZWd5X1dlYlNvY2tldFByaW9yaXRpemVkQ2FjaGVkU3RyYXRlZ3kobmV3IEZpcnN0Q29ubmVjdGVkU3RyYXRlZ3kobmV3IElmU3RyYXRlZ3kodGVzdFN1cHBvcnRzU3RyYXRlZ3kod3NfdHJhbnNwb3J0KSwgd3NTdHJhdGVneSwgaHR0cF9mYWxsYmFja19sb29wKSksIGRlZmluZWRUcmFuc3BvcnRzLCB7XG4gICAgICAgIHR0bDogMTgwMDAwMCxcbiAgICAgICAgdGltZWxpbmU6IGJhc2VPcHRpb25zLnRpbWVsaW5lLFxuICAgICAgICB1c2VUTFM6IGJhc2VPcHRpb25zLnVzZVRMU1xuICAgIH0pO1xufTtcbi8qIGhhcm1vbnkgZGVmYXVsdCBleHBvcnQgKi8gdmFyIGRlZmF1bHRfc3RyYXRlZ3kgPSAoZ2V0RGVmYXVsdFN0cmF0ZWd5KTtcblxuLy8gQ09OQ0FURU5BVEVEIE1PRFVMRTogLi9zcmMvcnVudGltZXMvd2ViL3RyYW5zcG9ydHMvdHJhbnNwb3J0X2Nvbm5lY3Rpb25faW5pdGlhbGl6ZXIudHNcblxuLyogaGFybW9ueSBkZWZhdWx0IGV4cG9ydCAqLyB2YXIgdHJhbnNwb3J0X2Nvbm5lY3Rpb25faW5pdGlhbGl6ZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICBzZWxmLnRpbWVsaW5lLmluZm8oc2VsZi5idWlsZFRpbWVsaW5lTWVzc2FnZSh7XG4gICAgICAgIHRyYW5zcG9ydDogc2VsZi5uYW1lICsgKHNlbGYub3B0aW9ucy51c2VUTFMgPyAncycgOiAnJylcbiAgICB9KSk7XG4gICAgaWYgKHNlbGYuaG9va3MuaXNJbml0aWFsaXplZCgpKSB7XG4gICAgICAgIHNlbGYuY2hhbmdlU3RhdGUoJ2luaXRpYWxpemVkJyk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHNlbGYuaG9va3MuZmlsZSkge1xuICAgICAgICBzZWxmLmNoYW5nZVN0YXRlKCdpbml0aWFsaXppbmcnKTtcbiAgICAgICAgRGVwZW5kZW5jaWVzLmxvYWQoc2VsZi5ob29rcy5maWxlLCB7IHVzZVRMUzogc2VsZi5vcHRpb25zLnVzZVRMUyB9LCBmdW5jdGlvbiAoZXJyb3IsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBpZiAoc2VsZi5ob29rcy5pc0luaXRpYWxpemVkKCkpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmNoYW5nZVN0YXRlKCdpbml0aWFsaXplZCcpO1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYub25FcnJvcihlcnJvcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNlbGYub25DbG9zZSgpO1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBzZWxmLm9uQ2xvc2UoKTtcbiAgICB9XG59KTtcblxuLy8gQ09OQ0FURU5BVEVEIE1PRFVMRTogLi9zcmMvcnVudGltZXMvd2ViL2h0dHAvaHR0cF94ZG9tYWluX3JlcXVlc3QudHNcblxudmFyIGh0dHBfeGRvbWFpbl9yZXF1ZXN0X2hvb2tzID0ge1xuICAgIGdldFJlcXVlc3Q6IGZ1bmN0aW9uIChzb2NrZXQpIHtcbiAgICAgICAgdmFyIHhkciA9IG5ldyB3aW5kb3cuWERvbWFpblJlcXVlc3QoKTtcbiAgICAgICAgeGRyLm9udGltZW91dCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNvY2tldC5lbWl0KCdlcnJvcicsIG5ldyBSZXF1ZXN0VGltZWRPdXQoKSk7XG4gICAgICAgICAgICBzb2NrZXQuY2xvc2UoKTtcbiAgICAgICAgfTtcbiAgICAgICAgeGRyLm9uZXJyb3IgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgc29ja2V0LmVtaXQoJ2Vycm9yJywgZSk7XG4gICAgICAgICAgICBzb2NrZXQuY2xvc2UoKTtcbiAgICAgICAgfTtcbiAgICAgICAgeGRyLm9ucHJvZ3Jlc3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoeGRyLnJlc3BvbnNlVGV4dCAmJiB4ZHIucmVzcG9uc2VUZXh0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBzb2NrZXQub25DaHVuaygyMDAsIHhkci5yZXNwb25zZVRleHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB4ZHIub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKHhkci5yZXNwb25zZVRleHQgJiYgeGRyLnJlc3BvbnNlVGV4dC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgc29ja2V0Lm9uQ2h1bmsoMjAwLCB4ZHIucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNvY2tldC5lbWl0KCdmaW5pc2hlZCcsIDIwMCk7XG4gICAgICAgICAgICBzb2NrZXQuY2xvc2UoKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHhkcjtcbiAgICB9LFxuICAgIGFib3J0UmVxdWVzdDogZnVuY3Rpb24gKHhkcikge1xuICAgICAgICB4ZHIub250aW1lb3V0ID0geGRyLm9uZXJyb3IgPSB4ZHIub25wcm9ncmVzcyA9IHhkci5vbmxvYWQgPSBudWxsO1xuICAgICAgICB4ZHIuYWJvcnQoKTtcbiAgICB9XG59O1xuLyogaGFybW9ueSBkZWZhdWx0IGV4cG9ydCAqLyB2YXIgaHR0cF94ZG9tYWluX3JlcXVlc3QgPSAoaHR0cF94ZG9tYWluX3JlcXVlc3RfaG9va3MpO1xuXG4vLyBDT05DQVRFTkFURUQgTU9EVUxFOiAuL3NyYy9jb3JlL2h0dHAvaHR0cF9yZXF1ZXN0LnRzXG5cblxuY29uc3QgTUFYX0JVRkZFUl9MRU5HVEggPSAyNTYgKiAxMDI0O1xuY2xhc3MgaHR0cF9yZXF1ZXN0X0hUVFBSZXF1ZXN0IGV4dGVuZHMgZGlzcGF0Y2hlcl9EaXNwYXRjaGVyIHtcbiAgICBjb25zdHJ1Y3Rvcihob29rcywgbWV0aG9kLCB1cmwpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5ob29rcyA9IGhvb2tzO1xuICAgICAgICB0aGlzLm1ldGhvZCA9IG1ldGhvZDtcbiAgICAgICAgdGhpcy51cmwgPSB1cmw7XG4gICAgfVxuICAgIHN0YXJ0KHBheWxvYWQpIHtcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IDA7XG4gICAgICAgIHRoaXMueGhyID0gdGhpcy5ob29rcy5nZXRSZXF1ZXN0KHRoaXMpO1xuICAgICAgICB0aGlzLnVubG9hZGVyID0gKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICB9O1xuICAgICAgICBydW50aW1lLmFkZFVubG9hZExpc3RlbmVyKHRoaXMudW5sb2FkZXIpO1xuICAgICAgICB0aGlzLnhoci5vcGVuKHRoaXMubWV0aG9kLCB0aGlzLnVybCwgdHJ1ZSk7XG4gICAgICAgIGlmICh0aGlzLnhoci5zZXRSZXF1ZXN0SGVhZGVyKSB7XG4gICAgICAgICAgICB0aGlzLnhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbicpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMueGhyLnNlbmQocGF5bG9hZCk7XG4gICAgfVxuICAgIGNsb3NlKCkge1xuICAgICAgICBpZiAodGhpcy51bmxvYWRlcikge1xuICAgICAgICAgICAgcnVudGltZS5yZW1vdmVVbmxvYWRMaXN0ZW5lcih0aGlzLnVubG9hZGVyKTtcbiAgICAgICAgICAgIHRoaXMudW5sb2FkZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnhocikge1xuICAgICAgICAgICAgdGhpcy5ob29rcy5hYm9ydFJlcXVlc3QodGhpcy54aHIpO1xuICAgICAgICAgICAgdGhpcy54aHIgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuICAgIG9uQ2h1bmsoc3RhdHVzLCBkYXRhKSB7XG4gICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgICB2YXIgY2h1bmsgPSB0aGlzLmFkdmFuY2VCdWZmZXIoZGF0YSk7XG4gICAgICAgICAgICBpZiAoY2h1bmspIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVtaXQoJ2NodW5rJywgeyBzdGF0dXM6IHN0YXR1cywgZGF0YTogY2h1bmsgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5pc0J1ZmZlclRvb0xvbmcoZGF0YSkpIHtcbiAgICAgICAgICAgIHRoaXMuZW1pdCgnYnVmZmVyX3Rvb19sb25nJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYWR2YW5jZUJ1ZmZlcihidWZmZXIpIHtcbiAgICAgICAgdmFyIHVucmVhZERhdGEgPSBidWZmZXIuc2xpY2UodGhpcy5wb3NpdGlvbik7XG4gICAgICAgIHZhciBlbmRPZkxpbmVQb3NpdGlvbiA9IHVucmVhZERhdGEuaW5kZXhPZignXFxuJyk7XG4gICAgICAgIGlmIChlbmRPZkxpbmVQb3NpdGlvbiAhPT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb24gKz0gZW5kT2ZMaW5lUG9zaXRpb24gKyAxO1xuICAgICAgICAgICAgcmV0dXJuIHVucmVhZERhdGEuc2xpY2UoMCwgZW5kT2ZMaW5lUG9zaXRpb24pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaXNCdWZmZXJUb29Mb25nKGJ1ZmZlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5wb3NpdGlvbiA9PT0gYnVmZmVyLmxlbmd0aCAmJiBidWZmZXIubGVuZ3RoID4gTUFYX0JVRkZFUl9MRU5HVEg7XG4gICAgfVxufVxuXG4vLyBDT05DQVRFTkFURUQgTU9EVUxFOiAuL3NyYy9jb3JlL2h0dHAvc3RhdGUudHNcbnZhciBTdGF0ZTtcbihmdW5jdGlvbiAoU3RhdGUpIHtcbiAgICBTdGF0ZVtTdGF0ZVtcIkNPTk5FQ1RJTkdcIl0gPSAwXSA9IFwiQ09OTkVDVElOR1wiO1xuICAgIFN0YXRlW1N0YXRlW1wiT1BFTlwiXSA9IDFdID0gXCJPUEVOXCI7XG4gICAgU3RhdGVbU3RhdGVbXCJDTE9TRURcIl0gPSAzXSA9IFwiQ0xPU0VEXCI7XG59KShTdGF0ZSB8fCAoU3RhdGUgPSB7fSkpO1xuLyogaGFybW9ueSBkZWZhdWx0IGV4cG9ydCAqLyB2YXIgc3RhdGUgPSAoU3RhdGUpO1xuXG4vLyBDT05DQVRFTkFURUQgTU9EVUxFOiAuL3NyYy9jb3JlL2h0dHAvaHR0cF9zb2NrZXQudHNcblxuXG5cbnZhciBhdXRvSW5jcmVtZW50ID0gMTtcbmNsYXNzIGh0dHBfc29ja2V0X0hUVFBTb2NrZXQge1xuICAgIGNvbnN0cnVjdG9yKGhvb2tzLCB1cmwpIHtcbiAgICAgICAgdGhpcy5ob29rcyA9IGhvb2tzO1xuICAgICAgICB0aGlzLnNlc3Npb24gPSByYW5kb21OdW1iZXIoMTAwMCkgKyAnLycgKyByYW5kb21TdHJpbmcoOCk7XG4gICAgICAgIHRoaXMubG9jYXRpb24gPSBnZXRMb2NhdGlvbih1cmwpO1xuICAgICAgICB0aGlzLnJlYWR5U3RhdGUgPSBzdGF0ZS5DT05ORUNUSU5HO1xuICAgICAgICB0aGlzLm9wZW5TdHJlYW0oKTtcbiAgICB9XG4gICAgc2VuZChwYXlsb2FkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbmRSYXcoSlNPTi5zdHJpbmdpZnkoW3BheWxvYWRdKSk7XG4gICAgfVxuICAgIHBpbmcoKSB7XG4gICAgICAgIHRoaXMuaG9va3Muc2VuZEhlYXJ0YmVhdCh0aGlzKTtcbiAgICB9XG4gICAgY2xvc2UoY29kZSwgcmVhc29uKSB7XG4gICAgICAgIHRoaXMub25DbG9zZShjb2RlLCByZWFzb24sIHRydWUpO1xuICAgIH1cbiAgICBzZW5kUmF3KHBheWxvYWQpIHtcbiAgICAgICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PT0gc3RhdGUuT1BFTikge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBydW50aW1lLmNyZWF0ZVNvY2tldFJlcXVlc3QoJ1BPU1QnLCBnZXRVbmlxdWVVUkwoZ2V0U2VuZFVSTCh0aGlzLmxvY2F0aW9uLCB0aGlzLnNlc3Npb24pKSkuc3RhcnQocGF5bG9hZCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZWNvbm5lY3QoKSB7XG4gICAgICAgIHRoaXMuY2xvc2VTdHJlYW0oKTtcbiAgICAgICAgdGhpcy5vcGVuU3RyZWFtKCk7XG4gICAgfVxuICAgIG9uQ2xvc2UoY29kZSwgcmVhc29uLCB3YXNDbGVhbikge1xuICAgICAgICB0aGlzLmNsb3NlU3RyZWFtKCk7XG4gICAgICAgIHRoaXMucmVhZHlTdGF0ZSA9IHN0YXRlLkNMT1NFRDtcbiAgICAgICAgaWYgKHRoaXMub25jbG9zZSkge1xuICAgICAgICAgICAgdGhpcy5vbmNsb3NlKHtcbiAgICAgICAgICAgICAgICBjb2RlOiBjb2RlLFxuICAgICAgICAgICAgICAgIHJlYXNvbjogcmVhc29uLFxuICAgICAgICAgICAgICAgIHdhc0NsZWFuOiB3YXNDbGVhblxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgb25DaHVuayhjaHVuaykge1xuICAgICAgICBpZiAoY2h1bmsuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5yZWFkeVN0YXRlID09PSBzdGF0ZS5PUEVOKSB7XG4gICAgICAgICAgICB0aGlzLm9uQWN0aXZpdHkoKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcGF5bG9hZDtcbiAgICAgICAgdmFyIHR5cGUgPSBjaHVuay5kYXRhLnNsaWNlKDAsIDEpO1xuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ28nOlxuICAgICAgICAgICAgICAgIHBheWxvYWQgPSBKU09OLnBhcnNlKGNodW5rLmRhdGEuc2xpY2UoMSkgfHwgJ3t9Jyk7XG4gICAgICAgICAgICAgICAgdGhpcy5vbk9wZW4ocGF5bG9hZCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdhJzpcbiAgICAgICAgICAgICAgICBwYXlsb2FkID0gSlNPTi5wYXJzZShjaHVuay5kYXRhLnNsaWNlKDEpIHx8ICdbXScpO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGF5bG9hZC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uRXZlbnQocGF5bG9hZFtpXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnbSc6XG4gICAgICAgICAgICAgICAgcGF5bG9hZCA9IEpTT04ucGFyc2UoY2h1bmsuZGF0YS5zbGljZSgxKSB8fCAnbnVsbCcpO1xuICAgICAgICAgICAgICAgIHRoaXMub25FdmVudChwYXlsb2FkKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2gnOlxuICAgICAgICAgICAgICAgIHRoaXMuaG9va3Mub25IZWFydGJlYXQodGhpcyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdjJzpcbiAgICAgICAgICAgICAgICBwYXlsb2FkID0gSlNPTi5wYXJzZShjaHVuay5kYXRhLnNsaWNlKDEpIHx8ICdbXScpO1xuICAgICAgICAgICAgICAgIHRoaXMub25DbG9zZShwYXlsb2FkWzBdLCBwYXlsb2FkWzFdLCB0cnVlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICBvbk9wZW4ob3B0aW9ucykge1xuICAgICAgICBpZiAodGhpcy5yZWFkeVN0YXRlID09PSBzdGF0ZS5DT05ORUNUSU5HKSB7XG4gICAgICAgICAgICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLmhvc3RuYW1lKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2NhdGlvbi5iYXNlID0gcmVwbGFjZUhvc3QodGhpcy5sb2NhdGlvbi5iYXNlLCBvcHRpb25zLmhvc3RuYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucmVhZHlTdGF0ZSA9IHN0YXRlLk9QRU47XG4gICAgICAgICAgICBpZiAodGhpcy5vbm9wZW4pIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9ub3BlbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5vbkNsb3NlKDEwMDYsICdTZXJ2ZXIgbG9zdCBzZXNzaW9uJywgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgb25FdmVudChldmVudCkge1xuICAgICAgICBpZiAodGhpcy5yZWFkeVN0YXRlID09PSBzdGF0ZS5PUEVOICYmIHRoaXMub25tZXNzYWdlKSB7XG4gICAgICAgICAgICB0aGlzLm9ubWVzc2FnZSh7IGRhdGE6IGV2ZW50IH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIG9uQWN0aXZpdHkoKSB7XG4gICAgICAgIGlmICh0aGlzLm9uYWN0aXZpdHkpIHtcbiAgICAgICAgICAgIHRoaXMub25hY3Rpdml0eSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIG9uRXJyb3IoZXJyb3IpIHtcbiAgICAgICAgaWYgKHRoaXMub25lcnJvcikge1xuICAgICAgICAgICAgdGhpcy5vbmVycm9yKGVycm9yKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBvcGVuU3RyZWFtKCkge1xuICAgICAgICB0aGlzLnN0cmVhbSA9IHJ1bnRpbWUuY3JlYXRlU29ja2V0UmVxdWVzdCgnUE9TVCcsIGdldFVuaXF1ZVVSTCh0aGlzLmhvb2tzLmdldFJlY2VpdmVVUkwodGhpcy5sb2NhdGlvbiwgdGhpcy5zZXNzaW9uKSkpO1xuICAgICAgICB0aGlzLnN0cmVhbS5iaW5kKCdjaHVuaycsIGNodW5rID0+IHtcbiAgICAgICAgICAgIHRoaXMub25DaHVuayhjaHVuayk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnN0cmVhbS5iaW5kKCdmaW5pc2hlZCcsIHN0YXR1cyA9PiB7XG4gICAgICAgICAgICB0aGlzLmhvb2tzLm9uRmluaXNoZWQodGhpcywgc3RhdHVzKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc3RyZWFtLmJpbmQoJ2J1ZmZlcl90b29fbG9uZycsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVjb25uZWN0KCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhpcy5zdHJlYW0uc3RhcnQoKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHV0aWwuZGVmZXIoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMub25FcnJvcihlcnJvcik7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkNsb3NlKDEwMDYsICdDb3VsZCBub3Qgc3RhcnQgc3RyZWFtaW5nJywgZmFsc2UpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2xvc2VTdHJlYW0oKSB7XG4gICAgICAgIGlmICh0aGlzLnN0cmVhbSkge1xuICAgICAgICAgICAgdGhpcy5zdHJlYW0udW5iaW5kX2FsbCgpO1xuICAgICAgICAgICAgdGhpcy5zdHJlYW0uY2xvc2UoKTtcbiAgICAgICAgICAgIHRoaXMuc3RyZWFtID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cbn1cbmZ1bmN0aW9uIGdldExvY2F0aW9uKHVybCkge1xuICAgIHZhciBwYXJ0cyA9IC8oW15cXD9dKilcXC8qKFxcPz8uKikvLmV4ZWModXJsKTtcbiAgICByZXR1cm4ge1xuICAgICAgICBiYXNlOiBwYXJ0c1sxXSxcbiAgICAgICAgcXVlcnlTdHJpbmc6IHBhcnRzWzJdXG4gICAgfTtcbn1cbmZ1bmN0aW9uIGdldFNlbmRVUkwodXJsLCBzZXNzaW9uKSB7XG4gICAgcmV0dXJuIHVybC5iYXNlICsgJy8nICsgc2Vzc2lvbiArICcveGhyX3NlbmQnO1xufVxuZnVuY3Rpb24gZ2V0VW5pcXVlVVJMKHVybCkge1xuICAgIHZhciBzZXBhcmF0b3IgPSB1cmwuaW5kZXhPZignPycpID09PSAtMSA/ICc/JyA6ICcmJztcbiAgICByZXR1cm4gdXJsICsgc2VwYXJhdG9yICsgJ3Q9JyArICtuZXcgRGF0ZSgpICsgJyZuPScgKyBhdXRvSW5jcmVtZW50Kys7XG59XG5mdW5jdGlvbiByZXBsYWNlSG9zdCh1cmwsIGhvc3RuYW1lKSB7XG4gICAgdmFyIHVybFBhcnRzID0gLyhodHRwcz86XFwvXFwvKShbXlxcLzpdKykoKFxcL3w6KT8uKikvLmV4ZWModXJsKTtcbiAgICByZXR1cm4gdXJsUGFydHNbMV0gKyBob3N0bmFtZSArIHVybFBhcnRzWzNdO1xufVxuZnVuY3Rpb24gcmFuZG9tTnVtYmVyKG1heCkge1xuICAgIHJldHVybiBydW50aW1lLnJhbmRvbUludChtYXgpO1xufVxuZnVuY3Rpb24gcmFuZG9tU3RyaW5nKGxlbmd0aCkge1xuICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKHJhbmRvbU51bWJlcigzMikudG9TdHJpbmcoMzIpKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdC5qb2luKCcnKTtcbn1cbi8qIGhhcm1vbnkgZGVmYXVsdCBleHBvcnQgKi8gdmFyIGh0dHBfc29ja2V0ID0gKGh0dHBfc29ja2V0X0hUVFBTb2NrZXQpO1xuXG4vLyBDT05DQVRFTkFURUQgTU9EVUxFOiAuL3NyYy9jb3JlL2h0dHAvaHR0cF9zdHJlYW1pbmdfc29ja2V0LnRzXG52YXIgaHR0cF9zdHJlYW1pbmdfc29ja2V0X2hvb2tzID0ge1xuICAgIGdldFJlY2VpdmVVUkw6IGZ1bmN0aW9uICh1cmwsIHNlc3Npb24pIHtcbiAgICAgICAgcmV0dXJuIHVybC5iYXNlICsgJy8nICsgc2Vzc2lvbiArICcveGhyX3N0cmVhbWluZycgKyB1cmwucXVlcnlTdHJpbmc7XG4gICAgfSxcbiAgICBvbkhlYXJ0YmVhdDogZnVuY3Rpb24gKHNvY2tldCkge1xuICAgICAgICBzb2NrZXQuc2VuZFJhdygnW10nKTtcbiAgICB9LFxuICAgIHNlbmRIZWFydGJlYXQ6IGZ1bmN0aW9uIChzb2NrZXQpIHtcbiAgICAgICAgc29ja2V0LnNlbmRSYXcoJ1tdJyk7XG4gICAgfSxcbiAgICBvbkZpbmlzaGVkOiBmdW5jdGlvbiAoc29ja2V0LCBzdGF0dXMpIHtcbiAgICAgICAgc29ja2V0Lm9uQ2xvc2UoMTAwNiwgJ0Nvbm5lY3Rpb24gaW50ZXJydXB0ZWQgKCcgKyBzdGF0dXMgKyAnKScsIGZhbHNlKTtcbiAgICB9XG59O1xuLyogaGFybW9ueSBkZWZhdWx0IGV4cG9ydCAqLyB2YXIgaHR0cF9zdHJlYW1pbmdfc29ja2V0ID0gKGh0dHBfc3RyZWFtaW5nX3NvY2tldF9ob29rcyk7XG5cbi8vIENPTkNBVEVOQVRFRCBNT0RVTEU6IC4vc3JjL2NvcmUvaHR0cC9odHRwX3BvbGxpbmdfc29ja2V0LnRzXG52YXIgaHR0cF9wb2xsaW5nX3NvY2tldF9ob29rcyA9IHtcbiAgICBnZXRSZWNlaXZlVVJMOiBmdW5jdGlvbiAodXJsLCBzZXNzaW9uKSB7XG4gICAgICAgIHJldHVybiB1cmwuYmFzZSArICcvJyArIHNlc3Npb24gKyAnL3hocicgKyB1cmwucXVlcnlTdHJpbmc7XG4gICAgfSxcbiAgICBvbkhlYXJ0YmVhdDogZnVuY3Rpb24gKCkge1xuICAgIH0sXG4gICAgc2VuZEhlYXJ0YmVhdDogZnVuY3Rpb24gKHNvY2tldCkge1xuICAgICAgICBzb2NrZXQuc2VuZFJhdygnW10nKTtcbiAgICB9LFxuICAgIG9uRmluaXNoZWQ6IGZ1bmN0aW9uIChzb2NrZXQsIHN0YXR1cykge1xuICAgICAgICBpZiAoc3RhdHVzID09PSAyMDApIHtcbiAgICAgICAgICAgIHNvY2tldC5yZWNvbm5lY3QoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHNvY2tldC5vbkNsb3NlKDEwMDYsICdDb25uZWN0aW9uIGludGVycnVwdGVkICgnICsgc3RhdHVzICsgJyknLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuLyogaGFybW9ueSBkZWZhdWx0IGV4cG9ydCAqLyB2YXIgaHR0cF9wb2xsaW5nX3NvY2tldCA9IChodHRwX3BvbGxpbmdfc29ja2V0X2hvb2tzKTtcblxuLy8gQ09OQ0FURU5BVEVEIE1PRFVMRTogLi9zcmMvcnVudGltZXMvaXNvbW9ycGhpYy9odHRwL2h0dHBfeGhyX3JlcXVlc3QudHNcblxudmFyIGh0dHBfeGhyX3JlcXVlc3RfaG9va3MgPSB7XG4gICAgZ2V0UmVxdWVzdDogZnVuY3Rpb24gKHNvY2tldCkge1xuICAgICAgICB2YXIgQ29uc3RydWN0b3IgPSBydW50aW1lLmdldFhIUkFQSSgpO1xuICAgICAgICB2YXIgeGhyID0gbmV3IENvbnN0cnVjdG9yKCk7XG4gICAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSB4aHIub25wcm9ncmVzcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoeGhyLnJlYWR5U3RhdGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgIGlmICh4aHIucmVzcG9uc2VUZXh0ICYmIHhoci5yZXNwb25zZVRleHQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc29ja2V0Lm9uQ2h1bmsoeGhyLnN0YXR1cywgeGhyLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgICAgICBpZiAoeGhyLnJlc3BvbnNlVGV4dCAmJiB4aHIucmVzcG9uc2VUZXh0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvY2tldC5vbkNodW5rKHhoci5zdGF0dXMsIHhoci5yZXNwb25zZVRleHQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHNvY2tldC5lbWl0KCdmaW5pc2hlZCcsIHhoci5zdGF0dXMpO1xuICAgICAgICAgICAgICAgICAgICBzb2NrZXQuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB4aHI7XG4gICAgfSxcbiAgICBhYm9ydFJlcXVlc3Q6IGZ1bmN0aW9uICh4aHIpIHtcbiAgICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IG51bGw7XG4gICAgICAgIHhoci5hYm9ydCgpO1xuICAgIH1cbn07XG4vKiBoYXJtb255IGRlZmF1bHQgZXhwb3J0ICovIHZhciBodHRwX3hocl9yZXF1ZXN0ID0gKGh0dHBfeGhyX3JlcXVlc3RfaG9va3MpO1xuXG4vLyBDT05DQVRFTkFURUQgTU9EVUxFOiAuL3NyYy9ydW50aW1lcy9pc29tb3JwaGljL2h0dHAvaHR0cC50c1xuXG5cblxuXG5cbnZhciBIVFRQID0ge1xuICAgIGNyZWF0ZVN0cmVhbWluZ1NvY2tldCh1cmwpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlU29ja2V0KGh0dHBfc3RyZWFtaW5nX3NvY2tldCwgdXJsKTtcbiAgICB9LFxuICAgIGNyZWF0ZVBvbGxpbmdTb2NrZXQodXJsKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZVNvY2tldChodHRwX3BvbGxpbmdfc29ja2V0LCB1cmwpO1xuICAgIH0sXG4gICAgY3JlYXRlU29ja2V0KGhvb2tzLCB1cmwpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBodHRwX3NvY2tldChob29rcywgdXJsKTtcbiAgICB9LFxuICAgIGNyZWF0ZVhIUihtZXRob2QsIHVybCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVSZXF1ZXN0KGh0dHBfeGhyX3JlcXVlc3QsIG1ldGhvZCwgdXJsKTtcbiAgICB9LFxuICAgIGNyZWF0ZVJlcXVlc3QoaG9va3MsIG1ldGhvZCwgdXJsKSB7XG4gICAgICAgIHJldHVybiBuZXcgaHR0cF9yZXF1ZXN0X0hUVFBSZXF1ZXN0KGhvb2tzLCBtZXRob2QsIHVybCk7XG4gICAgfVxufTtcbi8qIGhhcm1vbnkgZGVmYXVsdCBleHBvcnQgKi8gdmFyIGh0dHBfaHR0cCA9IChIVFRQKTtcblxuLy8gQ09OQ0FURU5BVEVEIE1PRFVMRTogLi9zcmMvcnVudGltZXMvd2ViL2h0dHAvaHR0cC50c1xuXG5cbmh0dHBfaHR0cC5jcmVhdGVYRFIgPSBmdW5jdGlvbiAobWV0aG9kLCB1cmwpIHtcbiAgICByZXR1cm4gdGhpcy5jcmVhdGVSZXF1ZXN0KGh0dHBfeGRvbWFpbl9yZXF1ZXN0LCBtZXRob2QsIHVybCk7XG59O1xuLyogaGFybW9ueSBkZWZhdWx0IGV4cG9ydCAqLyB2YXIgd2ViX2h0dHBfaHR0cCA9IChodHRwX2h0dHApO1xuXG4vLyBDT05DQVRFTkFURUQgTU9EVUxFOiAuL3NyYy9ydW50aW1lcy93ZWIvcnVudGltZS50c1xuXG5cblxuXG5cblxuXG5cblxuXG5cblxudmFyIFJ1bnRpbWUgPSB7XG4gICAgbmV4dEF1dGhDYWxsYmFja0lEOiAxLFxuICAgIGF1dGhfY2FsbGJhY2tzOiB7fSxcbiAgICBTY3JpcHRSZWNlaXZlcnM6IFNjcmlwdFJlY2VpdmVycyxcbiAgICBEZXBlbmRlbmNpZXNSZWNlaXZlcnM6IERlcGVuZGVuY2llc1JlY2VpdmVycyxcbiAgICBnZXREZWZhdWx0U3RyYXRlZ3k6IGRlZmF1bHRfc3RyYXRlZ3ksXG4gICAgVHJhbnNwb3J0czogdHJhbnNwb3J0c190cmFuc3BvcnRzLFxuICAgIHRyYW5zcG9ydENvbm5lY3Rpb25Jbml0aWFsaXplcjogdHJhbnNwb3J0X2Nvbm5lY3Rpb25faW5pdGlhbGl6ZXIsXG4gICAgSFRUUEZhY3Rvcnk6IHdlYl9odHRwX2h0dHAsXG4gICAgVGltZWxpbmVUcmFuc3BvcnQ6IGpzb25wX3RpbWVsaW5lLFxuICAgIGdldFhIUkFQSSgpIHtcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5YTUxIdHRwUmVxdWVzdDtcbiAgICB9LFxuICAgIGdldFdlYlNvY2tldEFQSSgpIHtcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5XZWJTb2NrZXQgfHwgd2luZG93Lk1veldlYlNvY2tldDtcbiAgICB9LFxuICAgIHNldHVwKFB1c2hlckNsYXNzKSB7XG4gICAgICAgIHdpbmRvdy5QdXNoZXIgPSBQdXNoZXJDbGFzcztcbiAgICAgICAgdmFyIGluaXRpYWxpemVPbkRvY3VtZW50Qm9keSA9ICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMub25Eb2N1bWVudEJvZHkoUHVzaGVyQ2xhc3MucmVhZHkpO1xuICAgICAgICB9O1xuICAgICAgICBpZiAoIXdpbmRvdy5KU09OKSB7XG4gICAgICAgICAgICBEZXBlbmRlbmNpZXMubG9hZCgnanNvbjInLCB7fSwgaW5pdGlhbGl6ZU9uRG9jdW1lbnRCb2R5KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGluaXRpYWxpemVPbkRvY3VtZW50Qm9keSgpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBnZXREb2N1bWVudCgpIHtcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50O1xuICAgIH0sXG4gICAgZ2V0UHJvdG9jb2woKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldERvY3VtZW50KCkubG9jYXRpb24ucHJvdG9jb2w7XG4gICAgfSxcbiAgICBnZXRBdXRob3JpemVycygpIHtcbiAgICAgICAgcmV0dXJuIHsgYWpheDogeGhyX2F1dGgsIGpzb25wOiBqc29ucF9hdXRoIH07XG4gICAgfSxcbiAgICBvbkRvY3VtZW50Qm9keShjYWxsYmFjaykge1xuICAgICAgICBpZiAoZG9jdW1lbnQuYm9keSkge1xuICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMub25Eb2N1bWVudEJvZHkoY2FsbGJhY2spO1xuICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGNyZWF0ZUpTT05QUmVxdWVzdCh1cmwsIGRhdGEpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBqc29ucF9yZXF1ZXN0X0pTT05QUmVxdWVzdCh1cmwsIGRhdGEpO1xuICAgIH0sXG4gICAgY3JlYXRlU2NyaXB0UmVxdWVzdChzcmMpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTY3JpcHRSZXF1ZXN0KHNyYyk7XG4gICAgfSxcbiAgICBnZXRMb2NhbFN0b3JhZ2UoKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gd2luZG93LmxvY2FsU3RvcmFnZTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgY3JlYXRlWEhSKCkge1xuICAgICAgICBpZiAodGhpcy5nZXRYSFJBUEkoKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZU1pY3Jvc29mdFhIUigpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBjcmVhdGVYTUxIdHRwUmVxdWVzdCgpIHtcbiAgICAgICAgdmFyIENvbnN0cnVjdG9yID0gdGhpcy5nZXRYSFJBUEkoKTtcbiAgICAgICAgcmV0dXJuIG5ldyBDb25zdHJ1Y3RvcigpO1xuICAgIH0sXG4gICAgY3JlYXRlTWljcm9zb2Z0WEhSKCkge1xuICAgICAgICByZXR1cm4gbmV3IEFjdGl2ZVhPYmplY3QoJ01pY3Jvc29mdC5YTUxIVFRQJyk7XG4gICAgfSxcbiAgICBnZXROZXR3b3JrKCkge1xuICAgICAgICByZXR1cm4gbmV0X2luZm9fTmV0d29yaztcbiAgICB9LFxuICAgIGNyZWF0ZVdlYlNvY2tldCh1cmwpIHtcbiAgICAgICAgdmFyIENvbnN0cnVjdG9yID0gdGhpcy5nZXRXZWJTb2NrZXRBUEkoKTtcbiAgICAgICAgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih1cmwpO1xuICAgIH0sXG4gICAgY3JlYXRlU29ja2V0UmVxdWVzdChtZXRob2QsIHVybCkge1xuICAgICAgICBpZiAodGhpcy5pc1hIUlN1cHBvcnRlZCgpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5IVFRQRmFjdG9yeS5jcmVhdGVYSFIobWV0aG9kLCB1cmwpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuaXNYRFJTdXBwb3J0ZWQodXJsLmluZGV4T2YoJ2h0dHBzOicpID09PSAwKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuSFRUUEZhY3RvcnkuY3JlYXRlWERSKG1ldGhvZCwgdXJsKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRocm93ICdDcm9zcy1vcmlnaW4gSFRUUCByZXF1ZXN0cyBhcmUgbm90IHN1cHBvcnRlZCc7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGlzWEhSU3VwcG9ydGVkKCkge1xuICAgICAgICB2YXIgQ29uc3RydWN0b3IgPSB0aGlzLmdldFhIUkFQSSgpO1xuICAgICAgICByZXR1cm4gKEJvb2xlYW4oQ29uc3RydWN0b3IpICYmIG5ldyBDb25zdHJ1Y3RvcigpLndpdGhDcmVkZW50aWFscyAhPT0gdW5kZWZpbmVkKTtcbiAgICB9LFxuICAgIGlzWERSU3VwcG9ydGVkKHVzZVRMUykge1xuICAgICAgICB2YXIgcHJvdG9jb2wgPSB1c2VUTFMgPyAnaHR0cHM6JyA6ICdodHRwOic7XG4gICAgICAgIHZhciBkb2N1bWVudFByb3RvY29sID0gdGhpcy5nZXRQcm90b2NvbCgpO1xuICAgICAgICByZXR1cm4gKEJvb2xlYW4od2luZG93WydYRG9tYWluUmVxdWVzdCddKSAmJiBkb2N1bWVudFByb3RvY29sID09PSBwcm90b2NvbCk7XG4gICAgfSxcbiAgICBhZGRVbmxvYWRMaXN0ZW5lcihsaXN0ZW5lcikge1xuICAgICAgICBpZiAod2luZG93LmFkZEV2ZW50TGlzdGVuZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3VubG9hZCcsIGxpc3RlbmVyLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAod2luZG93LmF0dGFjaEV2ZW50ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHdpbmRvdy5hdHRhY2hFdmVudCgnb251bmxvYWQnLCBsaXN0ZW5lcik7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHJlbW92ZVVubG9hZExpc3RlbmVyKGxpc3RlbmVyKSB7XG4gICAgICAgIGlmICh3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigndW5sb2FkJywgbGlzdGVuZXIsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh3aW5kb3cuZGV0YWNoRXZlbnQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgd2luZG93LmRldGFjaEV2ZW50KCdvbnVubG9hZCcsIGxpc3RlbmVyKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgcmFuZG9tSW50KG1heCkge1xuICAgICAgICBjb25zdCByYW5kb20gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjb25zdCBjcnlwdG8gPSB3aW5kb3cuY3J5cHRvIHx8IHdpbmRvd1snbXNDcnlwdG8nXTtcbiAgICAgICAgICAgIGNvbnN0IHJhbmRvbSA9IGNyeXB0by5nZXRSYW5kb21WYWx1ZXMobmV3IFVpbnQzMkFycmF5KDEpKVswXTtcbiAgICAgICAgICAgIHJldHVybiByYW5kb20gLyBNYXRoLnBvdygyLCAzMik7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKHJhbmRvbSgpICogbWF4KTtcbiAgICB9XG59O1xuLyogaGFybW9ueSBkZWZhdWx0IGV4cG9ydCAqLyB2YXIgcnVudGltZSA9IChSdW50aW1lKTtcblxuLy8gQ09OQ0FURU5BVEVEIE1PRFVMRTogLi9zcmMvY29yZS90aW1lbGluZS9sZXZlbC50c1xudmFyIFRpbWVsaW5lTGV2ZWw7XG4oZnVuY3Rpb24gKFRpbWVsaW5lTGV2ZWwpIHtcbiAgICBUaW1lbGluZUxldmVsW1RpbWVsaW5lTGV2ZWxbXCJFUlJPUlwiXSA9IDNdID0gXCJFUlJPUlwiO1xuICAgIFRpbWVsaW5lTGV2ZWxbVGltZWxpbmVMZXZlbFtcIklORk9cIl0gPSA2XSA9IFwiSU5GT1wiO1xuICAgIFRpbWVsaW5lTGV2ZWxbVGltZWxpbmVMZXZlbFtcIkRFQlVHXCJdID0gN10gPSBcIkRFQlVHXCI7XG59KShUaW1lbGluZUxldmVsIHx8IChUaW1lbGluZUxldmVsID0ge30pKTtcbi8qIGhhcm1vbnkgZGVmYXVsdCBleHBvcnQgKi8gdmFyIHRpbWVsaW5lX2xldmVsID0gKFRpbWVsaW5lTGV2ZWwpO1xuXG4vLyBDT05DQVRFTkFURUQgTU9EVUxFOiAuL3NyYy9jb3JlL3RpbWVsaW5lL3RpbWVsaW5lLnRzXG5cblxuXG5jbGFzcyB0aW1lbGluZV9UaW1lbGluZSB7XG4gICAgY29uc3RydWN0b3Ioa2V5LCBzZXNzaW9uLCBvcHRpb25zKSB7XG4gICAgICAgIHRoaXMua2V5ID0ga2V5O1xuICAgICAgICB0aGlzLnNlc3Npb24gPSBzZXNzaW9uO1xuICAgICAgICB0aGlzLmV2ZW50cyA9IFtdO1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgICAgICB0aGlzLnNlbnQgPSAwO1xuICAgICAgICB0aGlzLnVuaXF1ZUlEID0gMDtcbiAgICB9XG4gICAgbG9nKGxldmVsLCBldmVudCkge1xuICAgICAgICBpZiAobGV2ZWwgPD0gdGhpcy5vcHRpb25zLmxldmVsKSB7XG4gICAgICAgICAgICB0aGlzLmV2ZW50cy5wdXNoKGV4dGVuZCh7fSwgZXZlbnQsIHsgdGltZXN0YW1wOiB1dGlsLm5vdygpIH0pKTtcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMubGltaXQgJiYgdGhpcy5ldmVudHMubGVuZ3RoID4gdGhpcy5vcHRpb25zLmxpbWl0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ldmVudHMuc2hpZnQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBlcnJvcihldmVudCkge1xuICAgICAgICB0aGlzLmxvZyh0aW1lbGluZV9sZXZlbC5FUlJPUiwgZXZlbnQpO1xuICAgIH1cbiAgICBpbmZvKGV2ZW50KSB7XG4gICAgICAgIHRoaXMubG9nKHRpbWVsaW5lX2xldmVsLklORk8sIGV2ZW50KTtcbiAgICB9XG4gICAgZGVidWcoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5sb2codGltZWxpbmVfbGV2ZWwuREVCVUcsIGV2ZW50KTtcbiAgICB9XG4gICAgaXNFbXB0eSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZXZlbnRzLmxlbmd0aCA9PT0gMDtcbiAgICB9XG4gICAgc2VuZChzZW5kZm4sIGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciBkYXRhID0gZXh0ZW5kKHtcbiAgICAgICAgICAgIHNlc3Npb246IHRoaXMuc2Vzc2lvbixcbiAgICAgICAgICAgIGJ1bmRsZTogdGhpcy5zZW50ICsgMSxcbiAgICAgICAgICAgIGtleTogdGhpcy5rZXksXG4gICAgICAgICAgICBsaWI6ICdqcycsXG4gICAgICAgICAgICB2ZXJzaW9uOiB0aGlzLm9wdGlvbnMudmVyc2lvbixcbiAgICAgICAgICAgIGNsdXN0ZXI6IHRoaXMub3B0aW9ucy5jbHVzdGVyLFxuICAgICAgICAgICAgZmVhdHVyZXM6IHRoaXMub3B0aW9ucy5mZWF0dXJlcyxcbiAgICAgICAgICAgIHRpbWVsaW5lOiB0aGlzLmV2ZW50c1xuICAgICAgICB9LCB0aGlzLm9wdGlvbnMucGFyYW1zKTtcbiAgICAgICAgdGhpcy5ldmVudHMgPSBbXTtcbiAgICAgICAgc2VuZGZuKGRhdGEsIChlcnJvciwgcmVzdWx0KSA9PiB7XG4gICAgICAgICAgICBpZiAoIWVycm9yKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZW50Kys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhlcnJvciwgcmVzdWx0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBnZW5lcmF0ZVVuaXF1ZUlEKCkge1xuICAgICAgICB0aGlzLnVuaXF1ZUlEKys7XG4gICAgICAgIHJldHVybiB0aGlzLnVuaXF1ZUlEO1xuICAgIH1cbn1cblxuLy8gQ09OQ0FURU5BVEVEIE1PRFVMRTogLi9zcmMvY29yZS9zdHJhdGVnaWVzL3RyYW5zcG9ydF9zdHJhdGVneS50c1xuXG5cblxuXG5jbGFzcyB0cmFuc3BvcnRfc3RyYXRlZ3lfVHJhbnNwb3J0U3RyYXRlZ3kge1xuICAgIGNvbnN0cnVjdG9yKG5hbWUsIHByaW9yaXR5LCB0cmFuc3BvcnQsIG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5wcmlvcml0eSA9IHByaW9yaXR5O1xuICAgICAgICB0aGlzLnRyYW5zcG9ydCA9IHRyYW5zcG9ydDtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICB9XG4gICAgaXNTdXBwb3J0ZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRyYW5zcG9ydC5pc1N1cHBvcnRlZCh7XG4gICAgICAgICAgICB1c2VUTFM6IHRoaXMub3B0aW9ucy51c2VUTFNcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGNvbm5lY3QobWluUHJpb3JpdHksIGNhbGxiYWNrKSB7XG4gICAgICAgIGlmICghdGhpcy5pc1N1cHBvcnRlZCgpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFpbEF0dGVtcHQobmV3IFVuc3VwcG9ydGVkU3RyYXRlZ3koKSwgY2FsbGJhY2spO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMucHJpb3JpdHkgPCBtaW5Qcmlvcml0eSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhaWxBdHRlbXB0KG5ldyBUcmFuc3BvcnRQcmlvcml0eVRvb0xvdygpLCBjYWxsYmFjayk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGNvbm5lY3RlZCA9IGZhbHNlO1xuICAgICAgICB2YXIgdHJhbnNwb3J0ID0gdGhpcy50cmFuc3BvcnQuY3JlYXRlQ29ubmVjdGlvbih0aGlzLm5hbWUsIHRoaXMucHJpb3JpdHksIHRoaXMub3B0aW9ucy5rZXksIHRoaXMub3B0aW9ucyk7XG4gICAgICAgIHZhciBoYW5kc2hha2UgPSBudWxsO1xuICAgICAgICB2YXIgb25Jbml0aWFsaXplZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRyYW5zcG9ydC51bmJpbmQoJ2luaXRpYWxpemVkJywgb25Jbml0aWFsaXplZCk7XG4gICAgICAgICAgICB0cmFuc3BvcnQuY29ubmVjdCgpO1xuICAgICAgICB9O1xuICAgICAgICB2YXIgb25PcGVuID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaGFuZHNoYWtlID0gZmFjdG9yeS5jcmVhdGVIYW5kc2hha2UodHJhbnNwb3J0LCBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgY29ubmVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB1bmJpbmRMaXN0ZW5lcnMoKTtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhudWxsLCByZXN1bHQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIHZhciBvbkVycm9yID0gZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICB1bmJpbmRMaXN0ZW5lcnMoKTtcbiAgICAgICAgICAgIGNhbGxiYWNrKGVycm9yKTtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIG9uQ2xvc2VkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdW5iaW5kTGlzdGVuZXJzKCk7XG4gICAgICAgICAgICB2YXIgc2VyaWFsaXplZFRyYW5zcG9ydDtcbiAgICAgICAgICAgIHNlcmlhbGl6ZWRUcmFuc3BvcnQgPSBzYWZlSlNPTlN0cmluZ2lmeSh0cmFuc3BvcnQpO1xuICAgICAgICAgICAgY2FsbGJhY2sobmV3IFRyYW5zcG9ydENsb3NlZChzZXJpYWxpemVkVHJhbnNwb3J0KSk7XG4gICAgICAgIH07XG4gICAgICAgIHZhciB1bmJpbmRMaXN0ZW5lcnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0cmFuc3BvcnQudW5iaW5kKCdpbml0aWFsaXplZCcsIG9uSW5pdGlhbGl6ZWQpO1xuICAgICAgICAgICAgdHJhbnNwb3J0LnVuYmluZCgnb3BlbicsIG9uT3Blbik7XG4gICAgICAgICAgICB0cmFuc3BvcnQudW5iaW5kKCdlcnJvcicsIG9uRXJyb3IpO1xuICAgICAgICAgICAgdHJhbnNwb3J0LnVuYmluZCgnY2xvc2VkJywgb25DbG9zZWQpO1xuICAgICAgICB9O1xuICAgICAgICB0cmFuc3BvcnQuYmluZCgnaW5pdGlhbGl6ZWQnLCBvbkluaXRpYWxpemVkKTtcbiAgICAgICAgdHJhbnNwb3J0LmJpbmQoJ29wZW4nLCBvbk9wZW4pO1xuICAgICAgICB0cmFuc3BvcnQuYmluZCgnZXJyb3InLCBvbkVycm9yKTtcbiAgICAgICAgdHJhbnNwb3J0LmJpbmQoJ2Nsb3NlZCcsIG9uQ2xvc2VkKTtcbiAgICAgICAgdHJhbnNwb3J0LmluaXRpYWxpemUoKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGFib3J0OiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGNvbm5lY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHVuYmluZExpc3RlbmVycygpO1xuICAgICAgICAgICAgICAgIGlmIChoYW5kc2hha2UpIHtcbiAgICAgICAgICAgICAgICAgICAgaGFuZHNoYWtlLmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0cmFuc3BvcnQuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZm9yY2VNaW5Qcmlvcml0eTogcCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGNvbm5lY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnByaW9yaXR5IDwgcCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaGFuZHNoYWtlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kc2hha2UuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zcG9ydC5jbG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cbn1cbmZ1bmN0aW9uIGZhaWxBdHRlbXB0KGVycm9yLCBjYWxsYmFjaykge1xuICAgIHV0aWwuZGVmZXIoZnVuY3Rpb24gKCkge1xuICAgICAgICBjYWxsYmFjayhlcnJvcik7XG4gICAgfSk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgYWJvcnQ6IGZ1bmN0aW9uICgpIHsgfSxcbiAgICAgICAgZm9yY2VNaW5Qcmlvcml0eTogZnVuY3Rpb24gKCkgeyB9XG4gICAgfTtcbn1cblxuLy8gQ09OQ0FURU5BVEVEIE1PRFVMRTogLi9zcmMvY29yZS9zdHJhdGVnaWVzL3N0cmF0ZWd5X2J1aWxkZXIudHNcblxuXG5cblxuXG5jb25zdCB7IFRyYW5zcG9ydHM6IHN0cmF0ZWd5X2J1aWxkZXJfVHJhbnNwb3J0cyB9ID0gcnVudGltZTtcbnZhciBzdHJhdGVneV9idWlsZGVyX2RlZmluZVRyYW5zcG9ydCA9IGZ1bmN0aW9uIChjb25maWcsIG5hbWUsIHR5cGUsIHByaW9yaXR5LCBvcHRpb25zLCBtYW5hZ2VyKSB7XG4gICAgdmFyIHRyYW5zcG9ydENsYXNzID0gc3RyYXRlZ3lfYnVpbGRlcl9UcmFuc3BvcnRzW3R5cGVdO1xuICAgIGlmICghdHJhbnNwb3J0Q2xhc3MpIHtcbiAgICAgICAgdGhyb3cgbmV3IFVuc3VwcG9ydGVkVHJhbnNwb3J0KHR5cGUpO1xuICAgIH1cbiAgICB2YXIgZW5hYmxlZCA9ICghY29uZmlnLmVuYWJsZWRUcmFuc3BvcnRzIHx8XG4gICAgICAgIGFycmF5SW5kZXhPZihjb25maWcuZW5hYmxlZFRyYW5zcG9ydHMsIG5hbWUpICE9PSAtMSkgJiZcbiAgICAgICAgKCFjb25maWcuZGlzYWJsZWRUcmFuc3BvcnRzIHx8XG4gICAgICAgICAgICBhcnJheUluZGV4T2YoY29uZmlnLmRpc2FibGVkVHJhbnNwb3J0cywgbmFtZSkgPT09IC0xKTtcbiAgICB2YXIgdHJhbnNwb3J0O1xuICAgIGlmIChlbmFibGVkKSB7XG4gICAgICAgIG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHsgaWdub3JlTnVsbE9yaWdpbjogY29uZmlnLmlnbm9yZU51bGxPcmlnaW4gfSwgb3B0aW9ucyk7XG4gICAgICAgIHRyYW5zcG9ydCA9IG5ldyB0cmFuc3BvcnRfc3RyYXRlZ3lfVHJhbnNwb3J0U3RyYXRlZ3kobmFtZSwgcHJpb3JpdHksIG1hbmFnZXIgPyBtYW5hZ2VyLmdldEFzc2lzdGFudCh0cmFuc3BvcnRDbGFzcykgOiB0cmFuc3BvcnRDbGFzcywgb3B0aW9ucyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB0cmFuc3BvcnQgPSBzdHJhdGVneV9idWlsZGVyX1Vuc3VwcG9ydGVkU3RyYXRlZ3k7XG4gICAgfVxuICAgIHJldHVybiB0cmFuc3BvcnQ7XG59O1xudmFyIHN0cmF0ZWd5X2J1aWxkZXJfVW5zdXBwb3J0ZWRTdHJhdGVneSA9IHtcbiAgICBpc1N1cHBvcnRlZDogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcbiAgICBjb25uZWN0OiBmdW5jdGlvbiAoXywgY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIGRlZmVycmVkID0gdXRpbC5kZWZlcihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhuZXcgVW5zdXBwb3J0ZWRTdHJhdGVneSgpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBhYm9ydDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLmVuc3VyZUFib3J0ZWQoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmb3JjZU1pblByaW9yaXR5OiBmdW5jdGlvbiAoKSB7IH1cbiAgICAgICAgfTtcbiAgICB9XG59O1xuXG4vLyBDT05DQVRFTkFURUQgTU9EVUxFOiAuL3NyYy9jb3JlL29wdGlvbnMudHNcblxuZnVuY3Rpb24gdmFsaWRhdGVPcHRpb25zKG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucyA9PSBudWxsKSB7XG4gICAgICAgIHRocm93ICdZb3UgbXVzdCBwYXNzIGFuIG9wdGlvbnMgb2JqZWN0JztcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMuY2x1c3RlciA9PSBudWxsKSB7XG4gICAgICAgIHRocm93ICdPcHRpb25zIG9iamVjdCBtdXN0IHByb3ZpZGUgYSBjbHVzdGVyJztcbiAgICB9XG4gICAgaWYgKCdkaXNhYmxlU3RhdHMnIGluIG9wdGlvbnMpIHtcbiAgICAgICAgbG9nZ2VyLndhcm4oJ1RoZSBkaXNhYmxlU3RhdHMgb3B0aW9uIGlzIGRlcHJlY2F0ZWQgaW4gZmF2b3Igb2YgZW5hYmxlU3RhdHMnKTtcbiAgICB9XG59XG5cbi8vIENPTkNBVEVOQVRFRCBNT0RVTEU6IC4vc3JjL2NvcmUvYXV0aC91c2VyX2F1dGhlbnRpY2F0b3IudHNcblxuXG5jb25zdCBjb21wb3NlQ2hhbm5lbFF1ZXJ5ID0gKHBhcmFtcywgYXV0aE9wdGlvbnMpID0+IHtcbiAgICB2YXIgcXVlcnkgPSAnc29ja2V0X2lkPScgKyBlbmNvZGVVUklDb21wb25lbnQocGFyYW1zLnNvY2tldElkKTtcbiAgICBmb3IgKHZhciBrZXkgaW4gYXV0aE9wdGlvbnMucGFyYW1zKSB7XG4gICAgICAgIHF1ZXJ5ICs9XG4gICAgICAgICAgICAnJicgK1xuICAgICAgICAgICAgICAgIGVuY29kZVVSSUNvbXBvbmVudChrZXkpICtcbiAgICAgICAgICAgICAgICAnPScgK1xuICAgICAgICAgICAgICAgIGVuY29kZVVSSUNvbXBvbmVudChhdXRoT3B0aW9ucy5wYXJhbXNba2V5XSk7XG4gICAgfVxuICAgIGlmIChhdXRoT3B0aW9ucy5wYXJhbXNQcm92aWRlciAhPSBudWxsKSB7XG4gICAgICAgIGxldCBkeW5hbWljUGFyYW1zID0gYXV0aE9wdGlvbnMucGFyYW1zUHJvdmlkZXIoKTtcbiAgICAgICAgZm9yICh2YXIga2V5IGluIGR5bmFtaWNQYXJhbXMpIHtcbiAgICAgICAgICAgIHF1ZXJ5ICs9XG4gICAgICAgICAgICAgICAgJyYnICtcbiAgICAgICAgICAgICAgICAgICAgZW5jb2RlVVJJQ29tcG9uZW50KGtleSkgK1xuICAgICAgICAgICAgICAgICAgICAnPScgK1xuICAgICAgICAgICAgICAgICAgICBlbmNvZGVVUklDb21wb25lbnQoZHluYW1pY1BhcmFtc1trZXldKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcXVlcnk7XG59O1xuY29uc3QgVXNlckF1dGhlbnRpY2F0b3IgPSAoYXV0aE9wdGlvbnMpID0+IHtcbiAgICBpZiAodHlwZW9mIHJ1bnRpbWUuZ2V0QXV0aG9yaXplcnMoKVthdXRoT3B0aW9ucy50cmFuc3BvcnRdID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICB0aHJvdyBgJyR7YXV0aE9wdGlvbnMudHJhbnNwb3J0fScgaXMgbm90IGEgcmVjb2duaXplZCBhdXRoIHRyYW5zcG9ydGA7XG4gICAgfVxuICAgIHJldHVybiAocGFyYW1zLCBjYWxsYmFjaykgPT4ge1xuICAgICAgICBjb25zdCBxdWVyeSA9IGNvbXBvc2VDaGFubmVsUXVlcnkocGFyYW1zLCBhdXRoT3B0aW9ucyk7XG4gICAgICAgIHJ1bnRpbWUuZ2V0QXV0aG9yaXplcnMoKVthdXRoT3B0aW9ucy50cmFuc3BvcnRdKHJ1bnRpbWUsIHF1ZXJ5LCBhdXRoT3B0aW9ucywgQXV0aFJlcXVlc3RUeXBlLlVzZXJBdXRoZW50aWNhdGlvbiwgY2FsbGJhY2spO1xuICAgIH07XG59O1xuLyogaGFybW9ueSBkZWZhdWx0IGV4cG9ydCAqLyB2YXIgdXNlcl9hdXRoZW50aWNhdG9yID0gKFVzZXJBdXRoZW50aWNhdG9yKTtcblxuLy8gQ09OQ0FURU5BVEVEIE1PRFVMRTogLi9zcmMvY29yZS9hdXRoL2NoYW5uZWxfYXV0aG9yaXplci50c1xuXG5cbmNvbnN0IGNoYW5uZWxfYXV0aG9yaXplcl9jb21wb3NlQ2hhbm5lbFF1ZXJ5ID0gKHBhcmFtcywgYXV0aE9wdGlvbnMpID0+IHtcbiAgICB2YXIgcXVlcnkgPSAnc29ja2V0X2lkPScgKyBlbmNvZGVVUklDb21wb25lbnQocGFyYW1zLnNvY2tldElkKTtcbiAgICBxdWVyeSArPSAnJmNoYW5uZWxfbmFtZT0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHBhcmFtcy5jaGFubmVsTmFtZSk7XG4gICAgZm9yICh2YXIga2V5IGluIGF1dGhPcHRpb25zLnBhcmFtcykge1xuICAgICAgICBxdWVyeSArPVxuICAgICAgICAgICAgJyYnICtcbiAgICAgICAgICAgICAgICBlbmNvZGVVUklDb21wb25lbnQoa2V5KSArXG4gICAgICAgICAgICAgICAgJz0nICtcbiAgICAgICAgICAgICAgICBlbmNvZGVVUklDb21wb25lbnQoYXV0aE9wdGlvbnMucGFyYW1zW2tleV0pO1xuICAgIH1cbiAgICBpZiAoYXV0aE9wdGlvbnMucGFyYW1zUHJvdmlkZXIgIT0gbnVsbCkge1xuICAgICAgICBsZXQgZHluYW1pY1BhcmFtcyA9IGF1dGhPcHRpb25zLnBhcmFtc1Byb3ZpZGVyKCk7XG4gICAgICAgIGZvciAodmFyIGtleSBpbiBkeW5hbWljUGFyYW1zKSB7XG4gICAgICAgICAgICBxdWVyeSArPVxuICAgICAgICAgICAgICAgICcmJyArXG4gICAgICAgICAgICAgICAgICAgIGVuY29kZVVSSUNvbXBvbmVudChrZXkpICtcbiAgICAgICAgICAgICAgICAgICAgJz0nICtcbiAgICAgICAgICAgICAgICAgICAgZW5jb2RlVVJJQ29tcG9uZW50KGR5bmFtaWNQYXJhbXNba2V5XSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHF1ZXJ5O1xufTtcbmNvbnN0IENoYW5uZWxBdXRob3JpemVyID0gKGF1dGhPcHRpb25zKSA9PiB7XG4gICAgaWYgKHR5cGVvZiBydW50aW1lLmdldEF1dGhvcml6ZXJzKClbYXV0aE9wdGlvbnMudHJhbnNwb3J0XSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdGhyb3cgYCcke2F1dGhPcHRpb25zLnRyYW5zcG9ydH0nIGlzIG5vdCBhIHJlY29nbml6ZWQgYXV0aCB0cmFuc3BvcnRgO1xuICAgIH1cbiAgICByZXR1cm4gKHBhcmFtcywgY2FsbGJhY2spID0+IHtcbiAgICAgICAgY29uc3QgcXVlcnkgPSBjaGFubmVsX2F1dGhvcml6ZXJfY29tcG9zZUNoYW5uZWxRdWVyeShwYXJhbXMsIGF1dGhPcHRpb25zKTtcbiAgICAgICAgcnVudGltZS5nZXRBdXRob3JpemVycygpW2F1dGhPcHRpb25zLnRyYW5zcG9ydF0ocnVudGltZSwgcXVlcnksIGF1dGhPcHRpb25zLCBBdXRoUmVxdWVzdFR5cGUuQ2hhbm5lbEF1dGhvcml6YXRpb24sIGNhbGxiYWNrKTtcbiAgICB9O1xufTtcbi8qIGhhcm1vbnkgZGVmYXVsdCBleHBvcnQgKi8gdmFyIGNoYW5uZWxfYXV0aG9yaXplciA9IChDaGFubmVsQXV0aG9yaXplcik7XG5cbi8vIENPTkNBVEVOQVRFRCBNT0RVTEU6IC4vc3JjL2NvcmUvYXV0aC9kZXByZWNhdGVkX2NoYW5uZWxfYXV0aG9yaXplci50c1xuY29uc3QgQ2hhbm5lbEF1dGhvcml6ZXJQcm94eSA9IChwdXNoZXIsIGF1dGhPcHRpb25zLCBjaGFubmVsQXV0aG9yaXplckdlbmVyYXRvcikgPT4ge1xuICAgIGNvbnN0IGRlcHJlY2F0ZWRBdXRob3JpemVyT3B0aW9ucyA9IHtcbiAgICAgICAgYXV0aFRyYW5zcG9ydDogYXV0aE9wdGlvbnMudHJhbnNwb3J0LFxuICAgICAgICBhdXRoRW5kcG9pbnQ6IGF1dGhPcHRpb25zLmVuZHBvaW50LFxuICAgICAgICBhdXRoOiB7XG4gICAgICAgICAgICBwYXJhbXM6IGF1dGhPcHRpb25zLnBhcmFtcyxcbiAgICAgICAgICAgIGhlYWRlcnM6IGF1dGhPcHRpb25zLmhlYWRlcnNcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIChwYXJhbXMsIGNhbGxiYWNrKSA9PiB7XG4gICAgICAgIGNvbnN0IGNoYW5uZWwgPSBwdXNoZXIuY2hhbm5lbChwYXJhbXMuY2hhbm5lbE5hbWUpO1xuICAgICAgICBjb25zdCBjaGFubmVsQXV0aG9yaXplciA9IGNoYW5uZWxBdXRob3JpemVyR2VuZXJhdG9yKGNoYW5uZWwsIGRlcHJlY2F0ZWRBdXRob3JpemVyT3B0aW9ucyk7XG4gICAgICAgIGNoYW5uZWxBdXRob3JpemVyLmF1dGhvcml6ZShwYXJhbXMuc29ja2V0SWQsIGNhbGxiYWNrKTtcbiAgICB9O1xufTtcblxuLy8gQ09OQ0FURU5BVEVEIE1PRFVMRTogLi9zcmMvY29yZS9jb25maWcudHNcblxuXG5cblxuXG5mdW5jdGlvbiBnZXRDb25maWcob3B0cywgcHVzaGVyKSB7XG4gICAgbGV0IGNvbmZpZyA9IHtcbiAgICAgICAgYWN0aXZpdHlUaW1lb3V0OiBvcHRzLmFjdGl2aXR5VGltZW91dCB8fCBkZWZhdWx0cy5hY3Rpdml0eVRpbWVvdXQsXG4gICAgICAgIGNsdXN0ZXI6IG9wdHMuY2x1c3RlcixcbiAgICAgICAgaHR0cFBhdGg6IG9wdHMuaHR0cFBhdGggfHwgZGVmYXVsdHMuaHR0cFBhdGgsXG4gICAgICAgIGh0dHBQb3J0OiBvcHRzLmh0dHBQb3J0IHx8IGRlZmF1bHRzLmh0dHBQb3J0LFxuICAgICAgICBodHRwc1BvcnQ6IG9wdHMuaHR0cHNQb3J0IHx8IGRlZmF1bHRzLmh0dHBzUG9ydCxcbiAgICAgICAgcG9uZ1RpbWVvdXQ6IG9wdHMucG9uZ1RpbWVvdXQgfHwgZGVmYXVsdHMucG9uZ1RpbWVvdXQsXG4gICAgICAgIHN0YXRzSG9zdDogb3B0cy5zdGF0c0hvc3QgfHwgZGVmYXVsdHMuc3RhdHNfaG9zdCxcbiAgICAgICAgdW5hdmFpbGFibGVUaW1lb3V0OiBvcHRzLnVuYXZhaWxhYmxlVGltZW91dCB8fCBkZWZhdWx0cy51bmF2YWlsYWJsZVRpbWVvdXQsXG4gICAgICAgIHdzUGF0aDogb3B0cy53c1BhdGggfHwgZGVmYXVsdHMud3NQYXRoLFxuICAgICAgICB3c1BvcnQ6IG9wdHMud3NQb3J0IHx8IGRlZmF1bHRzLndzUG9ydCxcbiAgICAgICAgd3NzUG9ydDogb3B0cy53c3NQb3J0IHx8IGRlZmF1bHRzLndzc1BvcnQsXG4gICAgICAgIGVuYWJsZVN0YXRzOiBnZXRFbmFibGVTdGF0c0NvbmZpZyhvcHRzKSxcbiAgICAgICAgaHR0cEhvc3Q6IGdldEh0dHBIb3N0KG9wdHMpLFxuICAgICAgICB1c2VUTFM6IHNob3VsZFVzZVRMUyhvcHRzKSxcbiAgICAgICAgd3NIb3N0OiBnZXRXZWJzb2NrZXRIb3N0KG9wdHMpLFxuICAgICAgICB1c2VyQXV0aGVudGljYXRvcjogYnVpbGRVc2VyQXV0aGVudGljYXRvcihvcHRzKSxcbiAgICAgICAgY2hhbm5lbEF1dGhvcml6ZXI6IGJ1aWxkQ2hhbm5lbEF1dGhvcml6ZXIob3B0cywgcHVzaGVyKVxuICAgIH07XG4gICAgaWYgKCdkaXNhYmxlZFRyYW5zcG9ydHMnIGluIG9wdHMpXG4gICAgICAgIGNvbmZpZy5kaXNhYmxlZFRyYW5zcG9ydHMgPSBvcHRzLmRpc2FibGVkVHJhbnNwb3J0cztcbiAgICBpZiAoJ2VuYWJsZWRUcmFuc3BvcnRzJyBpbiBvcHRzKVxuICAgICAgICBjb25maWcuZW5hYmxlZFRyYW5zcG9ydHMgPSBvcHRzLmVuYWJsZWRUcmFuc3BvcnRzO1xuICAgIGlmICgnaWdub3JlTnVsbE9yaWdpbicgaW4gb3B0cylcbiAgICAgICAgY29uZmlnLmlnbm9yZU51bGxPcmlnaW4gPSBvcHRzLmlnbm9yZU51bGxPcmlnaW47XG4gICAgaWYgKCd0aW1lbGluZVBhcmFtcycgaW4gb3B0cylcbiAgICAgICAgY29uZmlnLnRpbWVsaW5lUGFyYW1zID0gb3B0cy50aW1lbGluZVBhcmFtcztcbiAgICBpZiAoJ25hY2wnIGluIG9wdHMpIHtcbiAgICAgICAgY29uZmlnLm5hY2wgPSBvcHRzLm5hY2w7XG4gICAgfVxuICAgIHJldHVybiBjb25maWc7XG59XG5mdW5jdGlvbiBnZXRIdHRwSG9zdChvcHRzKSB7XG4gICAgaWYgKG9wdHMuaHR0cEhvc3QpIHtcbiAgICAgICAgcmV0dXJuIG9wdHMuaHR0cEhvc3Q7XG4gICAgfVxuICAgIGlmIChvcHRzLmNsdXN0ZXIpIHtcbiAgICAgICAgcmV0dXJuIGBzb2NranMtJHtvcHRzLmNsdXN0ZXJ9LnB1c2hlci5jb21gO1xuICAgIH1cbiAgICByZXR1cm4gZGVmYXVsdHMuaHR0cEhvc3Q7XG59XG5mdW5jdGlvbiBnZXRXZWJzb2NrZXRIb3N0KG9wdHMpIHtcbiAgICBpZiAob3B0cy53c0hvc3QpIHtcbiAgICAgICAgcmV0dXJuIG9wdHMud3NIb3N0O1xuICAgIH1cbiAgICByZXR1cm4gZ2V0V2Vic29ja2V0SG9zdEZyb21DbHVzdGVyKG9wdHMuY2x1c3Rlcik7XG59XG5mdW5jdGlvbiBnZXRXZWJzb2NrZXRIb3N0RnJvbUNsdXN0ZXIoY2x1c3Rlcikge1xuICAgIHJldHVybiBgd3MtJHtjbHVzdGVyfS5wdXNoZXIuY29tYDtcbn1cbmZ1bmN0aW9uIHNob3VsZFVzZVRMUyhvcHRzKSB7XG4gICAgaWYgKHJ1bnRpbWUuZ2V0UHJvdG9jb2woKSA9PT0gJ2h0dHBzOicpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGVsc2UgaWYgKG9wdHMuZm9yY2VUTFMgPT09IGZhbHNlKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG59XG5mdW5jdGlvbiBnZXRFbmFibGVTdGF0c0NvbmZpZyhvcHRzKSB7XG4gICAgaWYgKCdlbmFibGVTdGF0cycgaW4gb3B0cykge1xuICAgICAgICByZXR1cm4gb3B0cy5lbmFibGVTdGF0cztcbiAgICB9XG4gICAgaWYgKCdkaXNhYmxlU3RhdHMnIGluIG9wdHMpIHtcbiAgICAgICAgcmV0dXJuICFvcHRzLmRpc2FibGVTdGF0cztcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuZnVuY3Rpb24gYnVpbGRVc2VyQXV0aGVudGljYXRvcihvcHRzKSB7XG4gICAgY29uc3QgdXNlckF1dGhlbnRpY2F0aW9uID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0cy51c2VyQXV0aGVudGljYXRpb24pLCBvcHRzLnVzZXJBdXRoZW50aWNhdGlvbik7XG4gICAgaWYgKCdjdXN0b21IYW5kbGVyJyBpbiB1c2VyQXV0aGVudGljYXRpb24gJiZcbiAgICAgICAgdXNlckF1dGhlbnRpY2F0aW9uWydjdXN0b21IYW5kbGVyJ10gIT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gdXNlckF1dGhlbnRpY2F0aW9uWydjdXN0b21IYW5kbGVyJ107XG4gICAgfVxuICAgIHJldHVybiB1c2VyX2F1dGhlbnRpY2F0b3IodXNlckF1dGhlbnRpY2F0aW9uKTtcbn1cbmZ1bmN0aW9uIGJ1aWxkQ2hhbm5lbEF1dGgob3B0cywgcHVzaGVyKSB7XG4gICAgbGV0IGNoYW5uZWxBdXRob3JpemF0aW9uO1xuICAgIGlmICgnY2hhbm5lbEF1dGhvcml6YXRpb24nIGluIG9wdHMpIHtcbiAgICAgICAgY2hhbm5lbEF1dGhvcml6YXRpb24gPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRzLmNoYW5uZWxBdXRob3JpemF0aW9uKSwgb3B0cy5jaGFubmVsQXV0aG9yaXphdGlvbik7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBjaGFubmVsQXV0aG9yaXphdGlvbiA9IHtcbiAgICAgICAgICAgIHRyYW5zcG9ydDogb3B0cy5hdXRoVHJhbnNwb3J0IHx8IGRlZmF1bHRzLmF1dGhUcmFuc3BvcnQsXG4gICAgICAgICAgICBlbmRwb2ludDogb3B0cy5hdXRoRW5kcG9pbnQgfHwgZGVmYXVsdHMuYXV0aEVuZHBvaW50XG4gICAgICAgIH07XG4gICAgICAgIGlmICgnYXV0aCcgaW4gb3B0cykge1xuICAgICAgICAgICAgaWYgKCdwYXJhbXMnIGluIG9wdHMuYXV0aClcbiAgICAgICAgICAgICAgICBjaGFubmVsQXV0aG9yaXphdGlvbi5wYXJhbXMgPSBvcHRzLmF1dGgucGFyYW1zO1xuICAgICAgICAgICAgaWYgKCdoZWFkZXJzJyBpbiBvcHRzLmF1dGgpXG4gICAgICAgICAgICAgICAgY2hhbm5lbEF1dGhvcml6YXRpb24uaGVhZGVycyA9IG9wdHMuYXV0aC5oZWFkZXJzO1xuICAgICAgICB9XG4gICAgICAgIGlmICgnYXV0aG9yaXplcicgaW4gb3B0cylcbiAgICAgICAgICAgIGNoYW5uZWxBdXRob3JpemF0aW9uLmN1c3RvbUhhbmRsZXIgPSBDaGFubmVsQXV0aG9yaXplclByb3h5KHB1c2hlciwgY2hhbm5lbEF1dGhvcml6YXRpb24sIG9wdHMuYXV0aG9yaXplcik7XG4gICAgfVxuICAgIHJldHVybiBjaGFubmVsQXV0aG9yaXphdGlvbjtcbn1cbmZ1bmN0aW9uIGJ1aWxkQ2hhbm5lbEF1dGhvcml6ZXIob3B0cywgcHVzaGVyKSB7XG4gICAgY29uc3QgY2hhbm5lbEF1dGhvcml6YXRpb24gPSBidWlsZENoYW5uZWxBdXRoKG9wdHMsIHB1c2hlcik7XG4gICAgaWYgKCdjdXN0b21IYW5kbGVyJyBpbiBjaGFubmVsQXV0aG9yaXphdGlvbiAmJlxuICAgICAgICBjaGFubmVsQXV0aG9yaXphdGlvblsnY3VzdG9tSGFuZGxlciddICE9IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIGNoYW5uZWxBdXRob3JpemF0aW9uWydjdXN0b21IYW5kbGVyJ107XG4gICAgfVxuICAgIHJldHVybiBjaGFubmVsX2F1dGhvcml6ZXIoY2hhbm5lbEF1dGhvcml6YXRpb24pO1xufVxuXG4vLyBDT05DQVRFTkFURUQgTU9EVUxFOiAuL3NyYy9jb3JlL3dhdGNobGlzdC50c1xuXG5cbmNsYXNzIHdhdGNobGlzdF9XYXRjaGxpc3RGYWNhZGUgZXh0ZW5kcyBkaXNwYXRjaGVyX0Rpc3BhdGNoZXIge1xuICAgIGNvbnN0cnVjdG9yKHB1c2hlcikge1xuICAgICAgICBzdXBlcihmdW5jdGlvbiAoZXZlbnROYW1lLCBkYXRhKSB7XG4gICAgICAgICAgICBsb2dnZXIuZGVidWcoYE5vIGNhbGxiYWNrcyBvbiB3YXRjaGxpc3QgZXZlbnRzIGZvciAke2V2ZW50TmFtZX1gKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMucHVzaGVyID0gcHVzaGVyO1xuICAgICAgICB0aGlzLmJpbmRXYXRjaGxpc3RJbnRlcm5hbEV2ZW50KCk7XG4gICAgfVxuICAgIGhhbmRsZUV2ZW50KHB1c2hlckV2ZW50KSB7XG4gICAgICAgIHB1c2hlckV2ZW50LmRhdGEuZXZlbnRzLmZvckVhY2god2F0Y2hsaXN0RXZlbnQgPT4ge1xuICAgICAgICAgICAgdGhpcy5lbWl0KHdhdGNobGlzdEV2ZW50Lm5hbWUsIHdhdGNobGlzdEV2ZW50KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGJpbmRXYXRjaGxpc3RJbnRlcm5hbEV2ZW50KCkge1xuICAgICAgICB0aGlzLnB1c2hlci5jb25uZWN0aW9uLmJpbmQoJ21lc3NhZ2UnLCBwdXNoZXJFdmVudCA9PiB7XG4gICAgICAgICAgICB2YXIgZXZlbnROYW1lID0gcHVzaGVyRXZlbnQuZXZlbnQ7XG4gICAgICAgICAgICBpZiAoZXZlbnROYW1lID09PSAncHVzaGVyX2ludGVybmFsOndhdGNobGlzdF9ldmVudHMnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVFdmVudChwdXNoZXJFdmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuLy8gQ09OQ0FURU5BVEVEIE1PRFVMRTogLi9zcmMvY29yZS91dGlscy9mbGF0X3Byb21pc2UudHNcbmZ1bmN0aW9uIGZsYXRQcm9taXNlKCkge1xuICAgIGxldCByZXNvbHZlLCByZWplY3Q7XG4gICAgY29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXMsIHJlaikgPT4ge1xuICAgICAgICByZXNvbHZlID0gcmVzO1xuICAgICAgICByZWplY3QgPSByZWo7XG4gICAgfSk7XG4gICAgcmV0dXJuIHsgcHJvbWlzZSwgcmVzb2x2ZSwgcmVqZWN0IH07XG59XG4vKiBoYXJtb255IGRlZmF1bHQgZXhwb3J0ICovIHZhciBmbGF0X3Byb21pc2UgPSAoZmxhdFByb21pc2UpO1xuXG4vLyBDT05DQVRFTkFURUQgTU9EVUxFOiAuL3NyYy9jb3JlL3VzZXIudHNcblxuXG5cblxuXG5jbGFzcyB1c2VyX1VzZXJGYWNhZGUgZXh0ZW5kcyBkaXNwYXRjaGVyX0Rpc3BhdGNoZXIge1xuICAgIGNvbnN0cnVjdG9yKHB1c2hlcikge1xuICAgICAgICBzdXBlcihmdW5jdGlvbiAoZXZlbnROYW1lLCBkYXRhKSB7XG4gICAgICAgICAgICBsb2dnZXIuZGVidWcoJ05vIGNhbGxiYWNrcyBvbiB1c2VyIGZvciAnICsgZXZlbnROYW1lKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc2lnbmluX3JlcXVlc3RlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnVzZXJfZGF0YSA9IG51bGw7XG4gICAgICAgIHRoaXMuc2VydmVyVG9Vc2VyQ2hhbm5lbCA9IG51bGw7XG4gICAgICAgIHRoaXMuc2lnbmluRG9uZVByb21pc2UgPSBudWxsO1xuICAgICAgICB0aGlzLl9zaWduaW5Eb25lUmVzb2x2ZSA9IG51bGw7XG4gICAgICAgIHRoaXMuX29uQXV0aG9yaXplID0gKGVyciwgYXV0aERhdGEpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICBsb2dnZXIud2FybihgRXJyb3IgZHVyaW5nIHNpZ25pbjogJHtlcnJ9YCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2xlYW51cCgpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucHVzaGVyLnNlbmRfZXZlbnQoJ3B1c2hlcjpzaWduaW4nLCB7XG4gICAgICAgICAgICAgICAgYXV0aDogYXV0aERhdGEuYXV0aCxcbiAgICAgICAgICAgICAgICB1c2VyX2RhdGE6IGF1dGhEYXRhLnVzZXJfZGF0YVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMucHVzaGVyID0gcHVzaGVyO1xuICAgICAgICB0aGlzLnB1c2hlci5jb25uZWN0aW9uLmJpbmQoJ3N0YXRlX2NoYW5nZScsICh7IHByZXZpb3VzLCBjdXJyZW50IH0pID0+IHtcbiAgICAgICAgICAgIGlmIChwcmV2aW91cyAhPT0gJ2Nvbm5lY3RlZCcgJiYgY3VycmVudCA9PT0gJ2Nvbm5lY3RlZCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zaWduaW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwcmV2aW91cyA9PT0gJ2Nvbm5lY3RlZCcgJiYgY3VycmVudCAhPT0gJ2Nvbm5lY3RlZCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jbGVhbnVwKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fbmV3U2lnbmluUHJvbWlzZUlmTmVlZGVkKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLndhdGNobGlzdCA9IG5ldyB3YXRjaGxpc3RfV2F0Y2hsaXN0RmFjYWRlKHB1c2hlcik7XG4gICAgICAgIHRoaXMucHVzaGVyLmNvbm5lY3Rpb24uYmluZCgnbWVzc2FnZScsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIHZhciBldmVudE5hbWUgPSBldmVudC5ldmVudDtcbiAgICAgICAgICAgIGlmIChldmVudE5hbWUgPT09ICdwdXNoZXI6c2lnbmluX3N1Y2Nlc3MnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fb25TaWduaW5TdWNjZXNzKGV2ZW50LmRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuc2VydmVyVG9Vc2VyQ2hhbm5lbCAmJlxuICAgICAgICAgICAgICAgIHRoaXMuc2VydmVyVG9Vc2VyQ2hhbm5lbC5uYW1lID09PSBldmVudC5jaGFubmVsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXJ2ZXJUb1VzZXJDaGFubmVsLmhhbmRsZUV2ZW50KGV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHNpZ25pbigpIHtcbiAgICAgICAgaWYgKHRoaXMuc2lnbmluX3JlcXVlc3RlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2lnbmluX3JlcXVlc3RlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuX3NpZ25pbigpO1xuICAgIH1cbiAgICBfc2lnbmluKCkge1xuICAgICAgICBpZiAoIXRoaXMuc2lnbmluX3JlcXVlc3RlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX25ld1NpZ25pblByb21pc2VJZk5lZWRlZCgpO1xuICAgICAgICBpZiAodGhpcy5wdXNoZXIuY29ubmVjdGlvbi5zdGF0ZSAhPT0gJ2Nvbm5lY3RlZCcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnB1c2hlci5jb25maWcudXNlckF1dGhlbnRpY2F0b3Ioe1xuICAgICAgICAgICAgc29ja2V0SWQ6IHRoaXMucHVzaGVyLmNvbm5lY3Rpb24uc29ja2V0X2lkXG4gICAgICAgIH0sIHRoaXMuX29uQXV0aG9yaXplKTtcbiAgICB9XG4gICAgX29uU2lnbmluU3VjY2VzcyhkYXRhKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0aGlzLnVzZXJfZGF0YSA9IEpTT04ucGFyc2UoZGF0YS51c2VyX2RhdGEpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICBsb2dnZXIuZXJyb3IoYEZhaWxlZCBwYXJzaW5nIHVzZXIgZGF0YSBhZnRlciBzaWduaW46ICR7ZGF0YS51c2VyX2RhdGF9YCk7XG4gICAgICAgICAgICB0aGlzLl9jbGVhbnVwKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnVzZXJfZGF0YS5pZCAhPT0gJ3N0cmluZycgfHwgdGhpcy51c2VyX2RhdGEuaWQgPT09ICcnKSB7XG4gICAgICAgICAgICBsb2dnZXIuZXJyb3IoYHVzZXJfZGF0YSBkb2Vzbid0IGNvbnRhaW4gYW4gaWQuIHVzZXJfZGF0YTogJHt0aGlzLnVzZXJfZGF0YX1gKTtcbiAgICAgICAgICAgIHRoaXMuX2NsZWFudXAoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9zaWduaW5Eb25lUmVzb2x2ZSgpO1xuICAgICAgICB0aGlzLl9zdWJzY3JpYmVDaGFubmVscygpO1xuICAgIH1cbiAgICBfc3Vic2NyaWJlQ2hhbm5lbHMoKSB7XG4gICAgICAgIGNvbnN0IGVuc3VyZV9zdWJzY3JpYmVkID0gY2hhbm5lbCA9PiB7XG4gICAgICAgICAgICBpZiAoY2hhbm5lbC5zdWJzY3JpcHRpb25QZW5kaW5nICYmIGNoYW5uZWwuc3Vic2NyaXB0aW9uQ2FuY2VsbGVkKSB7XG4gICAgICAgICAgICAgICAgY2hhbm5lbC5yZWluc3RhdGVTdWJzY3JpcHRpb24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKCFjaGFubmVsLnN1YnNjcmlwdGlvblBlbmRpbmcgJiZcbiAgICAgICAgICAgICAgICB0aGlzLnB1c2hlci5jb25uZWN0aW9uLnN0YXRlID09PSAnY29ubmVjdGVkJykge1xuICAgICAgICAgICAgICAgIGNoYW5uZWwuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc2VydmVyVG9Vc2VyQ2hhbm5lbCA9IG5ldyBjaGFubmVsX0NoYW5uZWwoYCNzZXJ2ZXItdG8tdXNlci0ke3RoaXMudXNlcl9kYXRhLmlkfWAsIHRoaXMucHVzaGVyKTtcbiAgICAgICAgdGhpcy5zZXJ2ZXJUb1VzZXJDaGFubmVsLmJpbmRfZ2xvYmFsKChldmVudE5hbWUsIGRhdGEpID0+IHtcbiAgICAgICAgICAgIGlmIChldmVudE5hbWUuaW5kZXhPZigncHVzaGVyX2ludGVybmFsOicpID09PSAwIHx8XG4gICAgICAgICAgICAgICAgZXZlbnROYW1lLmluZGV4T2YoJ3B1c2hlcjonKSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZW1pdChldmVudE5hbWUsIGRhdGEpO1xuICAgICAgICB9KTtcbiAgICAgICAgZW5zdXJlX3N1YnNjcmliZWQodGhpcy5zZXJ2ZXJUb1VzZXJDaGFubmVsKTtcbiAgICB9XG4gICAgX2NsZWFudXAoKSB7XG4gICAgICAgIHRoaXMudXNlcl9kYXRhID0gbnVsbDtcbiAgICAgICAgaWYgKHRoaXMuc2VydmVyVG9Vc2VyQ2hhbm5lbCkge1xuICAgICAgICAgICAgdGhpcy5zZXJ2ZXJUb1VzZXJDaGFubmVsLnVuYmluZF9hbGwoKTtcbiAgICAgICAgICAgIHRoaXMuc2VydmVyVG9Vc2VyQ2hhbm5lbC5kaXNjb25uZWN0KCk7XG4gICAgICAgICAgICB0aGlzLnNlcnZlclRvVXNlckNoYW5uZWwgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnNpZ25pbl9yZXF1ZXN0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX3NpZ25pbkRvbmVSZXNvbHZlKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgX25ld1NpZ25pblByb21pc2VJZk5lZWRlZCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnNpZ25pbl9yZXF1ZXN0ZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zaWduaW5Eb25lUHJvbWlzZSAmJiAhdGhpcy5zaWduaW5Eb25lUHJvbWlzZS5kb25lKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgeyBwcm9taXNlLCByZXNvbHZlLCByZWplY3Q6IF8gfSA9IGZsYXRfcHJvbWlzZSgpO1xuICAgICAgICBwcm9taXNlLmRvbmUgPSBmYWxzZTtcbiAgICAgICAgY29uc3Qgc2V0RG9uZSA9ICgpID0+IHtcbiAgICAgICAgICAgIHByb21pc2UuZG9uZSA9IHRydWU7XG4gICAgICAgIH07XG4gICAgICAgIHByb21pc2UudGhlbihzZXREb25lKS5jYXRjaChzZXREb25lKTtcbiAgICAgICAgdGhpcy5zaWduaW5Eb25lUHJvbWlzZSA9IHByb21pc2U7XG4gICAgICAgIHRoaXMuX3NpZ25pbkRvbmVSZXNvbHZlID0gcmVzb2x2ZTtcbiAgICB9XG59XG5cbi8vIENPTkNBVEVOQVRFRCBNT0RVTEU6IC4vc3JjL2NvcmUvcHVzaGVyLnRzXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cbmNsYXNzIHB1c2hlcl9QdXNoZXIge1xuICAgIHN0YXRpYyByZWFkeSgpIHtcbiAgICAgICAgcHVzaGVyX1B1c2hlci5pc1JlYWR5ID0gdHJ1ZTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBwdXNoZXJfUHVzaGVyLmluc3RhbmNlcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgIHB1c2hlcl9QdXNoZXIuaW5zdGFuY2VzW2ldLmNvbm5lY3QoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzdGF0aWMgZ2V0Q2xpZW50RmVhdHVyZXMoKSB7XG4gICAgICAgIHJldHVybiBrZXlzKGZpbHRlck9iamVjdCh7IHdzOiBydW50aW1lLlRyYW5zcG9ydHMud3MgfSwgZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgICAgIHJldHVybiB0LmlzU3VwcG9ydGVkKHt9KTtcbiAgICAgICAgfSkpO1xuICAgIH1cbiAgICBjb25zdHJ1Y3RvcihhcHBfa2V5LCBvcHRpb25zKSB7XG4gICAgICAgIGNoZWNrQXBwS2V5KGFwcF9rZXkpO1xuICAgICAgICB2YWxpZGF0ZU9wdGlvbnMob3B0aW9ucyk7XG4gICAgICAgIHRoaXMua2V5ID0gYXBwX2tleTtcbiAgICAgICAgdGhpcy5jb25maWcgPSBnZXRDb25maWcob3B0aW9ucywgdGhpcyk7XG4gICAgICAgIHRoaXMuY2hhbm5lbHMgPSBmYWN0b3J5LmNyZWF0ZUNoYW5uZWxzKCk7XG4gICAgICAgIHRoaXMuZ2xvYmFsX2VtaXR0ZXIgPSBuZXcgZGlzcGF0Y2hlcl9EaXNwYXRjaGVyKCk7XG4gICAgICAgIHRoaXMuc2Vzc2lvbklEID0gcnVudGltZS5yYW5kb21JbnQoMTAwMDAwMDAwMCk7XG4gICAgICAgIHRoaXMudGltZWxpbmUgPSBuZXcgdGltZWxpbmVfVGltZWxpbmUodGhpcy5rZXksIHRoaXMuc2Vzc2lvbklELCB7XG4gICAgICAgICAgICBjbHVzdGVyOiB0aGlzLmNvbmZpZy5jbHVzdGVyLFxuICAgICAgICAgICAgZmVhdHVyZXM6IHB1c2hlcl9QdXNoZXIuZ2V0Q2xpZW50RmVhdHVyZXMoKSxcbiAgICAgICAgICAgIHBhcmFtczogdGhpcy5jb25maWcudGltZWxpbmVQYXJhbXMgfHwge30sXG4gICAgICAgICAgICBsaW1pdDogNTAsXG4gICAgICAgICAgICBsZXZlbDogdGltZWxpbmVfbGV2ZWwuSU5GTyxcbiAgICAgICAgICAgIHZlcnNpb246IGRlZmF1bHRzLlZFUlNJT05cbiAgICAgICAgfSk7XG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5lbmFibGVTdGF0cykge1xuICAgICAgICAgICAgdGhpcy50aW1lbGluZVNlbmRlciA9IGZhY3RvcnkuY3JlYXRlVGltZWxpbmVTZW5kZXIodGhpcy50aW1lbGluZSwge1xuICAgICAgICAgICAgICAgIGhvc3Q6IHRoaXMuY29uZmlnLnN0YXRzSG9zdCxcbiAgICAgICAgICAgICAgICBwYXRoOiAnL3RpbWVsaW5lL3YyLycgKyBydW50aW1lLlRpbWVsaW5lVHJhbnNwb3J0Lm5hbWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHZhciBnZXRTdHJhdGVneSA9IChvcHRpb25zKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gcnVudGltZS5nZXREZWZhdWx0U3RyYXRlZ3kodGhpcy5jb25maWcsIG9wdGlvbnMsIHN0cmF0ZWd5X2J1aWxkZXJfZGVmaW5lVHJhbnNwb3J0KTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uID0gZmFjdG9yeS5jcmVhdGVDb25uZWN0aW9uTWFuYWdlcih0aGlzLmtleSwge1xuICAgICAgICAgICAgZ2V0U3RyYXRlZ3k6IGdldFN0cmF0ZWd5LFxuICAgICAgICAgICAgdGltZWxpbmU6IHRoaXMudGltZWxpbmUsXG4gICAgICAgICAgICBhY3Rpdml0eVRpbWVvdXQ6IHRoaXMuY29uZmlnLmFjdGl2aXR5VGltZW91dCxcbiAgICAgICAgICAgIHBvbmdUaW1lb3V0OiB0aGlzLmNvbmZpZy5wb25nVGltZW91dCxcbiAgICAgICAgICAgIHVuYXZhaWxhYmxlVGltZW91dDogdGhpcy5jb25maWcudW5hdmFpbGFibGVUaW1lb3V0LFxuICAgICAgICAgICAgdXNlVExTOiBCb29sZWFuKHRoaXMuY29uZmlnLnVzZVRMUylcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuY29ubmVjdGlvbi5iaW5kKCdjb25uZWN0ZWQnLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnN1YnNjcmliZUFsbCgpO1xuICAgICAgICAgICAgaWYgKHRoaXMudGltZWxpbmVTZW5kZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWVsaW5lU2VuZGVyLnNlbmQodGhpcy5jb25uZWN0aW9uLmlzVXNpbmdUTFMoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmNvbm5lY3Rpb24uYmluZCgnbWVzc2FnZScsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIHZhciBldmVudE5hbWUgPSBldmVudC5ldmVudDtcbiAgICAgICAgICAgIHZhciBpbnRlcm5hbCA9IGV2ZW50TmFtZS5pbmRleE9mKCdwdXNoZXJfaW50ZXJuYWw6JykgPT09IDA7XG4gICAgICAgICAgICBpZiAoZXZlbnQuY2hhbm5lbCkge1xuICAgICAgICAgICAgICAgIHZhciBjaGFubmVsID0gdGhpcy5jaGFubmVsKGV2ZW50LmNoYW5uZWwpO1xuICAgICAgICAgICAgICAgIGlmIChjaGFubmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNoYW5uZWwuaGFuZGxlRXZlbnQoZXZlbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghaW50ZXJuYWwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdsb2JhbF9lbWl0dGVyLmVtaXQoZXZlbnQuZXZlbnQsIGV2ZW50LmRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uLmJpbmQoJ2Nvbm5lY3RpbmcnLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNoYW5uZWxzLmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuY29ubmVjdGlvbi5iaW5kKCdkaXNjb25uZWN0ZWQnLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNoYW5uZWxzLmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuY29ubmVjdGlvbi5iaW5kKCdlcnJvcicsIGVyciA9PiB7XG4gICAgICAgICAgICBsb2dnZXIud2FybihlcnIpO1xuICAgICAgICB9KTtcbiAgICAgICAgcHVzaGVyX1B1c2hlci5pbnN0YW5jZXMucHVzaCh0aGlzKTtcbiAgICAgICAgdGhpcy50aW1lbGluZS5pbmZvKHsgaW5zdGFuY2VzOiBwdXNoZXJfUHVzaGVyLmluc3RhbmNlcy5sZW5ndGggfSk7XG4gICAgICAgIHRoaXMudXNlciA9IG5ldyB1c2VyX1VzZXJGYWNhZGUodGhpcyk7XG4gICAgICAgIGlmIChwdXNoZXJfUHVzaGVyLmlzUmVhZHkpIHtcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNoYW5uZWwobmFtZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5jaGFubmVscy5maW5kKG5hbWUpO1xuICAgIH1cbiAgICBhbGxDaGFubmVscygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hhbm5lbHMuYWxsKCk7XG4gICAgfVxuICAgIGNvbm5lY3QoKSB7XG4gICAgICAgIHRoaXMuY29ubmVjdGlvbi5jb25uZWN0KCk7XG4gICAgICAgIGlmICh0aGlzLnRpbWVsaW5lU2VuZGVyKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMudGltZWxpbmVTZW5kZXJUaW1lcikge1xuICAgICAgICAgICAgICAgIHZhciB1c2luZ1RMUyA9IHRoaXMuY29ubmVjdGlvbi5pc1VzaW5nVExTKCk7XG4gICAgICAgICAgICAgICAgdmFyIHRpbWVsaW5lU2VuZGVyID0gdGhpcy50aW1lbGluZVNlbmRlcjtcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWVsaW5lU2VuZGVyVGltZXIgPSBuZXcgdGltZXJzX1BlcmlvZGljVGltZXIoNjAwMDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGltZWxpbmVTZW5kZXIuc2VuZCh1c2luZ1RMUyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZGlzY29ubmVjdCgpIHtcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uLmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgaWYgKHRoaXMudGltZWxpbmVTZW5kZXJUaW1lcikge1xuICAgICAgICAgICAgdGhpcy50aW1lbGluZVNlbmRlclRpbWVyLmVuc3VyZUFib3J0ZWQoKTtcbiAgICAgICAgICAgIHRoaXMudGltZWxpbmVTZW5kZXJUaW1lciA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYmluZChldmVudF9uYW1lLCBjYWxsYmFjaywgY29udGV4dCkge1xuICAgICAgICB0aGlzLmdsb2JhbF9lbWl0dGVyLmJpbmQoZXZlbnRfbmFtZSwgY2FsbGJhY2ssIGNvbnRleHQpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgdW5iaW5kKGV2ZW50X25hbWUsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgICAgIHRoaXMuZ2xvYmFsX2VtaXR0ZXIudW5iaW5kKGV2ZW50X25hbWUsIGNhbGxiYWNrLCBjb250ZXh0KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGJpbmRfZ2xvYmFsKGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMuZ2xvYmFsX2VtaXR0ZXIuYmluZF9nbG9iYWwoY2FsbGJhY2spO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgdW5iaW5kX2dsb2JhbChjYWxsYmFjaykge1xuICAgICAgICB0aGlzLmdsb2JhbF9lbWl0dGVyLnVuYmluZF9nbG9iYWwoY2FsbGJhY2spO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgdW5iaW5kX2FsbChjYWxsYmFjaykge1xuICAgICAgICB0aGlzLmdsb2JhbF9lbWl0dGVyLnVuYmluZF9hbGwoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHN1YnNjcmliZUFsbCgpIHtcbiAgICAgICAgdmFyIGNoYW5uZWxOYW1lO1xuICAgICAgICBmb3IgKGNoYW5uZWxOYW1lIGluIHRoaXMuY2hhbm5lbHMuY2hhbm5lbHMpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmNoYW5uZWxzLmNoYW5uZWxzLmhhc093blByb3BlcnR5KGNoYW5uZWxOYW1lKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3Vic2NyaWJlKGNoYW5uZWxOYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBzdWJzY3JpYmUoY2hhbm5lbF9uYW1lKSB7XG4gICAgICAgIHZhciBjaGFubmVsID0gdGhpcy5jaGFubmVscy5hZGQoY2hhbm5lbF9uYW1lLCB0aGlzKTtcbiAgICAgICAgaWYgKGNoYW5uZWwuc3Vic2NyaXB0aW9uUGVuZGluZyAmJiBjaGFubmVsLnN1YnNjcmlwdGlvbkNhbmNlbGxlZCkge1xuICAgICAgICAgICAgY2hhbm5lbC5yZWluc3RhdGVTdWJzY3JpcHRpb24oKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICghY2hhbm5lbC5zdWJzY3JpcHRpb25QZW5kaW5nICYmXG4gICAgICAgICAgICB0aGlzLmNvbm5lY3Rpb24uc3RhdGUgPT09ICdjb25uZWN0ZWQnKSB7XG4gICAgICAgICAgICBjaGFubmVsLnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjaGFubmVsO1xuICAgIH1cbiAgICB1bnN1YnNjcmliZShjaGFubmVsX25hbWUpIHtcbiAgICAgICAgdmFyIGNoYW5uZWwgPSB0aGlzLmNoYW5uZWxzLmZpbmQoY2hhbm5lbF9uYW1lKTtcbiAgICAgICAgaWYgKGNoYW5uZWwgJiYgY2hhbm5lbC5zdWJzY3JpcHRpb25QZW5kaW5nKSB7XG4gICAgICAgICAgICBjaGFubmVsLmNhbmNlbFN1YnNjcmlwdGlvbigpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY2hhbm5lbCA9IHRoaXMuY2hhbm5lbHMucmVtb3ZlKGNoYW5uZWxfbmFtZSk7XG4gICAgICAgICAgICBpZiAoY2hhbm5lbCAmJiBjaGFubmVsLnN1YnNjcmliZWQpIHtcbiAgICAgICAgICAgICAgICBjaGFubmVsLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgc2VuZF9ldmVudChldmVudF9uYW1lLCBkYXRhLCBjaGFubmVsKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbm5lY3Rpb24uc2VuZF9ldmVudChldmVudF9uYW1lLCBkYXRhLCBjaGFubmVsKTtcbiAgICB9XG4gICAgc2hvdWxkVXNlVExTKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcudXNlVExTO1xuICAgIH1cbiAgICBzaWduaW4oKSB7XG4gICAgICAgIHRoaXMudXNlci5zaWduaW4oKTtcbiAgICB9XG59XG5wdXNoZXJfUHVzaGVyLmluc3RhbmNlcyA9IFtdO1xucHVzaGVyX1B1c2hlci5pc1JlYWR5ID0gZmFsc2U7XG5wdXNoZXJfUHVzaGVyLmxvZ1RvQ29uc29sZSA9IGZhbHNlO1xucHVzaGVyX1B1c2hlci5SdW50aW1lID0gcnVudGltZTtcbnB1c2hlcl9QdXNoZXIuU2NyaXB0UmVjZWl2ZXJzID0gcnVudGltZS5TY3JpcHRSZWNlaXZlcnM7XG5wdXNoZXJfUHVzaGVyLkRlcGVuZGVuY2llc1JlY2VpdmVycyA9IHJ1bnRpbWUuRGVwZW5kZW5jaWVzUmVjZWl2ZXJzO1xucHVzaGVyX1B1c2hlci5hdXRoX2NhbGxiYWNrcyA9IHJ1bnRpbWUuYXV0aF9jYWxsYmFja3M7XG4vKiBoYXJtb255IGRlZmF1bHQgZXhwb3J0ICovIHZhciBjb3JlX3B1c2hlciA9IF9fd2VicGFja19leHBvcnRzX19bXCJkZWZhdWx0XCJdID0gKHB1c2hlcl9QdXNoZXIpO1xuZnVuY3Rpb24gY2hlY2tBcHBLZXkoa2V5KSB7XG4gICAgaWYgKGtleSA9PT0gbnVsbCB8fCBrZXkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aHJvdyAnWW91IG11c3QgcGFzcyB5b3VyIGFwcCBrZXkgd2hlbiB5b3UgaW5zdGFudGlhdGUgUHVzaGVyLic7XG4gICAgfVxufVxucnVudGltZS5zZXR1cChwdXNoZXJfUHVzaGVyKTtcblxuXG4vKioqLyB9KVxuLyoqKioqKi8gXSk7XG59KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXB1c2hlci5qcy5tYXAiLCJpbXBvcnQgeyBib290IH0gZnJvbSAncXVhc2FyL3dyYXBwZXJzJ1xyXG5pbXBvcnQgUHVzaGVyIGZyb20gJ3B1c2hlci1qcydcclxuaW1wb3J0IHsgYXBpIH0gZnJvbSAnYm9vdC9heGlvcydcclxuXHJcbmxldCBwdXNoZXIgPSBudWxsXHJcblxyXG5jb25zdCBpbml0UHVzaGVyID0gKCkgPT4ge1xyXG4gIHB1c2hlciA9IG5ldyBQdXNoZXIoJ2Y3NjUzYjRmZTRmZDFhYmM0OWViJywge1xyXG4gICAgY2x1c3RlcjogJ2V1JyxcclxuICAgIGF1dGhFbmRwb2ludDogJ2h0dHBzOi8vZ2FtaW5nZHJ2LnN0YWdlaXQuc2UvYXBpL3B1c2hlci9hdXRoJyxcclxuICAgIGF1dGg6IHtcclxuICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgIEFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KVxyXG5cclxuICAvLyBoZWFkZXIgdG8gb21pdCBldmVudCBmcm9tIHVzZXIgc2VuZGluZyB0aGVtXHJcbiAgcHVzaGVyLmNvbm5lY3Rpb24uYmluZCgnY29ubmVjdGVkJywgKCkgPT4ge1xyXG4gICAgYXBpLmRlZmF1bHRzLmhlYWRlcnMuY29tbW9uWydYLVNvY2tldC1JZCddID0gcHVzaGVyLmNvbm5lY3Rpb24uc29ja2V0X2lkXHJcbiAgfSlcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgYm9vdCgoeyBhcHAsIHN0b3JlIH0pID0+IHtcclxuXHJcbn0pXHJcblxyXG5leHBvcnQgeyBwdXNoZXIsIGluaXRQdXNoZXIgfSJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwia2V5IiwiZCIsImIiLCJDb2RlciIsIlVSTFNhZmVDb2RlciIsInByZWZpeCIsIkF1dGhSZXF1ZXN0VHlwZSIsImtleXMiLCJ2YWx1ZXMiLCJkb2N1bWVudCIsInN0YXRlIiwicHVzaGVyIiwidHJhbnNwb3J0cyIsIlN0YXRlIiwicmFuZG9tIiwiVGltZWxpbmVMZXZlbCIsIm9wdGlvbnMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFRQSxHQUFDLFNBQVMsaUNBQWlDLE1BQU0sU0FBUztBQUV4RCxXQUFBLFVBQWlCO0VBT25CLEdBQUcsUUFBUSxXQUFXO0FBQ3RCLFdBQWlCLFNBQVMsU0FBUztBQUV6QixV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
