import Hangul, { UNICODE_MAX, UNICODE_OFFSET } from './hangul';
import TextRun from './text-run';
import TextUnity from './text-unity';

/**
 * A tools class for hangul and converting hangul to Kana.
 */
class HangulToKana {
  /**
   * Return whether the given character (of the first letter) is a hangul character.
   * @param char Hangul character
   * @returns boolean
   */
  public static isHangul(char: string) {
    const code = char.charCodeAt(0);
    return code >= UNICODE_OFFSET && code <= UNICODE_MAX;
  }

  /**
   * Convert string with hangul to text run array.
   * @param str string
   * @returns text run array
   */
  public static convert(str: string): TextRun {
    const textUnities: TextUnity[] = [];
    const hangulStack: Hangul[] = [];
    const simpleTextStack: string[] = [];
    for (let i = 0; i < str.length; i++) {
      const char = str.charAt(i);
      const isHangul = HangulToKana.isHangul(char);
      if (isHangul) {
        if (hangulStack.length === 0 && simpleTextStack.length > 0) {
          textUnities.push(new TextUnity(simpleTextStack.join('')));
          simpleTextStack.length = 0;
        }
        hangulStack.push(new Hangul(char));
        simpleTextStack.push(char);
        continue;
      } else {
        if (hangulStack.length > 0) {
          textUnities.push(
            new TextUnity(simpleTextStack.join(''), ...[hangulStack]),
          );
          hangulStack.length = 0;
          simpleTextStack.length = 0;
        }
        simpleTextStack.push(char);
        continue;
      }
    }
    if (hangulStack.length > 0) {
      textUnities.push(
        new TextUnity(simpleTextStack.join(''), [...hangulStack]),
      );
    } else if (simpleTextStack.length > 0) {
      textUnities.push(new TextUnity(simpleTextStack.join('')));
    }
    return new TextRun(textUnities);
  }
}

export default HangulToKana;
