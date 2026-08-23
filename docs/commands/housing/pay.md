---
title: '/housing pay'
description: 'Sends funds to a player'
---

The `pay` subcommand transfers a specific amount of money from your account to another player's account in a given economy.

## Syntax

```
/housing pay <user> <amount> [economy]
```

## Arguments

### `<user>` (Required)
The name of the target player to receive the payment.

### `<amount>` (Required)
The positive amount of currency to send.

### `[economy]` (Optional)
The ID of the economy to perform the transaction in. If omitted, uses the default economy.

## Permissions

- `housing.command.pay`
