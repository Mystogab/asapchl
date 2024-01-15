import * as core from '../core/index.js';
import { createToken } from '../helpers/auth.js';
import { userRepository as repository } from '../adapters/mongodb.js';

// const repository = { save: () => 'theIdOfTheSavedUser'}

// FIXME: Read it from config or environment or side-load via SSM in deployment time
const pepper = 'redpepper';

export const createUserRoute = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(404);
    res.send('Missing username or password in body');
    return;
  };

  const existingUser = await repository.find(username);

  if (existingUser) {
    res.status(404);
    res.send('Username already registered');
    return;
  }

  const user = await core.createUser(username, password, pepper);

  const userId = await repository.save(user);

  res.status(201);
  res.json({ id: userId });
};

export const loginRoute = async (req, res) => {
  const { username, password } = req.body;
  const dbUser = await repository.find(username);

  const areValidCredentials = await core.validateUser({ username, password}, dbUser, pepper);
  
  if (!areValidCredentials) {
    res.status(404);
    res.send('Invalid username or password');
    return;
  }

  const token = createToken({ username, userId: dbUser.id });

  res.status(201);
  res.send({ token });
}