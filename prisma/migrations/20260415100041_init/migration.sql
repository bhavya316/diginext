-- CreateTable
CREATE TABLE `Admin` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(120) NOT NULL,
    `email` VARCHAR(190) NOT NULL,
    `passwordHash` VARCHAR(255) NOT NULL,
    `role` ENUM('SUPER_ADMIN', 'CONTENT_ADMIN', 'SALES_ADMIN') NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Admin_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `City` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `slug` VARCHAR(50) NOT NULL,
    `name` VARCHAR(80) NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `City_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SiteSetting` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `key` VARCHAR(120) NOT NULL,
    `valueJson` JSON NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `SiteSetting_key_key`(`key`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PageSection` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `cityId` BIGINT NULL,
    `sectionKey` VARCHAR(80) NOT NULL,
    `title` VARCHAR(255) NULL,
    `subtitle` VARCHAR(255) NULL,
    `body` TEXT NULL,
    `contentJson` JSON NULL,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `isVisible` BOOLEAN NOT NULL DEFAULT true,
    `status` ENUM('DRAFT', 'PUBLISHED') NOT NULL DEFAULT 'DRAFT',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `PageSection_cityId_sectionKey_status_sortOrder_idx`(`cityId`, `sectionKey`, `status`, `sortOrder`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Course` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `cityId` BIGINT NOT NULL,
    `title` VARCHAR(150) NOT NULL,
    `slug` VARCHAR(150) NOT NULL,
    `shortDescription` TEXT NULL,
    `durationText` VARCHAR(100) NULL,
    `deliveryMode` VARCHAR(100) NULL,
    `brochureUrl` VARCHAR(500) NULL,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `isFeatured` BOOLEAN NOT NULL DEFAULT false,
    `status` ENUM('DRAFT', 'PUBLISHED') NOT NULL DEFAULT 'DRAFT',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Course_slug_key`(`slug`),
    INDEX `Course_cityId_status_sortOrder_idx`(`cityId`, `status`, `sortOrder`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CourseModule` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `courseId` BIGINT NOT NULL,
    `title` VARCHAR(150) NOT NULL,
    `description` TEXT NULL,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,

    INDEX `CourseModule_courseId_sortOrder_idx`(`courseId`, `sortOrder`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FaqItem` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `cityId` BIGINT NULL,
    `question` VARCHAR(255) NOT NULL,
    `answer` TEXT NOT NULL,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `status` ENUM('DRAFT', 'PUBLISHED') NOT NULL DEFAULT 'DRAFT',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `FaqItem_cityId_status_sortOrder_idx`(`cityId`, `status`, `sortOrder`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tool` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `cityId` BIGINT NULL,
    `name` VARCHAR(100) NOT NULL,
    `iconUrl` VARCHAR(500) NOT NULL,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `isVisible` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Tool_cityId_sortOrder_idx`(`cityId`, `sortOrder`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Certificate` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `cityId` BIGINT NULL,
    `title` VARCHAR(150) NOT NULL,
    `imageUrl` VARCHAR(500) NOT NULL,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `isVisible` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Certificate_cityId_sortOrder_idx`(`cityId`, `sortOrder`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Lead` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `cityId` BIGINT NULL,
    `courseId` BIGINT NULL,
    `source` ENUM('CALLBACK', 'ENROLL', 'CONTACT_FORM', 'WHATSAPP', 'MANUAL') NOT NULL,
    `name` VARCHAR(120) NOT NULL,
    `email` VARCHAR(190) NULL,
    `phone` VARCHAR(30) NOT NULL,
    `interest` VARCHAR(150) NULL,
    `message` TEXT NULL,
    `status` ENUM('NEW', 'CONTACTED', 'QUALIFIED', 'WON', 'LOST', 'SPAM') NOT NULL DEFAULT 'NEW',
    `assignedAdminId` BIGINT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Lead_cityId_status_createdAt_idx`(`cityId`, `status`, `createdAt`),
    INDEX `Lead_courseId_idx`(`courseId`),
    INDEX `Lead_assignedAdminId_idx`(`assignedAdminId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LeadNote` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `leadId` BIGINT NOT NULL,
    `adminId` BIGINT NOT NULL,
    `note` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `LeadNote_leadId_createdAt_idx`(`leadId`, `createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PageSection` ADD CONSTRAINT `PageSection_cityId_fkey` FOREIGN KEY (`cityId`) REFERENCES `City`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Course` ADD CONSTRAINT `Course_cityId_fkey` FOREIGN KEY (`cityId`) REFERENCES `City`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CourseModule` ADD CONSTRAINT `CourseModule_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FaqItem` ADD CONSTRAINT `FaqItem_cityId_fkey` FOREIGN KEY (`cityId`) REFERENCES `City`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tool` ADD CONSTRAINT `Tool_cityId_fkey` FOREIGN KEY (`cityId`) REFERENCES `City`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Certificate` ADD CONSTRAINT `Certificate_cityId_fkey` FOREIGN KEY (`cityId`) REFERENCES `City`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Lead` ADD CONSTRAINT `Lead_cityId_fkey` FOREIGN KEY (`cityId`) REFERENCES `City`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Lead` ADD CONSTRAINT `Lead_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Lead` ADD CONSTRAINT `Lead_assignedAdminId_fkey` FOREIGN KEY (`assignedAdminId`) REFERENCES `Admin`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LeadNote` ADD CONSTRAINT `LeadNote_leadId_fkey` FOREIGN KEY (`leadId`) REFERENCES `Lead`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LeadNote` ADD CONSTRAINT `LeadNote_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `Admin`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
