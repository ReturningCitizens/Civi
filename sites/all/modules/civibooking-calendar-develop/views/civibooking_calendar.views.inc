<?php

/**
 * Implements hook_views_data_alter().
 *
 * Return $data to hook_views_data*/

function civibooking_calendar_views_data_alter(&$data) {

    $data['civicrm_booking']['id']['help'] = t('id');
    $data['civicrm_booking_slot']['id']['help'] = t('id');
    $data['civicrm_booking']['date_argument']['argument']['handler'] = 'civibooking_calendar_date_views_argument_handler';
    $data['civicrm_booking_slot']['date_argument']['argument']['handler'] = 'civibooking_calendar_date_views_argument_handler';

    $data['civicrm_booking_slot']['resource_id'] = array (
        'title' => t('Resource'),
        'help' => t('Resource'),
        'real field' => 'resource_id',
        'field' => array(
            'handler' => 'views_handler_field',
            'click sortable' => TRUE,
        ),
        'argument' => array(
            'handler' => 'views_handler_argument_numeric',
            'name field' => 'resource id',
            'numeric' => FALSE
        ),
        'filter' => array(
            'handler' => 'views_handler_filter_numeric',
            'help' => t('Filter on CiviCRM Booking Resource ID field.'),
        ),
        'sort' => array(
            'handler' => 'views_handler_sort',
            'help' => t('Sort on CiviCRM Booking Resource ID field.'),
        ),
    );

    $data['civicrm_booking_slot']['is_cancelled'] = array (
        'title' => t('Is Cancelled'),
        'help' => t('Is Cancelled'),
        'real field' => 'is_cancelled',
        'field' => array(
            'handler' => 'views_handler_field',
            'click sortable' => TRUE,
        ),
        'argument' => array(
            'handler' => 'views_handler_argument_numeric',
            'name field' => 'is cancelled',
            'numeric' => FALSE
        ),
        'filter' => array(
            'handler' => 'views_handler_filter_numeric',
        ),
        'sort' => array(
            'handler' => 'views_handler_sort',
        ),
    );

    $data['civicrm_booking_slot']['is_deleted'] = array (
        'title' => t('Is Deleted'),
        'help' => t('Is Deleted'),
        'real field' => 'is_deleted',
        'field' => array(
            'handler' => 'views_handler_field',
            'click sortable' => TRUE,
        ),
        'argument' => array(
            'handler' => 'views_handler_argument_numeric',
            'name field' => 'is deleted',
            'numeric' => FALSE
        ),
        'filter' => array(
            'handler' => 'views_handler_filter_numeric',
            'help' => t('Filter on CiviCRM Booking Resource ID field.'),
        ),
        'sort' => array(
            'handler' => 'views_handler_sort',
            'help' => t('Sort on CiviCRM Booking Resource ID field.'),
        ),
    );

    $data['civicrm_booking_slot']['start'] = array(
        'title' => t('Start Date'),
        'help' => t('Start Date'),
        'real field' => 'start',
        'field' => array(
            'handler' => 'civicrm_handler_field_datetime',
            'click sortable' => TRUE,
        ),
        'argument' => array(
            'handler' => 'views_handler_argument_date',
            'name field' => 'resource start date',
            'numeric' => FALSE
        ),
        'filter' => array(
            'handler' => 'civicrm_handler_filter_datetime',
            'help' => t('Filter on CiviCRM Booking Resource Start Date field.'),
            'is date' => TRUE,
        ),
        'sort' => array(
            'handler' => 'civicrm_handler_sort_date',
            'help' => t('Sort on CiviCRM Booking Resource Start Date field.'),
        ),
    );

    $data['civicrm_booking_slot']['end'] = array(
        'title' => t('End Date'),
        'help' => t('End Date'),
        'real field' => 'end',
        'field' => array(
            'handler' => 'civicrm_handler_field_datetime',
            'click sortable' => TRUE,
        ),
        'argument' => array(
            'handler' => 'views_handler_argument_date',
            'name field' => 'resource end date',
            'numeric' => FALSE
        ),
        'filter' => array(
            'handler' => 'civicrm_handler_filter_datetime',
            'help' => t('Filter on CiviCRM Booking Resource End Date field.'),
            'is date' => TRUE,
        ),
        'sort' => array(
            'handler' => 'civicrm_handler_sort_date',
            'help' => t('Sort on CiviCRM Booking Resource End Date field.'),
        ),
    );

    $data['civicrm_booking']['title'] = array(
        'title' => t('title'),
        'help' => t('title'),
        'real field' => 'title',
        'field' => array(
            'handler' => 'views_handler_field',
            'click sortable' => TRUE,
        ),
        'argument' => array(
            'handler' => 'views_handler_argument_string',
            'name field' => 'title',
            'numeric' => FALSE
        ),
        'filter' => array(
            'handler' => 'views_handler_filter_string',
            'help' => t('booked title'),
        ),
        'sort' => array(
            'handler' => 'views_handler_sort',
            'help' => t('Sort on CiviCRM Booking title field.'),
        ),
    );

    $data['civicrm_booking']['status_id'] = array(
        'title' => t('Status'),
        'help' => t('Status'),
        'real field' => 'status_id',
        'field' => array(
            'handler' => 'views_handler_field',
            'click sortable' => TRUE,
        ),
        'argument' => array(
            'handler' => 'views_handler_argument_numeric',
            'name field' => 'status id',
            'numeric' => FALSE
        ),
        'filter' => array(
            'handler' => 'views_handler_filter_numeric',
            'help' => t('Filter on CiviCRM Booking Status ID field.'),
        ),
        'sort' => array(
            'handler' => 'views_handler_sort',
            'help' => t('Sort on CiviCRM Booking Status ID field.'),
        ),
    );

    $data['civicrm_booking']['booking_date']['help'] = t('Booked Date');
    $data['civicrm_booking']['booking_date']['filter']['help'] = t('Filter on CiviCRM Booking Booking Date field.');
    $data['civicrm_booking']['booking_date']['sort']['help'] = t('Sort on CiviCRM Booking Booking Date field.');


    $data['civicrm_booking']['start_date'] = array(
        'title' => t('Start Date'),
        'help' => t('Start Date'),
        'real field' => 'start_date',
        'field' => array(
            'handler' => 'civicrm_handler_field_datetime',
            'click sortable' => TRUE,
        ),
        'argument' => array(
            'handler' => 'views_handler_argument_date',
            'name field' => 'start date',
            'numeric' => FALSE
        ),
        'filter' => array(
            'handler' => 'civicrm_handler_filter_datetime',
            'help' => t('Filter on CiviCRM Booking Start Date field.'),
            'is date' => TRUE,
        ),
        'sort' => array(
            'handler' => 'civicrm_handler_sort_date',
            'help' => t('Sort on CiviCRM Booking Start Date field.'),
        ),
    );

    $data['civicrm_booking']['end_date'] = array(
        'title' => t('End Date'),
        'help' => t('End Date'),
        'real field' => 'end_date',
        'field' => array(
            'handler' => 'civicrm_handler_field_datetime',
            'click sortable' => TRUE,
        ),
        'argument' => array(
            'handler' => 'views_handler_argument_date',
            'name field' => 'end date',
            'numeric' => FALSE
        ),
        'filter' => array(
            'handler' => 'civicrm_handler_filter_datetime',
            'help' => t('Filter on CiviCRM Booking End Date field.'),
            'is date' => TRUE,
        ),
        'sort' => array(
            'handler' => 'civicrm_handler_sort_date',
            'help' => t('Sort on CiviCRM Booking End Date field.'),
        ),
    );

    $data['civicrm_booking']['po_number'] = array(
        'title' => t('Po Number'),
        'help' => t('Po Number'),
        'real field' => 'po_number',
        'field' => array(
            'handler' => 'views_handler_field',
            'click sortable' => TRUE,
        ),
        'argument' => array(
            'handler' => 'views_handler_argument_string',
            'name field' => 'po_number',
            'numeric' => FALSE
        ),
        'filter' => array(
            'handler' => 'views_handler_filter_string',
            'help' => t('Filter on CiviCRM Booking Po number field.'),
        ),
        'sort' => array(
            'handler' => 'views_handler_sort',
            'help' => t('Sort on CiviCRM Booking Po Number field.'),
        ),
    );

    $data['civicrm_booking']['total_amount'] = array(
        'title' => t('Total Amount'),
        'help' => t('Total Amount'),
        'real field' => 'total_amount',
        'field' => array(
            'handler' => 'views_handler_field_numeric',
            'click sortable' => TRUE,
        ),
        'argument' => array(
            'handler' => 'views_handler_argument_numeric',
            'name field' => 'total_amount',
            'numeric' => FALSE
        ),
        'filter' => array(
            'handler' => 'views_handler_filter_numeric',
            'help' => t('Filter on CiviCRM Booking Total Amount field.'),
        ),
        'sort' => array(
            'handler' => 'views_handler_sort',
            'help' => t('Sort on CiviCRM Booking Total Amount field.'),
        ),
    );

    $data['civicrm_booking']['description']['help'] = t('Description');
    $data['civicrm_booking']['description']['filter']['help'] = t('Description');
    $data['civicrm_booking']['description']['sort']['help'] = t('Description');

    $data['civicrm_booking']['note']['help'] = t('Note');
    $data['civicrm_booking']['note']['filter']['help'] = t('Note');
    $data['civicrm_booking']['note']['sort']['help'] = t('Note');

    $data['civicrm_booking']['adhoc_charges_note']['help'] = t('Adhoc Charges Note');
    $data['civicrm_booking']['adhoc_charges_note']['filter']['help'] = t('Adhoc Charges Note');
    $data['civicrm_booking']['adhoc_charges_note']['sort']['help'] = t('Adhoc Charges Note');

    $data['civicrm_booking']['participants_estimate']['help'] = t('Participants Estimate');
    $data['civicrm_booking']['participants_estimate']['filter']['help'] = t('Participants Estimate');
    $data['civicrm_booking']['participants_estimate']['sort']['help'] = t('Participants Estimate');

    $data['civicrm_booking']['participants_actual']['help'] = t('Participants Actual');
    $data['civicrm_booking']['participants_actual']['filter']['help'] = t('Participants Actual');
    $data['civicrm_booking']['participants_actual']['sort']['help'] = t('Participants Actual');

    $data['civicrm_booking']['discount_amount']['help'] = t('Discount Amount');
    $data['civicrm_booking']['discount_amount']['filter']['help'] = t('Discount Amount');
    $data['civicrm_booking']['discount_amount']['sort']['help'] = t('Discount Amount');

    $data['civicrm_booking']['is_deleted'] = array(
        'title' => t('Is Deleted'),
        'help' => t('Is Deleted'),
        'real field' => 'is_deleted',
        'field' => array(
            'handler' => 'views_handler_field_boolean',
            'click sortable' => TRUE,
        ),
        'argument' => array(
            'handler' => 'views_handler_argument_boolean',
            'name field' => 'is_deleted',
            'numeric' => FALSE
        ),
        'filter' => array(
            'handler' => 'views_handler_filter_boolean',
            'help' => t('Filter on CiviCRM Booking Is Deleted field.'),
        ),
        'sort' => array(
            'handler' => 'views_handler_sort',
            'help' => t('Sort on CiviCRM Booking Is Deleted field.'),
        ),
    );

    $data['civicrm_booking']['created_by']['help'] = t('Created By');
    $data['civicrm_booking']['created_by']['filter']['help'] = t('Created By');
    $data['civicrm_booking']['created_by']['sort']['help'] = t('Created By');

    $data['civicrm_booking']['created_date']['help'] = t('Created Date');
    $data['civicrm_booking']['created_date']['filter']['help'] = t('Created Date');
    $data['civicrm_booking']['created_date']['sort']['help'] = t('Created Date');

    $data['civicrm_booking']['updated_by']['help'] = t('Updated By');
    $data['civicrm_booking']['updated_by']['filter']['help'] = t('Updated By');
    $data['civicrm_booking']['updated_by']['sort']['help'] = t('Updated By');

    $data['civicrm_booking']['updated_date']['help'] = t('Updated Date');
    $data['civicrm_booking']['updated_date']['filter']['help'] = t('Updated Date');
    $data['civicrm_booking']['updated_date']['sort']['help'] = t('Updated Date');

    //Create relationship by joining to CiviCRM Contacts
    $data['civicrm_booking']['primary_contact_id'] = array(
        'title' => t('Primary Contact ID'),
        'help' => t('Primary Contact ID'),
        'real field' => 'primary_contact_id',
        'field' => array(
            'handler' => 'views_handler_field_numeric',
            'click sortable' => TRUE,
        ),
        'argument' => array(
            'handler' => 'views_handler_argument_numeric',
            'name field' => 'primary_contact_id',
            'numeric' => FALSE
        ),
        'filter' => array(
            'handler' => 'views_handler_filter_numeric',
            'help' => t('Filter on CiviCRM Booking Primary Contact ID field.'),
        ),
        'sort' => array(
            'handler' => 'views_handler_sort',
            'help' => t('Sort on CiviCRM Booking Primary Contact ID field.'),
        ),
        'relationship' => array(
            'handler' => 'views_handler_relationship',
            'base' => 'civicrm_contact',
            'base field' => 'id',
            'title' => t('CiviCRM Booking Primary Contact'),
            'label' => t('civicrm primary contact join'),
        ),
    );

    $data['civicrm_booking']['secondary_contact_id'] = array(
        'title' => t('Secondary Contact ID'),
        'help' => t('Secondary Contact ID'),
        'real field' => 'secondary_contact_id',
        'field' => array(
            'handler' => 'views_handler_field_numeric',
            'click sortable' => TRUE,
        ),
        'argument' => array(
            'handler' => 'views_handler_argument_numeric',
            'name field' => 'secondary_contact_id',
            'numeric' => FALSE
        ),
        'filter' => array(
            'handler' => 'views_handler_filter_numeric',
            'help' => t('Filter on CiviCRM Booking Secondary Contact ID field.'),
        ),
        'sort' => array(
            'handler' => 'views_handler_sort',
            'help' => t('Sort on CiviCRM Booking Secondary Contact ID field.'),
        ),
        'relationship' => array(
            'handler' => 'views_handler_relationship',
            'base' => 'civicrm_contact',
            'base field' => 'id',
            'title' => t('CiviCRM Booking Secondary Contact'),
            'label' => t('civicrm secondary contact join'),
        ),
    );
}


