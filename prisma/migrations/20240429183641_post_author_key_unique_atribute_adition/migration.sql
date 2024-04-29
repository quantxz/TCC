/*
  Warnings:

  - A unique constraint covering the columns `[author]` on the table `posts` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "posts_author_key" ON "posts"("author");
