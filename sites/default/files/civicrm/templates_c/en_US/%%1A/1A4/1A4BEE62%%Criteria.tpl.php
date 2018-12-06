<?php /* Smarty version 2.6.30, created on 2018-12-03 09:40:15
         compiled from CRM/Report/Form/Criteria.tpl */ ?>
<?php require_once(SMARTY_CORE_DIR . 'core.load_plugins.php');
smarty_core_load_plugins(array('plugins' => array(array('block', 'crmScope', 'CRM/Report/Form/Criteria.tpl', 1, false),array('block', 'crmRegion', 'CRM/Report/Form/Criteria.tpl', 31, false),array('modifier', 'cat', 'CRM/Report/Form/Criteria.tpl', 29, false),)), $this); ?>
<?php $this->_tag_stack[] = array('crmScope', array('extensionKey' => "")); $_block_repeat=true;smarty_block_crmScope($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>
<?php $_from = $this->_tpl_vars['tabs']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['tab']):
?>
  <?php $this->assign('region', ((is_array($_tmp="report-tab")) ? $this->_run_mod_handler('cat', true, $_tmp, $this->_tpl_vars['tab']['div_label']) : smarty_modifier_cat($_tmp, $this->_tpl_vars['tab']['div_label']))); ?>
  <?php $this->assign('fileName', ((is_array($_tmp=((is_array($_tmp="CRM/Report/Form/Tabs/")) ? $this->_run_mod_handler('cat', true, $_tmp, $this->_tpl_vars['tab']['tpl']) : smarty_modifier_cat($_tmp, $this->_tpl_vars['tab']['tpl'])))) ? $this->_run_mod_handler('cat', true, $_tmp, ".tpl") : smarty_modifier_cat($_tmp, ".tpl"))); ?>
  <?php $this->_tag_stack[] = array('crmRegion', array('name' => $this->_tpl_vars['region'])); $_block_repeat=true;smarty_block_crmRegion($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>
    <?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => $this->_tpl_vars['fileName'], 'smarty_include_vars' => array()));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?>
  <?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_crmRegion($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>
<?php endforeach; endif; unset($_from); ?>

<?php echo '
  <script type="text/javascript">
'; ?>

<?php $_from = $this->_tpl_vars['filters']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['tableName'] => $this->_tpl_vars['table']):
?>
  <?php $_from = $this->_tpl_vars['table']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['fieldName'] => $this->_tpl_vars['field']):
?>
    <?php echo 'var val = "dnc";'; ?>

    <?php $this->assign('fieldOp', ((is_array($_tmp=$this->_tpl_vars['fieldName'])) ? $this->_run_mod_handler('cat', true, $_tmp, '_op') : smarty_modifier_cat($_tmp, '_op'))); ?>
    <?php if (! ( $this->_tpl_vars['field']['operatorType'] & 4 ) && ! $this->_tpl_vars['field']['no_display'] && $this->_tpl_vars['form'][$this->_tpl_vars['fieldOp']]['html']): ?>
      <?php echo 'var val = document.getElementById("'; ?>
<?php echo $this->_tpl_vars['fieldOp']; ?>
<?php echo '").value;'; ?>

    <?php endif; ?>
    <?php echo 'showHideMaxMinVal( "'; ?>
<?php echo $this->_tpl_vars['fieldName']; ?>
<?php echo '", val );'; ?>

  <?php endforeach; endif; unset($_from); ?>
<?php endforeach; endif; unset($_from); ?>

<?php echo '
  function showHideMaxMinVal( field, val ) {
    var fldVal    = field + "_value_cell";
    var fldMinMax = field + "_min_max_cell";
    if ( val == "bw" || val == "nbw" ) {
      cj(\'#\' + fldVal ).hide();
      cj(\'#\' + fldMinMax ).show();
    } else if (val =="nll" || val == "nnll") {
      cj(\'#\' + fldVal).hide() ;
      cj(\'#\' + field + \'_value\').val(\'\');
      cj(\'#\' + fldMinMax ).hide();
    } else {
      cj(\'#\' + fldVal ).show();
      cj(\'#\' + fldMinMax ).hide();
    }
  }

  CRM.$(function($) {
    $(\'.crm-report-criteria-groupby input:checkbox\').click(function() {
      $(\'#fields_\' + this.id.substr(10)).prop(\'checked\', this.checked);
    });
    '; ?>
<?php if ($this->_tpl_vars['displayToggleGroupByFields']): ?><?php echo '
      $(\'.crm-report-criteria-field input:checkbox\').click(function() {
        $(\'#group_bys_\' + this.id.substr(7)).prop(\'checked\', this.checked);
      });
      '; ?>
<?php endif; ?><?php echo '
    });
  </script>
'; ?>

<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_crmScope($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>