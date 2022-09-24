import HangulToKana from '../hangul-to-kana';

class HangulToKanaCLI {
  static run(args: string[]) {
    if (args.length === 0) {
      this.showHelp();
    } else if (args[0] === '--help' || args[0] === '-h') {
      this.showHelp();
    } else if (args[0] === '--kana-bracketed' || args[0] === '-b') {
      args.shift();
      const str = args.join(' ');
      const kana = HangulToKana.convert(str).toStringWithBracketedKana();
      this.print(kana);
    } else {
      const str = args.join(' ');
      const kana = HangulToKana.convert(str).toString();
      this.print(kana);
    }
  }

  private static print(str: string) {
    process.stdout.write(str);
    process.stdout.write('\n');
  }

  private static showHelp() {
    this.print('Usage: hangul-to-kana [options] [text]');
    this.print('Options:');
    this.print('  --kana-bracketed, -b  Show kana in brackets');
    this.print('  --help, -h            Show help');
  }
}

export default HangulToKanaCLI;
