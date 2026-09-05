---
title: Item Selector
description: Config convention
---

The `selector` section is a standard configuration convention used across DecentHousing (such as in [Locked Items](../../features/locked-item.md)). It allows you to define rules to match specific in-game items held or used by players.

This is commonly used to:
- **Lock vanilla items** on plots (for example, preventing unauthorized players from using TNT or flint & steel).
- **Match custom resource pack items** (such as custom tools, weapons, or items with unique 3D models).
- **Recognize custom plugin items** (items with specific internal tags).

## Examples

/// tab | Vanilla Item
```yaml
# Matches any regular TNT block/item in the game
selector:
  material: TNT
```
///

/// tab | Custom Model Data
```yaml
# Matches a Diamond Sword that uses a custom resource pack model (CustomModelData: 1001)
selector:
  material: DIAMOND_SWORD
  custom-model-data: 1001
```
///

/// tab | Custom Item Tag
```yaml
# Matches a Paper item that has a specific internal tag and value
selector:
  material: PAPER
  persistent-key: custom_item_id
  persistent-value: special_scroll
```
///

/// tab | Tag Existence Only
```yaml
# Matches any Blaze Rod that has this tag, regardless of what text value it holds
selector:
  material: BLAZE_ROD
  persistent-key: magic_wand
```
///

/// tab | Any Item with Model Data
```yaml
# Matches any item in the game using CustomModelData 5001, regardless of its material
selector:
  custom-model-data: 5001
```
///

## Options

### `material`
- **Type:** String
- **Default:** None
- **Required:** No

The Minecraft item type to match (e.g. `TNT`, `BARRIER`, `DIAMOND_SWORD`).

- You can also use `icon` as an alternative name for this setting.
- Supports both modern and older Minecraft material names.
- If omitted, any item material can match as long as it meets the other configured conditions.

### `custom-model-data`
- **Type:** Number (Integer)
- **Default:** None
- **Required:** No

The CustomModelData number of the item. This is the model ID used by server resource packs (such as ItemsAdder, Oraxen, or custom resource packs) to give items custom textures and models.

When configured, the item must have this exact model number to match.

### `persistent-key`
- **Type:** String
- **Default:** None
- **Required:** No

The name of a custom item tag stored on the item. DecentHousing automatically checks for this tag under its own namespace (`housing:<persistent-key>`).

If configured on its own without `persistent-value`, any item that has this tag present will match.

### `persistent-value`
- **Type:** String
- **Default:** None
- **Required:** No

The exact text value that must be stored inside the `persistent-key` tag. When configured, both the tag name and its value must match.

## How Matching Works

When a player uses, places, or interacts with an item on a plot, DecentHousing checks whether the item matches your selector:

1. **Empty Hands:** Empty hands and air never match any selector.
2. **Item Type:** If `material` is configured, the item must be of that material.
3. **Model Data:** If `custom-model-data` is configured, the item must have that exact model number.
4. **Item Tag:** If `persistent-key` is configured, the item must have that tag (and if `persistent-value` is set, the text value inside it must match).

/// note | All Conditions Must Match
If you specify multiple options (e.g. both `material` and `custom-model-data`), the item must meet **all** of them to be considered a match.
///

## References

- [Item Convention](item.md)
- [Locked Item](../../features/locked-item.md)
- [Item Feature](../../features/item.md)
- [How to create unlockable items](../../guides/unlockable-items.md)
- [Price Convention](price.md)
