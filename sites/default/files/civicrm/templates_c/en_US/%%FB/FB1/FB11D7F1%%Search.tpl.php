<?php /* Smarty version 2.6.30, created on 2018-12-03 09:51:47
         compiled from CRM/Custom/Form/Search.tpl */ ?>
<?php require_once(SMARTY_CORE_DIR . 'core.load_plugins.php');
smarty_core_load_plugins(array('plugins' => array(array('block', 'crmScope', 'CRM/Custom/Form/Search.tpl', 1, false),array('modifier', 'cat', 'CRM/Custom/Form/Search.tpl', 37, false),array('modifier', 'crmAddClass', 'CRM/Custom/Form/Search.tpl', 45, false),)), $this); ?>
<?php $this->_tag_stack[] = array('crmScope', array('extensionKey' => "")); $_block_repeat=true;smarty_block_crmScope($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?><?php if ($this->_tpl_vars['groupTree']): ?>
<?php $_from = $this->_tpl_vars['groupTree']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['group_id'] => $this->_tpl_vars['cd_edit']):
?>

  <div class="crm-accordion-wrapper crm-contactDetails-accordion <?php if ($this->_tpl_vars['form']['formName'] == 'Advanced' && $this->_tpl_vars['cd_edit']['collapse_adv_display'] == 1): ?>collapsed<?php endif; ?>" id="<?php echo $this->_tpl_vars['cd_edit']['name']; ?>
" >
    <div class="crm-accordion-header">
        <?php echo $this->_tpl_vars['cd_edit']['title']; ?>

    </div>
    <div class="crm-accordion-body">
    <table class="form-layout-compressed">
    <?php $_from = $this->_tpl_vars['cd_edit']['fields']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['field_id'] => $this->_tpl_vars['element']):
?>
            <?php $this->assign('type', ($this->_tpl_vars['element']['html_type'])); ?>
            <?php $this->assign('element_name', ((is_array($_tmp='custom_')) ? $this->_run_mod_handler('cat', true, $_tmp, $this->_tpl_vars['field_id']) : smarty_modifier_cat($_tmp, $this->_tpl_vars['field_id']))); ?>
            <?php $this->assign('operator_name', ((is_array($_tmp=((is_array($_tmp='custom_')) ? $this->_run_mod_handler('cat', true, $_tmp, $this->_tpl_vars['field_id']) : smarty_modifier_cat($_tmp, $this->_tpl_vars['field_id'])))) ? $this->_run_mod_handler('cat', true, $_tmp, '_operator') : smarty_modifier_cat($_tmp, '_operator'))); ?>
            <?php if ($this->_tpl_vars['element']['is_search_range']): ?>
                <?php $this->assign('element_name_from', ((is_array($_tmp=$this->_tpl_vars['element_name'])) ? $this->_run_mod_handler('cat', true, $_tmp, '_from') : smarty_modifier_cat($_tmp, '_from'))); ?>
                <?php $this->assign('element_name_to', ((is_array($_tmp=$this->_tpl_vars['element_name'])) ? $this->_run_mod_handler('cat', true, $_tmp, '_to') : smarty_modifier_cat($_tmp, '_to'))); ?>
                <tr>
                  <?php if ($this->_tpl_vars['element']['data_type'] != 'Date'): ?>
                    <td class="label"><?php echo $this->_tpl_vars['form'][$this->_tpl_vars['element_name_from']]['label']; ?>
</td><td>
                    <?php echo ((is_array($_tmp=$this->_tpl_vars['form'][$this->_tpl_vars['element_name_from']]['html'])) ? $this->_run_mod_handler('crmAddClass', true, $_tmp, 'six') : smarty_modifier_crmAddClass($_tmp, 'six')); ?>

                    &nbsp;&nbsp;<?php echo $this->_tpl_vars['form'][$this->_tpl_vars['element_name_to']]['label']; ?>
&nbsp;&nbsp;<?php echo ((is_array($_tmp=$this->_tpl_vars['form'][$this->_tpl_vars['element_name_to']]['html'])) ? $this->_run_mod_handler('crmAddClass', true, $_tmp, 'six') : smarty_modifier_crmAddClass($_tmp, 'six')); ?>

                  <?php elseif ($this->_tpl_vars['element']['skip_calendar'] != true): ?>
                    <td class="label"><label for='<?php echo $this->_tpl_vars['element_name']; ?>
'><?php echo $this->_tpl_vars['element']['label']; ?>
</label>
                    <?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "CRM/Core/DateRange.tpl", 'smarty_include_vars' => array('fieldName' => $this->_tpl_vars['element_name'],'from' => '_from','to' => '_to')));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?></td><td>
                  <?php endif; ?>
            <?php else: ?>
                <td class="label"><?php echo $this->_tpl_vars['form'][$this->_tpl_vars['element_name']]['label']; ?>
</td><td>
                  <?php echo $this->_tpl_vars['form'][$this->_tpl_vars['element_name']]['html']; ?>

                <?php if (! empty ( $this->_tpl_vars['form'][$this->_tpl_vars['operator_name']] )): ?>
                  <span class="crm-multivalue-search-op" for="<?php echo $this->_tpl_vars['element_name']; ?>
"><?php echo $this->_tpl_vars['form'][$this->_tpl_vars['operator_name']]['html']; ?>
</span>
                  <?php $this->assign('add_multivalue_js', true); ?>
                <?php endif; ?>
            <?php endif; ?>
            <?php if ($this->_tpl_vars['element']['html_type'] == 'Autocomplete-Select'): ?>
                <?php if ($this->_tpl_vars['element']['data_type'] == 'ContactReference'): ?>
                    <?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "CRM/Custom/Form/ContactReference.tpl", 'smarty_include_vars' => array()));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?>
                <?php endif; ?>
            <?php endif; ?>
            </td>
          </tr>
      <?php endforeach; endif; unset($_from); ?>
     </table>
    </div><!-- /.crm-accordion-body -->
  </div><!-- /.crm-accordion-wrapper -->

<?php endforeach; endif; unset($_from); ?>
  <?php if (! empty ( $this->_tpl_vars['add_multivalue_js'] )): ?>
    <?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "CRM/Custom/Form/MultiValueSearch.js.tpl", 'smarty_include_vars' => array()));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?>
  <?php endif; ?>
<?php endif; ?>

<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_crmScope($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>