import { IsOptional } from "class-validator";
import { UserDto } from "./user.dto";

export class LoginUserDto extends UserDto {
    @IsOptional()
    name: string;

    @IsOptional()
    surname: string;
}