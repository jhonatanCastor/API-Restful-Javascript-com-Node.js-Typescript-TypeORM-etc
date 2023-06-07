import { EntityRepository, Repository } from "typeorm";
import UserToken from "../userToken/UserToken";
@EntityRepository(UserToken)
export default class UserTokenRepósitory extends Repository<UserToken> {

  public async findByToken(token: string): Promise<UserToken | undefined> {

    const userToken = await this.findOne({
      where: {
        token,
      },
    });

    return userToken;
  }

  public async generate(users_id: string): Promise<UserToken> {

    const userToken = this.create({
      users_id,
    });

    await this.save(userToken);

    return userToken;
    
  }
}
