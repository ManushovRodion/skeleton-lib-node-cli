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

npx skeleton-lib-node-cli -r DIR_PROJECT -l en
```

| Опция   | Алис | Тип      | По умолчанию | Описание                                                                                                                     |
| ------- | ---- | -------- | ------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| -lang   | -l   | en \| ru | ru           | На каком языке должен быть UI cli                                                                                            |
| -result | -r   | string   | ---          | Путь, куда выгрузить скелет библиотеки. Если не задан параметр -result, то выгружается в папку из значения тега name-project |

## # Лицензия

[MIT](./../LICENSE)
