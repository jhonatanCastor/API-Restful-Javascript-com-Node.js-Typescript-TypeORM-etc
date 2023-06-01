import { getCustomRepository } from "typeorm";
import User from "../User";
import UserRepósitory from "../UserRepository";

interface IRequest {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar: string;
}

class UpdateUserService {
  public async execute({ id, name, email, password, avatar }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepósitory);

    const user = await userRepository.findOne(id);

    const userExist = await userRepository.findEmail(email);

    if (userExist && email != user?.email) {
      throw new Error('There is already one product with this name');
    }

    if (!user) {
      throw new Error('email not found')
    }

    user.name = name;
    user.email = email;
    user.password = password;
    user.avatar = avatar;

    await userRepository.save(user);

    return user;
  }
}

export default UpdateUserService;