'use strict';

const chulk = require(`chalk`);
const {
  CliCommand,
  ExitCode,
} = require(`../../common/enums`);

const helpText = `
Программа запускает http-сервер и формирует файл с данными для API.

Гайд:
service.js <command>

Команды:
${CliCommand.VERSION}            выводит номер версии
${CliCommand.HELP}               печатает этот текст
${CliCommand.FILLDB} <count>     заполняет БД моковыми данными
${CliCommand.SERVER} <port>      запускает http-сервер
`;

module.exports = {
  name: CliCommand.HELP,
  run() {
    console.info(chulk.gray(helpText));
    process.exit(ExitCode.SUCCESS);
  },
};
