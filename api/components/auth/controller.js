import { exits } from "../../../helpers/index.js";
import service from "./service.js";

class Controller {
  constructor(injectedService) {
    this.service = injectedService;
  }
  upsert = (data) => {
    const auth = {
      id: data.id,
    };
    if (!exits(data.id)) throw new Error("id doesn't exits");
    if (exits(data.username)) auth.username = data.username;
    if (exits(data.password)) auth.password = data.password;
    return this.service.upsert(auth);
  };
}

const instance = new Controller(service);

export default Object.freeze(instance);
