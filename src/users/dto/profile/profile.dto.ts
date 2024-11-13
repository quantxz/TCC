import { IsString, Max } from "class-validator";
import { FileDto } from "file-manager-3ds/dist/types/file-type";

export class ProfileDto{

    @IsString()
    public userId:          string;
    
    @IsString()
    @Max(155)
    public bio:             string;

    @IsString()
    @Max(40)
    public skills:          string;
    
    @IsString()
    public userNick:        string;
    
    @IsString()
    public profilePic?:    FileDto;
    
    @IsString()
    public recentsPosts:    string[];
    
}   