import { getCustomRepository } from "typeorm";
import Product from "../product";
import { ProductRepository } from "../productRepository";
import RedisCache from "@shared/cache/RedisCache";
interface IRequest {
  user_id: string | number;
  name: string;
  price: number;
  quantity: number;
}
class UpdateProductServe {
  public async execute({ user_id, name, price, quantity }: IRequest): Promise<Product> {
    const productRepository = getCustomRepository(ProductRepository);

    const product = await productRepository.findOne(user_id);

    const productExists = await productRepository.findByName(name);

    if (productExists && name != product?.name) {
      throw new Error('There is already one product with this name');
    }

    if (!product) {
      throw new Error('Product not found');
    }

    const redisCache = new RedisCache();

    await redisCache.invalidate('api-vendas-PRODUCT_LIST')
    const test = await redisCache.recover('api-vendas-PRODUCT_LIST')
    console.log('REDIS', test)

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await productRepository.save(product);

    return product;
  }
}

export default UpdateProductServe; 