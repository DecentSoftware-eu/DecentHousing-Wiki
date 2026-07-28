---
title: Getting Started
description: Installation & deployment walkthrough
---

---

## Prerequisites

> ⚠️ Note: Since DecentHousing is a full infrastructure, **not a Minecraft plugin**,
> it **cannot be run on a shared hosting environment**. You will need at least a dedicated server to run it.

Before you can use DecentHousing, ensure you have the following:

- At least one **dedicated Linux server** with a min. of **16GB RAM** and **8-CPU cores**.
- **Docker** v29.6.1+ ([Installation Guide](https://docs.docker.com/engine/install/))
- **Kubernetes** v1.28+
- **Helm** v3.17+

Recommended infrastructure requirements:

- A running **MariaDB** instance v10.11+
- A running **Redis** instance v7.0+
- A running **RabbitMQ** instance v3.12+

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
provides some tools under the hood that automatically manage processes like leaderboard auto-refreshing for you.

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

---

## First Installation

When you buy DecentHousing, or download a version, you receive a `.zip` archive containing all the necessary files
associated with that version, along with all configuration files needed to deploy the platform.

### Structure of the received archive

```
Housing-0.0.1.zip
├── apps/ ───────────────────────── [1]
│   ├── meta.json
│   ├── repo-update.sh ──────────── [1.1]
│   ├── version.txt
│   ├── repo.txt
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

### Preparing apps for the first start

To be able to even bootstrap the platform, you need to first build and upload the app components to a Docker Registry
from where the infrastructure will download them.

**Install Docker registry locally**

DecentHousing requires a Docker Registry to store the app components. We'll walk you through the steps to set up
a local registry with our **pre-built template**.

First, download the template [here](/assets/misc/DecentHousing-Registry-Template-0.0.1.zip), unzip it and go to the folder where you unzipped it.

Then, copy the example .env.example file to a new .env file and set a strong credentials that we'll use in the next
sections:

```bash
cp .env.example .env
nano .env
# edit and save the file
```

Now, start the registry by running the following command:

```bash
docker compose up -d
```

**Push apps to the Docker Registry**

Now navigate to the `apps/` folder and run the `repo-login.sh` script to log in to your Docker Registry.
After that, run the `repo-update.sh` script to build and push all the apps to the registry.

```bash
cd apps/
```

(Optional) If you have started up the local Docker Registry somewhere else than `localhost:5050`, you will need to set the registry
address in the `repo.txt` file before running the scripts.

```bash
echo "localhost:5050" >> repo.txt
```

Now after you have started up the registry and set the registry address, run the following commands:

```bash
# set your credentials that you used when starting the registry
./repo-login.sh your-registry-username your-registry-password
./repo-update.sh
```

This log-ins you to the local docker registry and pushes all apps from the apps/ folder to the registry.

**Expose registry at a subdomain**

It is necessary to expose the registry at a subdomain so that the Kubernetes cluster can pull the images from it.
If you skip this step, you will need to set up an unsafe access from the cluster to the registry, which is not recommended.

**Go to the [Exposing services at a domain](configuration/exposing-services.md) guide** and expose the port you've set
for the registry (default: 5050) at a subdomain of your liking (for example registry.example.com).

### Deployment

Now we're finally ready to configure and start DecentHousing. Navigate to the `chart/` folder and run the `setup.sh` script to configure the platform.

```bash
cd chart/
./setup.sh
```

![Setup Wizard](/assets/images/setup/setup-1.png)

Now you enter the setup wizard. There are many configuration options, but in this guide, we will go through the most
common usage scenario.

If you want to learn more about the configuration options, please refer to the [Configuring the infrastructure](configuration/index.md) guide.

Each of the step will be explained here and if you follow this guide, you will have a fully working infrastructure running.

/// details | Setup Wizard full steps walkthrough
    open: True

**Step 1:** `Enter Helm release name`

Your choice: `housing` (default)

*In this step, you can freely choose `housing`, it's not important for the functionality.*

**Step 2:** `Enter Kubernetes namespace where to deploy the infrastructure`

Your choice: `housing`

*In this step, we recommend you to set `housing` to make sure the app does not collide with any other possible apps
on your Kubernetes cluster.*

**Step 3:** `Do you want to create/update a Docker registry image pull secret?`

Your choice: `y`

*Now we need to set up the connection to the Docker Registry we have started earlier.*

**Step 4:** `Registry server URL`

Your choice: `registry.example.com` (the subdomain you set up for the registry)

*In this step, you need to set the subdomain you have set up for the registry. If you have not set up a subdomain yet,
go to the [Exposing services at a domain](configuration/exposing-services.md) guide and set up a subdomain for the registry.*

**Step 5:** `Enter registry username`

Your choice: `your-registry-username` (the username you set up for the registry)

*In this step, you need to set the username you have set up for the docker registry earlier.*

**Step 6:** `Enter registry password or token`

Your choice: `your-registry-password` (the password you set up for the registry)

*In this step, you need to set the password you have set up for the docker registry earlier.*

**Step 7:** `Use internal Redis?`

Your choice: `n`

*In this step, you can choose to use an internal Redis instance or an external one. If you have an external Redis instance
running (which we suppose), choose `n` and set the connection details in the next steps. If you choose `y`, you will need
to expose the port of the internal Redis to your proxy server (BungeeCord) using the
[Exposing services at a domain](configuration/exposing-services.md) guide.*

**Step 8:** `Redis host`

Your choice: `123.456.789.123` (the host/IP of your Redis instance)

*In this step, you need to set the host/IP of your Redis instance.*

**Step 9:** `Redis port`

Your choice: `6379` (the port of your Redis instance)

**Step 10:** `Redis username`

Your choice: `your-redis-username` (the username of your Redis instance, or enter if you don't have one)

*In this step, you need to set the username of your Redis instance, or leave it empty if you don't have one.*

**Step 11:** `Redis password`

Your choice: `your-redis-password` (the password of your Redis instance, or enter if you don't have one)

*In this step, you need to set the password of your Redis instance, or leave it empty if you don't have one.*

**Step 12:** `Use internal RabbitMQ?`

Your choice: `n`

*In this step, you can choose to use an internal RabbitMQ instance or an external one. If you have an external RabbitMQ instance
running (which we suppose), choose `n` and set the connection details in the next steps. If you choose `y`, you will need to expose the port of the internal RabbitMQ to your proxy server (BungeeCord) using the
[Exposing services at a domain](configuration/exposing-services.md) guide.*

**Step 13:** `RabbitMQ host`

Your choice: `123.456.789.123` (the host/IP of your RabbitMQ instance)

*In this step, you need to set the host/IP of your RabbitMQ instance.*

**Step 14:** `RabbitMQ port`

Your choice: `5672` (the port of your RabbitMQ instance)

*In this step, you need to set the port of your RabbitMQ instance.*

**Step 15:** `RabbitMQ username`

Your choice: `your-rabbitmq-username` (the username of your RabbitMQ instance)

*In this step, you need to set the username of your RabbitMQ instance.*

**Step 16:** `RabbitMQ password`

Your choice: `your-rabbitmq-password` (the password of your RabbitMQ instance)

*In this step, you need to set the password of your RabbitMQ instance.*

**Step 17:** `RabbitMQ virtual host`

Your choice: `/` (the virtual host of your RabbitMQ instance)

*In this step, you need to set the virtual host of your RabbitMQ instance.*

**Step 18:** `Use internal MinIO?`

Your choice: `y`

*In this step, you can choose to use an internal MinIO instance or an external one. Now, we will use the internal MinIO instance,
so you can have one instance of MinIO just for housing.*

**Step 19:** `MinIO access key`

Your choice: `your-minio-access-key` (choose access key of your MinIO instance. for example: `admin`)

**Step 20:** `Expose MinIO via Ingress?`

Your choice: `n`

*In this step, you can choose to expose the internal MinIO instance via Ingress. If you choose `y`, you will need to
set up an Ingress controller on your Kubernetes cluster and configure it to expose the MinIO service. Choose no, so we
can expose the MinIO service via a NodePort in the next step.*

**Step 21:** `Expose MinIO via NodePort?`

Your choice: `y`

*In this step, you can choose to expose the internal MinIO instance via NodePort. If you choose `y`, you will need to
set up the port exposal, which we will do in the next step. If you choose `n`, the service won't be exposed at all.*

**Step 22:** `NodePort to expose MinIO API on`

Your choice: `30900` (default)

*In this step, you can choose the NodePort to expose the internal MinIO API instance. The default is `30900`, which is a good choice.
If you have already a service running on this port, you need to pick a port from the 30000–32767 range.*

**After setup, expose the port you've chose (30900) to a subdomain (for example s3-api.example.com by following
[Exposing services at a domain](configuration/exposing-services.md) guide.**

**Step 23:** `NodePort to expose MinIO Console on`

Your choice: `30901` (default)

*In this step, you can choose the NodePort to expose the internal MinIO Console instance. The default is `30901`, which is a good choice.
If you have already a service running on this port, you need to pick a port from the 30000–32767 range.*

**After setup, expose the port you've chose (30901) to a subdomain (for example s3-console.example.com by following
[Exposing services at a domain](configuration/exposing-services.md) guide.**

**Step 24:** `Use internal MariaDB?`

Your choice: `n`

*In this step, you can choose to use an internal MariaDB instance or an external one. If you have an external MariaDB instance
running (which we suppose), choose `n` and set the connection details in the next steps. If you choose `y`, you will need to expose the port of the internal MariaDB to your proxy server (BungeeCord) using the
[Exposing services at a domain](configuration/exposing-services.md) guide.*

**Step 25:** `Database URL`

Your choice: `mysql://mariadb-username:mariadb-password@mariadb-host:3306/housing` (database connection url)

Format: `mysql://<username>:<password>@<host>:<port>/<database>`

*Set up connection to your MariaDB instance using Database URL.*

**Step 26:** `API key`

Your choice: `<generated>` (default)

*A safe API key for api server will be auto-generated for you. Use that.*

**Step 27:** `Expose API via Ingress?`

Your choice: `n`

*In this step, you can choose to expose the API instance via Ingress. If you choose `y`, you will need to
set up an Ingress controller on your Kubernetes cluster and configure it to expose the API service. Choose no, so we
can expose the API service via a NodePort in the next step.*

**Step 28:** `Expose API via NodePort?`

Your choice: `y`

*In this step, you can choose to expose the API instance via NodePort. If you choose `y`, you will need to
set up the port exposal, which we will do in the next step. If you choose `n`, the service won't be exposed at all.*

**Step 29:** `NodePort to expose API on`

Your choice: `30080` (default)

*In this step, you can choose the NodePort to expose the API instance. The default is `30080`, which is a good choice.
If you have already a service running on this port, you need to pick a port from the 30000–32767 range.*

**After setup, expose the port you've chose (30080) to a subdomain (for example housing-api.example.com by following
[Exposing services at a domain](configuration/exposing-services.md) guide.**

**Step 30:** `Enter core image tag (required)`

Your choice: `<housing-version>` (housing version you've downloaded)

*Now you are prompted to enter the image tag that will be used for all core services when downloading from your
docker registry. For example, if you downloaded `Housing-0.0.1.zip`, you will input `0.0.1` here.*

**Step 31:** `Minecraft version to use for plots`

Your choice: `<compatible-minecraft-version>` (a compatible version for your plots, example: 1.20.4)

*Now you pick a Minecraft version that will be used for generating plot servers. Pick only one that is supported.
If you choose unsupported version, the plot servers won't start.*

**Known supported versions:**

- 1.20.4

**Step 32:** `Number of free plots to keep`

Your choice: `3` (number of plots to keep without plot loaded)

*This number here means that the Housing will try its best to keep this amount of plot servers without a plot loaded
on for players switching plots to always have a server to load target plots on. It's important that you think
about this number as it may vary depending on your player count and intensity of players switching servers. This
can be later re-configured. More about re-configuring values in the [Configuring the infrastructure](configuration/configuring-the-infrastructure.md) section.*

**Step 33:** `Minimum number of plot servers to keep running`

Your choice: `3` (min. number of plot servers to keep even if they are not occupied)

*This is a number of plot servers that will be guaranteed to be existing on your cluster no matter what. It is smart
to set this to the same number as the `Number of free plots to keep` number so it syncs with the default behavior.*

**Step 34:** `Maximum number of plot servers to run`

Your choice: `15` (max. number of plot server that are allowed to be existing at once in the cluster)

*This number sets strict limits for number of your plot servers. Set this to a number that you assure that you
never exceed your resources limits on your nodes/machines.*

**Step 35:** `Is this a bare-metal environment without cloud autoscaling?`

Your choice: `y`

*In most cases, you set yes since you are running on your own dedicated servers. This may be disabled only if you
are running in cloud environment, which wasn't even tested yet.*

**Step 36:** `Enter node name (as shown in 'kubectl get nodes') or leave empty to finish`

Your choice: `<node-name>` (node name from /kubectl get nodes)

Now, we will need to set up every machine that you are currently running Housing on. Since we are on a fresh
installation, we will input only this machine for now. When prompted, open a new console terminal and type:

```bash
kubectl get nodes
```
```
root@ds1 ~ # kubectl get nodes
NAME   STATUS   ROLES    AGE    VERSION
ds1    Ready    <none>   174d   v1.32.13 # ds1 is your node name
```

Input the first name.

**Step 37:** `Enter IP address or hostname to access this node`

Your choice: `<ip-of-your-machine>` (ip of your machine you are setting this on, example: 123.456.789.123)

*Here, you need to input the IP address of the previously picked node. Since we picked this node/machine, we need to
input this machine's IP.*

**Step 38:**

Just enter to skip adding second machine.

**Step 39:** `Start plot servers immediately after this setup? (not recommended on first setup)`

Your choice: `n`

*As the prompt suggests, you shouldn't start the plot servers yet since we don9t have set up plugins, etc.*

**Step 40:** `Deploy immediately after this setup?`

Your choice: `y`

*Yes, you want to deploy immediately.*

///

Now the setup starts deploying the infrastructure. If this shows up, you did well:
```
=================================================
▶ Deploying 'housing' into namespace 'housing'
=================================================
Release "housing" does not exist. Installing it now.
NAME: housing
LAST DEPLOYED: Mon Jul 27 01:35:44 2026
NAMESPACE: housing
STATUS: deployed
REVISION: 1
TEST SUITE: None

✔ Deployed/Upgraded
```

At the end, the setup shows a large overview of everything that was deployed.
**Now it's your turn to expose all ports you were asked to expose in this setup using the
[Exposing services at a domain](configuration/exposing-services.md) guide.**

### Setting up the plot servers

After you have set up the infrastructure and successfully exposed all required ports, you need to set up the plot
servers.

**Open MinIO console URL**

Now, open your MinIO console url (example: https://s3-console.example.com) and log in using your MinIO credentials you've chosen.

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

### Setting up Housing before first start

Now if you wanna reach **global `config.global.yml` file** and other configuration files, head to the `housing-resources` bucket
and edit anything you want.

![MinIO 3](/assets/images/setup/minio-3.png)

*(To edit the config files, you need to download them, edit them locally and upload them back.)*

### Connecting your current Minecraft server to the infrastructure

Now, you may be asking, how do we connect our current Minecraft server to the infrastructure we've just set up?
Well, it's simple.

**Connecting your proxy server**

Currently, **the only supported proxy server software is BungeeCord**. If you are using any other proxy server software, you will
need to switch to any BungeeCord fork or wait for future support. (which is planned)

Steps to connect your proxy server:

1. Copy the `Housing-Proxy-<version>.jar` plugin from the `plugin/` folder of the archive you received to the `plugins/` folder
of your proxy server.
2. Restart your proxy server.
3. Fill up the `config.yml` file of the plugin with the connection details to your infrastructure.
4. Restart your proxy server again.

**Connecting you Lobby servers**

Steps to connect your lobby servers:

- Copy the `Housing-Lobby-<version>.jar` plugin from the `plugin/` folder of the archive you received to the `plugins/` folder
of all your lobby servers from where you want your players to connect to the Housing.
- Restart your lobby servers.
- Fill up the `config.yml` file of the plugin with the connection details to your infrastructure.
- Restart your lobby servers again.

### Start plot servers

Last step is to start the plot servers. You can do that by running the following:

```bash
cd chart/
./manage.sh start-plots
```

If you've configured everything correctly, you should see a success message and in few moments, the plot servers
should be appearing in your BungeeCord server list and your players should be able to connect to open plots.

---

## Common mistakes and troubleshooting

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

To resolve this issue, you need to change the configured IP address. Follow the [Changing configuration provided in the wizard]() guide
to change this in `values-produced.yaml` file:

```
controller:
  bareMetalEnvironment:
    enabled: true
    nodeExternalAddressMappings:
      ds1: "123.456.789.123"   # <- Change this to the correct (accessible from proxy) IP address of your machine
```

---

## Configuring the infrastructure

This section covers the most common configuration flows you may need.

TODO

### Changing .global files

### Changing configuration provided in the wizard

The setup wizard introduced in the [First Installation](#first-installation) section generates a `values-produced.yaml` file
that contains just some of the possible configuration that you may want to set up. If you want to change some of the values,
you need to follow this section to do it properly.

Files of infrastructure configuration:

- `chart/values.yaml` - contains (all, and) the default configuration values.
- `chart/values-produced.yaml` - contains the configuration generated by the setup wizard. You can change values here, but
  please be aware that if you run the `setup.sh` script again, this file will be overwritten and your changes will be lost.
  Values here overwrite the values in the `values.yaml` file.

There are 2 situations:

- The configuration you want to change is **not in the `values-produced.yaml` file**.
- The configuration you want to change is there.

In the first case, you need to add it in the `values-produced.yaml` file. In the second case, you can
change it directly in the `values-produced.yaml` file.

After you edit your settings, you need to **redeploy the infrastructure**. If you've already run the wizard, you
can do it by running the `manage.sh` script in the `chart/` folder:

```bash
cd chart/
./manage.sh deploy
```

---

## Securing the infrastructure

---

## Updating to a newer version

---

## Exposing services at a domain

If any of the sections referred here, you may need to publish a service under a sub-domain. This section will
try to explain you how to do that using `Nginx` as a reverse proxy.

### Exposing a port

If you are already familiar with how to do that, just publish the port on a sub-domain of your liking and skip this section.

> ⚠️ Note (for advanced users): If you are referred to this section from `Deployment` section, the port will be exposed on **every**
> machine you add in the future, so please consider using an ``Ingress`` option that DecentHousing setup script provides.
> In that case, you may need to be familiar with how to set up an Ingress controller on your Kubernetes cluster.

**Prerequisites**

- **Nginx** server running on a machine that exposes the port ([Installation Guide](https://ubuntu.com/tutorials/install-and-configure-nginx))
- **Certbot** installed on the machine
- **A domain name** (this example will use `example.com` as the domain name and `s3` as the subdomain)
- **A port to expose on the machine**

**Install Certbot** (if you don't have it already)

```bash
sudo apt install certbot python3-certbot-nginx -y
```

**Point subdomain to the machine's IP**

First step is to point a subdomain to the machine's IP address. You can do that by creating an `A` record in your
domain's DNS settings.

```
# s3.example.com

A     s3     123.456.789.123
```

**Configure Nginx to bind the port on the subdomain**

Create the configuration file and fill it with the proper config:

```bash
sudo tee /etc/nginx/sites-available/s3.example.com > /dev/null <<'EOF'
server {
    listen 80;
    server_name s3.example.com; # change this to your subdomain

    client_max_body_size 0;

    location / {
        proxy_pass http://localhost:9001; # change this to the port you want to expose
        proxy_set_header Host $http_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
EOF
```

Activate the configuration:

```bash
sudo ln -s /etc/nginx/sites-available/s3.example.com /etc/nginx/sites-enabled/s3.example.com
# test the configuration for syntax errors
sudo nginx -t
# restart nginx to apply the changes
sudo systemctl reload nginx
```

Create an SSL certificate for the subdomain using Certbot:

```bash
sudo certbot --nginx -d s3.example.com
```

Aand that's it! 🔥 You should now be able to access the service on the subdomain you configured.

> Is your service HTTP? Test that you are able to access the service by opening a browser and navigating to `https://s3.example.com`.

---

## Next Steps