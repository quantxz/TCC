import { IsString, Max } from "class-validator";

export class ProfileDto{
    @IsString()
    @Max(155)
    public bio:         string;

    @IsString()
    @Max(40)
    public skills:      string;
    
    @IsString()
    public userNick:    string
}   