import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../productRepository";

interface IRequest {
  id: string | any;
}

class DeleteProductServe {
  public async execute({ id }: IRequest): Promise<any> {
    const productRepository = getCustomRepository(ProductRepository);

    const product = await productRepository.findOne(id);

    if (!product) {
      throw new Error("Product not found");
    }

    await productRepository.remove(product)
  }
}

export default DeleteProductServe;