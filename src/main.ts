import { moveSync, removeSync } from 'fs-extra';
import { exec } from 'child_process';

import * as message from './message';
import createOptions from './createOptions';
import createTranslate from './createTranslate';
import createTerminal, { QuestionKey } from './createTerminal';
import createProcessReplace, {
  MapTagsValues,
  FileKey,
} from './createProcessReplace';
import { STATE_IGNORE_FILES } from './state/constants';

export async function cli(process: NodeJS.Process) {
  const opt = createOptions(process);
  const translate = createTranslate(opt.lang);
  const hr = '-'.repeat(30);

  /**
   * RUN TERMINAL
   */

  const terminal = createTerminal(translate);
  const mapTagsValues: MapTagsValues = {} as MapTagsValues;

  for (const questionLey in terminal.questions) {
    const question = terminal.questions[questionLey as QuestionKey];
    await question.process();

    mapTagsValues[question.getKey()] = question.getValue();
  }

  terminal.actions.close();

  /**
   * RUN COMMAND
   */
  console.log(hr);

  message.messageInfo(
    `${translate.get('info.gitRepoDownload')}: ${opt.git.repo}`
  );

  removeSync(opt.dir.template);

  const command = `git clone ${opt.git.repo} ${opt.dir.template}`;
  exec(command, (error, stdout, stderr) => {
    if (error) {
      message.messageError(translate.get('error.gitRepoDownload'));
      process.exit(0);
    }

    if (!stderr) {
      process.exit(0);
    }

    STATE_IGNORE_FILES.forEach((name) => {
      removeSync(`${opt.dir.template}/${name}`);
    });

    message.messageSuccess(translate.get('success.gitRepoDownload'));

    /**
     * RUN REPLACE
     */
    console.log(hr);

    message.messageInfo(`${translate.get('info.processReplace')}`);

    const processReplace = createProcessReplace(opt, translate);
    processReplace.actions.setMapTags(mapTagsValues);

    for (const fileKey in processReplace.processFiles) {
      const processFile = processReplace.processFiles[fileKey as FileKey];
      processFile.process();
    }

    message.messageSuccess(`${translate.get('success.processReplace')}`);

    /**
     * RUN MOVE
     */
    console.log(hr);

    message.messageInfo(`${translate.get('info.moveSceleton')}`);

    const resultDir =
      opt.dir.result ||
      `${opt.dir.root}/${terminal.questions['name-package'].getValue()}`;

    removeSync(resultDir);
    moveSync(opt.dir.template, resultDir);

    message.messageSuccess(`${translate.get('success.moveSceleton')}`);
  });
}
