import UserRepósitory from "@modules/users/UserRepository";
import { getCustomRepository } from "typeorm";
import { isAfter, addHours } from 'date-fns';
import { hash } from "bcryptjs";
import UserTokenRepósitory from '../UserTokenRepository';
import AppError from "@shared/errors/AppError";


interface IRequest {
  token: string;
  password: string
}

class ResetPasswordUser {
  public async execute({ token, password }: IRequest): Promise<void> {
    const userRepository = getCustomRepository(UserRepósitory);
    const userTokenRepository = getCustomRepository(UserTokenRepósitory);

    const userToken = await userTokenRepository.findByToken(token)

    if (!userToken) {
      throw new AppError('user Token does not exists.')
    }

    const user = await userRepository.findById(userToken.users_id);

    if(!user) {
      throw new AppError('User does not exists.')
    }

    const tokenCreateAt = userToken.created_at;
    const compareDate = addHours(tokenCreateAt, 2);

    if(isAfter(Date.now(), compareDate)){
      throw new AppError('Token expired.')
    }

    user.password = await hash(password, 8);

  }
}

export default ResetPasswordUser;