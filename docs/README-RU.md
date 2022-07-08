### readme: [Главная](./../README.md) | [EN](./README-EN.md)

# SKELETON-LIB-NODE-CLI

> Интерфейс командной строки, который инициализирует скелет библиотеки, на базе [skeleton-lib-node](https://github.com/ManushovRodion/skeleton-lib-node)

## # Установка

```sh
npx skeleton-lib-node-cli
```

Так же у cli есть не обязательные параметры:

```sh
npx skeleton-lib-node-cli -lang en

npx skeleton-lib-node-cli -result DIR_PROJECT

npx skeleton-lib-node-cli -result DIR_PROJECT -lang en
```

| Опция   | Тип      | По умолчанию | Описание                               |
| ------- | -------- | ------------ | -------------------------------------- |
| -lang   | en \| ru | ru           | На каком языке должен быть UI cli      |
| -result | string   | ---          | Путь, куда выгрузить скелет библиотеки |

## # Лицензия

[MIT](./../LICENSE)
