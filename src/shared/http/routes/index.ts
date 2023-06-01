import { Router } from "express";
import productRouter from "@modules/router/Product.routes";

const router = Router();

router.use('/products', productRouter);

export default router;