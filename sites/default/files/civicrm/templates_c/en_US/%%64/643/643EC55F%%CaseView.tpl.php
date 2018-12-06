<?php /* Smarty version 2.6.30, created on 2018-12-03 10:25:57
         compiled from CRM/Case/Form/CaseView.tpl */ ?>
<?php require_once(SMARTY_CORE_DIR . 'core.load_plugins.php');
smarty_core_load_plugins(array('plugins' => array(array('block', 'crmScope', 'CRM/Case/Form/CaseView.tpl', 1, false),array('block', 'ts', 'CRM/Case/Form/CaseView.tpl', 36, false),array('block', 'crmButton', 'CRM/Case/Form/CaseView.tpl', 208, false),array('function', 'crmURL', 'CRM/Case/Form/CaseView.tpl', 43, false),array('function', 'crmKey', 'CRM/Case/Form/CaseView.tpl', 45, false),array('modifier', 'crmDate', 'CRM/Case/Form/CaseView.tpl', 72, false),array('modifier', 'colorContrast', 'CRM/Case/Form/CaseView.tpl', 282, false),array('modifier', 'implode', 'CRM/Case/Form/CaseView.tpl', 292, false),)), $this); ?>
<?php $this->_tag_stack[] = array('crmScope', array('extensionKey' => "")); $_block_repeat=true;smarty_block_crmScope($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>
<div class="crm-block crm-form-block crm-case-caseview-form-block">

    <?php if ($this->_tpl_vars['showRelatedCases']): ?>
    <?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "CRM/Case/Form/ViewRelatedCases.tpl", 'smarty_include_vars' => array()));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?>
    <?php else: ?>

  <h3><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Summary<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></h3>
  <table class="report crm-entity case-summary" data-entity="case" data-id="<?php echo $this->_tpl_vars['caseID']; ?>
" data-cid="<?php echo $this->_tpl_vars['contactID']; ?>
">
    <?php if ($this->_tpl_vars['multiClient']): ?>
      <tr class="crm-case-caseview-client">
        <td colspan="5" class="label">
          <?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Clients:<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>
          <?php $_from = $this->_tpl_vars['caseRoles']['client']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }$this->_foreach['clients'] = array('total' => count($_from), 'iteration' => 0);
if ($this->_foreach['clients']['total'] > 0):
    foreach ($_from as $this->_tpl_vars['client']):
        $this->_foreach['clients']['iteration']++;
?>
            <a href="<?php echo CRM_Utils_System::crmURL(array('p' => 'civicrm/contact/view','q' => "action=view&reset=1&cid=".($this->_tpl_vars['client']['contact_id'])), $this);?>
" title="<?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>View contact record<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>"><?php echo $this->_tpl_vars['client']['display_name']; ?>
</a><?php if (! ($this->_foreach['clients']['iteration'] == $this->_foreach['clients']['total'])): ?>, &nbsp; <?php endif; ?>
          <?php endforeach; endif; unset($_from); ?>
          <a href="#addClientDialog" class="crm-hover-button case-miniform" title="<?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Add Client<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>" data-key="<?php echo smarty_function_crmKey(array('name' => 'civicrm/case/ajax/addclient'), $this);?>
">
            <i class="crm-i fa-user-plus"></i>
          </a>
          <div id="addClientDialog" class="hiddenElement">
            <input name="add_client_id" placeholder="<?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>- select contact -<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>" class="huge" data-api-params='{"params": {"contact_type": "<?php echo $this->_tpl_vars['contactType']; ?>
"}}' />
          </div>
          <?php if ($this->_tpl_vars['hasRelatedCases']): ?>
            <div class="crm-block relatedCases-link"><a class="crm-hover-button crm-popup medium-popup" href="<?php echo $this->_tpl_vars['relatedCaseUrl']; ?>
