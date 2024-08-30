import { IsString, IsEmail, MinLength, MaxLength, Matches, IsOptional, Length } from 'class-validator';
//class-validator para verificar se os canmpos passados são validos
export class UserDto {
    @IsString({ message: "Name deve ser uma string" })
    @MaxLength(35, { message: "O tamanho maximo de caracteres para o nome é 35" })
    readonly name:      string;

    @IsString({ message: "Surname deve ser uma string" })
    @MaxLength(55, { message: "O tamanho maximo de caracteres para o sobrenome é 55" })
    readonly surname:   string;
    
    @IsEmail({}, { message: "Formato de email Invalido" })
    @IsString( { message: "Email deve ser uma string" } )
    readonly email:     string;
 
    @IsString({ message: "a senha deve ser uma string" })
    @MinLength(7, { message: "O tamanho minimo de caracteres para a senha é 7" })
    @MaxLength(55, { message: "O tamanho maximo de caracteres para a senha é 55" })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]+$/, { message: 'a senha deve conter uma letra maiuscula, uma letra minuscula e um caractere especial' })
    readonly password:  string;
    
    @IsString({ message: "Nickname deve ser uma string" })
    @MinLength(7, { message: "O tamanho minimo de caracteres para o nickname é 7" })
    @MaxLength(55, { message: "O tamanho maximo de caracteres para o nickname é 55" })
    readonly nickname:  string;

    @IsOptional()
    @IsString({ message: "Cpf deve ser uma string" })
    @Length(14, 14, { message: "A string de caracteres do cpf deve ter uma quantidade de caracteres igual a 14 (xxx.xxx.xxx-xx)" })
    readonly cpf?: string;
    
    @IsOptional()
    @IsString({ message: "Rg deve ser uma string" })
    @Length(10, 10, { message: "A string de caracteres do rg deve ter uma quantidade de caracteres igual a 10 (xxxxxxxx-x)" })
    readonly rg?: string;

}