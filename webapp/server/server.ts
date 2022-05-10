const fs = require('fs');
const https = require('https');
const http = require('http');
const express = require('express');
const path = require('path');
const app = express();

import {
    SSL_KEY,
    SSL_PEM,
    SSL_PFX,
    KEY_PASS,
    HTTPS_ON,
    HTTP_API_URL,
    HTTPS_API_URL,
    PORT
} from './config/ConfigEnv';

//TODO: Seperate Proxy to a different file
const proxy = require('http-proxy-middleware');

if(HTTPS_ON == 'YES') {
    app.use(proxy('/api', {
        target: `${HTTPS_API_URL}`,
        secure: false,
        changeOrigin: true,
        pathRewrite: {'^/api' : ''}
    }));
} else {
    app.use(proxy('/api', {
        target: `${HTTP_API_URL}`,
        secure: false,
        changeOrigin: true,
        pathRewrite: {'^/api' : ''}
    }));
}

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', function (req, res) {
    return res.send('pong');
});
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

//SET UP PROXY
if (HTTPS_ON == 'YES') {
    const credentials = {
        key: fs.readFileSync(SSL_KEY),
        cert: fs.readFileSync(SSL_PEM),
        // pfx: fs.readFileSync(SSL_PFX),
        rejectUnauthorized: false,
        passphrase: KEY_PASS
    };
    let httpsServer = https.createServer(credentials, app);
    httpsServer.listen(PORT);
    console.info(`Rebloc mvp running on https port ${PORT}.`);
}
else {
    let httpServer = http.createServer(app);
    httpServer.listen(PORT);
    console.info(`Rebloc mvp running on http port ${PORT}`);
}