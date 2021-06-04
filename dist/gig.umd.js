(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "events"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("events"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.events);
    global.unknown = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports2, _events) {
  "use strict";

  Object.defineProperty(_exports2, "__esModule", {
    value: true
  });
  _exports2.STATUS = _exports2.INACTIVE_STATUS = _exports2.Gig = _exports2.EXPIRED_STATUS = _exports2.CONSTANTS = _exports2.ACTIVE_STATUS = void 0;
  _events = _interopRequireDefault2(_events);

  function _interopRequireDefault2(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

  function _classCallCheck3(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function __defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass3(Constructor, protoProps, staticProps) { if (protoProps) __defineProperties(Constructor.prototype, protoProps); if (staticProps) __defineProperties(Constructor, staticProps); return Constructor; }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _possibleConstructorReturn(self, call) { if (call && (_typeof3(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

  function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

  function _typeof3(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof3 = function _typeof3(obj) { return typeof obj; }; } else { _typeof3 = function _typeof3(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof3(obj); }

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function getAugmentedNamespace(n) {
    if (n.__esModule) return n;
    var a = Object.defineProperty({}, '__esModule', {
      value: true
    });
    Object.keys(n).forEach(function (k) {
      var d = Object.getOwnPropertyDescriptor(n, k);
      Object.defineProperty(a, k, d.get ? d : {
        enumerable: true,
        get: function get() {
          return n[k];
        }
      });
    });
    return a;
  }

  function createCommonjsModule(fn) {
    var module = {
      exports: {}
    };
    return fn(module, module.exports), module.exports;
  }

  var check = function check(it) {
    return it && it.Math == Math && it;
  }; // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028


  var global$1 = // eslint-disable-next-line es/no-global-this -- safe
  check((typeof globalThis === "undefined" ? "undefined" : _typeof3(globalThis)) == 'object' && globalThis) || check((typeof window === "undefined" ? "undefined" : _typeof3(window)) == 'object' && window) || // eslint-disable-next-line no-restricted-globals -- safe
  check((typeof self === "undefined" ? "undefined" : _typeof3(self)) == 'object' && self) || check(_typeof3(commonjsGlobal) == 'object' && commonjsGlobal) || // eslint-disable-next-line no-new-func -- fallback
  function () {
    return this;
  }() || Function('return this')();

  var fails = function fails(exec) {
    try {
      return !!exec();
    } catch (error) {
      return true;
    }
  }; // Detect IE8's incomplete defineProperty implementation


  var descriptors = !fails(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- required for testing
    return Object.defineProperty({}, 1, {
      get: function get() {
        return 7;
      }
    })[1] != 7;
  });
  var $propertyIsEnumerable$1 = {}.propertyIsEnumerable; // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe

  var getOwnPropertyDescriptor$3 = Object.getOwnPropertyDescriptor; // Nashorn ~ JDK8 bug

  var NASHORN_BUG = getOwnPropertyDescriptor$3 && !$propertyIsEnumerable$1.call({
    1: 2
  }, 1); // `Object.prototype.propertyIsEnumerable` method implementation
  // https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable

  var f$6 = NASHORN_BUG ? function propertyIsEnumerable(V) {
    var descriptor = getOwnPropertyDescriptor$3(this, V);
    return !!descriptor && descriptor.enumerable;
  } : $propertyIsEnumerable$1;
  var objectPropertyIsEnumerable = {
    f: f$6
  };

  var createPropertyDescriptor = function createPropertyDescriptor(bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value
    };
  };

  var toString$1 = {}.toString;

  var classofRaw = function classofRaw(it) {
    return toString$1.call(it).slice(8, -1);
  };

  var split = ''.split; // fallback for non-array-like ES3 and non-enumerable old V8 strings

  var indexedObject = fails(function () {
    // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
    // eslint-disable-next-line no-prototype-builtins -- safe
    return !Object('z').propertyIsEnumerable(0);
  }) ? function (it) {
    return classofRaw(it) == 'String' ? split.call(it, '') : Object(it);
  } : Object; // `RequireObjectCoercible` abstract operation
  // https://tc39.es/ecma262/#sec-requireobjectcoercible

  var requireObjectCoercible = function requireObjectCoercible(it) {
    if (it == undefined) throw TypeError("Can't call method on " + it);
    return it;
  }; // toObject with fallback for non-array-like ES3 strings


  var toIndexedObject = function toIndexedObject(it) {
    return indexedObject(requireObjectCoercible(it));
  };

  var isObject = function isObject(it) {
    return _typeof3(it) === 'object' ? it !== null : typeof it === 'function';
  }; // `ToPrimitive` abstract operation
  // https://tc39.es/ecma262/#sec-toprimitive
  // instead of the ES6 spec version, we didn't implement @@toPrimitive case
  // and the second argument - flag - preferred type is a string


  var toPrimitive = function toPrimitive(input, PREFERRED_STRING) {
    if (!isObject(input)) return input;
    var fn, val;
    if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
    if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
    if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
    throw TypeError("Can't convert object to primitive value");
  }; // `ToObject` abstract operation
  // https://tc39.es/ecma262/#sec-toobject


  var toObject = function toObject(argument) {
    return Object(requireObjectCoercible(argument));
  };

  var hasOwnProperty = {}.hasOwnProperty;

  var has$1 = Object.hasOwn || function hasOwn(it, key) {
    return hasOwnProperty.call(toObject(it), key);
  };

  var document$1 = global$1.document; // typeof document.createElement is 'object' in old IE

  var EXISTS = isObject(document$1) && isObject(document$1.createElement);

  var documentCreateElement = function documentCreateElement(it) {
    return EXISTS ? document$1.createElement(it) : {};
  }; // Thank's IE8 for his funny defineProperty


  var ie8DomDefine = !descriptors && !fails(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- requied for testing
    return Object.defineProperty(documentCreateElement('div'), 'a', {
      get: function get() {
        return 7;
      }
    }).a != 7;
  }); // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe

  var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor; // `Object.getOwnPropertyDescriptor` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptor

  var f$5 = descriptors ? $getOwnPropertyDescriptor$1 : function getOwnPropertyDescriptor(O, P) {
    O = toIndexedObject(O);
    P = toPrimitive(P, true);
    if (ie8DomDefine) try {
      return $getOwnPropertyDescriptor$1(O, P);
    } catch (error) {
      /* empty */
    }
    if (has$1(O, P)) return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
  };
  var objectGetOwnPropertyDescriptor = {
    f: f$5
  };
  var replacement = /#|\.prototype\./;

  var isForced = function isForced(feature, detection) {
    var value = data[normalize(feature)];
    return value == POLYFILL ? true : value == NATIVE ? false : typeof detection == 'function' ? fails(detection) : !!detection;
  };

  var normalize = isForced.normalize = function (string) {
    return String(string).replace(replacement, '.').toLowerCase();
  };

  var data = isForced.data = {};
  var NATIVE = isForced.NATIVE = 'N';
  var POLYFILL = isForced.POLYFILL = 'P';
  var isForced_1 = isForced;
  var path = {};

  var aFunction$1 = function aFunction$1(it) {
    if (typeof it != 'function') {
      throw TypeError(String(it) + ' is not a function');
    }

    return it;
  }; // optional / simple context binding


  var functionBindContext = function functionBindContext(fn, that, length) {
    aFunction$1(fn);
    if (that === undefined) return fn;

    switch (length) {
      case 0:
        return function () {
          return fn.call(that);
        };

      case 1:
        return function (a) {
          return fn.call(that, a);
        };

      case 2:
        return function (a, b) {
          return fn.call(that, a, b);
        };

      case 3:
        return function (a, b, c) {
          return fn.call(that, a, b, c);
        };
    }

    return function ()
    /* ...args */
    {
      return fn.apply(that, arguments);
    };
  };

  var anObject = function anObject(it) {
    if (!isObject(it)) {
      throw TypeError(String(it) + ' is not an object');
    }

    return it;
  }; // eslint-disable-next-line es/no-object-defineproperty -- safe


  var $defineProperty$1 = Object.defineProperty; // `Object.defineProperty` method
  // https://tc39.es/ecma262/#sec-object.defineproperty

  var f$4 = descriptors ? $defineProperty$1 : function defineProperty(O, P, Attributes) {
    anObject(O);
    P = toPrimitive(P, true);
    anObject(Attributes);
    if (ie8DomDefine) try {
      return $defineProperty$1(O, P, Attributes);
    } catch (error) {
      /* empty */
    }
    if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
    if ('value' in Attributes) O[P] = Attributes.value;
    return O;
  };
  var objectDefineProperty = {
    f: f$4
  };
  var createNonEnumerableProperty = descriptors ? function (object, key, value) {
    return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
  } : function (object, key, value) {
    object[key] = value;
    return object;
  };
  var getOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor.f;

  var wrapConstructor = function wrapConstructor(NativeConstructor) {
    var Wrapper = function Wrapper(a, b, c) {
      if (this instanceof NativeConstructor) {
        switch (arguments.length) {
          case 0:
            return new NativeConstructor();

          case 1:
            return new NativeConstructor(a);

          case 2:
            return new NativeConstructor(a, b);
        }

        return new NativeConstructor(a, b, c);
      }

      return NativeConstructor.apply(this, arguments);
    };

    Wrapper.prototype = NativeConstructor.prototype;
    return Wrapper;
  };
  /*
    options.target      - name of the target object
    options.global      - target is the global object
    options.stat        - export as static methods of target
    options.proto       - export as prototype methods of target
    options.real        - real prototype method for the `pure` version
    options.forced      - export even if the native feature is available
    options.bind        - bind methods to the target, required for the `pure` version
    options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
    options.unsafe      - use the simple assignment of property instead of delete + defineProperty
    options.sham        - add a flag to not completely full polyfills
    options.enumerable  - export as enumerable property
    options.noTargetGet - prevent calling a getter on target
  */


  var _export = function _export(options, source) {
    var TARGET = options.target;
    var GLOBAL = options.global;
    var STATIC = options.stat;
    var PROTO = options.proto;
    var nativeSource = GLOBAL ? global$1 : STATIC ? global$1[TARGET] : (global$1[TARGET] || {}).prototype;
    var target = GLOBAL ? path : path[TARGET] || (path[TARGET] = {});
    var targetPrototype = target.prototype;
    var FORCED, USE_NATIVE, VIRTUAL_PROTOTYPE;
    var key, sourceProperty, targetProperty, nativeProperty, resultProperty, descriptor;

    for (key in source) {
      FORCED = isForced_1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced); // contains in native

      USE_NATIVE = !FORCED && nativeSource && has$1(nativeSource, key);
      targetProperty = target[key];
      if (USE_NATIVE) if (options.noTargetGet) {
        descriptor = getOwnPropertyDescriptor$2(nativeSource, key);
        nativeProperty = descriptor && descriptor.value;
      } else nativeProperty = nativeSource[key]; // export native or implementation

      sourceProperty = USE_NATIVE && nativeProperty ? nativeProperty : source[key];
      if (USE_NATIVE && _typeof3(targetProperty) === _typeof3(sourceProperty)) continue; // bind timers to global for call from export context

      if (options.bind && USE_NATIVE) resultProperty = functionBindContext(sourceProperty, global$1); // wrap global constructors for prevent changs in this version
      else if (options.wrap && USE_NATIVE) resultProperty = wrapConstructor(sourceProperty); // make static versions for prototype methods
        else if (PROTO && typeof sourceProperty == 'function') resultProperty = functionBindContext(Function.call, sourceProperty); // default case
          else resultProperty = sourceProperty; // add a flag to not completely full polyfills

      if (options.sham || sourceProperty && sourceProperty.sham || targetProperty && targetProperty.sham) {
        createNonEnumerableProperty(resultProperty, 'sham', true);
      }

      target[key] = resultProperty;

      if (PROTO) {
        VIRTUAL_PROTOTYPE = TARGET + 'Prototype';

        if (!has$1(path, VIRTUAL_PROTOTYPE)) {
          createNonEnumerableProperty(path, VIRTUAL_PROTOTYPE, {});
        } // export virtual prototype methods


        path[VIRTUAL_PROTOTYPE][key] = sourceProperty; // export real prototype methods

        if (options.real && targetPrototype && !targetPrototype[key]) {
          createNonEnumerableProperty(targetPrototype, key, sourceProperty);
        }
      }
    }
  }; // `IsArray` abstract operation
  // https://tc39.es/ecma262/#sec-isarray
  // eslint-disable-next-line es/no-array-isarray -- safe


  var isArray$5 = Array.isArray || function isArray(arg) {
    return classofRaw(arg) == 'Array';
  };

  var ceil = Math.ceil;
  var floor = Math.floor; // `ToInteger` abstract operation
  // https://tc39.es/ecma262/#sec-tointeger

  var toInteger = function toInteger(argument) {
    return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
  };

  var min$1 = Math.min; // `ToLength` abstract operation
  // https://tc39.es/ecma262/#sec-tolength

  var toLength = function toLength(argument) {
    return argument > 0 ? min$1(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
  };

  var createProperty = function createProperty(object, key, value) {
    var propertyKey = toPrimitive(key);
    if (propertyKey in object) objectDefineProperty.f(object, propertyKey, createPropertyDescriptor(0, value));else object[propertyKey] = value;
  };

  var setGlobal = function setGlobal(key, value) {
    try {
      createNonEnumerableProperty(global$1, key, value);
    } catch (error) {
      global$1[key] = value;
    }

    return value;
  };

  var SHARED = '__core-js_shared__';
  var store$1 = global$1[SHARED] || setGlobal(SHARED, {});
  var sharedStore = store$1;
  var shared = createCommonjsModule(function (module) {
    (module.exports = function (key, value) {
      return sharedStore[key] || (sharedStore[key] = value !== undefined ? value : {});
    })('versions', []).push({
      version: '3.13.1',
      mode: 'pure',
      copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
    });
  });
  var id = 0;
  var postfix = Math.random();

  var uid = function uid(key) {
    return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
  };

  var aFunction = function aFunction(variable) {
    return typeof variable == 'function' ? variable : undefined;
  };

  var getBuiltIn = function getBuiltIn(namespace, method) {
    return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global$1[namespace]) : path[namespace] && path[namespace][method] || global$1[namespace] && global$1[namespace][method];
  };

  var engineUserAgent = getBuiltIn('navigator', 'userAgent') || '';
  var process$1 = global$1.process;
  var versions = process$1 && process$1.versions;
  var v8 = versions && versions.v8;
  var match, version;

  if (v8) {
    match = v8.split('.');
    version = match[0] < 4 ? 1 : match[0] + match[1];
  } else if (engineUserAgent) {
    match = engineUserAgent.match(/Edge\/(\d+)/);

    if (!match || match[1] >= 74) {
      match = engineUserAgent.match(/Chrome\/(\d+)/);
      if (match) version = match[1];
    }
  }

  var engineV8Version = version && +version;
  /* eslint-disable es/no-symbol -- required for testing */
  // eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing

  var nativeSymbol = !!Object.getOwnPropertySymbols && !fails(function () {
    var symbol = Symbol(); // Chrome 38 Symbol has incorrect toString conversion
    // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances

    return !String(symbol) || !(Object(symbol) instanceof Symbol) || // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && engineV8Version && engineV8Version < 41;
  });
  /* eslint-disable es/no-symbol -- required for testing */

  var useSymbolAsUid = nativeSymbol && !Symbol.sham && _typeof3(Symbol.iterator) == 'symbol';
  var WellKnownSymbolsStore$1 = shared('wks');
  var Symbol$1 = global$1.Symbol;
  var createWellKnownSymbol = useSymbolAsUid ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid;

  var wellKnownSymbol = function wellKnownSymbol(name) {
    if (!has$1(WellKnownSymbolsStore$1, name) || !(nativeSymbol || typeof WellKnownSymbolsStore$1[name] == 'string')) {
      if (nativeSymbol && has$1(Symbol$1, name)) {
        WellKnownSymbolsStore$1[name] = Symbol$1[name];
      } else {
        WellKnownSymbolsStore$1[name] = createWellKnownSymbol('Symbol.' + name);
      }
    }

    return WellKnownSymbolsStore$1[name];
  };

  var SPECIES$3 = wellKnownSymbol('species'); // `ArraySpeciesCreate` abstract operation
  // https://tc39.es/ecma262/#sec-arrayspeciescreate

  var arraySpeciesCreate = function arraySpeciesCreate(originalArray, length) {
    var C;

    if (isArray$5(originalArray)) {
      C = originalArray.constructor; // cross-realm fallback

      if (typeof C == 'function' && (C === Array || isArray$5(C.prototype))) C = undefined;else if (isObject(C)) {
        C = C[SPECIES$3];
        if (C === null) C = undefined;
      }
    }

    return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
  };

  var SPECIES$2 = wellKnownSymbol('species');

  var arrayMethodHasSpeciesSupport = function arrayMethodHasSpeciesSupport(METHOD_NAME) {
    // We can't use this feature detection in V8 since it causes
    // deoptimization and serious performance degradation
    // https://github.com/zloirock/core-js/issues/677
    return engineV8Version >= 51 || !fails(function () {
      var array = [];
      var constructor = array.constructor = {};

      constructor[SPECIES$2] = function () {
        return {
          foo: 1
        };
      };

      return array[METHOD_NAME](Boolean).foo !== 1;
    });
  };

  var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
  var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
  var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded'; // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/679

  var IS_CONCAT_SPREADABLE_SUPPORT = engineV8Version >= 51 || !fails(function () {
    var array = [];
    array[IS_CONCAT_SPREADABLE] = false;
    return array.concat()[0] !== array;
  });
  var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

  var isConcatSpreadable = function isConcatSpreadable(O) {
    if (!isObject(O)) return false;
    var spreadable = O[IS_CONCAT_SPREADABLE];
    return spreadable !== undefined ? !!spreadable : isArray$5(O);
  };

  var FORCED$2 = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT; // `Array.prototype.concat` method
  // https://tc39.es/ecma262/#sec-array.prototype.concat
  // with adding support of @@isConcatSpreadable and @@species

  _export({
    target: 'Array',
    proto: true,
    forced: FORCED$2
  }, {
    // eslint-disable-next-line no-unused-vars -- required for `.length`
    concat: function concat(arg) {
      var O = toObject(this);
      var A = arraySpeciesCreate(O, 0);
      var n = 0;
      var i, k, length, len, E;

      for (i = -1, length = arguments.length; i < length; i++) {
        E = i === -1 ? O : arguments[i];

        if (isConcatSpreadable(E)) {
          len = toLength(E.length);
          if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);

          for (k = 0; k < len; k++, n++) {
            if (k in E) createProperty(A, n, E[k]);
          }
        } else {
          if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
          createProperty(A, n++, E);
        }
      }

      A.length = n;
      return A;
    }
  });

  var entryVirtual = function entryVirtual(CONSTRUCTOR) {
    return path[CONSTRUCTOR + 'Prototype'];
  };

  var concat$2 = entryVirtual('Array').concat;
  var ArrayPrototype$b = Array.prototype;

  var concat_1 = function concat_1(it) {
    var own = it.concat;
    return it === ArrayPrototype$b || it instanceof Array && own === ArrayPrototype$b.concat ? concat$2 : own;
  };

  var concat$1 = concat_1;
  var concat = concat$1;
  var max$1 = Math.max;
  var min = Math.min; // Helper for a popular repeating case of the spec:
  // Let integer be ? ToInteger(index).
  // If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).

  var toAbsoluteIndex = function toAbsoluteIndex(index, length) {
    var integer = toInteger(index);
    return integer < 0 ? max$1(integer + length, 0) : min(integer, length);
  };

  var HAS_SPECIES_SUPPORT$2 = arrayMethodHasSpeciesSupport('slice');
  var SPECIES$1 = wellKnownSymbol('species');
  var nativeSlice = [].slice;
  var max = Math.max; // `Array.prototype.slice` method
  // https://tc39.es/ecma262/#sec-array.prototype.slice
  // fallback for not array-like ES3 strings and DOM objects

  _export({
    target: 'Array',
    proto: true,
    forced: !HAS_SPECIES_SUPPORT$2
  }, {
    slice: function slice(start, end) {
      var O = toIndexedObject(this);
      var length = toLength(O.length);
      var k = toAbsoluteIndex(start, length);
      var fin = toAbsoluteIndex(end === undefined ? length : end, length); // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible

      var Constructor, result, n;

      if (isArray$5(O)) {
        Constructor = O.constructor; // cross-realm fallback

        if (typeof Constructor == 'function' && (Constructor === Array || isArray$5(Constructor.prototype))) {
          Constructor = undefined;
        } else if (isObject(Constructor)) {
          Constructor = Constructor[SPECIES$1];
          if (Constructor === null) Constructor = undefined;
        }

        if (Constructor === Array || Constructor === undefined) {
          return nativeSlice.call(O, k, fin);
        }
      }

      result = new (Constructor === undefined ? Array : Constructor)(max(fin - k, 0));

      for (n = 0; k < fin; k++, n++) {
        if (k in O) createProperty(result, n, O[k]);
      }

      result.length = n;
      return result;
    }
  });

  var slice$4 = entryVirtual('Array').slice;
  var ArrayPrototype$a = Array.prototype;

  var slice_1 = function slice_1(it) {
    var own = it.slice;
    return it === ArrayPrototype$a || it instanceof Array && own === ArrayPrototype$a.slice ? slice$4 : own;
  };

  var slice$3 = slice_1;
  var slice$2 = slice$3;
  var push = [].push; // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterOut }` methods implementation

  var createMethod$4 = function createMethod$4(TYPE) {
    var IS_MAP = TYPE == 1;
    var IS_FILTER = TYPE == 2;
    var IS_SOME = TYPE == 3;
    var IS_EVERY = TYPE == 4;
    var IS_FIND_INDEX = TYPE == 6;
    var IS_FILTER_OUT = TYPE == 7;
    var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
    return function ($this, callbackfn, that, specificCreate) {
      var O = toObject($this);
      var self = indexedObject(O);
      var boundFunction = functionBindContext(callbackfn, that, 3);
      var length = toLength(self.length);
      var index = 0;
      var create = specificCreate || arraySpeciesCreate;
      var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_OUT ? create($this, 0) : undefined;
      var value, result;

      for (; length > index; index++) {
        if (NO_HOLES || index in self) {
          value = self[index];
          result = boundFunction(value, index, O);

          if (TYPE) {
            if (IS_MAP) target[index] = result; // map
            else if (result) switch (TYPE) {
                case 3:
                  return true;
                // some

                case 5:
                  return value;
                // find

                case 6:
                  return index;
                // findIndex

                case 2:
                  push.call(target, value);
                // filter
              } else switch (TYPE) {
                case 4:
                  return false;
                // every

                case 7:
                  push.call(target, value);
                // filterOut
              }
          }
        }
      }

      return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
    };
  };

  var arrayIteration = {
    // `Array.prototype.forEach` method
    // https://tc39.es/ecma262/#sec-array.prototype.foreach
    forEach: createMethod$4(0),
    // `Array.prototype.map` method
    // https://tc39.es/ecma262/#sec-array.prototype.map
    map: createMethod$4(1),
    // `Array.prototype.filter` method
    // https://tc39.es/ecma262/#sec-array.prototype.filter
    filter: createMethod$4(2),
    // `Array.prototype.some` method
    // https://tc39.es/ecma262/#sec-array.prototype.some
    some: createMethod$4(3),
    // `Array.prototype.every` method
    // https://tc39.es/ecma262/#sec-array.prototype.every
    every: createMethod$4(4),
    // `Array.prototype.find` method
    // https://tc39.es/ecma262/#sec-array.prototype.find
    find: createMethod$4(5),
    // `Array.prototype.findIndex` method
    // https://tc39.es/ecma262/#sec-array.prototype.findIndex
    findIndex: createMethod$4(6),
    // `Array.prototype.filterOut` method
    // https://github.com/tc39/proposal-array-filtering
    filterOut: createMethod$4(7)
  };
  var $map = arrayIteration.map;
  var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport('map'); // `Array.prototype.map` method
  // https://tc39.es/ecma262/#sec-array.prototype.map
  // with adding support of @@species

  _export({
    target: 'Array',
    proto: true,
    forced: !HAS_SPECIES_SUPPORT$1
  }, {
    map: function map(callbackfn
    /* , thisArg */
    ) {
      return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  var map$2 = entryVirtual('Array').map;
  var ArrayPrototype$9 = Array.prototype;

  var map_1 = function map_1(it) {
    var own = it.map;
    return it === ArrayPrototype$9 || it instanceof Array && own === ArrayPrototype$9.map ? map$2 : own;
  };

  var map$1 = map_1;
  var map = map$1;
  var $filter = arrayIteration.filter;
  var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('filter'); // `Array.prototype.filter` method
  // https://tc39.es/ecma262/#sec-array.prototype.filter
  // with adding support of @@species

  _export({
    target: 'Array',
    proto: true,
    forced: !HAS_SPECIES_SUPPORT
  }, {
    filter: function filter(callbackfn
    /* , thisArg */
    ) {
      return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  var filter$2 = entryVirtual('Array').filter;
  var ArrayPrototype$8 = Array.prototype;

  var filter_1 = function filter_1(it) {
    var own = it.filter;
    return it === ArrayPrototype$8 || it instanceof Array && own === ArrayPrototype$8.filter ? filter$2 : own;
  };

  var filter$1 = filter_1;
  var filter = filter$1; // `Array.prototype.{ indexOf, includes }` methods implementation

  var createMethod$3 = function createMethod$3(IS_INCLUDES) {
    return function ($this, el, fromIndex) {
      var O = toIndexedObject($this);
      var length = toLength(O.length);
      var index = toAbsoluteIndex(fromIndex, length);
      var value; // Array#includes uses SameValueZero equality algorithm
      // eslint-disable-next-line no-self-compare -- NaN check

      if (IS_INCLUDES && el != el) while (length > index) {
        value = O[index++]; // eslint-disable-next-line no-self-compare -- NaN check

        if (value != value) return true; // Array#indexOf ignores holes, Array#includes - not
      } else for (; length > index; index++) {
        if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
      }
      return !IS_INCLUDES && -1;
    };
  };

  var arrayIncludes = {
    // `Array.prototype.includes` method
    // https://tc39.es/ecma262/#sec-array.prototype.includes
    includes: createMethod$3(true),
    // `Array.prototype.indexOf` method
    // https://tc39.es/ecma262/#sec-array.prototype.indexof
    indexOf: createMethod$3(false)
  };
  var $includes = arrayIncludes.includes; // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes

  _export({
    target: 'Array',
    proto: true
  }, {
    includes: function includes(el
    /* , fromIndex = 0 */
    ) {
      return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  var includes$4 = entryVirtual('Array').includes;
  var MATCH$1 = wellKnownSymbol('match'); // `IsRegExp` abstract operation
  // https://tc39.es/ecma262/#sec-isregexp

  var isRegexp = function isRegexp(it) {
    var isRegExp;
    return isObject(it) && ((isRegExp = it[MATCH$1]) !== undefined ? !!isRegExp : classofRaw(it) == 'RegExp');
  };

  var notARegexp = function notARegexp(it) {
    if (isRegexp(it)) {
      throw TypeError("The method doesn't accept regular expressions");
    }

    return it;
  };

  var MATCH = wellKnownSymbol('match');

  var correctIsRegexpLogic = function correctIsRegexpLogic(METHOD_NAME) {
    var regexp = /./;

    try {
      '/./'[METHOD_NAME](regexp);
    } catch (error1) {
      try {
        regexp[MATCH] = false;
        return '/./'[METHOD_NAME](regexp);
      } catch (error2) {
        /* empty */
      }
    }

    return false;
  }; // `String.prototype.includes` method
  // https://tc39.es/ecma262/#sec-string.prototype.includes


  _export({
    target: 'String',
    proto: true,
    forced: !correctIsRegexpLogic('includes')
  }, {
    includes: function includes(searchString
    /* , position = 0 */
    ) {
      return !!~String(requireObjectCoercible(this)).indexOf(notARegexp(searchString), arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  var includes$3 = entryVirtual('String').includes;
  var ArrayPrototype$7 = Array.prototype;
  var StringPrototype = String.prototype;

  var includes$2 = function includes$2(it) {
    var own = it.includes;
    if (it === ArrayPrototype$7 || it instanceof Array && own === ArrayPrototype$7.includes) return includes$4;

    if (typeof it === 'string' || it === StringPrototype || it instanceof String && own === StringPrototype.includes) {
      return includes$3;
    }

    return own;
  };

  var includes$1 = includes$2;
  var includes = includes$1;

  var arrayMethodIsStrict = function arrayMethodIsStrict(METHOD_NAME, argument) {
    var method = [][METHOD_NAME];
    return !!method && fails(function () {
      // eslint-disable-next-line no-useless-call,no-throw-literal -- required for testing
      method.call(null, argument || function () {
        throw 1;
      }, 1);
    });
  };

  var test$1 = [];
  var nativeSort = test$1.sort; // IE8-

  var FAILS_ON_UNDEFINED = fails(function () {
    test$1.sort(undefined);
  }); // V8 bug

  var FAILS_ON_NULL = fails(function () {
    test$1.sort(null);
  }); // Old WebKit

  var STRICT_METHOD$3 = arrayMethodIsStrict('sort');
  var FORCED$1 = FAILS_ON_UNDEFINED || !FAILS_ON_NULL || !STRICT_METHOD$3; // `Array.prototype.sort` method
  // https://tc39.es/ecma262/#sec-array.prototype.sort

  _export({
    target: 'Array',
    proto: true,
    forced: FORCED$1
  }, {
    sort: function sort(comparefn) {
      return comparefn === undefined ? nativeSort.call(toObject(this)) : nativeSort.call(toObject(this), aFunction$1(comparefn));
    }
  });

  var sort$2 = entryVirtual('Array').sort;
  var ArrayPrototype$6 = Array.prototype;

  var sort_1 = function sort_1(it) {
    var own = it.sort;
    return it === ArrayPrototype$6 || it instanceof Array && own === ArrayPrototype$6.sort ? sort$2 : own;
  };

  var sort$1 = sort_1;
  var sort = sort$1; // `FlattenIntoArray` abstract operation
  // https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray

  var flattenIntoArray = function flattenIntoArray(target, original, source, sourceLen, start, depth, mapper, thisArg) {
    var targetIndex = start;
    var sourceIndex = 0;
    var mapFn = mapper ? functionBindContext(mapper, thisArg, 3) : false;
    var element;

    while (sourceIndex < sourceLen) {
      if (sourceIndex in source) {
        element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];

        if (depth > 0 && isArray$5(element)) {
          targetIndex = flattenIntoArray(target, original, element, toLength(element.length), targetIndex, depth - 1) - 1;
        } else {
          if (targetIndex >= 0x1FFFFFFFFFFFFF) throw TypeError('Exceed the acceptable array length');
          target[targetIndex] = element;
        }

        targetIndex++;
      }

      sourceIndex++;
    }

    return targetIndex;
  };

  var flattenIntoArray_1 = flattenIntoArray; // `Array.prototype.flatMap` method
  // https://tc39.es/ecma262/#sec-array.prototype.flatmap

  _export({
    target: 'Array',
    proto: true
  }, {
    flatMap: function flatMap(callbackfn
    /* , thisArg */
    ) {
      var O = toObject(this);
      var sourceLen = toLength(O.length);
      var A;
      aFunction$1(callbackfn);
      A = arraySpeciesCreate(O, 0);
      A.length = flattenIntoArray_1(A, O, O, sourceLen, 0, 1, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
      return A;
    }
  });

  var flatMap$2 = entryVirtual('Array').flatMap;
  var ArrayPrototype$5 = Array.prototype;

  var flatMap_1 = function flatMap_1(it) {
    var own = it.flatMap;
    return it === ArrayPrototype$5 || it instanceof Array && own === ArrayPrototype$5.flatMap ? flatMap$2 : own;
  };

  var flatMap$1 = flatMap_1;
  var flatMap = flatMap$1;
  var iterators = {};
  var functionToString = Function.toString; // this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper

  if (typeof sharedStore.inspectSource != 'function') {
    sharedStore.inspectSource = function (it) {
      return functionToString.call(it);
    };
  }

  var inspectSource = sharedStore.inspectSource;
  var WeakMap$1 = global$1.WeakMap;
  var nativeWeakMap = typeof WeakMap$1 === 'function' && /native code/.test(inspectSource(WeakMap$1));
  var keys$3 = shared('keys');

  var sharedKey = function sharedKey(key) {
    return keys$3[key] || (keys$3[key] = uid(key));
  };

  var hiddenKeys$1 = {};
  var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
  var WeakMap = global$1.WeakMap;
  var set$3, get, has;

  var enforce = function enforce(it) {
    return has(it) ? get(it) : set$3(it, {});
  };

  var getterFor = function getterFor(TYPE) {
    return function (it) {
      var state;

      if (!isObject(it) || (state = get(it)).type !== TYPE) {
        throw TypeError('Incompatible receiver, ' + TYPE + ' required');
      }

      return state;
    };
  };

  if (nativeWeakMap || sharedStore.state) {
    var store = sharedStore.state || (sharedStore.state = new WeakMap());
    var wmget = store.get;
    var wmhas = store.has;
    var wmset = store.set;

    set$3 = function set$3(it, metadata) {
      if (wmhas.call(store, it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
      metadata.facade = it;
      wmset.call(store, it, metadata);
      return metadata;
    };

    get = function get(it) {
      return wmget.call(store, it) || {};
    };

    has = function has(it) {
      return wmhas.call(store, it);
    };
  } else {
    var STATE = sharedKey('state');
    hiddenKeys$1[STATE] = true;

    set$3 = function set$3(it, metadata) {
      if (has$1(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
      metadata.facade = it;
      createNonEnumerableProperty(it, STATE, metadata);
      return metadata;
    };

    get = function get(it) {
      return has$1(it, STATE) ? it[STATE] : {};
    };

    has = function has(it) {
      return has$1(it, STATE);
    };
  }

  var internalState = {
    set: set$3,
    get: get,
    has: has,
    enforce: enforce,
    getterFor: getterFor
  };
  var correctPrototypeGetter = !fails(function () {
    function F() {
      /* empty */
    }

    F.prototype.constructor = null; // eslint-disable-next-line es/no-object-getprototypeof -- required for testing

    return Object.getPrototypeOf(new F()) !== F.prototype;
  });
  var IE_PROTO$1 = sharedKey('IE_PROTO');
  var ObjectPrototype$1 = Object.prototype; // `Object.getPrototypeOf` method
  // https://tc39.es/ecma262/#sec-object.getprototypeof
  // eslint-disable-next-line es/no-object-getprototypeof -- safe

  var objectGetPrototypeOf = correctPrototypeGetter ? Object.getPrototypeOf : function (O) {
    O = toObject(O);
    if (has$1(O, IE_PROTO$1)) return O[IE_PROTO$1];

    if (typeof O.constructor == 'function' && O instanceof O.constructor) {
      return O.constructor.prototype;
    }

    return O instanceof Object ? ObjectPrototype$1 : null;
  };
  var ITERATOR$4 = wellKnownSymbol('iterator');
  var BUGGY_SAFARI_ITERATORS$1 = false;

  var returnThis$2 = function returnThis$2() {
    return this;
  }; // `%IteratorPrototype%` object
  // https://tc39.es/ecma262/#sec-%iteratorprototype%-object


  var IteratorPrototype$2, PrototypeOfArrayIteratorPrototype, arrayIterator;
  /* eslint-disable es/no-array-prototype-keys -- safe */

  if ([].keys) {
    arrayIterator = [].keys(); // Safari 8 has buggy iterators w/o `next`

    if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS$1 = true;else {
      PrototypeOfArrayIteratorPrototype = objectGetPrototypeOf(objectGetPrototypeOf(arrayIterator));
      if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype$2 = PrototypeOfArrayIteratorPrototype;
    }
  }

  var NEW_ITERATOR_PROTOTYPE = IteratorPrototype$2 == undefined || fails(function () {
    var test = {}; // FF44- legacy iterators case

    return IteratorPrototype$2[ITERATOR$4].call(test) !== test;
  });
  if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype$2 = {}; // `%IteratorPrototype%[@@iterator]()` method
  // https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator

  if (NEW_ITERATOR_PROTOTYPE && !has$1(IteratorPrototype$2, ITERATOR$4)) {
    createNonEnumerableProperty(IteratorPrototype$2, ITERATOR$4, returnThis$2);
  }

  var iteratorsCore = {
    IteratorPrototype: IteratorPrototype$2,
    BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS$1
  };
  var indexOf = arrayIncludes.indexOf;

  var objectKeysInternal = function objectKeysInternal(object, names) {
    var O = toIndexedObject(object);
    var i = 0;
    var result = [];
    var key;

    for (key in O) {
      !has$1(hiddenKeys$1, key) && has$1(O, key) && result.push(key);
    } // Don't enum bug & hidden keys


    while (names.length > i) {
      if (has$1(O, key = names[i++])) {
        ~indexOf(result, key) || result.push(key);
      }
    }

    return result;
  }; // IE8- don't enum bug keys


  var enumBugKeys = ['constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'valueOf']; // `Object.keys` method
  // https://tc39.es/ecma262/#sec-object.keys
  // eslint-disable-next-line es/no-object-keys -- safe

  var objectKeys = Object.keys || function keys(O) {
    return objectKeysInternal(O, enumBugKeys);
  }; // `Object.defineProperties` method
  // https://tc39.es/ecma262/#sec-object.defineproperties
  // eslint-disable-next-line es/no-object-defineproperties -- safe


  var objectDefineProperties = descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
    anObject(O);
    var keys = objectKeys(Properties);
    var length = keys.length;
    var index = 0;
    var key;

    while (length > index) {
      objectDefineProperty.f(O, key = keys[index++], Properties[key]);
    }

    return O;
  };
  var html = getBuiltIn('document', 'documentElement');
  var GT = '>';
  var LT = '<';
  var PROTOTYPE$1 = 'prototype';
  var SCRIPT = 'script';
  var IE_PROTO = sharedKey('IE_PROTO');

  var EmptyConstructor = function EmptyConstructor() {
    /* empty */
  };

  var scriptTag = function scriptTag(content) {
    return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
  }; // Create object with fake `null` prototype: use ActiveX Object with cleared prototype


  var NullProtoObjectViaActiveX = function NullProtoObjectViaActiveX(activeXDocument) {
    activeXDocument.write(scriptTag(''));
    activeXDocument.close();
    var temp = activeXDocument.parentWindow.Object;
    activeXDocument = null; // avoid memory leak

    return temp;
  }; // Create object with fake `null` prototype: use iframe Object with cleared prototype


  var NullProtoObjectViaIFrame = function NullProtoObjectViaIFrame() {
    // Thrash, waste and sodomy: IE GC bug
    var iframe = documentCreateElement('iframe');
    var JS = 'java' + SCRIPT + ':';
    var iframeDocument;
    iframe.style.display = 'none';
    html.appendChild(iframe); // https://github.com/zloirock/core-js/issues/475

    iframe.src = String(JS);
    iframeDocument = iframe.contentWindow.document;
    iframeDocument.open();
    iframeDocument.write(scriptTag('document.F=Object'));
    iframeDocument.close();
    return iframeDocument.F;
  }; // Check for document.domain and active x support
  // No need to use active x approach when document.domain is not set
  // see https://github.com/es-shims/es5-shim/issues/150
  // variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
  // avoid IE GC bug


  var activeXDocument;

  var _NullProtoObject = function NullProtoObject() {
    try {
      /* global ActiveXObject -- old IE */
      activeXDocument = document.domain && new ActiveXObject('htmlfile');
    } catch (error) {
      /* ignore */
    }

    _NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
    var length = enumBugKeys.length;

    while (length--) {
      delete _NullProtoObject[PROTOTYPE$1][enumBugKeys[length]];
    }

    return _NullProtoObject();
  };

  hiddenKeys$1[IE_PROTO] = true; // `Object.create` method
  // https://tc39.es/ecma262/#sec-object.create

  var objectCreate = Object.create || function create(O, Properties) {
    var result;

    if (O !== null) {
      EmptyConstructor[PROTOTYPE$1] = anObject(O);
      result = new EmptyConstructor();
      EmptyConstructor[PROTOTYPE$1] = null; // add "__proto__" for Object.getPrototypeOf polyfill

      result[IE_PROTO] = O;
    } else result = _NullProtoObject();

    return Properties === undefined ? result : objectDefineProperties(result, Properties);
  };

  var TO_STRING_TAG$3 = wellKnownSymbol('toStringTag');
  var test = {};
  test[TO_STRING_TAG$3] = 'z';
  var toStringTagSupport = String(test) === '[object z]';
  var TO_STRING_TAG$2 = wellKnownSymbol('toStringTag'); // ES3 wrong here

  var CORRECT_ARGUMENTS = classofRaw(function () {
    return arguments;
  }()) == 'Arguments'; // fallback for IE11 Script Access Denied error

  var tryGet = function tryGet(it, key) {
    try {
      return it[key];
    } catch (error) {
      /* empty */
    }
  }; // getting tag from ES6+ `Object.prototype.toString`


  var classof = toStringTagSupport ? classofRaw : function (it) {
    var O, tag, result;
    return it === undefined ? 'Undefined' : it === null ? 'Null' // @@toStringTag case
    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG$2)) == 'string' ? tag // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O) // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
  }; // `Object.prototype.toString` method implementation
  // https://tc39.es/ecma262/#sec-object.prototype.tostring

  var objectToString = toStringTagSupport ? {}.toString : function toString() {
    return '[object ' + classof(this) + ']';
  };
  var defineProperty$8 = objectDefineProperty.f;
  var TO_STRING_TAG$1 = wellKnownSymbol('toStringTag');

  var setToStringTag = function setToStringTag(it, TAG, STATIC, SET_METHOD) {
    if (it) {
      var target = STATIC ? it : it.prototype;

      if (!has$1(target, TO_STRING_TAG$1)) {
        defineProperty$8(target, TO_STRING_TAG$1, {
          configurable: true,
          value: TAG
        });
      }

      if (SET_METHOD && !toStringTagSupport) {
        createNonEnumerableProperty(target, 'toString', objectToString);
      }
    }
  };

  var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;

  var returnThis$1 = function returnThis$1() {
    return this;
  };

  var createIteratorConstructor = function createIteratorConstructor(IteratorConstructor, NAME, next) {
    var TO_STRING_TAG = NAME + ' Iterator';
    IteratorConstructor.prototype = objectCreate(IteratorPrototype$1, {
      next: createPropertyDescriptor(1, next)
    });
    setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
    iterators[TO_STRING_TAG] = returnThis$1;
    return IteratorConstructor;
  };

  var aPossiblePrototype = function aPossiblePrototype(it) {
    if (!isObject(it) && it !== null) {
      throw TypeError("Can't set " + String(it) + ' as a prototype');
    }

    return it;
  };
  /* eslint-disable no-proto -- safe */
  // `Object.setPrototypeOf` method
  // https://tc39.es/ecma262/#sec-object.setprototypeof
  // Works with __proto__ only. Old v8 can't work with null proto objects.
  // eslint-disable-next-line es/no-object-setprototypeof -- safe


  Object.setPrototypeOf || ('__proto__' in {} ? function () {
    var CORRECT_SETTER = false;
    var test = {};
    var setter;

    try {
      // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
      setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
      setter.call(test, []);
      CORRECT_SETTER = test instanceof Array;
    } catch (error) {
      /* empty */
    }

    return function setPrototypeOf(O, proto) {
      anObject(O);
      aPossiblePrototype(proto);
      if (CORRECT_SETTER) setter.call(O, proto);else O.__proto__ = proto;
      return O;
    };
  }() : undefined);

  var redefine = function redefine(target, key, value, options) {
    if (options && options.enumerable) target[key] = value;else createNonEnumerableProperty(target, key, value);
  };

  var IteratorPrototype = iteratorsCore.IteratorPrototype;
  var BUGGY_SAFARI_ITERATORS = iteratorsCore.BUGGY_SAFARI_ITERATORS;
  var ITERATOR$3 = wellKnownSymbol('iterator');
  var KEYS = 'keys';
  var VALUES = 'values';
  var ENTRIES = 'entries';

  var returnThis = function returnThis() {
    return this;
  };

  var defineIterator = function defineIterator(Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
    createIteratorConstructor(IteratorConstructor, NAME, next);

    var getIterationMethod = function getIterationMethod(KIND) {
      if (KIND === DEFAULT && defaultIterator) return defaultIterator;
      if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];

      switch (KIND) {
        case KEYS:
          return function keys() {
            return new IteratorConstructor(this, KIND);
          };

        case VALUES:
          return function values() {
            return new IteratorConstructor(this, KIND);
          };

        case ENTRIES:
          return function entries() {
            return new IteratorConstructor(this, KIND);
          };
      }

      return function () {
        return new IteratorConstructor(this);
      };
    };

    var TO_STRING_TAG = NAME + ' Iterator';
    var INCORRECT_VALUES_NAME = false;
    var IterablePrototype = Iterable.prototype;
    var nativeIterator = IterablePrototype[ITERATOR$3] || IterablePrototype['@@iterator'] || DEFAULT && IterablePrototype[DEFAULT];
    var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
    var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
    var CurrentIteratorPrototype, methods, KEY; // fix native

    if (anyNativeIterator) {
      CurrentIteratorPrototype = objectGetPrototypeOf(anyNativeIterator.call(new Iterable()));

      if (IteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
        // Set @@toStringTag to native iterators
        setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
        iterators[TO_STRING_TAG] = returnThis;
      }
    } // fix Array.prototype.{ values, @@iterator }.name in V8 / FF


    if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
      INCORRECT_VALUES_NAME = true;

      defaultIterator = function values() {
        return nativeIterator.call(this);
      };
    } // define iterator


    if (FORCED && IterablePrototype[ITERATOR$3] !== defaultIterator) {
      createNonEnumerableProperty(IterablePrototype, ITERATOR$3, defaultIterator);
    }

    iterators[NAME] = defaultIterator; // export additional methods

    if (DEFAULT) {
      methods = {
        values: getIterationMethod(VALUES),
        keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
        entries: getIterationMethod(ENTRIES)
      };
      if (FORCED) for (KEY in methods) {
        if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
          redefine(IterablePrototype, KEY, methods[KEY]);
        }
      } else _export({
        target: NAME,
        proto: true,
        forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME
      }, methods);
    }

    return methods;
  };

  var ARRAY_ITERATOR = 'Array Iterator';
  var setInternalState$4 = internalState.set;
  var getInternalState$2 = internalState.getterFor(ARRAY_ITERATOR); // `Array.prototype.entries` method
  // https://tc39.es/ecma262/#sec-array.prototype.entries
  // `Array.prototype.keys` method
  // https://tc39.es/ecma262/#sec-array.prototype.keys
  // `Array.prototype.values` method
  // https://tc39.es/ecma262/#sec-array.prototype.values
  // `Array.prototype[@@iterator]` method
  // https://tc39.es/ecma262/#sec-array.prototype-@@iterator
  // `CreateArrayIterator` internal method
  // https://tc39.es/ecma262/#sec-createarrayiterator

  defineIterator(Array, 'Array', function (iterated, kind) {
    setInternalState$4(this, {
      type: ARRAY_ITERATOR,
      target: toIndexedObject(iterated),
      // target
      index: 0,
      // next index
      kind: kind // kind

    }); // `%ArrayIteratorPrototype%.next` method
    // https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
  }, function () {
    var state = getInternalState$2(this);
    var target = state.target;
    var kind = state.kind;
    var index = state.index++;

    if (!target || index >= target.length) {
      state.target = undefined;
      return {
        value: undefined,
        done: true
      };
    }

    if (kind == 'keys') return {
      value: index,
      done: false
    };
    if (kind == 'values') return {
      value: target[index],
      done: false
    };
    return {
      value: [index, target[index]],
      done: false
    };
  }, 'values'); // argumentsList[@@iterator] is %ArrayProto_values%
  // https://tc39.es/ecma262/#sec-createunmappedargumentsobject
  // https://tc39.es/ecma262/#sec-createmappedargumentsobject

  iterators.Arguments = iterators.Array; // iterable DOM collections
  // flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods

  var domIterables = {
    CSSRuleList: 0,
    CSSStyleDeclaration: 0,
    CSSValueList: 0,
    ClientRectList: 0,
    DOMRectList: 0,
    DOMStringList: 0,
    DOMTokenList: 1,
    DataTransferItemList: 0,
    FileList: 0,
    HTMLAllCollection: 0,
    HTMLCollection: 0,
    HTMLFormElement: 0,
    HTMLSelectElement: 0,
    MediaList: 0,
    MimeTypeArray: 0,
    NamedNodeMap: 0,
    NodeList: 1,
    PaintRequestList: 0,
    Plugin: 0,
    PluginArray: 0,
    SVGLengthList: 0,
    SVGNumberList: 0,
    SVGPathSegList: 0,
    SVGPointList: 0,
    SVGStringList: 0,
    SVGTransformList: 0,
    SourceBufferList: 0,
    StyleSheetList: 0,
    TextTrackCueList: 0,
    TextTrackList: 0,
    TouchList: 0
  };
  var TO_STRING_TAG = wellKnownSymbol('toStringTag');

  for (var COLLECTION_NAME in domIterables) {
    var Collection = global$1[COLLECTION_NAME];
    var CollectionPrototype = Collection && Collection.prototype;

    if (CollectionPrototype && classof(CollectionPrototype) !== TO_STRING_TAG) {
      createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
    }

    iterators[COLLECTION_NAME] = iterators.Array;
  }

  entryVirtual('Array').values;
  entryVirtual('Array').keys; // `Array.prototype.{ reduce, reduceRight }` methods implementation

  var createMethod$2 = function createMethod$2(IS_RIGHT) {
    return function (that, callbackfn, argumentsLength, memo) {
      aFunction$1(callbackfn);
      var O = toObject(that);
      var self = indexedObject(O);
      var length = toLength(O.length);
      var index = IS_RIGHT ? length - 1 : 0;
      var i = IS_RIGHT ? -1 : 1;
      if (argumentsLength < 2) while (true) {
        if (index in self) {
          memo = self[index];
          index += i;
          break;
        }

        index += i;

        if (IS_RIGHT ? index < 0 : length <= index) {
          throw TypeError('Reduce of empty array with no initial value');
        }
      }

      for (; IS_RIGHT ? index >= 0 : length > index; index += i) {
        if (index in self) {
          memo = callbackfn(memo, self[index], index, O);
        }
      }

      return memo;
    };
  };

  var arrayReduce = {
    // `Array.prototype.reduce` method
    // https://tc39.es/ecma262/#sec-array.prototype.reduce
    left: createMethod$2(false),
    // `Array.prototype.reduceRight` method
    // https://tc39.es/ecma262/#sec-array.prototype.reduceright
    right: createMethod$2(true)
  };
  var engineIsNode = classofRaw(global$1.process) == 'process';
  var $reduce = arrayReduce.left;
  var STRICT_METHOD$2 = arrayMethodIsStrict('reduce'); // Chrome 80-82 has a critical bug
  // https://bugs.chromium.org/p/chromium/issues/detail?id=1049982

  var CHROME_BUG = !engineIsNode && engineV8Version > 79 && engineV8Version < 83; // `Array.prototype.reduce` method
  // https://tc39.es/ecma262/#sec-array.prototype.reduce

  _export({
    target: 'Array',
    proto: true,
    forced: !STRICT_METHOD$2 || CHROME_BUG
  }, {
    reduce: function reduce(callbackfn
    /* , initialValue */
    ) {
      return $reduce(this, callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  var reduce$2 = entryVirtual('Array').reduce;
  var ArrayPrototype$4 = Array.prototype;

  var reduce_1 = function reduce_1(it) {
    var own = it.reduce;
    return it === ArrayPrototype$4 || it instanceof Array && own === ArrayPrototype$4.reduce ? reduce$2 : own;
  };

  var reduce$1 = reduce_1;
  var reduce = reduce$1;
  entryVirtual('Array').entries;
  var $every = arrayIteration.every;
  var STRICT_METHOD$1 = arrayMethodIsStrict('every'); // `Array.prototype.every` method
  // https://tc39.es/ecma262/#sec-array.prototype.every

  _export({
    target: 'Array',
    proto: true,
    forced: !STRICT_METHOD$1
  }, {
    every: function every(callbackfn
    /* , thisArg */
    ) {
      return $every(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  var every$2 = entryVirtual('Array').every;
  var ArrayPrototype$3 = Array.prototype;

  var every_1 = function every_1(it) {
    var own = it.every;
    return it === ArrayPrototype$3 || it instanceof Array && own === ArrayPrototype$3.every ? every$2 : own;
  };

  var every$1 = every_1;
  var every = every$1;
  var $find = arrayIteration.find;
  var FIND = 'find';
  var SKIPS_HOLES = true; // Shouldn't skip holes

  if (FIND in []) Array(1)[FIND](function () {
    SKIPS_HOLES = false;
  }); // `Array.prototype.find` method
  // https://tc39.es/ecma262/#sec-array.prototype.find

  _export({
    target: 'Array',
    proto: true,
    forced: SKIPS_HOLES
  }, {
    find: function find(callbackfn
    /* , that = undefined */
    ) {
      return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  var find$2 = entryVirtual('Array').find;
  var ArrayPrototype$2 = Array.prototype;

  var find_1 = function find_1(it) {
    var own = it.find;
    return it === ArrayPrototype$2 || it instanceof Array && own === ArrayPrototype$2.find ? find$2 : own;
  };

  var find$1 = find_1;
  var find = find$1; // `Object.defineProperty` method
  // https://tc39.es/ecma262/#sec-object.defineproperty

  _export({
    target: 'Object',
    stat: true,
    forced: !descriptors,
    sham: !descriptors
  }, {
    defineProperty: objectDefineProperty.f
  });

  var defineProperty_1 = createCommonjsModule(function (module) {
    var Object = path.Object;

    var defineProperty = module.exports = function defineProperty(it, key, desc) {
      return Object.defineProperty(it, key, desc);
    };

    if (Object.defineProperty.sham) defineProperty.sham = true;
  });
  var defineProperty$7 = defineProperty_1;
  var defineProperty$6 = defineProperty$7;
  var FAILS_ON_PRIMITIVES$1 = fails(function () {
    objectKeys(1);
  }); // `Object.keys` method
  // https://tc39.es/ecma262/#sec-object.keys

  _export({
    target: 'Object',
    stat: true,
    forced: FAILS_ON_PRIMITIVES$1
  }, {
    keys: function keys(it) {
      return objectKeys(toObject(it));
    }
  });

  var keys$2 = path.Object.keys;
  var keys$1 = keys$2;
  var keys = keys$1;
  var hiddenKeys = enumBugKeys.concat('length', 'prototype'); // `Object.getOwnPropertyNames` method
  // https://tc39.es/ecma262/#sec-object.getownpropertynames
  // eslint-disable-next-line es/no-object-getownpropertynames -- safe

  var f$3 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
    return objectKeysInternal(O, hiddenKeys);
  };

  var objectGetOwnPropertyNames = {
    f: f$3
  };
  /* eslint-disable es/no-object-getownpropertynames -- safe */

  var $getOwnPropertyNames$1 = objectGetOwnPropertyNames.f;
  var toString = {}.toString;
  var windowNames = (typeof window === "undefined" ? "undefined" : _typeof3(window)) == 'object' && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];

  var getWindowNames = function getWindowNames(it) {
    try {
      return $getOwnPropertyNames$1(it);
    } catch (error) {
      return windowNames.slice();
    }
  }; // fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window


  var f$2 = function getOwnPropertyNames(it) {
    return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : $getOwnPropertyNames$1(toIndexedObject(it));
  };

  var objectGetOwnPropertyNamesExternal = {
    f: f$2
  }; // eslint-disable-next-line es/no-object-getownpropertysymbols -- safe

  var f$1 = Object.getOwnPropertySymbols;
  var objectGetOwnPropertySymbols = {
    f: f$1
  };
  var f = wellKnownSymbol;
  var wellKnownSymbolWrapped = {
    f: f
  };
  var defineProperty$5 = objectDefineProperty.f;

  var defineWellKnownSymbol = function defineWellKnownSymbol(NAME) {
    var _Symbol = path.Symbol || (path.Symbol = {});

    if (!has$1(_Symbol, NAME)) defineProperty$5(_Symbol, NAME, {
      value: wellKnownSymbolWrapped.f(NAME)
    });
  };

  var $forEach$1 = arrayIteration.forEach;
  var HIDDEN = sharedKey('hidden');
  var SYMBOL = 'Symbol';
  var PROTOTYPE = 'prototype';
  var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');
  var setInternalState$3 = internalState.set;
  var getInternalState$1 = internalState.getterFor(SYMBOL);
  var ObjectPrototype = Object[PROTOTYPE];
  var $Symbol = global$1.Symbol;
  var $stringify = getBuiltIn('JSON', 'stringify');
  var nativeGetOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
  var nativeDefineProperty = objectDefineProperty.f;
  var nativeGetOwnPropertyNames = objectGetOwnPropertyNamesExternal.f;
  var nativePropertyIsEnumerable = objectPropertyIsEnumerable.f;
  var AllSymbols = shared('symbols');
  var ObjectPrototypeSymbols = shared('op-symbols');
  var StringToSymbolRegistry = shared('string-to-symbol-registry');
  var SymbolToStringRegistry = shared('symbol-to-string-registry');
  var WellKnownSymbolsStore = shared('wks');
  var QObject = global$1.QObject; // Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173

  var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild; // fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687

  var setSymbolDescriptor = descriptors && fails(function () {
    return objectCreate(nativeDefineProperty({}, 'a', {
      get: function get() {
        return nativeDefineProperty(this, 'a', {
          value: 7
        }).a;
      }
    })).a != 7;
  }) ? function (O, P, Attributes) {
    var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor$1(ObjectPrototype, P);
    if (ObjectPrototypeDescriptor) delete ObjectPrototype[P];
    nativeDefineProperty(O, P, Attributes);

    if (ObjectPrototypeDescriptor && O !== ObjectPrototype) {
      nativeDefineProperty(ObjectPrototype, P, ObjectPrototypeDescriptor);
    }
  } : nativeDefineProperty;

  var wrap = function wrap(tag, description) {
    var symbol = AllSymbols[tag] = objectCreate($Symbol[PROTOTYPE]);
    setInternalState$3(symbol, {
      type: SYMBOL,
      tag: tag,
      description: description
    });
    if (!descriptors) symbol.description = description;
    return symbol;
  };

  var isSymbol = useSymbolAsUid ? function (it) {
    return _typeof3(it) == 'symbol';
  } : function (it) {
    return Object(it) instanceof $Symbol;
  };

  var $defineProperty = function defineProperty(O, P, Attributes) {
    if (O === ObjectPrototype) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
    anObject(O);
    var key = toPrimitive(P, true);
    anObject(Attributes);

    if (has$1(AllSymbols, key)) {
      if (!Attributes.enumerable) {
        if (!has$1(O, HIDDEN)) nativeDefineProperty(O, HIDDEN, createPropertyDescriptor(1, {}));
        O[HIDDEN][key] = true;
      } else {
        if (has$1(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
        Attributes = objectCreate(Attributes, {
          enumerable: createPropertyDescriptor(0, false)
        });
      }

      return setSymbolDescriptor(O, key, Attributes);
    }

    return nativeDefineProperty(O, key, Attributes);
  };

  var $defineProperties = function defineProperties(O, Properties) {
    anObject(O);
    var properties = toIndexedObject(Properties);
    var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
    $forEach$1(keys, function (key) {
      if (!descriptors || $propertyIsEnumerable.call(properties, key)) $defineProperty(O, key, properties[key]);
    });
    return O;
  };

  var $create = function create(O, Properties) {
    return Properties === undefined ? objectCreate(O) : $defineProperties(objectCreate(O), Properties);
  };

  var $propertyIsEnumerable = function propertyIsEnumerable(V) {
    var P = toPrimitive(V, true);
    var enumerable = nativePropertyIsEnumerable.call(this, P);
    if (this === ObjectPrototype && has$1(AllSymbols, P) && !has$1(ObjectPrototypeSymbols, P)) return false;
    return enumerable || !has$1(this, P) || !has$1(AllSymbols, P) || has$1(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
  };

  var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
    var it = toIndexedObject(O);
    var key = toPrimitive(P, true);
    if (it === ObjectPrototype && has$1(AllSymbols, key) && !has$1(ObjectPrototypeSymbols, key)) return;
    var descriptor = nativeGetOwnPropertyDescriptor$1(it, key);

    if (descriptor && has$1(AllSymbols, key) && !(has$1(it, HIDDEN) && it[HIDDEN][key])) {
      descriptor.enumerable = true;
    }

    return descriptor;
  };

  var $getOwnPropertyNames = function getOwnPropertyNames(O) {
    var names = nativeGetOwnPropertyNames(toIndexedObject(O));
    var result = [];
    $forEach$1(names, function (key) {
      if (!has$1(AllSymbols, key) && !has$1(hiddenKeys$1, key)) result.push(key);
    });
    return result;
  };

  var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
    var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
    var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
    var result = [];
    $forEach$1(names, function (key) {
      if (has$1(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || has$1(ObjectPrototype, key))) {
        result.push(AllSymbols[key]);
      }
    });
    return result;
  }; // `Symbol` constructor
  // https://tc39.es/ecma262/#sec-symbol-constructor


  if (!nativeSymbol) {
    $Symbol = function _Symbol2() {
      if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor');
      var description = !arguments.length || arguments[0] === undefined ? undefined : String(arguments[0]);
      var tag = uid(description);

      var setter = function setter(value) {
        if (this === ObjectPrototype) setter.call(ObjectPrototypeSymbols, value);
        if (has$1(this, HIDDEN) && has$1(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
        setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
      };

      if (descriptors && USE_SETTER) setSymbolDescriptor(ObjectPrototype, tag, {
        configurable: true,
        set: setter
      });
      return wrap(tag, description);
    };

    redefine($Symbol[PROTOTYPE], 'toString', function toString() {
      return getInternalState$1(this).tag;
    });
    redefine($Symbol, 'withoutSetter', function (description) {
      return wrap(uid(description), description);
    });
    objectPropertyIsEnumerable.f = $propertyIsEnumerable;
    objectDefineProperty.f = $defineProperty;
    objectGetOwnPropertyDescriptor.f = $getOwnPropertyDescriptor;
    objectGetOwnPropertyNames.f = objectGetOwnPropertyNamesExternal.f = $getOwnPropertyNames;
    objectGetOwnPropertySymbols.f = $getOwnPropertySymbols;

    wellKnownSymbolWrapped.f = function (name) {
      return wrap(wellKnownSymbol(name), name);
    };

    if (descriptors) {
      // https://github.com/tc39/proposal-Symbol-description
      nativeDefineProperty($Symbol[PROTOTYPE], 'description', {
        configurable: true,
        get: function description() {
          return getInternalState$1(this).description;
        }
      });
    }
  }

  _export({
    global: true,
    wrap: true,
    forced: !nativeSymbol,
    sham: !nativeSymbol
  }, {
    Symbol: $Symbol
  });

  $forEach$1(objectKeys(WellKnownSymbolsStore), function (name) {
    defineWellKnownSymbol(name);
  });

  _export({
    target: SYMBOL,
    stat: true,
    forced: !nativeSymbol
  }, {
    // `Symbol.for` method
    // https://tc39.es/ecma262/#sec-symbol.for
    'for': function _for(key) {
      var string = String(key);
      if (has$1(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
      var symbol = $Symbol(string);
      StringToSymbolRegistry[string] = symbol;
      SymbolToStringRegistry[symbol] = string;
      return symbol;
    },
    // `Symbol.keyFor` method
    // https://tc39.es/ecma262/#sec-symbol.keyfor
    keyFor: function keyFor(sym) {
      if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol');
      if (has$1(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
    },
    useSetter: function useSetter() {
      USE_SETTER = true;
    },
    useSimple: function useSimple() {
      USE_SETTER = false;
    }
  });

  _export({
    target: 'Object',
    stat: true,
    forced: !nativeSymbol,
    sham: !descriptors
  }, {
    // `Object.create` method
    // https://tc39.es/ecma262/#sec-object.create
    create: $create,
    // `Object.defineProperty` method
    // https://tc39.es/ecma262/#sec-object.defineproperty
    defineProperty: $defineProperty,
    // `Object.defineProperties` method
    // https://tc39.es/ecma262/#sec-object.defineproperties
    defineProperties: $defineProperties,
    // `Object.getOwnPropertyDescriptor` method
    // https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
    getOwnPropertyDescriptor: $getOwnPropertyDescriptor
  });

  _export({
    target: 'Object',
    stat: true,
    forced: !nativeSymbol
  }, {
    // `Object.getOwnPropertyNames` method
    // https://tc39.es/ecma262/#sec-object.getownpropertynames
    getOwnPropertyNames: $getOwnPropertyNames,
    // `Object.getOwnPropertySymbols` method
    // https://tc39.es/ecma262/#sec-object.getownpropertysymbols
    getOwnPropertySymbols: $getOwnPropertySymbols
  }); // Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
  // https://bugs.chromium.org/p/v8/issues/detail?id=3443


  _export({
    target: 'Object',
    stat: true,
    forced: fails(function () {
      objectGetOwnPropertySymbols.f(1);
    })
  }, {
    getOwnPropertySymbols: function getOwnPropertySymbols(it) {
      return objectGetOwnPropertySymbols.f(toObject(it));
    }
  }); // `JSON.stringify` method behavior with symbols
  // https://tc39.es/ecma262/#sec-json.stringify


  if ($stringify) {
    var FORCED_JSON_STRINGIFY = !nativeSymbol || fails(function () {
      var symbol = $Symbol(); // MS Edge converts symbol values to JSON as {}

      return $stringify([symbol]) != '[null]' // WebKit converts symbol values to JSON as null
      || $stringify({
        a: symbol
      }) != '{}' // V8 throws on boxed symbols
      || $stringify(Object(symbol)) != '{}';
    });

    _export({
      target: 'JSON',
      stat: true,
      forced: FORCED_JSON_STRINGIFY
    }, {
      // eslint-disable-next-line no-unused-vars -- required for `.length`
      stringify: function stringify(it, replacer, space) {
        var args = [it];
        var index = 1;
        var $replacer;

        while (arguments.length > index) {
          args.push(arguments[index++]);
        }

        $replacer = replacer;
        if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined

        if (!isArray$5(replacer)) replacer = function replacer(key, value) {
          if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
          if (!isSymbol(value)) return value;
        };
        args[1] = replacer;
        return $stringify.apply(null, args);
      }
    });
  } // `Symbol.prototype[@@toPrimitive]` method
  // https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive


  if (!$Symbol[PROTOTYPE][TO_PRIMITIVE]) {
    createNonEnumerableProperty($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
  } // `Symbol.prototype[@@toStringTag]` property
  // https://tc39.es/ecma262/#sec-symbol.prototype-@@tostringtag


  setToStringTag($Symbol, SYMBOL);
  hiddenKeys$1[HIDDEN] = true;
  var getOwnPropertySymbols$2 = path.Object.getOwnPropertySymbols;
  var getOwnPropertySymbols$1 = getOwnPropertySymbols$2;
  var getOwnPropertySymbols = getOwnPropertySymbols$1;
  var nativeGetOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
  var FAILS_ON_PRIMITIVES = fails(function () {
    nativeGetOwnPropertyDescriptor(1);
  });
  var FORCED = !descriptors || FAILS_ON_PRIMITIVES; // `Object.getOwnPropertyDescriptor` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptor

  _export({
    target: 'Object',
    stat: true,
    forced: FORCED,
    sham: !descriptors
  }, {
    getOwnPropertyDescriptor: function getOwnPropertyDescriptor(it, key) {
      return nativeGetOwnPropertyDescriptor(toIndexedObject(it), key);
    }
  });

  var getOwnPropertyDescriptor_1 = createCommonjsModule(function (module) {
    var Object = path.Object;

    var getOwnPropertyDescriptor = module.exports = function getOwnPropertyDescriptor(it, key) {
      return Object.getOwnPropertyDescriptor(it, key);
    };

    if (Object.getOwnPropertyDescriptor.sham) getOwnPropertyDescriptor.sham = true;
  });
  var getOwnPropertyDescriptor$1 = getOwnPropertyDescriptor_1;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptor$1;
  var $forEach = arrayIteration.forEach;
  var STRICT_METHOD = arrayMethodIsStrict('forEach'); // `Array.prototype.forEach` method implementation
  // https://tc39.es/ecma262/#sec-array.prototype.foreach

  var arrayForEach = !STRICT_METHOD ? function forEach(callbackfn
  /* , thisArg */
  ) {
    return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined); // eslint-disable-next-line es/no-array-prototype-foreach -- safe
  } : [].forEach; // `Array.prototype.forEach` method
  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  // eslint-disable-next-line es/no-array-prototype-foreach -- safe

  _export({
    target: 'Array',
    proto: true,
    forced: [].forEach != arrayForEach
  }, {
    forEach: arrayForEach
  });

  var forEach$3 = entryVirtual('Array').forEach;
  var forEach$2 = forEach$3;
  var ArrayPrototype$1 = Array.prototype;
  var DOMIterables = {
    DOMTokenList: true,
    NodeList: true
  };

  var forEach_1 = function forEach_1(it) {
    var own = it.forEach;
    return it === ArrayPrototype$1 || it instanceof Array && own === ArrayPrototype$1.forEach // eslint-disable-next-line no-prototype-builtins -- safe
    || DOMIterables.hasOwnProperty(classof(it)) ? forEach$2 : own;
  };

  var forEach$1 = forEach_1; // all object keys, includes non-enumerable and symbols

  var ownKeys = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
    var keys = objectGetOwnPropertyNames.f(anObject(it));
    var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
    return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
  }; // `Object.getOwnPropertyDescriptors` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptors


  _export({
    target: 'Object',
    stat: true,
    sham: !descriptors
  }, {
    getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
      var O = toIndexedObject(object);
      var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
      var keys = ownKeys(O);
      var result = {};
      var index = 0;
      var key, descriptor;

      while (keys.length > index) {
        descriptor = getOwnPropertyDescriptor(O, key = keys[index++]);
        if (descriptor !== undefined) createProperty(result, key, descriptor);
      }

      return result;
    }
  });

  var getOwnPropertyDescriptors$2 = path.Object.getOwnPropertyDescriptors;
  var getOwnPropertyDescriptors$1 = getOwnPropertyDescriptors$2;
  var getOwnPropertyDescriptors = getOwnPropertyDescriptors$1; // `Object.defineProperties` method
  // https://tc39.es/ecma262/#sec-object.defineproperties

  _export({
    target: 'Object',
    stat: true,
    forced: !descriptors,
    sham: !descriptors
  }, {
    defineProperties: objectDefineProperties
  });

  var defineProperties_1 = createCommonjsModule(function (module) {
    var Object = path.Object;

    var defineProperties = module.exports = function defineProperties(T, D) {
      return Object.defineProperties(T, D);
    };

    if (Object.defineProperties.sham) defineProperties.sham = true;
  });
  var defineProperties$1 = defineProperties_1;
  var defineProperties = defineProperties$1;
  var freezing = !fails(function () {
    // eslint-disable-next-line es/no-object-isextensible, es/no-object-preventextensions -- required for testing
    return Object.isExtensible(Object.preventExtensions({}));
  });
  var internalMetadata = createCommonjsModule(function (module) {
    var defineProperty = objectDefineProperty.f;
    var METADATA = uid('meta');
    var id = 0; // eslint-disable-next-line es/no-object-isextensible -- safe

    var isExtensible = Object.isExtensible || function () {
      return true;
    };

    var setMetadata = function setMetadata(it) {
      defineProperty(it, METADATA, {
        value: {
          objectID: 'O' + ++id,
          // object ID
          weakData: {} // weak collections IDs

        }
      });
    };

    var fastKey = function fastKey(it, create) {
      // return a primitive with prefix
      if (!isObject(it)) return _typeof3(it) == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;

      if (!has$1(it, METADATA)) {
        // can't set metadata to uncaught frozen object
        if (!isExtensible(it)) return 'F'; // not necessary to add metadata

        if (!create) return 'E'; // add missing metadata

        setMetadata(it); // return object ID
      }

      return it[METADATA].objectID;
    };

    var getWeakData = function getWeakData(it, create) {
      if (!has$1(it, METADATA)) {
        // can't set metadata to uncaught frozen object
        if (!isExtensible(it)) return true; // not necessary to add metadata

        if (!create) return false; // add missing metadata

        setMetadata(it); // return the store of weak collections IDs
      }

      return it[METADATA].weakData;
    }; // add metadata on freeze-family methods calling


    var onFreeze = function onFreeze(it) {
      if (freezing && meta.REQUIRED && isExtensible(it) && !has$1(it, METADATA)) setMetadata(it);
      return it;
    };

    var meta = module.exports = {
      REQUIRED: false,
      fastKey: fastKey,
      getWeakData: getWeakData,
      onFreeze: onFreeze
    };
    hiddenKeys$1[METADATA] = true;
  });
  var ITERATOR$2 = wellKnownSymbol('iterator');
  var ArrayPrototype = Array.prototype; // check on default Array iterator

  var isArrayIteratorMethod = function isArrayIteratorMethod(it) {
    return it !== undefined && (iterators.Array === it || ArrayPrototype[ITERATOR$2] === it);
  };

  var ITERATOR$1 = wellKnownSymbol('iterator');

  var getIteratorMethod$1 = function getIteratorMethod$1(it) {
    if (it != undefined) return it[ITERATOR$1] || it['@@iterator'] || iterators[classof(it)];
  };

  var iteratorClose = function iteratorClose(iterator) {
    var returnMethod = iterator['return'];

    if (returnMethod !== undefined) {
      return anObject(returnMethod.call(iterator)).value;
    }
  };

  var Result = function Result(stopped, result) {
    this.stopped = stopped;
    this.result = result;
  };

  var iterate = function iterate(iterable, unboundFunction, options) {
    var that = options && options.that;
    var AS_ENTRIES = !!(options && options.AS_ENTRIES);
    var IS_ITERATOR = !!(options && options.IS_ITERATOR);
    var INTERRUPTED = !!(options && options.INTERRUPTED);
    var fn = functionBindContext(unboundFunction, that, 1 + AS_ENTRIES + INTERRUPTED);
    var iterator, iterFn, index, length, result, next, step;

    var stop = function stop(condition) {
      if (iterator) iteratorClose(iterator);
      return new Result(true, condition);
    };

    var callFn = function callFn(value) {
      if (AS_ENTRIES) {
        anObject(value);
        return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
      }

      return INTERRUPTED ? fn(value, stop) : fn(value);
    };

    if (IS_ITERATOR) {
      iterator = iterable;
    } else {
      iterFn = getIteratorMethod$1(iterable);
      if (typeof iterFn != 'function') throw TypeError('Target is not iterable'); // optimisation for array iterators

      if (isArrayIteratorMethod(iterFn)) {
        for (index = 0, length = toLength(iterable.length); length > index; index++) {
          result = callFn(iterable[index]);
          if (result && result instanceof Result) return result;
        }

        return new Result(false);
      }

      iterator = iterFn.call(iterable);
    }

    next = iterator.next;

    while (!(step = next.call(iterator)).done) {
      try {
        result = callFn(step.value);
      } catch (error) {
        iteratorClose(iterator);
        throw error;
      }

      if (_typeof3(result) == 'object' && result && result instanceof Result) return result;
    }

    return new Result(false);
  };

  var anInstance = function anInstance(it, Constructor, name) {
    if (!(it instanceof Constructor)) {
      throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
    }

    return it;
  };

  var defineProperty$4 = objectDefineProperty.f;
  var forEach = arrayIteration.forEach;
  var setInternalState$2 = internalState.set;
  var internalStateGetterFor$1 = internalState.getterFor;

  var collection = function collection(CONSTRUCTOR_NAME, wrapper, common) {
    var IS_MAP = CONSTRUCTOR_NAME.indexOf('Map') !== -1;
    var IS_WEAK = CONSTRUCTOR_NAME.indexOf('Weak') !== -1;
    var ADDER = IS_MAP ? 'set' : 'add';
    var NativeConstructor = global$1[CONSTRUCTOR_NAME];
    var NativePrototype = NativeConstructor && NativeConstructor.prototype;
    var exported = {};
    var Constructor;

    if (!descriptors || typeof NativeConstructor != 'function' || !(IS_WEAK || NativePrototype.forEach && !fails(function () {
      new NativeConstructor().entries().next();
    }))) {
      // create collection constructor
      Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
      internalMetadata.REQUIRED = true;
    } else {
      Constructor = wrapper(function (target, iterable) {
        setInternalState$2(anInstance(target, Constructor, CONSTRUCTOR_NAME), {
          type: CONSTRUCTOR_NAME,
          collection: new NativeConstructor()
        });
        if (iterable != undefined) iterate(iterable, target[ADDER], {
          that: target,
          AS_ENTRIES: IS_MAP
        });
      });
      var getInternalState = internalStateGetterFor$1(CONSTRUCTOR_NAME);
      forEach(['add', 'clear', 'delete', 'forEach', 'get', 'has', 'set', 'keys', 'values', 'entries'], function (KEY) {
        var IS_ADDER = KEY == 'add' || KEY == 'set';

        if (KEY in NativePrototype && !(IS_WEAK && KEY == 'clear')) {
          createNonEnumerableProperty(Constructor.prototype, KEY, function (a, b) {
            var collection = getInternalState(this).collection;
            if (!IS_ADDER && IS_WEAK && !isObject(a)) return KEY == 'get' ? undefined : false;
            var result = collection[KEY](a === 0 ? 0 : a, b);
            return IS_ADDER ? this : result;
          });
        }
      });
      IS_WEAK || defineProperty$4(Constructor.prototype, 'size', {
        configurable: true,
        get: function get() {
          return getInternalState(this).collection.size;
        }
      });
    }

    setToStringTag(Constructor, CONSTRUCTOR_NAME, false, true);
    exported[CONSTRUCTOR_NAME] = Constructor;

    _export({
      global: true,
      forced: true
    }, exported);

    if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);
    return Constructor;
  };

  var redefineAll = function redefineAll(target, src, options) {
    for (var key in src) {
      if (options && options.unsafe && target[key]) target[key] = src[key];else redefine(target, key, src[key], options);
    }

    return target;
  };

  var SPECIES = wellKnownSymbol('species');

  var setSpecies = function setSpecies(CONSTRUCTOR_NAME) {
    var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
    var defineProperty = objectDefineProperty.f;

    if (descriptors && Constructor && !Constructor[SPECIES]) {
      defineProperty(Constructor, SPECIES, {
        configurable: true,
        get: function get() {
          return this;
        }
      });
    }
  };

  var defineProperty$3 = objectDefineProperty.f;
  var fastKey = internalMetadata.fastKey;
  var setInternalState$1 = internalState.set;
  var internalStateGetterFor = internalState.getterFor;
  var collectionStrong = {
    getConstructor: function getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
      var C = wrapper(function (that, iterable) {
        anInstance(that, C, CONSTRUCTOR_NAME);
        setInternalState$1(that, {
          type: CONSTRUCTOR_NAME,
          index: objectCreate(null),
          first: undefined,
          last: undefined,
          size: 0
        });
        if (!descriptors) that.size = 0;
        if (iterable != undefined) iterate(iterable, that[ADDER], {
          that: that,
          AS_ENTRIES: IS_MAP
        });
      });
      var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

      var define = function define(that, key, value) {
        var state = getInternalState(that);
        var entry = getEntry(that, key);
        var previous, index; // change existing entry

        if (entry) {
          entry.value = value; // create new entry
        } else {
          state.last = entry = {
            index: index = fastKey(key, true),
            key: key,
            value: value,
            previous: previous = state.last,
            next: undefined,
            removed: false
          };
          if (!state.first) state.first = entry;
          if (previous) previous.next = entry;
          if (descriptors) state.size++;else that.size++; // add to index

          if (index !== 'F') state.index[index] = entry;
        }

        return that;
      };

      var getEntry = function getEntry(that, key) {
        var state = getInternalState(that); // fast case

        var index = fastKey(key);
        var entry;
        if (index !== 'F') return state.index[index]; // frozen object case

        for (entry = state.first; entry; entry = entry.next) {
          if (entry.key == key) return entry;
        }
      };

      redefineAll(C.prototype, {
        // `{ Map, Set }.prototype.clear()` methods
        // https://tc39.es/ecma262/#sec-map.prototype.clear
        // https://tc39.es/ecma262/#sec-set.prototype.clear
        clear: function clear() {
          var that = this;
          var state = getInternalState(that);
          var data = state.index;
          var entry = state.first;

          while (entry) {
            entry.removed = true;
            if (entry.previous) entry.previous = entry.previous.next = undefined;
            delete data[entry.index];
            entry = entry.next;
          }

          state.first = state.last = undefined;
          if (descriptors) state.size = 0;else that.size = 0;
        },
        // `{ Map, Set }.prototype.delete(key)` methods
        // https://tc39.es/ecma262/#sec-map.prototype.delete
        // https://tc39.es/ecma262/#sec-set.prototype.delete
        'delete': function _delete(key) {
          var that = this;
          var state = getInternalState(that);
          var entry = getEntry(that, key);

          if (entry) {
            var next = entry.next;
            var prev = entry.previous;
            delete state.index[entry.index];
            entry.removed = true;
            if (prev) prev.next = next;
            if (next) next.previous = prev;
            if (state.first == entry) state.first = next;
            if (state.last == entry) state.last = prev;
            if (descriptors) state.size--;else that.size--;
          }

          return !!entry;
        },
        // `{ Map, Set }.prototype.forEach(callbackfn, thisArg = undefined)` methods
        // https://tc39.es/ecma262/#sec-map.prototype.foreach
        // https://tc39.es/ecma262/#sec-set.prototype.foreach
        forEach: function forEach(callbackfn
        /* , that = undefined */
        ) {
          var state = getInternalState(this);
          var boundFunction = functionBindContext(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
          var entry;

          while (entry = entry ? entry.next : state.first) {
            boundFunction(entry.value, entry.key, this); // revert to the last existing entry

            while (entry && entry.removed) {
              entry = entry.previous;
            }
          }
        },
        // `{ Map, Set}.prototype.has(key)` methods
        // https://tc39.es/ecma262/#sec-map.prototype.has
        // https://tc39.es/ecma262/#sec-set.prototype.has
        has: function has(key) {
          return !!getEntry(this, key);
        }
      });
      redefineAll(C.prototype, IS_MAP ? {
        // `Map.prototype.get(key)` method
        // https://tc39.es/ecma262/#sec-map.prototype.get
        get: function get(key) {
          var entry = getEntry(this, key);
          return entry && entry.value;
        },
        // `Map.prototype.set(key, value)` method
        // https://tc39.es/ecma262/#sec-map.prototype.set
        set: function set(key, value) {
          return define(this, key === 0 ? 0 : key, value);
        }
      } : {
        // `Set.prototype.add(value)` method
        // https://tc39.es/ecma262/#sec-set.prototype.add
        add: function add(value) {
          return define(this, value = value === 0 ? 0 : value, value);
        }
      });
      if (descriptors) defineProperty$3(C.prototype, 'size', {
        get: function get() {
          return getInternalState(this).size;
        }
      });
      return C;
    },
    setStrong: function setStrong(C, CONSTRUCTOR_NAME, IS_MAP) {
      var ITERATOR_NAME = CONSTRUCTOR_NAME + ' Iterator';
      var getInternalCollectionState = internalStateGetterFor(CONSTRUCTOR_NAME);
      var getInternalIteratorState = internalStateGetterFor(ITERATOR_NAME); // `{ Map, Set }.prototype.{ keys, values, entries, @@iterator }()` methods
      // https://tc39.es/ecma262/#sec-map.prototype.entries
      // https://tc39.es/ecma262/#sec-map.prototype.keys
      // https://tc39.es/ecma262/#sec-map.prototype.values
      // https://tc39.es/ecma262/#sec-map.prototype-@@iterator
      // https://tc39.es/ecma262/#sec-set.prototype.entries
      // https://tc39.es/ecma262/#sec-set.prototype.keys
      // https://tc39.es/ecma262/#sec-set.prototype.values
      // https://tc39.es/ecma262/#sec-set.prototype-@@iterator

      defineIterator(C, CONSTRUCTOR_NAME, function (iterated, kind) {
        setInternalState$1(this, {
          type: ITERATOR_NAME,
          target: iterated,
          state: getInternalCollectionState(iterated),
          kind: kind,
          last: undefined
        });
      }, function () {
        var state = getInternalIteratorState(this);
        var kind = state.kind;
        var entry = state.last; // revert to the last existing entry

        while (entry && entry.removed) {
          entry = entry.previous;
        } // get next entry


        if (!state.target || !(state.last = entry = entry ? entry.next : state.state.first)) {
          // or finish the iteration
          state.target = undefined;
          return {
            value: undefined,
            done: true
          };
        } // return step by kind


        if (kind == 'keys') return {
          value: entry.key,
          done: false
        };
        if (kind == 'values') return {
          value: entry.value,
          done: false
        };
        return {
          value: [entry.key, entry.value],
          done: false
        };
      }, IS_MAP ? 'entries' : 'values', !IS_MAP, true); // `{ Map, Set }.prototype[@@species]` accessors
      // https://tc39.es/ecma262/#sec-get-map-@@species
      // https://tc39.es/ecma262/#sec-get-set-@@species

      setSpecies(CONSTRUCTOR_NAME);
    }
  }; // `Set` constructor
  // https://tc39.es/ecma262/#sec-set-objects

  collection('Set', function (init) {
    return function Set() {
      return init(this, arguments.length ? arguments[0] : undefined);
    };
  }, collectionStrong); // `String.prototype.{ codePointAt, at }` methods implementation

  var createMethod$1 = function createMethod$1(CONVERT_TO_STRING) {
    return function ($this, pos) {
      var S = String(requireObjectCoercible($this));
      var position = toInteger(pos);
      var size = S.length;
      var first, second;
      if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
      first = S.charCodeAt(position);
      return first < 0xD800 || first > 0xDBFF || position + 1 === size || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF ? CONVERT_TO_STRING ? S.charAt(position) : first : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
    };
  };

  var stringMultibyte = {
    // `String.prototype.codePointAt` method
    // https://tc39.es/ecma262/#sec-string.prototype.codepointat
    codeAt: createMethod$1(false),
    // `String.prototype.at` method
    // https://github.com/mathiasbynens/String.prototype.at
    charAt: createMethod$1(true)
  };
  var charAt = stringMultibyte.charAt;
  var STRING_ITERATOR = 'String Iterator';
  var setInternalState = internalState.set;
  var getInternalState = internalState.getterFor(STRING_ITERATOR); // `String.prototype[@@iterator]` method
  // https://tc39.es/ecma262/#sec-string.prototype-@@iterator

  defineIterator(String, 'String', function (iterated) {
    setInternalState(this, {
      type: STRING_ITERATOR,
      string: String(iterated),
      index: 0
    }); // `%StringIteratorPrototype%.next` method
    // https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
  }, function next() {
    var state = getInternalState(this);
    var string = state.string;
    var index = state.index;
    var point;
    if (index >= string.length) return {
      value: undefined,
      done: true
    };
    point = charAt(string, index);
    state.index += point.length;
    return {
      value: point,
      done: false
    };
  });
  var set$2 = path.Set;
  var set$1 = set$2;
  var set = set$1;
  var propertyIsEnumerable = objectPropertyIsEnumerable.f; // `Object.{ entries, values }` methods implementation

  var createMethod = function createMethod(TO_ENTRIES) {
    return function (it) {
      var O = toIndexedObject(it);
      var keys = objectKeys(O);
      var length = keys.length;
      var i = 0;
      var result = [];
      var key;

      while (length > i) {
        key = keys[i++];

        if (!descriptors || propertyIsEnumerable.call(O, key)) {
          result.push(TO_ENTRIES ? [key, O[key]] : O[key]);
        }
      }

      return result;
    };
  };

  var objectToArray = {
    // `Object.entries` method
    // https://tc39.es/ecma262/#sec-object.entries
    entries: createMethod(true),
    // `Object.values` method
    // https://tc39.es/ecma262/#sec-object.values
    values: createMethod(false)
  };
  var $values = objectToArray.values; // `Object.values` method
  // https://tc39.es/ecma262/#sec-object.values

  _export({
    target: 'Object',
    stat: true
  }, {
    values: function values(O) {
      return $values(O);
    }
  });

  var values$2 = path.Object.values;
  var values$1 = values$2;
  var values = values$1;
  var $entries = objectToArray.entries; // `Object.entries` method
  // https://tc39.es/ecma262/#sec-object.entries

  _export({
    target: 'Object',
    stat: true
  }, {
    entries: function entries(O) {
      return $entries(O);
    }
  });

  var entries$2 = path.Object.entries;
  var entries$1 = entries$2;
  var entries = entries$1; // `Array.isArray` method
  // https://tc39.es/ecma262/#sec-array.isarray

  _export({
    target: 'Array',
    stat: true
  }, {
    isArray: isArray$5
  });

  var isArray$4 = path.Array.isArray;
  var isArray$3 = isArray$4;
  var isArray$2 = isArray$3;
  var defineProperty$2 = defineProperty_1;
  var defineProperty$1 = defineProperty$2;

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      defineProperty$1(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  var defineProperty = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': _defineProperty
  });
  var isArray$1 = isArray$4;
  var isArray = isArray$1;

  function _arrayWithHoles(arr) {
    if (isArray(arr)) return arr;
  } // `Symbol.asyncIterator` well-known symbol
  // https://tc39.es/ecma262/#sec-symbol.asynciterator


  defineWellKnownSymbol('asyncIterator'); // `Symbol.hasInstance` well-known symbol
  // https://tc39.es/ecma262/#sec-symbol.hasinstance

  defineWellKnownSymbol('hasInstance'); // `Symbol.isConcatSpreadable` well-known symbol
  // https://tc39.es/ecma262/#sec-symbol.isconcatspreadable

  defineWellKnownSymbol('isConcatSpreadable'); // `Symbol.iterator` well-known symbol
  // https://tc39.es/ecma262/#sec-symbol.iterator

  defineWellKnownSymbol('iterator'); // `Symbol.match` well-known symbol
  // https://tc39.es/ecma262/#sec-symbol.match

  defineWellKnownSymbol('match'); // `Symbol.matchAll` well-known symbol
  // https://tc39.es/ecma262/#sec-symbol.matchall

  defineWellKnownSymbol('matchAll'); // `Symbol.replace` well-known symbol
  // https://tc39.es/ecma262/#sec-symbol.replace

  defineWellKnownSymbol('replace'); // `Symbol.search` well-known symbol
  // https://tc39.es/ecma262/#sec-symbol.search

  defineWellKnownSymbol('search'); // `Symbol.species` well-known symbol
  // https://tc39.es/ecma262/#sec-symbol.species

  defineWellKnownSymbol('species'); // `Symbol.split` well-known symbol
  // https://tc39.es/ecma262/#sec-symbol.split

  defineWellKnownSymbol('split'); // `Symbol.toPrimitive` well-known symbol
  // https://tc39.es/ecma262/#sec-symbol.toprimitive

  defineWellKnownSymbol('toPrimitive'); // `Symbol.toStringTag` well-known symbol
  // https://tc39.es/ecma262/#sec-symbol.tostringtag

  defineWellKnownSymbol('toStringTag'); // `Symbol.unscopables` well-known symbol
  // https://tc39.es/ecma262/#sec-symbol.unscopables

  defineWellKnownSymbol('unscopables'); // JSON[@@toStringTag] property
  // https://tc39.es/ecma262/#sec-json-@@tostringtag

  setToStringTag(global$1.JSON, 'JSON', true);
  var symbol$2 = path.Symbol; // `Symbol.asyncDispose` well-known symbol
  // https://github.com/tc39/proposal-using-statement

  defineWellKnownSymbol('asyncDispose'); // `Symbol.dispose` well-known symbol
  // https://github.com/tc39/proposal-using-statement

  defineWellKnownSymbol('dispose'); // `Symbol.matcher` well-known symbol
  // https://github.com/tc39/proposal-pattern-matching

  defineWellKnownSymbol('matcher'); // `Symbol.metadata` well-known symbol
  // https://github.com/tc39/proposal-decorators

  defineWellKnownSymbol('metadata'); // `Symbol.observable` well-known symbol
  // https://github.com/tc39/proposal-observable

  defineWellKnownSymbol('observable'); // TODO: remove from `core-js@4`
  // `Symbol.patternMatch` well-known symbol
  // https://github.com/tc39/proposal-pattern-matching

  defineWellKnownSymbol('patternMatch'); // TODO: remove from `core-js@4`

  defineWellKnownSymbol('replaceAll'); // TODO: Remove from `core-js@4`
  // TODO: Remove from `core-js@4`

  var symbol$1 = symbol$2;
  var symbol = symbol$1;
  var getIteratorMethod_1 = getIteratorMethod$1;
  var getIteratorMethod = getIteratorMethod_1; // call something on iterator step with safe closing on error

  var callWithSafeIterationClosing = function callWithSafeIterationClosing(iterator, fn, value, ENTRIES) {
    try {
      return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
    } catch (error) {
      iteratorClose(iterator);
      throw error;
    }
  }; // `Array.from` method implementation
  // https://tc39.es/ecma262/#sec-array.from


  var arrayFrom = function from(arrayLike
  /* , mapfn = undefined, thisArg = undefined */
  ) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var argumentsLength = arguments.length;
    var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var iteratorMethod = getIteratorMethod$1(O);
    var index = 0;
    var length, result, step, iterator, next, value;
    if (mapping) mapfn = functionBindContext(mapfn, argumentsLength > 2 ? arguments[2] : undefined, 2); // if the target is not iterable or it's an array with the default iterator - use a simple case

    if (iteratorMethod != undefined && !(C == Array && isArrayIteratorMethod(iteratorMethod))) {
      iterator = iteratorMethod.call(O);
      next = iterator.next;
      result = new C();

      for (; !(step = next.call(iterator)).done; index++) {
        value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
        createProperty(result, index, value);
      }
    } else {
      length = toLength(O.length);
      result = new C(length);

      for (; length > index; index++) {
        value = mapping ? mapfn(O[index], index) : O[index];
        createProperty(result, index, value);
      }
    }

    result.length = index;
    return result;
  };

  var ITERATOR = wellKnownSymbol('iterator');
  var SAFE_CLOSING = false;

  try {
    var called = 0;
    var iteratorWithReturn = {
      next: function next() {
        return {
          done: !!called++
        };
      },
      'return': function _return() {
        SAFE_CLOSING = true;
      }
    };

    iteratorWithReturn[ITERATOR] = function () {
      return this;
    }; // eslint-disable-next-line es/no-array-from, no-throw-literal -- required for testing


    Array.from(iteratorWithReturn, function () {
      throw 2;
    });
  } catch (error) {
    /* empty */
  }

  var checkCorrectnessOfIteration = function checkCorrectnessOfIteration(exec, SKIP_CLOSING) {
    if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
    var ITERATION_SUPPORT = false;

    try {
      var object = {};

      object[ITERATOR] = function () {
        return {
          next: function next() {
            return {
              done: ITERATION_SUPPORT = true
            };
          }
        };
      };

      exec(object);
    } catch (error) {
      /* empty */
    }

    return ITERATION_SUPPORT;
  };

  var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function (iterable) {
    // eslint-disable-next-line es/no-array-from -- required for testing
    Array.from(iterable);
  }); // `Array.from` method
  // https://tc39.es/ecma262/#sec-array.from

  _export({
    target: 'Array',
    stat: true,
    forced: INCORRECT_ITERATION
  }, {
    from: arrayFrom
  });

  var from$2 = path.Array.from;
  var from$1 = from$2;
  var from = from$1;

  function _iterableToArray(iter) {
    if (typeof symbol !== "undefined" && getIteratorMethod(iter) != null || iter["@@iterator"] != null) return from(iter);
  }

  var slice$1 = slice_1;
  var slice = slice$1;

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }

  function _unsupportedIterableToArray(o, minLen) {
    var _context;

    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = slice(_context = Object.prototype.toString.call(o)).call(_context, 8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _toArray(arr) {
    return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest();
  }

  var toArray = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': _toArray
  });

  function _arrayWithoutHoles(arr) {
    if (isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  var toConsumableArray = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': _toConsumableArray
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var classCallCheck = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': _classCallCheck
  });

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      defineProperty$1(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var createClass = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': _createClass
  });

  function _iterableToArrayLimit(arr, i) {
    var _i = arr && (typeof symbol !== "undefined" && getIteratorMethod(arr) || arr["@@iterator"]);

    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;

    var _s, _e;

    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  var slicedToArray = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': _slicedToArray
  });
  var iterator$2 = wellKnownSymbolWrapped.f('iterator');
  var iterator$1 = iterator$2;
  var iterator = iterator$1;

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof symbol === "function" && typeof iterator === "symbol") {
      _typeof = function _typeof(obj) {
        return typeof obj;
      };
    } else {
      _typeof = function _typeof(obj) {
        return obj && typeof symbol === "function" && obj.constructor === symbol && obj !== symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  var _typeof$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': _typeof
  }); // First coord is octaves, second is fifths. Distances are relative to c


  var notes = {
    c: [0, 0],
    d: [-1, 2],
    e: [-2, 4],
    f: [1, -1],
    g: [0, 1],
    a: [-1, 3],
    b: [-2, 5],
    h: [-2, 5]
  };

  var notecoord = function notecoord(name) {
    return name in notes ? [notes[name][0], notes[name][1]] : null;
  };

  var notes_1 = notes;
  var A4 = [3, 3]; // Relative to C0 (scientic notation, ~16.35Hz)

  var sharp$1 = [-4, 7];
  notecoord.notes = notes_1;
  notecoord.A4 = A4;
  notecoord.sharp = sharp$1;
  var accidentalValues = {
    'bb': -2,
    'b': -1,
    '': 0,
    '#': 1,
    'x': 2
  };

  var accidentalValue = function accidentalNumber(acc) {
    return accidentalValues[acc];
  };

  var interval$1 = function accidentalInterval(acc) {
    var val = accidentalValues[acc];
    return [-4 * val, 7 * val];
  };

  accidentalValue.interval = interval$1;

  var scientificNotation = function scientific(name) {
    var format = /^([a-h])(x|#|bb|b?)(-?\d*)/i;
    var parser = name.match(format);
    if (!(parser && name === parser[0] && parser[3].length)) return;
    var noteName = parser[1];
    var octave = +parser[3];
    var accidental = parser[2].length ? parser[2].toLowerCase() : '';
    var accidentalValue$1 = accidentalValue.interval(accidental);
    var coord = notecoord(noteName.toLowerCase());
    coord[0] += octave;
    coord[0] += accidentalValue$1[0] - notecoord.A4[0];
    coord[1] += accidentalValue$1[1] - notecoord.A4[1];
    return coord;
  };

  var helmholtz = function helmholtz(name) {
    var name = name.replace(/\u2032/g, "'").replace(/\u0375/g, ',');
    var parts = name.match(/^(,*)([a-h])(x|#|bb|b?)([,\']*)$/i);
    if (!parts || name !== parts[0]) throw new Error('Invalid formatting');
    var note = parts[2];
    var octaveFirst = parts[1];
    var octaveLast = parts[4];
    var lower = note === note.toLowerCase();
    var octave;

    if (octaveFirst) {
      if (lower) throw new Error('Invalid formatting - found commas before lowercase note');
      octave = 2 - octaveFirst.length;
    } else if (octaveLast) {
      if (octaveLast.match(/^'+$/) && lower) octave = 3 + octaveLast.length;else if (octaveLast.match(/^,+$/) && !lower) octave = 2 - octaveLast.length;else throw new Error('Invalid formatting - mismatch between octave ' + 'indicator and letter case');
    } else octave = lower ? 3 : 2;

    var accidentalValue$1 = accidentalValue.interval(parts[3].toLowerCase());
    var coord = notecoord(note.toLowerCase());
    coord[0] += octave;
    coord[0] += accidentalValue$1[0] - notecoord.A4[0];
    coord[1] += accidentalValue$1[1] - notecoord.A4[1];
    return coord;
  };

  var pitchFq = function pitchFq(coord, stdPitch) {
    if (typeof coord === 'number') {
      stdPitch = coord;
      return function (coord) {
        return stdPitch * Math.pow(2, (coord[0] * 12 + coord[1] * 7) / 12);
      };
    }

    stdPitch = stdPitch || 440;
    return stdPitch * Math.pow(2, (coord[0] * 12 + coord[1] * 7) / 12);
  }; // Note coordinates [octave, fifth] relative to C


  var knowledge = {
    notes: {
      c: [0, 0],
      d: [-1, 2],
      e: [-2, 4],
      f: [1, -1],
      g: [0, 1],
      a: [-1, 3],
      b: [-2, 5],
      h: [-2, 5]
    },
    intervals: {
      unison: [0, 0],
      second: [3, -5],
      third: [2, -3],
      fourth: [1, -1],
      fifth: [0, 1],
      sixth: [3, -4],
      seventh: [2, -2],
      octave: [1, 0]
    },
    intervalFromFifth: ['second', 'sixth', 'third', 'seventh', 'fourth', 'unison', 'fifth'],
    intervalsIndex: ['unison', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'octave', 'ninth', 'tenth', 'eleventh', 'twelfth', 'thirteenth', 'fourteenth', 'fifteenth'],
    // linear index to fifth = (2 * index + 1) % 7
    fifths: ['f', 'c', 'g', 'd', 'a', 'e', 'b'],
    accidentals: ['bb', 'b', '', '#', 'x'],
    sharp: [-4, 7],
    A4: [3, 3],
    durations: {
      '0.25': 'longa',
      '0.5': 'breve',
      '1': 'whole',
      '2': 'half',
      '4': 'quarter',
      '8': 'eighth',
      '16': 'sixteenth',
      '32': 'thirty-second',
      '64': 'sixty-fourth',
      '128': 'hundred-twenty-eighth'
    },
    qualityLong: {
      P: 'perfect',
      M: 'major',
      m: 'minor',
      A: 'augmented',
      AA: 'doubly augmented',
      d: 'diminished',
      dd: 'doubly diminished'
    },
    alterations: {
      perfect: ['dd', 'd', 'P', 'A', 'AA'],
      minor: ['dd', 'd', 'm', 'M', 'A', 'AA']
    },
    symbols: {
      'min': ['m3', 'P5'],
      'm': ['m3', 'P5'],
      '-': ['m3', 'P5'],
      'M': ['M3', 'P5'],
      '': ['M3', 'P5'],
      '+': ['M3', 'A5'],
      'aug': ['M3', 'A5'],
      'dim': ['m3', 'd5'],
      'o': ['m3', 'd5'],
      'maj': ['M3', 'P5', 'M7'],
      'dom': ['M3', 'P5', 'm7'],
      'ø': ['m3', 'd5', 'm7'],
      '5': ['P5']
    },
    chordShort: {
      'major': 'M',
      'minor': 'm',
      'augmented': 'aug',
      'diminished': 'dim',
      'half-diminished': '7b5',
      'power': '5',
      'dominant': '7'
    },
    stepNumber: {
      'unison': 1,
      'first': 1,
      'second': 2,
      'third': 3,
      'fourth': 4,
      'fifth': 5,
      'sixth': 6,
      'seventh': 7,
      'octave': 8,
      'ninth': 9,
      'eleventh': 11,
      'thirteenth': 13
    },
    // Adjusted Shearer syllables - Chromatic solfege system
    // Some intervals are not provided for. These include:
    // dd2 - Doubly diminished second
    // dd3 - Doubly diminished third
    // AA3 - Doubly augmented third
    // dd6 - Doubly diminished sixth
    // dd7 - Doubly diminished seventh
    // AA7 - Doubly augmented seventh
    intervalSolfege: {
      'dd1': 'daw',
      'd1': 'de',
      'P1': 'do',
      'A1': 'di',
      'AA1': 'dai',
      'd2': 'raw',
      'm2': 'ra',
      'M2': 're',
      'A2': 'ri',
      'AA2': 'rai',
      'd3': 'maw',
      'm3': 'me',
      'M3': 'mi',
      'A3': 'mai',
      'dd4': 'faw',
      'd4': 'fe',
      'P4': 'fa',
      'A4': 'fi',
      'AA4': 'fai',
      'dd5': 'saw',
      'd5': 'se',
      'P5': 'so',
      'A5': 'si',
      'AA5': 'sai',
      'd6': 'law',
      'm6': 'le',
      'M6': 'la',
      'A6': 'li',
      'AA6': 'lai',
      'd7': 'taw',
      'm7': 'te',
      'M7': 'ti',
      'A7': 'tai',
      'dd8': 'daw',
      'd8': 'de',
      'P8': 'do',
      'A8': 'di',
      'AA8': 'dai'
    }
  };
  var vector = {
    add: function add(note, interval) {
      return [note[0] + interval[0], note[1] + interval[1]];
    },
    sub: function sub(note, interval) {
      return [note[0] - interval[0], note[1] - interval[1]];
    },
    mul: function mul(note, interval) {
      if (typeof interval === 'number') return [note[0] * interval, note[1] * interval];else return [note[0] * interval[0], note[1] * interval[1]];
    },
    sum: function sum(coord) {
      return coord[0] + coord[1];
    }
  };
  var pattern = /^(AA|A|P|M|m|d|dd)(-?\d+)$/; // The interval it takes to raise a note a semitone

  var sharp = [-4, 7];
  var pAlts = ['dd', 'd', 'P', 'A', 'AA'];
  var mAlts = ['dd', 'd', 'm', 'M', 'A', 'AA'];
  var baseIntervals = [[0, 0], [3, -5], [2, -3], [1, -1], [0, 1], [3, -4], [2, -2], [1, 0]];

  var intervalCoords = function intervalCoords(simple) {
    var parser = simple.match(pattern);
    if (!parser) return null;
    var quality = parser[1];
    var number = +parser[2];
    var sign = number < 0 ? -1 : 1;
    number = sign < 0 ? -number : number;
    var lower = number > 8 ? number % 7 || 7 : number;
    var octaves = (number - lower) / 7;
    var base = baseIntervals[lower - 1];
    var alts = base[0] <= 1 ? pAlts : mAlts;
    var alt = alts.indexOf(quality) - 2; // this happens, if the alteration wasn't suitable for this type
    // of interval, such as P2 or M5 (no "perfect second" or "major fifth")

    if (alt === -3) return null;
    return [sign * (base[0] + octaves + sharp[0] * alt), sign * (base[1] + sharp[1] * alt)];
  }; // Copy to avoid overwriting internal base intervals


  var coords = baseIntervals.slice(0);
  intervalCoords.coords = coords;

  function Interval(coord) {
    if (!(this instanceof Interval)) return new Interval(coord);
    this.coord = coord;
  }

  Interval.prototype = {
    name: function name() {
      return knowledge.intervalsIndex[this.number() - 1];
    },
    semitones: function semitones() {
      return vector.sum(vector.mul(this.coord, [12, 7]));
    },
    number: function number() {
      return Math.abs(this.value());
    },
    value: function value() {
      var toMultiply = Math.floor((this.coord[1] - 2) / 7) + 1;
      var product = vector.mul(knowledge.sharp, toMultiply);
      var without = vector.sub(this.coord, product);
      var i = knowledge.intervalFromFifth[without[1] + 5];
      var diff = without[0] - knowledge.intervals[i][0];
      var val = knowledge.stepNumber[i] + diff * 7;
      return val > 0 ? val : val - 2;
    },
    type: function type() {
      return knowledge.intervals[this.base()][0] <= 1 ? 'perfect' : 'minor';
    },
    base: function base() {
      var product = vector.mul(knowledge.sharp, this.qualityValue());
      var fifth = vector.sub(this.coord, product)[1];
      fifth = this.value() > 0 ? fifth + 5 : -(fifth - 5) % 7;
      fifth = fifth < 0 ? knowledge.intervalFromFifth.length + fifth : fifth;
      var name = knowledge.intervalFromFifth[fifth];
      if (name === 'unison' && this.number() >= 8) name = 'octave';
      return name;
    },
    direction: function direction(dir) {
      if (dir) {
        var is = this.value() >= 1 ? 'up' : 'down';
        if (is !== dir) this.coord = vector.mul(this.coord, -1);
        return this;
      } else return this.value() >= 1 ? 'up' : 'down';
    },
    simple: function simple(ignore) {
      // Get the (upwards) base interval (with quality)
      var simple = knowledge.intervals[this.base()];
      var toAdd = vector.mul(knowledge.sharp, this.qualityValue());
      simple = vector.add(simple, toAdd); // Turn it around if necessary

      if (!ignore) simple = this.direction() === 'down' ? vector.mul(simple, -1) : simple;
      return new Interval(simple);
    },
    isCompound: function isCompound() {
      return this.number() > 8;
    },
    octaves: function octaves() {
      var toSubtract, without, octaves;

      if (this.direction() === 'up') {
        toSubtract = vector.mul(knowledge.sharp, this.qualityValue());
        without = vector.sub(this.coord, toSubtract);
        octaves = without[0] - knowledge.intervals[this.base()][0];
      } else {
        toSubtract = vector.mul(knowledge.sharp, -this.qualityValue());
        without = vector.sub(this.coord, toSubtract);
        octaves = -(without[0] + knowledge.intervals[this.base()][0]);
      }

      return octaves;
    },
    invert: function invert() {
      var i = this.base();
      var qual = this.qualityValue();
      var acc = this.type() === 'minor' ? -(qual - 1) : -qual;
      var idx = 9 - knowledge.stepNumber[i] - 1;
      var coord = knowledge.intervals[knowledge.intervalsIndex[idx]];
      coord = vector.add(coord, vector.mul(knowledge.sharp, acc));
      return new Interval(coord);
    },
    quality: function quality(lng) {
      var quality = knowledge.alterations[this.type()][this.qualityValue() + 2];
      return lng ? knowledge.qualityLong[quality] : quality;
    },
    qualityValue: function qualityValue() {
      if (this.direction() === 'down') return Math.floor((-this.coord[1] - 2) / 7) + 1;else return Math.floor((this.coord[1] - 2) / 7) + 1;
    },
    equal: function equal(interval) {
      return this.coord[0] === interval.coord[0] && this.coord[1] === interval.coord[1];
    },
    greater: function greater(interval) {
      var semi = this.semitones();
      var isemi = interval.semitones(); // If equal in absolute size, measure which interval is bigger
      // For example P4 is bigger than A3

      return semi === isemi ? this.number() > interval.number() : semi > isemi;
    },
    smaller: function smaller(interval) {
      return !this.equal(interval) && !this.greater(interval);
    },
    add: function add(interval) {
      return new Interval(vector.add(this.coord, interval.coord));
    },
    toString: function toString(ignore) {
      // If given true, return the positive value
      var number = ignore ? this.number() : this.value();
      return this.quality() + number;
    }
  };

  Interval.toCoord = function (simple) {
    var coord = intervalCoords(simple);
    if (!coord) throw new Error('Invalid simple format interval');
    return new Interval(coord);
  };

  Interval.from = function (from, to) {
    return from.interval(to);
  };

  Interval.between = function (from, to) {
    return new Interval(vector.sub(to.coord, from.coord));
  };

  Interval.invert = function (sInterval) {
    return Interval.toCoord(sInterval).invert().toString();
  };

  var _interval = Interval;

  function pad(str, ch, len) {
    for (; len > 0; len--) {
      str += ch;
    }

    return str;
  }

  function Note(coord, duration) {
    if (!(this instanceof Note)) return new Note(coord, duration);
    duration = duration || {};
    this.duration = {
      value: duration.value || 4,
      dots: duration.dots || 0
    };
    this.coord = coord;
  }

  Note.prototype = {
    octave: function octave() {
      return this.coord[0] + knowledge.A4[0] - knowledge.notes[this.name()][0] + this.accidentalValue() * 4;
    },
    name: function name() {
      var value = this.accidentalValue();
      var idx = this.coord[1] + knowledge.A4[1] - value * 7 + 1;
      return knowledge.fifths[idx];
    },
    accidentalValue: function accidentalValue() {
      return Math.round((this.coord[1] + knowledge.A4[1] - 2) / 7);
    },
    accidental: function accidental() {
      return knowledge.accidentals[this.accidentalValue() + 2];
    },

    /**
     * Returns the key number of the note
     */
    key: function key(white) {
      if (white) return this.coord[0] * 7 + this.coord[1] * 4 + 29;else return this.coord[0] * 12 + this.coord[1] * 7 + 49;
    },

    /**
    * Returns a number ranging from 0-127 representing a MIDI note value
    */
    midi: function midi() {
      return this.key() + 20;
    },

    /**
     * Calculates and returns the frequency of the note.
     * Optional concert pitch (def. 440)
     */
    fq: function fq(concertPitch) {
      return pitchFq(this.coord, concertPitch);
    },

    /**
     * Returns the pitch class index (chroma) of the note
     */
    chroma: function chroma() {
      var value = (vector.sum(vector.mul(this.coord, [12, 7])) - 3) % 12;
      return value < 0 ? value + 12 : value;
    },
    interval: function interval(interval$1) {
      if (typeof interval$1 === 'string') interval$1 = _interval.toCoord(interval$1);
      if (interval$1 instanceof _interval) return new Note(vector.add(this.coord, interval$1.coord), this.duration);else if (interval$1 instanceof Note) return new _interval(vector.sub(interval$1.coord, this.coord));
    },
    transpose: function transpose(interval) {
      this.coord = vector.add(this.coord, interval.coord);
      return this;
    },

    /**
     * Returns the Helmholtz notation form of the note (fx C,, d' F# g#'')
     */
    helmholtz: function helmholtz() {
      var octave = this.octave();
      var name = this.name();
      name = octave < 3 ? name.toUpperCase() : name.toLowerCase();
      var padchar = octave < 3 ? ',' : '\'';
      var padcount = octave < 2 ? 2 - octave : octave - 3;
      return pad(name + this.accidental(), padchar, padcount);
    },

    /**
     * Returns the scientific notation form of the note (fx E4, Bb3, C#7 etc.)
     */
    scientific: function scientific() {
      return this.name().toUpperCase() + this.accidental() + this.octave();
    },

    /**
     * Returns notes that are enharmonic with this note.
     */
    enharmonics: function enharmonics(oneaccidental) {
      var key = this.key(),
          limit = oneaccidental ? 2 : 3;
      return ['m3', 'm2', 'm-2', 'm-3'].map(this.interval.bind(this)).filter(function (note) {
        var acc = note.accidentalValue();
        var diff = key - (note.key() - acc);

        if (diff < limit && diff > -limit) {
          var product = vector.mul(knowledge.sharp, diff - acc);
          note.coord = vector.add(note.coord, product);
          return true;
        }
      });
    },
    solfege: function solfege(scale, showOctaves) {
      var interval = scale.tonic.interval(this),
          solfege,
          stroke,
          count;
      if (interval.direction() === 'down') interval = interval.invert();

      if (showOctaves) {
        count = (this.key(true) - scale.tonic.key(true)) / 7;
        count = count >= 0 ? Math.floor(count) : -Math.ceil(-count);
        stroke = count >= 0 ? '\'' : ',';
      }

      solfege = knowledge.intervalSolfege[interval.simple(true).toString()];
      return showOctaves ? pad(solfege, stroke, Math.abs(count)) : solfege;
    },
    scaleDegree: function scaleDegree(scale) {
      var inter = scale.tonic.interval(this); // If the direction is down, or we're dealing with an octave - invert it

      if (inter.direction() === 'down' || inter.coord[1] === 0 && inter.coord[0] !== 0) {
        inter = inter.invert();
      }

      inter = inter.simple(true).coord;
      return scale.scale.reduce(function (index, current, i) {
        var coord = _interval.toCoord(current).coord;

        return coord[0] === inter[0] && coord[1] === inter[1] ? i + 1 : index;
      }, 0);
    },

    /**
     * Returns the name of the duration value,
     * such as 'whole', 'quarter', 'sixteenth' etc.
     */
    durationName: function durationName() {
      return knowledge.durations[this.duration.value];
    },

    /**
     * Returns the duration of the note (including dots)
     * in seconds. The first argument is the tempo in beats
     * per minute, the second is the beat unit (i.e. the
     * lower numeral in a time signature).
     */
    durationInSeconds: function durationInSeconds(bpm, beatUnit) {
      var secs = 60 / bpm / (this.duration.value / 4) / (beatUnit / 4);
      return secs * 2 - secs / Math.pow(2, this.duration.dots);
    },

    /**
     * Returns the name of the note, with an optional display of octave number
     */
    toString: function toString(dont) {
      return this.name() + this.accidental() + (dont ? '' : this.octave());
    }
  };

  Note.fromString = function (name, dur) {
    var coord = scientificNotation(name);
    if (!coord) coord = helmholtz(name);
    return new Note(coord, dur);
  };

  Note.fromKey = function (key) {
    var octave = Math.floor((key - 4) / 12);
    var distance = key - octave * 12 - 4;
    var name = knowledge.fifths[(2 * Math.round(distance / 2) + 1) % 7];
    var subDiff = vector.sub(knowledge.notes[name], knowledge.A4);
    var note = vector.add(subDiff, [octave + 1, 0]);
    var diff = key - 49 - vector.sum(vector.mul(note, [12, 7]));
    var arg = diff ? vector.add(note, vector.mul(knowledge.sharp, diff)) : note;
    return new Note(arg);
  };

  Note.fromFrequency = function (fq, concertPitch) {
    var key, cents, originalFq;
    concertPitch = concertPitch || 440;
    key = 49 + 12 * ((Math.log(fq) - Math.log(concertPitch)) / Math.log(2));
    key = Math.round(key);
    originalFq = concertPitch * Math.pow(2, (key - 49) / 12);
    cents = 1200 * (Math.log(fq / originalFq) / Math.log(2));
    return {
      note: Note.fromKey(key),
      cents: cents
    };
  };

  Note.fromMIDI = function (note) {
    return Note.fromKey(note - 20);
  };

  var note = Note;
  var SYMBOLS = {
    'm': ['m3', 'P5'],
    'mi': ['m3', 'P5'],
    'min': ['m3', 'P5'],
    '-': ['m3', 'P5'],
    'M': ['M3', 'P5'],
    'ma': ['M3', 'P5'],
    '': ['M3', 'P5'],
    '+': ['M3', 'A5'],
    'aug': ['M3', 'A5'],
    'dim': ['m3', 'd5'],
    'o': ['m3', 'd5'],
    'maj': ['M3', 'P5', 'M7'],
    'dom': ['M3', 'P5', 'm7'],
    'ø': ['m3', 'd5', 'm7'],
    '5': ['P5'],
    '6/9': ['M3', 'P5', 'M6', 'M9']
  };

  var daccord = function daccord(symbol) {
    var c,
        parsing = 'quality',
        additionals = [],
        name,
        chordLength = 2;
    var notes = ['P1', 'M3', 'P5', 'm7', 'M9', 'P11', 'M13'];
    var explicitMajor = false;

    function setChord(name) {
      var intervals = SYMBOLS[name];

      for (var i = 0, len = intervals.length; i < len; i++) {
        notes[i + 1] = intervals[i];
      }

      chordLength = intervals.length;
    } // Remove whitespace, commas and parentheses


    symbol = symbol.replace(/[,\s\(\)]/g, '');

    for (var i = 0, len = symbol.length; i < len; i++) {
      if (!(c = symbol[i])) return;

      if (parsing === 'quality') {
        var sub3 = i + 2 < len ? symbol.substr(i, 3).toLowerCase() : null;
        var sub2 = i + 1 < len ? symbol.substr(i, 2).toLowerCase() : null;
        if (sub3 in SYMBOLS) name = sub3;else if (sub2 in SYMBOLS) name = sub2;else if (c in SYMBOLS) name = c;else name = '';
        if (name) setChord(name);
        if (name === 'M' || name === 'ma' || name === 'maj') explicitMajor = true;
        i += name.length - 1;
        parsing = 'extension';
      } else if (parsing === 'extension') {
        c = c === '1' && symbol[i + 1] ? +symbol.substr(i, 2) : +c;

        if (!isNaN(c) && c !== 6) {
          chordLength = (c - 1) / 2;
          if (chordLength !== Math.round(chordLength)) return new Error('Invalid interval extension: ' + c.toString(10));
          if (name === 'o' || name === 'dim') notes[3] = 'd7';else if (explicitMajor) notes[3] = 'M7';
          i += c >= 10 ? 1 : 0;
        } else if (c === 6) {
          notes[3] = 'M6';
          chordLength = Math.max(3, chordLength);
        } else i -= 1;

        parsing = 'alterations';
      } else if (parsing === 'alterations') {
        var alterations = symbol.substr(i).split(/(#|b|add|maj|sus|M)/i),
            flat = false,
            sharp = false;
        if (alterations.length === 1) return new Error('Invalid alteration');else if (alterations[0].length !== 0) return new Error('Invalid token: \'' + alterations[0] + '\'');
        var ignore = false;
        alterations.forEach(function (alt, i, arr) {
          if (ignore || !alt.length) return ignore = false;
          var next = arr[i + 1],
              lower = alt.toLowerCase();

          if (alt === 'M' || lower === 'maj') {
            if (next === '7') ignore = true;
            chordLength = Math.max(3, chordLength);
            notes[3] = 'M7';
          } else if (lower === 'sus') {
            var type = 'P4';

            if (next === '2' || next === '4') {
              ignore = true;
              if (next === '2') type = 'M2';
            }

            notes[1] = type; // Replace third with M2 or P4
          } else if (lower === 'add') {
            if (next === '9') additionals.push('M9');else if (next === '11') additionals.push('P11');else if (next === '13') additionals.push('M13');
            ignore = true;
          } else if (lower === 'b') {
            flat = true;
          } else if (lower === '#') {
            sharp = true;
          } else {
            var token = +alt,
                quality,
                intPos;
            if (isNaN(token) || String(token).length !== alt.length) return new Error('Invalid token: \'' + alt + '\'');

            if (token === 6) {
              if (sharp) notes[3] = 'A6';else if (flat) notes[3] = 'm6';else notes[3] = 'M6';
              chordLength = Math.max(3, chordLength);
              return;
            } // Calculate the position in the 'note' array


            intPos = (token - 1) / 2;
            if (chordLength < intPos) chordLength = intPos;
            if (token < 5 || token === 7 || intPos !== Math.round(intPos)) return new Error('Invalid interval alteration: ' + token);
            quality = notes[intPos][0]; // Alterate the quality of the interval according the accidentals

            if (sharp) {
              if (quality === 'd') quality = 'm';else if (quality === 'm') quality = 'M';else if (quality === 'M' || quality === 'P') quality = 'A';
            } else if (flat) {
              if (quality === 'A') quality = 'M';else if (quality === 'M') quality = 'm';else if (quality === 'm' || quality === 'P') quality = 'd';
            }

            sharp = flat = false;
            notes[intPos] = quality + token;
          }
        });
        parsing = 'ended';
      } else if (parsing === 'ended') {
        break;
      }
    }

    return notes.slice(0, chordLength + 1).concat(additionals);
  };

  function Chord(root, name) {
    if (!(this instanceof Chord)) return new Chord(root, name);
    name = name || '';
    this.name = root.name().toUpperCase() + root.accidental() + name;
    this.symbol = name;
    this.root = root;
    this.intervals = [];
    this._voicing = [];
    var bass = name.split('/');

    if (bass.length === 2 && bass[1].trim() !== '9') {
      name = bass[0];
      bass = bass[1].trim();
    } else {
      bass = null;
    }

    this.intervals = daccord(name).map(_interval.toCoord);
    this._voicing = this.intervals.slice();

    if (bass) {
      var intervals = this.intervals,
          bassInterval,
          note$1; // Make sure the bass is atop of the root note

      note$1 = note.fromString(bass + (root.octave() + 1)); // crude

      bassInterval = _interval.between(root, note$1);
      bass = bassInterval.simple();
      bassInterval = bassInterval.invert().direction('down');
      this._voicing = [bassInterval];

      for (var i = 0, length = intervals.length; i < length; i++) {
        if (!intervals[i].simple().equal(bass)) this._voicing.push(intervals[i]);
      }
    }
  }

  Chord.prototype = {
    notes: function notes() {
      var root = this.root;
      return this.voicing().map(function (interval) {
        return root.interval(interval);
      });
    },
    simple: function simple() {
      return this.notes().map(function (n) {
        return n.toString(true);
      });
    },
    bass: function bass() {
      return this.root.interval(this._voicing[0]);
    },
    voicing: function voicing(_voicing) {
      // Get the voicing
      if (!_voicing) {
        return this._voicing;
      } // Set the voicing


      this._voicing = [];

      for (var i = 0, length = _voicing.length; i < length; i++) {
        this._voicing[i] = _interval.toCoord(_voicing[i]);
      }

      return this;
    },
    resetVoicing: function resetVoicing() {
      this._voicing = this.intervals;
    },
    dominant: function dominant(additional) {
      additional = additional || '';
      return new Chord(this.root.interval('P5'), additional);
    },
    subdominant: function subdominant(additional) {
      additional = additional || '';
      return new Chord(this.root.interval('P4'), additional);
    },
    parallel: function parallel(additional) {
      var quality = this.quality();

      if (this.chordType() !== 'triad' || quality === 'diminished' || quality === 'augmented') {
        throw new Error('Only major/minor triads have parallel chords');
      }

      if (quality === 'major') {
        return new Chord(this.root.interval('m3', 'down'), 'm');
      } else {
        return new Chord(this.root.interval('m3', 'up'));
      }
    },
    quality: function quality() {
      var third,
          fifth,
          seventh,
          intervals = this.intervals;

      for (var i = 0, length = intervals.length; i < length; i++) {
        if (intervals[i].number() === 3) {
          third = intervals[i];
        } else if (intervals[i].number() === 5) {
          fifth = intervals[i];
        } else if (intervals[i].number() === 7) {
          seventh = intervals[i];
        }
      }

      if (!third) {
        return;
      }

      third = third.direction() === 'down' ? third.invert() : third;
      third = third.simple().toString();

      if (fifth) {
        fifth = fifth.direction === 'down' ? fifth.invert() : fifth;
        fifth = fifth.simple().toString();
      }

      if (seventh) {
        seventh = seventh.direction === 'down' ? seventh.invert() : seventh;
        seventh = seventh.simple().toString();
      }

      if (third === 'M3') {
        if (fifth === 'A5') {
          return 'augmented';
        } else if (fifth === 'P5') {
          return seventh === 'm7' ? 'dominant' : 'major';
        }

        return 'major';
      } else if (third === 'm3') {
        if (fifth === 'P5') {
          return 'minor';
        } else if (fifth === 'd5') {
          return seventh === 'm7' ? 'half-diminished' : 'diminished';
        }

        return 'minor';
      }
    },
    chordType: function chordType() {
      // In need of better name
      var length = this.intervals.length,
          interval,
          has,
          invert,
          i,
          name;

      if (length === 2) {
        return 'dyad';
      } else if (length === 3) {
        has = {
          unison: false,
          third: false,
          fifth: false
        };

        for (i = 0; i < length; i++) {
          interval = this.intervals[i];
          invert = interval.invert();

          if (interval.base() in has) {
            has[interval.base()] = true;
          } else if (invert.base() in has) {
            has[invert.base()] = true;
          }
        }

        name = has.unison && has.third && has.fifth ? 'triad' : 'trichord';
      } else if (length === 4) {
        has = {
          unison: false,
          third: false,
          fifth: false,
          seventh: false
        };

        for (i = 0; i < length; i++) {
          interval = this.intervals[i];
          invert = interval.invert();

          if (interval.base() in has) {
            has[interval.base()] = true;
          } else if (invert.base() in has) {
            has[invert.base()] = true;
          }
        }

        if (has.unison && has.third && has.fifth && has.seventh) {
          name = 'tetrad';
        }
      }

      return name || 'unknown';
    },
    get: function get(interval) {
      if (typeof interval === 'string' && interval in knowledge.stepNumber) {
        var intervals = this.intervals,
            i,
            length;
        interval = knowledge.stepNumber[interval];

        for (i = 0, length = intervals.length; i < length; i++) {
          if (intervals[i].number() === interval) {
            return this.root.interval(intervals[i]);
          }
        }

        return null;
      } else {
        throw new Error('Invalid interval name');
      }
    },
    interval: function interval(_interval2) {
      return new Chord(this.root.interval(_interval2), this.symbol);
    },
    transpose: function transpose(interval) {
      this.root.transpose(interval);
      this.name = this.root.name().toUpperCase() + this.root.accidental() + this.symbol;
      return this;
    },
    toString: function toString() {
      return this.name;
    }
  };
  var chord = Chord;
  var scales = {
    aeolian: ['P1', 'M2', 'm3', 'P4', 'P5', 'm6', 'm7'],
    blues: ['P1', 'm3', 'P4', 'd5', 'P5', 'm7'],
    chromatic: ['P1', 'm2', 'M2', 'm3', 'M3', 'P4', 'A4', 'P5', 'm6', 'M6', 'm7', 'M7'],
    dorian: ['P1', 'M2', 'm3', 'P4', 'P5', 'M6', 'm7'],
    doubleharmonic: ['P1', 'm2', 'M3', 'P4', 'P5', 'm6', 'M7'],
    harmonicminor: ['P1', 'M2', 'm3', 'P4', 'P5', 'm6', 'M7'],
    ionian: ['P1', 'M2', 'M3', 'P4', 'P5', 'M6', 'M7'],
    locrian: ['P1', 'm2', 'm3', 'P4', 'd5', 'm6', 'm7'],
    lydian: ['P1', 'M2', 'M3', 'A4', 'P5', 'M6', 'M7'],
    majorpentatonic: ['P1', 'M2', 'M3', 'P5', 'M6'],
    melodicminor: ['P1', 'M2', 'm3', 'P4', 'P5', 'M6', 'M7'],
    minorpentatonic: ['P1', 'm3', 'P4', 'P5', 'm7'],
    mixolydian: ['P1', 'M2', 'M3', 'P4', 'P5', 'M6', 'm7'],
    phrygian: ['P1', 'm2', 'm3', 'P4', 'P5', 'm6', 'm7'],
    wholetone: ['P1', 'M2', 'M3', 'A4', 'A5', 'A6']
  }; // synonyms

  scales.harmonicchromatic = scales.chromatic;
  scales.minor = scales.aeolian;
  scales.major = scales.ionian;
  scales.flamenco = scales.doubleharmonic;

  function Scale(tonic, scale) {
    if (!(this instanceof Scale)) return new Scale(tonic, scale);
    var scaleName, i;

    if (!('coord' in tonic)) {
      throw new Error('Invalid Tonic');
    }

    if (typeof scale === 'string') {
      scaleName = scale;
      scale = scales[scale];
      if (!scale) throw new Error('Invalid Scale');
    } else {
      for (i in scales) {
        if (scales.hasOwnProperty(i)) {
          if (scales[i].toString() === scale.toString()) {
            scaleName = i;
            break;
          }
        }
      }
    }

    this.name = scaleName;
    this.tonic = tonic;
    this.scale = scale;
  }

  Scale.prototype = {
    notes: function notes() {
      var notes = [];

      for (var i = 0, length = this.scale.length; i < length; i++) {
        notes.push(this.tonic.interval(this.scale[i]));
      }

      return notes;
    },
    simple: function simple() {
      return this.notes().map(function (n) {
        return n.toString(true);
      });
    },
    type: function type() {
      var length = this.scale.length - 2;

      if (length < 8) {
        return ['di', 'tri', 'tetra', 'penta', 'hexa', 'hepta', 'octa'][length] + 'tonic';
      }
    },
    get: function get(i) {
      var isStepStr = typeof i === 'string' && i in knowledge.stepNumber;
      i = isStepStr ? knowledge.stepNumber[i] : i;
      var len = this.scale.length;
      var interval$1, octaves;

      if (i < 0) {
        interval$1 = this.scale[i % len + len - 1];
        octaves = Math.floor((i - 1) / len);
      } else if (i % len === 0) {
        interval$1 = this.scale[len - 1];
        octaves = i / len - 1;
      } else {
        interval$1 = this.scale[i % len - 1];
        octaves = Math.floor(i / len);
      }

      return this.tonic.interval(interval$1).interval(new _interval([octaves, 0]));
    },
    solfege: function solfege(index, showOctaves) {
      if (index) return this.get(index).solfege(this, showOctaves);
      return this.notes().map(function (n) {
        return n.solfege(this, showOctaves);
      });
    },
    interval: function interval(interval$1) {
      interval$1 = typeof interval$1 === 'string' ? _interval.toCoord(interval$1) : interval$1;
      return new Scale(this.tonic.interval(interval$1), this.scale);
    },
    transpose: function transpose(interval) {
      var scale = this.interval(interval);
      this.scale = scale.scale;
      this.tonic = scale.tonic;
      return this;
    }
  };
  Scale.KNOWN_SCALES = Object.keys(scales);
  var scale = Scale;

  var sugar = function sugar(teoria) {
    var Note = teoria.Note;
    var Chord = teoria.Chord;
    var Scale = teoria.Scale;

    Note.prototype.chord = function (chord) {
      var isShortChord = (chord in knowledge.chordShort);
      chord = isShortChord ? knowledge.chordShort[chord] : chord;
      return new Chord(this, chord);
    };

    Note.prototype.scale = function (scale) {
      return new Scale(this, scale);
    };
  };

  var teoria_1 = createCommonjsModule(function (module, exports) {
    var teoria; // never thought I would write this, but: Legacy support

    function intervalConstructor(from, to) {
      // Construct a Interval object from string representation
      if (typeof from === 'string') return _interval.toCoord(from);
      if (typeof to === 'string' && from instanceof note) return _interval.from(from, _interval.toCoord(to));
      if (to instanceof _interval && from instanceof note) return _interval.from(from, to);
      if (to instanceof note && from instanceof note) return _interval.between(from, to);
      throw new Error('Invalid parameters');
    }

    intervalConstructor.toCoord = _interval.toCoord;
    intervalConstructor.from = _interval.from;
    intervalConstructor.between = _interval.between;
    intervalConstructor.invert = _interval.invert;

    function noteConstructor(name, duration) {
      if (typeof name === 'string') return note.fromString(name, duration);else return new note(name, duration);
    }

    noteConstructor.fromString = note.fromString;
    noteConstructor.fromKey = note.fromKey;
    noteConstructor.fromFrequency = note.fromFrequency;
    noteConstructor.fromMIDI = note.fromMIDI;

    function chordConstructor(name, symbol) {
      if (typeof name === 'string') {
        var root, octave;
        root = name.match(/^([a-h])(x|#|bb|b?)/i);

        if (root && root[0]) {
          octave = typeof symbol === 'number' ? symbol.toString(10) : '4';
          return new chord(note.fromString(root[0].toLowerCase() + octave), name.substr(root[0].length));
        }
      } else if (name instanceof note) return new chord(name, symbol);

      throw new Error('Invalid Chord. Couldn\'t find note name');
    }

    function scaleConstructor(tonic, scale$1) {
      tonic = tonic instanceof note ? tonic : teoria.note(tonic);
      return new scale(tonic, scale$1);
    }

    teoria = {
      note: noteConstructor,
      chord: chordConstructor,
      interval: intervalConstructor,
      scale: scaleConstructor,
      Note: note,
      Chord: chord,
      Scale: scale,
      Interval: _interval
    };
    sugar(teoria);
    module.exports = teoria;
  });
  var interopRequireDefault = createCommonjsModule(function (module) {
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        "default": obj
      };
    }

    module.exports = _interopRequireDefault;
    module.exports["default"] = module.exports, module.exports.__esModule = true;
  });
  var require$$4 = /*@__PURE__*/getAugmentedNamespace(defineProperty);
  var require$$5 = /*@__PURE__*/getAugmentedNamespace(toArray);
  var require$$6 = /*@__PURE__*/getAugmentedNamespace(toConsumableArray);
  var require$$7 = /*@__PURE__*/getAugmentedNamespace(classCallCheck);
  var require$$8 = /*@__PURE__*/getAugmentedNamespace(createClass);
  var require$$9 = /*@__PURE__*/getAugmentedNamespace(slicedToArray);
  var require$$10 = /*@__PURE__*/getAugmentedNamespace(_typeof$1);
  var bachJs_esm = createCommonjsModule(function (module, exports) {
    (function (global, factory) {
      {
        factory(exports, concat, slice$2, map, filter, includes, set, sort, flatMap, values, keys, reduce, entries, every, find, isArray$2, require$$4, require$$5, require$$6, require$$7, require$$8, require$$9, require$$10, teoria_1);
      }
    })(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : commonjsGlobal, function (_exports, _concat, _slice, _map, _filter, _includes, _set, _sort, _flatMap, _values, _keys, _reduce, _entries, _every, _find, _isArray, _defineProperty2, _toArray2, _toConsumableArray2, _classCallCheck2, _createClass2, _slicedToArray2, _typeof2, _teoria) {
      var _interopRequireDefault = interopRequireDefault;
      defineProperty$6(_exports, "__esModule", {
        value: true
      });
      _exports.chordify = chordify;
      _exports.clamp = _clamp;
      _exports.gcd = gcd;
      _exports.invlerp = invlerp;
      _exports.lerp = lerp;
      _exports.notesIn = notesIn;
      _exports.notesInChord = notesInChord;
      _exports.notesInScale = notesInScale;
      _exports.notesIntersect = notesIntersect;
      _exports.scaleToString = scaleToString;
      _exports.scaleify = scaleify;
      _exports.steps = steps;
      _exports.unitsOf = _exports.timesOf = _exports.notesOf = _exports.compose = _exports.Note = _exports.Music = _exports.MUSICAL_ELEMENTS = _exports.Elements = _exports.Element = _exports.Durations = void 0;
      _concat = _interopRequireDefault(_concat);
      _slice = _interopRequireDefault(_slice);
      _map = _interopRequireDefault(_map);
      _filter = _interopRequireDefault(_filter);
      _includes = _interopRequireDefault(_includes);
      _set = _interopRequireDefault(_set);
      _sort = _interopRequireDefault(_sort);
      _flatMap = _interopRequireDefault(_flatMap);
      _values = _interopRequireDefault(_values);
      _keys = _interopRequireDefault(_keys);
      _reduce = _interopRequireDefault(_reduce);
      _entries = _interopRequireDefault(_entries);
      _every = _interopRequireDefault(_every);
      _find = _interopRequireDefault(_find);
      _isArray = _interopRequireDefault(_isArray);
      _defineProperty2 = _interopRequireDefault(_defineProperty2);
      _toArray2 = _interopRequireDefault(_toArray2);
      _toConsumableArray2 = _interopRequireDefault(_toConsumableArray2);
      _classCallCheck2 = _interopRequireDefault(_classCallCheck2);
      _createClass2 = _interopRequireDefault(_createClass2);
      _slicedToArray2 = _interopRequireDefault(_slicedToArray2);
      _typeof2 = _interopRequireDefault(_typeof2);

      function ownKeys(object, enumerableOnly) {
        var keys$1 = keys(object);

        if (getOwnPropertySymbols) {
          var symbols = getOwnPropertySymbols(object);

          if (enumerableOnly) {
            symbols = filter(symbols).call(symbols, function (sym) {
              return getOwnPropertyDescriptor(object, sym).enumerable;
            });
          }

          keys$1.push.apply(keys$1, symbols);
        }

        return keys$1;
      }

      function _objectSpread(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i] != null ? arguments[i] : {};

          if (i % 2) {
            var _context32;

            forEach$1(_context32 = ownKeys(Object(source), true)).call(_context32, function (key) {
              (0, _defineProperty2["default"])(target, key, source[key]);
            });
          } else if (getOwnPropertyDescriptors) {
            defineProperties(target, getOwnPropertyDescriptors(source));
          } else {
            var _context33;

            forEach$1(_context33 = ownKeys(Object(source))).call(_context33, function (key) {
              defineProperty$6(target, key, getOwnPropertyDescriptor(source, key));
            });
          }
        }

        return target;
      }

      var bach = require('bach-cljs'); //.default
      // Either "composes" raw bach data into bach.json or, when provided an object, validates its structure as bach.json.
      // Main entry point for integrating with core bach ClojureScript library.


      var compose = function compose(source) {
        if (typeof source === 'string') {
          return bach.compose(source);
        }

        if ((0, _typeof2["default"])(source) === 'object') {
          // FIXME: Enable again once bach-json-schema is updated to v3
          // return valid(source)
          return source;
        }

        throw TypeError("Unsupported Bach.JSON data type (".concat((0, _typeof2["default"])(source), "). Must be a bach.json object or raw bach string."));
      };

      _exports.compose = compose;

      function scaleify(value) {
        var _context;

        if (typeof value === 'string') {
          var _value$split = value.split(' '),
              _value$split2 = (0, _slicedToArray2["default"])(_value$split, 2),
              tonic = _value$split2[0],
              type = _value$split2[1]; // TODO: Potentially use type.toLowerCase instead, to guarantee smooth interopability


          return (0, _teoria.scale)(tonic, type.toLowerCase());
        } else if (value instanceof _teoria.Scale) {
          return value;
        }

        throw TypeError((0, _concat["default"])(_context = "Unknown scale type (".concat((0, _typeof2["default"])(value), "): ")).call(_context, value));
      }

      function chordify(value) {
        var _context2;

        if (typeof value === 'string') {
          return (0, _teoria.chord)(value);
        } else if (value instanceof _teoria.Chord) {
          return value;
        }

        throw TypeError((0, _concat["default"])(_context2 = "Unknown chord type (".concat((0, _typeof2["default"])(value), "): ")).call(_context2, value));
      }

      function scaleToString(scale) {
        var _context3, _context4;

        return (0, _concat["default"])(_context3 = "".concat((0, _slice["default"])(_context4 = scale.tonic.toString()).call(_context4, 0, 2), " ")).call(_context3, scale.name);
      }

      function notesInChord(value) {
        var _context5;

        return (0, _map["default"])(_context5 = chordify(value).notes()).call(_context5, function (note) {
          return Note.valueOf(note);
        });
      }

      function notesInScale(value) {
        var _context6;

        return (0, _map["default"])(_context6 = scaleify(value).notes()).call(_context6, function (note) {
          return Note.valueOf(note);
        });
      }

      function notesIn(kind, value) {
        var notes = notesOf[kind];

        if (notes) {
          return notes(value);
        }

        return [];
      } // TODO: Allow custom note resolvers to be registered globally or locally so people can easily define their own semantics
      //  - Could call this `itemsOf` to be more generic and flexible


      var notesOf = {
        note: function note(value) {
          return value;
        },
        chord: function chord(value) {
          return notesInChord(value);
        },
        scale: function scale(value) {
          return notesInScale(value);
        },
        penta: function penta(value) {
          return notesInScale(value);
        }
      }; // TODO: Note.valueOf

      _exports.notesOf = notesOf;

      function notesIntersect(left, right) {
        return (0, _filter["default"])(left).call(left, function (note) {
          return (0, _includes["default"])(right).call(right, note);
        });
      } // TODO: Use empty-schema (or another approach) to return default bach.json ehaders instead of empty object
      // export const headersOf = source => (source && source.headers) || {}
      // TODO: Remove


      var unitsOf = function unitsOf(source) {
        return {
          step: source.units.beat.step,
          pulse: source.units.beat.pulse,
          bar: source.units.bar.step,
          ms: 1 / source.units.time.bar
        };
      };

      _exports.unitsOf = unitsOf;

      var timesOf = function timesOf(source) {
        var _source$units$time = source.units.time,
            step = _source$units$time.step,
            pulse = _source$units$time.pulse,
            bar = _source$units$time.bar;
        return {
          ms: 1,
          second: 1000,
          step: step,
          pulse: pulse,
          bar: bar,
          's': step,
          'p': pulse,
          'm': bar,
          '2n': bar / 2,
          '4n': bar / 4,
          '8n': bar / 8,
          '16n': bar / 16,
          '32n': bar / 32,
          '64n': bar / 64,
          '4up': bar - bar / 4,
          '8up': bar - bar / 8
        };
      };

      _exports.timesOf = timesOf;

      var Note = /*#__PURE__*/function () {
        function Note() {
          (0, _classCallCheck2["default"])(this, Note);
        }

        (0, _createClass2["default"])(Note, null, [{
          key: "parse",
          value: function parse(value) {
            var _context7;

            if (typeof value === 'string') {
              return (0, _teoria.note)(value);
            } else if ((0, _typeof2["default"])(value) === 'object' || value instanceof _teoria.Note) {
              return value;
            }

            throw TypeError((0, _concat["default"])(_context7 = "Unknown note type (".concat((0, _typeof2["default"])(value), "): ")).call(_context7, value));
          }
        }, {
          key: "all",
          value: function all(kind, note) {
            try {
              return notesIn(kind, note);
            } catch (e) {
              return [];
            }
          }
        }, {
          key: "hash",
          value: function hash(note) {
            return Note.parse(note).chroma();
          }
        }, {
          key: "pitchOf",
          value: function pitchOf(note) {
            return Note.valueOf(note);
          } // TODO: Consider using chroma instead
          // TODO: Use this in nek, and anywhere else this same logic might be used

        }, {
          key: "valueOf",
          value: function valueOf(note) {
            return Note.parse(note).scientific() // .toLowerCase()
            // TODO: Centralize! Replace everywhere in bach-sheet, nek, etc.
            .replace(/[0-9]+$/, '');
          }
        }, {
          key: "valuesOf",
          value: function valuesOf(notes) {
            return (0, _map["default"])(notes).call(notes, Note.valueOf);
          }
        }, {
          key: "generalize",
          value: function generalize(note$1) {
            return (0, _teoria.note)(Note.valueOf(note$1));
          }
        }, {
          key: "unite",
          value: function unite() {
            var notes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
            return (0, _toConsumableArray2["default"])(new _set["default"](Note.valuesOf(notes)));
          }
        }, {
          key: "equals",
          value: function equals(left, right) {
            return Note.hash(left) == Note.hash(right);
          }
        }]);
        return Note;
      }();
      /**
       * Recursively calculates the greatest common denominator (GCD) between two values
       *
       * @param {Number} a
       * @param {Number} b
       * @returns {Number}
       */


      _exports.Note = Note;

      function gcd(a, b) {
        if (b == 0) {
          return a;
        }

        return gcd(b, a % b);
      }
      /**
       * Modifies a value so that it is always between the provided min and max
       *
       * @param {Number} value
       * @param {Number} min
       * @param {Number} max
       * @returns {Number}
       */


      function _clamp(value) {
        var min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
        return Math.min(max, Math.max(min, value));
      }
      /**
       * Interpolation function returning the value between x and y at a specific ratio
       *
       * @param {Number} value
       * @param {Number} x
       * @param {Number} y
       * @returns {Number}
       */


      function lerp(ratio, x, y) {
        return x * (1 - ratio) + y * ratio;
      }
      /**
       * Interpolation function returning the ratio of a value clamped between x and y
       *
       * @param {Number} value
       * @param {Number} x
       * @param {Number} y
       * @returns {Number}
       */


      function invlerp(value, x, y) {
        return _clamp((value - x) / (y - x));
      }
      /**
       * Determines the element found in an array at a given ratio
       *
       * @param {Float} ratio
       * @param {Array} all
       */


      function steps(ratio, all) {
        ratio %= 1;
        if (ratio < 0) ratio += 1;
        return all[Math.floor(ratio * all.length)];
      }

      var Durations = /*#__PURE__*/function () {
        function Durations(source) {
          (0, _classCallCheck2["default"])(this, Durations);
          this.source = compose(source);
        }

        (0, _createClass2["default"])(Durations, [{
          key: "steps",
          get: function get() {
            // return this.source.signals
            return this.source.steps;
          }
        }, {
          key: "metrics",
          get: function get() {
            return this.source.metrics;
          }
        }, {
          key: "min",
          get: function get() {
            return this.metrics.min;
          }
        }, {
          key: "max",
          get: function get() {
            return this.metrics.max;
          }
        }, {
          key: "total",
          get: function get() {
            return this.metrics.total;
          }
        }, {
          key: "step",
          get: function get() {
            return this.units.step;
          }
        }, {
          key: "pulse",
          get: function get() {
            return this.units.pulse;
          }
        }, {
          key: "bar",
          get: function get() {
            return this.units.bar;
          }
        }, {
          key: "units",
          get: function get() {
            // TODO: Remove, just return this.units
            return unitsOf(this.source);
          }
        }, {
          key: "times",
          get: function get() {
            return timesOf(this.source);
          }
        }, {
          key: "interval",
          get: function get() {
            return this.times.step;
          }
        }, {
          key: "cast",
          value: function cast(duration) {
            var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
                _ref$is = _ref.is,
                is = _ref$is === void 0 ? 'step' : _ref$is,
                _ref$as = _ref.as,
                as = _ref$as === void 0 ? 'pulse' : _ref$as;

            return duration / (this.times[as] / this.times[is]);
          }
        }, {
          key: "metronize",
          value: function metronize(duration) {
            var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
                _ref2$is = _ref2.is,
                is = _ref2$is === void 0 ? 'ms' : _ref2$is,
                _ref2$as = _ref2.as,
                as = _ref2$as === void 0 ? 'pulse' : _ref2$as;

            var index = this.cast(duration, {
              is: is,
              as: as
            });
            var bar = this.cast(this.bar, {
              as: as
            });
            return Math.floor(index % bar);
          }
        }, {
          key: "ratio",
          value: function ratio(duration) {
            var is = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'step';
            return this.cast(duration, {
              is: is,
              as: 'step'
            }) / this.total;
          }
        }, {
          key: "percentage",
          value: function percentage(duration) {
            var is = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'step';
            return this.ratio(duration, is) * 100;
          }
        }, {
          key: "clamp",
          value: function clamp(duration) {
            var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
                _ref3$is = _ref3.is,
                is = _ref3$is === void 0 ? 'step' : _ref3$is,
                _ref3$min = _ref3.min,
                min = _ref3$min === void 0 ? 0 : _ref3$min,
                max = _ref3.max;

            var step = this.cast(duration, {
              is: is,
              as: 'step'
            });
            var head = this.cast(min || 0, {
              is: is,
              as: 'step'
            });
            var tail = this.cast(max || this.total, {
              is: is,
              as: 'step'
            });
            return _clamp(step, head, tail);
          }
        }, {
          key: "cyclic",
          value: function cyclic(duration) {
            var _ref4 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
                _ref4$is = _ref4.is,
                is = _ref4$is === void 0 ? 'step' : _ref4$is,
                _ref4$min = _ref4.min,
                min = _ref4$min === void 0 ? 0 : _ref4$min,
                max = _ref4.max;

            this.cast(duration, {
              is: is,
              as: 'step'
            });
            var head = this.cast(min || 0, {
              is: is,
              as: 'step'
            });
            var tail = this.cast(max || this.total, {
              is: is,
              as: 'step'
            });
            var key = duration >= head ? duration : duration + tail;
            return key % tail;
          }
        }, {
          key: "interpolate",
          value: function interpolate(ratio) {
            var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
                _ref5$is = _ref5.is,
                is = _ref5$is === void 0 ? 'step' : _ref5$is,
                _ref5$min = _ref5.min,
                min = _ref5$min === void 0 ? 0 : _ref5$min,
                max = _ref5.max;

            var head = this.cast(min || 0, {
              is: is,
              as: 'step'
            });
            var tail = this.cast(max || this.total, {
              is: is,
              as: 'step'
            });
            return lerp(ratio, head, tail);
          }
        }, {
          key: "at",
          value: function at(duration) {
            var is = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'step';
            var step = this.cast(duration, {
              is: is,
              as: 'step'
            });
            var index = this.cyclic(step);
            var state = this.steps[index];

            var _state = (0, _slicedToArray2["default"])(state, 3),
                _state$ = (0, _toArray2["default"])(_state[0]),
                beat = _state$[0];

            (0, _slice["default"])(_state$).call(_state$, 1);
            var play = _state[1],
                stop = _state[2];
            return {
              beat: beat,
              // TODO: Add once tests are updated
              // elem,
              play: play,
              stop: stop,
              index: index
            }; // return Object.entries(this.steps)
            //   .reduce((acc, [key, steps]) => ({
            //     ...acc,
            //     [key]: steps[index]
            //   }), { index })
          } // TODO: Either replace or improve via inspiration with this:
          // @see: https://tonejs.github.io/docs/r13/Time#quantize

        }, {
          key: "rhythmic",
          value: function rhythmic(duration) {
            var _context8,
                _this = this;

            var _ref6 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
                _ref6$is = _ref6.is,
                is = _ref6$is === void 0 ? 'ms' : _ref6$is,
                _ref6$units = _ref6.units,
                units = _ref6$units === void 0 ? ['8n', '4n'] : _ref6$units,
                _ref6$calc = _ref6.calc,
                calc = _ref6$calc === void 0 ? 'floor' : _ref6$calc,
                _ref6$size = _ref6.size,
                size = _ref6$size === void 0 ? 'min' : _ref6$size;

            var durations = (0, _sort["default"])(_context8 = (0, _map["default"])(units).call(units, function (unit) {
              var value = _this.cast(duration, {
                is: is,
                as: unit
              });

              var result = Math[calc](value);
              return _this.cast(result, {
                is: unit,
                as: is
              });
            })).call(_context8, function (a, b) {
              return Math.abs(duration - a) - Math.abs(duration - b);
            });
            return Math[size].apply(Math, (0, _toConsumableArray2["default"])(durations));
          }
        }]);
        return Durations;
      }(); // import { elementize } from 'bach-cljs'


      _exports.Durations = Durations;

      var _require = require('bach-cljs'),
          elementize = _require.elementize;
      /**
       * Represents a single and unique playable element.
       * Uniqueness and equality are determined by `id`.
       */


      var Element = /*#__PURE__*/function () {
        function Element(data) {
          (0, _classCallCheck2["default"])(this, Element);
          this.data = data;
        }

        (0, _createClass2["default"])(Element, [{
          key: "id",
          get: function get() {
            var _context9;

            return (0, _concat["default"])(_context9 = "".concat(this.data.kind, ".")).call(_context9, this.data.id);
          }
        }, {
          key: "uid",
          get: function get() {
            return Element.uid(this.id);
          }
        }, {
          key: "value",
          get: function get() {
            return this.data.value;
          }
        }, {
          key: "props",
          get: function get() {
            return this.data.props || [];
          }
        }, {
          key: "kind",
          get: function get() {
            return this.data.kind; //.toLowerCase()
          }
        }, {
          key: "duration",
          get: function get() {
            return this.data.duration;
          }
        }, {
          key: "notes",
          get: function get() {
            return Note.all(this.kind, this.value);
          } // TODO: Hoist out to Music, leaky abstraction

        }, {
          key: "musical",
          get: function get() {
            return (0, _includes["default"])(MUSICAL_ELEMENTS).call(MUSICAL_ELEMENTS, this.kind);
          }
        }], [{
          key: "uid",
          value: function uid(id) {
            return id.split('.').pop();
          }
        }]);
        return Element;
      }();

      _exports.Element = Element;

      var Elements = /*#__PURE__*/function () {
        function Elements() {
          var _ref7 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
              source = _ref7.source,
              store = _ref7.store,
              cast = _ref7.cast;

          (0, _classCallCheck2["default"])(this, Elements);
          this.source = compose(source);

          this.cast = cast || function (_) {
            return _;
          };

          this.data = store || Elements.cast(this.source.elements, cast);
        }

        (0, _createClass2["default"])(Elements, [{
          key: "all",
          get: function get() {
            var _context10,
                _this2 = this;

            return (0, _flatMap["default"])(_context10 = this.kinds).call(_context10, function (kind) {
              var _context11;

              return (0, _map["default"])(_context11 = (0, _values["default"])(_this2.data[kind])).call(_context11, function (elem) {
                return new Element(elem);
              });
            });
          }
        }, {
          key: "kinds",
          get: function get() {
            return (0, _keys["default"])(this.data);
          }
        }, {
          key: "values",
          get: function get() {
            var _context12;

            return (0, _map["default"])(_context12 = this.all).call(_context12, function (elem) {
              return elem.value;
            });
          }
        }, {
          key: "ids",
          get: function get() {
            var _context13;

            return (0, _map["default"])(_context13 = this.all).call(_context13, function (elem) {
              return elem.id;
            });
          }
        }, {
          key: "get",
          value: function get(id) {
            var parts = typeof id === 'string' ? id.split('.') : [];

            if (parts.length === 2) {
              var _parts = (0, _slicedToArray2["default"])(parts, 2),
                  kind = _parts[0],
                  uid = _parts[1];

              var elem = this.data[kind][uid];
              return elem ? _objectSpread(_objectSpread({}, elem), {}, {
                id: uid,
                kind: kind
              }) : null;
            }

            throw TypeError('Element id must be a string in the format of "kind.hash"');
          }
        }, {
          key: "resolve",
          value: function resolve(elem) {
            // FIXME: Use json-schema validator here instead to support cross-context typing (instanceof doesn't work from workers etc.)
            // if (elem instanceof Element) return elem
            if ((0, _typeof2["default"])(elem) === 'object') return elem;
            if (typeof elem === 'string') return this.get(elem); // if (typeof elem === 'object') return new Element(this.cast(elem))

            throw TypeError('Failed to resolve element due to unsupported data type');
          } // TODO: Rename to `insert`

        }, {
          key: "register",
          value: function register(_ref8) {
            var _context14;

            var kind = _ref8.kind,
                value = _ref8.value,
                props = _ref8.props;
            if (!kind || typeof kind !== 'string') throw TypeError('kind must be a non-empty string');
            if (value == null) throw TypeError('value must be defined and non-null');
            var elem = elementize(kind, (0, _concat["default"])(_context14 = [value]).call(_context14, (0, _toConsumableArray2["default"])(props)));
            var uid = Element.uid(elem.id);
            var record = this.cast(_objectSpread(_objectSpread({}, elem), {}, {
              id: uid,
              kind: kind
            }));
            this.data[kind] = this.data[kind] || {};
            this.data[kind][uid] = record;
            this.source.elements = this.data;
            return new Element(record);
          }
        }], [{
          key: "cast",
          value: function cast(elements) {
            var _context15;

            var as = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (_) {
              return _;
            };
            if (!elements) return null; // TODO: Validate element shape with JSON Schema

            return (0, _reduce["default"])(_context15 = (0, _entries["default"])(elements)).call(_context15, function (acc, _ref9) {
              var _context16;

              var _ref10 = (0, _slicedToArray2["default"])(_ref9, 2),
                  kind = _ref10[0],
                  ids = _ref10[1];

              var elems = (0, _reduce["default"])(_context16 = (0, _entries["default"])(ids)).call(_context16, function (acc, _ref11) {
                var _ref12 = (0, _slicedToArray2["default"])(_ref11, 2),
                    id = _ref12[0],
                    elem = _ref12[1];

                return _objectSpread(_objectSpread({}, acc), {}, (0, _defineProperty2["default"])({}, id, as(_objectSpread({
                  id: id,
                  kind: kind
                }, elem))));
              }, {});
              return _objectSpread(_objectSpread({}, acc), {}, (0, _defineProperty2["default"])({}, kind, elems));
            }, {});
          }
        }]);
        return Elements;
      }(); // TODO: Hoist out to Music, leaky abstraction


      _exports.Elements = Elements;
      var MUSICAL_ELEMENTS = ['note', 'chord', 'scale', ' penta']; // triad

      /**
       * Represents a single beat in a track.
       *
       * Beats are represented as a tuple and may contain multiple elements
       *
       * duration -> items -> elements
       */

      _exports.MUSICAL_ELEMENTS = MUSICAL_ELEMENTS;

      var Beat = /*#__PURE__*/function () {
        function Beat(data, store) {
          (0, _classCallCheck2["default"])(this, Beat);
          this.data = data;
          this.store = store;
        }

        (0, _createClass2["default"])(Beat, [{
          key: "id",
          get: function get() {
            return this.data.id;
          }
        }, {
          key: "index",
          get: function get() {
            return this.data.index;
          }
        }, {
          key: "duration",
          get: function get() {
            return this.data.duration;
          }
        }, {
          key: "items",
          get: function get() {
            var _context17,
                _this3 = this;

            return (0, _map["default"])(_context17 = this.data.items).call(_context17, function (item) {
              var _context18;

              return _objectSpread(_objectSpread({}, item), {}, {
                elements: (0, _map["default"])(_context18 = item.elements).call(_context18, function (elem) {
                  return _this3.store.resolve(elem);
                })
              });
            });
          }
        }, {
          key: "elements",
          get: function get() {
            var _context19,
                _this4 = this;

            return (0, _flatMap["default"])(_context19 = this.data.items).call(_context19, function (_ref13) {
              var elements = _ref13.elements;
              return (0, _map["default"])(elements).call(elements, function (elem) {
                return _this4.store.resolve(elem);
              });
            });
          }
        }, {
          key: "kinds",
          get: function get() {
            return this.all(function (_ref14) {
              var kind = _ref14.kind;
              return kind;
            });
          }
        }, {
          key: "values",
          get: function get() {
            return this.all(function (_ref15) {
              var value = _ref15.value;
              return value;
            });
          }
        }, {
          key: "notes",
          get: function get() {
            // return Note.unite(this.elements.flatMap(({ notes }) => notes))
            return this.notesOf(this.elements);
          } // Provides map of elements in a beat grouped by kind.
          // FIXME: Doesn't support multiple elements of the same kind

        }, {
          key: "parts",
          get: function get() {
            var _context20;

            return (0, _reduce["default"])(_context20 = this.elements).call(_context20, function (parts, elem) {
              return _objectSpread(_objectSpread({}, parts), {}, (0, _defineProperty2["default"])({}, elem.kind, elem));
            }, {});
          }
        }, {
          key: "musical",
          get: function get() {
            var _context21;

            return (0, _every["default"])(_context21 = this.elements).call(_context21, function (elem) {
              return elem.musical;
            });
          }
        }, {
          key: "all",
          value: function all() {
            var _context22;

            var cast = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function (_) {
              return _;
            };
            return (0, _toConsumableArray2["default"])(new _set["default"]((0, _map["default"])(_context22 = this.elements).call(_context22, cast)));
          }
        }, {
          key: "find",
          value: function find(kind) {
            var _context23;

            return (0, _find["default"])(_context23 = this.elements).call(_context23, function (elem) {
              return kind === elem.kind;
            });
          }
        }, {
          key: "filter",
          value: function filter(kind) {
            var _context24;

            return (0, _filter["default"])(_context24 = this.elements).call(_context24, function (elem) {
              return kind === elem.kind;
            });
          } // first (kinds) {

        }, {
          key: "either",
          value: function either(kinds) {
            var _this5 = this;

            return (0, _reduce["default"])(kinds).call(kinds, function (acc, kind) {
              // return acc.length ? acc : this.elements.filter(elem => kind === elem.kind)
              return acc.length ? acc : (0, _filter["default"])(_this5).call(_this5, kind);
            }, []); // for (kind of kinds) {
            //   const elems = item.elements.filter(elem => kind === elem.kind)
            //   if (elems.length) return elems
            // }
          }
        }, {
          key: "notesOf",
          value: function notesOf(elements) {
            return Note.unite((0, _flatMap["default"])(elements).call(elements, function (_ref16) {
              var notes = _ref16.notes;
              return notes;
            }));
          }
        }], [{
          key: "from",
          value: function from(beats, store) {
            if ((0, _isArray["default"])(beats)) {
              return (0, _map["default"])(beats).call(beats, function (beat) {
                return new Beat(beat, store);
              });
            } // return new Beat(beats, store)


            return [new Beat(beats, store)];
          }
        }]);
        return Beat;
      }(); // export class BeatItem {
      //   constructor (data, beat) {
      //     this.data = data
      //     this.beat = beat
      //   }
      //   get duration () {
      //     return this.data.duration
      //   }
      //   get elements () {
      //     return this.data.elements.map(elem => this.beat.store.resolve(elem))
      //   }
      //   add (elem) {
      //     const record = this.beat.store.register(elem)
      //     this.data.elements = this.data.elements.concat(record.id)
      //     return this
      //   }
      // }
      // NOTE: Basically Track v3. Probably just rename to Track eventually.


      var Music = /*#__PURE__*/function () {
        function Music(source) {
          (0, _classCallCheck2["default"])(this, Music);
          this.source = source;
          this.data = compose(source);
          this.store = this.parses ? new Elements({
            source: this.data,
            cast: function cast(elem) {
              return _objectSpread(_objectSpread({}, elem), {}, {
                notes: Note.all(elem.kind, elem.value)
              });
            }
          }) : null; // console.log('COMPOSED DATA (2)', this.data)
        }

        (0, _createClass2["default"])(Music, [{
          key: "headers",
          get: function get() {
            return this.data.headers;
          }
        }, {
          key: "metrics",
          get: function get() {
            return this.data.metrics;
          }
        }, {
          key: "units",
          get: function get() {
            return this.data.units;
          }
        }, {
          key: "meter",
          get: function get() {
            return this.headers.meter;
          }
        }, {
          key: "tempo",
          get: function get() {
            return this.headers.tempo;
          }
        }, {
          key: "elements",
          get: function get() {
            return this.store.all;
          }
        }, {
          key: "beats",
          get: function get() {
            return Beat.from(this.data.beats, this.store);
          }
        }, {
          key: "durations",
          get: function get() {
            return new Durations(this.data);
          }
        }, {
          key: "notes",
          get: function get() {
            var _context25;

            return Note.unite((0, _flatMap["default"])(_context25 = this.beats).call(_context25, function (beat) {
              var _context26;

              return (0, _flatMap["default"])(_context26 = beat.elements).call(_context26, function (_ref17) {
                var notes = _ref17.notes;
                return notes;
              });
            }));
          }
        }, {
          key: "musical",
          get: function get() {
            var _context27;

            return (0, _every["default"])(_context27 = this.beats).call(_context27, function (beat) {
              return beat.musical;
            });
          } // get playable () {
          //   return this.elements.every(({ notes }) => !!notes.length)
          // }

        }, {
          key: "step",
          get: function get() {
            return this.units.beat.step;
          }
        }, {
          key: "interval",
          get: function get() {
            return this.units.time.step;
          }
        }, {
          key: "parses",
          get: function get() {
            return !this.data.fail;
          }
        }, {
          key: "at",
          value: function at(duration) {
            var _context28,
                _this6 = this,
                _context29;

            var is = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'step';
            var cursor = this.durations.at(duration, is);
            return {
              beat: this.beats[cursor.beat],
              play: (0, _map["default"])(_context28 = cursor.play || []).call(_context28, function (elem) {
                return _this6.store.resolve(elem);
              }),
              stop: (0, _map["default"])(_context29 = cursor.stop || []).call(_context29, function (elem) {
                return _this6.store.resolve(elem);
              })
            };
          } // add (id, elem) {
          // insert
          // TODO: Probably move to `rebach` package

        }, {
          key: "add",
          value: function add(record) {
            var _context30, _context31;

            var beat = (0, _find["default"])(_context30 = this.beats).call(_context30, function (beat) {
              return beat.id == record.beat;
            });
            var elem = this.store.register(record.elem);
            console.log('adding beat', record, beat, (0, _map["default"])(_context31 = this.beats).call(_context31, function (_ref18) {
              var id = _ref18.id;
              return id;
            }));
            this.data.beats[beat.id].items[record.item || 0].elements.push(elem); // const item = this.data.beats[beat].items[record.item || 0]
            // const stop = this.durations.cyclic(beat.index + item.duration)
            // beat

            this.data.steps[beat.index][0].push(elem.id); // play

            this.data.steps[beat.index][1].push(elem.id); // stop

            this.data.steps[beat.index][2].push(elem.id); // TODO: Add to `steps`!
            // return this

            return new Element(elem);
          }
        }, {
          key: "adjust",
          value: function adjust(tempo) {}
        }]);
        return Music;
      }();

      _exports.Music = Music;
    });
  });
  /*!
   *  howler.js v2.2.1
   *  howlerjs.com
   *
   *  (c) 2013-2020, James Simpson of GoldFire Studios
   *  goldfirestudios.com
   *
   *  MIT License
   */

  var howler = createCommonjsModule(function (module, exports) {
    (function () {
      /** Global Methods **/

      /***************************************************************************/

      /**
       * Create the global controller. All contained methods and properties apply
       * to all sounds that are currently playing or will be in the future.
       */
      var HowlerGlobal = function HowlerGlobal() {
        this.init();
      };

      HowlerGlobal.prototype = {
        /**
         * Initialize the global Howler object.
         * @return {Howler}
         */
        init: function init() {
          var self = this || Howler; // Create a global ID counter.

          self._counter = 1000; // Pool of unlocked HTML5 Audio objects.

          self._html5AudioPool = [];
          self.html5PoolSize = 10; // Internal properties.

          self._codecs = {};
          self._howls = [];
          self._muted = false;
          self._volume = 1;
          self._canPlayEvent = 'canplaythrough';
          self._navigator = typeof window !== 'undefined' && window.navigator ? window.navigator : null; // Public properties.

          self.masterGain = null;
          self.noAudio = false;
          self.usingWebAudio = true;
          self.autoSuspend = true;
          self.ctx = null; // Set to false to disable the auto audio unlocker.

          self.autoUnlock = true; // Setup the various state values for global tracking.

          self._setup();

          return self;
        },

        /**
         * Get/set the global volume for all sounds.
         * @param  {Float} vol Volume from 0.0 to 1.0.
         * @return {Howler/Float}     Returns self or current volume.
         */
        volume: function volume(vol) {
          var self = this || Howler;
          vol = parseFloat(vol); // If we don't have an AudioContext created yet, run the setup.

          if (!self.ctx) {
            setupAudioContext();
          }

          if (typeof vol !== 'undefined' && vol >= 0 && vol <= 1) {
            self._volume = vol; // Don't update any of the nodes if we are muted.

            if (self._muted) {
              return self;
            } // When using Web Audio, we just need to adjust the master gain.


            if (self.usingWebAudio) {
              self.masterGain.gain.setValueAtTime(vol, Howler.ctx.currentTime);
            } // Loop through and change volume for all HTML5 audio nodes.


            for (var i = 0; i < self._howls.length; i++) {
              if (!self._howls[i]._webAudio) {
                // Get all of the sounds in this Howl group.
                var ids = self._howls[i]._getSoundIds(); // Loop through all sounds and change the volumes.


                for (var j = 0; j < ids.length; j++) {
                  var sound = self._howls[i]._soundById(ids[j]);

                  if (sound && sound._node) {
                    sound._node.volume = sound._volume * vol;
                  }
                }
              }
            }

            return self;
          }

          return self._volume;
        },

        /**
         * Handle muting and unmuting globally.
         * @param  {Boolean} muted Is muted or not.
         */
        mute: function mute(muted) {
          var self = this || Howler; // If we don't have an AudioContext created yet, run the setup.

          if (!self.ctx) {
            setupAudioContext();
          }

          self._muted = muted; // With Web Audio, we just need to mute the master gain.

          if (self.usingWebAudio) {
            self.masterGain.gain.setValueAtTime(muted ? 0 : self._volume, Howler.ctx.currentTime);
          } // Loop through and mute all HTML5 Audio nodes.


          for (var i = 0; i < self._howls.length; i++) {
            if (!self._howls[i]._webAudio) {
              // Get all of the sounds in this Howl group.
              var ids = self._howls[i]._getSoundIds(); // Loop through all sounds and mark the audio node as muted.


              for (var j = 0; j < ids.length; j++) {
                var sound = self._howls[i]._soundById(ids[j]);

                if (sound && sound._node) {
                  sound._node.muted = muted ? true : sound._muted;
                }
              }
            }
          }

          return self;
        },

        /**
         * Handle stopping all sounds globally.
         */
        stop: function stop() {
          var self = this || Howler; // Loop through all Howls and stop them.

          for (var i = 0; i < self._howls.length; i++) {
            self._howls[i].stop();
          }

          return self;
        },

        /**
         * Unload and destroy all currently loaded Howl objects.
         * @return {Howler}
         */
        unload: function unload() {
          var self = this || Howler;

          for (var i = self._howls.length - 1; i >= 0; i--) {
            self._howls[i].unload();
          } // Create a new AudioContext to make sure it is fully reset.


          if (self.usingWebAudio && self.ctx && typeof self.ctx.close !== 'undefined') {
            self.ctx.close();
            self.ctx = null;
            setupAudioContext();
          }

          return self;
        },

        /**
         * Check for codec support of specific extension.
         * @param  {String} ext Audio file extention.
         * @return {Boolean}
         */
        codecs: function codecs(ext) {
          return (this || Howler)._codecs[ext.replace(/^x-/, '')];
        },

        /**
         * Setup various state values for global tracking.
         * @return {Howler}
         */
        _setup: function _setup() {
          var self = this || Howler; // Keeps track of the suspend/resume state of the AudioContext.

          self.state = self.ctx ? self.ctx.state || 'suspended' : 'suspended'; // Automatically begin the 30-second suspend process

          self._autoSuspend(); // Check if audio is available.


          if (!self.usingWebAudio) {
            // No audio is available on this system if noAudio is set to true.
            if (typeof Audio !== 'undefined') {
              try {
                var test = new Audio(); // Check if the canplaythrough event is available.

                if (typeof test.oncanplaythrough === 'undefined') {
                  self._canPlayEvent = 'canplay';
                }
              } catch (e) {
                self.noAudio = true;
              }
            } else {
              self.noAudio = true;
            }
          } // Test to make sure audio isn't disabled in Internet Explorer.


          try {
            var test = new Audio();

            if (test.muted) {
              self.noAudio = true;
            }
          } catch (e) {} // Check for supported codecs.


          if (!self.noAudio) {
            self._setupCodecs();
          }

          return self;
        },

        /**
         * Check for browser support for various codecs and cache the results.
         * @return {Howler}
         */
        _setupCodecs: function _setupCodecs() {
          var self = this || Howler;
          var audioTest = null; // Must wrap in a try/catch because IE11 in server mode throws an error.

          try {
            audioTest = typeof Audio !== 'undefined' ? new Audio() : null;
          } catch (err) {
            return self;
          }

          if (!audioTest || typeof audioTest.canPlayType !== 'function') {
            return self;
          }

          var mpegTest = audioTest.canPlayType('audio/mpeg;').replace(/^no$/, ''); // Opera version <33 has mixed MP3 support, so we need to check for and block it.

          var checkOpera = self._navigator && self._navigator.userAgent.match(/OPR\/([0-6].)/g);

          var isOldOpera = checkOpera && parseInt(checkOpera[0].split('/')[1], 10) < 33;
          self._codecs = {
            mp3: !!(!isOldOpera && (mpegTest || audioTest.canPlayType('audio/mp3;').replace(/^no$/, ''))),
            mpeg: !!mpegTest,
            opus: !!audioTest.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, ''),
            ogg: !!audioTest.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ''),
            oga: !!audioTest.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ''),
            wav: !!(audioTest.canPlayType('audio/wav; codecs="1"') || audioTest.canPlayType('audio/wav')).replace(/^no$/, ''),
            aac: !!audioTest.canPlayType('audio/aac;').replace(/^no$/, ''),
            caf: !!audioTest.canPlayType('audio/x-caf;').replace(/^no$/, ''),
            m4a: !!(audioTest.canPlayType('audio/x-m4a;') || audioTest.canPlayType('audio/m4a;') || audioTest.canPlayType('audio/aac;')).replace(/^no$/, ''),
            m4b: !!(audioTest.canPlayType('audio/x-m4b;') || audioTest.canPlayType('audio/m4b;') || audioTest.canPlayType('audio/aac;')).replace(/^no$/, ''),
            mp4: !!(audioTest.canPlayType('audio/x-mp4;') || audioTest.canPlayType('audio/mp4;') || audioTest.canPlayType('audio/aac;')).replace(/^no$/, ''),
            weba: !!audioTest.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, ''),
            webm: !!audioTest.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, ''),
            dolby: !!audioTest.canPlayType('audio/mp4; codecs="ec-3"').replace(/^no$/, ''),
            flac: !!(audioTest.canPlayType('audio/x-flac;') || audioTest.canPlayType('audio/flac;')).replace(/^no$/, '')
          };
          return self;
        },

        /**
         * Some browsers/devices will only allow audio to be played after a user interaction.
         * Attempt to automatically unlock audio on the first user interaction.
         * Concept from: http://paulbakaus.com/tutorials/html5/web-audio-on-ios/
         * @return {Howler}
         */
        _unlockAudio: function _unlockAudio() {
          var self = this || Howler; // Only run this if Web Audio is supported and it hasn't already been unlocked.

          if (self._audioUnlocked || !self.ctx) {
            return;
          }

          self._audioUnlocked = false;
          self.autoUnlock = false; // Some mobile devices/platforms have distortion issues when opening/closing tabs and/or web views.
          // Bugs in the browser (especially Mobile Safari) can cause the sampleRate to change from 44100 to 48000.
          // By calling Howler.unload(), we create a new AudioContext with the correct sampleRate.

          if (!self._mobileUnloaded && self.ctx.sampleRate !== 44100) {
            self._mobileUnloaded = true;
            self.unload();
          } // Scratch buffer for enabling iOS to dispose of web audio buffers correctly, as per:
          // http://stackoverflow.com/questions/24119684


          self._scratchBuffer = self.ctx.createBuffer(1, 1, 22050); // Call this method on touch start to create and play a buffer,
          // then check if the audio actually played to determine if
          // audio has now been unlocked on iOS, Android, etc.

          var unlock = function unlock(e) {
            // Create a pool of unlocked HTML5 Audio objects that can
            // be used for playing sounds without user interaction. HTML5
            // Audio objects must be individually unlocked, as opposed
            // to the WebAudio API which only needs a single activation.
            // This must occur before WebAudio setup or the source.onended
            // event will not fire.
            while (self._html5AudioPool.length < self.html5PoolSize) {
              try {
                var audioNode = new Audio(); // Mark this Audio object as unlocked to ensure it can get returned
                // to the unlocked pool when released.

                audioNode._unlocked = true; // Add the audio node to the pool.

                self._releaseHtml5Audio(audioNode);
              } catch (e) {
                self.noAudio = true;
                break;
              }
            } // Loop through any assigned audio nodes and unlock them.


            for (var i = 0; i < self._howls.length; i++) {
              if (!self._howls[i]._webAudio) {
                // Get all of the sounds in this Howl group.
                var ids = self._howls[i]._getSoundIds(); // Loop through all sounds and unlock the audio nodes.


                for (var j = 0; j < ids.length; j++) {
                  var sound = self._howls[i]._soundById(ids[j]);

                  if (sound && sound._node && !sound._node._unlocked) {
                    sound._node._unlocked = true;

                    sound._node.load();
                  }
                }
              }
            } // Fix Android can not play in suspend state.


            self._autoResume(); // Create an empty buffer.


            var source = self.ctx.createBufferSource();
            source.buffer = self._scratchBuffer;
            source.connect(self.ctx.destination); // Play the empty buffer.

            if (typeof source.start === 'undefined') {
              source.noteOn(0);
            } else {
              source.start(0);
            } // Calling resume() on a stack initiated by user gesture is what actually unlocks the audio on Android Chrome >= 55.


            if (typeof self.ctx.resume === 'function') {
              self.ctx.resume();
            } // Setup a timeout to check that we are unlocked on the next event loop.


            source.onended = function () {
              source.disconnect(0); // Update the unlocked state and prevent this check from happening again.

              self._audioUnlocked = true; // Remove the touch start listener.

              document.removeEventListener('touchstart', unlock, true);
              document.removeEventListener('touchend', unlock, true);
              document.removeEventListener('click', unlock, true); // Let all sounds know that audio has been unlocked.

              for (var i = 0; i < self._howls.length; i++) {
                self._howls[i]._emit('unlock');
              }
            };
          }; // Setup a touch start listener to attempt an unlock in.


          document.addEventListener('touchstart', unlock, true);
          document.addEventListener('touchend', unlock, true);
          document.addEventListener('click', unlock, true);
          return self;
        },

        /**
         * Get an unlocked HTML5 Audio object from the pool. If none are left,
         * return a new Audio object and throw a warning.
         * @return {Audio} HTML5 Audio object.
         */
        _obtainHtml5Audio: function _obtainHtml5Audio() {
          var self = this || Howler; // Return the next object from the pool if one exists.

          if (self._html5AudioPool.length) {
            return self._html5AudioPool.pop();
          } //.Check if the audio is locked and throw a warning.


          var testPlay = new Audio().play();

          if (testPlay && typeof Promise !== 'undefined' && (testPlay instanceof Promise || typeof testPlay.then === 'function')) {
            testPlay["catch"](function () {
              console.warn('HTML5 Audio pool exhausted, returning potentially locked audio object.');
            });
          }

          return new Audio();
        },

        /**
         * Return an activated HTML5 Audio object to the pool.
         * @return {Howler}
         */
        _releaseHtml5Audio: function _releaseHtml5Audio(audio) {
          var self = this || Howler; // Don't add audio to the pool if we don't know if it has been unlocked.

          if (audio._unlocked) {
            self._html5AudioPool.push(audio);
          }

          return self;
        },

        /**
         * Automatically suspend the Web Audio AudioContext after no sound has played for 30 seconds.
         * This saves processing/energy and fixes various browser-specific bugs with audio getting stuck.
         * @return {Howler}
         */
        _autoSuspend: function _autoSuspend() {
          var self = this;

          if (!self.autoSuspend || !self.ctx || typeof self.ctx.suspend === 'undefined' || !Howler.usingWebAudio) {
            return;
          } // Check if any sounds are playing.


          for (var i = 0; i < self._howls.length; i++) {
            if (self._howls[i]._webAudio) {
              for (var j = 0; j < self._howls[i]._sounds.length; j++) {
                if (!self._howls[i]._sounds[j]._paused) {
                  return self;
                }
              }
            }
          }

          if (self._suspendTimer) {
            clearTimeout(self._suspendTimer);
          } // If no sound has played after 30 seconds, suspend the context.


          self._suspendTimer = setTimeout(function () {
            if (!self.autoSuspend) {
              return;
            }

            self._suspendTimer = null;
            self.state = 'suspending'; // Handle updating the state of the audio context after suspending.

            var handleSuspension = function handleSuspension() {
              self.state = 'suspended';

              if (self._resumeAfterSuspend) {
                delete self._resumeAfterSuspend;

                self._autoResume();
              }
            }; // Either the state gets suspended or it is interrupted.
            // Either way, we need to update the state to suspended.


            self.ctx.suspend().then(handleSuspension, handleSuspension);
          }, 30000);
          return self;
        },

        /**
         * Automatically resume the Web Audio AudioContext when a new sound is played.
         * @return {Howler}
         */
        _autoResume: function _autoResume() {
          var self = this;

          if (!self.ctx || typeof self.ctx.resume === 'undefined' || !Howler.usingWebAudio) {
            return;
          }

          if (self.state === 'running' && self.ctx.state !== 'interrupted' && self._suspendTimer) {
            clearTimeout(self._suspendTimer);
            self._suspendTimer = null;
          } else if (self.state === 'suspended' || self.state === 'running' && self.ctx.state === 'interrupted') {
            self.ctx.resume().then(function () {
              self.state = 'running'; // Emit to all Howls that the audio has resumed.

              for (var i = 0; i < self._howls.length; i++) {
                self._howls[i]._emit('resume');
              }
            });

            if (self._suspendTimer) {
              clearTimeout(self._suspendTimer);
              self._suspendTimer = null;
            }
          } else if (self.state === 'suspending') {
            self._resumeAfterSuspend = true;
          }

          return self;
        }
      }; // Setup the global audio controller.

      var Howler = new HowlerGlobal();
      /** Group Methods **/

      /***************************************************************************/

      /**
       * Create an audio group controller.
       * @param {Object} o Passed in properties for this group.
       */

      var Howl = function Howl(o) {
        var self = this; // Throw an error if no source is provided.

        if (!o.src || o.src.length === 0) {
          console.error('An array of source files must be passed with any new Howl.');
          return;
        }

        self.init(o);
      };

      Howl.prototype = {
        /**
         * Initialize a new Howl group object.
         * @param  {Object} o Passed in properties for this group.
         * @return {Howl}
         */
        init: function init(o) {
          var self = this; // If we don't have an AudioContext created yet, run the setup.

          if (!Howler.ctx) {
            setupAudioContext();
          } // Setup user-defined default properties.


          self._autoplay = o.autoplay || false;
          self._format = typeof o.format !== 'string' ? o.format : [o.format];
          self._html5 = o.html5 || false;
          self._muted = o.mute || false;
          self._loop = o.loop || false;
          self._pool = o.pool || 5;
          self._preload = typeof o.preload === 'boolean' || o.preload === 'metadata' ? o.preload : true;
          self._rate = o.rate || 1;
          self._sprite = o.sprite || {};
          self._src = typeof o.src !== 'string' ? o.src : [o.src];
          self._volume = o.volume !== undefined ? o.volume : 1;
          self._xhr = {
            method: o.xhr && o.xhr.method ? o.xhr.method : 'GET',
            headers: o.xhr && o.xhr.headers ? o.xhr.headers : null,
            withCredentials: o.xhr && o.xhr.withCredentials ? o.xhr.withCredentials : false
          }; // Setup all other default properties.

          self._duration = 0;
          self._state = 'unloaded';
          self._sounds = [];
          self._endTimers = {};
          self._queue = [];
          self._playLock = false; // Setup event listeners.

          self._onend = o.onend ? [{
            fn: o.onend
          }] : [];
          self._onfade = o.onfade ? [{
            fn: o.onfade
          }] : [];
          self._onload = o.onload ? [{
            fn: o.onload
          }] : [];
          self._onloaderror = o.onloaderror ? [{
            fn: o.onloaderror
          }] : [];
          self._onplayerror = o.onplayerror ? [{
            fn: o.onplayerror
          }] : [];
          self._onpause = o.onpause ? [{
            fn: o.onpause
          }] : [];
          self._onplay = o.onplay ? [{
            fn: o.onplay
          }] : [];
          self._onstop = o.onstop ? [{
            fn: o.onstop
          }] : [];
          self._onmute = o.onmute ? [{
            fn: o.onmute
          }] : [];
          self._onvolume = o.onvolume ? [{
            fn: o.onvolume
          }] : [];
          self._onrate = o.onrate ? [{
            fn: o.onrate
          }] : [];
          self._onseek = o.onseek ? [{
            fn: o.onseek
          }] : [];
          self._onunlock = o.onunlock ? [{
            fn: o.onunlock
          }] : [];
          self._onresume = []; // Web Audio or HTML5 Audio?

          self._webAudio = Howler.usingWebAudio && !self._html5; // Automatically try to enable audio.

          if (typeof Howler.ctx !== 'undefined' && Howler.ctx && Howler.autoUnlock) {
            Howler._unlockAudio();
          } // Keep track of this Howl group in the global controller.


          Howler._howls.push(self); // If they selected autoplay, add a play event to the load queue.


          if (self._autoplay) {
            self._queue.push({
              event: 'play',
              action: function action() {
                self.play();
              }
            });
          } // Load the source file unless otherwise specified.


          if (self._preload && self._preload !== 'none') {
            self.load();
          }

          return self;
        },

        /**
         * Load the audio file.
         * @return {Howler}
         */
        load: function load() {
          var self = this;
          var url = null; // If no audio is available, quit immediately.

          if (Howler.noAudio) {
            self._emit('loaderror', null, 'No audio support.');

            return;
          } // Make sure our source is in an array.


          if (typeof self._src === 'string') {
            self._src = [self._src];
          } // Loop through the sources and pick the first one that is compatible.


          for (var i = 0; i < self._src.length; i++) {
            var ext, str;

            if (self._format && self._format[i]) {
              // If an extension was specified, use that instead.
              ext = self._format[i];
            } else {
              // Make sure the source is a string.
              str = self._src[i];

              if (typeof str !== 'string') {
                self._emit('loaderror', null, 'Non-string found in selected audio sources - ignoring.');

                continue;
              } // Extract the file extension from the URL or base64 data URI.


              ext = /^data:audio\/([^;,]+);/i.exec(str);

              if (!ext) {
                ext = /\.([^.]+)$/.exec(str.split('?', 1)[0]);
              }

              if (ext) {
                ext = ext[1].toLowerCase();
              }
            } // Log a warning if no extension was found.


            if (!ext) {
              console.warn('No file extension was found. Consider using the "format" property or specify an extension.');
            } // Check if this extension is available.


            if (ext && Howler.codecs(ext)) {
              url = self._src[i];
              break;
            }
          }

          if (!url) {
            self._emit('loaderror', null, 'No codec support for selected audio sources.');

            return;
          }

          self._src = url;
          self._state = 'loading'; // If the hosting page is HTTPS and the source isn't,
          // drop down to HTML5 Audio to avoid Mixed Content errors.

          if (window.location.protocol === 'https:' && url.slice(0, 5) === 'http:') {
            self._html5 = true;
            self._webAudio = false;
          } // Create a new sound object and add it to the pool.


          new Sound(self); // Load and decode the audio data for playback.

          if (self._webAudio) {
            loadBuffer(self);
          }

          return self;
        },

        /**
         * Play a sound or resume previous playback.
         * @param  {String/Number} sprite   Sprite name for sprite playback or sound id to continue previous.
         * @param  {Boolean} internal Internal Use: true prevents event firing.
         * @return {Number}          Sound ID.
         */
        play: function play(sprite, internal) {
          var self = this;
          var id = null; // Determine if a sprite, sound id or nothing was passed

          if (typeof sprite === 'number') {
            id = sprite;
            sprite = null;
          } else if (typeof sprite === 'string' && self._state === 'loaded' && !self._sprite[sprite]) {
            // If the passed sprite doesn't exist, do nothing.
            return null;
          } else if (typeof sprite === 'undefined') {
            // Use the default sound sprite (plays the full audio length).
            sprite = '__default'; // Check if there is a single paused sound that isn't ended.
            // If there is, play that sound. If not, continue as usual.

            if (!self._playLock) {
              var num = 0;

              for (var i = 0; i < self._sounds.length; i++) {
                if (self._sounds[i]._paused && !self._sounds[i]._ended) {
                  num++;
                  id = self._sounds[i]._id;
                }
              }

              if (num === 1) {
                sprite = null;
              } else {
                id = null;
              }
            }
          } // Get the selected node, or get one from the pool.


          var sound = id ? self._soundById(id) : self._inactiveSound(); // If the sound doesn't exist, do nothing.

          if (!sound) {
            return null;
          } // Select the sprite definition.


          if (id && !sprite) {
            sprite = sound._sprite || '__default';
          } // If the sound hasn't loaded, we must wait to get the audio's duration.
          // We also need to wait to make sure we don't run into race conditions with
          // the order of function calls.


          if (self._state !== 'loaded') {
            // Set the sprite value on this sound.
            sound._sprite = sprite; // Mark this sound as not ended in case another sound is played before this one loads.

            sound._ended = false; // Add the sound to the queue to be played on load.

            var soundId = sound._id;

            self._queue.push({
              event: 'play',
              action: function action() {
                self.play(soundId);
              }
            });

            return soundId;
          } // Don't play the sound if an id was passed and it is already playing.


          if (id && !sound._paused) {
            // Trigger the play event, in order to keep iterating through queue.
            if (!internal) {
              self._loadQueue('play');
            }

            return sound._id;
          } // Make sure the AudioContext isn't suspended, and resume it if it is.


          if (self._webAudio) {
            Howler._autoResume();
          } // Determine how long to play for and where to start playing.


          var seek = Math.max(0, sound._seek > 0 ? sound._seek : self._sprite[sprite][0] / 1000);
          var duration = Math.max(0, (self._sprite[sprite][0] + self._sprite[sprite][1]) / 1000 - seek);
          var timeout = duration * 1000 / Math.abs(sound._rate);
          var start = self._sprite[sprite][0] / 1000;
          var stop = (self._sprite[sprite][0] + self._sprite[sprite][1]) / 1000;
          sound._sprite = sprite; // Mark the sound as ended instantly so that this async playback
          // doesn't get grabbed by another call to play while this one waits to start.

          sound._ended = false; // Update the parameters of the sound.

          var setParams = function setParams() {
            sound._paused = false;
            sound._seek = seek;
            sound._start = start;
            sound._stop = stop;
            sound._loop = !!(sound._loop || self._sprite[sprite][2]);
          }; // End the sound instantly if seek is at the end.


          if (seek >= stop) {
            self._ended(sound);

            return;
          } // Begin the actual playback.


          var node = sound._node;

          if (self._webAudio) {
            // Fire this when the sound is ready to play to begin Web Audio playback.
            var playWebAudio = function playWebAudio() {
              self._playLock = false;
              setParams();

              self._refreshBuffer(sound); // Setup the playback params.


              var vol = sound._muted || self._muted ? 0 : sound._volume;
              node.gain.setValueAtTime(vol, Howler.ctx.currentTime);
              sound._playStart = Howler.ctx.currentTime; // Play the sound using the supported method.

              if (typeof node.bufferSource.start === 'undefined') {
                sound._loop ? node.bufferSource.noteGrainOn(0, seek, 86400) : node.bufferSource.noteGrainOn(0, seek, duration);
              } else {
                sound._loop ? node.bufferSource.start(0, seek, 86400) : node.bufferSource.start(0, seek, duration);
              } // Start a new timer if none is present.


              if (timeout !== Infinity) {
                self._endTimers[sound._id] = setTimeout(self._ended.bind(self, sound), timeout);
              }

              if (!internal) {
                setTimeout(function () {
                  self._emit('play', sound._id);

                  self._loadQueue();
                }, 0);
              }
            };

            if (Howler.state === 'running' && Howler.ctx.state !== 'interrupted') {
              playWebAudio();
            } else {
              self._playLock = true; // Wait for the audio context to resume before playing.

              self.once('resume', playWebAudio); // Cancel the end timer.

              self._clearTimer(sound._id);
            }
          } else {
            // Fire this when the sound is ready to play to begin HTML5 Audio playback.
            var playHtml5 = function playHtml5() {
              node.currentTime = seek;
              node.muted = sound._muted || self._muted || Howler._muted || node.muted;
              node.volume = sound._volume * Howler.volume();
              node.playbackRate = sound._rate; // Some browsers will throw an error if this is called without user interaction.

              try {
                var play = node.play(); // Support older browsers that don't support promises, and thus don't have this issue.

                if (play && typeof Promise !== 'undefined' && (play instanceof Promise || typeof play.then === 'function')) {
                  // Implements a lock to prevent DOMException: The play() request was interrupted by a call to pause().
                  self._playLock = true; // Set param values immediately.

                  setParams(); // Releases the lock and executes queued actions.

                  play.then(function () {
                    self._playLock = false;
                    node._unlocked = true;

                    if (!internal) {
                      self._emit('play', sound._id);

                      self._loadQueue();
                    }
                  })["catch"](function () {
                    self._playLock = false;

                    self._emit('playerror', sound._id, 'Playback was unable to start. This is most commonly an issue ' + 'on mobile devices and Chrome where playback was not within a user interaction.'); // Reset the ended and paused values.


                    sound._ended = true;
                    sound._paused = true;
                  });
                } else if (!internal) {
                  self._playLock = false;
                  setParams();

                  self._emit('play', sound._id);

                  self._loadQueue();
                } // Setting rate before playing won't work in IE, so we set it again here.


                node.playbackRate = sound._rate; // If the node is still paused, then we can assume there was a playback issue.

                if (node.paused) {
                  self._emit('playerror', sound._id, 'Playback was unable to start. This is most commonly an issue ' + 'on mobile devices and Chrome where playback was not within a user interaction.');

                  return;
                } // Setup the end timer on sprites or listen for the ended event.


                if (sprite !== '__default' || sound._loop) {
                  self._endTimers[sound._id] = setTimeout(self._ended.bind(self, sound), timeout);
                } else {
                  self._endTimers[sound._id] = function () {
                    // Fire ended on this audio node.
                    self._ended(sound); // Clear this listener.


                    node.removeEventListener('ended', self._endTimers[sound._id], false);
                  };

                  node.addEventListener('ended', self._endTimers[sound._id], false);
                }
              } catch (err) {
                self._emit('playerror', sound._id, err);
              }
            }; // If this is streaming audio, make sure the src is set and load again.


            if (node.src === 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA') {
              node.src = self._src;
              node.load();
            } // Play immediately if ready, or wait for the 'canplaythrough'e vent.


            var loadedNoReadyState = window && window.ejecta || !node.readyState && Howler._navigator.isCocoonJS;

            if (node.readyState >= 3 || loadedNoReadyState) {
              playHtml5();
            } else {
              self._playLock = true;

              var listener = function listener() {
                // Begin playback.
                playHtml5(); // Clear this listener.

                node.removeEventListener(Howler._canPlayEvent, listener, false);
              };

              node.addEventListener(Howler._canPlayEvent, listener, false); // Cancel the end timer.

              self._clearTimer(sound._id);
            }
          }

          return sound._id;
        },

        /**
         * Pause playback and save current position.
         * @param  {Number} id The sound ID (empty to pause all in group).
         * @return {Howl}
         */
        pause: function pause(id) {
          var self = this; // If the sound hasn't loaded or a play() promise is pending, add it to the load queue to pause when capable.

          if (self._state !== 'loaded' || self._playLock) {
            self._queue.push({
              event: 'pause',
              action: function action() {
                self.pause(id);
              }
            });

            return self;
          } // If no id is passed, get all ID's to be paused.


          var ids = self._getSoundIds(id);

          for (var i = 0; i < ids.length; i++) {
            // Clear the end timer.
            self._clearTimer(ids[i]); // Get the sound.


            var sound = self._soundById(ids[i]);

            if (sound && !sound._paused) {
              // Reset the seek position.
              sound._seek = self.seek(ids[i]);
              sound._rateSeek = 0;
              sound._paused = true; // Stop currently running fades.

              self._stopFade(ids[i]);

              if (sound._node) {
                if (self._webAudio) {
                  // Make sure the sound has been created.
                  if (!sound._node.bufferSource) {
                    continue;
                  }

                  if (typeof sound._node.bufferSource.stop === 'undefined') {
                    sound._node.bufferSource.noteOff(0);
                  } else {
                    sound._node.bufferSource.stop(0);
                  } // Clean up the buffer source.


                  self._cleanBuffer(sound._node);
                } else if (!isNaN(sound._node.duration) || sound._node.duration === Infinity) {
                  sound._node.pause();
                }
              }
            } // Fire the pause event, unless `true` is passed as the 2nd argument.


            if (!arguments[1]) {
              self._emit('pause', sound ? sound._id : null);
            }
          }

          return self;
        },

        /**
         * Stop playback and reset to start.
         * @param  {Number} id The sound ID (empty to stop all in group).
         * @param  {Boolean} internal Internal Use: true prevents event firing.
         * @return {Howl}
         */
        stop: function stop(id, internal) {
          var self = this; // If the sound hasn't loaded, add it to the load queue to stop when capable.

          if (self._state !== 'loaded' || self._playLock) {
            self._queue.push({
              event: 'stop',
              action: function action() {
                self.stop(id);
              }
            });

            return self;
          } // If no id is passed, get all ID's to be stopped.


          var ids = self._getSoundIds(id);

          for (var i = 0; i < ids.length; i++) {
            // Clear the end timer.
            self._clearTimer(ids[i]); // Get the sound.


            var sound = self._soundById(ids[i]);

            if (sound) {
              // Reset the seek position.
              sound._seek = sound._start || 0;
              sound._rateSeek = 0;
              sound._paused = true;
              sound._ended = true; // Stop currently running fades.

              self._stopFade(ids[i]);

              if (sound._node) {
                if (self._webAudio) {
                  // Make sure the sound's AudioBufferSourceNode has been created.
                  if (sound._node.bufferSource) {
                    if (typeof sound._node.bufferSource.stop === 'undefined') {
                      sound._node.bufferSource.noteOff(0);
                    } else {
                      sound._node.bufferSource.stop(0);
                    } // Clean up the buffer source.


                    self._cleanBuffer(sound._node);
                  }
                } else if (!isNaN(sound._node.duration) || sound._node.duration === Infinity) {
                  sound._node.currentTime = sound._start || 0;

                  sound._node.pause(); // If this is a live stream, stop download once the audio is stopped.


                  if (sound._node.duration === Infinity) {
                    self._clearSound(sound._node);
                  }
                }
              }

              if (!internal) {
                self._emit('stop', sound._id);
              }
            }
          }

          return self;
        },

        /**
         * Mute/unmute a single sound or all sounds in this Howl group.
         * @param  {Boolean} muted Set to true to mute and false to unmute.
         * @param  {Number} id    The sound ID to update (omit to mute/unmute all).
         * @return {Howl}
         */
        mute: function mute(muted, id) {
          var self = this; // If the sound hasn't loaded, add it to the load queue to mute when capable.

          if (self._state !== 'loaded' || self._playLock) {
            self._queue.push({
              event: 'mute',
              action: function action() {
                self.mute(muted, id);
              }
            });

            return self;
          } // If applying mute/unmute to all sounds, update the group's value.


          if (typeof id === 'undefined') {
            if (typeof muted === 'boolean') {
              self._muted = muted;
            } else {
              return self._muted;
            }
          } // If no id is passed, get all ID's to be muted.


          var ids = self._getSoundIds(id);

          for (var i = 0; i < ids.length; i++) {
            // Get the sound.
            var sound = self._soundById(ids[i]);

            if (sound) {
              sound._muted = muted; // Cancel active fade and set the volume to the end value.

              if (sound._interval) {
                self._stopFade(sound._id);
              }

              if (self._webAudio && sound._node) {
                sound._node.gain.setValueAtTime(muted ? 0 : sound._volume, Howler.ctx.currentTime);
              } else if (sound._node) {
                sound._node.muted = Howler._muted ? true : muted;
              }

              self._emit('mute', sound._id);
            }
          }

          return self;
        },

        /**
         * Get/set the volume of this sound or of the Howl group. This method can optionally take 0, 1 or 2 arguments.
         *   volume() -> Returns the group's volume value.
         *   volume(id) -> Returns the sound id's current volume.
         *   volume(vol) -> Sets the volume of all sounds in this Howl group.
         *   volume(vol, id) -> Sets the volume of passed sound id.
         * @return {Howl/Number} Returns self or current volume.
         */
        volume: function volume() {
          var self = this;
          var args = arguments;
          var vol, id; // Determine the values based on arguments.

          if (args.length === 0) {
            // Return the value of the groups' volume.
            return self._volume;
          } else if (args.length === 1 || args.length === 2 && typeof args[1] === 'undefined') {
            // First check if this is an ID, and if not, assume it is a new volume.
            var ids = self._getSoundIds();

            var index = ids.indexOf(args[0]);

            if (index >= 0) {
              id = parseInt(args[0], 10);
            } else {
              vol = parseFloat(args[0]);
            }
          } else if (args.length >= 2) {
            vol = parseFloat(args[0]);
            id = parseInt(args[1], 10);
          } // Update the volume or return the current volume.


          var sound;

          if (typeof vol !== 'undefined' && vol >= 0 && vol <= 1) {
            // If the sound hasn't loaded, add it to the load queue to change volume when capable.
            if (self._state !== 'loaded' || self._playLock) {
              self._queue.push({
                event: 'volume',
                action: function action() {
                  self.volume.apply(self, args);
                }
              });

              return self;
            } // Set the group volume.


            if (typeof id === 'undefined') {
              self._volume = vol;
            } // Update one or all volumes.


            id = self._getSoundIds(id);

            for (var i = 0; i < id.length; i++) {
              // Get the sound.
              sound = self._soundById(id[i]);

              if (sound) {
                sound._volume = vol; // Stop currently running fades.

                if (!args[2]) {
                  self._stopFade(id[i]);
                }

                if (self._webAudio && sound._node && !sound._muted) {
                  sound._node.gain.setValueAtTime(vol, Howler.ctx.currentTime);
                } else if (sound._node && !sound._muted) {
                  sound._node.volume = vol * Howler.volume();
                }

                self._emit('volume', sound._id);
              }
            }
          } else {
            sound = id ? self._soundById(id) : self._sounds[0];
            return sound ? sound._volume : 0;
          }

          return self;
        },

        /**
         * Fade a currently playing sound between two volumes (if no id is passed, all sounds will fade).
         * @param  {Number} from The value to fade from (0.0 to 1.0).
         * @param  {Number} to   The volume to fade to (0.0 to 1.0).
         * @param  {Number} len  Time in milliseconds to fade.
         * @param  {Number} id   The sound id (omit to fade all sounds).
         * @return {Howl}
         */
        fade: function fade(from, to, len, id) {
          var self = this; // If the sound hasn't loaded, add it to the load queue to fade when capable.

          if (self._state !== 'loaded' || self._playLock) {
            self._queue.push({
              event: 'fade',
              action: function action() {
                self.fade(from, to, len, id);
              }
            });

            return self;
          } // Make sure the to/from/len values are numbers.


          from = Math.min(Math.max(0, parseFloat(from)), 1);
          to = Math.min(Math.max(0, parseFloat(to)), 1);
          len = parseFloat(len); // Set the volume to the start position.

          self.volume(from, id); // Fade the volume of one or all sounds.

          var ids = self._getSoundIds(id);

          for (var i = 0; i < ids.length; i++) {
            // Get the sound.
            var sound = self._soundById(ids[i]); // Create a linear fade or fall back to timeouts with HTML5 Audio.


            if (sound) {
              // Stop the previous fade if no sprite is being used (otherwise, volume handles this).
              if (!id) {
                self._stopFade(ids[i]);
              } // If we are using Web Audio, let the native methods do the actual fade.


              if (self._webAudio && !sound._muted) {
                var currentTime = Howler.ctx.currentTime;
                var end = currentTime + len / 1000;
                sound._volume = from;

                sound._node.gain.setValueAtTime(from, currentTime);

                sound._node.gain.linearRampToValueAtTime(to, end);
              }

              self._startFadeInterval(sound, from, to, len, ids[i], typeof id === 'undefined');
            }
          }

          return self;
        },

        /**
         * Starts the internal interval to fade a sound.
         * @param  {Object} sound Reference to sound to fade.
         * @param  {Number} from The value to fade from (0.0 to 1.0).
         * @param  {Number} to   The volume to fade to (0.0 to 1.0).
         * @param  {Number} len  Time in milliseconds to fade.
         * @param  {Number} id   The sound id to fade.
         * @param  {Boolean} isGroup   If true, set the volume on the group.
         */
        _startFadeInterval: function _startFadeInterval(sound, from, to, len, id, isGroup) {
          var self = this;
          var vol = from;
          var diff = to - from;
          var steps = Math.abs(diff / 0.01);
          var stepLen = Math.max(4, steps > 0 ? len / steps : len);
          var lastTick = Date.now(); // Store the value being faded to.

          sound._fadeTo = to; // Update the volume value on each interval tick.

          sound._interval = setInterval(function () {
            // Update the volume based on the time since the last tick.
            var tick = (Date.now() - lastTick) / len;
            lastTick = Date.now();
            vol += diff * tick; // Round to within 2 decimal points.

            vol = Math.round(vol * 100) / 100; // Make sure the volume is in the right bounds.

            if (diff < 0) {
              vol = Math.max(to, vol);
            } else {
              vol = Math.min(to, vol);
            } // Change the volume.


            if (self._webAudio) {
              sound._volume = vol;
            } else {
              self.volume(vol, sound._id, true);
            } // Set the group's volume.


            if (isGroup) {
              self._volume = vol;
            } // When the fade is complete, stop it and fire event.


            if (to < from && vol <= to || to > from && vol >= to) {
              clearInterval(sound._interval);
              sound._interval = null;
              sound._fadeTo = null;
              self.volume(to, sound._id);

              self._emit('fade', sound._id);
            }
          }, stepLen);
        },

        /**
         * Internal method that stops the currently playing fade when
         * a new fade starts, volume is changed or the sound is stopped.
         * @param  {Number} id The sound id.
         * @return {Howl}
         */
        _stopFade: function _stopFade(id) {
          var self = this;

          var sound = self._soundById(id);

          if (sound && sound._interval) {
            if (self._webAudio) {
              sound._node.gain.cancelScheduledValues(Howler.ctx.currentTime);
            }

            clearInterval(sound._interval);
            sound._interval = null;
            self.volume(sound._fadeTo, id);
            sound._fadeTo = null;

            self._emit('fade', id);
          }

          return self;
        },

        /**
         * Get/set the loop parameter on a sound. This method can optionally take 0, 1 or 2 arguments.
         *   loop() -> Returns the group's loop value.
         *   loop(id) -> Returns the sound id's loop value.
         *   loop(loop) -> Sets the loop value for all sounds in this Howl group.
         *   loop(loop, id) -> Sets the loop value of passed sound id.
         * @return {Howl/Boolean} Returns self or current loop value.
         */
        loop: function loop() {
          var self = this;
          var args = arguments;
          var loop, id, sound; // Determine the values for loop and id.

          if (args.length === 0) {
            // Return the grou's loop value.
            return self._loop;
          } else if (args.length === 1) {
            if (typeof args[0] === 'boolean') {
              loop = args[0];
              self._loop = loop;
            } else {
              // Return this sound's loop value.
              sound = self._soundById(parseInt(args[0], 10));
              return sound ? sound._loop : false;
            }
          } else if (args.length === 2) {
            loop = args[0];
            id = parseInt(args[1], 10);
          } // If no id is passed, get all ID's to be looped.


          var ids = self._getSoundIds(id);

          for (var i = 0; i < ids.length; i++) {
            sound = self._soundById(ids[i]);

            if (sound) {
              sound._loop = loop;

              if (self._webAudio && sound._node && sound._node.bufferSource) {
                sound._node.bufferSource.loop = loop;

                if (loop) {
                  sound._node.bufferSource.loopStart = sound._start || 0;
                  sound._node.bufferSource.loopEnd = sound._stop;
                }
              }
            }
          }

          return self;
        },

        /**
         * Get/set the playback rate of a sound. This method can optionally take 0, 1 or 2 arguments.
         *   rate() -> Returns the first sound node's current playback rate.
         *   rate(id) -> Returns the sound id's current playback rate.
         *   rate(rate) -> Sets the playback rate of all sounds in this Howl group.
         *   rate(rate, id) -> Sets the playback rate of passed sound id.
         * @return {Howl/Number} Returns self or the current playback rate.
         */
        rate: function rate() {
          var self = this;
          var args = arguments;
          var rate, id; // Determine the values based on arguments.

          if (args.length === 0) {
            // We will simply return the current rate of the first node.
            id = self._sounds[0]._id;
          } else if (args.length === 1) {
            // First check if this is an ID, and if not, assume it is a new rate value.
            var ids = self._getSoundIds();

            var index = ids.indexOf(args[0]);

            if (index >= 0) {
              id = parseInt(args[0], 10);
            } else {
              rate = parseFloat(args[0]);
            }
          } else if (args.length === 2) {
            rate = parseFloat(args[0]);
            id = parseInt(args[1], 10);
          } // Update the playback rate or return the current value.


          var sound;

          if (typeof rate === 'number') {
            // If the sound hasn't loaded, add it to the load queue to change playback rate when capable.
            if (self._state !== 'loaded' || self._playLock) {
              self._queue.push({
                event: 'rate',
                action: function action() {
                  self.rate.apply(self, args);
                }
              });

              return self;
            } // Set the group rate.


            if (typeof id === 'undefined') {
              self._rate = rate;
            } // Update one or all volumes.


            id = self._getSoundIds(id);

            for (var i = 0; i < id.length; i++) {
              // Get the sound.
              sound = self._soundById(id[i]);

              if (sound) {
                // Keep track of our position when the rate changed and update the playback
                // start position so we can properly adjust the seek position for time elapsed.
                if (self.playing(id[i])) {
                  sound._rateSeek = self.seek(id[i]);
                  sound._playStart = self._webAudio ? Howler.ctx.currentTime : sound._playStart;
                }

                sound._rate = rate; // Change the playback rate.

                if (self._webAudio && sound._node && sound._node.bufferSource) {
                  sound._node.bufferSource.playbackRate.setValueAtTime(rate, Howler.ctx.currentTime);
                } else if (sound._node) {
                  sound._node.playbackRate = rate;
                } // Reset the timers.


                var seek = self.seek(id[i]);
                var duration = (self._sprite[sound._sprite][0] + self._sprite[sound._sprite][1]) / 1000 - seek;
                var timeout = duration * 1000 / Math.abs(sound._rate); // Start a new end timer if sound is already playing.

                if (self._endTimers[id[i]] || !sound._paused) {
                  self._clearTimer(id[i]);

                  self._endTimers[id[i]] = setTimeout(self._ended.bind(self, sound), timeout);
                }

                self._emit('rate', sound._id);
              }
            }
          } else {
            sound = self._soundById(id);
            return sound ? sound._rate : self._rate;
          }

          return self;
        },

        /**
         * Get/set the seek position of a sound. This method can optionally take 0, 1 or 2 arguments.
         *   seek() -> Returns the first sound node's current seek position.
         *   seek(id) -> Returns the sound id's current seek position.
         *   seek(seek) -> Sets the seek position of the first sound node.
         *   seek(seek, id) -> Sets the seek position of passed sound id.
         * @return {Howl/Number} Returns self or the current seek position.
         */
        seek: function seek() {
          var self = this;
          var args = arguments;
          var seek, id; // Determine the values based on arguments.

          if (args.length === 0) {
            // We will simply return the current position of the first node.
            id = self._sounds[0]._id;
          } else if (args.length === 1) {
            // First check if this is an ID, and if not, assume it is a new seek position.
            var ids = self._getSoundIds();

            var index = ids.indexOf(args[0]);

            if (index >= 0) {
              id = parseInt(args[0], 10);
            } else if (self._sounds.length) {
              id = self._sounds[0]._id;
              seek = parseFloat(args[0]);
            }
          } else if (args.length === 2) {
            seek = parseFloat(args[0]);
            id = parseInt(args[1], 10);
          } // If there is no ID, bail out.


          if (typeof id === 'undefined') {
            return self;
          } // If the sound hasn't loaded, add it to the load queue to seek when capable.


          if (typeof seek === 'number' && (self._state !== 'loaded' || self._playLock)) {
            self._queue.push({
              event: 'seek',
              action: function action() {
                self.seek.apply(self, args);
              }
            });

            return self;
          } // Get the sound.


          var sound = self._soundById(id);

          if (sound) {
            if (typeof seek === 'number' && seek >= 0) {
              // Pause the sound and update position for restarting playback.
              var playing = self.playing(id);

              if (playing) {
                self.pause(id, true);
              } // Move the position of the track and cancel timer.


              sound._seek = seek;
              sound._ended = false;

              self._clearTimer(id); // Update the seek position for HTML5 Audio.


              if (!self._webAudio && sound._node && !isNaN(sound._node.duration)) {
                sound._node.currentTime = seek;
              } // Seek and emit when ready.


              var seekAndEmit = function seekAndEmit() {
                self._emit('seek', id); // Restart the playback if the sound was playing.


                if (playing) {
                  self.play(id, true);
                }
              }; // Wait for the play lock to be unset before emitting (HTML5 Audio).


              if (playing && !self._webAudio) {
                var emitSeek = function emitSeek() {
                  if (!self._playLock) {
                    seekAndEmit();
                  } else {
                    setTimeout(emitSeek, 0);
                  }
                };

                setTimeout(emitSeek, 0);
              } else {
                seekAndEmit();
              }
            } else {
              if (self._webAudio) {
                var realTime = self.playing(id) ? Howler.ctx.currentTime - sound._playStart : 0;
                var rateSeek = sound._rateSeek ? sound._rateSeek - sound._seek : 0;
                return sound._seek + (rateSeek + realTime * Math.abs(sound._rate));
              } else {
                return sound._node.currentTime;
              }
            }
          }

          return self;
        },

        /**
         * Check if a specific sound is currently playing or not (if id is provided), or check if at least one of the sounds in the group is playing or not.
         * @param  {Number}  id The sound id to check. If none is passed, the whole sound group is checked.
         * @return {Boolean} True if playing and false if not.
         */
        playing: function playing(id) {
          var self = this; // Check the passed sound ID (if any).

          if (typeof id === 'number') {
            var sound = self._soundById(id);

            return sound ? !sound._paused : false;
          } // Otherwise, loop through all sounds and check if any are playing.


          for (var i = 0; i < self._sounds.length; i++) {
            if (!self._sounds[i]._paused) {
              return true;
            }
          }

          return false;
        },

        /**
         * Get the duration of this sound. Passing a sound id will return the sprite duration.
         * @param  {Number} id The sound id to check. If none is passed, return full source duration.
         * @return {Number} Audio duration in seconds.
         */
        duration: function duration(id) {
          var self = this;
          var duration = self._duration; // If we pass an ID, get the sound and return the sprite length.

          var sound = self._soundById(id);

          if (sound) {
            duration = self._sprite[sound._sprite][1] / 1000;
          }

          return duration;
        },

        /**
         * Returns the current loaded state of this Howl.
         * @return {String} 'unloaded', 'loading', 'loaded'
         */
        state: function state() {
          return this._state;
        },

        /**
         * Unload and destroy the current Howl object.
         * This will immediately stop all sound instances attached to this group.
         */
        unload: function unload() {
          var self = this; // Stop playing any active sounds.

          var sounds = self._sounds;

          for (var i = 0; i < sounds.length; i++) {
            // Stop the sound if it is currently playing.
            if (!sounds[i]._paused) {
              self.stop(sounds[i]._id);
            } // Remove the source or disconnect.


            if (!self._webAudio) {
              // Set the source to 0-second silence to stop any downloading (except in IE).
              self._clearSound(sounds[i]._node); // Remove any event listeners.


              sounds[i]._node.removeEventListener('error', sounds[i]._errorFn, false);

              sounds[i]._node.removeEventListener(Howler._canPlayEvent, sounds[i]._loadFn, false);

              sounds[i]._node.removeEventListener('ended', sounds[i]._endFn, false); // Release the Audio object back to the pool.


              Howler._releaseHtml5Audio(sounds[i]._node);
            } // Empty out all of the nodes.


            delete sounds[i]._node; // Make sure all timers are cleared out.

            self._clearTimer(sounds[i]._id);
          } // Remove the references in the global Howler object.


          var index = Howler._howls.indexOf(self);

          if (index >= 0) {
            Howler._howls.splice(index, 1);
          } // Delete this sound from the cache (if no other Howl is using it).


          var remCache = true;

          for (i = 0; i < Howler._howls.length; i++) {
            if (Howler._howls[i]._src === self._src || self._src.indexOf(Howler._howls[i]._src) >= 0) {
              remCache = false;
              break;
            }
          }

          if (cache && remCache) {
            delete cache[self._src];
          } // Clear global errors.


          Howler.noAudio = false; // Clear out `self`.

          self._state = 'unloaded';
          self._sounds = [];
          self = null;
          return null;
        },

        /**
         * Listen to a custom event.
         * @param  {String}   event Event name.
         * @param  {Function} fn    Listener to call.
         * @param  {Number}   id    (optional) Only listen to events for this sound.
         * @param  {Number}   once  (INTERNAL) Marks event to fire only once.
         * @return {Howl}
         */
        on: function on(event, fn, id, once) {
          var self = this;
          var events = self['_on' + event];

          if (typeof fn === 'function') {
            events.push(once ? {
              id: id,
              fn: fn,
              once: once
            } : {
              id: id,
              fn: fn
            });
          }

          return self;
        },

        /**
         * Remove a custom event. Call without parameters to remove all events.
         * @param  {String}   event Event name.
         * @param  {Function} fn    Listener to remove. Leave empty to remove all.
         * @param  {Number}   id    (optional) Only remove events for this sound.
         * @return {Howl}
         */
        off: function off(event, fn, id) {
          var self = this;
          var events = self['_on' + event];
          var i = 0; // Allow passing just an event and ID.

          if (typeof fn === 'number') {
            id = fn;
            fn = null;
          }

          if (fn || id) {
            // Loop through event store and remove the passed function.
            for (i = 0; i < events.length; i++) {
              var isId = id === events[i].id;

              if (fn === events[i].fn && isId || !fn && isId) {
                events.splice(i, 1);
                break;
              }
            }
          } else if (event) {
            // Clear out all events of this type.
            self['_on' + event] = [];
          } else {
            // Clear out all events of every type.
            var keys = Object.keys(self);

            for (i = 0; i < keys.length; i++) {
              if (keys[i].indexOf('_on') === 0 && Array.isArray(self[keys[i]])) {
                self[keys[i]] = [];
              }
            }
          }

          return self;
        },

        /**
         * Listen to a custom event and remove it once fired.
         * @param  {String}   event Event name.
         * @param  {Function} fn    Listener to call.
         * @param  {Number}   id    (optional) Only listen to events for this sound.
         * @return {Howl}
         */
        once: function once(event, fn, id) {
          var self = this; // Setup the event listener.

          self.on(event, fn, id, 1);
          return self;
        },

        /**
         * Emit all events of a specific type and pass the sound id.
         * @param  {String} event Event name.
         * @param  {Number} id    Sound ID.
         * @param  {Number} msg   Message to go with event.
         * @return {Howl}
         */
        _emit: function _emit(event, id, msg) {
          var self = this;
          var events = self['_on' + event]; // Loop through event store and fire all functions.

          for (var i = events.length - 1; i >= 0; i--) {
            // Only fire the listener if the correct ID is used.
            if (!events[i].id || events[i].id === id || event === 'load') {
              setTimeout(function (fn) {
                fn.call(this, id, msg);
              }.bind(self, events[i].fn), 0); // If this event was setup with `once`, remove it.

              if (events[i].once) {
                self.off(event, events[i].fn, events[i].id);
              }
            }
          } // Pass the event type into load queue so that it can continue stepping.


          self._loadQueue(event);

          return self;
        },

        /**
         * Queue of actions initiated before the sound has loaded.
         * These will be called in sequence, with the next only firing
         * after the previous has finished executing (even if async like play).
         * @return {Howl}
         */
        _loadQueue: function _loadQueue(event) {
          var self = this;

          if (self._queue.length > 0) {
            var task = self._queue[0]; // Remove this task if a matching event was passed.

            if (task.event === event) {
              self._queue.shift();

              self._loadQueue();
            } // Run the task if no event type is passed.


            if (!event) {
              task.action();
            }
          }

          return self;
        },

        /**
         * Fired when playback ends at the end of the duration.
         * @param  {Sound} sound The sound object to work with.
         * @return {Howl}
         */
        _ended: function _ended(sound) {
          var self = this;
          var sprite = sound._sprite; // If we are using IE and there was network latency we may be clipping
          // audio before it completes playing. Lets check the node to make sure it
          // believes it has completed, before ending the playback.

          if (!self._webAudio && sound._node && !sound._node.paused && !sound._node.ended && sound._node.currentTime < sound._stop) {
            setTimeout(self._ended.bind(self, sound), 100);
            return self;
          } // Should this sound loop?


          var loop = !!(sound._loop || self._sprite[sprite][2]); // Fire the ended event.

          self._emit('end', sound._id); // Restart the playback for HTML5 Audio loop.


          if (!self._webAudio && loop) {
            self.stop(sound._id, true).play(sound._id);
          } // Restart this timer if on a Web Audio loop.


          if (self._webAudio && loop) {
            self._emit('play', sound._id);

            sound._seek = sound._start || 0;
            sound._rateSeek = 0;
            sound._playStart = Howler.ctx.currentTime;
            var timeout = (sound._stop - sound._start) * 1000 / Math.abs(sound._rate);
            self._endTimers[sound._id] = setTimeout(self._ended.bind(self, sound), timeout);
          } // Mark the node as paused.


          if (self._webAudio && !loop) {
            sound._paused = true;
            sound._ended = true;
            sound._seek = sound._start || 0;
            sound._rateSeek = 0;

            self._clearTimer(sound._id); // Clean up the buffer source.


            self._cleanBuffer(sound._node); // Attempt to auto-suspend AudioContext if no sounds are still playing.


            Howler._autoSuspend();
          } // When using a sprite, end the track.


          if (!self._webAudio && !loop) {
            self.stop(sound._id, true);
          }

          return self;
        },

        /**
         * Clear the end timer for a sound playback.
         * @param  {Number} id The sound ID.
         * @return {Howl}
         */
        _clearTimer: function _clearTimer(id) {
          var self = this;

          if (self._endTimers[id]) {
            // Clear the timeout or remove the ended listener.
            if (typeof self._endTimers[id] !== 'function') {
              clearTimeout(self._endTimers[id]);
            } else {
              var sound = self._soundById(id);

              if (sound && sound._node) {
                sound._node.removeEventListener('ended', self._endTimers[id], false);
              }
            }

            delete self._endTimers[id];
          }

          return self;
        },

        /**
         * Return the sound identified by this ID, or return null.
         * @param  {Number} id Sound ID
         * @return {Object}    Sound object or null.
         */
        _soundById: function _soundById(id) {
          var self = this; // Loop through all sounds and find the one with this ID.

          for (var i = 0; i < self._sounds.length; i++) {
            if (id === self._sounds[i]._id) {
              return self._sounds[i];
            }
          }

          return null;
        },

        /**
         * Return an inactive sound from the pool or create a new one.
         * @return {Sound} Sound playback object.
         */
        _inactiveSound: function _inactiveSound() {
          var self = this;

          self._drain(); // Find the first inactive node to recycle.


          for (var i = 0; i < self._sounds.length; i++) {
            if (self._sounds[i]._ended) {
              return self._sounds[i].reset();
            }
          } // If no inactive node was found, create a new one.


          return new Sound(self);
        },

        /**
         * Drain excess inactive sounds from the pool.
         */
        _drain: function _drain() {
          var self = this;
          var limit = self._pool;
          var cnt = 0;
          var i = 0; // If there are less sounds than the max pool size, we are done.

          if (self._sounds.length < limit) {
            return;
          } // Count the number of inactive sounds.


          for (i = 0; i < self._sounds.length; i++) {
            if (self._sounds[i]._ended) {
              cnt++;
            }
          } // Remove excess inactive sounds, going in reverse order.


          for (i = self._sounds.length - 1; i >= 0; i--) {
            if (cnt <= limit) {
              return;
            }

            if (self._sounds[i]._ended) {
              // Disconnect the audio source when using Web Audio.
              if (self._webAudio && self._sounds[i]._node) {
                self._sounds[i]._node.disconnect(0);
              } // Remove sounds until we have the pool size.


              self._sounds.splice(i, 1);

              cnt--;
            }
          }
        },

        /**
         * Get all ID's from the sounds pool.
         * @param  {Number} id Only return one ID if one is passed.
         * @return {Array}    Array of IDs.
         */
        _getSoundIds: function _getSoundIds(id) {
          var self = this;

          if (typeof id === 'undefined') {
            var ids = [];

            for (var i = 0; i < self._sounds.length; i++) {
              ids.push(self._sounds[i]._id);
            }

            return ids;
          } else {
            return [id];
          }
        },

        /**
         * Load the sound back into the buffer source.
         * @param  {Sound} sound The sound object to work with.
         * @return {Howl}
         */
        _refreshBuffer: function _refreshBuffer(sound) {
          var self = this; // Setup the buffer source for playback.

          sound._node.bufferSource = Howler.ctx.createBufferSource();
          sound._node.bufferSource.buffer = cache[self._src]; // Connect to the correct node.

          if (sound._panner) {
            sound._node.bufferSource.connect(sound._panner);
          } else {
            sound._node.bufferSource.connect(sound._node);
          } // Setup looping and playback rate.


          sound._node.bufferSource.loop = sound._loop;

          if (sound._loop) {
            sound._node.bufferSource.loopStart = sound._start || 0;
            sound._node.bufferSource.loopEnd = sound._stop || 0;
          }

          sound._node.bufferSource.playbackRate.setValueAtTime(sound._rate, Howler.ctx.currentTime);

          return self;
        },

        /**
         * Prevent memory leaks by cleaning up the buffer source after playback.
         * @param  {Object} node Sound's audio node containing the buffer source.
         * @return {Howl}
         */
        _cleanBuffer: function _cleanBuffer(node) {
          var self = this;
          var isIOS = Howler._navigator && Howler._navigator.vendor.indexOf('Apple') >= 0;

          if (Howler._scratchBuffer && node.bufferSource) {
            node.bufferSource.onended = null;
            node.bufferSource.disconnect(0);

            if (isIOS) {
              try {
                node.bufferSource.buffer = Howler._scratchBuffer;
              } catch (e) {}
            }
          }

          node.bufferSource = null;
          return self;
        },

        /**
         * Set the source to a 0-second silence to stop any downloading (except in IE).
         * @param  {Object} node Audio node to clear.
         */
        _clearSound: function _clearSound(node) {
          var checkIE = /MSIE |Trident\//.test(Howler._navigator && Howler._navigator.userAgent);

          if (!checkIE) {
            node.src = 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA';
          }
        }
      };
      /** Single Sound Methods **/

      /***************************************************************************/

      /**
       * Setup the sound object, which each node attached to a Howl group is contained in.
       * @param {Object} howl The Howl parent group.
       */

      var Sound = function Sound(howl) {
        this._parent = howl;
        this.init();
      };

      Sound.prototype = {
        /**
         * Initialize a new Sound object.
         * @return {Sound}
         */
        init: function init() {
          var self = this;
          var parent = self._parent; // Setup the default parameters.

          self._muted = parent._muted;
          self._loop = parent._loop;
          self._volume = parent._volume;
          self._rate = parent._rate;
          self._seek = 0;
          self._paused = true;
          self._ended = true;
          self._sprite = '__default'; // Generate a unique ID for this sound.

          self._id = ++Howler._counter; // Add itself to the parent's pool.

          parent._sounds.push(self); // Create the new node.


          self.create();
          return self;
        },

        /**
         * Create and setup a new sound object, whether HTML5 Audio or Web Audio.
         * @return {Sound}
         */
        create: function create() {
          var self = this;
          var parent = self._parent;
          var volume = Howler._muted || self._muted || self._parent._muted ? 0 : self._volume;

          if (parent._webAudio) {
            // Create the gain node for controlling volume (the source will connect to this).
            self._node = typeof Howler.ctx.createGain === 'undefined' ? Howler.ctx.createGainNode() : Howler.ctx.createGain();

            self._node.gain.setValueAtTime(volume, Howler.ctx.currentTime);

            self._node.paused = true;

            self._node.connect(Howler.masterGain);
          } else if (!Howler.noAudio) {
            // Get an unlocked Audio object from the pool.
            self._node = Howler._obtainHtml5Audio(); // Listen for errors (http://dev.w3.org/html5/spec-author-view/spec.html#mediaerror).

            self._errorFn = self._errorListener.bind(self);

            self._node.addEventListener('error', self._errorFn, false); // Listen for 'canplaythrough' event to let us know the sound is ready.


            self._loadFn = self._loadListener.bind(self);

            self._node.addEventListener(Howler._canPlayEvent, self._loadFn, false); // Listen for the 'ended' event on the sound to account for edge-case where
            // a finite sound has a duration of Infinity.


            self._endFn = self._endListener.bind(self);

            self._node.addEventListener('ended', self._endFn, false); // Setup the new audio node.


            self._node.src = parent._src;
            self._node.preload = parent._preload === true ? 'auto' : parent._preload;
            self._node.volume = volume * Howler.volume(); // Begin loading the source.

            self._node.load();
          }

          return self;
        },

        /**
         * Reset the parameters of this sound to the original state (for recycle).
         * @return {Sound}
         */
        reset: function reset() {
          var self = this;
          var parent = self._parent; // Reset all of the parameters of this sound.

          self._muted = parent._muted;
          self._loop = parent._loop;
          self._volume = parent._volume;
          self._rate = parent._rate;
          self._seek = 0;
          self._rateSeek = 0;
          self._paused = true;
          self._ended = true;
          self._sprite = '__default'; // Generate a new ID so that it isn't confused with the previous sound.

          self._id = ++Howler._counter;
          return self;
        },

        /**
         * HTML5 Audio error listener callback.
         */
        _errorListener: function _errorListener() {
          var self = this; // Fire an error event and pass back the code.

          self._parent._emit('loaderror', self._id, self._node.error ? self._node.error.code : 0); // Clear the event listener.


          self._node.removeEventListener('error', self._errorFn, false);
        },

        /**
         * HTML5 Audio canplaythrough listener callback.
         */
        _loadListener: function _loadListener() {
          var self = this;
          var parent = self._parent; // Round up the duration to account for the lower precision in HTML5 Audio.

          parent._duration = Math.ceil(self._node.duration * 10) / 10; // Setup a sprite if none is defined.

          if (Object.keys(parent._sprite).length === 0) {
            parent._sprite = {
              __default: [0, parent._duration * 1000]
            };
          }

          if (parent._state !== 'loaded') {
            parent._state = 'loaded';

            parent._emit('load');

            parent._loadQueue();
          } // Clear the event listener.


          self._node.removeEventListener(Howler._canPlayEvent, self._loadFn, false);
        },

        /**
         * HTML5 Audio ended listener callback.
         */
        _endListener: function _endListener() {
          var self = this;
          var parent = self._parent; // Only handle the `ended`` event if the duration is Infinity.

          if (parent._duration === Infinity) {
            // Update the parent duration to match the real audio duration.
            // Round up the duration to account for the lower precision in HTML5 Audio.
            parent._duration = Math.ceil(self._node.duration * 10) / 10; // Update the sprite that corresponds to the real duration.

            if (parent._sprite.__default[1] === Infinity) {
              parent._sprite.__default[1] = parent._duration * 1000;
            } // Run the regular ended method.


            parent._ended(self);
          } // Clear the event listener since the duration is now correct.


          self._node.removeEventListener('ended', self._endFn, false);
        }
      };
      /** Helper Methods **/

      /***************************************************************************/

      var cache = {};
      /**
       * Buffer a sound from URL, Data URI or cache and decode to audio source (Web Audio API).
       * @param  {Howl} self
       */

      var loadBuffer = function loadBuffer(self) {
        var url = self._src; // Check if the buffer has already been cached and use it instead.

        if (cache[url]) {
          // Set the duration from the cache.
          self._duration = cache[url].duration; // Load the sound into this Howl.

          loadSound(self);
          return;
        }

        if (/^data:[^;]+;base64,/.test(url)) {
          // Decode the base64 data URI without XHR, since some browsers don't support it.
          var data = atob(url.split(',')[1]);
          var dataView = new Uint8Array(data.length);

          for (var i = 0; i < data.length; ++i) {
            dataView[i] = data.charCodeAt(i);
          }

          decodeAudioData(dataView.buffer, self);
        } else {
          // Load the buffer from the URL.
          var xhr = new XMLHttpRequest();
          xhr.open(self._xhr.method, url, true);
          xhr.withCredentials = self._xhr.withCredentials;
          xhr.responseType = 'arraybuffer'; // Apply any custom headers to the request.

          if (self._xhr.headers) {
            Object.keys(self._xhr.headers).forEach(function (key) {
              xhr.setRequestHeader(key, self._xhr.headers[key]);
            });
          }

          xhr.onload = function () {
            // Make sure we get a successful response back.
            var code = (xhr.status + '')[0];

            if (code !== '0' && code !== '2' && code !== '3') {
              self._emit('loaderror', null, 'Failed loading audio file with status: ' + xhr.status + '.');

              return;
            }

            decodeAudioData(xhr.response, self);
          };

          xhr.onerror = function () {
            // If there is an error, switch to HTML5 Audio.
            if (self._webAudio) {
              self._html5 = true;
              self._webAudio = false;
              self._sounds = [];
              delete cache[url];
              self.load();
            }
          };

          safeXhrSend(xhr);
        }
      };
      /**
       * Send the XHR request wrapped in a try/catch.
       * @param  {Object} xhr XHR to send.
       */


      var safeXhrSend = function safeXhrSend(xhr) {
        try {
          xhr.send();
        } catch (e) {
          xhr.onerror();
        }
      };
      /**
       * Decode audio data from an array buffer.
       * @param  {ArrayBuffer} arraybuffer The audio data.
       * @param  {Howl}        self
       */


      var decodeAudioData = function decodeAudioData(arraybuffer, self) {
        // Fire a load error if something broke.
        var error = function error() {
          self._emit('loaderror', null, 'Decoding audio data failed.');
        }; // Load the sound on success.


        var success = function success(buffer) {
          if (buffer && self._sounds.length > 0) {
            cache[self._src] = buffer;
            loadSound(self, buffer);
          } else {
            error();
          }
        }; // Decode the buffer into an audio source.


        if (typeof Promise !== 'undefined' && Howler.ctx.decodeAudioData.length === 1) {
          Howler.ctx.decodeAudioData(arraybuffer).then(success)["catch"](error);
        } else {
          Howler.ctx.decodeAudioData(arraybuffer, success, error);
        }
      };
      /**
       * Sound is now loaded, so finish setting everything up and fire the loaded event.
       * @param  {Howl} self
       * @param  {Object} buffer The decoded buffer sound source.
       */


      var loadSound = function loadSound(self, buffer) {
        // Set the duration.
        if (buffer && !self._duration) {
          self._duration = buffer.duration;
        } // Setup a sprite if none is defined.


        if (Object.keys(self._sprite).length === 0) {
          self._sprite = {
            __default: [0, self._duration * 1000]
          };
        } // Fire the loaded event.


        if (self._state !== 'loaded') {
          self._state = 'loaded';

          self._emit('load');

          self._loadQueue();
        }
      };
      /**
       * Setup the audio context when available, or switch to HTML5 Audio mode.
       */


      var setupAudioContext = function setupAudioContext() {
        // If we have already detected that Web Audio isn't supported, don't run this step again.
        if (!Howler.usingWebAudio) {
          return;
        } // Check if we are using Web Audio and setup the AudioContext if we are.


        try {
          if (typeof AudioContext !== 'undefined') {
            Howler.ctx = new AudioContext();
          } else if (typeof webkitAudioContext !== 'undefined') {
            Howler.ctx = new webkitAudioContext();
          } else {
            Howler.usingWebAudio = false;
          }
        } catch (e) {
          Howler.usingWebAudio = false;
        } // If the audio context creation still failed, set using web audio to false.


        if (!Howler.ctx) {
          Howler.usingWebAudio = false;
        } // Check if a webview is being used on iOS8 or earlier (rather than the browser).
        // If it is, disable Web Audio as it causes crashing.


        var iOS = /iP(hone|od|ad)/.test(Howler._navigator && Howler._navigator.platform);

        var appVersion = Howler._navigator && Howler._navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);

        var version = appVersion ? parseInt(appVersion[1], 10) : null;

        if (iOS && version && version < 9) {
          var safari = /safari/.test(Howler._navigator && Howler._navigator.userAgent.toLowerCase());

          if (Howler._navigator && !safari) {
            Howler.usingWebAudio = false;
          }
        } // Create and expose the master GainNode when using Web Audio (useful for plugins or advanced usage).


        if (Howler.usingWebAudio) {
          Howler.masterGain = typeof Howler.ctx.createGain === 'undefined' ? Howler.ctx.createGainNode() : Howler.ctx.createGain();
          Howler.masterGain.gain.setValueAtTime(Howler._muted ? 0 : Howler._volume, Howler.ctx.currentTime);
          Howler.masterGain.connect(Howler.ctx.destination);
        } // Re-run the setup on Howler.


        Howler._setup();
      }; // Add support for CommonJS libraries such as browserify.


      {
        exports.Howler = Howler;
        exports.Howl = Howl;
      } // Add to global in Node.js (for testing, etc).

      if (typeof commonjsGlobal !== 'undefined') {
        commonjsGlobal.HowlerGlobal = HowlerGlobal;
        commonjsGlobal.Howler = Howler;
        commonjsGlobal.Howl = Howl;
        commonjsGlobal.Sound = Sound;
      } else if (typeof window !== 'undefined') {
        // Define globally in case AMD is not available or unused.
        window.HowlerGlobal = HowlerGlobal;
        window.Howler = Howler;
        window.Howl = Howl;
        window.Sound = Sound;
      }
    })();
    /*!
     *  Spatial Plugin - Adds support for stereo and 3D audio where Web Audio is supported.
     *  
     *  howler.js v2.2.1
     *  howlerjs.com
     *
     *  (c) 2013-2020, James Simpson of GoldFire Studios
     *  goldfirestudios.com
     *
     *  MIT License
     */


    (function () {
      // Setup default properties.
      HowlerGlobal.prototype._pos = [0, 0, 0];
      HowlerGlobal.prototype._orientation = [0, 0, -1, 0, 1, 0];
      /** Global Methods **/

      /***************************************************************************/

      /**
       * Helper method to update the stereo panning position of all current Howls.
       * Future Howls will not use this value unless explicitly set.
       * @param  {Number} pan A value of -1.0 is all the way left and 1.0 is all the way right.
       * @return {Howler/Number}     Self or current stereo panning value.
       */

      HowlerGlobal.prototype.stereo = function (pan) {
        var self = this; // Stop right here if not using Web Audio.

        if (!self.ctx || !self.ctx.listener) {
          return self;
        } // Loop through all Howls and update their stereo panning.


        for (var i = self._howls.length - 1; i >= 0; i--) {
          self._howls[i].stereo(pan);
        }

        return self;
      };
      /**
       * Get/set the position of the listener in 3D cartesian space. Sounds using
       * 3D position will be relative to the listener's position.
       * @param  {Number} x The x-position of the listener.
       * @param  {Number} y The y-position of the listener.
       * @param  {Number} z The z-position of the listener.
       * @return {Howler/Array}   Self or current listener position.
       */


      HowlerGlobal.prototype.pos = function (x, y, z) {
        var self = this; // Stop right here if not using Web Audio.

        if (!self.ctx || !self.ctx.listener) {
          return self;
        } // Set the defaults for optional 'y' & 'z'.


        y = typeof y !== 'number' ? self._pos[1] : y;
        z = typeof z !== 'number' ? self._pos[2] : z;

        if (typeof x === 'number') {
          self._pos = [x, y, z];

          if (typeof self.ctx.listener.positionX !== 'undefined') {
            self.ctx.listener.positionX.setTargetAtTime(self._pos[0], Howler.ctx.currentTime, 0.1);
            self.ctx.listener.positionY.setTargetAtTime(self._pos[1], Howler.ctx.currentTime, 0.1);
            self.ctx.listener.positionZ.setTargetAtTime(self._pos[2], Howler.ctx.currentTime, 0.1);
          } else {
            self.ctx.listener.setPosition(self._pos[0], self._pos[1], self._pos[2]);
          }
        } else {
          return self._pos;
        }

        return self;
      };
      /**
       * Get/set the direction the listener is pointing in the 3D cartesian space.
       * A front and up vector must be provided. The front is the direction the
       * face of the listener is pointing, and up is the direction the top of the
       * listener is pointing. Thus, these values are expected to be at right angles
       * from each other.
       * @param  {Number} x   The x-orientation of the listener.
       * @param  {Number} y   The y-orientation of the listener.
       * @param  {Number} z   The z-orientation of the listener.
       * @param  {Number} xUp The x-orientation of the top of the listener.
       * @param  {Number} yUp The y-orientation of the top of the listener.
       * @param  {Number} zUp The z-orientation of the top of the listener.
       * @return {Howler/Array}     Returns self or the current orientation vectors.
       */


      HowlerGlobal.prototype.orientation = function (x, y, z, xUp, yUp, zUp) {
        var self = this; // Stop right here if not using Web Audio.

        if (!self.ctx || !self.ctx.listener) {
          return self;
        } // Set the defaults for optional 'y' & 'z'.


        var or = self._orientation;
        y = typeof y !== 'number' ? or[1] : y;
        z = typeof z !== 'number' ? or[2] : z;
        xUp = typeof xUp !== 'number' ? or[3] : xUp;
        yUp = typeof yUp !== 'number' ? or[4] : yUp;
        zUp = typeof zUp !== 'number' ? or[5] : zUp;

        if (typeof x === 'number') {
          self._orientation = [x, y, z, xUp, yUp, zUp];

          if (typeof self.ctx.listener.forwardX !== 'undefined') {
            self.ctx.listener.forwardX.setTargetAtTime(x, Howler.ctx.currentTime, 0.1);
            self.ctx.listener.forwardY.setTargetAtTime(y, Howler.ctx.currentTime, 0.1);
            self.ctx.listener.forwardZ.setTargetAtTime(z, Howler.ctx.currentTime, 0.1);
            self.ctx.listener.upX.setTargetAtTime(xUp, Howler.ctx.currentTime, 0.1);
            self.ctx.listener.upY.setTargetAtTime(yUp, Howler.ctx.currentTime, 0.1);
            self.ctx.listener.upZ.setTargetAtTime(zUp, Howler.ctx.currentTime, 0.1);
          } else {
            self.ctx.listener.setOrientation(x, y, z, xUp, yUp, zUp);
          }
        } else {
          return or;
        }

        return self;
      };
      /** Group Methods **/

      /***************************************************************************/

      /**
       * Add new properties to the core init.
       * @param  {Function} _super Core init method.
       * @return {Howl}
       */


      Howl.prototype.init = function (_super) {
        return function (o) {
          var self = this; // Setup user-defined default properties.

          self._orientation = o.orientation || [1, 0, 0];
          self._stereo = o.stereo || null;
          self._pos = o.pos || null;
          self._pannerAttr = {
            coneInnerAngle: typeof o.coneInnerAngle !== 'undefined' ? o.coneInnerAngle : 360,
            coneOuterAngle: typeof o.coneOuterAngle !== 'undefined' ? o.coneOuterAngle : 360,
            coneOuterGain: typeof o.coneOuterGain !== 'undefined' ? o.coneOuterGain : 0,
            distanceModel: typeof o.distanceModel !== 'undefined' ? o.distanceModel : 'inverse',
            maxDistance: typeof o.maxDistance !== 'undefined' ? o.maxDistance : 10000,
            panningModel: typeof o.panningModel !== 'undefined' ? o.panningModel : 'HRTF',
            refDistance: typeof o.refDistance !== 'undefined' ? o.refDistance : 1,
            rolloffFactor: typeof o.rolloffFactor !== 'undefined' ? o.rolloffFactor : 1
          }; // Setup event listeners.

          self._onstereo = o.onstereo ? [{
            fn: o.onstereo
          }] : [];
          self._onpos = o.onpos ? [{
            fn: o.onpos
          }] : [];
          self._onorientation = o.onorientation ? [{
            fn: o.onorientation
          }] : []; // Complete initilization with howler.js core's init function.

          return _super.call(this, o);
        };
      }(Howl.prototype.init);
      /**
       * Get/set the stereo panning of the audio source for this sound or all in the group.
       * @param  {Number} pan  A value of -1.0 is all the way left and 1.0 is all the way right.
       * @param  {Number} id (optional) The sound ID. If none is passed, all in group will be updated.
       * @return {Howl/Number}    Returns self or the current stereo panning value.
       */


      Howl.prototype.stereo = function (pan, id) {
        var self = this; // Stop right here if not using Web Audio.

        if (!self._webAudio) {
          return self;
        } // If the sound hasn't loaded, add it to the load queue to change stereo pan when capable.


        if (self._state !== 'loaded') {
          self._queue.push({
            event: 'stereo',
            action: function action() {
              self.stereo(pan, id);
            }
          });

          return self;
        } // Check for PannerStereoNode support and fallback to PannerNode if it doesn't exist.


        var pannerType = typeof Howler.ctx.createStereoPanner === 'undefined' ? 'spatial' : 'stereo'; // Setup the group's stereo panning if no ID is passed.

        if (typeof id === 'undefined') {
          // Return the group's stereo panning if no parameters are passed.
          if (typeof pan === 'number') {
            self._stereo = pan;
            self._pos = [pan, 0, 0];
          } else {
            return self._stereo;
          }
        } // Change the streo panning of one or all sounds in group.


        var ids = self._getSoundIds(id);

        for (var i = 0; i < ids.length; i++) {
          // Get the sound.
          var sound = self._soundById(ids[i]);

          if (sound) {
            if (typeof pan === 'number') {
              sound._stereo = pan;
              sound._pos = [pan, 0, 0];

              if (sound._node) {
                // If we are falling back, make sure the panningModel is equalpower.
                sound._pannerAttr.panningModel = 'equalpower'; // Check if there is a panner setup and create a new one if not.

                if (!sound._panner || !sound._panner.pan) {
                  setupPanner(sound, pannerType);
                }

                if (pannerType === 'spatial') {
                  if (typeof sound._panner.positionX !== 'undefined') {
                    sound._panner.positionX.setValueAtTime(pan, Howler.ctx.currentTime);

                    sound._panner.positionY.setValueAtTime(0, Howler.ctx.currentTime);

                    sound._panner.positionZ.setValueAtTime(0, Howler.ctx.currentTime);
                  } else {
                    sound._panner.setPosition(pan, 0, 0);
                  }
                } else {
                  sound._panner.pan.setValueAtTime(pan, Howler.ctx.currentTime);
                }
              }

              self._emit('stereo', sound._id);
            } else {
              return sound._stereo;
            }
          }
        }

        return self;
      };
      /**
       * Get/set the 3D spatial position of the audio source for this sound or group relative to the global listener.
       * @param  {Number} x  The x-position of the audio source.
       * @param  {Number} y  The y-position of the audio source.
       * @param  {Number} z  The z-position of the audio source.
       * @param  {Number} id (optional) The sound ID. If none is passed, all in group will be updated.
       * @return {Howl/Array}    Returns self or the current 3D spatial position: [x, y, z].
       */


      Howl.prototype.pos = function (x, y, z, id) {
        var self = this; // Stop right here if not using Web Audio.

        if (!self._webAudio) {
          return self;
        } // If the sound hasn't loaded, add it to the load queue to change position when capable.


        if (self._state !== 'loaded') {
          self._queue.push({
            event: 'pos',
            action: function action() {
              self.pos(x, y, z, id);
            }
          });

          return self;
        } // Set the defaults for optional 'y' & 'z'.


        y = typeof y !== 'number' ? 0 : y;
        z = typeof z !== 'number' ? -0.5 : z; // Setup the group's spatial position if no ID is passed.

        if (typeof id === 'undefined') {
          // Return the group's spatial position if no parameters are passed.
          if (typeof x === 'number') {
            self._pos = [x, y, z];
          } else {
            return self._pos;
          }
        } // Change the spatial position of one or all sounds in group.


        var ids = self._getSoundIds(id);

        for (var i = 0; i < ids.length; i++) {
          // Get the sound.
          var sound = self._soundById(ids[i]);

          if (sound) {
            if (typeof x === 'number') {
              sound._pos = [x, y, z];

              if (sound._node) {
                // Check if there is a panner setup and create a new one if not.
                if (!sound._panner || sound._panner.pan) {
                  setupPanner(sound, 'spatial');
                }

                if (typeof sound._panner.positionX !== 'undefined') {
                  sound._panner.positionX.setValueAtTime(x, Howler.ctx.currentTime);

                  sound._panner.positionY.setValueAtTime(y, Howler.ctx.currentTime);

                  sound._panner.positionZ.setValueAtTime(z, Howler.ctx.currentTime);
                } else {
                  sound._panner.setPosition(x, y, z);
                }
              }

              self._emit('pos', sound._id);
            } else {
              return sound._pos;
            }
          }
        }

        return self;
      };
      /**
       * Get/set the direction the audio source is pointing in the 3D cartesian coordinate
       * space. Depending on how direction the sound is, based on the `cone` attributes,
       * a sound pointing away from the listener can be quiet or silent.
       * @param  {Number} x  The x-orientation of the source.
       * @param  {Number} y  The y-orientation of the source.
       * @param  {Number} z  The z-orientation of the source.
       * @param  {Number} id (optional) The sound ID. If none is passed, all in group will be updated.
       * @return {Howl/Array}    Returns self or the current 3D spatial orientation: [x, y, z].
       */


      Howl.prototype.orientation = function (x, y, z, id) {
        var self = this; // Stop right here if not using Web Audio.

        if (!self._webAudio) {
          return self;
        } // If the sound hasn't loaded, add it to the load queue to change orientation when capable.


        if (self._state !== 'loaded') {
          self._queue.push({
            event: 'orientation',
            action: function action() {
              self.orientation(x, y, z, id);
            }
          });

          return self;
        } // Set the defaults for optional 'y' & 'z'.


        y = typeof y !== 'number' ? self._orientation[1] : y;
        z = typeof z !== 'number' ? self._orientation[2] : z; // Setup the group's spatial orientation if no ID is passed.

        if (typeof id === 'undefined') {
          // Return the group's spatial orientation if no parameters are passed.
          if (typeof x === 'number') {
            self._orientation = [x, y, z];
          } else {
            return self._orientation;
          }
        } // Change the spatial orientation of one or all sounds in group.


        var ids = self._getSoundIds(id);

        for (var i = 0; i < ids.length; i++) {
          // Get the sound.
          var sound = self._soundById(ids[i]);

          if (sound) {
            if (typeof x === 'number') {
              sound._orientation = [x, y, z];

              if (sound._node) {
                // Check if there is a panner setup and create a new one if not.
                if (!sound._panner) {
                  // Make sure we have a position to setup the node with.
                  if (!sound._pos) {
                    sound._pos = self._pos || [0, 0, -0.5];
                  }

                  setupPanner(sound, 'spatial');
                }

                if (typeof sound._panner.orientationX !== 'undefined') {
                  sound._panner.orientationX.setValueAtTime(x, Howler.ctx.currentTime);

                  sound._panner.orientationY.setValueAtTime(y, Howler.ctx.currentTime);

                  sound._panner.orientationZ.setValueAtTime(z, Howler.ctx.currentTime);
                } else {
                  sound._panner.setOrientation(x, y, z);
                }
              }

              self._emit('orientation', sound._id);
            } else {
              return sound._orientation;
            }
          }
        }

        return self;
      };
      /**
       * Get/set the panner node's attributes for a sound or group of sounds.
       * This method can optionall take 0, 1 or 2 arguments.
       *   pannerAttr() -> Returns the group's values.
       *   pannerAttr(id) -> Returns the sound id's values.
       *   pannerAttr(o) -> Set's the values of all sounds in this Howl group.
       *   pannerAttr(o, id) -> Set's the values of passed sound id.
       *
       *   Attributes:
       *     coneInnerAngle - (360 by default) A parameter for directional audio sources, this is an angle, in degrees,
       *                      inside of which there will be no volume reduction.
       *     coneOuterAngle - (360 by default) A parameter for directional audio sources, this is an angle, in degrees,
       *                      outside of which the volume will be reduced to a constant value of `coneOuterGain`.
       *     coneOuterGain - (0 by default) A parameter for directional audio sources, this is the gain outside of the
       *                     `coneOuterAngle`. It is a linear value in the range `[0, 1]`.
       *     distanceModel - ('inverse' by default) Determines algorithm used to reduce volume as audio moves away from
       *                     listener. Can be `linear`, `inverse` or `exponential.
       *     maxDistance - (10000 by default) The maximum distance between source and listener, after which the volume
       *                   will not be reduced any further.
       *     refDistance - (1 by default) A reference distance for reducing volume as source moves further from the listener.
       *                   This is simply a variable of the distance model and has a different effect depending on which model
       *                   is used and the scale of your coordinates. Generally, volume will be equal to 1 at this distance.
       *     rolloffFactor - (1 by default) How quickly the volume reduces as source moves from listener. This is simply a
       *                     variable of the distance model and can be in the range of `[0, 1]` with `linear` and `[0, ∞]`
       *                     with `inverse` and `exponential`.
       *     panningModel - ('HRTF' by default) Determines which spatialization algorithm is used to position audio.
       *                     Can be `HRTF` or `equalpower`.
       *
       * @return {Howl/Object} Returns self or current panner attributes.
       */


      Howl.prototype.pannerAttr = function () {
        var self = this;
        var args = arguments;
        var o, id, sound; // Stop right here if not using Web Audio.

        if (!self._webAudio) {
          return self;
        } // Determine the values based on arguments.


        if (args.length === 0) {
          // Return the group's panner attribute values.
          return self._pannerAttr;
        } else if (args.length === 1) {
          if (_typeof3(args[0]) === 'object') {
            o = args[0]; // Set the grou's panner attribute values.

            if (typeof id === 'undefined') {
              if (!o.pannerAttr) {
                o.pannerAttr = {
                  coneInnerAngle: o.coneInnerAngle,
                  coneOuterAngle: o.coneOuterAngle,
                  coneOuterGain: o.coneOuterGain,
                  distanceModel: o.distanceModel,
                  maxDistance: o.maxDistance,
                  refDistance: o.refDistance,
                  rolloffFactor: o.rolloffFactor,
                  panningModel: o.panningModel
                };
              }

              self._pannerAttr = {
                coneInnerAngle: typeof o.pannerAttr.coneInnerAngle !== 'undefined' ? o.pannerAttr.coneInnerAngle : self._coneInnerAngle,
                coneOuterAngle: typeof o.pannerAttr.coneOuterAngle !== 'undefined' ? o.pannerAttr.coneOuterAngle : self._coneOuterAngle,
                coneOuterGain: typeof o.pannerAttr.coneOuterGain !== 'undefined' ? o.pannerAttr.coneOuterGain : self._coneOuterGain,
                distanceModel: typeof o.pannerAttr.distanceModel !== 'undefined' ? o.pannerAttr.distanceModel : self._distanceModel,
                maxDistance: typeof o.pannerAttr.maxDistance !== 'undefined' ? o.pannerAttr.maxDistance : self._maxDistance,
                refDistance: typeof o.pannerAttr.refDistance !== 'undefined' ? o.pannerAttr.refDistance : self._refDistance,
                rolloffFactor: typeof o.pannerAttr.rolloffFactor !== 'undefined' ? o.pannerAttr.rolloffFactor : self._rolloffFactor,
                panningModel: typeof o.pannerAttr.panningModel !== 'undefined' ? o.pannerAttr.panningModel : self._panningModel
              };
            }
          } else {
            // Return this sound's panner attribute values.
            sound = self._soundById(parseInt(args[0], 10));
            return sound ? sound._pannerAttr : self._pannerAttr;
          }
        } else if (args.length === 2) {
          o = args[0];
          id = parseInt(args[1], 10);
        } // Update the values of the specified sounds.


        var ids = self._getSoundIds(id);

        for (var i = 0; i < ids.length; i++) {
          sound = self._soundById(ids[i]);

          if (sound) {
            // Merge the new values into the sound.
            var pa = sound._pannerAttr;
            pa = {
              coneInnerAngle: typeof o.coneInnerAngle !== 'undefined' ? o.coneInnerAngle : pa.coneInnerAngle,
              coneOuterAngle: typeof o.coneOuterAngle !== 'undefined' ? o.coneOuterAngle : pa.coneOuterAngle,
              coneOuterGain: typeof o.coneOuterGain !== 'undefined' ? o.coneOuterGain : pa.coneOuterGain,
              distanceModel: typeof o.distanceModel !== 'undefined' ? o.distanceModel : pa.distanceModel,
              maxDistance: typeof o.maxDistance !== 'undefined' ? o.maxDistance : pa.maxDistance,
              refDistance: typeof o.refDistance !== 'undefined' ? o.refDistance : pa.refDistance,
              rolloffFactor: typeof o.rolloffFactor !== 'undefined' ? o.rolloffFactor : pa.rolloffFactor,
              panningModel: typeof o.panningModel !== 'undefined' ? o.panningModel : pa.panningModel
            }; // Update the panner values or create a new panner if none exists.

            var panner = sound._panner;

            if (panner) {
              panner.coneInnerAngle = pa.coneInnerAngle;
              panner.coneOuterAngle = pa.coneOuterAngle;
              panner.coneOuterGain = pa.coneOuterGain;
              panner.distanceModel = pa.distanceModel;
              panner.maxDistance = pa.maxDistance;
              panner.refDistance = pa.refDistance;
              panner.rolloffFactor = pa.rolloffFactor;
              panner.panningModel = pa.panningModel;
            } else {
              // Make sure we have a position to setup the node with.
              if (!sound._pos) {
                sound._pos = self._pos || [0, 0, -0.5];
              } // Create a new panner node.


              setupPanner(sound, 'spatial');
            }
          }
        }

        return self;
      };
      /** Single Sound Methods **/

      /***************************************************************************/

      /**
       * Add new properties to the core Sound init.
       * @param  {Function} _super Core Sound init method.
       * @return {Sound}
       */


      Sound.prototype.init = function (_super) {
        return function () {
          var self = this;
          var parent = self._parent; // Setup user-defined default properties.

          self._orientation = parent._orientation;
          self._stereo = parent._stereo;
          self._pos = parent._pos;
          self._pannerAttr = parent._pannerAttr; // Complete initilization with howler.js core Sound's init function.

          _super.call(this); // If a stereo or position was specified, set it up.


          if (self._stereo) {
            parent.stereo(self._stereo);
          } else if (self._pos) {
            parent.pos(self._pos[0], self._pos[1], self._pos[2], self._id);
          }
        };
      }(Sound.prototype.init);
      /**
       * Override the Sound.reset method to clean up properties from the spatial plugin.
       * @param  {Function} _super Sound reset method.
       * @return {Sound}
       */


      Sound.prototype.reset = function (_super) {
        return function () {
          var self = this;
          var parent = self._parent; // Reset all spatial plugin properties on this sound.

          self._orientation = parent._orientation;
          self._stereo = parent._stereo;
          self._pos = parent._pos;
          self._pannerAttr = parent._pannerAttr; // If a stereo or position was specified, set it up.

          if (self._stereo) {
            parent.stereo(self._stereo);
          } else if (self._pos) {
            parent.pos(self._pos[0], self._pos[1], self._pos[2], self._id);
          } else if (self._panner) {
            // Disconnect the panner.
            self._panner.disconnect(0);

            self._panner = undefined;

            parent._refreshBuffer(self);
          } // Complete resetting of the sound.


          return _super.call(this);
        };
      }(Sound.prototype.reset);
      /** Helper Methods **/

      /***************************************************************************/

      /**
       * Create a new panner node and save it on the sound.
       * @param  {Sound} sound Specific sound to setup panning on.
       * @param {String} type Type of panner to create: 'stereo' or 'spatial'.
       */


      var setupPanner = function setupPanner(sound, type) {
        type = type || 'spatial'; // Create the new panner node.

        if (type === 'spatial') {
          sound._panner = Howler.ctx.createPanner();
          sound._panner.coneInnerAngle = sound._pannerAttr.coneInnerAngle;
          sound._panner.coneOuterAngle = sound._pannerAttr.coneOuterAngle;
          sound._panner.coneOuterGain = sound._pannerAttr.coneOuterGain;
          sound._panner.distanceModel = sound._pannerAttr.distanceModel;
          sound._panner.maxDistance = sound._pannerAttr.maxDistance;
          sound._panner.refDistance = sound._pannerAttr.refDistance;
          sound._panner.rolloffFactor = sound._pannerAttr.rolloffFactor;
          sound._panner.panningModel = sound._pannerAttr.panningModel;

          if (typeof sound._panner.positionX !== 'undefined') {
            sound._panner.positionX.setValueAtTime(sound._pos[0], Howler.ctx.currentTime);

            sound._panner.positionY.setValueAtTime(sound._pos[1], Howler.ctx.currentTime);

            sound._panner.positionZ.setValueAtTime(sound._pos[2], Howler.ctx.currentTime);
          } else {
            sound._panner.setPosition(sound._pos[0], sound._pos[1], sound._pos[2]);
          }

          if (typeof sound._panner.orientationX !== 'undefined') {
            sound._panner.orientationX.setValueAtTime(sound._orientation[0], Howler.ctx.currentTime);

            sound._panner.orientationY.setValueAtTime(sound._orientation[1], Howler.ctx.currentTime);

            sound._panner.orientationZ.setValueAtTime(sound._orientation[2], Howler.ctx.currentTime);
          } else {
            sound._panner.setOrientation(sound._orientation[0], sound._orientation[1], sound._orientation[2]);
          }
        } else {
          sound._panner = Howler.ctx.createStereoPanner();

          sound._panner.pan.setValueAtTime(sound._stereo, Howler.ctx.currentTime);
        }

        sound._panner.connect(sound._node); // Update the connections.


        if (!sound._paused) {
          sound._parent.pause(sound._id, true).play(sound._id, true);
        }
      };
    })();
  });
  var performanceNow = createCommonjsModule(function (module) {
    // Generated by CoffeeScript 1.12.2
    (function () {
      var getNanoSeconds, hrtime, loadTime, moduleLoadTime, nodeLoadTime, upTime;

      if (typeof performance !== "undefined" && performance !== null && performance.now) {
        module.exports = function () {
          return performance.now();
        };
      } else if (typeof process !== "undefined" && process !== null && process.hrtime) {
        module.exports = function () {
          return (getNanoSeconds() - nodeLoadTime) / 1e6;
        };

        hrtime = process.hrtime;

        getNanoSeconds = function getNanoSeconds() {
          var hr;
          hr = hrtime();
          return hr[0] * 1e9 + hr[1];
        };

        moduleLoadTime = getNanoSeconds();
        upTime = process.uptime() * 1e9;
        nodeLoadTime = moduleLoadTime - upTime;
      } else if (Date.now) {
        module.exports = function () {
          return Date.now() - loadTime;
        };

        loadTime = Date.now();
      } else {
        module.exports = function () {
          return new Date().getTime() - loadTime;
        };

        loadTime = new Date().getTime();
      }
    }).call(commonjsGlobal);
  }); // import { Track, Sections } from 'bach-js'

  /**
   * Represents a musical song/track that can be synchronized with arbitrary behavior and data in real-time
   */

  var Gig = /*#__PURE__*/function (_bachJs_esm$Music) {
    _inherits(Gig, _bachJs_esm$Music);

    var _super2 = _createSuper(Gig);

    /**
     * @param {Object} source track represented in Bach.JSON
     * @param {Audio} [audio] track audio
     * @param {boolean} [loop] enable track looping
     * @param {boolean} [tempo] in beats per minute [REMOVED]
     * @param {Object} [timer] alternative timer/interval API
     * @param {Object} [howler] optional Howler configuration overrides
     */
    function Gig(_ref19) {
      var _this7;

      var source = _ref19.source,
          audio = _ref19.audio,
          loop = _ref19.loop,
          stateless = _ref19.stateless,
          timer = _ref19.timer,
          howler$1 = _ref19.howler;

      _classCallCheck3(this, Gig);

      _this7 = _super2.call(this, source);

      _events["default"].call(_assertThisInitialized(_this7));

      _this7.audio = audio;
      _this7.loop = loop; // this.tempo  = tempo // FIXME: Sync with Howler's rate property

      _this7.timer = timer; // || defaultTimer

      _this7.index = 0;
      _this7.times = {
        origin: null,
        last: null
      };
      _this7.status = STATUS.pristine;
      _this7.stateless = stateless;

      if (audio) {
        _this7.music = new howler.Howl(Object.assign({
          src: audio,
          loop: loop
        }, howler$1));
      } // this.listen()


      return _this7;
    }
    /**
     * Provides the beat found at the track's cursor
     *
     * @returns {Object}
     */


    _createClass3(Gig, [{
      key: "state",
      get: function get() {
        return this.at(this.cursor);
      }
      /**
       * Provides beat found one step behind the track's cursor
       *
       * @returns {Object}
       */

    }, {
      key: "prev",
      get: function get() {
        return this.at(this.cursor - 1);
      }
      /**
       * Provides the beat found one step ahead of the track's cursor
       *
       * @returns {Object}
       */

    }, {
      key: "next",
      get: function get() {
        return this.at(this.cursor + 1);
      }
      /**
       * Determines the cyclic/relative step beat index.
       *
       * @returns {Number}
       */

    }, {
      key: "cursor",
      get: function get() {
        return this.durations.cyclic(this.current);
      }
      /**
       * Determines the global/absolute step beat index.
       * When stateless the step is calculated based on monotonic time.
       * When stateful the step is calculated based on current index value.
       *
       * @returns {Number}
       */

    }, {
      key: "current",
      get: function get() {
        return !this.stateless ? this.index : Math.floor(this.place);
      }
      /**
       * Determines the global/absolute step beat based on elapsed monotonic time.
       *
       * @returns {Number}
       */

    }, {
      key: "place",
      get: function get() {
        return this.durations.cast(this.elapsed, {
          is: 'ms',
          as: 'step'
        });
      }
      /**
       * Determines if the cursor is on the first step
       *
       * @returns {Boolean}
       */

    }, {
      key: "first",
      get: function get() {
        return this.cursor === 0;
      }
      /**
       * Determines if the cursor is on the least measure, beat, or section
       *
       * @returns {Boolean}
       */

    }, {
      key: "last",
      get: function get() {
        return this.cursor === this.durations.total;
      }
      /**
       * Determines if the track is actively playing
       *
       * @returns {Boolean}
       */

    }, {
      key: "playing",
      get: function get() {
        return this.status === STATUS.playing;
      }
      /**
       * Determines if the track is paused
       *
       * @returns {Boolean}
       */

    }, {
      key: "paused",
      get: function get() {
        return this.status === STATUS.paused;
      }
      /**
       * Determines if the track's music is loading (when audible).
       */

    }, {
      key: "loading",
      get: function get() {
        return this.audible ? this.music.state() === 'loading' : false;
      }
      /**
       * Determines if the track's music is loaded (when audible).
       */

    }, {
      key: "loaded",
      get: function get() {
        return this.audible ? this.music.state() === 'loaded' : this.active;
      }
      /**
       * Determines if the track is actively playing (currently the same as .playing)
       *
       * @returns {Boolean}
       */

    }, {
      key: "active",
      get: function get() {
        return ACTIVE_STATUS.includes(this.status);
      }
      /**
       * Determines if the track is inactive
       *
       * @returns {Boolean}
       */

    }, {
      key: "inactive",
      get: function get() {
        return INACTIVE_STATUS.includes(this.status);
      }
      /**
       * Determines if the track is expired
       *
       * @returns {Boolean}
       */

    }, {
      key: "expired",
      get: function get() {
        return EXPIRED_STATUS.includes(this.status);
      }
      /**
       * The amount of time that's elapsed since the track started playing.
       *
       * Used to determine the cursor step when Gig is set to stateless.
       *
       * @returns {Float}
       */

    }, {
      key: "elapsed",
      get: function get() {
        return this.times.origin != null ? performanceNow() - this.times.origin : 0;
      }
      /**
       * The progress of the track's audio (in milliseconds), modulated to 1 (e.g. 1.2 -> 0.2).
       *
       * @returns {Number}
       */

    }, {
      key: "progress",
      get: function get() {
        return this.completion % 1;
      }
      /**
       * The run-time completion of the entire track (values exceeding 1 mean the track has looped).
       *
       * @returns {Number}
       */

    }, {
      key: "completion",
      get: function get() {
        return this.elapsed / this.duration;
      }
      /**
       * The duration of the track's audio (in milliseconds).
       *
       * @returns {Number}
       */

    }, {
      key: "duration",
      get: function get() {
        return this.durations.cast(this.durations.total, {
          as: 'ms'
        });
      }
      /**
       * Whether or not the Gig object has associated audio.
       *
       * @returns {Boolean}
       */

    }, {
      key: "audible",
      get: function get() {
        return this.audio && this.music;
      }
      /**
       * Whether or not the track is configured to loop playback indefinitely.
       *
       * @returns {Boolean}
       */

    }, {
      key: "loops",
      get: function get() {
        return this.loop || !!(this.audible && this.music.loop());
      }
      /**
       * Changes loop configuration of track and associated audio.
       *
       * @returns {Boolean}
       */
      ,
      set: function set(loop) {
        this.loop = loop;

        if (this.audible) {
          this.music.loop(loop);
        }
      }
      /**
       * Determines the number of times the track has already looped/repeated.
       *
       * @returns {Number}
       */

    }, {
      key: "iterations",
      get: function get() {
        return this.current / (this.durations.total - 1);
      }
      /**
       * Determines if the track has already looped/repeated.
       *
       * @returns {Boolean}
       */

    }, {
      key: "repeating",
      get: function get() {
        return this.iterations >= 1;
      }
      /**
       * Specifies the limit of steps in a track
       *
       * @returns {Number}
       */

    }, {
      key: "limit",
      get: function get() {
        return this.loops ? Math.Infinity : this.duration;
      }
      /**
       * Provides the index of the current pulse beat under the context of a looping metronome.
       *
       * @returns {Number}
       */

    }, {
      key: "metronome",
      get: function get() {
        return this.durations.metronize(this.elapsed, {
          is: 'ms'
        });
      }
      /**
       * Synchronizes track with the Howler API
       */

    }, {
      key: "listen",
      value: function listen() {
        this.music.on('play', this.play);
        this.music.on('pause', this.pause);
        this.music.on('stop', this.stop);
        this.music.on('rate', this.rate);
        this.music.on('seek', this.seek);
      }
      /**
       * Instantiates a new clock which acts as the primary synchronization mechanism
       */
      // FIXME: This needs to return a Promise, that way `play` only gets called after the timer has been invoked

    }, {
      key: "start",
      value: function start() {
        this.clock = this.timer(this);
        this.times.origin = performanceNow();
        this.emit('start');
        this.is('playing');
      }
      /**
       * Loads the audio data and kicks off the synchronization clock
       */

    }, {
      key: "play",
      value: function play() {
        var _this8 = this;

        if (this.audible) {
          this.music.on('load', function () {
            _this8.start();

            _this8.music.play();

            _this8.emit('play');
          });
        } else {
          this.start();
          this.emit('play');
        }

        return this;
      }
      /**
       * Stops the audio and the synchronization clock (no resume)
       */

    }, {
      key: "stop",
      value: function stop() {
        if (!this.clock) return this;

        if (this.audible) {
          this.music.stop();
          this.music.unload();
        }

        this.clock.stop();
        this.emit('stop');
        return this.reset().is('stopped');
      }
      /**
       * Pauses the audio and the synchronization clock
       */

    }, {
      key: "pause",
      value: function pause() {
        if (this.audible) this.music.pause();
        this.clock.pause();
        this.emit('pause');
        return this.is('paused');
      }
      /**
       * Resumes the audio and the synchronization clock
       */

    }, {
      key: "resume",
      value: function resume() {
        if (this.audible) this.music.play();
        this.clock.resume();
        this.emit('resume');
        return this.is('playing');
      }
      /**
       * Mutes the track audio
       */

    }, {
      key: "mute",
      value: function mute() {
        if (this.audible) this.music.mute();
        this.emit('mute');
        return this;
      }
      /**
       * Seek to a new position in the track
       *
       * @param {number} to position in the track in seconds
       * @fixme
       */
      // WARN: probably can't even support this because of dynamic interval (step can change arbitrarily)
      // NOTE: if we assume every interval is the same, relative to tempo, this could work

    }, {
      key: "seek",
      value: function seek(to) {
        if (this.audible) this.music.seek(to); // TODO: this.reorient()

        this.emit('seek');
        return this;
      }
      /**
       * Invokes the action to perform on each interval and emits
       * various events based on current state of the step.
       */

    }, {
      key: "step",
      value: function step() {
        var state = this.state,
            interval = this.interval;
        var beat = state.beat,
            play = state.play,
            stop = state.stop;

        if (stop.length) {
          this.emit('stop:beat', stop);
        }

        if (this.repeating && this.first) {
          if (this.loops) {
            this.emit('loop', state);
          } else {
            return this.kill();
          }
        }

        if (play.length) {
          this.emit('play:beat', beat);
        } // this.index = beat.index


        this.index++;
        this.times.last = performanceNow();
      }
      /**
       * Moves playback cursor to the provided duration.
       *
       * WARN: Work in progress
       */

    }, {
      key: "travel",
      value: function travel(duration) {
        var is = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'step';
        var step = this.durations.cast(duration, {
          is: is,
          as: 'step'
        });
        var time = this.durations.cast(step, {
          as: 'ms'
        });
        var last = this.durations.cast(Math.floor(step), {
          as: 'ms'
        });
        this.index = Math.floor(step);
        this.times.last = last;
        this.times.origin = performanceNow() - time;
        return this;
      }
      /**
       * Resets the cursor indices to their initial unplayed state
       */

    }, {
      key: "reset",
      value: function reset() {
        this.index = 0;
        this.times = {
          origin: null,
          last: null
        };
        return this;
      }
      /**
       * Removes all active event listeners
       *
       * TODO: Consider automatically stopping the track here if already running
       */
      // purge

    }, {
      key: "clear",
      value: function clear() {
        return this.removeAllListeners();
      }
      /**
       * Immediately stops the track, its clock, and removes all active event listeners
       */

    }, {
      key: "kill",
      value: function kill() {
        return this.stop().clear().is('killed');
      }
      /**
       * Updates the playing status of the track (idempotent, no reactivity or side-effects).
       */

    }, {
      key: "is",
      value: function is(status) {
        var key = status.toLowerCase();
        var value = STATUS[key];
        if (!value) throw Error("".concat(key, " is an invalid status"));
        this.status = value;
        return this;
      }
      /**
       * Determines if the playing status matches the provided status key string.
       *
       * @returns {Boolean}
       */

    }, {
      key: "check",
      value: function check(status) {
        var key = status.toLowerCase();
        var value = STATUS[key];
        return this.status === value;
      }
    }]);

    return Gig;
  }(bachJs_esm.Music);

  _exports2.Gig = Gig;
  Object.assign(bachJs_esm.Music.prototype, _events["default"].prototype); // export const defaultTimer = track => setStatefulDynterval(track.step.bind(track), { wait: track.interval, immediate: true })

  var STATUS = {
    pristine: Symbol('pristine'),
    playing: Symbol('playing'),
    stopped: Symbol('stopped'),
    paused: Symbol('paused'),
    killed: Symbol('killed')
  };
  _exports2.STATUS = STATUS;
  var ACTIVE_STATUS = [STATUS.playing];
  _exports2.ACTIVE_STATUS = ACTIVE_STATUS;
  var INACTIVE_STATUS = [STATUS.pristine, STATUS.stopped, STATUS.paused, STATUS.killed];
  _exports2.INACTIVE_STATUS = INACTIVE_STATUS;
  var EXPIRED_STATUS = [STATUS.stopped, STATUS.killed];
  _exports2.EXPIRED_STATUS = EXPIRED_STATUS;
  var CONSTANTS = Gig.CONSTANTS = {
    STATUS: STATUS,
    ACTIVE_STATUS: ACTIVE_STATUS,
    INACTIVE_STATUS: INACTIVE_STATUS,
    EXPIRED_STATUS: EXPIRED_STATUS
  };
  _exports2.CONSTANTS = CONSTANTS;
});
//# sourceMappingURL=gig.umd.js.map
