---
title: Placeholders
description: Overview of available PlaceholderAPI placeholders in DecentHousing
---

## Plot Placeholders (`%plot_...%`)

Plot placeholders evaluate dynamically based on the plot the player is currently visiting.

### Plot Metadata & Statistics

| Placeholder                                            | Description                                          | Example Output                         |
|:-------------------------------------------------------|:-----------------------------------------------------|:---------------------------------------|
| `%plot_id%`                                            | Unique ID of the currently loaded plot.              | `9b1deb4d-3b2a-44c1-8419-8a8b1b111111` |
| `%plot_owner%`                                         | Username of the owner of the current plot.           | `Notch`                                |
| `%plot_name%`                                          | Custom title/name of the current plot.               | `Awesome Survival`                     |
| `%plot_description%`                                   | Description of the current plot.                     | `Welcome to my plot!`                  |
| `%plot_player_limit%` <br> *(or `%plot_max_players%`)* | Maximum player capacity allowed on the current plot. | `20`                                   |
| `%plot_online_players%`                                | Number of players currently online on this plot.     | `5`                                    |
| `%plot_visibility%`                                    | Formatted display state of plot visibility.          | `Public`, `Unlisted`, `Private`        |
| `%plot_visibility_name%`                               | System enum name of plot visibility.                 | `PUBLIC`, `ROLES_ONLY`, `PRIVATE`      |

### Roles, Permissions & Voting

| Placeholder         | Description                                                            | Example Output                 |
|:--------------------|:-----------------------------------------------------------------------|:-------------------------------|
| `%plot_role%`       | Display name of the active player's role on the current plot.          | `Owner`, `Co-Owner`, `Visitor` |
| `%plot_role_tag%`   | Prefix / MiniMessage chat tag of the active player's role on the plot. | `<red>[Owner]</red>`           |
| `%plot_votes%`      | Total number of votes received by the current plot.                    | `85`                           |
| `%plot_votes_self%` | Number of votes the current player has awarded to this plot.           | `1`                            |

/// note | Dynamic Context Updating
As players move between plots, contextual `%plot_...%` placeholders such as `%plot_role%` and `%plot_role_tag%` automatically update to reflect their rank on the active plot.
///

### Economy & Bank

| Placeholder | Description | Example Output |
|:---|:---|:---|
| `%plot_bank_balance_<economyId>%` | Formatted balance stored in the plot bank for a specific economy. | `$5,250.00` |
| `%plot_bank_addition_<economyId>%` | Formatted income generated into the plot bank per tick for a specific economy. | `$0.50 / tick` |

### Amplifiers & Milestones

| Placeholder                              | Description                                                                                 | Example Output |
|:-----------------------------------------|:--------------------------------------------------------------------------------------------|:---------------|
| `%plot_amplifier_active_<amplifierId>%`  | Indicates whether a temporary plot booster/amplifier is active (`Yes` / `No` or localized). | `Yes`          |
| `%plot_milestone_reached_<milestoneId>%` | Indicates whether the plot has achieved a specific voting milestone (`Yes` / `No`).         | `Yes`          |
| `%plot_milestone_next_votes_required%`   | Required total vote count to reach the next voting milestone.                               | `100`          |
| `%plot_milestone_next_votes_remaining%`  | Remaining votes needed to unlock the next voting milestone.                                 | `15`           |

---

## Global & Player Placeholders (`%housing_...%`)

Global and player-scoped placeholders query player stats, economies, leaderboards, global metrics, features, and packages.

### Player & Economy

