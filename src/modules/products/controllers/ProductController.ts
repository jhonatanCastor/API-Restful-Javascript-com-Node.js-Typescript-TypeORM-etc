import { Request, Response } from "express";
import ListProductService from "../services/ListProductService";
import ShowProductServe from "../services/ShowProductService";
import CreateProducteService from "../services/CreateProductService";
import UpdateProductServe from "../services/UpdateProductServe";
import DeleteProductServe from "../services/DeleteProductService";

export default class ProductController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listProduct = new ListProductService();

    const product = await listProduct.execute();

    return response.json(product);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const shoProduct = new ShowProductServe();

    const product = await shoProduct.execute({ id });

    return response.json(product)
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;

    const createProduct = new CreateProducteService();

    const product = await createProduct.execute({
      name,
      price,
      quantity,
    });
    
    return response.json(product);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;
    const { id } = request.params;

    const updateProduct = new UpdateProductServe();

    const product = await updateProduct.execute({
      id,
      name,
      price,
      quantity
    }); 

    return response.json(product);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.body;

    const deleteProduct = new DeleteProductServe();

    await deleteProduct.execute({
      id
    })

    return response.json([]);
  }
}

