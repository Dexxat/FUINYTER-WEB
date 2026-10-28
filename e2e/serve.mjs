// Sirve dist/ bajo /FUINYTER-WEB/, igual que GitHub Pages en un repositorio de proyecto.
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';

const ROOT = 'dist/fuinyter-web/browser';
const PREFIX = '/FUINYTER-WEB/';
const PORT = Number(process.env.PORT ?? 4317);
const TYPES = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css',
  '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png', '.pdf': 'application/pdf',
};

createServer(async (req, res) => {
  const url = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (!url.startsWith(PREFIX)) { res.writeHead(404).end('Not found'); return; }
  let file = join(ROOT, normalize(url.slice(PREFIX.length)));
  try {
    if ((await stat(file)).isDirectory()) file = join(file, 'index.html');
    const body = await readFile(file);
    res.writeHead(200, { 'content-type': TYPES[extname(file)] ?? 'application/octet-stream' }).end(body);
  } catch {
    res.writeHead(404).end('Not found');
  }
}).listen(PORT, () => console.log(`http://localhost:${PORT}${PREFIX}`));
