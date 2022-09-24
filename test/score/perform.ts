/* eslint-disable @typescript-eslint/naming-convention */
import Table from 'cli-table3';
import fs from 'fs';
import HangulToKana from '../../src/hangul-to-kana';
import wordList, { Word } from './word-list';

class Score {
  private wordList: Word[];
  private passed: Word[] = [];
  private failed: Word[] = [];
  private isCIMode = false;
  private resultLines: string[] = [];

  constructor(wordList: Word[]) {
    this.wordList = wordList;
    if (process.argv.includes('--ci')) {
      this.isCIMode = true;
    }
  }

  perform() {
    this.wordList.forEach((word) => this.test(word));
    this.showScore();
    this.complete();
  }

  private test(word: Word) {
    const kana = HangulToKana.convert(word.hangul).toString();
    if (word.expectedKana.includes(kana)) {
      this.passed.push({ ...word, actualKana: kana });
    } else {
      this.failed.push({ ...word, actualKana: kana });
    }
  }

  private showScore() {
    const total = this.wordList.length;
    const passed = this.passed.length;
    const failed = this.failed.length;
    this.showLine(`Score Report`, 'h1');
    this.showLine(`Total: ${total}, Passed: ${passed}, Failed: ${failed}`);
    this.showLine('Passed', 'h2');
    if (passed > 0) {
      this.showTable(this.passed);
    } else {
      this.showLine('No passed test.');
    }
    this.showLine('Failed', 'h2');
    if (failed > 0) {
      this.showTable(this.failed);
    } else {
      this.showLine('No failed test.');
    }
  }

  private showLine(line: string, level?: 'h1' | 'h2' | 'h3') {
    if (this.isCIMode) {
      this.showMarkdownLine(line, level);
    } else {
      this.showCLILine(line);
    }
  }

  private showCLILine(line: string) {
    process.stdout.write(line);
    process.stdout.write('\n\n');
  }

  private showMarkdownLine(line: string, level?: 'h1' | 'h2' | 'h3') {
    const prefix =
      level === 'h1'
        ? '# '
        : level === 'h2'
        ? '## '
        : level === 'h3'
        ? '### '
        : '';
    this.resultLines.push(`${prefix}${line}`);
  }

  private showTable(wordList: Word[]) {
    if (this.isCIMode) {
      this.showMarkdownTable(wordList);
    } else {
      this.showCLITable(wordList);
    }
  }

  private showCLITable(wordList: Word[]) {
    const table = new Table({
      head: ['Hangul', 'Actual', 'Expected'],
    });
    wordList.forEach((word) => {
      table.push([word.hangul, word.actualKana, word.expectedKana.join(',')]);
    });
    process.stdout.write(table.toString());
    process.stdout.write('\n\n');
  }

  private showMarkdownTable(wordList: Word[]) {
    this.resultLines.push('| Hangul | Actual | Expected |');
    this.resultLines.push('| ------ | ------ | -------- |');
    wordList.forEach((word) => {
      this.resultLines.push(
        `| ${word.hangul} | ${word.actualKana} | ${word.expectedKana.join(
          ',',
        )} |`,
      );
    });
    this.resultLines.push('');
  }

  private complete() {
    if (this.isCIMode) {
      fs.writeFileSync('score.txt', this.resultLines.join('\n'));
    }
  }
}

(() => {
  const score = new Score(wordList);
  score.perform();
})();
