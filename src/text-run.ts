import TextUnity from './text-unity';

type Run = {
  isHangul: boolean;
  text: string;
  kana?: string;
};

class TextRun {
  private textUnities: TextUnity[];

  constructor(textUnities: TextUnity[]) {
    this.textUnities = textUnities;
  }

  toString(): string {
    return this.textUnities
      .map((textUnity) => {
        if (textUnity.isHangul()) {
          return textUnity.getKana();
        } else {
          return textUnity.getSimpleText();
        }
      })
      .join('');
  }

  toStringWithBracketedKana(leading = '(', trailing = ')'): string {
    return this.textUnities
      .map((textUnity) => {
        if (textUnity.isHangul()) {
          return (
            textUnity.getSimpleText() + leading + textUnity.getKana() + trailing
          );
        } else {
          return textUnity.getSimpleText();
        }
      })
      .join('');
  }

  toRun(): Run[] {
    return this.textUnities.map((textUnity) => {
      return {
        isHangul: textUnity.isHangul(),
        text: textUnity.getSimpleText(),
        kana: textUnity.getKana(),
      };
    });
  }
}

export default TextRun;
export type { Run };
