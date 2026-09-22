---
title: Package
description: Premium packages that run commands and can be applicable on plots
---

Represents a premium package that a user can obtain (from your store, crates, vote rewards, etc.) and apply to any
plot of their choice to unlock something.

![Package in a menu](/assets/images/features/package/menu.png)

Players can view and apply their owned packages through the [`/plot menu`](../commands/plot/menu.md).

After the package is applied, a **predefined command/s or actions are made to the plot** and the **package is consumed**.
If there is an error applying, the package remains in the player's profile.

## Usage

After the package is configured, you can give it to a player on any server that runs Housing plugin.

The typical flow may be like this:

1. You **set up the package** in the `packages.global.yml` file.
2. You **reward the player with the package** using the [`/housing admin package give`](../commands/housing/admin/package.md) command.
3. The player **applies the package to a plot** of their choice using the [`/plot menu`](../commands/plot/menu.md) command.
4. (Optional) You can use the [PlaceholderAPI Placeholders](#placeholderapi-placeholders) to dynamically display package details in crate menus, etc.

## Configuration

Custom packages can be easily created and customized in the global configuration file: `packages.global.yml`.

Like other `.global` files, `packages.global.yml` is stored in the `housing-resources` bucket in your MinIO dashboard ([How to configure global files](../installation/configuration.md#changing-global-files)).

A `packages.global.yml` configuration file may look like this:

```yaml
packages:
  # Increase visitor slots on the plot
  player-limit-increment:
    # The unique identifier of the package ('custom-' prefix is automatically added in the registry).
    key: player-limit-increment
    # Configurable input options passed when giving or applying the package.
    # Supported types: string, long, double, integer, boolean.
    input-options:
      - name: increment
        type: long
    # Display name in menus (supports MiniMessage and %option% placeholders).
    display-name: "<yellow><b>SLOT INCREASE</b></yellow> <gray>(+%increment%)</gray>"
    # Visual icon representation in the Packages menu.
    item:
      material: PAPER
      lore:
        - "<yellow><b>SLOT INCREASE</b></yellow> <gray>(+%increment%)</gray>"
        - "<dark_gray>Premium Package</dark_gray>"
        - ""
        - "<gray>This package will increase the visitor slots</gray>"
        - "<gray>on your plot by %increment%.</gray>"
        - ""
        - "<yellow><b>[!]</b> Click to apply"
    # Actions executed when the package is applied on a plot.
    # Available placeholders:
    # - %player%: The player who applied the package
    # - %plot%: The unique ID of the plot
    # - %<option>%: Any input option defined above (e.g. %increment%)
    on-apply:
      - type: command
        data:
          sender: console # 'console' or 'player'
          command: "plot admin player-limit add %increment%"
```

## Commands

To inspect, award, list, or force-apply packages, use the [`/housing admin package`](../commands/housing/admin/package.md) command.

## PlaceholderAPI Placeholders

DecentHousing registers placeholders under the `%housing_...%` identifier to query package details (see complete list in [Placeholders](../placeholders/index.md)):

| Placeholder                                                      | Description                                                    |
|:-----------------------------------------------------------------|:---------------------------------------------------------------|
| `%housing_package_name_<packageId>%`                             | Returns the display name of the specified package.             |
| `%housing_package_name_<packageId>_<opt1>=<val1>_<opt2>=<val2>%` | Returns the display name with dynamic options substituted.     |
| `%housing_package_description_<packageId>%`                      | Returns the description/lore of the specified package.         |
| `%housing_package_description_<packageId>_<opt1>=<val1>%`        | Returns the description/lore with dynamic options substituted. |

/// example | Placeholder Usage
- `%housing_package_name_custom-player-limit-increment_increment=5%` &rarr; `<yellow><b>SLOT INCREASE</b></yellow> <gray>(+5)</gray>`
- `%housing_package_name_activate-feature_featureKey=shops%` &rarr; Formatted title for activating the shops feature.
///

## Permissions

| Permission                            | Description                                                 |
|:--------------------------------------|:------------------------------------------------------------|
| `housing.command.admin.package.list`  | Allows listing all registered packages.                     |
| `housing.command.admin.package.info`  | Allows inspecting package details and options.              |
| `housing.command.admin.package.give`  | Allows awarding packages to players.                        |
| `housing.command.admin.package.apply` | Allows force-applying packages directly to the active plot. |

Additionally, the plot role permission **`PLOT_PACKAGES`** allows players with that role on the plot to access the Packages menu from the Market GUI.

## References

- [`/housing admin package`](../commands/housing/admin/package.md) - Admin command reference for managing packages.
- [`/plot menu`](../commands/plot/menu.md) - Player plot menu command.
- [Plot](plot/index.md) - The plot system where packages are applied.
- [Feature](feature.md) - Features that can be activated via packages.
- [Action Convention](../other/config-conventions/action.md) - Standardized action execution convention.
- [Item Convention](../other/config-conventions/item.md) - Standardized package icon convention.
- [Global Configuration](../installation/configuration.md#changing-global-files) - Guide to editing global configuration files.