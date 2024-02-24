-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "cpf" TEXT,
    "rg" TEXT
);

-- CreateTable
CREATE TABLE "chat_rooms" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "messages" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "author" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "room" TEXT NOT NULL,
    CONSTRAINT "messages_room_fkey" FOREIGN KEY ("room") REFERENCES "chat_rooms" ("name") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "messages_author_fkey" FOREIGN KEY ("author") REFERENCES "users" ("nickname") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_nickname_key" ON "users"("nickname");

-- CreateIndex
CREATE UNIQUE INDEX "users_cpf_key" ON "users"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "users_rg_key" ON "users"("rg");

-- CreateIndex
CREATE UNIQUE INDEX "chat_rooms_name_key" ON "chat_rooms"("name");

-- CreateIndex
CREATE UNIQUE INDEX "messages_author_key" ON "messages"("author");
