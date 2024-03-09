import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs'; // Importe o bcryptjs
import { AuthReturns } from 'src/types/auth-enum';

@Injectable()
export class FakeDataBase {
    readonly #nickname: string;
    readonly #password: string;

    constructor() {
        this.#nickname = process.env.FAKE_DB_NICKNAME;
        this.#password = bcrypt.hashSync(process.env.FAKE_DB_PASSWORD, 10);
    }

    public async FindAdmin(data: { nickname: string, password: string }) {
        try {
            if (data.nickname === this.#nickname && bcrypt.compareSync(data.password, this.#password)) {
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
