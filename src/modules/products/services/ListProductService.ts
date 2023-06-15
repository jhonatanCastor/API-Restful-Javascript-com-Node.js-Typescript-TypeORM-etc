import { getCustomRepository } from "typeorm";
import Product from "../product";
import { ProductRepository } from "../productRepository";
import RedisCache from "@shared/cache/RedisCache";
class ListProductService {
  public async execute(): Promise<Product[]> {
    const productRepository = getCustomRepository(ProductRepository);

    const redisCache = new RedisCache();

    let products = await redisCache.recover<Product[]>(
      'api-vendas-PRODUCT_LIST',
    );

    if (!products) {
      console.log('INVALIDATE')
      products = await productRepository.find();

      await redisCache.save('api-vendas-PRODUCT_LIST', products)
    }

    return products;
  }
}

export default ListProductService;