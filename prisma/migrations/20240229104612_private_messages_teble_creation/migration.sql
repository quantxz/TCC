-- CreateTable
CREATE TABLE "admin" (
    "id" TEXT NOT NULL PRIMARY KEY
);

-- CreateTable
CREATE TABLE "PrivateMessages" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "author" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    CONSTRAINT "PrivateMessages_author_fkey" FOREIGN KEY ("author") REFERENCES "users" ("nickname") ON DELETE RESTRICT ON UPDATE CASCADE
);
