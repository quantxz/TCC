/*
  Warnings:

  - Added the required column `hour` to the `messages` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_messages" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "author" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "room" TEXT NOT NULL,
    "hour" TEXT NOT NULL,
    CONSTRAINT "messages_room_fkey" FOREIGN KEY ("room") REFERENCES "chat_rooms" ("name") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "messages_author_fkey" FOREIGN KEY ("author") REFERENCES "users" ("nickname") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_messages" ("author", "content", "id", "room") SELECT "author", "content", "id", "room" FROM "messages";
DROP TABLE "messages";
ALTER TABLE "new_messages" RENAME TO "messages";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
