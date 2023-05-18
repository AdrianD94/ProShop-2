import { Service } from "typedi";
import { hash, compare, genSalt } from 'bcryptjs'

@Service()
export class HashingService {
    async hash(payload: string): Promise<string> {
        const salt = await genSalt();

        return hash(payload, salt);
    }

    async compare(payload: string, hashedPayload: string) {
        return compare(payload, hashedPayload);
    }
}