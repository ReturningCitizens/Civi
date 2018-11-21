<?php

/**
 * Class civibooking_calendar_date_views_argument_handler overwrites date_views_argument_handler to
 * filter date as a DATETIME field
 */
class civibooking_calendar_date_views_argument_handler extends date_views_argument_handler {

    function init(&$view, &$options) {
        parent::init($view, $options);
    }

    function get_query_fields() {
        $fields = date_views_fields($this->base_table);
        $fields = $fields['name'];
        $this->query_fields = array();
        foreach ((array) $this->options['date_fields'] as $delta => $name) {
            if (array_key_exists($name, $fields) && $field = $fields[$name]) {
                $date_handler = new date_sql_handler(DATE_FORMAT_DATETIME, date_default_timezone());
                $date_handler->granularity = $this->options['granularity'];
                $date_handler->db_timezone = date_get_timezone_db($field['tz_handling']);
                $date_handler->local_timezone = date_get_timezone($field['tz_handling']);
                $this->query_fields[] = array('field' => $field, 'date_handler' => $date_handler);
            }
        }
    }
}