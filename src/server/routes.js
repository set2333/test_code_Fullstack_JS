import { WebSocketServer } from 'ws';
import { MAX_MESSAGE_COUNT, WS_SERVER, HEADERS, ACTIONS } from '../consts.js';
import Messages from './messages.js';
import { parseBody } from './utils.js';

const wss = new WebSocketServer({ port: WS_SERVER.PORT });

const messages = new Messages(
  MAX_MESSAGE_COUNT,
  {
    onAdded: payload => wss.clients.forEach(client =>
      client.send(JSON.stringify({ type: ACTIONS.ADDED, payload }))
    ),
    onRemoved: payload => wss.clients.forEach(client =>
      client.send(JSON.stringify({ type: ACTIONS.REMOVED, payload }))
    )
  },
);

export const routes = {
  GET: {
    getAllMessages: (req, res) => res
      .writeHead(200, HEADERS)
      .end(JSON.stringify({ type: ACTIONS.SET, payload: messages.getMessages()})),
  },
  POST: {
    addMessage: async (req, res) => {
      const { message } = await parseBody(req);
      messages.addMessage(message);
      res.writeHead(200, HEADERS).end();
    },
  },
  OPTIONS: {
    default: (req, res) => {
      res.writeHead(200, HEADERS);
      res.end();
    },
  },
  default: (req, res) => {
    res.writeHead(405, HEADERS);
    res.end(`${req.method} is not allowed for the request.`);
  },
};
