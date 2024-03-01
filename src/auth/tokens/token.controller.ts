import { Controller, Post, Req, Res } from "@nestjs/common";
import { TokenGenerator } from "./token-gen";
import { AdminDto } from "../admin/admin-dto";
import { FakeDataBase } from "../entitys/db";
import { Response } from "express";

@Controller("token")
export class TokenController {
    constructor(private readonly tokenGenerator: TokenGenerator, private FakeDB: FakeDataBase) {}

    @Post()
    public async TokenCreationRequire(@Req() userDto: AdminDto, @Res() res: Response) {
        const admin = await this.FakeDB.FindAdmin(userDto)

        if(admin) {
            let token = await this.tokenGenerator.tokenGenerator(userDto)
            return res.status(201).json({
                adminToken: token
            })
        }
    }
}