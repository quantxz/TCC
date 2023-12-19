/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `ChatRooms` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE `_ChatRoomsToUser` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_ChatRoomsToUser_AB_unique`(`A`, `B`),
    INDEX `_ChatRoomsToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `ChatRooms_name_key` ON `ChatRooms`(`name`);

-- AddForeignKey
ALTER TABLE `_ChatRoomsToUser` ADD CONSTRAINT `_ChatRoomsToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `ChatRooms`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ChatRoomsToUser` ADD CONSTRAINT `_ChatRoomsToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
