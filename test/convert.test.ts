import Converter from '../src/converter';
import Hangul from '../src/hangul';
import HangulToRoman from '../src/hangul-to-roman';
import RomanToKana from '../src/roman-to-kana';

describe('Convert class test', () => {
  it('convert method', () => {
    const hangulToRomanSpy = jest
      .spyOn(HangulToRoman, 'convert')
      .mockReturnValue('roman');
    const romanToKanaSpy = jest
      .spyOn(RomanToKana, 'convert')
      .mockReturnValue('kana');

    const hangul = [new Hangul('잘'), new Hangul('자')];
    const result = Converter.convert(hangul);
    expect(result).toBe('kana');
    expect(hangulToRomanSpy).toHaveBeenCalledTimes(1);
    expect(hangulToRomanSpy).toHaveBeenCalledWith(hangul);
    expect(romanToKanaSpy).toHaveBeenCalledTimes(1);
    expect(romanToKanaSpy).toHaveBeenCalledWith('roman');
    hangulToRomanSpy.mockRestore();
    romanToKanaSpy.mockRestore();
  });
});
