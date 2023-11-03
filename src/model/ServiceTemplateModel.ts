import { HelloWorldDAO } from '../daos/ServiceTemplateDAO';
import { HelloWorldDTO } from '../dtos/HelloWorldDTO';

export class HelloWorldModel {
  getHelloWorld = () => {
    return HelloWorldDAO.getHelloWorld();
  };

  postGetWorld = async (helloWorldPostObject: HelloWorldDTO) => {
    return await HelloWorldDAO.createHelloWorld(helloWorldPostObject);
  };

  getHelloWorldById = async (id: string) => {
    return await HelloWorldDAO.getHelloWorldById(id);
  };

  updateHelloWorldById = async (
    helloWorldPostObject: HelloWorldDTO,
    id: string,
  ) => {
    return await HelloWorldDAO.updateHelloWorldById(helloWorldPostObject, id);
  };
}
