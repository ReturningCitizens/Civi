<?php /* Smarty version 2.6.30, created on 2018-12-04 11:27:10
         compiled from CRM/Civirules/Form/RuleBlocks/RuleBlock.tpl */ ?>
<?php require_once(SMARTY_CORE_DIR . 'core.load_plugins.php');
smarty_core_load_plugins(array('plugins' => array(array('block', 'crmScope', 'CRM/Civirules/Form/RuleBlocks/RuleBlock.tpl', 1, false),)), $this); ?>
<?php $this->_tag_stack[] = array('crmScope', array('extensionKey' => "")); $_block_repeat=true;smarty_block_crmScope($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?><h3>Rule Details</h3>
<div class="crm-block crm-form-block crm-civirule-rule_label-block">
  <div class="crm-section">
    <div class="label"><?php echo $this->_tpl_vars['form']['rule_label']['label']; ?>
</div>
    <div class="content"><?php echo $this->_tpl_vars['form']['rule_label']['html']; ?>
</div>
    <div class="clear"></div>
  </div>
  <div class="crm-section">
    <div class="label"><?php echo $this->_tpl_vars['form']['rule_description']['label']; ?>
</div>
    <div class="content"><?php echo $this->_tpl_vars['form']['rule_description']['html']; ?>
</div>
    <div class="clear"></div>
  </div>
  <div class="crm-section">
    <div class="label"><?php echo $this->_tpl_vars['form']['rule_tag_id']['label']; ?>
</div>
    <div class="content select-container"><?php echo $this->_tpl_vars['form']['rule_tag_id']['html']; ?>
</div>
    <div class="clear"></div>
  </div>
  <div class="crm-section">
    <div class="label"><?php echo $this->_tpl_vars['form']['rule_help_text']['label']; ?>
</div>
    <div class="content"><?php echo $this->_tpl_vars['form']['rule_help_text']['html']; ?>
</div>
    <div class="clear"></div>
  </div>
  <div class="crm-section">
    <div class="label"><?php echo $this->_tpl_vars['form']['rule_is_active']['label']; ?>
</div>
    <div class="content"><?php echo $this->_tpl_vars['form']['rule_is_active']['html']; ?>
</div>
    <div class="clear"></div>
  </div>      
  <div class="crm-section">
    <div class="label"><?php echo $this->_tpl_vars['form']['rule_created_date']['label']; ?>
</div>
    <div class="content"><?php echo $this->_tpl_vars['form']['rule_created_date']['value']; ?>
</div>
    <div class="clear"></div>
  </div>
  <div class="crm-section">
    <div class="label"><?php echo $this->_tpl_vars['form']['rule_created_contact']['label']; ?>
</div>
    <div class="content"><?php echo $this->_tpl_vars['form']['rule_created_contact']['value']; ?>
</div>
    <div class="clear"></div>
  </div>
  <?php echo $this->_tpl_vars['postRuleBlock']; ?>

</div>
<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_crmScope($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>