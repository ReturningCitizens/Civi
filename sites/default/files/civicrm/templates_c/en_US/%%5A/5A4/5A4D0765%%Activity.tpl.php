<?php /* Smarty version 2.6.30, created on 2018-12-03 10:26:02
         compiled from CRM/Case/Form/Activity.tpl */ ?>
<?php require_once(SMARTY_CORE_DIR . 'core.load_plugins.php');
smarty_core_load_plugins(array('plugins' => array(array('block', 'crmScope', 'CRM/Case/Form/Activity.tpl', 1, false),array('block', 'ts', 'CRM/Case/Form/Activity.tpl', 43, false),array('block', 'edit', 'CRM/Case/Form/Activity.tpl', 125, false),array('block', 'crmRegion', 'CRM/Case/Form/Activity.tpl', 269, false),array('modifier', 'escape', 'CRM/Case/Form/Activity.tpl', 116, false),array('modifier', 'crmAddClass', 'CRM/Case/Form/Activity.tpl', 139, false),array('modifier', 'crmDate', 'CRM/Case/Form/Activity.tpl', 149, false),array('modifier', 'json_encode', 'CRM/Case/Form/Activity.tpl', 279, false),array('function', 'help', 'CRM/Case/Form/Activity.tpl', 125, false),array('function', 'cycle', 'CRM/Case/Form/Activity.tpl', 218, false),)), $this); ?>
<?php $this->_tag_stack[] = array('crmScope', array('extensionKey' => "")); $_block_repeat=true;smarty_block_crmScope($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>
<div class="crm-block crm-form-block crm-case-activity-form-block">

  <?php if ($this->_tpl_vars['action'] != 8 && $this->_tpl_vars['action'] != 32768): ?>
    <div class="crm-submit-buttons"><?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "CRM/common/formButtons.tpl", 'smarty_include_vars' => array('location' => 'top')));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?></div>

        <?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "CRM/Activity/Form/ActivityJs.tpl", 'smarty_include_vars' => array('tokenContext' => 'case_activity')));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?>

  <?php endif; ?>

  <?php if ($this->_tpl_vars['action'] == 8 || $this->_tpl_vars['action'] == 32768): ?>
  <div class="messages status no-popup">
    <i class="crm-i fa-info-circle"></i> &nbsp;
    <?php if ($this->_tpl_vars['action'] == 8): ?>
      <?php $this->_tag_stack[] = array('ts', array('1' => $this->_tpl_vars['activityTypeName'])); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Click Delete to move this &quot;%1&quot; activity to the Trash.<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>
    <?php else: ?>
      <?php $this->_tag_stack[] = array('ts', array('1' => $this->_tpl_vars['activityTypeName'])); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Click Restore to retrieve this &quot;%1&quot; activity from the Trash.<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>
    <?php endif; ?>
  </div><br />
  <?php else: ?>
  <table class="form-layout">
    <?php if ($this->_tpl_vars['activityTypeDescription']): ?>
      <tr>
        <div class="help"><?php echo $this->_tpl_vars['activityTypeDescription']; ?>
</div>
      </tr>
    <?php endif; ?>
        <?php if ($this->_tpl_vars['activityTypeFile'] == 'ChangeCaseStatus' || $this->_tpl_vars['activityTypeFile'] == 'ChangeCaseType' || $this->_tpl_vars['activityTypeFile'] == 'LinkCases' || $this->_tpl_vars['activityTypeFile'] == 'ChangeCaseStartDate'): ?>
      <?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "CRM/Case/Form/Activity/".($this->_tpl_vars['activityTypeFile']).".tpl", 'smarty_include_vars' => array()));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?>
      <tr class="crm-case-activity-form-block-details">
        <td class="label"><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Details<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></td>
        <td class="view-value">
          <?php echo $this->_tpl_vars['form']['details']['html']; ?>

        </td>
      </tr>
            <tr class="crm-case-activity-form-block-activity-details">
        <td colspan="2">
          <div id="activity-details" class="crm-accordion-wrapper collapsed">
            <div class="crm-accordion-header">
              <?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Activity Details<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>
            </div><!-- /.crm-accordion-header -->
            <div class="crm-accordion-body">
    <?php else: ?>
      <tr class="crm-case-activity-form-block-activity-details">
        <td colspan="2">
    <?php endif; ?>
                <table class="form-layout-compressed">
              <tbody>
                <tr id="with-clients" class="crm-case-activity-form-block-client_name">
                  <td class="label font-size12pt"><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Client<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></td>
                  <td class="view-value">
                    <span class="font-size12pt">
                      <?php $_from = $this->_tpl_vars['client_names']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }$this->_foreach['clients'] = array('total' => count($_from), 'iteration' => 0);
