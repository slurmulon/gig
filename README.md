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
   * [Options](#options)
   * [Methods](#methods)
   * [Events](#events)
   * [Timers](#timers)
 - [Data](#data)
   * [`bach`](#bach)
   * [`bach.json`](#bachjson)
   * [Support](#support)
 - [Future](#future)
 - [License](#license)

## Install

`npm install --save slurmulon/gig`

In order to compile your `bach` tracks, you will also need to install the [core `bach` library](https://github.com/slurmulon/bach#install).

A ClojureScript module will be introduced soon so that this step becomes unnecessary.

## Usage

Simply provide your `bach` track as either a string (UTF-8) or a valid `bach.json` object.

```js
import { Gig } from 'gig'
import source from './bouree.bach.json'

const gig = new Gig({ source })

gig.play()
```

To see examples of both a `bach` track and its compiled `back.json`, see the [Data](#data) section.

### Options

#### `source`

Defines the core musical data of the track in [`bach.json`](https://github.com/slurmulon/bach-json-schema).

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

track.start()
```

#### `stop()`

Stops the audio and synchronization clock. Does not allow either of them to be resumed.

```js
import { Gig } from 'gig'
import source from './lullaby.bach.json'

const gig = new Gig({ source })

gig.play()

setTimeout(() => {
  track.stop()
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
  track.pause()
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
  track.pause()

  setTimeout(() => {
    track.resume()
  }, 1000)
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
  track.mute()
}, 1000)
```
### Events

A `Track` will emit an event for each of its transitional behaviors:

 - `start`: The internal clock has been instantiated and invoked
 - `play`: The audio has finished loading and begins playing
 - `stop`: The audio and clock have been stopped and deconstructed
 - `mute`: The audio has been muted
 - `seek`: The position of the track (both data and audio) has been modified
 - `loop`: The track has looped
 - `stop:beat`: The beat that was just playing has ended
 - `play:beat`: The next beat in the queue has begun playing

You can subscribe to a `Track` event using the `on` method:

```js
const gig = new Gig({ /* ... */ })

gig.on('play:beat', beat => console.log('starting to play beat', beat))
gig.on('stop:beat', beat => console.log('finished playing beat', beat))

gig.play()
```
### Timers

Because the timing needs of each music application are different, `gig` allows you to provide your own custom timers.

`gig` supports both stateless monotic timers (default) and stateful interval timers. It's recommended to use a stateless monotic timer since they are immune to drift.

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

However, because `stateful-dynamic-interval` uses `setTimeout` behind the scenes, drift between audio (or any other synchronization points) will inevitably grow, and playback will no longer be accurately aligned.

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

## Future

 - [ ] Replace `howler` with `tone.js`
 - [ ] Unit and integration tests
 - [ ] Seek functionality
 - [ ] Tempo adjustment (required in `bach-js` or `bach` core)

## License

MIT