"><?php echo $this->_tpl_vars['relatedCaseLabel']; ?>
</a></div>
          <?php endif; ?>
        </td>
      </tr>
    <?php endif; ?>
    <tr>
      <?php if (! $this->_tpl_vars['multiClient']): ?>
        <td>
          <table class="form-layout-compressed">
            <?php $_from = $this->_tpl_vars['caseRoles']['client']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['client']):
?>
              <tr class="crm-case-caseview-display_name">
                <td class="label-left bold" style="padding: 0px; border: none;"><?php echo $this->_tpl_vars['client']['display_name']; ?>
</td>
              </tr>
              <?php if ($this->_tpl_vars['client']['phone']): ?>
                <tr class="crm-case-caseview-phone">
                  <td class="label-left description" style="padding: 1px"><?php echo $this->_tpl_vars['client']['phone']; ?>
</td>
                </tr>
              <?php endif; ?>
              <?php if ($this->_tpl_vars['client']['birth_date']): ?>
                <tr class="crm-case-caseview-birth_date">
                  <td class="label-left description" style="padding: 1px"><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>DOB<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>: <?php echo ((is_array($_tmp=$this->_tpl_vars['client']['birth_date'])) ? $this->_run_mod_handler('crmDate', true, $_tmp) : smarty_modifier_crmDate($_tmp)); ?>
</td>
                </tr>
              <?php endif; ?>
            <?php endforeach; endif; unset($_from); ?>
          </table>
          <?php if ($this->_tpl_vars['hasRelatedCases']): ?>
            <div class="crm-block relatedCases-link"><a class="crm-hover-button crm-popup medium-popup" href="<?php echo $this->_tpl_vars['relatedCaseUrl']; ?>
"><?php echo $this->_tpl_vars['relatedCaseLabel']; ?>
</a></div>
          <?php endif; ?>
        </td>
      <?php endif; ?>
      <td class="crm-case-caseview-case_subject label">
        <span class="crm-case-summary-label"><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Subject<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>:</span>&nbsp;<span class="crm-editable" data-field="subject"><?php echo $this->_tpl_vars['caseDetails']['case_subject']; ?>
</span>
      </td>
      <td class="crm-case-caseview-case_type label">
        <span class="crm-case-summary-label"><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Type<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>:</span>&nbsp;<?php echo $this->_tpl_vars['caseDetails']['case_type']; ?>
&nbsp;<a class="crm-hover-button crm-popup"  href="<?php echo CRM_Utils_System::crmURL(array('p' => 'civicrm/case/activity','q' => "action=add&reset=1&cid=".($this->_tpl_vars['contactId'])."&caseid=".($this->_tpl_vars['caseId'])."&selectedChild=activity&atype=".($this->_tpl_vars['changeCaseTypeId'])), $this);?>
" title="<?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Change case type (creates activity record)<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>"><i class="crm-i fa-pencil"></i></a>
      </td>
      <td class="crm-case-caseview-case_status label">
        <span class="crm-case-summary-label"><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Status<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>:</span>&nbsp;<?php echo $this->_tpl_vars['caseDetails']['case_status']; ?>
&nbsp;<a class="crm-hover-button crm-popup"  href="<?php echo CRM_Utils_System::crmURL(array('p' => 'civicrm/case/activity','q' => "action=add&reset=1&cid=".($this->_tpl_vars['contactId'])."&caseid=".($this->_tpl_vars['caseId'])."&selectedChild=activity&atype=".($this->_tpl_vars['changeCaseStatusId'])), $this);?>
" title="<?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Change case status (creates activity record)<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>"><i class="crm-i fa-pencil"></i></a>
      </td>
      <td class="crm-case-caseview-case_start_date label">
        <span class="crm-case-summary-label"><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Open Date<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>:</span>&nbsp;<?php echo ((is_array($_tmp=$this->_tpl_vars['caseDetails']['case_start_date'])) ? $this->_run_mod_handler('crmDate', true, $_tmp) : smarty_modifier_crmDate($_tmp)); ?>
