export class CommentDto {
    public readonly id?:    string;
    public readonly content:    string;
    public readonly authorNick:   string;
    public readonly postId:     string;
}

export class LikeDto {
    public readonly userNick:   string;
    public readonly postId:     string;
}
export class LikeInCommentDto {
    public readonly userNick:   string;
    public readonly commentId:     string;
}