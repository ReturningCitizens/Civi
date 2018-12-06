<?php /* Smarty version 2.6.30, created on 2018-12-03 09:41:02
         compiled from CRM/Contact/Form/Search/Criteria/SearchSettings.tpl */ ?>
<?php require_once(SMARTY_CORE_DIR . 'core.load_plugins.php');
smarty_core_load_plugins(array('plugins' => array(array('block', 'crmScope', 'CRM/Contact/Form/Search/Criteria/SearchSettings.tpl', 1, false),array('block', 'ts', 'CRM/Contact/Form/Search/Criteria/SearchSettings.tpl', 13, false),array('function', 'help', 'CRM/Contact/Form/Search/Criteria/SearchSettings.tpl', 4, false),array('function', 'crmURL', 'CRM/Contact/Form/Search/Criteria/SearchSettings.tpl', 13, false),)), $this); ?>
<?php $this->_tag_stack[] = array('crmScope', array('extensionKey' => "")); $_block_repeat=true;smarty_block_crmScope($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?><div id="search-settings" class="form-item">
  <table>
    <tr>
      <td><?php echo $this->_tpl_vars['form']['operator']['label']; ?>
 <?php echo smarty_function_help(array('id' => "id-search-operator"), $this);?>
<br /><?php echo $this->_tpl_vars['form']['operator']['html']; ?>
</td>
      <td>
        <?php if ($this->_tpl_vars['form']['deleted_contacts']): ?><?php echo $this->_tpl_vars['form']['deleted_contacts']['html']; ?>
 <?php echo $this->_tpl_vars['form']['deleted_contacts']['label']; ?>
<?php endif; ?>
      </td>
      <td class="adv-search-top-submit" colspan="2">
        <div class="crm-submit-buttons">
          <?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "CRM/common/formButtons.tpl", 'smarty_include_vars' => array('location' => 'top')));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?>
        </div>
        <div class="crm-submit-buttons reset-advanced-search">
          <a href="<?php echo CRM_Utils_System::crmURL(array('p' => 'civicrm/contact/search/advanced','q' => 'reset=1'), $this);?>
" id="resetAdvancedSearch" class="crm-hover-button css_right" title="<?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Clear all search criteria<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>">
            <i class="crm-i fa-undo"></i>
            <?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Reset Form<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>
          </a>
        </div>
      </td>
    </tr>
  </table>
</div>
<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_crmScope($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>