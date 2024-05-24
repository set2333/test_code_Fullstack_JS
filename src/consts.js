export const ACTIONS = {
  ADDED: 'ADDED',
  REMOVED: 'REMOVED',
  SET: 'SET',
}

export const HTTP_SERVER = {
  PORT: 8080,
  PROTOCOL: 'http',
  HOST: 'localhost',
}

export const WS_SERVER = {
  PORT: 8081,
  PROTOCOL: 'ws',
  HOST: 'localhost',
}

export const MAX_MESSAGE_COUNT = 9;

export const HEADERS = {
  'Access-Control-Allow-Origin': 'http://localhost:3000',
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
  'Access-Control-Max-Age': 2592000,
};
