import { getCustomRepository } from "typeorm";
import Customer from "../customer";
import CustomerRepósitory from "../customersRepository";

interface IPaginateCustomer {
   from: number;
   to: number;
   per_page: number;
   total: number;
   current_page: number;
   prev_page: number | null;
   next_page: number | null;
   data: Customer[];
}
export default class ListCustomerService {
  public async execute(): Promise<IPaginateCustomer> {
    const customerRepository = getCustomRepository(CustomerRepósitory);

    const customer = await customerRepository.createQueryBuilder().paginate();

    return customer as IPaginateCustomer;
  }
}
