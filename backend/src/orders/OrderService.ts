import { BadRequestError, NotFoundError } from "routing-controllers";
import { Service } from "typedi";
import { Order } from "../../models/Order";

@Service()
export class OrderService {
  async addOrderItems(body: any, id: string) {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = body;
    if (orderItems && orderItems.length === 0) {
      throw new BadRequestError("No Order Items");
    }
    console.log(body);
    const order = new Order({
      orderItems: orderItems.map((x: any) => ({
        ...x,
        product: x._id,
        _id: undefined,
      })),
      user: id,
      shippingPrice,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingAddress,
      totalPrice,
    });

    return order.save();
  }

  async getMyOrders(id: string) {
    const order = await Order.find({ user: id });

    return order;
  }

  async getOrderById(id: string) {
    const order = await Order.findById(id).populate("user", "name email");

    if (!order) {
      throw new NotFoundError("Order not found!");
    }
    return order;
  }

  async updateOrderToPaid() {
    return "update order to paid";
  }

  async updateOrderToDelivered() {
    return "update order to delivered";
  }

  async getOrders() {
    return "get orders";
  }
}
