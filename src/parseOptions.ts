import { Lang } from './translate';

export default function parseOptions(process: NodeJS.Process) {
  const argv = process.argv.slice(2);

  let lang: Lang = 'ru';
  const indexLang = argv.findIndex((a) => a === '-lang');

  if (
    indexLang > -1 &&
    argv[indexLang + 1] &&
    ['ru', 'en'].includes(argv[indexLang + 1].toLowerCase())
  ) {
    lang = argv[indexLang + 1].toLowerCase() as Lang;
  }

  let result = '';
  const indexResult = argv.findIndex((a) => a === '-result');
  if (indexResult > -1 && argv[indexResult + 1]) {
    result = (argv[indexResult + 1] || '').toLowerCase();
  }

  const template = '.skeleton-lib-node';
  const root = process.cwd();

  return {
    lang,
    git: {
      repo: `https://github.com/ManushovRodion/skeleton-lib-node.git`,
      command: 'git clone',
    },
    dir: {
      root,
      template: `${root}/${template}`,
      result: `${root}/${result}`,
    },
  };
}
