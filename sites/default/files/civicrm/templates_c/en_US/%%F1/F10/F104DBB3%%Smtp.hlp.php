<?php /* Smarty version 2.6.30, created on 2018-12-06 11:01:24
         compiled from CRM/Admin/Form/Setting/Smtp.hlp */ ?>
<?php require_once(SMARTY_CORE_DIR . 'core.load_plugins.php');
smarty_core_load_plugins(array('plugins' => array(array('block', 'crmScope', 'CRM/Admin/Form/Setting/Smtp.hlp', 1, false),array('block', 'htxt', 'CRM/Admin/Form/Setting/Smtp.hlp', 25, false),array('block', 'ts', 'CRM/Admin/Form/Setting/Smtp.hlp', 27, false),array('function', 'crmURL', 'CRM/Admin/Form/Setting/Smtp.hlp', 26, false),)), $this); ?>
<?php $this->_tag_stack[] = array('crmScope', array('extensionKey' => "")); $_block_repeat=true;smarty_block_crmScope($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>
<?php $this->_tag_stack[] = array('htxt', array('id' => 'allow_mail_contact_email')); $_block_repeat=true;smarty_block_htxt($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>
<?php ob_start(); ?><?php echo CRM_Utils_System::crmURL(array('p' => "civicrm/admin/options/from_email_address",'q' => "reset=1"), $this);?>
<?php $this->_smarty_vars['capture']['default'] = ob_get_contents();  $this->assign('adminFromEmailURL', ob_get_contents());ob_end_clean(); ?>
<?php $this->_tag_stack[] = array('ts', array('1' => $this->_tpl_vars['adminFromEmailURL'])); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>If this is enabled a logged in user can send email from their own email address as well as the configured
  <a href="%1"><strong>FROM Email addresses</strong></a>.  This applies to actions such as send Email, Email invoice.. If this setting
  is disabled then only the system configured FROM Email addresses will be available for selection.<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>
<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_htxt($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>

<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_crmScope($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>