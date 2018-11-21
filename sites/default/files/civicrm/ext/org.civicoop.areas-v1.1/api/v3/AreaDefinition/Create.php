<?php

use CRM_Areas_ExtensionUtil as E;

/**
 * AreaDefinition.Create API specification (optional)
 * This is used for documentation and validation.
 *
 * @param array $spec description of fields supported by this API call
 * @return void
 * @see http://wiki.civicrm.org/confluence/display/CRM/API+Architecture+Standards
 */
function _civicrm_api3_area_definition_create_spec(&$spec) {
  $fields = CRM_Areas_BAO_AreaDefinition::fields();
	foreach($fields as $fieldname => $field) {
		$spec[$fieldname] = $field;
		if (isset($spec['required'])) {
			$spec['api.required'] = $spec['required'];
		}
	}
}

/**
 * AreaDefinition.Create API
 *
 * @param array $params
 * @return array API result descriptor
 * @see civicrm_api3_create_success
 * @see civicrm_api3_create_error
 *
 *
 */
function civicrm_api3_area_definition_create($params) {
  $returnValue = CRM_Areas_BAO_AreaDefinition::add($params);
	$returnValues[$returnValue['id']] = $returnValue;
  return civicrm_api3_create_success($returnValues, $params, 'AreaDefinition', 'Create');
}

