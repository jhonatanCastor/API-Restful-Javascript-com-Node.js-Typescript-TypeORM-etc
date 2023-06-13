import { getCustomRepository } from "typeorm";
import { OrdersRepository } from "../repositories/OrderRepository";
import Order from "../Order";
import CustomersRepository from "@modules/customers/customersRepository";
import { ProductRepository } from "@modules/products/productRepository";
import AppError from "@shared/errors/AppError";

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}

export default class CreateOrderService {
  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    const ordersRepository = getCustomRepository(OrdersRepository);
    const customerRepository = getCustomRepository(CustomersRepository);
    const productRepository = getCustomRepository(ProductRepository);

    const customerExist = await customerRepository.findById(customer_id);

    if (!customerExist) {
      throw new AppError('Could not find any customer with the given id.')
    }

    const existsProducts = await productRepository.findAllByIds(products)

    if(!existsProducts.length) {
      throw new AppError('Could not find any product with the given ids.')
    }

    const existsProductsIds = existsProducts.map((product) => product.id);

    const checkInexistentProducts = products.filter(
      product => !existsProductsIds.includes(product.id)
    )

    if(checkInexistentProducts.length) {
      throw new AppError(`Could not find any product ${checkInexistentProducts[0].id}`)
    }

    const quantityAvailable = products.filter(
      product => existsProducts.filter( p => p.id === product.id )[0].quantity < product.quantity
    );

    if(checkInexistentProducts.length){
      throw new AppError(`The quantity ${quantityAvailable[0].quantity} is not available for ${quantityAvailable[0].id}.`)
    }

    const serializedProducts = products.map(
      product => ({
        product_id: product.id,
        quantity: product.quantity,
        price: existsProducts.filter(p => p.id === product.id)[0].price,
      })
    )

    const order = await ordersRepository.createOrder({
      customer: customerExist,
      products: serializedProducts,
    });

    const {order_products} = order;

    const updateProductQuantity = order_products.map(product => ({
      id: product.product.id,
      quantity: existsProducts.filter(p => p.id === product.product.id)[0].quantity - product.quantity,
    }));

      await productRepository.save(updateProductQuantity)

    return order;
  }
}

