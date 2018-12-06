<?php /* Smarty version 2.6.30, created on 2018-12-03 09:37:04
         compiled from CRM/Contact/Form/Edit/TagsAndGroups.tpl */ ?>
<?php require_once(SMARTY_CORE_DIR . 'core.load_plugins.php');
smarty_core_load_plugins(array('plugins' => array(array('block', 'crmScope', 'CRM/Contact/Form/Edit/TagsAndGroups.tpl', 1, false),)), $this); ?>
<?php $this->_tag_stack[] = array('crmScope', array('extensionKey' => "")); $_block_repeat=true;smarty_block_crmScope($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?><?php if ($this->_tpl_vars['title']): ?>
<div class="crm-accordion-wrapper crm-tagGroup-accordion collapsed">
  <div class="crm-accordion-header"><?php echo $this->_tpl_vars['title']; ?>
</div>
  <div class="crm-accordion-body" id="tagGroup">
<?php endif; ?>
    <table class="form-layout-compressed<?php if ($this->_tpl_vars['context'] == 'profile'): ?> crm-profile-tagsandgroups<?php endif; ?>">
      <tr>
        <?php if (! $this->_tpl_vars['type'] || $this->_tpl_vars['type'] == 'tag'): ?>
          <td>
            <div class="crm-section tag-section">
              <?php if ($this->_tpl_vars['title']): ?><?php echo $this->_tpl_vars['form']['tag']['label']; ?>
<?php endif; ?>
              <?php echo $this->_tpl_vars['form']['tag']['html']; ?>

            </div>
            <?php if ($this->_tpl_vars['context'] != 'profile'): ?>
              <?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "CRM/common/Tagset.tpl", 'smarty_include_vars' => array()));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?>
            <?php endif; ?>
          </td>
        <?php endif; ?>
        <?php if (! $this->_tpl_vars['type'] || $this->_tpl_vars['type'] == 'group'): ?>
          <td>
            <?php if ($this->_tpl_vars['groupElementType'] == 'select'): ?>
              <div class="crm-section group-section">
              <?php if ($this->_tpl_vars['title']): ?><?php echo $this->_tpl_vars['form']['group']['label']; ?>
<?php endif; ?>
              <?php echo $this->_tpl_vars['form']['group']['html']; ?>

            </div>
            <?php else: ?>
              <?php $_from = $this->_tpl_vars['tagGroup']['group']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['key'] => $this->_tpl_vars['item']):
?>
                <div class="group-wrapper">
                  <?php echo $this->_tpl_vars['form']['group'][$this->_tpl_vars['key']]['html']; ?>

                  <?php if ($this->_tpl_vars['item']['description']): ?>
                    <div class="description"><?php echo $this->_tpl_vars['item']['description']; ?>
</div>
                  <?php endif; ?>
                </div>
              <?php endforeach; endif; unset($_from); ?>
            <?php endif; ?>
          </td>
        <?php endif; ?>
      </tr>
    </table>
<?php if ($this->_tpl_vars['title']): ?>
  </div>
</div><!-- /.crm-accordion-wrapper -->
<?php endif; ?>
<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_crmScope($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>