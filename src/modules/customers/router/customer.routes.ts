import { Router } from "express";
import CustomerController from "../controller/CustomerController";
import { celebrate, Joi, Segments } from "celebrate";
import isAuthenticated from "@shared/http/middlewares/isAuthenticated";

const customerRouter = Router();
const customerController = new CustomerController();

customerRouter.use(isAuthenticated)

customerRouter.get('/', customerController.index)

customerRouter.get('/:id',
celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required()
  },
}),
customerController.show)

customerRouter.post('/', 
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required().email(),
    },
  }),
customerController.create)

customerRouter.put('/:id', 
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required().email(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    } 
  }),
customerController.update)

customerRouter.delete('/:id', 
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    },
  }),
customerController.delete)

export default customerRouter;