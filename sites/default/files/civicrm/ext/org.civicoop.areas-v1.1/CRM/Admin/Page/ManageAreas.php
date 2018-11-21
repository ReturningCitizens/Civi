<?php
use CRM_Areas_ExtensionUtil as E;

class CRM_Admin_Page_ManageAreas extends CRM_Core_Page {

  public function run() {
  	$hook = CRM_Utils_Hook::singleton();
    $loader = new \Civi\Angular\AngularLoader();
  	
		$angularModules = array('areas');
		$hook->invoke(array('angularModules'), $angularModules,
      CRM_Core_DAO::$_nullObject, CRM_Core_DAO::$_nullObject, CRM_Core_DAO::$_nullObject, CRM_Core_DAO::$_nullObject, CRM_Core_DAO::$_nullObject,
      'civicrm_areas_angularModules'
    );
  	
  	$loader->setModules($angularModules);
  	$loader->setPageName('civicrm/admin/areas');
		\Civi::resources()->addSetting(array(
      'crmApp' => array(
        'defaultRoute' => 'areas',
      ),
    ));
		
		
  	$loader->load();  	
  	parent::run();
  }

}
