import { getCustomRepository } from "typeorm"
import User from "../User";
import UserRepósitory from "../UserRepository";
import { hash } from "bcryptjs";

interface IRequest {
  name: string,
  email: string,
  password: string,
}

class CreateUserService {
  public async execute({ name, email, password }: IRequest): Promise<User | void> {
    const usersRepository = getCustomRepository(UserRepósitory);
    const userExist = await usersRepository.findEmail(email);

    if (userExist) {
      throw new Error("E-mail address already used.");
    }

    const hashedPassword = await hash(password, 8)

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await usersRepository.save(user);

  }
}

export default CreateUserService;