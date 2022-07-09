import { get } from 'lodash';

import ru from './state/lang/ru.json';
import en from './state/lang/en.json';

export type Lang = 'ru' | 'en';

export default function translate(lang: Lang) {
  const json = lang === 'en' ? en : ru;

  return {
    get: (path: string) => get(json, path, path),
  };
}
