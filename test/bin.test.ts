import HangulToKanaCLI from '../src/bin/bin';
import HangulToKana from '../src/hangul-to-kana';
import TextRun from '../src/text-run';
import TextUnity from '../src/text-unity';

describe('HangulToKanaCLI', () => {
  let hangulToKanaConvertSpy: jest.SpyInstance;
  let textRunToStringSpy: jest.SpyInstance;
  let textRunToStringWithBracketedKanaSpy: jest.SpyInstance;
  let processStdoutWriteSpy: jest.SpyInstance;
  beforeEach(() => {
    jest.mock('../src/text-unity');
    hangulToKanaConvertSpy = jest
      .spyOn(HangulToKana, 'convert')
      .mockReturnValue(new TextRun([new TextUnity('')]));
    textRunToStringSpy = jest
      .spyOn(TextRun.prototype, 'toString')
      .mockReturnValue('toStringResult');
    textRunToStringWithBracketedKanaSpy = jest
      .spyOn(TextRun.prototype, 'toStringWithBracketedKana')
      .mockReturnValue('toStringWithBracketedKanaResult');
    processStdoutWriteSpy = jest
      .spyOn(process.stdout, 'write')
      .mockReturnValue(true);
  });

  afterEach(() => {
    jest.restoreAllMocks();
    hangulToKanaConvertSpy.mockReset();
    textRunToStringSpy.mockReset();
    textRunToStringWithBracketedKanaSpy.mockReset();
    processStdoutWriteSpy.mockReset();
  });

  it('print help test by no args', () => {
    HangulToKanaCLI.run([]);

    expect(hangulToKanaConvertSpy).not.toHaveBeenCalled();
    expect(textRunToStringSpy).not.toHaveBeenCalled();
    expect(textRunToStringWithBracketedKanaSpy).not.toHaveBeenCalled();
    expect(processStdoutWriteSpy).toHaveBeenCalledWith(
      'Usage: hangul-to-kana [options] [text]',
    );
    expect(processStdoutWriteSpy).toHaveBeenCalledWith('Options:');
    expect(processStdoutWriteSpy).toHaveBeenCalledWith(
      '  --kana-bracketed, -b  Show kana in brackets',
    );
    expect(processStdoutWriteSpy).toHaveBeenCalledWith(
      '  --help, -h            Show help',
    );
    expect(processStdoutWriteSpy).toHaveBeenCalledWith('\n');
  });

  it('print help test by option flag', () => {
    HangulToKanaCLI.run(['-h']);

    expect(hangulToKanaConvertSpy).not.toHaveBeenCalled();
    expect(textRunToStringSpy).not.toHaveBeenCalled();
    expect(textRunToStringWithBracketedKanaSpy).not.toHaveBeenCalled();
    expect(processStdoutWriteSpy).toHaveBeenCalledWith(
      'Usage: hangul-to-kana [options] [text]',
    );
    expect(processStdoutWriteSpy).toHaveBeenCalledWith('Options:');
    expect(processStdoutWriteSpy).toHaveBeenCalledWith(
      '  --kana-bracketed, -b  Show kana in brackets',
    );
    expect(processStdoutWriteSpy).toHaveBeenCalledWith(
      '  --help, -h            Show help',
    );
    expect(processStdoutWriteSpy).toHaveBeenCalledWith('\n');
  });

  it('print convert result without show kana in brackets flag', () => {
    HangulToKanaCLI.run(['생일', '축하해요']);

    expect(hangulToKanaConvertSpy).toHaveBeenCalledWith('생일 축하해요');
    expect(textRunToStringSpy).toHaveBeenCalled();
    expect(textRunToStringWithBracketedKanaSpy).not.toHaveBeenCalled();
    expect(processStdoutWriteSpy).toHaveBeenCalledWith('toStringResult');
    expect(processStdoutWriteSpy).toHaveBeenCalledWith('\n');
  });

  it('print convert result with show kana in brackets flag', () => {
    HangulToKanaCLI.run(['-b', '생일', '축하해요']);

    expect(hangulToKanaConvertSpy).toHaveBeenCalledWith('생일 축하해요');
    expect(textRunToStringSpy).not.toHaveBeenCalled();
    expect(textRunToStringWithBracketedKanaSpy).toHaveBeenCalled();
    expect(processStdoutWriteSpy).toHaveBeenCalledWith(
      'toStringWithBracketedKanaResult',
    );
    expect(processStdoutWriteSpy).toHaveBeenCalledWith('\n');
  });
});
