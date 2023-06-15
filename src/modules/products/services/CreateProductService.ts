import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../productRepository";
import Product from "../product";
import RedisCache from "@shared/cache/RedisCache";
interface IRequest {
  name: string;
  price: number;
  quantity: number
}
class CreateProducteService {
  public async execute({ name, price, quantity }: IRequest): Promise<Product | void> {
    const productsRepository = getCustomRepository(ProductRepository);
    const productExist = await productsRepository.findByName(name);

    const redisCache = new RedisCache();

    if (productExist) {
      throw new Error('There is already one product with this name')
    }

    const product = productsRepository.create({
      name,
      price,
      quantity,
    });

    await redisCache.invalidate('api-vendas-PRODUCT_LIST')

    await productsRepository.save(product);

    return product;
  }
}

export default CreateProducteService;