| Placeholder                                    | Description                                                           | Example Output |
|:-----------------------------------------------|:----------------------------------------------------------------------|:---------------|
| `%housing_default_currency_balance%`           | Returns the raw player balance in the default currency.               | `1500.0`       |
| `%housing_default_currency_balance_formatted%` | Returns the formatted player balance in the default currency.         | `$1,500.00`    |
| `%housing_balance_<economyId>%`                | Returns the raw player balance in a specific economy (e.g. `tokens`). | `250`          |
| `%housing_balance_formatted_<economyId>%`      | Returns the formatted player balance in a specific economy.           | `250 Tokens`   |
| `%housing_votes_gained_self%`                  | Returns total votes accumulated globally by the player.               | `42`           |
| `%housing_display_name_self%`                  | Returns the player's display name.                                    | `ZorTik`       |
| `%housing_attribute_<key>%`                    | Returns the value of a specific player attribute (e.g. `some_key`).   | `Value`        |
| `%housing_plots_count_self%`                   | Returns the current number of plots created by the player.            | `3`            |
| `%housing_plots_count_limit_self%`             | Returns the maximum plot limit the player is allowed to own.          | `5`            |

/// example | Economy Placeholder Usage
- `%housing_balance_tokens%` &rarr; `50`
- `%housing_balance_formatted_coins%` &rarr; `$10,000`
///

### Leaderboards & Rankings

| Placeholder                                                    | Description                                                                                                   | Example Output |
|:---------------------------------------------------------------|:--------------------------------------------------------------------------------------------------------------|:---------------|
| `%housing_leaderboard_record_<key>_<position>_name%`           | Returns the username/name of the entry at the specified position (e.g., `1`) for a given leaderboard key.     | `ZorTik`       |
| `%housing_leaderboard_record_<key>_<position>_value%`          | Returns the formatted score/value at the specified position for a given leaderboard key.                      | `150 Votes`    |
| `%housing_leaderboard_record_<key>_<params>_<position>_name%`  | Returns the username at the specified position for a parameterized leaderboard view (e.g. `economyId=coins`). | `Alex`         |
| `%housing_leaderboard_record_<key>_<params>_<position>_value%` | Returns the formatted value at the specified position for a parameterized leaderboard view.                   | `$50,000`      |

/// example | Leaderboard Placeholder Usage
- `%housing_leaderboard_record_votes_1_name%` &rarr; `ZorTik`
- `%housing_leaderboard_record_votes_1_value%` &rarr; `500`
- `%housing_leaderboard_record_balance_economyId=coins_1_name%` &rarr; `Steve`
- `%housing_leaderboard_record_balance_economyId=coins_1_value%` &rarr; `1000000`
///

### Metrics & System

| Placeholder                                  | Description                                               | Example Output |
|:---------------------------------------------|:----------------------------------------------------------|:---------------|
| `%housing_metrics_online_players%`           | Total count of online players across all active plots.    | `120`          |
| `%housing_metrics_total_plots%`              | Total number of created plots across the entire server.   | `450`          |
| `%housing_metrics_total_plots_<categoryId>%` | Total number of created plots within a specific category. | `35`           |
| `%housing_changelog_last_update%`            | The date of the last registered update in the changelog.  | `2026-09-01`   |

### Features & Packages

| Placeholder                                  | Description                                                                               | Example Output / Notes                                 |
|:---------------------------------------------|:------------------------------------------------------------------------------------------|:-------------------------------------------------------|
| `%housing_feature_name_<featureKey>%`        | Displays the name of a feature (e.g. `parkour`).                                          | `Parkour Module`                                       |
| `%housing_feature_description_<featureKey>%` | Displays the description of a feature.                                                    | `Challenge your visitors with custom parkour courses.` |
| `%housing_package_name_<packageKey>%`        | Returns the display name of a package. Supports dynamic parameters (e.g. `_increment=5`). | `Slot Increase (+5)`                                   |
| `%housing_package_description_<packageKey>%` | Returns the description/lore of a package. Supports dynamic parameters (e.g. `_span=7d`). | `Increases plot size for 7 days.`                      |

/// example | Package Placeholder Parameters
- `%housing_package_name_world-edit-extend%` &rarr; `WorldEdit Extension`
- `%housing_package_name_player-limit-increment_increment=5%` &rarr; `Slot Increase (+5)`
- `%housing_package_description_world-edit-extend_span=7d%` &rarr; `Grants WorldEdit access for 7 days.`
///
