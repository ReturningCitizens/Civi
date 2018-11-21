<?php
/**
 * @author Jaap Jansma (CiviCooP) <jaap.jansma@civicoop.org>
 * @license http://www.gnu.org/licenses/agpl-3.0.html
 */

namespace Civi\Areas\DefinitionType;

use \Civi\Areas\DefinitionType\AbstractDefinitionType;
use \Civi\Areas\DefinitionType\Country;
use \Civi\Areas\DefinitionType\StateProvince;
use \Civi\Areas\DefinitionType\CityWithStateProvince;
use \Civi\Areas\DefinitionType\City;
use \Civi\Areas\DefinitionType\PostalCode;

class Factory {
	
	/**
	 * @var array<AbstractDefinitionType>
	 */
	protected $types = array();
	
	public function __construct() {
		$this->addDefinitionType(new Country());
		$this->addDefinitionType(new StateProvince());
		$this->addDefinitionType(new City());
		$this->addDefinitionType(new CityWithStateProvince());
		$this->addDefinitionType(new PostalCode());
	}
	
	/**
	 * Add a type
	 * 
	 * @param AbstractDefinitionType $type
	 */
	public function addDefinitionType(AbstractDefinitionType $type) {
		$this->types[$type->getName()] = $type;
		return $this;
	}
	
	/**
	 * Return the definition type
	 * 
	 * @param string $name
	 * @return AbstractDefinitionType|null
	 */
	public function getDefinitionTypeByName($name) {
		if (isset($this->types[$name])) {
			return $this->types[$name];
		}
		return null;
	}
	
	/**
	 * @return array<AbstractDefinitionType>
	 */
	public function getDefinitionTypes() {
		return $this->types;
	}
	
	/**
	 * Retrieve all areas for an address.
	 * 
	 * @param array $address
	 *   The adress.
	 * @return array
	 *   Array with area ids for the given address
	 */
	public function getAreaIdsForAddress($address) {
		$sql = "SELECT * FROM `civicrm_area_definition` WHERE ";
		$whereClauses = array();
		foreach($this->types as $type) {
			$whereClause = $type->getWhereClause($address);
			if (!$whereClause) {
				continue;
			}
			$typeName = \CRM_Utils_Type::escape($type->getName(), 'String');
			$whereClauses[] = "(($whereClause) AND `type` = '$typeName')";
		}
		
		if (!count($whereClauses)) {
			return array();
		}
		
		$areaIds = array();
		$sql .= implode(" OR ", $whereClauses);
		$dao = \CRM_Core_DAO::executeQuery($sql);
		$definitions = $dao->fetchAll();
		foreach($definitions as $definition) {
			if (in_array($definition['area_id'], $areaIds)) {
				continue;
			}
			$type = $this->getDefinitionTypeByName($definition['type']);
			if ($type && $type->isTypeValidForAddress($address, $definition)) {
				$areaIds[] = $definition['area_id'];
			}
		}
		return $areaIds;
	}
	
	
} 
