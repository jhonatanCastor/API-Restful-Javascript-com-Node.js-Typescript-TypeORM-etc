import { getCustomRepository } from "typeorm";
import Customer from "../customer";
import CustomerRepósitory from "../customersRepository";

export default class ListCustomerService {
  public async execute(): Promise<Customer[]> {
    const customerRepository = getCustomRepository(CustomerRepósitory);

    const customer = await customerRepository.find();

    return customer;
  }
}
