import { getCustomRepository } from "typeorm";
import Product from "./product";
import { ProductRepository } from "./productRepository";

class ListProductService {
  public async execute(): Promise<Product[]> {
    const productRepository = getCustomRepository(ProductRepository);

    const products = await productRepository.find();

    return products;
  }
}

export default ListProductService;