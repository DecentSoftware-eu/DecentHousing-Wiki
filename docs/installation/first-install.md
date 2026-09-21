---
title: First Installation
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

## Installation

When you buy DecentHousing, or download a version, you receive a `.zip` archive containing all the necessary files
associated with that version, along with all configuration files needed to deploy the platform.

/// details | Structure of the received archive
    open: False
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
///

Before you do anything else, create a folder where you want your Housing configuration to be stored:

```bash
mkdir housing
cd housing/
```

Now create a directory for the archive contents and unzip the archive into it:

```bash
mkdir system
cd system/
unzip /path/to/Housing-<version>.zip .
```

### Preparing apps for the first start

To be able to even bootstrap the platform, you need to first build and upload the app components to a Docker Registry
from where the infrastructure will download them.

**Install Docker registry locally**

DecentHousing requires a Docker Registry to store the app components. We'll walk you through the steps to set up
a local registry with our **pre-built template**.

**Download the template:** [here](/assets/misc/DecentHousing-Registry-Template-0.0.1.zip). 

Unzip it and go to the folder where you unzipped it.

```bash
mkdir ../registry
cd ../registry
unzip /path/to/DecentHousing-Registry-Template-<version>.zip .
```

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

**Expose registry at a subdomain**

It is necessary to expose the registry at a subdomain so that the Kubernetes cluster can pull the images from it.
If you skip this step, you will need to set up an unsafe access from the cluster to the registry, which is not recommended.

