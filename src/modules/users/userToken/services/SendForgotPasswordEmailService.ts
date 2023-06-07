import { getCustomRepository } from "typeorm"
import UserRepósitoryt from "@modules/users/UserRepository";
import AppError from "@shared/errors/AppError";
import UserTokenRepósitory from "../UserTokenRepository";
import EtherealMail from "@config/mail/EtherealMail";
import path from 'path';
interface IRequest {
  email: string,
}
export default class SendForgotPasswordEmailService {
  public async execute({ email }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UserRepósitoryt);
    const userTokenRepository = getCustomRepository(UserTokenRepósitory);

    const user = await usersRepository.findEmail(email);

    if (!user) {
      throw new AppError('User does not exists.', 404)
    }
    console.log(user);

    const token = await userTokenRepository.generate(user.id);

    const forgotPasswordTemplate = path.resolve(__dirname, '..', '..', 'views', 'forgot_password.hbs')

    await EtherealMail.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: 'Recuperação de senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `http://localhost:3000/reset_password?token=${token}`,
        },
      },
    });
  }
}
