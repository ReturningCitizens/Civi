<?php

use CRM_Areas_ExtensionUtil as E;

/**
 * Area.Create API specification (optional)
 * This is used for documentation and validation.
 *
 * @param array $spec description of fields supported by this API call
 * @return void
 * @see http://wiki.civicrm.org/confluence/display/CRM/API+Architecture+Standards
 */
function _civicrm_api3_area_create_spec(&$spec) {
  $spec['id'] = array(
		'title' => E::ts('ID'),
		'type' => CRM_Utils_Type::T_INT,
		'api.required' => false
	);
	$spec['title'] = array(
		'title' => E::ts('Title'),
		'type' => CRM_Utils_Type::T_STRING,
		'api.required' => true
	);
}

/**
 * Area.Create API
 *
 * @param array $params
 * @return array API result descriptor
 * @see civicrm_api3_create_success
 * @see civicrm_api3_create_error
 *
 *
 */
function civicrm_api3_area_create($params) {
  $returnValue = CRM_Areas_BAO_Area::add($params);
	$returnValues[$returnValue['id']] = $returnValue;
  return civicrm_api3_create_success($returnValues, $params, 'Area', 'Create');
}

