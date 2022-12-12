--CHANGE TABLE
ALTER TABLE `table` CHANGE `column` `column` INT(8) NOT NULL AUTO_INCREMENT;

--ADD NEW COLUMN With a type of VARCHAR and a size of 50
ALTER TABLE `table` ADD `column` VARCHAR(50) NOT NULL AFTER `nom`;

--DELETE COLUMN
ALTER TABLE `table` DROP `column`;