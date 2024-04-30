/*
  Warnings:

  - You are about to drop the column `shippingTime` on the `posts` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_posts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "type" TEXT DEFAULT 'post',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "posts_author_fkey" FOREIGN KEY ("author") REFERENCES "users" ("nickname") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_posts" ("author", "content", "id", "title", "type") SELECT "author", "content", "id", "title", "type" FROM "posts";
DROP TABLE "posts";
ALTER TABLE "new_posts" RENAME TO "posts";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
