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

It presents plots in a paginated inventory grid and utilizes a powerful, customizable filter system:

- **Quick Filter Switcher (`F`)**: Players can left-click the filter button to cycle forward through filters (or Shift + Left-click to cycle backward). The switcher includes the server's configured filters (defined in `filter-order`) followed by the player's personal custom filters.
- **Filter Management Menu**: Right-clicking the filter button opens the filter management screen where players can activate presets, create new custom filter configurations with `+`, edit filter criteria (name, icon, online-only status, tags, sorting algorithm), or delete unwanted custom filters.

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
    # Declared filter definitions that can be referenced in filter-order,
    # default-active, and default-custom-filters below.
    #
    # Each filter supports:
    #   name: The display name shown for this filter in the menu.
    #   icon: (Optional) Icon material name (e.g. SLIME_BALL) or base64:<texture> for player head.
    #   online-only: Whether to only show plots with players currently online (true/false).
    #   tags: List of required plot tags (e.g. ['fun']). Set to [] or omit for any tag.
    #   sort-by: Sorting algorithm to use. Valid options: trending, newest, most_votes.
    #   visibility: (Optional) Plot visibility filter. Valid options: PUBLIC, BYPASS. Default: PUBLIC.
    filters:
      online:
        name: "Online plots"
        online-only: true
        tags: []
        sort-by: trending
      trending:
        name: "Trending plots"
        online-only: false
        tags: []
        sort-by: trending
      newest:
        name: "Recent plots"
        online-only: false
        tags: []
        sort-by: newest
      fun:
        name: "Tag: Fun"
        icon: SLIME_BALL
        online-only: false
        tags:
          - fun
        sort-by: trending

    # The order of filters in the plot browser menu switcher.
    # Players can cycle through these filters in the browser menu.
    # References filter keys declared in the "filters" section above.
    # If default-active is not set, the first one here is automatically enabled on browser open.
    filter-order:
      - online
      - trending
      - newest

    # The default plot browser filter settings for new users opening the browser
    # for the first time.
    browser-filters:
      # The default active filter on first load.
      # References any filter key declared in the "filters" section above.
      default-active: online

      # The default custom filters automatically added to the user's custom filter list
      # when they open the custom filters menu for the first time.
      # References filter keys declared in the "filters" section above.
      default-custom-filters:
        - fun

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
| `container.filters` | Map | - | Named filter declarations defining presets and criteria. Admin can declare any number of custom filters. |
| `container.filter-order` | List | `[online, trending, newest]` | Cycling order of filters available in the browser menu switcher. References declared filter keys. If `default-active` is unset, the first filter in this list is active on open. |
| `container.browser-filters.default-active` | String | `online` | Key of the default active filter on first load. References any filter key from `filters`. |
| `container.browser-filters.default-custom-filters` | List | `[fun]` | List of filter keys from `filters` automatically populated into players' custom filter lists on first open. |
| `channel.channel-placements` | List | - | Ordered list of channels displayed in channel mode (`online`, `trending`, `most_votes`, `newest`, or `tag:<tag_id>`). |

### Filter Declaration Attributes (`container.filters.<key>`)

Each filter declared under `container.filters` can be configured with the following properties:

| Property | Type | Default | Description |
|:---|:---|:---|:---|
| `name` | String | - | Display name of the filter shown in the menu. |
| `icon` | String | `WRITABLE_BOOK` | Item material name (e.g. `SLIME_BALL`) or base64 skull value (`base64:<texture>`). |
| `online-only` | Boolean | `false` | When `true`, only plots with at least one online player are shown. |
| `tags` | List | `[]` | List of required plot [Tags](tag.md) (e.g. `['fun', 'parkour']`). An empty list `[]` allows any tag. |
| `sort-by` | String | `trending` | Sorting algorithm used for the filter. Supported: `trending`, `newest`, `most_votes`. |
| `visibility` | String | `PUBLIC` | Visibility requirement. Supported: `PUBLIC` (public plots only), `BYPASS` (includes private/unlisted plots; requires `housing.admin.browser` permission). |

### Sorting Algorithms (`sort-by`)

| Algorithm | Description |
|:---|:---|
| `trending` | Ranks plots based on recent activity, active players, and recent votes. |
| `most_votes` | Sorts plots by total all-time valid votes received. |
| `newest` | Sorts plots chronologically from newest to oldest based on creation date. |

### Channel Mode Types (`channel.channel-placements`)

| Type | Description |
|:---|:---|
| `online` | Shows plots that have players currently online. |
| `trending` | Ranks plots based on recent player activity and votes. |
| `most_votes` | Sorts plots by total votes received. |
| `newest` | Shows the most recently created plots. |
| `tag:<tag_id>` | Displays plots that have the specified [Tag](tag.md) assigned (e.g. `tag:fun`, `tag:featured`). |

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
