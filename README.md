# A Fullstack App running in Rio

This is an example to demonstrate how to use rio and actions to build a new docker container and then deploy an app on k8s.

## Goals

* Demonstrate a 12 factor workflow with as few moving pieces to setup outside of code.

* Demonstrate a working NodeJS Express server.

* Demonstrate a working build process and artifacts for a front-end with something like React.

* Demonstrate how to get the app running and deployed in a production like environment.

* Demonstrate how to easily re-deploy and perform rolling updates.

## Overview

You must have a k8s cluster as well as rio installed. I would recommend using RKS and Rio.

Once you have that setup you can containerize your application and then deploy it using docker commands and rio commands at the cli.

You can also trigger the project's `Riofile` to be watched for automatic re-deploys.

I have intentionally not set this up, as I want to automate the deployment stage with GitHub Actions.

TODO: Figure out the best way to trigger deployments from actions, instead of cli

## Environment Variables

You can pass environment variables to your application from the `Riofile` or you can pass secrets using k8s secrets by doing the following:

```
$ kubectl create secret generic rio-test-message --from-literal=CUSTOM_MSG="A new message from a Secret" --from-literal=password='some-secret-password'
```

Then in your rio file:
```sh
    env: # Specify environment variable
    - CUSTOM_MSG=secret://rio-test-message/CUSTOM_MSG
    - PASSWORD=secret://rio-test-message/password
    - NODE_ENV=production
```

## Building the Docker Image

When you are ready to deploy you need to build an image and then push it to [dockerhub]().

```
$ docker build -t hello-rio:latest
```

```
$ docker push michaelerobertsjr/hello-rio:latest
```

## Deploying to k8s using Rio

Using the Riofile you can trigger a deployment with:

```
$ rio up
```

Then confirm the app is up using:

```
$ rio ps
```

---

## Deploying using `rio run`

Setup docker registry auth. Here is an example of how to setup docker registry.

```sh
$ rio secret add --docker
Select namespace[default]: $(put the same namespace with your workload)
Registry url[]: https://index.docker.io/v1/
username[]: $(your_docker_hub_username)
password[]: $(password)
```

Then you will be able to pull an image and run it. You can also set environment variables:

```
$ rio run -p 3000/http --env APP_VERSION=2.0 --image-pull-secrets=dockerconfig-pull michaelerobertsjr/hello-rio:latest
```

or from a file:

```
rio run -p 3000/http --env-file=.env --image-pull-secrets=dockerconfig-pull michaelerobertsjr/hello-rio:latest
```

## Removing an App

__Warning there is a known issue with running `rio up` where you can not use `rio rm <appname>` to remove an app.__

The best way to fix is to remove the service from the Riofile.