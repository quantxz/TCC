-- CreateTable
CREATE TABLE `user` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `surname` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `nickname` VARCHAR(191) NOT NULL,
    `cpf` VARCHAR(191) NULL,
    `rg` VARCHAR(191) NULL,

    UNIQUE INDEX `user_email_key`(`email`),
    UNIQUE INDEX `user_nickname_key`(`nickname`),
    UNIQUE INDEX `user_cpf_key`(`cpf`),
    UNIQUE INDEX `user_rg_key`(`rg`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
