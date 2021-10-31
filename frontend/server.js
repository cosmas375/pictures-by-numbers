const path = require('path');
const fs = require('fs');
const express = require('express');
const { renderToString } = require('@vue/server-renderer');

const manifest = require('./dist/server/ssr-manifest.json');
const appPath = path.join(__dirname, './dist', 'server', manifest['app.js']);
const createApp = require(appPath).default;

const server = express();
server.use(
  '/fonts',
  express.static(path.join(__dirname, './dist/client', 'fonts'))
);
server.use(
  '/img',
  express.static(path.join(__dirname, './dist/client', 'img'))
);
server.use('/js', express.static(path.join(__dirname, './dist/client', 'js')));
server.use(
  '/css',
  express.static(path.join(__dirname, './dist/client', 'css'))
);
server.use(
  '/favicon.ico',
  express.static(path.join(__dirname, './dist/client', 'favicon.ico'))
);
server.use(
  '/site.webmanifest',
  express.static(path.join(__dirname, './dist/client', 'site.webmanifest'))
);
server.use('/robots.txt', express.static(path.join(__dirname, './robots.txt')));

const indexTemplate = fs.readFileSync(
  path.join(__dirname, '/dist/client/index.html'),
  'utf-8'
);

server.get('*', async (req, res) => {
  const { app, router } = await createApp();

  await router.push(req.url);
  await router.isReady();

  const appContent = await renderToString(app);

  const html = indexTemplate
    .toString()
    .replace('<div id="app">', `<div id="app">${appContent}`);

  res.setHeader('Content-Type', 'text/html');
  res.send(html);
});

const PORT = 8080;
console.log(`You can navigate to http://localhost:${PORT}`);
server.listen(PORT);
