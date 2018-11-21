<?php

use CRM_Areas_ExtensionUtil as E;

/**
 * @author Jaap Jansma (CiviCooP) <jaap.jansma@civicoop.org>
 * @license http://www.gnu.org/licenses/agpl-3.0.html
 */
class CRM_Areas_DAO_AreaDefinition extends CRM_Core_DAO {
  /**
   * static instance to hold the field values
   *
   * @var array
   * @static
   */
  static $_fields = null;
  static $_export = null;
  /**
   * empty definition for virtual function
   */
  static function getTableName() {
    return 'civicrm_area_definition';
  }
  /**
   * returns all the column names of this table
   *
   * @access public
   * @return array
   */
  public static function &fields() {
    if (!(self::$_fields)) {
      self::$_fields = array(
        'id' => array(
          'name' => 'id',
          'title' => E::ts('ID'),
          'type' => CRM_Utils_Type::T_INT,
          'required' => true
        ),
        'area_id' => array(
          'name' => 'area_id',
          'title' => E::ts('Area ID'),
          'type' => CRM_Utils_Type::T_INT,
          'required' => true
        ),
        'type' => array(
          'name' => 'type',
          'title' => E::ts('Type'),
          'type' => CRM_Utils_Type::T_STRING,
          'maxlength' => 80,
          'required' => true
        ),
      );
			// Call a hook so other extension can extend the field array.
			// The extension of the field array is handy when someone else has its own area definition class which adds fields to the area definition table.
			$hook = CRM_Utils_Hook::singleton();
			$hook->invoke(array('fields'), self::$_fields, CRM_Core_DAO::$_nullObject, CRM_Core_DAO::$_nullObject, CRM_Core_DAO::$_nullObject, CRM_Core_DAO::$_nullObject, CRM_Core_DAO::$_nullObject, 'civicrm_area_definition_fields');
    }
    return self::$_fields;
  }
  /**
   * Returns an array containing, for each field, the array key used for that
   * field in self::$_fields.
   *
   * @access public
   * @return array
   */
  public static function &fieldKeys() {
    if (!(self::$_fieldKeys)) {
    	self::$_fieldKeys = array();
      $fields = self::fields();
			foreach($fields as $field_key => $field) {
				self::$_fieldKeys[$field_key] = $field_key;
			}
    }
    return self::$_fieldKeys;
  }
  /**
   * returns the list of fields that can be exported
   *
   * @access public
   * return array
   * @static
   */
  static function &export($prefix = false)
  {
    if (!(self::$_export)) {
      self::$_export = array();
      $fields = self::fields();
      foreach($fields as $name => $field) {
        if (CRM_Utils_Array::value('export', $field)) {
          if ($prefix) {
            self::$_export['civicrm_area_definition'] = & $fields[$name];
          } else {
            self::$_export[$name] = & $fields[$name];
          }
        }
      }
    }
    return self::$_export;
  }
}