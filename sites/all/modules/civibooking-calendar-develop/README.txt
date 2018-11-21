Civibooking_calendar is a drupal module that displays CiviBooking data on views calendar.

Dependencies:
- civicrm
- civicrm_entity (version >= 7.x-2.x-dev) Download link: https://github.com/eileenmcnaughton/civicrm_entity
- date
- views
- calendar
- entity

Installation:
- Place the module under <site-root>/sites/all/modules or <site-root>/sites/all/modules/config
- Enable it from drupal modules listing page.

To display bookings on Calendar:
   1. Go to "mysitename/admin/structure/views" and select "Add new from template"
   2. Search for 'start_date' field in the 'civicrm_booking' base table and click add.

To display resources on Calendar:
   1. Go to "mysitename/admin/structure/views" and select "Add new from template"
   2. Search for 'start' field in the 'civicrm_booking_slot' base table and click add.
