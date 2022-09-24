import HangulToKana from '../src/hangul-to-kana';
import TextUnity from '../src/text-unity';
import Hangul from '../src/hangul';

const textUnityConstructorArgHistory: [
  simpleText: string,
  hangul?: Hangul[],
][] = [];
jest.mock('../src/text-unity', () => {
  return jest
    .fn()
    .mockImplementation((simpleText: string, hangul?: Hangul[]) => {
      textUnityConstructorArgHistory.push([
        simpleText,
        hangul ? [...hangul] : undefined,
      ]);
      return new Object();
    });
});

const textRunConstructorArgHistory: TextUnity[][] = [];
jest.mock('../src/text-run', () => {
  return jest.fn().mockImplementation((textUnities) => {
    textRunConstructorArgHistory.push(textUnities);
    return new Object();
  });
});

describe('isHangul method test', () => {
  it('first hangul: 가', () => {
    expect(HangulToKana.isHangul('가')).toBe(true);
  });
  it('last hangul: 힣', () => {
    expect(HangulToKana.isHangul('힣')).toBe(true);
  });
  it('Lower border: "\\uABFF"', () => {
    expect(HangulToKana.isHangul('\uABFF')).toBe(false);
  });
  it('Upper border: "\\uD7A4"', () => {
    expect(HangulToKana.isHangul('\uD7A4')).toBe(false);
  });
});

describe('convert method test', () => {
  beforeEach(() => {
    textUnityConstructorArgHistory.length = 0;
    textRunConstructorArgHistory.length = 0;
  });

  it('no hangul case', () => {
    const text = 'I love you';
    HangulToKana.convert(text);
    expect(textRunConstructorArgHistory).toHaveLength(1);
    expect(textRunConstructorArgHistory[0]).toHaveLength(1);
    expect(textUnityConstructorArgHistory).toHaveLength(1);
    expect(textUnityConstructorArgHistory[0][0]).toBe(text);
    expect(textUnityConstructorArgHistory[0][1]).toBeUndefined();
  });

  it('only hangul case', () => {
    const text = '사랑해요';
    HangulToKana.convert(text);
    expect(textRunConstructorArgHistory).toHaveLength(1);
    expect(textRunConstructorArgHistory[0]).toHaveLength(1);
    expect(textUnityConstructorArgHistory).toHaveLength(1);
    expect(textUnityConstructorArgHistory[0][0]).toBe(text);
    expect(textUnityConstructorArgHistory[0][1]).toBeDefined();
    expect(
      textUnityConstructorArgHistory[0][1]
        ?.map((hangul) => hangul.getChar())
        .join(''),
    ).toBe(text);
  });

  it('end with hangul case', () => {
    const text = 'love you = 사랑해요';
    HangulToKana.convert(text);
    expect(textRunConstructorArgHistory).toHaveLength(1);
    expect(textRunConstructorArgHistory[0]).toHaveLength(2);
    expect(textUnityConstructorArgHistory).toHaveLength(2);
    expect(textUnityConstructorArgHistory[0][0]).toBe('love you = ');
    expect(textUnityConstructorArgHistory[0][1]).toBeUndefined();
    expect(textUnityConstructorArgHistory[1][0]).toBe('사랑해요');
    expect(textUnityConstructorArgHistory[1][1]).toBeDefined();
    expect(
      textUnityConstructorArgHistory[1][1]
        ?.map((hangul) => hangul.getChar())
        .join(''),
    ).toBe('사랑해요');
  });

  it('end without hangul case', () => {
    const text = 'I love you is 사랑해요 in Korean.';
    HangulToKana.convert(text);
    expect(textRunConstructorArgHistory).toHaveLength(1);
    expect(textRunConstructorArgHistory[0]).toHaveLength(3);
    expect(textUnityConstructorArgHistory).toHaveLength(3);
    expect(textUnityConstructorArgHistory[0][0]).toBe('I love you is ');
    expect(textUnityConstructorArgHistory[0][1]).toBeUndefined();
    expect(textUnityConstructorArgHistory[1][0]).toBe('사랑해요');
    expect(textUnityConstructorArgHistory[1][1]).toBeDefined();
    expect(
      textUnityConstructorArgHistory[1][1]
        ?.map((hangul) => hangul.getChar())
        .join(''),
    ).toBe('사랑해요');
    expect(textUnityConstructorArgHistory[2][0]).toBe(' in Korean.');
    expect(textUnityConstructorArgHistory[2][1]).toBeUndefined();
  });

  it('multiple hangul case', () => {
    const text = '생일 축하해요';
    HangulToKana.convert(text);
    expect(textRunConstructorArgHistory).toHaveLength(1);
    expect(textRunConstructorArgHistory[0]).toHaveLength(3);
    expect(textUnityConstructorArgHistory).toHaveLength(3);
    expect(textUnityConstructorArgHistory[0][0]).toBe('생일');
    expect(textUnityConstructorArgHistory[0][1]).toBeDefined();
    expect(
      textUnityConstructorArgHistory[0][1]
        ?.map((hangul) => hangul.getChar())
        .join(''),
    ).toBe('생일');
    expect(textUnityConstructorArgHistory[1][0]).toBe(' ');
    expect(textUnityConstructorArgHistory[1][1]).toBeUndefined();
    expect(textUnityConstructorArgHistory[2][0]).toBe('축하해요');
    expect(textUnityConstructorArgHistory[2][1]).toBeDefined();
    expect(
      textUnityConstructorArgHistory[2][1]
        ?.map((hangul) => hangul.getChar())
        .join(''),
    ).toBe('축하해요');
  });
});
