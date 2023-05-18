import { Authorized, Body, Controller, CookieParam, CurrentUser, Delete, Get, JsonController, Middleware, Param, Post, Put, Req, Res, UseBefore } from 'routing-controllers';
import { Service } from 'typedi';
import { Request, Response } from 'express';
import { UserService } from '../user/UserService';
import { UserLoginDto } from './dtos/UserLoginDto';
import { UserRegisterDto } from './dtos/UserRegisterDto';
import { User } from '../../models/User';
import { UserUpdateDto } from './dtos/UserUpdateDto';

@Service()
@JsonController('/api/users')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Post('/login')
    async login(@Res() response: Response, @Body() body: UserLoginDto) {
        console.log(body);
        return this.userService.login(body, response)

    }
    @Post('/register')
    async register(@Res() response: Response, @Body() body: UserRegisterDto) {
        return this.userService.register(body, response);

    }

    @Post('/logout')
    async logout(@Res() response: Response) {
        response.cookie('jwt', '', {
            httpOnly: true,
            expires: new Date(0)
        });

        return response.json({ message: 'Logged out successfully' });
    }

    @Authorized()
    @Get('/profile')
    async getUserProfile(@Res() response: Response, @CurrentUser() user: any) {
        return this.userService.getProfile(user._id);
    }

    @Authorized()
    @Put('/profile')
    async updateUserProfile(@Res() response: Response, @CurrentUser() user: any, @Body() body: UserUpdateDto) {
        const updatedUser = await this.userService.updateProfile(user._id, body);

        return response.json(updatedUser);
    }

    @Authorized('Admin')
    @Get('/')
    async getUsers(@Req() request: Response, @CurrentUser() user: typeof User) {
        return 'get all';
    }

    @Get('/:id')
    async getUser(@Res() response: Response, @Param('id') id: string) {
        const user = await this.userService.getOne(id)

        return response.json(user);
    }

    @Delete('/:id')
    async deleteUser() { }

    @Put('/:id')
    async updateUser() { }

}