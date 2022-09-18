import store from '../../../store/connection.js';
import { exists } from '../../../utils/helpers/index.js';
import { sign } from '../../../auth/index.js';
import { HandleError, Ok } from '../../../utils/helpers/results.js';
import { nanoid } from 'nanoid';
import { hash, compare } from 'bcrypt';
const week = 60;

class Service {
  constructor(store) {
    this.store = store;
  }
  login = async ({ username, password }) => {
    if (!exists(username))
      throw HandleError(new Error('Username is empty'), false);
    if (!exists(password))
      throw HandleError(new Error('Password is empty'), false);
    const auth = await this.get(username, 'username');
    if (
      !!auth &&
      (await compare(`${password}${auth.salt}`, auth.password)) &&
      auth?.username === username
    ) {
      const session = nanoid();
      const user = await store('users').get({
        id: username,
        keyName: 'username',
      });
      this.store.update({ id: auth.id, data: { ...auth, session } });
      return Ok({
        token: sign(
          { username, userId: user.id, session },
          { expiresIn: week }
        ),
      });
    }
    throw HandleError('Not authenticated', false);
  };
  get = async (id, keyName = 'id') => this.store.get({ id, keyName });
  create = async (data) => {
    if (!exists(data.id)) throw new Error('ID is empty');
    if (!exists(data.username)) throw new Error('Username is empty');
    if (!exists(data.password)) throw new Error('Password is empty');

    const salt = nanoid();
    const auth = {
      id: data.id,
      username: data.username,
      password: await hash(`${data.password}${salt}`, 7),
      session: null,
      salt,
    };
    return await this.store.create({
      data: auth,
    });
  };
}

const instance = new Service(store('auth'));

export default Object.freeze(instance);
