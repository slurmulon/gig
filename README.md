# juke
> :speaker: Official Warble interpreter for NodeJS
---

[`warble`](https://github.com/slurmulon/warble) is a dynamic notation for representing musical tracks with a focus on human readibility and productivity.

`juke` consumes and renders `warble` tracks against audio files (mp3, wav, etc.).

In other words, `juke` syncronizes the time between the musical notation defined in a `warble` track and its accompanying audio.

## Install

`npm install --save slurmulon/juke`

## Example

### `warble`

The following represents a blues song (written in `warble`) that is intended to be improvised over.

It simply defines a sequence of scale progressions (i.e. a harmony), with each progression lasting from 1 to 2 measures.

```
@Audio = 'http://api.madhax.io/track/q2IBRPmMq9/audio/mp3'
@Title = 'The Absolute Slowest Jimi Style 12-Bar-Blues Backing Track in A'
@Tempo = 42
@Tags  = ['blues', 'rock', 'slow']

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

There are only a couple of entities being utilized here, and this should be true for most songs:

- Headers / Meta-data (`@`)
- Loops (`[]`)
- Scale (in [scientific notation](https://en.wikipedia.org/wiki/Scientific_pitch_notation))
- Export / Main (`!Play`)

---

### `warble.json`

The previous example is uncompiled, vanilla `warble`.

In order to be interpreted, tracks in the `warble` format must first be converted into `warble.json`. This is an intermediary JSON micro-format that is much easier for `warble` engines to parse.

This is the **only** format that `juke` understands. It **cannot** compile the `warble` track itself.

As of now, only the [core Clojure library](https://github.com/slurmulon/warble#usage) can compile `warble` into `warble.json`.

Here is the compiled `warble.json` version of the previous example:

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

All of this makes interpreting `warble.json` insanely easy. You can simply step through the track in evenly sized intervals (`lowest-beat` for `ms-per-beat`) and everything else just sort of flows together and aligns.

To see an example of just how simple this is, take a look [here](https://github.com/slurmulon/juke/blob/master/src/track.js).

## License

MIT
