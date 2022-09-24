import Hangul from './hangul';
import HangulToRoman from './hangul-to-roman';
import RomanToKana from './roman-to-kana/roman-to-kana';

class Converter {
  static convert(hangul: Hangul[]): string {
    const roman = HangulToRoman.convert(hangul);
    const kana = RomanToKana.convert(roman);
    return kana;
  }
}

export default Converter;
