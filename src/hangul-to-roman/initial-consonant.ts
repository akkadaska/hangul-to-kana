import HangulToKanaError from '../hangul-to-kana-error';

class InitialConsonantRule {
  rule: string;
  exceptions: {
    prevHangulFinalConsonant: string[];
    result: string;
  }[] = [];

  constructor(rule: string) {
    this.rule = rule;
  }

  addException(
    prevHangulFinalConsonant: string[],
    result: string,
  ): InitialConsonantRule {
    this.exceptions.push({
      prevHangulFinalConsonant,
      result,
    });
    return this;
  }
}

const initialConsonantRuleDict: {
  [initialConsonant: string]: InitialConsonantRule;
} = {
  ㄱ: new InitialConsonantRule('k').addException(
    ['_', 'ㄴ', 'ㅁ', 'ㅇ', 'ㄹ'],
    'g',
  ),
  ㄲ: new InitialConsonantRule('kk'),
  ㄴ: new InitialConsonantRule('n'),
  ㄷ: new InitialConsonantRule('t').addException(
    ['_', 'ㄴ', 'ㅁ', 'ㅇ', 'ㄹ'],
    'd',
  ),
  ㄸ: new InitialConsonantRule('tt'),
  ㄹ: new InitialConsonantRule('r'),
  ㅁ: new InitialConsonantRule('m'),
  ㅂ: new InitialConsonantRule('p').addException(
    ['_', 'ㄴ', 'ㅁ', 'ㅇ', 'ㄹ'],
    'b',
  ),
  ㅃ: new InitialConsonantRule('pp'),
  ㅅ: new InitialConsonantRule('s'),
  ㅆ: new InitialConsonantRule('ss'),
  ㅇ: new InitialConsonantRule(''),
  ㅈ: new InitialConsonantRule('ch').addException(
    ['_', 'ㄴ', 'ㅁ', 'ㅇ', 'ㄹ'],
    'j',
  ),
  ㅉ: new InitialConsonantRule('jj'),
  ㅊ: new InitialConsonantRule('ch'),
  ㅋ: new InitialConsonantRule('k'),
  ㅌ: new InitialConsonantRule('t'),
  ㅍ: new InitialConsonantRule('p'),
  ㅎ: new InitialConsonantRule('h')
    .addException(['ㄱ'], '')
    .addException(['ㄴ', 'ㄵ', 'ㄶ'], ''),
};

class InitialConsonant {
  private static readonly ruleDict = initialConsonantRuleDict;

  static romanize(
    initialConsonants: string,
    prevHangulFinalConsonant: string,
  ): string {
    const rule = InitialConsonant.ruleDict[initialConsonants];
    if (!rule) {
      throw new HangulToKanaError(
        `Invalid initial consonant: ${initialConsonants}: There is no rule for this initial consonant.`,
      );
    }
    if (rule.exceptions.length > 0) {
      for (const exception of rule.exceptions) {
        if (
          exception.prevHangulFinalConsonant.includes(prevHangulFinalConsonant)
        ) {
          return exception.result;
        }
      }
    }
    return rule.rule;
  }
}

export default InitialConsonant;
