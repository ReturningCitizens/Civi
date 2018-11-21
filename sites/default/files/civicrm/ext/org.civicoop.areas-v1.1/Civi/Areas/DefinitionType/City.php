<?php
/**
 * @author Jaap Jansma (CiviCooP) <jaap.jansma@civicoop.org>
 * @license http://www.gnu.org/licenses/agpl-3.0.html
 */

namespace Civi\Areas\DefinitionType;

use Civi\Areas\DefinitionType\AbstractDefinitionType;

use CRM_Areas_ExtensionUtil as E;

class City extends AbstractDefinitionType {
	
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
		if (!isset($address['city']) || empty($address['city'])) {
			return false;
		}
		$country_id = \CRM_Utils_Type::escape($address['country_id'], 'Integer');
		$city = \CRM_Utils_Type::escape(trim($address['city']), 'String');
		return "`country_id` = '$country_id' AND `city` = '$city'";
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
		if (trim(mb_strtolower($address['city'])) != trim(mb_strtolower($definitionData['city']))) {
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
		return E::ts('City');
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
		$city = '';
		if (isset($definitionData['country_id'])) {
			$country = \CRM_Core_PseudoConstant::country($definitionData['country_id']);
		}
		if (isset($definitionData['city'])) {
			$city = $definitionData['city'];
		}
		return E::ts('%1, %2', array(1=>$city, 2=>$country));
	}
	
	/**
	 * Returns the name of the angular template for editing/adding a new definition to an area.
	 * 
	 * @return string
	 */
	public function getAngularTemplateUrl() {
		return '~/areas/areaDefinition/CityCtl.html';
	}
	
}
