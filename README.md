# gig
> :sound: Bach player for JS
---

[`bach`](https://codebach.tech) is a semantic music notation with a focus on human readability and productivity.

`gig` consumes and synchronizes `bach` tracks with audio data (or any kind of data) in a browser or browser-like environment.

See `gig` in action by using [`bach-editor`](https://github.com/slurmulon/bach-editor), a minimal web-based editor for writing and playing `bach` tracks.

Example `bach` tracks can be found at https://codebach.tech/#/examples.

## Sections

 - [Install](#install)
 - [Usage](#usage)
 - [Documentation](#documentation)
   * [Options](#options)
   * [Methods](#methods)
   * [Getters](#getters)
   * [Events](#events)
   * [Timers](#timers)
 - [Roadmap](#roadmap)
 - [License](#license)

## Install

```sh
$ npm i slurmulon/gig
```

## Usage

Simply provide your `bach` track as either a string (UTF-8) or a valid `bach.json` object.

```js
import { Gig } from 'gig'

const gig = new Gig({
  source: `
    @tempo = 134

    play! [
      1/2 -> chord('Am')
      1/2 -> chord('G')
      3/8 -> chord('F')
      5/8 -> chord('D')
    ]
  `
})

gig.play()
```

## Documentation

### Options

#### `source`

Defines the core musical data of the track in [`bach.json`](https://github.com/slurmulon/bach-json-schema).

If provided as a string, `bach` will be compiled upon instantiation.

If provided an object, it will be validated as proper `bach.json`.

 - **Type**: `string` or [`bach.json`](https://github.com/slurmulon/bach-json-schema)
 - **Required**: `true`

```js
import { Gig } from 'gig'

const gig = new Gig({
  source: `
    @tempo = 150
    @meter = 5|8

    play! [
      3/8 -> {
        Scale('D dorian')
        Chord('Dm9')
      }
      2/8 -> Chord('Am9')
    ]
  `
})
```

#### `audio`

Specifies the audio data to synchronize the musical `bach.json` data with.

 - **Type**: `String`, `Blob`, `Array`
 - **Required**: `false` (may be inherited from `source` headers)

```js
import { Gig } from 'gig'

const gig = new Gig({
  source: { /* ... */ },
  audio: 'http://api.madhax.io/track/q2IBRPmMq9/audio/mp3'
})
```

#### `loop`

Determines if the audio and music data should loop forever.

 - **Type**: `Boolean`
 - **Required**: `false`
 - **Default**: `false`

```js
import { Gig } from 'gig'

const gig = new Gig({
  source: { /* ... */ },
  audio: 'http://api.madhax.io/track/q2IBRPmMq9/audio/mp3',
  loop: true
})
```

#### `stateless`

Determines if the iteration cursor is stateless (`true`) or stateful (`false`).

Changing this value is **not recommended** unless you know what you're doing.

If you set `stateless: false`, you **must** provide a custom `timer` that manually sets `gig.index` to the current `step` (i.e. `bach`'s unit of iteration).

See the [Timers](#timers) section for more detailed information.


 - **Type**: `Boolean`
 - **Required**: `false`
 - **Default**: `true`

```js
import { Gig } from 'gig'

const gig = new Gig({
  source: { /* ... */ },
  audio: 'http://api.madhax.io/track/q2IBRPmMq9/audio/mp3',
  stateless: true
})
```

### Methods

#### `play()`

Loads the audio data and kicks off the internal synchronization clock once everything is ready.

```js
import { Gig } from 'gig'
import source from './lullaby.bach.json'

const gig = new Gig({ source })

gig.play()
```

#### `start()`

Instantiates a new clock from the provided timer, acting as the primary synchronization mechanism between the music and audio data.

> **Warning**
> 
> This method is primarily for internal use, and `play()` is usually the method you want to use instead.
> 
> Until `play()` is called, **no audio** will play at all, and, if there's any delay between the `start()` and `play()` calls, the internal clock will get out of sync!

```js
import { Gig } from 'gig'
import source from './lullaby.bach.json'

const gig = new Gig({ source })

gig.start()
```

#### `stop()`

Stops the audio and synchronization clock. Does not allow either of them to be resumed.

```js
import { Gig } from 'gig'
import source from './lullaby.bach.json'

const gig = new Gig({ source })

gig.play()

setTimeout(() => {
  gig.stop()
}, 1000)
```

#### `pause()`

Pauses the audio and synchronization clock. May be resumed at any point via the `resume()` method.

```js
import { Gig } from 'gig'
import source from './lullaby.bach.json'

const gig = new Gig({ source })

gig.play()

setTimeout(() => {
  gig.pause()
}, 1000)
```

#### `resume()`

Resumes a previously paused audio synchronization clock.

```js
import { Gig } from 'gig'
import source from './lullaby.bach.json'

const gig = new Gig({ source })

gig.play()

setTimeout(() => {
  gig.pause()

  setTimeout(() => {
    gig.resume()
  }, 1000)
}, 1000)
```

#### `kill()`

Stops the synchronization clock, audio, and removes all even listeners and artifacts.

This is particularly useful in reactive systems such as Vue and React.

```js
import { Gig } from 'gig'
import source from './lullaby.bach.json'

const gig = new Gig({ source })

gig.play()

setTimeout(() => {
  gig.kill()
}, 1000)
```

#### `mute()`

Mutes the track audio. Has no effect on the synchronization clock.

```js
import { Gig } from 'gig'
import source from './lullaby.bach.json'

const gig = new Gig({ source })

gig.play()

setTimeout(() => {
  gig.mute()
}, 1000)
```

#### `moment(duration, lens)`

Determines when a duration occurs (in milliseconds) relative to the run-time origin.

By default, `lens` is configured to convert from `step` to `ms`.

```js
import { Gig } from 'gig'
import source from './lullaby.bach.json'

const gig = new Gig({ source })

gig.moment(4)
gig.moment(4, { as: 'step' }) // same as above
gig.moment(4, { is: 'step' }) // same as above
gig.moment(12, { as: 'pulse' })
gig.moment(2.5, { is: 'step', as: 'bar' })
gig.moment(30, { as: 'second' })
```

#### `globalize(duration, lens)`

Converts a localized/relative/cyclic duration into its globalized/absolute version.

The inverse of this conversion can be achieved with `Gig.durations.cyclic(duration)`.

By default, `lens` is configured to convert from `step` to `step` (identity/no-op).

```js
import { Gig } from 'gig'
import source from './lullaby.bach.json'

const gig = new Gig({ source })

gig.globalize(0) // 0 steps
gig.globalize(0, { is: 'step' }) // 0 steps - same as above
gig.globalize(0, { as: 'step' }) // 0 steps - same as above
gig.globalize(2, { as: 'ms' }) // 500ms

// Wait for song to loop once - assume track duration is 4 seconds (16 steps, 8 pulses, 2 bars)
setTimeout(() => {
  gig.globalize(0) // 16 steps
  gig.globalize(0, { as: 'ms' }) // 4000ms
  gig.globalize(2) // 18 steps
  gig.globalize(2, { as: 'ms' }) // 4500ms
  gig.globalize(2, { as: 'step' }) // 18 steps
  gig.globalize(1, { is: 'bar', as : 'step' }) // 24 steps
}, gig.duration)
```

#### `seek(duration, is)`

Seeks playback to a new target position (duration) in the track.

Target positions that exceed the total duration of the track are wrapped via `gig.durations.cyclic`.

Automatically synchronizes audio, adjusts for drift, and emits state change events (`seek`, `play:beat`).

Can be called at run-time, but is currently unsupported on tracks that have not started playing yet (`gig.based === true`).

```js
import { Gig } from 'gig'
import source from './lullaby.bach.json'

// Total Duration:
// 16 steps, 8 pulses, 2 bars, 4000 ms, 4 seconds
const gig = new Gig({ source })

gig.play()

gig.seek(2) // Jump 500ms (2 steps, 1 pulse)
gig.seek(2, 'step') // Jump 500ms (short-hand for above)
gig.seek(500, 'ms') // Jump 500ms 
gig.seek(1, 'pulse') // Jump 500ms (1 pulse)

gig.seek(gig.duration) // Jump to end of track
gig.seek(gig.duration * 2) // Jump to end of track, 2nd loop
gig.seek(0) // Jump to start of track
gig.seek(8500, 'ms') // Jump 8500ms, safely looping to beginning of track

// Seeking is achieved using absolute/global durations, so your input `duration` is must be pre-globalized.
// If you want to seek to a relative/local duration instead, you simply need to globalize it first:
const jump = (step) => {
  const duration = get(gig).globalize(step)

  get(gig).seek(duration)
}
```

#### `check(status)`

Determines if playback matches the provided status (as a string).

The supported statuses are:

 - `pristine`: Playback has not changed since instantiation.
 - `playing`: Playback is currently active.
 - `stopped`: Playback is stopped.
 - `paused`: Playback is paused and may be resumed later.
 - `killed`: Playback has been killed and all listeners and artifacts have been removed.

```js
import { Gig } from 'gig'
import source from './lullaby.bach.json'

const gig = new Gig({ source })

gig.play()
gig.check('playing') // true

gig.stop()
gig.check('stopped') // true
```

### Getters

`Gig` extends `bach-js`'s [`Music`](https://github.com/slurmulon/bach-js#musical_note-music) class and provides additional getters that are specific to real-time playback.

#### `state`

Provides the beat, elements and events found at the playback cursor (step).

 - `beat`: The beat present at the duration (from `Gig.beats`)
 - `elems` List of elements (by id) playing at the duration (from `Gig.elements`)
 - `play`: List of elements that should begin playing at the duration
 - `stop`: List of elements that should stop playing at the duration

#### `prev`

Provides the beat, elements and events found at the previous playback cursor (step).

#### `next`

Provides the beat, elements and events found at the next playback cursor (step).

#### `cursor`

Determines the cyclic/relative playback cursor (step), never exceeding the total length of the track.

#### `current`

Determines the global/absolute playback cursor (step), potentially exceeding the total length of the track.

Uses the `stateless` configuration option to determine if the value is derived from an imperative state or a monotonic timer.

#### `place`

Determines the global/absolute playback cursor (step), strictly based on elapsed monotonic time.

#### `unit`

Determines the base duration unit to use via the `stateless` configuration option.

Returns `ms` when stateless and `step` when stateful.

#### `first`

Determines if the cursor is on the first step of the track.

#### `last`

Determines if the cursor is on the last step of the track.

#### `elapsed`

Determines the amount of time (in `ms`) that's elapsed since the track started playing.

#### `progress`

The progress of the track's overall playback, modulated to 1 (e.g. 1.2 -> 0.2).

#### `completion`

The run-time completion of the track's overall playback.

The same as `progress` but can overflow `1`, meaning the track has looped.

#### `iterations`

Determines the number of times the track's playback has looped/repeated.

#### `repeating`

Determines if the track's playback has already looped/repeated.

#### `limit`

Determines the limit of steps to restrict playback to.

If the `loop` configuration option is `true`, the limit becomes `Math.Infinity`.

Otherwise the `limit` matches the total duration of the track.

#### `metronome`

Provides the current pulse beat under the context of a looping metronome.

#### `updated`

Determines if the current step's beat has changed from the previous step's beat.

### Events

A `Gig` object emits events for each of its transitional behaviors, extending Node's `EventEmitter` API:

 - `start`: The internal clock has been instantiated and invoked
 - `play`: The audio has finished loading and begins playing
 - `stop`: The audio and clock have been stopped and deconstructed
 - `pause`: The audio and clock have been paused
 - `resume`: The audio and clock have been resumed
 - `mute`: The audio has been muted
 - `seek`: The position of the track (both data and audio) has been modified
 - `loop`: The track has looped
 - `step`: The clock has progressed a single step (`bach`'s quantized unit of iteration)
 - `stop:beat`: The beat that was just playing has ended
 - `play:beat`: The next beat in the queue has begun playing
 - `update:status`: The playback status has generally changed (i.e. `paused`, `resumed`, etc.)

Subscribe to events using the `on` method:

```js
const gig = new Gig({ /* ... */ })

gig.on('play:beat', beat => console.log('starting to play beat', beat))
gig.on('stop:beat', beat => console.log('finished playing beat', beat))

gig.play()
```

> **Warning**
> 
> Be sure to unsubscribe to events using the `off` method when you're no longer using them in order to avoid memory leaks!
>
> You can also just call `gig.kill()` when you are done with playback, which will remove any event listeners and allow unused memory to be garbage collected.

### Timers

Because the timing needs of each music application are different, `gig` allows you to provide your own custom timers.

`gig` supports both stateless monotic timers (default) and stateful interval timers.

It's recommended to use a stateless monotic timer since they are immune to drift, however stateful intervals are more ideal under certain circumstances.

#### Stateless

Stateless timers are those which determine state based on a monotonic timestamp.

By default `gig` is stateless and uses a cross-platform timer based on`requestAnimationFrame` and `performance.now()`, a high-resolution monotonic timestamp.

If you want to customize the default timer, such as providing a function to call on each frame/tick, you can import the clock directly:

```js
import { Gig, clock } from 'gig'

const tick = time => console.log('tick', time)
const timer = gig => clock(gig, tick)

const gig = new Gig({
  source: 'play! []',
  timer
})
```

#### Stateful

If your application has requires a less aggressive iteration mechanism than polling/frame-spotting (such as `requestAnimationFrame`), you can provide `gig` with a stateful timer.

The following example uses [`stateful-dynamic-interval`](https://github.com/slurmulon/stateful-dynamic-interval), a stateless timer that wraps `setTimeout` with state controls.

Since it already conforms to the expected timer interface, it requires practically no customization:

```js
import { setStatefulDynterval } from 'stateful-dynamic-interval'
import { Gig } from 'gig'

const clock = gig => setStatefulDynterval(gig.step.bind(gig), {
  wait: gig.interval,
  immediate: true
})

const gig = new Gig({
  source: 'play! []',
  clock,
  stateless: false
})

gig.play()
```

However, because `stateful-dynamic-interval` uses `setTimeout` behind the scenes, drift between audio (or any other synchronization points) will inevitably grow, and playback will eventually become misaligned.

This is due to the single-threaded nature of JavaScript and the generally low precision of `setTimeout` and `setInterval`. Read Chris Wilson's article ["A Tale of Two Clocks: Scheduling Web Audio for Precision"](https://www.html5rocks.com/en/tutorials/audio/scheduling/) for detailed information on this limitation and a tutorial on how to create a more accurate clock in JavaScript.

This limitation becomes particularly prominent in web applications that loop audio forever or play otherwise "long" streams of audio information.

Because most applications are concerned with accurate synchronization over time, `gig` establishes a driftless monotonic timer as its default, and its recommended to only detract from the default if you have to.

#### Interface

Timers are provided as a factory function (accepting the current `gig` instance) which is expected to return an object with the following interface:

```ts
interface GigTimer {
  (gig: Gig): GigTimer
  stop()
  pause()
  resume()
}
```

Your timer **must** call `gig.step()` as its interval callback/action. Otherwise `gig` has no way to know when each step should be called (after all, that's the job of the timer)!

#### Implementation

Timers must invoke their first step immediately, unlike the behavior of `setInterval` where a full interval takes place before the first step is run. This constraint ultimately makes aligning the music with the audio much simpler.

The best example of a timer implementation is `gig`'s default monotonic clock, which can be found in `src/timer.js`.

## Roadmap

 - [ ] Replace `howler` with `tone.js`
 - [ ] Unit and integration tests
 - [x] Seek functionality
 - [ ] Tempo adjustment (required in `bach-js` or `bach` core)

## License

Copyright &copy; Erik Vavro. All rights reserved.

Licensed under the [MIT License](https://opensource.org/licenses/MIT).
