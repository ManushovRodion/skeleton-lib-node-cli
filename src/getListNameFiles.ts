import { readdirSync, statSync } from 'fs-extra';

export default function getListNameFiles(dir: string) {
  const files = readdirSync(dir);

  return Object.values(files).reduce<string[]>((res, name) => {
    if (name === '.git') return res;

    const fullName = `${dir}/${name}`;

    if (!statSync(fullName).isDirectory()) {
      res.push(fullName);
    } else {
      res = [...res, ...getListNameFiles(fullName)];
    }

    return res;
  }, []);
}
