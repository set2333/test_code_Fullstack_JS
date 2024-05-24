import http from 'http';
import { routes } from './routes.js';
import { HTTP_SERVER } from '../consts.js';

http.createServer((req, res) => {
  const route = 
    routes?.[req.method]?.[req.url?.slice(1)]
    ?? routes?.[req.method]?.default
    ?? routes.default;

  return route(req, res);
}).listen(HTTP_SERVER.PORT)