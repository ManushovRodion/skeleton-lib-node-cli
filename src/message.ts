import { reset, fgRed } from 'console-text-styles';

export function messageError(text: string) {
  const prefix = `${fgRed}error${reset}`;
  console.log(`${prefix}: ${text}`);
}
