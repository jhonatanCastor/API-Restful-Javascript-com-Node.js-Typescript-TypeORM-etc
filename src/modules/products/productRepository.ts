import { EntityRepository, Repository } from 'typeorm'
import Product from './product'

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {

  public async findByName(name: string): Promise<Product | null> {
    const product = this.findOne({
      where: {
        name,
      },
    });
    return product
  }
}