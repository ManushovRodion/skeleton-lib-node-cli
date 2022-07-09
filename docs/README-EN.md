### readme: [Home](./../README.md) | [RU](./README-RU.md)

# SKELETON-LIB-NODE-CLI

> Command line interface that invokes skeleton libraries based on [skeleton-lib-node](https://github.com/ManushovRodion/skeleton-lib-node)

## # Install

```sh
npx skeleton-lib-node-cli
```

The cli also has optional parameters:

```sh
npx skeleton-lib-node-cli -lang en

npx skeleton-lib-node-cli -result DIR_PROJECT

npx skeleton-lib-node-cli -result DIR_PROJECT -lang en
```

| Option  | Type     | Default | Description                                   |
| ------- | -------- | ------- | --------------------------------------------- |
| -lang   | en \| ru | ru      | What language should the UI cli be in?        |
| -result | string   | ---     | The path where to unload the library skeleton |

## # License

[MIT](./../LICENSE)
