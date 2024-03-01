import { Injectable, Logger } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class TokenAuthentication {
  private readonly logger: Logger = new Logger("AuthSystem")
  private readonly secretKey: string;
  constructor() {
    this.secretKey = process.env.SECRET_KEY
  }

  public async AuthToken(token: string) {
    try {
      if (!token) {
        return null; // ou outra lógica para tratar token ausente
      }

      const decoded = jwt.verify(token, this.secretKey);
      return decoded;
    } catch (error) { 
      this.logger.error("erro: " + error)
      return null;
    }
  }
}