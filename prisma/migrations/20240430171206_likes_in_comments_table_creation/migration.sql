-- CreateTable
CREATE TABLE "likesComments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "commentId" TEXT NOT NULL,
    "userNick" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "likesComments_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "comments" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "likesComments_userNick_fkey" FOREIGN KEY ("userNick") REFERENCES "users" ("nickname") ON DELETE RESTRICT ON UPDATE CASCADE
);
