import { messageRepository, userRepository } from '../adapters/mongodb.js';
import * as core from '../core/index.js';

export const sendMessageRoute = async (req, res) => {
  const sender = req.auth?.userId;
  const recipient = req.body.recipient;
  
  const content = req.body.content;

  const sendResult = core.sendMessage({ from: sender, to: recipient, content });
  
  if (!sendResult) {
    res.status(500);
    res.send('Internal error sending message');
    return;
  };

  await messageRepository.save({ sender, recipient, content });
  res.sendStatus(200); 
}

export const getMessagesRoute = async (req, res) => {
  const { recipient, start, limit = 100 } = req.body;

  const messages = await messageRepository.findMessagesStartingFrom(recipient, start, limit);

  res.json({ messages });
}