import { connectDb } from "./config/db";
import dotenv from 'dotenv';
import { Product } from "./models/Product";
import { Order } from "./models/Order";
import { User } from "./models/User";
import users from "./data/users";
import products from "./data/products";

dotenv.config()

connectDb();

async function importData() {
    try {
        await Product.deleteMany()
        await Order.deleteMany()
        await User.deleteMany()

        const createdUsers = await User.insertMany(users);
      
        const adminUser = createdUsers[0]._id;
        const sampleProducts = products.map((product) => {
            return { ...product, user: adminUser }
        });
        console.log(sampleProducts)
        await Product.insertMany(sampleProducts);
        console.log('Data imported');
        process.exit()
    } catch (error) {
        console.log(error)
        process.exit(1);
    }
}

async function destroyData() {
    try {
        await Product.deleteMany()
        await Order.deleteMany()
        await User.deleteMany()

        console.log('data destroyed');
        process.exit();
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

if(process.argv[2] === '-d'){
    destroyData()
}else{
    importData()
}