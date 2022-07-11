import { exec } from 'child_process';
import { Translate } from './createTranslate';

export default function createCommand(translate: Translate) {
  const run = (command: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
        if (error) {
          reject(translate.get('error.gitRepoDownload'));
        } else {
          resolve(stderr);
        }
      });
    });
  };

  return {
    run,
  };
}
