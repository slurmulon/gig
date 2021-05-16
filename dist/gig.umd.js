(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('process'), require('events')) :
	typeof define === 'function' && define.amd ? define(['exports', 'process', 'events'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.gig = {}, global.process$1, global.EventEmitter));
}(this, (function (exports, process$1, EventEmitter) { 'use strict';

	function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

	var process__default = /*#__PURE__*/_interopDefaultLegacy(process$1);
	var EventEmitter__default = /*#__PURE__*/_interopDefaultLegacy(EventEmitter);

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn) {
	  var module = { exports: {} };
		return fn(module, module.exports), module.exports;
	}

	var check = function (it) {
	  return it && it.Math == Math && it;
	};

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global$1 =
	  // eslint-disable-next-line es/no-global-this -- safe
	  check(typeof globalThis == 'object' && globalThis) ||
	  check(typeof window == 'object' && window) ||
	  // eslint-disable-next-line no-restricted-globals -- safe
	  check(typeof self == 'object' && self) ||
	  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
	  // eslint-disable-next-line no-new-func -- fallback
	  (function () { return this; })() || Function('return this')();

	var fails = function (exec) {
	  try {
	    return !!exec();
	  } catch (error) {
	    return true;
	  }
	};

	// Detect IE8's incomplete defineProperty implementation
	var descriptors = !fails(function () {
	  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
	  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
	});

	var $propertyIsEnumerable$1 = {}.propertyIsEnumerable;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var getOwnPropertyDescriptor$3 = Object.getOwnPropertyDescriptor;

	// Nashorn ~ JDK8 bug
	var NASHORN_BUG = getOwnPropertyDescriptor$3 && !$propertyIsEnumerable$1.call({ 1: 2 }, 1);

	// `Object.prototype.propertyIsEnumerable` method implementation
	// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
	var f$6 = NASHORN_BUG ? function propertyIsEnumerable(V) {
	  var descriptor = getOwnPropertyDescriptor$3(this, V);
	  return !!descriptor && descriptor.enumerable;
	} : $propertyIsEnumerable$1;

	var objectPropertyIsEnumerable = {
		f: f$6
	};

	var createPropertyDescriptor = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var toString$1 = {}.toString;

	var classofRaw = function (it) {
	  return toString$1.call(it).slice(8, -1);
	};

	var split = ''.split;

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var indexedObject = fails(function () {
	  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
	  // eslint-disable-next-line no-prototype-builtins -- safe
	  return !Object('z').propertyIsEnumerable(0);
	}) ? function (it) {
	  return classofRaw(it) == 'String' ? split.call(it, '') : Object(it);
	} : Object;

	// `RequireObjectCoercible` abstract operation
	// https://tc39.es/ecma262/#sec-requireobjectcoercible
	var requireObjectCoercible = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on " + it);
	  return it;
	};

	// toObject with fallback for non-array-like ES3 strings



	var toIndexedObject = function (it) {
	  return indexedObject(requireObjectCoercible(it));
	};

	var isObject = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	// `ToPrimitive` abstract operation
	// https://tc39.es/ecma262/#sec-toprimitive
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	var toPrimitive = function (input, PREFERRED_STRING) {
	  if (!isObject(input)) return input;
	  var fn, val;
	  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
	  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
	  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	// `ToObject` abstract operation
	// https://tc39.es/ecma262/#sec-toobject
	var toObject = function (argument) {
	  return Object(requireObjectCoercible(argument));
	};

	var hasOwnProperty = {}.hasOwnProperty;

	var has$1 = function hasOwn(it, key) {
	  return hasOwnProperty.call(toObject(it), key);
	};

	var document$1 = global$1.document;
	// typeof document.createElement is 'object' in old IE
	var EXISTS = isObject(document$1) && isObject(document$1.createElement);

	var documentCreateElement = function (it) {
	  return EXISTS ? document$1.createElement(it) : {};
	};

	// Thank's IE8 for his funny defineProperty
	var ie8DomDefine = !descriptors && !fails(function () {
	  // eslint-disable-next-line es/no-object-defineproperty -- requied for testing
	  return Object.defineProperty(documentCreateElement('div'), 'a', {
	    get: function () { return 7; }
	  }).a != 7;
	});

	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

	// `Object.getOwnPropertyDescriptor` method
	// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
	var f$5 = descriptors ? $getOwnPropertyDescriptor$1 : function getOwnPropertyDescriptor(O, P) {
	  O = toIndexedObject(O);
	  P = toPrimitive(P, true);
	  if (ie8DomDefine) try {
	    return $getOwnPropertyDescriptor$1(O, P);
	  } catch (error) { /* empty */ }
	  if (has$1(O, P)) return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
	};

	var objectGetOwnPropertyDescriptor = {
		f: f$5
	};

	var replacement = /#|\.prototype\./;

	var isForced = function (feature, detection) {
	  var value = data$1[normalize(feature)];
	  return value == POLYFILL ? true
	    : value == NATIVE ? false
	    : typeof detection == 'function' ? fails(detection)
	    : !!detection;
	};

	var normalize = isForced.normalize = function (string) {
	  return String(string).replace(replacement, '.').toLowerCase();
	};

	var data$1 = isForced.data = {};
	var NATIVE = isForced.NATIVE = 'N';
	var POLYFILL = isForced.POLYFILL = 'P';

	var isForced_1 = isForced;

	var path = {};

	var aFunction$1 = function (it) {
	  if (typeof it != 'function') {
	    throw TypeError(String(it) + ' is not a function');
	  } return it;
	};

	// optional / simple context binding
	var functionBindContext = function (fn, that, length) {
	  aFunction$1(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 0: return function () {
	      return fn.call(that);
	    };
	    case 1: return function (a) {
	      return fn.call(that, a);
	    };
	    case 2: return function (a, b) {
	      return fn.call(that, a, b);
	    };
	    case 3: return function (a, b, c) {
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};

	var anObject = function (it) {
	  if (!isObject(it)) {
	    throw TypeError(String(it) + ' is not an object');
	  } return it;
	};

	// eslint-disable-next-line es/no-object-defineproperty -- safe
	var $defineProperty$1 = Object.defineProperty;

	// `Object.defineProperty` method
	// https://tc39.es/ecma262/#sec-object.defineproperty
	var f$4 = descriptors ? $defineProperty$1 : function defineProperty(O, P, Attributes) {
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if (ie8DomDefine) try {
	    return $defineProperty$1(O, P, Attributes);
	  } catch (error) { /* empty */ }
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






	var wrapConstructor = function (NativeConstructor) {
	  var Wrapper = function (a, b, c) {
	    if (this instanceof NativeConstructor) {
	      switch (arguments.length) {
	        case 0: return new NativeConstructor();
	        case 1: return new NativeConstructor(a);
	        case 2: return new NativeConstructor(a, b);
	      } return new NativeConstructor(a, b, c);
	    } return NativeConstructor.apply(this, arguments);
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
	var _export = function (options, source) {
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
	    FORCED = isForced_1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
	    // contains in native
	    USE_NATIVE = !FORCED && nativeSource && has$1(nativeSource, key);

	    targetProperty = target[key];

	    if (USE_NATIVE) if (options.noTargetGet) {
	      descriptor = getOwnPropertyDescriptor$2(nativeSource, key);
	      nativeProperty = descriptor && descriptor.value;
	    } else nativeProperty = nativeSource[key];

	    // export native or implementation
	    sourceProperty = (USE_NATIVE && nativeProperty) ? nativeProperty : source[key];

	    if (USE_NATIVE && typeof targetProperty === typeof sourceProperty) continue;

	    // bind timers to global for call from export context
	    if (options.bind && USE_NATIVE) resultProperty = functionBindContext(sourceProperty, global$1);
	    // wrap global constructors for prevent changs in this version
	    else if (options.wrap && USE_NATIVE) resultProperty = wrapConstructor(sourceProperty);
	    // make static versions for prototype methods
	    else if (PROTO && typeof sourceProperty == 'function') resultProperty = functionBindContext(Function.call, sourceProperty);
	    // default case
	    else resultProperty = sourceProperty;

	    // add a flag to not completely full polyfills
	    if (options.sham || (sourceProperty && sourceProperty.sham) || (targetProperty && targetProperty.sham)) {
	      createNonEnumerableProperty(resultProperty, 'sham', true);
	    }

	    target[key] = resultProperty;

	    if (PROTO) {
	      VIRTUAL_PROTOTYPE = TARGET + 'Prototype';
	      if (!has$1(path, VIRTUAL_PROTOTYPE)) {
	        createNonEnumerableProperty(path, VIRTUAL_PROTOTYPE, {});
	      }
	      // export virtual prototype methods
	      path[VIRTUAL_PROTOTYPE][key] = sourceProperty;
	      // export real prototype methods
	      if (options.real && targetPrototype && !targetPrototype[key]) {
	        createNonEnumerableProperty(targetPrototype, key, sourceProperty);
	      }
	    }
	  }
	};

	var aFunction = function (variable) {
	  return typeof variable == 'function' ? variable : undefined;
	};

	var getBuiltIn = function (namespace, method) {
	  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global$1[namespace])
	    : path[namespace] && path[namespace][method] || global$1[namespace] && global$1[namespace][method];
	};

	var engineUserAgent = getBuiltIn('navigator', 'userAgent') || '';

	var process = global$1.process;
	var versions = process && process.versions;
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
	  return !String(Symbol()) ||
	    // Chrome 38 Symbol has incorrect toString conversion
	    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
	    !Symbol.sham && engineV8Version && engineV8Version < 41;
	});

	/* eslint-disable es/no-symbol -- required for testing */

	var useSymbolAsUid = nativeSymbol
	  && !Symbol.sham
	  && typeof Symbol.iterator == 'symbol';

	// `IsArray` abstract operation
	// https://tc39.es/ecma262/#sec-isarray
	// eslint-disable-next-line es/no-array-isarray -- safe
	var isArray$5 = Array.isArray || function isArray(arg) {
	  return classofRaw(arg) == 'Array';
	};

	var ceil = Math.ceil;
	var floor = Math.floor;

	// `ToInteger` abstract operation
	// https://tc39.es/ecma262/#sec-tointeger
	var toInteger = function (argument) {
	  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
	};

	var min$1 = Math.min;

	// `ToLength` abstract operation
	// https://tc39.es/ecma262/#sec-tolength
	var toLength = function (argument) {
	  return argument > 0 ? min$1(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
	};

	var max$1 = Math.max;
	var min = Math.min;

	// Helper for a popular repeating case of the spec:
	// Let integer be ? ToInteger(index).
	// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
	var toAbsoluteIndex = function (index, length) {
	  var integer = toInteger(index);
	  return integer < 0 ? max$1(integer + length, 0) : min(integer, length);
	};

	// `Array.prototype.{ indexOf, includes }` methods implementation
	var createMethod$4 = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIndexedObject($this);
	    var length = toLength(O.length);
	    var index = toAbsoluteIndex(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare -- NaN check
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare -- NaN check
	      if (value != value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) {
	      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

	var arrayIncludes = {
	  // `Array.prototype.includes` method
	  // https://tc39.es/ecma262/#sec-array.prototype.includes
	  includes: createMethod$4(true),
	  // `Array.prototype.indexOf` method
	  // https://tc39.es/ecma262/#sec-array.prototype.indexof
	  indexOf: createMethod$4(false)
	};

	var hiddenKeys$1 = {};

	var indexOf = arrayIncludes.indexOf;


	var objectKeysInternal = function (object, names) {
	  var O = toIndexedObject(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) !has$1(hiddenKeys$1, key) && has$1(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (has$1(O, key = names[i++])) {
	    ~indexOf(result, key) || result.push(key);
	  }
	  return result;
	};

	// IE8- don't enum bug keys
	var enumBugKeys = [
	  'constructor',
	  'hasOwnProperty',
	  'isPrototypeOf',
	  'propertyIsEnumerable',
	  'toLocaleString',
	  'toString',
	  'valueOf'
	];

	// `Object.keys` method
	// https://tc39.es/ecma262/#sec-object.keys
	// eslint-disable-next-line es/no-object-keys -- safe
	var objectKeys = Object.keys || function keys(O) {
	  return objectKeysInternal(O, enumBugKeys);
	};

	// `Object.defineProperties` method
	// https://tc39.es/ecma262/#sec-object.defineproperties
	// eslint-disable-next-line es/no-object-defineproperties -- safe
	var objectDefineProperties = descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject(O);
	  var keys = objectKeys(Properties);
	  var length = keys.length;
	  var index = 0;
	  var key;
	  while (length > index) objectDefineProperty.f(O, key = keys[index++], Properties[key]);
	  return O;
	};

	var html = getBuiltIn('document', 'documentElement');

	var setGlobal = function (key, value) {
	  try {
	    createNonEnumerableProperty(global$1, key, value);
	  } catch (error) {
	    global$1[key] = value;
	  } return value;
	};

	var SHARED = '__core-js_shared__';
	var store$1 = global$1[SHARED] || setGlobal(SHARED, {});

	var sharedStore = store$1;

	var shared = createCommonjsModule(function (module) {
	(module.exports = function (key, value) {
	  return sharedStore[key] || (sharedStore[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: '3.12.1',
	  mode: 'pure' ,
	  copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
	});
	});

	var id = 0;
	var postfix = Math.random();

	var uid = function (key) {
	  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
	};

	var keys$3 = shared('keys');

	var sharedKey = function (key) {
	  return keys$3[key] || (keys$3[key] = uid(key));
	};

	var GT = '>';
	var LT = '<';
	var PROTOTYPE$1 = 'prototype';
	var SCRIPT = 'script';
	var IE_PROTO$1 = sharedKey('IE_PROTO');

	var EmptyConstructor = function () { /* empty */ };

	var scriptTag = function (content) {
	  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
	};

	// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
	var NullProtoObjectViaActiveX = function (activeXDocument) {
	  activeXDocument.write(scriptTag(''));
	  activeXDocument.close();
	  var temp = activeXDocument.parentWindow.Object;
	  activeXDocument = null; // avoid memory leak
	  return temp;
	};

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var NullProtoObjectViaIFrame = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = documentCreateElement('iframe');
	  var JS = 'java' + SCRIPT + ':';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  html.appendChild(iframe);
	  // https://github.com/zloirock/core-js/issues/475
	  iframe.src = String(JS);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(scriptTag('document.F=Object'));
	  iframeDocument.close();
	  return iframeDocument.F;
	};

	// Check for document.domain and active x support
	// No need to use active x approach when document.domain is not set
	// see https://github.com/es-shims/es5-shim/issues/150
	// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
	// avoid IE GC bug
	var activeXDocument;
	var NullProtoObject = function () {
	  try {
	    /* global ActiveXObject -- old IE */
	    activeXDocument = document.domain && new ActiveXObject('htmlfile');
	  } catch (error) { /* ignore */ }
	  NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
	  var length = enumBugKeys.length;
	  while (length--) delete NullProtoObject[PROTOTYPE$1][enumBugKeys[length]];
	  return NullProtoObject();
	};

	hiddenKeys$1[IE_PROTO$1] = true;

	// `Object.create` method
	// https://tc39.es/ecma262/#sec-object.create
	var objectCreate = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    EmptyConstructor[PROTOTYPE$1] = anObject(O);
	    result = new EmptyConstructor();
	    EmptyConstructor[PROTOTYPE$1] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO$1] = O;
	  } else result = NullProtoObject();
	  return Properties === undefined ? result : objectDefineProperties(result, Properties);
	};

	var hiddenKeys = enumBugKeys.concat('length', 'prototype');

	// `Object.getOwnPropertyNames` method
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

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function (it) {
	  try {
	    return $getOwnPropertyNames$1(it);
	  } catch (error) {
	    return windowNames.slice();
	  }
	};

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var f$2 = function getOwnPropertyNames(it) {
	  return windowNames && toString.call(it) == '[object Window]'
	    ? getWindowNames(it)
	    : $getOwnPropertyNames$1(toIndexedObject(it));
	};

	var objectGetOwnPropertyNamesExternal = {
		f: f$2
	};

	// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
	var f$1 = Object.getOwnPropertySymbols;

	var objectGetOwnPropertySymbols = {
		f: f$1
	};

	var redefine = function (target, key, value, options) {
	  if (options && options.enumerable) target[key] = value;
	  else createNonEnumerableProperty(target, key, value);
	};

	var WellKnownSymbolsStore$1 = shared('wks');
	var Symbol$1 = global$1.Symbol;
	var createWellKnownSymbol = useSymbolAsUid ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid;

	var wellKnownSymbol = function (name) {
	  if (!has$1(WellKnownSymbolsStore$1, name) || !(nativeSymbol || typeof WellKnownSymbolsStore$1[name] == 'string')) {
	    if (nativeSymbol && has$1(Symbol$1, name)) {
	      WellKnownSymbolsStore$1[name] = Symbol$1[name];
	    } else {
	      WellKnownSymbolsStore$1[name] = createWellKnownSymbol('Symbol.' + name);
	    }
	  } return WellKnownSymbolsStore$1[name];
	};

	var f = wellKnownSymbol;

	var wellKnownSymbolWrapped = {
		f: f
	};

	var defineProperty$7 = objectDefineProperty.f;

	var defineWellKnownSymbol = function (NAME) {
	  var Symbol = path.Symbol || (path.Symbol = {});
	  if (!has$1(Symbol, NAME)) defineProperty$7(Symbol, NAME, {
	    value: wellKnownSymbolWrapped.f(NAME)
	  });
	};

	var TO_STRING_TAG$3 = wellKnownSymbol('toStringTag');
	var test$1 = {};

	test$1[TO_STRING_TAG$3] = 'z';

	var toStringTagSupport = String(test$1) === '[object z]';

	var TO_STRING_TAG$2 = wellKnownSymbol('toStringTag');
	// ES3 wrong here
	var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function (it, key) {
	  try {
	    return it[key];
	  } catch (error) { /* empty */ }
	};

	// getting tag from ES6+ `Object.prototype.toString`
	var classof = toStringTagSupport ? classofRaw : function (it) {
	  var O, tag, result;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG$2)) == 'string' ? tag
	    // builtinTag case
	    : CORRECT_ARGUMENTS ? classofRaw(O)
	    // ES3 arguments fallback
	    : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
	};

	// `Object.prototype.toString` method implementation
	// https://tc39.es/ecma262/#sec-object.prototype.tostring
	var objectToString = toStringTagSupport ? {}.toString : function toString() {
	  return '[object ' + classof(this) + ']';
	};

	var defineProperty$6 = objectDefineProperty.f;





	var TO_STRING_TAG$1 = wellKnownSymbol('toStringTag');

	var setToStringTag = function (it, TAG, STATIC, SET_METHOD) {
	  if (it) {
	    var target = STATIC ? it : it.prototype;
	    if (!has$1(target, TO_STRING_TAG$1)) {
	      defineProperty$6(target, TO_STRING_TAG$1, { configurable: true, value: TAG });
	    }
	    if (SET_METHOD && !toStringTagSupport) {
	      createNonEnumerableProperty(target, 'toString', objectToString);
	    }
	  }
	};

	var functionToString = Function.toString;

	// this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper
	if (typeof sharedStore.inspectSource != 'function') {
	  sharedStore.inspectSource = function (it) {
	    return functionToString.call(it);
	  };
	}

	var inspectSource = sharedStore.inspectSource;

	var WeakMap$1 = global$1.WeakMap;

	var nativeWeakMap = typeof WeakMap$1 === 'function' && /native code/.test(inspectSource(WeakMap$1));

	var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
	var WeakMap = global$1.WeakMap;
	var set$3, get, has;

	var enforce = function (it) {
	  return has(it) ? get(it) : set$3(it, {});
	};

	var getterFor = function (TYPE) {
	  return function (it) {
	    var state;
	    if (!isObject(it) || (state = get(it)).type !== TYPE) {
	      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
	    } return state;
	  };
	};

	if (nativeWeakMap || sharedStore.state) {
	  var store = sharedStore.state || (sharedStore.state = new WeakMap());
	  var wmget = store.get;
	  var wmhas = store.has;
	  var wmset = store.set;
	  set$3 = function (it, metadata) {
	    if (wmhas.call(store, it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
	    metadata.facade = it;
	    wmset.call(store, it, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return wmget.call(store, it) || {};
	  };
	  has = function (it) {
	    return wmhas.call(store, it);
	  };
	} else {
	  var STATE = sharedKey('state');
	  hiddenKeys$1[STATE] = true;
	  set$3 = function (it, metadata) {
	    if (has$1(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
	    metadata.facade = it;
	    createNonEnumerableProperty(it, STATE, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return has$1(it, STATE) ? it[STATE] : {};
	  };
	  has = function (it) {
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

	var SPECIES$3 = wellKnownSymbol('species');

	// `ArraySpeciesCreate` abstract operation
	// https://tc39.es/ecma262/#sec-arrayspeciescreate
	var arraySpeciesCreate = function (originalArray, length) {
	  var C;
	  if (isArray$5(originalArray)) {
	    C = originalArray.constructor;
	    // cross-realm fallback
	    if (typeof C == 'function' && (C === Array || isArray$5(C.prototype))) C = undefined;
	    else if (isObject(C)) {
	      C = C[SPECIES$3];
	      if (C === null) C = undefined;
	    }
	  } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
	};

	var push = [].push;

	// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterOut }` methods implementation
	var createMethod$3 = function (TYPE) {
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
	    for (;length > index; index++) if (NO_HOLES || index in self) {
	      value = self[index];
	      result = boundFunction(value, index, O);
	      if (TYPE) {
	        if (IS_MAP) target[index] = result; // map
	        else if (result) switch (TYPE) {
	          case 3: return true;              // some
	          case 5: return value;             // find
	          case 6: return index;             // findIndex
	          case 2: push.call(target, value); // filter
	        } else switch (TYPE) {
	          case 4: return false;             // every
	          case 7: push.call(target, value); // filterOut
	        }
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
	  };
	};

	var arrayIteration = {
	  // `Array.prototype.forEach` method
	  // https://tc39.es/ecma262/#sec-array.prototype.foreach
	  forEach: createMethod$3(0),
	  // `Array.prototype.map` method
	  // https://tc39.es/ecma262/#sec-array.prototype.map
	  map: createMethod$3(1),
	  // `Array.prototype.filter` method
	  // https://tc39.es/ecma262/#sec-array.prototype.filter
	  filter: createMethod$3(2),
	  // `Array.prototype.some` method
	  // https://tc39.es/ecma262/#sec-array.prototype.some
	  some: createMethod$3(3),
	  // `Array.prototype.every` method
	  // https://tc39.es/ecma262/#sec-array.prototype.every
	  every: createMethod$3(4),
	  // `Array.prototype.find` method
	  // https://tc39.es/ecma262/#sec-array.prototype.find
	  find: createMethod$3(5),
	  // `Array.prototype.findIndex` method
	  // https://tc39.es/ecma262/#sec-array.prototype.findIndex
	  findIndex: createMethod$3(6),
	  // `Array.prototype.filterOut` method
	  // https://github.com/tc39/proposal-array-filtering
	  filterOut: createMethod$3(7)
	};

	var $forEach$1 = arrayIteration.forEach;

	var HIDDEN = sharedKey('hidden');
	var SYMBOL = 'Symbol';
	var PROTOTYPE = 'prototype';
	var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');
	var setInternalState$4 = internalState.set;
	var getInternalState$2 = internalState.getterFor(SYMBOL);
	var ObjectPrototype$1 = Object[PROTOTYPE];
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
	var QObject = global$1.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDescriptor = descriptors && fails(function () {
	  return objectCreate(nativeDefineProperty({}, 'a', {
	    get: function () { return nativeDefineProperty(this, 'a', { value: 7 }).a; }
	  })).a != 7;
	}) ? function (O, P, Attributes) {
	  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor$1(ObjectPrototype$1, P);
	  if (ObjectPrototypeDescriptor) delete ObjectPrototype$1[P];
	  nativeDefineProperty(O, P, Attributes);
	  if (ObjectPrototypeDescriptor && O !== ObjectPrototype$1) {
	    nativeDefineProperty(ObjectPrototype$1, P, ObjectPrototypeDescriptor);
	  }
	} : nativeDefineProperty;

	var wrap = function (tag, description) {
	  var symbol = AllSymbols[tag] = objectCreate($Symbol[PROTOTYPE]);
	  setInternalState$4(symbol, {
	    type: SYMBOL,
	    tag: tag,
	    description: description
	  });
	  if (!descriptors) symbol.description = description;
	  return symbol;
	};

	var isSymbol = useSymbolAsUid ? function (it) {
	  return typeof it == 'symbol';
	} : function (it) {
	  return Object(it) instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(O, P, Attributes) {
	  if (O === ObjectPrototype$1) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
	  anObject(O);
	  var key = toPrimitive(P, true);
	  anObject(Attributes);
	  if (has$1(AllSymbols, key)) {
	    if (!Attributes.enumerable) {
	      if (!has$1(O, HIDDEN)) nativeDefineProperty(O, HIDDEN, createPropertyDescriptor(1, {}));
	      O[HIDDEN][key] = true;
	    } else {
	      if (has$1(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
	      Attributes = objectCreate(Attributes, { enumerable: createPropertyDescriptor(0, false) });
	    } return setSymbolDescriptor(O, key, Attributes);
	  } return nativeDefineProperty(O, key, Attributes);
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
	  if (this === ObjectPrototype$1 && has$1(AllSymbols, P) && !has$1(ObjectPrototypeSymbols, P)) return false;
	  return enumerable || !has$1(this, P) || !has$1(AllSymbols, P) || has$1(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
	};

	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
	  var it = toIndexedObject(O);
	  var key = toPrimitive(P, true);
	  if (it === ObjectPrototype$1 && has$1(AllSymbols, key) && !has$1(ObjectPrototypeSymbols, key)) return;
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
	  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype$1;
	  var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
	  var result = [];
	  $forEach$1(names, function (key) {
	    if (has$1(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || has$1(ObjectPrototype$1, key))) {
	      result.push(AllSymbols[key]);
	    }
	  });
	  return result;
	};

	// `Symbol` constructor
	// https://tc39.es/ecma262/#sec-symbol-constructor
	if (!nativeSymbol) {
	  $Symbol = function Symbol() {
	    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor');
	    var description = !arguments.length || arguments[0] === undefined ? undefined : String(arguments[0]);
	    var tag = uid(description);
	    var setter = function (value) {
	      if (this === ObjectPrototype$1) setter.call(ObjectPrototypeSymbols, value);
	      if (has$1(this, HIDDEN) && has$1(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
	      setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
	    };
	    if (descriptors && USE_SETTER) setSymbolDescriptor(ObjectPrototype$1, tag, { configurable: true, set: setter });
	    return wrap(tag, description);
	  };

	  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
	    return getInternalState$2(this).tag;
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
	        return getInternalState$2(this).description;
	      }
	    });
	  }
	}

	_export({ global: true, wrap: true, forced: !nativeSymbol, sham: !nativeSymbol }, {
	  Symbol: $Symbol
	});

	$forEach$1(objectKeys(WellKnownSymbolsStore), function (name) {
	  defineWellKnownSymbol(name);
	});

	_export({ target: SYMBOL, stat: true, forced: !nativeSymbol }, {
	  // `Symbol.for` method
	  // https://tc39.es/ecma262/#sec-symbol.for
	  'for': function (key) {
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
	  useSetter: function () { USE_SETTER = true; },
	  useSimple: function () { USE_SETTER = false; }
	});

	_export({ target: 'Object', stat: true, forced: !nativeSymbol, sham: !descriptors }, {
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

	_export({ target: 'Object', stat: true, forced: !nativeSymbol }, {
	  // `Object.getOwnPropertyNames` method
	  // https://tc39.es/ecma262/#sec-object.getownpropertynames
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // `Object.getOwnPropertySymbols` method
	  // https://tc39.es/ecma262/#sec-object.getownpropertysymbols
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
	// https://bugs.chromium.org/p/v8/issues/detail?id=3443
	_export({ target: 'Object', stat: true, forced: fails(function () { objectGetOwnPropertySymbols.f(1); }) }, {
	  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
	    return objectGetOwnPropertySymbols.f(toObject(it));
	  }
	});

	// `JSON.stringify` method behavior with symbols
	// https://tc39.es/ecma262/#sec-json.stringify
	if ($stringify) {
	  var FORCED_JSON_STRINGIFY = !nativeSymbol || fails(function () {
	    var symbol = $Symbol();
	    // MS Edge converts symbol values to JSON as {}
	    return $stringify([symbol]) != '[null]'
	      // WebKit converts symbol values to JSON as null
	      || $stringify({ a: symbol }) != '{}'
	      // V8 throws on boxed symbols
	      || $stringify(Object(symbol)) != '{}';
	  });

	  _export({ target: 'JSON', stat: true, forced: FORCED_JSON_STRINGIFY }, {
	    // eslint-disable-next-line no-unused-vars -- required for `.length`
	    stringify: function stringify(it, replacer, space) {
	      var args = [it];
	      var index = 1;
	      var $replacer;
	      while (arguments.length > index) args.push(arguments[index++]);
	      $replacer = replacer;
	      if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
	      if (!isArray$5(replacer)) replacer = function (key, value) {
	        if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
	        if (!isSymbol(value)) return value;
	      };
	      args[1] = replacer;
	      return $stringify.apply(null, args);
	    }
	  });
	}

	// `Symbol.prototype[@@toPrimitive]` method
	// https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive
	if (!$Symbol[PROTOTYPE][TO_PRIMITIVE]) {
	  createNonEnumerableProperty($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	}
	// `Symbol.prototype[@@toStringTag]` property
	// https://tc39.es/ecma262/#sec-symbol.prototype-@@tostringtag
	setToStringTag($Symbol, SYMBOL);

	hiddenKeys$1[HIDDEN] = true;

	var getOwnPropertySymbols$2 = path.Object.getOwnPropertySymbols;

	var getOwnPropertySymbols$1 = getOwnPropertySymbols$2;

	var getOwnPropertySymbols = getOwnPropertySymbols$1;

	var nativeGetOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;


	var FAILS_ON_PRIMITIVES$1 = fails(function () { nativeGetOwnPropertyDescriptor(1); });
	var FORCED$2 = !descriptors || FAILS_ON_PRIMITIVES$1;

	// `Object.getOwnPropertyDescriptor` method
	// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
	_export({ target: 'Object', stat: true, forced: FORCED$2, sham: !descriptors }, {
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

	var iterators = {};

	var correctPrototypeGetter = !fails(function () {
	  function F() { /* empty */ }
	  F.prototype.constructor = null;
	  // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
	  return Object.getPrototypeOf(new F()) !== F.prototype;
	});

	var IE_PROTO = sharedKey('IE_PROTO');
	var ObjectPrototype = Object.prototype;

	// `Object.getPrototypeOf` method
	// https://tc39.es/ecma262/#sec-object.getprototypeof
	// eslint-disable-next-line es/no-object-getprototypeof -- safe
	var objectGetPrototypeOf = correctPrototypeGetter ? Object.getPrototypeOf : function (O) {
	  O = toObject(O);
	  if (has$1(O, IE_PROTO)) return O[IE_PROTO];
	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectPrototype : null;
	};

	var ITERATOR$4 = wellKnownSymbol('iterator');
	var BUGGY_SAFARI_ITERATORS$1 = false;

	var returnThis$2 = function () { return this; };

	// `%IteratorPrototype%` object
	// https://tc39.es/ecma262/#sec-%iteratorprototype%-object
	var IteratorPrototype$2, PrototypeOfArrayIteratorPrototype, arrayIterator;

	/* eslint-disable es/no-array-prototype-keys -- safe */
	if ([].keys) {
	  arrayIterator = [].keys();
	  // Safari 8 has buggy iterators w/o `next`
	  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS$1 = true;
	  else {
	    PrototypeOfArrayIteratorPrototype = objectGetPrototypeOf(objectGetPrototypeOf(arrayIterator));
	    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype$2 = PrototypeOfArrayIteratorPrototype;
	  }
	}

	var NEW_ITERATOR_PROTOTYPE = IteratorPrototype$2 == undefined || fails(function () {
	  var test = {};
	  // FF44- legacy iterators case
	  return IteratorPrototype$2[ITERATOR$4].call(test) !== test;
	});

	if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype$2 = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	if ((NEW_ITERATOR_PROTOTYPE) && !has$1(IteratorPrototype$2, ITERATOR$4)) {
	  createNonEnumerableProperty(IteratorPrototype$2, ITERATOR$4, returnThis$2);
	}

	var iteratorsCore = {
	  IteratorPrototype: IteratorPrototype$2,
	  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS$1
	};

	var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;





	var returnThis$1 = function () { return this; };

	var createIteratorConstructor = function (IteratorConstructor, NAME, next) {
	  var TO_STRING_TAG = NAME + ' Iterator';
	  IteratorConstructor.prototype = objectCreate(IteratorPrototype$1, { next: createPropertyDescriptor(1, next) });
	  setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
	  iterators[TO_STRING_TAG] = returnThis$1;
	  return IteratorConstructor;
	};

	var aPossiblePrototype = function (it) {
	  if (!isObject(it) && it !== null) {
	    throw TypeError("Can't set " + String(it) + ' as a prototype');
	  } return it;
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
	  } catch (error) { /* empty */ }
	  return function setPrototypeOf(O, proto) {
	    anObject(O);
	    aPossiblePrototype(proto);
	    if (CORRECT_SETTER) setter.call(O, proto);
	    else O.__proto__ = proto;
	    return O;
	  };
	}() : undefined);

	var IteratorPrototype = iteratorsCore.IteratorPrototype;
	var BUGGY_SAFARI_ITERATORS = iteratorsCore.BUGGY_SAFARI_ITERATORS;
	var ITERATOR$3 = wellKnownSymbol('iterator');
	var KEYS = 'keys';
	var VALUES = 'values';
	var ENTRIES = 'entries';

	var returnThis = function () { return this; };

	var defineIterator = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
	  createIteratorConstructor(IteratorConstructor, NAME, next);

	  var getIterationMethod = function (KIND) {
	    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
	    if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
	    switch (KIND) {
	      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
	      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
	      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
	    } return function () { return new IteratorConstructor(this); };
	  };

	  var TO_STRING_TAG = NAME + ' Iterator';
	  var INCORRECT_VALUES_NAME = false;
	  var IterablePrototype = Iterable.prototype;
	  var nativeIterator = IterablePrototype[ITERATOR$3]
	    || IterablePrototype['@@iterator']
	    || DEFAULT && IterablePrototype[DEFAULT];
	  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
	  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
	  var CurrentIteratorPrototype, methods, KEY;

	  // fix native
	  if (anyNativeIterator) {
	    CurrentIteratorPrototype = objectGetPrototypeOf(anyNativeIterator.call(new Iterable()));
	    if (IteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
	      // Set @@toStringTag to native iterators
	      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
	      iterators[TO_STRING_TAG] = returnThis;
	    }
	  }

	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
	    INCORRECT_VALUES_NAME = true;
	    defaultIterator = function values() { return nativeIterator.call(this); };
	  }

	  // define iterator
	  if ((FORCED) && IterablePrototype[ITERATOR$3] !== defaultIterator) {
	    createNonEnumerableProperty(IterablePrototype, ITERATOR$3, defaultIterator);
	  }
	  iterators[NAME] = defaultIterator;

	  // export additional methods
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
	    } else _export({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
	  }

	  return methods;
	};

	var ARRAY_ITERATOR = 'Array Iterator';
	var setInternalState$3 = internalState.set;
	var getInternalState$1 = internalState.getterFor(ARRAY_ITERATOR);

	// `Array.prototype.entries` method
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
	  setInternalState$3(this, {
	    type: ARRAY_ITERATOR,
	    target: toIndexedObject(iterated), // target
	    index: 0,                          // next index
	    kind: kind                         // kind
	  });
	// `%ArrayIteratorPrototype%.next` method
	// https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
	}, function () {
	  var state = getInternalState$1(this);
	  var target = state.target;
	  var kind = state.kind;
	  var index = state.index++;
	  if (!target || index >= target.length) {
	    state.target = undefined;
	    return { value: undefined, done: true };
	  }
	  if (kind == 'keys') return { value: index, done: false };
	  if (kind == 'values') return { value: target[index], done: false };
	  return { value: [index, target[index]], done: false };
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values%
	// https://tc39.es/ecma262/#sec-createunmappedargumentsobject
	// https://tc39.es/ecma262/#sec-createmappedargumentsobject
	iterators.Arguments = iterators.Array;

	// iterable DOM collections
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

	var arrayMethodIsStrict = function (METHOD_NAME, argument) {
	  var method = [][METHOD_NAME];
	  return !!method && fails(function () {
	    // eslint-disable-next-line no-useless-call,no-throw-literal -- required for testing
	    method.call(null, argument || function () { throw 1; }, 1);
	  });
	};

	var $forEach = arrayIteration.forEach;


	var STRICT_METHOD$3 = arrayMethodIsStrict('forEach');

	// `Array.prototype.forEach` method implementation
	// https://tc39.es/ecma262/#sec-array.prototype.foreach
	var arrayForEach = !STRICT_METHOD$3 ? function forEach(callbackfn /* , thisArg */) {
	  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	// eslint-disable-next-line es/no-array-prototype-foreach -- safe
	} : [].forEach;

	// `Array.prototype.forEach` method
	// https://tc39.es/ecma262/#sec-array.prototype.foreach
	// eslint-disable-next-line es/no-array-prototype-foreach -- safe
	_export({ target: 'Array', proto: true, forced: [].forEach != arrayForEach }, {
	  forEach: arrayForEach
	});

	var entryVirtual = function (CONSTRUCTOR) {
	  return path[CONSTRUCTOR + 'Prototype'];
	};

	var forEach$3 = entryVirtual('Array').forEach;

	var forEach$2 = forEach$3;

	var ArrayPrototype$b = Array.prototype;

	var DOMIterables = {
	  DOMTokenList: true,
	  NodeList: true
	};

	var forEach_1 = function (it) {
	  var own = it.forEach;
	  return it === ArrayPrototype$b || (it instanceof Array && own === ArrayPrototype$b.forEach)
	    // eslint-disable-next-line no-prototype-builtins -- safe
	    || DOMIterables.hasOwnProperty(classof(it)) ? forEach$2 : own;
	};

	var forEach$1 = forEach_1;

	// all object keys, includes non-enumerable and symbols
	var ownKeys$1 = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
	  var keys = objectGetOwnPropertyNames.f(anObject(it));
	  var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
	  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
	};

	var createProperty = function (object, key, value) {
	  var propertyKey = toPrimitive(key);
	  if (propertyKey in object) objectDefineProperty.f(object, propertyKey, createPropertyDescriptor(0, value));
	  else object[propertyKey] = value;
	};

	// `Object.getOwnPropertyDescriptors` method
	// https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
	_export({ target: 'Object', stat: true, sham: !descriptors }, {
	  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
	    var O = toIndexedObject(object);
	    var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
	    var keys = ownKeys$1(O);
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

	var getOwnPropertyDescriptors = getOwnPropertyDescriptors$1;

	// `Object.defineProperties` method
	// https://tc39.es/ecma262/#sec-object.defineproperties
	_export({ target: 'Object', stat: true, forced: !descriptors, sham: !descriptors }, {
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

	// `Object.defineProperty` method
	// https://tc39.es/ecma262/#sec-object.defineproperty
	_export({ target: 'Object', stat: true, forced: !descriptors, sham: !descriptors }, {
	  defineProperty: objectDefineProperty.f
	});

	var defineProperty_1 = createCommonjsModule(function (module) {
	var Object = path.Object;

	var defineProperty = module.exports = function defineProperty(it, key, desc) {
	  return Object.defineProperty(it, key, desc);
	};

	if (Object.defineProperty.sham) defineProperty.sham = true;
	});

	var defineProperty$5 = defineProperty_1;

	var defineProperty$4 = defineProperty$5;

	var defineProperty$3 = defineProperty_1;

	var defineProperty$2 = defineProperty$3;

	function _defineProperty(obj, key, value) {
	  if (key in obj) {
	    defineProperty$2(obj, key, {
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

	// `Array.isArray` method
	// https://tc39.es/ecma262/#sec-array.isarray
	_export({ target: 'Array', stat: true }, {
	  isArray: isArray$5
	});

	var isArray$4 = path.Array.isArray;

	var isArray$3 = isArray$4;

	var isArray$2 = isArray$3;

	function _arrayLikeToArray(arr, len) {
	  if (len == null || len > arr.length) len = arr.length;

	  for (var i = 0, arr2 = new Array(len); i < len; i++) {
	    arr2[i] = arr[i];
	  }

	  return arr2;
	}

	function _arrayWithoutHoles(arr) {
	  if (isArray$2(arr)) return _arrayLikeToArray(arr);
	}

	var SPECIES$2 = wellKnownSymbol('species');

	var arrayMethodHasSpeciesSupport = function (METHOD_NAME) {
	  // We can't use this feature detection in V8 since it causes
	  // deoptimization and serious performance degradation
	  // https://github.com/zloirock/core-js/issues/677
	  return engineV8Version >= 51 || !fails(function () {
	    var array = [];
	    var constructor = array.constructor = {};
	    constructor[SPECIES$2] = function () {
	      return { foo: 1 };
	    };
	    return array[METHOD_NAME](Boolean).foo !== 1;
	  });
	};

	var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
	var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
	var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';

	// We can't use this feature detection in V8 since it causes
	// deoptimization and serious performance degradation
	// https://github.com/zloirock/core-js/issues/679
	var IS_CONCAT_SPREADABLE_SUPPORT = engineV8Version >= 51 || !fails(function () {
	  var array = [];
	  array[IS_CONCAT_SPREADABLE] = false;
	  return array.concat()[0] !== array;
	});

	var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

	var isConcatSpreadable = function (O) {
	  if (!isObject(O)) return false;
	  var spreadable = O[IS_CONCAT_SPREADABLE];
	  return spreadable !== undefined ? !!spreadable : isArray$5(O);
	};

	var FORCED$1 = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

	// `Array.prototype.concat` method
	// https://tc39.es/ecma262/#sec-array.prototype.concat
	// with adding support of @@isConcatSpreadable and @@species
	_export({ target: 'Array', proto: true, forced: FORCED$1 }, {
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
	        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
	      } else {
	        if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
	        createProperty(A, n++, E);
	      }
	    }
	    A.length = n;
	    return A;
	  }
	});

	// `Symbol.asyncIterator` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.asynciterator
	defineWellKnownSymbol('asyncIterator');

	// `Symbol.hasInstance` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.hasinstance
	defineWellKnownSymbol('hasInstance');

	// `Symbol.isConcatSpreadable` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.isconcatspreadable
	defineWellKnownSymbol('isConcatSpreadable');

	// `Symbol.iterator` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.iterator
	defineWellKnownSymbol('iterator');

	// `Symbol.match` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.match
	defineWellKnownSymbol('match');

	// `Symbol.matchAll` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.matchall
	defineWellKnownSymbol('matchAll');

	// `Symbol.replace` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.replace
	defineWellKnownSymbol('replace');

	// `Symbol.search` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.search
	defineWellKnownSymbol('search');

	// `Symbol.species` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.species
	defineWellKnownSymbol('species');

	// `Symbol.split` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.split
	defineWellKnownSymbol('split');

	// `Symbol.toPrimitive` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.toprimitive
	defineWellKnownSymbol('toPrimitive');

	// `Symbol.toStringTag` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.tostringtag
	defineWellKnownSymbol('toStringTag');

	// `Symbol.unscopables` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.unscopables
	defineWellKnownSymbol('unscopables');

	// JSON[@@toStringTag] property
	// https://tc39.es/ecma262/#sec-json-@@tostringtag
	setToStringTag(global$1.JSON, 'JSON', true);

	var symbol$2 = path.Symbol;

	// `Symbol.asyncDispose` well-known symbol
	// https://github.com/tc39/proposal-using-statement
	defineWellKnownSymbol('asyncDispose');

	// `Symbol.dispose` well-known symbol
	// https://github.com/tc39/proposal-using-statement
	defineWellKnownSymbol('dispose');

	// `Symbol.matcher` well-known symbol
	// https://github.com/tc39/proposal-pattern-matching
	defineWellKnownSymbol('matcher');

	// `Symbol.metadata` well-known symbol
	// https://github.com/tc39/proposal-decorators
	defineWellKnownSymbol('metadata');

	// `Symbol.observable` well-known symbol
	// https://github.com/tc39/proposal-observable
	defineWellKnownSymbol('observable');

	// TODO: remove from `core-js@4`


	// `Symbol.patternMatch` well-known symbol
	// https://github.com/tc39/proposal-pattern-matching
	defineWellKnownSymbol('patternMatch');

	// TODO: remove from `core-js@4`


	defineWellKnownSymbol('replaceAll');

	// TODO: Remove from `core-js@4`

	// TODO: Remove from `core-js@4`


	var symbol$1 = symbol$2;

	var symbol = symbol$1;

	// `String.prototype.{ codePointAt, at }` methods implementation
	var createMethod$2 = function (CONVERT_TO_STRING) {
	  return function ($this, pos) {
	    var S = String(requireObjectCoercible($this));
	    var position = toInteger(pos);
	    var size = S.length;
	    var first, second;
	    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
	    first = S.charCodeAt(position);
	    return first < 0xD800 || first > 0xDBFF || position + 1 === size
	      || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
	        ? CONVERT_TO_STRING ? S.charAt(position) : first
	        : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
	  };
	};

	var stringMultibyte = {
	  // `String.prototype.codePointAt` method
	  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
	  codeAt: createMethod$2(false),
	  // `String.prototype.at` method
	  // https://github.com/mathiasbynens/String.prototype.at
	  charAt: createMethod$2(true)
	};

	var charAt = stringMultibyte.charAt;



	var STRING_ITERATOR = 'String Iterator';
	var setInternalState$2 = internalState.set;
	var getInternalState = internalState.getterFor(STRING_ITERATOR);

	// `String.prototype[@@iterator]` method
	// https://tc39.es/ecma262/#sec-string.prototype-@@iterator
	defineIterator(String, 'String', function (iterated) {
	  setInternalState$2(this, {
	    type: STRING_ITERATOR,
	    string: String(iterated),
	    index: 0
	  });
	// `%StringIteratorPrototype%.next` method
	// https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
	}, function next() {
	  var state = getInternalState(this);
	  var string = state.string;
	  var index = state.index;
	  var point;
	  if (index >= string.length) return { value: undefined, done: true };
	  point = charAt(string, index);
	  state.index += point.length;
	  return { value: point, done: false };
	});

	var ITERATOR$2 = wellKnownSymbol('iterator');

	var getIteratorMethod$1 = function (it) {
	  if (it != undefined) return it[ITERATOR$2]
	    || it['@@iterator']
	    || iterators[classof(it)];
	};

	var getIteratorMethod_1 = getIteratorMethod$1;

	var getIteratorMethod = getIteratorMethod_1;

	var iteratorClose = function (iterator) {
	  var returnMethod = iterator['return'];
	  if (returnMethod !== undefined) {
	    return anObject(returnMethod.call(iterator)).value;
	  }
	};

	// call something on iterator step with safe closing on error
	var callWithSafeIterationClosing = function (iterator, fn, value, ENTRIES) {
	  try {
	    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch (error) {
	    iteratorClose(iterator);
	    throw error;
	  }
	};

	var ITERATOR$1 = wellKnownSymbol('iterator');
	var ArrayPrototype$a = Array.prototype;

	// check on default Array iterator
	var isArrayIteratorMethod = function (it) {
	  return it !== undefined && (iterators.Array === it || ArrayPrototype$a[ITERATOR$1] === it);
	};

	// `Array.from` method implementation
	// https://tc39.es/ecma262/#sec-array.from
	var arrayFrom = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
	  var O = toObject(arrayLike);
	  var C = typeof this == 'function' ? this : Array;
	  var argumentsLength = arguments.length;
	  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
	  var mapping = mapfn !== undefined;
	  var iteratorMethod = getIteratorMethod$1(O);
	  var index = 0;
	  var length, result, step, iterator, next, value;
	  if (mapping) mapfn = functionBindContext(mapfn, argumentsLength > 2 ? arguments[2] : undefined, 2);
	  // if the target is not iterable or it's an array with the default iterator - use a simple case
	  if (iteratorMethod != undefined && !(C == Array && isArrayIteratorMethod(iteratorMethod))) {
	    iterator = iteratorMethod.call(O);
	    next = iterator.next;
	    result = new C();
	    for (;!(step = next.call(iterator)).done; index++) {
	      value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
	      createProperty(result, index, value);
	    }
	  } else {
	    length = toLength(O.length);
	    result = new C(length);
	    for (;length > index; index++) {
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
	    next: function () {
	      return { done: !!called++ };
	    },
	    'return': function () {
	      SAFE_CLOSING = true;
	    }
	  };
	  iteratorWithReturn[ITERATOR] = function () {
	    return this;
	  };
	  // eslint-disable-next-line es/no-array-from, no-throw-literal -- required for testing
	  Array.from(iteratorWithReturn, function () { throw 2; });
	} catch (error) { /* empty */ }

	var checkCorrectnessOfIteration = function (exec, SKIP_CLOSING) {
	  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
	  var ITERATION_SUPPORT = false;
	  try {
	    var object = {};
	    object[ITERATOR] = function () {
	      return {
	        next: function () {
	          return { done: ITERATION_SUPPORT = true };
	        }
	      };
	    };
	    exec(object);
	  } catch (error) { /* empty */ }
	  return ITERATION_SUPPORT;
	};

	var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function (iterable) {
	  // eslint-disable-next-line es/no-array-from -- required for testing
	  Array.from(iterable);
	});

	// `Array.from` method
	// https://tc39.es/ecma262/#sec-array.from
	_export({ target: 'Array', stat: true, forced: INCORRECT_ITERATION }, {
	  from: arrayFrom
	});

	var from$2 = path.Array.from;

	var from$1 = from$2;

	var from = from$1;

	function _iterableToArray(iter) {
	  if (typeof symbol !== "undefined" && getIteratorMethod(iter) != null || iter["@@iterator"] != null) return from(iter);
	}

	var HAS_SPECIES_SUPPORT$2 = arrayMethodHasSpeciesSupport('slice');

	var SPECIES$1 = wellKnownSymbol('species');
	var nativeSlice = [].slice;
	var max = Math.max;

	// `Array.prototype.slice` method
	// https://tc39.es/ecma262/#sec-array.prototype.slice
	// fallback for not array-like ES3 strings and DOM objects
	_export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$2 }, {
	  slice: function slice(start, end) {
	    var O = toIndexedObject(this);
	    var length = toLength(O.length);
	    var k = toAbsoluteIndex(start, length);
	    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
	    // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
	    var Constructor, result, n;
	    if (isArray$5(O)) {
	      Constructor = O.constructor;
	      // cross-realm fallback
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
	    for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
	    result.length = n;
	    return result;
	  }
	});

	var slice$2 = entryVirtual('Array').slice;

	var ArrayPrototype$9 = Array.prototype;

	var slice_1 = function (it) {
	  var own = it.slice;
	  return it === ArrayPrototype$9 || (it instanceof Array && own === ArrayPrototype$9.slice) ? slice$2 : own;
	};

	var slice$1 = slice_1;

	var slice = slice$1;

	function _unsupportedIterableToArray(o, minLen) {
	  var _context;

	  if (!o) return;
	  if (typeof o === "string") return _arrayLikeToArray(o, minLen);

	  var n = slice(_context = Object.prototype.toString.call(o)).call(_context, 8, -1);

	  if (n === "Object" && o.constructor) n = o.constructor.name;
	  if (n === "Map" || n === "Set") return from(o);
	  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
	}

	function _nonIterableSpread() {
	  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}

	function _toConsumableArray(arr) {
	  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
	}

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	function _defineProperties(target, props) {
	  for (var i = 0; i < props.length; i++) {
	    var descriptor = props[i];
	    descriptor.enumerable = descriptor.enumerable || false;
	    descriptor.configurable = true;
	    if ("value" in descriptor) descriptor.writable = true;

	    defineProperty$2(target, descriptor.key, descriptor);
	  }
	}

	function _createClass(Constructor, protoProps, staticProps) {
	  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	  if (staticProps) _defineProperties(Constructor, staticProps);
	  return Constructor;
	}

	function _arrayWithHoles(arr) {
	  if (isArray$2(arr)) return arr;
	}

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

	function _nonIterableRest() {
	  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}

	function _slicedToArray(arr, i) {
	  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
	}

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

	var concat$2 = entryVirtual('Array').concat;

	var ArrayPrototype$8 = Array.prototype;

	var concat_1 = function (it) {
	  var own = it.concat;
	  return it === ArrayPrototype$8 || (it instanceof Array && own === ArrayPrototype$8.concat) ? concat$2 : own;
	};

	var concat$1 = concat_1;

	var concat = concat$1;

	var $map = arrayIteration.map;


	var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport('map');

	// `Array.prototype.map` method
	// https://tc39.es/ecma262/#sec-array.prototype.map
	// with adding support of @@species
	_export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$1 }, {
	  map: function map(callbackfn /* , thisArg */) {
	    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var map$2 = entryVirtual('Array').map;

	var ArrayPrototype$7 = Array.prototype;

	var map_1 = function (it) {
	  var own = it.map;
	  return it === ArrayPrototype$7 || (it instanceof Array && own === ArrayPrototype$7.map) ? map$2 : own;
	};

	var map$1 = map_1;

	var map = map$1;

	var $filter = arrayIteration.filter;


	var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('filter');

	// `Array.prototype.filter` method
	// https://tc39.es/ecma262/#sec-array.prototype.filter
	// with adding support of @@species
	_export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
	  filter: function filter(callbackfn /* , thisArg */) {
	    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var filter$2 = entryVirtual('Array').filter;

	var ArrayPrototype$6 = Array.prototype;

	var filter_1 = function (it) {
	  var own = it.filter;
	  return it === ArrayPrototype$6 || (it instanceof Array && own === ArrayPrototype$6.filter) ? filter$2 : own;
	};

	var filter$1 = filter_1;

	var filter = filter$1;

	var $includes = arrayIncludes.includes;


	// `Array.prototype.includes` method
	// https://tc39.es/ecma262/#sec-array.prototype.includes
	_export({ target: 'Array', proto: true }, {
	  includes: function includes(el /* , fromIndex = 0 */) {
	    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var includes$4 = entryVirtual('Array').includes;

	var MATCH$1 = wellKnownSymbol('match');

	// `IsRegExp` abstract operation
	// https://tc39.es/ecma262/#sec-isregexp
	var isRegexp = function (it) {
	  var isRegExp;
	  return isObject(it) && ((isRegExp = it[MATCH$1]) !== undefined ? !!isRegExp : classofRaw(it) == 'RegExp');
	};

	var notARegexp = function (it) {
	  if (isRegexp(it)) {
	    throw TypeError("The method doesn't accept regular expressions");
	  } return it;
	};

	var MATCH = wellKnownSymbol('match');

	var correctIsRegexpLogic = function (METHOD_NAME) {
	  var regexp = /./;
	  try {
	    '/./'[METHOD_NAME](regexp);
	  } catch (error1) {
	    try {
	      regexp[MATCH] = false;
	      return '/./'[METHOD_NAME](regexp);
	    } catch (error2) { /* empty */ }
	  } return false;
	};

	// `String.prototype.includes` method
	// https://tc39.es/ecma262/#sec-string.prototype.includes
	_export({ target: 'String', proto: true, forced: !correctIsRegexpLogic('includes') }, {
	  includes: function includes(searchString /* , position = 0 */) {
	    return !!~String(requireObjectCoercible(this))
	      .indexOf(notARegexp(searchString), arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var includes$3 = entryVirtual('String').includes;

	var ArrayPrototype$5 = Array.prototype;
	var StringPrototype = String.prototype;

	var includes$2 = function (it) {
	  var own = it.includes;
	  if (it === ArrayPrototype$5 || (it instanceof Array && own === ArrayPrototype$5.includes)) return includes$4;
	  if (typeof it === 'string' || it === StringPrototype || (it instanceof String && own === StringPrototype.includes)) {
	    return includes$3;
	  } return own;
	};

	var includes$1 = includes$2;

	var includes = includes$1;

	var freezing = !fails(function () {
	  // eslint-disable-next-line es/no-object-isextensible, es/no-object-preventextensions -- required for testing
	  return Object.isExtensible(Object.preventExtensions({}));
	});

	var internalMetadata = createCommonjsModule(function (module) {
	var defineProperty = objectDefineProperty.f;



	var METADATA = uid('meta');
	var id = 0;

	// eslint-disable-next-line es/no-object-isextensible -- safe
	var isExtensible = Object.isExtensible || function () {
	  return true;
	};

	var setMetadata = function (it) {
	  defineProperty(it, METADATA, { value: {
	    objectID: 'O' + ++id, // object ID
	    weakData: {}          // weak collections IDs
	  } });
	};

	var fastKey = function (it, create) {
	  // return a primitive with prefix
	  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if (!has$1(it, METADATA)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return 'F';
	    // not necessary to add metadata
	    if (!create) return 'E';
	    // add missing metadata
	    setMetadata(it);
	  // return object ID
	  } return it[METADATA].objectID;
	};

	var getWeakData = function (it, create) {
	  if (!has$1(it, METADATA)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return true;
	    // not necessary to add metadata
	    if (!create) return false;
	    // add missing metadata
	    setMetadata(it);
	  // return the store of weak collections IDs
	  } return it[METADATA].weakData;
	};

	// add metadata on freeze-family methods calling
	var onFreeze = function (it) {
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

	var Result = function (stopped, result) {
	  this.stopped = stopped;
	  this.result = result;
	};

	var iterate = function (iterable, unboundFunction, options) {
	  var that = options && options.that;
	  var AS_ENTRIES = !!(options && options.AS_ENTRIES);
	  var IS_ITERATOR = !!(options && options.IS_ITERATOR);
	  var INTERRUPTED = !!(options && options.INTERRUPTED);
	  var fn = functionBindContext(unboundFunction, that, 1 + AS_ENTRIES + INTERRUPTED);
	  var iterator, iterFn, index, length, result, next, step;

	  var stop = function (condition) {
	    if (iterator) iteratorClose(iterator);
	    return new Result(true, condition);
	  };

	  var callFn = function (value) {
	    if (AS_ENTRIES) {
	      anObject(value);
	      return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
	    } return INTERRUPTED ? fn(value, stop) : fn(value);
	  };

	  if (IS_ITERATOR) {
	    iterator = iterable;
	  } else {
	    iterFn = getIteratorMethod$1(iterable);
	    if (typeof iterFn != 'function') throw TypeError('Target is not iterable');
	    // optimisation for array iterators
	    if (isArrayIteratorMethod(iterFn)) {
	      for (index = 0, length = toLength(iterable.length); length > index; index++) {
	        result = callFn(iterable[index]);
	        if (result && result instanceof Result) return result;
	      } return new Result(false);
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
	    if (typeof result == 'object' && result && result instanceof Result) return result;
	  } return new Result(false);
	};

	var anInstance = function (it, Constructor, name) {
	  if (!(it instanceof Constructor)) {
	    throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
	  } return it;
	};

	var defineProperty$1 = objectDefineProperty.f;
	var forEach = arrayIteration.forEach;



	var setInternalState$1 = internalState.set;
	var internalStateGetterFor$1 = internalState.getterFor;

	var collection = function (CONSTRUCTOR_NAME, wrapper, common) {
	  var IS_MAP = CONSTRUCTOR_NAME.indexOf('Map') !== -1;
	  var IS_WEAK = CONSTRUCTOR_NAME.indexOf('Weak') !== -1;
	  var ADDER = IS_MAP ? 'set' : 'add';
	  var NativeConstructor = global$1[CONSTRUCTOR_NAME];
	  var NativePrototype = NativeConstructor && NativeConstructor.prototype;
	  var exported = {};
	  var Constructor;

	  if (!descriptors || typeof NativeConstructor != 'function'
	    || !(IS_WEAK || NativePrototype.forEach && !fails(function () { new NativeConstructor().entries().next(); }))
	  ) {
	    // create collection constructor
	    Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
	    internalMetadata.REQUIRED = true;
	  } else {
	    Constructor = wrapper(function (target, iterable) {
	      setInternalState$1(anInstance(target, Constructor, CONSTRUCTOR_NAME), {
	        type: CONSTRUCTOR_NAME,
	        collection: new NativeConstructor()
	      });
	      if (iterable != undefined) iterate(iterable, target[ADDER], { that: target, AS_ENTRIES: IS_MAP });
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

	    IS_WEAK || defineProperty$1(Constructor.prototype, 'size', {
	      configurable: true,
	      get: function () {
	        return getInternalState(this).collection.size;
	      }
	    });
	  }

	  setToStringTag(Constructor, CONSTRUCTOR_NAME, false, true);

	  exported[CONSTRUCTOR_NAME] = Constructor;
	  _export({ global: true, forced: true }, exported);

	  if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);

	  return Constructor;
	};

	var redefineAll = function (target, src, options) {
	  for (var key in src) {
	    if (options && options.unsafe && target[key]) target[key] = src[key];
	    else redefine(target, key, src[key], options);
	  } return target;
	};

	var SPECIES = wellKnownSymbol('species');

	var setSpecies = function (CONSTRUCTOR_NAME) {
	  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
	  var defineProperty = objectDefineProperty.f;

	  if (descriptors && Constructor && !Constructor[SPECIES]) {
	    defineProperty(Constructor, SPECIES, {
	      configurable: true,
	      get: function () { return this; }
	    });
	  }
	};

	var defineProperty = objectDefineProperty.f;








	var fastKey = internalMetadata.fastKey;


	var setInternalState = internalState.set;
	var internalStateGetterFor = internalState.getterFor;

	var collectionStrong = {
	  getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
	    var C = wrapper(function (that, iterable) {
	      anInstance(that, C, CONSTRUCTOR_NAME);
	      setInternalState(that, {
	        type: CONSTRUCTOR_NAME,
	        index: objectCreate(null),
	        first: undefined,
	        last: undefined,
	        size: 0
	      });
	      if (!descriptors) that.size = 0;
	      if (iterable != undefined) iterate(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
	    });

	    var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

	    var define = function (that, key, value) {
	      var state = getInternalState(that);
	      var entry = getEntry(that, key);
	      var previous, index;
	      // change existing entry
	      if (entry) {
	        entry.value = value;
	      // create new entry
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
	        if (descriptors) state.size++;
	        else that.size++;
	        // add to index
	        if (index !== 'F') state.index[index] = entry;
	      } return that;
	    };

	    var getEntry = function (that, key) {
	      var state = getInternalState(that);
	      // fast case
	      var index = fastKey(key);
	      var entry;
	      if (index !== 'F') return state.index[index];
	      // frozen object case
	      for (entry = state.first; entry; entry = entry.next) {
	        if (entry.key == key) return entry;
	      }
	    };

	    redefineAll(C.prototype, {
	      // 23.1.3.1 Map.prototype.clear()
	      // 23.2.3.2 Set.prototype.clear()
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
	        if (descriptors) state.size = 0;
	        else that.size = 0;
	      },
	      // 23.1.3.3 Map.prototype.delete(key)
	      // 23.2.3.4 Set.prototype.delete(value)
	      'delete': function (key) {
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
	          if (descriptors) state.size--;
	          else that.size--;
	        } return !!entry;
	      },
	      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
	      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
	      forEach: function forEach(callbackfn /* , that = undefined */) {
	        var state = getInternalState(this);
	        var boundFunction = functionBindContext(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
	        var entry;
	        while (entry = entry ? entry.next : state.first) {
	          boundFunction(entry.value, entry.key, this);
	          // revert to the last existing entry
	          while (entry && entry.removed) entry = entry.previous;
	        }
	      },
	      // 23.1.3.7 Map.prototype.has(key)
	      // 23.2.3.7 Set.prototype.has(value)
	      has: function has(key) {
	        return !!getEntry(this, key);
	      }
	    });

	    redefineAll(C.prototype, IS_MAP ? {
	      // 23.1.3.6 Map.prototype.get(key)
	      get: function get(key) {
	        var entry = getEntry(this, key);
	        return entry && entry.value;
	      },
	      // 23.1.3.9 Map.prototype.set(key, value)
	      set: function set(key, value) {
	        return define(this, key === 0 ? 0 : key, value);
	      }
	    } : {
	      // 23.2.3.1 Set.prototype.add(value)
	      add: function add(value) {
	        return define(this, value = value === 0 ? 0 : value, value);
	      }
	    });
	    if (descriptors) defineProperty(C.prototype, 'size', {
	      get: function () {
	        return getInternalState(this).size;
	      }
	    });
	    return C;
	  },
	  setStrong: function (C, CONSTRUCTOR_NAME, IS_MAP) {
	    var ITERATOR_NAME = CONSTRUCTOR_NAME + ' Iterator';
	    var getInternalCollectionState = internalStateGetterFor(CONSTRUCTOR_NAME);
	    var getInternalIteratorState = internalStateGetterFor(ITERATOR_NAME);
	    // add .keys, .values, .entries, [@@iterator]
	    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
	    defineIterator(C, CONSTRUCTOR_NAME, function (iterated, kind) {
	      setInternalState(this, {
	        type: ITERATOR_NAME,
	        target: iterated,
	        state: getInternalCollectionState(iterated),
	        kind: kind,
	        last: undefined
	      });
	    }, function () {
	      var state = getInternalIteratorState(this);
	      var kind = state.kind;
	      var entry = state.last;
	      // revert to the last existing entry
	      while (entry && entry.removed) entry = entry.previous;
	      // get next entry
	      if (!state.target || !(state.last = entry = entry ? entry.next : state.state.first)) {
	        // or finish the iteration
	        state.target = undefined;
	        return { value: undefined, done: true };
	      }
	      // return step by kind
	      if (kind == 'keys') return { value: entry.key, done: false };
	      if (kind == 'values') return { value: entry.value, done: false };
	      return { value: [entry.key, entry.value], done: false };
	    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

	    // add [@@species], 23.1.2.2, 23.2.2.2
	    setSpecies(CONSTRUCTOR_NAME);
	  }
	};

	// `Set` constructor
	// https://tc39.es/ecma262/#sec-set-objects
	collection('Set', function (init) {
	  return function Set() { return init(this, arguments.length ? arguments[0] : undefined); };
	}, collectionStrong);

	var set$2 = path.Set;

	var set$1 = set$2;

	var set = set$1;

	// `Array.prototype.{ reduce, reduceRight }` methods implementation
	var createMethod$1 = function (IS_RIGHT) {
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
	    for (;IS_RIGHT ? index >= 0 : length > index; index += i) if (index in self) {
	      memo = callbackfn(memo, self[index], index, O);
	    }
	    return memo;
	  };
	};

	var arrayReduce = {
	  // `Array.prototype.reduce` method
	  // https://tc39.es/ecma262/#sec-array.prototype.reduce
	  left: createMethod$1(false),
	  // `Array.prototype.reduceRight` method
	  // https://tc39.es/ecma262/#sec-array.prototype.reduceright
	  right: createMethod$1(true)
	};

	var engineIsNode = classofRaw(global$1.process) == 'process';

	var $reduce = arrayReduce.left;




	var STRICT_METHOD$2 = arrayMethodIsStrict('reduce');
	// Chrome 80-82 has a critical bug
	// https://bugs.chromium.org/p/chromium/issues/detail?id=1049982
	var CHROME_BUG = !engineIsNode && engineV8Version > 79 && engineV8Version < 83;

	// `Array.prototype.reduce` method
	// https://tc39.es/ecma262/#sec-array.prototype.reduce
	_export({ target: 'Array', proto: true, forced: !STRICT_METHOD$2 || CHROME_BUG }, {
	  reduce: function reduce(callbackfn /* , initialValue */) {
	    return $reduce(this, callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var reduce$2 = entryVirtual('Array').reduce;

	var ArrayPrototype$4 = Array.prototype;

	var reduce_1 = function (it) {
	  var own = it.reduce;
	  return it === ArrayPrototype$4 || (it instanceof Array && own === ArrayPrototype$4.reduce) ? reduce$2 : own;
	};

	var reduce$1 = reduce_1;

	var reduce = reduce$1;

	var propertyIsEnumerable = objectPropertyIsEnumerable.f;

	// `Object.{ entries, values }` methods implementation
	var createMethod = function (TO_ENTRIES) {
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

	var $entries = objectToArray.entries;

	// `Object.entries` method
	// https://tc39.es/ecma262/#sec-object.entries
	_export({ target: 'Object', stat: true }, {
	  entries: function entries(O) {
	    return $entries(O);
	  }
	});

	var entries$2 = path.Object.entries;

	var entries$1 = entries$2;

	var entries = entries$1;

	var test = [];
	var nativeSort = test.sort;

	// IE8-
	var FAILS_ON_UNDEFINED = fails(function () {
	  test.sort(undefined);
	});
	// V8 bug
	var FAILS_ON_NULL = fails(function () {
	  test.sort(null);
	});
	// Old WebKit
	var STRICT_METHOD$1 = arrayMethodIsStrict('sort');

	var FORCED = FAILS_ON_UNDEFINED || !FAILS_ON_NULL || !STRICT_METHOD$1;

	// `Array.prototype.sort` method
	// https://tc39.es/ecma262/#sec-array.prototype.sort
	_export({ target: 'Array', proto: true, forced: FORCED }, {
	  sort: function sort(comparefn) {
	    return comparefn === undefined
	      ? nativeSort.call(toObject(this))
	      : nativeSort.call(toObject(this), aFunction$1(comparefn));
	  }
	});

	var sort$2 = entryVirtual('Array').sort;

	var ArrayPrototype$3 = Array.prototype;

	var sort_1 = function (it) {
	  var own = it.sort;
	  return it === ArrayPrototype$3 || (it instanceof Array && own === ArrayPrototype$3.sort) ? sort$2 : own;
	};

	var sort$1 = sort_1;

	var sort = sort$1;

	// `FlattenIntoArray` abstract operation
	// https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray
	var flattenIntoArray = function (target, original, source, sourceLen, start, depth, mapper, thisArg) {
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

	var flattenIntoArray_1 = flattenIntoArray;

	// `Array.prototype.flatMap` method
	// https://tc39.es/ecma262/#sec-array.prototype.flatmap
	_export({ target: 'Array', proto: true }, {
	  flatMap: function flatMap(callbackfn /* , thisArg */) {
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

	var ArrayPrototype$2 = Array.prototype;

	var flatMap_1 = function (it) {
	  var own = it.flatMap;
	  return it === ArrayPrototype$2 || (it instanceof Array && own === ArrayPrototype$2.flatMap) ? flatMap$2 : own;
	};

	var flatMap$1 = flatMap_1;

	var flatMap = flatMap$1;

	var $values = objectToArray.values;

	// `Object.values` method
	// https://tc39.es/ecma262/#sec-object.values
	_export({ target: 'Object', stat: true }, {
	  values: function values(O) {
	    return $values(O);
	  }
	});

	var values$2 = path.Object.values;

	var values$1 = values$2;

	var values = values$1;

	var FAILS_ON_PRIMITIVES = fails(function () { objectKeys(1); });

	// `Object.keys` method
	// https://tc39.es/ecma262/#sec-object.keys
	_export({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
	  keys: function keys(it) {
	    return objectKeys(toObject(it));
	  }
	});

	var keys$2 = path.Object.keys;

	var keys$1 = keys$2;

	var keys = keys$1;

	var $every = arrayIteration.every;


	var STRICT_METHOD = arrayMethodIsStrict('every');

	// `Array.prototype.every` method
	// https://tc39.es/ecma262/#sec-array.prototype.every
	_export({ target: 'Array', proto: true, forced: !STRICT_METHOD }, {
	  every: function every(callbackfn /* , thisArg */) {
	    return $every(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var every$2 = entryVirtual('Array').every;

	var ArrayPrototype$1 = Array.prototype;

	var every_1 = function (it) {
	  var own = it.every;
	  return it === ArrayPrototype$1 || (it instanceof Array && own === ArrayPrototype$1.every) ? every$2 : own;
	};

	var every$1 = every_1;

	var every = every$1;

	var $find = arrayIteration.find;


	var FIND = 'find';
	var SKIPS_HOLES = true;

	// Shouldn't skip holes
	if (FIND in []) Array(1)[FIND](function () { SKIPS_HOLES = false; });

	// `Array.prototype.find` method
	// https://tc39.es/ecma262/#sec-array.prototype.find
	_export({ target: 'Array', proto: true, forced: SKIPS_HOLES }, {
	  find: function find(callbackfn /* , that = undefined */) {
	    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var find$2 = entryVirtual('Array').find;

	var ArrayPrototype = Array.prototype;

	var find_1 = function (it) {
	  var own = it.find;
	  return it === ArrayPrototype || (it instanceof Array && own === ArrayPrototype.find) ? find$2 : own;
	};

	var find$1 = find_1;

	var find = find$1;

	var isArray$1 = isArray$4;

	var isArray = isArray$1;

	// First coord is octaves, second is fifths. Distances are relative to c
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

	var notecoord = function(name) {
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

	  if (!parts || name !== parts[0])
	    throw new Error('Invalid formatting');

	  var note = parts[2];
	  var octaveFirst = parts[1];
	  var octaveLast = parts[4];
	  var lower = note === note.toLowerCase();
	  var octave;

	  if (octaveFirst) {
	    if (lower)
	      throw new Error('Invalid formatting - found commas before lowercase note');

	    octave = 2 - octaveFirst.length;
	  } else if (octaveLast) {
	    if (octaveLast.match(/^'+$/) && lower)
	      octave = 3 + octaveLast.length;
	    else if (octaveLast.match(/^,+$/) && !lower)
	      octave = 2 - octaveLast.length;
	    else
	      throw new Error('Invalid formatting - mismatch between octave ' +
	        'indicator and letter case')
	  } else
	    octave = lower ? 3 : 2;

	  var accidentalValue$1 = accidentalValue.interval(parts[3].toLowerCase());
	  var coord = notecoord(note.toLowerCase());

	  coord[0] += octave;
	  coord[0] += accidentalValue$1[0] - notecoord.A4[0];
	  coord[1] += accidentalValue$1[1] - notecoord.A4[1];

	  return coord;
	};

	var pitchFq = function(coord, stdPitch) {
	  if (typeof coord === 'number') {
	    stdPitch = coord;
	    return function(coord) {
	      return stdPitch * Math.pow(2, (coord[0] * 12 + coord[1] * 7) / 12);
	    }
	  }

	  stdPitch = stdPitch || 440;
	  return stdPitch * Math.pow(2, (coord[0] * 12 + coord[1] * 7) / 12);
	};

	// Note coordinates [octave, fifth] relative to C
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

	  intervalFromFifth: ['second', 'sixth', 'third', 'seventh', 'fourth',
	                         'unison', 'fifth'],

	  intervalsIndex: ['unison', 'second', 'third', 'fourth', 'fifth',
	                      'sixth', 'seventh', 'octave', 'ninth', 'tenth',
	                      'eleventh', 'twelfth', 'thirteenth', 'fourteenth',
	                      'fifteenth'],

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
	  add: function(note, interval) {
	    return [note[0] + interval[0], note[1] + interval[1]];
	  },

	  sub: function(note, interval) {
	    return [note[0] - interval[0], note[1] - interval[1]];
	  },

	  mul: function(note, interval) {
	    if (typeof interval === 'number')
	      return [note[0] * interval, note[1] * interval];
	    else
	      return [note[0] * interval[0], note[1] * interval[1]];
	  },

	  sum: function(coord) {
	    return coord[0] + coord[1];
	  }
	};

	var pattern$1 = /^(AA|A|P|M|m|d|dd)(-?\d+)$/;

	// The interval it takes to raise a note a semitone
	var sharp = [-4, 7];

	var pAlts = ['dd', 'd', 'P', 'A', 'AA'];
	var mAlts = ['dd', 'd', 'm', 'M', 'A', 'AA'];

	var baseIntervals = [
	  [0, 0],
	  [3, -5],
	  [2, -3],
	  [1, -1],
	  [0, 1],
	  [3, -4],
	  [2, -2],
	  [1, 0]
	];

	var intervalCoords = function(simple) {
	  var parser = simple.match(pattern$1);
	  if (!parser) return null;

	  var quality = parser[1];
	  var number = +parser[2];
	  var sign = number < 0 ? -1 : 1;

	  number = sign < 0 ? -number : number;

	  var lower = number > 8 ? (number % 7 || 7) : number;
	  var octaves = (number - lower) / 7;

	  var base = baseIntervals[lower - 1];
	  var alts = base[0] <= 1 ? pAlts : mAlts;
	  var alt = alts.indexOf(quality) - 2;

	  // this happens, if the alteration wasn't suitable for this type
	  // of interval, such as P2 or M5 (no "perfect second" or "major fifth")
	  if (alt === -3) return null;

	  return [
	    sign * (base[0] + octaves + sharp[0] * alt),
	    sign * (base[1] + sharp[1] * alt)
	  ];
	};

	// Copy to avoid overwriting internal base intervals
	var coords = baseIntervals.slice(0);
	intervalCoords.coords = coords;

	function Interval(coord) {
	  if (!(this instanceof Interval)) return new Interval(coord);
	  this.coord = coord;
	}

	Interval.prototype = {
	  name: function() {
	    return knowledge.intervalsIndex[this.number() - 1];
	  },

	  semitones: function() {
	    return vector.sum(vector.mul(this.coord, [12, 7]));
	  },

	  number: function() {
	    return Math.abs(this.value());
	  },

	  value: function() {
	    var toMultiply = Math.floor((this.coord[1] - 2) / 7) + 1;
	    var product = vector.mul(knowledge.sharp, toMultiply);
	    var without = vector.sub(this.coord, product);
	    var i = knowledge.intervalFromFifth[without[1] + 5];
	    var diff = without[0] - knowledge.intervals[i][0];
	    var val = knowledge.stepNumber[i] + diff * 7;

	    return (val > 0) ? val : val - 2;
	  },

	  type: function() {
	    return knowledge.intervals[this.base()][0] <= 1 ? 'perfect' : 'minor';
	  },

	  base: function() {
	    var product = vector.mul(knowledge.sharp, this.qualityValue());
	    var fifth = vector.sub(this.coord, product)[1];
	    fifth = this.value() > 0 ? fifth + 5 : -(fifth - 5) % 7;
	    fifth = fifth < 0 ? knowledge.intervalFromFifth.length + fifth : fifth;

	    var name = knowledge.intervalFromFifth[fifth];
	    if (name === 'unison' && this.number() >= 8)
	      name = 'octave';

	    return name;
	  },

	  direction: function(dir) {
	    if (dir) {
	      var is = this.value() >= 1 ? 'up' : 'down';
	      if (is !== dir)
	        this.coord = vector.mul(this.coord, -1);

	      return this;
	    }
	    else
	      return this.value() >= 1 ? 'up' : 'down';
	  },

	  simple: function(ignore) {
	    // Get the (upwards) base interval (with quality)
	    var simple = knowledge.intervals[this.base()];
	    var toAdd = vector.mul(knowledge.sharp, this.qualityValue());
	    simple = vector.add(simple, toAdd);

	    // Turn it around if necessary
	    if (!ignore)
	      simple = this.direction() === 'down' ? vector.mul(simple, -1) : simple;

	    return new Interval(simple);
	  },

	  isCompound: function() {
	    return this.number() > 8;
	  },

	  octaves: function() {
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

	  invert: function() {
	    var i = this.base();
	    var qual = this.qualityValue();
	    var acc = this.type() === 'minor' ? -(qual - 1) : -qual;
	    var idx = 9 - knowledge.stepNumber[i] - 1;
	    var coord = knowledge.intervals[knowledge.intervalsIndex[idx]];
	    coord = vector.add(coord, vector.mul(knowledge.sharp, acc));

	    return new Interval(coord);
	  },

	  quality: function(lng) {
	    var quality = knowledge.alterations[this.type()][this.qualityValue() + 2];

	    return lng ? knowledge.qualityLong[quality] : quality;
	  },

	  qualityValue: function() {
	    if (this.direction() === 'down')
	      return Math.floor((-this.coord[1] - 2) / 7) + 1;
	    else
	      return Math.floor((this.coord[1] - 2) / 7) + 1;
	  },

	  equal: function(interval) {
	      return this.coord[0] === interval.coord[0] &&
	          this.coord[1] === interval.coord[1];
	  },

	  greater: function(interval) {
	    var semi = this.semitones();
	    var isemi = interval.semitones();

	    // If equal in absolute size, measure which interval is bigger
	    // For example P4 is bigger than A3
	    return (semi === isemi) ?
	      (this.number() > interval.number()) : (semi > isemi);
	  },

	  smaller: function(interval) {
	    return !this.equal(interval) && !this.greater(interval);
	  },

	  add: function(interval) {
	    return new Interval(vector.add(this.coord, interval.coord));
	  },

	  toString: function(ignore) {
	    // If given true, return the positive value
	    var number = ignore ? this.number() : this.value();

	    return this.quality() + number;
	  }
	};

	Interval.toCoord = function(simple) {
	  var coord = intervalCoords(simple);
	  if (!coord)
	    throw new Error('Invalid simple format interval');

	  return new Interval(coord);
	};

	Interval.from = function(from, to) {
	  return from.interval(to);
	};

	Interval.between = function(from, to) {
	  return new Interval(vector.sub(to.coord, from.coord));
	};

	Interval.invert = function(sInterval) {
	  return Interval.toCoord(sInterval).invert().toString();
	};

	var interval = Interval;

	function pad(str, ch, len) {
	  for (; len > 0; len--) {
	    str += ch;
	  }

	  return str;
	}


	function Note$1(coord, duration) {
	  if (!(this instanceof Note$1)) return new Note$1(coord, duration);
	  duration = duration || {};

	  this.duration = { value: duration.value || 4, dots: duration.dots || 0 };
	  this.coord = coord;
	}

	Note$1.prototype = {
	  octave: function() {
	    return this.coord[0] + knowledge.A4[0] - knowledge.notes[this.name()][0] +
	      this.accidentalValue() * 4;
	  },

	  name: function() {
	    var value = this.accidentalValue();
	    var idx = this.coord[1] + knowledge.A4[1] - value * 7 + 1;
	    return knowledge.fifths[idx];
	  },

	  accidentalValue: function() {
	    return Math.round((this.coord[1] + knowledge.A4[1] - 2) / 7);
	  },

	  accidental: function() {
	    return knowledge.accidentals[this.accidentalValue() + 2];
	  },

	  /**
	   * Returns the key number of the note
	   */
	  key: function(white) {
	    if (white)
	      return this.coord[0] * 7 + this.coord[1] * 4 + 29;
	    else
	      return this.coord[0] * 12 + this.coord[1] * 7 + 49;
	  },

	  /**
	  * Returns a number ranging from 0-127 representing a MIDI note value
	  */
	  midi: function() {
	    return this.key() + 20;
	  },

	  /**
	   * Calculates and returns the frequency of the note.
	   * Optional concert pitch (def. 440)
	   */
	  fq: function(concertPitch) {
	    return pitchFq(this.coord, concertPitch);
	  },

	  /**
	   * Returns the pitch class index (chroma) of the note
	   */
	  chroma: function() {
	    var value = (vector.sum(vector.mul(this.coord, [12, 7])) - 3) % 12;

	    return (value < 0) ? value + 12 : value;
	  },

	  interval: function(interval$1) {
	    if (typeof interval$1 === 'string') interval$1 = interval.toCoord(interval$1);

	    if (interval$1 instanceof interval)
	      return new Note$1(vector.add(this.coord, interval$1.coord), this.duration);
	    else if (interval$1 instanceof Note$1)
	      return new interval(vector.sub(interval$1.coord, this.coord));
	  },

	  transpose: function(interval) {
	    this.coord = vector.add(this.coord, interval.coord);
	    return this;
	  },

	  /**
	   * Returns the Helmholtz notation form of the note (fx C,, d' F# g#'')
	   */
	  helmholtz: function() {
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
	  scientific: function() {
	    return this.name().toUpperCase() + this.accidental() + this.octave();
	  },

	  /**
	   * Returns notes that are enharmonic with this note.
	   */
	  enharmonics: function(oneaccidental) {
	    var key = this.key(), limit = oneaccidental ? 2 : 3;

	    return ['m3', 'm2', 'm-2', 'm-3']
	      .map(this.interval.bind(this))
	      .filter(function(note) {
	      var acc = note.accidentalValue();
	      var diff = key - (note.key() - acc);

	      if (diff < limit && diff > -limit) {
	        var product = vector.mul(knowledge.sharp, diff - acc);
	        note.coord = vector.add(note.coord, product);
	        return true;
	      }
	    });
	  },

	  solfege: function(scale, showOctaves) {
	    var interval = scale.tonic.interval(this), solfege, stroke, count;
	    if (interval.direction() === 'down')
	      interval = interval.invert();

	    if (showOctaves) {
	      count = (this.key(true) - scale.tonic.key(true)) / 7;
	      count = (count >= 0) ? Math.floor(count) : -(Math.ceil(-count));
	      stroke = (count >= 0) ? '\'' : ',';
	    }

	    solfege = knowledge.intervalSolfege[interval.simple(true).toString()];
	    return (showOctaves) ? pad(solfege, stroke, Math.abs(count)) : solfege;
	  },

	  scaleDegree: function(scale) {
	    var inter = scale.tonic.interval(this);

	    // If the direction is down, or we're dealing with an octave - invert it
	    if (inter.direction() === 'down' ||
	       (inter.coord[1] === 0 && inter.coord[0] !== 0)) {
	      inter = inter.invert();
	    }

	    inter = inter.simple(true).coord;

	    return scale.scale.reduce(function(index, current, i) {
	      var coord = interval.toCoord(current).coord;
	      return coord[0] === inter[0] && coord[1] === inter[1] ? i + 1 : index;
	    }, 0);
	  },

	  /**
	   * Returns the name of the duration value,
	   * such as 'whole', 'quarter', 'sixteenth' etc.
	   */
	  durationName: function() {
	    return knowledge.durations[this.duration.value];
	  },

	  /**
	   * Returns the duration of the note (including dots)
	   * in seconds. The first argument is the tempo in beats
	   * per minute, the second is the beat unit (i.e. the
	   * lower numeral in a time signature).
	   */
	  durationInSeconds: function(bpm, beatUnit) {
	    var secs = (60 / bpm) / (this.duration.value / 4) / (beatUnit / 4);
	    return secs * 2 - secs / Math.pow(2, this.duration.dots);
	  },

	  /**
	   * Returns the name of the note, with an optional display of octave number
	   */
	  toString: function(dont) {
	    return this.name() + this.accidental() + (dont ? '' : this.octave());
	  }
	};

	Note$1.fromString = function(name, dur) {
	  var coord = scientificNotation(name);
	  if (!coord) coord = helmholtz(name);
	  return new Note$1(coord, dur);
	};

	Note$1.fromKey = function(key) {
	  var octave = Math.floor((key - 4) / 12);
	  var distance = key - (octave * 12) - 4;
	  var name = knowledge.fifths[(2 * Math.round(distance / 2) + 1) % 7];
	  var subDiff = vector.sub(knowledge.notes[name], knowledge.A4);
	  var note = vector.add(subDiff, [octave + 1, 0]);
	  var diff = (key - 49) - vector.sum(vector.mul(note, [12, 7]));

	  var arg = diff ? vector.add(note, vector.mul(knowledge.sharp, diff)) : note;
	  return new Note$1(arg);
	};

	Note$1.fromFrequency = function(fq, concertPitch) {
	  var key, cents, originalFq;
	  concertPitch = concertPitch || 440;

	  key = 49 + 12 * ((Math.log(fq) - Math.log(concertPitch)) / Math.log(2));
	  key = Math.round(key);
	  originalFq = concertPitch * Math.pow(2, (key - 49) / 12);
	  cents = 1200 * (Math.log(fq / originalFq) / Math.log(2));

	  return { note: Note$1.fromKey(key), cents: cents };
	};

	Note$1.fromMIDI = function(note) {
	  return Note$1.fromKey(note - 20);
	};

	var note = Note$1;

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

	var daccord = function(symbol) {
	  var c, parsing = 'quality', additionals = [], name, chordLength = 2;
	  var notes = ['P1', 'M3', 'P5', 'm7', 'M9', 'P11', 'M13'];
	  var explicitMajor = false;

	  function setChord(name) {
	    var intervals = SYMBOLS[name];
	    for (var i = 0, len = intervals.length; i < len; i++) {
	      notes[i + 1] = intervals[i];
	    }

	    chordLength = intervals.length;
	  }

	  // Remove whitespace, commas and parentheses
	  symbol = symbol.replace(/[,\s\(\)]/g, '');
	  for (var i = 0, len = symbol.length; i < len; i++) {
	    if (!(c = symbol[i]))
	      return;

	    if (parsing === 'quality') {
	      var sub3 = (i + 2) < len ? symbol.substr(i, 3).toLowerCase() : null;
	      var sub2 = (i + 1) < len ? symbol.substr(i, 2).toLowerCase() : null;
	      if (sub3 in SYMBOLS)
	        name = sub3;
	      else if (sub2 in SYMBOLS)
	        name = sub2;
	      else if (c in SYMBOLS)
	        name = c;
	      else
	        name = '';

	      if (name)
	        setChord(name);

	      if (name === 'M' || name === 'ma' || name === 'maj')
	        explicitMajor = true;


	      i += name.length - 1;
	      parsing = 'extension';
	    } else if (parsing === 'extension') {
	      c = (c === '1' && symbol[i + 1]) ? +symbol.substr(i, 2) : +c;

	      if (!isNaN(c) && c !== 6) {
	        chordLength = (c - 1) / 2;

	        if (chordLength !== Math.round(chordLength))
	          return new Error('Invalid interval extension: ' + c.toString(10));

	        if (name === 'o' || name === 'dim')
	          notes[3] = 'd7';
	        else if (explicitMajor)
	          notes[3] = 'M7';

	        i += c >= 10 ? 1 : 0;
	      } else if (c === 6) {
	        notes[3] = 'M6';
	        chordLength = Math.max(3, chordLength);
	      } else
	        i -= 1;

	      parsing = 'alterations';
	    } else if (parsing === 'alterations') {
	      var alterations = symbol.substr(i).split(/(#|b|add|maj|sus|M)/i),
	          flat = false, sharp = false;

	      if (alterations.length === 1)
	        return new Error('Invalid alteration');
	      else if (alterations[0].length !== 0)
	        return new Error('Invalid token: \'' + alterations[0] + '\'');

	      var ignore = false;
	      alterations.forEach(function(alt, i, arr) {
	        if (ignore || !alt.length)
	          return ignore = false;

	        var next = arr[i + 1], lower = alt.toLowerCase();
	        if (alt === 'M' || lower === 'maj') {
	          if (next === '7')
	            ignore = true;

	          chordLength = Math.max(3, chordLength);
	          notes[3] = 'M7';
	        } else if (lower === 'sus') {
	          var type = 'P4';
	          if (next === '2' || next === '4') {
	            ignore = true;

	            if (next === '2')
	              type = 'M2';
	          }

	          notes[1] = type; // Replace third with M2 or P4
	        } else if (lower === 'add') {
	          if (next === '9')
	            additionals.push('M9');
	          else if (next === '11')
	            additionals.push('P11');
	          else if (next === '13')
	            additionals.push('M13');

	          ignore = true;
	        } else if (lower === 'b') {
	          flat = true;
	        } else if (lower === '#') {
	          sharp = true;
	        } else {
	          var token = +alt, quality, intPos;
	          if (isNaN(token) || String(token).length !== alt.length)
	            return new Error('Invalid token: \'' + alt + '\'');

	          if (token === 6) {
	            if (sharp)
	              notes[3] = 'A6';
	            else if (flat)
	              notes[3] = 'm6';
	            else
	              notes[3] = 'M6';

	            chordLength = Math.max(3, chordLength);
	            return;
	          }

	          // Calculate the position in the 'note' array
	          intPos = (token - 1) / 2;
	          if (chordLength < intPos)
	            chordLength = intPos;

	          if (token < 5 || token === 7 || intPos !== Math.round(intPos))
	            return new Error('Invalid interval alteration: ' + token);

	          quality = notes[intPos][0];

	          // Alterate the quality of the interval according the accidentals
	          if (sharp) {
	            if (quality === 'd')
	              quality = 'm';
	            else if (quality === 'm')
	              quality = 'M';
	            else if (quality === 'M' || quality === 'P')
	              quality = 'A';
	          } else if (flat) {
	            if (quality === 'A')
	              quality = 'M';
	            else if (quality === 'M')
	              quality = 'm';
	            else if (quality === 'm' || quality === 'P')
	              quality = 'd';
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

	  this.intervals = daccord(name).map(interval.toCoord);
	  this._voicing = this.intervals.slice();

	  if (bass) {
	    var intervals = this.intervals, bassInterval, note$1;
	    // Make sure the bass is atop of the root note
	    note$1 = note.fromString(bass + (root.octave() + 1)); // crude

	    bassInterval = interval.between(root, note$1);
	    bass = bassInterval.simple();
	    bassInterval = bassInterval.invert().direction('down');

	    this._voicing = [bassInterval];
	    for (var i = 0, length = intervals.length;  i < length; i++) {
	      if (!intervals[i].simple().equal(bass))
	        this._voicing.push(intervals[i]);
	    }
	  }
	}

	Chord.prototype = {
	  notes: function() {
	    var root = this.root;
	    return this.voicing().map(function(interval) {
	      return root.interval(interval);
	    });
	  },

	  simple: function() {
	    return this.notes().map(function(n) { return n.toString(true); });
	  },

	  bass: function() {
	    return this.root.interval(this._voicing[0]);
	  },

	  voicing: function(voicing) {
	    // Get the voicing
	    if (!voicing) {
	      return this._voicing;
	    }

	    // Set the voicing
	    this._voicing = [];
	    for (var i = 0, length = voicing.length; i < length; i++) {
	      this._voicing[i] = interval.toCoord(voicing[i]);
	    }

	    return this;
	  },

	  resetVoicing: function() {
	    this._voicing = this.intervals;
	  },

	  dominant: function(additional) {
	    additional = additional || '';
	    return new Chord(this.root.interval('P5'), additional);
	  },

	  subdominant: function(additional) {
	    additional = additional || '';
	    return new Chord(this.root.interval('P4'), additional);
	  },

	  parallel: function(additional) {
	    var quality = this.quality();

	    if (this.chordType() !== 'triad' || quality === 'diminished' ||
	        quality === 'augmented') {
	      throw new Error('Only major/minor triads have parallel chords');
	    }

	    if (quality === 'major') {
	      return new Chord(this.root.interval('m3', 'down'), 'm');
	    } else {
	      return new Chord(this.root.interval('m3', 'up'));
	    }
	  },

	  quality: function() {
	    var third, fifth, seventh, intervals = this.intervals;

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

	    third = (third.direction() === 'down') ? third.invert() : third;
	    third = third.simple().toString();

	    if (fifth) {
	      fifth = (fifth.direction === 'down') ? fifth.invert() : fifth;
	      fifth = fifth.simple().toString();
	    }

	    if (seventh) {
	      seventh = (seventh.direction === 'down') ? seventh.invert() : seventh;
	      seventh = seventh.simple().toString();
	    }

	    if (third === 'M3') {
	      if (fifth === 'A5') {
	        return 'augmented';
	      } else if (fifth === 'P5') {
	        return (seventh === 'm7') ? 'dominant' : 'major';
	      }

	      return 'major';
	    } else if (third === 'm3') {
	      if (fifth === 'P5') {
	        return 'minor';
	      } else if (fifth === 'd5') {
	        return (seventh === 'm7') ? 'half-diminished' : 'diminished';
	      }

	      return 'minor';
	    }
	  },

	  chordType: function() { // In need of better name
	    var length = this.intervals.length, interval, has, invert, i, name;

	    if (length === 2) {
	      return 'dyad';
	    } else if (length === 3) {
	      has = {unison: false, third: false, fifth: false};
	      for (i = 0; i < length; i++) {
	        interval = this.intervals[i];
	        invert = interval.invert();
	        if (interval.base() in has) {
	          has[interval.base()] = true;
	        } else if (invert.base() in has) {
	          has[invert.base()] = true;
	        }
	      }

	      name = (has.unison && has.third && has.fifth) ? 'triad' : 'trichord';
	    } else if (length === 4) {
	      has = {unison: false, third: false, fifth: false, seventh: false};
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

	  get: function(interval) {
	    if (typeof interval === 'string' && interval in knowledge.stepNumber) {
	      var intervals = this.intervals, i, length;

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

	  interval: function(interval) {
	    return new Chord(this.root.interval(interval), this.symbol);
	  },

	  transpose: function(interval) {
	    this.root.transpose(interval);
	    this.name = this.root.name().toUpperCase() +
	                this.root.accidental() + this.symbol;

	    return this;
	  },

	  toString: function() {
	    return this.name;
	  }
	};

	var chord = Chord;

	var scales = {
	  aeolian: ['P1', 'M2', 'm3', 'P4', 'P5', 'm6', 'm7'],
	  blues: ['P1', 'm3', 'P4', 'd5', 'P5', 'm7'],
	  chromatic: ['P1', 'm2', 'M2', 'm3', 'M3', 'P4',
	    'A4', 'P5', 'm6', 'M6', 'm7', 'M7'],
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
	};

	// synonyms
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
	    if (!scale)
	      throw new Error('Invalid Scale');
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
	  notes: function() {
	    var notes = [];

	    for (var i = 0, length = this.scale.length; i < length; i++) {
	      notes.push(this.tonic.interval(this.scale[i]));
	    }

	    return notes;
	  },

	  simple: function() {
	    return this.notes().map(function(n) { return n.toString(true); });
	  },

	  type: function() {
	    var length = this.scale.length - 2;
	    if (length < 8) {
	      return ['di', 'tri', 'tetra', 'penta', 'hexa', 'hepta', 'octa'][length] +
	        'tonic';
	    }
	  },

	  get: function(i) {
	    var isStepStr = typeof i === 'string' && i in knowledge.stepNumber;
	    i = isStepStr ? knowledge.stepNumber[i] : i;
	    var len = this.scale.length;
	    var interval$1, octaves;

	    if (i < 0) {
	      interval$1 = this.scale[i % len + len - 1];
	      octaves = Math.floor((i - 1) / len);
	    } else if (i % len === 0) {
	      interval$1 = this.scale[len - 1];
	      octaves = (i / len) - 1;
	    } else {
	      interval$1 = this.scale[i % len - 1];
	      octaves = Math.floor(i / len);
	    }

	    return this.tonic.interval(interval$1).interval(new interval([octaves, 0]));
	  },

	  solfege: function(index, showOctaves) {
	    if (index)
	      return this.get(index).solfege(this, showOctaves);

	    return this.notes().map(function(n) {
	      return n.solfege(this, showOctaves);
	    });
	  },

	  interval: function(interval$1) {
	    interval$1 = (typeof interval$1 === 'string') ?
	      interval.toCoord(interval$1) : interval$1;
	    return new Scale(this.tonic.interval(interval$1), this.scale);
	  },

	  transpose: function(interval) {
	    var scale = this.interval(interval);
	    this.scale = scale.scale;
	    this.tonic = scale.tonic;

	    return this;
	  }
	};
	Scale.KNOWN_SCALES = Object.keys(scales);

	var scale = Scale;

	var sugar = function(teoria) {
	  var Note = teoria.Note;
	  var Chord = teoria.Chord;
	  var Scale = teoria.Scale;

	  Note.prototype.chord = function(chord) {
	    var isShortChord = chord in knowledge.chordShort;
	    chord = isShortChord ? knowledge.chordShort[chord] : chord;

	    return new Chord(this, chord);
	  };

	  Note.prototype.scale = function(scale) {
	    return new Scale(this, scale);
	  };
	};

	var teoria_1 = createCommonjsModule(function (module, exports) {
	var teoria;

	// never thought I would write this, but: Legacy support
	function intervalConstructor(from, to) {
	  // Construct a Interval object from string representation
	  if (typeof from === 'string')
	    return interval.toCoord(from);

	  if (typeof to === 'string' && from instanceof note)
	    return interval.from(from, interval.toCoord(to));

	  if (to instanceof interval && from instanceof note)
	    return interval.from(from, to);

	  if (to instanceof note && from instanceof note)
	    return interval.between(from, to);

	  throw new Error('Invalid parameters');
	}

	intervalConstructor.toCoord = interval.toCoord;
	intervalConstructor.from = interval.from;
	intervalConstructor.between = interval.between;
	intervalConstructor.invert = interval.invert;

	function noteConstructor(name, duration) {
	  if (typeof name === 'string')
	    return note.fromString(name, duration);
	  else
	    return new note(name, duration);
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
	      return new chord(note.fromString(root[0].toLowerCase() + octave),
	                            name.substr(root[0].length));
	    }
	  } else if (name instanceof note)
	    return new chord(name, symbol);

	  throw new Error('Invalid Chord. Couldn\'t find note name');
	}

	function scaleConstructor(tonic, scale$1) {
	  tonic = (tonic instanceof note) ? tonic : teoria.note(tonic);
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
	  Interval: interval
	};


	sugar(teoria);
	module.exports = teoria;
	});

	var $schema$2 = "http://json-schema.org/draft-06/schema#";
	var definitions$1 = {
		headers: {
			type: "object",
			properties: {
				meter: {
					type: "array",
					items: {
						type: "number",
						minimum: 1
					},
					minItems: 2,
					maxItems: 2
				},
				tempo: {
					type: "number",
					minimum: 0
				},
				"beat-unit": {
					type: "number",
					minimum: 0.001953125
				},
				"pulse-beat": {
					type: "number",
					minimum: 0.001953125
				},
				"beat-units-per-measure": {
					type: "number",
					minimum: 0
				},
				"pulse-beats-per-measure": {
					type: "number",
					minimum: 0
				},
				"total-beats": {
					type: "number",
					minimum: 0
				},
				"total-beat-units": {
					type: "number",
					minimum: 0
				},
				"total-pulse-beats": {
					type: "number",
					minimum: 0
				},
				"ms-per-pulse-beat": {
					type: "number",
					minimum: 1
				},
				"ms-per-beat-unit": {
					type: "number",
					minimum: 1
				}
			},
			required: [
				"meter",
				"tempo",
				"beat-unit",
				"pulse-beat",
				"beat-units-per-measure",
				"pulse-beats-per-measure",
				"total-beats",
				"total-beat-units",
				"total-pulse-beats",
				"ms-per-pulse-beat",
				"ms-per-beat-unit"
			],
			additionalProperties: true
		},
		element: {
			type: "string",
			pattern: "^(~|#|[a-zA-Z_]+[a-zA-Z0-9_-]*)$"
		},
		"arguments": {
			type: "array",
			items: {
				type: "string"
			}
		},
		item: {
			type: "object",
			properties: {
				keyword: {
					$ref: "#/definitions/element"
				},
				"arguments": {
					$ref: "#/definitions/arguments"
				}
			}
		},
		beat: {
			oneOf: [
				{
					type: "object",
					properties: {
						duration: {
							type: "number"
						},
						items: {
							type: "array",
							items: {
								$ref: "#/definitions/item"
							}
						}
					},
					required: [
						"duration",
						"items"
					]
				},
				{
					type: "null"
				}
			]
		}
	};
	var type$2 = "object";
	var properties$3 = {
		headers: {
			type: "object"
		},
		data: {
			type: "array",
			items: {
				type: "array",
				items: {
					$ref: "#/definitions/beat"
				}
			}
		}
	};
	var required$2 = [
		"headers",
		"data"
	];
	var require$$0 = {
		$schema: $schema$2,
		definitions: definitions$1,
		type: type$2,
		properties: properties$3,
		required: required$2
	};

	var bachJsonSchema = require$$0;

	/** @license URI.js v4.4.1 (c) 2011 Gary Court. License: http://github.com/garycourt/uri-js */

	var uri_all = createCommonjsModule(function (module, exports) {
	(function (global, factory) {
		factory(exports) ;
	}(commonjsGlobal, (function (exports) {
	function merge() {
	    for (var _len = arguments.length, sets = Array(_len), _key = 0; _key < _len; _key++) {
	        sets[_key] = arguments[_key];
	    }

	    if (sets.length > 1) {
	        sets[0] = sets[0].slice(0, -1);
	        var xl = sets.length - 1;
	        for (var x = 1; x < xl; ++x) {
	            sets[x] = sets[x].slice(1, -1);
	        }
	        sets[xl] = sets[xl].slice(1);
	        return sets.join('');
	    } else {
	        return sets[0];
	    }
	}
	function subexp(str) {
	    return "(?:" + str + ")";
	}
	function typeOf(o) {
	    return o === undefined ? "undefined" : o === null ? "null" : Object.prototype.toString.call(o).split(" ").pop().split("]").shift().toLowerCase();
	}
	function toUpperCase(str) {
	    return str.toUpperCase();
	}
	function toArray(obj) {
	    return obj !== undefined && obj !== null ? obj instanceof Array ? obj : typeof obj.length !== "number" || obj.split || obj.setInterval || obj.call ? [obj] : Array.prototype.slice.call(obj) : [];
	}
	function assign(target, source) {
	    var obj = target;
	    if (source) {
	        for (var key in source) {
	            obj[key] = source[key];
	        }
	    }
	    return obj;
	}

	function buildExps(isIRI) {
	    var ALPHA$$ = "[A-Za-z]",
	        DIGIT$$ = "[0-9]",
	        HEXDIG$$ = merge(DIGIT$$, "[A-Fa-f]"),
	        PCT_ENCODED$ = subexp(subexp("%[EFef]" + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$) + "|" + subexp("%[89A-Fa-f]" + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$) + "|" + subexp("%" + HEXDIG$$ + HEXDIG$$)),
	        //expanded
	    GEN_DELIMS$$ = "[\\:\\/\\?\\#\\[\\]\\@]",
	        SUB_DELIMS$$ = "[\\!\\$\\&\\'\\(\\)\\*\\+\\,\\;\\=]",
	        RESERVED$$ = merge(GEN_DELIMS$$, SUB_DELIMS$$),
	        UCSCHAR$$ = isIRI ? "[\\xA0-\\u200D\\u2010-\\u2029\\u202F-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF]" : "[]",
	        //subset, excludes bidi control characters
	    IPRIVATE$$ = isIRI ? "[\\uE000-\\uF8FF]" : "[]",
	        //subset
	    UNRESERVED$$ = merge(ALPHA$$, DIGIT$$, "[\\-\\.\\_\\~]", UCSCHAR$$);
	        subexp(ALPHA$$ + merge(ALPHA$$, DIGIT$$, "[\\+\\-\\.]") + "*");
	        subexp(subexp(PCT_ENCODED$ + "|" + merge(UNRESERVED$$, SUB_DELIMS$$, "[\\:]")) + "*");
	        var DEC_OCTET_RELAXED$ = subexp(subexp("25[0-5]") + "|" + subexp("2[0-4]" + DIGIT$$) + "|" + subexp("1" + DIGIT$$ + DIGIT$$) + "|" + subexp("0?[1-9]" + DIGIT$$) + "|0?0?" + DIGIT$$),
	        //relaxed parsing rules
	    IPV4ADDRESS$ = subexp(DEC_OCTET_RELAXED$ + "\\." + DEC_OCTET_RELAXED$ + "\\." + DEC_OCTET_RELAXED$ + "\\." + DEC_OCTET_RELAXED$),
	        H16$ = subexp(HEXDIG$$ + "{1,4}"),
	        LS32$ = subexp(subexp(H16$ + "\\:" + H16$) + "|" + IPV4ADDRESS$),
	        IPV6ADDRESS1$ = subexp(subexp(H16$ + "\\:") + "{6}" + LS32$),
	        //                           6( h16 ":" ) ls32
	    IPV6ADDRESS2$ = subexp("\\:\\:" + subexp(H16$ + "\\:") + "{5}" + LS32$),
	        //                      "::" 5( h16 ":" ) ls32
	    IPV6ADDRESS3$ = subexp(subexp(H16$) + "?\\:\\:" + subexp(H16$ + "\\:") + "{4}" + LS32$),
	        //[               h16 ] "::" 4( h16 ":" ) ls32
	    IPV6ADDRESS4$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,1}" + H16$) + "?\\:\\:" + subexp(H16$ + "\\:") + "{3}" + LS32$),
	        //[ *1( h16 ":" ) h16 ] "::" 3( h16 ":" ) ls32
	    IPV6ADDRESS5$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,2}" + H16$) + "?\\:\\:" + subexp(H16$ + "\\:") + "{2}" + LS32$),
	        //[ *2( h16 ":" ) h16 ] "::" 2( h16 ":" ) ls32
	    IPV6ADDRESS6$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,3}" + H16$) + "?\\:\\:" + H16$ + "\\:" + LS32$),
	        //[ *3( h16 ":" ) h16 ] "::"    h16 ":"   ls32
	    IPV6ADDRESS7$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,4}" + H16$) + "?\\:\\:" + LS32$),
	        //[ *4( h16 ":" ) h16 ] "::"              ls32
	    IPV6ADDRESS8$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,5}" + H16$) + "?\\:\\:" + H16$),
	        //[ *5( h16 ":" ) h16 ] "::"              h16
	    IPV6ADDRESS9$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,6}" + H16$) + "?\\:\\:"),
	        //[ *6( h16 ":" ) h16 ] "::"
	    IPV6ADDRESS$ = subexp([IPV6ADDRESS1$, IPV6ADDRESS2$, IPV6ADDRESS3$, IPV6ADDRESS4$, IPV6ADDRESS5$, IPV6ADDRESS6$, IPV6ADDRESS7$, IPV6ADDRESS8$, IPV6ADDRESS9$].join("|")),
	        ZONEID$ = subexp(subexp(UNRESERVED$$ + "|" + PCT_ENCODED$) + "+");
	        //RFC 6874, with relaxed parsing rules
	    subexp("[vV]" + HEXDIG$$ + "+\\." + merge(UNRESERVED$$, SUB_DELIMS$$, "[\\:]") + "+");
	        //RFC 6874
	    subexp(subexp(PCT_ENCODED$ + "|" + merge(UNRESERVED$$, SUB_DELIMS$$)) + "*");
	        var PCHAR$ = subexp(PCT_ENCODED$ + "|" + merge(UNRESERVED$$, SUB_DELIMS$$, "[\\:\\@]"));
	        subexp(subexp(PCT_ENCODED$ + "|" + merge(UNRESERVED$$, SUB_DELIMS$$, "[\\@]")) + "+");
	        subexp(subexp(PCHAR$ + "|" + merge("[\\/\\?]", IPRIVATE$$)) + "*");
	    return {
	        NOT_SCHEME: new RegExp(merge("[^]", ALPHA$$, DIGIT$$, "[\\+\\-\\.]"), "g"),
	        NOT_USERINFO: new RegExp(merge("[^\\%\\:]", UNRESERVED$$, SUB_DELIMS$$), "g"),
	        NOT_HOST: new RegExp(merge("[^\\%\\[\\]\\:]", UNRESERVED$$, SUB_DELIMS$$), "g"),
	        NOT_PATH: new RegExp(merge("[^\\%\\/\\:\\@]", UNRESERVED$$, SUB_DELIMS$$), "g"),
	        NOT_PATH_NOSCHEME: new RegExp(merge("[^\\%\\/\\@]", UNRESERVED$$, SUB_DELIMS$$), "g"),
	        NOT_QUERY: new RegExp(merge("[^\\%]", UNRESERVED$$, SUB_DELIMS$$, "[\\:\\@\\/\\?]", IPRIVATE$$), "g"),
	        NOT_FRAGMENT: new RegExp(merge("[^\\%]", UNRESERVED$$, SUB_DELIMS$$, "[\\:\\@\\/\\?]"), "g"),
	        ESCAPE: new RegExp(merge("[^]", UNRESERVED$$, SUB_DELIMS$$), "g"),
	        UNRESERVED: new RegExp(UNRESERVED$$, "g"),
	        OTHER_CHARS: new RegExp(merge("[^\\%]", UNRESERVED$$, RESERVED$$), "g"),
	        PCT_ENCODED: new RegExp(PCT_ENCODED$, "g"),
	        IPV4ADDRESS: new RegExp("^(" + IPV4ADDRESS$ + ")$"),
	        IPV6ADDRESS: new RegExp("^\\[?(" + IPV6ADDRESS$ + ")" + subexp(subexp("\\%25|\\%(?!" + HEXDIG$$ + "{2})") + "(" + ZONEID$ + ")") + "?\\]?$") //RFC 6874, with relaxed parsing rules
	    };
	}
	var URI_PROTOCOL = buildExps(false);

	var IRI_PROTOCOL = buildExps(true);

	var slicedToArray = function () {
	  function sliceIterator(arr, i) {
	    var _arr = [];
	    var _n = true;
	    var _d = false;
	    var _e = undefined;

	    try {
	      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
	        _arr.push(_s.value);

	        if (i && _arr.length === i) break;
	      }
	    } catch (err) {
	      _d = true;
	      _e = err;
	    } finally {
	      try {
	        if (!_n && _i["return"]) _i["return"]();
	      } finally {
	        if (_d) throw _e;
	      }
	    }

	    return _arr;
	  }

	  return function (arr, i) {
	    if (Array.isArray(arr)) {
	      return arr;
	    } else if (Symbol.iterator in Object(arr)) {
	      return sliceIterator(arr, i);
	    } else {
	      throw new TypeError("Invalid attempt to destructure non-iterable instance");
	    }
	  };
	}();













	var toConsumableArray = function (arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

	    return arr2;
	  } else {
	    return Array.from(arr);
	  }
	};

	/** Highest positive signed 32-bit float value */

	var maxInt = 2147483647; // aka. 0x7FFFFFFF or 2^31-1

	/** Bootstring parameters */
	var base = 36;
	var tMin = 1;
	var tMax = 26;
	var skew = 38;
	var damp = 700;
	var initialBias = 72;
	var initialN = 128; // 0x80
	var delimiter = '-'; // '\x2D'

	/** Regular expressions */
	var regexPunycode = /^xn--/;
	var regexNonASCII = /[^\0-\x7E]/; // non-ASCII chars
	var regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g; // RFC 3490 separators

	/** Error messages */
	var errors = {
		'overflow': 'Overflow: input needs wider integers to process',
		'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
		'invalid-input': 'Invalid input'
	};

	/** Convenience shortcuts */
	var baseMinusTMin = base - tMin;
	var floor = Math.floor;
	var stringFromCharCode = String.fromCharCode;

	/*--------------------------------------------------------------------------*/

	/**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */
	function error$1(type) {
		throw new RangeError(errors[type]);
	}

	/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */
	function map(array, fn) {
		var result = [];
		var length = array.length;
		while (length--) {
			result[length] = fn(array[length]);
		}
		return result;
	}

	/**
	 * A simple `Array#map`-like wrapper to work with domain name strings or email
	 * addresses.
	 * @private
	 * @param {String} domain The domain name or email address.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */
	function mapDomain(string, fn) {
		var parts = string.split('@');
		var result = '';
		if (parts.length > 1) {
			// In email addresses, only the domain name should be punycoded. Leave
			// the local part (i.e. everything up to `@`) intact.
			result = parts[0] + '@';
			string = parts[1];
		}
		// Avoid `split(regex)` for IE8 compatibility. See #17.
		string = string.replace(regexSeparators, '\x2E');
		var labels = string.split('.');
		var encoded = map(labels, fn).join('.');
		return result + encoded;
	}

	/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */
	function ucs2decode(string) {
		var output = [];
		var counter = 0;
		var length = string.length;
		while (counter < length) {
			var value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// It's a high surrogate, and there is a next character.
				var extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) {
					// Low surrogate.
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// It's an unmatched surrogate; only append this code unit, in case the
					// next code unit is the high surrogate of a surrogate pair.
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	/**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */
	var ucs2encode = function ucs2encode(array) {
		return String.fromCodePoint.apply(String, toConsumableArray(array));
	};

	/**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic numeric code point value.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */
	var basicToDigit = function basicToDigit(codePoint) {
		if (codePoint - 0x30 < 0x0A) {
			return codePoint - 0x16;
		}
		if (codePoint - 0x41 < 0x1A) {
			return codePoint - 0x41;
		}
		if (codePoint - 0x61 < 0x1A) {
			return codePoint - 0x61;
		}
		return base;
	};

	/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */
	var digitToBasic = function digitToBasic(digit, flag) {
		//  0..25 map to ASCII a..z or A..Z
		// 26..35 map to ASCII 0..9
		return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
	};

	/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * https://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */
	var adapt = function adapt(delta, numPoints, firstTime) {
		var k = 0;
		delta = firstTime ? floor(delta / damp) : delta >> 1;
		delta += floor(delta / numPoints);
		for (; /* no initialization */delta > baseMinusTMin * tMax >> 1; k += base) {
			delta = floor(delta / baseMinusTMin);
		}
		return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
	};

	/**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */
	var decode = function decode(input) {
		// Don't use UCS-2.
		var output = [];
		var inputLength = input.length;
		var i = 0;
		var n = initialN;
		var bias = initialBias;

		// Handle the basic code points: let `basic` be the number of input code
		// points before the last delimiter, or `0` if there is none, then copy
		// the first basic code points to the output.

		var basic = input.lastIndexOf(delimiter);
		if (basic < 0) {
			basic = 0;
		}

		for (var j = 0; j < basic; ++j) {
			// if it's not a basic code point
			if (input.charCodeAt(j) >= 0x80) {
				error$1('not-basic');
			}
			output.push(input.charCodeAt(j));
		}

		// Main decoding loop: start just after the last delimiter if any basic code
		// points were copied; start at the beginning otherwise.

		for (var index = basic > 0 ? basic + 1 : 0; index < inputLength;) /* no final expression */{

			// `index` is the index of the next character to be consumed.
			// Decode a generalized variable-length integer into `delta`,
			// which gets added to `i`. The overflow checking is easier
			// if we increase `i` as we go, then subtract off its starting
			// value at the end to obtain `delta`.
			var oldi = i;
			for (var w = 1, k = base;; /* no condition */k += base) {

				if (index >= inputLength) {
					error$1('invalid-input');
				}

				var digit = basicToDigit(input.charCodeAt(index++));

				if (digit >= base || digit > floor((maxInt - i) / w)) {
					error$1('overflow');
				}

				i += digit * w;
				var t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;

				if (digit < t) {
					break;
				}

				var baseMinusT = base - t;
				if (w > floor(maxInt / baseMinusT)) {
					error$1('overflow');
				}

				w *= baseMinusT;
			}

			var out = output.length + 1;
			bias = adapt(i - oldi, out, oldi == 0);

			// `i` was supposed to wrap around from `out` to `0`,
			// incrementing `n` each time, so we'll fix that now:
			if (floor(i / out) > maxInt - n) {
				error$1('overflow');
			}

			n += floor(i / out);
			i %= out;

			// Insert `n` at position `i` of the output.
			output.splice(i++, 0, n);
		}

		return String.fromCodePoint.apply(String, output);
	};

	/**
	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
	 * Punycode string of ASCII-only symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */
	var encode = function encode(input) {
		var output = [];

		// Convert the input in UCS-2 to an array of Unicode code points.
		input = ucs2decode(input);

		// Cache the length.
		var inputLength = input.length;

		// Initialize the state.
		var n = initialN;
		var delta = 0;
		var bias = initialBias;

		// Handle the basic code points.
		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = input[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var _currentValue2 = _step.value;

				if (_currentValue2 < 0x80) {
					output.push(stringFromCharCode(_currentValue2));
				}
			}
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator.return) {
					_iterator.return();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}

		var basicLength = output.length;
		var handledCPCount = basicLength;

		// `handledCPCount` is the number of code points that have been handled;
		// `basicLength` is the number of basic code points.

		// Finish the basic string with a delimiter unless it's empty.
		if (basicLength) {
			output.push(delimiter);
		}

		// Main encoding loop:
		while (handledCPCount < inputLength) {

			// All non-basic code points < n have been handled already. Find the next
			// larger one:
			var m = maxInt;
			var _iteratorNormalCompletion2 = true;
			var _didIteratorError2 = false;
			var _iteratorError2 = undefined;

			try {
				for (var _iterator2 = input[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
					var currentValue = _step2.value;

					if (currentValue >= n && currentValue < m) {
						m = currentValue;
					}
				}

				// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
				// but guard against overflow.
			} catch (err) {
				_didIteratorError2 = true;
				_iteratorError2 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion2 && _iterator2.return) {
						_iterator2.return();
					}
				} finally {
					if (_didIteratorError2) {
						throw _iteratorError2;
					}
				}
			}

			var handledCPCountPlusOne = handledCPCount + 1;
			if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
				error$1('overflow');
			}

			delta += (m - n) * handledCPCountPlusOne;
			n = m;

			var _iteratorNormalCompletion3 = true;
			var _didIteratorError3 = false;
			var _iteratorError3 = undefined;

			try {
				for (var _iterator3 = input[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
					var _currentValue = _step3.value;

					if (_currentValue < n && ++delta > maxInt) {
						error$1('overflow');
					}
					if (_currentValue == n) {
						// Represent delta as a generalized variable-length integer.
						var q = delta;
						for (var k = base;; /* no condition */k += base) {
							var t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
							if (q < t) {
								break;
							}
							var qMinusT = q - t;
							var baseMinusT = base - t;
							output.push(stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0)));
							q = floor(qMinusT / baseMinusT);
						}

						output.push(stringFromCharCode(digitToBasic(q, 0)));
						bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
						delta = 0;
						++handledCPCount;
					}
				}
			} catch (err) {
				_didIteratorError3 = true;
				_iteratorError3 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion3 && _iterator3.return) {
						_iterator3.return();
					}
				} finally {
					if (_didIteratorError3) {
						throw _iteratorError3;
					}
				}
			}

			++delta;
			++n;
		}
		return output.join('');
	};

	/**
	 * Converts a Punycode string representing a domain name or an email address
	 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
	 * it doesn't matter if you call it on a string that has already been
	 * converted to Unicode.
	 * @memberOf punycode
	 * @param {String} input The Punycoded domain name or email address to
	 * convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */
	var toUnicode = function toUnicode(input) {
		return mapDomain(input, function (string) {
			return regexPunycode.test(string) ? decode(string.slice(4).toLowerCase()) : string;
		});
	};

	/**
	 * Converts a Unicode string representing a domain name or an email address to
	 * Punycode. Only the non-ASCII parts of the domain name will be converted,
	 * i.e. it doesn't matter if you call it with a domain that's already in
	 * ASCII.
	 * @memberOf punycode
	 * @param {String} input The domain name or email address to convert, as a
	 * Unicode string.
	 * @returns {String} The Punycode representation of the given domain name or
	 * email address.
	 */
	var toASCII = function toASCII(input) {
		return mapDomain(input, function (string) {
			return regexNonASCII.test(string) ? 'xn--' + encode(string) : string;
		});
	};

	/*--------------------------------------------------------------------------*/

	/** Define the public API */
	var punycode = {
		/**
	  * A string representing the current Punycode.js version number.
	  * @memberOf punycode
	  * @type String
	  */
		'version': '2.1.0',
		/**
	  * An object of methods to convert from JavaScript's internal character
	  * representation (UCS-2) to Unicode code points, and back.
	  * @see <https://mathiasbynens.be/notes/javascript-encoding>
	  * @memberOf punycode
	  * @type Object
	  */
		'ucs2': {
			'decode': ucs2decode,
			'encode': ucs2encode
		},
		'decode': decode,
		'encode': encode,
		'toASCII': toASCII,
		'toUnicode': toUnicode
	};

	/**
	 * URI.js
	 *
	 * @fileoverview An RFC 3986 compliant, scheme extendable URI parsing/validating/resolving library for JavaScript.
	 * @author <a href="mailto:gary.court@gmail.com">Gary Court</a>
	 * @see http://github.com/garycourt/uri-js
	 */
	/**
	 * Copyright 2011 Gary Court. All rights reserved.
	 *
	 * Redistribution and use in source and binary forms, with or without modification, are
	 * permitted provided that the following conditions are met:
	 *
	 *    1. Redistributions of source code must retain the above copyright notice, this list of
	 *       conditions and the following disclaimer.
	 *
	 *    2. Redistributions in binary form must reproduce the above copyright notice, this list
	 *       of conditions and the following disclaimer in the documentation and/or other materials
	 *       provided with the distribution.
	 *
	 * THIS SOFTWARE IS PROVIDED BY GARY COURT ``AS IS'' AND ANY EXPRESS OR IMPLIED
	 * WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
	 * FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL GARY COURT OR
	 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
	 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
	 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
	 * ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
	 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
	 * ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	 *
	 * The views and conclusions contained in the software and documentation are those of the
	 * authors and should not be interpreted as representing official policies, either expressed
	 * or implied, of Gary Court.
	 */
	var SCHEMES = {};
	function pctEncChar(chr) {
	    var c = chr.charCodeAt(0);
	    var e = void 0;
	    if (c < 16) e = "%0" + c.toString(16).toUpperCase();else if (c < 128) e = "%" + c.toString(16).toUpperCase();else if (c < 2048) e = "%" + (c >> 6 | 192).toString(16).toUpperCase() + "%" + (c & 63 | 128).toString(16).toUpperCase();else e = "%" + (c >> 12 | 224).toString(16).toUpperCase() + "%" + (c >> 6 & 63 | 128).toString(16).toUpperCase() + "%" + (c & 63 | 128).toString(16).toUpperCase();
	    return e;
	}
	function pctDecChars(str) {
	    var newStr = "";
	    var i = 0;
	    var il = str.length;
	    while (i < il) {
	        var c = parseInt(str.substr(i + 1, 2), 16);
	        if (c < 128) {
	            newStr += String.fromCharCode(c);
	            i += 3;
	        } else if (c >= 194 && c < 224) {
	            if (il - i >= 6) {
	                var c2 = parseInt(str.substr(i + 4, 2), 16);
	                newStr += String.fromCharCode((c & 31) << 6 | c2 & 63);
	            } else {
	                newStr += str.substr(i, 6);
	            }
	            i += 6;
	        } else if (c >= 224) {
	            if (il - i >= 9) {
	                var _c = parseInt(str.substr(i + 4, 2), 16);
	                var c3 = parseInt(str.substr(i + 7, 2), 16);
	                newStr += String.fromCharCode((c & 15) << 12 | (_c & 63) << 6 | c3 & 63);
	            } else {
	                newStr += str.substr(i, 9);
	            }
	            i += 9;
	        } else {
	            newStr += str.substr(i, 3);
	            i += 3;
	        }
	    }
	    return newStr;
	}
	function _normalizeComponentEncoding(components, protocol) {
	    function decodeUnreserved(str) {
	        var decStr = pctDecChars(str);
	        return !decStr.match(protocol.UNRESERVED) ? str : decStr;
	    }
	    if (components.scheme) components.scheme = String(components.scheme).replace(protocol.PCT_ENCODED, decodeUnreserved).toLowerCase().replace(protocol.NOT_SCHEME, "");
	    if (components.userinfo !== undefined) components.userinfo = String(components.userinfo).replace(protocol.PCT_ENCODED, decodeUnreserved).replace(protocol.NOT_USERINFO, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
	    if (components.host !== undefined) components.host = String(components.host).replace(protocol.PCT_ENCODED, decodeUnreserved).toLowerCase().replace(protocol.NOT_HOST, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
	    if (components.path !== undefined) components.path = String(components.path).replace(protocol.PCT_ENCODED, decodeUnreserved).replace(components.scheme ? protocol.NOT_PATH : protocol.NOT_PATH_NOSCHEME, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
	    if (components.query !== undefined) components.query = String(components.query).replace(protocol.PCT_ENCODED, decodeUnreserved).replace(protocol.NOT_QUERY, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
	    if (components.fragment !== undefined) components.fragment = String(components.fragment).replace(protocol.PCT_ENCODED, decodeUnreserved).replace(protocol.NOT_FRAGMENT, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
	    return components;
	}

	function _stripLeadingZeros(str) {
	    return str.replace(/^0*(.*)/, "$1") || "0";
	}
	function _normalizeIPv4(host, protocol) {
	    var matches = host.match(protocol.IPV4ADDRESS) || [];

	    var _matches = slicedToArray(matches, 2),
	        address = _matches[1];

	    if (address) {
	        return address.split(".").map(_stripLeadingZeros).join(".");
	    } else {
	        return host;
	    }
	}
	function _normalizeIPv6(host, protocol) {
	    var matches = host.match(protocol.IPV6ADDRESS) || [];

	    var _matches2 = slicedToArray(matches, 3),
	        address = _matches2[1],
	        zone = _matches2[2];

	    if (address) {
	        var _address$toLowerCase$ = address.toLowerCase().split('::').reverse(),
	            _address$toLowerCase$2 = slicedToArray(_address$toLowerCase$, 2),
	            last = _address$toLowerCase$2[0],
	            first = _address$toLowerCase$2[1];

	        var firstFields = first ? first.split(":").map(_stripLeadingZeros) : [];
	        var lastFields = last.split(":").map(_stripLeadingZeros);
	        var isLastFieldIPv4Address = protocol.IPV4ADDRESS.test(lastFields[lastFields.length - 1]);
	        var fieldCount = isLastFieldIPv4Address ? 7 : 8;
	        var lastFieldsStart = lastFields.length - fieldCount;
	        var fields = Array(fieldCount);
	        for (var x = 0; x < fieldCount; ++x) {
	            fields[x] = firstFields[x] || lastFields[lastFieldsStart + x] || '';
	        }
	        if (isLastFieldIPv4Address) {
	            fields[fieldCount - 1] = _normalizeIPv4(fields[fieldCount - 1], protocol);
	        }
	        var allZeroFields = fields.reduce(function (acc, field, index) {
	            if (!field || field === "0") {
	                var lastLongest = acc[acc.length - 1];
	                if (lastLongest && lastLongest.index + lastLongest.length === index) {
	                    lastLongest.length++;
	                } else {
	                    acc.push({ index: index, length: 1 });
	                }
	            }
	            return acc;
	        }, []);
	        var longestZeroFields = allZeroFields.sort(function (a, b) {
	            return b.length - a.length;
	        })[0];
	        var newHost = void 0;
	        if (longestZeroFields && longestZeroFields.length > 1) {
	            var newFirst = fields.slice(0, longestZeroFields.index);
	            var newLast = fields.slice(longestZeroFields.index + longestZeroFields.length);
	            newHost = newFirst.join(":") + "::" + newLast.join(":");
	        } else {
	            newHost = fields.join(":");
	        }
	        if (zone) {
	            newHost += "%" + zone;
	        }
	        return newHost;
	    } else {
	        return host;
	    }
	}
	var URI_PARSE = /^(?:([^:\/?#]+):)?(?:\/\/((?:([^\/?#@]*)@)?(\[[^\/?#\]]+\]|[^\/?#:]*)(?:\:(\d*))?))?([^?#]*)(?:\?([^#]*))?(?:#((?:.|\n|\r)*))?/i;
	var NO_MATCH_IS_UNDEFINED = "".match(/(){0}/)[1] === undefined;
	function parse(uriString) {
	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	    var components = {};
	    var protocol = options.iri !== false ? IRI_PROTOCOL : URI_PROTOCOL;
	    if (options.reference === "suffix") uriString = (options.scheme ? options.scheme + ":" : "") + "//" + uriString;
	    var matches = uriString.match(URI_PARSE);
	    if (matches) {
	        if (NO_MATCH_IS_UNDEFINED) {
	            //store each component
	            components.scheme = matches[1];
	            components.userinfo = matches[3];
	            components.host = matches[4];
	            components.port = parseInt(matches[5], 10);
	            components.path = matches[6] || "";
	            components.query = matches[7];
	            components.fragment = matches[8];
	            //fix port number
	            if (isNaN(components.port)) {
	                components.port = matches[5];
	            }
	        } else {
	            //IE FIX for improper RegExp matching
	            //store each component
	            components.scheme = matches[1] || undefined;
	            components.userinfo = uriString.indexOf("@") !== -1 ? matches[3] : undefined;
	            components.host = uriString.indexOf("//") !== -1 ? matches[4] : undefined;
	            components.port = parseInt(matches[5], 10);
	            components.path = matches[6] || "";
	            components.query = uriString.indexOf("?") !== -1 ? matches[7] : undefined;
	            components.fragment = uriString.indexOf("#") !== -1 ? matches[8] : undefined;
	            //fix port number
	            if (isNaN(components.port)) {
	                components.port = uriString.match(/\/\/(?:.|\n)*\:(?:\/|\?|\#|$)/) ? matches[4] : undefined;
	            }
	        }
	        if (components.host) {
	            //normalize IP hosts
	            components.host = _normalizeIPv6(_normalizeIPv4(components.host, protocol), protocol);
	        }
	        //determine reference type
	        if (components.scheme === undefined && components.userinfo === undefined && components.host === undefined && components.port === undefined && !components.path && components.query === undefined) {
	            components.reference = "same-document";
	        } else if (components.scheme === undefined) {
	            components.reference = "relative";
	        } else if (components.fragment === undefined) {
	            components.reference = "absolute";
	        } else {
	            components.reference = "uri";
	        }
	        //check for reference errors
	        if (options.reference && options.reference !== "suffix" && options.reference !== components.reference) {
	            components.error = components.error || "URI is not a " + options.reference + " reference.";
	        }
	        //find scheme handler
	        var schemeHandler = SCHEMES[(options.scheme || components.scheme || "").toLowerCase()];
	        //check if scheme can't handle IRIs
	        if (!options.unicodeSupport && (!schemeHandler || !schemeHandler.unicodeSupport)) {
	            //if host component is a domain name
	            if (components.host && (options.domainHost || schemeHandler && schemeHandler.domainHost)) {
	                //convert Unicode IDN -> ASCII IDN
	                try {
	                    components.host = punycode.toASCII(components.host.replace(protocol.PCT_ENCODED, pctDecChars).toLowerCase());
	                } catch (e) {
	                    components.error = components.error || "Host's domain name can not be converted to ASCII via punycode: " + e;
	                }
	            }
	            //convert IRI -> URI
	            _normalizeComponentEncoding(components, URI_PROTOCOL);
	        } else {
	            //normalize encodings
	            _normalizeComponentEncoding(components, protocol);
	        }
	        //perform scheme specific parsing
	        if (schemeHandler && schemeHandler.parse) {
	            schemeHandler.parse(components, options);
	        }
	    } else {
	        components.error = components.error || "URI can not be parsed.";
	    }
	    return components;
	}

	function _recomposeAuthority(components, options) {
	    var protocol = options.iri !== false ? IRI_PROTOCOL : URI_PROTOCOL;
	    var uriTokens = [];
	    if (components.userinfo !== undefined) {
	        uriTokens.push(components.userinfo);
	        uriTokens.push("@");
	    }
	    if (components.host !== undefined) {
	        //normalize IP hosts, add brackets and escape zone separator for IPv6
	        uriTokens.push(_normalizeIPv6(_normalizeIPv4(String(components.host), protocol), protocol).replace(protocol.IPV6ADDRESS, function (_, $1, $2) {
	            return "[" + $1 + ($2 ? "%25" + $2 : "") + "]";
	        }));
	    }
	    if (typeof components.port === "number" || typeof components.port === "string") {
	        uriTokens.push(":");
	        uriTokens.push(String(components.port));
	    }
	    return uriTokens.length ? uriTokens.join("") : undefined;
	}

	var RDS1 = /^\.\.?\//;
	var RDS2 = /^\/\.(\/|$)/;
	var RDS3 = /^\/\.\.(\/|$)/;
	var RDS5 = /^\/?(?:.|\n)*?(?=\/|$)/;
	function removeDotSegments(input) {
	    var output = [];
	    while (input.length) {
	        if (input.match(RDS1)) {
	            input = input.replace(RDS1, "");
	        } else if (input.match(RDS2)) {
	            input = input.replace(RDS2, "/");
	        } else if (input.match(RDS3)) {
	            input = input.replace(RDS3, "/");
	            output.pop();
	        } else if (input === "." || input === "..") {
	            input = "";
	        } else {
	            var im = input.match(RDS5);
	            if (im) {
	                var s = im[0];
	                input = input.slice(s.length);
	                output.push(s);
	            } else {
	                throw new Error("Unexpected dot segment condition");
	            }
	        }
	    }
	    return output.join("");
	}

	function serialize(components) {
	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	    var protocol = options.iri ? IRI_PROTOCOL : URI_PROTOCOL;
	    var uriTokens = [];
	    //find scheme handler
	    var schemeHandler = SCHEMES[(options.scheme || components.scheme || "").toLowerCase()];
	    //perform scheme specific serialization
	    if (schemeHandler && schemeHandler.serialize) schemeHandler.serialize(components, options);
	    if (components.host) {
	        //if host component is an IPv6 address
	        if (protocol.IPV6ADDRESS.test(components.host)) ;
	        //TODO: normalize IPv6 address as per RFC 5952

	        //if host component is a domain name
	        else if (options.domainHost || schemeHandler && schemeHandler.domainHost) {
	                //convert IDN via punycode
	                try {
	                    components.host = !options.iri ? punycode.toASCII(components.host.replace(protocol.PCT_ENCODED, pctDecChars).toLowerCase()) : punycode.toUnicode(components.host);
	                } catch (e) {
	                    components.error = components.error || "Host's domain name can not be converted to " + (!options.iri ? "ASCII" : "Unicode") + " via punycode: " + e;
	                }
	            }
	    }
	    //normalize encoding
	    _normalizeComponentEncoding(components, protocol);
	    if (options.reference !== "suffix" && components.scheme) {
	        uriTokens.push(components.scheme);
	        uriTokens.push(":");
	    }
	    var authority = _recomposeAuthority(components, options);
	    if (authority !== undefined) {
	        if (options.reference !== "suffix") {
	            uriTokens.push("//");
	        }
	        uriTokens.push(authority);
	        if (components.path && components.path.charAt(0) !== "/") {
	            uriTokens.push("/");
	        }
	    }
	    if (components.path !== undefined) {
	        var s = components.path;
	        if (!options.absolutePath && (!schemeHandler || !schemeHandler.absolutePath)) {
	            s = removeDotSegments(s);
	        }
	        if (authority === undefined) {
	            s = s.replace(/^\/\//, "/%2F"); //don't allow the path to start with "//"
	        }
	        uriTokens.push(s);
	    }
	    if (components.query !== undefined) {
	        uriTokens.push("?");
	        uriTokens.push(components.query);
	    }
	    if (components.fragment !== undefined) {
	        uriTokens.push("#");
	        uriTokens.push(components.fragment);
	    }
	    return uriTokens.join(""); //merge tokens into a string
	}

	function resolveComponents(base, relative) {
	    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	    var skipNormalization = arguments[3];

	    var target = {};
	    if (!skipNormalization) {
	        base = parse(serialize(base, options), options); //normalize base components
	        relative = parse(serialize(relative, options), options); //normalize relative components
	    }
	    options = options || {};
	    if (!options.tolerant && relative.scheme) {
	        target.scheme = relative.scheme;
	        //target.authority = relative.authority;
	        target.userinfo = relative.userinfo;
	        target.host = relative.host;
	        target.port = relative.port;
	        target.path = removeDotSegments(relative.path || "");
	        target.query = relative.query;
	    } else {
	        if (relative.userinfo !== undefined || relative.host !== undefined || relative.port !== undefined) {
	            //target.authority = relative.authority;
	            target.userinfo = relative.userinfo;
	            target.host = relative.host;
	            target.port = relative.port;
	            target.path = removeDotSegments(relative.path || "");
	            target.query = relative.query;
	        } else {
	            if (!relative.path) {
	                target.path = base.path;
	                if (relative.query !== undefined) {
	                    target.query = relative.query;
	                } else {
	                    target.query = base.query;
	                }
	            } else {
	                if (relative.path.charAt(0) === "/") {
	                    target.path = removeDotSegments(relative.path);
	                } else {
	                    if ((base.userinfo !== undefined || base.host !== undefined || base.port !== undefined) && !base.path) {
	                        target.path = "/" + relative.path;
	                    } else if (!base.path) {
	                        target.path = relative.path;
	                    } else {
	                        target.path = base.path.slice(0, base.path.lastIndexOf("/") + 1) + relative.path;
	                    }
	                    target.path = removeDotSegments(target.path);
	                }
	                target.query = relative.query;
	            }
	            //target.authority = base.authority;
	            target.userinfo = base.userinfo;
	            target.host = base.host;
	            target.port = base.port;
	        }
	        target.scheme = base.scheme;
	    }
	    target.fragment = relative.fragment;
	    return target;
	}

	function resolve(baseURI, relativeURI, options) {
	    var schemelessOptions = assign({ scheme: 'null' }, options);
	    return serialize(resolveComponents(parse(baseURI, schemelessOptions), parse(relativeURI, schemelessOptions), schemelessOptions, true), schemelessOptions);
	}

	function normalize(uri, options) {
	    if (typeof uri === "string") {
	        uri = serialize(parse(uri, options), options);
	    } else if (typeOf(uri) === "object") {
	        uri = parse(serialize(uri, options), options);
	    }
	    return uri;
	}

	function equal(uriA, uriB, options) {
	    if (typeof uriA === "string") {
	        uriA = serialize(parse(uriA, options), options);
	    } else if (typeOf(uriA) === "object") {
	        uriA = serialize(uriA, options);
	    }
	    if (typeof uriB === "string") {
	        uriB = serialize(parse(uriB, options), options);
	    } else if (typeOf(uriB) === "object") {
	        uriB = serialize(uriB, options);
	    }
	    return uriA === uriB;
	}

	function escapeComponent(str, options) {
	    return str && str.toString().replace(!options || !options.iri ? URI_PROTOCOL.ESCAPE : IRI_PROTOCOL.ESCAPE, pctEncChar);
	}

	function unescapeComponent(str, options) {
	    return str && str.toString().replace(!options || !options.iri ? URI_PROTOCOL.PCT_ENCODED : IRI_PROTOCOL.PCT_ENCODED, pctDecChars);
	}

	var handler = {
	    scheme: "http",
	    domainHost: true,
	    parse: function parse(components, options) {
	        //report missing host
	        if (!components.host) {
	            components.error = components.error || "HTTP URIs must have a host.";
	        }
	        return components;
	    },
	    serialize: function serialize(components, options) {
	        var secure = String(components.scheme).toLowerCase() === "https";
	        //normalize the default port
	        if (components.port === (secure ? 443 : 80) || components.port === "") {
	            components.port = undefined;
	        }
	        //normalize the empty path
	        if (!components.path) {
	            components.path = "/";
	        }
	        //NOTE: We do not parse query strings for HTTP URIs
	        //as WWW Form Url Encoded query strings are part of the HTML4+ spec,
	        //and not the HTTP spec.
	        return components;
	    }
	};

	var handler$1 = {
	    scheme: "https",
	    domainHost: handler.domainHost,
	    parse: handler.parse,
	    serialize: handler.serialize
	};

	function isSecure(wsComponents) {
	    return typeof wsComponents.secure === 'boolean' ? wsComponents.secure : String(wsComponents.scheme).toLowerCase() === "wss";
	}
	//RFC 6455
	var handler$2 = {
	    scheme: "ws",
	    domainHost: true,
	    parse: function parse(components, options) {
	        var wsComponents = components;
	        //indicate if the secure flag is set
	        wsComponents.secure = isSecure(wsComponents);
	        //construct resouce name
	        wsComponents.resourceName = (wsComponents.path || '/') + (wsComponents.query ? '?' + wsComponents.query : '');
	        wsComponents.path = undefined;
	        wsComponents.query = undefined;
	        return wsComponents;
	    },
	    serialize: function serialize(wsComponents, options) {
	        //normalize the default port
	        if (wsComponents.port === (isSecure(wsComponents) ? 443 : 80) || wsComponents.port === "") {
	            wsComponents.port = undefined;
	        }
	        //ensure scheme matches secure flag
	        if (typeof wsComponents.secure === 'boolean') {
	            wsComponents.scheme = wsComponents.secure ? 'wss' : 'ws';
	            wsComponents.secure = undefined;
	        }
	        //reconstruct path from resource name
	        if (wsComponents.resourceName) {
	            var _wsComponents$resourc = wsComponents.resourceName.split('?'),
	                _wsComponents$resourc2 = slicedToArray(_wsComponents$resourc, 2),
	                path = _wsComponents$resourc2[0],
	                query = _wsComponents$resourc2[1];

	            wsComponents.path = path && path !== '/' ? path : undefined;
	            wsComponents.query = query;
	            wsComponents.resourceName = undefined;
	        }
	        //forbid fragment component
	        wsComponents.fragment = undefined;
	        return wsComponents;
	    }
	};

	var handler$3 = {
	    scheme: "wss",
	    domainHost: handler$2.domainHost,
	    parse: handler$2.parse,
	    serialize: handler$2.serialize
	};

	var O = {};
	//RFC 3986
	var UNRESERVED$$ = "[A-Za-z0-9\\-\\.\\_\\~" + ("\\xA0-\\u200D\\u2010-\\u2029\\u202F-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF" ) + "]";
	var HEXDIG$$ = "[0-9A-Fa-f]"; //case-insensitive
	var PCT_ENCODED$ = subexp(subexp("%[EFef]" + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$) + "|" + subexp("%[89A-Fa-f]" + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$) + "|" + subexp("%" + HEXDIG$$ + HEXDIG$$)); //expanded
	//RFC 5322, except these symbols as per RFC 6068: @ : / ? # [ ] & ; =
	//const ATEXT$$ = "[A-Za-z0-9\\!\\#\\$\\%\\&\\'\\*\\+\\-\\/\\=\\?\\^\\_\\`\\{\\|\\}\\~]";
	//const WSP$$ = "[\\x20\\x09]";
	//const OBS_QTEXT$$ = "[\\x01-\\x08\\x0B\\x0C\\x0E-\\x1F\\x7F]";  //(%d1-8 / %d11-12 / %d14-31 / %d127)
	//const QTEXT$$ = merge("[\\x21\\x23-\\x5B\\x5D-\\x7E]", OBS_QTEXT$$);  //%d33 / %d35-91 / %d93-126 / obs-qtext
	//const VCHAR$$ = "[\\x21-\\x7E]";
	//const WSP$$ = "[\\x20\\x09]";
	//const OBS_QP$ = subexp("\\\\" + merge("[\\x00\\x0D\\x0A]", OBS_QTEXT$$));  //%d0 / CR / LF / obs-qtext
	//const FWS$ = subexp(subexp(WSP$$ + "*" + "\\x0D\\x0A") + "?" + WSP$$ + "+");
	//const QUOTED_PAIR$ = subexp(subexp("\\\\" + subexp(VCHAR$$ + "|" + WSP$$)) + "|" + OBS_QP$);
	//const QUOTED_STRING$ = subexp('\\"' + subexp(FWS$ + "?" + QCONTENT$) + "*" + FWS$ + "?" + '\\"');
	var ATEXT$$ = "[A-Za-z0-9\\!\\$\\%\\'\\*\\+\\-\\^\\_\\`\\{\\|\\}\\~]";
	var QTEXT$$ = "[\\!\\$\\%\\'\\(\\)\\*\\+\\,\\-\\.0-9\\<\\>A-Z\\x5E-\\x7E]";
	var VCHAR$$ = merge(QTEXT$$, "[\\\"\\\\]");
	var SOME_DELIMS$$ = "[\\!\\$\\'\\(\\)\\*\\+\\,\\;\\:\\@]";
	var UNRESERVED = new RegExp(UNRESERVED$$, "g");
	var PCT_ENCODED = new RegExp(PCT_ENCODED$, "g");
	var NOT_LOCAL_PART = new RegExp(merge("[^]", ATEXT$$, "[\\.]", '[\\"]', VCHAR$$), "g");
	var NOT_HFNAME = new RegExp(merge("[^]", UNRESERVED$$, SOME_DELIMS$$), "g");
	var NOT_HFVALUE = NOT_HFNAME;
	function decodeUnreserved(str) {
	    var decStr = pctDecChars(str);
	    return !decStr.match(UNRESERVED) ? str : decStr;
	}
	var handler$4 = {
	    scheme: "mailto",
	    parse: function parse$$1(components, options) {
	        var mailtoComponents = components;
	        var to = mailtoComponents.to = mailtoComponents.path ? mailtoComponents.path.split(",") : [];
	        mailtoComponents.path = undefined;
	        if (mailtoComponents.query) {
	            var unknownHeaders = false;
	            var headers = {};
	            var hfields = mailtoComponents.query.split("&");
	            for (var x = 0, xl = hfields.length; x < xl; ++x) {
	                var hfield = hfields[x].split("=");
	                switch (hfield[0]) {
	                    case "to":
	                        var toAddrs = hfield[1].split(",");
	                        for (var _x = 0, _xl = toAddrs.length; _x < _xl; ++_x) {
	                            to.push(toAddrs[_x]);
	                        }
	                        break;
	                    case "subject":
	                        mailtoComponents.subject = unescapeComponent(hfield[1], options);
	                        break;
	                    case "body":
	                        mailtoComponents.body = unescapeComponent(hfield[1], options);
	                        break;
	                    default:
	                        unknownHeaders = true;
	                        headers[unescapeComponent(hfield[0], options)] = unescapeComponent(hfield[1], options);
	                        break;
	                }
	            }
	            if (unknownHeaders) mailtoComponents.headers = headers;
	        }
	        mailtoComponents.query = undefined;
	        for (var _x2 = 0, _xl2 = to.length; _x2 < _xl2; ++_x2) {
	            var addr = to[_x2].split("@");
	            addr[0] = unescapeComponent(addr[0]);
	            if (!options.unicodeSupport) {
	                //convert Unicode IDN -> ASCII IDN
	                try {
	                    addr[1] = punycode.toASCII(unescapeComponent(addr[1], options).toLowerCase());
	                } catch (e) {
	                    mailtoComponents.error = mailtoComponents.error || "Email address's domain name can not be converted to ASCII via punycode: " + e;
	                }
	            } else {
	                addr[1] = unescapeComponent(addr[1], options).toLowerCase();
	            }
	            to[_x2] = addr.join("@");
	        }
	        return mailtoComponents;
	    },
	    serialize: function serialize$$1(mailtoComponents, options) {
	        var components = mailtoComponents;
	        var to = toArray(mailtoComponents.to);
	        if (to) {
	            for (var x = 0, xl = to.length; x < xl; ++x) {
	                var toAddr = String(to[x]);
	                var atIdx = toAddr.lastIndexOf("@");
	                var localPart = toAddr.slice(0, atIdx).replace(PCT_ENCODED, decodeUnreserved).replace(PCT_ENCODED, toUpperCase).replace(NOT_LOCAL_PART, pctEncChar);
	                var domain = toAddr.slice(atIdx + 1);
	                //convert IDN via punycode
	                try {
	                    domain = !options.iri ? punycode.toASCII(unescapeComponent(domain, options).toLowerCase()) : punycode.toUnicode(domain);
	                } catch (e) {
	                    components.error = components.error || "Email address's domain name can not be converted to " + (!options.iri ? "ASCII" : "Unicode") + " via punycode: " + e;
	                }
	                to[x] = localPart + "@" + domain;
	            }
	            components.path = to.join(",");
	        }
	        var headers = mailtoComponents.headers = mailtoComponents.headers || {};
	        if (mailtoComponents.subject) headers["subject"] = mailtoComponents.subject;
	        if (mailtoComponents.body) headers["body"] = mailtoComponents.body;
	        var fields = [];
	        for (var name in headers) {
	            if (headers[name] !== O[name]) {
	                fields.push(name.replace(PCT_ENCODED, decodeUnreserved).replace(PCT_ENCODED, toUpperCase).replace(NOT_HFNAME, pctEncChar) + "=" + headers[name].replace(PCT_ENCODED, decodeUnreserved).replace(PCT_ENCODED, toUpperCase).replace(NOT_HFVALUE, pctEncChar));
	            }
	        }
	        if (fields.length) {
	            components.query = fields.join("&");
	        }
	        return components;
	    }
	};

	var URN_PARSE = /^([^\:]+)\:(.*)/;
	//RFC 2141
	var handler$5 = {
	    scheme: "urn",
	    parse: function parse$$1(components, options) {
	        var matches = components.path && components.path.match(URN_PARSE);
	        var urnComponents = components;
	        if (matches) {
	            var scheme = options.scheme || urnComponents.scheme || "urn";
	            var nid = matches[1].toLowerCase();
	            var nss = matches[2];
	            var urnScheme = scheme + ":" + (options.nid || nid);
	            var schemeHandler = SCHEMES[urnScheme];
	            urnComponents.nid = nid;
	            urnComponents.nss = nss;
	            urnComponents.path = undefined;
	            if (schemeHandler) {
	                urnComponents = schemeHandler.parse(urnComponents, options);
	            }
	        } else {
	            urnComponents.error = urnComponents.error || "URN can not be parsed.";
	        }
	        return urnComponents;
	    },
	    serialize: function serialize$$1(urnComponents, options) {
	        var scheme = options.scheme || urnComponents.scheme || "urn";
	        var nid = urnComponents.nid;
	        var urnScheme = scheme + ":" + (options.nid || nid);
	        var schemeHandler = SCHEMES[urnScheme];
	        if (schemeHandler) {
	            urnComponents = schemeHandler.serialize(urnComponents, options);
	        }
	        var uriComponents = urnComponents;
	        var nss = urnComponents.nss;
	        uriComponents.path = (nid || options.nid) + ":" + nss;
	        return uriComponents;
	    }
	};

	var UUID = /^[0-9A-Fa-f]{8}(?:\-[0-9A-Fa-f]{4}){3}\-[0-9A-Fa-f]{12}$/;
	//RFC 4122
	var handler$6 = {
	    scheme: "urn:uuid",
	    parse: function parse(urnComponents, options) {
	        var uuidComponents = urnComponents;
	        uuidComponents.uuid = uuidComponents.nss;
	        uuidComponents.nss = undefined;
	        if (!options.tolerant && (!uuidComponents.uuid || !uuidComponents.uuid.match(UUID))) {
	            uuidComponents.error = uuidComponents.error || "UUID is not valid.";
	        }
	        return uuidComponents;
	    },
	    serialize: function serialize(uuidComponents, options) {
	        var urnComponents = uuidComponents;
	        //normalize UUID
	        urnComponents.nss = (uuidComponents.uuid || "").toLowerCase();
	        return urnComponents;
	    }
	};

	SCHEMES[handler.scheme] = handler;
	SCHEMES[handler$1.scheme] = handler$1;
	SCHEMES[handler$2.scheme] = handler$2;
	SCHEMES[handler$3.scheme] = handler$3;
	SCHEMES[handler$4.scheme] = handler$4;
	SCHEMES[handler$5.scheme] = handler$5;
	SCHEMES[handler$6.scheme] = handler$6;

	exports.SCHEMES = SCHEMES;
	exports.pctEncChar = pctEncChar;
	exports.pctDecChars = pctDecChars;
	exports.parse = parse;
	exports.removeDotSegments = removeDotSegments;
	exports.serialize = serialize;
	exports.resolveComponents = resolveComponents;
	exports.resolve = resolve;
	exports.normalize = normalize;
	exports.equal = equal;
	exports.escapeComponent = escapeComponent;
	exports.unescapeComponent = unescapeComponent;

	Object.defineProperty(exports, '__esModule', { value: true });

	})));
	//# sourceMappingURL=uri.all.js.map
	});

	// do not edit .js files directly - edit src/index.jst



	var fastDeepEqual = function equal(a, b) {
	  if (a === b) return true;

	  if (a && b && typeof a == 'object' && typeof b == 'object') {
	    if (a.constructor !== b.constructor) return false;

	    var length, i, keys;
	    if (Array.isArray(a)) {
	      length = a.length;
	      if (length != b.length) return false;
	      for (i = length; i-- !== 0;)
	        if (!equal(a[i], b[i])) return false;
	      return true;
	    }



	    if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
	    if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
	    if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();

	    keys = Object.keys(a);
	    length = keys.length;
	    if (length !== Object.keys(b).length) return false;

	    for (i = length; i-- !== 0;)
	      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;

	    for (i = length; i-- !== 0;) {
	      var key = keys[i];

	      if (!equal(a[key], b[key])) return false;
	    }

	    return true;
	  }

	  // true if both NaN, false otherwise
	  return a!==a && b!==b;
	};

	// https://mathiasbynens.be/notes/javascript-encoding
	// https://github.com/bestiejs/punycode.js - punycode.ucs2.decode
	var ucs2length$1 = function ucs2length(str) {
	  var length = 0
	    , len = str.length
	    , pos = 0
	    , value;
	  while (pos < len) {
	    length++;
	    value = str.charCodeAt(pos++);
	    if (value >= 0xD800 && value <= 0xDBFF && pos < len) {
	      // high surrogate, and there is a next character
	      value = str.charCodeAt(pos);
	      if ((value & 0xFC00) == 0xDC00) pos++; // low surrogate
	    }
	  }
	  return length;
	};

	var util = {
	  copy: copy,
	  checkDataType: checkDataType,
	  checkDataTypes: checkDataTypes,
	  coerceToTypes: coerceToTypes,
	  toHash: toHash$1,
	  getProperty: getProperty,
	  escapeQuotes: escapeQuotes,
	  equal: fastDeepEqual,
	  ucs2length: ucs2length$1,
	  varOccurences: varOccurences,
	  varReplace: varReplace,
	  schemaHasRules: schemaHasRules,
	  schemaHasRulesExcept: schemaHasRulesExcept,
	  schemaUnknownRules: schemaUnknownRules,
	  toQuotedString: toQuotedString,
	  getPathExpr: getPathExpr,
	  getPath: getPath,
	  getData: getData,
	  unescapeFragment: unescapeFragment,
	  unescapeJsonPointer: unescapeJsonPointer,
	  escapeFragment: escapeFragment,
	  escapeJsonPointer: escapeJsonPointer
	};


	function copy(o, to) {
	  to = to || {};
	  for (var key in o) to[key] = o[key];
	  return to;
	}


	function checkDataType(dataType, data, strictNumbers, negate) {
	  var EQUAL = negate ? ' !== ' : ' === '
	    , AND = negate ? ' || ' : ' && '
	    , OK = negate ? '!' : ''
	    , NOT = negate ? '' : '!';
	  switch (dataType) {
	    case 'null': return data + EQUAL + 'null';
	    case 'array': return OK + 'Array.isArray(' + data + ')';
	    case 'object': return '(' + OK + data + AND +
	                          'typeof ' + data + EQUAL + '"object"' + AND +
	                          NOT + 'Array.isArray(' + data + '))';
	    case 'integer': return '(typeof ' + data + EQUAL + '"number"' + AND +
	                           NOT + '(' + data + ' % 1)' +
	                           AND + data + EQUAL + data +
	                           (strictNumbers ? (AND + OK + 'isFinite(' + data + ')') : '') + ')';
	    case 'number': return '(typeof ' + data + EQUAL + '"' + dataType + '"' +
	                          (strictNumbers ? (AND + OK + 'isFinite(' + data + ')') : '') + ')';
	    default: return 'typeof ' + data + EQUAL + '"' + dataType + '"';
	  }
	}


	function checkDataTypes(dataTypes, data, strictNumbers) {
	  switch (dataTypes.length) {
	    case 1: return checkDataType(dataTypes[0], data, strictNumbers, true);
	    default:
	      var code = '';
	      var types = toHash$1(dataTypes);
	      if (types.array && types.object) {
	        code = types.null ? '(': '(!' + data + ' || ';
	        code += 'typeof ' + data + ' !== "object")';
	        delete types.null;
	        delete types.array;
	        delete types.object;
	      }
	      if (types.number) delete types.integer;
	      for (var t in types)
	        code += (code ? ' && ' : '' ) + checkDataType(t, data, strictNumbers, true);

	      return code;
	  }
	}


	var COERCE_TO_TYPES = toHash$1([ 'string', 'number', 'integer', 'boolean', 'null' ]);
	function coerceToTypes(optionCoerceTypes, dataTypes) {
	  if (Array.isArray(dataTypes)) {
	    var types = [];
	    for (var i=0; i<dataTypes.length; i++) {
	      var t = dataTypes[i];
	      if (COERCE_TO_TYPES[t]) types[types.length] = t;
	      else if (optionCoerceTypes === 'array' && t === 'array') types[types.length] = t;
	    }
	    if (types.length) return types;
	  } else if (COERCE_TO_TYPES[dataTypes]) {
	    return [dataTypes];
	  } else if (optionCoerceTypes === 'array' && dataTypes === 'array') {
	    return ['array'];
	  }
	}


	function toHash$1(arr) {
	  var hash = {};
	  for (var i=0; i<arr.length; i++) hash[arr[i]] = true;
	  return hash;
	}


	var IDENTIFIER$1 = /^[a-z$_][a-z$_0-9]*$/i;
	var SINGLE_QUOTE = /'|\\/g;
	function getProperty(key) {
	  return typeof key == 'number'
	          ? '[' + key + ']'
	          : IDENTIFIER$1.test(key)
	            ? '.' + key
	            : "['" + escapeQuotes(key) + "']";
	}


	function escapeQuotes(str) {
	  return str.replace(SINGLE_QUOTE, '\\$&')
	            .replace(/\n/g, '\\n')
	            .replace(/\r/g, '\\r')
	            .replace(/\f/g, '\\f')
	            .replace(/\t/g, '\\t');
	}


	function varOccurences(str, dataVar) {
	  dataVar += '[^0-9]';
	  var matches = str.match(new RegExp(dataVar, 'g'));
	  return matches ? matches.length : 0;
	}


	function varReplace(str, dataVar, expr) {
	  dataVar += '([^0-9])';
	  expr = expr.replace(/\$/g, '$$$$');
	  return str.replace(new RegExp(dataVar, 'g'), expr + '$1');
	}


	function schemaHasRules(schema, rules) {
	  if (typeof schema == 'boolean') return !schema;
	  for (var key in schema) if (rules[key]) return true;
	}


	function schemaHasRulesExcept(schema, rules, exceptKeyword) {
	  if (typeof schema == 'boolean') return !schema && exceptKeyword != 'not';
	  for (var key in schema) if (key != exceptKeyword && rules[key]) return true;
	}


	function schemaUnknownRules(schema, rules) {
	  if (typeof schema == 'boolean') return;
	  for (var key in schema) if (!rules[key]) return key;
	}


	function toQuotedString(str) {
	  return '\'' + escapeQuotes(str) + '\'';
	}


	function getPathExpr(currentPath, expr, jsonPointers, isNumber) {
	  var path = jsonPointers // false by default
	              ? '\'/\' + ' + expr + (isNumber ? '' : '.replace(/~/g, \'~0\').replace(/\\//g, \'~1\')')
	              : (isNumber ? '\'[\' + ' + expr + ' + \']\'' : '\'[\\\'\' + ' + expr + ' + \'\\\']\'');
	  return joinPaths(currentPath, path);
	}


	function getPath(currentPath, prop, jsonPointers) {
	  var path = jsonPointers // false by default
	              ? toQuotedString('/' + escapeJsonPointer(prop))
	              : toQuotedString(getProperty(prop));
	  return joinPaths(currentPath, path);
	}


	var JSON_POINTER$1 = /^\/(?:[^~]|~0|~1)*$/;
	var RELATIVE_JSON_POINTER$1 = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
	function getData($data, lvl, paths) {
	  var up, jsonPointer, data, matches;
	  if ($data === '') return 'rootData';
	  if ($data[0] == '/') {
	    if (!JSON_POINTER$1.test($data)) throw new Error('Invalid JSON-pointer: ' + $data);
	    jsonPointer = $data;
	    data = 'rootData';
	  } else {
	    matches = $data.match(RELATIVE_JSON_POINTER$1);
	    if (!matches) throw new Error('Invalid JSON-pointer: ' + $data);
	    up = +matches[1];
	    jsonPointer = matches[2];
	    if (jsonPointer == '#') {
	      if (up >= lvl) throw new Error('Cannot access property/index ' + up + ' levels up, current level is ' + lvl);
	      return paths[lvl - up];
	    }

	    if (up > lvl) throw new Error('Cannot access data ' + up + ' levels up, current level is ' + lvl);
	    data = 'data' + ((lvl - up) || '');
	    if (!jsonPointer) return data;
	  }

	  var expr = data;
	  var segments = jsonPointer.split('/');
	  for (var i=0; i<segments.length; i++) {
	    var segment = segments[i];
	    if (segment) {
	      data += getProperty(unescapeJsonPointer(segment));
	      expr += ' && ' + data;
	    }
	  }
	  return expr;
	}


	function joinPaths (a, b) {
	  if (a == '""') return b;
	  return (a + ' + ' + b).replace(/([^\\])' \+ '/g, '$1');
	}


	function unescapeFragment(str) {
	  return unescapeJsonPointer(decodeURIComponent(str));
	}


	function escapeFragment(str) {
	  return encodeURIComponent(escapeJsonPointer(str));
	}


	function escapeJsonPointer(str) {
	  return str.replace(/~/g, '~0').replace(/\//g, '~1');
	}


	function unescapeJsonPointer(str) {
	  return str.replace(/~1/g, '/').replace(/~0/g, '~');
	}

	var schema_obj = SchemaObject;

	function SchemaObject(obj) {
	  util.copy(obj, this);
	}

	var jsonSchemaTraverse = createCommonjsModule(function (module) {

	var traverse = module.exports = function (schema, opts, cb) {
	  // Legacy support for v0.3.1 and earlier.
	  if (typeof opts == 'function') {
	    cb = opts;
	    opts = {};
	  }

	  cb = opts.cb || cb;
	  var pre = (typeof cb == 'function') ? cb : cb.pre || function() {};
	  var post = cb.post || function() {};

	  _traverse(opts, pre, post, schema, '', schema);
	};


	traverse.keywords = {
	  additionalItems: true,
	  items: true,
	  contains: true,
	  additionalProperties: true,
	  propertyNames: true,
	  not: true
	};

	traverse.arrayKeywords = {
	  items: true,
	  allOf: true,
	  anyOf: true,
	  oneOf: true
	};

	traverse.propsKeywords = {
	  definitions: true,
	  properties: true,
	  patternProperties: true,
	  dependencies: true
	};

	traverse.skipKeywords = {
	  default: true,
	  enum: true,
	  const: true,
	  required: true,
	  maximum: true,
	  minimum: true,
	  exclusiveMaximum: true,
	  exclusiveMinimum: true,
	  multipleOf: true,
	  maxLength: true,
	  minLength: true,
	  pattern: true,
	  format: true,
	  maxItems: true,
	  minItems: true,
	  uniqueItems: true,
	  maxProperties: true,
	  minProperties: true
	};


	function _traverse(opts, pre, post, schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex) {
	  if (schema && typeof schema == 'object' && !Array.isArray(schema)) {
	    pre(schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex);
	    for (var key in schema) {
	      var sch = schema[key];
	      if (Array.isArray(sch)) {
	        if (key in traverse.arrayKeywords) {
	          for (var i=0; i<sch.length; i++)
	            _traverse(opts, pre, post, sch[i], jsonPtr + '/' + key + '/' + i, rootSchema, jsonPtr, key, schema, i);
	        }
	      } else if (key in traverse.propsKeywords) {
	        if (sch && typeof sch == 'object') {
	          for (var prop in sch)
	            _traverse(opts, pre, post, sch[prop], jsonPtr + '/' + key + '/' + escapeJsonPtr(prop), rootSchema, jsonPtr, key, schema, prop);
	        }
	      } else if (key in traverse.keywords || (opts.allKeys && !(key in traverse.skipKeywords))) {
	        _traverse(opts, pre, post, sch, jsonPtr + '/' + key, rootSchema, jsonPtr, key, schema);
	      }
	    }
	    post(schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex);
	  }
	}


	function escapeJsonPtr(str) {
	  return str.replace(/~/g, '~0').replace(/\//g, '~1');
	}
	});

	var resolve_1 = resolve;

	resolve.normalizeId = normalizeId;
	resolve.fullPath = getFullPath;
	resolve.url = resolveUrl;
	resolve.ids = resolveIds;
	resolve.inlineRef = inlineRef;
	resolve.schema = resolveSchema;

	/**
	 * [resolve and compile the references ($ref)]
	 * @this   Ajv
	 * @param  {Function} compile reference to schema compilation funciton (localCompile)
	 * @param  {Object} root object with information about the root schema for the current schema
	 * @param  {String} ref reference to resolve
	 * @return {Object|Function} schema object (if the schema can be inlined) or validation function
	 */
	function resolve(compile, root, ref) {
	  /* jshint validthis: true */
	  var refVal = this._refs[ref];
	  if (typeof refVal == 'string') {
	    if (this._refs[refVal]) refVal = this._refs[refVal];
	    else return resolve.call(this, compile, root, refVal);
	  }

	  refVal = refVal || this._schemas[ref];
	  if (refVal instanceof schema_obj) {
	    return inlineRef(refVal.schema, this._opts.inlineRefs)
	            ? refVal.schema
	            : refVal.validate || this._compile(refVal);
	  }

	  var res = resolveSchema.call(this, root, ref);
	  var schema, v, baseId;
	  if (res) {
	    schema = res.schema;
	    root = res.root;
	    baseId = res.baseId;
	  }

	  if (schema instanceof schema_obj) {
	    v = schema.validate || compile.call(this, schema.schema, root, undefined, baseId);
	  } else if (schema !== undefined) {
	    v = inlineRef(schema, this._opts.inlineRefs)
	        ? schema
	        : compile.call(this, schema, root, undefined, baseId);
	  }

	  return v;
	}


	/**
	 * Resolve schema, its root and baseId
	 * @this Ajv
	 * @param  {Object} root root object with properties schema, refVal, refs
	 * @param  {String} ref  reference to resolve
	 * @return {Object} object with properties schema, root, baseId
	 */
	function resolveSchema(root, ref) {
	  /* jshint validthis: true */
	  var p = uri_all.parse(ref)
	    , refPath = _getFullPath(p)
	    , baseId = getFullPath(this._getId(root.schema));
	  if (Object.keys(root.schema).length === 0 || refPath !== baseId) {
	    var id = normalizeId(refPath);
	    var refVal = this._refs[id];
	    if (typeof refVal == 'string') {
	      return resolveRecursive.call(this, root, refVal, p);
	    } else if (refVal instanceof schema_obj) {
	      if (!refVal.validate) this._compile(refVal);
	      root = refVal;
	    } else {
	      refVal = this._schemas[id];
	      if (refVal instanceof schema_obj) {
	        if (!refVal.validate) this._compile(refVal);
	        if (id == normalizeId(ref))
	          return { schema: refVal, root: root, baseId: baseId };
	        root = refVal;
	      } else {
	        return;
	      }
	    }
	    if (!root.schema) return;
	    baseId = getFullPath(this._getId(root.schema));
	  }
	  return getJsonPointer.call(this, p, baseId, root.schema, root);
	}


	/* @this Ajv */
	function resolveRecursive(root, ref, parsedRef) {
	  /* jshint validthis: true */
	  var res = resolveSchema.call(this, root, ref);
	  if (res) {
	    var schema = res.schema;
	    var baseId = res.baseId;
	    root = res.root;
	    var id = this._getId(schema);
	    if (id) baseId = resolveUrl(baseId, id);
	    return getJsonPointer.call(this, parsedRef, baseId, schema, root);
	  }
	}


	var PREVENT_SCOPE_CHANGE = util.toHash(['properties', 'patternProperties', 'enum', 'dependencies', 'definitions']);
	/* @this Ajv */
	function getJsonPointer(parsedRef, baseId, schema, root) {
	  /* jshint validthis: true */
	  parsedRef.fragment = parsedRef.fragment || '';
	  if (parsedRef.fragment.slice(0,1) != '/') return;
	  var parts = parsedRef.fragment.split('/');

	  for (var i = 1; i < parts.length; i++) {
	    var part = parts[i];
	    if (part) {
	      part = util.unescapeFragment(part);
	      schema = schema[part];
	      if (schema === undefined) break;
	      var id;
	      if (!PREVENT_SCOPE_CHANGE[part]) {
	        id = this._getId(schema);
	        if (id) baseId = resolveUrl(baseId, id);
	        if (schema.$ref) {
	          var $ref = resolveUrl(baseId, schema.$ref);
	          var res = resolveSchema.call(this, root, $ref);
	          if (res) {
	            schema = res.schema;
	            root = res.root;
	            baseId = res.baseId;
	          }
	        }
	      }
	    }
	  }
	  if (schema !== undefined && schema !== root.schema)
	    return { schema: schema, root: root, baseId: baseId };
	}


	var SIMPLE_INLINED = util.toHash([
	  'type', 'format', 'pattern',
	  'maxLength', 'minLength',
	  'maxProperties', 'minProperties',
	  'maxItems', 'minItems',
	  'maximum', 'minimum',
	  'uniqueItems', 'multipleOf',
	  'required', 'enum'
	]);
	function inlineRef(schema, limit) {
	  if (limit === false) return false;
	  if (limit === undefined || limit === true) return checkNoRef(schema);
	  else if (limit) return countKeys(schema) <= limit;
	}


	function checkNoRef(schema) {
	  var item;
	  if (Array.isArray(schema)) {
	    for (var i=0; i<schema.length; i++) {
	      item = schema[i];
	      if (typeof item == 'object' && !checkNoRef(item)) return false;
	    }
	  } else {
	    for (var key in schema) {
	      if (key == '$ref') return false;
	      item = schema[key];
	      if (typeof item == 'object' && !checkNoRef(item)) return false;
	    }
	  }
	  return true;
	}


	function countKeys(schema) {
	  var count = 0, item;
	  if (Array.isArray(schema)) {
	    for (var i=0; i<schema.length; i++) {
	      item = schema[i];
	      if (typeof item == 'object') count += countKeys(item);
	      if (count == Infinity) return Infinity;
	    }
	  } else {
	    for (var key in schema) {
	      if (key == '$ref') return Infinity;
	      if (SIMPLE_INLINED[key]) {
	        count++;
	      } else {
	        item = schema[key];
	        if (typeof item == 'object') count += countKeys(item) + 1;
	        if (count == Infinity) return Infinity;
	      }
	    }
	  }
	  return count;
	}


	function getFullPath(id, normalize) {
	  if (normalize !== false) id = normalizeId(id);
	  var p = uri_all.parse(id);
	  return _getFullPath(p);
	}


	function _getFullPath(p) {
	  return uri_all.serialize(p).split('#')[0] + '#';
	}


	var TRAILING_SLASH_HASH = /#\/?$/;
	function normalizeId(id) {
	  return id ? id.replace(TRAILING_SLASH_HASH, '') : '';
	}


	function resolveUrl(baseId, id) {
	  id = normalizeId(id);
	  return uri_all.resolve(baseId, id);
	}


	/* @this Ajv */
	function resolveIds(schema) {
	  var schemaId = normalizeId(this._getId(schema));
	  var baseIds = {'': schemaId};
	  var fullPaths = {'': getFullPath(schemaId, false)};
	  var localRefs = {};
	  var self = this;

	  jsonSchemaTraverse(schema, {allKeys: true}, function(sch, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex) {
	    if (jsonPtr === '') return;
	    var id = self._getId(sch);
	    var baseId = baseIds[parentJsonPtr];
	    var fullPath = fullPaths[parentJsonPtr] + '/' + parentKeyword;
	    if (keyIndex !== undefined)
	      fullPath += '/' + (typeof keyIndex == 'number' ? keyIndex : util.escapeFragment(keyIndex));

	    if (typeof id == 'string') {
	      id = baseId = normalizeId(baseId ? uri_all.resolve(baseId, id) : id);

	      var refVal = self._refs[id];
	      if (typeof refVal == 'string') refVal = self._refs[refVal];
	      if (refVal && refVal.schema) {
	        if (!fastDeepEqual(sch, refVal.schema))
	          throw new Error('id "' + id + '" resolves to more than one schema');
	      } else if (id != normalizeId(fullPath)) {
	        if (id[0] == '#') {
	          if (localRefs[id] && !fastDeepEqual(sch, localRefs[id]))
	            throw new Error('id "' + id + '" resolves to more than one schema');
	          localRefs[id] = sch;
	        } else {
	          self._refs[id] = fullPath;
	        }
	      }
	    }
	    baseIds[jsonPtr] = baseId;
	    fullPaths[jsonPtr] = fullPath;
	  });

	  return localRefs;
	}

	var error_classes = {
	  Validation: errorSubclass(ValidationError$1),
	  MissingRef: errorSubclass(MissingRefError$1)
	};


	function ValidationError$1(errors) {
	  this.message = 'validation failed';
	  this.errors = errors;
	  this.ajv = this.validation = true;
	}


	MissingRefError$1.message = function (baseId, ref) {
	  return 'can\'t resolve reference ' + ref + ' from id ' + baseId;
	};


	function MissingRefError$1(baseId, ref, message) {
	  this.message = message || MissingRefError$1.message(baseId, ref);
	  this.missingRef = resolve_1.url(baseId, ref);
	  this.missingSchema = resolve_1.normalizeId(resolve_1.fullPath(this.missingRef));
	}


	function errorSubclass(Subclass) {
	  Subclass.prototype = Object.create(Error.prototype);
	  Subclass.prototype.constructor = Subclass;
	  return Subclass;
	}

	var fastJsonStableStringify = function (data, opts) {
	    if (!opts) opts = {};
	    if (typeof opts === 'function') opts = { cmp: opts };
	    var cycles = (typeof opts.cycles === 'boolean') ? opts.cycles : false;

	    var cmp = opts.cmp && (function (f) {
	        return function (node) {
	            return function (a, b) {
	                var aobj = { key: a, value: node[a] };
	                var bobj = { key: b, value: node[b] };
	                return f(aobj, bobj);
	            };
	        };
	    })(opts.cmp);

	    var seen = [];
	    return (function stringify (node) {
	        if (node && node.toJSON && typeof node.toJSON === 'function') {
	            node = node.toJSON();
	        }

	        if (node === undefined) return;
	        if (typeof node == 'number') return isFinite(node) ? '' + node : 'null';
	        if (typeof node !== 'object') return JSON.stringify(node);

	        var i, out;
	        if (Array.isArray(node)) {
	            out = '[';
	            for (i = 0; i < node.length; i++) {
	                if (i) out += ',';
	                out += stringify(node[i]) || 'null';
	            }
	            return out + ']';
	        }

	        if (node === null) return 'null';

	        if (seen.indexOf(node) !== -1) {
	            if (cycles) return JSON.stringify('__cycle__');
	            throw new TypeError('Converting circular structure to JSON');
	        }

	        var seenIndex = seen.push(node) - 1;
	        var keys = Object.keys(node).sort(cmp && cmp(node));
	        out = '';
	        for (i = 0; i < keys.length; i++) {
	            var key = keys[i];
	            var value = stringify(node[key]);

	            if (!value) continue;
	            if (out) out += ',';
	            out += JSON.stringify(key) + ':' + value;
	        }
	        seen.splice(seenIndex, 1);
	        return '{' + out + '}';
	    })(data);
	};

	var validate$1 = function generate_validate(it, $keyword, $ruleType) {
	  var out = '';
	  var $async = it.schema.$async === true,
	    $refKeywords = it.util.schemaHasRulesExcept(it.schema, it.RULES.all, '$ref'),
	    $id = it.self._getId(it.schema);
	  if (it.opts.strictKeywords) {
	    var $unknownKwd = it.util.schemaUnknownRules(it.schema, it.RULES.keywords);
	    if ($unknownKwd) {
	      var $keywordsMsg = 'unknown keyword: ' + $unknownKwd;
	      if (it.opts.strictKeywords === 'log') it.logger.warn($keywordsMsg);
	      else throw new Error($keywordsMsg);
	    }
	  }
	  if (it.isTop) {
	    out += ' var validate = ';
	    if ($async) {
	      it.async = true;
	      out += 'async ';
	    }
	    out += 'function(data, dataPath, parentData, parentDataProperty, rootData) { \'use strict\'; ';
	    if ($id && (it.opts.sourceCode || it.opts.processCode)) {
	      out += ' ' + ('/\*# sourceURL=' + $id + ' */') + ' ';
	    }
	  }
	  if (typeof it.schema == 'boolean' || !($refKeywords || it.schema.$ref)) {
	    var $keyword = 'false schema';
	    var $lvl = it.level;
	    var $dataLvl = it.dataLevel;
	    var $schema = it.schema[$keyword];
	    var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
	    var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
	    var $breakOnError = !it.opts.allErrors;
	    var $errorKeyword;
	    var $data = 'data' + ($dataLvl || '');
	    var $valid = 'valid' + $lvl;
	    if (it.schema === false) {
	      if (it.isTop) {
	        $breakOnError = true;
	      } else {
	        out += ' var ' + ($valid) + ' = false; ';
	      }
	      var $$outStack = $$outStack || [];
	      $$outStack.push(out);
	      out = ''; /* istanbul ignore else */
	      if (it.createErrors !== false) {
	        out += ' { keyword: \'' + ($errorKeyword || 'false schema') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: {} ';
	        if (it.opts.messages !== false) {
	          out += ' , message: \'boolean schema is false\' ';
	        }
	        if (it.opts.verbose) {
	          out += ' , schema: false , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
	        }
	        out += ' } ';
	      } else {
	        out += ' {} ';
	      }
	      var __err = out;
	      out = $$outStack.pop();
	      if (!it.compositeRule && $breakOnError) {
	        /* istanbul ignore if */
	        if (it.async) {
	          out += ' throw new ValidationError([' + (__err) + ']); ';
	        } else {
	          out += ' validate.errors = [' + (__err) + ']; return false; ';
	        }
	      } else {
	        out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
	      }
	    } else {
	      if (it.isTop) {
	        if ($async) {
	          out += ' return data; ';
	        } else {
	          out += ' validate.errors = null; return true; ';
	        }
	      } else {
	        out += ' var ' + ($valid) + ' = true; ';
	      }
	    }
	    if (it.isTop) {
	      out += ' }; return validate; ';
	    }
	    return out;
	  }
	  if (it.isTop) {
	    var $top = it.isTop,
	      $lvl = it.level = 0,
	      $dataLvl = it.dataLevel = 0,
	      $data = 'data';
	    it.rootId = it.resolve.fullPath(it.self._getId(it.root.schema));
	    it.baseId = it.baseId || it.rootId;
	    delete it.isTop;
	    it.dataPathArr = [""];
	    if (it.schema.default !== undefined && it.opts.useDefaults && it.opts.strictDefaults) {
	      var $defaultMsg = 'default is ignored in the schema root';
	      if (it.opts.strictDefaults === 'log') it.logger.warn($defaultMsg);
	      else throw new Error($defaultMsg);
	    }
	    out += ' var vErrors = null; ';
	    out += ' var errors = 0;     ';
	    out += ' if (rootData === undefined) rootData = data; ';
	  } else {
	    var $lvl = it.level,
	      $dataLvl = it.dataLevel,
	      $data = 'data' + ($dataLvl || '');
	    if ($id) it.baseId = it.resolve.url(it.baseId, $id);
	    if ($async && !it.async) throw new Error('async schema in sync schema');
	    out += ' var errs_' + ($lvl) + ' = errors;';
	  }
	  var $valid = 'valid' + $lvl,
	    $breakOnError = !it.opts.allErrors,
	    $closingBraces1 = '',
	    $closingBraces2 = '';
	  var $errorKeyword;
	  var $typeSchema = it.schema.type,
	    $typeIsArray = Array.isArray($typeSchema);
	  if ($typeSchema && it.opts.nullable && it.schema.nullable === true) {
	    if ($typeIsArray) {
	      if ($typeSchema.indexOf('null') == -1) $typeSchema = $typeSchema.concat('null');
	    } else if ($typeSchema != 'null') {
	      $typeSchema = [$typeSchema, 'null'];
	      $typeIsArray = true;
	    }
	  }
	  if ($typeIsArray && $typeSchema.length == 1) {
	    $typeSchema = $typeSchema[0];
	    $typeIsArray = false;
	  }
	  if (it.schema.$ref && $refKeywords) {
	    if (it.opts.extendRefs == 'fail') {
	      throw new Error('$ref: validation keywords used in schema at path "' + it.errSchemaPath + '" (see option extendRefs)');
	    } else if (it.opts.extendRefs !== true) {
	      $refKeywords = false;
	      it.logger.warn('$ref: keywords ignored in schema at path "' + it.errSchemaPath + '"');
	    }
	  }
	  if (it.schema.$comment && it.opts.$comment) {
	    out += ' ' + (it.RULES.all.$comment.code(it, '$comment'));
	  }
	  if ($typeSchema) {
	    if (it.opts.coerceTypes) {
	      var $coerceToTypes = it.util.coerceToTypes(it.opts.coerceTypes, $typeSchema);
	    }
	    var $rulesGroup = it.RULES.types[$typeSchema];
	    if ($coerceToTypes || $typeIsArray || $rulesGroup === true || ($rulesGroup && !$shouldUseGroup($rulesGroup))) {
	      var $schemaPath = it.schemaPath + '.type',
	        $errSchemaPath = it.errSchemaPath + '/type';
	      var $schemaPath = it.schemaPath + '.type',
	        $errSchemaPath = it.errSchemaPath + '/type',
	        $method = $typeIsArray ? 'checkDataTypes' : 'checkDataType';
	      out += ' if (' + (it.util[$method]($typeSchema, $data, it.opts.strictNumbers, true)) + ') { ';
	      if ($coerceToTypes) {
	        var $dataType = 'dataType' + $lvl,
	          $coerced = 'coerced' + $lvl;
	        out += ' var ' + ($dataType) + ' = typeof ' + ($data) + '; var ' + ($coerced) + ' = undefined; ';
	        if (it.opts.coerceTypes == 'array') {
	          out += ' if (' + ($dataType) + ' == \'object\' && Array.isArray(' + ($data) + ') && ' + ($data) + '.length == 1) { ' + ($data) + ' = ' + ($data) + '[0]; ' + ($dataType) + ' = typeof ' + ($data) + '; if (' + (it.util.checkDataType(it.schema.type, $data, it.opts.strictNumbers)) + ') ' + ($coerced) + ' = ' + ($data) + '; } ';
	        }
	        out += ' if (' + ($coerced) + ' !== undefined) ; ';
	        var arr1 = $coerceToTypes;
	        if (arr1) {
	          var $type, $i = -1,
	            l1 = arr1.length - 1;
	          while ($i < l1) {
	            $type = arr1[$i += 1];
	            if ($type == 'string') {
	              out += ' else if (' + ($dataType) + ' == \'number\' || ' + ($dataType) + ' == \'boolean\') ' + ($coerced) + ' = \'\' + ' + ($data) + '; else if (' + ($data) + ' === null) ' + ($coerced) + ' = \'\'; ';
	            } else if ($type == 'number' || $type == 'integer') {
	              out += ' else if (' + ($dataType) + ' == \'boolean\' || ' + ($data) + ' === null || (' + ($dataType) + ' == \'string\' && ' + ($data) + ' && ' + ($data) + ' == +' + ($data) + ' ';
	              if ($type == 'integer') {
	                out += ' && !(' + ($data) + ' % 1)';
	              }
	              out += ')) ' + ($coerced) + ' = +' + ($data) + '; ';
	            } else if ($type == 'boolean') {
	              out += ' else if (' + ($data) + ' === \'false\' || ' + ($data) + ' === 0 || ' + ($data) + ' === null) ' + ($coerced) + ' = false; else if (' + ($data) + ' === \'true\' || ' + ($data) + ' === 1) ' + ($coerced) + ' = true; ';
	            } else if ($type == 'null') {
	              out += ' else if (' + ($data) + ' === \'\' || ' + ($data) + ' === 0 || ' + ($data) + ' === false) ' + ($coerced) + ' = null; ';
	            } else if (it.opts.coerceTypes == 'array' && $type == 'array') {
	              out += ' else if (' + ($dataType) + ' == \'string\' || ' + ($dataType) + ' == \'number\' || ' + ($dataType) + ' == \'boolean\' || ' + ($data) + ' == null) ' + ($coerced) + ' = [' + ($data) + ']; ';
	            }
	          }
	        }
	        out += ' else {   ';
	        var $$outStack = $$outStack || [];
	        $$outStack.push(out);
	        out = ''; /* istanbul ignore else */
	        if (it.createErrors !== false) {
	          out += ' { keyword: \'' + ($errorKeyword || 'type') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { type: \'';
	          if ($typeIsArray) {
	            out += '' + ($typeSchema.join(","));
	          } else {
	            out += '' + ($typeSchema);
	          }
	          out += '\' } ';
	          if (it.opts.messages !== false) {
	            out += ' , message: \'should be ';
	            if ($typeIsArray) {
	              out += '' + ($typeSchema.join(","));
	            } else {
	              out += '' + ($typeSchema);
	            }
	            out += '\' ';
	          }
	          if (it.opts.verbose) {
	            out += ' , schema: validate.schema' + ($schemaPath) + ' , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
	          }
	          out += ' } ';
	        } else {
	          out += ' {} ';
	        }
	        var __err = out;
	        out = $$outStack.pop();
	        if (!it.compositeRule && $breakOnError) {
	          /* istanbul ignore if */
	          if (it.async) {
	            out += ' throw new ValidationError([' + (__err) + ']); ';
	          } else {
	            out += ' validate.errors = [' + (__err) + ']; return false; ';
	          }
	        } else {
	          out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
	        }
	        out += ' } if (' + ($coerced) + ' !== undefined) {  ';
	        var $parentData = $dataLvl ? 'data' + (($dataLvl - 1) || '') : 'parentData',
	          $parentDataProperty = $dataLvl ? it.dataPathArr[$dataLvl] : 'parentDataProperty';
	        out += ' ' + ($data) + ' = ' + ($coerced) + '; ';
	        if (!$dataLvl) {
	          out += 'if (' + ($parentData) + ' !== undefined)';
	        }
	        out += ' ' + ($parentData) + '[' + ($parentDataProperty) + '] = ' + ($coerced) + '; } ';
	      } else {
	        var $$outStack = $$outStack || [];
	        $$outStack.push(out);
	        out = ''; /* istanbul ignore else */
	        if (it.createErrors !== false) {
	          out += ' { keyword: \'' + ($errorKeyword || 'type') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { type: \'';
	          if ($typeIsArray) {
	            out += '' + ($typeSchema.join(","));
	          } else {
	            out += '' + ($typeSchema);
	          }
	          out += '\' } ';
	          if (it.opts.messages !== false) {
	            out += ' , message: \'should be ';
	            if ($typeIsArray) {
	              out += '' + ($typeSchema.join(","));
	            } else {
	              out += '' + ($typeSchema);
	            }
	            out += '\' ';
	          }
	          if (it.opts.verbose) {
	            out += ' , schema: validate.schema' + ($schemaPath) + ' , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
	          }
	          out += ' } ';
	        } else {
	          out += ' {} ';
	        }
	        var __err = out;
	        out = $$outStack.pop();
	        if (!it.compositeRule && $breakOnError) {
	          /* istanbul ignore if */
	          if (it.async) {
	            out += ' throw new ValidationError([' + (__err) + ']); ';
	          } else {
	            out += ' validate.errors = [' + (__err) + ']; return false; ';
	          }
	        } else {
	          out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
	        }
	      }
	      out += ' } ';
	    }
	  }
	  if (it.schema.$ref && !$refKeywords) {
	    out += ' ' + (it.RULES.all.$ref.code(it, '$ref')) + ' ';
	    if ($breakOnError) {
	      out += ' } if (errors === ';
	      if ($top) {
	        out += '0';
	      } else {
	        out += 'errs_' + ($lvl);
	      }
	      out += ') { ';
	      $closingBraces2 += '}';
	    }
	  } else {
	    var arr2 = it.RULES;
	    if (arr2) {
	      var $rulesGroup, i2 = -1,
	        l2 = arr2.length - 1;
	      while (i2 < l2) {
	        $rulesGroup = arr2[i2 += 1];
	        if ($shouldUseGroup($rulesGroup)) {
	          if ($rulesGroup.type) {
	            out += ' if (' + (it.util.checkDataType($rulesGroup.type, $data, it.opts.strictNumbers)) + ') { ';
	          }
	          if (it.opts.useDefaults) {
	            if ($rulesGroup.type == 'object' && it.schema.properties) {
	              var $schema = it.schema.properties,
	                $schemaKeys = Object.keys($schema);
	              var arr3 = $schemaKeys;
	              if (arr3) {
	                var $propertyKey, i3 = -1,
	                  l3 = arr3.length - 1;
	                while (i3 < l3) {
	                  $propertyKey = arr3[i3 += 1];
	                  var $sch = $schema[$propertyKey];
	                  if ($sch.default !== undefined) {
	                    var $passData = $data + it.util.getProperty($propertyKey);
	                    if (it.compositeRule) {
	                      if (it.opts.strictDefaults) {
	                        var $defaultMsg = 'default is ignored for: ' + $passData;
	                        if (it.opts.strictDefaults === 'log') it.logger.warn($defaultMsg);
	                        else throw new Error($defaultMsg);
	                      }
	                    } else {
	                      out += ' if (' + ($passData) + ' === undefined ';
	                      if (it.opts.useDefaults == 'empty') {
	                        out += ' || ' + ($passData) + ' === null || ' + ($passData) + ' === \'\' ';
	                      }
	                      out += ' ) ' + ($passData) + ' = ';
	                      if (it.opts.useDefaults == 'shared') {
	                        out += ' ' + (it.useDefault($sch.default)) + ' ';
	                      } else {
	                        out += ' ' + (JSON.stringify($sch.default)) + ' ';
	                      }
	                      out += '; ';
	                    }
	                  }
	                }
	              }
	            } else if ($rulesGroup.type == 'array' && Array.isArray(it.schema.items)) {
	              var arr4 = it.schema.items;
	              if (arr4) {
	                var $sch, $i = -1,
	                  l4 = arr4.length - 1;
	                while ($i < l4) {
	                  $sch = arr4[$i += 1];
	                  if ($sch.default !== undefined) {
	                    var $passData = $data + '[' + $i + ']';
	                    if (it.compositeRule) {
	                      if (it.opts.strictDefaults) {
	                        var $defaultMsg = 'default is ignored for: ' + $passData;
	                        if (it.opts.strictDefaults === 'log') it.logger.warn($defaultMsg);
	                        else throw new Error($defaultMsg);
	                      }
	                    } else {
	                      out += ' if (' + ($passData) + ' === undefined ';
	                      if (it.opts.useDefaults == 'empty') {
	                        out += ' || ' + ($passData) + ' === null || ' + ($passData) + ' === \'\' ';
	                      }
	                      out += ' ) ' + ($passData) + ' = ';
	                      if (it.opts.useDefaults == 'shared') {
	                        out += ' ' + (it.useDefault($sch.default)) + ' ';
	                      } else {
	                        out += ' ' + (JSON.stringify($sch.default)) + ' ';
	                      }
	                      out += '; ';
	                    }
	                  }
	                }
	              }
	            }
	          }
	          var arr5 = $rulesGroup.rules;
	          if (arr5) {
	            var $rule, i5 = -1,
	              l5 = arr5.length - 1;
	            while (i5 < l5) {
	              $rule = arr5[i5 += 1];
	              if ($shouldUseRule($rule)) {
	                var $code = $rule.code(it, $rule.keyword, $rulesGroup.type);
	                if ($code) {
	                  out += ' ' + ($code) + ' ';
	                  if ($breakOnError) {
	                    $closingBraces1 += '}';
	                  }
	                }
	              }
	            }
	          }
	          if ($breakOnError) {
	            out += ' ' + ($closingBraces1) + ' ';
	            $closingBraces1 = '';
	          }
	          if ($rulesGroup.type) {
	            out += ' } ';
	            if ($typeSchema && $typeSchema === $rulesGroup.type && !$coerceToTypes) {
	              out += ' else { ';
	              var $schemaPath = it.schemaPath + '.type',
	                $errSchemaPath = it.errSchemaPath + '/type';
	              var $$outStack = $$outStack || [];
	              $$outStack.push(out);
	              out = ''; /* istanbul ignore else */
	              if (it.createErrors !== false) {
	                out += ' { keyword: \'' + ($errorKeyword || 'type') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { type: \'';
	                if ($typeIsArray) {
	                  out += '' + ($typeSchema.join(","));
	                } else {
	                  out += '' + ($typeSchema);
	                }
	                out += '\' } ';
	                if (it.opts.messages !== false) {
	                  out += ' , message: \'should be ';
	                  if ($typeIsArray) {
	                    out += '' + ($typeSchema.join(","));
	                  } else {
	                    out += '' + ($typeSchema);
	                  }
	                  out += '\' ';
	                }
	                if (it.opts.verbose) {
	                  out += ' , schema: validate.schema' + ($schemaPath) + ' , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
	                }
	                out += ' } ';
	              } else {
	                out += ' {} ';
	              }
	              var __err = out;
	              out = $$outStack.pop();
	              if (!it.compositeRule && $breakOnError) {
	                /* istanbul ignore if */
	                if (it.async) {
	                  out += ' throw new ValidationError([' + (__err) + ']); ';
	                } else {
	                  out += ' validate.errors = [' + (__err) + ']; return false; ';
	                }
	              } else {
	                out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
	              }
	              out += ' } ';
	            }
	          }
	          if ($breakOnError) {
	            out += ' if (errors === ';
	            if ($top) {
	              out += '0';
	            } else {
	              out += 'errs_' + ($lvl);
	            }
	            out += ') { ';
	            $closingBraces2 += '}';
	          }
	        }
	      }
	    }
	  }
	  if ($breakOnError) {
	    out += ' ' + ($closingBraces2) + ' ';
	  }
	  if ($top) {
	    if ($async) {
	      out += ' if (errors === 0) return data;           ';
	      out += ' else throw new ValidationError(vErrors); ';
	    } else {
	      out += ' validate.errors = vErrors; ';
	      out += ' return errors === 0;       ';
	    }
	    out += ' }; return validate;';
	  } else {
	    out += ' var ' + ($valid) + ' = errors === errs_' + ($lvl) + ';';
	  }

	  function $shouldUseGroup($rulesGroup) {
	    var rules = $rulesGroup.rules;
	    for (var i = 0; i < rules.length; i++)
	      if ($shouldUseRule(rules[i])) return true;
	  }

	  function $shouldUseRule($rule) {
	    return it.schema[$rule.keyword] !== undefined || ($rule.implements && $ruleImplementsSomeKeyword($rule));
	  }

	  function $ruleImplementsSomeKeyword($rule) {
	    var impl = $rule.implements;
	    for (var i = 0; i < impl.length; i++)
	      if (it.schema[impl[i]] !== undefined) return true;
	  }
	  return out;
	};

	/**
	 * Functions below are used inside compiled validations function
	 */

	var ucs2length = util.ucs2length;


	// this error is thrown by async schemas to return validation errors via exception
	var ValidationError = error_classes.Validation;

	var compile_1 = compile$1;


	/**
	 * Compiles schema to validation function
	 * @this   Ajv
	 * @param  {Object} schema schema object
	 * @param  {Object} root object with information about the root schema for this schema
	 * @param  {Object} localRefs the hash of local references inside the schema (created by resolve.id), used for inline resolution
	 * @param  {String} baseId base ID for IDs in the schema
	 * @return {Function} validation function
	 */
	function compile$1(schema, root, localRefs, baseId) {
	  /* jshint validthis: true, evil: true */
	  /* eslint no-shadow: 0 */
	  var self = this
	    , opts = this._opts
	    , refVal = [ undefined ]
	    , refs = {}
	    , patterns = []
	    , patternsHash = {}
	    , defaults = []
	    , defaultsHash = {}
	    , customRules = [];

	  root = root || { schema: schema, refVal: refVal, refs: refs };

	  var c = checkCompiling.call(this, schema, root, baseId);
	  var compilation = this._compilations[c.index];
	  if (c.compiling) return (compilation.callValidate = callValidate);

	  var formats = this._formats;
	  var RULES = this.RULES;

	  try {
	    var v = localCompile(schema, root, localRefs, baseId);
	    compilation.validate = v;
	    var cv = compilation.callValidate;
	    if (cv) {
	      cv.schema = v.schema;
	      cv.errors = null;
	      cv.refs = v.refs;
	      cv.refVal = v.refVal;
	      cv.root = v.root;
	      cv.$async = v.$async;
	      if (opts.sourceCode) cv.source = v.source;
	    }
	    return v;
	  } finally {
	    endCompiling.call(this, schema, root, baseId);
	  }

	  /* @this   {*} - custom context, see passContext option */
	  function callValidate() {
	    /* jshint validthis: true */
	    var validate = compilation.validate;
	    var result = validate.apply(this, arguments);
	    callValidate.errors = validate.errors;
	    return result;
	  }

	  function localCompile(_schema, _root, localRefs, baseId) {
	    var isRoot = !_root || (_root && _root.schema == _schema);
	    if (_root.schema != root.schema)
	      return compile$1.call(self, _schema, _root, localRefs, baseId);

	    var $async = _schema.$async === true;

	    var sourceCode = validate$1({
	      isTop: true,
	      schema: _schema,
	      isRoot: isRoot,
	      baseId: baseId,
	      root: _root,
	      schemaPath: '',
	      errSchemaPath: '#',
	      errorPath: '""',
	      MissingRefError: error_classes.MissingRef,
	      RULES: RULES,
	      validate: validate$1,
	      util: util,
	      resolve: resolve_1,
	      resolveRef: resolveRef,
	      usePattern: usePattern,
	      useDefault: useDefault,
	      useCustomRule: useCustomRule,
	      opts: opts,
	      formats: formats,
	      logger: self.logger,
	      self: self
	    });

	    sourceCode = vars(refVal, refValCode) + vars(patterns, patternCode)
	                   + vars(defaults, defaultCode) + vars(customRules, customRuleCode)
	                   + sourceCode;

	    if (opts.processCode) sourceCode = opts.processCode(sourceCode, _schema);
	    // console.log('\n\n\n *** \n', JSON.stringify(sourceCode));
	    var validate;
	    try {
	      var makeValidate = new Function(
	        'self',
	        'RULES',
	        'formats',
	        'root',
	        'refVal',
	        'defaults',
	        'customRules',
	        'equal',
	        'ucs2length',
	        'ValidationError',
	        sourceCode
	      );

	      validate = makeValidate(
	        self,
	        RULES,
	        formats,
	        root,
	        refVal,
	        defaults,
	        customRules,
	        fastDeepEqual,
	        ucs2length,
	        ValidationError
	      );

	      refVal[0] = validate;
	    } catch(e) {
	      self.logger.error('Error compiling schema, function code:', sourceCode);
	      throw e;
	    }

	    validate.schema = _schema;
	    validate.errors = null;
	    validate.refs = refs;
	    validate.refVal = refVal;
	    validate.root = isRoot ? validate : _root;
	    if ($async) validate.$async = true;
	    if (opts.sourceCode === true) {
	      validate.source = {
	        code: sourceCode,
	        patterns: patterns,
	        defaults: defaults
	      };
	    }

	    return validate;
	  }

	  function resolveRef(baseId, ref, isRoot) {
	    ref = resolve_1.url(baseId, ref);
	    var refIndex = refs[ref];
	    var _refVal, refCode;
	    if (refIndex !== undefined) {
	      _refVal = refVal[refIndex];
	      refCode = 'refVal[' + refIndex + ']';
	      return resolvedRef(_refVal, refCode);
	    }
	    if (!isRoot && root.refs) {
	      var rootRefId = root.refs[ref];
	      if (rootRefId !== undefined) {
	        _refVal = root.refVal[rootRefId];
	        refCode = addLocalRef(ref, _refVal);
	        return resolvedRef(_refVal, refCode);
	      }
	    }

	    refCode = addLocalRef(ref);
	    var v = resolve_1.call(self, localCompile, root, ref);
	    if (v === undefined) {
	      var localSchema = localRefs && localRefs[ref];
	      if (localSchema) {
	        v = resolve_1.inlineRef(localSchema, opts.inlineRefs)
	            ? localSchema
	            : compile$1.call(self, localSchema, root, localRefs, baseId);
	      }
	    }

	    if (v === undefined) {
	      removeLocalRef(ref);
	    } else {
	      replaceLocalRef(ref, v);
	      return resolvedRef(v, refCode);
	    }
	  }

	  function addLocalRef(ref, v) {
	    var refId = refVal.length;
	    refVal[refId] = v;
	    refs[ref] = refId;
	    return 'refVal' + refId;
	  }

	  function removeLocalRef(ref) {
	    delete refs[ref];
	  }

	  function replaceLocalRef(ref, v) {
	    var refId = refs[ref];
	    refVal[refId] = v;
	  }

	  function resolvedRef(refVal, code) {
	    return typeof refVal == 'object' || typeof refVal == 'boolean'
	            ? { code: code, schema: refVal, inline: true }
	            : { code: code, $async: refVal && !!refVal.$async };
	  }

	  function usePattern(regexStr) {
	    var index = patternsHash[regexStr];
	    if (index === undefined) {
	      index = patternsHash[regexStr] = patterns.length;
	      patterns[index] = regexStr;
	    }
	    return 'pattern' + index;
	  }

	  function useDefault(value) {
	    switch (typeof value) {
	      case 'boolean':
	      case 'number':
	        return '' + value;
	      case 'string':
	        return util.toQuotedString(value);
	      case 'object':
	        if (value === null) return 'null';
	        var valueStr = fastJsonStableStringify(value);
	        var index = defaultsHash[valueStr];
	        if (index === undefined) {
	          index = defaultsHash[valueStr] = defaults.length;
	          defaults[index] = value;
	        }
	        return 'default' + index;
	    }
	  }

	  function useCustomRule(rule, schema, parentSchema, it) {
	    if (self._opts.validateSchema !== false) {
	      var deps = rule.definition.dependencies;
	      if (deps && !deps.every(function(keyword) {
	        return Object.prototype.hasOwnProperty.call(parentSchema, keyword);
	      }))
	        throw new Error('parent schema must have all required keywords: ' + deps.join(','));

	      var validateSchema = rule.definition.validateSchema;
	      if (validateSchema) {
	        var valid = validateSchema(schema);
	        if (!valid) {
	          var message = 'keyword schema is invalid: ' + self.errorsText(validateSchema.errors);
	          if (self._opts.validateSchema == 'log') self.logger.error(message);
	          else throw new Error(message);
	        }
	      }
	    }

	    var compile = rule.definition.compile
	      , inline = rule.definition.inline
	      , macro = rule.definition.macro;

	    var validate;
	    if (compile) {
	      validate = compile.call(self, schema, parentSchema, it);
	    } else if (macro) {
	      validate = macro.call(self, schema, parentSchema, it);
	      if (opts.validateSchema !== false) self.validateSchema(validate, true);
	    } else if (inline) {
	      validate = inline.call(self, it, rule.keyword, schema, parentSchema);
	    } else {
	      validate = rule.definition.validate;
	      if (!validate) return;
	    }

	    if (validate === undefined)
	      throw new Error('custom keyword "' + rule.keyword + '"failed to compile');

	    var index = customRules.length;
	    customRules[index] = validate;

	    return {
	      code: 'customRule' + index,
	      validate: validate
	    };
	  }
	}


	/**
	 * Checks if the schema is currently compiled
	 * @this   Ajv
	 * @param  {Object} schema schema to compile
	 * @param  {Object} root root object
	 * @param  {String} baseId base schema ID
	 * @return {Object} object with properties "index" (compilation index) and "compiling" (boolean)
	 */
	function checkCompiling(schema, root, baseId) {
	  /* jshint validthis: true */
	  var index = compIndex.call(this, schema, root, baseId);
	  if (index >= 0) return { index: index, compiling: true };
	  index = this._compilations.length;
	  this._compilations[index] = {
	    schema: schema,
	    root: root,
	    baseId: baseId
	  };
	  return { index: index, compiling: false };
	}


	/**
	 * Removes the schema from the currently compiled list
	 * @this   Ajv
	 * @param  {Object} schema schema to compile
	 * @param  {Object} root root object
	 * @param  {String} baseId base schema ID
	 */
	function endCompiling(schema, root, baseId) {
	  /* jshint validthis: true */
	  var i = compIndex.call(this, schema, root, baseId);
	  if (i >= 0) this._compilations.splice(i, 1);
	}


	/**
	 * Index of schema compilation in the currently compiled list
	 * @this   Ajv
	 * @param  {Object} schema schema to compile
	 * @param  {Object} root root object
	 * @param  {String} baseId base schema ID
	 * @return {Integer} compilation index
	 */
	function compIndex(schema, root, baseId) {
	  /* jshint validthis: true */
	  for (var i=0; i<this._compilations.length; i++) {
	    var c = this._compilations[i];
	    if (c.schema == schema && c.root == root && c.baseId == baseId) return i;
	  }
	  return -1;
	}


	function patternCode(i, patterns) {
	  return 'var pattern' + i + ' = new RegExp(' + util.toQuotedString(patterns[i]) + ');';
	}


	function defaultCode(i) {
	  return 'var default' + i + ' = defaults[' + i + '];';
	}


	function refValCode(i, refVal) {
	  return refVal[i] === undefined ? '' : 'var refVal' + i + ' = refVal[' + i + '];';
	}


	function customRuleCode(i) {
	  return 'var customRule' + i + ' = customRules[' + i + '];';
	}


	function vars(arr, statement) {
	  if (!arr.length) return '';
	  var code = '';
	  for (var i=0; i<arr.length; i++)
	    code += statement(i, arr);
	  return code;
	}

	var cache = createCommonjsModule(function (module) {


	var Cache = module.exports = function Cache() {
	  this._cache = {};
	};


	Cache.prototype.put = function Cache_put(key, value) {
	  this._cache[key] = value;
	};


	Cache.prototype.get = function Cache_get(key) {
	  return this._cache[key];
	};


	Cache.prototype.del = function Cache_del(key) {
	  delete this._cache[key];
	};


	Cache.prototype.clear = function Cache_clear() {
	  this._cache = {};
	};
	});

	var DATE = /^(\d\d\d\d)-(\d\d)-(\d\d)$/;
	var DAYS = [0,31,28,31,30,31,30,31,31,30,31,30,31];
	var TIME = /^(\d\d):(\d\d):(\d\d)(\.\d+)?(z|[+-]\d\d(?::?\d\d)?)?$/i;
	var HOSTNAME = /^(?=.{1,253}\.?$)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[-0-9a-z]{0,61}[0-9a-z])?)*\.?$/i;
	var URI = /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
	var URIREF = /^(?:[a-z][a-z0-9+\-.]*:)?(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'"()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?(?:\?(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
	// uri-template: https://tools.ietf.org/html/rfc6570
	var URITEMPLATE = /^(?:(?:[^\x00-\x20"'<>%\\^`{|}]|%[0-9a-f]{2})|\{[+#./;?&=,!@|]?(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?(?:,(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?)*\})*$/i;
	// For the source: https://gist.github.com/dperini/729294
	// For test cases: https://mathiasbynens.be/demo/url-regex
	// @todo Delete current URL in favour of the commented out URL rule when this issue is fixed https://github.com/eslint/eslint/issues/7983.
	// var URL = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u{00a1}-\u{ffff}0-9]+-)*[a-z\u{00a1}-\u{ffff}0-9]+)(?:\.(?:[a-z\u{00a1}-\u{ffff}0-9]+-)*[a-z\u{00a1}-\u{ffff}0-9]+)*(?:\.(?:[a-z\u{00a1}-\u{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/iu;
	var URL = /^(?:(?:http[s\u017F]?|ftp):\/\/)(?:(?:[\0-\x08\x0E-\x1F!-\x9F\xA1-\u167F\u1681-\u1FFF\u200B-\u2027\u202A-\u202E\u2030-\u205E\u2060-\u2FFF\u3001-\uD7FF\uE000-\uFEFE\uFF00-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+(?::(?:[\0-\x08\x0E-\x1F!-\x9F\xA1-\u167F\u1681-\u1FFF\u200B-\u2027\u202A-\u202E\u2030-\u205E\u2060-\u2FFF\u3001-\uD7FF\uE000-\uFEFE\uFF00-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*)?@)?(?:(?!10(?:\.[0-9]{1,3}){3})(?!127(?:\.[0-9]{1,3}){3})(?!169\.254(?:\.[0-9]{1,3}){2})(?!192\.168(?:\.[0-9]{1,3}){2})(?!172\.(?:1[6-9]|2[0-9]|3[01])(?:\.[0-9]{1,3}){2})(?:[1-9][0-9]?|1[0-9][0-9]|2[01][0-9]|22[0-3])(?:\.(?:1?[0-9]{1,2}|2[0-4][0-9]|25[0-5])){2}(?:\.(?:[1-9][0-9]?|1[0-9][0-9]|2[0-4][0-9]|25[0-4]))|(?:(?:(?:[0-9a-z\xA1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+-)*(?:[0-9a-z\xA1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+)(?:\.(?:(?:[0-9a-z\xA1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+-)*(?:[0-9a-z\xA1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+)*(?:\.(?:(?:[a-z\xA1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]){2,})))(?::[0-9]{2,5})?(?:\/(?:[\0-\x08\x0E-\x1F!-\x9F\xA1-\u167F\u1681-\u1FFF\u200B-\u2027\u202A-\u202E\u2030-\u205E\u2060-\u2FFF\u3001-\uD7FF\uE000-\uFEFE\uFF00-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*)?$/i;
	var UUID = /^(?:urn:uuid:)?[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i;
	var JSON_POINTER = /^(?:\/(?:[^~/]|~0|~1)*)*$/;
	var JSON_POINTER_URI_FRAGMENT = /^#(?:\/(?:[a-z0-9_\-.!$&'()*+,;:=@]|%[0-9a-f]{2}|~0|~1)*)*$/i;
	var RELATIVE_JSON_POINTER = /^(?:0|[1-9][0-9]*)(?:#|(?:\/(?:[^~/]|~0|~1)*)*)$/;


	var formats_1 = formats;

	function formats(mode) {
	  mode = mode == 'full' ? 'full' : 'fast';
	  return util.copy(formats[mode]);
	}


	formats.fast = {
	  // date: http://tools.ietf.org/html/rfc3339#section-5.6
	  date: /^\d\d\d\d-[0-1]\d-[0-3]\d$/,
	  // date-time: http://tools.ietf.org/html/rfc3339#section-5.6
	  time: /^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i,
	  'date-time': /^\d\d\d\d-[0-1]\d-[0-3]\d[t\s](?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i,
	  // uri: https://github.com/mafintosh/is-my-json-valid/blob/master/formats.js
	  uri: /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/)?[^\s]*$/i,
	  'uri-reference': /^(?:(?:[a-z][a-z0-9+\-.]*:)?\/?\/)?(?:[^\\\s#][^\s#]*)?(?:#[^\\\s]*)?$/i,
	  'uri-template': URITEMPLATE,
	  url: URL,
	  // email (sources from jsen validator):
	  // http://stackoverflow.com/questions/201323/using-a-regular-expression-to-validate-an-email-address#answer-8829363
	  // http://www.w3.org/TR/html5/forms.html#valid-e-mail-address (search for 'willful violation')
	  email: /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i,
	  hostname: HOSTNAME,
	  // optimized https://www.safaribooksonline.com/library/view/regular-expressions-cookbook/9780596802837/ch07s16.html
	  ipv4: /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/,
	  // optimized http://stackoverflow.com/questions/53497/regular-expression-that-matches-valid-ipv6-addresses
	  ipv6: /^\s*(?:(?:(?:[0-9a-f]{1,4}:){7}(?:[0-9a-f]{1,4}|:))|(?:(?:[0-9a-f]{1,4}:){6}(?::[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(?:(?:[0-9a-f]{1,4}:){5}(?:(?:(?::[0-9a-f]{1,4}){1,2})|:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(?:(?:[0-9a-f]{1,4}:){4}(?:(?:(?::[0-9a-f]{1,4}){1,3})|(?:(?::[0-9a-f]{1,4})?:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){3}(?:(?:(?::[0-9a-f]{1,4}){1,4})|(?:(?::[0-9a-f]{1,4}){0,2}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){2}(?:(?:(?::[0-9a-f]{1,4}){1,5})|(?:(?::[0-9a-f]{1,4}){0,3}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){1}(?:(?:(?::[0-9a-f]{1,4}){1,6})|(?:(?::[0-9a-f]{1,4}){0,4}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?::(?:(?:(?::[0-9a-f]{1,4}){1,7})|(?:(?::[0-9a-f]{1,4}){0,5}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(?:%.+)?\s*$/i,
	  regex: regex,
	  // uuid: http://tools.ietf.org/html/rfc4122
	  uuid: UUID,
	  // JSON-pointer: https://tools.ietf.org/html/rfc6901
	  // uri fragment: https://tools.ietf.org/html/rfc3986#appendix-A
	  'json-pointer': JSON_POINTER,
	  'json-pointer-uri-fragment': JSON_POINTER_URI_FRAGMENT,
	  // relative JSON-pointer: http://tools.ietf.org/html/draft-luff-relative-json-pointer-00
	  'relative-json-pointer': RELATIVE_JSON_POINTER
	};


	formats.full = {
	  date: date,
	  time: time,
	  'date-time': date_time,
	  uri: uri,
	  'uri-reference': URIREF,
	  'uri-template': URITEMPLATE,
	  url: URL,
	  email: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
	  hostname: HOSTNAME,
	  ipv4: /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/,
	  ipv6: /^\s*(?:(?:(?:[0-9a-f]{1,4}:){7}(?:[0-9a-f]{1,4}|:))|(?:(?:[0-9a-f]{1,4}:){6}(?::[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(?:(?:[0-9a-f]{1,4}:){5}(?:(?:(?::[0-9a-f]{1,4}){1,2})|:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(?:(?:[0-9a-f]{1,4}:){4}(?:(?:(?::[0-9a-f]{1,4}){1,3})|(?:(?::[0-9a-f]{1,4})?:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){3}(?:(?:(?::[0-9a-f]{1,4}){1,4})|(?:(?::[0-9a-f]{1,4}){0,2}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){2}(?:(?:(?::[0-9a-f]{1,4}){1,5})|(?:(?::[0-9a-f]{1,4}){0,3}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?:(?:[0-9a-f]{1,4}:){1}(?:(?:(?::[0-9a-f]{1,4}){1,6})|(?:(?::[0-9a-f]{1,4}){0,4}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(?::(?:(?:(?::[0-9a-f]{1,4}){1,7})|(?:(?::[0-9a-f]{1,4}){0,5}:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(?:%.+)?\s*$/i,
	  regex: regex,
	  uuid: UUID,
	  'json-pointer': JSON_POINTER,
	  'json-pointer-uri-fragment': JSON_POINTER_URI_FRAGMENT,
	  'relative-json-pointer': RELATIVE_JSON_POINTER
	};


	function isLeapYear(year) {
	  // https://tools.ietf.org/html/rfc3339#appendix-C
	  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
	}


	function date(str) {
	  // full-date from http://tools.ietf.org/html/rfc3339#section-5.6
	  var matches = str.match(DATE);
	  if (!matches) return false;

	  var year = +matches[1];
	  var month = +matches[2];
	  var day = +matches[3];

	  return month >= 1 && month <= 12 && day >= 1 &&
	          day <= (month == 2 && isLeapYear(year) ? 29 : DAYS[month]);
	}


	function time(str, full) {
	  var matches = str.match(TIME);
	  if (!matches) return false;

	  var hour = matches[1];
	  var minute = matches[2];
	  var second = matches[3];
	  var timeZone = matches[5];
	  return ((hour <= 23 && minute <= 59 && second <= 59) ||
	          (hour == 23 && minute == 59 && second == 60)) &&
	         (!full || timeZone);
	}


	var DATE_TIME_SEPARATOR = /t|\s/i;
	function date_time(str) {
	  // http://tools.ietf.org/html/rfc3339#section-5.6
	  var dateTime = str.split(DATE_TIME_SEPARATOR);
	  return dateTime.length == 2 && date(dateTime[0]) && time(dateTime[1], true);
	}


	var NOT_URI_FRAGMENT = /\/|:/;
	function uri(str) {
	  // http://jmrware.com/articles/2009/uri_regexp/URI_regex.html + optional protocol + required "."
	  return NOT_URI_FRAGMENT.test(str) && URI.test(str);
	}


	var Z_ANCHOR = /[^\\]\\Z/;
	function regex(str) {
	  if (Z_ANCHOR.test(str)) return false;
	  try {
	    new RegExp(str);
	    return true;
	  } catch(e) {
	    return false;
	  }
	}

	var ref = function generate_ref(it, $keyword, $ruleType) {
	  var out = ' ';
	  var $lvl = it.level;
	  var $dataLvl = it.dataLevel;
	  var $schema = it.schema[$keyword];
	  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
	  var $breakOnError = !it.opts.allErrors;
	  var $data = 'data' + ($dataLvl || '');
	  var $valid = 'valid' + $lvl;
	  var $async, $refCode;
	  if ($schema == '#' || $schema == '#/') {
	    if (it.isRoot) {
	      $async = it.async;
	      $refCode = 'validate';
	    } else {
	      $async = it.root.schema.$async === true;
	      $refCode = 'root.refVal[0]';
	    }
	  } else {
	    var $refVal = it.resolveRef(it.baseId, $schema, it.isRoot);
	    if ($refVal === undefined) {
	      var $message = it.MissingRefError.message(it.baseId, $schema);
	      if (it.opts.missingRefs == 'fail') {
	        it.logger.error($message);
	        var $$outStack = $$outStack || [];
	        $$outStack.push(out);
	        out = ''; /* istanbul ignore else */
	        if (it.createErrors !== false) {
	          out += ' { keyword: \'' + ('$ref') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { ref: \'' + (it.util.escapeQuotes($schema)) + '\' } ';
	          if (it.opts.messages !== false) {
	            out += ' , message: \'can\\\'t resolve reference ' + (it.util.escapeQuotes($schema)) + '\' ';
	          }
	          if (it.opts.verbose) {
	            out += ' , schema: ' + (it.util.toQuotedString($schema)) + ' , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
	          }
	          out += ' } ';
	        } else {
	          out += ' {} ';
	        }
	        var __err = out;
	        out = $$outStack.pop();
	        if (!it.compositeRule && $breakOnError) {
	          /* istanbul ignore if */
	          if (it.async) {
	            out += ' throw new ValidationError([' + (__err) + ']); ';
	          } else {
	            out += ' validate.errors = [' + (__err) + ']; return false; ';
	          }
	        } else {
	          out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
	        }
	        if ($breakOnError) {
	          out += ' if (false) { ';
	        }
	      } else if (it.opts.missingRefs == 'ignore') {
	        it.logger.warn($message);
	        if ($breakOnError) {
	          out += ' if (true) { ';
	        }
	      } else {
	        throw new it.MissingRefError(it.baseId, $schema, $message);
	      }
	    } else if ($refVal.inline) {
	      var $it = it.util.copy(it);
	      $it.level++;
	      var $nextValid = 'valid' + $it.level;
	      $it.schema = $refVal.schema;
	      $it.schemaPath = '';
	      $it.errSchemaPath = $schema;
	      var $code = it.validate($it).replace(/validate\.schema/g, $refVal.code);
	      out += ' ' + ($code) + ' ';
	      if ($breakOnError) {
	        out += ' if (' + ($nextValid) + ') { ';
	      }
	    } else {
	      $async = $refVal.$async === true || (it.async && $refVal.$async !== false);
	      $refCode = $refVal.code;
	    }
	  }
	  if ($refCode) {
	    var $$outStack = $$outStack || [];
	    $$outStack.push(out);
	    out = '';
	    if (it.opts.passContext) {
	      out += ' ' + ($refCode) + '.call(this, ';
	    } else {
	      out += ' ' + ($refCode) + '( ';
	    }
	    out += ' ' + ($data) + ', (dataPath || \'\')';
	    if (it.errorPath != '""') {
	      out += ' + ' + (it.errorPath);
	    }
	    var $parentData = $dataLvl ? 'data' + (($dataLvl - 1) || '') : 'parentData',
	      $parentDataProperty = $dataLvl ? it.dataPathArr[$dataLvl] : 'parentDataProperty';
	    out += ' , ' + ($parentData) + ' , ' + ($parentDataProperty) + ', rootData)  ';
	    var __callValidate = out;
	    out = $$outStack.pop();
	    if ($async) {
	      if (!it.async) throw new Error('async schema referenced by sync schema');
	      if ($breakOnError) {
	        out += ' var ' + ($valid) + '; ';
	      }
	      out += ' try { await ' + (__callValidate) + '; ';
	      if ($breakOnError) {
	        out += ' ' + ($valid) + ' = true; ';
	      }
	      out += ' } catch (e) { if (!(e instanceof ValidationError)) throw e; if (vErrors === null) vErrors = e.errors; else vErrors = vErrors.concat(e.errors); errors = vErrors.length; ';
	      if ($breakOnError) {
	        out += ' ' + ($valid) + ' = false; ';
	      }
	      out += ' } ';
	      if ($breakOnError) {
	        out += ' if (' + ($valid) + ') { ';
	      }
	    } else {
	      out += ' if (!' + (__callValidate) + ') { if (vErrors === null) vErrors = ' + ($refCode) + '.errors; else vErrors = vErrors.concat(' + ($refCode) + '.errors); errors = vErrors.length; } ';
	      if ($breakOnError) {
	        out += ' else { ';
	      }
	    }
	  }
	  return out;
	};

	var allOf = function generate_allOf(it, $keyword, $ruleType) {
	  var out = ' ';
	  var $schema = it.schema[$keyword];
	  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
	  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
	  var $breakOnError = !it.opts.allErrors;
	  var $it = it.util.copy(it);
	  var $closingBraces = '';
	  $it.level++;
	  var $nextValid = 'valid' + $it.level;
	  var $currentBaseId = $it.baseId,
	    $allSchemasEmpty = true;
	  var arr1 = $schema;
	  if (arr1) {
	    var $sch, $i = -1,
	      l1 = arr1.length - 1;
	    while ($i < l1) {
	      $sch = arr1[$i += 1];
	      if ((it.opts.strictKeywords ? (typeof $sch == 'object' && Object.keys($sch).length > 0) || $sch === false : it.util.schemaHasRules($sch, it.RULES.all))) {
	        $allSchemasEmpty = false;
	        $it.schema = $sch;
	        $it.schemaPath = $schemaPath + '[' + $i + ']';
	        $it.errSchemaPath = $errSchemaPath + '/' + $i;
	        out += '  ' + (it.validate($it)) + ' ';
	        $it.baseId = $currentBaseId;
	        if ($breakOnError) {
	          out += ' if (' + ($nextValid) + ') { ';
	          $closingBraces += '}';
	        }
	      }
	    }
	  }
	  if ($breakOnError) {
	    if ($allSchemasEmpty) {
	      out += ' if (true) { ';
	    } else {
	      out += ' ' + ($closingBraces.slice(0, -1)) + ' ';
	    }
	  }
	  return out;
	};

	var anyOf = function generate_anyOf(it, $keyword, $ruleType) {
	  var out = ' ';
	  var $lvl = it.level;
	  var $dataLvl = it.dataLevel;
	  var $schema = it.schema[$keyword];
	  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
	  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
	  var $breakOnError = !it.opts.allErrors;
	  var $data = 'data' + ($dataLvl || '');
	  var $valid = 'valid' + $lvl;
	  var $errs = 'errs__' + $lvl;
	  var $it = it.util.copy(it);
	  var $closingBraces = '';
	  $it.level++;
	  var $nextValid = 'valid' + $it.level;
	  var $noEmptySchema = $schema.every(function($sch) {
	    return (it.opts.strictKeywords ? (typeof $sch == 'object' && Object.keys($sch).length > 0) || $sch === false : it.util.schemaHasRules($sch, it.RULES.all));
	  });
	  if ($noEmptySchema) {
	    var $currentBaseId = $it.baseId;
	    out += ' var ' + ($errs) + ' = errors; var ' + ($valid) + ' = false;  ';
	    var $wasComposite = it.compositeRule;
	    it.compositeRule = $it.compositeRule = true;
	    var arr1 = $schema;
	    if (arr1) {
	      var $sch, $i = -1,
	        l1 = arr1.length - 1;
	      while ($i < l1) {
	        $sch = arr1[$i += 1];
	        $it.schema = $sch;
	        $it.schemaPath = $schemaPath + '[' + $i + ']';
	        $it.errSchemaPath = $errSchemaPath + '/' + $i;
	        out += '  ' + (it.validate($it)) + ' ';
	        $it.baseId = $currentBaseId;
	        out += ' ' + ($valid) + ' = ' + ($valid) + ' || ' + ($nextValid) + '; if (!' + ($valid) + ') { ';
	        $closingBraces += '}';
	      }
	    }
	    it.compositeRule = $it.compositeRule = $wasComposite;
	    out += ' ' + ($closingBraces) + ' if (!' + ($valid) + ') {   var err =   '; /* istanbul ignore else */
	    if (it.createErrors !== false) {
	      out += ' { keyword: \'' + ('anyOf') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: {} ';
	      if (it.opts.messages !== false) {
	        out += ' , message: \'should match some schema in anyOf\' ';
	      }
	      if (it.opts.verbose) {
	        out += ' , schema: validate.schema' + ($schemaPath) + ' , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
	      }
	      out += ' } ';
	    } else {
	      out += ' {} ';
	    }
	    out += ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
	    if (!it.compositeRule && $breakOnError) {
	      /* istanbul ignore if */
	      if (it.async) {
	        out += ' throw new ValidationError(vErrors); ';
	      } else {
	        out += ' validate.errors = vErrors; return false; ';
	      }
	    }
	    out += ' } else {  errors = ' + ($errs) + '; if (vErrors !== null) { if (' + ($errs) + ') vErrors.length = ' + ($errs) + '; else vErrors = null; } ';
	    if (it.opts.allErrors) {
	      out += ' } ';
	    }
	  } else {
	    if ($breakOnError) {
	      out += ' if (true) { ';
	    }
	  }
	  return out;
	};

	var comment = function generate_comment(it, $keyword, $ruleType) {
	  var out = ' ';
	  var $schema = it.schema[$keyword];
	  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
	  !it.opts.allErrors;
	  var $comment = it.util.toQuotedString($schema);
	  if (it.opts.$comment === true) {
	    out += ' console.log(' + ($comment) + ');';
	  } else if (typeof it.opts.$comment == 'function') {
	    out += ' self._opts.$comment(' + ($comment) + ', ' + (it.util.toQuotedString($errSchemaPath)) + ', validate.root.schema);';
	  }
	  return out;
	};

	var _const = function generate_const(it, $keyword, $ruleType) {
	  var out = ' ';
	  var $lvl = it.level;
	  var $dataLvl = it.dataLevel;
	  var $schema = it.schema[$keyword];
	  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
	  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
	  var $breakOnError = !it.opts.allErrors;
	  var $data = 'data' + ($dataLvl || '');
	  var $valid = 'valid' + $lvl;
	  var $isData = it.opts.$data && $schema && $schema.$data;
	  if ($isData) {
	    out += ' var schema' + ($lvl) + ' = ' + (it.util.getData($schema.$data, $dataLvl, it.dataPathArr)) + '; ';
	  }
	  if (!$isData) {
	    out += ' var schema' + ($lvl) + ' = validate.schema' + ($schemaPath) + ';';
	  }
	  out += 'var ' + ($valid) + ' = equal(' + ($data) + ', schema' + ($lvl) + '); if (!' + ($valid) + ') {   ';
	  var $$outStack = $$outStack || [];
	  $$outStack.push(out);
	  out = ''; /* istanbul ignore else */
	  if (it.createErrors !== false) {
	    out += ' { keyword: \'' + ('const') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { allowedValue: schema' + ($lvl) + ' } ';
	    if (it.opts.messages !== false) {
	      out += ' , message: \'should be equal to constant\' ';
	    }
	    if (it.opts.verbose) {
	      out += ' , schema: validate.schema' + ($schemaPath) + ' , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
	    }
	    out += ' } ';
	  } else {
	    out += ' {} ';
	  }
	  var __err = out;
	  out = $$outStack.pop();
	  if (!it.compositeRule && $breakOnError) {
	    /* istanbul ignore if */
	    if (it.async) {
	      out += ' throw new ValidationError([' + (__err) + ']); ';
	    } else {
	      out += ' validate.errors = [' + (__err) + ']; return false; ';
	    }
	  } else {
	    out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
	  }
	  out += ' }';
	  if ($breakOnError) {
	    out += ' else { ';
	  }
	  return out;
	};

	var contains = function generate_contains(it, $keyword, $ruleType) {
	  var out = ' ';
	  var $lvl = it.level;
	  var $dataLvl = it.dataLevel;
	  var $schema = it.schema[$keyword];
	  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
	  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
	  var $breakOnError = !it.opts.allErrors;
	  var $data = 'data' + ($dataLvl || '');
	  var $valid = 'valid' + $lvl;
	  var $errs = 'errs__' + $lvl;
	  var $it = it.util.copy(it);
	  var $closingBraces = '';
	  $it.level++;
	  var $nextValid = 'valid' + $it.level;
	  var $idx = 'i' + $lvl,
	    $dataNxt = $it.dataLevel = it.dataLevel + 1,
	    $nextData = 'data' + $dataNxt,
	    $currentBaseId = it.baseId,
	    $nonEmptySchema = (it.opts.strictKeywords ? (typeof $schema == 'object' && Object.keys($schema).length > 0) || $schema === false : it.util.schemaHasRules($schema, it.RULES.all));
	  out += 'var ' + ($errs) + ' = errors;var ' + ($valid) + ';';
	  if ($nonEmptySchema) {
	    var $wasComposite = it.compositeRule;
	    it.compositeRule = $it.compositeRule = true;
	    $it.schema = $schema;
	    $it.schemaPath = $schemaPath;
	    $it.errSchemaPath = $errSchemaPath;
	    out += ' var ' + ($nextValid) + ' = false; for (var ' + ($idx) + ' = 0; ' + ($idx) + ' < ' + ($data) + '.length; ' + ($idx) + '++) { ';
	    $it.errorPath = it.util.getPathExpr(it.errorPath, $idx, it.opts.jsonPointers, true);
	    var $passData = $data + '[' + $idx + ']';
	    $it.dataPathArr[$dataNxt] = $idx;
	    var $code = it.validate($it);
	    $it.baseId = $currentBaseId;
	    if (it.util.varOccurences($code, $nextData) < 2) {
	      out += ' ' + (it.util.varReplace($code, $nextData, $passData)) + ' ';
	    } else {
	      out += ' var ' + ($nextData) + ' = ' + ($passData) + '; ' + ($code) + ' ';
	    }
	    out += ' if (' + ($nextValid) + ') break; }  ';
	    it.compositeRule = $it.compositeRule = $wasComposite;
	    out += ' ' + ($closingBraces) + ' if (!' + ($nextValid) + ') {';
	  } else {
	    out += ' if (' + ($data) + '.length == 0) {';
	  }
	  var $$outStack = $$outStack || [];
	  $$outStack.push(out);
	  out = ''; /* istanbul ignore else */
	  if (it.createErrors !== false) {
	    out += ' { keyword: \'' + ('contains') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: {} ';
	    if (it.opts.messages !== false) {
	      out += ' , message: \'should contain a valid item\' ';
	    }
	    if (it.opts.verbose) {
	      out += ' , schema: validate.schema' + ($schemaPath) + ' , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
	    }
	    out += ' } ';
	  } else {
	    out += ' {} ';
	  }
	  var __err = out;
	  out = $$outStack.pop();
	  if (!it.compositeRule && $breakOnError) {
	    /* istanbul ignore if */
	    if (it.async) {
	      out += ' throw new ValidationError([' + (__err) + ']); ';
	    } else {
	      out += ' validate.errors = [' + (__err) + ']; return false; ';
	    }
	  } else {
	    out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
	  }
	  out += ' } else { ';
	  if ($nonEmptySchema) {
	    out += '  errors = ' + ($errs) + '; if (vErrors !== null) { if (' + ($errs) + ') vErrors.length = ' + ($errs) + '; else vErrors = null; } ';
	  }
	  if (it.opts.allErrors) {
	    out += ' } ';
	  }
	  return out;
	};

	var dependencies = function generate_dependencies(it, $keyword, $ruleType) {
	  var out = ' ';
	  var $lvl = it.level;
	  var $dataLvl = it.dataLevel;
	  var $schema = it.schema[$keyword];
	  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
	  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
	  var $breakOnError = !it.opts.allErrors;
	  var $data = 'data' + ($dataLvl || '');
	  var $errs = 'errs__' + $lvl;
	  var $it = it.util.copy(it);
	  var $closingBraces = '';
	  $it.level++;
	  var $nextValid = 'valid' + $it.level;
	  var $schemaDeps = {},
	    $propertyDeps = {},
	    $ownProperties = it.opts.ownProperties;
	  for ($property in $schema) {
	    if ($property == '__proto__') continue;
	    var $sch = $schema[$property];
	    var $deps = Array.isArray($sch) ? $propertyDeps : $schemaDeps;
	    $deps[$property] = $sch;
	  }
	  out += 'var ' + ($errs) + ' = errors;';
	  var $currentErrorPath = it.errorPath;
	  out += 'var missing' + ($lvl) + ';';
	  for (var $property in $propertyDeps) {
	    $deps = $propertyDeps[$property];
	    if ($deps.length) {
	      out += ' if ( ' + ($data) + (it.util.getProperty($property)) + ' !== undefined ';
	      if ($ownProperties) {
	        out += ' && Object.prototype.hasOwnProperty.call(' + ($data) + ', \'' + (it.util.escapeQuotes($property)) + '\') ';
	      }
	      if ($breakOnError) {
	        out += ' && ( ';
	        var arr1 = $deps;
	        if (arr1) {
	          var $propertyKey, $i = -1,
	            l1 = arr1.length - 1;
	          while ($i < l1) {
	            $propertyKey = arr1[$i += 1];
	            if ($i) {
	              out += ' || ';
	            }
	            var $prop = it.util.getProperty($propertyKey),
	              $useData = $data + $prop;
	            out += ' ( ( ' + ($useData) + ' === undefined ';
	            if ($ownProperties) {
	              out += ' || ! Object.prototype.hasOwnProperty.call(' + ($data) + ', \'' + (it.util.escapeQuotes($propertyKey)) + '\') ';
	            }
	            out += ') && (missing' + ($lvl) + ' = ' + (it.util.toQuotedString(it.opts.jsonPointers ? $propertyKey : $prop)) + ') ) ';
	          }
	        }
	        out += ')) {  ';
	        var $propertyPath = 'missing' + $lvl,
	          $missingProperty = '\' + ' + $propertyPath + ' + \'';
	        if (it.opts._errorDataPathProperty) {
	          it.errorPath = it.opts.jsonPointers ? it.util.getPathExpr($currentErrorPath, $propertyPath, true) : $currentErrorPath + ' + ' + $propertyPath;
	        }
	        var $$outStack = $$outStack || [];
	        $$outStack.push(out);
	        out = ''; /* istanbul ignore else */
	        if (it.createErrors !== false) {
	          out += ' { keyword: \'' + ('dependencies') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { property: \'' + (it.util.escapeQuotes($property)) + '\', missingProperty: \'' + ($missingProperty) + '\', depsCount: ' + ($deps.length) + ', deps: \'' + (it.util.escapeQuotes($deps.length == 1 ? $deps[0] : $deps.join(", "))) + '\' } ';
	          if (it.opts.messages !== false) {
	            out += ' , message: \'should have ';
	            if ($deps.length == 1) {
	              out += 'property ' + (it.util.escapeQuotes($deps[0]));
	            } else {
	              out += 'properties ' + (it.util.escapeQuotes($deps.join(", ")));
	            }
	            out += ' when property ' + (it.util.escapeQuotes($property)) + ' is present\' ';
	          }
	          if (it.opts.verbose) {
	            out += ' , schema: validate.schema' + ($schemaPath) + ' , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
	          }
	          out += ' } ';
	        } else {
	          out += ' {} ';
	        }
	        var __err = out;
	        out = $$outStack.pop();
	        if (!it.compositeRule && $breakOnError) {
	          /* istanbul ignore if */
	          if (it.async) {
	            out += ' throw new ValidationError([' + (__err) + ']); ';
	          } else {
	            out += ' validate.errors = [' + (__err) + ']; return false; ';
	          }
	        } else {
	          out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
	        }
	      } else {
	        out += ' ) { ';
	        var arr2 = $deps;
	        if (arr2) {
	          var $propertyKey, i2 = -1,
	            l2 = arr2.length - 1;
	          while (i2 < l2) {
	            $propertyKey = arr2[i2 += 1];
	            var $prop = it.util.getProperty($propertyKey),
	              $missingProperty = it.util.escapeQuotes($propertyKey),
	              $useData = $data + $prop;
	            if (it.opts._errorDataPathProperty) {
	              it.errorPath = it.util.getPath($currentErrorPath, $propertyKey, it.opts.jsonPointers);
	            }
	            out += ' if ( ' + ($useData) + ' === undefined ';
	            if ($ownProperties) {
	              out += ' || ! Object.prototype.hasOwnProperty.call(' + ($data) + ', \'' + (it.util.escapeQuotes($propertyKey)) + '\') ';
	            }
	            out += ') {  var err =   '; /* istanbul ignore else */
	            if (it.createErrors !== false) {
	              out += ' { keyword: \'' + ('dependencies') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { property: \'' + (it.util.escapeQuotes($property)) + '\', missingProperty: \'' + ($missingProperty) + '\', depsCount: ' + ($deps.length) + ', deps: \'' + (it.util.escapeQuotes($deps.length == 1 ? $deps[0] : $deps.join(", "))) + '\' } ';
	              if (it.opts.messages !== false) {
	                out += ' , message: \'should have ';
	                if ($deps.length == 1) {
	                  out += 'property ' + (it.util.escapeQuotes($deps[0]));
	                } else {
	                  out += 'properties ' + (it.util.escapeQuotes($deps.join(", ")));
	                }
	                out += ' when property ' + (it.util.escapeQuotes($property)) + ' is present\' ';
	              }
	              if (it.opts.verbose) {
	                out += ' , schema: validate.schema' + ($schemaPath) + ' , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
	              }
	              out += ' } ';
	            } else {
	              out += ' {} ';
	            }
	            out += ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; } ';
	          }
	        }
	      }
	      out += ' }   ';
	      if ($breakOnError) {
	        $closingBraces += '}';
	        out += ' else { ';
	      }
	    }
	  }
	  it.errorPath = $currentErrorPath;
	  var $currentBaseId = $it.baseId;
	  for (var $property in $schemaDeps) {
	    var $sch = $schemaDeps[$property];
	    if ((it.opts.strictKeywords ? (typeof $sch == 'object' && Object.keys($sch).length > 0) || $sch === false : it.util.schemaHasRules($sch, it.RULES.all))) {
	      out += ' ' + ($nextValid) + ' = true; if ( ' + ($data) + (it.util.getProperty($property)) + ' !== undefined ';
	      if ($ownProperties) {
	        out += ' && Object.prototype.hasOwnProperty.call(' + ($data) + ', \'' + (it.util.escapeQuotes($property)) + '\') ';
	      }
	      out += ') { ';
	      $it.schema = $sch;
	      $it.schemaPath = $schemaPath + it.util.getProperty($property);
	      $it.errSchemaPath = $errSchemaPath + '/' + it.util.escapeFragment($property);
	      out += '  ' + (it.validate($it)) + ' ';
	      $it.baseId = $currentBaseId;
	      out += ' }  ';
	      if ($breakOnError) {
	        out += ' if (' + ($nextValid) + ') { ';
	        $closingBraces += '}';
	      }
	    }
	  }
	  if ($breakOnError) {
	    out += '   ' + ($closingBraces) + ' if (' + ($errs) + ' == errors) {';
	  }
	  return out;
	};

	var _enum = function generate_enum(it, $keyword, $ruleType) {
	  var out = ' ';
	  var $lvl = it.level;
	  var $dataLvl = it.dataLevel;
	  var $schema = it.schema[$keyword];
	  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
	  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
	  var $breakOnError = !it.opts.allErrors;
	  var $data = 'data' + ($dataLvl || '');
	  var $valid = 'valid' + $lvl;
	  var $isData = it.opts.$data && $schema && $schema.$data;
	  if ($isData) {
	    out += ' var schema' + ($lvl) + ' = ' + (it.util.getData($schema.$data, $dataLvl, it.dataPathArr)) + '; ';
	  }
	  var $i = 'i' + $lvl,
	    $vSchema = 'schema' + $lvl;
	  if (!$isData) {
	    out += ' var ' + ($vSchema) + ' = validate.schema' + ($schemaPath) + ';';
	  }
	  out += 'var ' + ($valid) + ';';
	  if ($isData) {
	    out += ' if (schema' + ($lvl) + ' === undefined) ' + ($valid) + ' = true; else if (!Array.isArray(schema' + ($lvl) + ')) ' + ($valid) + ' = false; else {';
	  }
	  out += '' + ($valid) + ' = false;for (var ' + ($i) + '=0; ' + ($i) + '<' + ($vSchema) + '.length; ' + ($i) + '++) if (equal(' + ($data) + ', ' + ($vSchema) + '[' + ($i) + '])) { ' + ($valid) + ' = true; break; }';
	  if ($isData) {
	    out += '  }  ';
	  }
	  out += ' if (!' + ($valid) + ') {   ';
	  var $$outStack = $$outStack || [];
	  $$outStack.push(out);
	  out = ''; /* istanbul ignore else */
	  if (it.createErrors !== false) {
	    out += ' { keyword: \'' + ('enum') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { allowedValues: schema' + ($lvl) + ' } ';
	    if (it.opts.messages !== false) {
	      out += ' , message: \'should be equal to one of the allowed values\' ';
	    }
	    if (it.opts.verbose) {
	      out += ' , schema: validate.schema' + ($schemaPath) + ' , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
	    }
	    out += ' } ';
	  } else {
	    out += ' {} ';
	  }
	  var __err = out;
	  out = $$outStack.pop();
	  if (!it.compositeRule && $breakOnError) {
	    /* istanbul ignore if */
	    if (it.async) {
	      out += ' throw new ValidationError([' + (__err) + ']); ';
	    } else {
	      out += ' validate.errors = [' + (__err) + ']; return false; ';
	    }
	  } else {
	    out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
	  }
	  out += ' }';
	  if ($breakOnError) {
	    out += ' else { ';
	  }
	  return out;
	};

	var format = function generate_format(it, $keyword, $ruleType) {
	  var out = ' ';
	  var $lvl = it.level;
	  var $dataLvl = it.dataLevel;
	  var $schema = it.schema[$keyword];
	  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
	  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
	  var $breakOnError = !it.opts.allErrors;
	  var $data = 'data' + ($dataLvl || '');
	  if (it.opts.format === false) {
	    if ($breakOnError) {
	      out += ' if (true) { ';
	    }
	    return out;
	  }
	  var $isData = it.opts.$data && $schema && $schema.$data,
	    $schemaValue;
	  if ($isData) {
	    out += ' var schema' + ($lvl) + ' = ' + (it.util.getData($schema.$data, $dataLvl, it.dataPathArr)) + '; ';
	    $schemaValue = 'schema' + $lvl;
	  } else {
	    $schemaValue = $schema;
	  }
	  var $unknownFormats = it.opts.unknownFormats,
	    $allowUnknown = Array.isArray($unknownFormats);
	  if ($isData) {
	    var $format = 'format' + $lvl,
	      $isObject = 'isObject' + $lvl,
	      $formatType = 'formatType' + $lvl;
	    out += ' var ' + ($format) + ' = formats[' + ($schemaValue) + ']; var ' + ($isObject) + ' = typeof ' + ($format) + ' == \'object\' && !(' + ($format) + ' instanceof RegExp) && ' + ($format) + '.validate; var ' + ($formatType) + ' = ' + ($isObject) + ' && ' + ($format) + '.type || \'string\'; if (' + ($isObject) + ') { ';
	    if (it.async) {
	      out += ' var async' + ($lvl) + ' = ' + ($format) + '.async; ';
	    }
	    out += ' ' + ($format) + ' = ' + ($format) + '.validate; } if (  ';
	    if ($isData) {
	      out += ' (' + ($schemaValue) + ' !== undefined && typeof ' + ($schemaValue) + ' != \'string\') || ';
	    }
	    out += ' (';
	    if ($unknownFormats != 'ignore') {
	      out += ' (' + ($schemaValue) + ' && !' + ($format) + ' ';
	      if ($allowUnknown) {
	        out += ' && self._opts.unknownFormats.indexOf(' + ($schemaValue) + ') == -1 ';
	      }
	      out += ') || ';
	    }
	    out += ' (' + ($format) + ' && ' + ($formatType) + ' == \'' + ($ruleType) + '\' && !(typeof ' + ($format) + ' == \'function\' ? ';
	    if (it.async) {
	      out += ' (async' + ($lvl) + ' ? await ' + ($format) + '(' + ($data) + ') : ' + ($format) + '(' + ($data) + ')) ';
	    } else {
	      out += ' ' + ($format) + '(' + ($data) + ') ';
	    }
	    out += ' : ' + ($format) + '.test(' + ($data) + '))))) {';
	  } else {
	    var $format = it.formats[$schema];
	    if (!$format) {
	      if ($unknownFormats == 'ignore') {
	        it.logger.warn('unknown format "' + $schema + '" ignored in schema at path "' + it.errSchemaPath + '"');
	        if ($breakOnError) {
	          out += ' if (true) { ';
	        }
	        return out;
	      } else if ($allowUnknown && $unknownFormats.indexOf($schema) >= 0) {
	        if ($breakOnError) {
	          out += ' if (true) { ';
	        }
	        return out;
	      } else {
	        throw new Error('unknown format "' + $schema + '" is used in schema at path "' + it.errSchemaPath + '"');
	      }
	    }
	    var $isObject = typeof $format == 'object' && !($format instanceof RegExp) && $format.validate;
	    var $formatType = $isObject && $format.type || 'string';
	    if ($isObject) {
	      var $async = $format.async === true;
	      $format = $format.validate;
	    }
	    if ($formatType != $ruleType) {
	      if ($breakOnError) {
	        out += ' if (true) { ';
	      }
	      return out;
	    }
	    if ($async) {
	      if (!it.async) throw new Error('async format in sync schema');
	      var $formatRef = 'formats' + it.util.getProperty($schema) + '.validate';
	      out += ' if (!(await ' + ($formatRef) + '(' + ($data) + '))) { ';
	    } else {
	      out += ' if (! ';
	      var $formatRef = 'formats' + it.util.getProperty($schema);
	      if ($isObject) $formatRef += '.validate';
	      if (typeof $format == 'function') {
	        out += ' ' + ($formatRef) + '(' + ($data) + ') ';
	      } else {
	        out += ' ' + ($formatRef) + '.test(' + ($data) + ') ';
	      }
	      out += ') { ';
	    }
	  }
	  var $$outStack = $$outStack || [];
	  $$outStack.push(out);
	  out = ''; /* istanbul ignore else */
	  if (it.createErrors !== false) {
	    out += ' { keyword: \'' + ('format') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { format:  ';
	    if ($isData) {
	      out += '' + ($schemaValue);
	    } else {
	      out += '' + (it.util.toQuotedString($schema));
	    }
	    out += '  } ';
	    if (it.opts.messages !== false) {
	      out += ' , message: \'should match format "';
	      if ($isData) {
	        out += '\' + ' + ($schemaValue) + ' + \'';
	      } else {
	        out += '' + (it.util.escapeQuotes($schema));
	      }
	      out += '"\' ';
	    }
	    if (it.opts.verbose) {
	      out += ' , schema:  ';
	      if ($isData) {
	        out += 'validate.schema' + ($schemaPath);
	      } else {
	        out += '' + (it.util.toQuotedString($schema));
	      }
	      out += '         , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
	    }
	    out += ' } ';
	  } else {
	    out += ' {} ';
	  }
	  var __err = out;
	  out = $$outStack.pop();
	  if (!it.compositeRule && $breakOnError) {
	    /* istanbul ignore if */
	    if (it.async) {
	      out += ' throw new ValidationError([' + (__err) + ']); ';
	    } else {
	      out += ' validate.errors = [' + (__err) + ']; return false; ';
	    }
	  } else {
	    out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
	  }
	  out += ' } ';
	  if ($breakOnError) {
	    out += ' else { ';
	  }
	  return out;
	};

	var _if = function generate_if(it, $keyword, $ruleType) {
	  var out = ' ';
	  var $lvl = it.level;
	  var $dataLvl = it.dataLevel;
	  var $schema = it.schema[$keyword];
	  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
	  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
	  var $breakOnError = !it.opts.allErrors;
	  var $data = 'data' + ($dataLvl || '');
	  var $valid = 'valid' + $lvl;
	  var $errs = 'errs__' + $lvl;
	  var $it = it.util.copy(it);
	  $it.level++;
	  var $nextValid = 'valid' + $it.level;
	  var $thenSch = it.schema['then'],
	    $elseSch = it.schema['else'],
	    $thenPresent = $thenSch !== undefined && (it.opts.strictKeywords ? (typeof $thenSch == 'object' && Object.keys($thenSch).length > 0) || $thenSch === false : it.util.schemaHasRules($thenSch, it.RULES.all)),
	    $elsePresent = $elseSch !== undefined && (it.opts.strictKeywords ? (typeof $elseSch == 'object' && Object.keys($elseSch).length > 0) || $elseSch === false : it.util.schemaHasRules($elseSch, it.RULES.all)),
	    $currentBaseId = $it.baseId;
	  if ($thenPresent || $elsePresent) {
	    var $ifClause;
	    $it.createErrors = false;
	    $it.schema = $schema;
	    $it.schemaPath = $schemaPath;
	    $it.errSchemaPath = $errSchemaPath;
	    out += ' var ' + ($errs) + ' = errors; var ' + ($valid) + ' = true;  ';
	    var $wasComposite = it.compositeRule;
	    it.compositeRule = $it.compositeRule = true;
	    out += '  ' + (it.validate($it)) + ' ';
	    $it.baseId = $currentBaseId;
	    $it.createErrors = true;
	    out += '  errors = ' + ($errs) + '; if (vErrors !== null) { if (' + ($errs) + ') vErrors.length = ' + ($errs) + '; else vErrors = null; }  ';
	    it.compositeRule = $it.compositeRule = $wasComposite;
	    if ($thenPresent) {
	      out += ' if (' + ($nextValid) + ') {  ';
	      $it.schema = it.schema['then'];
	      $it.schemaPath = it.schemaPath + '.then';
	      $it.errSchemaPath = it.errSchemaPath + '/then';
	      out += '  ' + (it.validate($it)) + ' ';
	      $it.baseId = $currentBaseId;
	      out += ' ' + ($valid) + ' = ' + ($nextValid) + '; ';
	      if ($thenPresent && $elsePresent) {
	        $ifClause = 'ifClause' + $lvl;
	        out += ' var ' + ($ifClause) + ' = \'then\'; ';
	      } else {
	        $ifClause = '\'then\'';
	      }
	      out += ' } ';
	      if ($elsePresent) {
	        out += ' else { ';
	      }
	    } else {
	      out += ' if (!' + ($nextValid) + ') { ';
	    }
	    if ($elsePresent) {
	      $it.schema = it.schema['else'];
	      $it.schemaPath = it.schemaPath + '.else';
	      $it.errSchemaPath = it.errSchemaPath + '/else';
	      out += '  ' + (it.validate($it)) + ' ';
	      $it.baseId = $currentBaseId;
	      out += ' ' + ($valid) + ' = ' + ($nextValid) + '; ';
	      if ($thenPresent && $elsePresent) {
	        $ifClause = 'ifClause' + $lvl;
	        out += ' var ' + ($ifClause) + ' = \'else\'; ';
	      } else {
	        $ifClause = '\'else\'';
	      }
	      out += ' } ';
	    }
	    out += ' if (!' + ($valid) + ') {   var err =   '; /* istanbul ignore else */
	    if (it.createErrors !== false) {
	      out += ' { keyword: \'' + ('if') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { failingKeyword: ' + ($ifClause) + ' } ';
	      if (it.opts.messages !== false) {
	        out += ' , message: \'should match "\' + ' + ($ifClause) + ' + \'" schema\' ';
	      }
	      if (it.opts.verbose) {
	        out += ' , schema: validate.schema' + ($schemaPath) + ' , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
	      }
	      out += ' } ';
	    } else {
	      out += ' {} ';
	    }
	    out += ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
	    if (!it.compositeRule && $breakOnError) {
	      /* istanbul ignore if */
	      if (it.async) {
	        out += ' throw new ValidationError(vErrors); ';
	      } else {
	        out += ' validate.errors = vErrors; return false; ';
	      }
	    }
	    out += ' }   ';
	    if ($breakOnError) {
	      out += ' else { ';
	    }
	  } else {
	    if ($breakOnError) {
	      out += ' if (true) { ';
	    }
	  }
	  return out;
	};

	var items = function generate_items(it, $keyword, $ruleType) {
	  var out = ' ';
	  var $lvl = it.level;
	  var $dataLvl = it.dataLevel;
	  var $schema = it.schema[$keyword];
	  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
	  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
	  var $breakOnError = !it.opts.allErrors;
	  var $data = 'data' + ($dataLvl || '');
	  var $valid = 'valid' + $lvl;
	  var $errs = 'errs__' + $lvl;
	  var $it = it.util.copy(it);
	  var $closingBraces = '';
	  $it.level++;
	  var $nextValid = 'valid' + $it.level;
	  var $idx = 'i' + $lvl,
	    $dataNxt = $it.dataLevel = it.dataLevel + 1,
	    $nextData = 'data' + $dataNxt,
	    $currentBaseId = it.baseId;
	  out += 'var ' + ($errs) + ' = errors;var ' + ($valid) + ';';
	  if (Array.isArray($schema)) {
	    var $additionalItems = it.schema.additionalItems;
	    if ($additionalItems === false) {
	      out += ' ' + ($valid) + ' = ' + ($data) + '.length <= ' + ($schema.length) + '; ';
	      var $currErrSchemaPath = $errSchemaPath;
	      $errSchemaPath = it.errSchemaPath + '/additionalItems';
	      out += '  if (!' + ($valid) + ') {   ';
	      var $$outStack = $$outStack || [];
	      $$outStack.push(out);
	      out = ''; /* istanbul ignore else */
	      if (it.createErrors !== false) {
	        out += ' { keyword: \'' + ('additionalItems') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { limit: ' + ($schema.length) + ' } ';
	        if (it.opts.messages !== false) {
	          out += ' , message: \'should NOT have more than ' + ($schema.length) + ' items\' ';
	        }
	        if (it.opts.verbose) {
	          out += ' , schema: false , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
	        }
	        out += ' } ';
	      } else {
	        out += ' {} ';
	      }
	      var __err = out;
	      out = $$outStack.pop();
	      if (!it.compositeRule && $breakOnError) {
	        /* istanbul ignore if */
	        if (it.async) {
	          out += ' throw new ValidationError([' + (__err) + ']); ';
	        } else {
	          out += ' validate.errors = [' + (__err) + ']; return false; ';
	        }
	      } else {
	        out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
	      }
	      out += ' } ';
	      $errSchemaPath = $currErrSchemaPath;
	      if ($breakOnError) {
	        $closingBraces += '}';
	        out += ' else { ';
	      }
	    }
	    var arr1 = $schema;
	    if (arr1) {
	      var $sch, $i = -1,
	        l1 = arr1.length - 1;
	      while ($i < l1) {
	        $sch = arr1[$i += 1];
	        if ((it.opts.strictKeywords ? (typeof $sch == 'object' && Object.keys($sch).length > 0) || $sch === false : it.util.schemaHasRules($sch, it.RULES.all))) {
	          out += ' ' + ($nextValid) + ' = true; if (' + ($data) + '.length > ' + ($i) + ') { ';
	          var $passData = $data + '[' + $i + ']';
	          $it.schema = $sch;
	          $it.schemaPath = $schemaPath + '[' + $i + ']';
	          $it.errSchemaPath = $errSchemaPath + '/' + $i;
	          $it.errorPath = it.util.getPathExpr(it.errorPath, $i, it.opts.jsonPointers, true);
	          $it.dataPathArr[$dataNxt] = $i;
	          var $code = it.validate($it);
	          $it.baseId = $currentBaseId;
	          if (it.util.varOccurences($code, $nextData) < 2) {
	            out += ' ' + (it.util.varReplace($code, $nextData, $passData)) + ' ';
	          } else {
	            out += ' var ' + ($nextData) + ' = ' + ($passData) + '; ' + ($code) + ' ';
	          }
	          out += ' }  ';
	          if ($breakOnError) {
	            out += ' if (' + ($nextValid) + ') { ';
	            $closingBraces += '}';
	          }
	        }
	      }
	    }
	    if (typeof $additionalItems == 'object' && (it.opts.strictKeywords ? (typeof $additionalItems == 'object' && Object.keys($additionalItems).length > 0) || $additionalItems === false : it.util.schemaHasRules($additionalItems, it.RULES.all))) {
	      $it.schema = $additionalItems;
	      $it.schemaPath = it.schemaPath + '.additionalItems';
	      $it.errSchemaPath = it.errSchemaPath + '/additionalItems';
	      out += ' ' + ($nextValid) + ' = true; if (' + ($data) + '.length > ' + ($schema.length) + ') {  for (var ' + ($idx) + ' = ' + ($schema.length) + '; ' + ($idx) + ' < ' + ($data) + '.length; ' + ($idx) + '++) { ';
	      $it.errorPath = it.util.getPathExpr(it.errorPath, $idx, it.opts.jsonPointers, true);
	      var $passData = $data + '[' + $idx + ']';
	      $it.dataPathArr[$dataNxt] = $idx;
	      var $code = it.validate($it);
	      $it.baseId = $currentBaseId;
	      if (it.util.varOccurences($code, $nextData) < 2) {
	        out += ' ' + (it.util.varReplace($code, $nextData, $passData)) + ' ';
	      } else {
	        out += ' var ' + ($nextData) + ' = ' + ($passData) + '; ' + ($code) + ' ';
	      }
	      if ($breakOnError) {
	        out += ' if (!' + ($nextValid) + ') break; ';
	      }
	      out += ' } }  ';
	      if ($breakOnError) {
	        out += ' if (' + ($nextValid) + ') { ';
	        $closingBraces += '}';
	      }
	    }
	  } else if ((it.opts.strictKeywords ? (typeof $schema == 'object' && Object.keys($schema).length > 0) || $schema === false : it.util.schemaHasRules($schema, it.RULES.all))) {
	    $it.schema = $schema;
	    $it.schemaPath = $schemaPath;
	    $it.errSchemaPath = $errSchemaPath;
	    out += '  for (var ' + ($idx) + ' = ' + (0) + '; ' + ($idx) + ' < ' + ($data) + '.length; ' + ($idx) + '++) { ';
	    $it.errorPath = it.util.getPathExpr(it.errorPath, $idx, it.opts.jsonPointers, true);
	    var $passData = $data + '[' + $idx + ']';
	    $it.dataPathArr[$dataNxt] = $idx;
	    var $code = it.validate($it);
	    $it.baseId = $currentBaseId;
	    if (it.util.varOccurences($code, $nextData) < 2) {
	      out += ' ' + (it.util.varReplace($code, $nextData, $passData)) + ' ';
	    } else {
	      out += ' var ' + ($nextData) + ' = ' + ($passData) + '; ' + ($code) + ' ';
	    }
	    if ($breakOnError) {
	      out += ' if (!' + ($nextValid) + ') break; ';
	    }
	    out += ' }';
	  }
	  if ($breakOnError) {
	    out += ' ' + ($closingBraces) + ' if (' + ($errs) + ' == errors) {';
	  }
	  return out;
	};

	var _limit = function generate__limit(it, $keyword, $ruleType) {
	  var out = ' ';
	  var $lvl = it.level;
	  var $dataLvl = it.dataLevel;
	  var $schema = it.schema[$keyword];
	  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
	  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
	  var $breakOnError = !it.opts.allErrors;
	  var $errorKeyword;
	  var $data = 'data' + ($dataLvl || '');
	  var $isData = it.opts.$data && $schema && $schema.$data,
	    $schemaValue;
	  if ($isData) {
	    out += ' var schema' + ($lvl) + ' = ' + (it.util.getData($schema.$data, $dataLvl, it.dataPathArr)) + '; ';
	    $schemaValue = 'schema' + $lvl;
	  } else {
	    $schemaValue = $schema;
	  }
	  var $isMax = $keyword == 'maximum',
	    $exclusiveKeyword = $isMax ? 'exclusiveMaximum' : 'exclusiveMinimum',
	    $schemaExcl = it.schema[$exclusiveKeyword],
	    $isDataExcl = it.opts.$data && $schemaExcl && $schemaExcl.$data,
	    $op = $isMax ? '<' : '>',
	    $notOp = $isMax ? '>' : '<',
	    $errorKeyword = undefined;
	  if (!($isData || typeof $schema == 'number' || $schema === undefined)) {
	    throw new Error($keyword + ' must be number');
	  }
	  if (!($isDataExcl || $schemaExcl === undefined || typeof $schemaExcl == 'number' || typeof $schemaExcl == 'boolean')) {
	    throw new Error($exclusiveKeyword + ' must be number or boolean');
	  }
	  if ($isDataExcl) {
	    var $schemaValueExcl = it.util.getData($schemaExcl.$data, $dataLvl, it.dataPathArr),
	      $exclusive = 'exclusive' + $lvl,
	      $exclType = 'exclType' + $lvl,
	      $exclIsNumber = 'exclIsNumber' + $lvl,
	      $opExpr = 'op' + $lvl,
	      $opStr = '\' + ' + $opExpr + ' + \'';
	    out += ' var schemaExcl' + ($lvl) + ' = ' + ($schemaValueExcl) + '; ';
	    $schemaValueExcl = 'schemaExcl' + $lvl;
	    out += ' var ' + ($exclusive) + '; var ' + ($exclType) + ' = typeof ' + ($schemaValueExcl) + '; if (' + ($exclType) + ' != \'boolean\' && ' + ($exclType) + ' != \'undefined\' && ' + ($exclType) + ' != \'number\') { ';
	    var $errorKeyword = $exclusiveKeyword;
	    var $$outStack = $$outStack || [];
	    $$outStack.push(out);
	    out = ''; /* istanbul ignore else */
	    if (it.createErrors !== false) {
	      out += ' { keyword: \'' + ($errorKeyword || '_exclusiveLimit') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: {} ';
	      if (it.opts.messages !== false) {
	        out += ' , message: \'' + ($exclusiveKeyword) + ' should be boolean\' ';
	      }
	      if (it.opts.verbose) {
	        out += ' , schema: validate.schema' + ($schemaPath) + ' , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
	      }
	      out += ' } ';
	    } else {
	      out += ' {} ';
	    }
	    var __err = out;
	    out = $$outStack.pop();
	    if (!it.compositeRule && $breakOnError) {
	      /* istanbul ignore if */
	      if (it.async) {
	        out += ' throw new ValidationError([' + (__err) + ']); ';
	      } else {
	        out += ' validate.errors = [' + (__err) + ']; return false; ';
	      }
	    } else {
	      out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
	    }
	    out += ' } else if ( ';
	    if ($isData) {
	      out += ' (' + ($schemaValue) + ' !== undefined && typeof ' + ($schemaValue) + ' != \'number\') || ';
	    }
	    out += ' ' + ($exclType) + ' == \'number\' ? ( (' + ($exclusive) + ' = ' + ($schemaValue) + ' === undefined || ' + ($schemaValueExcl) + ' ' + ($op) + '= ' + ($schemaValue) + ') ? ' + ($data) + ' ' + ($notOp) + '= ' + ($schemaValueExcl) + ' : ' + ($data) + ' ' + ($notOp) + ' ' + ($schemaValue) + ' ) : ( (' + ($exclusive) + ' = ' + ($schemaValueExcl) + ' === true) ? ' + ($data) + ' ' + ($notOp) + '= ' + ($schemaValue) + ' : ' + ($data) + ' ' + ($notOp) + ' ' + ($schemaValue) + ' ) || ' + ($data) + ' !== ' + ($data) + ') { var op' + ($lvl) + ' = ' + ($exclusive) + ' ? \'' + ($op) + '\' : \'' + ($op) + '=\'; ';
	    if ($schema === undefined) {
	      $errorKeyword = $exclusiveKeyword;
	      $errSchemaPath = it.errSchemaPath + '/' + $exclusiveKeyword;
	      $schemaValue = $schemaValueExcl;
	      $isData = $isDataExcl;
	    }
	  } else {
	    var $exclIsNumber = typeof $schemaExcl == 'number',
	      $opStr = $op;
	    if ($exclIsNumber && $isData) {
	      var $opExpr = '\'' + $opStr + '\'';
	      out += ' if ( ';
	      if ($isData) {
	        out += ' (' + ($schemaValue) + ' !== undefined && typeof ' + ($schemaValue) + ' != \'number\') || ';
	      }
	      out += ' ( ' + ($schemaValue) + ' === undefined || ' + ($schemaExcl) + ' ' + ($op) + '= ' + ($schemaValue) + ' ? ' + ($data) + ' ' + ($notOp) + '= ' + ($schemaExcl) + ' : ' + ($data) + ' ' + ($notOp) + ' ' + ($schemaValue) + ' ) || ' + ($data) + ' !== ' + ($data) + ') { ';
	    } else {
	      if ($exclIsNumber && $schema === undefined) {
	        $exclusive = true;
	        $errorKeyword = $exclusiveKeyword;
	        $errSchemaPath = it.errSchemaPath + '/' + $exclusiveKeyword;
	        $schemaValue = $schemaExcl;
	        $notOp += '=';
	      } else {
	        if ($exclIsNumber) $schemaValue = Math[$isMax ? 'min' : 'max']($schemaExcl, $schema);
	        if ($schemaExcl === ($exclIsNumber ? $schemaValue : true)) {
	          $exclusive = true;
	          $errorKeyword = $exclusiveKeyword;
	          $errSchemaPath = it.errSchemaPath + '/' + $exclusiveKeyword;
	          $notOp += '=';
	        } else {
	          $exclusive = false;
	          $opStr += '=';
	        }
	      }
	      var $opExpr = '\'' + $opStr + '\'';
	      out += ' if ( ';
	      if ($isData) {
	        out += ' (' + ($schemaValue) + ' !== undefined && typeof ' + ($schemaValue) + ' != \'number\') || ';
	      }
	      out += ' ' + ($data) + ' ' + ($notOp) + ' ' + ($schemaValue) + ' || ' + ($data) + ' !== ' + ($data) + ') { ';
	    }
	  }
	  $errorKeyword = $errorKeyword || $keyword;
	  var $$outStack = $$outStack || [];
	  $$outStack.push(out);
	  out = ''; /* istanbul ignore else */
	  if (it.createErrors !== false) {
	    out += ' { keyword: \'' + ($errorKeyword || '_limit') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { comparison: ' + ($opExpr) + ', limit: ' + ($schemaValue) + ', exclusive: ' + ($exclusive) + ' } ';
	    if (it.opts.messages !== false) {
	      out += ' , message: \'should be ' + ($opStr) + ' ';
	      if ($isData) {
	        out += '\' + ' + ($schemaValue);
	      } else {
	        out += '' + ($schemaValue) + '\'';
	      }
	    }
	    if (it.opts.verbose) {
	      out += ' , schema:  ';
	      if ($isData) {
	        out += 'validate.schema' + ($schemaPath);
	      } else {
	        out += '' + ($schema);
	      }
	      out += '         , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
	    }
	    out += ' } ';
	  } else {
	    out += ' {} ';
	  }
	  var __err = out;
	  out = $$outStack.pop();
	  if (!it.compositeRule && $breakOnError) {
	    /* istanbul ignore if */
	    if (it.async) {
	      out += ' throw new ValidationError([' + (__err) + ']); ';
	    } else {
	      out += ' validate.errors = [' + (__err) + ']; return false; ';
	    }
	  } else {
	    out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
	  }
	  out += ' } ';
	  if ($breakOnError) {
	    out += ' else { ';
	  }
	  return out;
	};

	var _limitItems = function generate__limitItems(it, $keyword, $ruleType) {
	  var out = ' ';
	  var $lvl = it.level;
	  var $dataLvl = it.dataLevel;
	  var $schema = it.schema[$keyword];
	  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
	  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
	  var $breakOnError = !it.opts.allErrors;
	  var $errorKeyword;
	  var $data = 'data' + ($dataLvl || '');
	  var $isData = it.opts.$data && $schema && $schema.$data,
	    $schemaValue;
	  if ($isData) {
	    out += ' var schema' + ($lvl) + ' = ' + (it.util.getData($schema.$data, $dataLvl, it.dataPathArr)) + '; ';
	    $schemaValue = 'schema' + $lvl;
	  } else {
	    $schemaValue = $schema;
	  }
	  if (!($isData || typeof $schema == 'number')) {
	    throw new Error($keyword + ' must be number');
	  }
	  var $op = $keyword == 'maxItems' ? '>' : '<';
	  out += 'if ( ';
	  if ($isData) {
	    out += ' (' + ($schemaValue) + ' !== undefined && typeof ' + ($schemaValue) + ' != \'number\') || ';
	  }
	  out += ' ' + ($data) + '.length ' + ($op) + ' ' + ($schemaValue) + ') { ';
	  var $errorKeyword = $keyword;
	  var $$outStack = $$outStack || [];
	  $$outStack.push(out);
	  out = ''; /* istanbul ignore else */
	  if (it.createErrors !== false) {
	    out += ' { keyword: \'' + ($errorKeyword || '_limitItems') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { limit: ' + ($schemaValue) + ' } ';
	    if (it.opts.messages !== false) {
	      out += ' , message: \'should NOT have ';
	      if ($keyword == 'maxItems') {
	        out += 'more';
	      } else {
	        out += 'fewer';
	      }
	      out += ' than ';
	      if ($isData) {
	        out += '\' + ' + ($schemaValue) + ' + \'';
	      } else {
	        out += '' + ($schema);
	      }
	      out += ' items\' ';
	    }
	    if (it.opts.verbose) {
	      out += ' , schema:  ';
	      if ($isData) {
	        out += 'validate.schema' + ($schemaPath);
	      } else {
	        out += '' + ($schema);
	      }
	      out += '         , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
	    }
	    out += ' } ';
	  } else {
	    out += ' {} ';
	  }
	  var __err = out;
	  out = $$outStack.pop();
	  if (!it.compositeRule && $breakOnError) {
	    /* istanbul ignore if */
	    if (it.async) {
	      out += ' throw new ValidationError([' + (__err) + ']); ';
	    } else {
	      out += ' validate.errors = [' + (__err) + ']; return false; ';
	    }
	  } else {
	    out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
	  }
	  out += '} ';
	  if ($breakOnError) {
	    out += ' else { ';
	  }
	  return out;
	};

	var _limitLength = function generate__limitLength(it, $keyword, $ruleType) {
	  var out = ' ';
	  var $lvl = it.level;
	  var $dataLvl = it.dataLevel;
	  var $schema = it.schema[$keyword];
	  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
	  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
	  var $breakOnError = !it.opts.allErrors;
	  var $errorKeyword;
	  var $data = 'data' + ($dataLvl || '');
	  var $isData = it.opts.$data && $schema && $schema.$data,
	    $schemaValue;
	  if ($isData) {
	    out += ' var schema' + ($lvl) + ' = ' + (it.util.getData($schema.$data, $dataLvl, it.dataPathArr)) + '; ';
	    $schemaValue = 'schema' + $lvl;
	  } else {
	    $schemaValue = $schema;
	  }
	  if (!($isData || typeof $schema == 'number')) {
	    throw new Error($keyword + ' must be number');
	  }
	  var $op = $keyword == 'maxLength' ? '>' : '<';
	  out += 'if ( ';
	  if ($isData) {
	    out += ' (' + ($schemaValue) + ' !== undefined && typeof ' + ($schemaValue) + ' != \'number\') || ';
	  }
	  if (it.opts.unicode === false) {
	    out += ' ' + ($data) + '.length ';
	  } else {
	    out += ' ucs2length(' + ($data) + ') ';
	  }
	  out += ' ' + ($op) + ' ' + ($schemaValue) + ') { ';
	  var $errorKeyword = $keyword;
	  var $$outStack = $$outStack || [];
	  $$outStack.push(out);
	  out = ''; /* istanbul ignore else */
	  if (it.createErrors !== false) {
	    out += ' { keyword: \'' + ($errorKeyword || '_limitLength') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { limit: ' + ($schemaValue) + ' } ';
	    if (it.opts.messages !== false) {
	      out += ' , message: \'should NOT be ';
	      if ($keyword == 'maxLength') {
	        out += 'longer';
	      } else {
	        out += 'shorter';
	      }
	      out += ' than ';
	      if ($isData) {
	        out += '\' + ' + ($schemaValue) + ' + \'';
	      } else {
	        out += '' + ($schema);
	      }
	      out += ' characters\' ';
	    }
	    if (it.opts.verbose) {
	      out += ' , schema:  ';
	      if ($isData) {
	        out += 'validate.schema' + ($schemaPath);
	      } else {
	        out += '' + ($schema);
	      }
	      out += '         , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
	    }
	    out += ' } ';
	  } else {
	    out += ' {} ';
	  }
	  var __err = out;
	  out = $$outStack.pop();
	  if (!it.compositeRule && $breakOnError) {
	    /* istanbul ignore if */
	    if (it.async) {
	      out += ' throw new ValidationError([' + (__err) + ']); ';
	    } else {
	      out += ' validate.errors = [' + (__err) + ']; return false; ';
	    }
	  } else {
	    out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
	  }
	  out += '} ';
	  if ($breakOnError) {
	    out += ' else { ';
	  }
	  return out;
	};

	var _limitProperties = function generate__limitProperties(it, $keyword, $ruleType) {
	  var out = ' ';
	  var $lvl = it.level;
	  var $dataLvl = it.dataLevel;
	  var $schema = it.schema[$keyword];
	  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
	  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
	  var $breakOnError = !it.opts.allErrors;
	  var $errorKeyword;
	  var $data = 'data' + ($dataLvl || '');
	  var $isData = it.opts.$data && $schema && $schema.$data,
	    $schemaValue;
	  if ($isData) {
	    out += ' var schema' + ($lvl) + ' = ' + (it.util.getData($schema.$data, $dataLvl, it.dataPathArr)) + '; ';
	    $schemaValue = 'schema' + $lvl;
	  } else {
	    $schemaValue = $schema;
	  }
	  if (!($isData || typeof $schema == 'number')) {
	    throw new Error($keyword + ' must be number');
	  }
	  var $op = $keyword == 'maxProperties' ? '>' : '<';
	  out += 'if ( ';
	  if ($isData) {
	    out += ' (' + ($schemaValue) + ' !== undefined && typeof ' + ($schemaValue) + ' != \'number\') || ';
	  }
	  out += ' Object.keys(' + ($data) + ').length ' + ($op) + ' ' + ($schemaValue) + ') { ';
	  var $errorKeyword = $keyword;
	  var $$outStack = $$outStack || [];
	  $$outStack.push(out);
	  out = ''; /* istanbul ignore else */
	  if (it.createErrors !== false) {
	    out += ' { keyword: \'' + ($errorKeyword || '_limitProperties') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { limit: ' + ($schemaValue) + ' } ';
	    if (it.opts.messages !== false) {
	      out += ' , message: \'should NOT have ';
	      if ($keyword == 'maxProperties') {
	        out += 'more';
	      } else {
	        out += 'fewer';
	      }
	      out += ' than ';
	      if ($isData) {
	        out += '\' + ' + ($schemaValue) + ' + \'';
	      } else {
	        out += '' + ($schema);
	      }
	      out += ' properties\' ';
	    }
	    if (it.opts.verbose) {
	      out += ' , schema:  ';
	      if ($isData) {
	        out += 'validate.schema' + ($schemaPath);
	      } else {
	        out += '' + ($schema);
	      }
	      out += '         , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
	    }
	    out += ' } ';
	  } else {
	    out += ' {} ';
	  }
	  var __err = out;
	  out = $$outStack.pop();
	  if (!it.compositeRule && $breakOnError) {
	    /* istanbul ignore if */
	    if (it.async) {
	      out += ' throw new ValidationError([' + (__err) + ']); ';
	    } else {
	      out += ' validate.errors = [' + (__err) + ']; return false; ';
	    }
	  } else {
	    out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
	  }
	  out += '} ';
	  if ($breakOnError) {
	    out += ' else { ';
	  }
	  return out;
	};

	var multipleOf = function generate_multipleOf(it, $keyword, $ruleType) {
	  var out = ' ';
	  var $lvl = it.level;
	  var $dataLvl = it.dataLevel;
	  var $schema = it.schema[$keyword];
	  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
	  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
	  var $breakOnError = !it.opts.allErrors;
	  var $data = 'data' + ($dataLvl || '');
	  var $isData = it.opts.$data && $schema && $schema.$data,
	    $schemaValue;
	  if ($isData) {
	    out += ' var schema' + ($lvl) + ' = ' + (it.util.getData($schema.$data, $dataLvl, it.dataPathArr)) + '; ';
	    $schemaValue = 'schema' + $lvl;
	  } else {
	    $schemaValue = $schema;
	  }
	  if (!($isData || typeof $schema == 'number')) {
	    throw new Error($keyword + ' must be number');
	  }
	  out += 'var division' + ($lvl) + ';if (';
	  if ($isData) {
	    out += ' ' + ($schemaValue) + ' !== undefined && ( typeof ' + ($schemaValue) + ' != \'number\' || ';
	  }
	  out += ' (division' + ($lvl) + ' = ' + ($data) + ' / ' + ($schemaValue) + ', ';
	  if (it.opts.multipleOfPrecision) {
	    out += ' Math.abs(Math.round(division' + ($lvl) + ') - division' + ($lvl) + ') > 1e-' + (it.opts.multipleOfPrecision) + ' ';
	  } else {
	    out += ' division' + ($lvl) + ' !== parseInt(division' + ($lvl) + ') ';
	  }
	  out += ' ) ';
	  if ($isData) {
	    out += '  )  ';
	  }
	  out += ' ) {   ';
	  var $$outStack = $$outStack || [];
	  $$outStack.push(out);
	  out = ''; /* istanbul ignore else */
	  if (it.createErrors !== false) {
	    out += ' { keyword: \'' + ('multipleOf') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { multipleOf: ' + ($schemaValue) + ' } ';
	    if (it.opts.messages !== false) {
	      out += ' , message: \'should be multiple of ';
	      if ($isData) {
	        out += '\' + ' + ($schemaValue);
	      } else {
	        out += '' + ($schemaValue) + '\'';
	      }
	    }
	    if (it.opts.verbose) {
	      out += ' , schema:  ';
	      if ($isData) {
	        out += 'validate.schema' + ($schemaPath);
	      } else {
	        out += '' + ($schema);
	      }
	      out += '         , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
	    }
	    out += ' } ';
	  } else {
	    out += ' {} ';
	  }
	  var __err = out;
	  out = $$outStack.pop();
	  if (!it.compositeRule && $breakOnError) {
	    /* istanbul ignore if */
	    if (it.async) {
	      out += ' throw new ValidationError([' + (__err) + ']); ';
	    } else {
	      out += ' validate.errors = [' + (__err) + ']; return false; ';
	    }
	  } else {
	    out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
	  }
	  out += '} ';
	  if ($breakOnError) {
	    out += ' else { ';
	  }
	  return out;
	};

	var not = function generate_not(it, $keyword, $ruleType) {
	  var out = ' ';
	  var $lvl = it.level;
	  var $dataLvl = it.dataLevel;
	  var $schema = it.schema[$keyword];
	  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
	  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
	  var $breakOnError = !it.opts.allErrors;
	  var $data = 'data' + ($dataLvl || '');
	  var $errs = 'errs__' + $lvl;
	  var $it = it.util.copy(it);
	  $it.level++;
	  var $nextValid = 'valid' + $it.level;
	  if ((it.opts.strictKeywords ? (typeof $schema == 'object' && Object.keys($schema).length > 0) || $schema === false : it.util.schemaHasRules($schema, it.RULES.all))) {
	    $it.schema = $schema;
	    $it.schemaPath = $schemaPath;
	    $it.errSchemaPath = $errSchemaPath;
	    out += ' var ' + ($errs) + ' = errors;  ';
	    var $wasComposite = it.compositeRule;
	    it.compositeRule = $it.compositeRule = true;
	    $it.createErrors = false;
	    var $allErrorsOption;
	    if ($it.opts.allErrors) {
	      $allErrorsOption = $it.opts.allErrors;
	      $it.opts.allErrors = false;
	    }
	    out += ' ' + (it.validate($it)) + ' ';
	    $it.createErrors = true;
	    if ($allErrorsOption) $it.opts.allErrors = $allErrorsOption;
	    it.compositeRule = $it.compositeRule = $wasComposite;
	    out += ' if (' + ($nextValid) + ') {   ';
	    var $$outStack = $$outStack || [];
	    $$outStack.push(out);
	    out = ''; /* istanbul ignore else */
	    if (it.createErrors !== false) {
	      out += ' { keyword: \'' + ('not') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: {} ';
	      if (it.opts.messages !== false) {
	        out += ' , message: \'should NOT be valid\' ';
	      }
	      if (it.opts.verbose) {
	        out += ' , schema: validate.schema' + ($schemaPath) + ' , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
	      }
	      out += ' } ';
	    } else {
	      out += ' {} ';
	    }
	    var __err = out;
	    out = $$outStack.pop();
	    if (!it.compositeRule && $breakOnError) {
	      /* istanbul ignore if */
	      if (it.async) {
	        out += ' throw new ValidationError([' + (__err) + ']); ';
	      } else {
	        out += ' validate.errors = [' + (__err) + ']; return false; ';
	      }
	    } else {
	      out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
	    }
	    out += ' } else {  errors = ' + ($errs) + '; if (vErrors !== null) { if (' + ($errs) + ') vErrors.length = ' + ($errs) + '; else vErrors = null; } ';
	    if (it.opts.allErrors) {
	      out += ' } ';
	    }
	  } else {
	    out += '  var err =   '; /* istanbul ignore else */
	    if (it.createErrors !== false) {
	      out += ' { keyword: \'' + ('not') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: {} ';
	      if (it.opts.messages !== false) {
	        out += ' , message: \'should NOT be valid\' ';
	      }
	      if (it.opts.verbose) {
	        out += ' , schema: validate.schema' + ($schemaPath) + ' , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
	      }
	      out += ' } ';
	    } else {
	      out += ' {} ';
	    }
	    out += ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
	    if ($breakOnError) {
	      out += ' if (false) { ';
	    }
	  }
	  return out;
	};

	var oneOf = function generate_oneOf(it, $keyword, $ruleType) {
	  var out = ' ';
	  var $lvl = it.level;
	  var $dataLvl = it.dataLevel;
	  var $schema = it.schema[$keyword];
	  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
	  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
	  var $breakOnError = !it.opts.allErrors;
	  var $data = 'data' + ($dataLvl || '');
	  var $valid = 'valid' + $lvl;
	  var $errs = 'errs__' + $lvl;
	  var $it = it.util.copy(it);
	  var $closingBraces = '';
	  $it.level++;
	  var $nextValid = 'valid' + $it.level;
	  var $currentBaseId = $it.baseId,
	    $prevValid = 'prevValid' + $lvl,
	    $passingSchemas = 'passingSchemas' + $lvl;
	  out += 'var ' + ($errs) + ' = errors , ' + ($prevValid) + ' = false , ' + ($valid) + ' = false , ' + ($passingSchemas) + ' = null; ';
	  var $wasComposite = it.compositeRule;
	  it.compositeRule = $it.compositeRule = true;
	  var arr1 = $schema;
	  if (arr1) {
	    var $sch, $i = -1,
	      l1 = arr1.length - 1;
	    while ($i < l1) {
	      $sch = arr1[$i += 1];
	      if ((it.opts.strictKeywords ? (typeof $sch == 'object' && Object.keys($sch).length > 0) || $sch === false : it.util.schemaHasRules($sch, it.RULES.all))) {
	        $it.schema = $sch;
	        $it.schemaPath = $schemaPath + '[' + $i + ']';
	        $it.errSchemaPath = $errSchemaPath + '/' + $i;
	        out += '  ' + (it.validate($it)) + ' ';
	        $it.baseId = $currentBaseId;
	      } else {
	        out += ' var ' + ($nextValid) + ' = true; ';
	      }
	      if ($i) {
	        out += ' if (' + ($nextValid) + ' && ' + ($prevValid) + ') { ' + ($valid) + ' = false; ' + ($passingSchemas) + ' = [' + ($passingSchemas) + ', ' + ($i) + ']; } else { ';
	        $closingBraces += '}';
	      }
	      out += ' if (' + ($nextValid) + ') { ' + ($valid) + ' = ' + ($prevValid) + ' = true; ' + ($passingSchemas) + ' = ' + ($i) + '; }';
	    }
	  }
	  it.compositeRule = $it.compositeRule = $wasComposite;
	  out += '' + ($closingBraces) + 'if (!' + ($valid) + ') {   var err =   '; /* istanbul ignore else */
	  if (it.createErrors !== false) {
	    out += ' { keyword: \'' + ('oneOf') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { passingSchemas: ' + ($passingSchemas) + ' } ';
	    if (it.opts.messages !== false) {
	      out += ' , message: \'should match exactly one schema in oneOf\' ';
	    }
	    if (it.opts.verbose) {
	      out += ' , schema: validate.schema' + ($schemaPath) + ' , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
	    }
	    out += ' } ';
	  } else {
	    out += ' {} ';
	  }
	  out += ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
	  if (!it.compositeRule && $breakOnError) {
	    /* istanbul ignore if */
	    if (it.async) {
	      out += ' throw new ValidationError(vErrors); ';
	    } else {
	      out += ' validate.errors = vErrors; return false; ';
	    }
	  }
	  out += '} else {  errors = ' + ($errs) + '; if (vErrors !== null) { if (' + ($errs) + ') vErrors.length = ' + ($errs) + '; else vErrors = null; }';
	  if (it.opts.allErrors) {
	    out += ' } ';
	  }
	  return out;
	};

	var pattern = function generate_pattern(it, $keyword, $ruleType) {
	  var out = ' ';
	  var $lvl = it.level;
	  var $dataLvl = it.dataLevel;
	  var $schema = it.schema[$keyword];
	  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
	  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
	  var $breakOnError = !it.opts.allErrors;
	  var $data = 'data' + ($dataLvl || '');
	  var $isData = it.opts.$data && $schema && $schema.$data,
	    $schemaValue;
	  if ($isData) {
	    out += ' var schema' + ($lvl) + ' = ' + (it.util.getData($schema.$data, $dataLvl, it.dataPathArr)) + '; ';
	    $schemaValue = 'schema' + $lvl;
	  } else {
	    $schemaValue = $schema;
	  }
	  var $regexp = $isData ? '(new RegExp(' + $schemaValue + '))' : it.usePattern($schema);
	  out += 'if ( ';
	  if ($isData) {
	    out += ' (' + ($schemaValue) + ' !== undefined && typeof ' + ($schemaValue) + ' != \'string\') || ';
	  }
	  out += ' !' + ($regexp) + '.test(' + ($data) + ') ) {   ';
	  var $$outStack = $$outStack || [];
	  $$outStack.push(out);
	  out = ''; /* istanbul ignore else */
	  if (it.createErrors !== false) {
	    out += ' { keyword: \'' + ('pattern') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { pattern:  ';
	    if ($isData) {
	      out += '' + ($schemaValue);
	    } else {
	      out += '' + (it.util.toQuotedString($schema));
	    }
	    out += '  } ';
	    if (it.opts.messages !== false) {
	      out += ' , message: \'should match pattern "';
	      if ($isData) {
	        out += '\' + ' + ($schemaValue) + ' + \'';
	      } else {
	        out += '' + (it.util.escapeQuotes($schema));
	      }
	      out += '"\' ';
	    }
	    if (it.opts.verbose) {
	      out += ' , schema:  ';
	      if ($isData) {
	        out += 'validate.schema' + ($schemaPath);
	      } else {
	        out += '' + (it.util.toQuotedString($schema));
	      }
	      out += '         , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
	    }
	    out += ' } ';
	  } else {
	    out += ' {} ';
	  }
	  var __err = out;
	  out = $$outStack.pop();
	  if (!it.compositeRule && $breakOnError) {
	    /* istanbul ignore if */
	    if (it.async) {
	      out += ' throw new ValidationError([' + (__err) + ']); ';
	    } else {
	      out += ' validate.errors = [' + (__err) + ']; return false; ';
	    }
	  } else {
	    out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
	  }
	  out += '} ';
	  if ($breakOnError) {
	    out += ' else { ';
	  }
	  return out;
	};

	var properties$2 = function generate_properties(it, $keyword, $ruleType) {
	  var out = ' ';
	  var $lvl = it.level;
	  var $dataLvl = it.dataLevel;
	  var $schema = it.schema[$keyword];
	  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
	  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
	  var $breakOnError = !it.opts.allErrors;
	  var $data = 'data' + ($dataLvl || '');
	  var $errs = 'errs__' + $lvl;
	  var $it = it.util.copy(it);
	  var $closingBraces = '';
	  $it.level++;
	  var $nextValid = 'valid' + $it.level;
	  var $key = 'key' + $lvl,
	    $idx = 'idx' + $lvl,
	    $dataNxt = $it.dataLevel = it.dataLevel + 1,
	    $nextData = 'data' + $dataNxt,
	    $dataProperties = 'dataProperties' + $lvl;
	  var $schemaKeys = Object.keys($schema || {}).filter(notProto),
	    $pProperties = it.schema.patternProperties || {},
	    $pPropertyKeys = Object.keys($pProperties).filter(notProto),
	    $aProperties = it.schema.additionalProperties,
	    $someProperties = $schemaKeys.length || $pPropertyKeys.length,
	    $noAdditional = $aProperties === false,
	    $additionalIsSchema = typeof $aProperties == 'object' && Object.keys($aProperties).length,
	    $removeAdditional = it.opts.removeAdditional,
	    $checkAdditional = $noAdditional || $additionalIsSchema || $removeAdditional,
	    $ownProperties = it.opts.ownProperties,
	    $currentBaseId = it.baseId;
	  var $required = it.schema.required;
	  if ($required && !(it.opts.$data && $required.$data) && $required.length < it.opts.loopRequired) {
	    var $requiredHash = it.util.toHash($required);
	  }

	  function notProto(p) {
	    return p !== '__proto__';
	  }
	  out += 'var ' + ($errs) + ' = errors;var ' + ($nextValid) + ' = true;';
	  if ($ownProperties) {
	    out += ' var ' + ($dataProperties) + ' = undefined;';
	  }
	  if ($checkAdditional) {
	    if ($ownProperties) {
	      out += ' ' + ($dataProperties) + ' = ' + ($dataProperties) + ' || Object.keys(' + ($data) + '); for (var ' + ($idx) + '=0; ' + ($idx) + '<' + ($dataProperties) + '.length; ' + ($idx) + '++) { var ' + ($key) + ' = ' + ($dataProperties) + '[' + ($idx) + ']; ';
	    } else {
	      out += ' for (var ' + ($key) + ' in ' + ($data) + ') { ';
	    }
	    if ($someProperties) {
	      out += ' var isAdditional' + ($lvl) + ' = !(false ';
	      if ($schemaKeys.length) {
	        if ($schemaKeys.length > 8) {
	          out += ' || validate.schema' + ($schemaPath) + '.hasOwnProperty(' + ($key) + ') ';
	        } else {
	          var arr1 = $schemaKeys;
	          if (arr1) {
	            var $propertyKey, i1 = -1,
	              l1 = arr1.length - 1;
	            while (i1 < l1) {
	              $propertyKey = arr1[i1 += 1];
	              out += ' || ' + ($key) + ' == ' + (it.util.toQuotedString($propertyKey)) + ' ';
	            }
	          }
	        }
	      }
	      if ($pPropertyKeys.length) {
	        var arr2 = $pPropertyKeys;
	        if (arr2) {
	          var $pProperty, $i = -1,
	            l2 = arr2.length - 1;
	          while ($i < l2) {
	            $pProperty = arr2[$i += 1];
	            out += ' || ' + (it.usePattern($pProperty)) + '.test(' + ($key) + ') ';
	          }
	        }
	      }
	      out += ' ); if (isAdditional' + ($lvl) + ') { ';
	    }
	    if ($removeAdditional == 'all') {
	      out += ' delete ' + ($data) + '[' + ($key) + ']; ';
	    } else {
	      var $currentErrorPath = it.errorPath;
	      var $additionalProperty = '\' + ' + $key + ' + \'';
	      if (it.opts._errorDataPathProperty) {
	        it.errorPath = it.util.getPathExpr(it.errorPath, $key, it.opts.jsonPointers);
	      }
	      if ($noAdditional) {
	        if ($removeAdditional) {
	          out += ' delete ' + ($data) + '[' + ($key) + ']; ';
	        } else {
	          out += ' ' + ($nextValid) + ' = false; ';
	          var $currErrSchemaPath = $errSchemaPath;
	          $errSchemaPath = it.errSchemaPath + '/additionalProperties';
	          var $$outStack = $$outStack || [];
	          $$outStack.push(out);
	          out = ''; /* istanbul ignore else */
	          if (it.createErrors !== false) {
	            out += ' { keyword: \'' + ('additionalProperties') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { additionalProperty: \'' + ($additionalProperty) + '\' } ';
	            if (it.opts.messages !== false) {
	              out += ' , message: \'';
	              if (it.opts._errorDataPathProperty) {
	                out += 'is an invalid additional property';
	              } else {
	                out += 'should NOT have additional properties';
	              }
	              out += '\' ';
	            }
	            if (it.opts.verbose) {
	              out += ' , schema: false , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
	            }
	            out += ' } ';
	          } else {
	            out += ' {} ';
	          }
	          var __err = out;
	          out = $$outStack.pop();
	          if (!it.compositeRule && $breakOnError) {
	            /* istanbul ignore if */
	            if (it.async) {
	              out += ' throw new ValidationError([' + (__err) + ']); ';
	            } else {
	              out += ' validate.errors = [' + (__err) + ']; return false; ';
	            }
	          } else {
	            out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
	          }
	          $errSchemaPath = $currErrSchemaPath;
	          if ($breakOnError) {
	            out += ' break; ';
	          }
	        }
	      } else if ($additionalIsSchema) {
	        if ($removeAdditional == 'failing') {
	          out += ' var ' + ($errs) + ' = errors;  ';
	          var $wasComposite = it.compositeRule;
	          it.compositeRule = $it.compositeRule = true;
	          $it.schema = $aProperties;
	          $it.schemaPath = it.schemaPath + '.additionalProperties';
	          $it.errSchemaPath = it.errSchemaPath + '/additionalProperties';
	          $it.errorPath = it.opts._errorDataPathProperty ? it.errorPath : it.util.getPathExpr(it.errorPath, $key, it.opts.jsonPointers);
	          var $passData = $data + '[' + $key + ']';
	          $it.dataPathArr[$dataNxt] = $key;
	          var $code = it.validate($it);
	          $it.baseId = $currentBaseId;
	          if (it.util.varOccurences($code, $nextData) < 2) {
	            out += ' ' + (it.util.varReplace($code, $nextData, $passData)) + ' ';
	          } else {
	            out += ' var ' + ($nextData) + ' = ' + ($passData) + '; ' + ($code) + ' ';
	          }
	          out += ' if (!' + ($nextValid) + ') { errors = ' + ($errs) + '; if (validate.errors !== null) { if (errors) validate.errors.length = errors; else validate.errors = null; } delete ' + ($data) + '[' + ($key) + ']; }  ';
	          it.compositeRule = $it.compositeRule = $wasComposite;
	        } else {
	          $it.schema = $aProperties;
	          $it.schemaPath = it.schemaPath + '.additionalProperties';
	          $it.errSchemaPath = it.errSchemaPath + '/additionalProperties';
	          $it.errorPath = it.opts._errorDataPathProperty ? it.errorPath : it.util.getPathExpr(it.errorPath, $key, it.opts.jsonPointers);
	          var $passData = $data + '[' + $key + ']';
	          $it.dataPathArr[$dataNxt] = $key;
	          var $code = it.validate($it);
	          $it.baseId = $currentBaseId;
	          if (it.util.varOccurences($code, $nextData) < 2) {
	            out += ' ' + (it.util.varReplace($code, $nextData, $passData)) + ' ';
	          } else {
	            out += ' var ' + ($nextData) + ' = ' + ($passData) + '; ' + ($code) + ' ';
	          }
	          if ($breakOnError) {
	            out += ' if (!' + ($nextValid) + ') break; ';
	          }
	        }
	      }
	      it.errorPath = $currentErrorPath;
	    }
	    if ($someProperties) {
	      out += ' } ';
	    }
	    out += ' }  ';
	    if ($breakOnError) {
	      out += ' if (' + ($nextValid) + ') { ';
	      $closingBraces += '}';
	    }
	  }
	  var $useDefaults = it.opts.useDefaults && !it.compositeRule;
	  if ($schemaKeys.length) {
	    var arr3 = $schemaKeys;
	    if (arr3) {
	      var $propertyKey, i3 = -1,
	        l3 = arr3.length - 1;
	      while (i3 < l3) {
	        $propertyKey = arr3[i3 += 1];
	        var $sch = $schema[$propertyKey];
	        if ((it.opts.strictKeywords ? (typeof $sch == 'object' && Object.keys($sch).length > 0) || $sch === false : it.util.schemaHasRules($sch, it.RULES.all))) {
	          var $prop = it.util.getProperty($propertyKey),
	            $passData = $data + $prop,
	            $hasDefault = $useDefaults && $sch.default !== undefined;
	          $it.schema = $sch;
	          $it.schemaPath = $schemaPath + $prop;
	          $it.errSchemaPath = $errSchemaPath + '/' + it.util.escapeFragment($propertyKey);
	          $it.errorPath = it.util.getPath(it.errorPath, $propertyKey, it.opts.jsonPointers);
	          $it.dataPathArr[$dataNxt] = it.util.toQuotedString($propertyKey);
	          var $code = it.validate($it);
	          $it.baseId = $currentBaseId;
	          if (it.util.varOccurences($code, $nextData) < 2) {
	            $code = it.util.varReplace($code, $nextData, $passData);
	            var $useData = $passData;
	          } else {
	            var $useData = $nextData;
	            out += ' var ' + ($nextData) + ' = ' + ($passData) + '; ';
	          }
	          if ($hasDefault) {
	            out += ' ' + ($code) + ' ';
	          } else {
	            if ($requiredHash && $requiredHash[$propertyKey]) {
	              out += ' if ( ' + ($useData) + ' === undefined ';
	              if ($ownProperties) {
	                out += ' || ! Object.prototype.hasOwnProperty.call(' + ($data) + ', \'' + (it.util.escapeQuotes($propertyKey)) + '\') ';
	              }
	              out += ') { ' + ($nextValid) + ' = false; ';
	              var $currentErrorPath = it.errorPath,
	                $currErrSchemaPath = $errSchemaPath,
	                $missingProperty = it.util.escapeQuotes($propertyKey);
	              if (it.opts._errorDataPathProperty) {
	                it.errorPath = it.util.getPath($currentErrorPath, $propertyKey, it.opts.jsonPointers);
	              }
	              $errSchemaPath = it.errSchemaPath + '/required';
	              var $$outStack = $$outStack || [];
	              $$outStack.push(out);
	              out = ''; /* istanbul ignore else */
	              if (it.createErrors !== false) {
	                out += ' { keyword: \'' + ('required') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { missingProperty: \'' + ($missingProperty) + '\' } ';
	                if (it.opts.messages !== false) {
	                  out += ' , message: \'';
	                  if (it.opts._errorDataPathProperty) {
	                    out += 'is a required property';
	                  } else {
	                    out += 'should have required property \\\'' + ($missingProperty) + '\\\'';
	                  }
	                  out += '\' ';
	                }
	                if (it.opts.verbose) {
	                  out += ' , schema: validate.schema' + ($schemaPath) + ' , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
	                }
	                out += ' } ';
	              } else {
	                out += ' {} ';
	              }
	              var __err = out;
	              out = $$outStack.pop();
	              if (!it.compositeRule && $breakOnError) {
	                /* istanbul ignore if */
	                if (it.async) {
	                  out += ' throw new ValidationError([' + (__err) + ']); ';
	                } else {
	                  out += ' validate.errors = [' + (__err) + ']; return false; ';
	                }
	              } else {
	                out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
	              }
	              $errSchemaPath = $currErrSchemaPath;
	              it.errorPath = $currentErrorPath;
	              out += ' } else { ';
	            } else {
	              if ($breakOnError) {
	                out += ' if ( ' + ($useData) + ' === undefined ';
	                if ($ownProperties) {
	                  out += ' || ! Object.prototype.hasOwnProperty.call(' + ($data) + ', \'' + (it.util.escapeQuotes($propertyKey)) + '\') ';
	                }
	                out += ') { ' + ($nextValid) + ' = true; } else { ';
	              } else {
	                out += ' if (' + ($useData) + ' !== undefined ';
	                if ($ownProperties) {
	                  out += ' &&   Object.prototype.hasOwnProperty.call(' + ($data) + ', \'' + (it.util.escapeQuotes($propertyKey)) + '\') ';
	                }
	                out += ' ) { ';
	              }
	            }
	            out += ' ' + ($code) + ' } ';
	          }
	        }
	        if ($breakOnError) {
	          out += ' if (' + ($nextValid) + ') { ';
	          $closingBraces += '}';
	        }
	      }
	    }
	  }
	  if ($pPropertyKeys.length) {
	    var arr4 = $pPropertyKeys;
	    if (arr4) {
	      var $pProperty, i4 = -1,
	        l4 = arr4.length - 1;
	      while (i4 < l4) {
	        $pProperty = arr4[i4 += 1];
	        var $sch = $pProperties[$pProperty];
	        if ((it.opts.strictKeywords ? (typeof $sch == 'object' && Object.keys($sch).length > 0) || $sch === false : it.util.schemaHasRules($sch, it.RULES.all))) {
	          $it.schema = $sch;
	          $it.schemaPath = it.schemaPath + '.patternProperties' + it.util.getProperty($pProperty);
	          $it.errSchemaPath = it.errSchemaPath + '/patternProperties/' + it.util.escapeFragment($pProperty);
	          if ($ownProperties) {
	            out += ' ' + ($dataProperties) + ' = ' + ($dataProperties) + ' || Object.keys(' + ($data) + '); for (var ' + ($idx) + '=0; ' + ($idx) + '<' + ($dataProperties) + '.length; ' + ($idx) + '++) { var ' + ($key) + ' = ' + ($dataProperties) + '[' + ($idx) + ']; ';
	          } else {
	            out += ' for (var ' + ($key) + ' in ' + ($data) + ') { ';
	          }
	          out += ' if (' + (it.usePattern($pProperty)) + '.test(' + ($key) + ')) { ';
	          $it.errorPath = it.util.getPathExpr(it.errorPath, $key, it.opts.jsonPointers);
	          var $passData = $data + '[' + $key + ']';
	          $it.dataPathArr[$dataNxt] = $key;
	          var $code = it.validate($it);
	          $it.baseId = $currentBaseId;
	          if (it.util.varOccurences($code, $nextData) < 2) {
	            out += ' ' + (it.util.varReplace($code, $nextData, $passData)) + ' ';
	          } else {
	            out += ' var ' + ($nextData) + ' = ' + ($passData) + '; ' + ($code) + ' ';
	          }
	          if ($breakOnError) {
	            out += ' if (!' + ($nextValid) + ') break; ';
	          }
	          out += ' } ';
	          if ($breakOnError) {
	            out += ' else ' + ($nextValid) + ' = true; ';
	          }
	          out += ' }  ';
	          if ($breakOnError) {
	            out += ' if (' + ($nextValid) + ') { ';
	            $closingBraces += '}';
	          }
	        }
	      }
	    }
	  }
	  if ($breakOnError) {
	    out += ' ' + ($closingBraces) + ' if (' + ($errs) + ' == errors) {';
	  }
	  return out;
	};

	var propertyNames = function generate_propertyNames(it, $keyword, $ruleType) {
	  var out = ' ';
	  var $lvl = it.level;
	  var $dataLvl = it.dataLevel;
	  var $schema = it.schema[$keyword];
	  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
	  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
	  var $breakOnError = !it.opts.allErrors;
	  var $data = 'data' + ($dataLvl || '');
	  var $errs = 'errs__' + $lvl;
	  var $it = it.util.copy(it);
	  var $closingBraces = '';
	  $it.level++;
	  var $nextValid = 'valid' + $it.level;
	  out += 'var ' + ($errs) + ' = errors;';
	  if ((it.opts.strictKeywords ? (typeof $schema == 'object' && Object.keys($schema).length > 0) || $schema === false : it.util.schemaHasRules($schema, it.RULES.all))) {
	    $it.schema = $schema;
	    $it.schemaPath = $schemaPath;
	    $it.errSchemaPath = $errSchemaPath;
	    var $key = 'key' + $lvl,
	      $idx = 'idx' + $lvl,
	      $i = 'i' + $lvl,
	      $invalidName = '\' + ' + $key + ' + \'',
	      $dataNxt = $it.dataLevel = it.dataLevel + 1,
	      $nextData = 'data' + $dataNxt,
	      $dataProperties = 'dataProperties' + $lvl,
	      $ownProperties = it.opts.ownProperties,
	      $currentBaseId = it.baseId;
	    if ($ownProperties) {
	      out += ' var ' + ($dataProperties) + ' = undefined; ';
	    }
	    if ($ownProperties) {
	      out += ' ' + ($dataProperties) + ' = ' + ($dataProperties) + ' || Object.keys(' + ($data) + '); for (var ' + ($idx) + '=0; ' + ($idx) + '<' + ($dataProperties) + '.length; ' + ($idx) + '++) { var ' + ($key) + ' = ' + ($dataProperties) + '[' + ($idx) + ']; ';
	    } else {
	      out += ' for (var ' + ($key) + ' in ' + ($data) + ') { ';
	    }
	    out += ' var startErrs' + ($lvl) + ' = errors; ';
	    var $passData = $key;
	    var $wasComposite = it.compositeRule;
	    it.compositeRule = $it.compositeRule = true;
	    var $code = it.validate($it);
	    $it.baseId = $currentBaseId;
	    if (it.util.varOccurences($code, $nextData) < 2) {
	      out += ' ' + (it.util.varReplace($code, $nextData, $passData)) + ' ';
	    } else {
	      out += ' var ' + ($nextData) + ' = ' + ($passData) + '; ' + ($code) + ' ';
	    }
	    it.compositeRule = $it.compositeRule = $wasComposite;
	    out += ' if (!' + ($nextValid) + ') { for (var ' + ($i) + '=startErrs' + ($lvl) + '; ' + ($i) + '<errors; ' + ($i) + '++) { vErrors[' + ($i) + '].propertyName = ' + ($key) + '; }   var err =   '; /* istanbul ignore else */
	    if (it.createErrors !== false) {
	      out += ' { keyword: \'' + ('propertyNames') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { propertyName: \'' + ($invalidName) + '\' } ';
	      if (it.opts.messages !== false) {
	        out += ' , message: \'property name \\\'' + ($invalidName) + '\\\' is invalid\' ';
	      }
	      if (it.opts.verbose) {
	        out += ' , schema: validate.schema' + ($schemaPath) + ' , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
	      }
	      out += ' } ';
	    } else {
	      out += ' {} ';
	    }
	    out += ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
	    if (!it.compositeRule && $breakOnError) {
	      /* istanbul ignore if */
	      if (it.async) {
	        out += ' throw new ValidationError(vErrors); ';
	      } else {
	        out += ' validate.errors = vErrors; return false; ';
	      }
	    }
	    if ($breakOnError) {
	      out += ' break; ';
	    }
	    out += ' } }';
	  }
	  if ($breakOnError) {
	    out += ' ' + ($closingBraces) + ' if (' + ($errs) + ' == errors) {';
	  }
	  return out;
	};

	var required$1 = function generate_required(it, $keyword, $ruleType) {
	  var out = ' ';
	  var $lvl = it.level;
	  var $dataLvl = it.dataLevel;
	  var $schema = it.schema[$keyword];
	  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
	  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
	  var $breakOnError = !it.opts.allErrors;
	  var $data = 'data' + ($dataLvl || '');
	  var $valid = 'valid' + $lvl;
	  var $isData = it.opts.$data && $schema && $schema.$data;
	  if ($isData) {
	    out += ' var schema' + ($lvl) + ' = ' + (it.util.getData($schema.$data, $dataLvl, it.dataPathArr)) + '; ';
	  }
	  var $vSchema = 'schema' + $lvl;
	  if (!$isData) {
	    if ($schema.length < it.opts.loopRequired && it.schema.properties && Object.keys(it.schema.properties).length) {
	      var $required = [];
	      var arr1 = $schema;
	      if (arr1) {
	        var $property, i1 = -1,
	          l1 = arr1.length - 1;
	        while (i1 < l1) {
	          $property = arr1[i1 += 1];
	          var $propertySch = it.schema.properties[$property];
	          if (!($propertySch && (it.opts.strictKeywords ? (typeof $propertySch == 'object' && Object.keys($propertySch).length > 0) || $propertySch === false : it.util.schemaHasRules($propertySch, it.RULES.all)))) {
	            $required[$required.length] = $property;
	          }
	        }
	      }
	    } else {
	      var $required = $schema;
	    }
	  }
	  if ($isData || $required.length) {
	    var $currentErrorPath = it.errorPath,
	      $loopRequired = $isData || $required.length >= it.opts.loopRequired,
	      $ownProperties = it.opts.ownProperties;
	    if ($breakOnError) {
	      out += ' var missing' + ($lvl) + '; ';
	      if ($loopRequired) {
	        if (!$isData) {
	          out += ' var ' + ($vSchema) + ' = validate.schema' + ($schemaPath) + '; ';
	        }
	        var $i = 'i' + $lvl,
	          $propertyPath = 'schema' + $lvl + '[' + $i + ']',
	          $missingProperty = '\' + ' + $propertyPath + ' + \'';
	        if (it.opts._errorDataPathProperty) {
	          it.errorPath = it.util.getPathExpr($currentErrorPath, $propertyPath, it.opts.jsonPointers);
	        }
	        out += ' var ' + ($valid) + ' = true; ';
	        if ($isData) {
	          out += ' if (schema' + ($lvl) + ' === undefined) ' + ($valid) + ' = true; else if (!Array.isArray(schema' + ($lvl) + ')) ' + ($valid) + ' = false; else {';
	        }
	        out += ' for (var ' + ($i) + ' = 0; ' + ($i) + ' < ' + ($vSchema) + '.length; ' + ($i) + '++) { ' + ($valid) + ' = ' + ($data) + '[' + ($vSchema) + '[' + ($i) + ']] !== undefined ';
	        if ($ownProperties) {
	          out += ' &&   Object.prototype.hasOwnProperty.call(' + ($data) + ', ' + ($vSchema) + '[' + ($i) + ']) ';
	        }
	        out += '; if (!' + ($valid) + ') break; } ';
	        if ($isData) {
	          out += '  }  ';
	        }
	        out += '  if (!' + ($valid) + ') {   ';
	        var $$outStack = $$outStack || [];
	        $$outStack.push(out);
	        out = ''; /* istanbul ignore else */
	        if (it.createErrors !== false) {
	          out += ' { keyword: \'' + ('required') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { missingProperty: \'' + ($missingProperty) + '\' } ';
	          if (it.opts.messages !== false) {
	            out += ' , message: \'';
	            if (it.opts._errorDataPathProperty) {
	              out += 'is a required property';
	            } else {
	              out += 'should have required property \\\'' + ($missingProperty) + '\\\'';
	            }
	            out += '\' ';
	          }
	          if (it.opts.verbose) {
	            out += ' , schema: validate.schema' + ($schemaPath) + ' , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
	          }
	          out += ' } ';
	        } else {
	          out += ' {} ';
	        }
	        var __err = out;
	        out = $$outStack.pop();
	        if (!it.compositeRule && $breakOnError) {
	          /* istanbul ignore if */
	          if (it.async) {
	            out += ' throw new ValidationError([' + (__err) + ']); ';
	          } else {
	            out += ' validate.errors = [' + (__err) + ']; return false; ';
	          }
	        } else {
	          out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
	        }
	        out += ' } else { ';
	      } else {
	        out += ' if ( ';
	        var arr2 = $required;
	        if (arr2) {
	          var $propertyKey, $i = -1,
	            l2 = arr2.length - 1;
	          while ($i < l2) {
	            $propertyKey = arr2[$i += 1];
	            if ($i) {
	              out += ' || ';
	            }
	            var $prop = it.util.getProperty($propertyKey),
	              $useData = $data + $prop;
	            out += ' ( ( ' + ($useData) + ' === undefined ';
	            if ($ownProperties) {
	              out += ' || ! Object.prototype.hasOwnProperty.call(' + ($data) + ', \'' + (it.util.escapeQuotes($propertyKey)) + '\') ';
	            }
	            out += ') && (missing' + ($lvl) + ' = ' + (it.util.toQuotedString(it.opts.jsonPointers ? $propertyKey : $prop)) + ') ) ';
	          }
	        }
	        out += ') {  ';
	        var $propertyPath = 'missing' + $lvl,
	          $missingProperty = '\' + ' + $propertyPath + ' + \'';
	        if (it.opts._errorDataPathProperty) {
	          it.errorPath = it.opts.jsonPointers ? it.util.getPathExpr($currentErrorPath, $propertyPath, true) : $currentErrorPath + ' + ' + $propertyPath;
	        }
	        var $$outStack = $$outStack || [];
	        $$outStack.push(out);
	        out = ''; /* istanbul ignore else */
	        if (it.createErrors !== false) {
	          out += ' { keyword: \'' + ('required') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { missingProperty: \'' + ($missingProperty) + '\' } ';
	          if (it.opts.messages !== false) {
	            out += ' , message: \'';
	            if (it.opts._errorDataPathProperty) {
	              out += 'is a required property';
	            } else {
	              out += 'should have required property \\\'' + ($missingProperty) + '\\\'';
	            }
	            out += '\' ';
	          }
	          if (it.opts.verbose) {
	            out += ' , schema: validate.schema' + ($schemaPath) + ' , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
	          }
	          out += ' } ';
	        } else {
	          out += ' {} ';
	        }
	        var __err = out;
	        out = $$outStack.pop();
	        if (!it.compositeRule && $breakOnError) {
	          /* istanbul ignore if */
	          if (it.async) {
	            out += ' throw new ValidationError([' + (__err) + ']); ';
	          } else {
	            out += ' validate.errors = [' + (__err) + ']; return false; ';
	          }
	        } else {
	          out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
	        }
	        out += ' } else { ';
	      }
	    } else {
	      if ($loopRequired) {
	        if (!$isData) {
	          out += ' var ' + ($vSchema) + ' = validate.schema' + ($schemaPath) + '; ';
	        }
	        var $i = 'i' + $lvl,
	          $propertyPath = 'schema' + $lvl + '[' + $i + ']',
	          $missingProperty = '\' + ' + $propertyPath + ' + \'';
	        if (it.opts._errorDataPathProperty) {
	          it.errorPath = it.util.getPathExpr($currentErrorPath, $propertyPath, it.opts.jsonPointers);
	        }
	        if ($isData) {
	          out += ' if (' + ($vSchema) + ' && !Array.isArray(' + ($vSchema) + ')) {  var err =   '; /* istanbul ignore else */
	          if (it.createErrors !== false) {
	            out += ' { keyword: \'' + ('required') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { missingProperty: \'' + ($missingProperty) + '\' } ';
	            if (it.opts.messages !== false) {
	              out += ' , message: \'';
	              if (it.opts._errorDataPathProperty) {
	                out += 'is a required property';
	              } else {
	                out += 'should have required property \\\'' + ($missingProperty) + '\\\'';
	              }
	              out += '\' ';
	            }
	            if (it.opts.verbose) {
	              out += ' , schema: validate.schema' + ($schemaPath) + ' , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
	            }
	            out += ' } ';
	          } else {
	            out += ' {} ';
	          }
	          out += ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; } else if (' + ($vSchema) + ' !== undefined) { ';
	        }
	        out += ' for (var ' + ($i) + ' = 0; ' + ($i) + ' < ' + ($vSchema) + '.length; ' + ($i) + '++) { if (' + ($data) + '[' + ($vSchema) + '[' + ($i) + ']] === undefined ';
	        if ($ownProperties) {
	          out += ' || ! Object.prototype.hasOwnProperty.call(' + ($data) + ', ' + ($vSchema) + '[' + ($i) + ']) ';
	        }
	        out += ') {  var err =   '; /* istanbul ignore else */
	        if (it.createErrors !== false) {
	          out += ' { keyword: \'' + ('required') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { missingProperty: \'' + ($missingProperty) + '\' } ';
	          if (it.opts.messages !== false) {
	            out += ' , message: \'';
	            if (it.opts._errorDataPathProperty) {
	              out += 'is a required property';
	            } else {
	              out += 'should have required property \\\'' + ($missingProperty) + '\\\'';
	            }
	            out += '\' ';
	          }
	          if (it.opts.verbose) {
	            out += ' , schema: validate.schema' + ($schemaPath) + ' , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
	          }
	          out += ' } ';
	        } else {
	          out += ' {} ';
	        }
	        out += ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; } } ';
	        if ($isData) {
	          out += '  }  ';
	        }
	      } else {
	        var arr3 = $required;
	        if (arr3) {
	          var $propertyKey, i3 = -1,
	            l3 = arr3.length - 1;
	          while (i3 < l3) {
	            $propertyKey = arr3[i3 += 1];
	            var $prop = it.util.getProperty($propertyKey),
	              $missingProperty = it.util.escapeQuotes($propertyKey),
	              $useData = $data + $prop;
	            if (it.opts._errorDataPathProperty) {
	              it.errorPath = it.util.getPath($currentErrorPath, $propertyKey, it.opts.jsonPointers);
	            }
	            out += ' if ( ' + ($useData) + ' === undefined ';
	            if ($ownProperties) {
	              out += ' || ! Object.prototype.hasOwnProperty.call(' + ($data) + ', \'' + (it.util.escapeQuotes($propertyKey)) + '\') ';
	            }
	            out += ') {  var err =   '; /* istanbul ignore else */
	            if (it.createErrors !== false) {
	              out += ' { keyword: \'' + ('required') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { missingProperty: \'' + ($missingProperty) + '\' } ';
	              if (it.opts.messages !== false) {
	                out += ' , message: \'';
	                if (it.opts._errorDataPathProperty) {
	                  out += 'is a required property';
	                } else {
	                  out += 'should have required property \\\'' + ($missingProperty) + '\\\'';
	                }
	                out += '\' ';
	              }
	              if (it.opts.verbose) {
	                out += ' , schema: validate.schema' + ($schemaPath) + ' , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
	              }
	              out += ' } ';
	            } else {
	              out += ' {} ';
	            }
	            out += ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; } ';
	          }
	        }
	      }
	    }
	    it.errorPath = $currentErrorPath;
	  } else if ($breakOnError) {
	    out += ' if (true) {';
	  }
	  return out;
	};

	var uniqueItems = function generate_uniqueItems(it, $keyword, $ruleType) {
	  var out = ' ';
	  var $lvl = it.level;
	  var $dataLvl = it.dataLevel;
	  var $schema = it.schema[$keyword];
	  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
	  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
	  var $breakOnError = !it.opts.allErrors;
	  var $data = 'data' + ($dataLvl || '');
	  var $valid = 'valid' + $lvl;
	  var $isData = it.opts.$data && $schema && $schema.$data,
	    $schemaValue;
	  if ($isData) {
	    out += ' var schema' + ($lvl) + ' = ' + (it.util.getData($schema.$data, $dataLvl, it.dataPathArr)) + '; ';
	    $schemaValue = 'schema' + $lvl;
	  } else {
	    $schemaValue = $schema;
	  }
	  if (($schema || $isData) && it.opts.uniqueItems !== false) {
	    if ($isData) {
	      out += ' var ' + ($valid) + '; if (' + ($schemaValue) + ' === false || ' + ($schemaValue) + ' === undefined) ' + ($valid) + ' = true; else if (typeof ' + ($schemaValue) + ' != \'boolean\') ' + ($valid) + ' = false; else { ';
	    }
	    out += ' var i = ' + ($data) + '.length , ' + ($valid) + ' = true , j; if (i > 1) { ';
	    var $itemType = it.schema.items && it.schema.items.type,
	      $typeIsArray = Array.isArray($itemType);
	    if (!$itemType || $itemType == 'object' || $itemType == 'array' || ($typeIsArray && ($itemType.indexOf('object') >= 0 || $itemType.indexOf('array') >= 0))) {
	      out += ' outer: for (;i--;) { for (j = i; j--;) { if (equal(' + ($data) + '[i], ' + ($data) + '[j])) { ' + ($valid) + ' = false; break outer; } } } ';
	    } else {
	      out += ' var itemIndices = {}, item; for (;i--;) { var item = ' + ($data) + '[i]; ';
	      var $method = 'checkDataType' + ($typeIsArray ? 's' : '');
	      out += ' if (' + (it.util[$method]($itemType, 'item', it.opts.strictNumbers, true)) + ') continue; ';
	      if ($typeIsArray) {
	        out += ' if (typeof item == \'string\') item = \'"\' + item; ';
	      }
	      out += ' if (typeof itemIndices[item] == \'number\') { ' + ($valid) + ' = false; j = itemIndices[item]; break; } itemIndices[item] = i; } ';
	    }
	    out += ' } ';
	    if ($isData) {
	      out += '  }  ';
	    }
	    out += ' if (!' + ($valid) + ') {   ';
	    var $$outStack = $$outStack || [];
	    $$outStack.push(out);
	    out = ''; /* istanbul ignore else */
	    if (it.createErrors !== false) {
	      out += ' { keyword: \'' + ('uniqueItems') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { i: i, j: j } ';
	      if (it.opts.messages !== false) {
	        out += ' , message: \'should NOT have duplicate items (items ## \' + j + \' and \' + i + \' are identical)\' ';
	      }
	      if (it.opts.verbose) {
	        out += ' , schema:  ';
	        if ($isData) {
	          out += 'validate.schema' + ($schemaPath);
	        } else {
	          out += '' + ($schema);
	        }
	        out += '         , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
	      }
	      out += ' } ';
	    } else {
	      out += ' {} ';
	    }
	    var __err = out;
	    out = $$outStack.pop();
	    if (!it.compositeRule && $breakOnError) {
	      /* istanbul ignore if */
	      if (it.async) {
	        out += ' throw new ValidationError([' + (__err) + ']); ';
	      } else {
	        out += ' validate.errors = [' + (__err) + ']; return false; ';
	      }
	    } else {
	      out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
	    }
	    out += ' } ';
	    if ($breakOnError) {
	      out += ' else { ';
	    }
	  } else {
	    if ($breakOnError) {
	      out += ' if (true) { ';
	    }
	  }
	  return out;
	};

	//all requires must be explicit because browserify won't work with dynamic requires
	var dotjs = {
	  '$ref': ref,
	  allOf: allOf,
	  anyOf: anyOf,
	  '$comment': comment,
	  const: _const,
	  contains: contains,
	  dependencies: dependencies,
	  'enum': _enum,
	  format: format,
	  'if': _if,
	  items: items,
	  maximum: _limit,
	  minimum: _limit,
	  maxItems: _limitItems,
	  minItems: _limitItems,
	  maxLength: _limitLength,
	  minLength: _limitLength,
	  maxProperties: _limitProperties,
	  minProperties: _limitProperties,
	  multipleOf: multipleOf,
	  not: not,
	  oneOf: oneOf,
	  pattern: pattern,
	  properties: properties$2,
	  propertyNames: propertyNames,
	  required: required$1,
	  uniqueItems: uniqueItems,
	  validate: validate$1
	};

	var toHash = util.toHash;

	var rules = function rules() {
	  var RULES = [
	    { type: 'number',
	      rules: [ { 'maximum': ['exclusiveMaximum'] },
	               { 'minimum': ['exclusiveMinimum'] }, 'multipleOf', 'format'] },
	    { type: 'string',
	      rules: [ 'maxLength', 'minLength', 'pattern', 'format' ] },
	    { type: 'array',
	      rules: [ 'maxItems', 'minItems', 'items', 'contains', 'uniqueItems' ] },
	    { type: 'object',
	      rules: [ 'maxProperties', 'minProperties', 'required', 'dependencies', 'propertyNames',
	               { 'properties': ['additionalProperties', 'patternProperties'] } ] },
	    { rules: [ '$ref', 'const', 'enum', 'not', 'anyOf', 'oneOf', 'allOf', 'if' ] }
	  ];

	  var ALL = [ 'type', '$comment' ];
	  var KEYWORDS = [
	    '$schema', '$id', 'id', '$data', '$async', 'title',
	    'description', 'default', 'definitions',
	    'examples', 'readOnly', 'writeOnly',
	    'contentMediaType', 'contentEncoding',
	    'additionalItems', 'then', 'else'
	  ];
	  var TYPES = [ 'number', 'integer', 'string', 'array', 'object', 'boolean', 'null' ];
	  RULES.all = toHash(ALL);
	  RULES.types = toHash(TYPES);

	  RULES.forEach(function (group) {
	    group.rules = group.rules.map(function (keyword) {
	      var implKeywords;
	      if (typeof keyword == 'object') {
	        var key = Object.keys(keyword)[0];
	        implKeywords = keyword[key];
	        keyword = key;
	        implKeywords.forEach(function (k) {
	          ALL.push(k);
	          RULES.all[k] = true;
	        });
	      }
	      ALL.push(keyword);
	      var rule = RULES.all[keyword] = {
	        keyword: keyword,
	        code: dotjs[keyword],
	        implements: implKeywords
	      };
	      return rule;
	    });

	    RULES.all.$comment = {
	      keyword: '$comment',
	      code: dotjs.$comment
	    };

	    if (group.type) RULES.types[group.type] = group;
	  });

	  RULES.keywords = toHash(ALL.concat(KEYWORDS));
	  RULES.custom = {};

	  return RULES;
	};

	var KEYWORDS = [
	  'multipleOf',
	  'maximum',
	  'exclusiveMaximum',
	  'minimum',
	  'exclusiveMinimum',
	  'maxLength',
	  'minLength',
	  'pattern',
	  'additionalItems',
	  'maxItems',
	  'minItems',
	  'uniqueItems',
	  'maxProperties',
	  'minProperties',
	  'required',
	  'additionalProperties',
	  'enum',
	  'format',
	  'const'
	];

	var data = function (metaSchema, keywordsJsonPointers) {
	  for (var i=0; i<keywordsJsonPointers.length; i++) {
	    metaSchema = JSON.parse(JSON.stringify(metaSchema));
	    var segments = keywordsJsonPointers[i].split('/');
	    var keywords = metaSchema;
	    var j;
	    for (j=1; j<segments.length; j++)
	      keywords = keywords[segments[j]];

	    for (j=0; j<KEYWORDS.length; j++) {
	      var key = KEYWORDS[j];
	      var schema = keywords[key];
	      if (schema) {
	        keywords[key] = {
	          anyOf: [
	            schema,
	            { $ref: 'https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#' }
	          ]
	        };
	      }
	    }
	  }

	  return metaSchema;
	};

	var MissingRefError = error_classes.MissingRef;

	var async = compileAsync;


	/**
	 * Creates validating function for passed schema with asynchronous loading of missing schemas.
	 * `loadSchema` option should be a function that accepts schema uri and returns promise that resolves with the schema.
	 * @this  Ajv
	 * @param {Object}   schema schema object
	 * @param {Boolean}  meta optional true to compile meta-schema; this parameter can be skipped
	 * @param {Function} callback an optional node-style callback, it is called with 2 parameters: error (or null) and validating function.
	 * @return {Promise} promise that resolves with a validating function.
	 */
	function compileAsync(schema, meta, callback) {
	  /* eslint no-shadow: 0 */
	  /* global Promise */
	  /* jshint validthis: true */
	  var self = this;
	  if (typeof this._opts.loadSchema != 'function')
	    throw new Error('options.loadSchema should be a function');

	  if (typeof meta == 'function') {
	    callback = meta;
	    meta = undefined;
	  }

	  var p = loadMetaSchemaOf(schema).then(function () {
	    var schemaObj = self._addSchema(schema, undefined, meta);
	    return schemaObj.validate || _compileAsync(schemaObj);
	  });

	  if (callback) {
	    p.then(
	      function(v) { callback(null, v); },
	      callback
	    );
	  }

	  return p;


	  function loadMetaSchemaOf(sch) {
	    var $schema = sch.$schema;
	    return $schema && !self.getSchema($schema)
	            ? compileAsync.call(self, { $ref: $schema }, true)
	            : Promise.resolve();
	  }


	  function _compileAsync(schemaObj) {
	    try { return self._compile(schemaObj); }
	    catch(e) {
	      if (e instanceof MissingRefError) return loadMissingSchema(e);
	      throw e;
	    }


	    function loadMissingSchema(e) {
	      var ref = e.missingSchema;
	      if (added(ref)) throw new Error('Schema ' + ref + ' is loaded but ' + e.missingRef + ' cannot be resolved');

	      var schemaPromise = self._loadingSchemas[ref];
	      if (!schemaPromise) {
	        schemaPromise = self._loadingSchemas[ref] = self._opts.loadSchema(ref);
	        schemaPromise.then(removePromise, removePromise);
	      }

	      return schemaPromise.then(function (sch) {
	        if (!added(ref)) {
	          return loadMetaSchemaOf(sch).then(function () {
	            if (!added(ref)) self.addSchema(sch, ref, undefined, meta);
	          });
	        }
	      }).then(function() {
	        return _compileAsync(schemaObj);
	      });

	      function removePromise() {
	        delete self._loadingSchemas[ref];
	      }

	      function added(ref) {
	        return self._refs[ref] || self._schemas[ref];
	      }
	    }
	  }
	}

	var custom = function generate_custom(it, $keyword, $ruleType) {
	  var out = ' ';
	  var $lvl = it.level;
	  var $dataLvl = it.dataLevel;
	  var $schema = it.schema[$keyword];
	  var $schemaPath = it.schemaPath + it.util.getProperty($keyword);
	  var $errSchemaPath = it.errSchemaPath + '/' + $keyword;
	  var $breakOnError = !it.opts.allErrors;
	  var $errorKeyword;
	  var $data = 'data' + ($dataLvl || '');
	  var $valid = 'valid' + $lvl;
	  var $errs = 'errs__' + $lvl;
	  var $isData = it.opts.$data && $schema && $schema.$data,
	    $schemaValue;
	  if ($isData) {
	    out += ' var schema' + ($lvl) + ' = ' + (it.util.getData($schema.$data, $dataLvl, it.dataPathArr)) + '; ';
	    $schemaValue = 'schema' + $lvl;
	  } else {
	    $schemaValue = $schema;
	  }
	  var $rule = this,
	    $definition = 'definition' + $lvl,
	    $rDef = $rule.definition,
	    $closingBraces = '';
	  var $compile, $inline, $macro, $ruleValidate, $validateCode;
	  if ($isData && $rDef.$data) {
	    $validateCode = 'keywordValidate' + $lvl;
	    var $validateSchema = $rDef.validateSchema;
	    out += ' var ' + ($definition) + ' = RULES.custom[\'' + ($keyword) + '\'].definition; var ' + ($validateCode) + ' = ' + ($definition) + '.validate;';
	  } else {
	    $ruleValidate = it.useCustomRule($rule, $schema, it.schema, it);
	    if (!$ruleValidate) return;
	    $schemaValue = 'validate.schema' + $schemaPath;
	    $validateCode = $ruleValidate.code;
	    $compile = $rDef.compile;
	    $inline = $rDef.inline;
	    $macro = $rDef.macro;
	  }
	  var $ruleErrs = $validateCode + '.errors',
	    $i = 'i' + $lvl,
	    $ruleErr = 'ruleErr' + $lvl,
	    $asyncKeyword = $rDef.async;
	  if ($asyncKeyword && !it.async) throw new Error('async keyword in sync schema');
	  if (!($inline || $macro)) {
	    out += '' + ($ruleErrs) + ' = null;';
	  }
	  out += 'var ' + ($errs) + ' = errors;var ' + ($valid) + ';';
	  if ($isData && $rDef.$data) {
	    $closingBraces += '}';
	    out += ' if (' + ($schemaValue) + ' === undefined) { ' + ($valid) + ' = true; } else { ';
	    if ($validateSchema) {
	      $closingBraces += '}';
	      out += ' ' + ($valid) + ' = ' + ($definition) + '.validateSchema(' + ($schemaValue) + '); if (' + ($valid) + ') { ';
	    }
	  }
	  if ($inline) {
	    if ($rDef.statements) {
	      out += ' ' + ($ruleValidate.validate) + ' ';
	    } else {
	      out += ' ' + ($valid) + ' = ' + ($ruleValidate.validate) + '; ';
	    }
	  } else if ($macro) {
	    var $it = it.util.copy(it);
	    var $closingBraces = '';
	    $it.level++;
	    var $nextValid = 'valid' + $it.level;
	    $it.schema = $ruleValidate.validate;
	    $it.schemaPath = '';
	    var $wasComposite = it.compositeRule;
	    it.compositeRule = $it.compositeRule = true;
	    var $code = it.validate($it).replace(/validate\.schema/g, $validateCode);
	    it.compositeRule = $it.compositeRule = $wasComposite;
	    out += ' ' + ($code);
	  } else {
	    var $$outStack = $$outStack || [];
	    $$outStack.push(out);
	    out = '';
	    out += '  ' + ($validateCode) + '.call( ';
	    if (it.opts.passContext) {
	      out += 'this';
	    } else {
	      out += 'self';
	    }
	    if ($compile || $rDef.schema === false) {
	      out += ' , ' + ($data) + ' ';
	    } else {
	      out += ' , ' + ($schemaValue) + ' , ' + ($data) + ' , validate.schema' + (it.schemaPath) + ' ';
	    }
	    out += ' , (dataPath || \'\')';
	    if (it.errorPath != '""') {
	      out += ' + ' + (it.errorPath);
	    }
	    var $parentData = $dataLvl ? 'data' + (($dataLvl - 1) || '') : 'parentData',
	      $parentDataProperty = $dataLvl ? it.dataPathArr[$dataLvl] : 'parentDataProperty';
	    out += ' , ' + ($parentData) + ' , ' + ($parentDataProperty) + ' , rootData )  ';
	    var def_callRuleValidate = out;
	    out = $$outStack.pop();
	    if ($rDef.errors === false) {
	      out += ' ' + ($valid) + ' = ';
	      if ($asyncKeyword) {
	        out += 'await ';
	      }
	      out += '' + (def_callRuleValidate) + '; ';
	    } else {
	      if ($asyncKeyword) {
	        $ruleErrs = 'customErrors' + $lvl;
	        out += ' var ' + ($ruleErrs) + ' = null; try { ' + ($valid) + ' = await ' + (def_callRuleValidate) + '; } catch (e) { ' + ($valid) + ' = false; if (e instanceof ValidationError) ' + ($ruleErrs) + ' = e.errors; else throw e; } ';
	      } else {
	        out += ' ' + ($ruleErrs) + ' = null; ' + ($valid) + ' = ' + (def_callRuleValidate) + '; ';
	      }
	    }
	  }
	  if ($rDef.modifying) {
	    out += ' if (' + ($parentData) + ') ' + ($data) + ' = ' + ($parentData) + '[' + ($parentDataProperty) + '];';
	  }
	  out += '' + ($closingBraces);
	  if ($rDef.valid) {
	    if ($breakOnError) {
	      out += ' if (true) { ';
	    }
	  } else {
	    out += ' if ( ';
	    if ($rDef.valid === undefined) {
	      out += ' !';
	      if ($macro) {
	        out += '' + ($nextValid);
	      } else {
	        out += '' + ($valid);
	      }
	    } else {
	      out += ' ' + (!$rDef.valid) + ' ';
	    }
	    out += ') { ';
	    $errorKeyword = $rule.keyword;
	    var $$outStack = $$outStack || [];
	    $$outStack.push(out);
	    out = '';
	    var $$outStack = $$outStack || [];
	    $$outStack.push(out);
	    out = ''; /* istanbul ignore else */
	    if (it.createErrors !== false) {
	      out += ' { keyword: \'' + ($errorKeyword || 'custom') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { keyword: \'' + ($rule.keyword) + '\' } ';
	      if (it.opts.messages !== false) {
	        out += ' , message: \'should pass "' + ($rule.keyword) + '" keyword validation\' ';
	      }
	      if (it.opts.verbose) {
	        out += ' , schema: validate.schema' + ($schemaPath) + ' , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
	      }
	      out += ' } ';
	    } else {
	      out += ' {} ';
	    }
	    var __err = out;
	    out = $$outStack.pop();
	    if (!it.compositeRule && $breakOnError) {
	      /* istanbul ignore if */
	      if (it.async) {
	        out += ' throw new ValidationError([' + (__err) + ']); ';
	      } else {
	        out += ' validate.errors = [' + (__err) + ']; return false; ';
	      }
	    } else {
	      out += ' var err = ' + (__err) + ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
	    }
	    var def_customError = out;
	    out = $$outStack.pop();
	    if ($inline) {
	      if ($rDef.errors) {
	        if ($rDef.errors != 'full') {
	          out += '  for (var ' + ($i) + '=' + ($errs) + '; ' + ($i) + '<errors; ' + ($i) + '++) { var ' + ($ruleErr) + ' = vErrors[' + ($i) + ']; if (' + ($ruleErr) + '.dataPath === undefined) ' + ($ruleErr) + '.dataPath = (dataPath || \'\') + ' + (it.errorPath) + '; if (' + ($ruleErr) + '.schemaPath === undefined) { ' + ($ruleErr) + '.schemaPath = "' + ($errSchemaPath) + '"; } ';
	          if (it.opts.verbose) {
	            out += ' ' + ($ruleErr) + '.schema = ' + ($schemaValue) + '; ' + ($ruleErr) + '.data = ' + ($data) + '; ';
	          }
	          out += ' } ';
	        }
	      } else {
	        if ($rDef.errors === false) {
	          out += ' ' + (def_customError) + ' ';
	        } else {
	          out += ' if (' + ($errs) + ' == errors) { ' + (def_customError) + ' } else {  for (var ' + ($i) + '=' + ($errs) + '; ' + ($i) + '<errors; ' + ($i) + '++) { var ' + ($ruleErr) + ' = vErrors[' + ($i) + ']; if (' + ($ruleErr) + '.dataPath === undefined) ' + ($ruleErr) + '.dataPath = (dataPath || \'\') + ' + (it.errorPath) + '; if (' + ($ruleErr) + '.schemaPath === undefined) { ' + ($ruleErr) + '.schemaPath = "' + ($errSchemaPath) + '"; } ';
	          if (it.opts.verbose) {
	            out += ' ' + ($ruleErr) + '.schema = ' + ($schemaValue) + '; ' + ($ruleErr) + '.data = ' + ($data) + '; ';
	          }
	          out += ' } } ';
	        }
	      }
	    } else if ($macro) {
	      out += '   var err =   '; /* istanbul ignore else */
	      if (it.createErrors !== false) {
	        out += ' { keyword: \'' + ($errorKeyword || 'custom') + '\' , dataPath: (dataPath || \'\') + ' + (it.errorPath) + ' , schemaPath: ' + (it.util.toQuotedString($errSchemaPath)) + ' , params: { keyword: \'' + ($rule.keyword) + '\' } ';
	        if (it.opts.messages !== false) {
	          out += ' , message: \'should pass "' + ($rule.keyword) + '" keyword validation\' ';
	        }
	        if (it.opts.verbose) {
	          out += ' , schema: validate.schema' + ($schemaPath) + ' , parentSchema: validate.schema' + (it.schemaPath) + ' , data: ' + ($data) + ' ';
	        }
	        out += ' } ';
	      } else {
	        out += ' {} ';
	      }
	      out += ';  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ';
	      if (!it.compositeRule && $breakOnError) {
	        /* istanbul ignore if */
	        if (it.async) {
	          out += ' throw new ValidationError(vErrors); ';
	        } else {
	          out += ' validate.errors = vErrors; return false; ';
	        }
	      }
	    } else {
	      if ($rDef.errors === false) {
	        out += ' ' + (def_customError) + ' ';
	      } else {
	        out += ' if (Array.isArray(' + ($ruleErrs) + ')) { if (vErrors === null) vErrors = ' + ($ruleErrs) + '; else vErrors = vErrors.concat(' + ($ruleErrs) + '); errors = vErrors.length;  for (var ' + ($i) + '=' + ($errs) + '; ' + ($i) + '<errors; ' + ($i) + '++) { var ' + ($ruleErr) + ' = vErrors[' + ($i) + ']; if (' + ($ruleErr) + '.dataPath === undefined) ' + ($ruleErr) + '.dataPath = (dataPath || \'\') + ' + (it.errorPath) + ';  ' + ($ruleErr) + '.schemaPath = "' + ($errSchemaPath) + '";  ';
	        if (it.opts.verbose) {
	          out += ' ' + ($ruleErr) + '.schema = ' + ($schemaValue) + '; ' + ($ruleErr) + '.data = ' + ($data) + '; ';
	        }
	        out += ' } } else { ' + (def_customError) + ' } ';
	      }
	    }
	    out += ' } ';
	    if ($breakOnError) {
	      out += ' else { ';
	    }
	  }
	  return out;
	};

	var $schema$1 = "http://json-schema.org/draft-07/schema#";
	var $id$1 = "http://json-schema.org/draft-07/schema#";
	var title = "Core schema meta-schema";
	var definitions = {
		schemaArray: {
			type: "array",
			minItems: 1,
			items: {
				$ref: "#"
			}
		},
		nonNegativeInteger: {
			type: "integer",
			minimum: 0
		},
		nonNegativeIntegerDefault0: {
			allOf: [
				{
					$ref: "#/definitions/nonNegativeInteger"
				},
				{
					"default": 0
				}
			]
		},
		simpleTypes: {
			"enum": [
				"array",
				"boolean",
				"integer",
				"null",
				"number",
				"object",
				"string"
			]
		},
		stringArray: {
			type: "array",
			items: {
				type: "string"
			},
			uniqueItems: true,
			"default": [
			]
		}
	};
	var type$1 = [
		"object",
		"boolean"
	];
	var properties$1 = {
		$id: {
			type: "string",
			format: "uri-reference"
		},
		$schema: {
			type: "string",
			format: "uri"
		},
		$ref: {
			type: "string",
			format: "uri-reference"
		},
		$comment: {
			type: "string"
		},
		title: {
			type: "string"
		},
		description: {
			type: "string"
		},
		"default": true,
		readOnly: {
			type: "boolean",
			"default": false
		},
		examples: {
			type: "array",
			items: true
		},
		multipleOf: {
			type: "number",
			exclusiveMinimum: 0
		},
		maximum: {
			type: "number"
		},
		exclusiveMaximum: {
			type: "number"
		},
		minimum: {
			type: "number"
		},
		exclusiveMinimum: {
			type: "number"
		},
		maxLength: {
			$ref: "#/definitions/nonNegativeInteger"
		},
		minLength: {
			$ref: "#/definitions/nonNegativeIntegerDefault0"
		},
		pattern: {
			type: "string",
			format: "regex"
		},
		additionalItems: {
			$ref: "#"
		},
		items: {
			anyOf: [
				{
					$ref: "#"
				},
				{
					$ref: "#/definitions/schemaArray"
				}
			],
			"default": true
		},
		maxItems: {
			$ref: "#/definitions/nonNegativeInteger"
		},
		minItems: {
			$ref: "#/definitions/nonNegativeIntegerDefault0"
		},
		uniqueItems: {
			type: "boolean",
			"default": false
		},
		contains: {
			$ref: "#"
		},
		maxProperties: {
			$ref: "#/definitions/nonNegativeInteger"
		},
		minProperties: {
			$ref: "#/definitions/nonNegativeIntegerDefault0"
		},
		required: {
			$ref: "#/definitions/stringArray"
		},
		additionalProperties: {
			$ref: "#"
		},
		definitions: {
			type: "object",
			additionalProperties: {
				$ref: "#"
			},
			"default": {
			}
		},
		properties: {
			type: "object",
			additionalProperties: {
				$ref: "#"
			},
			"default": {
			}
		},
		patternProperties: {
			type: "object",
			additionalProperties: {
				$ref: "#"
			},
			propertyNames: {
				format: "regex"
			},
			"default": {
			}
		},
		dependencies: {
			type: "object",
			additionalProperties: {
				anyOf: [
					{
						$ref: "#"
					},
					{
						$ref: "#/definitions/stringArray"
					}
				]
			}
		},
		propertyNames: {
			$ref: "#"
		},
		"const": true,
		"enum": {
			type: "array",
			items: true,
			minItems: 1,
			uniqueItems: true
		},
		type: {
			anyOf: [
				{
					$ref: "#/definitions/simpleTypes"
				},
				{
					type: "array",
					items: {
						$ref: "#/definitions/simpleTypes"
					},
					minItems: 1,
					uniqueItems: true
				}
			]
		},
		format: {
			type: "string"
		},
		contentMediaType: {
			type: "string"
		},
		contentEncoding: {
			type: "string"
		},
		"if": {
			$ref: "#"
		},
		then: {
			$ref: "#"
		},
		"else": {
			$ref: "#"
		},
		allOf: {
			$ref: "#/definitions/schemaArray"
		},
		anyOf: {
			$ref: "#/definitions/schemaArray"
		},
		oneOf: {
			$ref: "#/definitions/schemaArray"
		},
		not: {
			$ref: "#"
		}
	};
	var require$$2 = {
		$schema: $schema$1,
		$id: $id$1,
		title: title,
		definitions: definitions,
		type: type$1,
		properties: properties$1,
		"default": true
	};

	var definition_schema = {
	  $id: 'https://github.com/ajv-validator/ajv/blob/master/lib/definition_schema.js',
	  definitions: {
	    simpleTypes: require$$2.definitions.simpleTypes
	  },
	  type: 'object',
	  dependencies: {
	    schema: ['validate'],
	    $data: ['validate'],
	    statements: ['inline'],
	    valid: {not: {required: ['macro']}}
	  },
	  properties: {
	    type: require$$2.properties.type,
	    schema: {type: 'boolean'},
	    statements: {type: 'boolean'},
	    dependencies: {
	      type: 'array',
	      items: {type: 'string'}
	    },
	    metaSchema: {type: 'object'},
	    modifying: {type: 'boolean'},
	    valid: {type: 'boolean'},
	    $data: {type: 'boolean'},
	    async: {type: 'boolean'},
	    errors: {
	      anyOf: [
	        {type: 'boolean'},
	        {const: 'full'}
	      ]
	    }
	  }
	};

	var IDENTIFIER = /^[a-z_$][a-z0-9_$-]*$/i;



	var keyword = {
	  add: addKeyword,
	  get: getKeyword,
	  remove: removeKeyword,
	  validate: validateKeyword
	};


	/**
	 * Define custom keyword
	 * @this  Ajv
	 * @param {String} keyword custom keyword, should be unique (including different from all standard, custom and macro keywords).
	 * @param {Object} definition keyword definition object with properties `type` (type(s) which the keyword applies to), `validate` or `compile`.
	 * @return {Ajv} this for method chaining
	 */
	function addKeyword(keyword, definition) {
	  /* jshint validthis: true */
	  /* eslint no-shadow: 0 */
	  var RULES = this.RULES;
	  if (RULES.keywords[keyword])
	    throw new Error('Keyword ' + keyword + ' is already defined');

	  if (!IDENTIFIER.test(keyword))
	    throw new Error('Keyword ' + keyword + ' is not a valid identifier');

	  if (definition) {
	    this.validateKeyword(definition, true);

	    var dataType = definition.type;
	    if (Array.isArray(dataType)) {
	      for (var i=0; i<dataType.length; i++)
	        _addRule(keyword, dataType[i], definition);
	    } else {
	      _addRule(keyword, dataType, definition);
	    }

	    var metaSchema = definition.metaSchema;
	    if (metaSchema) {
	      if (definition.$data && this._opts.$data) {
	        metaSchema = {
	          anyOf: [
	            metaSchema,
	            { '$ref': 'https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#' }
	          ]
	        };
	      }
	      definition.validateSchema = this.compile(metaSchema, true);
	    }
	  }

	  RULES.keywords[keyword] = RULES.all[keyword] = true;


	  function _addRule(keyword, dataType, definition) {
	    var ruleGroup;
	    for (var i=0; i<RULES.length; i++) {
	      var rg = RULES[i];
	      if (rg.type == dataType) {
	        ruleGroup = rg;
	        break;
	      }
	    }

	    if (!ruleGroup) {
	      ruleGroup = { type: dataType, rules: [] };
	      RULES.push(ruleGroup);
	    }

	    var rule = {
	      keyword: keyword,
	      definition: definition,
	      custom: true,
	      code: custom,
	      implements: definition.implements
	    };
	    ruleGroup.rules.push(rule);
	    RULES.custom[keyword] = rule;
	  }

	  return this;
	}


	/**
	 * Get keyword
	 * @this  Ajv
	 * @param {String} keyword pre-defined or custom keyword.
	 * @return {Object|Boolean} custom keyword definition, `true` if it is a predefined keyword, `false` otherwise.
	 */
	function getKeyword(keyword) {
	  /* jshint validthis: true */
	  var rule = this.RULES.custom[keyword];
	  return rule ? rule.definition : this.RULES.keywords[keyword] || false;
	}


	/**
	 * Remove keyword
	 * @this  Ajv
	 * @param {String} keyword pre-defined or custom keyword.
	 * @return {Ajv} this for method chaining
	 */
	function removeKeyword(keyword) {
	  /* jshint validthis: true */
	  var RULES = this.RULES;
	  delete RULES.keywords[keyword];
	  delete RULES.all[keyword];
	  delete RULES.custom[keyword];
	  for (var i=0; i<RULES.length; i++) {
	    var rules = RULES[i].rules;
	    for (var j=0; j<rules.length; j++) {
	      if (rules[j].keyword == keyword) {
	        rules.splice(j, 1);
	        break;
	      }
	    }
	  }
	  return this;
	}


	/**
	 * Validate keyword definition
	 * @this  Ajv
	 * @param {Object} definition keyword definition object.
	 * @param {Boolean} throwError true to throw exception if definition is invalid
	 * @return {boolean} validation result
	 */
	function validateKeyword(definition, throwError) {
	  validateKeyword.errors = null;
	  var v = this._validateKeyword = this._validateKeyword
	                                  || this.compile(definition_schema, true);

	  if (v(definition)) return true;
	  validateKeyword.errors = v.errors;
	  if (throwError)
	    throw new Error('custom keyword definition is invalid: '  + this.errorsText(v.errors));
	  else
	    return false;
	}

	var $schema = "http://json-schema.org/draft-07/schema#";
	var $id = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#";
	var description = "Meta-schema for $data reference (JSON Schema extension proposal)";
	var type = "object";
	var required = [
		"$data"
	];
	var properties = {
		$data: {
			type: "string",
			anyOf: [
				{
					format: "relative-json-pointer"
				},
				{
					format: "json-pointer"
				}
			]
		}
	};
	var additionalProperties = false;
	var require$$1 = {
		$schema: $schema,
		$id: $id,
		description: description,
		type: type,
		required: required,
		properties: properties,
		additionalProperties: additionalProperties
	};

	var ajv$1 = Ajv;

	Ajv.prototype.validate = validate;
	Ajv.prototype.compile = compile;
	Ajv.prototype.addSchema = addSchema;
	Ajv.prototype.addMetaSchema = addMetaSchema;
	Ajv.prototype.validateSchema = validateSchema;
	Ajv.prototype.getSchema = getSchema;
	Ajv.prototype.removeSchema = removeSchema;
	Ajv.prototype.addFormat = addFormat;
	Ajv.prototype.errorsText = errorsText;

	Ajv.prototype._addSchema = _addSchema;
	Ajv.prototype._compile = _compile;

	Ajv.prototype.compileAsync = async;

	Ajv.prototype.addKeyword = keyword.add;
	Ajv.prototype.getKeyword = keyword.get;
	Ajv.prototype.removeKeyword = keyword.remove;
	Ajv.prototype.validateKeyword = keyword.validate;


	Ajv.ValidationError = error_classes.Validation;
	Ajv.MissingRefError = error_classes.MissingRef;
	Ajv.$dataMetaSchema = data;

	var META_SCHEMA_ID = 'http://json-schema.org/draft-07/schema';

	var META_IGNORE_OPTIONS = [ 'removeAdditional', 'useDefaults', 'coerceTypes', 'strictDefaults' ];
	var META_SUPPORT_DATA = ['/properties'];

	/**
	 * Creates validator instance.
	 * Usage: `Ajv(opts)`
	 * @param {Object} opts optional options
	 * @return {Object} ajv instance
	 */
	function Ajv(opts) {
	  if (!(this instanceof Ajv)) return new Ajv(opts);
	  opts = this._opts = util.copy(opts) || {};
	  setLogger(this);
	  this._schemas = {};
	  this._refs = {};
	  this._fragments = {};
	  this._formats = formats_1(opts.format);

	  this._cache = opts.cache || new cache;
	  this._loadingSchemas = {};
	  this._compilations = [];
	  this.RULES = rules();
	  this._getId = chooseGetId(opts);

	  opts.loopRequired = opts.loopRequired || Infinity;
	  if (opts.errorDataPath == 'property') opts._errorDataPathProperty = true;
	  if (opts.serialize === undefined) opts.serialize = fastJsonStableStringify;
	  this._metaOpts = getMetaSchemaOptions(this);

	  if (opts.formats) addInitialFormats(this);
	  if (opts.keywords) addInitialKeywords(this);
	  addDefaultMetaSchema(this);
	  if (typeof opts.meta == 'object') this.addMetaSchema(opts.meta);
	  if (opts.nullable) this.addKeyword('nullable', {metaSchema: {type: 'boolean'}});
	  addInitialSchemas(this);
	}



	/**
	 * Validate data using schema
	 * Schema will be compiled and cached (using serialized JSON as key. [fast-json-stable-stringify](https://github.com/epoberezkin/fast-json-stable-stringify) is used to serialize.
	 * @this   Ajv
	 * @param  {String|Object} schemaKeyRef key, ref or schema object
	 * @param  {Any} data to be validated
	 * @return {Boolean} validation result. Errors from the last validation will be available in `ajv.errors` (and also in compiled schema: `schema.errors`).
	 */
	function validate(schemaKeyRef, data) {
	  var v;
	  if (typeof schemaKeyRef == 'string') {
	    v = this.getSchema(schemaKeyRef);
	    if (!v) throw new Error('no schema with key or ref "' + schemaKeyRef + '"');
	  } else {
	    var schemaObj = this._addSchema(schemaKeyRef);
	    v = schemaObj.validate || this._compile(schemaObj);
	  }

	  var valid = v(data);
	  if (v.$async !== true) this.errors = v.errors;
	  return valid;
	}


	/**
	 * Create validating function for passed schema.
	 * @this   Ajv
	 * @param  {Object} schema schema object
	 * @param  {Boolean} _meta true if schema is a meta-schema. Used internally to compile meta schemas of custom keywords.
	 * @return {Function} validating function
	 */
	function compile(schema, _meta) {
	  var schemaObj = this._addSchema(schema, undefined, _meta);
	  return schemaObj.validate || this._compile(schemaObj);
	}


	/**
	 * Adds schema to the instance.
	 * @this   Ajv
	 * @param {Object|Array} schema schema or array of schemas. If array is passed, `key` and other parameters will be ignored.
	 * @param {String} key Optional schema key. Can be passed to `validate` method instead of schema object or id/ref. One schema per instance can have empty `id` and `key`.
	 * @param {Boolean} _skipValidation true to skip schema validation. Used internally, option validateSchema should be used instead.
	 * @param {Boolean} _meta true if schema is a meta-schema. Used internally, addMetaSchema should be used instead.
	 * @return {Ajv} this for method chaining
	 */
	function addSchema(schema, key, _skipValidation, _meta) {
	  if (Array.isArray(schema)){
	    for (var i=0; i<schema.length; i++) this.addSchema(schema[i], undefined, _skipValidation, _meta);
	    return this;
	  }
	  var id = this._getId(schema);
	  if (id !== undefined && typeof id != 'string')
	    throw new Error('schema id must be string');
	  key = resolve_1.normalizeId(key || id);
	  checkUnique(this, key);
	  this._schemas[key] = this._addSchema(schema, _skipValidation, _meta, true);
	  return this;
	}


	/**
	 * Add schema that will be used to validate other schemas
	 * options in META_IGNORE_OPTIONS are alway set to false
	 * @this   Ajv
	 * @param {Object} schema schema object
	 * @param {String} key optional schema key
	 * @param {Boolean} skipValidation true to skip schema validation, can be used to override validateSchema option for meta-schema
	 * @return {Ajv} this for method chaining
	 */
	function addMetaSchema(schema, key, skipValidation) {
	  this.addSchema(schema, key, skipValidation, true);
	  return this;
	}


	/**
	 * Validate schema
	 * @this   Ajv
	 * @param {Object} schema schema to validate
	 * @param {Boolean} throwOrLogError pass true to throw (or log) an error if invalid
	 * @return {Boolean} true if schema is valid
	 */
	function validateSchema(schema, throwOrLogError) {
	  var $schema = schema.$schema;
	  if ($schema !== undefined && typeof $schema != 'string')
	    throw new Error('$schema must be a string');
	  $schema = $schema || this._opts.defaultMeta || defaultMeta(this);
	  if (!$schema) {
	    this.logger.warn('meta-schema not available');
	    this.errors = null;
	    return true;
	  }
	  var valid = this.validate($schema, schema);
	  if (!valid && throwOrLogError) {
	    var message = 'schema is invalid: ' + this.errorsText();
	    if (this._opts.validateSchema == 'log') this.logger.error(message);
	    else throw new Error(message);
	  }
	  return valid;
	}


	function defaultMeta(self) {
	  var meta = self._opts.meta;
	  self._opts.defaultMeta = typeof meta == 'object'
	                            ? self._getId(meta) || meta
	                            : self.getSchema(META_SCHEMA_ID)
	                              ? META_SCHEMA_ID
	                              : undefined;
	  return self._opts.defaultMeta;
	}


	/**
	 * Get compiled schema from the instance by `key` or `ref`.
	 * @this   Ajv
	 * @param  {String} keyRef `key` that was passed to `addSchema` or full schema reference (`schema.id` or resolved id).
	 * @return {Function} schema validating function (with property `schema`).
	 */
	function getSchema(keyRef) {
	  var schemaObj = _getSchemaObj(this, keyRef);
	  switch (typeof schemaObj) {
	    case 'object': return schemaObj.validate || this._compile(schemaObj);
	    case 'string': return this.getSchema(schemaObj);
	    case 'undefined': return _getSchemaFragment(this, keyRef);
	  }
	}


	function _getSchemaFragment(self, ref) {
	  var res = resolve_1.schema.call(self, { schema: {} }, ref);
	  if (res) {
	    var schema = res.schema
	      , root = res.root
	      , baseId = res.baseId;
	    var v = compile_1.call(self, schema, root, undefined, baseId);
	    self._fragments[ref] = new schema_obj({
	      ref: ref,
	      fragment: true,
	      schema: schema,
	      root: root,
	      baseId: baseId,
	      validate: v
	    });
	    return v;
	  }
	}


	function _getSchemaObj(self, keyRef) {
	  keyRef = resolve_1.normalizeId(keyRef);
	  return self._schemas[keyRef] || self._refs[keyRef] || self._fragments[keyRef];
	}


	/**
	 * Remove cached schema(s).
	 * If no parameter is passed all schemas but meta-schemas are removed.
	 * If RegExp is passed all schemas with key/id matching pattern but meta-schemas are removed.
	 * Even if schema is referenced by other schemas it still can be removed as other schemas have local references.
	 * @this   Ajv
	 * @param  {String|Object|RegExp} schemaKeyRef key, ref, pattern to match key/ref or schema object
	 * @return {Ajv} this for method chaining
	 */
	function removeSchema(schemaKeyRef) {
	  if (schemaKeyRef instanceof RegExp) {
	    _removeAllSchemas(this, this._schemas, schemaKeyRef);
	    _removeAllSchemas(this, this._refs, schemaKeyRef);
	    return this;
	  }
	  switch (typeof schemaKeyRef) {
	    case 'undefined':
	      _removeAllSchemas(this, this._schemas);
	      _removeAllSchemas(this, this._refs);
	      this._cache.clear();
	      return this;
	    case 'string':
	      var schemaObj = _getSchemaObj(this, schemaKeyRef);
	      if (schemaObj) this._cache.del(schemaObj.cacheKey);
	      delete this._schemas[schemaKeyRef];
	      delete this._refs[schemaKeyRef];
	      return this;
	    case 'object':
	      var serialize = this._opts.serialize;
	      var cacheKey = serialize ? serialize(schemaKeyRef) : schemaKeyRef;
	      this._cache.del(cacheKey);
	      var id = this._getId(schemaKeyRef);
	      if (id) {
	        id = resolve_1.normalizeId(id);
	        delete this._schemas[id];
	        delete this._refs[id];
	      }
	  }
	  return this;
	}


	function _removeAllSchemas(self, schemas, regex) {
	  for (var keyRef in schemas) {
	    var schemaObj = schemas[keyRef];
	    if (!schemaObj.meta && (!regex || regex.test(keyRef))) {
	      self._cache.del(schemaObj.cacheKey);
	      delete schemas[keyRef];
	    }
	  }
	}


	/* @this   Ajv */
	function _addSchema(schema, skipValidation, meta, shouldAddSchema) {
	  if (typeof schema != 'object' && typeof schema != 'boolean')
	    throw new Error('schema should be object or boolean');
	  var serialize = this._opts.serialize;
	  var cacheKey = serialize ? serialize(schema) : schema;
	  var cached = this._cache.get(cacheKey);
	  if (cached) return cached;

	  shouldAddSchema = shouldAddSchema || this._opts.addUsedSchema !== false;

	  var id = resolve_1.normalizeId(this._getId(schema));
	  if (id && shouldAddSchema) checkUnique(this, id);

	  var willValidate = this._opts.validateSchema !== false && !skipValidation;
	  var recursiveMeta;
	  if (willValidate && !(recursiveMeta = id && id == resolve_1.normalizeId(schema.$schema)))
	    this.validateSchema(schema, true);

	  var localRefs = resolve_1.ids.call(this, schema);

	  var schemaObj = new schema_obj({
	    id: id,
	    schema: schema,
	    localRefs: localRefs,
	    cacheKey: cacheKey,
	    meta: meta
	  });

	  if (id[0] != '#' && shouldAddSchema) this._refs[id] = schemaObj;
	  this._cache.put(cacheKey, schemaObj);

	  if (willValidate && recursiveMeta) this.validateSchema(schema, true);

	  return schemaObj;
	}


	/* @this   Ajv */
	function _compile(schemaObj, root) {
	  if (schemaObj.compiling) {
	    schemaObj.validate = callValidate;
	    callValidate.schema = schemaObj.schema;
	    callValidate.errors = null;
	    callValidate.root = root ? root : callValidate;
	    if (schemaObj.schema.$async === true)
	      callValidate.$async = true;
	    return callValidate;
	  }
	  schemaObj.compiling = true;

	  var currentOpts;
	  if (schemaObj.meta) {
	    currentOpts = this._opts;
	    this._opts = this._metaOpts;
	  }

	  var v;
	  try { v = compile_1.call(this, schemaObj.schema, root, schemaObj.localRefs); }
	  catch(e) {
	    delete schemaObj.validate;
	    throw e;
	  }
	  finally {
	    schemaObj.compiling = false;
	    if (schemaObj.meta) this._opts = currentOpts;
	  }

	  schemaObj.validate = v;
	  schemaObj.refs = v.refs;
	  schemaObj.refVal = v.refVal;
	  schemaObj.root = v.root;
	  return v;


	  /* @this   {*} - custom context, see passContext option */
	  function callValidate() {
	    /* jshint validthis: true */
	    var _validate = schemaObj.validate;
	    var result = _validate.apply(this, arguments);
	    callValidate.errors = _validate.errors;
	    return result;
	  }
	}


	function chooseGetId(opts) {
	  switch (opts.schemaId) {
	    case 'auto': return _get$IdOrId;
	    case 'id': return _getId;
	    default: return _get$Id;
	  }
	}

	/* @this   Ajv */
	function _getId(schema) {
	  if (schema.$id) this.logger.warn('schema $id ignored', schema.$id);
	  return schema.id;
	}

	/* @this   Ajv */
	function _get$Id(schema) {
	  if (schema.id) this.logger.warn('schema id ignored', schema.id);
	  return schema.$id;
	}


	function _get$IdOrId(schema) {
	  if (schema.$id && schema.id && schema.$id != schema.id)
	    throw new Error('schema $id is different from id');
	  return schema.$id || schema.id;
	}


	/**
	 * Convert array of error message objects to string
	 * @this   Ajv
	 * @param  {Array<Object>} errors optional array of validation errors, if not passed errors from the instance are used.
	 * @param  {Object} options optional options with properties `separator` and `dataVar`.
	 * @return {String} human readable string with all errors descriptions
	 */
	function errorsText(errors, options) {
	  errors = errors || this.errors;
	  if (!errors) return 'No errors';
	  options = options || {};
	  var separator = options.separator === undefined ? ', ' : options.separator;
	  var dataVar = options.dataVar === undefined ? 'data' : options.dataVar;

	  var text = '';
	  for (var i=0; i<errors.length; i++) {
	    var e = errors[i];
	    if (e) text += dataVar + e.dataPath + ' ' + e.message + separator;
	  }
	  return text.slice(0, -separator.length);
	}


	/**
	 * Add custom format
	 * @this   Ajv
	 * @param {String} name format name
	 * @param {String|RegExp|Function} format string is converted to RegExp; function should return boolean (true when valid)
	 * @return {Ajv} this for method chaining
	 */
	function addFormat(name, format) {
	  if (typeof format == 'string') format = new RegExp(format);
	  this._formats[name] = format;
	  return this;
	}


	function addDefaultMetaSchema(self) {
	  var $dataSchema;
	  if (self._opts.$data) {
	    $dataSchema = require$$1;
	    self.addMetaSchema($dataSchema, $dataSchema.$id, true);
	  }
	  if (self._opts.meta === false) return;
	  var metaSchema = require$$2;
	  if (self._opts.$data) metaSchema = data(metaSchema, META_SUPPORT_DATA);
	  self.addMetaSchema(metaSchema, META_SCHEMA_ID, true);
	  self._refs['http://json-schema.org/schema'] = META_SCHEMA_ID;
	}


	function addInitialSchemas(self) {
	  var optsSchemas = self._opts.schemas;
	  if (!optsSchemas) return;
	  if (Array.isArray(optsSchemas)) self.addSchema(optsSchemas);
	  else for (var key in optsSchemas) self.addSchema(optsSchemas[key], key);
	}


	function addInitialFormats(self) {
	  for (var name in self._opts.formats) {
	    var format = self._opts.formats[name];
	    self.addFormat(name, format);
	  }
	}


	function addInitialKeywords(self) {
	  for (var name in self._opts.keywords) {
	    var keyword = self._opts.keywords[name];
	    self.addKeyword(name, keyword);
	  }
	}


	function checkUnique(self, id) {
	  if (self._schemas[id] || self._refs[id])
	    throw new Error('schema with key or id "' + id + '" already exists');
	}


	function getMetaSchemaOptions(self) {
	  var metaOpts = util.copy(self._opts);
	  for (var i=0; i<META_IGNORE_OPTIONS.length; i++)
	    delete metaOpts[META_IGNORE_OPTIONS[i]];
	  return metaOpts;
	}


	function setLogger(self) {
	  var logger = self._opts.logger;
	  if (logger === false) {
	    self.logger = {log: noop, warn: noop, error: noop};
	  } else {
	    if (logger === undefined) logger = console;
	    if (!(typeof logger == 'object' && logger.log && logger.warn && logger.error))
	      throw new Error('logger must implement log, warn and error methods');
	    self.logger = logger;
	  }
	}


	function noop() {}

	function ownKeys(object, enumerableOnly) { var keys$1 = keys(object); if (getOwnPropertySymbols) { var symbols = getOwnPropertySymbols(object); if (enumerableOnly) { symbols = filter(symbols).call(symbols, function (sym) { return getOwnPropertyDescriptor(object, sym).enumerable; }); } keys$1.push.apply(keys$1, symbols); } return keys$1; }

	function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { var _context27; forEach$1(_context27 = ownKeys(Object(source), true)).call(_context27, function (key) { _defineProperty(target, key, source[key]); }); } else if (getOwnPropertyDescriptors) { defineProperties(target, getOwnPropertyDescriptors(source)); } else { var _context28; forEach$1(_context28 = ownKeys(Object(source))).call(_context28, function (key) { defineProperty$4(target, key, getOwnPropertyDescriptor(source, key)); }); } } return target; }
	var ajv = new ajv$1();
	ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-06.json'));
	ajv.compile(bachJsonSchema); // import bach from 'bach-cljs'

	var bach = require('bach-cljs')["default"]; // Either "composes" raw bach data into bach.json or, when provided an object, validates its structure as bach.json.
	// Main entry point for integrating with core bach ClojureScript library.


	var compose = function compose(source) {
	  if (typeof source === 'string') {
	    return bach(source);
	  }

	  if (_typeof(source) === 'object') {
	    // FIXME: Enable again once bach-json-schema is updated to v3
	    // return valid(source)
	    return source;
	  }

	  throw TypeError("Unsupported Bach.JSON data type (".concat(_typeof(source), "). Must be a bach.json object or raw bach string."));
	};

	function scaleify(value) {
	  var _context;

	  if (typeof value === 'string') {
	    var _value$split = value.split(' '),
	        _value$split2 = _slicedToArray(_value$split, 2),
	        tonic = _value$split2[0],
	        type = _value$split2[1]; // TODO: Potentially use type.toLowerCase instead, to guarantee smooth interopability


	    return teoria_1.scale(tonic, type.toLowerCase());
	  } else if (value instanceof teoria_1.Scale) {
	    return value;
	  }

	  throw TypeError(concat(_context = "Unknown scale type (".concat(_typeof(value), "): ")).call(_context, value));
	}

	function chordify(value) {
	  var _context2;

	  if (typeof value === 'string') {
	    return teoria_1.chord(value);
	  } else if (value instanceof teoria_1.Chord) {
	    return value;
	  }

	  throw TypeError(concat(_context2 = "Unknown chord type (".concat(_typeof(value), "): ")).call(_context2, value));
	}

	function notesInChord(value) {
	  var _context5;

	  return map(_context5 = chordify(value).notes()).call(_context5, function (note) {
	    return Note.valueOf(note);
	  });
	}

	function notesInScale(value) {
	  var _context6;

	  return map(_context6 = scaleify(value).notes()).call(_context6, function (note) {
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

	var Note = /*#__PURE__*/function () {
	  function Note() {
	    _classCallCheck(this, Note);
	  }

	  _createClass(Note, null, [{
	    key: "parse",
	    value: function parse(value) {
	      var _context7;

	      if (typeof value === 'string') {
	        return teoria_1.note(value);
	      } else if (_typeof(value) === 'object' || value instanceof teoria_1.Note) {
	        return value;
	      }

	      throw TypeError(concat(_context7 = "Unknown note type (".concat(_typeof(value), "): ")).call(_context7, value));
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
	      return map(notes).call(notes, Note.valueOf);
	    }
	  }, {
	    key: "generalize",
	    value: function generalize(note$1) {
	      return teoria_1.note(Note.valueOf(note$1));
	    }
	  }, {
	    key: "unite",
	    value: function unite() {
	      var notes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	      return _toConsumableArray(new set(Note.valuesOf(notes)));
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

	var Durations = /*#__PURE__*/function () {
	  function Durations(source) {
	    _classCallCheck(this, Durations);

	    this.source = compose(source);
	  }

	  _createClass(Durations, [{
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
	      var _context8;

	      var is = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'step';
	      var step = this.cast(duration, {
	        is: is,
	        as: 'step'
	      });
	      var index = this.cyclic(step);
	      return reduce(_context8 = entries(this.steps)).call(_context8, function (acc, _ref6) {
	        var _ref7 = _slicedToArray(_ref6, 2),
	            key = _ref7[0],
	            steps = _ref7[1];

	        return _objectSpread(_objectSpread({}, acc), {}, _defineProperty({}, key, steps[index]));
	      }, {
	        index: index
	      });
	    } // TODO: Either replace or improve via inspiration with this:
	    // @see: https://tonejs.github.io/docs/r13/Time#quantize

	  }, {
	    key: "rhythmic",
	    value: function rhythmic(duration) {
	      var _context9,
	          _this = this;

	      var _ref8 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	          _ref8$is = _ref8.is,
	          is = _ref8$is === void 0 ? 'ms' : _ref8$is,
	          _ref8$units = _ref8.units,
	          units = _ref8$units === void 0 ? ['8n', '4n'] : _ref8$units,
	          _ref8$calc = _ref8.calc,
	          calc = _ref8$calc === void 0 ? 'floor' : _ref8$calc,
	          _ref8$size = _ref8.size,
	          size = _ref8$size === void 0 ? 'min' : _ref8$size;

	      var durations = sort(_context9 = map(units).call(units, function (unit) {
	        var value = _this.cast(duration, {
	          is: is,
	          as: unit
	        });

	        var result = Math[calc](value);
	        return _this.cast(result, {
	          is: unit,
	          as: is
	        });
	      })).call(_context9, function (a, b) {
	        return Math.abs(duration - a) - Math.abs(duration - b);
	      });

	      return Math[size].apply(Math, _toConsumableArray(durations));
	    }
	  }]);

	  return Durations;
	}();
	/**
	 * Represents a single playable element (Note, Scale, Chord, Mode, Triad or Rest)
	 */


	var Element = /*#__PURE__*/function () {
	  function Element(data) {
	    _classCallCheck(this, Element);

	    this.data = data;
	  }

	  _createClass(Element, [{
	    key: "id",
	    get: function get() {
	      var _context10;

	      return concat(_context10 = "".concat(this.data.kind, ".")).call(_context10, this.data.id);
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
	      return this.data.props;
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
	    }
	  }, {
	    key: "musical",
	    get: function get() {
	      return includes(MUSICAL_ELEMENTS).call(MUSICAL_ELEMENTS, this.kind);
	    }
	  }], [{
	    key: "uid",
	    value: function uid(id) {
	      return id.split('.').pop();
	    }
	  }]);

	  return Element;
	}();

	var Elements = /*#__PURE__*/function () {
	  function Elements() {
	    var _ref9 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	        source = _ref9.source,
	        store = _ref9.store,
	        cast = _ref9.cast;

	    _classCallCheck(this, Elements);

	    this.source = compose(source);

	    this.cast = cast || function (_) {
	      return _;
	    };

	    this.data = store || Elements.cast(this.source.elements, cast);
	  }

	  _createClass(Elements, [{
	    key: "all",
	    get: function get() {
	      var _context11,
	          _this2 = this;

	      return flatMap(_context11 = this.kinds).call(_context11, function (kind) {
	        var _context12;

	        return map(_context12 = values(_this2.data[kind])).call(_context12, function (elem) {
	          return new Element(elem);
	        });
	      });
	    }
	  }, {
	    key: "kinds",
	    get: function get() {
	      return keys(this.data);
	    }
	  }, {
	    key: "values",
	    get: function get() {
	      var _context13;

	      return map(_context13 = this.all).call(_context13, function (elem) {
	        return elem.value;
	      });
	    }
	  }, {
	    key: "ids",
	    get: function get() {
	      var _context14;

	      return map(_context14 = this.all).call(_context14, function (elem) {
	        return elem.id;
	      });
	    }
	  }, {
	    key: "get",
	    value: function get(id) {
	      var parts = typeof id === 'string' ? id.split('.') : [];

	      if (parts.length === 2) {
	        var _parts = _slicedToArray(parts, 2),
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
	      if (elem instanceof Element) return elem;
	      if (typeof elem === 'string') return this.get(elem);
	      if (_typeof(elem) === 'object') return new Element(this.cast(elem));
	      throw TypeError('Failed to resolve element, unsupported data type');
	    }
	  }], [{
	    key: "cast",
	    value: function cast(elements) {
	      var _context15;

	      var as = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (_) {
	        return _;
	      };
	      if (!elements) return null; // TODO: Validate element shape with JSON Schema

	      return reduce(_context15 = entries(elements)).call(_context15, function (acc, _ref10) {
	        var _context16;

	        var _ref11 = _slicedToArray(_ref10, 2),
	            kind = _ref11[0],
	            ids = _ref11[1];

	        var elems = reduce(_context16 = entries(ids)).call(_context16, function (acc, _ref12) {
	          var _ref13 = _slicedToArray(_ref12, 2),
	              id = _ref13[0],
	              elem = _ref13[1];

	          return _objectSpread(_objectSpread({}, acc), {}, _defineProperty({}, id, as(_objectSpread({
	            id: id,
	            kind: kind
	          }, elem))));
	        }, {});

	        return _objectSpread(_objectSpread({}, acc), {}, _defineProperty({}, kind, elems));
	      }, {});
	    }
	  }]);

	  return Elements;
	}();

	var MUSICAL_ELEMENTS = ['note', 'chord', 'scale']; // penta

	/**
	 * Represents a single beat in a track.
	 *
	 * Beats are represented as a tuple and may contain multiple elements
	 *
	 * duration -> items -> elements
	 */

	var Beat = /*#__PURE__*/function () {
	  function Beat(data, store) {
	    _classCallCheck(this, Beat);

	    this.data = data;
	    this.store = store; // TODO: Consider using nanoid to generate pseudo-unique beat identifiers
	    // this.id = id || nanoid()
	  }

	  _createClass(Beat, [{
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
	      return this.data.items;
	    }
	  }, {
	    key: "elements",
	    get: function get() {
	      var _context17,
	          _this3 = this;

	      return flatMap(_context17 = this.items).call(_context17, function (_ref14) {
	        var elements = _ref14.elements;
	        return map(elements).call(elements, function (elem) {
	          return _this3.store.resolve(elem);
	        });
	      });
	    }
	  }, {
	    key: "kinds",
	    get: function get() {
	      return this.all(function (_ref15) {
	        var kind = _ref15.kind;
	        return kind;
	      });
	    }
	  }, {
	    key: "values",
	    get: function get() {
	      return this.all(function (_ref16) {
	        var value = _ref16.value;
	        return value;
	      });
	    } // Provides map of elements in a beat grouped by kind.

	  }, {
	    key: "parts",
	    get: function get() {
	      var _context18;

	      return reduce(_context18 = this.elements).call(_context18, function (parts, elem) {
	        return _objectSpread(_objectSpread({}, parts), {}, _defineProperty({}, elem.kind, elem));
	      }, {});
	    }
	  }, {
	    key: "musical",
	    get: function get() {
	      var _context19;

	      return every(_context19 = this.elements).call(_context19, function (elem) {
	        return elem.musical;
	      });
	    }
	  }, {
	    key: "all",
	    value: function all() {
	      var _context20;

	      var cast = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function (_) {
	        return _;
	      };
	      return _toConsumableArray(new set(map(_context20 = this.elements).call(_context20, cast)));
	    }
	  }, {
	    key: "first",
	    value: function first(kind) {
	      var _context21;

	      return find(_context21 = this.elements).call(_context21, function (elem) {
	        return kind == elem.kind;
	      });
	    }
	  }], [{
	    key: "from",
	    value: function from(beats, store) {
	      if (isArray(beats)) {
	        return map(beats).call(beats, function (beat) {
	          return new Beat(beat, store);
	        });
	      }

	      return new Beat(beats, store);
	    }
	  }]);

	  return Beat;
	}(); // NOTE: Basically Track v3. Probably just rename to Track eventually.


	var Music = /*#__PURE__*/function () {
	  function Music(source) {
	    _classCallCheck(this, Music);

	    this.source = source;
	    this.data = compose(source);
	    this.store = this.parses ? new Elements({
	      source: this.data,
	      cast: function cast(elem) {
	        return _objectSpread(_objectSpread({}, elem), {}, {
	          notes: Note.all(elem.kind, elem.value)
	        });
	      }
	    }) : null;
	  }

	  _createClass(Music, [{
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
	      var _context22;

	      return Note.unite(flatMap(_context22 = this.beats).call(_context22, function (beat) {
	        var _context23;

	        return flatMap(_context23 = beat.elements).call(_context23, function (_ref17) {
	          var notes = _ref17.notes;
	          return notes;
	        });
	      }));
	    }
	  }, {
	    key: "musical",
	    get: function get() {
	      var _context24;

	      return every(_context24 = this.beats).call(_context24, function (beat) {
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
	      var _context25,
	          _this4 = this,
	          _context26;

	      var is = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'step';
	      var cursor = this.durations.at(duration, is);
	      return {
	        beat: this.beats[cursor.beat],
	        play: map(_context25 = cursor.play || []).call(_context25, function (elem) {
	          return _this4.store.resolve(elem);
	        }),
	        stop: map(_context26 = cursor.stop || []).call(_context26, function (elem) {
	          return _this4.store.resolve(elem);
	        })
	      };
	    }
	  }, {
	    key: "adjust",
	    value: function adjust(tempo) {}
	  }]);

	  return Music;
	}();

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
	(function() {

	  /** Global Methods **/
	  /***************************************************************************/

	  /**
	   * Create the global controller. All contained methods and properties apply
	   * to all sounds that are currently playing or will be in the future.
	   */
	  var HowlerGlobal = function() {
	    this.init();
	  };
	  HowlerGlobal.prototype = {
	    /**
	     * Initialize the global Howler object.
	     * @return {Howler}
	     */
	    init: function() {
	      var self = this || Howler;

	      // Create a global ID counter.
	      self._counter = 1000;

	      // Pool of unlocked HTML5 Audio objects.
	      self._html5AudioPool = [];
	      self.html5PoolSize = 10;

	      // Internal properties.
	      self._codecs = {};
	      self._howls = [];
	      self._muted = false;
	      self._volume = 1;
	      self._canPlayEvent = 'canplaythrough';
	      self._navigator = (typeof window !== 'undefined' && window.navigator) ? window.navigator : null;

	      // Public properties.
	      self.masterGain = null;
	      self.noAudio = false;
	      self.usingWebAudio = true;
	      self.autoSuspend = true;
	      self.ctx = null;

	      // Set to false to disable the auto audio unlocker.
	      self.autoUnlock = true;

	      // Setup the various state values for global tracking.
	      self._setup();

	      return self;
	    },

	    /**
	     * Get/set the global volume for all sounds.
	     * @param  {Float} vol Volume from 0.0 to 1.0.
	     * @return {Howler/Float}     Returns self or current volume.
	     */
	    volume: function(vol) {
	      var self = this || Howler;
	      vol = parseFloat(vol);

	      // If we don't have an AudioContext created yet, run the setup.
	      if (!self.ctx) {
	        setupAudioContext();
	      }

	      if (typeof vol !== 'undefined' && vol >= 0 && vol <= 1) {
	        self._volume = vol;

	        // Don't update any of the nodes if we are muted.
	        if (self._muted) {
	          return self;
	        }

	        // When using Web Audio, we just need to adjust the master gain.
	        if (self.usingWebAudio) {
	          self.masterGain.gain.setValueAtTime(vol, Howler.ctx.currentTime);
	        }

	        // Loop through and change volume for all HTML5 audio nodes.
	        for (var i=0; i<self._howls.length; i++) {
	          if (!self._howls[i]._webAudio) {
	            // Get all of the sounds in this Howl group.
	            var ids = self._howls[i]._getSoundIds();

	            // Loop through all sounds and change the volumes.
	            for (var j=0; j<ids.length; j++) {
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
	    mute: function(muted) {
	      var self = this || Howler;

	      // If we don't have an AudioContext created yet, run the setup.
	      if (!self.ctx) {
	        setupAudioContext();
	      }

	      self._muted = muted;

	      // With Web Audio, we just need to mute the master gain.
	      if (self.usingWebAudio) {
	        self.masterGain.gain.setValueAtTime(muted ? 0 : self._volume, Howler.ctx.currentTime);
	      }

	      // Loop through and mute all HTML5 Audio nodes.
	      for (var i=0; i<self._howls.length; i++) {
	        if (!self._howls[i]._webAudio) {
	          // Get all of the sounds in this Howl group.
	          var ids = self._howls[i]._getSoundIds();

	          // Loop through all sounds and mark the audio node as muted.
	          for (var j=0; j<ids.length; j++) {
	            var sound = self._howls[i]._soundById(ids[j]);

	            if (sound && sound._node) {
	              sound._node.muted = (muted) ? true : sound._muted;
	            }
	          }
	        }
	      }

	      return self;
	    },

	    /**
	     * Handle stopping all sounds globally.
	     */
	    stop: function() {
	      var self = this || Howler;

	      // Loop through all Howls and stop them.
	      for (var i=0; i<self._howls.length; i++) {
	        self._howls[i].stop();
	      }

	      return self;
	    },

	    /**
	     * Unload and destroy all currently loaded Howl objects.
	     * @return {Howler}
	     */
	    unload: function() {
	      var self = this || Howler;

	      for (var i=self._howls.length-1; i>=0; i--) {
	        self._howls[i].unload();
	      }

	      // Create a new AudioContext to make sure it is fully reset.
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
	    codecs: function(ext) {
	      return (this || Howler)._codecs[ext.replace(/^x-/, '')];
	    },

	    /**
	     * Setup various state values for global tracking.
	     * @return {Howler}
	     */
	    _setup: function() {
	      var self = this || Howler;

	      // Keeps track of the suspend/resume state of the AudioContext.
	      self.state = self.ctx ? self.ctx.state || 'suspended' : 'suspended';

	      // Automatically begin the 30-second suspend process
	      self._autoSuspend();

	      // Check if audio is available.
	      if (!self.usingWebAudio) {
	        // No audio is available on this system if noAudio is set to true.
	        if (typeof Audio !== 'undefined') {
	          try {
	            var test = new Audio();

	            // Check if the canplaythrough event is available.
	            if (typeof test.oncanplaythrough === 'undefined') {
	              self._canPlayEvent = 'canplay';
	            }
	          } catch(e) {
	            self.noAudio = true;
	          }
	        } else {
	          self.noAudio = true;
	        }
	      }

	      // Test to make sure audio isn't disabled in Internet Explorer.
	      try {
	        var test = new Audio();
	        if (test.muted) {
	          self.noAudio = true;
	        }
	      } catch (e) {}

	      // Check for supported codecs.
	      if (!self.noAudio) {
	        self._setupCodecs();
	      }

	      return self;
	    },

	    /**
	     * Check for browser support for various codecs and cache the results.
	     * @return {Howler}
	     */
	    _setupCodecs: function() {
	      var self = this || Howler;
	      var audioTest = null;

	      // Must wrap in a try/catch because IE11 in server mode throws an error.
	      try {
	        audioTest = (typeof Audio !== 'undefined') ? new Audio() : null;
	      } catch (err) {
	        return self;
	      }

	      if (!audioTest || typeof audioTest.canPlayType !== 'function') {
	        return self;
	      }

	      var mpegTest = audioTest.canPlayType('audio/mpeg;').replace(/^no$/, '');

	      // Opera version <33 has mixed MP3 support, so we need to check for and block it.
	      var checkOpera = self._navigator && self._navigator.userAgent.match(/OPR\/([0-6].)/g);
	      var isOldOpera = (checkOpera && parseInt(checkOpera[0].split('/')[1], 10) < 33);

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
	    _unlockAudio: function() {
	      var self = this || Howler;

	      // Only run this if Web Audio is supported and it hasn't already been unlocked.
	      if (self._audioUnlocked || !self.ctx) {
	        return;
	      }

	      self._audioUnlocked = false;
	      self.autoUnlock = false;

	      // Some mobile devices/platforms have distortion issues when opening/closing tabs and/or web views.
	      // Bugs in the browser (especially Mobile Safari) can cause the sampleRate to change from 44100 to 48000.
	      // By calling Howler.unload(), we create a new AudioContext with the correct sampleRate.
	      if (!self._mobileUnloaded && self.ctx.sampleRate !== 44100) {
	        self._mobileUnloaded = true;
	        self.unload();
	      }

	      // Scratch buffer for enabling iOS to dispose of web audio buffers correctly, as per:
	      // http://stackoverflow.com/questions/24119684
	      self._scratchBuffer = self.ctx.createBuffer(1, 1, 22050);

	      // Call this method on touch start to create and play a buffer,
	      // then check if the audio actually played to determine if
	      // audio has now been unlocked on iOS, Android, etc.
	      var unlock = function(e) {
	        // Create a pool of unlocked HTML5 Audio objects that can
	        // be used for playing sounds without user interaction. HTML5
	        // Audio objects must be individually unlocked, as opposed
	        // to the WebAudio API which only needs a single activation.
	        // This must occur before WebAudio setup or the source.onended
	        // event will not fire.
	        while (self._html5AudioPool.length < self.html5PoolSize) {
	          try {
	            var audioNode = new Audio();

	            // Mark this Audio object as unlocked to ensure it can get returned
	            // to the unlocked pool when released.
	            audioNode._unlocked = true;

	            // Add the audio node to the pool.
	            self._releaseHtml5Audio(audioNode);
	          } catch (e) {
	            self.noAudio = true;
	            break;
	          }
	        }

	        // Loop through any assigned audio nodes and unlock them.
	        for (var i=0; i<self._howls.length; i++) {
	          if (!self._howls[i]._webAudio) {
	            // Get all of the sounds in this Howl group.
	            var ids = self._howls[i]._getSoundIds();

	            // Loop through all sounds and unlock the audio nodes.
	            for (var j=0; j<ids.length; j++) {
	              var sound = self._howls[i]._soundById(ids[j]);

	              if (sound && sound._node && !sound._node._unlocked) {
	                sound._node._unlocked = true;
	                sound._node.load();
	              }
	            }
	          }
	        }

	        // Fix Android can not play in suspend state.
	        self._autoResume();

	        // Create an empty buffer.
	        var source = self.ctx.createBufferSource();
	        source.buffer = self._scratchBuffer;
	        source.connect(self.ctx.destination);

	        // Play the empty buffer.
	        if (typeof source.start === 'undefined') {
	          source.noteOn(0);
	        } else {
	          source.start(0);
	        }

	        // Calling resume() on a stack initiated by user gesture is what actually unlocks the audio on Android Chrome >= 55.
	        if (typeof self.ctx.resume === 'function') {
	          self.ctx.resume();
	        }

	        // Setup a timeout to check that we are unlocked on the next event loop.
	        source.onended = function() {
	          source.disconnect(0);

	          // Update the unlocked state and prevent this check from happening again.
	          self._audioUnlocked = true;

	          // Remove the touch start listener.
	          document.removeEventListener('touchstart', unlock, true);
	          document.removeEventListener('touchend', unlock, true);
	          document.removeEventListener('click', unlock, true);

	          // Let all sounds know that audio has been unlocked.
	          for (var i=0; i<self._howls.length; i++) {
	            self._howls[i]._emit('unlock');
	          }
	        };
	      };

	      // Setup a touch start listener to attempt an unlock in.
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
	    _obtainHtml5Audio: function() {
	      var self = this || Howler;

	      // Return the next object from the pool if one exists.
	      if (self._html5AudioPool.length) {
	        return self._html5AudioPool.pop();
	      }

	      //.Check if the audio is locked and throw a warning.
	      var testPlay = new Audio().play();
	      if (testPlay && typeof Promise !== 'undefined' && (testPlay instanceof Promise || typeof testPlay.then === 'function')) {
	        testPlay.catch(function() {
	          console.warn('HTML5 Audio pool exhausted, returning potentially locked audio object.');
	        });
	      }

	      return new Audio();
	    },

	    /**
	     * Return an activated HTML5 Audio object to the pool.
	     * @return {Howler}
	     */
	    _releaseHtml5Audio: function(audio) {
	      var self = this || Howler;

	      // Don't add audio to the pool if we don't know if it has been unlocked.
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
	    _autoSuspend: function() {
	      var self = this;

	      if (!self.autoSuspend || !self.ctx || typeof self.ctx.suspend === 'undefined' || !Howler.usingWebAudio) {
	        return;
	      }

	      // Check if any sounds are playing.
	      for (var i=0; i<self._howls.length; i++) {
	        if (self._howls[i]._webAudio) {
	          for (var j=0; j<self._howls[i]._sounds.length; j++) {
	            if (!self._howls[i]._sounds[j]._paused) {
	              return self;
	            }
	          }
	        }
	      }

	      if (self._suspendTimer) {
	        clearTimeout(self._suspendTimer);
	      }

	      // If no sound has played after 30 seconds, suspend the context.
	      self._suspendTimer = setTimeout(function() {
	        if (!self.autoSuspend) {
	          return;
	        }

	        self._suspendTimer = null;
	        self.state = 'suspending';

	        // Handle updating the state of the audio context after suspending.
	        var handleSuspension = function() {
	          self.state = 'suspended';

	          if (self._resumeAfterSuspend) {
	            delete self._resumeAfterSuspend;
	            self._autoResume();
	          }
	        };

	        // Either the state gets suspended or it is interrupted.
	        // Either way, we need to update the state to suspended.
	        self.ctx.suspend().then(handleSuspension, handleSuspension);
	      }, 30000);

	      return self;
	    },

	    /**
	     * Automatically resume the Web Audio AudioContext when a new sound is played.
	     * @return {Howler}
	     */
	    _autoResume: function() {
	      var self = this;

	      if (!self.ctx || typeof self.ctx.resume === 'undefined' || !Howler.usingWebAudio) {
	        return;
	      }

	      if (self.state === 'running' && self.ctx.state !== 'interrupted' && self._suspendTimer) {
	        clearTimeout(self._suspendTimer);
	        self._suspendTimer = null;
	      } else if (self.state === 'suspended' || self.state === 'running' && self.ctx.state === 'interrupted') {
	        self.ctx.resume().then(function() {
	          self.state = 'running';

	          // Emit to all Howls that the audio has resumed.
	          for (var i=0; i<self._howls.length; i++) {
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
	  };

	  // Setup the global audio controller.
	  var Howler = new HowlerGlobal();

	  /** Group Methods **/
	  /***************************************************************************/

	  /**
	   * Create an audio group controller.
	   * @param {Object} o Passed in properties for this group.
	   */
	  var Howl = function(o) {
	    var self = this;

	    // Throw an error if no source is provided.
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
	    init: function(o) {
	      var self = this;

	      // If we don't have an AudioContext created yet, run the setup.
	      if (!Howler.ctx) {
	        setupAudioContext();
	      }

	      // Setup user-defined default properties.
	      self._autoplay = o.autoplay || false;
	      self._format = (typeof o.format !== 'string') ? o.format : [o.format];
	      self._html5 = o.html5 || false;
	      self._muted = o.mute || false;
	      self._loop = o.loop || false;
	      self._pool = o.pool || 5;
	      self._preload = (typeof o.preload === 'boolean' || o.preload === 'metadata') ? o.preload : true;
	      self._rate = o.rate || 1;
	      self._sprite = o.sprite || {};
	      self._src = (typeof o.src !== 'string') ? o.src : [o.src];
	      self._volume = o.volume !== undefined ? o.volume : 1;
	      self._xhr = {
	        method: o.xhr && o.xhr.method ? o.xhr.method : 'GET',
	        headers: o.xhr && o.xhr.headers ? o.xhr.headers : null,
	        withCredentials: o.xhr && o.xhr.withCredentials ? o.xhr.withCredentials : false,
	      };

	      // Setup all other default properties.
	      self._duration = 0;
	      self._state = 'unloaded';
	      self._sounds = [];
	      self._endTimers = {};
	      self._queue = [];
	      self._playLock = false;

	      // Setup event listeners.
	      self._onend = o.onend ? [{fn: o.onend}] : [];
	      self._onfade = o.onfade ? [{fn: o.onfade}] : [];
	      self._onload = o.onload ? [{fn: o.onload}] : [];
	      self._onloaderror = o.onloaderror ? [{fn: o.onloaderror}] : [];
	      self._onplayerror = o.onplayerror ? [{fn: o.onplayerror}] : [];
	      self._onpause = o.onpause ? [{fn: o.onpause}] : [];
	      self._onplay = o.onplay ? [{fn: o.onplay}] : [];
	      self._onstop = o.onstop ? [{fn: o.onstop}] : [];
	      self._onmute = o.onmute ? [{fn: o.onmute}] : [];
	      self._onvolume = o.onvolume ? [{fn: o.onvolume}] : [];
	      self._onrate = o.onrate ? [{fn: o.onrate}] : [];
	      self._onseek = o.onseek ? [{fn: o.onseek}] : [];
	      self._onunlock = o.onunlock ? [{fn: o.onunlock}] : [];
	      self._onresume = [];

	      // Web Audio or HTML5 Audio?
	      self._webAudio = Howler.usingWebAudio && !self._html5;

	      // Automatically try to enable audio.
	      if (typeof Howler.ctx !== 'undefined' && Howler.ctx && Howler.autoUnlock) {
	        Howler._unlockAudio();
	      }

	      // Keep track of this Howl group in the global controller.
	      Howler._howls.push(self);

	      // If they selected autoplay, add a play event to the load queue.
	      if (self._autoplay) {
	        self._queue.push({
	          event: 'play',
	          action: function() {
	            self.play();
	          }
	        });
	      }

	      // Load the source file unless otherwise specified.
	      if (self._preload && self._preload !== 'none') {
	        self.load();
	      }

	      return self;
	    },

	    /**
	     * Load the audio file.
	     * @return {Howler}
	     */
	    load: function() {
	      var self = this;
	      var url = null;

	      // If no audio is available, quit immediately.
	      if (Howler.noAudio) {
	        self._emit('loaderror', null, 'No audio support.');
	        return;
	      }

	      // Make sure our source is in an array.
	      if (typeof self._src === 'string') {
	        self._src = [self._src];
	      }

	      // Loop through the sources and pick the first one that is compatible.
	      for (var i=0; i<self._src.length; i++) {
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
	          }

	          // Extract the file extension from the URL or base64 data URI.
	          ext = /^data:audio\/([^;,]+);/i.exec(str);
	          if (!ext) {
	            ext = /\.([^.]+)$/.exec(str.split('?', 1)[0]);
	          }

	          if (ext) {
	            ext = ext[1].toLowerCase();
	          }
	        }

	        // Log a warning if no extension was found.
	        if (!ext) {
	          console.warn('No file extension was found. Consider using the "format" property or specify an extension.');
	        }

	        // Check if this extension is available.
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
	      self._state = 'loading';

	      // If the hosting page is HTTPS and the source isn't,
	      // drop down to HTML5 Audio to avoid Mixed Content errors.
	      if (window.location.protocol === 'https:' && url.slice(0, 5) === 'http:') {
	        self._html5 = true;
	        self._webAudio = false;
	      }

	      // Create a new sound object and add it to the pool.
	      new Sound(self);

	      // Load and decode the audio data for playback.
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
	    play: function(sprite, internal) {
	      var self = this;
	      var id = null;

	      // Determine if a sprite, sound id or nothing was passed
	      if (typeof sprite === 'number') {
	        id = sprite;
	        sprite = null;
	      } else if (typeof sprite === 'string' && self._state === 'loaded' && !self._sprite[sprite]) {
	        // If the passed sprite doesn't exist, do nothing.
	        return null;
	      } else if (typeof sprite === 'undefined') {
	        // Use the default sound sprite (plays the full audio length).
	        sprite = '__default';

	        // Check if there is a single paused sound that isn't ended.
	        // If there is, play that sound. If not, continue as usual.
	        if (!self._playLock) {
	          var num = 0;
	          for (var i=0; i<self._sounds.length; i++) {
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
	      }

	      // Get the selected node, or get one from the pool.
	      var sound = id ? self._soundById(id) : self._inactiveSound();

	      // If the sound doesn't exist, do nothing.
	      if (!sound) {
	        return null;
	      }

	      // Select the sprite definition.
	      if (id && !sprite) {
	        sprite = sound._sprite || '__default';
	      }

	      // If the sound hasn't loaded, we must wait to get the audio's duration.
	      // We also need to wait to make sure we don't run into race conditions with
	      // the order of function calls.
	      if (self._state !== 'loaded') {
	        // Set the sprite value on this sound.
	        sound._sprite = sprite;

	        // Mark this sound as not ended in case another sound is played before this one loads.
	        sound._ended = false;

	        // Add the sound to the queue to be played on load.
	        var soundId = sound._id;
	        self._queue.push({
	          event: 'play',
	          action: function() {
	            self.play(soundId);
	          }
	        });

	        return soundId;
	      }

	      // Don't play the sound if an id was passed and it is already playing.
	      if (id && !sound._paused) {
	        // Trigger the play event, in order to keep iterating through queue.
	        if (!internal) {
	          self._loadQueue('play');
	        }

	        return sound._id;
	      }

	      // Make sure the AudioContext isn't suspended, and resume it if it is.
	      if (self._webAudio) {
	        Howler._autoResume();
	      }

	      // Determine how long to play for and where to start playing.
	      var seek = Math.max(0, sound._seek > 0 ? sound._seek : self._sprite[sprite][0] / 1000);
	      var duration = Math.max(0, ((self._sprite[sprite][0] + self._sprite[sprite][1]) / 1000) - seek);
	      var timeout = (duration * 1000) / Math.abs(sound._rate);
	      var start = self._sprite[sprite][0] / 1000;
	      var stop = (self._sprite[sprite][0] + self._sprite[sprite][1]) / 1000;
	      sound._sprite = sprite;

	      // Mark the sound as ended instantly so that this async playback
	      // doesn't get grabbed by another call to play while this one waits to start.
	      sound._ended = false;

	      // Update the parameters of the sound.
	      var setParams = function() {
	        sound._paused = false;
	        sound._seek = seek;
	        sound._start = start;
	        sound._stop = stop;
	        sound._loop = !!(sound._loop || self._sprite[sprite][2]);
	      };

	      // End the sound instantly if seek is at the end.
	      if (seek >= stop) {
	        self._ended(sound);
	        return;
	      }

	      // Begin the actual playback.
	      var node = sound._node;
	      if (self._webAudio) {
	        // Fire this when the sound is ready to play to begin Web Audio playback.
	        var playWebAudio = function() {
	          self._playLock = false;
	          setParams();
	          self._refreshBuffer(sound);

	          // Setup the playback params.
	          var vol = (sound._muted || self._muted) ? 0 : sound._volume;
	          node.gain.setValueAtTime(vol, Howler.ctx.currentTime);
	          sound._playStart = Howler.ctx.currentTime;

	          // Play the sound using the supported method.
	          if (typeof node.bufferSource.start === 'undefined') {
	            sound._loop ? node.bufferSource.noteGrainOn(0, seek, 86400) : node.bufferSource.noteGrainOn(0, seek, duration);
	          } else {
	            sound._loop ? node.bufferSource.start(0, seek, 86400) : node.bufferSource.start(0, seek, duration);
	          }

	          // Start a new timer if none is present.
	          if (timeout !== Infinity) {
	            self._endTimers[sound._id] = setTimeout(self._ended.bind(self, sound), timeout);
	          }

	          if (!internal) {
	            setTimeout(function() {
	              self._emit('play', sound._id);
	              self._loadQueue();
	            }, 0);
	          }
	        };

	        if (Howler.state === 'running' && Howler.ctx.state !== 'interrupted') {
	          playWebAudio();
	        } else {
	          self._playLock = true;

	          // Wait for the audio context to resume before playing.
	          self.once('resume', playWebAudio);

	          // Cancel the end timer.
	          self._clearTimer(sound._id);
	        }
	      } else {
	        // Fire this when the sound is ready to play to begin HTML5 Audio playback.
	        var playHtml5 = function() {
	          node.currentTime = seek;
	          node.muted = sound._muted || self._muted || Howler._muted || node.muted;
	          node.volume = sound._volume * Howler.volume();
	          node.playbackRate = sound._rate;

	          // Some browsers will throw an error if this is called without user interaction.
	          try {
	            var play = node.play();

	            // Support older browsers that don't support promises, and thus don't have this issue.
	            if (play && typeof Promise !== 'undefined' && (play instanceof Promise || typeof play.then === 'function')) {
	              // Implements a lock to prevent DOMException: The play() request was interrupted by a call to pause().
	              self._playLock = true;

	              // Set param values immediately.
	              setParams();

	              // Releases the lock and executes queued actions.
	              play
	                .then(function() {
	                  self._playLock = false;
	                  node._unlocked = true;
	                  if (!internal) {
	                    self._emit('play', sound._id);
	                    self._loadQueue();
	                  }
	                })
	                .catch(function() {
	                  self._playLock = false;
	                  self._emit('playerror', sound._id, 'Playback was unable to start. This is most commonly an issue ' +
	                    'on mobile devices and Chrome where playback was not within a user interaction.');

	                  // Reset the ended and paused values.
	                  sound._ended = true;
	                  sound._paused = true;
	                });
	            } else if (!internal) {
	              self._playLock = false;
	              setParams();
	              self._emit('play', sound._id);
	              self._loadQueue();
	            }

	            // Setting rate before playing won't work in IE, so we set it again here.
	            node.playbackRate = sound._rate;

	            // If the node is still paused, then we can assume there was a playback issue.
	            if (node.paused) {
	              self._emit('playerror', sound._id, 'Playback was unable to start. This is most commonly an issue ' +
	                'on mobile devices and Chrome where playback was not within a user interaction.');
	              return;
	            }

	            // Setup the end timer on sprites or listen for the ended event.
	            if (sprite !== '__default' || sound._loop) {
	              self._endTimers[sound._id] = setTimeout(self._ended.bind(self, sound), timeout);
	            } else {
	              self._endTimers[sound._id] = function() {
	                // Fire ended on this audio node.
	                self._ended(sound);

	                // Clear this listener.
	                node.removeEventListener('ended', self._endTimers[sound._id], false);
	              };
	              node.addEventListener('ended', self._endTimers[sound._id], false);
	            }
	          } catch (err) {
	            self._emit('playerror', sound._id, err);
	          }
	        };

	        // If this is streaming audio, make sure the src is set and load again.
	        if (node.src === 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA') {
	          node.src = self._src;
	          node.load();
	        }

	        // Play immediately if ready, or wait for the 'canplaythrough'e vent.
	        var loadedNoReadyState = (window && window.ejecta) || (!node.readyState && Howler._navigator.isCocoonJS);
	        if (node.readyState >= 3 || loadedNoReadyState) {
	          playHtml5();
	        } else {
	          self._playLock = true;

	          var listener = function() {
	            // Begin playback.
	            playHtml5();

	            // Clear this listener.
	            node.removeEventListener(Howler._canPlayEvent, listener, false);
	          };
	          node.addEventListener(Howler._canPlayEvent, listener, false);

	          // Cancel the end timer.
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
	    pause: function(id) {
	      var self = this;

	      // If the sound hasn't loaded or a play() promise is pending, add it to the load queue to pause when capable.
	      if (self._state !== 'loaded' || self._playLock) {
	        self._queue.push({
	          event: 'pause',
	          action: function() {
	            self.pause(id);
	          }
	        });

	        return self;
	      }

	      // If no id is passed, get all ID's to be paused.
	      var ids = self._getSoundIds(id);

	      for (var i=0; i<ids.length; i++) {
	        // Clear the end timer.
	        self._clearTimer(ids[i]);

	        // Get the sound.
	        var sound = self._soundById(ids[i]);

	        if (sound && !sound._paused) {
	          // Reset the seek position.
	          sound._seek = self.seek(ids[i]);
	          sound._rateSeek = 0;
	          sound._paused = true;

	          // Stop currently running fades.
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
	              }

	              // Clean up the buffer source.
	              self._cleanBuffer(sound._node);
	            } else if (!isNaN(sound._node.duration) || sound._node.duration === Infinity) {
	              sound._node.pause();
	            }
	          }
	        }

	        // Fire the pause event, unless `true` is passed as the 2nd argument.
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
	    stop: function(id, internal) {
	      var self = this;

	      // If the sound hasn't loaded, add it to the load queue to stop when capable.
	      if (self._state !== 'loaded' || self._playLock) {
	        self._queue.push({
	          event: 'stop',
	          action: function() {
	            self.stop(id);
	          }
	        });

	        return self;
	      }

	      // If no id is passed, get all ID's to be stopped.
	      var ids = self._getSoundIds(id);

	      for (var i=0; i<ids.length; i++) {
	        // Clear the end timer.
	        self._clearTimer(ids[i]);

	        // Get the sound.
	        var sound = self._soundById(ids[i]);

	        if (sound) {
	          // Reset the seek position.
	          sound._seek = sound._start || 0;
	          sound._rateSeek = 0;
	          sound._paused = true;
	          sound._ended = true;

	          // Stop currently running fades.
	          self._stopFade(ids[i]);

	          if (sound._node) {
	            if (self._webAudio) {
	              // Make sure the sound's AudioBufferSourceNode has been created.
	              if (sound._node.bufferSource) {
	                if (typeof sound._node.bufferSource.stop === 'undefined') {
	                  sound._node.bufferSource.noteOff(0);
	                } else {
	                  sound._node.bufferSource.stop(0);
	                }

	                // Clean up the buffer source.
	                self._cleanBuffer(sound._node);
	              }
	            } else if (!isNaN(sound._node.duration) || sound._node.duration === Infinity) {
	              sound._node.currentTime = sound._start || 0;
	              sound._node.pause();

	              // If this is a live stream, stop download once the audio is stopped.
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
	    mute: function(muted, id) {
	      var self = this;

	      // If the sound hasn't loaded, add it to the load queue to mute when capable.
	      if (self._state !== 'loaded'|| self._playLock) {
	        self._queue.push({
	          event: 'mute',
	          action: function() {
	            self.mute(muted, id);
	          }
	        });

	        return self;
	      }

	      // If applying mute/unmute to all sounds, update the group's value.
	      if (typeof id === 'undefined') {
	        if (typeof muted === 'boolean') {
	          self._muted = muted;
	        } else {
	          return self._muted;
	        }
	      }

	      // If no id is passed, get all ID's to be muted.
	      var ids = self._getSoundIds(id);

	      for (var i=0; i<ids.length; i++) {
	        // Get the sound.
	        var sound = self._soundById(ids[i]);

	        if (sound) {
	          sound._muted = muted;

	          // Cancel active fade and set the volume to the end value.
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
	    volume: function() {
	      var self = this;
	      var args = arguments;
	      var vol, id;

	      // Determine the values based on arguments.
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
	      }

	      // Update the volume or return the current volume.
	      var sound;
	      if (typeof vol !== 'undefined' && vol >= 0 && vol <= 1) {
	        // If the sound hasn't loaded, add it to the load queue to change volume when capable.
	        if (self._state !== 'loaded'|| self._playLock) {
	          self._queue.push({
	            event: 'volume',
	            action: function() {
	              self.volume.apply(self, args);
	            }
	          });

	          return self;
	        }

	        // Set the group volume.
	        if (typeof id === 'undefined') {
	          self._volume = vol;
	        }

	        // Update one or all volumes.
	        id = self._getSoundIds(id);
	        for (var i=0; i<id.length; i++) {
	          // Get the sound.
	          sound = self._soundById(id[i]);

	          if (sound) {
	            sound._volume = vol;

	            // Stop currently running fades.
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
	    fade: function(from, to, len, id) {
	      var self = this;

	      // If the sound hasn't loaded, add it to the load queue to fade when capable.
	      if (self._state !== 'loaded' || self._playLock) {
	        self._queue.push({
	          event: 'fade',
	          action: function() {
	            self.fade(from, to, len, id);
	          }
	        });

	        return self;
	      }

	      // Make sure the to/from/len values are numbers.
	      from = Math.min(Math.max(0, parseFloat(from)), 1);
	      to = Math.min(Math.max(0, parseFloat(to)), 1);
	      len = parseFloat(len);

	      // Set the volume to the start position.
	      self.volume(from, id);

	      // Fade the volume of one or all sounds.
	      var ids = self._getSoundIds(id);
	      for (var i=0; i<ids.length; i++) {
	        // Get the sound.
	        var sound = self._soundById(ids[i]);

	        // Create a linear fade or fall back to timeouts with HTML5 Audio.
	        if (sound) {
	          // Stop the previous fade if no sprite is being used (otherwise, volume handles this).
	          if (!id) {
	            self._stopFade(ids[i]);
	          }

	          // If we are using Web Audio, let the native methods do the actual fade.
	          if (self._webAudio && !sound._muted) {
	            var currentTime = Howler.ctx.currentTime;
	            var end = currentTime + (len / 1000);
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
	    _startFadeInterval: function(sound, from, to, len, id, isGroup) {
	      var self = this;
	      var vol = from;
	      var diff = to - from;
	      var steps = Math.abs(diff / 0.01);
	      var stepLen = Math.max(4, (steps > 0) ? len / steps : len);
	      var lastTick = Date.now();

	      // Store the value being faded to.
	      sound._fadeTo = to;

	      // Update the volume value on each interval tick.
	      sound._interval = setInterval(function() {
	        // Update the volume based on the time since the last tick.
	        var tick = (Date.now() - lastTick) / len;
	        lastTick = Date.now();
	        vol += diff * tick;

	        // Round to within 2 decimal points.
	        vol = Math.round(vol * 100) / 100;

	        // Make sure the volume is in the right bounds.
	        if (diff < 0) {
	          vol = Math.max(to, vol);
	        } else {
	          vol = Math.min(to, vol);
	        }

	        // Change the volume.
	        if (self._webAudio) {
	          sound._volume = vol;
	        } else {
	          self.volume(vol, sound._id, true);
	        }

	        // Set the group's volume.
	        if (isGroup) {
	          self._volume = vol;
	        }

	        // When the fade is complete, stop it and fire event.
	        if ((to < from && vol <= to) || (to > from && vol >= to)) {
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
	    _stopFade: function(id) {
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
	    loop: function() {
	      var self = this;
	      var args = arguments;
	      var loop, id, sound;

	      // Determine the values for loop and id.
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
	      }

	      // If no id is passed, get all ID's to be looped.
	      var ids = self._getSoundIds(id);
	      for (var i=0; i<ids.length; i++) {
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
	    rate: function() {
	      var self = this;
	      var args = arguments;
	      var rate, id;

	      // Determine the values based on arguments.
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
	      }

	      // Update the playback rate or return the current value.
	      var sound;
	      if (typeof rate === 'number') {
	        // If the sound hasn't loaded, add it to the load queue to change playback rate when capable.
	        if (self._state !== 'loaded' || self._playLock) {
	          self._queue.push({
	            event: 'rate',
	            action: function() {
	              self.rate.apply(self, args);
	            }
	          });

	          return self;
	        }

	        // Set the group rate.
	        if (typeof id === 'undefined') {
	          self._rate = rate;
	        }

	        // Update one or all volumes.
	        id = self._getSoundIds(id);
	        for (var i=0; i<id.length; i++) {
	          // Get the sound.
	          sound = self._soundById(id[i]);

	          if (sound) {
	            // Keep track of our position when the rate changed and update the playback
	            // start position so we can properly adjust the seek position for time elapsed.
	            if (self.playing(id[i])) {
	              sound._rateSeek = self.seek(id[i]);
	              sound._playStart = self._webAudio ? Howler.ctx.currentTime : sound._playStart;
	            }
	            sound._rate = rate;

	            // Change the playback rate.
	            if (self._webAudio && sound._node && sound._node.bufferSource) {
	              sound._node.bufferSource.playbackRate.setValueAtTime(rate, Howler.ctx.currentTime);
	            } else if (sound._node) {
	              sound._node.playbackRate = rate;
	            }

	            // Reset the timers.
	            var seek = self.seek(id[i]);
	            var duration = ((self._sprite[sound._sprite][0] + self._sprite[sound._sprite][1]) / 1000) - seek;
	            var timeout = (duration * 1000) / Math.abs(sound._rate);

	            // Start a new end timer if sound is already playing.
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
	    seek: function() {
	      var self = this;
	      var args = arguments;
	      var seek, id;

	      // Determine the values based on arguments.
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
	      }

	      // If there is no ID, bail out.
	      if (typeof id === 'undefined') {
	        return self;
	      }

	      // If the sound hasn't loaded, add it to the load queue to seek when capable.
	      if (typeof seek === 'number' && (self._state !== 'loaded' || self._playLock)) {
	        self._queue.push({
	          event: 'seek',
	          action: function() {
	            self.seek.apply(self, args);
	          }
	        });

	        return self;
	      }

	      // Get the sound.
	      var sound = self._soundById(id);

	      if (sound) {
	        if (typeof seek === 'number' && seek >= 0) {
	          // Pause the sound and update position for restarting playback.
	          var playing = self.playing(id);
	          if (playing) {
	            self.pause(id, true);
	          }

	          // Move the position of the track and cancel timer.
	          sound._seek = seek;
	          sound._ended = false;
	          self._clearTimer(id);

	          // Update the seek position for HTML5 Audio.
	          if (!self._webAudio && sound._node && !isNaN(sound._node.duration)) {
	            sound._node.currentTime = seek;
	          }

	          // Seek and emit when ready.
	          var seekAndEmit = function() {
	            self._emit('seek', id);

	            // Restart the playback if the sound was playing.
	            if (playing) {
	              self.play(id, true);
	            }
	          };

	          // Wait for the play lock to be unset before emitting (HTML5 Audio).
	          if (playing && !self._webAudio) {
	            var emitSeek = function() {
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
	    playing: function(id) {
	      var self = this;

	      // Check the passed sound ID (if any).
	      if (typeof id === 'number') {
	        var sound = self._soundById(id);
	        return sound ? !sound._paused : false;
	      }

	      // Otherwise, loop through all sounds and check if any are playing.
	      for (var i=0; i<self._sounds.length; i++) {
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
	    duration: function(id) {
	      var self = this;
	      var duration = self._duration;

	      // If we pass an ID, get the sound and return the sprite length.
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
	    state: function() {
	      return this._state;
	    },

	    /**
	     * Unload and destroy the current Howl object.
	     * This will immediately stop all sound instances attached to this group.
	     */
	    unload: function() {
	      var self = this;

	      // Stop playing any active sounds.
	      var sounds = self._sounds;
	      for (var i=0; i<sounds.length; i++) {
	        // Stop the sound if it is currently playing.
	        if (!sounds[i]._paused) {
	          self.stop(sounds[i]._id);
	        }

	        // Remove the source or disconnect.
	        if (!self._webAudio) {
	          // Set the source to 0-second silence to stop any downloading (except in IE).
	          self._clearSound(sounds[i]._node);

	          // Remove any event listeners.
	          sounds[i]._node.removeEventListener('error', sounds[i]._errorFn, false);
	          sounds[i]._node.removeEventListener(Howler._canPlayEvent, sounds[i]._loadFn, false);
	          sounds[i]._node.removeEventListener('ended', sounds[i]._endFn, false);

	          // Release the Audio object back to the pool.
	          Howler._releaseHtml5Audio(sounds[i]._node);
	        }

	        // Empty out all of the nodes.
	        delete sounds[i]._node;

	        // Make sure all timers are cleared out.
	        self._clearTimer(sounds[i]._id);
	      }

	      // Remove the references in the global Howler object.
	      var index = Howler._howls.indexOf(self);
	      if (index >= 0) {
	        Howler._howls.splice(index, 1);
	      }

	      // Delete this sound from the cache (if no other Howl is using it).
	      var remCache = true;
	      for (i=0; i<Howler._howls.length; i++) {
	        if (Howler._howls[i]._src === self._src || self._src.indexOf(Howler._howls[i]._src) >= 0) {
	          remCache = false;
	          break;
	        }
	      }

	      if (cache && remCache) {
	        delete cache[self._src];
	      }

	      // Clear global errors.
	      Howler.noAudio = false;

	      // Clear out `self`.
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
	    on: function(event, fn, id, once) {
	      var self = this;
	      var events = self['_on' + event];

	      if (typeof fn === 'function') {
	        events.push(once ? {id: id, fn: fn, once: once} : {id: id, fn: fn});
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
	    off: function(event, fn, id) {
	      var self = this;
	      var events = self['_on' + event];
	      var i = 0;

	      // Allow passing just an event and ID.
	      if (typeof fn === 'number') {
	        id = fn;
	        fn = null;
	      }

	      if (fn || id) {
	        // Loop through event store and remove the passed function.
	        for (i=0; i<events.length; i++) {
	          var isId = (id === events[i].id);
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
	        for (i=0; i<keys.length; i++) {
	          if ((keys[i].indexOf('_on') === 0) && Array.isArray(self[keys[i]])) {
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
	    once: function(event, fn, id) {
	      var self = this;

	      // Setup the event listener.
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
	    _emit: function(event, id, msg) {
	      var self = this;
	      var events = self['_on' + event];

	      // Loop through event store and fire all functions.
	      for (var i=events.length-1; i>=0; i--) {
	        // Only fire the listener if the correct ID is used.
	        if (!events[i].id || events[i].id === id || event === 'load') {
	          setTimeout(function(fn) {
	            fn.call(this, id, msg);
	          }.bind(self, events[i].fn), 0);

	          // If this event was setup with `once`, remove it.
	          if (events[i].once) {
	            self.off(event, events[i].fn, events[i].id);
	          }
	        }
	      }

	      // Pass the event type into load queue so that it can continue stepping.
	      self._loadQueue(event);

	      return self;
	    },

	    /**
	     * Queue of actions initiated before the sound has loaded.
	     * These will be called in sequence, with the next only firing
	     * after the previous has finished executing (even if async like play).
	     * @return {Howl}
	     */
	    _loadQueue: function(event) {
	      var self = this;

	      if (self._queue.length > 0) {
	        var task = self._queue[0];

	        // Remove this task if a matching event was passed.
	        if (task.event === event) {
	          self._queue.shift();
	          self._loadQueue();
	        }

	        // Run the task if no event type is passed.
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
	    _ended: function(sound) {
	      var self = this;
	      var sprite = sound._sprite;

	      // If we are using IE and there was network latency we may be clipping
	      // audio before it completes playing. Lets check the node to make sure it
	      // believes it has completed, before ending the playback.
	      if (!self._webAudio && sound._node && !sound._node.paused && !sound._node.ended && sound._node.currentTime < sound._stop) {
	        setTimeout(self._ended.bind(self, sound), 100);
	        return self;
	      }

	      // Should this sound loop?
	      var loop = !!(sound._loop || self._sprite[sprite][2]);

	      // Fire the ended event.
	      self._emit('end', sound._id);

	      // Restart the playback for HTML5 Audio loop.
	      if (!self._webAudio && loop) {
	        self.stop(sound._id, true).play(sound._id);
	      }

	      // Restart this timer if on a Web Audio loop.
	      if (self._webAudio && loop) {
	        self._emit('play', sound._id);
	        sound._seek = sound._start || 0;
	        sound._rateSeek = 0;
	        sound._playStart = Howler.ctx.currentTime;

	        var timeout = ((sound._stop - sound._start) * 1000) / Math.abs(sound._rate);
	        self._endTimers[sound._id] = setTimeout(self._ended.bind(self, sound), timeout);
	      }

	      // Mark the node as paused.
	      if (self._webAudio && !loop) {
	        sound._paused = true;
	        sound._ended = true;
	        sound._seek = sound._start || 0;
	        sound._rateSeek = 0;
	        self._clearTimer(sound._id);

	        // Clean up the buffer source.
	        self._cleanBuffer(sound._node);

	        // Attempt to auto-suspend AudioContext if no sounds are still playing.
	        Howler._autoSuspend();
	      }

	      // When using a sprite, end the track.
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
	    _clearTimer: function(id) {
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
	    _soundById: function(id) {
	      var self = this;

	      // Loop through all sounds and find the one with this ID.
	      for (var i=0; i<self._sounds.length; i++) {
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
	    _inactiveSound: function() {
	      var self = this;

	      self._drain();

	      // Find the first inactive node to recycle.
	      for (var i=0; i<self._sounds.length; i++) {
	        if (self._sounds[i]._ended) {
	          return self._sounds[i].reset();
	        }
	      }

	      // If no inactive node was found, create a new one.
	      return new Sound(self);
	    },

	    /**
	     * Drain excess inactive sounds from the pool.
	     */
	    _drain: function() {
	      var self = this;
	      var limit = self._pool;
	      var cnt = 0;
	      var i = 0;

	      // If there are less sounds than the max pool size, we are done.
	      if (self._sounds.length < limit) {
	        return;
	      }

	      // Count the number of inactive sounds.
	      for (i=0; i<self._sounds.length; i++) {
	        if (self._sounds[i]._ended) {
	          cnt++;
	        }
	      }

	      // Remove excess inactive sounds, going in reverse order.
	      for (i=self._sounds.length - 1; i>=0; i--) {
	        if (cnt <= limit) {
	          return;
	        }

	        if (self._sounds[i]._ended) {
	          // Disconnect the audio source when using Web Audio.
	          if (self._webAudio && self._sounds[i]._node) {
	            self._sounds[i]._node.disconnect(0);
	          }

	          // Remove sounds until we have the pool size.
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
	    _getSoundIds: function(id) {
	      var self = this;

	      if (typeof id === 'undefined') {
	        var ids = [];
	        for (var i=0; i<self._sounds.length; i++) {
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
	    _refreshBuffer: function(sound) {
	      var self = this;

	      // Setup the buffer source for playback.
	      sound._node.bufferSource = Howler.ctx.createBufferSource();
	      sound._node.bufferSource.buffer = cache[self._src];

	      // Connect to the correct node.
	      if (sound._panner) {
	        sound._node.bufferSource.connect(sound._panner);
	      } else {
	        sound._node.bufferSource.connect(sound._node);
	      }

	      // Setup looping and playback rate.
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
	    _cleanBuffer: function(node) {
	      var self = this;
	      var isIOS = Howler._navigator && Howler._navigator.vendor.indexOf('Apple') >= 0;

	      if (Howler._scratchBuffer && node.bufferSource) {
	        node.bufferSource.onended = null;
	        node.bufferSource.disconnect(0);
	        if (isIOS) {
	          try { node.bufferSource.buffer = Howler._scratchBuffer; } catch(e) {}
	        }
	      }
	      node.bufferSource = null;

	      return self;
	    },

	    /**
	     * Set the source to a 0-second silence to stop any downloading (except in IE).
	     * @param  {Object} node Audio node to clear.
	     */
	    _clearSound: function(node) {
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
	  var Sound = function(howl) {
	    this._parent = howl;
	    this.init();
	  };
	  Sound.prototype = {
	    /**
	     * Initialize a new Sound object.
	     * @return {Sound}
	     */
	    init: function() {
	      var self = this;
	      var parent = self._parent;

	      // Setup the default parameters.
	      self._muted = parent._muted;
	      self._loop = parent._loop;
	      self._volume = parent._volume;
	      self._rate = parent._rate;
	      self._seek = 0;
	      self._paused = true;
	      self._ended = true;
	      self._sprite = '__default';

	      // Generate a unique ID for this sound.
	      self._id = ++Howler._counter;

	      // Add itself to the parent's pool.
	      parent._sounds.push(self);

	      // Create the new node.
	      self.create();

	      return self;
	    },

	    /**
	     * Create and setup a new sound object, whether HTML5 Audio or Web Audio.
	     * @return {Sound}
	     */
	    create: function() {
	      var self = this;
	      var parent = self._parent;
	      var volume = (Howler._muted || self._muted || self._parent._muted) ? 0 : self._volume;

	      if (parent._webAudio) {
	        // Create the gain node for controlling volume (the source will connect to this).
	        self._node = (typeof Howler.ctx.createGain === 'undefined') ? Howler.ctx.createGainNode() : Howler.ctx.createGain();
	        self._node.gain.setValueAtTime(volume, Howler.ctx.currentTime);
	        self._node.paused = true;
	        self._node.connect(Howler.masterGain);
	      } else if (!Howler.noAudio) {
	        // Get an unlocked Audio object from the pool.
	        self._node = Howler._obtainHtml5Audio();

	        // Listen for errors (http://dev.w3.org/html5/spec-author-view/spec.html#mediaerror).
	        self._errorFn = self._errorListener.bind(self);
	        self._node.addEventListener('error', self._errorFn, false);

	        // Listen for 'canplaythrough' event to let us know the sound is ready.
	        self._loadFn = self._loadListener.bind(self);
	        self._node.addEventListener(Howler._canPlayEvent, self._loadFn, false);

	        // Listen for the 'ended' event on the sound to account for edge-case where
	        // a finite sound has a duration of Infinity.
	        self._endFn = self._endListener.bind(self);
	        self._node.addEventListener('ended', self._endFn, false);

	        // Setup the new audio node.
	        self._node.src = parent._src;
	        self._node.preload = parent._preload === true ? 'auto' : parent._preload;
	        self._node.volume = volume * Howler.volume();

	        // Begin loading the source.
	        self._node.load();
	      }

	      return self;
	    },

	    /**
	     * Reset the parameters of this sound to the original state (for recycle).
	     * @return {Sound}
	     */
	    reset: function() {
	      var self = this;
	      var parent = self._parent;

	      // Reset all of the parameters of this sound.
	      self._muted = parent._muted;
	      self._loop = parent._loop;
	      self._volume = parent._volume;
	      self._rate = parent._rate;
	      self._seek = 0;
	      self._rateSeek = 0;
	      self._paused = true;
	      self._ended = true;
	      self._sprite = '__default';

	      // Generate a new ID so that it isn't confused with the previous sound.
	      self._id = ++Howler._counter;

	      return self;
	    },

	    /**
	     * HTML5 Audio error listener callback.
	     */
	    _errorListener: function() {
	      var self = this;

	      // Fire an error event and pass back the code.
	      self._parent._emit('loaderror', self._id, self._node.error ? self._node.error.code : 0);

	      // Clear the event listener.
	      self._node.removeEventListener('error', self._errorFn, false);
	    },

	    /**
	     * HTML5 Audio canplaythrough listener callback.
	     */
	    _loadListener: function() {
	      var self = this;
	      var parent = self._parent;

	      // Round up the duration to account for the lower precision in HTML5 Audio.
	      parent._duration = Math.ceil(self._node.duration * 10) / 10;

	      // Setup a sprite if none is defined.
	      if (Object.keys(parent._sprite).length === 0) {
	        parent._sprite = {__default: [0, parent._duration * 1000]};
	      }

	      if (parent._state !== 'loaded') {
	        parent._state = 'loaded';
	        parent._emit('load');
	        parent._loadQueue();
	      }

	      // Clear the event listener.
	      self._node.removeEventListener(Howler._canPlayEvent, self._loadFn, false);
	    },

	    /**
	     * HTML5 Audio ended listener callback.
	     */
	    _endListener: function() {
	      var self = this;
	      var parent = self._parent;

	      // Only handle the `ended`` event if the duration is Infinity.
	      if (parent._duration === Infinity) {
	        // Update the parent duration to match the real audio duration.
	        // Round up the duration to account for the lower precision in HTML5 Audio.
	        parent._duration = Math.ceil(self._node.duration * 10) / 10;

	        // Update the sprite that corresponds to the real duration.
	        if (parent._sprite.__default[1] === Infinity) {
	          parent._sprite.__default[1] = parent._duration * 1000;
	        }

	        // Run the regular ended method.
	        parent._ended(self);
	      }

	      // Clear the event listener since the duration is now correct.
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
	  var loadBuffer = function(self) {
	    var url = self._src;

	    // Check if the buffer has already been cached and use it instead.
	    if (cache[url]) {
	      // Set the duration from the cache.
	      self._duration = cache[url].duration;

	      // Load the sound into this Howl.
	      loadSound(self);

	      return;
	    }

	    if (/^data:[^;]+;base64,/.test(url)) {
	      // Decode the base64 data URI without XHR, since some browsers don't support it.
	      var data = atob(url.split(',')[1]);
	      var dataView = new Uint8Array(data.length);
	      for (var i=0; i<data.length; ++i) {
	        dataView[i] = data.charCodeAt(i);
	      }

	      decodeAudioData(dataView.buffer, self);
	    } else {
	      // Load the buffer from the URL.
	      var xhr = new XMLHttpRequest();
	      xhr.open(self._xhr.method, url, true);
	      xhr.withCredentials = self._xhr.withCredentials;
	      xhr.responseType = 'arraybuffer';

	      // Apply any custom headers to the request.
	      if (self._xhr.headers) {
	        Object.keys(self._xhr.headers).forEach(function(key) {
	          xhr.setRequestHeader(key, self._xhr.headers[key]);
	        });
	      }

	      xhr.onload = function() {
	        // Make sure we get a successful response back.
	        var code = (xhr.status + '')[0];
	        if (code !== '0' && code !== '2' && code !== '3') {
	          self._emit('loaderror', null, 'Failed loading audio file with status: ' + xhr.status + '.');
	          return;
	        }

	        decodeAudioData(xhr.response, self);
	      };
	      xhr.onerror = function() {
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
	  var safeXhrSend = function(xhr) {
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
	  var decodeAudioData = function(arraybuffer, self) {
	    // Fire a load error if something broke.
	    var error = function() {
	      self._emit('loaderror', null, 'Decoding audio data failed.');
	    };

	    // Load the sound on success.
	    var success = function(buffer) {
	      if (buffer && self._sounds.length > 0) {
	        cache[self._src] = buffer;
	        loadSound(self, buffer);
	      } else {
	        error();
	      }
	    };

	    // Decode the buffer into an audio source.
	    if (typeof Promise !== 'undefined' && Howler.ctx.decodeAudioData.length === 1) {
	      Howler.ctx.decodeAudioData(arraybuffer).then(success).catch(error);
	    } else {
	      Howler.ctx.decodeAudioData(arraybuffer, success, error);
	    }
	  };

	  /**
	   * Sound is now loaded, so finish setting everything up and fire the loaded event.
	   * @param  {Howl} self
	   * @param  {Object} buffer The decoded buffer sound source.
	   */
	  var loadSound = function(self, buffer) {
	    // Set the duration.
	    if (buffer && !self._duration) {
	      self._duration = buffer.duration;
	    }

	    // Setup a sprite if none is defined.
	    if (Object.keys(self._sprite).length === 0) {
	      self._sprite = {__default: [0, self._duration * 1000]};
	    }

	    // Fire the loaded event.
	    if (self._state !== 'loaded') {
	      self._state = 'loaded';
	      self._emit('load');
	      self._loadQueue();
	    }
	  };

	  /**
	   * Setup the audio context when available, or switch to HTML5 Audio mode.
	   */
	  var setupAudioContext = function() {
	    // If we have already detected that Web Audio isn't supported, don't run this step again.
	    if (!Howler.usingWebAudio) {
	      return;
	    }

	    // Check if we are using Web Audio and setup the AudioContext if we are.
	    try {
	      if (typeof AudioContext !== 'undefined') {
	        Howler.ctx = new AudioContext();
	      } else if (typeof webkitAudioContext !== 'undefined') {
	        Howler.ctx = new webkitAudioContext();
	      } else {
	        Howler.usingWebAudio = false;
	      }
	    } catch(e) {
	      Howler.usingWebAudio = false;
	    }

	    // If the audio context creation still failed, set using web audio to false.
	    if (!Howler.ctx) {
	      Howler.usingWebAudio = false;
	    }

	    // Check if a webview is being used on iOS8 or earlier (rather than the browser).
	    // If it is, disable Web Audio as it causes crashing.
	    var iOS = (/iP(hone|od|ad)/.test(Howler._navigator && Howler._navigator.platform));
	    var appVersion = Howler._navigator && Howler._navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
	    var version = appVersion ? parseInt(appVersion[1], 10) : null;
	    if (iOS && version && version < 9) {
	      var safari = /safari/.test(Howler._navigator && Howler._navigator.userAgent.toLowerCase());
	      if (Howler._navigator && !safari) {
	        Howler.usingWebAudio = false;
	      }
	    }

	    // Create and expose the master GainNode when using Web Audio (useful for plugins or advanced usage).
	    if (Howler.usingWebAudio) {
	      Howler.masterGain = (typeof Howler.ctx.createGain === 'undefined') ? Howler.ctx.createGainNode() : Howler.ctx.createGain();
	      Howler.masterGain.gain.setValueAtTime(Howler._muted ? 0 : Howler._volume, Howler.ctx.currentTime);
	      Howler.masterGain.connect(Howler.ctx.destination);
	    }

	    // Re-run the setup on Howler.
	    Howler._setup();
	  };

	  // Add support for CommonJS libraries such as browserify.
	  {
	    exports.Howler = Howler;
	    exports.Howl = Howl;
	  }

	  // Add to global in Node.js (for testing, etc).
	  if (typeof commonjsGlobal !== 'undefined') {
	    commonjsGlobal.HowlerGlobal = HowlerGlobal;
	    commonjsGlobal.Howler = Howler;
	    commonjsGlobal.Howl = Howl;
	    commonjsGlobal.Sound = Sound;
	  } else if (typeof window !== 'undefined') {  // Define globally in case AMD is not available or unused.
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

	(function() {

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
	  HowlerGlobal.prototype.stereo = function(pan) {
	    var self = this;

	    // Stop right here if not using Web Audio.
	    if (!self.ctx || !self.ctx.listener) {
	      return self;
	    }

	    // Loop through all Howls and update their stereo panning.
	    for (var i=self._howls.length-1; i>=0; i--) {
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
	  HowlerGlobal.prototype.pos = function(x, y, z) {
	    var self = this;

	    // Stop right here if not using Web Audio.
	    if (!self.ctx || !self.ctx.listener) {
	      return self;
	    }

	    // Set the defaults for optional 'y' & 'z'.
	    y = (typeof y !== 'number') ? self._pos[1] : y;
	    z = (typeof z !== 'number') ? self._pos[2] : z;

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
	  HowlerGlobal.prototype.orientation = function(x, y, z, xUp, yUp, zUp) {
	    var self = this;

	    // Stop right here if not using Web Audio.
	    if (!self.ctx || !self.ctx.listener) {
	      return self;
	    }

	    // Set the defaults for optional 'y' & 'z'.
	    var or = self._orientation;
	    y = (typeof y !== 'number') ? or[1] : y;
	    z = (typeof z !== 'number') ? or[2] : z;
	    xUp = (typeof xUp !== 'number') ? or[3] : xUp;
	    yUp = (typeof yUp !== 'number') ? or[4] : yUp;
	    zUp = (typeof zUp !== 'number') ? or[5] : zUp;

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
	  Howl.prototype.init = (function(_super) {
	    return function(o) {
	      var self = this;

	      // Setup user-defined default properties.
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
	      };

	      // Setup event listeners.
	      self._onstereo = o.onstereo ? [{fn: o.onstereo}] : [];
	      self._onpos = o.onpos ? [{fn: o.onpos}] : [];
	      self._onorientation = o.onorientation ? [{fn: o.onorientation}] : [];

	      // Complete initilization with howler.js core's init function.
	      return _super.call(this, o);
	    };
	  })(Howl.prototype.init);

	  /**
	   * Get/set the stereo panning of the audio source for this sound or all in the group.
	   * @param  {Number} pan  A value of -1.0 is all the way left and 1.0 is all the way right.
	   * @param  {Number} id (optional) The sound ID. If none is passed, all in group will be updated.
	   * @return {Howl/Number}    Returns self or the current stereo panning value.
	   */
	  Howl.prototype.stereo = function(pan, id) {
	    var self = this;

	    // Stop right here if not using Web Audio.
	    if (!self._webAudio) {
	      return self;
	    }

	    // If the sound hasn't loaded, add it to the load queue to change stereo pan when capable.
	    if (self._state !== 'loaded') {
	      self._queue.push({
	        event: 'stereo',
	        action: function() {
	          self.stereo(pan, id);
	        }
	      });

	      return self;
	    }

	    // Check for PannerStereoNode support and fallback to PannerNode if it doesn't exist.
	    var pannerType = (typeof Howler.ctx.createStereoPanner === 'undefined') ? 'spatial' : 'stereo';

	    // Setup the group's stereo panning if no ID is passed.
	    if (typeof id === 'undefined') {
	      // Return the group's stereo panning if no parameters are passed.
	      if (typeof pan === 'number') {
	        self._stereo = pan;
	        self._pos = [pan, 0, 0];
	      } else {
	        return self._stereo;
	      }
	    }

	    // Change the streo panning of one or all sounds in group.
	    var ids = self._getSoundIds(id);
	    for (var i=0; i<ids.length; i++) {
	      // Get the sound.
	      var sound = self._soundById(ids[i]);

	      if (sound) {
	        if (typeof pan === 'number') {
	          sound._stereo = pan;
	          sound._pos = [pan, 0, 0];

	          if (sound._node) {
	            // If we are falling back, make sure the panningModel is equalpower.
	            sound._pannerAttr.panningModel = 'equalpower';

	            // Check if there is a panner setup and create a new one if not.
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
	  Howl.prototype.pos = function(x, y, z, id) {
	    var self = this;

	    // Stop right here if not using Web Audio.
	    if (!self._webAudio) {
	      return self;
	    }

	    // If the sound hasn't loaded, add it to the load queue to change position when capable.
	    if (self._state !== 'loaded') {
	      self._queue.push({
	        event: 'pos',
	        action: function() {
	          self.pos(x, y, z, id);
	        }
	      });

	      return self;
	    }

	    // Set the defaults for optional 'y' & 'z'.
	    y = (typeof y !== 'number') ? 0 : y;
	    z = (typeof z !== 'number') ? -0.5 : z;

	    // Setup the group's spatial position if no ID is passed.
	    if (typeof id === 'undefined') {
	      // Return the group's spatial position if no parameters are passed.
	      if (typeof x === 'number') {
	        self._pos = [x, y, z];
	      } else {
	        return self._pos;
	      }
	    }

	    // Change the spatial position of one or all sounds in group.
	    var ids = self._getSoundIds(id);
	    for (var i=0; i<ids.length; i++) {
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
	  Howl.prototype.orientation = function(x, y, z, id) {
	    var self = this;

	    // Stop right here if not using Web Audio.
	    if (!self._webAudio) {
	      return self;
	    }

	    // If the sound hasn't loaded, add it to the load queue to change orientation when capable.
	    if (self._state !== 'loaded') {
	      self._queue.push({
	        event: 'orientation',
	        action: function() {
	          self.orientation(x, y, z, id);
	        }
	      });

	      return self;
	    }

	    // Set the defaults for optional 'y' & 'z'.
	    y = (typeof y !== 'number') ? self._orientation[1] : y;
	    z = (typeof z !== 'number') ? self._orientation[2] : z;

	    // Setup the group's spatial orientation if no ID is passed.
	    if (typeof id === 'undefined') {
	      // Return the group's spatial orientation if no parameters are passed.
	      if (typeof x === 'number') {
	        self._orientation = [x, y, z];
	      } else {
	        return self._orientation;
	      }
	    }

	    // Change the spatial orientation of one or all sounds in group.
	    var ids = self._getSoundIds(id);
	    for (var i=0; i<ids.length; i++) {
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
	  Howl.prototype.pannerAttr = function() {
	    var self = this;
	    var args = arguments;
	    var o, id, sound;

	    // Stop right here if not using Web Audio.
	    if (!self._webAudio) {
	      return self;
	    }

	    // Determine the values based on arguments.
	    if (args.length === 0) {
	      // Return the group's panner attribute values.
	      return self._pannerAttr;
	    } else if (args.length === 1) {
	      if (typeof args[0] === 'object') {
	        o = args[0];

	        // Set the grou's panner attribute values.
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
	    }

	    // Update the values of the specified sounds.
	    var ids = self._getSoundIds(id);
	    for (var i=0; i<ids.length; i++) {
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
	        };

	        // Update the panner values or create a new panner if none exists.
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
	          }

	          // Create a new panner node.
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
	  Sound.prototype.init = (function(_super) {
	    return function() {
	      var self = this;
	      var parent = self._parent;

	      // Setup user-defined default properties.
	      self._orientation = parent._orientation;
	      self._stereo = parent._stereo;
	      self._pos = parent._pos;
	      self._pannerAttr = parent._pannerAttr;

	      // Complete initilization with howler.js core Sound's init function.
	      _super.call(this);

	      // If a stereo or position was specified, set it up.
	      if (self._stereo) {
	        parent.stereo(self._stereo);
	      } else if (self._pos) {
	        parent.pos(self._pos[0], self._pos[1], self._pos[2], self._id);
	      }
	    };
	  })(Sound.prototype.init);

	  /**
	   * Override the Sound.reset method to clean up properties from the spatial plugin.
	   * @param  {Function} _super Sound reset method.
	   * @return {Sound}
	   */
	  Sound.prototype.reset = (function(_super) {
	    return function() {
	      var self = this;
	      var parent = self._parent;

	      // Reset all spatial plugin properties on this sound.
	      self._orientation = parent._orientation;
	      self._stereo = parent._stereo;
	      self._pos = parent._pos;
	      self._pannerAttr = parent._pannerAttr;

	      // If a stereo or position was specified, set it up.
	      if (self._stereo) {
	        parent.stereo(self._stereo);
	      } else if (self._pos) {
	        parent.pos(self._pos[0], self._pos[1], self._pos[2], self._id);
	      } else if (self._panner) {
	        // Disconnect the panner.
	        self._panner.disconnect(0);
	        self._panner = undefined;
	        parent._refreshBuffer(self);
	      }

	      // Complete resetting of the sound.
	      return _super.call(this);
	    };
	  })(Sound.prototype.reset);

	  /** Helper Methods **/
	  /***************************************************************************/

	  /**
	   * Create a new panner node and save it on the sound.
	   * @param  {Sound} sound Specific sound to setup panning on.
	   * @param {String} type Type of panner to create: 'stereo' or 'spatial'.
	   */
	  var setupPanner = function(sound, type) {
	    type = type || 'spatial';

	    // Create the new panner node.
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

	    sound._panner.connect(sound._node);

	    // Update the connections.
	    if (!sound._paused) {
	      sound._parent.pause(sound._id, true).play(sound._id, true);
	    }
	  };
	})();
	});

	var setDynterval_1 = setDynterval;
	// http://stackoverflow.com/a/7445863

	/**
	 * @param {Function} action interval callback that may return a different duration for the next tick
	 * @param {Object|Number} [config] initial configuration object / context. ex: { wait: 50, immediate: false }
	 * @param {Object} [api] custom interval API (defaults to `window.setTimeout` and `window.clearTimeout`)
	 * @returns {Object}
	 */
	function setDynterval(action) {
	  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	  var api = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : { setTimeout: setTimeout, clearTimeout: clearTimeout, setInterval: setInterval, clearInterval: clearInterval };

	  if (!action || !(action instanceof Function)) {
	    throw TypeError('Interval callback must be a function');
	  }

	  if (!api || (!(api.setTimeout instanceof Function) || !(api.clearTimeout instanceof Function)) && (!(api.setInterval instanceof Function) || !(api.clearInterval instanceof Function))) {
	    throw Error('Custom interval APIs must define either `setTimeout` and `clearTimeout` OR `setInterval` and `clearInterval` functions');
	  }

	  if (config.constructor === Number) {
	    config = { wait: config };
	  }

	  var interval = void 0;
	  var context = Object.assign({ wait: 0 }, config);

	  var next = api.setTimeout || api.setInterval;
	  var _clear = api.clearTimeout || api.clearInterval;

	  var step = function step() {
	    if (interval) _clear(interval);

	    context = action(context) || context;
	    interval = next(step, context.wait);
	  };

	  if (!config.immediate) {
	    interval = next(step, config.wait);
	  } else {
	    step();
	  }

	  return {
	    get current() {
	      return interval;
	    },

	    get context() {
	      return context;
	    },

	    set context(value) {
	      context = value;
	    },

	    clear: function clear() {
	      setTimeout(function () {
	        return _clear(interval);
	      }, 0);
	    }
	  };
	}

	var _default = setDynterval;

	var dist = /*#__PURE__*/Object.defineProperty({
		setDynterval: setDynterval_1,
		default: _default
	}, '__esModule', {value: true});

	var performanceNow = createCommonjsModule(function (module) {
	// Generated by CoffeeScript 1.12.2
	(function() {
	  var getNanoSeconds, hrtime, loadTime, moduleLoadTime, nodeLoadTime, upTime;

	  if ((typeof performance !== "undefined" && performance !== null) && performance.now) {
	    module.exports = function() {
	      return performance.now();
	    };
	  } else if ((typeof process__default['default'] !== "undefined" && process__default['default'] !== null) && process__default['default'].hrtime) {
	    module.exports = function() {
	      return (getNanoSeconds() - nodeLoadTime) / 1e6;
	    };
	    hrtime = process__default['default'].hrtime;
	    getNanoSeconds = function() {
	      var hr;
	      hr = hrtime();
	      return hr[0] * 1e9 + hr[1];
	    };
	    moduleLoadTime = getNanoSeconds();
	    upTime = process__default['default'].uptime() * 1e9;
	    nodeLoadTime = moduleLoadTime - upTime;
	  } else if (Date.now) {
	    module.exports = function() {
	      return Date.now() - loadTime;
	    };
	    loadTime = Date.now();
	  } else {
	    module.exports = function() {
	      return new Date().getTime() - loadTime;
	    };
	    loadTime = new Date().getTime();
	  }

	}).call(commonjsGlobal);

	//# sourceMappingURL=performance-now.js.map
	});

	var bundle = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, '__esModule', { value: true });

	function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

	var setDynterval = _interopDefault(dist);
	var now = _interopDefault(performanceNow);
	var EventEmitter = _interopDefault(EventEmitter__default['default']);





	var classCallCheck = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

	var createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();









	var inherits = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	  }

	  subClass.prototype = Object.create(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	};











	var possibleConstructorReturn = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return call && (typeof call === "object" || typeof call === "function") ? call : self;
	};

	// TODO: consider integrating https://github.com/medikoo/event-emitter#unifyemitter1-emitter2-event-emitterunify
	var StatefulDynterval = function (_EventEmitter) {
	  inherits(StatefulDynterval, _EventEmitter);

	  function StatefulDynterval(step) {
	    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    var api = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : { setInterval: setInterval, clearInterval: clearInterval, setTimeout: setTimeout, clearTimeout: clearTimeout };
	    classCallCheck(this, StatefulDynterval);

	    var _this = possibleConstructorReturn(this, (StatefulDynterval.__proto__ || Object.getPrototypeOf(StatefulDynterval)).call(this));

	    if (config.constructor === Number) {
	      config = { wait: config };
	    }

	    var _config = config,
	        wait = _config.wait,
	        lazy = _config.lazy;


	    _this.step = step;
	    _this.config = config;
	    _this.wait = wait;
	    _this.api = api;
	    _this.state = STATES.pristine;
	    _this.time = { start: null, end: null, remaining: null, clock: null };
	    _this.children = new Set();

	    if (!lazy) _this.run();
	    return _this;
	  }

	  createClass(StatefulDynterval, [{
	    key: 'next',
	    value: function next(config) {
	      var context = this.step(config);

	      this.time.start = now();

	      return context;
	    }
	  }, {
	    key: 'play',
	    value: function play() {
	      return this.run();
	    }
	  }, {
	    key: 'run',
	    value: function run() {
	      this.time.start = now();
	      this.time.clock = setDynterval(this.next.bind(this), this.context, this.api);
	      this.state = STATES.running;

	      this.emit('run');

	      return this;
	    }
	  }, {
	    key: 'pickup',
	    value: function pickup() {
	      if (this.state !== STATES.resumed) return;

	      this.next();
	      this.run();

	      return this;
	    }

	    // FIXME: if you pause too close to the next step the interval keeps going
	    // - replacing `this.time.clock.context` with `this.time.clock.current.context` should resolve this. need to test thoroughly.

	  }, {
	    key: 'pause',
	    value: function pause() {
	      if (this.state !== STATES.running) return;

	      var wait = this.context.wait;
	      var start = this.time.start;

	      var elapsed = now() - start;

	      this.time.remaining = wait - elapsed;
	      this.time.clock.clear();

	      this.state = STATES.paused;

	      this.emit('pause');

	      return this;
	    }
	  }, {
	    key: 'resume',
	    value: function resume() {
	      if (this.state !== STATES.paused) return;

	      this.state = STATES.resumed;

	      this.api.setTimeout(this.pickup.bind(this), this.time.remaining);

	      this.emit('resume');

	      return this;
	    }
	  }, {
	    key: 'stop',
	    value: function stop() {
	      return this.clear();
	    }
	  }, {
	    key: 'clear',
	    value: function clear() {
	      this.time.clock.clear();

	      this.state = STATES.cleared;

	      this.emit('clear');

	      return this;
	    }
	  }, {
	    key: 'add',
	    value: function add(interval) {
	      var _this2 = this;

	      if (!(interval instanceof StatefulDynterval)) {
	        throw TypeError('Child intervals must be instances of StatefulDynterval');
	      }

	      TOPICS.forEach(function (topic) {
	        return _this2.on(topic, interval[topic]);
	      });
	      this.children.add(interval);

	      return this;
	    }
	  }, {
	    key: 'detach',
	    value: function detach() {
	      var _this3 = this;

	      this.children.forEach(function (child) {
	        TOPICS.forEach(function (topic) {
	          return _this3.off(topic, child[topic]);
	        });
	      });

	      this.children.clear();

	      return this;
	    }
	  }, {
	    key: 'context',
	    get: function get$$1() {
	      if (this.time.clock) {
	        return Object.assign({}, this.time.clock.context);
	      }

	      return Object.assign({}, this.config, { state: this.state });
	    }
	  }]);
	  return StatefulDynterval;
	}(EventEmitter);

	var setStatefulDynterval = function setStatefulDynterval() {
	  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }

	  return new (Function.prototype.bind.apply(StatefulDynterval, [null].concat(args)))();
	};

	var TOPICS = ['run', 'clear', 'pause', 'resume'];

	var STATES = {
	  pristine: Symbol('pristine'),
	  running: Symbol('running'),
	  paused: Symbol('paused'),
	  resumed: Symbol('resumed'),
	  cleared: Symbol('cleared')
	};

	exports.StatefulDynterval = StatefulDynterval;
	exports.setStatefulDynterval = setStatefulDynterval;
	exports.TOPICS = TOPICS;
	exports.STATES = STATES;
	exports['default'] = setStatefulDynterval;
	});

	// import { Track, Sections } from 'bach-js'
	/**
	 * Represents a musical song/track that can be synchronized with arbitrary behavior and data in real-time
	 */

	class Gig extends Music {
	  /**
	   * @param {Object} source track represented in Bach.JSON
	   * @param {Audio} [audio] track audio
	   * @param {boolean} [loop] enable track looping
	   * @param {boolean} [tempo] in beats per minute [REMOVED]
	   * @param {Object} [timer] alternative timer/interval API
	   * @param {Object} [howler] optional Howler configuration overrides
	   */
	  constructor({
	    source,
	    audio,
	    loop,
	    stateless,
	    timer,
	    howler: howler$1
	  }) {
	    super(source);
	    EventEmitter__default['default'].call(this);
	    this.audio = audio;
	    this.loop = loop; // this.tempo  = tempo // FIXME: Sync with Howler's rate property

	    this.timer = timer || defaultTimer;
	    this.index = 0;
	    this.times = {
	      origin: null,
	      last: null
	    };
	    this.status = STATUS.pristine;
	    this.stateless = stateless;

	    if (audio) {
	      this.music = new howler.Howl(Object.assign({
	        src: audio,
	        loop
	      }, howler$1));
	    } // this.listen()

	  }
	  /**
	   * Provides the beat found at the track's cursor
	   *
	   * @returns {Object}
	   */


	  get state() {
	    return this.at(this.cursor);
	  }
	  /**
	   * Provides beat found one step behind the track's cursor
	   *
	   * @returns {Object}
	   */


	  get prev() {
	    return this.at(this.cursor - 1);
	  }
	  /**
	   * Provides the beat found one step ahead of the track's cursor
	   *
	   * @returns {Object}
	   */


	  get next() {
	    return this.at(this.cursor + 1);
	  }
	  /**
	   * Determines the cyclic/relative step beat index.
	   *
	   * @returns {Number}
	   */


	  get cursor() {
	    return this.durations.cyclic(this.current);
	  }
	  /**
	   * Determines the global/absolute step beat index.
	   * When stateless the step is calculated based on monotonic time.
	   * When stateful the step is calculated based on current index value.
	   *
	   * @returns {Number}
	   */


	  get current() {
	    return !this.stateless ? this.index : Math.floor(this.place);
	  }
	  /**
	   * Determines the global/absolute step beat based on elapsed monotonic time.
	   *
	   * @returns {Number}
	   */


	  get place() {
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


	  get first() {
	    return this.cursor === 0;
	  }
	  /**
	   * Determines if the cursor is on the least measure, beat, or section
	   *
	   * @returns {Boolean}
	   */


	  get last() {
	    return this.cursor === this.durations.total;
	  }
	  /**
	   * Determines if the track is actively playing
	   *
	   * @returns {Boolean}
	   */


	  get playing() {
	    return this.status === STATUS.playing;
	  }
	  /**
	   * Determines if the track is actively playing
	   *
	   * @returns {Boolean}
	   */


	  get paused() {
	    return this.status === STATUS.paused;
	  }
	  /**
	   * Determines if the track's music is loading (when audible).
	   */


	  get loading() {
	    return this.audible ? this.music.state() === 'loading' : false;
	  }
	  /**
	   * Determines if the track's music is loaded (when audible).
	   */


	  get loaded() {
	    return this.audible ? this.music.state() === 'loaded' : this.active;
	  }
	  /**
	   * Determines if the track is actively playing (currently the same as .playing)
	   *
	   * @returns {Boolean}
	   */


	  get active() {
	    return ACTIVE_STATUS.includes(this.status);
	  }
	  /**
	   * Determines if the track is inactive
	   *
	   * @returns {Boolean}
	   */


	  get inactive() {
	    return INACTIVE_STATUS.includes(this.status);
	  }
	  /**
	   * Determines if the track is expired
	   *
	   * @returns {Boolean}
	   */


	  get expired() {
	    return EXPIRED_STATUS.includes(this.status);
	  }
	  /**
	   * The amount of time that's elapsed since the track started playing.
	   *
	   * Used to determine the cursor step when Gig is set to stateless.
	   *
	   * @returns {Float}
	   */


	  get elapsed() {
	    return this.times.origin != null ? performanceNow() - this.times.origin : 0;
	  }
	  /**
	   * The progress of the track's audio (in milliseconds), modulated to 1 (e.g. 1.2 -> 0.2).
	   *
	   * @returns {Number}
	   */


	  get progress() {
	    return this.completion % 1;
	  }
	  /**
	   * The run-time completion of the entire track (values exceeding 1 mean the track has looped).
	   *
	   * @returns {Number}
	   */


	  get completion() {
	    return this.elapsed / this.duration;
	  }
	  /**
	   * The duration of the track's audio (in milliseconds).
	   *
	   * @returns {Number}
	   */


	  get duration() {
	    return this.durations.cast(this.durations.total, {
	      as: 'ms'
	    });
	  }
	  /**
	   * Whether or not the Gig object has associated audio.
	   *
	   * @returns {Boolean}
	   */


	  get audible() {
	    return this.audio && this.music;
	  }
	  /**
	   * Whether or not the track is configured to loop playback indefinitely.
	   *
	   * @returns {Boolean}
	   */


	  get loops() {
	    return this.loop || !!(this.audible && this.music.loop());
	  }
	  /**
	   * Changes loop configuration of track and associated audio.
	   *
	   * @returns {Boolean}
	   */


	  set loops(loop) {
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


	  get iterations() {
	    return this.current / (this.durations.total - 1);
	  }
	  /**
	   * Determines if the track has already looped/repeated.
	   *
	   * @returns {Boolean}
	   */


	  get repeating() {
	    return this.iterations >= 1;
	  }
	  /**
	   * Specifies the limit of steps in a track
	   *
	   * @returns {Number}
	   */


	  get limit() {
	    return this.loops ? Math.Infinity : this.duration;
	  }
	  /**
	   * Provides the index of the current pulse beat under the context of a looping metronome.
	   *
	   * @returns {Number}
	   */


	  get metronome() {
	    return this.durations.metronize(this.elapsed, {
	      is: 'ms'
	    });
	  }
	  /**
	   * Synchronizes track with the Howler API
	   */


	  listen() {
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


	  start() {
	    this.clock = this.timer(this);
	    this.times.origin = performanceNow();
	    this.emit('start');
	    this.is('playing');
	  }
	  /**
	   * Loads the audio data and kicks off the synchronization clock
	   */


	  play() {
	    if (this.audible) {
	      this.music.on('load', () => {
	        this.start();
	        this.music.play();
	        this.emit('play');
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


	  stop() {
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


	  pause() {
	    if (this.audible) this.music.pause();
	    this.clock.pause();
	    this.emit('pause');
	    return this.is('paused');
	  }
	  /**
	   * Resumes the audio and the synchronization clock
	   */


	  resume() {
	    if (this.audible) this.music.play();
	    this.clock.resume();
	    this.emit('resume');
	    return this.is('playing');
	  }
	  /**
	   * Mutes the track audio
	   */


	  mute() {
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


	  seek(to) {
	    if (this.audible) this.music.seek(to); // TODO: this.reorient()

	    this.emit('seek');
	    return this;
	  }
	  /**
	   * Invokes the action to perform on each interval and emits
	   * various events based on current state of the step.
	   */


	  step() {
	    const {
	      state,
	      interval
	    } = this;
	    const {
	      beat,
	      play,
	      stop
	    } = state;

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
	    } // this.index++


	    this.index = beat.index;
	    this.times.last = performanceNow();
	  }
	  /**
	   * Moves playback cursor to the provided duration.
	   *
	   * WARN: Work in progress
	   */


	  travel(duration, is = 'step') {
	    const step = this.durations.cast(duration, {
	      is,
	      as: 'step'
	    });
	    const time = this.durations.cast(step, {
	      as: 'ms'
	    });
	    const last = this.durations.cast(Math.floor(step), {
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


	  reset() {
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


	  clear() {
	    return this.removeAllListeners();
	  }
	  /**
	   * Immediately stops the track, its clock, and removes all active event listeners
	   */


	  kill() {
	    return this.stop().clear().is('killed');
	  }
	  /**
	   * Updates the playing status of the track (idempotent, no reactivity or side-effects).
	   */


	  is(status) {
	    const key = status.toLowerCase();
	    const value = STATUS[key];
	    if (!value) throw Error(`${key} is an invalid status`);
	    this.status = value;
	    return this;
	  }
	  /**
	   * Determines if the playing status matches the provided status key string.
	   *
	   * @returns {Boolean}
	   */


	  check(status) {
	    const key = status.toLowerCase();
	    const value = STATUS[key];
	    return this.status === value;
	  }

	}
	Object.assign(Music.prototype, EventEmitter__default['default'].prototype);
	const defaultTimer = track => bundle.setStatefulDynterval(track.step.bind(track), {
	  wait: track.interval,
	  immediate: true
	});
	const STATUS = {
	  pristine: Symbol('pristine'),
	  playing: Symbol('playing'),
	  stopped: Symbol('stopped'),
	  paused: Symbol('paused'),
	  killed: Symbol('killed')
	};
	const ACTIVE_STATUS = [STATUS.playing];
	const INACTIVE_STATUS = [STATUS.pristine, STATUS.stopped, STATUS.paused, STATUS.killed];
	const EXPIRED_STATUS = [STATUS.stopped, STATUS.killed];
	const CONSTANTS = Gig.CONSTANTS = {
	  STATUS,
	  ACTIVE_STATUS,
	  INACTIVE_STATUS,
	  EXPIRED_STATUS
	};

	exports.ACTIVE_STATUS = ACTIVE_STATUS;
	exports.CONSTANTS = CONSTANTS;
	exports.EXPIRED_STATUS = EXPIRED_STATUS;
	exports.Gig = Gig;
	exports.INACTIVE_STATUS = INACTIVE_STATUS;
	exports.STATUS = STATUS;
	exports.defaultTimer = defaultTimer;

})));
