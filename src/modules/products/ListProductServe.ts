import { getCustomRepository } from "typeorm";
import Product from "./product";
import { ProductRepository } from "./productRepository";

class ListProductService {
  public async excute(): Promise<Product[]> {
    const productRepository = getCustomRepository(ProductRepository);

    const products = productRepository.find();

    return products;
  }
}

export default ListProductService;