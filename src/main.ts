import { removeSync, readFileSync, writeFileSync, moveSync } from 'fs-extra';
import { exec } from 'child_process';
import { createInterface } from 'readline';

import parseOptions from './parseOptions';
import lang from './lang';
import { messageError } from './message';
import getListNameFiles from './getListNameFiles';
import createDefaultTags from './createDefaultTags';

export function cli(process: NodeJS.Process) {
  const opt = parseOptions(process);
  const command = `${opt.git.command} ${opt.git.repo} ${opt.dir.template}`;
  const t = lang(opt.lang).t;
  const tags = createDefaultTags(opt.lang);

  removeSync(opt.dir.template);
  removeSync(opt.dir.result);

  exec(command, async (error, stdout, stderr) => {
    if (error) {
      messageError(`${t('error.gitClone')}: ${opt.git.repo}`);
      return;
    }

    if (!stderr) {
      return;
    }

    const files = getListNameFiles(opt.dir.template);
    if (!files.length) {
      // ...
    }

    const readline = createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const handleReadline = (text: string): Promise<string> =>
      new Promise((resolve) =>
        readline.question(text, (input) => resolve(input))
      );

    tags['name-package'].value = await handleReadline(
      `${tags['name-package'].title}: `
    );

    tags['NAME-PACKAGE'].value = await handleReadline(
      `${tags['NAME-PACKAGE'].title}: `
    );

    tags.description.value = await handleReadline(
      `${tags.description.title}: `
    );

    tags['author-repo'].value = await handleReadline(
      `${tags['author-repo'].title}: `
    );

    tags['git-repo-domain'].value = await handleReadline(
      `${tags['git-repo-domain'].title}: `
    );

    tags['git-repo-dir'].value = await handleReadline(
      `${tags['git-repo-dir'].title}: `
    );

    readline.close();

    const mapFilesReplace = Object.values(tags);

    files.forEach((fullName) => {
      const name = fullName.replace(`${opt.dir.template}/`, '');

      const mapFinds = mapFilesReplace.filter((v) => v.files.includes(name));

      mapFinds.forEach((mapFind) => {
        const fileContext = readFileSync(fullName);
        if (!fileContext) return;

        const regExp = new RegExp(`{${mapFind.tag}}`, 'g');
        const newFileContext = fileContext
          .toString('utf8')
          .replace(regExp, mapFind.value);
        writeFileSync(fullName, newFileContext, 'utf8');
      });
    });

    [
      '.git',
      'README-DEVELOP.md',
      'docs/README-DEVELOP-RU.md',
      'docs/README-DEVELOP-EN.md',
    ].forEach((name) => {
      removeSync(`${opt.dir.template}/${name}`);
    });
    moveSync(opt.dir.template, opt.dir.result);
  });
}
