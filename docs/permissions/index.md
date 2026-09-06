---
title: Permissions
description: Complete overview of system, administrative, theme, and command permission nodes for DecentHousing
---

DecentHousing separates permission management into two distinct layers:

1. **Server-Wide Permissions:** Configured via server-wide permission managers (such as LuckPerms or Vault). These control administrative privileges, feature bypasses, theme availability, and command execution rights network-wide.
2. **Plot-Scoped Permissions:** Configured dynamically on individual plots by plot owners. These control building rights, plot settings, and moderation commands within that specific plot.

/// tip | Per-Plot Roles & Permissions
For plot-level permissions (such as `BUILD`, `WORLD_EDIT`, `PLOT_SETTINGS`, `PLOT_ESSENTIALS_BAN`, etc.) assigned to custom roles on individual plots, see the [Roles & Permissions](../features/plot/roles-and-permissions.md) documentation.
///

## Administrative & System Permissions

These permissions are registered in Bukkit and managed via your server permission plugin (e.g. LuckPerms):

| Permission Node | Default | Description                                                                                                                                                                                                                                             |
|:---|:---|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `housing.admin` | `op` | Grants full owner/admin rights on every plot across the server by causing all [plot-level role permission](../features/plot/roles-and-permissions.md) checks to evaluate to `true`. Also unlocks administrative visibility filters in the plot browser. |
| `housing.admin.browser` | `op` | Unlocks the plot visibility filter toggle in the plot browser menu ([`/housing browse`](../commands/housing/browse.md)), allowing staff to filter and view private (`PRIVATE`) and role-restricted (`ROLES_ONLY`) plots.                                |
| `housing.worldedit.bypass` | `op` | Allows using WorldEdit / FAWE tools on a plot even if the plot does not have WorldEdit unlocked via an active package or WorldEdit amplifier. *(Note: The player must still possess the `BUILD` and `WORLD_EDIT` plot role permissions on the plot).*   |
| `housing.beta.access` | `op` | Allows players to connect to the housing server when Beta Mode is active (`BETA_ENABLED`). Players without this permission are kicked upon login.                                                                                                       |
| `housing.plot.access.bypass` | `op` | Allows entering plots regardless of plot visibility settings (`PRIVATE` or `ROLES_ONLY`). Does not bypass plot bans or player limits.                                                                                                                   |
| `housing.theme.<themeId>` | `op` | Unlocks a specific plot template/theme (`<themeId>`) in the Theme Selector GUI when creating or resetting a plot.                                                                                                                                       |
| `housing.theme.*` | `op` | Unlocks all available plot templates/themes in the Theme Selector GUI when creating or resetting a plot.                                                                                                                                                |
| `housing.setup.command` | `op` | Grants access to execute `/housing-setup` administrative setup commands (specific to Housing-Setup plugin).                                                                                                                                             |

## Command Permissions

Commands executed on the server require corresponding Bukkit permission nodes configured in your server permission plugin.

/// note | Plot Moderation Commands vs. Command Permissions
Subcommands used on a plot (such as `/plot ban`, `/plot kick`, `/plot mute`, `/plot setspawn`, `/plot fly`, `/plot gm`) are managed per-plot through the **Plot Roles & Permissions system** (`PLOT_ESSENTIALS_BAN`, `PLOT_ESSENTIALS_KICK`, etc.). They do not require separate server-wide command permissions. Only `/plot menu` and `/plot admin` subcommands require server-wide command permissions.
///

Detailed documentation, syntax, and arguments for each command can be found in the [Commands](../commands/index.md) section.

### Plot Commands

| Subcommand | Permission Node | Description & Documentation |
|:---|:---|:---|
| `/plot menu` | `housing.command.plot.menu` | Opens the main plot management GUI ([View docs](../commands/plot/menu.md)). |

#### Plot Admin Commands

| Subcommand | Permission Node | Description & Documentation |
|:---|:---|:---|
| `/plot admin build-area-factor` | `housing.command.plot.admin.factor` | Modifies the build area ratio relative to the original area ([View docs](../commands/plot/admin/build-area-factor.md)). |
| `/plot admin player-limit` | `housing.command.plot.admin.playerlimit` | Modifies or sets the maximum player limit of the plot ([View docs](../commands/plot/admin/player-limit.md)). |
| `/plot admin roles-limit` | `housing.command.plot.admin.roleslimit` | Modifies or sets the maximum custom roles limit of the plot ([View docs](../commands/plot/admin/roles-limit.md)). |
| `/plot admin item unlock` | `housing.command.plot.admin.item.unlock` | Force-unlocks a locked item on the plot ([View docs](../commands/plot/admin/item.md)). |
| `/plot admin vote` | `housing.command.plot.admin.vote` | Forces a vote for the plot ([View docs](../commands/plot/admin/vote.md)). |
| `/plot admin feature activate` | `housing.command.plot.admin.feature.activate` | Force-activates a feature on the plot ([View docs](../commands/plot/admin/feature.md)). |

