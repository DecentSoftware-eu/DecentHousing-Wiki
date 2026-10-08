---
title: Roles & Permissions
description: Per-plot roles and permissions
---

DecentHousing features a per-plot roles and permissions system that allows plot admins to control exactly which players
can do and access on the plot.

Groups have its **set of enabled permissions** and have a **display tag** that you can use to show in the tab list or in chat.


/// note | Global perms vs Plot perms
Unlike server-wide permission systems (such as LuckPerms), plot roles and permissions are **strictly scoped to individual plots**. A player granted builder permissions on one plot has no building access on other plots across the server.
///

## Pre-defined Roles

- **Owner (`owner`):** The creator and owner of the plot. Automatically possesses all plot permissions and commands. This role cannot be modified, assigned to other players, or deleted.
- **Default (`default`):** Automatically assigned to all visiting players and guests who enter the plot. **Plot admins can modify the permissions of this role.**
- **Additional Predefined Roles:** Ready-to-use roles configured server-wide in [`config.global.yml`](index.md#configuration).

## Custom Roles

Players with `PLOT_GROUPS` plot permission can create **custom roles** on the plot:

- Each custom role can have its own **tag/prefix** (e.g. `&a[&a&lBuilder&r&a]`).
- The maximum number of custom roles per plot is controlled by the [Roles limit](roles-limit.md) setting.

## Role Tags (Group Tags)

Each role can be assigned an optional **tag**. A role tag is a customizable chat badge or prefix (e.g. `&c[&c&lOwner&r&c]` or `&a[&a&lBuilder&r&a]`) that identifies the player's rank on the plot.

- **Character limit:** Up to **24 characters**.
- **Formatting:** Supports standard Minecraft color and formatting codes (`&a`, `&b`, `&c`, `&l`, etc.) as well as MiniMessage tags.
- **Plot-scoped:** Unlike server-wide prefix plugins, plot role tags only apply and display while the player is on that specific plot.

> Tip: [Display it in TAB & chat](../../installation/first-install.md#setting-up-tab-and-scoreboard-on-plot-servers)

## Permissions Overview

| Permission                 | Category           | Description                                                                                                                                                                               |
|:---------------------------|:-------------------|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `BUILD`                    | Building           | Allows placing, breaking, and interacting with blocks within the plot's build area.                                                                                                       |
| `SPECIAL_ITEMS`            | Building           | Allows opening and obtaining privileged items from the [Items catalog](../item.md). Items marked with `obtainable-without-privileges: true` can be accessed even without this permission. |
| `PLOT_MAIN_MENU`           | Management         | Allows opening the main plot management GUI via [`/plot menu`](../../commands/plot/menu.md).                                                                                              |
| `PLOT_SETTINGS`            | Management         | Allows accessing and modifying plot settings (e.g. time of day, weather, physics, flags) in the Settings menu.                                                                            |
| `PLOT_USERS`               | Management         | Allows managing players on the plot (viewing visitor lists, assigning roles, promoting, or demoting members).                                                                             |
| `PLOT_GROUPS`              | Management         | Allows creating, modifying, or deleting custom roles and editing their permissions on the plot.                                                                                           |
| `PLOT_REGION`              | Management         | Allows accessing world and region boundary management for the plot.                                                                                                                       |
| `PLOT_RESET`               | Management         | Allows resetting the plot back to its original template state.                                                                                                                            |
| `PLOT_DELETE`              | Management         | Allows permanently deleting the plot.                                                                                                                                                     |
| `PLOT_PACKAGES`            | Economy & Features | Allows opening the Packages menu and applying owned [Packages](../package.md) to the plot.                                                                                                |
| `PLOT_BANK`                | Economy & Features | Allows accessing the plot bank balance, depositing funds, and withdrawing currency.                                                                                                       |
| `PLOT_MARKET`              | Economy & Features | Allows accessing the Market menu to purchase or activate features on the plot.                                                                                                            |
| `PLOT_PANEL`               | Economy & Features | Allows viewing and interacting with the plot control panel.                                                                                                                               |
| `PLOT_MILESTONES`          | Economy & Features | Allows viewing, progressing, and claiming plot milestones.                                                                                                                                |
| `PLOT_ESSENTIALS_BAN`      | Moderation         | Allows banning disruptive players from entering the plot (`/plot ban`).                                                                                                                   |
| `PLOT_ESSENTIALS_KICK`     | Moderation         | Allows kicking visitors from the plot back to the server spawn (`/plot kick`).                                                                                                            |
| `PLOT_ESSENTIALS_MUTE`     | Moderation         | Allows muting individual players within the plot's local chat (`/plot mute`).                                                                                                             |
| `PLOT_ESSENTIALS_MUTECHAT` | Moderation         | Allows muting or unmuting the entire plot chat (`/plot mutechat`).                                                                                                                        |
| `PLOT_IGNORE_MUTE`         | Moderation         | Allows players with this permission to speak in plot chat even when plot chat is muted or when they are muted.                                                                            |
| `PLOT_ESSENTIALS_TP`       | Moderation         | Allows teleporting to players or teleporting players across the plot (`/plot tp`).                                                                                                        |
| `PLOT_ESSENTIALS_CLEARINV` | Moderation         | Allows clearing a player's inventory on the plot (`/plot clearinv`).                                                                                                                      |
| `PLOT_ESSENTIALS_GAMEMODE` | Moderation         | Allows changing gamemode (e.g. Creative, Survival) on the plot (`/plot gamemode`).                                                                                                        |
| `PLOT_ESSENTIALS_FLY`      | Moderation         | Allows toggling flight mode on the plot (`/plot fly`).                                                                                                                                    |
| `PLOT_ESSENTIALS_SETSPAWN` | Moderation         | Allows changing the plot spawn point (`/plot setspawn`).                                                                                                                                  |
| `PLOT_SPAWN_OTHERS`        | Moderation         | Allows sending other players on the plot back to the plot spawn point.                                                                                                                    |
| `WHITELIST`                | Access             | Allows joining and remaining on the plot when the plot whitelist mode is active.                                                                                                          |

## Placeholders

DecentHousing registers custom plot placeholders through [PlaceholderAPI](https://www.spigotmc.org/resources/placeholderapi.6245/). Server administrators can use the following placeholders under the `plot` expansion (`%plot_<key>%`) to dynamically access role and permission information (see full list of placeholders in [Placeholders](../../placeholders/index.md)):

| Placeholder       | Description                                                                       | Example Output                             |
|:------------------|:----------------------------------------------------------------------------------|:-------------------------------------------|
| `%plot_role%`     | Displays the display name of the player's active role on the current plot.        | `Owner`, `Builder`, `Player`               |
| `%plot_role_tag%` | Displays the formatted chat tag / prefix of the player's active role on the plot. | `&c[&c&lOwner&r&c]` / `<red>[Owner]</red>` |
| `%plot_owner%`    | Displays the username of the owner of the current plot.                           | `Notch`                                    |

/// tip | Dynamic Plot Context
Placeholders update automatically as players move between plots. If a player is a **Builder** on Plot A and visits Plot B as a **Guest**, `%plot_role%` and `%plot_role_tag%` will immediately reflect their status on Plot B.
///

## Server Configuration

Server administrators can customize the default roles, initial tags, and starting permissions created for every new plot in `config.global.yml`.

Like other `.global` files, `config.global.yml` is stored in the `housing-resources` bucket in your MinIO dashboard ([How to configure global files](../../installation/configuration.md#changing-global-files)).

```yaml
defaults-config:
  # Maximum number of custom roles allowed per plot by default
  role-limit: 5

  # Default roles created on new plots
  roles:
    # Required: Owner role (cannot be deleted or modified)
    owner:
      name: Owner
      tag: "&c[&c&lOwner&r&c]"
    # Required: Default role assigned to visiting guests
    default:
      name: Player
      tag: ""
      permissions: []
    # Additional predefined roles available on every plot
    additional:
      builder:
        name: Builder
        tag: "&a[&a&lBuilder&r&a]"
        permissions:
          - WHITELIST
          - BUILD
          - WORLD_EDIT
          - PLOT_ESSENTIALS_GAMEMODE
          - PLOT_ESSENTIALS_FLY
          - PLOT_ESSENTIALS_TP
      whitelist:
        name: Whitelist
        tag: "&7[&7&lWhitelist&r&7]"
        permissions:
          - WHITELIST
```

## References

- [Plot](index.md) - Overview of the plot system.
- [Roles Limit](roles-limit.md) - Configuring and increasing custom role limits on plots.
- [Item](../item.md) - How the `SPECIAL_ITEMS` permission controls access to the custom items catalog.
- [Package](../package.md) - How the `PLOT_PACKAGES` permission controls applying packages.
- [`/plot menu`](../../commands/plot/menu.md) - The main in-game plot menu interface.
- [Global Configuration](../../installation/configuration.md#changing-global-files) - Guide to editing global configuration files.