&nbsp;<a class="crm-hover-button crm-popup"  href="<?php echo CRM_Utils_System::crmURL(array('p' => 'civicrm/case/activity','q' => "action=add&reset=1&cid=".($this->_tpl_vars['contactId'])."&caseid=".($this->_tpl_vars['caseId'])."&selectedChild=activity&atype=".($this->_tpl_vars['changeCaseStartDateId'])), $this);?>
" title="<?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Change case start date (creates activity record)<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>"><i class="crm-i fa-pencil"></i></a>
      </td>
      <td class="crm-case-caseview-<?php echo $this->_tpl_vars['caseID']; ?>
 label">
        <span class="crm-case-summary-label"><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>ID<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>:</span>&nbsp;<?php echo $this->_tpl_vars['caseID']; ?>

      </td>
    </tr>
  </table>
  <?php if ($this->_tpl_vars['hookCaseSummary']): ?>
    <div id="caseSummary" class="crm-clearfix">
      <?php $_from = $this->_tpl_vars['hookCaseSummary']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['div_id'] => $this->_tpl_vars['val']):
?>
        <div id="<?php echo $this->_tpl_vars['div_id']; ?>
"><label><?php echo $this->_tpl_vars['val']['label']; ?>
</label><div class="value"><?php echo $this->_tpl_vars['val']['value']; ?>
</div></div>
      <?php endforeach; endif; unset($_from); ?>
    </div>
  <?php endif; ?>

  <div class="case-control-panel">
    <div>
      <p>
        <?php echo $this->_tpl_vars['form']['add_activity_type_id']['html']; ?>

        <?php if ($this->_tpl_vars['hasAccessToAllCases']): ?> &nbsp;
          <?php echo $this->_tpl_vars['form']['timeline_id']['html']; ?>
<?php echo $this->_tpl_vars['form']['_qf_CaseView_next']['html']; ?>
 &nbsp;
          <?php echo $this->_tpl_vars['form']['report_id']['html']; ?>

        <?php endif; ?>
      </p>
    </div>
    <div>
      <p>
        <?php if ($this->_tpl_vars['hasAccessToAllCases']): ?>
          <a class="crm-hover-button action-item no-popup" href="<?php echo CRM_Utils_System::crmURL(array('p' => 'civicrm/case/report/print','q' => "all=1&redact=0&cid=".($this->_tpl_vars['contactID'])."&caseID=".($this->_tpl_vars['caseId'])."&asn=standard_timeline"), $this);?>
"><i class="crm-i fa-print"></i> <?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Print Report<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></a>
        <?php endif; ?>

        <?php if (! empty ( $this->_tpl_vars['exportDoc'] )): ?>
          <a class="crm-hover-button action-item" href="<?php echo $this->_tpl_vars['exportDoc']; ?>
"><i class="crm-i fa-file-pdf-o"></i> <?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Export Document<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></a>
        <?php endif; ?>

        <?php if ($this->_tpl_vars['mergeCases']): ?>
          <a href="#mergeCasesDialog" class="action-item no-popup crm-hover-button case-miniform"><i class="crm-i fa-compress"></i> <?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Merge Case<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></a>
          <?php echo $this->_tpl_vars['form']['_qf_CaseView_next_merge_case']['html']; ?>

          <span id="mergeCasesDialog" class="hiddenElement">
            <?php echo $this->_tpl_vars['form']['merge_case_id']['html']; ?>

          </span>
        <?php endif; ?>

        <?php if (call_user_func ( array ( 'CRM_Core_Permission' , 'giveMeAllACLs' ) )): ?>
          <a class="action-item crm-hover-button medium-popup" href="<?php echo CRM_Utils_System::crmURL(array('p' => 'civicrm/contact/view/case/editClient','h' => 1,'q' => "reset=1&action=update&id=".($this->_tpl_vars['caseID'])."&cid=".($this->_tpl_vars['contactID'])), $this);?>
