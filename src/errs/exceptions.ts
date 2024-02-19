import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotFoundException extends HttpException {
  constructor() {
    super('Usuário não encontrado', HttpStatus.NOT_FOUND);
  }
}

export class InvalidTypeException extends HttpException {
  constructor() {
    super('Tipo inválido', HttpStatus.BAD_REQUEST);
  }
}

export class UsersNotFoundException extends HttpException {
  constructor() {
    super('Tipo inválido', HttpStatus.BAD_REQUEST);
  }
}
