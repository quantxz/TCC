export class CommentDto {
    public readonly id?:            string;
    public readonly content:        string;
    public readonly authorNick:     string;
    public readonly postId:         string;
    public readonly image?:         string;
}

export class LikeDto {
    public readonly userNick:       string;
    public readonly postId:         string;
}

export class LikeInCommentDto {
    public readonly userNick:       string;
    public readonly commentId:      string;
}

export class LikedsPostsDto {
    public readonly id?:            string
    public readonly author:         string
    public readonly postId:         string
}