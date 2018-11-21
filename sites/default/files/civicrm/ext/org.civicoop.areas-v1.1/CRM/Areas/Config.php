<?php

use CRM_Areas_ExtensionUtil as E;

/**
 * @author Jaap Jansma (CiviCooP) <jaap.jansma@civicoop.org>
 * @license http://www.gnu.org/licenses/agpl-3.0.html
 */
class CRM_Areas_Config {
	
	private static $instance;
	
	private $_groupAreasCustomFieldId;
	private $_contactAreaCustomField;
	
	private function __construct() {
		$groupAreaCustomField = civicrm_api3('CustomField', 'getsingle', array('name' => 'group_areas', 'custom_group_id' => 'group_areas'));
		$this->_groupAreasCustomFieldId = $groupAreaCustomField['id'];
		$contactAreaCustomField = civicrm_api3('CustomField', 'getsingle', array('name' => 'areas', 'custom_group_id' => 'contact_areas'));
		$this->_contactAreaCustomField = $contactAreaCustomField['id'];
	}
	
	/**
	 * @return CRM_Areas_Config
	 */
	public static function singleton() {
		if (!self::$instance) {
			self::$instance = new CRM_Areas_Config();
		}
		return self::$instance;
	}
	
	/**
	 * Returns the custom field ID of the field group_areas.
	 */
	public function getGroupAreasCustomFieldId() {
		return $this->_groupAreasCustomFieldId;
	}
	
	/**
	 * Returns the custom field ID of the field group_areas.
	 */
	public function getContactAreasCustomFieldId() {
		return $this->_contactAreaCustomField;
	}
	
}
