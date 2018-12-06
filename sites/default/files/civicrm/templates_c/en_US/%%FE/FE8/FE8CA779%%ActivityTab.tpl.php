<?php /* Smarty version 2.6.30, created on 2018-12-03 10:25:57
         compiled from CRM/Case/Form/ActivityTab.tpl */ ?>
<?php require_once(SMARTY_CORE_DIR . 'core.load_plugins.php');
smarty_core_load_plugins(array('plugins' => array(array('block', 'crmScope', 'CRM/Case/Form/ActivityTab.tpl', 1, false),array('block', 'ts', 'CRM/Case/Form/ActivityTab.tpl', 31, false),array('modifier', 'crmAddClass', 'CRM/Case/Form/ActivityTab.tpl', 43, false),array('function', 'crmURL', 'CRM/Case/Form/ActivityTab.tpl', 95, false),array('function', 'crmAPI', 'CRM/Case/Form/ActivityTab.tpl', 115, false),)), $this); ?>
<?php $this->_tag_stack[] = array('crmScope', array('extensionKey' => "")); $_block_repeat=true;smarty_block_crmScope($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?><?php $this->assign('caseid', $this->_tpl_vars['caseID']); ?>
<?php if (isset ( $this->_tpl_vars['isForm'] ) && $this->_tpl_vars['isForm']): ?>
  <div class="crm-accordion-wrapper crm-case_activities-accordion  crm-case-activities-block">
    <div class="crm-accordion-header">
      <?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Activities<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>
    </div>

    <div id="activities" class="crm-accordion-body">
    <div class="crm-accordion-wrapper crm-accordion-inner crm-search_filters-accordion collapsed">
      <div class="crm-accordion-header">
        <?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Search Filters<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>
      </div><!-- /.crm-accordion-header -->
      <div class="crm-accordion-body">
        <table class="no-border form-layout-compressed" id="searchOptions">
          <tr>
            <td class="crm-case-caseview-form-block-repoter_id"colspan="2"><label for="reporter_id"><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Reporter/Role<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></label><br />
              <?php echo ((is_array($_tmp=$this->_tpl_vars['form']['reporter_id']['html'])) ? $this->_run_mod_handler('crmAddClass', true, $_tmp, 'twenty') : smarty_modifier_crmAddClass($_tmp, 'twenty')); ?>

            </td>
            <td class="crm-case-caseview-form-block-status_id"><label for="status_id"><?php echo $this->_tpl_vars['form']['status_id']['label']; ?>
</label><br />
              <?php echo $this->_tpl_vars['form']['status_id']['html']; ?>

            </td>
          </tr>
          <tr>
            <td class="crm-case-caseview-form-block-activity_date_low">
              <?php $this->assign('activitylow', "activity_date_low_".($this->_tpl_vars['caseID'])); ?>
              <?php echo $this->_tpl_vars['form'][$this->_tpl_vars['activitylow']]['label']; ?>
<br />
              <?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "CRM/common/jcalendar.tpl", 'smarty_include_vars' => array('elementName' => $this->_tpl_vars['activitylow'])));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?>
            </td>
            <td class="crm-case-caseview-form-block-activity_date_high">
              <?php $this->assign('activityhigh', "activity_date_high_".($this->_tpl_vars['caseID'])); ?>
              <?php echo $this->_tpl_vars['form'][$this->_tpl_vars['activityhigh']]['label']; ?>
<br />
              <?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "CRM/common/jcalendar.tpl", 'smarty_include_vars' => array('elementName' => $this->_tpl_vars['activityhigh'])));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?>
            </td>
            <td class="crm-case-caseview-form-block-activity_type_filter_id">
              <?php echo $this->_tpl_vars['form']['activity_type_filter_id']['label']; ?>
<br />
              <?php echo $this->_tpl_vars['form']['activity_type_filter_id']['html']; ?>

            </td>
          </tr>
          <?php if ($this->_tpl_vars['form']['activity_deleted']): ?>
            <tr class="crm-case-caseview-form-block-activity_deleted">
              <td>
                <?php echo $this->_tpl_vars['form']['activity_deleted']['html']; ?>