"><i class="crm-i fa-user"></i> <?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Assign to Another Client<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></a>
        <?php endif; ?>
      </p>
    </div>
  </div>

  <div class="clear"></div>
  <?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "CRM/Case/Page/CustomDataView.tpl", 'smarty_include_vars' => array()));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?>

  <div class="crm-accordion-wrapper collapsed crm-case-roles-block">
    <div class="crm-accordion-header">
      <?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Roles<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>
    </div><!-- /.crm-accordion-header -->
    <div class="crm-accordion-body">

      <?php if ($this->_tpl_vars['hasAccessToAllCases']): ?>
        <div class="crm-submit-buttons">
          <a class="button case-miniform" href="#addCaseRoleDialog" data-key="<?php echo smarty_function_crmKey(array('name' => 'civicrm/ajax/relation'), $this);?>
" rel="#caseRoles-selector-<?php echo $this->_tpl_vars['caseID']; ?>
"><i class="crm-i fa-plus-circle"></i> <?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Add new role<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></a>
        </div>
        <div id="addCaseRoleDialog" class="hiddenElement">
          <div><?php echo $this->_tpl_vars['form']['role_type']['label']; ?>
</div>
          <div><?php echo $this->_tpl_vars['form']['role_type']['html']; ?>
</div><br />
          <div><label for="add_role_contact_id"><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Assign To<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>:</label></div>
          <div><input name="add_role_contact_id" placeholder="<?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>- first select relationship type -<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>" class="huge" /></div>
        </div>
      <?php endif; ?>

      <div id="editCaseRoleDialog" class="hiddenElement">
        <div><label for="edit_role_contact_id"><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Change To<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>:</label></div>
        <div><input name="edit_role_contact_id" placeholder="<?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>- select contact -<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>" class="huge" /></div>
      </div>

      <table id="caseRoles-selector-<?php echo $this->_tpl_vars['caseID']; ?>
