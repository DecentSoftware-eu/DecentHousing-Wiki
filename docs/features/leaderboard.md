---
title: Leaderboard
description: Leaderboards and top rankings overview
---

The **Leaderboard module** provides server-wide rankings for player statistics, economy balances, and plot metrics.

## In-Game Access

Players can open the leaderboards menu or view top rankings in chat using the [`/housing top`](../commands/housing/top.md) command.

## Placeholders

Leaderboard entries can be displayed across holograms, scoreboards, TAB, or custom menus using PlaceholderAPI placeholders (e.g., `%housing_leaderboard_record_<key>_<position>_name%`).

/// note | Available Leaderboard Keys
Currently, only the `votes` leaderboard and the `economy` leaderboard (which requires the `economyId` parameter, e.g. `%housing_leaderboard_record_economy_economyId=coins_1_name%`) are available for placeholders.
///

For a detailed list of all leaderboard placeholders and usage examples, see [Placeholders &rarr; Leaderboards & Rankings](../placeholders/index.md#leaderboards--rankings).

## References

- [`/housing top`](../commands/housing/top.md) - Open leaderboards or list top players.
- [Placeholders](../placeholders/index.md#leaderboards--rankings) - Complete reference for `%housing_leaderboard_record` placeholders.
- [Features Overview](index.md) - Overview of all DecentHousing features.
