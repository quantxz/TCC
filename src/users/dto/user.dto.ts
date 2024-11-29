import { IsString, IsEmail, MinLength, MaxLength, Matches, IsOptional, Length } from 'class-validator';
//class-validator para verificar se os canmpos passados são validos
export class UserDto {
    readonly name: string;

    readonly surname: string;

    readonly email: string;

    readonly password: string;

    readonly nickname: string;
    
    readonly cpf?: string;

    readonly rg?: string;

}