<?php echo $this->_tpl_vars['form']['activity_deleted']['label']; ?>

              </td>
            </tr>
          <?php endif; ?>
        </table>
      </div><!-- /.crm-accordion-body -->
    </div><!-- /.crm-accordion-wrapper -->
<?php endif; ?>

    <table id="case_id_<?php echo $this->_tpl_vars['caseid']; ?>
"  class="nestedActivitySelector crm-ajax-table" data-order='[[0,"desc"]]' data-page-length="10">
      <thead><tr>
        <th data-data="activity_date_time" class="crm-case-activities-date"><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Date<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></th>
        <th data-data="subject" cell-class="crmf-subject crm-editable" class="crm-case-activities-subject"><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Subject<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></th>
        <th data-data="type" class="crm-case-activities-type"><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Type<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></th>
        <th data-data="target_contact_name" class="crm-case-activities-with"><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>With<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></th>
        <th data-data="source_contact_name" class="crm-case-activities-assignee"><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Reporter<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></th>
        <th data-data="assignee_contact_name" class="crm-case-activities-assignee"><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Assignee<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></th>
        <th data-data="status_id" cell-class="crmf-status_id crm-editable" cell-data-type="select" cell-data-refresh=1 class="crm-case-activities-status"><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Status<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></th>
        <th data-data="links" data-orderable="false" class="crm-case-activities-status">&nbsp;</th>
      </tr></thead>
    </table>
  <?php echo '
    <script type="text/javascript">
      (function($) {
        var caseId = '; ?>
<?php echo $this->_tpl_vars['caseID']; ?>
<?php echo ';
        CRM.$(\'table#case_id_\' + caseId).data({
          "ajax": {
            "url": '; ?>
'<?php echo CRM_Utils_System::crmURL(array('p' => "civicrm/ajax/activity",'h' => 0,'q' => "snippet=4&caseID=".($this->_tpl_vars['caseID'])."&cid=".($this->_tpl_vars['contactID'])."&userID=".($this->_tpl_vars['userID'])), $this);?>
'<?php echo ',
            "data": function (d) {
              d.status_id = $("select#status_id_" + caseId).val(),
              d.reporter_id = $("select#reporter_id_" + caseId).val(),
              d.activity_type_id = $("select#activity_type_filter_id_" + caseId).val(),
              d.activity_date_low = $("#activity_date_low_" + caseId).val(),
              d.activity_date_high = $("#activity_date_high_" + caseId).val(),
              d.activity_deleted = ($("#activity_deleted_1").prop(\'checked\')) ? 1 : 0; 
            }
          }
        });
        $(function($) {
          $(\'#searchOptions :input\').change(function(){
            CRM.$(\'table#case_id_\' + caseId).DataTable().draw();
          });
        });
      })(CRM.$);
    </script>
  '; ?>

  <style type="text/css">
    <?php echo smarty_function_crmAPI(array('var' => 'statuses','entity' => 'OptionValue','action' => 'get','return' => "color,value",'option_limit' => 0,'option_group_id' => 'activity_status'), $this);?>

    <?php $_from = $this->_tpl_vars['statuses']['values']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['status']):
?>
    <?php if (! empty ( $this->_tpl_vars['status']['color'] )): ?>
    table#case_id_<?php echo $this->_tpl_vars['caseID']; ?>
 tr.status-id-<?php echo $this->_tpl_vars['status']['value']; ?>
 {
      border-left: 3px solid <?php echo $this->_tpl_vars['status']['color']; ?>
;
    }
    <?php endif; ?>
    <?php endforeach; endif; unset($_from); ?>
  </style>

<?php if (isset ( $this->_tpl_vars['isForm'] ) && $this->_tpl_vars['isForm']): ?>
    </div><!-- /.crm-accordion-body -->
  </div><!-- /.crm-accordion-wrapper -->
<?php endif; ?>
<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_crmScope($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>