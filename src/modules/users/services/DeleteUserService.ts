import { getCustomRepository } from "typeorm";
import UserRepósitory from "../UserRepository";

interface IRequest {
  id: string;
}

class DeleteUserServe {
  public async execute({ id }: IRequest): Promise<any> {
    const userRepository = getCustomRepository(UserRepósitory);

    const user = await userRepository.findOne(id);

    if (!user) {
      throw new Error('User not found');
    }

    await userRepository.remove(user);
  }
}

export default DeleteUserServe;