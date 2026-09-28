---
title: Security
description: How to secure the DecentHousing infrastructure
---

## Securing the infrastructure

We won't go much into the details of security as it depends on your specific infrastructure.

However, we highly recommend **hiding all your exposed ports behind a firewall and communicate through your internal network**
between your servers. We won't take any responsibility for your misconfigured infrastructure and the consequences of it.

> Tip: If you run `./housingctl describe` command on your machine, you can see all exposed ports.

## Some useful resources

- [Kubernetes NodePort and iptables rules](https://ronaknathani.com/blog/2020/07/kubernetes-nodeport-and-iptables-rules/)
- [How to secure your Kubernetes cluster](https://kubernetes.io/docs/tasks/administer-cluster/securing-a-cluster/)