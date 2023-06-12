import { getCustomRepository } from "typeorm";
import User from "../User";
import UserRepósitory from "../UserRepository";
class ListUserService {
  public async execute(): Promise<User[]> {
    const userRepository = getCustomRepository(UserRepósitory);

    const user = await userRepository.find();

    return user;
  }
}

export default ListUserService;