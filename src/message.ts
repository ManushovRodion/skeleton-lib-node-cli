import { reset, fgRed, fgBlue, fgGreen } from 'console-text-styles';

export function messageError(text: string) {
  const prefix = `${fgRed}error${reset}`;
  console.log(`${prefix}: ${text}`);
}

export function messageInfo(text: string) {
  const prefix = `${fgBlue}info${reset}`;
  console.log(`${prefix}: ${text}`);
}

export function messageSuccess(text: string) {
  const prefix = `${fgGreen}success${reset}`;
  console.log(`${prefix}: ${text}`);
}
