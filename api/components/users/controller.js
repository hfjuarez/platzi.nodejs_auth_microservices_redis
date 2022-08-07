import service from "./service.js";

class Controller {
  constructor(injectedService) {
    this.service = injectedService;
  }
  list = () => this.service.list();
  get = (id) => this.service.get(id);
  create = (data) => this.service.create(data);
  update = (id, data) => this.service.update(id, data);
}

const instance = new Controller(service);

export default Object.freeze(instance);
