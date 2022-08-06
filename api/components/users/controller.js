import service from "./service.js";

class Controller {
  constructor(injectedService) {
    this.service = injectedService;
  }
  list = () => this.service.list();
  get = (id) => this.service.get(id);
  upsert = (data) => this.service.upsert(data);
}

const instance = new Controller(service);

export default Object.freeze(instance);
