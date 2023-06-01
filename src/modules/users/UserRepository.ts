import { EntityRepository, Repository } from "typeorm";
import User from "./User";

@EntityRepository(User)
export class UserRepósitory extends Repository<User> {

  public async findByName(name: string): Promise<User | undefined>{
    const user = await this.findOne({
      where: {
        name,
      },
    });
    return user;
  }

  public async findById(id: string): Promise<User | undefined>{
    const user = await this.findOne({
      where: {
        id,
      },
    });
    return user;
  }

  public async findEmail(email: string): Promise<User | undefined>{
    const user = await this.findOne({
      where: {
        email,
      },
    });
    return user;
  }

}