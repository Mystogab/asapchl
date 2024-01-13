import { createUser } from '../core/index.js';

const repository = { save: () => 'theIdOfTheSavedUser'}

// FIXME: Read it from config or environment or side-load via SSM in deployment time
const pepper = 'redpepper';

export const createUserRoute = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(404);
    return 'Missing username or password in body';
  }

  const user = await createUser(username, password, pepper);

  const userId = await repository.save(user);

  res.status(201);
  return { id: userId };
}