"  class="report-layout crm-ajax-table" data-page-length="10">
        <thead>
          <tr>
            <th data-data="relation"><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Case Role<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></th>
            <th data-data="name"><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Name<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></th>
            <th data-data="phone"><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Phone<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></th>
            <th data-data="email"><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Email<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></th>
            <?php if ($this->_tpl_vars['relId'] != 'client' && $this->_tpl_vars['hasAccessToAllCases']): ?>
              <th data-data="actions" data-orderable="false"><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Actions<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></th>
            <?php endif; ?>
          </tr>
        </thead>
      </table>
      <?php echo '
        <script type="text/javascript">
          (function($) {
            var caseId = '; ?>
<?php echo $this->_tpl_vars['caseID']; ?>
<?php echo ';
            CRM.$(\'table#caseRoles-selector-\' + caseId).data({
              "ajax": {
                "url": '; ?>
'<?php echo CRM_Utils_System::crmURL(array('p' => "civicrm/ajax/caseroles",'h' => 0,'q' => "snippet=4&caseID=".($this->_tpl_vars['caseId'])."&cid=".($this->_tpl_vars['contactID'])."&userID=".($this->_tpl_vars['userID'])), $this);?>
'<?php echo '
              }
            });
          })(CRM.$);
        </script>
      '; ?>


      <div id="deleteCaseRoleDialog" class="hiddenElement">
        <?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Are you sure you want to end this relationship?<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>
      </div>

   </div><!-- /.crm-accordion-body -->
  </div><!-- /.crm-accordion-wrapper -->

  <?php if ($this->_tpl_vars['hasAccessToAllCases']): ?>
  <div class="crm-accordion-wrapper collapsed crm-case-other-relationships-block">
    <div class="crm-accordion-header">
      <?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Other Relationships<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>
    </div><!-- /.crm-accordion-header -->
    <div class="crm-accordion-body">
      <div class="crm-submit-buttons">
        <?php $this->_tag_stack[] = array('crmButton', array('p' => 'civicrm/contact/view/rel','q' => "action=add&reset=1&cid=".($this->_tpl_vars['contactId'])."&caseID=".($this->_tpl_vars['caseID']),'icon' => "plus-circle")); $_block_repeat=true;smarty_block_crmButton($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Add client relationship<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?><?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_crmButton($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>
      </div>
      <table id="clientRelationships-selector-<?php echo $this->_tpl_vars['caseID']; ?>
"  class="report-layout crm-ajax-table" data-page-length="10">
        <thead>
          <tr>
            <th data-data="relation"><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Client Relationship<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></th>
            <th data-data="name"><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Name<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></th>
            <th data-data="phone"><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Phone<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></th>
            <th data-data="email"><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Email<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></th>
          </tr>
        </thead>
      </table>
      <?php echo '
        <script type="text/javascript">
          (function($) {
            var caseId = '; ?>
<?php echo $this->_tpl_vars['caseID']; ?>
<?php echo ';
            CRM.$(\'table#clientRelationships-selector-\' + caseId).data({
              "ajax": {
                "url": '; ?>
'<?php echo CRM_Utils_System::crmURL(array('p' => "civicrm/ajax/clientrelationships",'h' => 0,'q' => "snippet=4&caseID=".($this->_tpl_vars['caseId'])."&cid=".($this->_tpl_vars['contactID'])."&userID=".($this->_tpl_vars['userID'])), $this);?>
'<?php echo '
              }
            });
          })(CRM.$);
        </script>
      '; ?>

  <br />
  <?php if (! empty ( $this->_tpl_vars['globalGroupInfo']['id'] )): ?>
    <div class="crm-submit-buttons">
      <a class="button case-miniform" href="#addMembersToGroupDialog" rel="#globalRelationships-selector-<?php echo $this->_tpl_vars['caseId']; ?>
" data-group_id="<?php echo $this->_tpl_vars['globalGroupInfo']['id']; ?>
">
        <i class="crm-i fa-plus-circle"></i> <?php $this->_tag_stack[] = array('ts', array('1' => $this->_tpl_vars['globalGroupInfo']['title'])); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Add members to %1<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>
      </a>
    </div>
    <div id="addMembersToGroupDialog" class="hiddenElement">
      <input name="add_member_to_group_contact_id" placeholder="<?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>- select contacts -<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>" class="huge" />
    </div>
    <table id="globalRelationships-selector-<?php echo $this->_tpl_vars['caseId']; ?>
"  class="report-layout crm-ajax-table" data-page-length="10">
      <thead>
        <tr>
          <th data-data="sort_name"><?php echo $this->_tpl_vars['globalGroupInfo']['title']; ?>
</th>
          <th data-data="phone"><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Phone<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></th>
          <th data-data="email"><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Email<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></th>
        </tr>
      </thead>
    </table>
    <?php echo '
      <script type="text/javascript">
        (function($) {
          var caseId = '; ?>
<?php echo $this->_tpl_vars['caseID']; ?>
<?php echo ';
          CRM.$(\'table#globalRelationships-selector-\' + caseId).data({
            "ajax": {
              "url": '; ?>
'<?php echo CRM_Utils_System::crmURL(array('p' => "civicrm/ajax/globalrelationships",'h' => 0,'q' => "snippet=4&caseID=".($this->_tpl_vars['caseId'])."&cid=".($this->_tpl_vars['contactID'])."&userID=".($this->_tpl_vars['userID'])), $this);?>
'<?php echo '
            }
          });
        })(CRM.$);
      </script>
    '; ?>

  <?php endif; ?>

  </div><!-- /.crm-accordion-body -->
</div><!-- /.crm-accordion-wrapper -->

<?php endif; ?> <?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "CRM/Case/Form/ActivityToCase.tpl", 'smarty_include_vars' => array()));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?>

<?php if ($this->_tpl_vars['showTags']): ?>
<div id="casetags" class="crm-accordion-wrapper  crm-case-tags-block">
 <div class="crm-accordion-header">
  <?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Case Tags<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>
 </div><!-- /.crm-accordion-header -->
 <div class="crm-accordion-body">
  <?php if ($this->_tpl_vars['tags']): ?>
    <p class="crm-block crm-content-block crm-case-caseview-display-tags">
      &nbsp;&nbsp;
      <?php $_from = $this->_tpl_vars['tags']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['tag']):
