<?php

use CRM_Areas_ExtensionUtil as E;

/**
 * Area.Delete API specification (optional)
 * This is used for documentation and validation.
 *
 * @param array $spec description of fields supported by this API call
 * @return void
 * @see http://wiki.civicrm.org/confluence/display/CRMDOC/API+Architecture+Standards
 */
function _civicrm_api3_area_Delete_spec(&$spec) {
  $spec['id'] = array(
		'title' => E::ts('ID'),
		'type' => CRM_Utils_Type::T_INT,
		'api.required' => true
	);
}

/**
 * Area.Delete API
 *
 * @param array $params
 * @return array API result descriptor
 * @see civicrm_api3_create_success
 * @see civicrm_api3_create_error
 * @throws API_Exception
 */
function civicrm_api3_area_Delete($params) {
  if (!array_key_exists('id', $params) || empty($params['id'])) {
    throw new API_Exception('Parameter id is mandatory and can not be empty in ' . __METHOD__, 0010);
  } else {
    return civicrm_api3_create_success(CRM_Areas_BAO_Area::deleteWithId($params['id']), $params, 'Area', 'Delete');
  }
}

