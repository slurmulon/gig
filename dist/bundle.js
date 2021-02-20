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
   * @param {boolean} [tempo] in beats per minute [REMOVED]
   * @param {number} [delay] wait a duration before starting to play
   * @param {Object} [timer] alternative timer/interval API
   * @param {Object} [howler] optional Howler configuration overrides
   */
  function Gig(_ref) {
    var source = _ref.source,
        audio = _ref.audio,
        loop = _ref.loop,
        delay = _ref.delay,
        timer = _ref.timer,
        howler$$1 = _ref.howler;
    classCallCheck(this, Gig);

    var _this = possibleConstructorReturn(this, (Gig.__proto__ || Object.getPrototypeOf(Gig)).call(this, source));

    EventEmitter.call(_this);

    _this.audio = audio;
    _this.loop = loop;
    // this.tempo  = tempo // FIXME: Sync with Howler's rate property
    _this.delay = delay;
    _this.timer = timer || defaultTimer;

    _this.index = { measure: 0, beat: 0, section: 0 };
    _this.status = STATUS.pristine;

    if (audio) {
      _this.music = new howler.Howl(Object.assign({
        src: audio,
        loop: loop
      }, howler$$1));
    }

    // this.listen()
    return _this;
  }

  /**
   * Provides the core data structure backing `sections`, primarily for internal use but useful to have exposed indepdently
   *
   * @returns {Sections}
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
        _this2.is('playing');
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

      if (this.audible) {
        this.music.on('load', function () {
          _this3.start();
          _this3.music.play();
          _this3.emit('play');
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
    key: 'stop',
    value: function stop() {
      if (!this.clock) return;

      if (this.audible) {
        this.music.stop();
        this.music.unload();
      }

      this.clock.stop();
      this.emit('stop');

      return this.is('stopped');
    }

    /**
     * Pauses the audio and the synchronization clock
     */

  }, {
    key: 'pause',
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
    key: 'resume',
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
    key: 'mute',
    value: function mute() {
      if (this.audible) this.music.mute();

      this.emit('mute');

      return this;
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
      if (this.audible) this.music.seek(to);
      // TODO: this.reorient()
      this.emit('seek');

      return this;
    }

    /**
     * Invokes the action to perform on each interval
     *
     * @param {Object} [context] stateful dynamic interval context
     * @returns {Object} updated interval context
     */

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

      this.bump(beat);

      return Object.assign({}, context, { wait: wait });
    }

    /**
     * Increases the cursor to the next beat of the track and, if we're on the last beat,
     * also increases the cursor to the next measure.
     */

  }, {
    key: 'bump',
    value: function bump(beat) {
      var limit = {
        measure: Math.max(this.size.measures, 1),
        beat: Math.max(this.size.beats, 1),
        section: Math.max(this.size.sections, 1)
      };

      var increment = {
        measure: this.index.beat === limit.beat - 1 ? 1 : 0,
        beat: 1,
        section: beat.exists ? 1 : 0
      };

      this.index.measure = Math.floor(this.index.measure + increment.measure) % limit.measure;
      this.index.beat = Math.floor(this.index.beat + increment.beat) % limit.beat;
      this.index.section = Math.floor(this.index.section + increment.section) % limit.section;
    }

    /**
     * Removes all active event listeners
     *
     * TODO: Consider automatically stopping the track here if already running
     */
    // purge

  }, {
    key: 'clear',
    value: function clear() {
      return this.removeAllListeners();
    }

    /**
     * Immediately stops the track, its clock, and removes all active event listeners
     */

  }, {
    key: 'kill',
    value: function kill() {
      return this.stop().clear().is('killed');
    }

    /**
     * Updates the playing status of the track (idempotent, no reactivity or side-effects).
     */

  }, {
    key: 'is',
    value: function is(status) {
      var key = status.toLowerCase();
      var value = STATUS[key];

      if (!value) throw Error(key + ' is an invalid status');

      this.status = value;

      return this;
    }

    // TODO: Make both of these getters instead
    /**
     * Determines if the track's music is loading
     */

  }, {
    key: 'loading',
    value: function loading() {
      return this.music.state() === 'loading';
    }

    /**
     * Determines if the track's music is loaded
     */

  }, {
    key: 'loaded',
    value: function loaded() {
      return this.music.state() === 'loaded';
    }
  }, {
    key: 'sectionized',
    get: function get$$1() {
      return new bachJs.Sections(this.source);
    }

    /** Provides all of the sections (i.e. the identifiable parts/transitions) of a track
     *
     * @returns {Array}
     */

  }, {
    key: 'sections',
    get: function get$$1() {
      return this.sectionized.all;
    }

    /**
     * Provides the measure and beat found at the track's cursor
     *
     * @returns {Object}
     */

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
    // TODO: Remove/refactor, this is pointless (we just want to go back 1 cursor index, not both a measure and beat!)

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
    // TODO: Remove/refactor, this is pointless (we just want to go back 1 cursor index, not both a measure and beat!)

  }, {
    key: 'next',
    get: function get$$1() {
      return this.at(this.cursor.measure + 1, this.cursor.beat + 1);
    }

    /**
     * Determines the cursors of the current measure, beat and section of the track
     *
     * @returns {Object}
     */

  }, {
    key: 'cursor',
    get: function get$$1() {
      return {
        measure: Math.min(Math.max(this.index.measure, 0), this.size.measures - 1),
        beat: Math.min(Math.max(this.index.beat, 0), this.size.beats - 1),
        section: Math.min(Math.max(this.index.section, 0), this.size.sections - 1)
      };
    }

    /**
     * Provides the current measure, beat and section of the track
     *
     * @returns {Object}
     */

  }, {
    key: 'current',
    get: function get$$1() {
      return {
        measure: this.data[this.cursor.measure],
        beat: this.data[this.cursor.measure][this.cursor.beat],
        section: this.sections[this.cursor.section]
      };
    }

    /**
     * Provides the total number of measures, beats and sections in a track, relative to the cursor
     *
     * @returns {Object}
     */

  }, {
    key: 'size',
    get: function get$$1() {
      return {
        measures: this.data.length,
        beats: this.data[this.index.measure].length,
        sections: this.sections.length
      };
    }

    /**
     * Determines if the track is actively playing
     *
     * @returns {Boolean}
     */

  }, {
    key: 'playing',
    get: function get$$1() {
      return this.status === STATUS.playing;
    }

    /**
     * Determines if the track is actively playing
     *
     * @returns {Boolean}
     */

  }, {
    key: 'paused',
    get: function get$$1() {
      return this.status === STATUS.paused;
    }

    /**
     * Determines if the track is actively playing (currently the same as .playing)
     *
     * @returns {Boolean}
     */

  }, {
    key: 'active',
    get: function get$$1() {
      return ACTIVE_STATUS.includes(this.status);
    }

    /**
     * Determines if the track is inactive
     *
     * @returns {Boolean}
     */

  }, {
    key: 'inactive',
    get: function get$$1() {
      return INACTIVE_STATUS.includes(this.status);
    }

    /**
     * Determines the progress of the track's audio (in milliseconds).
     *
     * @returns {Number}
     */

  }, {
    key: 'progress',
    get: function get$$1() {
      return this.music.seek() * 1000;
    }

    /**
     * Determines the duration of the track's audio (in milliseconds).
     *
     * @returns {Number}
     */

  }, {
    key: 'duration',
    get: function get$$1() {
      return this.music.duration() * 1000;
    }

    /**
     * Whether or not the Gig object has associated audio
     *
     * @returns {Boolean}
     */

  }, {
    key: 'audible',
    get: function get$$1() {
      return this.audio && this.music;
    }
  }]);
  return Gig;
}(bachJs.Track);

Object.assign(bachJs.Track.prototype, EventEmitter.prototype);

var defaultTimer = function defaultTimer(track) {
  return statefulDynamicInterval.setStatefulDynterval(track.step.bind(track), { wait: track.interval, immediate: true });
};

var STATUS = {
  pristine: Symbol('pristine'),
  playing: Symbol('playing'),
  stopped: Symbol('stopped'),
  paused: Symbol('paused'),
  killed: Symbol('killed')
};

var ACTIVE_STATUS = [STATUS.playing];

var INACTIVE_STATUS = [STATUS.pristine, STATUS.stopped, STATUS.paused, STATUS.killed];

var CONSTANTS = Gig.CONSTANTS = {
  STATUS: STATUS,
  ACTIVE_STATUS: ACTIVE_STATUS,
  INACTIVE_STATUS: INACTIVE_STATUS
};

exports.Gig = Gig;
exports.defaultTimer = defaultTimer;
exports.STATUS = STATUS;
exports.ACTIVE_STATUS = ACTIVE_STATUS;
exports.INACTIVE_STATUS = INACTIVE_STATUS;
exports.CONSTANTS = CONSTANTS;
exports['default'] = Gig;
