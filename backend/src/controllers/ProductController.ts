import { Get, JsonController, Param, Res } from 'routing-controllers';
import { ProductService } from '../product/ProductService';
import { Service } from 'typedi';
import { Response } from 'express';

@Service()
@JsonController('/api/products')
export class ProductController {

    constructor(private readonly productService: ProductService) { }

    @Get('/')
    async getAll(@Res() response: Response) {
        console.log('hit product')
        const products = await this.productService.getProducts();
        return response.json(products);
    }

    @Get('/:id')
    async getOne(@Param('id') id: string, @Res() response: Response) {
        const product = await this.productService.getProductById(id);
        return response.json(product);
    }
}