import { Request, Response } from "express";
import ListUserService from "../services/ListUserService";
import CreateUserService from "../services/CreateUserService";
import ShowProfileService from "../services/ShowProfileService";
class UserController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listUser = new ListUserService();

    const users = await listUser.execute();

    return response.json(users);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;

    const shoUser = new ShowProfileService();

    const user = await shoUser.execute({ user_id });

    return response.json(user);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    return response.json(user);
  }
}

export default UserController;
