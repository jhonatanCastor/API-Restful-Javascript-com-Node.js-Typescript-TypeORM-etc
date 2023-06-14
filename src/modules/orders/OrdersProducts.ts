import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, Column } from "typeorm";
import Order from "./Order";
import Product from "@modules/products/product";
@Entity('orders_products')
export default class OrdersProducts {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Order, order => order.order_products)
  @JoinColumn({name: 'order_id'})
  order: Order

  @ManyToOne(() => Product, product => product.order_products)
  @JoinColumn({name: 'product_id'})
  product: Product

  @Column()
  product_id: string

  @Column('decimal')
  price: number;

  @Column('int')
  quantity: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}