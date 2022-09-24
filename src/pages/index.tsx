import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import HangulToKana, { Run } from 'hangul-to-kana';

const Home: NextPage = () => {
  const [hangul, setHangul] = React.useState('안녕하세요!');
  const [runLines, setRunLines] = React.useState<Run[][]>([]);
  const handleHangulChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setHangul(e.target.value);
  };
  React.useEffect(() => {
    const hangulLines = hangul.split('\n');
    const newRunLines = hangulLines.map((line) =>
      HangulToKana.convert(line).toRun(),
    );
    setRunLines(newRunLines);
  }, [hangul]);
  return (
    <>
      <Head>
        <title>Hangul to Kana / ハングル・カナ変換 / 한글을 가나로 변환</title>
      </Head>
      <hr className="m-0 p-0 border-none w-full h-5 bg-green-600" />
      <header className="p-2 text-center">
        <h1 className="text-2xl text-green-800 font-bold">
          Hangul to Kana / ハングル・カナ変換 / 한글을 가나로 변환
        </h1>
      </header>
      <main className="m-auto p-1 lg:p-4 max-w-5xl">
        <section className="p-4">
          <textarea
            rows={7}
            className="w-full bg-white text-slate-600 border-2 border-green-600 text-xl rounded p-2"
            value={hangul}
            onChange={handleHangulChange}
          ></textarea>
        </section>
        <section className="text-center text-green-600 text-4xl lg:text-6xl">
          ↓
        </section>
        <section className="p-4 text-2xl lg:text-3xl text-slate-600 leading-loose">
          {runLines.map((line, index) => (
            <ShowLine key={index} line={line} />
          ))}
        </section>
        <section className="mt-8 p-4 text-center">
          <p className="text-green-600">
            <code className="font-bold">hangul-to-kana</code> version: 1.0.0
          </p>
        </section>
        <hr className="mt-10 mb-10" />
        <section className="text-center text-slate-600 p-4">
          <h2 className="text-2xl text-green-800 font-bold m-4">
            Convert Hangul to Kana in your Node.js project, website or CLI
          </h2>
          <p>
            Getting started with{' '}
            <code className="text-green-600 font-bold">hangul-to-kana</code> npm
            package is easy. Just install it with npm:
          </p>
          <pre className="bg-slate-100 m-2 p-2 rounded">
            $ npm install hangul-to-kana
          </pre>
          <p>
            For more information, please visit{' '}
            <a
              className="text-green-800 font-bold underline"
              href="https://www.npmjs.com/package/hangul-to-kana"
              target="_blank"
              rel="noreferrer"
            >
              npm package page
            </a>{' '}
            or{' '}
            <a
              className="text-green-800 font-bold underline"
              href="https://github.com/akkadaska/hangul-to-kana"
              target="_blank"
              rel="noreferrer"
            >
              GitHub repository
            </a>
            .
          </p>
        </section>
      </main>
      <footer className="p-4 text-slate-400 text-center">
        <p>&copy; 2022 Daisuke Akazawa (akkadaska)</p>
        <p>
          <a
            className="underline"
            href="https://github.com/akkadaska"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>{' '}
          /{' '}
          <a
            className="underline"
            href="https://twitter.com/akkadaska"
            target="_blank"
            rel="noreferrer"
          >
            Twitter
          </a>
        </p>
      </footer>
    </>
  );
};

const ShowLine = ({ line }: { line: Run[] }) => {
  return (
    <p>
      {line.map((run, index) => (
        <ShowRun key={index} run={run} />
      ))}
    </p>
  );
};

const ShowRun = ({ run }: { run: Run }) => {
  if (run.isHangul) {
    return (
      <span className="hover:text-green-600 hover:underline transition ease-in-out">
        <ruby>
          {run.text}
          <rt>{run.kana}</rt>
        </ruby>
      </span>
    );
  }
  return <span>{run.text}</span>;
};

export default Home;
