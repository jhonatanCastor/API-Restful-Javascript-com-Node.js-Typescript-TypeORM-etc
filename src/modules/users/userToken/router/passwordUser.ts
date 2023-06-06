import { Router } from "express";
import {celebrate, Joi, Segments} from 'celebrate';
import ForgotPasswordController from "../controller/FortgotPasswordController";

const passwordRouter = Router();
const forgotPasswordControllerr = new ForgotPasswordController();

passwordRouter.post('/forgot',
celebrate({
  [Segments.BODY]: {
    email: Joi.string().email().required(),
  },
}),
forgotPasswordControllerr.create,
);

export default passwordRouter;