### Housing Commands

| Subcommand | Permission Node | Description & Documentation |
|:---|:---|:---|
| `/housing browse` | `housing.command.browse` | Opens the plot browser ([View docs](../commands/housing/browse.md)). |
| `/housing search` | `housing.command.search` | Searches plots and players ([View docs](../commands/housing/search.md)). |
| `/housing profile` | `housing.command.profile` | Opens a player profile or own plots menu ([View docs](../commands/housing/profile.md)). |
| `/housing visit` | `housing.command.visit` | Visits another player's plot ([View docs](../commands/housing/visit.md)). |
| `/housing jumpto` | `housing.command.jumpto` | Teleports directly to a player's plot ([View docs](../commands/housing/jumpto.md)). |
| `/housing myplots` | `housing.command.myplots` | Opens your own plots list ([View docs](../commands/housing/myplots.md)). |
| `/housing plot create` | `housing.command.plot.create` | Creates a new plot. |
| `/housing plot join` | `housing.command.plot.join` | Joins a specific plot by ID ([View docs](../commands/housing/plot-join.md)). |
| `/housing plot copy-id` | `housing.command.plot.copyid` | Copies the current plot ID ([View docs](../commands/housing/plot-copy-id.md)). |
| `/housing callback` | None (Internal) | Internal UI callback executor ([View docs](../commands/housing/callback.md)). |
| `/housing changelog` | `housing.command.changelog` | Opens the server changelog menu ([View docs](../commands/housing/changelog.md)). |
| `/housing dynamic execute` | Dynamic | Executes dynamic housing commands ([View docs](../commands/housing/dynamic.md)). |
| `/housing top` | `housing.command.top` | Opens global leaderboards ([View docs](../commands/housing/top.md)). |
| `/housing hub` | `housing.command.lobby` | Sends the player back to the hub server ([View docs](../commands/housing/hub.md)). |
| `/housing balance` | `housing.command.balance` | Displays player currency balance ([View docs](../commands/housing/balance.md)). |
| `/housing pay` | `housing.command.pay` | Sends funds to another player ([View docs](../commands/housing/pay.md)). |

#### Housing Admin Commands

| Subcommand | Permission Node | Description & Documentation |
|:---|:---|:---|
| `/housing admin user` | `housing.command.admin.user.info`<br>`housing.command.admin.user.plot.limit.increment` | Inspects user stats and modifies user plot limits ([View docs](../commands/housing/admin/user.md)). |
| `/housing admin package` | `housing.command.admin.package.info`<br>`housing.command.admin.package.give`<br>`housing.command.admin.package.list`<br>`housing.command.admin.package.apply` | Manages premium packages and grants packages to players ([View docs](../commands/housing/admin/package.md)). |
| `/housing admin plot` | `housing.command.admin.plot.create`<br>`housing.command.admin.plot.open`<br>`housing.command.admin.plot.close`<br>`housing.command.admin.plot.delete` | Admin creation, opening, closing, and deletion of plots ([View docs](../commands/housing/admin/plot.md)). |
| `/housing admin economy` | `housing.command.admin.economy.info`<br>`housing.command.admin.economy.create`<br>`housing.command.admin.economy.update`<br>`housing.command.admin.economy.give`<br>`housing.command.admin.economy.take`<br>`housing.command.admin.economy.list` | Economy administration, currency creation, and balance modification ([View docs](../commands/housing/admin/economy.md)). |
| `/housing admin tags` | `housing.command.admin.tags.assign`<br>`housing.command.admin.tags.unassign`<br>`housing.command.admin.tags.create`<br>`housing.command.admin.tags.delete`<br>`housing.command.admin.tags.list` | Tag administration, creating, and assigning player tags ([View docs](../commands/housing/admin/tags.md)). |
| `/housing admin reload config` | `housing.command.admin.reload.config` | Reloads plugin configuration files ([View docs](../commands/housing/admin/reload.md)). |

---

## References

- [Commands](../commands/index.md) - Complete documentation for all DecentHousing commands.
- [Roles & Permissions](../features/plot/roles-and-permissions.md) - Learn about in-game per-plot roles and plot permission nodes.
- [Configuration](../configuration/config.md) - Plugin and global configuration guide.
