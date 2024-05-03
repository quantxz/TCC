import { Injectable } from '@nestjs/common';
import * as bcryptjs from 'bcryptjs';
import { AuthReturns } from 'src/types/auth-enum';

@Injectable()
export class FakeDataBase {
    readonly #nickname: string;
    readonly #password: string;

    constructor() {
        this.#nickname = process.env.FAKE_DB_NICKNAME;
        this.#password = bcryptjs.hashSync(process.env.FAKE_DB_PASSWORD, 10)
    }

    public async FindAdmin(data: { nickname: string, password: string }) {
        try {
            if (data.nickname === this.#nickname && bcryptjs.compareSync(data.password, this.#password)) {
                return AuthReturns.OK;
            } else {
                return AuthReturns.ERROR;
            }
        } catch (error) {
            console.error("Erro durante autenticação:", error);
            return AuthReturns.ERROR;
        }
    }
}