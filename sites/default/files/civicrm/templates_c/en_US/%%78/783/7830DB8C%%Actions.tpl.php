<?php /* Smarty version 2.6.30, created on 2018-12-03 09:36:16
         compiled from CRM/Contact/Page/Inline/Actions.tpl */ ?>
<?php require_once(SMARTY_CORE_DIR . 'core.load_plugins.php');
smarty_core_load_plugins(array('plugins' => array(array('block', 'crmScope', 'CRM/Contact/Page/Inline/Actions.tpl', 1, false),array('block', 'crmButton', 'CRM/Contact/Page/Inline/Actions.tpl', 29, false),array('block', 'ts', 'CRM/Contact/Page/Inline/Actions.tpl', 30, false),array('block', 'crmRegion', 'CRM/Contact/Page/Inline/Actions.tpl', 32, false),array('modifier', 'escape', 'CRM/Contact/Page/Inline/Actions.tpl', 43, false),)), $this); ?>
<?php $this->_tag_stack[] = array('crmScope', array('extensionKey' => "")); $_block_repeat=true;smarty_block_crmScope($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>
<div id="crm-contact-actions-wrapper" data-edit-params='{"cid": "<?php echo $this->_tpl_vars['contactId']; ?>
", "class_name": "CRM_Contact_Page_Inline_Actions"}'>
  <?php $this->_tag_stack[] = array('crmButton', array('id' => "crm-contact-actions-link",'href' => "#",'icon' => 'bars')); $_block_repeat=true;smarty_block_crmButton($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>
    <?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Actions<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>
  <?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_crmButton($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>
    <?php $this->_tag_stack[] = array('crmRegion', array('name' => "contact-page-inline-actions")); $_block_repeat=true;smarty_block_crmRegion($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>
      <div class="ac_results" id="crm-contact-actions-list">
        <div class="crm-contact-actions-list-inner">
          <div class="crm-contact_activities-list">
          <?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "CRM/Activity/Form/ActivityLinks.tpl", 'smarty_include_vars' => array('as_select' => false)));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?>
          </div>
          <div class="crm-contact_print-list">
            <ul class="contact-print">
              <?php $_from = $this->_tpl_vars['actionsMenuList']['otherActions']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['row']):
?>
                <?php if (! empty ( $this->_tpl_vars['row']['href'] ) || ! empty ( $this->_tpl_vars['row']['tab'] )): ?>
                <li class="crm-contact-<?php echo $this->_tpl_vars['row']['ref']; ?>
">
                  <a href="<?php if (! empty ( $this->_tpl_vars['row']['href'] )): ?><?php echo $this->_tpl_vars['row']['href']; ?>
<?php if (strstr ( $this->_tpl_vars['row']['href'] , '?' )): ?>&cid=<?php echo $this->_tpl_vars['contactId']; ?>
<?php endif; ?><?php else: ?>#<?php endif; ?>" title="<?php echo ((is_array($_tmp=$this->_tpl_vars['row']['title'])) ? $this->_run_mod_handler('escape', true, $_tmp) : smarty_modifier_escape($_tmp)); ?>
" data-tab="<?php echo $this->_tpl_vars['row']['tab']; ?>
" <?php if (! empty ( $this->_tpl_vars['row']['class'] )): ?>class="<?php echo $this->_tpl_vars['row']['class']; ?>
"<?php endif; ?>>
                    <span><i <?php if (! empty ( $this->_tpl_vars['row']['icon'] )): ?>class="<?php echo $this->_tpl_vars['row']['icon']; ?>
"<?php endif; ?>></i> <?php echo $this->_tpl_vars['row']['title']; ?>
</span>
                  </a>
                </li>
                <?php endif; ?>
              <?php endforeach; endif; unset($_from); ?>
          </ul>
          </div>
          <div class="crm-contact_actions-list">
          <ul class="contact-actions">
            <?php $_from = $this->_tpl_vars['actionsMenuList']['moreActions']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['row']):
?>
            <?php if (! empty ( $this->_tpl_vars['row']['href'] ) || ! empty ( $this->_tpl_vars['row']['tab'] )): ?>
            <li class="crm-action-<?php echo $this->_tpl_vars['row']['ref']; ?>
">
              <a href="<?php if (! empty ( $this->_tpl_vars['row']['href'] )): ?><?php echo $this->_tpl_vars['row']['href']; ?>
<?php if (strstr ( $this->_tpl_vars['row']['href'] , '?' )): ?>&cid=<?php echo $this->_tpl_vars['contactId']; ?>
<?php endif; ?><?php else: ?>#<?php endif; ?>" title="<?php echo ((is_array($_tmp=$this->_tpl_vars['row']['title'])) ? $this->_run_mod_handler('escape', true, $_tmp) : smarty_modifier_escape($_tmp)); ?>
" data-tab="<?php echo $this->_tpl_vars['row']['tab']; ?>
" <?php if (! empty ( $this->_tpl_vars['row']['class'] )): ?>class="<?php echo $this->_tpl_vars['row']['class']; ?>
"<?php endif; ?>><?php echo $this->_tpl_vars['row']['title']; ?>
</a>
            </li>
            <?php endif; ?>
          <?php endforeach; endif; unset($_from); ?>
                </ul>
                </div>


          <div class="clear"></div>
        </div>
      </div>
    <?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_crmRegion($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>
  </div>
<?php echo '
'; ?>

<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_crmScope($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>