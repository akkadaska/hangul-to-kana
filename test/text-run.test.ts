import Hangul from '../src/hangul';
import TextRun from '../src/text-run';
import TextUnity from '../src/text-unity';

jest.mock('../src/text-unity', () => {
  return jest
    .fn()
    .mockImplementation((simpleText: string, _hangul?: Hangul[]) => {
      if (simpleText === 'I love you is ' || simpleText === ' in Korean.') {
        return {
          getSimpleText: () => simpleText,
          isHangul: () => false,
          getKana: () => undefined,
        };
      } else {
        return {
          getSimpleText: () => simpleText,
          isHangul: () => true,
          getKana: () => 'サランヘヨ',
        };
      }
    });
});

describe('TextRun test', () => {
  let targetTextRun: TextRun;
  beforeAll(() => {
    targetTextRun = new TextRun([
      new TextUnity('I love you is '),
      new TextUnity('사랑해요'),
      new TextUnity(' in Korean.'),
    ]);
  });

  it('toString method test', () => {
    const result = targetTextRun.toString();
    expect(result).toBe('I love you is サランヘヨ in Korean.');
  });

  it('toStringWithBracketedKana method test', () => {
    const result = targetTextRun.toStringWithBracketedKana();
    expect(result).toBe('I love you is 사랑해요(サランヘヨ) in Korean.');
  });

  it('toStringWithBracketedKana method test with custom bracket', () => {
    const result = targetTextRun.toStringWithBracketedKana('[kana: ', ']');
    expect(result).toBe('I love you is 사랑해요[kana: サランヘヨ] in Korean.');
  });

  it('toRun method test', () => {
    const result = targetTextRun.toRun();
    expect(result).toStrictEqual([
      {
        isHangul: false,
        text: 'I love you is ',
        kana: undefined,
      },
      {
        isHangul: true,
        text: '사랑해요',
        kana: 'サランヘヨ',
      },
      {
        isHangul: false,
        text: ' in Korean.',
        kana: undefined,
      },
    ]);
  });
});
