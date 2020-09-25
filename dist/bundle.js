'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var bachJs = require('bach-js');
var howler = require('howler');
var statefulDynamicInterval = require('stateful-dynamic-interval');
var EventEmitter = _interopDefault(require('events'));

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

/**
 * Represents a musical song/track that can be synchronized with arbitrary behavior and data in real-time
 */
var Gig = function (_Track) {
  inherits(Gig, _Track);

  /**
   * @param {Object} source track represented in Bach.JSON
   * @param {Audio} [audio] track audio
   * @param {boolean} [loop] enable track looping
   * @param {boolean} [tempo] in beats per minute
   * @param {number} [delay] wait a duration before starting to play
   * @param {Object} [timer] alternative timer/interval API
   * @param {Object} [howler] optional Howler configuration overrides
   */
  function Gig(_ref) {
    var source = _ref.source,
        audio = _ref.audio,
        loop = _ref.loop,
        tempo = _ref.tempo,
        delay = _ref.delay,
        timer = _ref.timer,
        howler$$1 = _ref.howler;
    classCallCheck(this, Gig);

    var _this = possibleConstructorReturn(this, (Gig.__proto__ || Object.getPrototypeOf(Gig)).call(this, source));

    EventEmitter.call(_this);

    _this.audio = audio;
    _this.loop = loop;
    _this.tempo = tempo; // FIXME: Sync with Howler's rate property
    _this.delay = delay;
    _this.timer = timer || defaultTimer;

    _this.index = { measure: 0, beat: 0 };
    _this.music = new howler.Howl(Object.assign({
      src: audio,
      loop: loop
    }, howler$$1));

    // this.listen()
    return _this;
  }

  /**
   * Provides the measure and beat found at the track's cursor
   *
   * @returns {Object}
   */


  createClass(Gig, [{
    key: 'listen',


    /**
     * Synchronizes track with the Howler API
     */
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
    key: 'start',
    value: function start() {
      var _this2 = this;

      var delay = this.delay * this.interval;

      setTimeout(function () {
        _this2.clock = _this2.timer(_this2);
        _this2.emit('start');
      }, delay || 0);
    }

    /**
     * Loads the audio data and kicks off the synchronization clock
     */
    // FIXME: sync audio playback with `start` delay

  }, {
    key: 'play',
    value: function play() {
      var _this3 = this;

      this.music.once('load', function () {
        if (!_this3.clock) _this3.start();

        _this3.music.play();
        _this3.emit('play');
      });
    }

    /**
     * Stops the audio and the synchronization clock (no resume)
     */

  }, {
    key: 'stop',
    value: function stop() {
      if (!this.clock) return;

      this.music.stop();
      this.clock.stop();
      this.emit('stop');
    }

    /**
     * Pauses the audio and the synchronization clock
     */

  }, {
    key: 'pause',
    value: function pause() {
      this.music.pause();
      this.clock.pause();
      this.emit('pause');
    }

    /**
     * Resumes the audio and the synchronization clock
     */

  }, {
    key: 'resume',
    value: function resume() {
      this.music.play();
      this.clock.resume();
      this.emit('resume');
    }

    /**
     * Mutes the track audio
     */

  }, {
    key: 'mute',
    value: function mute() {
      this.music.mute();
      this.emit('mute');
    }

    /**
     * Seek to a new position in the track
     *
     * @param {number} to position in the track in seconds
     */
    // WARN: probably can't even support this because of dynamic interval (step can change arbitrarily)
    // NOTE: if we assume every interval is the same, relative to tempo, this could work

  }, {
    key: 'seek',
    value: function seek(to) {
      this.music.seek(to);
      this.emit('seek');
    }

    /**
     * Invokes the action to perform on each interval
     *
     * @param {Object} [context] stateful dynamic interval context
     * @returns {Object} updated interval context
     */
    // TODO: support `bach.Set` (i.e. concurrent elements)

  }, {
    key: 'step',
    value: function step(context) {
      var last = this.last,
          interval = this.interval,
          state = this.state;
      var beat = state.beat;
      var duration = beat.duration,
          exists = beat.exists;

      var wait = interval * duration;

      if (last) this.emit('beat:stop', last);
      if (exists) this.emit('beat:play', beat);

      this.bump();

      return Object.assign({}, context, { wait: wait });
    }

    /**
     * Increases the cursor to the next beat of the track and, if we're on the last beat,
     * also increases the cursor to the next measure.
     */

  }, {
    key: 'bump',
    value: function bump() {
      var numOf = {
        measures: this.data.length,
        // beats    : this.data[0].length
        beats: this.data[this.index.measure].length
      };

      var limit = {
        measure: Math.max(numOf.measures, 1),
        beat: Math.max(numOf.beats, 1)
      };

      var increment = {
        measure: this.index.beat === limit.beat - 1 ? 1 : 0,
        beat: 1
      };

      console.log('[gig:bump] numOf, limit, increment', numOf, limit, increment);

      this.index.measure = (this.index.measure + increment.measure) % limit.measure;
      this.index.beat = (this.index.beat + increment.beat) % limit.beat;
    }

    /**
     * Determines if the track's music is loading
     */

  }, {
    key: 'loading',
    value: function loading() {
      return this.music.state() === 'loading';
    }
  }, {
    key: 'state',
    get: function get$$1() {
      return this.at(this.cursor.measure, this.cursor.beat);
    }

    /**
     * Provides the measure and beat found one step behind the track's cursor
     *
     * @returns {Object}
     */

  }, {
    key: 'last',
    get: function get$$1() {
      return this.at(this.cursor.measure - 1, this.cursor.beat - 1);
    }

    /**
     * Provides the measure and beat found one step ahead of the track's cursor
     *
     * @returns {Object}
     */

  }, {
    key: 'next',
    get: function get$$1() {
      return this.at(this.cursor.measure + 1, this.cursor.beat + 1);
    }

    /**
     * Determines the cursors of both the current measure and beat of the track
     *
     * @returns {Object}
     */

  }, {
    key: 'cursor',
    get: function get$$1() {
      console.log('[gig:cursor] this.index', this.index, this.data[this.index.measure].length - 1);
      return {
        measure: Math.min(Math.max(this.index.measure, 0), this.data.length - 1),
        // NOTE: Using index.measure here doesn't fix iterating through uneven matrices as expected/hoped
        beat: Math.min(Math.max(this.index.beat, 0), this.data[this.index.measure].length - 1)
      };
    }
  }]);
  return Gig;
}(bachJs.Track);

Object.assign(bachJs.Track.prototype, EventEmitter.prototype);

var defaultTimer = function defaultTimer(track) {
  return statefulDynamicInterval.setStatefulDynterval(track.step.bind(track), { wait: track.interval, immediate: true });
};

exports.Gig = Gig;
exports.defaultTimer = defaultTimer;
