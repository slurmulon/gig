# gig
> :speaker: Official Bach player for JS
---

[`bach`](https://github.com/slurmulon/bach) is a dynamic notation for representing musical tracks with a focus on human readability and productivity.

`gig` consumes, renders and synchronizes `bach` tracks with audio files (or really anything) in a browser or browser-like environment.

## Install

`npm install --save slurmulon/gig`

## Example

### Node

Once your `bach` track has been [compiled into `bach.json`](https://github.com/slurmulon/bach#usage), it can then be consumed and rendered by `gig`.

```js
import { Track } from 'gig'
import source from './bouree.bach.json'

const track = new Track({ source })

track.play()
```

The following sections provide examples of both a `bach` track and its compiled `bach.json` output.

### `bach`

Here we have a blues song (written in `bach`) that is intended to be improvised over by a guitar player.

It defines a sequence of scale progressions (i.e. a harmony), with each progression lasting from 1 to 2 measures.

```
@Audio = 'http://api.madhax.io/track/q2IBRPmMq9/audio/mp3'
@Title = 'The Absolute Slowest Jimi Style 12-Bar-Blues Backing Track in A'
@Tempo = 42
@Tags  = ['blues', 'rock', 'slow']
@Instrument = 'guitar'

:A = Scale('A3 minorpentatonic')
:D = Scale('D3 minorpentatonic')
:E = Scale('E3 minorpentatonic')

:Track = [
  1 -> :A
  1 -> :D
  2 -> :A
  2 -> :D
  2 -> :A
  1 -> :E
  1 -> :D
  2 -> :A
]

!Play :Track
```

There are only a couple of entities being utilized here, and this should be the case for most songs:

- Headers (`@`)
- Sequence (`[]`)
- Scale (in [scientific notation](https://en.wikipedia.org/wiki/Scientific_pitch_notation))
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
      "list",
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
    "title": "The Absolute Slowest Jimi Style 12-Bar-Blues Backing Track in A",
    "total-beats": 12
  }
}
```

Note how the nested array `data`, which contains the actual beats/notes to play, is a normalized matrix. Each row (measure) has the same number of columns (beats) regardless of whether or not there are any notes/beats to play in a column.

We also have the `lowest-beat`, `ms-per-beat` and `total-beats` pre-calculated and easily accessible.

All of this makes interpreting `bach.json` trivial. You can simply step through the track in evenly sized intervals (`lowest-beat` for `ms-per-beat`) and everything else just sort of flows together and aligns.

To see an example of just how simple this is, take a look [here](https://github.com/slurmulon/gig/blob/master/src/track.js).
> **Caveat**
>
> Due to the single-threaded nature of JavaScript, it's imperative that you provide `gig` with an alternative timing API that corrects for drift. Otherwise the track data (and anything depending on this data) will inevitably fall behind the audio.
>
> You can find a list of such timers that help minimize drift [here](https://github.com/slurmulon/dynamic-interval#related).

An alternative implementation strategy is to preemptively schedule every `bach` element ahead of time, and then frequently poll for the target time of each element within context.

`gig` takes the interval approach for now but will soon support both implementation strategies.

### Support

As of now, only the [core Clojure library](https://github.com/slurmulon/bach#usage) can compile `bach` into `bach.json`.

If using the Clojure library or CLI is not an option, a [RESTful HTTP API](https://github.com/slurmulon/bach-rest-api) is also available.

## Todo

- [ ] Integrate `bach-json-schema` for validation
- [ ] Support general `loop` parameter
- [ ] Support custom looping contexts
- [ ] Automatically follow `@Audio` URL and load bytestream into memory
- [ ] Moar tests

## License

MIT
