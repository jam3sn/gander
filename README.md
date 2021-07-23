# Gander (WIP)

A clean and simple web dashboard to monitor multiple [Glances](https://nicolargo.github.io/glances/) instances.

![image](https://user-images.githubusercontent.com/7646700/126823747-13bb5b73-0631-4eee-b209-c7856594bba4.png)

## How to use

Make sure you have an instance of Glances running, with it's web server enabled - used for the API. [Docs here](https://glances.readthedocs.io/en/latest/quickstart.html#web-server-mode)

Create a host.yaml file to mount with your glances hosts:
```
web-app:
  label: Fancy Web App
  ip: 10.0.0.2
  port: 61208
  ssl: false
```

### Docker

```
docker run -d --restart="always" -p 8080:8080  -v hosts.yaml:/hosts.yaml --name gander docker.io/jam3sn/gander
```

### Docker Compose

```
version: "3"

services: 
  gander:
    image: jam3sn/gander
    container_name: gander
    ports: 
      - '8080:8080'
    volumes: 
      - './hosts.yaml:/hosts.yaml'
    restart: unless-stopped
```
