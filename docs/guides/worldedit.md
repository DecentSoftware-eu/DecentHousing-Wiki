---
title: How to integrate WorldEdit
description: WorldEdit
---

Housing restricts players from building outside of plots. If they don't have building access, they
cannot use WorldEdit on the plot at all.

## Granting permissions on plot servers

First you need to grant players WorldEdit permissions on plot servers ([using LuckPerms context](../installation/first-install.md#setting-up-permissions)).

```
/lp group default permission set <permission> server=housing-plot
```

/// details | Example: WorldEdit permissions we set up on our network
    open: False
- worldedit.brush.*
- worldedit.clipboard.*
- worldedit.generation.*
- worldedit.history.*
- worldedit.region.*
- worldedit.selection.*
- fawe.decenthousing
- worldedit.clipboard.load (false)
- worldedit.clipboard.save (false)
- worldedit.replacenear
- worldedit.selection
- worldedit.tool
- worldedit.tool.none
- worldedit.wand
///

Now if the players have building **and** WorldEdit access on a plot, they can use it.

## (Optional) Allow players/or roles WorldEdit

To allow specific roles/players to use WorldEdit whenever they have access on a plot, set
the `housing.worldedit.bypass` permission to true for that role/player.

This allows them to use WorldEdit as a role benefit. **They would still need to have building access on
a plot to use it.**

## (Optional) Temporarily allow WorldEdit on a plot

To allow WorldEdit on a plot for a limited time (all players with building access can use it), you can use the
[`/housing admin amplifier extend WORLD_EDIT <duration>`](../commands/housing/admin/amplifier.md) command.

This required `WORLD_EDIT` amplifier to be enabled. Please refer to the [Amplifier](../features/amplifier.md) feature for more details.