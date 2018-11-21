<?php

require_once 'areas.civix.php';
require_once __DIR__.'/CRM/Areas/Config.php'; 

use CRM_Areas_ExtensionUtil as E;

use \Symfony\Component\DependencyInjection\ContainerBuilder;
use \Symfony\Component\DependencyInjection\Definition;

/**
 * Implements hook_civicrm_area_definition_fields()
 * 
 * Add the fields for the AreaDefinitionTypes
 */
function areas_civicrm_area_definition_fields(&$fields) {
	$fields['country_id'] = array(
		'name' => 'country_id',
    'title' => E::ts('Country ID'),
    'type' => CRM_Utils_Type::T_INT,
    'required' => false
	);
	$fields['state_province_id'] = array(
		'name' => 'state_province_id',
    'title' => E::ts('State/Province ID'),
    'type' => CRM_Utils_Type::T_INT,
    'required' => false
	);
	$fields['city'] = array(
		'name' => 'city',
    'title' => E::ts('City'),
    'type' => CRM_Utils_Type::T_STRING,
    'maxlength' => 256,
    'required' => false
	);
	$fields['postal_code'] = array(
		'name' => 'postal_code',
    'title' => E::ts('Postal code'),
    'type' => CRM_Utils_Type::T_STRING,
    'maxlength' => 256,
    'required' => false
	);
}

/**
 * Implements hook_civicrm_container()
 *
 * @link https://docs.civicrm.org/dev/en/latest/hooks/hook_civicrm_container/
 */
function areas_civicrm_container(ContainerBuilder $container) {
	// Register the DefinitionTypeFactory
	$container->setDefinition('areas_definition_factory', new Definition('Civi\Areas\DefinitionType\Factory'));
}

/**
 * Implements hook_civicrm_fieldOptions().
 * 
 * Fill the list with all the areas
 * 
 * @link https://docs.civicrm.org/dev/en/latest/hooks/hook_civicrm_fieldOptions/
 */
function areas_civicrm_fieldOptions($entity, $field, &$options, $params) {
	if ($entity == 'Group') {
		$config = \CRM_Areas_Config::singleton();
		if ($field == 'custom_'.$config->getGroupAreasCustomFieldId()) {
			$areas = civicrm_api3('Area', 'get', array('options' => array('limit' => 0)));
			foreach($areas['values'] as $area) {
				$options[$area['id']] = $area['title'];
			}
		}
	}
	if ($entity == 'Contact') {
		$config = CRM_Areas_Config::singleton();
		if ($field == 'custom_'.$config->getContactAreasCustomFieldId()) {
			$areas = civicrm_api3('Area', 'get', array('options' => array('limit' => 0)));
			foreach($areas['values'] as $area) {
				$options[$area['id']] = $area['title'];
			}
		}
	}
}

/**
 * Implements hook_civicrm_pre().
 * 
 * When an address is deleted update the area list the contact.
 */
function areas_civicrm_pre($op, $objectName, $id, &$params) {
	if ($objectName == 'Address' && $op == 'delete') {
		CRM_Areas_AddressProcessor::preAddressDelete($id);
	}
}

/**
 * Implements hook_civicrm_post().
 * 
 * When an address is updated or created update the area list at the contact.
 */
function areas_civicrm_post($op, $objectName, $id, &$objectRef) {
	if ($objectName == 'Address' && in_array($op, array('edit', 'create'))) {
		CRM_Areas_AddressProcessor::postAddressEdit($objectRef);
	} elseif ($objectName == 'Address' && $op == 'delete') {
		CRM_Areas_AddressProcessor::postAddressDelete($id);
	}
	
}

/**
 * Returns an array with the angular templates for each definition type.
 * 
 * @return array
 */
function civicrm_area_definition_type_angular_templates() {
	$types = array();
	$factory = \Civi::service('areas_definition_factory');
	foreach($factory->getDefinitionTypes() as $type) {
		$types[$type->getName()] = $type->getAngularTemplateUrl();
	}
	return $types;
}

/**
 * Returns an array with the title fo each definition type.
 * 
 * @return array
 */
function civicrm_area_definition_types() {
	$types = array();
	$factory = \Civi::service('areas_definition_factory');
	foreach($factory->getDefinitionTypes() as $type) {
		$types[$type->getName()] = $type->getTitle();
	}
	return $types;
}

/**
 * Implements hook_civicrm_alterAPIPermissions()
 * 
 * Area create and area delete required administer CiviCRM permissions.
 * 
 * @link https://docs.civicrm.org/dev/en/latest/hooks/hook_civicrm_alterAPIPermissions/
 */
