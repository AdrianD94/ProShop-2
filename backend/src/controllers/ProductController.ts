import { Controller, Get, Param } from 'routing-controllers';
import { ProductService } from '../product/ProductService';
import { Service } from 'typedi';

@Service()
@Controller('/api/products')
export class ProductController {

    constructor(private readonly productService: ProductService) { }

    @Get('/')
    getAll() {
        return this.productService.getProducts();
    }

    @Get('/:id')
    getOne(@Param('id') id: string) {
        return this.productService.getProductById(id);
    }
}