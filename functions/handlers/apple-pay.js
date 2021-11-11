import fetch from 'node-fetch';
import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = fileURLToPath(import.meta.url);

export default {
  'authorize-merchant': (req, res) => {
    const keyPath = path.resolve(__dirname, '../../certs/applepay_id.pem');
    const certPath = path.resolve(__dirname, '../../certs/merchant_id.pem');
    console.log('apple request', keyPath, certPath);

    const appleRequest = {
      method: 'POST',
      body: JSON.stringify({
        merchantIdentifier: 'merchant.com.socsieng.tshirt-shop-demo',
        displayName: 'TShirt Shop Demo',
        initiative: 'web',
        initiativeContext: 'tshirt-shop-demo.web.app',
      }),
      header: {
        'Content-Type': 'application/json',
      },
      agent: new https.Agent({
        key: fs.readFileSync(keyPath),
        cert: fs.readFileSync(certPath),
      }),
    };

    console.log('fetch request', req.body, JSON.parse(appleRequest.body));

    return fetch(req.body.url, appleRequest)
      .then(response => response.json())
      .then(json => {
        console.log('fetch response', json);
        return res.send(json);
      });
  },
};
