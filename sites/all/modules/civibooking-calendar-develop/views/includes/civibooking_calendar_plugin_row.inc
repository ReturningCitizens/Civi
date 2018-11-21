<?php

class civibooking_calendar_plugin_row extends calendar_plugin_row {

  function init(&$view, &$display, $options = NULL) {
    parent::init($view, $display, $options);
  }

  function explode_values($event)
  {
    if($event->type == 'civicrm_booking_slot') {
        if(isset($event->row->civicrm_booking_slot_start) && isset($event->row->civicrm_booking_slot_end)) {
            $end_date = date('Y-m-d H:i:s', $event->row->civicrm_booking_slot_end);
            $start_date = date('Y-m-d H:i:s', $event->row->civicrm_booking_slot_start);
        }
    } else if ($event->type == 'civicrm_booking') {
        if(isset($event->row->civicrm_booking_end_date) && isset($event->row->civicrm_booking_start_date)) {
          $end_date = date('Y-m-d H:i:s', $event->row->civicrm_booking_end_date);
          $start_date = date('Y-m-d H:i:s', $event->row->civicrm_booking_start_date);
        }
    }

    if(isset($end_date) && isset($start_date)){
      $rows = array();
      $date_info = $this->date_argument->view->date_info;
      $event->date_end = new DateObject($end_date);
      $event->date_start = new DateObject($start_date);
      $item_start_date = $event->date_start;
      $item_end_date = $event->date_end;
      $to_zone = $event->to_zone;
      $db_tz = $event->db_tz;
      $granularity = $event->granularity;
      $increment = $event->increment;

      // Now that we have an 'entity' for each view result, we need
      // to remove anything outside the view date range,
      // and possibly create additional nodes so that we have a 'node'
      // for each day that this item occupies in this view.
      $now = max($date_info->min_zone_string, $item_start_date->format(DATE_FORMAT_DATE));
      $to  = min($date_info->max_zone_string, $item_end_date->format(DATE_FORMAT_DATE));
      $next = new DateObject($now . ' 00:00:00', $date_info->display_timezone);
      if ($date_info->display_timezone_name != $to_zone) {
        // Make $start and $end (derived from $node) use the timezone $to_zone, just as the original dates do.
        date_timezone_set($next, timezone_open($to_zone));
      }
      if (empty($to) || $now > $to) {
        $to = $now;
      }
      // $now and $next are midnight (in display timezone) on the first day where node will occur.
      // $to is midnight on the last day where node will occur.
      // All three were limited by the min-max date range of the view.
      $pos = 0;
      while (!empty($now) && $now <= $to) {
        $entity = clone($event);

        // Get start and end of current day.
        $start = $next->format(DATE_FORMAT_DATETIME);
        date_modify($next, '+1 day');
        date_modify($next, '-1 second');
        $end = $next->format(DATE_FORMAT_DATETIME);

        // Get start and end of item, formatted the same way.
        $item_start = $item_start_date->format(DATE_FORMAT_DATETIME);
        $item_end = $item_end_date->format(DATE_FORMAT_DATETIME);

        // Get intersection of current day and the node value's duration (as strings in $to_zone timezone).
        $entity->calendar_start = $item_start < $start ? $start : $item_start;
        $entity->calendar_end = !empty($item_end) ? ($item_end > $end ? $end : $item_end) : $node->calendar_start;

        // Make date objects
        $entity->calendar_start_date = date_create($entity->calendar_start, timezone_open($to_zone));
        $entity->calendar_end_date = date_create($entity->calendar_end, timezone_open($to_zone));

        // Change string timezones into
        // calendar_start and calendar_end are UTC dates as formatted strings
        $entity->calendar_start = date_format($entity->calendar_start_date, DATE_FORMAT_DATETIME);
        $entity->calendar_end = date_format($entity->calendar_end_date, DATE_FORMAT_DATETIME);
        $entity->calendar_all_day = date_is_all_day($entity->calendar_start, $entity->calendar_end, $granularity, $increment);

        unset($entity->calendar_fields);
        if (isset($entity) && (empty($entity->calendar_start))) {
          // if no date for the node and no date in the item
          // there is no way to display it on the calendar
          unset($entity);
        }
        else {
          $entity->date_id .= '.' . $pos;

          $rows[] = $entity;
          unset($entity);
        }
        date_modify($next, '+1 second');
        $now = date_format($next, DATE_FORMAT_DATE);
        $pos++;

      }

      // Fix for PCBK-265
      if($this->view->style_options['calendar_type'] == 'day') {
        foreach($rows as $k => $v) {
          $rows[$k]->date_start = new DateObject($v->calendar_start);
          $rows[$k]->date_end = new DateObject($v->calendar_end);
        }
      }
      return $rows;
    }
    else
    {
      drupal_set_message("You need to add CiviCRM Booking: Start Date and CiviCRM Booking: End Date fields", "error");
    }
  }

