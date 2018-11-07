import express from 'express';
import React from 'preact-compat';
import { renderToNodeStream } from 'react-dom/server';
import { ServerLocation } from 'preact-router';
import fs from 'fs';
import App from './src/App.jsx';

const PORT = process.env.PORT || 3000;

const html = fs.readFileSync('dist/index.html').toString();
const parts = html.split('not rendered');

const app = express();

app.use('/dist', express.static('dist'));
app.use((req, res) => {
  res.write(parts[0]);
  const reactMarkup = (
    <ServerLocation url={req.url}>
      <App />
    </ServerLocation>
  );

  //Create node stream
  const stream = renderToNodeStream(reactMarkup);
  //streams output to res
  stream.pipe(
    res,
    { end: false }
  );
  //finish writing last part of rendered markup and end
  stream.on('end', () => {
    res.write(parts[1]);
    res.end();
  });
});

console.log(`listening on ${PORT}`);
app.listen(PORT);
