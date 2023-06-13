import { EntityRepository, Repository } from "typeorm";
import Customer from "./customer";
@EntityRepository(Customer)
export default class CustomersRepository extends Repository<Customer> {

  public async findByname(name: string): Promise<Customer | undefined> {
    const customers = await this.findOne({ where: { name } });
    return customers;
  }

  public async findById(id: string): Promise<Customer | undefined> {
    const customers = await this.findOne({
      where: {
        id,
      },
    });
    return customers;
  }

  public async findEmail(email: string): Promise<Customer | undefined> {
    const customers = await this.findOne({
      where: {
        email,
      },
    });
    return customers;
  }

}