if ($this->_foreach['clients']['total'] > 0):
    foreach ($_from as $this->_tpl_vars['id'] => $this->_tpl_vars['client']):
        $this->_foreach['clients']['iteration']++;
?>
                        <?php $_from = $this->_tpl_vars['client_names'][$this->_tpl_vars['id']]; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['client1']):
?>
                          <?php echo $this->_tpl_vars['client1']['display_name']; ?>

                        <?php endforeach; endif; unset($_from); ?>
                        <?php if (! ($this->_foreach['clients']['iteration'] == $this->_foreach['clients']['total'])): ?>; &nbsp; <?php endif; ?>
                      <?php endforeach; endif; unset($_from); ?>
                    </span>

                    <?php if ($this->_tpl_vars['action'] == 1 || $this->_tpl_vars['action'] == 2): ?>
                      <br />
                      <a href="#" class="crm-with-contact">&raquo; <?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>With other contact(s)<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></a>
                    <?php endif; ?>
                  </td>
                </tr>

                <?php if ($this->_tpl_vars['action'] == 1 || $this->_tpl_vars['action'] == 2): ?>
                  <tr class="crm-case-activity-form-block-target_contact_id hiddenElement" id="with-contacts-widget">
                    <td class="label font-size10pt"><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>With Contact<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></td>
                    <td class="view-value">
                      <?php echo $this->_tpl_vars['form']['target_contact_id']['html']; ?>

                      <br/>
                      <a href="#" class="crm-with-contact">
                        &raquo; <?php if (! $this->_tpl_vars['multiClient']): ?><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>With client<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?><?php else: ?><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>With client(s)<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?><?php endif; ?>
                      </a>
                    </td>
                  </tr>
                <?php endif; ?>

                <tr class="crm-case-activity-form-block-activityTypeName">
                  <td class="label"><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Activity Type<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></td>
                  <td class="view-value bold"><?php echo ((is_array($_tmp=$this->_tpl_vars['activityTypeName'])) ? $this->_run_mod_handler('escape', true, $_tmp) : smarty_modifier_escape($_tmp)); ?>
</td>
                </tr>
                <tr class="crm-case-activity-form-block-source_contact_id">
                  <td class="label"><?php echo $this->_tpl_vars['form']['source_contact_id']['label']; ?>
</td>
                  <td class="view-value"><?php echo $this->_tpl_vars['form']['source_contact_id']['html']; ?>
