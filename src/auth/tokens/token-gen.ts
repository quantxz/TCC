import * as jwt from 'jsonwebtoken';
import { AdminDto } from '../admin/admin-dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TokenGenerator {
    public async tokenGenerator(UserData: AdminDto): Promise<string> {
        // Chave secreta para assinar o token
        const secretKey = process.env.SECRET_KEY;
    
        // Payload do token
        const payload = {
          sub: UserData.nickname,
        };
    
        // Opções do token
        const options: jwt.SignOptions = {
            expiresIn: '31d',
        };

        // Gera o token
        const token = jwt.sign(payload, secretKey, options);
    
        return token;
      }
}