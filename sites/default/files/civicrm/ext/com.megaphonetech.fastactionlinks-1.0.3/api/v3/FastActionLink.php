<?php

/**
 * FastActionLink.create API specification (optional)
 * This is used for documentation and validation.
 *
 * @param array $spec description of fields supported by this API call
 * @return void
 * @see http://wiki.civicrm.org/confluence/display/CRMDOC/API+Architecture+Standards
 */
function _civicrm_api3_fast_action_link_create_spec(&$spec) {
  // $spec['some_parameter']['api.required'] = 1;
}

/**
 * FastActionLink.create API
 *
 * @param array $params
 * @return array API result descriptor
 * @throws API_Exception
 */
function civicrm_api3_fast_action_link_create($params) {
  return _civicrm_api3_basic_create(_civicrm_api3_get_BAO(__FUNCTION__), $params);
}

/**
 * FastActionLink.delete API
 *
 * @param array $params
 * @return array API result descriptor
 * @throws API_Exception
 */
function civicrm_api3_fast_action_link_delete($params) {
  return _civicrm_api3_basic_delete(_civicrm_api3_get_BAO(__FUNCTION__), $params);
}

/**
 * FastActionLink.get API
 *
 * @param array $params
 * @return array API result descriptor
 * @throws API_Exception
 */
function civicrm_api3_fast_action_link_get($params) {
  return _civicrm_api3_basic_get(_civicrm_api3_get_BAO(__FUNCTION__), $params);
}

/**
 * Metadata for execute function.
 *
 * @param array $params
 */
function _civicrm_api3_fast_action_link_execute_spec(&$params) {
  $params['id'] = array(
    'title' => 'id',
    'description' => ts('Unique FastActionLink ID'),
    'type' => CRM_Utils_Type::T_INT,
    'api.required' => TRUE,
  );
  $params['entity_id'] = array(
    'title' => 'Entity ID',
    'description' => ts('Entity ID to take action on (usually a contact)'),
    'type' => CRM_Utils_Type::T_INT,
    'api.required' => TRUE,
  );
}

function civicrm_api3_fast_action_link_execute($params) {
  $id = $params['id'];
  $entityId = $params['entity_id'];
  return CRM_Fastactionlinks_BAO_FastActionLink::execute($entityId, $id);
}

function _civicrm_api3_fast_action_link_getaction_spec(&$spec) {
  $spec['action_type']['api.required'] = 1;
}

function civicrm_api3_fast_action_link_getaction($params) {
  $action_type = $params['action_type'];
  return CRM_Fastactionlinks_Action::getAction($action_type);
}
