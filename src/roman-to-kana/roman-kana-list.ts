const romanVowels = ['a', 'i', 'u', 'e', 'o', 'ya', 'yu', 'yo', '-'];

const romanToKanaRule: { [keys: string]: string[] } = {
  _: ['ア', 'イ', 'ウ', 'エ', 'オ', 'ヤ', 'ユ', 'ヨ', ''],
  k: ['カ', 'キ', 'ク', 'ケ', 'コ', 'キャ', 'キュ', 'キョ', 'ク'],
  s: ['サ', 'シ', 'ス', 'セ', 'ソ', 'シャ', 'シュ', 'ショ', 'ス'],
  t: ['タ', 'チ', 'ツ', 'テ', 'ト', 'チャ', 'チュ', 'チョ', 'ツ'],
  n: ['ナ', 'ニ', 'ヌ', 'ネ', 'ノ', 'ニャ', 'ニュ', 'ニョ', 'ン'],
  h: ['ハ', 'ヒ', 'フ', 'ヘ', 'ホ', 'ヒャ', 'ヒュ', 'ヒョ', 'フ'],
  m: ['マ', 'ミ', 'ム', 'メ', 'モ', 'ミャ', 'ミュ', 'ミョ', 'ム'],
  r: ['ラ', 'リ', 'ル', 'レ', 'ロ', 'リャ', 'リュ', 'リョ', 'ル'],
  y: ['ヤ', 'イ', 'ユ', 'エ', 'ヨ', 'ッヤ', 'ッユ', 'ッヨ', 'ユ'],
  w: ['ワ', 'ウィ', 'ウュ', 'ウェ', 'ウォ', 'ウヤ', 'ウ', 'ウォ', 'ウ'],
  g: ['ガ', 'ギ', 'グ', 'ゲ', 'ゴ', 'ギャ', 'ギュ', 'ギョ', ''],
  z: ['ザ', 'ジ', 'ズ', 'ゼ', 'ゾ', 'ジャ', 'ジュ', 'ジョ', 'ズ'],
  d: ['ダ', 'ヂ', 'デュ', 'デ', 'ド', 'ヂャ', 'ヂュ', 'ヂョ', 'ヅ'],
  b: ['バ', 'ビ', 'ブ', 'ベ', 'ボ', 'ビャ', 'ビュ', 'ビョ', 'ブ'],
  p: ['パ', 'ピ', 'プ', 'ペ', 'ポ', 'ピャ', 'ピュ', 'ピョ', 'ッ'],
  f: ['ファ', 'フィ', 'フュ', 'フェ', 'フォ', 'ヒャ', 'ヒュ', 'ヒョ', 'フ'],
  v: ['ヴァ', 'ヴィ', 'ヴ', 'ヴェ', 'ヴォ', 'ヴャ', 'ヴュ', 'ヴョ', 'ヴ'],
  j: ['ジャ', 'ジ', 'ジュ', 'ジェ', 'ジョ', 'ジャ', 'ジュ', 'ジョ', 'ジュ'],
  x: ['ァ', 'ィ', 'ゥ', 'ェ', 'ォ', 'ャ', 'ュ', 'ョ', 'ゥ'],
  l: ['ラ', 'リ', 'ル', 'レ', 'ロ', 'リャ', 'リュ', 'リョ', 'ル'],
  kk: [
    'ッカ',
    'ッキ',
    'ック',
    'ッケ',
    'ッコ',
    'ッキャ',
    'ッキュ',
    'ッキョ',
    'ック',
  ],
  ss: [
    'ッサ',
    'ッシ',
    'ッス',
    'ッセ',
    'ッソ',
    'ッシャ',
    'ッシュ',
    'ッショ',
    'ッス',
  ],
  kt: [
    'ッタ',
    'ッチ',
    'ッツ',
    'ッテ',
    'ット',
    'ッチャ',
    'ッチュ',
    'ッチョ',
    '',
  ],
  hh: [
    'ッハ',
    'ッヒ',
    'ッフ',
    'ッヘ',
    'ッホ',
    'ッヒャ',
    'ッヒュ',
    'ッヒョ',
    'ッフ',
  ],
  mm: [
    'ッマ',
    'ッミ',
    'ッム',
    'ッメ',
    'ッモ',
    'ッミャ',
    'ッミュ',
    'ッミョ',
    'ッム',
  ],
  rr: [
    'ッラ',
    'ッリ',
    'ッル',
    'ッレ',
    'ッロ',
    'ッリャ',
    'ッリュ',
    'ッリョ',
    'ッル',
  ],
  yy: ['ッヤ', 'ッイ', 'ッユ', 'ッエ', 'ッヨ', 'ッヤ', 'ッユ', 'ッヨ', 'ッユ'],
  ww: [
    'ッワ',
    'ッウィ',
    'ッウュ',
    'ッウェ',
    'ッウォ',
    'ッウヤ',
    'ッウ',
    'ッウォ',
    'ッウ',
  ],
  gg: [
    'ッガ',
    'ッギ',
    'ッグ',
    'ッゲ',
    'ッゴ',
    'ッギャ',
    'ッギュ',
    'ッギョ',
    'ッグ',
  ],
  zz: [
    'ッザ',
    'ッジ',
    'ッズ',
    'ッゼ',
    'ッゾ',
    'ッジャ',
    'ッジュ',
    'ッジョ',
    'ッズ',
  ],
  dd: [
    'ッダ',
    'ッヂ',
    'ッデュ',
    'ッデ',
    'ッド',
    'ッヂャ',
    'ッヂュ',
    'ッヂョ',
    'ッヅ',
  ],
  bb: [
    'ッバ',
    'ッビ',
    'ッブ',
    'ッベ',
    'ッボ',
    'ッビャ',
    'ッビュ',
    'ッビョ',
    'ッブ',
  ],
  pp: [
    'ッパ',
    'ッピ',
    'ップ',
    'ッペ',
    'ッポ',
    'ッピャ',
    'ッピュ',
    'ッピョ',
    'ップ',
  ],
  ff: [
    'ッファ',
    'ッフィ',
    'ッフュ',
    'ッフェ',
    'ッフォ',
    'ッヒャ',
    'ッヒュ',
    'ッヒョ',
    'ッフ',
  ],
  vv: [
    'ッヴァ',
    'ッヴィ',
    'ッヴ',
    'ッヴェ',
    'ッヴォ',
    'ッヴャ',
    'ッヴュ',
    'ッヴョ',
    'ッヴ',
  ],
  jj: [
    'ッジャ',
    'ッジ',
    'ッジュ',
    'ッジェ',
    'ッジョ',
    'ッジャ',
    'ッジュ',
    'ッジョ',
    'ッジュ',
  ],
  ch: ['チャ', 'チ', 'チュ', 'チェ', 'チョ', 'チャ', 'チュ', 'チョ', 'チュ'],
  sh: ['シャ', 'シ', 'シュ', 'シェ', 'ショ', 'シャ', 'シュ', 'ショ', 'シュ'],
  ng: ['ンガ', 'ンギ', 'ング', 'ンゲ', 'ンゴ', 'ンヤ', 'ンユ', 'ンヨ', 'ウ'],
  zg: ['ンア', 'ンイ', 'ン', 'ンエ', 'ンオ', 'ンヤ', 'ンユ', 'ンヨ', 'ン'],
  pt: [
    'プチャ',
    'プチ',
    'プチュ',
    'プチェ',
    'プチョ',
    'プチャ',
    'プチュ',
    'プチョ',
    'ップ',
  ],
  xt: [
    'ッチャ',
    'ッチ',
    'ッ',
    'ッチェ',
    'ッチョ',
    'ッチャ',
    'ッチュ',
    'ッチェ',
    'ッチョ',
  ],
};

