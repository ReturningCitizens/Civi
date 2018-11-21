<?php

use CRM_Areas_ExtensionUtil as E;

/**
 * @author Jaap Jansma (CiviCooP) <jaap.jansma@civicoop.org>
 * @license http://www.gnu.org/licenses/agpl-3.0.html
 */
class CRM_Areas_BAO_AreaDefinition extends CRM_Areas_DAO_AreaDefinition {
	
	/**
   * Function to get values
   * 
   * @return array $result found rows with data
   * @access public
   * @static
   */
  public static function getValues($params) {
    $result = array();
    $areaDefinition = new CRM_Areas_BAO_AreaDefinition();
    if (!empty($params)) {
      $fields = self::fields();
      foreach ($params as $key => $value) {
        if (isset($fields[$key])) {
          $areaDefinition->$key = $value;
        }
      }
    }
    $areaDefinition->find();
    while ($areaDefinition->fetch()) {
      $row = array();
      self::storeValues($areaDefinition, $row);
			
			$factory = \Civi::service('areas_definition_factory');
			$type = $factory->getDefinitionTypeByName($row['type']);
			$row['type_label'] = '';
			$row['settings_label'] = '';
			if ($type) {
				$row['type_label'] = $type->getTitle();
				$row['settings_label'] = $type->getUserfriendlyConfiguration($row);	
			}
			 			
      $result[$row['id']] = $row;
    }
    return $result;
  }
 	
	/**
   * Function to add or update an area definition
   * 
   * @param array $params 
   * @return array $result
   * @access public
   * @throws Exception when params is empty
   * @static
   */
  public static function add($params) {
    $result = array();
    if (empty($params)) {
      throw new Exception('Params can not be empty when adding or updating an area definition');
    }

    if (!empty($params['id'])) {
      CRM_Utils_Hook::pre('edit', 'AreaDefinition', $params['id'], $params);
    }
    else {
      CRM_Utils_Hook::pre('create', 'AreaDefinition', NULL, $params);
    }

    $areaDefinition = new CRM_Areas_BAO_AreaDefinition();
    $fields = self::fields();
    foreach ($params as $key => $value) {
      if (isset($fields[$key])) {
        $areaDefinition->$key = $value;
      }
    }
    $areaDefinition->save();
    self::storeValues($areaDefinition, $result);

    if (!empty($params['id'])) {
      CRM_Utils_Hook::post('edit', 'AreaDefinition', $areaDefinition->id, $areaDefinition);
    }
    else {
      CRM_Utils_Hook::post('create', 'AreaDefinition', $areaDefinition->id, $areaDefinition);
    }

    return $result;
  }

	/**
   * Function to delete an area definition with id
   * 
   * @param int $id
   * @throws Exception when $id is empty
   * @access public
   * @static
   */
  public static function deleteWithId($id) {
    if (empty($id)) {
      throw new Exception('id can not be empty when attempting to delete an area');
    }

    CRM_Utils_Hook::pre('delete', 'AreaDefinition', $id, CRM_Core_DAO::$_nullArray);

    $areaDefinition = new CRM_Areas_BAO_AreaDefinition();
    $areaDefinition->id = $id;
    $areaDefinition->delete();

    CRM_Utils_Hook::post('delete', 'AreaDefinition', $id, CRM_Core_DAO::$_nullArray);

    return;
  }
	
	/**
   * Function to delete an area definition with an area id
   * 
   * @param int $id
   * @throws Exception when $id is empty
   * @access public
   * @static
   */
  public static function deleteWithAreaId($area_id) {
    $areaDefinition = new CRM_Areas_BAO_AreaDefinition();
    $areaDefinition->area_id = $area_id;
		$areaDefinition->find();
		while($areaDefinition->fetch()) {
			self::deleteWithId($areaDefinition->id);
		}
    return;
  }
	
}
