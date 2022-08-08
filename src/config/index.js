export const API_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://small-talk-server.herokuapp.com'
    : 'http://localhost:8080';
