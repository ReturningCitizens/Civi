<?php /* Smarty version 2.6.30, created on 2018-12-03 09:37:04
         compiled from CRM/Contact/Form/Edit/Demographics.tpl */ ?>
<?php require_once(SMARTY_CORE_DIR . 'core.load_plugins.php');
smarty_core_load_plugins(array('plugins' => array(array('block', 'crmScope', 'CRM/Contact/Form/Edit/Demographics.tpl', 1, false),)), $this); ?>
<?php $this->_tag_stack[] = array('crmScope', array('extensionKey' => "")); $_block_repeat=true;smarty_block_crmScope($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?><div class="crm-accordion-wrapper crm-demographics-accordion collapsed">
 <div class="crm-accordion-header">
    <?php echo $this->_tpl_vars['title']; ?>

  </div><!-- /.crm-accordion-header -->
  <div id="demographics" class="crm-accordion-body">
  <div class="form-item">
        <span class="label"><?php echo $this->_tpl_vars['form']['gender_id']['label']; ?>
</span>

  <span class="value">
        <?php echo $this->_tpl_vars['form']['gender_id']['html']; ?>

        </span>
  </div>
  <div class="form-item">
        <span class="label"><?php echo $this->_tpl_vars['form']['birth_date']['label']; ?>
</span>
        <span class="fields"><?php echo $this->_tpl_vars['form']['birth_date']['html']; ?>
</span>
  </div>
  <div class="form-item">
       <?php echo $this->_tpl_vars['form']['is_deceased']['html']; ?>

       <?php echo $this->_tpl_vars['form']['is_deceased']['label']; ?>

  </div>
  <div id="showDeceasedDate" class="form-item">
       <span class="label"><?php echo $this->_tpl_vars['form']['deceased_date']['label']; ?>
</span>
       <span class="fields"><?php echo $this->_tpl_vars['form']['deceased_date']['html']; ?>
</span>
  </div>
  <?php if (isset ( $this->_tpl_vars['demographics_groupTree'] )): ?><?php $_from = $this->_tpl_vars['demographics_groupTree']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['group_id'] => $this->_tpl_vars['cd_edit']):
?>
     <?php $_from = $this->_tpl_vars['cd_edit']['fields']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['field_id'] => $this->_tpl_vars['element']):
?>
        <table class="form-layout-compressed">
        <?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "CRM/Custom/Form/CustomField.tpl", 'smarty_include_vars' => array()));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?>
        </table>
     <?php endforeach; endif; unset($_from); ?>
  <?php endforeach; endif; unset($_from); ?><?php endif; ?>
 </div><!-- /.crm-accordion-body -->
</div><!-- /.crm-accordion-wrapper -->

<?php echo '
<script type="text/javascript">
    showDeceasedDate( );
    function showDeceasedDate( )
    {
        if ( cj("#is_deceased").is(\':checked\') ) {
            cj("#showDeceasedDate").show( );
        } else {
    cj("#showDeceasedDate").hide( );
         cj("#deceased_date").val(\'\');
        }
    }
</script>
'; ?>

<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_crmScope($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>