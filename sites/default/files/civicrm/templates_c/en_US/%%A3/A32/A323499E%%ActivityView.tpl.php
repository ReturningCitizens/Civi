<?php /* Smarty version 2.6.30, created on 2018-12-06 11:04:53
         compiled from CRM/Case/Form/ActivityView.tpl */ ?>
<?php require_once(SMARTY_CORE_DIR . 'core.load_plugins.php');
smarty_core_load_plugins(array('plugins' => array(array('block', 'crmScope', 'CRM/Case/Form/ActivityView.tpl', 1, false),array('block', 'ts', 'CRM/Case/Form/ActivityView.tpl', 32, false),array('block', 'crmButton', 'CRM/Case/Form/ActivityView.tpl', 81, false),array('modifier', 'crmDate', 'CRM/Case/Form/ActivityView.tpl', 39, false),array('modifier', 'crmStripAlternatives', 'CRM/Case/Form/ActivityView.tpl', 59, false),array('modifier', 'nl2br', 'CRM/Case/Form/ActivityView.tpl', 59, false),array('function', 'crmURL', 'CRM/Case/Form/ActivityView.tpl', 40, false),)), $this); ?>
<?php $this->_tag_stack[] = array('crmScope', array('extensionKey' => "")); $_block_repeat=true;smarty_block_crmScope($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?><div class="crm-block crm-content-block crm-case-activity-view-block">
  <?php if ($this->_tpl_vars['revs']): ?>
    <?php echo '<table class="crm-info-panel"><tr class="columnheader"><th>'; ?><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?><?php echo 'Created By'; ?><?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?><?php echo '</th><th>'; ?><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?><?php echo 'Created On'; ?><?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?><?php echo '</th><th>&nbsp;</th></tr>'; ?><?php $_from = $this->_tpl_vars['result']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['row']):
?><?php echo '<tr '; ?><?php if ($this->_tpl_vars['row']['id'] == $this->_tpl_vars['latestRevisionID']): ?><?php echo 'style="font-weight: bold;"'; ?><?php endif; ?><?php echo '><td class="crm-case-activityview-form-block-name">'; ?><?php echo $this->_tpl_vars['row']['name']; ?><?php echo '</td><td class="crm-case-activityview-form-block-date">'; ?><?php echo ((is_array($_tmp=$this->_tpl_vars['row']['date'])) ? $this->_run_mod_handler('crmDate', true, $_tmp) : smarty_modifier_crmDate($_tmp)); ?><?php echo '</td><td class="crm-case-activityview-form-block-'; ?><?php echo $this->_tpl_vars['row']['id']; ?><?php echo '"><a class="open-inline-noreturn" href="'; ?><?php echo CRM_Utils_System::crmURL(array('p' => 'civicrm/case/activity/view','h' => 0,'q' => "cid=".($this->_tpl_vars['contactID'])."&aid="), $this);?><?php echo ''; ?><?php echo $this->_tpl_vars['row']['id']; ?><?php echo '" title="'; ?><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?><?php echo 'View this revision of the activity record.'; ?><?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?><?php echo '">'; ?><?php if ($this->_tpl_vars['row']['id'] != $this->_tpl_vars['latestRevisionID']): ?><?php echo 'View Prior Revision'; ?><?php else: ?><?php echo 'View Current Revision'; ?><?php endif; ?><?php echo '</a></td></tr>'; ?><?php endforeach; endif; unset($_from); ?><?php echo '</table>'; ?>

  <?php else: ?>
    <?php if ($this->_tpl_vars['report']): ?>
      <table class="crm-info-panel" id="crm-activity-view-table">
        <?php $_from = $this->_tpl_vars['report']['fields']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }$this->_foreach['report'] = array('total' => count($_from), 'iteration' => 0);
if ($this->_foreach['report']['total'] > 0):
    foreach ($_from as $this->_tpl_vars['row']):
        $this->_foreach['report']['iteration']++;
?>
          <tr class="crm-case-activity-view-<?php echo $this->_tpl_vars['row']['label']; ?>
">
            <td class="label"><?php echo $this->_tpl_vars['row']['label']; ?>
</td>
            <?php if (($this->_foreach['report']['iteration'] <= 1) && ( $this->_tpl_vars['activityID'] || $this->_tpl_vars['parentID'] || $this->_tpl_vars['latestRevisionID'] )): ?>               <td><?php echo $this->_tpl_vars['row']['value']; ?>
