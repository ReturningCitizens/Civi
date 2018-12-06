<?php /* Smarty version 2.6.30, created on 2018-12-03 10:25:57
         compiled from CRM/Case/Page/CustomDataView.tpl */ ?>
<?php require_once(SMARTY_CORE_DIR . 'core.load_plugins.php');
smarty_core_load_plugins(array('plugins' => array(array('block', 'crmScope', 'CRM/Case/Page/CustomDataView.tpl', 1, false),array('block', 'crmButton', 'CRM/Case/Page/CustomDataView.tpl', 54, false),array('block', 'ts', 'CRM/Case/Page/CustomDataView.tpl', 54, false),array('modifier', 'cat', 'CRM/Case/Page/CustomDataView.tpl', 29, false),)), $this); ?>
<?php $this->_tag_stack[] = array('crmScope', array('extensionKey' => "")); $_block_repeat=true;smarty_block_crmScope($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?><?php $_from = $this->_tpl_vars['viewCustomData']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['customGroupId'] => $this->_tpl_vars['customValues']):
?>
  <?php $_from = $this->_tpl_vars['customValues']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['cvID'] => $this->_tpl_vars['cd_edit']):
?>
    <?php $this->assign('index', ((is_array($_tmp=$this->_tpl_vars['groupId'])) ? $this->_run_mod_handler('cat', true, $_tmp, "_".($this->_tpl_vars['cvID'])) : smarty_modifier_cat($_tmp, "_".($this->_tpl_vars['cvID'])))); ?>
  <div id="<?php echo $this->_tpl_vars['cd_edit']['name']; ?>
" class="crm-accordion-wrapper <?php if ($this->_tpl_vars['cd_edit']['collapse_display'] != 0): ?>collapsed<?php endif; ?>">
    <div class="crm-accordion-header">
      <?php echo $this->_tpl_vars['cd_edit']['title']; ?>

    </div>
    <div class="crm-accordion-body">
      <?php $_from = $this->_tpl_vars['cd_edit']['fields']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['field_id'] => $this->_tpl_vars['element']):
?>
        <table class="crm-info-panel">
          <tr>
            <?php if ($this->_tpl_vars['element']['options_per_line'] != 0): ?>
              <td class="label"><?php echo $this->_tpl_vars['element']['field_title']; ?>
</td>
              <td class="html-adjust">
                              <?php $_from = $this->_tpl_vars['element']['field_value']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['val']):
?>
                  <?php echo $this->_tpl_vars['val']; ?>
<br/>
                <?php endforeach; endif; unset($_from); ?>
              </td>
              <?php else: ?>
                <td class="label"><?php echo $this->_tpl_vars['element']['field_title']; ?>
</td>
                <td class="html-adjust"><?php echo $this->_tpl_vars['element']['field_value']; ?>
</td>
            <?php endif; ?>
          </tr>
        </table>
      <?php endforeach; endif; unset($_from); ?>
      <div>
        <?php $this->_tag_stack[] = array('crmButton', array('p' => "civicrm/case/cd/edit",'q' => "cgcount=1&action=update&reset=1&type=Case&entityID=".($this->_tpl_vars['caseID'])."&groupID=".($this->_tpl_vars['customGroupId'])."&cid=".($this->_tpl_vars['contactID'])."&subType=".($this->_tpl_vars['caseTypeID']),'icon' => 'pencil')); $_block_repeat=true;smarty_block_crmButton($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Edit<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?><?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_crmButton($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>
      </div>
      <br/>
      <div class="clear"></div>
    </div>
  </div>

  <?php endforeach; endif; unset($_from); ?>
<?php endforeach; endif; unset($_from); ?>
<div id="case_custom_edit"></div>
<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_crmScope($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>