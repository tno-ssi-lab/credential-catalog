# Credential Catalog Demonstrator

(NOT IMPLEMENTED YET: Current master version is available on [Gitlab Pages](https://ssi-lab.cred-cat.gitlab-dv.tno.nl/credential-catalogue-ckan).)

This is the Vue.js project for the Credential Catalog demonstrator.

The project is run using Docker with docker-compose.

## Docker setup

After installing Docker and docker-compose, the project is easily
started in development mode using*:

```bash
docker-compose up
```

*Note the install dependencies below!

### Install dependencies

Since we use a volume to mount the local app to the `/app` dir on the
docker container, we need to have a local copy of all the node
dependencies or else the `docker-compose up` command will fail. This
is fixed by running the following command:

```bash
docker-compose run app yarn install
```

## Tools

- For syntax-highlighting, install the
  [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur)
  plugin for VSCode.
- The code in this project is formatted using
  [prettier](https://prettier.io/). There is also a [VSCode extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
  for formatting on save.
- For developing a Vue.js app, using the [Vue.js devtools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  is highly recommended.
- For dependency management, we use [yarn](https://yarnpkg.com/lang/en/).
  This is automatically included in the Docker image.

## Manual setup

```bash
yarn install
```

### Compiles and hot-reloads for development

```bash
yarn serve
```

### Compiles and minifies for production

```bash
yarn build
```

### Lints and fixes files

```bash
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
