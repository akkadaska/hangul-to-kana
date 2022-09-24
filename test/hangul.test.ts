import Hangul from '../src/hangul';
import HangulToKanaError from '../src/hangul-to-kana-error';

describe('hangul case', () => {
  it('first hangul: 가', () => {
    const hangul = new Hangul('가');
    expect(hangul.getChar()).toBe('가');
    expect(hangul.getInitialConsonant()).toBe('ㄱ');
    expect(hangul.getVowel()).toBe('ㅏ');
    expect(hangul.getFinalConsonant()).toBe('_');
  });
  it('last hangul: 힣', () => {
    const hangul = new Hangul('힣');
    expect(hangul.getChar()).toBe('힣');
    expect(hangul.getInitialConsonant()).toBe('ㅎ');
    expect(hangul.getVowel()).toBe('ㅣ');
    expect(hangul.getFinalConsonant()).toBe('ㅎ');
  });
});

describe('not hangul case', () => {
  it('Lower border: "\\uABFF"', () => {
    expect(() => new Hangul('\uABFF')).toThrow(HangulToKanaError);
  });
  it('Upper border: "\\uD7A4"', () => {
    expect(() => new Hangul('\uD7A4')).toThrow(HangulToKanaError);
  });
});
