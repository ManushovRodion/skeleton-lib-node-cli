import { get} from 'lodash';

import { Lang } from '../type';

import ru from './ru.json';
import en from './en.json';

export default function lang(lang: Lang) {
  const json = lang === 'en' ? en : ru;

  return {
    t: (path: string) => {
      return get(json, path, path);
    },
  };
}
