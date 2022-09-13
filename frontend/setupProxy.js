const {createProxyMiddleware} = require('http-proxy-middleware');

//TODO: fix Webpack warnings on yarn start
module.exports = function (app) {
  app.use(
    '/v1',
    createProxyMiddleware({
      target: 'http://localhost:8080',
      changeOrigin: true,
    }),
  );
};