  function render($row) {
    global $base_url;
    $rows = array();
    $date_info = $this->date_argument->view->date_info;
    $id = $row->{$this->field_alias};

    if (!is_numeric($id)) {
      return $rows;
    }

    // There could be more than one date field in a view
    // so iterate through all of them to find the right values
    // for this view result.
    foreach ($this->date_fields as $field_name => $info) {

      // Load the specified node:
      // We have to clone this or nodes on other views on this page,
      // like an Upcoming block on the same page as a calendar view,
      // will end up acquiring the values we set here.
      $entity = clone($this->entities[$id]);

      if (empty($entity)) {
        return $rows;
      }

      $table_name  = $info['table_name'];
      $delta_field = $info['delta_field'];
      $tz_handling = $info['tz_handling'];
      $tz_field    = $info['timezone_field'];
      $rrule_field = $info['rrule_field'];
      $is_field    = $info['is_field'];

      $info = entity_get_info($this->entity_type);
      $this->id_field = $info['entity keys']['id'];
      $this->id = $entity->{$this->id_field};
      $this->type = !empty($info['entity keys']['bundle']) ? $info['entity keys']['bundle'] : $this->entity_type;
      $this->title = entity_label($this->entity_type, $entity);
      $uri = entity_uri($this->entity_type, $entity);
      $uri['options']['absolute'] = TRUE;

      // Retrieve the field value(s) that matched our query from the cached node.
      // Find the date and set it to the right timezone.

      $entity->date_id = array();
      $item_start_date = NULL;
      $item_end_date   = NULL;
      $granularity = 'second';
      $increment = 1;
      if ($is_field) {

        // Set the date_id for the node, used to identify which field value to display for
        // fields that have multiple values. The theme expects it to be an array.
        $date_id = 'date_id_' . $field_name;
        $date_delta = 'date_delta_' . $field_name;
        if (isset($row->$date_id)) {
          $delta = $row->$date_delta;
          $entity->date_id = array('calendar.' . $row->$date_id . '.' . $field_name. '.' . $delta);
          $delta_field = $date_delta;
        }
        else {
          $delta = isset($row->$delta_field) ? $row->$delta_field : 0;
          $entity->date_id = array('calendar.' . $id . '.' . $field_name . '.' . $delta);
        }

        $items = field_get_items($this->entity_type, $entity, $field_name, $this->language);
        $item  = $items[$delta];
        $db_tz   = date_get_timezone_db($tz_handling, isset($item->$tz_field) ? $item->$tz_field : $date_info->display_timezone_name);
        $to_zone = date_get_timezone($tz_handling, isset($item->$tz_field) ? $item->$tz_field : $date_info->display_timezone_name);
        if (isset($item['value'])) {
          $item_start_date = new dateObject($item['value'], $db_tz);
          $item_end_date   = array_key_exists('value2', $item) ? new dateObject($item['value2'], $db_tz) : $item_start_date;
        }

        $cck_field = field_info_field($field_name);
        $instance = field_info_instance($this->entity_type, $field_name, $this->type);
        $granularity = date_granularity_precision($cck_field['settings']['granularity']);
        $increment = $instance['widget']['settings']['increment'];

      }
      elseif (!empty($entity->$field_name)) {
        $item = $entity->$field_name;
        $db_tz   = date_get_timezone_db($tz_handling, isset($item->$tz_field) ? $item->$tz_field : $date_info->display_timezone_name);
        $to_zone = date_get_timezone($tz_handling, isset($item->$tz_field) ? $item->$tz_field : $date_info->display_timezone_name);
        $item_start_date = new dateObject($item, $db_tz);
        $item_end_date   = $item_start_date;
        $entity->date_id = array('calendar.' . $id . '.' . $field_name . '.0');
      }

      // If we don't have a date value, go no further.
      if (empty($item_start_date)) {
        continue;
      }

      // Set the item date to the proper display timezone;
      $item_start_date->setTimezone(new dateTimezone($to_zone));
      $item_end_date->setTimezone(new dateTimezone($to_zone));

      $event = new stdClass();
      $event->id = $this->id;
      $event->title = $this->title;
      $event->type = $this->type;
      $event->date_start = $item_start_date;
      $event->date_end = $item_end_date;
      $event->db_tz = $db_tz;
      $event->to_zone = $to_zone;
      $event->granularity = $granularity;
      $event->increment = $increment;
      $event->field = $is_field ? $item : NULL;
      $event->row = $row;
      $event->entity = $entity;
      $event->stripe = array();
      $event->stripe_label = array();

      // All calendar row plugins should provide a date_id that the theme can use.
      $event->date_id = $entity->date_id[0];

      // We are working with an array of partially rendered items
      // as we process the calendar, so we can group and organize them.
      // At the end of our processing we'll need to swap in the fully formatted
      // display of the row. We save it here and switch it in
      // template_preprocess_calendar_item().
      $event->rendered = theme($this->theme_functions(),
      array(
        'view' => $this->view,
        'options' => $this->options,
        'row' => $row,
        'field_alias' => isset($this->field_alias) ? $this->field_alias : '',
      ));

      $entities = $this->explode_values($event);
      foreach ($entities as $entity) {
        switch ($this->options['colors']['legend']) {
          case 'type':
            $this->calendar_node_type_stripe($entity);
            break;
          case 'taxonomy':
            $this->calendar_taxonomy_stripe($entity);
            break;
          case 'group':
            $this->calendar_group_stripe($entity);
            break;
        }
        $rows[] = $entity;
      }

    }

    return $rows;
  }
}
