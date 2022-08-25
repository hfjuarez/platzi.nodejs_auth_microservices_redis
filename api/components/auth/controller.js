import service from "./service.js";

class Controller {
  constructor(injectedService) {
    this.service = injectedService;
  }
  list = () => this.service.list();
  login = async (data) => await this.service.login(data);
  validate = async (data) => await this.service.validate(data);
  create = async (data) => await this.service.create(data);
}

const instance = new Controller(service);

export default Object.freeze(instance);
