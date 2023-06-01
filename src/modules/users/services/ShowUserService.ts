import { getCustomRepository } from "typeorm";
import User from "../User";
import UserRepósitory from "../UserRepository";

interface IRequest {
  id: string;
}

class ShowUserService {
  public async execute({ id }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepósitory);

    const user = await userRepository.findOne(id);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }
}

export default ShowUserService;