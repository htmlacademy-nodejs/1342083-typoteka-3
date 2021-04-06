'use strict';

const chulk = require(`chalk`);
const {EXIT_CODE} = require(`../../constants`);

const HELP_TEXT = `
Программа запускает http-сервер и формирует файл с данными для API.

Гайд:
${chulk.yellow(`service.js <command>`)}

Команды:
${chulk.yellow(`--version:`)}            выводит номер версии
${chulk.yellow(`--help:`)}               печатает этот текст
${chulk.yellow(`--generate <count>`)}    формирует файл mocks.json
`;

module.exports = {
  name: `--help`,
  run() {
    console.info(HELP_TEXT);
    process.exit(EXIT_CODE.success);
  },
};
