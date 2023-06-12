import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import CustomerRepository from "../customersRepository";
interface IRequest {
  id: string;
}
export default class DeleteCustomerService {
  public async execute({ id }: IRequest): Promise<any> {
    const customerRepository = getCustomRepository(CustomerRepository);

    const customer = await customerRepository.findById(id);
    
    if (!customer) {
      throw new AppError("Customer not found");
    }
    
    await customerRepository.remove(customer);
  }
}
