---
title: '/housing admin tags'
description: 'Tag administration'
---

The `admin tags` subcommand group allows administrators to manage milestones and static tags, assign them to plots, create tags, delete them, and list all active tags.

## Syntax

```
/housing admin tags assign <plotId> <tagId>
/housing admin tags unassign <plotId> <tagId>
/housing admin tags create <id> <sticky> [name]
/housing admin tags delete <id>
/housing admin tags list
```

## Arguments

### `<plotId>` (Required in assign/unassign)
The unique ID of the plot.

### `<tagId>` / `<id>` (Required)
The unique ID of the tag.

### `<sticky>` (Required in create)
Toggles if the tag remains sticky.

### `[name]` (Optional in create)
The display name of the tag.

## Permissions

- `housing.command.admin.tags.assign`
- `housing.command.admin.tags.unassign`
- `housing.command.admin.tags.create`
- `housing.command.admin.tags.delete`
- `housing.command.admin.tags.list`
