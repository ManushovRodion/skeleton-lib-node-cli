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
  'git-repo-domain': 'title.gitRepoDomain',
  'git-repo-dir': 'title.gitRepoDir',
  'author-repo': 'title.authorRepo',
  description: 'title.description',
};

export const STATE_MAP_FILES_TAGS: { [key in FileName]: TagName[] } = {
  'package.json': [
    'name-package',
    'git-repo-domain',
    'git-repo-dir',
    'author-repo',
    'description',
  ],
  'bin/cli.js': ['name-package'],
  LICENSE: ['author-repo'],
  'README.md': ['name-package', 'NAME-PACKAGE', 'git-repo-dir'],
  'docs/README-RU.md': ['name-package', 'NAME-PACKAGE', 'description'],
  'docs/README-EN.md': ['name-package', 'NAME-PACKAGE', 'description'],
  'CHANGELOG.md': ['NAME-PACKAGE'],
  'docs/CHANGELOG-RU.md': ['NAME-PACKAGE'],
  'docs/CHANGELOG-EN.md': ['NAME-PACKAGE'],
};

export const STATE_DEFAULT_OPTIONS = {
  lang: 'ru',
  gitRepo: 'https://github.com/ManushovRodion/skeleton-lib-node.git',
  dirTemplateName: '.skeleton-lib-node',
};
