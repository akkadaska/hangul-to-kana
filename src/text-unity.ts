import Converter from './converter';
import Hangul from './hangul';

class TextUnity {
  private simpleText: string;
  private isHangulBool: boolean;
  private hangul: Hangul[] | undefined;
  private kana: string | undefined = undefined;

  constructor(simpleTest: string, hangul?: Hangul[]) {
    this.simpleText = simpleTest;
    this.isHangulBool = hangul !== undefined;
    this.hangul = hangul;
    if (hangul !== undefined) {
      this.kana = Converter.convert(hangul);
    }
  }

  getSimpleText(): string {
    return this.simpleText;
  }

  isHangul(): boolean {
    return this.isHangulBool;
  }

  getHangul(): Hangul[] | undefined {
    return this.hangul;
  }

  getKana(): string | undefined {
    return this.kana;
  }
}

export default TextUnity;
