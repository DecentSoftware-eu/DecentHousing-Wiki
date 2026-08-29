---
title: Plot
description: Plot module
---

A plot represents one land that belongs to one player. Player can have as many plots as his limit allows.

// TODO: link from "limit" word to User#plot limit section

## Configuration

Basic plot management like creating, deleting is done by commands ([/housing admin plot](../../commands/housing/admin/plot.md)) or by
using the plot menu ([/plot menu](../../commands/plot/menu.md)).

Defaults are set in the `config.global.yml` file:

```yaml
# A defaults for plots on your Housing network.
# Some of them can be extended by plot owners by purchasing packages.
defaults-config:
  plot-name: "Unnamed Plot"
  plot-description: "An awesome Housing plot!"
  # The default icon for plots in the plot browser menu.
  # Use base64: prefix for player head base64 texture, or use a material name for a block/item icon.
  plot-icon: "base64:eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvODA4YWM1ZTI4ZGJkZmEyMjUwYzYwMjg3Njg2ZGIxNGNjYmViNzc2YzNmMDg2N2M5NTU1YjdlNDk1NmVmYmE3NyJ9fX0="
  # The default maximum number of players that can be on a plot at the same time.
  max-players-limit: 10
  # The default limit for roles on plots.
  role-limit: 5
  build-area:
    # The default build area size factor (in percentage, where 1.0 is 100% of the template build area size).
    # This is allowed to be extended as rewards up to 1.0.
    # Must be between 0.1 and 1.0.
    factor: 0.5
  # The default roles on new plots.
  # The owner and default roles are required, don't change the settings names
  # or remove them, but you can configure them.
  roles:
    owner:
      name: Owner
      tag: "&c[&c&lOwner&r&c]"
    default:
      name: Player
      tag: ""
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

## Subsections

- [Build area factor](build-area-factor.md) - The build area factor is an (optional) percentage of the template build area size that is allowed to be built on a plot. It can be extended up to 1.0 (100%).

## References

- [Tag](../tag.md) - A tags are assigned to a plot and shown in the browser menu.