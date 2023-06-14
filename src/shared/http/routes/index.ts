import { Router } from "express";
import productRouter from "@modules/products/router/Product.routes";
import userRouter from "@modules/users/router/User.routes";
import sessionRoter from "@modules/users/session/Session.routes";
import passwordRouter from "@modules/users/userToken/router/passwordUser";
import profileRouter from "@modules/users/router/profile.routes";
import customerRouter from "@modules/customers/router/customer.routes";
import orderRouter from "@modules/orders/router/Order.routes";

const router = Router();

router.use('/profile', profileRouter);
router.use('/products', productRouter);
router.use('/user', userRouter);
router.use('/sessions', sessionRoter);
router.use('/password', passwordRouter);
router.use('/customer', customerRouter);
router.use('/order', orderRouter);

export default router;