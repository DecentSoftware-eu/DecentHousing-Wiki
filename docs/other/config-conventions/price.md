---
title: Price
description: Config convention
---

The `price` section is a standard configuration convention used across DecentHousing (in features, items, and settings) to define purchase costs using registered economies.

## Examples

/// tab | Default Economy
```yaml
# Charges 150 using the default server economy
price:
  buyable: true
  amount: 150.0
```
///

/// tab | Custom Economy
```yaml
# Charges 20 using a specific registered economy (e.g. gems)
price:
  buyable: true
  economy: gems
  amount: 20.0
```
///

/// tab | Free
```yaml
# Setting amount to 0 makes it free (no currency deducted)
price:
  buyable: true
  amount: 0
```
///

/// tab | Disabled
```yaml
# Cannot be purchased directly via menus
price:
  buyable: false
```
///

## Options

### `amount`
- **Type:** Number (Double)
- **Required:** Yes

The price to charge the player. If set to `0` (or any negative number), the offer is considered **free** and no currency is deducted.

### `economy`
- **Type:** String
- **Default:** `default`
- **Required:** No

The ID of the currency to deduct the balance from. If omitted or set to `default`, the default registered economy on the server will be used.

For more information on managing currencies, see the [Economy](../../features/economy.md) feature or the [`/housing admin economy`](../../commands/housing/admin/economy.md) command.

### `buyable`
- **Type:** Boolean
- **Default:** `true`
- **Required:** No

Determines whether the element can be purchased directly by players. When set to `false`, players cannot buy it through the menu even if an amount is configured.

## References

- [Item Convention](item.md)
- [Economy Feature](../../features/economy.md)
- [Economy Admin Command](../../commands/housing/admin/economy.md)
- [Feature Module](../../features/feature.md)

