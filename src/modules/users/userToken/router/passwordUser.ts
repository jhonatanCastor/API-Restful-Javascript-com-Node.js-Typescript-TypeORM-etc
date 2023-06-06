import { Router } from "express";
import {celebrate, Joi, Segments} from 'celebrate';
import ForgotPasswordController from "../controller/FortgotPasswordController";
import ResetPasswordController from "../controller/ResetPasswordController";

const passwordRouter = Router();
const forgotPasswordControllerr = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController()

passwordRouter.post('/forgot',
celebrate({
  [Segments.BODY]: {
    email: Joi.string().email().required(),
  },
}),
forgotPasswordControllerr.create,
);

passwordRouter.post('/reset',
celebrate({
  [Segments.BODY]: {
    token: Joi.string().uuid().required(),
    password: Joi.string().required(),
    password_confirmation: Joi.string().required().valid(Joi.ref('password')),
  },
}),
resetPasswordController.create,
);

export default passwordRouter;