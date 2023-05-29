import { Authorized, Body, CurrentUser, Get, JsonController, Param, Post, Res } from 'routing-controllers';
import { Service } from 'typedi';
import { Response } from 'express';
import { OrderService } from '../orders/OrderService';
import { User } from '../../models/User';

@Service()
@JsonController('/api/orders')
export class OrderController {

    constructor(private readonly orderService: OrderService) { }

    @Authorized()
    @Post('/')
    async addOrderItems(@Res() response: Response, @Body() body: any, @CurrentUser() user: typeof User) {
        const res = await this.orderService.addOrderItems(body, JSON.parse(JSON.stringify(user))._id);
        return response.json(res);
    }

    @Authorized()
    @Get('/mine')
    async getMyOrders(@Res() response: Response,  @CurrentUser() user: typeof User) {
        return this.orderService.getMyOrders(JSON.parse(JSON.stringify(user))._id);
    }

    @Authorized()
    @Get('/:id')
    async getOrderById(@Param('id') id: string, @Res() response: Response) {
        const res = await this.orderService.getOrderById(id);
        return response.json(res);
    }

    @Authorized()
    @Get('/:id/pay')
    async updateOrderToPaid(@Param('id') id: string, @Res() response: Response) {
        return this.orderService.updateOrderToPaid();
    }

    @Authorized('Admin')
    @Get('/:id/delivered')
    async updateOrderToDelivered(@Param('id') id: string, @Res() response: Response) {
        return this.orderService.updateOrderToDelivered();
    }

    @Authorized('Admin')
    @Get('')
    async getOrders(@Res() response: Response) {
        return this.orderService.getOrders();
    }
}