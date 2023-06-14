import Customer from "../customer";
import CustomersRepository from "../customersRepository";
import AppError from "@shared/errors/AppError"
import { getCustomRepository } from "typeorm"

interface IRequest {
  id: string;
  name: string;
  email: string
}

export default class UpdateCustomerService {
  public async execute({ id, name, email, }: IRequest): Promise<Customer> {
    const customerRepository = getCustomRepository(CustomersRepository);

    const customer = await customerRepository.findById(id);

    if (!customer) {
      throw new AppError('User does not exist', 404)
    }

    const customerExist = await customerRepository.findEmail(email);

    if (customerExist && email !== customer.email) {
      throw new AppError('There is already one customer with this email.', 404)
    }

    customer.name = name;
    customer.email = email;

    await customerRepository.save(customer);

    return customer;
  }
}