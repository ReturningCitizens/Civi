<?php

use CRM_Areas_ExtensionUtil as E;

/**
 * Area.Get API
 *
 * @param array $params
 * @return array API result descriptor
 * @see civicrm_api3_create_success
 * @see civicrm_api3_create_error
 * @throws API_Exception
 */
function civicrm_api3_area_get($params) {
  $returnValues = CRM_Areas_BAO_Area::getValues($params);
  return civicrm_api3_create_success($returnValues, $params, 'Area', 'Get');
}

/**
 * Area.Get API specification (optional)
 * This is used for documentation and validation.
 *
 * @param array $spec description of fields supported by this API call
 * @return void
 * @see http://wiki.civicrm.org/confluence/display/CRM/API+Architecture+Standards
 */
function _civicrm_api3_area_get_spec(&$spec) {
	$fields = CRM_Areas_BAO_Area::fields();
	foreach($fields as $fieldname => $field) {
		$spec[$fieldname] = $field;
	}
}

