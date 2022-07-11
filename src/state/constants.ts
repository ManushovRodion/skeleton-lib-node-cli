import { FileName, TagName } from './types';

export const STATE_IGNORE_FILES = [
  '.git',
  'README-DEVELOP.md',
  'docs/README-DEVELOP-RU.md',
  'docs/README-DEVELOP-EN.md',
];

export const STATE_MAP_TAGS_TRANSLATE: { [key in TagName]: string } = {
  'name-package': 'title.namePackageLower',
  'NAME-PACKAGE': 'title.namePackageUpper',
  'description-package': 'title.descriptionPackage',
  author: 'title.author',
  'url-repository': 'title.urlRepository',
  'url-issues': 'title.urlIssues',
  'url-home': 'title.urlHome',
  copyright: 'title.copyright',
};

export const STATE_MAP_FILES_TAGS: { [key in FileName]: TagName[] } = {
  'package.json': [
    'name-package',
    'description-package',
    'url-repository',
    'url-issues',
    'url-home',
    'author',
  ],
  'bin/cli.js': ['name-package'],
  LICENSE: ['copyright'],
  'README.md': ['NAME-PACKAGE'],
  'docs/README-RU.md': ['name-package', 'NAME-PACKAGE', 'description-package'],
  'docs/README-EN.md': ['name-package', 'NAME-PACKAGE', 'description-package'],
  'CHANGELOG.md': ['NAME-PACKAGE'],
  'docs/CHANGELOG-RU.md': ['NAME-PACKAGE'],
  'docs/CHANGELOG-EN.md': ['NAME-PACKAGE'],
};

export const STATE_DEFAULT_OPTIONS = {
  lang: 'ru',
  gitRepo: 'https://github.com/ManushovRodion/skeleton-lib-node.git',
  dirTemplateName: '.skeleton-lib-node',
};
