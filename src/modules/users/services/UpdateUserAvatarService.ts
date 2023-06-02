import { getCustomRepository } from "typeorm"
import path from 'path';
import fs from 'fs'
import User from "../User";
import UserRepósitory from "../UserRepository";
import uploadConfig from "@config/upload";

interface IRequest {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: IRequest): Promise<User | void> {
    const usersRepository = getCustomRepository(UserRepósitory);

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new Error('User not found');
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath)

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath)
      }
    }

    user.avatar = avatarFilename;

    await usersRepository.save(user);

    return user;

  }
}

export default UpdateUserAvatarService;