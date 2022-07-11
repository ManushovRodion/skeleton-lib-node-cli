import { Lang } from './createTranslate';
import { STATE_DEFAULT_OPTIONS } from './state/constants';

type OptionsGit = {
  repo: string;
};

type OptionsDirectory = {
  root: string;
  template: string;
  result: string;
};

export type Options = {
  lang: Lang;
  dir: OptionsDirectory;
  git: OptionsGit;
};

function findOptions<T extends string>(
  argv: string[],
  name: string[],
  callable?: (param: T) => boolean
) {
  const index = argv.findIndex((value) => name.includes(value));
  if (index < 0) return;

  const param: T = (argv[index + 1] || '').toLowerCase() as T;
  if (!param) return;

  const is = callable ? callable : () => true;
  if (!is(param)) return;

  return param;
}

export default function createOptions(process: NodeJS.Process): Options {
  const argv = process.argv.slice(2);
  const root = process.cwd();

  const lang = findOptions<Lang>(argv, ['-lang', '-l'], (param: string) =>
    ['ru', 'en'].includes(param)
  );

  const result = findOptions(argv, ['-result', '-r']);

  return {
    lang: lang || (STATE_DEFAULT_OPTIONS.lang as Lang),
    dir: {
      result: result ? `${root}/${result}` : '',
      template: `${root}/${STATE_DEFAULT_OPTIONS.dirTemplateName}`,
      root,
    },
    git: {
      repo: STATE_DEFAULT_OPTIONS.gitRepo,
    },
  };
}
