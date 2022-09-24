import HangulToKanaError from '../hangul-to-kana-error';

class VowelRule {
  rule: string;

  constructor(rule: string) {
    this.rule = rule;
  }
}

const vowelRuleDict: {
  [vowel: string]: VowelRule;
} = {
  ㅏ: new VowelRule('a'),
  ㅐ: new VowelRule('e'),
  ㅑ: new VowelRule('ya'),
  ㅒ: new VowelRule('ixe'),
  ㅓ: new VowelRule('o'),
  ㅔ: new VowelRule('e'),
  ㅕ: new VowelRule('yo'),
  ㅖ: new VowelRule('ixe'),
  ㅗ: new VowelRule('o'),
  ㅘ: new VowelRule('uxa'),
  ㅙ: new VowelRule('uxe'),
  ㅚ: new VowelRule('uxe'),
  ㅛ: new VowelRule('yo'),
  ㅜ: new VowelRule('u'),
  ㅝ: new VowelRule('uxo'),
  ㅞ: new VowelRule('uxe'),
  ㅟ: new VowelRule('uxi'),
  ㅠ: new VowelRule('yu'),
  ㅡ: new VowelRule('u'),
  ㅢ: new VowelRule('ui'),
  ㅣ: new VowelRule('i'),
};

class Vowel {
  private static readonly ruleDict = vowelRuleDict;

  static romanize = (vowel: string): string => {
    const rule = Vowel.ruleDict[vowel];
    if (!rule) {
      throw new HangulToKanaError(
        `Unknown vowel: ${vowel}. There are no rules for this vowel.`,
      );
    }
    return rule.rule;
  };
}

export default Vowel;