</td>
                </tr>
                <tr class="crm-case-activity-form-block-assignee_contact_id">
                  <td class="label">
                    <?php echo $this->_tpl_vars['form']['assignee_contact_id']['label']; ?>

                    <?php $this->_tag_stack[] = array('edit', array()); $_block_repeat=true;smarty_block_edit($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?><?php echo smarty_function_help(array('id' => 'assignee_contact_id','title' => $this->_tpl_vars['form']['assignee_contact_id']['label'],'file' => "CRM/Activity/Form/Activity"), $this);?>
<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_edit($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>
                  </td>
                  <td><?php echo $this->_tpl_vars['form']['assignee_contact_id']['html']; ?>

                    <?php if ($this->_tpl_vars['activityAssigneeNotification']): ?>
                      <br />
                      <span id="notify_assignee_msg" class="description"><i class="crm-i fa-paper-plane"></i> <?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>A copy of this activity will be emailed to each Assignee.<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></span>
                    <?php endif; ?>
                  </td>
                </tr>

              
              <?php if ($this->_tpl_vars['activityTypeFile'] != 'ChangeCaseStartDate'): ?>
                <tr class="crm-case-activity-form-block-subject">
                  <td class="label"><?php echo $this->_tpl_vars['form']['subject']['label']; ?>
</td><td class="view-value"><?php echo ((is_array($_tmp=$this->_tpl_vars['form']['subject']['html'])) ? $this->_run_mod_handler('crmAddClass', true, $_tmp, 'huge') : smarty_modifier_crmAddClass($_tmp, 'huge')); ?>
</td>
                </tr>
              <?php endif; ?>
              <tr class="crm-case-activity-form-block-medium_id">
                <td class="label"><?php echo $this->_tpl_vars['form']['medium_id']['label']; ?>
</td>
                <td class="view-value"><?php echo $this->_tpl_vars['form']['medium_id']['html']; ?>
&nbsp;&nbsp;&nbsp;<?php echo $this->_tpl_vars['form']['location']['label']; ?>
 &nbsp;<?php echo ((is_array($_tmp=$this->_tpl_vars['form']['location']['html'])) ? $this->_run_mod_handler('crmAddClass', true, $_tmp, 'huge') : smarty_modifier_crmAddClass($_tmp, 'huge')); ?>
</td>
              </tr>
              <tr class="crm-case-activity-form-block-activity_date_time">
                <td class="label"><?php echo $this->_tpl_vars['form']['activity_date_time']['label']; ?>
</td>
                <?php if ($this->_tpl_vars['action'] == 2 && $this->_tpl_vars['activityTypeFile'] == 'OpenCase'): ?>
                  <td class="view-value"><?php echo ((is_array($_tmp=$this->_tpl_vars['current_activity_date_time'])) ? $this->_run_mod_handler('crmDate', true, $_tmp) : smarty_modifier_crmDate($_tmp)); ?>

                    <div class="description">Use a <a href="<?php echo $this->_tpl_vars['changeStartURL']; ?>
">Change Start Date</a> activity to change the date</div>
                                        <div style="display: none;"><?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "CRM/common/jcalendar.tpl", 'smarty_include_vars' => array('elementName' => 'activity_date_time')));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?></div>
                  </td>
                <?php else: ?>
                  <td class="view-value"><?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "CRM/common/jcalendar.tpl", 'smarty_include_vars' => array('elementName' => 'activity_date_time')));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?></td>
                <?php endif; ?>
              </tr>
              <?php if ($this->_tpl_vars['action'] == 2 && $this->_tpl_vars['activityTypeFile'] == 'OpenCase'): ?>
              <tr class="crm-case-activity-form-block-details">
                <td class="label"><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Notes<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></td>
                <td class="view-value">
                  <?php echo $this->_tpl_vars['form']['details']['html']; ?>

                </td>
              </tr>
              <?php endif; ?>
              <tr>
                <td colspan="2"><div id="customData"></div></td>
              </tr>
              <?php if (! $this->_tpl_vars['activityTypeFile']): ?>
                <tr class="crm-case-activity-form-block-details">
                  <td class="label"><?php echo $this->_tpl_vars['form']['details']['label']; ?>
</td>
                  <td class="view-value">
                    <?php echo $this->_tpl_vars['form']['details']['html']; ?>

                  </td>
                </tr>
              <?php endif; ?>
              <tr class="crm-case-activity-form-block-duration">
                <td class="label"><?php echo $this->_tpl_vars['form']['duration']['label']; ?>
