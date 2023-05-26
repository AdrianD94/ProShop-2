import { BadRequestError } from "routing-controllers";
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
            totalPrice
        } = body;
        if (orderItems && orderItems.length === 0) {
            throw new BadRequestError('No Order Items')
        };

        const order = new Order({
            orderItems: orderItems.map((x: any) => ({
                ...x,
                product: x._id,
                _id: undefined
            })),
            user: id,
            shippingPrice,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingAddress,
            totalPrice
        });

        return order.save();
    }

    async getMyOrders() {
        return 'get my orders';
    }

    async getOrderById() {
        return 'get order by id'
    }

    async updateOrderToPaid() {
        return 'update order to paid'
    }

    async updateOrderToDelivered() {
        return 'update order to delivered'
    }

    async getOrders() {
        return 'get orders'
    }
}