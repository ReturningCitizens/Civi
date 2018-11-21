-- /*******************************************************
-- *
-- * civicrm_fast_action_link
-- *
-- *******************************************************/
CREATE TABLE `civicrm_fast_action_link` (


     `id` int unsigned NOT NULL AUTO_INCREMENT  COMMENT 'Unique FastActionLink ID',
     `uf_group_id` int unsigned   COMMENT 'Which profile this link is associated with.',
     `action_type` varchar(64) NOT NULL   COMMENT 'The action associated with this link. E.g. addToGroup, removeFromGroup.',
     `label` varchar(32) NOT NULL   COMMENT 'This is the displayed text for the link.',
     `description` varchar(255)    COMMENT 'An internal description of this link.',
     `hovertext` varchar(255)    COMMENT 'This is the text displayed when you hover the mouse over the link.  It\'s a good place to put instructions.',
     `success_message` varchar(255)    COMMENT 'This is the text in the success message when the link is clicked.',
     `action_entity_id` int unsigned    COMMENT 'If the action requires an entity ID, it is stored here.',
     `dim_on_use` tinyint   DEFAULT 1 COMMENT 'Should this link be disabled and the corresponding search result dimmed on click?',
     `confirm` tinyint   DEFAULT 0 COMMENT 'Pop up a confirmation box when clicking this link?',
     `is_active` tinyint   DEFAULT 1 COMMENT 'Is this link currently active?  If not, do not show.',
     `weight` int NOT NULL  DEFAULT 1 COMMENT 'Controls order in which links appear.' 
,
    PRIMARY KEY ( `id` )
 
 
,          CONSTRAINT FK_civicrm_fast_action_link_uf_group_id FOREIGN KEY (`uf_group_id`) REFERENCES `civicrm_uf_group`(`id`) ON DELETE CASCADE  
)  ENGINE=InnoDB DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci  ;
