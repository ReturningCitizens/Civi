<?php
/**
 * @author Jaap Jansma (CiviCooP) <jaap.jansma@civicoop.org>
 * @license http://www.gnu.org/licenses/agpl-3.0.html
 */

namespace Civi\Areas\DefinitionType;

use Civi\Areas\DefinitionType\AbstractDefinitionType;

use CRM_Areas_ExtensionUtil as E;

class PostalCode extends AbstractDefinitionType {
	
	/**
	 * Returns the where part of the query to fetch definition types from the civicrm_area_definition table.
	 * 
	 * For example if you want the fetch all definition for the city London your query will return
	 *   "LOWER(`city`) = 'london'"
	 * The constructed query will then look like:  
	 *   SELECT * FROM civicrm_area_definition WHERE ((LOWER(`city`) = 'london') AND `type` = 'city')
	 * 
	 * If there is no condition for the address data you should return false.
	 * 
	 * @param array $address
	 *    Address data
	 * @return string|false
	 *   The where part of the query or false when you cannot provide a where clause.
	 */
	public function getWhereClause($address) {
		if (!isset($address['country_id']) || empty($address['country_id'])) {
			return false;
		}
		if (!isset($address['postal_code']) || empty($address['postal_code'])) {
			return false;
		}
		$country_id = \CRM_Utils_Type::escape($address['country_id'], 'Integer');
		$postal_code = \CRM_Utils_Type::escape(trim($address['postal_code']), 'String');
		// the query is case insensitive but we do a replace of all spaces so that 1234 AB equals 1234ab
		return "`country_id` = '$country_id' AND REPLACE(`postal_code`, ' ', '') = REPLACE('$postal_code', ' ', '')";
	}
	
	/**
	 * Returns whether the address is valid with the given definition data
	 * 
	 * @param array $address
	 *   Address data.
	 * @param array $definitionData
	 *   The data from the civicrm_area_definition table.
	 * @return bool
	 */
	public function isTypeValidForAddress($address, $definitionData) {
		if (!isset($definitionData['country_id']) || empty($definitionData['country_id'])) {
			return false;
		}
		if (!isset($address['country_id']) || empty($address['country_id'])) {
			return false;
		}
		if ($address['country_id'] != $definitionData['country_id']) {
			return false;
		}
		// We do a replacement of spaces so that 1234 AB equals 1234AB
		$postalCodeInAddress = str_replace(' ', '', $address['postal_code']);
		$postalCodeInDefinitionData = str_replace(' ', '', $definitionData['postal_code']);
		if (trim(mb_strtolower($postalCodeInAddress)) != trim(mb_strtolower($postalCodeInDefinitionData))) {
			return false;
		}
		return true;
	}
	
	/**
	 * Returns the title.
	 * 
	 * @return string
	 */
	public function getTitle() {
		return E::ts('Postal code');
	}
	
	/**
	 * Returns a userfriendly representation of the definition settings.
	 * 
	 * Example Country = Netherlands
	 * 
	 * @return string
	 */
	public function getUserfriendlyConfiguration($definitionData) {
		$country = '';
		$postal_code = '';
		if (isset($definitionData['country_id'])) {
			$country = \CRM_Core_PseudoConstant::country($definitionData['country_id']);
		}
		if (isset($definitionData['postal_code'])) {
			$postal_code = $definitionData['postal_code'];
		}
		return E::ts('%1, %2', array(1=>$postal_code, 2=>$country));
	}
	
	/**
	 * Returns the name of the angular template for editing/adding a new definition to an area.
	 * 
	 * @return string
	 */
	public function getAngularTemplateUrl() {
		return '~/areas/areaDefinition/PostalCodeCtl.html';
	}
	
}
