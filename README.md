# A Fullstack App running in Rio


## Goals

This is to demonstrate how to use actions to build a new docker container and then deploy an app on rio.

Goals

* Demonstrate an automated workflow with as few moving pieces to setup outside of code.

* Demonstrate a working NodeJS Express server

* Demonstrate a working build process for something like React.

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

When you are ready to deploy you need to build an image and then push it to dockerhub.com

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



## Removing an App

__Warning there is a known issue with running `rio up` where you can not use `rio rm <appname>` to remove an app.__

The best way to fix is to remove the service from the Riofile.