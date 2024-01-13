import crypto from 'crypto';

// TODO: Impelment server validation for user and password

const hashPassword = (password, pepper) => {
  const hash = crypto.createHash('sha512');
  const data = hash.update(`${password}|${pepper}`, 'utf-8');
  const hexHash = data.digest('hex');

  return hexHash;
}

// FIXME: We could use salt or salt and pepper
export const createUser = async (user, password, pepper) => {
  const hashedPassword = hashPassword(password, pepper);

  return { username: user, password: hashedPassword };
};
