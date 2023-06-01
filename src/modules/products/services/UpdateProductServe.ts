import { getCustomRepository } from "typeorm";
import Product from "../product";
import { ProductRepository } from "../productRepository";
interface IRequest {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
}
class UpdateProductServe {
  public async execute({ id, name, price, quantity }: IRequest): Promise<Product> {
    const productRepository = getCustomRepository(ProductRepository);

    const product = await productRepository.findOne(id);

    const productExists = await productRepository.findByName(name);

    if (productExists && name != product?.name) {
      throw new Error('There is already one product with this name');
    }

    if (!product) {
      throw new Error('Product not found');
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await productRepository.save(product);

    return product;
  }
}

export default UpdateProductServe; 