---
title: Troubleshooting
description: Common mistakes and troubleshooting steps for DecentHousing
---

## Troubleshooting

This section shows some basic troubleshooting steps you may need.

### Viewing logs from plot servers

If your plot servers fail to start, players cannot connect, or you want to check for plugin errors, you can view the server console logs using the `manage.sh` script in the `chart/` folder:

```bash
cd chart/
./manage.sh view-logs plot
```

**Viewing logs of a specific server**

If you have multiple plot servers running, you can specify which server to view by adding its number (starting from `0`, which is the default):

```bash
./manage.sh view-logs plot 1
```

> If you enter a number that doesn't exist, the script will show you a list of all currently running servers you can choose from.

**Viewing logs from before a crash or restart**

If a plot server crashed or restarted and you want to see what happened, you can view the logs from the previous run using the `--previous` (or `-p`) flag:

```bash
./manage.sh view-logs plot --previous
```

## Common mistakes

This section covers the most common mistakes and troubleshooting steps you may need.

### Misconfigured node access address

If you can't connect to your plot servers from the lobby server, one of the most common causes may be misconfigured
IP address in the **Step #37 of setup wizard**.

The IP address provided in the setup wizard must be **the address that your proxy server registers** for redirecting players.
So, if your proxy server is running on a different machine than the node, you need to provide the **public IP address** of the node,
or cover your machines in the same network and use the **private IP address** of the node.

**Think about it like this:**

If you configure BungeeCord, you add Minecraft servers to the configuration so your players can connect to them. Housing
is doing the same thing, but dynamically, at runtime. So in this step you are basically telling him which IP address to
use for plots that will be generated on the specific machine (node).

**How to resolve the issue**

To resolve this issue, you need to change the configured IP address. Follow the [Changing configuration provided in the wizard](configuration.md#changing-configuration-provided-in-the-wizard) guide
to change this in `values-produced.yaml` file:

```
controller:
  bareMetalEnvironment:
    enabled: true
    nodeExternalAddressMappings:
      ds1: "123.456.789.123"   # <- Change this to the correct (accessible from proxy) IP address of your machine
```