?>
        <span class="crm-tag-item" <?php if (! empty ( $this->_tpl_vars['tag']['color'] )): ?>style="background-color: <?php echo $this->_tpl_vars['tag']['color']; ?>
; color: <?php echo ((is_array($_tmp=$this->_tpl_vars['tag']['color'])) ? $this->_run_mod_handler('colorContrast', true, $_tmp) : smarty_modifier_colorContrast($_tmp)); ?>
;"<?php endif; ?>>
          <?php echo $this->_tpl_vars['tag']['text']; ?>

        </span>
      <?php endforeach; endif; unset($_from); ?>
    </p>
  <?php endif; ?>

   <?php $_from = $this->_tpl_vars['tagSetTags']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['displayTagset']):
?>
     <p class="crm-block crm-content-block crm-case-caseview-display-tagset">
       &nbsp;&nbsp;<strong><?php echo $this->_tpl_vars['displayTagset']['name']; ?>
:</strong>
       <?php echo ((is_array($_tmp=', ')) ? $this->_run_mod_handler('implode', true, $_tmp, $this->_tpl_vars['displayTagset']['items']) : implode($_tmp, $this->_tpl_vars['displayTagset']['items'])); ?>

     </p>
   <?php endforeach; endif; unset($_from); ?>

   <?php if (! $this->_tpl_vars['tags'] && ! $this->_tpl_vars['tagSetTags']): ?>
     <div class="status">
       <?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>There are no tags currently assigned to this case.<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>
     </div>
   <?php endif; ?>

  <div class="crm-submit-buttons">
    <a class="button case-miniform" href="#manageTagsDialog" data-key="<?php echo smarty_function_crmKey(array('name' => 'civicrm/case/ajax/processtags'), $this);?>
">
      <?php if ($this->_tpl_vars['tags'] || $this->_tpl_vars['tagSetTags']): ?><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Edit Tags<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?><?php else: ?><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Add Tags<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?><?php endif; ?>
    </a>
  </div>

 </div><!-- /.crm-accordion-body -->
</div><!-- /.crm-accordion-wrapper -->

<div id="manageTagsDialog" class="hiddenElement">
  <div class="label"><?php echo $this->_tpl_vars['form']['case_tag']['label']; ?>
</div>
  <div class="view-value"><div class="crm-select-container"><?php echo $this->_tpl_vars['form']['case_tag']['html']; ?>
</div>
    <br/>
    <div style="text-align:left;"><?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "CRM/common/Tagset.tpl", 'smarty_include_vars' => array('tagsetType' => 'case')));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?></div>
    <br/>
    <div class="clear"></div>
  </div>
</div>

<?php endif; ?> 
<?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "CRM/Case/Form/ActivityTab.tpl", 'smarty_include_vars' => array()));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?>

<div class="crm-submit-buttons"><?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "CRM/common/formButtons.tpl", 'smarty_include_vars' => array('location' => 'bottom')));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?></div>
<?php endif; ?> </div>
<?php echo '
<style type="text/css">
  .crm-case-caseview-case_subject span.crm-editable {
    padding-right: 32px;
    position: relative;
  }
  .crm-case-caseview-case_subject span.crm-editable:before {
    position: absolute;
    font-family: \'FontAwesome\';
    top: 0;
    right: 10px;
    content: "\\f040";
    opacity: 0.7;
    color: #000;
    font-size: .92em;
  }
  .crm-case-caseview-case_subject span.crm-editable-editing {
    padding-right: 0;
  }
  .crm-case-caseview-case_subject span.crm-editable-editing form > input {
    min-width: 20em;
    padding: 3px;
  }
  .crm-case-caseview-case_subject span.crm-editable-editing:before {
    content: "";
  }
</style>
'; ?>

<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_crmScope($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>