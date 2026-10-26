---
title: Installation
description: First steps in installing and deploying DecentHousing
---

## Prerequisites

> ⚠️ Note: Since DecentHousing is a full infrastructure, **not a Minecraft plugin**,
> it **cannot be run on a shared hosting environment**. You will need at least a dedicated server to run it.

Before you can use DecentHousing, ensure you have the following:

- At least one **dedicated Linux server** with a min. of **16GB RAM** and **8-CPU cores**.
- **Docker** v29.6.1+ ([Installation Guide](https://docs.docker.com/engine/install/))
- **Kubernetes** v1.28+ (Installation down below)
- **Helm** v3.17+ (Installation down below)

Recommended specs for a smooth production experience on **one node**:

| Component | Minimum (not really smooth) | Recommended (~50-player codebase) |
|-----------|-----------------------------|-----------------------------------|
| RAM       | 16GB                        | 32GB+                             |
| CPU       | Ryzen 7 8700G               | Ryzen 9 5950X                     |
| Storage   | 10GB SSD                    | 50GB NVMe                         |

Please note that the recommended specs are likely to be increased when you gain more players. For instructions on
how to scale to multiple nodes, please refer to the [Scaling Guide](scaling/index.md).

Also, the suitable performance that may fit your needs may vary depending on the intensity of plot loads,
number of players creating plots at the moment, etc.

### Supported MC versions

DecentHousing currently supports ONLY Paper-based forks or Paper itself with these versions:

/// details | Supported Minecraft versions
    open: False
- 1.20.4
- 1.20.6
- 1.21.1
- 1.21.4
- 1.21.7
- 1.21.8
- 1.21.9
- 1.21.10
- 1.21.11
- 26.1
- 26.1.1
- 26.1.2
- 26.2
///

> DH is designed to work on as many versions as possible, but only 1.20.4 and 1.21.10 was our native development
> versions, so in case of any issues, please report them on our official communication channels.

### Docker Installation

For installing docker, we recommend the [official Docker installation guide](https://docs.docker.com/engine/install/).

### Kubernetes & Helm Installation

Housing's infrastructure is powered by Kubernetes, which dramatically simplifies the complexity and
provides some tools under the hood that automatically manage processes like leaderboard auto-refreshing for you.

**Install Kubernetes**

For production, we recommend **MicroK8s**, which is a lightweight, very easy-to-install Kubernetes distribution.

→ Installation guide: [here](https://canonical.com/microk8s#install-microk8s).

> Note: You **don't need to enable any addons** from the MicroK8s installation guide.

**Remap kubectl command**

If you've installed MicroK8s, you'll need to remap the `microk8s kubectl` command to `kubectl`.

```bash
sudo snap alias microk8s.kubectl kubectl
```

Alternative: Remap using classic aliases:

```bash
echo "alias kubectl='microk8s kubectl'" >> ~/.bashrc
source ~/.bashrc
```

---

## Quick Installation

We've created a full command line tool `housingctl` that you can utilize to easily install and manage your DecentHousing
infrastructure.

> ℹ️ **Prefer Advanced / Manual Installation?**
> By default, `housingctl` follows the quick installation scenario and installs all the necessary databases and services automatically for you.
>
> If you want full manual control over every step or wish to use your own external databases, please switch to the **[Advanced Installation](advanced-install.md)** guide instead.

You can find the `housingctl` executable at the root folder of the archive you have received.

**Extract the archive where you wanna your Housing files to be** and **run the `housingctl` command** to see the help menu:
```bash
./housingctl
```

First, please verify that the housingctl home folder points to the folder of the archive you have extracted:
```bash
./housingctl config
```
Should be the same as the folder you are currently in:
```
root@ds1 /srv/services/housing-showcase-4 # ./housingctl config

============================================================
▶ housingctl Configuration
============================================================
  Home Directory: /srv/services/housing-showcase-4
  Config File Path: Not created yet
  Valid Housing Layout: Yes
```

Then if you are ready, **begin the installation**:
```bash
./housingctl install
```
After you run this, the setup wizard begins. Expand any step below to see the prompt and detailed explanation:

/// details | Step 1: Kubernetes namespace where to deploy
```
Enter Kubernetes namespace where to deploy [housing]: housing
```

- **Namespace:** Name of the Kubernetes namespace where DecentHousing and plot servers will be deployed.
- **Recommended value:** Keep the default `housing` to isolate Housing from other applications on your cluster.
///

/// details | Step 2: Helm release name
```
Enter Helm release name [housing]: housing
```

- **Release Name:** The name of the Helm release for this deployment.
- **Recommended value:** Keep this identical to the namespace above (`housing`).
///

/// details | Step 3: Base domain name
```
Enter base domain name (e.g. your-domain.com): example.com
```

- **Domain:** The root domain under which Housing applications will be exposed.
- **Format:** Set this to your domain name in the format `example.com` (without `www` or any subdomain).
///

/// details | Step 4: Docker Registry subdomain
```
Docker Registry subdomain [registry.example.com]: registry.example.com
```

- **Subdomain:** Subdomain for the Docker Registry application started on your server.
- **Usage:** Used by the cluster to store and pull application component images.
///

/// details | Step 5: MinIO Console subdomain
```
MinIO Console subdomain [housing-minio.example.com]: s3.example.com
```

- **Subdomain:** Subdomain for the MinIO Console web interface.
- **Usage:** Used to access Housing global configuration files, plot template files, localizations and other assets.
///

/// details | Step 6: Housing API subdomain
```
Housing API subdomain [housing-api.example.com]: housing-api.example.com
```

- **Subdomain:** Subdomain used by Housing API service.
- **Usage:** Coordinates crucial operations such as plot allocation, player routing, and lifecycle events.
///

/// details | Step 7: Docker Registry
```
Docker Registry username [housing]: housing
Docker Registry password [2a5jrdI2xzEHKPtx]: 2a5jrdI2xzEHKPtx
Docker Registry port [5050]: 5050
```

- **Username:** Set username for the Docker Registry. You can safely keep the default `housing`.
- **Password:** You can use the automatically generated secure password.
- **Port:** Local port for the Docker Registry on the host machine. Must not be already in use by another service (default: `5050`).
///

/// details | Step 8: Ports configuration
```
=================================================
▶ Housing Setup Wizard
=================================================

▶ Redis configuration
? NodePort to expose Redis on (default: 30379): 30379

▶ RabbitMQ configuration
? NodePort to expose RabbitMQ AMQP on (default: 30672): 30672
? NodePort to expose RabbitMQ Management on (default: 31672): 31672

▶ MinIO configuration
? NodePort to expose MinIO API on (default: 30900): 30900
? NodePort to expose MinIO Console on (default: 30901): 30901

▶ MariaDB configuration
? NodePort to expose MariaDB on (default: 30306): 30306

▶ API configuration
? NodePort to expose API on (default: 30080): 30080
```

During quick installation, Housing automatically configures and deploys these internal services:

- **Redis NodePort:** Cache & messaging coordination between proxies and core (default: `30379`).
- **RabbitMQ NodePorts:** AMQP message broker (default: `30672`) and Management UI (default: `31672`).
- **MinIO NodePorts:** S3 storage API (default: `30900`) and Console Web UI (default: `30901`).
- **MariaDB NodePort:** Relational database for player and plot data (default: `30306`).
- **Housing API NodePort:** Core API service (default: `30080`).

> 💡 **Tip:** Press `Enter` to keep all default NodePorts unless you have specific port collisions on your machine.
///

/// details | Step 9: Plot configuration & Monitoring
```
▶ Plot configuration
? Minecraft version to use for plots (default: 1.20.4): 1.21.10

▶ Monitoring configuration
? Number of free plots to keep (default: 2): 2
? Maximum number of plot servers to run (default: 10): 10
```

- **Minecraft version:** Choose the Paper version for plot servers (e.g. `1.20.4` or `1.21.10`).
- **Free plots to keep:** Number of plot servers to try to keep empty for players to always have somewhere to load new plots on (default: `2`).
- **Maximum plot servers:** Hard limit on the total number of plot servers running at a time (default: `10`).
///

/// details | Step 10: Node access configuration (bare-metal)
```
▶ Node access configuration
# Since this is a bare-metal environment, map node names to external IPs:
? Enter node name (as shown in 'kubectl get nodes') or leave empty to finish: ds1
? Enter IP address or hostname to access this node: 172.17.0.1
? Enter node name (as shown in 'kubectl get nodes') or leave empty to finish:
```

- **Node name:** Enter the node name as displayed in `kubectl get nodes` (e.g. `ds1`).
- **IP address / Hostname:** Reachable external IP address or hostname where player proxies can connect to plot ports on this node.
- **Finish mapping:** Leave empty and press `Enter` once all cluster nodes have been configured.
///

To see all exposed ports and credentials you will need, run the following command:
```bash
./housingctl describe --sensitive
```

After installation, **follow the post-install guide that shows up in your terminal** to finish the installation
and **continue to the [After Installation](#after-installation) guide**.


> 💡 **Tip:** If you need to manually configure reverse proxies or SSL certificates for your subdomains, refer to the [Exposing services at a domain](advanced-install.md#exposing-services-at-a-domain) guide.

---

## After Installation

### Setting up the plot servers

After you have set up the infrastructure and successfully exposed all required ports, you need to set up the plot
servers.

**Open MinIO console URL**

Now, open your MinIO console url (example: https://housing-minio.your-domain.com) and log in using your MinIO credentials you've chosen.

*(Copy them from the summary shown at the end of the setup wizard if you don't remember them)*

![MinIO 1](/assets/images/setup/minio-1.png)

**Copy required plugins and set up your plot server template**

Now navigate to the `housing-server-template` in the navigation bar at the left and open it.

![MinIO 2](/assets/images/setup/minio-2.png)

*This is your space where you will upload assets you want your generated plot servers to have. If you upload any plugins
in the plugins folder, they will be automatically copied to every plot server that is generated.*

> You can use the `housing-server-template` to override any files that are in the server template by default.
> For example, if you want to change the `server.properties` file, you can upload your own `server.properties` file to the `housing-server-template`
> and it will be used instead of the default one.

1. Copy the `Housing-Plot-<version>.jar` plugin from the `plugin/` folder of the archive you received to the `plugins/` folder
in the `housing-server-template`.
2. Copy a **dependency plugins*** to the `plugins/` folder in the `housing-server-template`.

(*) Dependency plugins:

- **FastAsyncWorldEdit**
- **ProtocolLib**
- **PlaceholderAPI**
- **DecentHolograms**

> Note: There is a known issue with newer versions of FastAsyncWorldEdit and/or some other required plugins versions
> on 1.20.4 that they show errors on start (plots use AdvancedSlimePaper). More about this at the end of this guide.

### Changing global configuration

Now if you wanna reach **global `config.global.yml` file** and other configuration files, head to the `housing-resources` bucket
and edit anything you want.

![MinIO 3](/assets/images/setup/minio-3.png)

*(To edit the config files, you need to download them, edit them locally and upload them back.)*

### Connecting your current Minecraft server to the infrastructure

Now, you may be asking, how do we connect our current Minecraft server to the infrastructure we've just set up?
Well, it's simple.

**Connecting your proxy server**

Currently, **the only supported proxy server software is BungeeCord and Velocity**. If you are using any other proxy server software, you will
need to switch to any BungeeCord/Velocity fork or wait for future support.

Steps to connect your proxy server:

1. Copy the `Housing-Proxy-<sw>-<version>.jar` plugin from the `plugin/` folder of the archive you received to the `plugins/` folder
of your proxy server.
2. Restart your proxy server.
3. Fill up the `config.yml` file of the plugin with the connection details to your infrastructure (from `./housingctl describe --sensitive` or `./manage.sh describe --sensitive`).
4. Restart your proxy server again.

**Connecting your Lobby servers**

Steps to connect your lobby servers:

- Copy the `Housing-Lobby-<version>.jar` plugin from the `plugin/` folder of the archive you received to the `plugins/` folder
of all your lobby servers from where you want your players to connect to the Housing.
- Restart your lobby servers.
- Fill up the `config.yml` file of the plugin with the connection details to your infrastructure (from `./housingctl describe --sensitive` or `./manage.sh describe --sensitive`).
- Restart your lobby servers again.

### Setting up permissions

Before you start up plot servers, we recommend you to set up permissions.

In this guide, we will use **LuckPerms** as the permission plugin. If you are using any other permission plugin, please refer to its documentation.

#### Configure LuckPerms server context on plot servers

Before you assign permissions, you need to set up plot servers as a separate *Server Context* (more about LuckPerms contexts [here](https://luckperms.net/wiki/Context)).

**Go to housing-server-template/plugins/LuckPerms/config.yml on your MinIO dashboard and set `server` setting to `housing-plot`.**

Now, set up permissions that may apply only on plot servers like this:

```
/lp group <group> permission set <permission> server=housing-plot
```

#### (Optional) Allow WorldEdit commands on plot servers

Housing has built-in integration with WorldEdit and automatically restricts your players from building outside of their
plots or if they don't have access to it.

So, you can freely allow players WorldEdit permissions on plot servers, but **with the context**.


After that, to allow players to bypass WorldEdit usage on plots that don't have WorldEdit enabled, set this permission
to true: `housing.worldedit.bypass`.

/// details | Example: WorldEdit permissions we set up on our network
    open: False
- worldedit.brush.*
- worldedit.clipboard.*
- worldedit.generation.*
- worldedit.history.*
- worldedit.region.*
- worldedit.selection.*
- fawe.decenthousing
- worldedit.clipboard.load (false)
- worldedit.clipboard.save (false)
- worldedit.replacenear
- worldedit.selection
- worldedit.tool
- worldedit.tool.none
- worldedit.wand
///

### Setting up TAB and scoreboard on plot servers

For full experience, we recommend setting up a TAB & scoreboard plugin on plot servers.

You can do this in the `housing-server-template/plugins/` folder on your MinIO dashboard.

**Recommended:** Set a **suffix in the TAB to placeholder `%plot_role_tag%`** so it shows player's current plot role tag

[Click to show available plot placeholders](../placeholders/index.md#plot-placeholders-plot_)

### Adjusting default economy

Before you release Housing to your players, you may need to adjust some settings for the default Housing economy
that has been created automatically for you during installation.

For example, change **how much money players get per minute by playing Housing** using:
```
/housing admin economy update default --timeRewardRange 5-15
```

For more, refer to the [/housing admin economy](../commands/housing/admin/economy.md) command reference.

### Starting plot servers

Last step is to start the plot servers. You can do that by running the following:

```bash
./housingctl plots start
```

Alternatively, you can also use the `manage.sh` script:

```bash
cd chart/
./manage.sh start-plots
```

If you've configured everything correctly, you should see a success message and in few moments, the plot servers
should be appearing in your BungeeCord server list and your players should be able to connect to open plots.

⚠️ If plots don't become available after a few minutes, or you can't connect to plots, please see a [Troubleshooting](troubleshooting.md) guide
or view plot server logs ([Viewing logs from plot servers](troubleshooting.md#viewing-logs-from-plot-servers)) if there are any plugin
errors.

If everything is working, yippie! 🎉 You have successfully set up DecentHousing infrastructure and connected it to your Minecraft server.


---

## Next Steps

Go to [Security](securing.md) and secure your installation, and then [configure your installation](configuration.md).
