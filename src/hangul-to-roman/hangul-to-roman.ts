import Hangul from '../hangul';
import FinalConsonant from './final-consonant';
import InitialConsonant from './initial-consonant';
import Vowel from './vowel';

class HangulToRoman {
  static convert(hangul: Hangul[]): string {
    const result: string[] = [];
    for (let i = 0; i < hangul.length; i++) {
      const roman = this.convertOneChar(
        i - 1 >= 0 ? hangul[i - 1] : null,
        hangul[i],
        i + 1 < hangul.length ? hangul[i + 1] : null,
      );
      result.push(roman);
    }
    return result.join('');
  }

  private static convertOneChar(
    prevHangul: Hangul | null,
    targetHangul: Hangul,
    nextHangul: Hangul | null,
  ): string {
    const roman: string[] = [];
    const prevHangulFinalConsonant = prevHangul
      ? prevHangul.getFinalConsonant()
      : '-';
    const initialConsonant = InitialConsonant.romanize(
      targetHangul.getInitialConsonant(),
      prevHangulFinalConsonant,
    );
    roman.push(initialConsonant);

    const vowel = Vowel.romanize(targetHangul.getVowel());
    roman.push(vowel);

    const nextHangulInitialConsonant = nextHangul
      ? nextHangul.getInitialConsonant()
      : '_';
    const finalConsonant = FinalConsonant.romanize(
      targetHangul.getFinalConsonant(),
      nextHangulInitialConsonant,
    );
    roman.push(finalConsonant);

    return roman.join('');
  }
}

export default HangulToRoman;
