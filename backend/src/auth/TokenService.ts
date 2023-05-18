import { Service } from "typedi";
import { Secret, sign, verify } from 'jsonwebtoken';
import { ObjectId } from "mongoose";

@Service()
export class TokenService {
    constructor(private readonly secret: Secret, private readonly expiresIn: string) { }

    async sign(payload: any) {
        return sign(payload, this.secret, { expiresIn: +this.expiresIn })
    }

    async verifiy(token: string) {
        return verify(token, this.secret);
    }
}