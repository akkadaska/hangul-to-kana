class HangulToKanaError extends Error {
  constructor(message: string) {
    const templateMessage =
      'If you see this error, please report it to the developer via GitHub Repository: https://github.com/akkadaska/hangul-to-kana .';
    super(message + ' ' + templateMessage);
    this.name = 'HangulToKanaError';
  }
}

export default HangulToKanaError;
