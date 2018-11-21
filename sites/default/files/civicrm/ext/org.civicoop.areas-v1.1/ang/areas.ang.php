<?php
// This file declares an Angular module which can be autoloaded
// in CiviCRM. See also:
// http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_angularModules

return array (
	'basePages' => array('civicrm/admin/areas'),
    'requires' => array(
      'crmApp',
      'crmUi',
      'crmUtil',
      'ngRoute',
      'ngSanitize',
      'dialogService',
      'ui.utils',
    ),
  'js' => 
  array (
    0 => 'ang/areas.js',
    1 => 'ang/areas/*.js',
    2 => 'ang/areas/*/*.js',
  ),
  'css' => 
  array (
    0 => 'ang/areas.css',
  ),
  'partials' => 
  array (
    0 => 'ang/areas',
  ),
  'settings' => 
  array (
    'areaDefinitionTypes' => civicrm_area_definition_types(),
  	'areaDefinitionTypeTemplates' => civicrm_area_definition_type_angular_templates(),
  ),
);
