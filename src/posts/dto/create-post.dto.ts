import { FileDto } from "src/files configurers/uploads/dto/file-dto";

export class CreatePostDto {
    title:          string;
    content:        string;
    shippingTime:   Date;
    userNickname:   string;
}
