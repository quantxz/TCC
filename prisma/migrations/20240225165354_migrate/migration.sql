/*
  Warnings:

  - A unique constraint covering the columns `[author]` on the table `messages` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "messages_author_key" ON "messages"("author");
