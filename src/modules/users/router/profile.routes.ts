import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import isAuthenticated from "@shared/http/middlewares/isAuthenticated";
import ProfileControler from "../controllers/ProfileControler";

const profileRouter = Router();
const profileContoler = new ProfileControler();

profileRouter.use(isAuthenticated)

profileRouter.get('/',
celebrate({
  [Segments.BODY]:{
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }
}),
profileContoler.show
);

profileRouter.post('/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  profileContoler.update
);

export default profileRouter;