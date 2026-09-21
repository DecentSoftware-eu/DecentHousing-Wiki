---
title: Tag
description: Plot tags and tag administration
---

The **Tag module** allows plot owners and server administrators to assign descriptive tags (labels) to plots. Tags help players categorize, discover, and filter plots in the plot browser.

## Overview

Tags make it easy for players to identify the content or theme of a plot (such as *Parkour*, *PVP*, *RPG*, or *Event*). When players browse available plots using [`/housing browse`](../commands/housing/browse.md), they can filter plots by specific tags to find what they are looking for.

### Types of Tags

DecentHousing supports two types of tags:

- **Normal Tags (`sticky: false`):** Standard tags available for plot owners to select. Plot owners can freely assign or remove normal tags on their plot directly from the in-game Plot Panel menu up to a maximum limit (e.g. up to 3 tags).
- **Sticky Tags (`sticky: true`):** Special administrative tags managed exclusively by server administrators (such as *Official*, *Verified*, or *Milestone Award*). Sticky tags remain permanently on the plot and cannot be added or removed by plot owners through the plot menu.

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

## Admin Tag Commands (`/housing admin tags`)

Server administrators can manage the global tag registry and assign or unassign tags to any plot using the `/housing admin tags` command group.

### Syntax

```
/housing admin tags create <id> <sticky> [name]
/housing admin tags delete <id>
/housing admin tags list
/housing admin tags assign <plotId> <tagId>
/housing admin tags unassign <plotId> <tagId>
```

### Available Commands

| Command | Description |
|:---|:---|
| `/housing admin tags create <id> <sticky> [name]` | Creates a new tag with a unique identifier, sets sticky status (`true` or `false`), and optional display name. |
| `/housing admin tags delete <id>` | Deletes an existing tag from the system. |
| `/housing admin tags list` | Displays a list of all registered tags, categorized into Sticky and Normal tags. |
| `/housing admin tags assign <plotId> <tagId>` | Assigns a tag directly to a specific plot by plot ID. |
| `/housing admin tags unassign <plotId> <tagId>` | Removes a tag from a specific plot by plot ID. |

## Permissions

### Admin Permissions

Administrators require the following permission nodes to run tag management commands:

| Permission | Description |
|:---|:---|
| `housing.command.admin.tags.create` | Allows creating new tags via `/housing admin tags create`. |
| `housing.command.admin.tags.delete` | Allows deleting tags via `/housing admin tags delete`. |
| `housing.command.admin.tags.list` | Allows listing registered tags via `/housing admin tags list`. |
| `housing.command.admin.tags.assign` | Allows assigning tags to plots via `/housing admin tags assign`. |
| `housing.command.admin.tags.unassign` | Allows unassigning tags from plots via `/housing admin tags unassign`. |

### Plot Role Permissions

- **`PLOT_PANEL`**: Grants members on a plot access to the Plot Panel menu to view and change active normal plot tags.

## References

- [`/housing admin tags`](../commands/housing/admin/tags.md) - Detailed command syntax and usage for admin tag commands.
- [`/plot menu`](../commands/plot/menu.md) - Opening the in-game plot management interface.
- [`/housing browse`](../commands/housing/browse.md) - Browsing and filtering plots by tags.
- [Plot](plot/index.md) - Overview of plot settings and management.
- [Features Overview](index.md) - Overview of all DecentHousing features.
