import HangulToRoman from '../src/hangul-to-roman';
import InitialConsonant from '../src/hangul-to-roman/initial-consonant';
import Vowel from '../src/hangul-to-roman/vowel';
import FinalConsonant from '../src/hangul-to-roman/final-consonant';
import Hangul from '../src/hangul';
import HangulToKanaError from '../src/hangul-to-kana-error';

describe('HangulToRoman class test', () => {
  it('convert method in HangulToRoman class test', () => {
    const initialConsonantSpy = jest
      .spyOn(InitialConsonant, 'romanize')
      .mockReturnValue('a');
    const vowelSpy = jest.spyOn(Vowel, 'romanize').mockReturnValue('b');
    const finalConsonantSpy = jest
      .spyOn(FinalConsonant, 'romanize')
      .mockReturnValue('c');

    const result = HangulToRoman.convert([
      new Hangul('잘'),
      new Hangul('자'),
      new Hangul('요'),
    ]);
    expect(result).toBe('abcabcabc');
    expect(initialConsonantSpy).toHaveBeenCalledTimes(3);
    expect(vowelSpy).toHaveBeenCalledTimes(3);
    expect(finalConsonantSpy).toHaveBeenCalledTimes(3);
    expect(initialConsonantSpy.mock.calls[0]).toEqual(['ㅈ', '-']);
    expect(vowelSpy.mock.calls[0]).toEqual(['ㅏ']);
    expect(finalConsonantSpy.mock.calls[0]).toEqual(['ㄹ', 'ㅈ']);
    expect(initialConsonantSpy.mock.calls[1]).toEqual(['ㅈ', 'ㄹ']);
    expect(vowelSpy.mock.calls[1]).toEqual(['ㅏ']);
    expect(finalConsonantSpy.mock.calls[1]).toEqual(['_', 'ㅇ']);
    expect(initialConsonantSpy.mock.calls[2]).toEqual(['ㅇ', '_']);
    expect(vowelSpy.mock.calls[2]).toEqual(['ㅛ']);
    expect(finalConsonantSpy.mock.calls[2]).toEqual(['_', '_']);
    initialConsonantSpy.mockRestore();
    vowelSpy.mockRestore();
    finalConsonantSpy.mockRestore();
  });
});

describe('InitialConsonant class test', () => {
  it('get base rule without exceptions rule case', () => {
    const result = InitialConsonant.romanize('ㄲ', '-');
    expect(result).toBe('kk');
  });

  it('get base rule with exceptions rule case', () => {
    const result = InitialConsonant.romanize('ㄱ', 'ㄱ');
    expect(result).toBe('k');
  });

  it('get exceptions rule case', () => {
    const result = InitialConsonant.romanize('ㄱ', '_');
    expect(result).toBe('g');
  });

  it('invalid initial consonant error case', () => {
    expect(() => InitialConsonant.romanize('a', '_')).toThrow(
      HangulToKanaError,
    );
  });
});

describe('Vowel class test', () => {
  it('valid case', () => {
    const result = Vowel.romanize('ㅏ');
    expect(result).toBe('a');
  });

  it('invalid vowel error case', () => {
    expect(() => Vowel.romanize('a')).toThrow(HangulToKanaError);
  });
});

describe('finalConsonant class test', () => {
  it('get base rule without exceptions rule case', () => {
    const result = FinalConsonant.romanize('_', '-');
    expect(result).toBe('');
  });

  it('get base rule with exceptions rule case', () => {
    const result = FinalConsonant.romanize('ㄱ', 'ㄱ');
    expect(result).toBe('k');
  });

  it('get exceptions rule case', () => {
    const result = FinalConsonant.romanize('ㄱ', '_');
    expect(result).toBe('xtu');
  });

  it('invalid initial consonant error case', () => {
    expect(() => FinalConsonant.romanize('a', '_')).toThrow(HangulToKanaError);
  });
});
