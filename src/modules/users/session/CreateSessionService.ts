import { getCustomRepository } from "typeorm";
import User from "../User";
import UserRepósitory from "../UserRepository";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
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

    const token = sign({}, '0fe292f931711d1bbd645b0b29b46e32', {
      subject: user.id,
      expiresIn: '1d',
    });

    return {
      user,
      token
    }
    
  }
}

export default CreateSessionService;