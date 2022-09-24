import HangulToKanaError from '../hangul-to-kana-error';

class FinalConsonantRule {
  rule: string;
  exceptions: {
    nextHangulInitialConsonant: string[];
    result: string;
  }[] = [];

  constructor(rule: string) {
    this.rule = rule;
  }

  addException(
    nextHangulInitialConsonant: string[],
    result: string,
  ): FinalConsonantRule {
    this.exceptions.push({
      nextHangulInitialConsonant,
      result,
    });
    return this;
  }
}

const finalConsonantRuleDict: {
  [finalConsonant: string]: FinalConsonantRule;
} = {
  _: new FinalConsonantRule(''),
  ㄱ: new FinalConsonantRule('k')
    .addException(['_'], 'xtu')
    .addException(['ㅇ'], 'g')
    .addException(['ㄴ'], 'n-'),
  ㄲ: new FinalConsonantRule('k'),
  ㄳ: new FinalConsonantRule('k'),
  ㄴ: new FinalConsonantRule('n'),
  ㄵ: new FinalConsonantRule('n'),
  ㄶ: new FinalConsonantRule('n'),
  ㄷ: new FinalConsonantRule('t')
    .addException(['_'], 'xtu')
    .addException(['ㅇ'], 'ss'),
  ㄹ: new FinalConsonantRule('l'),
  ㄺ: new FinalConsonantRule('k'),
  ㄻ: new FinalConsonantRule('m'),
  ㄼ: new FinalConsonantRule('l'),
  ㄽ: new FinalConsonantRule('l'),
  ㄾ: new FinalConsonantRule('l'),
  ㄿ: new FinalConsonantRule('p'),
  ㅀ: new FinalConsonantRule('l'),
  ㅁ: new FinalConsonantRule('m'),
  ㅂ: new FinalConsonantRule('p').addException(['_'], 'xtu'),
  ㅄ: new FinalConsonantRule('p'),
  ㅅ: new FinalConsonantRule('t').addException(['ㅇ'], 'ss'),
  ㅆ: new FinalConsonantRule('t').addException(['ㅇ'], 'ss'),
  ㅇ: new FinalConsonantRule('n-g'),
  ㅈ: new FinalConsonantRule('t').addException(['ㅇ'], 'ch'),
  ㅊ: new FinalConsonantRule('t').addException(['ㅇ'], 'ch'),
  ㅋ: new FinalConsonantRule('k'),
  ㅌ: new FinalConsonantRule('t'),
  ㅍ: new FinalConsonantRule('p'),
  ㅎ: new FinalConsonantRule('t'),
};

class FinalConsonant {
  private static readonly ruleDict = finalConsonantRuleDict;

  static romanize(
    finalConsonants: string,
    nextHangulInitialConsonant: string,
  ): string {
    const rule = FinalConsonant.ruleDict[finalConsonants];
    if (!rule) {
      throw new HangulToKanaError(
        `Invalid initial consonant: ${finalConsonants}: There is no rule for this initial consonant.`,
      );
    }
    if (rule.exceptions.length > 0) {
      for (const exception of rule.exceptions) {
        if (
          exception.nextHangulInitialConsonant.includes(
            nextHangulInitialConsonant,
          )
        ) {
          return exception.result;
        }
      }
    }
    return rule.rule;
  }
}

export default FinalConsonant;
