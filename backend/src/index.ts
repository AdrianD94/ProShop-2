import 'reflect-metadata';
import { Action, UnauthorizedError, createExpressServer, useContainer, useExpressServer } from 'routing-controllers';
import { ProductController } from './controllers/ProductController';
import { Container, Token } from 'typedi';
import dotenv from 'dotenv';
import { connectDb } from '../config/db';
import { UserController } from './controllers/UserController';
import { TokenService } from './auth/TokenService';
import { Secret } from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import express from 'express';
import { UserService } from './user/UserService';

dotenv.config();

useContainer(Container);

Container.set('tokenService', new TokenService(<Secret>process.env.JWT_SECRET, <string>process.env.EXPIRES_IN))

connectDb();

const PORT = process.env.PORT || 3001;
let app = express();
app.use(cookieParser())
useExpressServer(app, {
    controllers: [ProductController, UserController],
    authorizationChecker: async (action: Action, roles: string[]) => {
        const token = action.request.cookies.jwt;
        if (token) {
            const jwtService: TokenService = Container.get('tokenService');
            const decoded: { userId: string } = await jwtService.verifiy(token) as { userId: string };
            const userService: UserService = Container.get(UserService);
            const user = await userService.getOne(decoded.userId);

            if (user && !roles.length) return true;
            if (user && roles.find(role => user.roles.indexOf(role) !== -1)) return true;
            return false;

        }
        return false;
    },
    currentUserChecker: async (action: Action) =>{
        const token = action.request.cookies.jwt;
        if (token) {
            const jwtService: TokenService = Container.get('tokenService');
            const decoded: { userId: string } = await jwtService.verifiy(token) as { userId: string };
            const userService: UserService = Container.get(UserService);
            return await userService.getOne(decoded.userId);
        }
    }
});

app.listen(PORT, () => console.log(`Server started at ${PORT}`))