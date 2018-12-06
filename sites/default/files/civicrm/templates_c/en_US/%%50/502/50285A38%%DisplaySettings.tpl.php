<?php /* Smarty version 2.6.30, created on 2018-12-03 09:41:02
         compiled from CRM/Contact/Form/Search/Criteria/DisplaySettings.tpl */ ?>
<?php require_once(SMARTY_CORE_DIR . 'core.load_plugins.php');
smarty_core_load_plugins(array('plugins' => array(array('block', 'crmScope', 'CRM/Contact/Form/Search/Criteria/DisplaySettings.tpl', 1, false),array('function', 'help', 'CRM/Contact/Form/Search/Criteria/DisplaySettings.tpl', 6, false),)), $this); ?>
<?php $this->_tag_stack[] = array('crmScope', array('extensionKey' => "")); $_block_repeat=true;smarty_block_crmScope($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?><div id="display-settings" class="form-item">
  <table>
    <tr>
      <td>
        <?php if ($this->_tpl_vars['form']['component_mode']): ?>
          <?php echo $this->_tpl_vars['form']['component_mode']['label']; ?>
 <?php echo smarty_function_help(array('id' => "id-display-results"), $this);?>

          <br />
          <?php echo $this->_tpl_vars['form']['component_mode']['html']; ?>

          <?php if ($this->_tpl_vars['form']['display_relationship_type']): ?>
            <div id="crm-display_relationship_type"><?php echo $this->_tpl_vars['form']['display_relationship_type']['html']; ?>
</div>
          <?php endif; ?>
        <?php else: ?>
          &nbsp;
        <?php endif; ?>
      </td>
      <td>
        <?php echo $this->_tpl_vars['form']['uf_group_id']['label']; ?>
 <?php echo smarty_function_help(array('id' => "id-search-views"), $this);?>
<br /><?php echo $this->_tpl_vars['form']['uf_group_id']['html']; ?>

      </td>
    </tr>
  </table>
</div>
<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_crmScope($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>