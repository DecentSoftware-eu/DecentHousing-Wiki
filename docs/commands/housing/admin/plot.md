---
title: '/housing admin plot'
description: 'Plot administration'
---

The `admin plot` subcommand group allows administrators to create, open, close, and delete plots.

## Syntax

```
/housing admin plot create <theme> <user>
/housing admin plot open <id>
/housing admin plot close [--id <id>] [--this]
/housing admin plot delete [--id <id>] [--this]
```

## Arguments

### `<theme>` (Required in create)
The plot theme key to build the plot with.

### `<user>` (Required in create)
The owner of the new plot.

### `<id>` (Required in open)
The unique ID of the plot to open.

### `[--id <id>]`
The specific ID of the plot to close or delete.

### `[--this]`
Toggles the action for the plot you are currently on.

## Permissions

- `housing.command.admin.plot.create` (For the `create` subcommand)
- `housing.command.admin.plot.open` (For the `open` subcommand)
- `housing.command.admin.plot.close` (For the `close` subcommand)
- `housing.command.admin.plot.delete` (For the `delete` subcommand)
