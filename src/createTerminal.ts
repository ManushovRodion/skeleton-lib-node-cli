import { createInterface } from 'node:readline';
import { reset, fgCyan, bgBlue } from 'console-text-styles';

import { STATE_MAP_MASKS_TRANSLATE } from './state/constants';
import { TagName } from './state/types';
import { Translate } from './createTranslate';

export type QuestionKey = TagName;

export type Question = {
  getValue: () => string;
  setValue: (value: string) => void;
  getKey: () => QuestionKey;
  process: (placeholder?: string) => Promise<boolean>;
};

export type Questions = { [key in QuestionKey]: Question };

export default function createTerminal(translate: Translate) {
  const { stdin: input, stdout: output } = process;
  const readline = createInterface({ input, output });

  const questionValue: { [key in QuestionKey]?: string } = {};
  const questionText: { [key in QuestionKey]?: string } = {};
  const questionsList = { ...STATE_MAP_MASKS_TRANSLATE };

  let questions: Questions = {} as Questions;
  for (const name in questionsList) {
    const questionKey = name as QuestionKey;
    questionValue[questionKey] = '';
    questionText[questionKey] = questionsList[questionKey];

    const handleReadLine = (placeholder?: string): Promise<string> => {
      const text = translate.get(questionText[questionKey] || '');
      const placeholderText = placeholder
        ? `(${fgCyan}${placeholder}${reset})`
        : '';
      const questionKeyText = `[${bgBlue} ${questionKey} ${reset}]`;
      const label = `${questionKeyText} ${text}: ${placeholderText}`;

      return new Promise((resolve) =>
        readline.question(label, (input) => resolve(String(input).trim()))
      );
    };

    const process = async (placeholder?: string) => {
      do {
        const value =
          (await handleReadLine(placeholder)) || questionValue[questionKey];
        questionValue[questionKey] = value;
      } while (!questionValue[questionKey]);

      return true;
    };

    const getValue = () => questionValue[questionKey] || '';
    const setValue = (value: string) => (questionValue[questionKey] = value);
    const getKey = () => questionKey;

    questions[questionKey] = {
      getValue,
      setValue,
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
