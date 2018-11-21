CREATE TABLE IF NOT EXISTS `civicrm_area` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(128) NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `civicrm_area_definition` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `area_id` INT UNSIGNED NOT NULL,
  `type` VARCHAR(80) NOT NULL,
  `country_id` INT UNSIGNED NULL,
  `state_province_id` INT UNSIGNED NULL,
  `city` VARCHAR(256) NULL,
  `postal_code` VARCHAR(256) NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB;
