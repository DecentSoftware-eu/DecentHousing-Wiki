---
title: Roles & Permissions
description: Plot roles, permissions, and access control
---


DecentHousing features a per-plot roles and permissions system that allows plot admins to control exactly which players
can do and access on the plot.

Groups have its **set of enabled permissions** and have a **display tag** that you can use to show in the tab list or in chat.

Unlike server-wide permission systems (such as LuckPerms), plot roles and permissions are **strictly scoped to individual plots**. A player granted builder permissions on one plot has no building access on other plots across the server.

## Roles System

Each plot manages its own roster of roles:

### Predefined Roles

- **Owner (`owner`):** The creator and owner of the plot. Automatically possesses all plot permissions and commands. This role cannot be modified, assigned to other players, or deleted.
- **Default (`default`):** Automatically assigned to all visiting players and guests who enter the plot. By default, it grants view-only access without building or administrative rights.
- **Additional Predefined Roles:** Ready-to-use roles configured server-wide in `config.global.yml` (such as `builder` for trusted helpers, or `whitelist` for allowed guests).

### Custom Roles

Plot owners and managers can create **custom roles** (such as *Co-Owner*, *Moderator*, *Architect*, or *VIP Guest*) directly in-game:

- Each custom role can have its own **display name** and **chat tag/prefix** (e.g. `&a[&a&lBuilder&r&a]`).
- Each role can be customized with an exact combination of permissions.
- The maximum number of custom roles per plot is controlled by the [Roles limit](roles-limit.md) setting.

## Permissions Overview

Permissions are assigned to roles to grant or revoke specific abilities. Below is the complete list of all available per-plot permissions, grouped by category:

### Building & Creative Tools

| Permission      | Description                                                                                                                                                                               |
|:----------------|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `BUILD`         | Allows placing, breaking, and interacting with blocks within the plot's build area.                                                                                                       |
| `WORLD_EDIT`    | Allows using FastAsyncWorldEdit / WorldEdit commands, selections, and brushes on the plot.                                                                                                |
| `SPECIAL_ITEMS` | Allows opening and obtaining privileged items from the [Items catalog](../item.md). Items marked with `obtainable-without-privileges: true` can be accessed even without this permission. |

### Plot Management & Settings

| Permission                 | Description                                                                                                    |
|:---------------------------|:---------------------------------------------------------------------------------------------------------------|
| `PLOT_MAIN_MENU`           | Allows opening the main plot management GUI via [`/plot menu`](../../commands/plot/menu.md).                   |
| `PLOT_SETTINGS`            | Allows accessing and modifying plot settings (e.g. time of day, weather, physics, flags) in the Settings menu. |
| `PLOT_USERS`               | Allows managing players on the plot (viewing visitor lists, assigning roles, promoting, or demoting members).  |
| `PLOT_GROUPS`              | Allows creating, modifying, or deleting custom roles and editing their permissions on the plot.                |
| `PLOT_REGION`              | Allows accessing world and region boundary management for the plot.                                            |
| `PLOT_RESET`               | Allows resetting the plot back to its original template state.                                                 |
| `PLOT_DELETE`              | Allows permanently deleting the plot.                                                                          |
| `PLOT_BYPASS_RESTRICTIONS` | Allows bypassing plot region restrictions and limits.                                                          |

### Economy, Packages & Features

| Permission        | Description                                                                                |
|:------------------|:-------------------------------------------------------------------------------------------|
| `PLOT_PACKAGES`   | Allows opening the Packages menu and applying owned [Packages](../package.md) to the plot. |
| `PLOT_BANK`       | Allows accessing the plot bank balance, depositing funds, and withdrawing currency.        |
| `PLOT_MARKET`     | Allows accessing the Market menu to purchase or activate features on the plot.             |
| `PLOT_PANEL`      | Allows viewing and interacting with the plot control panel.                                |
| `PLOT_MILESTONES` | Allows viewing, progressing, and claiming plot milestones.                                 |

### Moderation & Player Controls

| Permission                 | Description                                                                                                    |
|:---------------------------|:---------------------------------------------------------------------------------------------------------------|
| `PLOT_ESSENTIALS_BAN`      | Allows banning disruptive players from entering the plot (`/plot ban`).                                        |
| `PLOT_ESSENTIALS_KICK`     | Allows kicking visitors from the plot back to the server spawn (`/plot kick`).                                 |
| `PLOT_ESSENTIALS_MUTE`     | Allows muting individual players within the plot's local chat (`/plot mute`).                                  |
| `PLOT_ESSENTIALS_MUTECHAT` | Allows muting or unmuting the entire plot chat (`/plot mutechat`).                                             |
| `PLOT_IGNORE_MUTE`         | Allows players with this permission to speak in plot chat even when plot chat is muted or when they are muted. |
| `PLOT_ESSENTIALS_TP`       | Allows teleporting to players or teleporting players across the plot (`/plot tp`).                             |
| `PLOT_ESSENTIALS_CLEARINV` | Allows clearing a player's inventory on the plot (`/plot clearinv`).                                           |
| `PLOT_ESSENTIALS_GAMEMODE` | Allows changing gamemode (e.g. Creative, Survival) on the plot (`/plot gamemode`).                             |
| `PLOT_ESSENTIALS_FLY`      | Allows toggling flight mode on the plot (`/plot fly`).                                                         |
| `PLOT_ESSENTIALS_SETSPAWN` | Allows changing the plot spawn point (`/plot setspawn`).                                                       |
| `PLOT_SPAWN_OTHERS`        | Allows sending other players on the plot back to the plot spawn point.                                         |
| `WHITELIST`                | Allows joining and remaining on the plot when the plot whitelist mode is active.                               |

## Managing Roles & Permissions In-Game

Plot owners and players with the `PLOT_GROUPS` and `PLOT_USERS` permissions can manage roles and permissions entirely through the in-game GUI:

### Assigning Roles to Players

1. Open the plot interface using [`/plot menu`](../../commands/plot/menu.md).
2. Click **Players** (or **Users**).
3. Select an online or offline player from the list.
4. Choose the role you wish to assign to that player.

### Editing Roles & Permissions

1. Open the plot interface using [`/plot menu`](../../commands/plot/menu.md).
2. Click **Roles** (or **Groups**).
3. To create a new role, click **Create Role** and enter the role name in chat.
4. Select any role to open its configuration options:
   - **Edit Name / Tag:** Customize the role's title and chat prefix tag.
   - **Edit Permissions:** Opens an interactive permission grid. Click any permission node to toggle it between **Allowed** (<green>Allowed</green>) and **Disallowed** (<red>Disallowed</red>).
   - **Delete Role:** Removes the custom role (members are automatically reverted to the default role).

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
