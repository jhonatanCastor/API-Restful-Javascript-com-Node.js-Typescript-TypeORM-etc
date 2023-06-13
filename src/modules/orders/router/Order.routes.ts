import { Router } from "express"
import OrderController from "../controllers/OrdersController"
import { celebrate, Joi, Segments } from "celebrate";

const orderRouter = Router();
const orderControler = new OrderController();

orderRouter.get('/:id',
celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  },
}),
orderControler.show)

orderRouter.post('/', 
  celebrate({
    [Segments.BODY]: {
      customer_id: Joi.string().uuid().required(),
      products: Joi.required(),
    },
  }),
  orderControler.create)

  export default orderRouter;