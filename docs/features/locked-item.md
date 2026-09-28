---
title: Locked Item
description: Prevent from using items or blocks on plot until unlocked
---

This module allows server admins (you) to restrict the placement and interaction of specific
physical items or blocks on plots until they are explicitly unlocked for that plot.

> Note: It's the same as how [Item](item.md) locked status works, but without the appearance of the item in the item catalog.

Locked items **use [Item Selector](../other/config-conventions/item-selector.md) to match in-game items by material, custom model data, etc.**

When a player attempts to interact or place any item that matches that selector and the item is not unlocked, the action is automatically cancelled and
an in-game message informs them that the item is locked.

![Error Message chat](/assets/images/features/locked-item/error-chat.png)

## Usage

A typical flow of restricting and unlocking items on plots:

1. You **define locked item entries** under the `locked:` section in your `items.global.yml` configuration file.
2. Each locked item uses an **Item Selector** to define which physical items or blocks are restricted (e.g. by material, custom model data, or display name).
3. *(Optional) You group related items together under a **tag** (e.g., `explosives`).*
4. When a player attempts to place or interact with a restricted item on a plot where it is still locked, the action is automatically cancelled and an in-game message informs them that the item is locked.
5. **Console or an admin runs [`/plot admin item unlock`](../commands/plot/admin/item.md) command**, or apply a **[Package](package.md) that runs that command** to unlock the item or tag on the plot.

## Configuration

Locked items are configured in the global configuration file: `items.global.yml` under the top-level `locked:` section.

Like other `.global` files, `items.global.yml` is stored in the `housing-resources` bucket in your MinIO dashboard ([How to configure global files](../installation/configuration.md#changing-global-files)).

A `items.global.yml` configuration snippet with locked items:

```yaml
# Locked items section in items.global.yml
locked:
  # Unique identifier for the locked item entry
  tnt_block:
    # Optional tag to group multiple items together for bulk unlocking
    tag: explosives
    # Item selector defining the physical item to restrict
    selector: # (1)
      material: TNT

  lava_bucket:
    tag: hazard_pack
    selector: # (1)
      material: LAVA_BUCKET
```

*1) Follows the standard [item selector configuration convention](../other/config-conventions/item-selector.md).*

## Configuration Options

Each entry under `locked:` supports the following options:

| Option     | Type    | Default           | Description                                                                                                                                                                                                    |
|:-----------|:--------|:------------------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `tag`      | String  | `__unspecified__` | Optional grouping identifier. When you unlock a tag via [`/plot admin item unlock`](../commands/plot/admin/item.md) (or a package), all locked items sharing that tag are unlocked simultaneously on the plot. |
| `selector` | Section | Required          | Conditions matching physical in-game items (e.g. material, custom model data). Follows the [Item Selector convention](../other/config-conventions/item-selector.md).                                           |

## Unlocking Items on Plots

Items configured under `locked:` remain locked on all plots by default until explicitly unlocked.

### Unlocking via Commands

Administrators, console scripts, or rewards can unlock a specific item or an entire tag on a plot using:

```
/plot admin item unlock <target>
```

- `<target>`: Can be either an individual locked item key (e.g., `tnt_block`) or a shared tag name (e.g., `explosives`). Unlocking a tag unlocks all items assigned to that tag at once on the active plot.

### Unlocking via Packages

You can sell item access or offer item unlocks as rewards using the [Package](package.md) system:

1. Define your locked items in `items.global.yml` with a shared `tag` (e.g., `tag: "explosives"`).
2. Create a package in `packages.global.yml` whose `on-apply` action executes:
   `plot admin item unlock explosives`
3. When a player applies the package to their plot, all locked items under that tag become immediately available for use on that plot!

## Permissions

### Admin Permissions

- [housing.command.plot.admin.item.unlock](../permissions/index.md#plot-admin-commands) - Allows [`/plot admin item unlock`](../commands/plot/admin/item.md) command to unlock locked items and tags on a plot.

## Commands

- [`/plot admin item unlock <target>`](../commands/plot/admin/item.md) - Unlocks a locked item or tag on the plot.

## References

- [Item](item.md) - Custom items catalog module.
- [Item Selector Convention](../other/config-conventions/item-selector.md) - Matching physical items in-game.
- [Package](package.md) - Unlock item restrictions on plots using packages.
- [Plot](plot/index.md) - Overview of the plot system.
- [Global Configuration](../installation/configuration.md#changing-global-files) - How to update `.global` configuration files.

