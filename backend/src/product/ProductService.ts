import { Service } from "typedi";
import { Product } from "../../models/Product";
import { User } from "../../models/User";

@Service()
export class ProductService {

    async getProducts() {
        return Product.find({});
    }

    async getProductById(id: string) {
        return Product.findById(id);
    }
}