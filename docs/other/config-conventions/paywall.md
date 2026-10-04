---
title: Paywall
description: Config convention
---

The `paywall` configuration convention is a standardized structure used across DecentHousing (such as in feature modules like Simple Shops, Portals, and Regions) to control feature usage limits on plots, configure free quotas, enable paid slot extensions via server economies, and customize purchase confirmation GUI menus.

## Examples

/// tab | Free Limit Only
```yaml
# Grants 5 free slots without allowing players to purchase additional slots
paywall:
  controller:
    free-limit: 5
```
///

/// tab | Free Limit + Paid Extensions
```yaml
# Grants 3 free slots and allows players to buy up to 5 additional slots for 50$ each
paywall:
  controller:
    free-limit: 3
  buy-menu:
    title: "<b><green>INCREASE LIMIT BY 1?</green></b>"
    item:
      icon: ARMOR_STAND
      lore:
        - "<yellow>Buy Additional Slot</yellow>"
        - "<gray>Click to purchase 1 additional slot.</gray>"
        - ""
        - "<yellow><b>[!]</b> Price: <white>50$</white></yellow>"
  price-per-additional:
    economy: default
    amount: 50.0
  additional-buyable-count: 5
```
///

/// tab | Free Limit + Extensions + Absolute Limit
```yaml
# 1 free slot + up to 5 buyable via economy, capped at 10 absolute max (e.g. for store/admin grants)
paywall:
  controller:
    free-limit: 1
    absolute-limit: 10
  buy-menu:
    title: "<gold><b>BUY REGION SLOT</b></gold>"
    item:
      icon: DIAMOND
      lore:
        - "<gold>Region Extension</gold>"
        - "<gray>Cost: 20 Gems</gray>"
  price-per-additional:
    economy: gems
    amount: 20.0
  additional-buyable-count: 5
```
///

/// tab | Custom Currency Economy
```yaml
# Allows players to buy additional slots using a custom registered currency (e.g. tokens)
paywall:
  controller:
    free-limit: 2
  buy-menu:
    title: "<purple><b>BUY PORTAL SLOT</b></purple>"
    item:
      icon: END_CRYSTAL
      lore:
        - "<light_purple>Extra Portal Slot</light_purple>"
        - "<gray>Price: 10 Tokens</gray>"
  price-per-additional:
    economy: tokens
    amount: 10.0
  additional-buyable-count: 3
```
///


## Options

### `controller`

- **Type:** Section
- **Required:** No

Defines the core limit rules and absolute boundaries for the feature.

#### `controller.free-limit`
- **Type:** Integer
- **Default:** `0`
- **Required:** No

The number of feature slots or items players are granted for free on their plot before requiring payment or limit extensions.

#### `controller.absolute-limit`
- **Type:** Integer
- **Default:** Unlimited (`2147483647`)
- **Required:** No

The absolute maximum cap on total slots (free + bought additions) allowed on the plot. Once a plot reaches this limit, no further slots can be created or purchased under any circumstances.

---

### `buy-menu`

- **Type:** Section
- **Required:** No

Configures the purchase confirmation inventory GUI opened when a player attempts to buy an additional slot extension.

#### `buy-menu.title`
- **Type:** String
- **Default:** Default buy menu title (from `lang.yml`)
- **Required:** No

The title text displayed at the top of the purchase GUI. Supports MiniMessage formatting tags (e.g. `<green>`, `<bold>`) and legacy color codes (`&a`).

#### `buy-menu.item`
- **Type:** Section ([Item Convention](item.md))
- **Required:** No

The visual item icon shown in the purchase GUI. Follows the standard [Item Convention](item.md) syntax (`icon`, `lore`, `glow`, `custom-model-data`).

---

### `price-per-additional`

- **Type:** Section ([Price Convention](price.md))
- **Required:** No

The price charged to the player for each additional limit slot extension above the `free-limit`. Follows the standard [Price Convention](price.md) (`amount` and optional `economy`). If omitted or set to `0`, additional limit slots do not require currency deduction.

---

### `additional-buyable-count`

- **Type:** Integer
- **Default:** Unlimited (`2147483647`)
- **Required:** No

The maximum number of additional slots a player can buy using in-game economy currency.

/// note | Economy Purchase Limit
Once a player reaches `free-limit + additional-buyable-count`, economy purchases are blocked. Further limit extensions up to `absolute-limit` can only be granted directly through store packages or administrative commands, if available.
///

## How Limit Processing Works

When a player attempts to create a new instance of a paywalled feature on a plot (e.g. creating a new Shop NPC, Portal, or Region), DecentHousing evaluates the request:

1. **Free Quota:** If current plot count < current limit (`free-limit` + bought additions), creation is immediately permitted at no cost.
2. **Absolute Cap:** If current limit >= `absolute-limit`, creation is denied and an absolute limit message is displayed.
3. **Economy Limit:** If bought additions >= `additional-buyable-count`, economy purchase is blocked and a buyable limit reached message is displayed.
4. **Purchase GUI:** If `price-per-additional` is configured, a GUI confirmation opens with `buy-menu.title` and `buy-menu.item`. Upon player confirmation, the currency amount is deducted and the plot limit is incremented by 1.

## References

- [Price Convention](price.md) - Defining prices and economy currencies.
- [Item Convention](item.md) - Standard item visual appearance for buy menu icons.
- [Feature Module](../../features/feature.md) - Configuring plot features.
- [Economy Feature](../../features/economy.md) - Managing server economy integration.