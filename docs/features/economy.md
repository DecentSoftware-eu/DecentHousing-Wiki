---
title: Economy
description: Shared cross-plot economy, plot bank, and in-game trading
---

The **Economy module** provides a network-wide currency and trading system for DecentHousing. It powers player commerce, buying and selling on plots, and plot bank earnings across your entire server network.

---

## Key Features

- **Shared Balances:** Player balances are synchronized globally across all plots and servers in real time. Players keep their money wherever they travel on your network.
- **Buying & Selling on Plots:** Enable players and plot owners to create shops, sell custom items, trade, or charge fees for plot activities.
- **Plot Bank:** Every plot has its own dedicated bank account. Money spent by visitors on a plot (such as through shops or interactive features) goes directly into the plot bank for the owner to withdraw.
- **Actions & Conditions:** Plot owners can set up interactive plot elements (such as NPC dialogues, buttons, or region portals), attach prices, and verify player balances before triggering actions.

---

## How It Works

### Buying & Selling with Features

The Economy module works hand-in-hand with additional [Features](feature.md) (such as player shops or custom interactive plot mechanics):

- **Set Custom Prices:** Easily set purchase prices on items, blocks, and plot perks using the [Price Convention](../other/config-conventions/price.md).
- **Plot Owner Setup (Actions & Conditions):** Plot owners can configure actions and conditions directly on their plot's interactive elements—such as charging entry fees, selling items on click, or rewarding players with currency upon completing challenges or parkour checkpoints.
- **Balance Verification:** Conditions allow plot owners to check whether a visitor has enough money—or if the plot bank has sufficient funds—before executing an action or granting access.

### The Plot Bank

Every plot comes equipped with a shared treasury called the **Plot Bank**:

- **Visitor Revenue:** When other players make purchases or pay fees on a plot, those funds automatically deposit into the plot's bank account.
- **Managing Funds:** Plot owners and trusted members (with the `PLOT_BANK` role permission) can open the bank directly from [`/plot menu`](../commands/plot/menu.md) to view the balance, deposit personal funds, or withdraw accumulated earnings.
- **Automatic Rewards:** Plots can also generate passive income or vote rewards directly into the bank when visitors support the plot.

---

## Configuration

Global settings for the economy module are located in `config.global.yml` under the `economy-config:` section:

```yaml
# Economy configuration in config.global.yml
economy-config:
  # Enable to register Housing as your server's primary Vault provider
  register-default-in-vault: false
```

- **Managing & Editing Currencies:** Creating, updating, and customizing currencies (such as changing display formats, names, reward rates, or setting the default currency) is done directly using the [`/housing admin economy`](../commands/housing/admin/economy.md) command (`create`, `update`, `info`). Changes apply instantly across the network without requiring server restarts.
- **Vault Integration:** DecentHousing seamlessly integrates with [Vault](https://www.spigotmc.org/resources/vault.34315/), allowing external plugins (like chest shops or auction houses) to hook into Housing currencies.

For more details on editing global files, see the [Configuration Guide](../installation/configuration.md#changing-global-files).

---

## Commands

### Player Commands

| Command | Description |
|:---|:---|
| [`/housing balance [user]`](../commands/housing/balance.md) | Check your own or another player's balance. |
| [`/housing pay <user> <amount>`](../commands/housing/pay.md) | Send money to another player. |
| [`/plot menu`](../commands/plot/menu.md) | Open the plot panel to access the Plot Bank. |

### Administrator Commands

| Command | Description |
|:---|:---|
| [`/housing admin economy list`](../commands/housing/admin/economy.md) | List all registered currencies on the network. |
| [`/housing admin economy give <user> <amount>`](../commands/housing/admin/economy.md) | Add money to a player's balance. |
| [`/housing admin economy take <user> <amount>`](../commands/housing/admin/economy.md) | Deduct money from a player's balance. |
| [`/housing admin economy create <id> <name> [flags]`](../commands/housing/admin/economy.md) | Create a new currency. |

For the complete command syntax and available flags, see the [`/housing admin economy`](../commands/housing/admin/economy.md) command reference.

---

## Permissions

- `housing.command.balance` - Allows checking balances with [`/housing balance`](../commands/housing/balance.md).
- `housing.command.pay` - Allows sending money with [`/housing pay`](../commands/housing/pay.md).
- `PLOT_BANK` - Plot role permission required to access and manage the Plot Bank in [`/plot menu`](../commands/plot/menu.md).

---

## References

- [`/housing admin economy`](../commands/housing/admin/economy.md) - Admin economy management commands.
- [`/housing balance`](../commands/housing/balance.md) - Player balance command.
- [`/housing pay`](../commands/housing/pay.md) - Player transfer command.
- [`/plot menu`](../commands/plot/menu.md) - Access the Plot Bank interface.
- [Features (Addons)](feature.md) - Overview of additional plot modules and marketplace features.
- [Actions Convention](../other/config-conventions/action.md) - Automating commands and interactive logic.
- [Price Convention](../other/config-conventions/price.md) - Standard pricing structure for items and perks.
- [Plot Roles & Permissions](plot/roles-and-permissions.md) - Plot role permissions including `PLOT_BANK`.
