<?php
use CRM_Areas_ExtensionUtil as E;

/**
 * Collection of upgrade steps.
 */
class CRM_Areas_Upgrader extends CRM_Areas_Upgrader_Base {

  public function install() {
    $this->executeSqlFile('sql/install.sql');
  }

  public function uninstall() {
   $this->executeSqlFile('sql/uninstall.sql');
  }

}
