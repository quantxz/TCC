import { Redis } from "ioredis";
import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class RedisService extends Redis {
    private readonly logger = new Logger(Redis.name);

    constructor() {
        super()
        
        super.on("error", (error) => {
            this.logger.error("\nError in redis")
            this.logger.error(error)
            process.exit(1)
        })

        super.on("connect", () => {
            this.logger.log("Redis connected")
        })
    }


}