</td>
              <td style="padding-right: 50px; text-align: right; font-size: .9em;">
                <?php if ($this->_tpl_vars['activityID']): ?><a class="open-inline-noreturn" href="<?php echo CRM_Utils_System::crmURL(array('p' => 'civicrm/case/activity/view','h' => 0,'q' => "cid=".($this->_tpl_vars['contactID'])."&aid=".($this->_tpl_vars['activityID'])."&revs=1"), $this);?>
">&raquo; <?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>List all revisions<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></a><?php if (! $this->_tpl_vars['latestRevisionID']): ?><br /><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>(this is the current revision)<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?><?php endif; ?><br /><?php endif; ?>
                <?php if ($this->_tpl_vars['latestRevisionID']): ?><a class="open-inline-noreturn" href="<?php echo CRM_Utils_System::crmURL(array('p' => 'civicrm/case/activity/view','h' => 0,'q' => "cid=".($this->_tpl_vars['contactID'])."&aid=".($this->_tpl_vars['latestRevisionID'])), $this);?>
">&raquo; <?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>View current revision<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></a><br /><span style="color: red;"><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>(this is not the current revision)<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></span><br /><?php endif; ?>
                <?php if ($this->_tpl_vars['parentID']): ?><a class="open-inline-noreturn" href="<?php echo CRM_Utils_System::crmURL(array('p' => 'civicrm/case/activity/view','h' => 0,'q' => "cid=".($this->_tpl_vars['contactID'])."&aid=".($this->_tpl_vars['parentID'])), $this);?>
">&raquo; <?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Prompted by<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></a><?php endif; ?>
              </td>
            <?php else: ?>
              <td colspan="2"><?php if ($this->_tpl_vars['row']['label'] == 'Details'): ?><?php echo ((is_array($_tmp=((is_array($_tmp=$this->_tpl_vars['row']['value'])) ? $this->_run_mod_handler('crmStripAlternatives', true, $_tmp) : smarty_modifier_crmStripAlternatives($_tmp)))) ? $this->_run_mod_handler('nl2br', true, $_tmp) : smarty_modifier_nl2br($_tmp)); ?>
<?php elseif ($this->_tpl_vars['row']['type'] == 'Date'): ?><?php echo ((is_array($_tmp=$this->_tpl_vars['row']['value'])) ? $this->_run_mod_handler('crmDate', true, $_tmp) : smarty_modifier_crmDate($_tmp)); ?>
<?php else: ?><?php echo $this->_tpl_vars['row']['value']; ?>
<?php endif; ?></td>
            <?php endif; ?>
          </tr>
        <?php endforeach; endif; unset($_from); ?>
                <?php if ($this->_tpl_vars['report']['customGroups']): ?>
          <?php $_from = $this->_tpl_vars['report']['customGroups']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }$this->_foreach['custom'] = array('total' => count($_from), 'iteration' => 0);
if ($this->_foreach['custom']['total'] > 0):
    foreach ($_from as $this->_tpl_vars['groupTitle'] => $this->_tpl_vars['customGroup']):
        $this->_foreach['custom']['iteration']++;
?>
            <tr class="crm-case-activityview-form-block-groupTitle form-layout">
              <td colspan="3"><?php echo $this->_tpl_vars['groupTitle']; ?>
</td>
            </tr>
            <?php $_from = $this->_tpl_vars['customGroup']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }$this->_foreach['fields'] = array('total' => count($_from), 'iteration' => 0);
if ($this->_foreach['fields']['total'] > 0):
    foreach ($_from as $this->_tpl_vars['customField']):
        $this->_foreach['fields']['iteration']++;
?>
              <tr<?php if (! ($this->_foreach['fields']['iteration'] == $this->_foreach['fields']['total'])): ?> style="border-bottom: 1px solid #F6F6F6;"<?php endif; ?>>
                <td class="label"><?php echo $this->_tpl_vars['customField']['label']; ?>
</td>
                <td><?php echo $this->_tpl_vars['customField']['value']; ?>
</td>
              </tr>
            <?php endforeach; endif; unset($_from); ?>
          <?php endforeach; endif; unset($_from); ?>
        <?php endif; ?>
      </table>
    <?php endif; ?>
  <?php endif; ?>
  <div class="crm-submit-buttons">
    <?php $this->_tag_stack[] = array('crmButton', array('p' => 'civicrm/case','q' => "reset=1",'class' => 'cancel','icon' => 'times')); $_block_repeat=true;smarty_block_crmButton($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Done<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?><?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_crmButton($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>
  </div>
</div>
<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_crmScope($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>