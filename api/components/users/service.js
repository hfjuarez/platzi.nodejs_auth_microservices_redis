import { nanoid } from 'nanoid';
import store from '../../../store/connection.js';
import { Ok } from '../../../utils/helpers/results.js';
import authController from '../auth/controller.js';

class Service {
  constructor(store, options = {}) {
    this.store = store;
    this.auth = options?.auth;
  }
  list = async () => Ok(await this.store.list());
  get = async (id) => Ok(await this.store.get({ id, keyName: 'id' }));
  create = async (body) => {
    if (!body.name) throw new Error('Name is empty');
    if (!body.username) throw new Error('Username is empty');
    if (!body.password) throw new Error('Password is empty');
    const user = {
      id: nanoid(),
      name: body.name,
      username: body.username,
    };
    await this.auth.create({
      id: user.id,
      username: user.username,
      password: body.password,
    });
    return Ok(
      await this.store.create({
        data: user,
      })
    );
  };
  update = async (id, body) => {
    if (!id && this.get(id)) throw new Error("ID doesn't exists");
    const user = {
      name: body.name,
    };
    return Ok(
      await this.store.update({
        id,
        data: user,
      })
    );
  };
}

const instance = new Service(store('users'), { auth: authController });

export default Object.freeze(instance);
