'use strict';

const chulk = require(`chalk`);
const {ExitCode} = require(`../../constants`);
const {CliCommand} = require(`./constants`);

const HELP_TEXT = `
Программа запускает http-сервер и формирует файл с данными для API.

Гайд:
service.js <command>

Команды:
${CliCommand.VERSION}            выводит номер версии
${CliCommand.HELP}               печатает этот текст
${CliCommand.GENERATE}           формирует файл mocks.json
`;

module.exports = {
  name: CliCommand.HELP,
  run() {
    console.info(chulk.gray(HELP_TEXT));
    process.exit(ExitCode.SUCCESS);
  },
};
