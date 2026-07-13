ALTER TABLE `FaqItem`
  ADD COLUMN `courseId` BIGINT NULL;

CREATE INDEX `FaqItem_courseId_status_sortOrder_idx`
  ON `FaqItem`(`courseId`, `status`, `sortOrder`);

ALTER TABLE `FaqItem`
  ADD CONSTRAINT `FaqItem_courseId_fkey`
  FOREIGN KEY (`courseId`) REFERENCES `Course`(`id`)
  ON DELETE CASCADE
  ON UPDATE CASCADE;
