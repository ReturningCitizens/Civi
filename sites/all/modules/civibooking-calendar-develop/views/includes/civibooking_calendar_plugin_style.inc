<?php

class civibooking_calendar_plugin_style extends calendar_plugin_style {
  
  function init(&$view, &$display, $options = NULL) {
    parent::init($view, $display, $options);
  }
  
  /**
   * Build the contents of a single day for the $rows results.
   */
  function calendar_build_week_day($wday, &$multiday_buckets, &$singleday_buckets) {
    $curday_date = date_format($this->curday, DATE_FORMAT_DATE);
    $max_events = $this->date_info->calendar_type == 'month' && !empty($this->date_info->style_max_items) ? $this->date_info->style_max_items : 0;
    $hide = !empty($this->date_info->style_max_items_behavior) ? ($this->date_info->style_max_items_behavior == 'hide') : FALSE;
    $multiday_theme = !empty($this->date_info->style_multiday_theme) && $this->date_info->style_multiday_theme == '1';
    $first_day = variable_get('date_first_day', 0);
    $cur_cnt = 0;
    $total_cnt = 0;
    $ids = array();

    // If we are hiding, count before processing further
    if ($max_events != CALENDAR_SHOW_ALL) {
      foreach ($this->items as $date => $day) {
        if ($date == $curday_date) {
          foreach ($day as $time => $hour) {
            foreach ($hour as $key => $item) {
              $total_cnt++;
              $ids[] = $item->date_id;
            }
          }
        }
      }
    }

    // If we haven't already exceeded the max or we'll showing all, then process the items
    if ($max_events == CALENDAR_SHOW_ALL || !$hide || $total_cnt < $max_events) {
      // Count currently filled items
      foreach ($multiday_buckets[$wday] as $bucket) {
        if (!$bucket['avail']) {
          $cur_cnt++;
        }
      }
      foreach ($this->items as $date => $day) {
        if ($date == $curday_date) {
          ksort($day);
          foreach ($day as $time => $hour) {
            foreach ($hour as $key => $item) {
              $all_day = $item->calendar_all_day;

              // Parse out date part
              $start_ydate = date_format($item->date_start, DATE_FORMAT_DATE);
              $end_ydate = date_format($item->date_end, DATE_FORMAT_DATE);
              $cur_ydate = date_format($this->curday, DATE_FORMAT_DATE);

              $is_multi_day = ($start_ydate < $cur_ydate || $end_ydate > $cur_ydate);

              // Does this event span multi-days?
              if ($multiday_theme && ($is_multi_day || $all_day)) {

                // Remove multiday items from the total count. We can't hide them or they will break.
                $total_cnt--;

                // If this the first day of the week, or is the start date of the multi-day event,
                // then record this item, otherwise skip over
                $day_no = date_format($this->curday, 'd');
                if ($wday == 0 || $start_ydate == $cur_ydate || ($this->date_info->granularity == 'month' && $day_no == 1) || ($all_day && !$is_multi_day)) {
                  // Calculate the colspan for this event

                  // If the last day of this event exceeds the end of the current month or week,
                  // truncate the remaining days
                  $diff =  $this->curday->difference($this->date_info->max_date, 'days');
                  //echo $wday;
                  //echo $diff;
                  $remaining_days = ($this->date_info->granularity == 'month') ? min(6 - $wday, $diff) : $diff;

                  // The bucket_cnt defines the colspan.  colspan = bucket_cnt + 1
                  $days = $this->curday->difference($item->date_end, 'days');
                  $bucket_cnt = max(0, min($days, $remaining_days));

                  // See if there is an available slot to add an event.  This will allow
                  // an event to precede a row filled up by a previous day event
                  $avail = FALSE;
                  $bucket_index = count($multiday_buckets[$wday]);

                  for ($i = 0; $i < $bucket_index; $i++) {
                    if ($multiday_buckets[$wday][$i]['avail']) {
                      $bucket_index = $i;
                      break;
                    }
                  }

                  // Add continuation attributes
                  $item->continuation =  ($item->date_start < $this->curday);
                  $item->continues = ( $days > $bucket_cnt );
                  $item->is_multi_day = TRUE;

                  // Assign the item to the available bucket
                  $multiday_buckets[$wday][$bucket_index] = array(
                    'colspan' => $bucket_cnt + 1,
                    'rowspan' => 1,
                    'filled' => TRUE,
                    'avail' => FALSE,
                    'all_day' => $all_day,
                    'item' => $item,
                    'wday' => $wday,
                    'entry' => theme('calendar_item', array('view' => $this->view, 'rendered_fields' => $item->rendered_fields, 'item' => $item)),
                  );

                  // Block out empty buckets for the next days in this event for this week
                  for ($i = 0; $i < $bucket_cnt; $i++) {
                    $bucket = &$multiday_buckets[$i + $wday + 1];
                    $bucket_row_count = count($bucket);
                    $row_diff = $bucket_index - $bucket_row_count;

                    // Fill up the preceding buckets - these are available for future
                    // events
                    for ( $j = 0; $j < $row_diff; $j++) {
                      $bucket[($bucket_row_count + $j) ] = array(
                        'entry' => '&nbsp;',
                        'colspan' => 1,
                        'rowspan' => 1,
                        'filled' => TRUE,
                        'avail' => TRUE,
                        'wday' => $wday,
                        'item' => NULL
                      );
                    }
                    $bucket[$bucket_index] = array(
                      'filled' => FALSE,
                      'avail' => FALSE
                    );
                  }
                }
              }
              elseif ($max_events == CALENDAR_SHOW_ALL || $cur_cnt < $max_events) {
                $cur_cnt++;
                // Assign to single day bucket
                $singleday_buckets[$wday][$time][] = array(
                  'entry' => theme('calendar_item', array('view' => $this->view, 'rendered_fields' => $item->rendered_fields, 'item' => $item)),
                  'item' => $item,
                  'colspan' => 1,
                  'rowspan' => 1,
                  'filled' => TRUE,
                  'avail' => FALSE,
                  'wday' => $wday,
                );
              }

            }
          }
        }
      }
    }

    // Add a more link if necessary
    if ($max_events != CALENDAR_SHOW_ALL && $total_cnt > 0 && $cur_cnt < $total_cnt) {
      $entry = theme('calendar_' . $this->date_info->calendar_type . '_multiple_entity', array(
          'curday' => $curday_date,
          'count' => $total_cnt,
          'view' => $this->view,
          'ids' => $ids,
        ));
      if (!empty($entry)) {
        $singleday_buckets[$wday][][] = array(
          'entry' => $entry,
          'more_link' => TRUE,
          'item' => NULL
        );
      }
    }
  }
}
