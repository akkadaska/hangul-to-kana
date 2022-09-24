type Word = {
  hangul: string;
  expectedKana: string[];
  actualKana?: string;
};

const wordList: Word[] = [
  {
    hangul: '안',
    expectedKana: ['アン'],
  },
  {
    hangul: '왕',
    expectedKana: ['ワン', 'ウァン'],
  },
  {
    hangul: '길',
    expectedKana: ['キル'],
  },
  {
    hangul: '광',
    expectedKana: ['クァング', 'クァン'],
  },
  {
    hangul: '서울',
    expectedKana: ['ソウル'],
  },
  {
    hangul: '김치',
    expectedKana: ['キムチ'],
  },
  {
    hangul: '삭',
    expectedKana: ['サッ', 'サ'],
  },
  {
    hangul: '받',
    expectedKana: ['パッ', 'パ'],
  },
  {
    hangul: '갑',
    expectedKana: ['カッ', 'カ'],
  },
  {
    hangul: '부부',
    expectedKana: ['プブ'],
  },
  {
    hangul: '가',
    expectedKana: ['カ'],
  },
  {
    hangul: '안녕하세요',
    expectedKana: ['アンニョンハセヨ'],
  },
  {
    hangul: '감사합니다',
    expectedKana: ['カムサハムニダ', 'カムサハッニダ'],
  },
  {
    hangul: '잘자요',
    expectedKana: ['チャルジャヨ'],
  },
  {
    hangul: '생일 축하해요',
    expectedKana: ['センギル チュカヘヨ', 'センギル チュカエヨ'],
  },
  {
    hangul: '미안해요',
    expectedKana: ['ミアネヨ'],
  },
  {
    hangul: '배고파',
    expectedKana: ['ペゴパ'],
  },
  {
    hangul: '이거 맛있어요',
    expectedKana: ['イゴ マシッソヨ', 'イゴ マッシッソヨ'],
  },
  {
    hangul: '천만에요',
    expectedKana: ['チョンマネヨ'],
  },
  {
    hangul: '사랑해요',
    expectedKana: ['サランヘヨ'],
  },
  {
    hangul: '귀여워요',
    expectedKana: ['クィヨウォヨ'],
  },
  {
    hangul: '멋있어요',
    expectedKana: ['モシッソヨ', 'モッシッソヨ'],
  },
  {
    hangul: '아 피곤해',
    expectedKana: ['ア ピゴネ'],
  },
  {
    hangul: '졸려',
    expectedKana: ['チョルリョ'],
  },
  {
    hangul: '입니다',
    expectedKana: ['イムニダ', 'イッニダ'],
  },
  {
    hangul: '앞마당',
    expectedKana: ['アッマダン', 'アマダン'],
  },
  {
    hangul: '먹는',
    expectedKana: ['モンヌン'],
  },
  {
    hangul: '책이',
    expectedKana: ['チェギ'],
  },
  {
    hangul: '옷을',
    expectedKana: ['オス', 'オッス', 'オスル', 'オッスル'],
  },
  {
    hangul: '낮에',
    expectedKana: ['ナチェ', 'ナッチェ'],
  },
];

export default wordList;
export type { Word };
