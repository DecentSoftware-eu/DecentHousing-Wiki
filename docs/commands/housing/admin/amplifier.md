---
title: '/housing admin amplifier'
description: 'Plot amplifier administration'
---

The `admin amplifier` subcommand group allows administrators to manage, extend, and inspect temporary plot amplifiers.

## Syntax

```
/housing admin amplifier extend <type> <span_ms>
/housing admin amplifier info <type>
```

## Arguments

### `<type>` (Required)
The unique amplifier type identifier (e.g. `WORLD_EDIT`).

### `<span_ms>` (Required in extend)
The duration to add to the amplifier in milliseconds. If the amplifier is already active, this duration is added on top of the remaining time.

Common duration values:

| Duration | Value in Milliseconds (`<span_ms>`) |
|:---------|:------------------------------------|
| 1 Hour   | `3600000`                           |
| 6 Hours  | `21600000`                          |
| 12 Hours | `43200000`                          |
| 24 Hours (1 Day) | `86400000`                  |
| 7 Days   | `604800000`                         |

## Permissions

- `housing.command.admin.amplifier.extend`
- `housing.command.admin.amplifier.info`
