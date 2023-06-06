import { Router } from "express";
import productRouter from "@modules/products/router/Product.routes";
import userRouter from "@modules/users/router/User.routes";
import sessionRoter from "@modules/users/session/Session.routes";
import passwordRouter from "@modules/users/userToken/router/passwordUser";

const router = Router();

router.use('/products', productRouter);
router.use('/user', userRouter);
router.use('/sessions', sessionRoter)
router.use('/password', passwordRouter)

export default router;