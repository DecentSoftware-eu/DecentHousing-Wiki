---
title: Updating
description: How to update DecentHousing to a newer version
---

Updating Housing is quite simple.

> **Note:** Before updating, make sure to backup your current installation, data and configuration files.
> This will help you restore your setup in case anything goes wrong during the update process.

## 1. Updating infrastructure

When you download a new version of DecentHousing, you get a `.zip` file. If you already have an existing installation,
all you need to do is copy the zip file anywhere on you machine and run the housingctl command to update your installation:
```bash
./housingctl update /path/to/DecentHousing-<new-version>.zip
```

## 2. Verify your version has been updated

Now, verify that your installation has been updated to the new version by running:
```bash
./housingctl describe
```

You should see the new version at the top of the output:
![Updated version](/assets/images/setup/update-describe-2.png)

## 3. Updating plugins

Next, you need to update your Housing Plot jars on your plot servers.

Navigate to your MinIO dashboard (e.g. `https://minio.example.com`) and **replace the old plot jar in the
`housing-server-template/plugins` bucket with the new one from the zip file at `plugin/DecentHousing-Plot-<new-version>.jar`**.

Also, **replace the `DecentHousing-Lobby-<new-version>.jar` on all your lobby servers**.

## 4. Starting plot servers again

In the default configuration, the update command stops all plot servers, so you need to start them up again:
```bash
./housingctl plots start
```