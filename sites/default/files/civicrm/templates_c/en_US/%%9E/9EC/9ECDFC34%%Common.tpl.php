<?php /* Smarty version 2.6.30, created on 2018-12-03 09:51:23
         compiled from CRM/Case/Form/Search/Common.tpl */ ?>
<?php require_once(SMARTY_CORE_DIR . 'core.load_plugins.php');
smarty_core_load_plugins(array('plugins' => array(array('block', 'crmScope', 'CRM/Case/Form/Search/Common.tpl', 1, false),array('block', 'ts', 'CRM/Case/Form/Search/Common.tpl', 42, false),)), $this); ?>
<?php $this->_tag_stack[] = array('crmScope', array('extensionKey' => "")); $_block_repeat=true;smarty_block_crmScope($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?><?php if ($this->_tpl_vars['notConfigured']): ?>   <?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "CRM/Case/Page/ConfigureError.tpl", 'smarty_include_vars' => array()));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?>
<?php else: ?>
  <tr>
    <td class="crm-case-common-form-block-case_id">
      <?php echo $this->_tpl_vars['form']['case_id']['label']; ?>
<br />
      <?php echo $this->_tpl_vars['form']['case_id']['html']; ?>

    </td>
    <td class="crm-case-common-form-block-case_subject" colspan="2">
      <?php echo $this->_tpl_vars['form']['case_subject']['label']; ?>
<br />
      <?php echo $this->_tpl_vars['form']['case_subject']['html']; ?>

    </td>
  </tr>

  <tr>
    <td>
      <label><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Case Start Date<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></label>
    </td>
    <?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "CRM/Core/DateRange.tpl", 'smarty_include_vars' => array('fieldName' => 'case_from','from' => '_start_date_low','to' => '_start_date_high')));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?>
  </tr>
  <tr>
    <td>
      <label><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Case End Date<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></label>
    </td>
    <?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "CRM/Core/DateRange.tpl", 'smarty_include_vars' => array('fieldName' => 'case_to','from' => '_end_date_low','to' => '_end_date_high')));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?>
  </tr>

  <tr id='case_search_form'>
    <td class="crm-case-common-form-block-case_type">
      <?php echo $this->_tpl_vars['form']['case_type_id']['label']; ?>
<br />
      <?php echo $this->_tpl_vars['form']['case_type_id']['html']; ?>

    </td>

    <td class="crm-case-common-form-block-case_status_id">
      <?php echo $this->_tpl_vars['form']['case_status_id']['label']; ?>
<br />
      <?php echo $this->_tpl_vars['form']['case_status_id']['html']; ?>

      <?php if ($this->_tpl_vars['accessAllCases']): ?>
        <br />
        <?php echo $this->_tpl_vars['form']['case_owner']['html']; ?>

      <?php endif; ?>
      <?php if ($this->_tpl_vars['form']['case_deleted']): ?>
        <br />
        <?php echo $this->_tpl_vars['form']['case_deleted']['html']; ?>

        <?php echo $this->_tpl_vars['form']['case_deleted']['label']; ?>

      <?php endif; ?>
    </td>
    <td class="crm-case-common-form-block-case_tags">
      <?php if ($this->_tpl_vars['form']['case_tags']['html']): ?>
        <?php echo $this->_tpl_vars['form']['case_tags']['label']; ?>
<br />
        <?php echo $this->_tpl_vars['form']['case_tags']['html']; ?>

      <?php endif; ?>
    </td>
  </tr>

  <tr>
    <td colspan="3"><?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "CRM/common/Tagset.tpl", 'smarty_include_vars' => array('tagsetType' => 'case')));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?></td>
  </tr>

  <?php if ($this->_tpl_vars['caseGroupTree']): ?>
    <tr>
      <td colspan="3">
        <?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "CRM/Custom/Form/Search.tpl", 'smarty_include_vars' => array('groupTree' => $this->_tpl_vars['caseGroupTree'],'showHideLinks' => false)));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?>
      </td>
    </tr>
  <?php endif; ?>

<?php endif; ?>
<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_crmScope($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>