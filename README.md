# Hangul to Kana / ハングル・カナ変換 / 한글을 가나로 변환
Try Hangul to Kana conversion in your browser [here](https://akkadaska.github.io/hangul-to-kana).

## About
A Node.js library to convert Korean Hangul to Japanese Kana that is pronunciation friendly like: 사랑해요! -> サランヘヨ!.
- Support Patchim and Sandhi
- Dictionary-based
- Fully-offline
- Pronunciation friendly kana result for Japanese
- TypeScript support

## Installation
```bash
npm install hangul-to-kana
```

## Example Usage

### Javascript or TypeScript
```js
import HangulToKana from 'hangul-to-kana';

const kanaString = HangulToKana.convert('사랑해요!').toString();
console.log(kanaString); // 'サランヘヨ!'
```

### CLI
```bash
$ hangul-to-kana 사랑해요!
サランヘヨ!
```

## API Usage
### Hangul Detection
You can get whether the string is Hangul or not by using `HangulToKana.isHangul(char: string): boolean` method.
If the argument is more than one letter, only first letter is checked.

```typescript
import HangulToKana from 'hangul-to-kana';

HangulToKana.isHangul('가'); // true
HangulToKana.isHangul('a'); // false
```

### Convert Hangul to Kana
You can convert Hangul to Kana by using `HangulToKana.convert(str: string): TextRun` method.
This method returns `TextRun` instance, that provides 3 kinds of useful type of result type.
```typescript
import HangulToKana from 'hangul-to-kana';

const result = HangulToKana.convert('I love you is 사랑해요 in Korean.');

result.toString(); // 'I love you is サランヘヨ in Korean.'
result.toStringWithBracketedKana(); // 'I love you is 사랑해요(サランヘヨ) in Korean.'
result.toStringWithBracketedKana('->', ''); // 'I love you is 사랑해요->サランヘヨ in Korean.'

result.toRun();
/*
[
  { isHangul: false, text: 'I love you is ' },
  { isHangul: true, text: '사랑해요', kana: 'サランヘヨ' },
  { isHangul: false, text: ' in Korean.' },
]
*/
```

## CLI Usage
To use CLI, installing `hangul-to-kana` globally is useful.
```bash
npm install -g hangul-to-kana
```

Then, you can use `hangul-to-kana` command.
```bash
$ hangul-to-kana "사랑해요!"
サランヘヨ!
```

With `-b` or `--kana-bracketed` option, you can get kana with bracketed.
```bash
$ hangul-to-kana -b "I love you is 사랑해요 in Korean."
I love you is 사랑해요(サランヘヨ) in Korean.
```

## Contributing
See [CONTRIBUTING.md](CONTRIBUTING.md).

## Author
Daisuke Akazawa (akkadaska) [GitHub](https://github.com/akkadaska) [Twitter](https://twitter.com/akkadaska)

## Contributors
### language support for hangul pronunciation
- Fugo Amano

## License
&copy; Daisuke Akazawa, 2022. Licensed under a [MIT license](./LICENSE).
