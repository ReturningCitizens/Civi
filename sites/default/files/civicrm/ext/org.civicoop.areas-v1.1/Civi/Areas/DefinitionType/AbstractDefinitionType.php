<?php
/**
 * @author Jaap Jansma (CiviCooP) <jaap.jansma@civicoop.org>
 * @license http://www.gnu.org/licenses/agpl-3.0.html
 */

namespace Civi\Areas\DefinitionType;

use CRM_Areas_ExtensionUtil as E;

abstract class AbstractDefinitionType {
	
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
	abstract public function getWhereClause($address);
	
	/**
	 * Returns whether the address is valid with the given definition data
	 * 
	 * @param array $address
	 *   Address data.
	 * @param array $definitionData
	 *   The data from the civicrm_area_definition table.
	 * @return bool
	 */
	abstract public function isTypeValidForAddress($address, $definitionData);
	
	/**
	 * Returns the title.
	 * 
	 * @return string
	 */
	abstract public function getTitle();
	
	/**
	 * Returns a userfriendly representation of the definition settings.
	 * 
	 * Example Country = Netherlands
	 * 
	 * @return string
	 */
	abstract public function getUserfriendlyConfiguration($definitionData);
	
	/**
	 * Returns the name of the angular template for editing/adding a new definition to an area.
	 * 
	 * @return string
	 */
	abstract public function getAngularTemplateUrl();
	
	public function getName() {
		$reflect = new \ReflectionClass($this);
		$className = $reflect->getShortName();
		return $className;
	}
	
}