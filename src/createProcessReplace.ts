import { readdirSync, readFileSync, statSync, writeFileSync } from 'fs-extra';

import { Options } from './createOptions';
import { Translate } from './createTranslate';
import { STATE_MAP_FILES_TAGS } from './state/constants';
import { FileName, TagName } from './state/types';

export type FileKey = string;

export type ProcessFile = {
  process: () => void;
};
export type ProcessFiles = { [key in FileKey]: ProcessFile };

export type MapTagsValues = { [key in TagName]: string };

function getFilesByDirectory(directory: string) {
  const filesAndDirectory = readdirSync(directory);

  return filesAndDirectory.reduce<string[]>((files, fileName) => {
    const context = `${directory}/${fileName}`;
    const isDirectory = statSync(context).isDirectory();

    if (!isDirectory) {
      files.push(context);
      return files;
    }

    files = [...files, ...getFilesByDirectory(context)];
    return files;
  }, []);
}

export default function createProcessReplace(
  options: Options,
  translate: Translate
) {
  const fileNames = getFilesByDirectory(options.dir.template);

  if (!fileNames.length) {
    throw new Error(translate.get('error.noFiles'));
  }

  let mapsTags: MapTagsValues;
  const setMapTags = (context: MapTagsValues) => {
    mapsTags = context;
  };

  let processFiles: ProcessFiles = {} as ProcessFiles;
  fileNames.forEach((fileName) => {
    const name = fileName.replace(`${options.dir.template}/`, '') as FileName;
    const tagsByFile = STATE_MAP_FILES_TAGS[name];

    const process = () => {
      if (!tagsByFile?.length) return;

      const file = readFileSync(fileName);
      if (!file) return;

      let fileContext = file.toString('utf-8');

      tagsByFile.forEach((tagName) => {
        const regExp = new RegExp(`{${tagName}}`, 'g');

        fileContext = fileContext.replace(regExp, mapsTags[tagName]);
      });

      writeFileSync(fileName, fileContext, 'utf-8');
    };

    processFiles[fileName] = {
      process,
    };
  });

  return {
    processFiles,
    actions: {
      setMapTags,
    },
  };
}
