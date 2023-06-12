import { getCustomRepository } from "typeorm";
import User from "../User";
import UserRepósitory from "../UserRepository";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import ahthConfing from '@config/auth'
interface IRequest {
  email: string;
  password: string;
}
interface IRespose {
  user: User;
  token: string;
}
class CreateSessionService {
  public async execute({ email, password}: IRequest): Promise<IRespose>{
    const userRepository = getCustomRepository(UserRepósitory);
    const user = await userRepository.findEmail(email);

    if(!user){
      throw new Error('Incorrect email/password combination.');
    }

    const passwordConfirmed = await compare(password, user.password)

    if(!passwordConfirmed){
      throw new Error('Incorrect email/password combination.');
    }

    const token = sign({}, ahthConfing.jwt.secret, {
      subject: user.id,
      expiresIn: ahthConfing.jwt.expiresIn,
    });

    return {
      user,
      token
    }
    
  }
}

export default CreateSessionService;