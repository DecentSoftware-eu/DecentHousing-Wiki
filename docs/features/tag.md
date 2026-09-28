---
title: Tag
description: Tags that can be assigned to plots for categorization
---

This feature allows plot owners and server admins (you) to assign tags to plots.

Tags help players categorize, discover, and filter plots in the plot browser and also can serve as a reward or badge
for your players that you can assign by commands or through [Packages](package.md).

When players browse available plots using [`/housing browse`](../commands/housing/browse.md), they can filter plots by specific tags to find what they are looking for.

![Browser Menu Tags](/assets/images/features/tag/browser-menu.png)

## Types of Tags

- **Normal Tags (`sticky: false`):** Standard tags **available for plot owners to select**. Plot owners can freely assign or remove normal tags on their plot directly from the in-game Plot Panel menu up to a maximum limit (e.g. up to 3 tags).
- **Sticky Tags (`sticky: true`):** Special tags **assigned exclusively by server administrators** (such as *Featured*, *Popular*, or *Winner of Winter Event*). Sticky tags **remain permanently on the plot** and cannot be added or removed by plot owners through the plot menu.

## Rewarding Sticky Tags

Because sticky tags cannot be modified by plot owners directly, server administrators can use them as plot rewards or badges
granted through a command.

After creating a sticky tag using the [`/housing admin tags create`](../commands/housing/admin/tags.md) command, you can
assign it to a plot using the following command:

```
/housing admin tags assign <plotId> <tagId>
```

This automatically grants and attaches the sticky tag to the plot.

More about this in the [/housing admin tags](../commands/housing/admin/tags.md) command reference.

> Info: You can create a [Packages](package.md) that run the command (e.g., store rewards, crates, or milestone unlocks)
> /housing admin tags assign %plot% <tagId>.

## Managing Tags In-Game (Plot Panel Menu)

Plot owners and members with plot management permissions can select normal tags for their plot using the in-game menu:

1. Open the plot management menu with [`/plot menu`](../commands/plot/menu.md).
2. Select **Plot Panel** to view plot settings.
3. Click the **Tags** button (represented by a **Name Tag** icon).
4. In the tag selector menu, click available tags to select or deselect them for your plot.
5. Once selected, tags are instantly updated on your plot and displayed in the plot browser.

/// note | Sticky Tags Notice
Sticky tags assigned by server admins are displayed alongside normal tags in the Plot Panel overview, but cannot be removed by plot owners in the tag selector.
///

## Filtering Plots by Tags (Plot Browser)

Players browsing for plots using [`/housing browse`](../commands/housing/browse.md) can filter the server-wide plot list by specific tags in the **Filters** menu:

1. Open the plot browser using [`/housing browse`](../commands/housing/browse.md).
2. Click the **Filters** button to open the browser search filter settings.
3. Click the **Tags** button (represented by a **Name Tag** icon).
4. Select one or more tags in the tag picker menu (e.g. *Parkour*, *PVP*, *RPG*, or *Official*).
5. The plot browser automatically updates to display only plots that have at least one of the selected tags assigned.

## Commands

See [`/housing admin tags`](../commands/housing/admin/tags.md) for the full command reference.

## Permissions

### Admin Permissions

Administrators require the following permission nodes to run tag management commands:

| Permission                            | Description                                                            |
|:--------------------------------------|:-----------------------------------------------------------------------|
| `housing.command.admin.tags.create`   | Allows creating new tags via `/housing admin tags create`.             |
| `housing.command.admin.tags.delete`   | Allows deleting tags via `/housing admin tags delete`.                 |
| `housing.command.admin.tags.list`     | Allows listing registered tags via `/housing admin tags list`.         |
| `housing.command.admin.tags.assign`   | Allows assigning tags to plots via `/housing admin tags assign`.       |
| `housing.command.admin.tags.unassign` | Allows unassigning tags from plots via `/housing admin tags unassign`. |

### Plot Permissions

- **`PLOT_PANEL`**: Grants members on a plot access to the Plot Panel menu to view and change active normal plot tags.

## References

- [`/housing admin tags`](../commands/housing/admin/tags.md) - Detailed command syntax and usage for admin tag commands.
- [`/plot menu`](../commands/plot/menu.md) - Opening the in-game plot management interface.
- [`/housing browse`](../commands/housing/browse.md) - Browsing and filtering plots by tags.
- [Plot](plot/index.md) - Overview of plot settings and management.
- [Package](package.md) - Granting sticky tag rewards via packages.
- [Features Overview](index.md) - Overview of all DecentHousing features.
