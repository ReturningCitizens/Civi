<?php

require_once 'collapsecommsanddemographics.civix.php';

use CRM_Collapsecommsanddemographics_ExtensionUtil as E;

/**
 * Implements hook_civicrm_config().
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_config
 */
function collapsecommsanddemographics_civicrm_config(&$config)
{
    _collapsecommsanddemographics_civix_civicrm_config($config);
}

/**
 * Implements hook_civicrm_xmlMenu().
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_xmlMenu
 */
function collapsecommsanddemographics_civicrm_xmlMenu(&$files)
{
    _collapsecommsanddemographics_civix_civicrm_xmlMenu($files);
}

/**
 * Implements hook_civicrm_install().
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_install
 */
function collapsecommsanddemographics_civicrm_install()
{
    _collapsecommsanddemographics_civix_civicrm_install();
}

/**
 * Implements hook_civicrm_postInstall().
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_postInstall
 */
function collapsecommsanddemographics_civicrm_postInstall()
{
    _collapsecommsanddemographics_civix_civicrm_postInstall();
}

/**
 * Implements hook_civicrm_uninstall().
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_uninstall
 */
function collapsecommsanddemographics_civicrm_uninstall()
{
    _collapsecommsanddemographics_civix_civicrm_uninstall();
}

/**
 * Implements hook_civicrm_enable().
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_enable
 */
function collapsecommsanddemographics_civicrm_enable()
{
    _collapsecommsanddemographics_civix_civicrm_enable();
}

/**
 * Implements hook_civicrm_disable().
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_disable
 */
function collapsecommsanddemographics_civicrm_disable()
{
    _collapsecommsanddemographics_civix_civicrm_disable();
}

/**
 * Implements hook_civicrm_upgrade().
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_upgrade
 */
function collapsecommsanddemographics_civicrm_upgrade($op, CRM_Queue_Queue $queue = NULL)
{
    return _collapsecommsanddemographics_civix_civicrm_upgrade($op, $queue);
}

/**
 * Implements hook_civicrm_managed().
 *
 * Generate a list of entities to create/deactivate/delete when this module
 * is installed, disabled, uninstalled.
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_managed
 */
function collapsecommsanddemographics_civicrm_managed(&$entities)
{
    _collapsecommsanddemographics_civix_civicrm_managed($entities);
}

/**
 * Implements hook_civicrm_caseTypes().
 *
 * Generate a list of case-types.
 *
 * Note: This hook only runs in CiviCRM 4.4+.
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_caseTypes
 */
function collapsecommsanddemographics_civicrm_caseTypes(&$caseTypes)
{
    _collapsecommsanddemographics_civix_civicrm_caseTypes($caseTypes);
}

/**
 * Implements hook_civicrm_angularModules().
 *
 * Generate a list of Angular modules.
 *
 * Note: This hook only runs in CiviCRM 4.5+. It may
 * use features only available in v4.6+.
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_angularModules
 */
function collapsecommsanddemographics_civicrm_angularModules(&$angularModules)
{
    _collapsecommsanddemographics_civix_civicrm_angularModules($angularModules);
}

/**
 * Implements hook_civicrm_alterSettingsFolders().
 *
 * @link http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_alterSettingsFolders
 */
function collapsecommsanddemographics_civicrm_alterSettingsFolders(&$metaDataFolders = NULL)
{
    _collapsecommsanddemographics_civix_civicrm_alterSettingsFolders($metaDataFolders);
}

function collapsecommsanddemographics_civicrm_pageRun(&$page)
{
    $pageName = $page->getVar('_name');
    $pageAction = $page->getVar('_action');
    if ($pageName == 'CRM_Contact_Page_View_Summary' && ($pageAction == CRM_Core_Action::BROWSE || $pageAction == CRM_Core_Action::VIEW)) {
        CRM_Core_Region::instance('contact-comm-pref')->update('default', array(
            'disabled' => TRUE,
        ));
        CRM_Core_Region::instance('contact-comm-pref')->add(array(
            'template' => 'CRM/Collapsecommsanddemographics/Page/CollapseComms.tpl',
        ));

        CRM_Core_Region::instance('contact-demographic')->update('default', array(
            'disabled' => TRUE,
        ));
        CRM_Core_Region::instance('contact-demographic')->add(array(
            'template' => 'CRM/Collapsecommsanddemographics/Page/CollapseDemographics.tpl',
        ));
        CRM_Core_Resources::singleton()->addStyle('.collapsedcommsanddemos { margin-bottom: 10px; }');

        // get privacy options
        $privacy_options = CRM_Core_SelectValues::privacy();
        $page->assign('ccnd_privacy_options', $privacy_options);

        $is_deceased = $page->get_template_vars('is_deceased');
        if (!$is_deceased) {
            $birthdate = $page->get_template_vars('birth_date');
            if (!empty($birthdate)) {
                $age = CRM_Utils_Date::calculateAge($birthdate);
                $ageStr = '';
                if (!empty($age['years'])) $ageStr .= $age['years'];
                else if (!empty($age['months'])) $ageStr .= ' ' . $age['months'];
                $page->assign('ccnd_show_age', $ageStr);
            }
        }

        // gender options
        $gender_value = $page->get_template_vars('gender_display');
        if (!empty($gender_value)) {
            $page->assign('ccnd_show_gender_icon', $gender_value);
        }
        // add gender options regardless of gender value to support jquery in inline editing
        $genderOptions = array();
        $gender = CRM_Core_PseudoConstant::get('CRM_Contact_DAO_Contact', 'gender_id');
        foreach ($gender as $key => $var) {
            // assumes option value 1 and 2 will be male and female
            if ($key == 2 || strtolower($var) == 'male') {
                $genderOptions[2] = $var;
            } else if ($key == 1 || strtolower($var) == 'female') {
                $genderOptions[1] = $var;
            }
        }
        $page->assign('ccnd_gender_options', $genderOptions);

    }
}


/**
 * Implements hook_civicrm_contactSummaryBlocks().
 *
 * @link https://github.com/civicrm/org.civicrm.contactlayout
 */
function collapsecommsanddemographics_civicrm_contactSummaryBlocks(&$blocks)
{
    // change tpl files
    foreach ($blocks['core']['blocks'] as $key => &$block) {
        if ($key == 'Demographics')
            $block['tpl_file'] = 'CRM/Collapsecommsanddemographics/Page/CollapseDemographics.tpl';
        else if ($key == 'CommunicationPreferences')
            $block['tpl_file'] = 'CRM/Collapsecommsanddemographics/Page/CollapseComms.tpl';

    }
}