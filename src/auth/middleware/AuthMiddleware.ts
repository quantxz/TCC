import { TokenAuthentication } from './TokenAuthentication';
import { Injectable, NestMiddleware, Next, Req, Res } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly tokenAuthentication: TokenAuthentication) {}

  async use(@Req() req: Request,@Res() res: Response,@Next() next: NextFunction) {
    const token = req.headers.authorization; // Obtem o token do cabeçalho
    
    if(token === undefined) return res.status(401).json({ message: 'Token inválido' });;
    
    const decodedToken = await this.tokenAuthentication.AuthToken(token);

    if(decodedToken !== null) {

        next();
    } else {
      return res.status(401).json({ message: 'Token inválido' });
    } 
  }
}
