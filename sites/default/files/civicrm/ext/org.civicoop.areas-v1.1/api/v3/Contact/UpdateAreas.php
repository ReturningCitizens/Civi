<?php
use CRM_Areas_ExtensionUtil as E;

/**
 * Contact.UpdateAreas API specification (optional)
 * This is used for documentation and validation.
 *
 * @param array $spec description of fields supported by this API call
 * @return void
 * @see http://wiki.civicrm.org/confluence/display/CRMDOC/API+Architecture+Standards
 */
function _civicrm_api3_contact_Update_areas_spec(&$spec) {
  
}

/**
 * Contact.UpdateAreas API
 *
 * @param array $params
 * @return array API result descriptor
 * @see civicrm_api3_create_success
 * @see civicrm_api3_create_error
 * @throws API_Exception
 */
function civicrm_api3_contact_Update_areas($params) {
  set_time_limit(0);
  
  $sql = "
    SELECT civicrm_address.* 
    FROM civicrm_address
    INNER JOIN civicrm_contact ON civicrm_address.contact_id = civicrm_contact.id AND civicrm_address.is_primary = '1'
    WHERE civicrm_contact.is_deleted = '0' 
    AND civicrm_contact.is_deceased = '0'
    ORDER BY civicrm_contact.id
  ";
  
  $dao = CRM_Core_DAO::executeQuery($sql, array(), true, 'CRM_Core_DAO_Address');
  $count = 0;
  while ($dao->fetch()) {
    CRM_Areas_AddressProcessor::updateAreasFromAddressObject($dao);
    $count ++;    
  }

  return array(
    'count' => $count,
    'message' => E::ts('Updated %1 contacts', array(1=>$count)),
  );
}
