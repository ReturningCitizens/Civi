<?php

/**
 * This class contains the functionality to update the areas at the contact level when
 * an address changes.
 */
class CRM_Areas_AddressProcessor {
	
	protected static $contact_ids = array();
	
	/**
	 * When an primary address is updated or created update the areas to the relevant list.
	 * 
	 * @param CRM_Core_DAO_Address $objAddress
	 */
	public static function postAddressEdit($objAddress) {
		if ($objAddress->is_primary && $objAddress->contact_id) {
			$address = array();
			CRM_Core_DAO::storeValues($objAddress, $address);
			$factory = \Civi::service('areas_definition_factory');
			$areaIds = $factory->getAreaIdsForAddress($address);
			self::updateAreas($areaIds, $objAddress->contact_id);
		}
	}
  
  /**
   * Update the areas of a contact based on the address object.
   * 
   * @param CRM_Core_DAO_Address $objAddress
   */
  public static function updateAreasFromAddressObject($objAddress) {
    if ($objAddress->is_primary && $objAddress->contact_id) {
      $address = array();
      CRM_Core_DAO::storeValues($objAddress, $address);
      $factory = \Civi::service('areas_definition_factory');
      $areaIds = $factory->getAreaIdsForAddress($address);
      self::updateAreas($areaIds, $objAddress->contact_id);
    }
  }
	
	/**
	 * When an primary address is deleted find the new primary address aof the contact and
	 * update the area list.
	 * 
	 * @param CRM_Core_DAO_Address $objAddress
	 */
	public static function postAddressDelete($address_id) {
		if (!isset(self::$contact_ids[$address_id])) {
			return;
		}
		
		$objAddress = new CRM_Core_BAO_Address();
		$objAddress->contact_id = self::$contact_ids[$address_id];
		$objAddress->is_primary = '1';
		if ($objAddress->find(true)) {
			$address = array();
			CRM_Core_DAO::storeValues($objAddress, $address);
			$factory = \Civi::service('areas_definition_factory');
			$areaIds = $factory->getAreaIdsForAddress($address);
			
			self::updateAreas($areaIds, $objAddress->contact_id);
		}
	}
	
	/**
	 * When an primary address is deleted update the contact areas to an empty list.
	 * 
	 * When an address is deleted we have to call this from the pre hook as in the post hook
	 * the relevant information such as contact id and whether the address was a primary address is gone.
	 * 
	 * @param int $address_id  
	 */
	public static function preAddressDelete($address_id) {
		// Get the contact id and check whether the deleted address is an primary address
		try {
			$contact_id = civicrm_api3('Address', 'getvalue', array('id' => $address_id, 'is_primary' => 1, 'return' => 'contact_id'));
		} catch (Exception $e) {
			// Do nothing
			return;
		}
		
		if (!$contact_id) {
			return;
		}
			
		$areaIds = array();
		self::updateAreas($areaIds, $contact_id);
		self::$contact_ids[$address_id] = $contact_id;
	}
	
	/**
	 * Save the areas at the contact
	 * 
	 * @param array $area_ids
	 * @param int $contact_id
	 */
	protected static function updateAreas($area_ids, $contact_id) {
		$strAreaIds = CRM_Core_DAO::VALUE_SEPARATOR.implode(CRM_Core_DAO::VALUE_SEPARATOR, $area_ids).CRM_Core_DAO::VALUE_SEPARATOR;
		$sqlParams[1] = array($contact_id, 'Integer');
		CRM_Core_DAO::executeQuery("DELETE FROM civicrm_value_contact_areas WHERE entity_id = %1", $sqlParams);
		$sqlParams[2] = array($strAreaIds, 'String');
		CRM_Core_DAO::executeQuery("INSERT INTO civicrm_value_contact_areas (entity_id, areas) VALUES(%1, %2)", $sqlParams);
	}
}
