import functions from 'firebase-functions';
import applePayHandlers from './handlers/apple-pay.js';
import merchantHandlers from './handlers/merchants.js';

const methods = {
  ...applePayHandlers,
  ...merchantHandlers,
};

// add API prefix for each handler
Object.keys(methods).forEach(k => (methods[`/api/${k}`] = methods[k]));

export const api = functions.https.onRequest((req, res) => {
  const method = methods[req.url];

  res.setHeader('Access-Control-Allow-Origin', '*');

  if (!method) {
    res.status(404);
    res.send('Not found');
  }

  method(req, res);
});
