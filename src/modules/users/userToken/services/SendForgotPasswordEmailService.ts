import { getCustomRepository } from "typeorm"
import UserRepósitoryt from "@modules/users/UserRepository";
import AppError from "@shared/errors/AppError";
import UserTokenRepósitory from "../UserTokenRepository";
import EtherealMail from "@config/mail/EtherealMail";

interface IRequest {
  email: string,
}

class SendForgotPasswordEmailService {
  public async execute({ email }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UserRepósitoryt);
    const userTokenRepository = getCustomRepository(UserTokenRepósitory);

    const user = await usersRepository.findEmail(email);

    if (!user) {
      throw new AppError('User does not exists.', 404)
    }
    
    const token = await userTokenRepository.generate(user.id);

    
    await EtherealMail.sendMail({
      to: email,
      body: `Solicitação de redefinição de senha recebida: ${token?.token}`,
    });

  }
}

export default SendForgotPasswordEmailService;