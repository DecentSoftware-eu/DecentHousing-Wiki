---
title: '/housing admin amplifier'
description: 'Plot amplifier administration'
---

The `admin amplifier` subcommand group allows administrators to manage, extend, and inspect temporary plot amplifiers.

## Syntax

```
/housing admin amplifier extend <type> <span>
/housing admin amplifier info <type>
```

## Arguments

### `<type>` (Required)
The unique amplifier type identifier (e.g. `WORLD_EDIT`).

### `<span>` (Required in extend)
The duration to add to the amplifier. If the amplifier is already active, this duration is added on top of the remaining time.

Supports formatted time span strings as well as raw milliseconds:

- **Time span format**: A sequence of numbers followed by unit suffixes:
    - `y` - Years (365 days)
    - `m` - Months (30 days)
    - `w` - Weeks (7 days)
    - `d` - Days (24 hours)
    - `h` - Hours
    - `min` - Minutes
    - `s` - Seconds

    *Units can be combined, for example `1d12h`, `2h30min`, or `7d`.*

- **Milliseconds**: A raw numerical value representing time in milliseconds (e.g. `86400000`).

Common duration values:

| Duration | Time Span (`<span>`) | Value in Milliseconds |
|:---------|:---------------------|:----------------------|
| 30 Minutes | `30min`            | `1800000`             |
| 1 Hour   | `1h`                 | `3600000`             |
| 6 Hours  | `6h`                 | `21600000`            |
| 12 Hours | `12h`                | `43200000`            |
| 24 Hours (1 Day) | `1d` (or `24h`) | `86400000`         |
| 7 Days (1 Week)  | `7d` (or `1w`)  | `604800000`        |
| 30 Days (1 Month)| `1m` (or `30d`) | `2592000000`       |

## Permissions

- `housing.command.admin.amplifier.extend`
- `housing.command.admin.amplifier.info`
