---
title: Plot Browser
description: Interactive menu for browsing, discovering, and visiting plots
---

The **Plot Browser** allows players to explore, search, and jump to active plots across the entire server network.

Players can open the browser at any time using the [`/housing browse`](../commands/housing/browse.md) command.

## Browser Layouts

### Container Layout (`container`)

![Container Browser](/assets/images/features/browser/container-browser.png)

The **Container** layout is the default catalog-style grid view.

It presents plots in a paginated inventory grid and utilizes a filter system to allow players to filter and sort plots based on their preferences.

> **Tip:** To use the container layout, set `browser-menu.type` to `container` in the global configuration file (`config.global.yml`).

---

### Channel Layout (`channel`)

![Channel Browser](/assets/images/features/browser/channel-browser.png)

The **Channel** layout is a modern, media-style feed where plots are organized into stacked horizontal rows (channels).

> **Tip:** To use the channel layout, set `browser-menu.type` to `channel` in the global configuration file (`config.global.yml`).

---

## Configuration

The plot browser is configured in the global configuration file: `config.global.yml` under the `browser-menu:` section.

Like other `.global` files, `config.global.yml` is stored in the `housing-resources` bucket in your MinIO dashboard ([How to configure global files](../installation/configuration.md#changing-global-files)).

```yaml
# Plot browser configuration in config.global.yml
browser-menu:
  # The layout type of the plot browser menu ('container' or 'channel').
  type: container

  # Settings for the 'container' layout
  container:
    # Available sort algorithms in the filters menu (first one is active by default).
    filter-order:
      - trending
      - most_votes
      - newest

    browser-filters:
      # Default active filter for new players ('online', 'recent', 'popular', or a custom filter key).
      default-active: online

      # Predefined custom filters available to players.
      default-custom-filters:
        fun:
          name: "Tag: Fun"
          icon: SLIME_BALL # Material name or base64:<texture> for player heads
          online-only: false
          tags:
            - fun
          sort-by: trending # 'trending', 'most_votes', or 'newest'

  # Settings for the 'channel' layout
  channel:
    # Channels displayed row-by-row in the channel menu.
    # Supported: online, trending, most_votes, newest, or tag:<tag_id>
    channel-placements:
      - online
      - trending
      - most_votes
      - tag:fun
      - newest
```

## Configuration Options

| Option | Type | Default | Description |
|:---|:---|:---|:---|
| `type` | String | `container` | Menu layout type. Supported: `container`, `channel`. |
| `container.filter-order` | List | `[trending, most_votes, newest]` | Cycling order of sorting algorithms available in the filter menu. |
| `container.browser-filters.default-active` | String | `online` | Initial active filter preset on first load (`online`, `recent`, `popular`, or a custom filter key). |
| `container.browser-filters.default-custom-filters` | Section | - | Preconfigured filter presets added to players' filter lists by default. |
| `channel.channel-placements` | List | - | Ordered list of channels displayed in channel mode (`online`, `trending`, `most_votes`, `newest`, or `tag:<tag_id>`). |

### Available Filter & Channel Types

| Type | Description |
|:---|:---|
| `online` | Shows plots that have players currently online. |
| `trending` | Ranks plots based on recent player activity and votes. |
| `most_votes` | Sorts plots by total votes received. |
| `newest` | Shows the most recently created plots. |
| `tag:<tag_id>` | *(Channel mode)* Displays plots that have the specified [Tag](tag.md) (e.g. `tag:fun`). |

## Commands

- [`/housing browse`](../commands/housing/browse.md) - Opens the plot browser (supports optional `--listingIndex <index>` / `-l <index>`).
- [`/housing search`](../commands/housing/search.md) - Searches plots directly by name or owner.
- [`/housing visit`](../commands/housing/visit.md) - Browses plots of a specific player.

## Permissions

| Permission | Default | Description |
|:---|:---|:---|
| `housing.command.browse` | `true` | Allows running [`/housing browse`](../commands/housing/browse.md) to open the plot browser. |
| `housing.admin.browser` | `op` | Unlocks visibility filters in the browser to view private and role-restricted plots. |

## References

- [`/housing browse`](../commands/housing/browse.md) - Command reference for opening the plot browser.
- [`/housing search`](../commands/housing/search.md) - Command reference for searching plots directly.
- [`/housing visit`](../commands/housing/visit.md) - Command reference for browsing plots of a specific player.
- [Tag](tag.md) - Categorizing plots for browser filtering and channels.
- [Plot](plot/index.md) - Overview of plots and plot management.
- [Global Configuration](../installation/configuration.md#changing-global-files) - Guide to editing global configuration files.
- [Features Overview](index.md) - Overview of all DecentHousing features.