import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import Customer from "../customer";
import CustomerRepository from "../customersRepository";

interface IRequest {
  id: string;
}
export default class ShowCustomerService {
  public async execute({ id }: IRequest): Promise<Customer> {
    const customerRepository = getCustomRepository(CustomerRepository);

    const customer = await customerRepository.findById(id);

    if (!customer) {
      throw new AppError("User not found");
    }
    
    return customer;
  }
}
