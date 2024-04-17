/*
  Warnings:

  - Added the required column `shippingTime` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_posts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "shippingTime" DATETIME NOT NULL,
    CONSTRAINT "posts_title_fkey" FOREIGN KEY ("title") REFERENCES "users" ("nickname") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_posts" ("author", "content", "id", "title") SELECT "author", "content", "id", "title" FROM "posts";
DROP TABLE "posts";
ALTER TABLE "new_posts" RENAME TO "posts";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
