# gig
> :speaker: Official Bach player for JS
---

[`bach`](https://github.com/slurmulon/bach) is a musical notation with a focus on human readability and productivity.

`gig` consumes, renders and synchronizes `bach` tracks with audio files (or really anything) in a browser or browser-like environment.

## Install

`npm install --save slurmulon/gig`

## Usage

### Node

Once your `bach` track has been [compiled into `bach.json`](https://github.com/slurmulon/bach#usage), it can then be consumed and rendered by `gig`.

```js
import { Track } from 'gig'
import source from './bouree.bach.json'

const track = new Track({ source })

track.play()
```

To see examples of both a `bach` track and its compiled `back.json`, see the [Data](#data) section.

#### Timers

Because the timing needs of each music application are different, `gig` allows you to provide your own custom timers.

Due to the single-threaded nature of JavaScript, it's usually imperative that you provide `gig` with an alternative timing API that corrects for drift. Otherwise the track data (and anything depending on this data) will inevitably fall behind the audio.


##### Interface

Timers are provided as a factory function (accepting the current `track`) which is expected to return an object with the following interface:

```ts
interface GigTimer {
  (track: Track): GigTimer
  stop()
  pause()
  resume()
}

```

##### Implementation

Timers must invoke their first step immediately, unlike the behavior of `setInterval` where a full interval takes place before the first step is run. This constraint ultimately makes aligning the music with the audio much simpler.

An open-source timer that supports this interface is [`stateful-dynamic-interval`](https://github.com/slurmulon/stateful-dynamic-interval), and `gig` has established it as its default.

However, it still uses the `WindowOrGlobalScope.setTimeout` timer API by default, which is problematic in most situations because it does not correct for drift.

Therefore, even if you are satisfied with `stateful-dynamic-interval` and how it manages the clock's internal state, it is suggested that you provided it with a custom timing API that reduces or partially corrects for drift.

In this example, we're using `worker-timers`, which runs the interval inside of a dedicated Service Worker thread:

```js
import source from './lullaby.bach.json'
import { Track } from 'gig'
import { setStatefulDynterval } from 'stateful-dynamic-interval'
import * as workerTimers from 'worker-timers'

const timer = track => setStatefulDynterval(track.step.bind(track), { wait: track.interval, immediate: true }, workerTimers)
const track = new Track({ source, timer })

track.play()
```

You can find a list of timers that help minimize drift [here](https://github.com/slurmulon/dynamic-interval#related). `gig` will eventually provide a default timer API that best alleviates this problem.

#### Events

A `Track` will emit an event for each of its control behaviors:

 - `start`: The internal clock has been instantiated and invoked
 - `play`: The audio has finished loading and begins playiing
 - `stop`: The audio and clock have been stopped and deconstructed
 - `mute`: The audio has been muted
 - `seek`: The position of the track (both data and audio) has been modified
 - `step:stop`: The beat that was just playing has ended
 - `step:play`: The next beat in the queue has begun playing

You can subscribe to a `Track` event using the `on` method:

```js
const track = new Track({ /* ... */ })

track.on('beat:play', beat => console.log('starting to play beat', beat))
track.on('beat:stop', beat => console.log('finished playing beat', beat)

track.play()
```

## Data

### `bach`

[Bach](https://github.com/slurmulon/bach) is a semantic music notation that is focused on readability and understandability.

Here we use it to define a blues backing track that is intended to be improvised over by a guitar player.

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

## Todo

- [x] Integrate `bach-json-schema` for validation
- [ ] Support general `loop` parameter
- [ ] Support custom looping contexts
- [ ] Automatically follow `@Audio` URL and load bytestream into memory
- [ ] Moar tests

## License

MIT
