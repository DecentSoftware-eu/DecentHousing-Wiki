---
title: Item
description: Custom items per plot in the in-game items catalog
---

The **Item module** provides an interactive in-game catalog (the **Items** menu) where players and builders can browse,
obtain, unlock and purchase specialized items, decorations, and tools on their plots.

![Item in a menu](/assets/images/features/item/menu.png)

The module allows server admins (you) to define your own items, that can be **free/paid**, **locked/unlocked** to
provide a sense of progression and rewards for your players.

If locked, you can allow players to unlock them through gameplay milestones, voting rewards, or custom [Packages](package.md)
that run the [`/plot admin item unlock`](../commands/plot/admin/item.md) admin command.

> Info: Installed [Features](feature.md) also integrate seamlessly into this catalog, automatically registering their own
categories and items alongside your custom items. For example, the Shops Simple expansion module, which you can
download on our store, registers a **Shops** category that contains Shop Creator to allow placing of a custom shops.

## Usage

A typical flow for setting up and using custom items:

1. You **define categories and items** in the `items.global.yml` configuration file or players **activate a [Feature](feature.md)** on the plot.
2. Players browse the items menu and click an item to collect or purchase it.

> Info: For locked items, administrators unlock them using [`/plot admin item unlock`](../commands/plot/admin/item.md) or
> players apply a [Package](package.md) to their plot that runs the command until they can obtain and use the item.

## Configuration

Custom items and categories are configured in the global configuration file: `items.global.yml`.

Like other `.global` files, `items.global.yml` is stored in the `housing-resources` bucket in your MinIO dashboard ([How to configure global files](../installation/configuration.md#changing-global-files)).

A `items.global.yml` configuration file may look like this:

```yaml
# Define categories to group custom items in the GUI
categories:
  # Category identifier
  special:
    name: "Special vanilla items"
    description: "A collection of special vanilla items that can be used on your plot"
    icon: DIAMOND
    items:
      # Item identifier (follows the Item configuration convention)
      barrier:
        # Appearance in the menu when available/unlocked
        item: # (1)
          icon: BARRIER
          glow: true
          lore:
            - "<red>Barrier"
            - "<dark_gray>Item"
            - ""
            - "<gray>Unlockable for 75-votes milestone!</gray>"
            - ""
            - "<yellow><b>[!]</b> Click to obtain</yellow>"
        # Appearance in the menu when locked on the plot
        item-locked: # (1)
          icon: GRAY_DYE
          lore:
            - "<red>Barrier"
            - "<dark_gray>Item"
            - ""
            - "<gray>Unlockable for 75-votes milestone!</gray>"
            - ""
            - "<red><b>[!]</b> Locked</red>"
        # If regular visitors without plot permissions can obtain this item
        obtainable-without-privileges: false
        # If this item starts locked on every plot by default
        locked: true
        # Tag used to group multiple items together for group unlocking
        tag: "special_pack"
        # Price settings
        price: # (2)
          buyable: false
          amount: 0
        # Link this item to physical in-game items
        selector: # (3)
          material: BARRIER
        # Actions executed when a player obtains the item from the menu
        on-obtain: # (4)
          - type: command
            data:
              sender: console
              command: "give %player% barrier 1"
          - type: message
            data:
              message:
                - "<yellow><b>[!]</b> Obtained a Barrier!</yellow>"
        # Actions executed on the plot when this item is unlocked
        on-unlock: # (4)
          - type: message
            data:
              message:
                - "<green><b>[!]</b> Special items have been unlocked on this plot!</green>"

  # Another category example: free building plants
  plants:
    name: "Plants"
    description: "A collection of decorative plants for your plot"
    icon: PEONY
    items:
      oak_leaves:
        item: # (1)
          icon: OAK_LEAVES
          lore:
            - "<green>Oak Leaves"
            - "<gray>Decorative leaves block</gray>"
            - ""
            - "<yellow><b>[!]</b> Click to obtain</yellow>"
        obtainable-without-privileges: false
        locked: false
        tag: "plants"
        price:
          buyable: true
          amount: 0
        on-obtain: # (4)
          - type: command
            data:
              sender: console
              command: "give %player% oak_leaves 1"
          - type: message
            data:
              message:
                - "<yellow><b>[!]</b> Obtained Oak Leaves!</yellow>"
```

*1) Follows the standard [item configuration convention](../other/config-conventions/item.md) (the first line of the `lore` list is automatically used as the item's display name).*  
*2) Follows the standard [price configuration convention](../other/config-conventions/price.md).*  
*3) Follows the standard [item selector configuration convention](../other/config-conventions/item-selector.md).*  
*4) Follows the standard [action configuration convention](../other/config-conventions/action.md).*

### Category Options

| Option        | Type    | Description                                                                 |
|:--------------|:--------|:----------------------------------------------------------------------------|
| `name`        | String  | The title of the category displayed in the category switcher.               |
| `description` | String  | A brief description displayed in the category switcher tooltip.             |
| `icon`        | String  | The Minecraft material used as the category icon (e.g. `DIAMOND`, `PEONY`). |
| `items`       | Section | A map containing the item definitions for this category.                    |

