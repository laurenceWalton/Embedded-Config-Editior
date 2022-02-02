# embedded-config-editor

This is a web-based application which incorporates the Monaco Editor (the code editor that powers VS Code)
into a Vue CLI along with monaco-yaml which provides rich support for the YAML language.

The vison for this project is to ease the creation and editing process of component configuration for K8s applications and reduce the chance of making configuration mistakes.

- Accessible with a browser, no special client side tooling required.
- Configurable regarding both the source file and schema to mount.
- Rich visual validation feedback conveyed to the user based on the given schema.

## Project setup

```bash
npm install
```

## Build Docker Image and run application in a container

Ensure npm install has been run.

```bash
docker build -t test-container .
docker run -it -p 8008:8080 --rm --name test-container-1 test-container
```

View application at <http://localhost:8008>.

## Compiles and hot-reloads for development

```bash
npm run serve
```

## Compiles and minifies for production

```bash
npm run build
```
