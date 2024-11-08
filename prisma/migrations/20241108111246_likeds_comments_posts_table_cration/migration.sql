-- CreateTable
CREATE TABLE "likedsCommentsPosts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "author" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    CONSTRAINT "likedsCommentsPosts_author_fkey" FOREIGN KEY ("author") REFERENCES "users" ("nickname") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "likedsCommentsPosts_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
