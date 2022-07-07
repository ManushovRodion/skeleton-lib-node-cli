export function getArgv(text: string) {
  return text || 'no argv'
}

export function message(text: string) {
  console.log(getArgv(text));
}
