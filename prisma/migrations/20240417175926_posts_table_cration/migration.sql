-- CreateTable
CREATE TABLE "posts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    CONSTRAINT "posts_title_fkey" FOREIGN KEY ("title") REFERENCES "users" ("nickname") ON DELETE RESTRICT ON UPDATE CASCADE
);
