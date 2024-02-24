import { IsOptional } from "class-validator";
import { UserDto } from "./user.dto";

export class LoginUserDto extends UserDto {
    @IsOptional()
    declare name: string;

    @IsOptional()
    declare surname: string;
}