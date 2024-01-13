// const express = require('express');
import Fastify from 'fastify';
import * as userShell from './shell/userShell.js';
// const userController = require('./controllers/user.controller');
// const healthController = require('./controllers/health.controller');
// const authController = require('./controllers/auth.controller');
// const msgController = require('./controllers/message.controller');

const app = Fastify({
  logger: true
});

const port = process.env.PORT || 8080;

app.post('/check', () => ({ health: 'ok' }));
app.post('/user',  userShell.createUserRoute);
// app.post('/login', authController.login);

// TODO: these endpoints should be secured
// app.post('/messages', msgController.send);
// app.get('/messages',  msgController.get);

await app.listen({ hostname: '0.0.0.0', port });

// app.listen(port, () => {
//   console.log(`ASAPP Challenge app running on port ${port}`);
// });
