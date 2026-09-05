---
title: Item
description: Config convention
---

The `item` section (also used as `item-locked`) is a standard configuration convention used across DecentHousing (in [Custom Items](../../features/item.md), [Packages](../../features/package.md), features, and interactive menus) to define the visual representation and properties of an in-game item or menu icon.

## Examples

/// tab | Standard Item
```yaml
# A standard item with a material and description
item:
  icon: OAK_LEAVES
  lore:
    - "<green>Oak Leaves" # (1)
    - "<gray>Decorative leaves block for your plot.</gray>"
    - ""
    - "<yellow><b>[!]</b> Click to obtain</yellow>"
```
1. The first line of the `lore` list is automatically used as the item's display name.
///

/// tab | Glowing Item
```yaml
# An item with an enchanted shimmering effect
item:
  icon: BARRIER
  glow: true
  lore:
    - "<red>Barrier"
    - "<dark_gray>Special Item"
    - ""
    - "<yellow><b>[!]</b> Click to obtain</yellow>"
```
///

/// tab | Custom Model Data
```yaml
# An item using a custom resource pack 3D model
item:
  icon: BLAZE_ROD
  custom-model-data: 1002
  lore:
    - "<light_purple>Magic Wand"
    - "<gray>Special building tool with a custom 3D model.</gray>"
```
///

/// tab | Locked State
```yaml
# Appearance displayed when an item is locked on the plot
item-locked:
  icon: GRAY_DYE
  lore:
    - "<red>Barrier"
    - "<dark_gray>Special Item"
    - ""
    - "<gray>Unlockable for 75-votes milestone!</gray>"
    - ""
    - "<red><b>[!]</b> Locked</red>"
```
///

/// tab | Unbreakable Item
```yaml
# A tool or weapon marked as unbreakable
item:
  icon: DIAMOND_PICKAXE
  unbreakable: true
  lore:
    - "<aqua>Builder's Pickaxe"
    - "<gray>Never breaks while building.</gray>"
```
///

## Options

### `icon`
- **Type:** String
- **Default:** `PAPER`
- **Required:** Yes

The Minecraft material of the item (e.g. `DIAMOND`, `BARRIER`, `BLAZE_ROD`, `OAK_LEAVES`).

- Supports both modern and legacy material names.
- You can also use `material` or `type` as alternative key names for this setting.

### `lore`
- **Type:** List of Strings
- **Default:** None
- **Required:** No

The text lines displayed on the item.

/// note | First Line is the Display Name
The **first line** of the `lore` list is automatically treated as the item's display name in menus. All subsequent lines form the item's tooltip description.
///

- Full support for MiniMessage formatting tags (e.g. `<yellow>`, `<green>`, `<red>`, `<gold>`, `<white>`, `<b>`, `<i>`).
- Supports legacy color codes (e.g. `&a`, `&e`, `&7`).

### `glow`
- **Type:** Boolean
- **Default:** `false`
- **Required:** No

When set to `true`, the item will display an enchanted shimmering glint effect without showing any enchantment names in the tooltip.

### `custom-model-data`
- **Type:** Integer
- **Default:** None
- **Required:** No

The CustomModelData ID number of the item. This is used by server resource packs (ItemsAdder, Oraxen, or custom packs) to render custom item textures or 3D models.

### `unbreakable`
- **Type:** Boolean
- **Default:** `false`
- **Required:** No

Sets whether the item is marked as unbreakable.

## Where It Is Used

The Item convention is used throughout DecentHousing:

- **[Custom Items](../../features/item.md) (`items.global.yml`)**: Used in the `item` (unlocked visual appearance) and `item-locked` (locked visual appearance) subsections for every custom item.
- **[Packages](../../features/package.md) (`packages.global.yml`)**: Used in the `item` section to define how the package icon looks in the Packages menu.
- **[Features](../../features/feature.md)**: Used by feature modules to define menu icons and tool representations (such as `items.creator.item` in shops).
- **Menu Definitions**: Used in interactive menus to configure clickable buttons and icons.

## References

- [Action Convention](action.md) - Executing commands and messages.
- [Item Feature](../../features/item.md) - The in-game Items catalog.
- [Locked Item](../../features/locked-item.md) - Plot item locking and restrictions.
- [Price Convention](price.md) - Purchasing costs and economies.
- [Item Selector Convention](item-selector.md) - Matching physical items in-game.
- [Package Module](../../features/package.md) - Creating unlockable item packages.
- [Global Configuration](../../installation/configuration.md#changing-global-files) - Editing global files in MinIO.
