import { IsOptional } from 'class-validator';
import { UserDto } from './user.dto';

export class UpdateUserDto extends UserDto {
    @IsOptional()
    declare name: string
}
