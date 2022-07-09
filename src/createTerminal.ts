import { createInterface } from 'node:readline';
import { reset, fgCyan } from 'console-text-styles';

import { STATE_MAP_TAGS_TRANSLATE } from './state/constants';
import { TagName } from './state/types';
import { Translate } from './createTranslate';

export type QuestionKey = TagName;

export type Question = {
  getValue: () => string;
  getKey: () => QuestionKey;
  process: () => Promise<boolean>;
};

export type Questions = { [key in QuestionKey]: Question };

export default function createTerminal(translate: Translate) {
  const { stdin: input, stdout: output } = process;
  const readline = createInterface({ input, output });

  const questionValue: { [key in QuestionKey]?: string } = {};
  const questionText: { [key in QuestionKey]?: string } = {};
  const questionsList = { ...STATE_MAP_TAGS_TRANSLATE };

  let questions: Questions = {} as Questions;
  for (const name in questionsList) {
    const questionKey = name as QuestionKey;
    questionValue[questionKey] = '';
    questionText[questionKey] = questionsList[questionKey];

    const handleReadLine = (): Promise<string> => {
      const text = translate.get(questionText[questionKey] || '');
      const label = `${fgCyan}${text}${reset} (${questionKey}): `;

      return new Promise((resolve) =>
        readline.question(label, (input) => resolve(String(input).trim()))
      );
    };

    const process = async () => {
      while (!questionValue[questionKey]) {
        if (questionValue[questionKey]) break;

        questionValue[questionKey] = await handleReadLine();
      }

      return true;
    };

    const getValue = () => questionValue[questionKey] || '';
    const getKey = () => questionKey;

    questions[questionKey] = {
      getValue,
      getKey,
      process,
    };
  }

  return {
    questions,
    actions: {
      close: () => readline.close(),
    },
  };
}
