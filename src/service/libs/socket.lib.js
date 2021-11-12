'use strict';

const {Server} = require(`socket.io`);
const {HttpRequestMethod} = require(`../../common/enums`);
const {API_PORT, APP_PORT} = require(`../../common/constants`);

module.exports = (server) => {
  return new Server(server, {
    cors: {
      origins: [`localhost:${API_PORT}`, `localhost:${APP_PORT}`],
      methods: [HttpRequestMethod.GET],
      credentials: true,
    },
  });
};