**Go to the [Exposing services at a domain](#exposing-services-at-a-domain) guide and expose the port you've set
for the registry (default: 5050) at a subdomain of your liking (for example registry.your-domain.com).**

→ Domain: registry.your-domain.com

→ Port: 5050 (default)

**Push apps to the Docker Registry**

```bash
cd ../system/apps/
```

Put the repo address to the `repo.txt` file before running the scripts.

```bash
echo "registry.your-domain.com" > repo.txt
```

> Note: the subdomain you put here is the one you set up for the registry in the previous step.

Now after you have started up the registry and set the registry address, run the following commands:

```bash
# install jq if you don't have it yet
sudo apt install jq -y
# set your credentials that you used when starting the registry
./repo-login.sh your-registry-username your-registry-password
# push the version to the registry
./repo-update.sh
```

> Note: your-registry-username and your-registry-password are the credentials you set in the .env file of the registry template.

This log-ins you to the local docker registry and pushes all apps from the apps/ folder to the registry.

### Deployment

Now we're finally ready to configure and start DecentHousing. Navigate to the `chart/` folder and run the `setup.sh` script to configure the platform.

```bash
cd ../chart/
# create kubernetes namespace first
kubectl create namespace housing
./setup.sh
```

![Setup Wizard](/assets/images/setup/setup-1.png)

Now you enter the setup wizard. There are many configuration options, but in this guide, we will go through the most
common usage scenario.

Each of the step will be explained here and if you **follow this guide**, you will have a fully working infrastructure running.

/// details | Setup Wizard full steps walkthrough
    open: False

**Step 1:** `Enter Helm release name`

Your choice: `housing` (default)

*In this step, you can freely choose `housing`, it's not important for the functionality.*

**Step 2:** `Enter Kubernetes namespace where to deploy the infrastructure`

Your choice: `housing`

*In this step, we recommend you to set `housing` to make sure the app does not collide with any other possible apps
on your Kubernetes cluster.*

**Step 3:** `Registry server URL`

Your choice: `registry.your-domain.com` (the subdomain you set up for the registry above)

**Step 4:** `Enter registry username`

Your choice: `your-registry-username` (the username you set up for the registry)

*In this step, you need to set the username you have set up for the docker registry earlier.*

**Step 5:** `Enter registry password or token`

Your choice: `your-registry-password` (the password you set up for the registry)

*In this step, you need to set the password you have set up for the docker registry earlier.*

**Step 6:** `Use internal Redis?`

Your choice: `y`

*In this step, you can choose to use an internal Redis instance or an external one. If you have an external Redis instance
running, choose `n` and set the connection details in the next steps.*

**Step 7:** `Expose Redis via Ingress?`

Your choice: `n`

**Step 8:** `Expose Redis via NodePort?`

Your choice: `y`

**Step 9:** `NodePort to expose Redis on`

Your choice: `30379` (default)

Now, you need to set the port the Housing Redis will listen on your machine(s). This port should be properly secured behind
firewall.

**Step 10:** `Use internal RabbitMQ?`

Your choice: `y`

*In this step, you can choose to use an internal RabbitMQ instance or an external one. If you have an external RabbitMQ instance
running, choose `n` and set the connection details in the next steps.*

**Step 11:** `RabbitMQ username`

Your choice: `housing` (default)

*In this step, you need to set the username of your RabbitMQ instance.*

**Step 12:** `RabbitMQ virtual host`

Your choice: `/` (default)

*In this step, you need to set the virtual host of your RabbitMQ instance.*

**Step 13:** `Expose RabbitMQ Management via Ingress?`

Your choice: `n`

**Step 14:** `Expose RabbitMQ via NodePort?`

Your choice: `y`

**Step 15:** `NodePort to expose RabbitMQ AMQP on`

Your choice: `30672` (default)

Now, you need to set the port the Housing RabbitMQ will listen on your machine(s). This port should be properly secured behind
firewall.

**Step 16:** `NodePort to expose RabbitMQ Management on`

Your choice: `31672` (default)

**Step 17:** `Use internal MinIO?`

Your choice: `y`

*In this step, you can choose to use an internal MinIO instance or an external one. Now, we will use the internal MinIO instance,
so you can have one instance of MinIO just for housing.*

**Step 18:** `MinIO access key`

Your choice: `your-minio-access-key` (choose access key of your MinIO instance. for example: `admin`)

**Step 19:** `Expose MinIO via Ingress?`

Your choice: `n`

*In this step, you can choose to expose the internal MinIO instance via Ingress. If you choose `y`, you will need to
set up an Ingress controller on your Kubernetes cluster and configure it to expose the MinIO service. Choose no, so we
can expose the MinIO service via a NodePort in the next step.*

**Step 20:** `Expose MinIO via NodePort?`

Your choice: `y`

*In this step, you can choose to expose the internal MinIO instance via NodePort. If you choose `y`, you will need to
set up the port exposal, which we will do in the next step. If you choose `n`, the service won't be exposed at all.*

**Step 21:** `NodePort to expose MinIO API on`

Your choice: `30900` (default)

*In this step, you can choose the NodePort to expose the internal MinIO API instance. The default is `30900`, which is a good choice.
If you have already a service running on this port, you need to pick a port from the 30000–32767 range.*

**Step 22:** `NodePort to expose MinIO Console on`

Your choice: `30901` (default)

*In this step, you can choose the NodePort to expose the internal MinIO Console instance. The default is `30901`, which is a good choice.
If you have already a service running on this port, you need to pick a port from the 30000–32767 range.*

**Step 23:** `Use internal MariaDB?`

Your choice: `y`

*In this step, you can choose to use an internal MariaDB instance or an external one. If you have an external MariaDB instance
running, choose `n` and set the connection details in the next steps.*

**Step 24:** `MariaDB username`

Your choice: `housing` (default)

**Step 25:** `MariaDB password`

Your choice: `<generated>` (default)

*A safe password for MariaDB will be auto-generated for you. Use that.*

**Step 26:** `Expose MariaDB via Ingress?`

Your choice: `n`

**Step 27:** `Expose MariaDB via NodePort?`

Your choice: `y`

**Step 28:** `NodePort to expose MariaDB on`

Your choice: `30306` (default)

**Step 29:** `API key`

Your choice: `<generated>` (default)

**Step 30:** `Expose API via Ingress?`

Your choice: `n`

*In this step, you can choose to expose the API instance via Ingress. If you choose `y`, you will need to
set up an Ingress controller on your Kubernetes cluster and configure it to expose the API service. Choose no, so we
can expose the API service via a NodePort in the next step.*

**Step 31:** `Expose API via NodePort?`

Your choice: `y`

*In this step, you can choose to expose the API instance via NodePort. If you choose `y`, you will need to
set up the port exposal, which we will do in the next step. If you choose `n`, the service won't be exposed at all.*

**Step 32:** `NodePort to expose API on`

Your choice: `30080` (default)

*In this step, you can choose the NodePort to expose the API instance. The default is `30080`, which is a good choice.
If you have already a service running on this port, you need to pick a port from the 30000–32767 range.*

**Step 33:** `Enter core image tag (required)`

Your choice: `<housing-version>` (housing version you've downloaded)

*Now you are prompted to enter the image tag that will be used for all core services when downloading from your
docker registry. For example, if you downloaded `Housing-0.0.1.zip`, you will input `0.0.1` here.*

**Step 34:** `Minecraft version to use for plots`

Your choice: `<compatible-minecraft-version>` (a [compatible version](#supported-mc-versions) for your plots, example: 1.20.4)

*Now you pick a Minecraft version that will be used for generating plot servers. Pick only one that is [supported](#supported-mc-versions).
If you choose unsupported version, the plot servers won't start.*

You will need to download correct plugins that support this Minecraft version in the next steps since
plot servers will start with this Minecraft version.

**Step 35:** `Number of free plots to keep`

Your choice: `3` (number of plots to keep without plot loaded)

*This number here means that the Housing will try its best to keep this amount of plot servers without a plot loaded
on for players switching plots to always have a server to load target plots on. It's important that you think
about this number as it may vary depending on your player count and intensity of players switching servers. This
can be later re-configured. More about re-configuring values in the [Configuring the infrastructure](configuration.md) section.*

**Step 36:** `Minimum number of plot servers to keep running`

Your choice: `3` (min. number of plot servers to keep even if they are not occupied)

*This is a number of plot servers that will be guaranteed to be existing on your cluster no matter what. It is smart
to set this to the same number as the `Number of free plots to keep` number so it syncs with the default behavior.*

**Step 37:** `Maximum number of plot servers to run`

Your choice: `15` (max. number of plot server that are allowed to be existing at once in the cluster)

*This number sets strict limits for number of your plot servers. Set this to a number that you assure that you
never exceed your resources limits on your nodes/machines.*

**Step 38:** `Is this a bare-metal environment without cloud autoscaling?`

Your choice: `y`

*In most cases, you set yes since you are running on your own dedicated servers. This may be disabled only if you
are running in cloud environment, which wasn't even tested yet.*

**Step 39:** `Enter node name (as shown in 'kubectl get nodes') or leave empty to finish`

Your choice: `<node-name>` (node name from /kubectl get nodes)

Now, we will need to set up every machine that you are currently running Housing on. Since we are on a fresh
installation, we will input only this machine for now. When prompted, **open a new console terminal and type**:

```bash
kubectl get nodes
```
```
root@ds1 ~ # kubectl get nodes
NAME   STATUS   ROLES    AGE    VERSION
ds1    Ready    <none>   174d   v1.32.13 # ds1 is your node name
```

Input the first name.

**Step 40:** `Enter IP address or hostname to access this node`

Your choice: `<ip-of-your-machine>` (ip of your machine you are setting this on, example: 123.456.789.123)

*Here, you need to input the IP address of the previously picked node. Since we picked this node/machine, we need to
input this machine's IP.*

> Note: The IP address you input here will be the one your proxy server (Bungee/Velocity) will use to register servers,
> so you don't have to input machine's public IP address if you have your internal network set up properly. In that
> case, you can input the internal IP proxy can access this node on.

**Step 41:**

Just enter to skip adding second machine.

**Step 42:** `Start plot servers immediately after this setup? (not recommended on first setup)`

Your choice: `n`

*As the prompt suggests, you shouldn't start the plot servers yet since we don't have set up plugins, etc.*

**Step 43:** `Deploy immediately after this setup?`

Your choice: `n`

*No, you don't want to deploy immediately, yet.*

///

At the end, the setup shows a large overview of everything that was deployed. You can always show it again using
the `manage.sh` script:

```bash
./manage.sh describe --sensitive
```

**Set subdomain for MinIO**

Domain: housing-minio.your-domain.com

Port: 30901 (default)

Guide: [Exposing a port with websocket support](#exposing-a-port-with-websocket-support)

**Secure the infrastructure**

Exposed ports are listed in the `./manage.sh describe` output.
We don't take any responsibility for your misconfigured infrastructure or security.

Guide: [Security](securing.md)

**Start up the infrastructure**

After you have properly secured every port and subdomain, run this:
```bash
./manage.sh deploy
```

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

All services are running now based on your configuration. You are now ready to move to the next step.

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
3. Fill up the `config.yml` file of the plugin with the connection details to your infrastructure.
4. Restart your proxy server again.

**Connecting your Lobby servers**

Steps to connect your lobby servers:

- Copy the `Housing-Lobby-<version>.jar` plugin from the `plugin/` folder of the archive you received to the `plugins/` folder
of all your lobby servers from where you want your players to connect to the Housing.
- Restart your lobby servers.
- Fill up the `config.yml` file of the plugin with the connection details to your infrastructure.
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

## Exposing services at a domain

If any of the sections referred here, you may need to publish a service under a sub-domain. This section will
try to explain you how to do that using `Nginx` as a reverse proxy.

### Exposing a port

If you are already familiar with how to do that, just publish the port on a sub-domain of your liking and skip this section.

> ⚠️ Note (for advanced users): If you are referred to this section from `Deployment` section, the port will be exposed on **every**
> machine you add in the future, so please consider using an `Ingress` option that DecentHousing setup script provides.
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

### Exposing a port with websocket support

If a guide referred here, that means you need to expose a service with websocket support.

Please follow a guide at [Exposing a port](#exposing-a-port), but **use this Nginx configuration instead of the one in the guide**:

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
        
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_http_version 1.1;
    }
}
EOF
```

As you can see, it's the same as the previous configuration, but with added lines in the `location /` block.

---

## Next Steps

Now you've successfully completed the first installation, you can proceed to configure, secure, update or troubleshoot:
- [Configuring the infrastructure](configuration.md)
- [Securing the infrastructure](securing.md)
- [Updating](updating.md)
- [Troubleshooting](troubleshooting.md)

