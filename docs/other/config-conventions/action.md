---
title: Action
description: Config convention
---

The `action` configuration convention is a standardized structure used across DecentHousing (such as in [Custom Items](../../features/item.md), [Packages](../../features/package.md), and plot milestones) to define automated commands, chat messages, and server operations executed when players interact with features or unlock plot rewards.

Actions are written as a list of entries, where each entry defines an action `type` and a corresponding `data` block. When triggered, actions are executed sequentially in the order they are defined.

## Examples

/// tab | Console Command
```yaml
# Executes a command from the server console
- type: command
  data:
    sender: console
    command: "give %player% diamond 1"
```
///

/// tab | Player Command
```yaml
# Forces the player to run a command as themselves
- type: command
  data:
    sender: player
    command: "spawn"
```
///

/// tab | Message
```yaml
# Sends formatted messages directly to the player's chat
- type: message
  data:
    message:
      - "<green><b>[!]</b> You successfully claimed your reward!</green>"
      - "<gray>Check your inventory for your new items.</gray>"
```
///

/// tab | Combined Actions
```yaml
# Multiple actions executed in order
- type: command
  data:
    sender: console
    command: "give %player% barrier 1"
- type: message
  data:
    message:
      - "<yellow><b>[!]</b> Obtained a Barrier block!</yellow>"
```
///

## Action Types

### `command`

Executes a Minecraft command when the action is triggered.

#### `command`
- **Type:** String
- **Required:** Yes

The exact command line to run, without a leading slash (`/`). Supports dynamic placeholders (such as `%player%` and `%plot%`).

#### `sender`
- **Type:** String
- **Default:** `console`
- **Required:** No
- **Options:** `console` or `player`

Specifies who executes the command:
- `console`: Runs the command with full server privileges from the console. Ideal for `/give`, permissions, or admin plot commands.
- `player`: Forces the player who triggered the action to run the command as themselves (subject to their own permissions).

---

### `message`

Sends formatted chat lines directly to the player.

#### `message`
- **Type:** List of Strings
- **Required:** Yes

The list of text lines sent to the player.
- Supports MiniMessage tags (e.g. `<yellow>`, `<green>`, `<red>`, `<gold>`, `<b>`, `<i>`).
- Supports legacy color codes (e.g. `&a`, `&e`, `&7`).
- Supports dynamic placeholders (such as `%player%`).

## Available Placeholders

DecentHousing automatically replaces contextual placeholders within command lines and messages:

| Placeholder | Description | Example Output |
|:---|:---|:---|
| `%player%` | The username of the player who triggered or is targeted by the action. | `Steve` |
| `%plot%` | The unique ID of the plot where the action is being executed. | `9b1deb4d-...` |

/// note | Feature-Specific Placeholders
Certain systems provide additional dynamic placeholders. For example, [Packages](../../features/package.md) allow referencing custom input options defined on the package (such as `%increment%`).
///

## Where It Is Used

The Action convention is used across multiple DecentHousing configuration files:

- **[Custom Items](../../features/item.md) (`items.global.yml`)**:
  - `on-obtain`: Executed when a player clicks and obtains an item from the Items menu.
  - `on-unlock`: Executed on the plot when a locked item (or its tag) is unlocked.
- **[Packages](../../features/package.md) (`packages.global.yml`)**:
  - `on-apply`: Executed on the plot when a player applies an owned package.
- **Milestones**:
  - `claim-actions`: Executed when a player reaches a milestone requirement and claims the reward.

## References

- [Item Feature](../../features/item.md) - Using actions in custom items.
- [Item Convention](item.md) - Standard item visual appearance and settings.
- [Package Module](../../features/package.md) - Using actions in custom plot packages.
- [Price Convention](price.md) - Setting purchase prices for items and packages.
- [Item Selector Convention](item-selector.md) - Matching physical items in-game.
