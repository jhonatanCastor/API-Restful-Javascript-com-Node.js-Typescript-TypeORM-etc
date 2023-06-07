import { getCustomRepository } from "typeorm";
import User from "../User";
import UserRepósitory from "../UserRepository";

interface IRequest {
  user_id: string;
}

export default class ShowProfileService {
  public async execute({ user_id }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepósitory);

    const user = await userRepository.findById(user_id);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }
}
