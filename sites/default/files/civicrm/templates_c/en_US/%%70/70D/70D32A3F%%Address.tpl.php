<?php /* Smarty version 2.6.30, created on 2018-12-04 11:34:09
         compiled from CRM/Contact/Form/Inline/Address.tpl */ ?>
<?php require_once(SMARTY_CORE_DIR . 'core.load_plugins.php');
smarty_core_load_plugins(array('plugins' => array(array('block', 'crmScope', 'CRM/Contact/Form/Inline/Address.tpl', 1, false),array('block', 'ts', 'CRM/Contact/Form/Inline/Address.tpl', 35, false),)), $this); ?>
<?php $this->_tag_stack[] = array('crmScope', array('extensionKey' => "")); $_block_repeat=true;smarty_block_crmScope($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?><?php echo $this->_tpl_vars['form']['oplock_ts']['html']; ?>

  <table class="form-layout crm-edit-address-form crm-inline-edit-form">
    <tr>
      <td>
        <div class="crm-submit-buttons">
          <?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "CRM/common/formButtons.tpl", 'smarty_include_vars' => array()));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?>
          <?php if ($this->_tpl_vars['addressId']): ?>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <a class="button delete-button" href="#" style="display:inline-block;float:none;"><div class="icon delete-icon"></div> <?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Delete<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></a>
          <?php endif; ?>
        </div>
      </td>
    </tr>
     <tr>
        <td>
           <span class="crm-address-element location_type_id-address-element">
            <?php echo $this->_tpl_vars['form']['address'][$this->_tpl_vars['blockId']]['location_type_id']['label']; ?>
&nbsp;<?php echo $this->_tpl_vars['form']['address'][$this->_tpl_vars['blockId']]['location_type_id']['html']; ?>

            </span>
        </td>
     </tr>
     <tr>
        <td>
           <span class="crm-address-element is_primary-address-element"><?php echo $this->_tpl_vars['form']['address'][$this->_tpl_vars['blockId']]['is_primary']['html']; ?>
</span>
           <span class="crm-address-element is_billing-address-element"><?php echo $this->_tpl_vars['form']['address'][$this->_tpl_vars['blockId']]['is_billing']['html']; ?>
</span>
        </td>
     </tr>

          <?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "CRM/Contact/Form/ShareAddress.tpl", 'smarty_include_vars' => array()));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?>

     <tr>
      <td>
        <table id="address_table_<?php echo $this->_tpl_vars['blockId']; ?>
" class="form-layout-compressed">
                      <?php $_from = $this->_tpl_vars['addressSequence']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['addressElement']):
?>
            <?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "CRM/Contact/Form/Edit/Address/".($this->_tpl_vars['addressElement']).".tpl", 'smarty_include_vars' => array()));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?>
           <?php endforeach; endif; unset($_from); ?>
           <?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "CRM/Contact/Form/Edit/Address/geo_code.tpl", 'smarty_include_vars' => array()));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?>
       </table>
      </td>
     </tr>
  </table>

  <div class="crm-edit-address-custom_data crm-inline-edit-form crm-address-custom-set-block-<?php echo $this->_tpl_vars['blockId']; ?>
">
    <?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "CRM/Contact/Form/Edit/Address/CustomData.tpl", 'smarty_include_vars' => array()));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?>
  </div>
<?php echo '
<script type="text/javascript">
  '; ?>
<?php echo '
  cj(\'#address_'; ?>
<?php echo $this->_tpl_vars['blockId']; ?>
<?php echo '_location_type_id\').change(function() {
    var ele = cj(this);
    var lt = ele.val();
    var container = ele.closest(\'div.crm-inline-edit.address\');
    container.data(\'location-type-id\', \'\');
    var ok = true;
    if (lt != \'\') {
      cj(\'.crm-inline-edit.address\').each(function() {
        if (ok && cj(this).data(\'location-type-id\') == lt) {
          var label = cj(\'option:selected\', ele).text();
          ele.select2(\'val\', \'\');
          ele.crmError(label + "'; ?>
 <?php $this->_tag_stack[] = array('ts', array('escape' => 'js')); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>has already been assigned to another address. Please select another location for this address.<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>"<?php echo ');
          ok = false;
        }
      });
      if (ok) {
        container.data(\'location-type-id\', lt);
      }
    }
  });
  '; ?>
<?php echo '
  cj(\':checkbox[id*="[is_primary"]\', \'form[name=Address_'; ?>
<?php echo $this->_tpl_vars['blockId']; ?>
<?php echo ']\').change(function() {
    if (this.defaultChecked) {
      cj(this).crmError("'; ?>
 <?php $this->_tag_stack[] = array('ts', array('escape' => 'js')); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Please choose another address to be primary before changing this one.<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?><?php echo '");
      cj(this).prop(\'checked\', true);
    }
  });
  '; ?>
<?php echo '
  cj(\':submit[name$=cancel]\', \'form[name=Address_'; ?>
<?php echo $this->_tpl_vars['blockId']; ?>
<?php echo ']\').click(function() {
    var container = cj(this).closest(\'div.crm-inline-edit.address\');
    var origValue = container.attr(\'data-location-type-id\') || \'\';
    container.data(\'location-type-id\', origValue);
  });
  '; ?>

  <?php if ($this->_tpl_vars['masterAddress'][$this->_tpl_vars['blockId']]): ?>
    CRM.alert('<?php $this->_tag_stack[] = array('ts', array('escape' => 'js','1' => $this->_tpl_vars['masterAddress'][$this->_tpl_vars['blockId']])); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>This address is shared with %1 contact record(s). Modifying this address will automatically update the shared address for these contacts.<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>', '<?php $this->_tag_stack[] = array('ts', array('escape' => 'js')); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Editing Master Address<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>', 'info', {expires: 0});
  <?php endif; ?>
</script>
<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_crmScope($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>