// import { Redis } from "ioredis";
// import { Injectable } from "@nestjs/common";

// @Injectable()
// export class RedisService extends Redis {
//     constructor() {
//         super()

//         super.on("error", (error) => {
//             console.log("\nError in redis")
//             console.log(error)
//             console.log("\n")
//             process.exit(1)
//         })

//         super.on("connect", (succes) => {
//             console.log("\nRedis connected")
//         })
//     }
// }