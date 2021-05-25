'use strict';

const chulk = require(`chalk`);
const {ExitCode} = require(`../../constants`);
const {CliCommand} = require(`./constants`);

const HELP_TEXT = `
Программа запускает http-сервер и формирует файл с данными для API.

Гайд:
${chulk.yellow(`service.js <command>`)}

Команды:
${chulk.yellow(CliCommand.VERSION)}            выводит номер версии
${chulk.yellow(CliCommand.HELP)}               печатает этот текст
${chulk.yellow(CliCommand.GENERATE)}           формирует файл mocks.json
`;

module.exports = {
  name: CliCommand.HELP,
  run() {
    console.info(HELP_TEXT);
    process.exit(ExitCode.SUCCESS);
  },
};
