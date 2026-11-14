---
title: '/housing plot join'
description: 'Joins a plot'
---

The `plot join` subcommand teleports you to the specified plot by ID or to a random plot (optionally filtered by tags).

## Syntax

```
/housing plot join <id>
/housing plot join random [--tags <tags>]
```

## Arguments

### `<id>` (Required in the first syntax)
The unique ID of the plot to join.

### `[--tags <tags>]` (Optional in random join)
A comma-separated list of tag IDs to filter random plots by (e.g. `--tags parkour,pvp`). Only active plots that have all specified tags assigned will be selected.

## Permissions

- `housing.command.plot.join`
