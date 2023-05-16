import 'reflect-metadata';
import { createExpressServer, useContainer } from 'routing-controllers';
import { ProductController } from './controllers/ProductController';
import { Container } from 'typedi';
import dotenv from 'dotenv';
import { connectDb } from '../config/db';

dotenv.config();

useContainer(Container);

connectDb();

const PORT = process.env.PORT || 3001;
const app = createExpressServer({
    controllers: [ProductController],
});

app.listen(PORT, () => console.log(`Server started at ${PORT}`))