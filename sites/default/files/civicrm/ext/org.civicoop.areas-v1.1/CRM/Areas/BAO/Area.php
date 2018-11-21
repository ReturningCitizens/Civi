<?php

use CRM_Areas_ExtensionUtil as E;

/**
 * @author Jaap Jansma (CiviCooP) <jaap.jansma@civicoop.org>
 * @license http://www.gnu.org/licenses/agpl-3.0.html
 */
class CRM_Areas_BAO_Area extends CRM_Areas_DAO_Area {
	
	/**
   * Function to get values
   * 
   * @return array $result found rows with data
   * @access public
   * @static
   */
  public static function getValues($params) {
    $result = array();
    $area = new CRM_Areas_BAO_Area();
    if (!empty($params)) {
      $fields = self::fields();
      foreach ($params as $key => $value) {
        if (isset($fields[$key])) {
          $area->$key = $value;
        }
      }
    }
    $area->find();
    while ($area->fetch()) {
      $row = array();
      self::storeValues($area, $row); 			
      $result[$row['id']] = $row;
    }
    return $result;
  }
 	
	/**
   * Function to add or update an area
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
      throw new Exception('Params can not be empty when adding or updating an area');
    }

    if (!empty($params['id'])) {
      CRM_Utils_Hook::pre('edit', 'Area', $params['id'], $params);
    }
    else {
      CRM_Utils_Hook::pre('create', 'Area', NULL, $params);
    }

    $area = new CRM_Areas_BAO_Area();
    $fields = self::fields();
    foreach ($params as $key => $value) {
      if (isset($fields[$key])) {
        $area->$key = $value;
      }
    }
    $area->save();
    self::storeValues($area, $result);

    if (!empty($params['id'])) {
      CRM_Utils_Hook::post('edit', 'Area', $area->id, $area);
    }
    else {
      CRM_Utils_Hook::post('create', 'Area', $area->id, $area);
    }

    return $result;
  }

	/**
   * Function to delete an area with id
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

    CRM_Utils_Hook::pre('delete', 'Area', $id, CRM_Core_DAO::$_nullArray);
		
		CRM_Areas_BAO_AreaDefinition::deleteWithAreaId($id);

    $area = new CRM_Areas_BAO_Area();
    $area->id = $id;
    $area->delete();

    CRM_Utils_Hook::post('delete', 'Area', $id, CRM_Core_DAO::$_nullArray);

    return;
  }
	
}
