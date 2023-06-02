import { Router } from "express";
import productRouter from "@modules/products/router/Product.routes";
import userRouter from "@modules/users/router/User.routes";
import sessionRoter from "@modules/users/session/Session.routes";

const router = Router();

router.use('/products', productRouter);
router.use('/user', userRouter);
router.use('/sessions', sessionRoter)

export default router;