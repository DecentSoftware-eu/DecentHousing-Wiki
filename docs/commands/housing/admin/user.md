---
title: '/housing admin user'
description: 'User administration commands'
---

The `admin user` subcommand group allows administrators to inspect user statistics and modify their plot limits.

## Syntax

```
/housing admin user info <user>
/housing admin user increment-plot-limit <user> <increment>
```

## Arguments

### `<user>` (Required)
The target player name.

### `<increment>` (Required in the increment syntax)
The amount by which to increase (or decrease if negative) the player's maximum plot limit.

## Permissions

- `housing.command.admin.user.info` (For the `info` subcommand)
- `housing.command.admin.user.plot.limit.increment` (For the `increment-plot-limit` subcommand)
