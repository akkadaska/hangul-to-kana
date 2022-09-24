import HangulToKanaError from '../src/hangul-to-kana-error';
import RomanToKana from '../src/roman-to-kana';
import RomanKanaList from '../src/roman-to-kana/roman-kana-list';

describe('RomanToKana class test', () => {
  const getConsonantSpy = jest.spyOn(RomanKanaList, 'getConsonant');
  const getVowelSpy = jest.spyOn(RomanKanaList, 'getVowel');
  it('convert method convert successfully test', () => {
    const result = RomanToKana.convert('kyakkik');
    expect(result).toBe('キャッキク');
    expect(getConsonantSpy).toHaveBeenCalledTimes(3);
    expect(getVowelSpy).toHaveBeenCalledTimes(3);
    expect(getConsonantSpy.mock.calls[0]).toEqual(['kyakkik']);
    expect(getVowelSpy.mock.calls[0]).toEqual(['yakkik']);
    expect(getConsonantSpy.mock.calls[1]).toEqual(['kkik']);
    expect(getVowelSpy.mock.calls[1]).toEqual(['ik']);
    expect(getConsonantSpy.mock.calls[2]).toEqual(['k']);
    expect(getVowelSpy.mock.calls[2]).toEqual(['']);
  });

  it('convert method invalid roman error test', () => {
    expect(() => RomanToKana.convert('あいうえお')).toThrow(HangulToKanaError);
  });
});
