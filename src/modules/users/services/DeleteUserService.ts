import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import UserRepósitory from "../UserRepository";
interface IRequest {
  id: string;
}
export default class DeleteUserService {
  public async execute({ id }: IRequest): Promise<any> {
    const userRepository = getCustomRepository(UserRepósitory);

    const user = await userRepository.findById(id);
    
    if (!user) {
      throw new AppError("User not found");
    }
    
    await userRepository.remove(user);
  }
}
