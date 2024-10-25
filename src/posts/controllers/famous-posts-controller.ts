import { UploadsService } from '../../files configurers/uploads/uploads.service';
import { Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, BadRequestException, Query, Res, Get, Logger, Controller } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileDto } from 'file-manager-3ds/dist/types/file-type';
import { CommentDto, LikedsPostsDto } from '../dto/posts-atributes.dto';
import { PostsAtributesService } from '../services/posts-atributes.service';
import { CreatePostDto } from '../dto/create-post.dto';
import { Response } from 'express';
import { PostsFamousService } from '../services/famous-posts.service';

@Controller('posts/famous')
export class PostsFamousController {
    private logger: Logger = new Logger('PostsAtributes Controller');
    constructor(
        protected readonly postsFamousService: PostsFamousService,
        protected readonly uploadsService: UploadsService
    ) { }

    @Get('explore')
    async explorePosts(@Res() res: Response) {
        try {
            const mostViwedPosts = await this.postsFamousService.getTopPosts();

            return res.status(200).json({
                mostViwedPosts
            });
            
        } catch (error) {
            this.logger.error("erro no controlador do famous posts. Mais detalhes:\n", error, "\n")
        }
    }
}
