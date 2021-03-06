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

npx skeleton-lib-node-cli -r DIR_PROJECT -l en
```

| Option  | Aliase | Type     | Default | Description                                                                                                                                                  |
| ------- | ------ | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| -lang   | -l     | en \| ru | ru      | What language should the UI cli be in?                                                                                                                       |
| -result | -r     | string   | ---     | The path where to unload the library skeleton. If the -result parameter is not set, then it is uploaded to the folder from the value of the name-project tag |

## # License

[MIT](./../LICENSE)
