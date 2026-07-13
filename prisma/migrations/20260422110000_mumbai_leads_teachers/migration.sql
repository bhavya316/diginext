ALTER TABLE `Lead`
  ADD COLUMN `originLocation` VARCHAR(120) NULL,
  ADD COLUMN `requestedAsset` VARCHAR(30) NULL,
  ADD COLUMN `brochureUrl` VARCHAR(500) NULL;

CREATE TABLE `Teacher` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `cityId` BIGINT NULL,
  `name` VARCHAR(150) NOT NULL,
  `photoUrl` VARCHAR(500) NULL,
  `linkedinUrl` VARCHAR(500) NULL,
  `employmentStatus` VARCHAR(190) NULL,
  `credentials` TEXT NULL,
  `sortOrder` INTEGER NOT NULL DEFAULT 0,
  `isVisible` BOOLEAN NOT NULL DEFAULT true,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL,
  INDEX `Teacher_cityId_sortOrder_idx`(`cityId`, `sortOrder`),
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

ALTER TABLE `Teacher`
  ADD CONSTRAINT `Teacher_cityId_fkey`
  FOREIGN KEY (`cityId`) REFERENCES `City`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

SET @mumbai_city_id = (SELECT `id` FROM `City` WHERE `slug` = 'mumbai' LIMIT 1);

UPDATE `Course`
SET `cityId` = @mumbai_city_id
WHERE @mumbai_city_id IS NOT NULL;

UPDATE `Lead`
SET `cityId` = @mumbai_city_id
WHERE @mumbai_city_id IS NOT NULL AND `cityId` IS NOT NULL;

UPDATE `Certificate`
SET `cityId` = @mumbai_city_id
WHERE @mumbai_city_id IS NOT NULL AND `cityId` IS NOT NULL;

UPDATE `PageSection`
SET `cityId` = @mumbai_city_id
WHERE @mumbai_city_id IS NOT NULL AND `cityId` IS NOT NULL;

UPDATE `FaqItem`
SET `cityId` = @mumbai_city_id
WHERE @mumbai_city_id IS NOT NULL AND `cityId` IS NOT NULL;

UPDATE `Tool`
SET `cityId` = @mumbai_city_id
WHERE @mumbai_city_id IS NOT NULL AND `cityId` IS NOT NULL;

UPDATE `City`
SET `isActive` = CASE WHEN `slug` = 'mumbai' THEN true ELSE false END;
