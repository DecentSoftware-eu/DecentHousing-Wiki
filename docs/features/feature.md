---
title: Feature
description: Expansion modules for Housing
---

A Feature is an additional module (jar file) that you buy/download from our store to extend the Housing's functionality on a plot.

![Market menu](/assets/images/features/feature/menu.png)

Optionally, a feature module can have [price](../other/config-conventions/price.md) so players can buy it from the market menu in the
[/plot menu](../../commands/plot/menu.md) command.

Even if its free, you can set up if the feature is auto-activated on every plot or if the player has to activate it first in
the market menu.

A feature can add many functionalities to a plot, like:

- New items in the 'Items' menu
- New per-plot permissions for plot's custom groups
- New commands
- New menus in the 'Other' menu
- New plot settings in the 'Settings' menu
- New region flags

To **force-activate a feature** on a plot, use the [/plot admin feature](../commands/plot/admin/feature.md) activate command.

> Hint: You can set a feature `buyable` setting to false and then create a [Package](package.md) that runs the
> activate command. That way, you can **make a feature activation a reward from crates or sell it on your store**.

## Installation

To install a feature, simply download the feature jar file and place it in the `housing-features` bucket in your MinIO dashboard.
After that, the feature is auto-loaded on all servers in 1 minute.

## Configuration

Every feature has its own global config file in the `housing-features-config` bucket in your MinIO dashboard.
You can change the settings there and restart the servers to apply the changes ([How to restart the servers](../installation/configuration.md#changing-global-files)).

A feature configuration file may look like this:

```yaml
# Settings for feature's appearance in the menus.
appearance:
  display-name: Shops
  description: Simple shop system for selling items to your visitors.
  icon: CHEST
# Feature price settings. If the feature is free, you can set buyable to true and amount to 0.
price: # (1)
  buyable: true
  economy: Coins
  amount: 0
# If this feature should be auto-loaded on every plot.
default: true
# A specific feature settings. May vary between different features.
settings:
  npc:
    lore:
    - '&e&lSHOP'
    - '&a%display-name%'
    default-skin:
      value: ewogICJ0aW1lc3RhbXAiIDogMTYxMDM2OTg3OTY2NywKICAicHJvZmlsZUlkIiA6ICJmNWJjYzYxZjgyODU0MWVjYjY0OGM3NTc4MmY0YzdjNiIsCiAgInByb2ZpbGVOYW1lIiA6ICJSdWxpbmdCcmFuZG94IiwKICAic2lnbmF0dXJlUmVxdWlyZWQiIDogdHJ1ZSwKICAidGV4dHVyZXMiIDogewogICAgIlNLSU4iIDogewogICAgICAidXJsIiA6ICJodHRwOi8vdGV4dHVyZXMubWluZWNyYWZ0Lm5ldC90ZXh0dXJlLzc2ZjdlYTFmNmJhOWE4ODhmY2ZlYTU5MTA5MTIyNmZkOTI1NjZiYTUzOTA2MDAzM2MwZDI0NjIxMmFkMGI5MTUiCiAgICB9CiAgfQp9
      signature: O0+ptokEZNvq/y2Mkb56cSK2/nBicBZFx+CIZV1rIJqZYcEBJJTtRLDuHzQGJUxRM9xtyjKtBy7YSb7va2DgZQepCF8AQx5FURntlXNg+SpTIIwlOWDq1kdAKhUlOCdvwCTFkUCx7K+ft/L+aLzPu55R5qP+uwx0ZEvhPqtLp5J870hc4pu7/JrIClefqMxZocx3MtjCNEH3MPIZkRJdX8IdGUAJjML4zKFyil45mXWM9wqgKFtjuPGk/FmVn2EV4s2GlhstDsNyazzdQstmjmTrYPGfwjDnExhtiCwToto8uKo9Fqb6/WgLL/RoCMVIbxOxQ1Kuere8iBp1aNHTat0wsGjNyQfoIm3XwvMbPpwL7maYs3HTsAYDDMwz1uZihtBvn2eyw35Irv6wWVdK1Bupc4SxlB4uA2EumwIEUGs4jjjjoHHr5m/8JmFm/heVrzBOfrFXx6ii2aeVMmHkuVX6XkcXZ28b+jtCnmYWLMT63JuuSh3PDEcV419naoKgPnC2k1FechLR4+XgoxM6iVQSswkmRJSKQHf/N4NOxw3rZCQlLorG/h7s8e5SNFSWNqiS2e0AOakW0V5TZYpWw7uTq9uOXAepQ699ny8L+dNHwirCth8UPpfKkGozMkL9Y8h/IdnFR3al1q55/TAEI0Nb6rHCXZoJdg0emCjO5iE=
  items:
    creator:
      locked: false
      price:
        buyable: true
        amount: 0
      obtainable-without-privileges: false
      item:
        type: ARMOR_STAND
        lore:
        - <yellow>Shop Creator
        - <gray>Place to create a shop.
```

*1) A [price configuration](../other/config-conventions/price.md) convention*

## References

- [Plot](plot/index.md) - A plot that may have the feature activated.