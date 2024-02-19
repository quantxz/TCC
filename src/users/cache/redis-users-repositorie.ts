import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/services/configs/prisma.service";
import { RedisService } from "src/services/configs/redis.service";


@Injectable()
export class RedisUserRepositorie {
    constructor(private readonly redis: RedisService, private readonly prisma: PrismaService) { }

    async FindMnay() {
        const cachedUsers = await this.redis.get('users');

        if (!cachedUsers) {
            const users = await this.prisma.user.findMany();

            await this.redis.set('users', JSON.stringify(users), 'EX', 15)
            console.log('\x1b[36m%s\x1b[0m', 'FROM PRISMA')
            return users
        }

        console.log('\x1b[36m%s\x1b[0m', 'FROM CACHE')

        return JSON.parse(cachedUsers);
    }
}