import TextUnity from '../src/text-unity';
import Converter from '../src/converter';
import Hangul from '../src/hangul';

describe('create new TextUnity test', () => {
  let convertSpy: jest.SpyInstance;
  beforeEach(() => {
    convertSpy = jest.spyOn(Converter, 'convert').mockReturnValue('サランヘヨ');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('create with not hangul case', () => {
    const text = 'I love you';
    const notHangulText = new TextUnity(text);
    expect(notHangulText.getSimpleText()).toBe(text);
    expect(notHangulText.isHangul()).toBe(false);
    expect(notHangulText.getHangul()).toBeUndefined();
    expect(notHangulText.getKana()).toBeUndefined();
    expect(convertSpy).not.toHaveBeenCalled();
  });

  it('create with hangul case', () => {
    const text = '사랑해요';
    const hangul = text.split('').map((hangul) => new Hangul(hangul));
    const hangulText = new TextUnity(text, hangul);
    expect(hangulText.getSimpleText()).toBe(text);
    expect(hangulText.isHangul()).toBe(true);
    expect(hangulText.getHangul()).toEqual(hangul);
    expect(hangulText.getKana()).toBe('サランヘヨ');
    expect(convertSpy).toHaveBeenCalledTimes(1);
    expect(convertSpy).toHaveBeenCalledWith(hangul);
  });
});