### Item Options

| Option                          | Type    | Default  | Description                                                                                                                                                                                                                                  |
|:--------------------------------|:--------|:---------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `item`                          | Section | Required | Visual appearance when the item is unlocked/available. Follows the [Item convention](../other/config-conventions/item.md).                                                                                                                   |
| `item-locked`                   | Section | Optional | Visual appearance displayed when the item is currently locked on the plot. Follows the [Item convention](../other/config-conventions/item.md).                                                                                               |
| `locked`                        | Boolean | `false`  | When set to `true`, the item starts locked on all plots. It must be unlocked on the plot using the [`/plot admin item unlock`](../commands/plot/admin/item.md) command (or via a [Package](package.md)) before players can obtain or use it. |
| `tag`                           | String  | Item ID  | Grouping identifier. When you unlock a tag via [`/plot admin item unlock`](../commands/plot/admin/item.md) (or a package), all items sharing that tag are unlocked simultaneously.                                                           |
| `obtainable-without-privileges` | Boolean | `false`  | If `false`, only players with plot edit rights (and the `SPECIAL_ITEMS` plot role permission) can view and obtain the item. If `true`, regular plot visitors can also obtain it.                                                             |
| `price`                         | Section | Optional | Controls whether the item is free or costs currency. Follows the [Price convention](../other/config-conventions/price.md).                                                                                                                   |
| `selector`                      | Section | Optional | Links this item entry to physical Minecraft items. Follows the [Item Selector convention](../other/config-conventions/item-selector.md).                                                                                                     |
| `on-obtain`                     | List    | Optional | A list of actions executed when a player obtains the item from the menu. Follows the [Action convention](../other/config-conventions/action.md).                                                                                             |
| `on-unlock`                     | List    | Optional | A list of actions executed on the plot when the item (or its tag) is unlocked. Follows the [Action convention](../other/config-conventions/action.md).                                                                                       |

For full details and additional options (such as custom model data and unbreakability), see the [Item Convention](../other/config-conventions/item.md).

## Unlocking Items on Plots

Items configured with `locked: true` cannot be obtained from the menu until they are unlocked on the active plot using the [`/plot admin item unlock`](../commands/plot/admin/item.md) command (or by applying a [Package](package.md)).

### Restricting Physical Items with Selectors

When you define a `selector` on a locked item, DecentHousing actively prevents unauthorized players from placing, interacting with, or using physical items that match that selector on the plot.

For example, if you configure a custom barrier or TNT item with `locked: true` and a `selector`:

- Players cannot obtain it from the Items menu.
- Players cannot place or use any matching physical item on the plot until the item (or its tag) is unlocked on that specific plot.

**For more details on selector rules, see the [Item Selector convention](../other/config-conventions/item-selector.md)**.

**For more about locking items, see the [Locked Item](locked-item.md) module**, which provides a standalone configuration for
restricting physical items without displaying them in the Items menu.

### Unlocking via Commands

Administrators, menus or [Features](feature.md) can manually unlock an item or an entire tag on a plot using:

```
/plot admin item unlock <target>
```

- `<target>`: Can be either an individual item ID (e.g. `barrier`) or a tag name (e.g. `special_pack`). Unlocking a tag unlocks all items assigned to that tag at once.

### Selling Item Packs via Packages

You can connect locked items with the [Package](package.md) system to sell item unlocks on your webstore or grant them as crate rewards:

1. Mark your desired items with `locked: true` and a shared `tag` (e.g. `tag: "builders_pack"`).
2. Set their price to `buyable: false`.
3. Create a custom package in `packages.global.yml` with an action that runs:
   `plot admin item unlock builders_pack`
4. When a player purchases the package and applies it to their plot, all items in the pack are automatically unlocked!

## Permissions

### Admin Permissions

- [housing.command.plot.admin.item.unlock](../commands/plot/admin/item.md#permissions) - Allows unlocking locked items on a plot via [`/plot admin item unlock`](../commands/plot/admin/item.md).

### Plot Permissions

- **`SPECIAL_ITEMS`**: Grants members with this role on a plot permission to access the Items menu and obtain privileged items. Items with `obtainable-without-privileges: true` can be accessed by visitors even without this permission.

## Commands

- [`/plot admin item unlock <target>`](../commands/plot/admin/item.md) - Unlocks a locked item or tag on the plot.
- [`/plot menu`](../commands/plot/menu.md) - Opens the plot menu containing the Items menu button.

## References

- [Item Convention](../other/config-conventions/item.md) - Standardized custom item configuration convention.
- [Action Convention](../other/config-conventions/action.md) - Standardized action execution convention.
- [Locked Item](locked-item.md) - Standalone locked item configuration.
- [Package](package.md) - Create unlockable item packages.
- [Feature](feature.md) - Additional modules that provide custom items.
- [Plot](plot/index.md) - Overview of the plot system.
- [Price Convention](../other/config-conventions/price.md) - Detailed guide to price configurations.
- [Item Selector Convention](../other/config-conventions/item-selector.md) - Matching physical items in-game.
- [Global Configuration](../installation/configuration.md#changing-global-files) - How to update `.global` configuration files.