/**
 * @file
 *
 * Creates calendar displays of Views results.
 */
/**
 * Implementation of hook_views_plugins
 */
function civibooking_calendar_views_plugins() {
    $views_path = drupal_get_path('module', 'views');
    $module_path = drupal_get_path('module', 'calendar');
    $theme_path = $module_path;
    module_load_include('inc', 'calendar', 'theme/theme');

    // Limit these plugins to base tables that represent entities.
    $base = array_keys(date_views_base_tables());

    $data = array(
        'module' => 'calendar', // This just tells our themes are elsewhere.

        'style' => array(
            'calendar_style' => array(
                'title' => t('Calendar'),
                'help' => t('Present view results as a Calendar.'),
                'handler' => 'civibooking_calendar_plugin_style',
                'path' => "$module_path/includes",
                'theme' => 'calendar_style',
                'theme file' => 'theme.inc',
                'theme path' => "$module_path/theme",
                'additional themes' => array(
                    'calendar_mini' => 'style',
                    'calendar_day' => 'style',
                    'calendar_week' => 'style',
                    'calendar_month' => 'style',
                    'calendar_year' => 'style',
                    'calendar_day_overlap' => 'style',
                    'calendar_week_overlap' => 'style',
                ),
                'uses fields' => TRUE,
                'uses grouping' => FALSE,
                'uses row plugin' => TRUE,
                'uses options' => TRUE,
                'type' => 'normal',
                'even empty' => TRUE,
                'base' => $base,
            ),
        ),
        'row' => array(
            'calendar_node' => array(
                'title' => t('Calendar Items (DEPRECATED, switch to Calendar Entities)'),
                'help' => t('Displays each selected node as a Calendar item.'),
                'handler' => 'calendar_plugin_row_node',
                'path' => "$module_path/includes",
                'base' => array('node'), // only works with 'node' as base.
                'uses options' => TRUE,
                'uses fields' => TRUE,
                'type' => 'normal',
                'no ui' => TRUE,
            ),
            'calendar_entity' => array(
                'title' => t('Calendar Entities'),
                'help' => t('Displays each selected entity as a Calendar item.'),
                'handler' => 'civibooking_calendar_plugin_row',
                'theme' => 'views_view_fields',
                'path' => "$module_path/includes",
                'base' => $base,
                'uses options' => TRUE,
                'uses fields' => TRUE,
                'type' => 'normal',
            ),
        ),
    );
    return $data;
}

function civibooking_calendar_views_query_alter(&$view, &$query) {
  // implement this only if the view is for civicrm_booking/civicrm_booking_slot and calendar output is used
  if($view->base_table == 'civicrm_booking' && $view->plugin_name == 'calendar_style') {
    $queryString = preg_replace('/start_date/', 'end_date', $query->where['date']['conditions'][0]['field'], 1);
    $query->where['date']['conditions'][0]['field'] = $queryString;
  } else if ($view->base_table == 'civicrm_booking_slot' && $view->plugin_name == 'calendar_style') {
    $queryString = preg_replace('/start/', 'end', $query->where['date']['conditions'][0]['field'], 1);
    $query->where['date']['conditions'][0]['field'] = $queryString;
  }
}

function civibooking_calendar_views_pre_render(&$view) {
  if($view->base_table == 'civicrm_booking') {
    $results = $view->result;

    foreach($results as $key => $result) {
      if(isset($result->civicrm_booking_status_id)) {
        $bookingStatusMap = get_status_values();
        $statusId = $result->civicrm_booking_status_id;
        $results[$key]->civicrm_booking_status_id = $bookingStatusMap[$statusId];
      }
    }
    $view->result = $results;
  }
}