</td>
                <td class="view-value">
                  <?php echo $this->_tpl_vars['form']['duration']['html']; ?>

                  <span class="description"><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>minutes<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></span>
                </td>
              </tr>
            </table>
        <?php if ($this->_tpl_vars['activityTypeFile'] == 'ChangeCaseStatus' || $this->_tpl_vars['activityTypeFile'] == 'ChangeCaseType' || $this->_tpl_vars['activityTypeFile'] == 'ChangeCaseStartDate'): ?>
          </div><!-- /.crm-accordion-body -->
        </div><!-- /.crm-accordion-wrapper -->
              <?php endif; ?>
      </td>
    </tr>
    <tr class="crm-case-activity-form-block-attachment">
      <td colspan="2"><?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "CRM/Form/attachment.tpl", 'smarty_include_vars' => array()));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?></td>
    </tr>
    <?php if ($this->_tpl_vars['searchRows']): ?>       <tr class="crm-case-activity-form-block-send_copy">
        <td colspan="2">
          <div id="sendcopy" class="crm-accordion-wrapper collapsed">
            <div class="crm-accordion-header">
              <?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Send a Copy<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>
            </div><!-- /.crm-accordion-header -->
            <div id="sendcopy-body" class="crm-accordion-body">

              <div class="description"><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Email a complete copy of this activity record to other people involved with the case. Click the top left box to select all.<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></div>
              <?php echo '<table class="row-highlight"><tr class="columnheader"><th>'; ?><?php echo $this->_tpl_vars['form']['toggleSelect']['html']; ?><?php echo '&nbsp;</th><th>'; ?><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?><?php echo 'Case Role'; ?><?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?><?php echo '</th><th>'; ?><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?><?php echo 'Name'; ?><?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?><?php echo '</th><th>'; ?><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?><?php echo 'Email'; ?><?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?><?php echo '</th>'; ?><?php if ($this->_tpl_vars['countId'] > 1): ?><?php echo '<th>'; ?><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?><?php echo 'Target Contact'; ?><?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?><?php echo '</th>'; ?><?php endif; ?><?php echo '</tr>'; ?><?php $_from = $this->_tpl_vars['searchRows']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['id'] => $this->_tpl_vars['row']):
?><?php echo ''; ?><?php $_from = $this->_tpl_vars['searchRows'][$this->_tpl_vars['id']]; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['id1'] => $this->_tpl_vars['row1']):
?><?php echo '<tr class="'; ?><?php echo smarty_function_cycle(array('values' => "odd-row,even-row"), $this);?><?php echo '"><td class="crm-case-activity-form-block-contact_'; ?><?php echo $this->_tpl_vars['id1']; ?><?php echo '">'; ?><?php echo $this->_tpl_vars['form']['contact_check'][$this->_tpl_vars['id1']]['html']; ?><?php echo '</td><td class="crm-case-activity-form-block-role">'; ?><?php echo $this->_tpl_vars['row1']['role']; ?><?php echo '</td><td class="crm-case-activity-form-block-display_name">'; ?><?php echo $this->_tpl_vars['row1']['display_name']; ?><?php echo '</td><td class="crm-case-activity-form-block-email">'; ?><?php echo $this->_tpl_vars['row1']['email']; ?><?php echo '</td>'; ?><?php if ($this->_tpl_vars['countId'] > 1): ?><?php echo '<td class="crm-case-activity-form-block-display_name">'; ?><?php echo $this->_tpl_vars['row1']['managerOf']; ?><?php echo '</td>'; ?><?php endif; ?><?php echo '</tr>'; ?><?php endforeach; endif; unset($_from); ?><?php echo ''; ?><?php endforeach; endif; unset($_from); ?><?php echo '</table>'; ?>

            </div><!-- /.crm-accordion-body -->
          </div><!-- /.crm-accordion-wrapper -->
        </td>
      </tr>
    <?php endif; ?>
  <tr class="crm-case-activity-form-block-schedule_followup">
    <td colspan="2">
    <?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "CRM/Activity/Form/FollowUp.tpl", 'smarty_include_vars' => array('type' => "case-")));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?>
    </td>
  </tr>
      <?php if ($this->_tpl_vars['activityTypeFile'] != 'ChangeCaseStatus' && $this->_tpl_vars['activityTypeFile'] != 'ChangeCaseType' && $this->_tpl_vars['activityTypeFile'] != 'ChangeCaseStartDate'): ?>
      <tr>
        <td colspan="2">
          <table class="form-layout-compressed">
            <tr class="crm-case-activity-form-block-status_id">
              <td class="label"><?php echo $this->_tpl_vars['form']['status_id']['label']; ?>
