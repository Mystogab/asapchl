// const express = require('express');
import express from 'express';
import bodyParser from 'body-parser';
import { secure } from './helpers/auth.js';
import * as userShell from './shell/userShell.js';
import * as messageShell from './shell/messageShell.js';

const app = express();

const port = process.env.PORT || 8080;
app.use(bodyParser.json());

app.post('/check', () => ({ health: 'ok' }));
app.post('/user',  userShell.createUserRoute);
// app.get('/test', secure, (_, res) => {
//   res.send('you are in a secured land' + JSON.stringify(_.auth));
//   return;
// });
app.post('/login', userShell.loginRoute);
app.post('/messages', secure, messageShell.sendMessageRoute);
app.get('/messages', secure, messageShell.getMessagesRoute);

app.listen(port);

// app.listen(port, () => {
//   console.log(`ASAPP Challenge app running on port ${port}`);
// });
