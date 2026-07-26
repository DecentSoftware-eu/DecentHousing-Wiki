---
title: Getting Started
description: Installation & deployment walkthrough
---

## Pre-requisites

> ⚠️ Note: Since DecentHousing is a full infrastructure, **not a Minecraft plugin**,
> it **cannot be run on a shared hosting environment**. You will need at least a dedicated server to run it.

Before you can use DecentHousing, ensure you have the following:

- At least one **dedicated Linux server** with a min. of **16GB RAM** and **8-CPU cores**.
- **Docker** v29.6.1+ ([Installation Guide](https://docs.docker.com/engine/install/))
- **Kubernetes** v1.28+
- **Helm** v3.17+

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

### Docker Installation

For installing docker, we recommend the [official Docker installation guide](https://docs.docker.com/engine/install/).

### Kubernetes & Helm Installation

Housing's infrastructure is powered by Kubernetes, which dramatically simplifies the complexity and
provides some tools under the hood that automatically manage processes like leaderboard auto-refresh for you.

**Install Kubernetes**

For production, we recommend **MicroK8s**, which is a lightweight, very easy-to-install Kubernetes distribution.

Installation guide: [here](https://canonical.com/microk8s#install-microk8s).

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

## First Install

When you buy DecentHousing, or download a version, you receive a `.zip` archive containing all the necessary files
associated with that version, along with all configuration files needed to deploy the platform.

### Structure of the received archive

```
Housing-0.0.1.zip
├── apps/ ───────────────────────── [1]
│   ├── meta.json
│   ├── repo-update.sh ──────────── [1.1]
│   ├── version.txt
│   ├── api/
│   ├── k8s-controller/
│   ├── k8s-metrics-exporter/
│   └── plot/
├── chart/ ──────────────────────── [2]
│   ├── manage.sh ───────────────── [2.1]
│   ├── setup.sh ────────────────── [2.2]
│   └── housing/
├── plugin/ ─────────────────────── [3]
│   ├── Housing-Lobby-0.0.1.jar
│   ├── Housing-Plot-0.0.1.jar
│   └── Housing-Proxy-0.0.1.jar
└── README.txt
```

| ID            | Brief Description             | Detailed Description                                                                                                               |
|:--------------|:------------------------------|:-----------------------------------------------------------------------------------------------------------------------------------|
| **`[1]`**     | Application components.       | This folder contains the source code and configurations for all the individual backend components that power the housing platform. |
| **`[1.1]`**   | Code update utility.          | A helper script used to retrieve and apply the latest updates for the housing application components.                              |
| **`[2]`**     | Infrastructure configuration. | Configuration blueprints & scripts for infastructure management.                                                                   |
| **`[2.1]`**   | Deployment manager.           | A tool for managing the deployed infrastructure.                                                                                   |
| **`[2.2]`**   | Installation script.          | Initial setup script.                                                                                                              |
| **`[3]`**     | Minecraft plugins.            | Contains the compiled plugins ready to be loaded and run on your Minecraft servers.                                                |

### Preparing apps for first start

To be able to even bootstrap the platform, you need to first build and upload the app components to a Docker Registry
from where the infrastructure will download them.

**Install Docker registry locally**

Now, we will walk you through the simplest way to do this, by running your own local Docker Registry on the same server.

TODO

### Deployment

## Configuration

## Updating to a newer version

## Next Steps