---
title: '/plot admin build-area-factor'
description: 'Modifies the build area ratio'
---

The `admin build-area-factor` subcommand allows administrators to modify or set the plot's build area ratio relative to the original area.

## Syntax

```
/plot admin build-area-factor add <amount>
/plot admin build-area-factor set <value>
```

## Arguments

### `<amount>` (Required in add)
The amount to add to the factor.

### `<value>` (Required in set)
The factor value to set (e.g. `1.0`, `1.5`, or `unlimited` to extend build area to the entire plot world without borders).

## Permissions

- `housing.command.plot.admin.factor`