function areas_civicrm_alterAPIPermissions($entity, $action, &$params, &$permissions) {
		$permissions['area']['create'] = array('administer CiviCRM');
		$permissions['area']['delete'] = array('administer CiviCRM');
		$permissions['area_definition']['create'] = array('administer CiviCRM');
		$permissions['area_definition']['delete'] = array('administer CiviCRM');
}

/**
 * Implementation of hook_civicrm_navigationMenu.
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_navigationMenu
 */
function areas_civicrm_navigationMenu(&$params) {
	_areas_civix_insert_navigation_menu($params, 'Administer', array(
    'label' => ts('Manage Areas', array('domain' => 'org.civicoop.areas')),
  	'name' => 'areas',
    'url' => 'civicrm/admin/areas/#/areas',
    'permission' => 'administer CiviCRM',
    'operator' => NULL,
    'separator' => 2,
  ));
  _areas_civix_navigationMenu($params);
}

/**
 * Helper function for getting the highest key in the navigation menu.
 *
 * Taken from http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_navigationMenu.
 *
 * @param array $menuArray
 * @return int
 */
function _areas_getMenuKeyMax($menuArray) {
  $max = array(max(array_keys($menuArray)));
  foreach($menuArray as $v) {
    if (!empty($v['child'])) {
      $max[] = _areas_getMenuKeyMax($v['child']);
    }
  }
  return max($max);
}

/**
 * Implements hook_civicrm_config().
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_config
 */
function areas_civicrm_config(&$config) {
  _areas_civix_civicrm_config($config);
}

/**
 * Implements hook_civicrm_xmlMenu().
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_xmlMenu
 */
function areas_civicrm_xmlMenu(&$files) {
  _areas_civix_civicrm_xmlMenu($files);
}

/**
 * Implements hook_civicrm_install().
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_install
 */
function areas_civicrm_install() {
  _areas_civix_civicrm_install();
}

/**
 * Implements hook_civicrm_postInstall().
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_postInstall
 */
function areas_civicrm_postInstall() {
  _areas_civix_civicrm_postInstall();
}

/**
 * Implements hook_civicrm_uninstall().
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_uninstall
 */
function areas_civicrm_uninstall() {
  _areas_civix_civicrm_uninstall();
}

/**
 * Implements hook_civicrm_enable().
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_enable
 */
function areas_civicrm_enable() {
  _areas_civix_civicrm_enable();
}

/**
 * Implements hook_civicrm_disable().
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_disable
 */
function areas_civicrm_disable() {
  _areas_civix_civicrm_disable();
}

/**
 * Implements hook_civicrm_upgrade().
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_upgrade
 */
function areas_civicrm_upgrade($op, CRM_Queue_Queue $queue = NULL) {
  return _areas_civix_civicrm_upgrade($op, $queue);
}

/**
 * Implements hook_civicrm_managed().
 *
 * Generate a list of entities to create/deactivate/delete when this module
 * is installed, disabled, uninstalled.
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_managed
 */
function areas_civicrm_managed(&$entities) {
  _areas_civix_civicrm_managed($entities);
}

/**
 * Implements hook_civicrm_caseTypes().
 *
 * Generate a list of case-types.
 *
 * Note: This hook only runs in CiviCRM 4.4+.
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_caseTypes
 */
function areas_civicrm_caseTypes(&$caseTypes) {
  _areas_civix_civicrm_caseTypes($caseTypes);
}

/**
 * Implements hook_civicrm_angularModules().
 *
 * Generate a list of Angular modules.
 *
 * Note: This hook only runs in CiviCRM 4.5+. It may
 * use features only available in v4.6+.
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_angularModules
 */
function areas_civicrm_angularModules(&$angularModules) {
  _areas_civix_civicrm_angularModules($angularModules);
}

/**
 * Implements hook_civicrm_alterSettingsFolders().
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_alterSettingsFolders
 */
function areas_civicrm_alterSettingsFolders(&$metaDataFolders = NULL) {
  _areas_civix_civicrm_alterSettingsFolders($metaDataFolders);
}

// --- Functions below this ship commented out. Uncomment as required. ---

/**
 * Implements hook_civicrm_preProcess().
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_preProcess
 *
function areas_civicrm_preProcess($formName, &$form) {

} // */

/**
 * Implements hook_civicrm_navigationMenu().
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_navigationMenu
 *
function areas_civicrm_navigationMenu(&$menu) {
  _areas_civix_insert_navigation_menu($menu, NULL, array(
    'label' => E::ts('The Page'),
    'name' => 'the_page',
    'url' => 'civicrm/the-page',
    'permission' => 'access CiviReport,access CiviContribute',
    'operator' => 'OR',
    'separator' => 0,
  ));
  _areas_civix_navigationMenu($menu);
} // */
