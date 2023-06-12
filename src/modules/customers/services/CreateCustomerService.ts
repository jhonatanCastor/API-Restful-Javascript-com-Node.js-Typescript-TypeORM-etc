import { getCustomRepository } from "typeorm"
import Customer from "../customer";
import CustomerRepósitory from "../customersRepository";
import AppError from "@shared/errors/AppError";
interface IRequest {
  name: string,
  email: string,
}
export default class CreateCustomerService {
  public async execute({ name, email, }: IRequest): Promise<Customer | void> {
    const customerRepository = getCustomRepository(CustomerRepósitory);

    const customerxist = await customerRepository.findEmail(email);

    if (customerxist) {
      throw new AppError("E-mail address already used.");
    }

    const customer = customerRepository.create({
      name,
      email,
    });

    await customerRepository.save(customer);

    return customer;

  }
}

