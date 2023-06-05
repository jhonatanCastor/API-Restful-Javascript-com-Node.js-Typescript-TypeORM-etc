import { getCustomRepository } from "typeorm"
import UserRepósitoryt from "@modules/users/UserRepository";
import AppError from "@shared/errors/AppError";
import UserTokenRepósitory from "../UserTokenRepository";


interface IRequest {
  email: string,
}
class UserTokenEmailRepósitory {
  public async execute({ email }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UserRepósitoryt);
    const userTokenRepository = getCustomRepository(UserTokenRepósitory);

    const user = await usersRepository.findEmail(email);

    if (!user) {
      throw new AppError('User does not exists.')
    }

    const token = await userTokenRepository.generate(user.id);
    console.log(token);


  }
}

export default UserTokenEmailRepósitory;