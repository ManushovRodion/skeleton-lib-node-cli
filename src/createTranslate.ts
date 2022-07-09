import { get } from 'lodash';

import ru from './state/lang/ru.json';
import en from './state/lang/en.json';

export type Lang = 'ru' | 'en';

export type Translate = {
  get: (path: string) => string
}

export default function createTranslate(lang: Lang): Translate {
  const json = lang === 'en' ? en : ru;

  return {
    get: (path: string) => get(json, path, path),
  };
}