</td><td class="view-value"><?php echo $this->_tpl_vars['form']['status_id']['html']; ?>
</td>
            </tr>
            <tr class="crm-case-activity-form-block-priority_id">
              <td class="label"><?php echo $this->_tpl_vars['form']['priority_id']['label']; ?>
</td><td class="view-value"><?php echo $this->_tpl_vars['form']['priority_id']['html']; ?>
</td>
            </tr>
          </table>
        </td>
      </tr>
    <?php endif; ?>
    <?php if ($this->_tpl_vars['form']['tag']['html']): ?>
    <tr class="crm-case-activity-form-block-tag">
      <td class="label"><?php echo $this->_tpl_vars['form']['tag']['label']; ?>
</td>
      <td class="view-value">
        <div class="crm-select-container"><?php echo $this->_tpl_vars['form']['tag']['html']; ?>
</div>
      </td>
    </tr>
    <?php endif; ?>
  <tr class="crm-case-activity-form-block-tag_set"><td colspan="2"><?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "CRM/common/Tagset.tpl", 'smarty_include_vars' => array('tagsetType' => 'activity')));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?></td></tr>
  </table>

  <?php endif; ?>

<?php $this->_tag_stack[] = array('crmRegion', array('name' => 'case-activity-form')); $_block_repeat=true;smarty_block_crmRegion($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?><?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_crmRegion($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>

<div class="crm-submit-buttons"><?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "CRM/common/formButtons.tpl", 'smarty_include_vars' => array('location' => 'bottom')));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?></div>

  <?php if ($this->_tpl_vars['action'] == 1 || $this->_tpl_vars['action'] == 2): ?>
        <?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "CRM/common/customData.tpl", 'smarty_include_vars' => array()));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?>
    <?php echo '
    <script type="text/javascript">
    CRM.$(function($) {
      var doNotNotifyAssigneeFor = '; ?>
<?php echo json_encode($this->_tpl_vars['doNotNotifyAssigneeFor']); ?>
<?php echo ';
      $(\'#activity_type_id\').change(function() {
        if ($.inArray($(this).val(), doNotNotifyAssigneeFor) != -1) {
          $(\'#notify_assignee_msg\').hide();
        }
        else {
          $(\'#notify_assignee_msg\').show();
        }
      });

      '; ?>

      <?php if ($this->_tpl_vars['customDataSubType']): ?>
        CRM.buildCustomData( '<?php echo $this->_tpl_vars['customDataType']; ?>
', <?php echo $this->_tpl_vars['customDataSubType']; ?>
 );
        <?php else: ?>
        CRM.buildCustomData( '<?php echo $this->_tpl_vars['customDataType']; ?>
' );
      <?php endif; ?>
      <?php echo '
    });
    </script>
    '; ?>

  <?php endif; ?>

  <?php if ($this->_tpl_vars['action'] != 8 && $this->_tpl_vars['action'] != 32768 && empty ( $this->_tpl_vars['activityTypeFile'] )): ?>
  <script type="text/javascript">
    <?php if ($this->_tpl_vars['searchRows']): ?>
      cj('#sendcopy').crmAccordionToggle();
    <?php endif; ?>

    cj('#follow-up').crmAccordionToggle();
  </script>
  <?php endif; ?>

  <?php if ($this->_tpl_vars['action'] == 2 || $this->_tpl_vars['action'] == 1): ?>
    <?php echo '
    <script type="text/javascript">
      CRM.$(function($) {
        $(\'.crm-with-contact\').click(function() {
          $(\'#with-contacts-widget\').toggle();
          $(\'#with-clients\').toggle();
          return false;
        });
      });
    </script>
    '; ?>

  <?php endif; ?>
</div>
<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_crmScope($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>