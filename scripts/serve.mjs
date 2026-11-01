import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
const root = path.resolve(process.argv[2] || '.');
const port = Number(process.env.PORT || 4173);
const types = { '.html':'text/html; charset=utf-8', '.css':'text/css', '.js':'text/javascript', '.webp':'image/webp', '.svg':'image/svg+xml', '.woff2':'font/woff2', '.txt':'text/plain' };
http.createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    let file = path.resolve(root, '.' + pathname);
    if (file !== root && !file.startsWith(root + path.sep)) throw Error('Invalid path');
    let info = await stat(file).catch(() => null);
    if (!info && root === path.resolve('.')) {
      file = path.resolve(root, 'public', '.' + pathname);
      if (!file.startsWith(path.join(root, 'public') + path.sep)) throw Error('Invalid path');
      info = await stat(file);
    }
    if (info?.isDirectory()) file = path.join(file, 'index.html');
    const data = await readFile(file);
    res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream', 'Cache-Control':'no-cache' });
    res.end(req.method === 'HEAD' ? undefined : data);
  } catch { res.writeHead(404, {'Content-Type':'text/plain; charset=utf-8'}); res.end('Страница не найдена'); }
}).listen(port, '0.0.0.0', () => console.log(`Local: http://localhost:${port}`));
