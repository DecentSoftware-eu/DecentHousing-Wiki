---
title: '/housing admin package'
description: 'Premium package administration'
---

The `admin package` subcommand group allows administrators to inspect premium packages, list registered packages, award packages to players, and force-apply packages.

## Syntax

```
/housing admin package info <package>
/housing admin package give <user> <package> [options]
/housing admin package list
/housing admin package apply <user> <package> [options]
```

## Arguments

### `<package>` (Required)
The name/key of the premium package.

### `<user>` (Required in give/apply)
The target player name.

### `[options]` (Optional in give/apply)
Comma-separated key-value options for the package (e.g., `days=30,limit=5`).

## Permissions

- `housing.command.admin.package.info` (For the `info` subcommand)
- `housing.command.admin.package.give` (For the `give` subcommand)
- `housing.command.admin.package.list` (For the `list` subcommand)
- `housing.command.admin.package.apply` (For the `apply` subcommand)
