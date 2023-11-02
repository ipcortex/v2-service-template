// uncomment below and import the defined DTO
// import /*UpsertDTO*/ '../dtos/UpsertDTO';
// uncomment below and import the model you defined in the prisma schema
// import /*type DefinedPrismaModel,*/ '@prisma/client';
// uncomment below and import the defined DAO
// import /*DefinedPrismaModelDAO*/ '../daos/ServiceDAO';
// import { HttpError } from '@ipcortex/commons';
import { HelloWorldDAO } from '../daos/helloWorldDAO';
import { HelloWorldDTO } from '../dtos/HelloWorldDTO';

export class ServiceModel {
  getHelloWorld = () => {
    return 'Hello world';
  };

  postGetWorld = async (helloWorldPostObject: HelloWorldDTO) => {
    return await HelloWorldDAO.createHelloWorld(helloWorldPostObject);
    // try {
    //   const validationErrors = await validate(
    //     plainToInstance(HelloWorldDTO, req.body),
    //     { validationError: { target: false } },
    //   );
    //   if (validationErrors.length > 0) {
    //     throw new HttpError('Validation error', 400, validationErrors);
    //   }
    //   const result = HelloWorldDAO.createHelloWorld(req);
    //   res.status(201).json(result);
    // } catch (e) {
    //   logger.error(e instanceof Error ? e.message : e);
    //   throw new HttpError('Server Error', 500, { e });
    // }
    // };
    // below are some examples of business logic functions
    /*
  async upsert(endpoint: UpsertEndpointDTO): Promise<Endpoint> {
    return endpoint.id ? await definedPrismaModelDAO.update(endpoint) : await definedPrismaModelDAO.add(endpoint);
  }

  async get(id: string) : Promise<Endpoint> {
    return await definedPrismaModelDAO.getById(id);
  }
  */
  };
}
