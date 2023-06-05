import { Request, Response } from "express";
import UpdateUserAvatarService from "../services/UpdateUserAvatarService";
class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateAvatar = new UpdateUserAvatarService();

    if (!request.file) {
      // Lógica para lidar com a ausência de request.file
      return response.status(400).json({ error: 'No file provided' });
    }

    const user = await updateAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    return response.json(user);
  }
}

export default UserAvatarController;