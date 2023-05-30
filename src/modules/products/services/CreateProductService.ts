import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../productRepository";
import Product from "../product";
interface IRequest {
  name: string;
  price: number;
  quantity: number
}
class CreateProducteService {
  public async execute({ name, price, quantity }: IRequest): Promise<Product | any> {
    const productsRepository = getCustomRepository(ProductRepository);
    const productExist = await productsRepository.findByName(name);
    if (productExist) {
      throw new Error('There is already one product with this name')
    }
    const product = productsRepository.create({
      name,
      price,
      quantity,
    });

    await productsRepository.save(product);
  }
}
export default CreateProducteService;