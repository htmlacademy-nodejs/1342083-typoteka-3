'use strict';

const http = require(`http`);
const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const {CliCommand, ServerConfig, FilePath, HttpStatusCode, ContentType} = require(`./constants`);

module.exports = {
  name: CliCommand.SERVER,
  async run(args) {
    const [userPort] = args;
    const port = Number.parseInt(userPort, 10) || ServerConfig.DEFAULT_PORT;

    const sendResponse = (res, statusCode, message) => {
      const template = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Типотека</title>
        </head>
        <body>
          ${message}
        </body>
        </html>`;

      res.writeHead(statusCode, {
        'Content-Type': ContentType.HTML,
      });
      res.end(template);
    };

    const requestListener = async (req, res) => {
      const {url} = req;

      switch (url) {
        case `/`: {
          try {
            const content = await fs.readFile(FilePath.MOCK, `utf-8`);
            const mocks = JSON.parse(content);
            const markup = `<ul>${mocks.map(({title}) => `<li>${title}</li>`).join(``).trim()}</li>`;
            sendResponse(res, HttpStatusCode.OK, markup);
          } catch (err) {
            const {path} = err;
            console.error(chalk.red(err));
            sendResponse(res, HttpStatusCode.NOT_FOUND, `Не могу прочитать файл: ${path}`);
          }
          break;
        }
        default: {
          sendResponse(res, HttpStatusCode.NOT_FOUND, ServerConfig.NOT_FOUND_TEXT);
          break;
        }
      }
    };

    const httpServer = http.createServer(requestListener);
    httpServer
      .listen(port)
      .on(`listening`, () => {
        console.error(chalk.green(`Сервер запущен: http://localhost:${port}`));
      })
      .on(`error`, ({message}) => {
        console.error(chalk.red(`Ошибка при создании сервера: ${message}`));
      });
  },
};
