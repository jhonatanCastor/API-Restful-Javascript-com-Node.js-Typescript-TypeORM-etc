import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import Customer from "../customer";
import CustomerRepository from "../customersRepository";

interface IRequest {
  id: string;
}
export default class DeleteCustomerService {
  public async execute({ id }: IRequest): Promise<void> {
    const customerRepository = getCustomRepository(CustomerRepository);

    const customer = await customerRepository.findById(id);

    if (!customer) {
      throw new AppError("User not found");
    }
    
    await customerRepository.remove(customer);
  }
}
