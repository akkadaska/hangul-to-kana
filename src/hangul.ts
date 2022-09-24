import { vowels, initialConsonants, finalConsonants } from './hangul-parts';
import HangulToKanaError from './hangul-to-kana-error';

const UNICODE_OFFSET = 44032;
const UNICODE_MAX = 55203;
const VOWELS_NUMBER = vowels.length;
const FINAL_CONSONANTS_NUMBER = finalConsonants.length;

/**
 * A class for one letter hangul that provide its vowel, initial consonant and final consonant.
 */
class Hangul {
  private char: string;
  private vowel: string;
  private initialConsonant: string;
  private finalConsonant: string;
  /**
   * Generate a Hangul class from the given character.
   * @param char Hangul character
   * @returns Hangul class
   */
  constructor(char: string) {
    this.char = char.charAt(0);
    const code = char.charCodeAt(0);
    const isHangulBool = code >= UNICODE_OFFSET && code <= UNICODE_MAX;
    if (!isHangulBool) {
      throw new HangulToKanaError(
        `The given character: "${this.char}" is not a hangul character.`,
      );
    }
    let unicodeOffset = code - UNICODE_OFFSET;
    const finalConsonantsIndex = unicodeOffset % FINAL_CONSONANTS_NUMBER;
    unicodeOffset -= finalConsonantsIndex;
    unicodeOffset /= FINAL_CONSONANTS_NUMBER;
    const vowelIndex = unicodeOffset % VOWELS_NUMBER;
    unicodeOffset -= vowelIndex;
    unicodeOffset /= VOWELS_NUMBER;
    const initialConsonantsIndex = unicodeOffset;
    this.vowel = vowels[vowelIndex];
    this.initialConsonant = initialConsonants[initialConsonantsIndex];
    this.finalConsonant = finalConsonants[finalConsonantsIndex];
  }

  /**
   * Return the letter in this class.
   * @returns string
   */
  public getChar(): string {
    return this.char;
  }

  /**
   * Return the vowel of the letter in this class.
   * @returns string
   */
  public getVowel(): string {
    return this.vowel;
  }

  /**
   * Return the initial consonant of the letter in this class.
   * @returns string
   */
  public getInitialConsonant(): string {
    return this.initialConsonant;
  }

  /**
   * Return the final consonant of the letter in this class.
   * @returns string
   */
  public getFinalConsonant(): string {
    return this.finalConsonant;
  }
}

export default Hangul;
export { UNICODE_OFFSET, UNICODE_MAX, VOWELS_NUMBER, FINAL_CONSONANTS_NUMBER };
