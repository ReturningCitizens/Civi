<?php
// This file declares a managed database record of type "Job".
// The record will be automatically inserted, updated, or deleted from the
// database as appropriate. For more details, see "hook_civicrm_managed" at:
// http://wiki.civicrm.org/confluence/display/CRMDOC42/Hook+Reference
return array (
  0 => 
  array (
    'name' => 'Cron:Contact.UpdateAreas',
    'entity' => 'Job',
    'params' => 
    array (
      'version' => 3,
      'name' => 'Update areas of all contacts',
      'description' => 'This cron job updates the linked areas of all contacts.',
      'run_frequency' => 'Daily',
      'api_entity' => 'Contact',
      'api_action' => 'Update_areas',
      'parameters' => '',
    ),
  ),
);
