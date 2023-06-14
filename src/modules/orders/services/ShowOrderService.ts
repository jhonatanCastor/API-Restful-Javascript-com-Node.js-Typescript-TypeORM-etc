import { getCustomRepository } from "typeorm";
import { OrdersRepository } from "../repositories/OrderRepository";
import Order from "../Order";
import AppError from "@shared/errors/AppError";

interface IRequest {
  id: string;
}

export default class ShowOrderService {
  public async execute({ id, }: IRequest): Promise<Order> {
    const ordersRepository = getCustomRepository(OrdersRepository);

    const order = await ordersRepository.findById(id);

    if(!order) {
      throw new AppError("Order not found", 404);
    }
   
     return order;
  }
}

