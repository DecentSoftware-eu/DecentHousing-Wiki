---
title: '/housing admin economy'
description: 'Economy administration'
---

The `admin economy` subcommand group allows administrators to manage and inspect game economies, update configuration flags, award/deduct balances, and list registered economies.

## Syntax

```
/housing admin economy info <economy>
/housing admin economy create <economy> <name> [--format <format>] [--hidden <hidden>] [--bankRewardBase <base>] [--timeRewardRange <range>] [--voteRewardRange <range>] [--isDefault <default>] [--provider <provider>]
/housing admin economy update <economy> [--name <name>] [--format <format>] [--hidden <hidden>] [--bankRewardBase <base>] [--timeRewardRange <range>] [--voteRewardRange <range>] [--isDefault <default>] [--provider <provider>]
/housing admin economy give <user> <amount> [economy]
/housing admin economy take <user> <amount> [economy]
/housing admin economy list
```

## Arguments

### `<economy>` (Required)
The economy ID/key.

### `<name>` (Required in create, Optional in update)
The display name of the currency.

### `<user>` (Required in give/take)
The target player name.

### `<amount>` (Required in give/take)
The positive number representing the amount to give or take.

### `[--format <format>]` (Optional in create/update)
The display format of the currency balance.

Supported placeholders:

- `{{value}}` - The numerical amount / value of the balance.
- `{{name}}` - The display name of the currency.

Examples:

- `{{value}} {{name}}` (e.g. `100 Coins`)
- `{{value}}$` (e.g. `100$`)
- `${{value}}` (e.g. `$100`)

## Permissions

- `housing.command.admin.economy.info`
- `housing.command.admin.economy.create`
- `housing.command.admin.economy.update`
- `housing.command.admin.economy.give`
- `housing.command.admin.economy.take`
- `housing.command.admin.economy.list`
