---
title: Amplifier
description: Timed plot boosters
---

An **Amplifier** (also known as an **Upgrade**) is a temporary boost applied to a plot that unlocks special perks or capabilities for a limited duration.

Amplifiers are ideal for server monetization and progression rewards: you can sell temporary boosters on your web store, offer them as voting prizes, or drop them in lobby reward crates. When an amplifier is active on a plot, eligible players on that plot can immediately take advantage of the unlocked perk until the timer expires.

## Available Amplifiers

DecentHousing provides built-in amplifiers ready for your server:

- **WorldEdit (`WORLD_EDIT`):** Temporarily enables WorldEdit and FAWE building tools on the plot. While active, trusted players who have the `WORLD_EDIT` plot permission can use building brushes, selections, and commands directly on the plot.

/// note | WorldEdit Requirements
For a player to use WorldEdit on a plot with an active amplifier, they must have both the `BUILD` and `WORLD_EDIT` role permissions on that plot. Server staff with the `housing.worldedit.bypass` permission can use WorldEdit at any time without requiring an active amplifier.
///

## Viewing Amplifiers In-Game

Plot owners and members can easily monitor active boosts and remaining time through the plot management menu:

1. Open the plot menu using [`/plot menu`](../commands/plot/menu.md).
2. Click the **Upgrades** button (represented by a **Glistering Melon Slice** icon).
3. The Upgrades menu displays all available boosters:
   - **Active:** Shows a green status along with a live countdown of the remaining time.
   - **Inactive:** Indicates that the boost is not currently running on the plot.

/// tip | Plot Permission
Opening the Upgrades overview from the Plot Panel requires the **`PLOT_PANEL`** role permission on the plot.
///

## Granting Amplifiers

You can activate and extend amplifiers on plots in two ways: using administrative commands or rewarding them through packages.

### Via Commands

Administrators can check status or extend an amplifier's duration on the current plot using the [`/housing admin amplifier`](../commands/housing/admin/amplifier.md) command:

```
/housing admin amplifier extend <type> <span_ms>
/housing admin amplifier info <type>
```

The `<span_ms>` argument specifies the duration to add in **milliseconds**. If the boost is already active, the new duration is added to the remaining time.

Common duration values:

| Duration | Milliseconds (`<span_ms>`) |
|:---------|:---------------------------|
| 1 Hour   | `3600000`                  |
| 6 Hours  | `21600000`                 |
| 12 Hours | `43200000`                 |
| 24 Hours (1 Day) | `86400000`         |
| 7 Days   | `604800000`                |

Example: To grant 24 hours of WorldEdit to the plot you are currently on:

```
/housing admin amplifier extend WORLD_EDIT 86400000
```

### Via Packages (Store & Crates)

The recommended way to distribute amplifiers to players is through [Packages](package.md). Packages can be stored in player profiles and applied by players to any plot they own.

To create a package that grants an amplifier, define it in `packages.global.yml`:

```yaml
packages:
  # 24-hour WorldEdit plot booster
  worldedit-booster-24h:
    key: worldedit-booster-24h
    display-name: "<gold><b>WorldEdit Booster</b></gold> <gray>(24 Hours)</gray>"
    item:
      material: WOODEN_AXE
      lore:
        - "<gold><b>WorldEdit Booster</b></gold> <gray>(24 Hours)</gray>"
        - "<dark_gray>Temporary Plot Upgrade</dark_gray>"
        - ""
        - "<gray>Activate 24 hours of WorldEdit access</gray>"
        - "<gray>for builders on your plot.</gray>"
        - ""
        - "<yellow><b>[!]</b> Click to apply to this plot</yellow>"
    on-apply:
      - type: command
        data:
          sender: console
          command: "housing admin amplifier extend WORLD_EDIT 86400000"
```

Once defined, you can give the package to players via crates, store commands, or with:

```
/housing admin package give <player> worldedit-booster-24h
```

When the player applies the package from their [`/plot menu`](../commands/plot/menu.md), the amplifier starts immediately.

## Configuration

Amplifier types available on your server network are configured in the global configuration file: `config.global.yml` under the `amplifiers-config:` section.

Like other `.global` files, `config.global.yml` is stored in the `housing-resources` bucket in your MinIO dashboard ([How to configure global files](../installation/configuration.md#changing-global-files)).

```yaml
# Settings for the plot amplifiers feature in config.global.yml
amplifiers-config:
  # List of amplifier types enabled across the server network
  amplifiers:
    - WORLD_EDIT
```

### Configuration Options

| Option       | Type         | Default | Description                                                                                 |
|:-------------|:-------------|:--------|:--------------------------------------------------------------------------------------------|
| `amplifiers` | List (String)| `[]`    | The list of enabled amplifier IDs. Only types listed here can be activated and viewed in-game.|

## Placeholders

Display live amplifier status on scoreboards, holograms, or custom menus using PlaceholderAPI:

| Placeholder                             | Description                                                    | Example Output |
|:----------------------------------------|:---------------------------------------------------------------|:---------------|
| `%plot_amplifier_active_<amplifierId>%` | Indicates whether a specific amplifier is active on the plot.   | `Yes` / `No`   |

Example: `%plot_amplifier_active_WORLD_EDIT%` returns `Yes` when WorldEdit boost is running, and `No` when inactive.

## Commands

See [`/housing admin amplifier`](../commands/housing/admin/amplifier.md) for the full command reference.

## Permissions

### Admin Permissions

Administrators require the following permission nodes to manage amplifiers:

| Permission                              | Description                                                            |
|:----------------------------------------|:-----------------------------------------------------------------------|
| `housing.command.admin.amplifier.extend`| Allows activating or extending plot amplifiers via command.            |
| `housing.command.admin.amplifier.info`  | Allows inspecting the active status and remaining time of an amplifier.|

### Plot Permissions

- **`PLOT_PANEL`**: Allows plot members to open the Upgrades menu from the Plot Panel.
- **`WORLD_EDIT`**: Allows players with this role on the plot to use WorldEdit tools when the WorldEdit amplifier is active.

### Server Permissions

- **`housing.worldedit.bypass`**: Allows server staff or trusted builders to bypass amplifier requirements and use WorldEdit on plots at all times.

## References

- [`/housing admin amplifier`](../commands/housing/admin/amplifier.md) - Admin command reference for amplifiers.
- [`/plot menu`](../commands/plot/menu.md) - In-game plot management interface and Upgrades menu.
- [Package](package.md) - Rewarding amplifiers through packages.
- [Roles & Permissions](plot/roles-and-permissions.md) - Plot role permissions including `WORLD_EDIT` and `PLOT_PANEL`.
- [Placeholders](../placeholders/index.md#amplifiers--milestones) - Placeholders for amplifiers and milestones.
- [Features Overview](index.md) - Overview of all DecentHousing features.
