# gig
> :sound: Bach player for JS
---

[`bach`](https://github.com/slurmulon/bach) is a semantic music notation with a focus on human readability and productivity.

`gig` consumes and synchronizes `bach` tracks with audio files (or really anything) in a browser or browser-like environment.

## Sections

 - [Install](#install)
 - [Usage](#usage)
   * [Options](#options)
   * [Methods](#methods)
   * [Events](#events)
   * [Timers](#timers)
     - [Interface](#interface)
     - [Implementation](#implementation)
 - [Data](#data)
   * [`bach`](#bach)
   * [`bach.json`](#bachjson)
   * [Support](#support)
 - [Future](#future)
 - [License](#license)

## Install

`npm install --save slurmulon/gig`

In order compile your `bach` tracks, you will also want to install the [core `bach` library](https://github.com/slurmulon/bach#install).

## Usage

Once your `bach` track has been [compiled into `bach.json`](https://github.com/slurmulon/bach#usage), it can then be consumed and rendered by `gig`.

```js
import { Track } from 'gig'
import source from './bouree.bach.json'

const track = new Track({ source })

track.play()
```

To see examples of both a `bach` track and its compiled `back.json`, see the [Data](#data) section.

### Options

#### `source`

Defines the core musical data of the track in [`bach.json`](https://github.com/slurmulon/bach-json-schema).

 - **Type**: [`bach.json`](https://github.com/slurmulon/bach-json-schema)
 - **Required**: `true`

```js
import { Track } from 'gig'

const track = new Track({
  source: {
    headers: { /* ... */ },
    data: [ /* ... */ ]
  }
})
```

#### `audio`

Specifies the audio data to synchronize the musical `bach.json` data with.

 - **Type**: `String`, `Blob`, `Array`
 - **Required**: `false` (may be inherited from `source` headers)

```js
import { Track } from 'gig'

const track = new Track({
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
import { Track } from 'gig'

const track = new Track({
  source: { /* ... */ },
  audio: 'http://api.madhax.io/track/q2IBRPmMq9/audio/mp3',
  loop: true
})
```
#### `tempo`

Specifies the tempo at which the music and audio data should be played at.

 - **Type**: `Number` (beats per minute)
 - **Required**: `true` (may be inherited from `source` headers)

```js
import { Track } from 'gig'

const track = new Track({
  source: { /* ... */ },
  audio: 'http://api.madhax.io/track/q2IBRPmMq9/audio/mp3',
  tempo: 120
})
```

#### `delay`

Determines how much of a delay there should be (in beats) between when the user plays the track and the clock/audio actually starts.

Useful for supporting count-ins to tracks.

 - **Type**: `Number` (beats)
 - **Required**: `false`
 - **Default**: `0`

```js
import { Track } from 'gig'

const track = new Track({
  source: { /* ... */ },
  audio: 'http://api.madhax.io/track/q2IBRPmMq9/audio/mp3',
  delay: 4 // starts playing after waiting for four beats
})
```

### Methods

#### `play()`

Loads the audio data and kicks off the internal synchronization clock once everything is ready.

```js
import { Track } from 'gig'
import source from './lullaby.bach.json'

const track = new Track({ source })

track.play()
```

#### `start()`

Instantiates a new clock from the provided timer, acting as the primary synchronization mechanism between the music and audio data.

> **Warning**
> 
> This method is primarily for internal use, and `play()` is usually the method you want to use instead.
> 
> Until `play()` is called, **no audio** will play at all, and, if there's any delay between the `start()` and `play()` calls, the internal clock will get out of sync!

```js
import { Track } from 'gig'
import source from './lullaby.bach.json'

const track = new Track({ source })

track.start()
```

#### `stop()`

Stops the audio and synchronization clock. Does not allow either of them to be resumed.

```js
import { Track } from 'gig'
import source from './lullaby.bach.json'

const track = new Track({ source })

track.play()

setTimeout(() => {
  track.stop()
}, 1000)
```

#### `pause()`

Pauses the audio and synchronization clock. May be resumed at any point via the `resume()` method.

```js
import { Track } from 'gig'
import source from './lullaby.bach.json'

const track = new Track({ source })

track.play()

setTimeout(() => {
  track.pause()
}, 1000)
```

#### `resume()`

Resumes a previously paused audio synchronization clock.

```js
import { Track } from 'gig'
import source from './lullaby.bach.json'

const track = new Track({ source })

track.play()

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
import { Track } from 'gig'
import source from './lullaby.bach.json'

const track = new Track({ source })

track.play()

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
 - `beat:stop`: The beat that was just playing has ended
 - `beat:play`: The next beat in the queue has begun playing

You can subscribe to a `Track` event using the `on` method:

```js
const track = new Track({ /* ... */ })

track.on('beat:play', beat => console.log('starting to play beat', beat))
track.on('beat:stop', beat => console.log('finished playing beat', beat))

track.play()
```
### Timers

Because the timing needs of each music application are different, `gig` allows you to provide your own custom timers.

It's also usually imperative that you [provide `gig`](#implementation) with an alternative [interval API](https://github.com/slurmulon/dynamic-interval#api) that helps correct for drift. Otherwise the track data (and anything depending on this data) will inevitably fall behind the audio.

This is due to the single-threaded nature of JavaScript and the generally low precision of `setTimeout` and `setInterval`. Read Chris Wilson's article ["A Tale of Two Clocks: Scheduling Web Audio for Precision"](https://www.html5rocks.com/en/tutorials/audio/scheduling/) for detailed information on this limitation and a tutorial on how to create a more accurate clock in JavaScript.

This limitation becomes particularly prominent in web applications that loop audio forever or play otherwise "long" streams of audio information.

But this is simply a non-issue for many applications, and this is why `gig` allows custom timers and interval APIs to be provided.

#### Interface

Timers are provided as a factory function (accepting the current `track`) which is expected to return an object with the following interface:

```ts
interface GigTimer {
  (track: Track): GigTimer
  stop()
  pause()
  resume()
}
```

Your resulting timer **must** use `track.step.bind(track)` as its interval callback/action. Otherwise `gig` has no way to know when each step should be called (after all, that's the job of the timer)!

It's also advised that you use `track.interval` as the duration or your interval, especially if your timer supports dynamic durations.

```js
import { setStatefulDynterval as clock } from 'stateful-dynamic-interval'

// A properly configured `gig` timer
const timer = track => clock(track.step.bind(track), { wait: track.interval, immediate: true })
```

#### Implementation

Timers must invoke their first step immediately, unlike the behavior of `setInterval` where a full interval takes place before the first step is run. This constraint ultimately makes aligning the music with the audio much simpler.

An open-source timer that supports this interface is [`stateful-dynamic-interval`](https://github.com/slurmulon/stateful-dynamic-interval), and `gig` has established it as its default.

However, it still uses the `WindowOrWorkerGlobalScope.setTimeout` interval API by default, which is problematic in many situations because it has inherent drift.

Therefore, even if you are satisfied with `stateful-dynamic-interval` and how it manages the clock's internal state, it's suggested that you provide it with an [interval API](https://github.com/slurmulon/dynamic-interval#api) that minimizes drift.

In this example, we're using [`worker-timers`](https://npmjs.com/worker-timers), which runs the interval inside of a dedicated Web Worker thread:

```js
import source from './lullaby.bach.json'
import { Track } from 'gig'
import { setStatefulDynterval as clock } from 'stateful-dynamic-interval'
import * as workerTimers from 'worker-timers'

const timer = track => clock(track.step.bind(track), { wait: track.interval, immediate: true }, workerTimers)
const track = new Track({ source, timer })

track.play()
```

You can find a list of timers that help minimize drift [here](https://github.com/slurmulon/dynamic-interval#related). `gig` will eventually provide a default interval API that best alleviates this problem for the general use case.

## Data

### `bach`

Here we use `bach` to define a blues backing track that is intended to be improvised over by a guitar player.

It defines a sequence of scale progressions (i.e. a harmony), with each progression lasting from 1 to 2 measures.

```
@Audio = 'http://api.madhax.io/track/q2IBRPmMq9/audio/mp3'
@Title = '12-Bar-Blues Backing Track in A'
@Tempo = 42
@Instrument = 'guitar'

:A = Scale('A3 minorpentatonic')
:D = Scale('D3 minorpentatonic')
:E = Scale('E3 minorpentatonic')

!Play [
  1 -> :A
  1 -> :D
  2 -> :A
  2 -> :D
  2 -> :A
  1 -> :E
  1 -> :D
  2 -> :A
]
```

There are only a couple of entities being utilized here, and this should be the case for most songs:

- Headers (`@`)
- Sequence (`[]`)
- Scale (in [scientific pitch notation](https://en.wikipedia.org/wiki/Scientific_pitch_notation))
- Export (`!Play`)

### `bach.json`

The previous snippet contained uncompiled, vanilla `bach`.

In order to be interpreted, tracks in the `bach` format must first be converted into [`bach.json`](https://github.com/slurmulon/bach-json-schema). This is an intermediary JSON micro-format that is much easier for `bach` engines to parse.

This is the **only** format that `gig` understands. It **cannot** compile the `bach` track itself. You can use the CLI provided by the [core `bach` library](https://github.com/slurmulon/bach#cli) for this.

Here is the compiled `bach.json` version of the previous example:

```
{
  "data": [
    [
      {
        "duration": 1,
        "notes": {
          "atom": {
            "init": {
              "arguments": [
                "A minorpentatonic"
              ]
            },
            "keyword": "Scale"
          }
        }
      }
    ],
    [
      {
        "duration": 1,
        "notes": {
          "atom": {
            "init": {
              "arguments": [
                "D minorpentatonic"
              ]
            },
            "keyword": "Scale"
          }
        }
      }
    ],
    [
      {
        "duration": 2,
        "notes": {
          "atom": {
            "init": {
              "arguments": [
                "A minorpentatonic"
              ]
            },
            "keyword": "Scale"
          }
        }
      }
    ],
    [
      null
    ],
    [
      {
        "duration": 2,
        "notes": {
          "atom": {
            "init": {
              "arguments": [
                "D minorpentatonic"
              ]
            },
            "keyword": "Scale"
          }
        }
      }
    ],
    [
      null
    ],
    [
      {
        "duration": 2,
        "notes": {
          "atom": {
            "init": {
              "arguments": [
                "A minorpentatonic"
              ]
            },
            "keyword": "Scale"
          }
        }
      }
    ],
    [
      null
    ],
    [
      {
        "duration": 1,
        "notes": {
          "atom": {
            "init": {
              "arguments": [
                "E minorpentatonic"
              ]
            },
            "keyword": "Scale"
          }
        }
      }
    ],
    [
      {
        "duration": 1,
        "notes": {
          "atom": {
            "init": {
              "arguments": [
                "D minorpentatonic"
              ]
            },
            "keyword": "Scale"
          }
        }
      }
    ],
    [
      {
        "duration": 2,
        "notes": {
          "atom": {
            "init": {
              "arguments": [
                "A minorpentatonic"
              ]
            },
            "keyword": "Scale"
          }
        }
      }
    ],
    [
      null
    ]
  ],
  "headers": {
    "lowest-beat": 1,
    "ms-per-beat": 5714.2856,
    "tags": [
      "blues",
      "rock",
      "slow"
    ],
    "tempo": 42,
    "time": [
      4,
      4
    ],
    "audio": "http://api.madhax.io/track/q2IBRPmMq9/audio/mp3",
    "title": "12-Bar-Blues Backing Track in A",
    "total-beats": 12
  }
}
```

Note how the nested array `data`, which contains the actual beats/notes to play, is normalized as a matrix. Each row (measure) has the same number of columns (beats) regardless of whether or not there are any notes/beats to play in a column.

We also have the `lowest-beat`, `ms-per-beat` and `total-beats` pre-calculated and easily accessible.

All of this makes interpreting `bach.json` trivial. You can simply step through the track in evenly sized intervals (`lowest-beat` for `ms-per-beat`) and everything else just sort of flows together and aligns.

### Support

As of now, only the [core Clojure library](https://github.com/slurmulon/bach#usage) can compile `bach` into `bach.json`.

If using the Clojure library or CLI is not an option, a [RESTful HTTP API](https://github.com/slurmulon/bach-rest-api) is also available.

## Future

- [x] Integrate `bach-json-schema` for validation
- [ ] Support general `loop` parameter
- [ ] Support custom looping contexts
- [ ] Automatically follow `@Audio` URL and load bytestream into memory
- [ ] Moar tests

## License

MIT
