# Contributing to Hangul To Kana
Thank you for investing your time in contributing to this project! Any contribution you make will be reflected on [npm](https://www.npmjs.com/package/hangul-to-kana).

## Issues
### Create a new issue
If you spot a problem with the codes, search if an issue already exists. If a related issue doesn't exist, you can open a new issue using a relevant issue form.

### Solve an issue
Scan through our existing issues to find one that interests you. As a general rule, we don’t assign issues to anyone. If you find an issue to work on, you are welcome to open a PR with a fix.

## Make Changes
1. Fork the repository.
2. Install Node.js v16 or later.
3. Install dependencies by running `npm install`.
4. Start your work!

### Linting
We use ESLint to lint our code. You can run `npm run lint` to check if your code is linted and `npm run lint:fix` to fix lint errors.
```bash
$ npm run lint
$ npm run lint:fix
```

### Testing
We use Jest to test our code. You can run `npm run test` to run tests and `npm run test:coverage` to run tests with coverage report.
```bash
$ npm run test
$ npm run test:coverage
```

### Performing Score
The hangul and its expected kana pairs are stored in `test/score/word-list.ts`, and the score is calculated by the number of pairs that are converted correctly (implemented in `test/score/perform.ts`). You can run `npm run score` to check the score.
```bash
$ npm run score
```

### Building
You can run `npm run build` to build the project. The built JavaScript and TypeScript types files are stored in `dist` directory.
```bash
$ npm run build
```
If you want to build and run the CLI, you can run `npm run start [CLI args]` instead.
```bash
$ npm run start [CLI args]
```

## Pull Requests
When you're finished with the changes, create a pull request.
- Make sure that your new code is linted and tested. No lint errors and all tests should pass. This is checked by GitHub Actions when you create a pull request.
- The Test coverage is preferred to be 100%. If you can't reach 100%, please explain why in the pull request description. The coverage report is available in the pull request checks.
- The score is preferred to be 100%. But it's OK if you can't reach 100%. The goal is to improve the score, not to reach 100%. The score report is available in the pull request checks.

### Create a new pull request
If you want to contribute to this project, you can create a new pull request from your branch in your forked repository to develop in the upstream branch.
- Fill the PR template.
- Link the issue(s) that your PR resolves.
- Enable the checkbox to confirm that your changes are satisfying the requirements of the pull request.
- Your code will be reviewed by the maintainers. If there are any problems, you will be notified in the pull request.
- After all the requirements are satisfied, your pull request will be merged to develop branch.
- Your changes will be released in the next version. It may take a few days to release.
