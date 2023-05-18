import { Inject, Service } from "typedi";
import { UserLoginDto } from "../controllers/dtos/UserLoginDto";
import { User } from "../../models/User";
import { BadRequestError, NotFoundError } from "routing-controllers";
import { HashingService } from "../auth/HashingService";
import { UserRegisterDto } from "../controllers/dtos/UserRegisterDto";
import { TokenService } from "../auth/TokenService";
import { Response } from "express";
import { UserUpdateDto } from "../controllers/dtos/UserUpdateDto";

@Service()
export class UserService {
    constructor(
        private readonly hashingService: HashingService,
        @Inject('tokenService') private readonly tokenService: TokenService
    ) { }
    async register({ email, name, password }: UserRegisterDto, response: Response) {
        const userExists = await User.findOne({ email });
        if (userExists) {
            throw new BadRequestError('User already exists');
        }

        const user = await User.create({ name, email, password: await this.hashingService.hash(password) })
        const token = await this.tokenService.sign({ userId: user._id });
        response.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000
        })
        return {
            _id: user._id,
            name: user.name,
            email: user.email,
            roles: user.roles
        }
    }

    async login({ email, password }: UserLoginDto, response: Response) {
        const user = await User.findOne({ email });

        if (!user) {
            throw new NotFoundError('Invalid email or password!');
        }

        const passwordMatch = await this.hashingService.compare(password, user.password);
        if (!passwordMatch) {
            throw new NotFoundError('Invalid email or password!');
        }
        const token = await this.tokenService.sign({ userId: user._id });
        response.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000
        })

        return {
            _id: JSON.parse(JSON.stringify(user._id)),
            name: user.name,
            email: user.email,
            roles: user.roles
        }
    }

    async getProfile(userId: string) {
        const user = await User.findById(userId);

        if (user) {
            return {
                _id: JSON.parse(JSON.stringify(user._id)),
                name: user.name,
                email: user.email
            }
        }
    }

    async getOne(id: string) {
        const user = await User.findById({ _id: id }).select('-password');

        if(!user){
            throw new NotFoundError();
        }
        return user;
    }

    async updateProfile(id:string, body: UserUpdateDto){
        const user = await User.findById(id);

        if (user){
            user.name = body.name || user.name;
            user.email = body.email || user.email

            if(body.password){
                user.password = body.password
            }
            const updatedUser = await user.save();

            return {
                _id: JSON.parse(JSON.stringify(updatedUser._id)),
                name: updatedUser.name,
                email: updatedUser.email,
                roles: updatedUser.roles,
            };
        }else{
            throw new NotFoundError();
        }
    }
}