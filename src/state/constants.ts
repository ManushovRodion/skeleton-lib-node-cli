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

export const STATE_MAP_TAGS_FILES: { [key in TagName]: FileName[] } = {
  'name-package': [
    'package.json',
    'bin/cli.js',
    'README.md',
    'docs/README-EN.md',
    'docs/README-RU.md',
  ],
  'NAME-PACKAGE': [
    'README.md',
    'docs/README-EN.md',
    'docs/README-RU.md',
    'CHANGELOG.md',
    'docs/CHANGELOG-EN.md',
    'docs/CHANGELOG-RU.md',
  ],
  'git-repo-domain': ['package.json'],
  'git-repo-dir': ['package.json', 'README.md'],
  'author-repo': ['package.json', 'LICENSE'],
  description: ['package.json', 'docs/README-EN.md', 'docs/README-RU.md'],
};
