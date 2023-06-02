import { Router } from "express";
import { celebrate, Joi, Segments } from 'celebrate'
import UserController from "../controllers/UserController";
import isAuthenticated from "../middlewares/isAuthenticated";

const userRouter = Router();
const userController = new UserController();

userRouter.get('/',isAuthenticated, userController.index);

userRouter.get('/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  userController.show
)

userRouter.post('/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  userController.create
);

userRouter.put('/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  userController.update
)

userRouter.delete('/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required()
    },
  }),
  userController.delete
)

export default userRouter;