import { Service } from "typedi";
import products from "./products";

@Service()
export class ProductService {
    public getProducts() {
        return products;
    }

    public getProductById(id: string) {
        return products.find((product) => product._id === id);
    }
}