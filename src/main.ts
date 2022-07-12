import { moveSync, removeSync } from 'fs-extra';

import * as message from './message';
import { STATE_IGNORE_FILES } from './state/constants';

import createOptions from './createOptions';
import createTranslate from './createTranslate';
import createCommand from './createCommand';
import createTerminal, { QuestionKey } from './createTerminal';
import createProcessReplace, {
  MapMasksValues,
  FileKey,
} from './createProcessReplace';

export async function cli(process: NodeJS.Process) {
  const opt = createOptions(process);
  const translate = createTranslate(opt.lang);
  const hr = '-'.repeat(30);

  /**
   * RUN TERMINAL
   */

  const terminal = createTerminal(translate);
  const mapMasksValues: MapMasksValues = {} as MapMasksValues;

  for (const questionLey in terminal.questions) {
    const question = terminal.questions[questionLey as QuestionKey];
    let value = '';

    switch (question.getKey()) {
      case 'NAME-PACKAGE': {
        value = terminal.questions['name-package'].getValue().toUpperCase();
        break;
      }
      case 'url-issues': {
        value = `${terminal.questions['url-repository'].getValue()}/issues`;
        break;
      }
      case 'url-home': {
        value = terminal.questions['url-repository'].getValue();
        break;
      }
      case 'description-package': {
        value = '...';
        break;
      }
      case 'copyright': {
        const year = new Date().getFullYear();
        value = `${year} ${terminal.questions['author'].getValue()}`;
        break;
      }
    }

    question.setValue(value);

    if (await question.process(value)) {
      mapMasksValues[question.getKey()] = question.getValue();
    }
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

  const command = createCommand(translate);
  if (!(await command.run(`git clone ${opt.git.repo} ${opt.dir.template}`))) {
    return;
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
  processReplace.actions.setMapMasks(mapMasksValues);

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
}
