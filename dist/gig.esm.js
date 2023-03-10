(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "@babel/runtime/helpers/esm/classCallCheck", "@babel/runtime/helpers/esm/createClass", "@babel/runtime/helpers/esm/assertThisInitialized", "@babel/runtime/helpers/esm/inherits", "@babel/runtime/helpers/esm/possibleConstructorReturn", "@babel/runtime/helpers/esm/getPrototypeOf", "bach-js", "raf", "howler", "performance-now", "events"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("@babel/runtime/helpers/esm/classCallCheck"), require("@babel/runtime/helpers/esm/createClass"), require("@babel/runtime/helpers/esm/assertThisInitialized"), require("@babel/runtime/helpers/esm/inherits"), require("@babel/runtime/helpers/esm/possibleConstructorReturn"), require("@babel/runtime/helpers/esm/getPrototypeOf"), require("bach-js"), require("raf"), require("howler"), require("performance-now"), require("events"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.classCallCheck, global.createClass, global.assertThisInitialized, global.inherits, global.possibleConstructorReturn, global.getPrototypeOf, global.bachJs, global.raf, global.howler, global.performanceNow, global.events);
    global.unknown = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _classCallCheck2, _createClass2, _assertThisInitialized2, _inherits2, _possibleConstructorReturn2, _getPrototypeOf2, _bachJs, _raf, _howler, _performanceNow, _events) {
  "use strict";

  var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.clock = _exports.STATUS = _exports.INACTIVE_STATUS = _exports.Gig = _exports.EXPIRED_STATUS = _exports.CONSTANTS = _exports.BASED_STATUS = _exports.ACTIVE_STATUS = void 0;
  _classCallCheck2 = _interopRequireDefault(_classCallCheck2);
  _createClass2 = _interopRequireDefault(_createClass2);
  _assertThisInitialized2 = _interopRequireDefault(_assertThisInitialized2);
  _inherits2 = _interopRequireDefault(_inherits2);
  _possibleConstructorReturn2 = _interopRequireDefault(_possibleConstructorReturn2);
  _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf2);
  _raf = _interopRequireDefault(_raf);
  _performanceNow = _interopRequireDefault(_performanceNow);
  _events = _interopRequireDefault(_events);
  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }
  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
  /**
   * Default monotonic/stateless timer for Gig.
   * Uses requestAnimationFrame and performance.now (polyfilled).
   *
   * @param {Gig} gig parent instance provided on construction
   * @param {function} [tick] optional function to call on each tick of the clock
   */
  // TODO: Allow clock to be configured to optionally cancelAnimationFrame(interval) on each tick
  var clock = function clock(gig, tick) {
    var last = null;
    var interval = null;
    var loop = function loop() {
      var time = gig.time,
        cursor = gig.cursor,
        expired = gig.expired;
      if (expired) return cancel();
      if (cursor !== last) {
        last = cursor;
        gig.step();
      }
      if (typeof tick === 'function') {
        tick(gig, time);
      }
      interval = (0, _raf["default"])(loop);
    };
    var cancel = function cancel() {
      _raf["default"].cancel(interval);
      interval = null;
    };
    var timer = {
      play: function play() {
        loop();
      },
      pause: function pause() {
        cancel();
      },
      resume: function resume() {
        timer.play();
      },
      stop: function stop() {
        last = null;
        cancel();
      }
    };
    timer.play();
    return timer;
  };

  /**
   * Represents a musical song/track that can be synchronized with arbitrary behavior and data in real-time
   */
  _exports.clock = clock;
  var Gig = /*#__PURE__*/function (_Music) {
    (0, _inherits2["default"])(Gig, _Music);
    var _super = _createSuper(Gig);
    /**
     * @param {Object} source track represented in Bach.JSON
     * @param {Audio} [audio] track audio
     * @param {boolean} [loop] enable track looping
     * @param {Object} [timer] alternative timer API (default is monotonic and uses raf)
     * @param {Function} [now] custom monotonic timer function
     * @param {Object} [howler] optional Howler configuration overrides
     * @param {boolean} [stateless] enable stateless/monotonic cursor
     */
    function Gig() {
      var _this;
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        source = _ref.source,
        audio = _ref.audio,
        loop = _ref.loop,
        timer = _ref.timer,
        now = _ref.now,
        howler = _ref.howler,
        _ref$stateless = _ref.stateless,
        stateless = _ref$stateless === void 0 ? true : _ref$stateless;
      (0, _classCallCheck2["default"])(this, Gig);
      _this = _super.call(this, source);
      _events["default"].call((0, _assertThisInitialized2["default"])(_this));
      _this.audio = audio;
      _this.loop = loop;
      // this.tempo  = tempo // FIXME: Sync with Howler's rate property
      _this.timer = timer || clock;
      _this.now = now || _performanceNow["default"];
      _this.index = 0;
      _this.times = {
        origin: null,
        last: null,
        beat: null,
        paused: null
      };
      _this.status = STATUS.pristine;
      _this.stateless = stateless;
      if (audio) {
        _this.music = new _howler.Howl(Object.assign({
          src: audio,
          ctx: true,
          loop: loop
        }, howler));
      }

      // this.listen()
      return _this;
    }

    /**
     * Provides the beat found at the track's cursor
     *
     * @returns {Object}
     */
    (0, _createClass2["default"])(Gig, [{
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
       * Centralized getter that allows for custom monotomic timer functions (`now`).
       * Defaults to process.hrtime polyfill when a custom `now` function is not provided.
       *
       * @returns {Number}
       */
    }, {
      key: "time",
      get: function get() {
        return typeof this.now === 'function' && this.clock ? this.now(this.clock) : (0, _performanceNow["default"])();
      }

      /**
       * Determines the base bach-js duration unit to use based on stateless config.
       *
       * Can be provided to cast as `is`: `gig.durations.cast(4, { is: gig.unit })`.
       *
       * @returns {String}
       */
    }, {
      key: "unit",
      get: function get() {
        return this.stateless ? 'ms' : 'step';
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
       * Determines if the track is pristine (i.e. hasn't changed status since initialization).
       *
       * @returns {Boolean}
       */
    }, {
      key: "pristine",
      get: function get() {
        return this.status === STATUS.pristine;
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
       * Determines if the track has a status where baseline playback can be started
       *
       * @returns {Boolean}
       */
    }, {
      key: "based",
      get: function get() {
        return BASED_STATUS.includes(this.status);
      }

      /**
       * The total duration of the track's run-time (in milliseconds).
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
       * Establishes the origin time of run-time playback, skewed to pause time.
       *
       * @returns {Number}
       */
    }, {
      key: "origin",
      get: function get() {
        return this.times.origin != null ? this.times.origin + this.skew : null;
      }

      /**
       * Determines the base time of the current step.
       *
       * @returns {Number}
       */
    }, {
      key: "basis",
      get: function get() {
        return (this.times.last || this.times.origin) + this.skew;
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
        return this.origin != null ? this.time - this.origin : 0;
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
       * The run-time progression (0-1) of the current step.
       *
       * @returns {Number}
       */
    }, {
      key: "stride",
      get: function get() {
        return (this.time - this.basis) / this.interval;
      }

      /**
       * Determines the skew, in ms, of the clock. Returns 0 if no pause time exists.
       *
       * @returns {Number}
       */
    }, {
      key: "skew",
      get: function get() {
        return this.time - (this.times.paused || this.time);
      }

      /**
       * Determines the amount of run-time drift, in ms, of the current beat.
       *
       * @returns {Number}
       */
    }, {
      key: "drift",
      get: function get() {
        return this.times.beat ? this.times.beat + this.skew - this.moment(this.state.beat.index) : 0;
      }

      /**
       * Provides an offset, in steps, based on the total number of iterations.
       * Useful for adjusting between absolute (global) and relative (cyclic) duration calculations.
       *
       * @returns {Number}
       */
    }, {
      key: "offset",
      get: function get() {
        return this.durations.total * Math.floor(this.iterations);
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
       */,
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
        return this.current / this.durations.total;
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
        return this.loops ? Math.Infinity : this.durations.total;
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
       * Determines if the current step's beat has changed from the previous step's beat.
       *
       * @returns {Boolean}
       */
    }, {
      key: "updated",
      get: function get() {
        return this.state.beat.index !== this.prev.beat.index;
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
        this.times.origin = this.time;
        this.emit('start');
        this.is('playing');
      }

      /**
       * Loads the audio data and kicks off the synchronization clock
       */
    }, {
      key: "play",
      value: function play() {
        var _this2 = this;
        if (this.audible) {
          var ready = function ready() {
            if (_this2.check('killed')) {
              return;
            }
            _this2.start();
            _this2.music.play();
            _this2.emit('play');
          };
          if (this.loaded) {
            ready();
          } else {
            this.music.on('load', ready);
          }
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
        this.times.paused = this.time;
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
        var skew = this.time - this.times.paused;
        this.times.origin += skew;
        this.times.last += skew;
        this.times.beat += skew;
        this.times.paused = null;
        this.clock.resume();
        this.emit('resume');
        return this.is('playing');
      }

      /**
       * Toggles playback based on the current run-time status.
       */
    }, {
      key: "toggle",
      value: function toggle() {
        if (this.based) {
          return this.play();
        } else if (this.playing) {
          return this.pause();
        } else if (this.paused) {
          return this.resume();
        }
        return this;
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
       * @param {Number} duration time value
       * @param {String} [is] duration unit
       */
    }, {
      key: "seek",
      value: function seek(duration) {
        var is = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'step';
        if (this.audible) {
          var max = this.durations.cast(this.music.duration(), {
            is: 'second',
            as: is
          });
          var time = this.durations.cyclic(duration, {
            is: is,
            as: 'second',
            max: max
          });
          this.music.seek(time);
        }
        this.travel(duration, is);
        this.emit('seek');
        return this;
      }

      /**
       * Invokes the action to perform on each interval and emits
       * various events based on current state of the step.
       * Only emits beat events if the beat has updated from the previous step.
       */
    }, {
      key: "step",
      value: function step() {
        this.index = this.times.last ? this.index + 1 : 0;
        var state = this.state,
          interval = this.interval;
        var beat = state.beat,
          play = state.play,
          stop = state.stop;
        this.emit('step', state);
        if (stop.length) {
          this.emit('stop:beat', stop);
        }
        if (!this.stateless && !this.updated) {
          return this;
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
          this.times.beat = this.time;
        }
        this.times.last = this.time;
        return this;
      }

      /**
       * Converts a localized/relative/cyclic duration into its globalized/absolute version.
       * The inverse of this conversion can be achieved with Gig.durations.cyclic().
       *
       * @param {Number} duration time value
       * @param {Object} [lens] unit conversions
       * @returns {Number}
       */
    }, {
      key: "globalize",
      value: function globalize(duration) {
        var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref2$is = _ref2.is,
          is = _ref2$is === void 0 ? 'step' : _ref2$is,
          _ref2$as = _ref2.as,
          as = _ref2$as === void 0 ? 'step' : _ref2$as;
        return this.durations.cyclic(duration, {
          is: is,
          as: as
        }) + this.durations.cast(this.offset, {
          as: as
        });
      }

      /**
       * Determines when a duration occurs (in milliseconds, by default) globalized to the run-time origin.
       *
       * @param {Number} duration time value
       * @param {Object} [lens] unit conversions
       * @returns {Number}
       */
    }, {
      key: "moment",
      value: function moment(duration) {
        var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref3$is = _ref3.is,
          is = _ref3$is === void 0 ? 'step' : _ref3$is,
          _ref3$as = _ref3.as,
          as = _ref3$as === void 0 ? 'ms' : _ref3$as;
        var time = this.globalize(duration, {
          is: is,
          as: 'ms'
        });
        var moment = this.origin + time;
        return this.durations.cast(moment, {
          is: 'ms',
          as: as
        });
      }

      /**
       * Moves playback cursor to the provided duration.
       *
       * @param {Number} duration time value
       * @param {String} [is] duration unit
       */
    }, {
      key: "travel",
      value: function travel(duration) {
        var is = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'step';
        if (this.based) {
          console.warn('[gig:travel] Currently unsupported on tracks that have not started playing');
          return this;
        }
        var step = this.durations.cast(duration, {
          is: is,
          as: 'step'
        });
        var time = this.durations.cast(step, {
          as: 'ms'
        });
        var index = Math.floor(step);
        var last = this.durations.cast(index, {
          as: 'ms'
        });
        var state = this.at(index);
        this.index = index;
        this.times.last = last;
        this.times.origin = this.time - this.skew - time;
        this.times.beat = this.moment(state.beat.index) - this.skew;
        // TODO: Probably also need to adjust times.paused if already paused (seems to be causing a sporadic bug in gig.drift when traveling while paused)

        // TODO: Determine if we want to emit a different event here instead for greater specificity and control
        // TODO: Consider if we should emit `stop` as well on the beat we traveled from
        if (state.play.length && this.paused) {
          this.emit('play:beat', state.beat);
        }
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
          last: null,
          paused: null,
          beat: null
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
        this.reset();
        this.music = null;
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
        this.emit('update:status', key);
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
  }(_bachJs.Music);
  _exports.Gig = Gig;
  Object.assign(_bachJs.Music.prototype, _events["default"].prototype);
  var STATUS = {
    pristine: Symbol('pristine'),
    playing: Symbol('playing'),
    stopped: Symbol('stopped'),
    paused: Symbol('paused'),
    killed: Symbol('killed')
  };
  _exports.STATUS = STATUS;
  var ACTIVE_STATUS = [STATUS.playing];
  _exports.ACTIVE_STATUS = ACTIVE_STATUS;
  var INACTIVE_STATUS = [STATUS.pristine, STATUS.stopped, STATUS.paused, STATUS.killed];
  _exports.INACTIVE_STATUS = INACTIVE_STATUS;
  var EXPIRED_STATUS = [STATUS.stopped, STATUS.killed];
  _exports.EXPIRED_STATUS = EXPIRED_STATUS;
  var BASED_STATUS = [STATUS.pristine, STATUS.stopped, STATUS.killed];
  _exports.BASED_STATUS = BASED_STATUS;
  var CONSTANTS = Gig.CONSTANTS = {
    STATUS: STATUS,
    ACTIVE_STATUS: ACTIVE_STATUS,
    INACTIVE_STATUS: INACTIVE_STATUS,
    EXPIRED_STATUS: EXPIRED_STATUS,
    BASED_STATUS: BASED_STATUS
  };
  _exports.CONSTANTS = CONSTANTS;
});
