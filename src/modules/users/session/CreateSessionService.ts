import { getCustomRepository } from "typeorm";
import User from "../User";
import UserRepósitory from "../UserRepository";
import { compare } from "bcryptjs";

interface IRequest {
  email: string;
  password: string;
}

class CreateSessionService {
  public async execute({ email, password}: IRequest): Promise<User>{

    const userRepository = getCustomRepository(UserRepósitory);
    const user = await userRepository.findEmail(email);

    if(!user){
      throw new Error('Incorrect email/password combination.');
    }

    const passwordConfirmed = await compare(password, user.password)

    if(!passwordConfirmed){
      throw new Error('Incorrect email/password combination.');
    }

    return user
    
  }
}

export default CreateSessionService;