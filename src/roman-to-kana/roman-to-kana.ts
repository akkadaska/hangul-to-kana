import HangulToKanaError from '../hangul-to-kana-error';
import RomanKanaList from './roman-kana-list';

class RomanToKana {
  static convert(roman: string): string {
    const result: string[] = [];
    let pointer = 0;
    while (pointer < roman.length) {
      const [consonant, consonantLength] = RomanKanaList.getConsonant(
        roman.substring(pointer),
      );
      const [vowelIndex, vowelLength] = RomanKanaList.getVowel(
        roman.substring(pointer + consonantLength),
      );
      const kana = RomanKanaList.romanToKanaRule[consonant][vowelIndex];
      result.push(kana);
      if (consonantLength + vowelLength === 0) {
        throw new HangulToKanaError(
          `Invalid roman string. ${roman.substring(
            pointer,
          )} is starts with not roman character.`,
        );
      }
      pointer += consonantLength + vowelLength;
    }
    return result.join('');
  }
}

export default RomanToKana;
