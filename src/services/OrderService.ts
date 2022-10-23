import { iOrderService } from "../contracts/iOrderService";
import { Result } from "../infra/Result";
import { OrderRepository } from "../repository/OrderRepository";

export class OrderService implements iOrderService {
  async get(_id: string) {
    return await OrderRepository.findById(_id);
  }

  async getWithPagination(page: number, qtd: number): Promise<Result> {
    const result = new Result();
    result.Page = page;
    result.Qtd = qtd;
    result.Total = await OrderRepository.count({});
    result.Data = await OrderRepository.find({})
      .skip(page * qtd - qtd)
      .limit(qtd);
    return result;
  }

  async getAll() {
    return await OrderRepository.find({});
  }

  async registerOrder(
    user_id: string,
    address: string,
    order_id: string,
    status: string
  ) {
    return await OrderRepository.create({
      user_id: user_id,
      address: address,
      order_id: order_id,
      status: status,
    });
  }

  async deleteOrder(id: string) {
    return await OrderRepository.findByIdAndDelete(id);
  }

  async updateOrder(
    id: string,
    user_id: string,
    address: string,
    order_id: string,
    status: string
  ) {
    await OrderRepository.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          user_id: user_id,
          address: address,
          order_id: order_id,
          status: status,
        },
      }
    );
    return { status: "success" };
  }
}

export default new OrderService();
