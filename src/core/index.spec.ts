import { getArgv } from './index';

describe('index', () => {
  test('return no argv', () => {
    expect(getArgv('')).toBe('no argv');
  });

  test('return 1', () => {
    expect(getArgv('1')).toBe('1');
  });
});
