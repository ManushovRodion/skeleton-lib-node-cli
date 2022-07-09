import _lang from './lang';
import { Lang } from './type';

export default function createDefaultTags(lang: Lang) {
  const t = _lang(lang).t;

  return {
    'name-package': {
      tag: 'name-package',
      value: '',
      title: t('title.namePackageLower'),
      files: [
        'package.json',
        'bin/cli.js',
        'README.md',
        'docs/README-EN.md',
        'docs/README-RU.md',
      ],
    },
    'NAME-PACKAGE': {
      tag: 'NAME-PACKAGE',
      value: '',
      title: t('title.namePackageUpper'),
      files: [
        'docs/CHANGELOG-EN.md',
        'docs/CHANGELOG-RU.md',
        'docs/README-EN.md',
        'docs/README-RU.md',
        'CHANGELOG.md',
        'README.md',
      ],
    },
    'git-repo-domain': {
      tag: 'git-repo-domain',
      value: '',
      title: t('title.gitRepoDomain'),
      files: ['package.json'],
    },
    'git-repo-dir': {
      tag: 'git-repo-dir',
      value: '',
      title: t('title.gitRepoDir'),
      files: ['package.json', 'README.md'],
    },
    'author-repo': {
      tag: 'author-repo',
      value: '',
      title: t('title.authorRepo'),
      files: ['package.json', 'LICENSE'],
    },
    description: {
      tag: 'description',
      value: '',
      title: t('title.description'),
      files: ['package.json', 'docs/README-EN.md', 'docs/README-RU.md'],
    },
  };
}
