import { Router } from "express";
import productRouter from "@modules/products/router/Product.routes";
import userRouter from "@modules/users/router/User.routes";

const router = Router();

router.use('/products', productRouter);
router.use('/user', userRouter);

export default router;