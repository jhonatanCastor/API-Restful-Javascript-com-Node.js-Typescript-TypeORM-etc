import { getCustomRepository } from "typeorm";
import Product from "./product";
import { ProductRepository } from "./productRepository";

interface IRequest {
  id: string | any;
}

class ShowProductServe {
  public async execute({ id }: IRequest): Promise<Product> {
    const productRepository = getCustomRepository(ProductRepository);

    const product = await productRepository.findOne(id);

    if (!product) {
      throw new Error('Product not found.')
    }

    return product;
  }
}

export default ShowProductServe;