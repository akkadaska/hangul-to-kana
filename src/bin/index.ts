#!/usr/bin/env node

import HangulToKanaCLI from './bin';

(() => {
  HangulToKanaCLI.run(process.argv.slice(2));
})();
