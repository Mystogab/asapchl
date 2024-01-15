import mongoose from 'mongoose';
const { Schema } = mongoose;

await mongoose.connect('mongodb://127.0.0.1:27017/test')
  .then(() => console.log('MongoDB Connected!'));

const userSchema = new Schema({
  username: { type: String, index: true },
  password: String
});

const User = mongoose.model('User', userSchema);

const messageSchema = new Schema({
  timestamp: { type: Date, default: Date.now },
  sender: String,
  recipient: String,
  content: Object
});

const Message = mongoose.model('Message', messageSchema);

const findUser = async (username) => {
  const dbResult = await User.findOne({ username });

  return dbResult;
}

const saveUser = async (data) => {
  // const data = { username, password };
  const toSave = new User(data);
  const saveResult = await toSave.save();

  return saveResult?.id;
}

export const userRepository = {
  find: findUser,
  save: saveUser
}

const saveMessage = async (msg) => {
  const toSave = new Message(msg);
  const saveResult = await toSave.save();

  return saveResult?.id;
}

const findMessagesStartingFrom = async (recipientId, startMessageId, limit) => {
  const startingFromMessage = await Message.findOne({ _id: startMessageId});
  const startingTimestamp = startingFromMessage.timestamp;

  const messages = await Message.find({ recipient: recipientId, timestamp: { $gte: startingTimestamp}}, {}, { limit});

  return messages;
}

export const messageRepository = {
  save: saveMessage,
  findMessagesStartingFrom
};
