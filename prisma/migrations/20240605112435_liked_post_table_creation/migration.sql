-- CreateTable
CREATE TABLE "likedsPosts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "author" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    CONSTRAINT "likedsPosts_author_fkey" FOREIGN KEY ("author") REFERENCES "users" ("nickname") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "likedsPosts_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
