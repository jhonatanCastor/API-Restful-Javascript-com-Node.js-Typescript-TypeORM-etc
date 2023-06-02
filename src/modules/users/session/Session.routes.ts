import { Router } from "express";
import { Segments, celebrate, Joi } from "celebrate";
import SessionController from "./SessionsController";

const sessionRoter = Router();
const sesseionController = new SessionController();

sessionRoter.post('/', 
celebrate({
  [Segments.BODY]: {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  },
}),
sesseionController.create
);

export default sessionRoter;
