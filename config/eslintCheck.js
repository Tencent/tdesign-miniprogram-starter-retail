/* eslint-disable prefer-template */
/**
 * 工程代码pre-commit 检查工具
 * @date 2019.9.4
 * @author 310227663@qq.com
 */
const { exec } = require('child_process');
const chalk = require('chalk');
const { CLIEngine } = require('eslint');
const cli = new CLIEngine({});
const { log } = console;

function getErrorLevel(number) {
  switch (number) {
    case 2:
      return 'error';
    case 1:
      return 'warn';
    default:
  }
  return 'undefined';
}
let pass = 0;
exec(
  'git diff --cached --name-only --diff-filter=ACM | grep -Ei "\\.ts$|\\.js$"',
  (error, stdout) => {
    if (stdout.length) {
      const array = stdout.split('\n');
      array.pop();
      const { results } = cli.executeOnFiles(array);
      let errorCount = 0;
      let warningCount = 0;
      results.forEach((result) => {
        errorCount += result.errorCount;
        warningCount += result.warningCount;
        if (result.messages.length > 0) {
          log('\n');
          log(result.filePath);
          result.messages.forEach((obj) => {
            const level = getErrorLevel(obj.severity);
            if (level === 'warn')
              log(
                ' ' +
                obj.line +
                ':' +
                obj.column +
                '\t ' +
                chalk.yellow(level) +
                ' \0  ' +
                obj.message +
                '\t\t' +
                chalk.grey(obj.ruleId) +
                '',
              );
            if (level === 'error')
              log(
                ' ' +
                obj.line +
                ':' +
                obj.column +
                '\t ' +
                chalk.red.bold(level) +
                ' \0  ' +
                obj.message +
                '\t\t ' +
                chalk.grey(obj.ruleId) +
                '',
              );
            if (level === 'error') pass = 1;
          });
        }
      });
      if (warningCount > 0 || errorCount > 0) {
        log(
          '\n' +
          chalk.bgRed.bold(errorCount + warningCount + ' problems') +
          ' (' +
          chalk.red.bold(errorCount) +
          ' errors, ' +
          chalk.yellow(warningCount) +
          ' warnings) \0',
        );
      }
      !pass && log(chalk.green.bold('~~ Done: 代码检验通过，提交成功 ~~'));
      process.exit(pass);
    }
    if (error !== null) {
      log(`exec error: ${error}`);
    }
  },
);
