<?php /* Smarty version 2.6.30, created on 2018-12-03 09:40:15
         compiled from CRM/Report/Form/Tabs/FieldSelection.tpl */ ?>
<?php require_once(SMARTY_CORE_DIR . 'core.load_plugins.php');
smarty_core_load_plugins(array('plugins' => array(array('block', 'crmScope', 'CRM/Report/Form/Tabs/FieldSelection.tpl', 1, false),)), $this); ?>
<?php $this->_tag_stack[] = array('crmScope', array('extensionKey' => "")); $_block_repeat=true;smarty_block_crmScope($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>
  <div id="report-tab-col-groups" class="civireport-criteria">
    <?php $_from = $this->_tpl_vars['colGroups']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['dnc'] => $this->_tpl_vars['grpFields']):
?>
      <?php $this->assign('count', '0'); ?>
            <?php if ($this->_tpl_vars['grpFields']['use_accordian_for_field_selection']): ?>
        <div class="crm-accordion-wrapper crm-accordion collapsed">
        <div class="crm-accordion-header">
          <?php echo $this->_tpl_vars['grpFields']['group_title']; ?>

        </div><!-- /.crm-accordion-header -->
        <div class="crm-accordion-body">
      <?php endif; ?>
      <table class="criteria-group">
        <tr class="crm-report crm-report-criteria-field crm-report-criteria-field-<?php echo $this->_tpl_vars['dnc']; ?>
">
          <?php $_from = $this->_tpl_vars['grpFields']['fields']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['field'] => $this->_tpl_vars['title']):
?>
          <?php $this->assign('count', ($this->_tpl_vars['count']+1)); ?>
          <td width="25%"><?php echo $this->_tpl_vars['form']['fields'][$this->_tpl_vars['field']]['html']; ?>
</td>
          <?php if (!($this->_tpl_vars['count'] % 4)): ?>
        </tr><tr class="crm-report crm-report-criteria-field crm-report-criteria-field_<?php echo $this->_tpl_vars['dnc']; ?>
">
          <?php endif; ?>
          <?php endforeach; endif; unset($_from); ?>
          <?php if (!(!($this->_tpl_vars['count'] % 4))): ?>
            <td colspan="4 - ($count % 4)"></td>
          <?php endif; ?>
        </tr>
      </table>
      <?php if ($this->_tpl_vars['grpFields']['use_accordian_for_field_selection']): ?>
        </div><!-- /.crm-accordion-body -->
        </div><!-- /.crm-accordion-wrapper -->
      <?php endif; ?>
    <?php endforeach; endif; unset($_from); ?>
  </div>
<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_crmScope($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>