class RomanKanaList {
  static readonly romanToKanaRule = romanToKanaRule;
  static readonly romanVowels = romanVowels;
  static readonly romanConsonants = Object.keys(this.romanToKanaRule);

  static getConsonant(
    str: string,
  ): [consonant: string, consonantLength: number] {
    if (str.length >= 2) {
      const twoLetterConsonant = str.substring(0, 2);
      if (this.romanConsonants.includes(twoLetterConsonant)) {
        return [twoLetterConsonant, 2];
      }
    }
    const oneLetterConsonant = str.substring(0, 1);
    if (this.romanConsonants.includes(oneLetterConsonant)) {
      return [oneLetterConsonant, 1];
    }
    return ['_', 0];
  }

  static getVowel(str: string): [vowelIndex: number, vowelLength: number] {
    if (str.length >= 2) {
      const twoLetterVowel = str.substring(0, 2);
      const twoLetterVowelIndex = this.romanVowels.indexOf(twoLetterVowel);
      if (twoLetterVowelIndex >= 0) {
        return [twoLetterVowelIndex, 2];
      }
    }
    const oneLetterVowel = str.substring(0, 1);
    const oneLetterVowelIndex = this.romanVowels.indexOf(oneLetterVowel);
    if (oneLetterVowelIndex >= 0) {
      return [oneLetterVowelIndex, 1];
    }
    return [8, 0];
  }
}

export default RomanKanaList;
