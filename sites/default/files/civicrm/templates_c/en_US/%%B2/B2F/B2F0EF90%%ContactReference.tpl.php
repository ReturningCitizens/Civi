<?php /* Smarty version 2.6.30, created on 2018-12-03 09:51:47
         compiled from CRM/Custom/Form/ContactReference.tpl */ ?>
<?php require_once(SMARTY_CORE_DIR . 'core.load_plugins.php');
smarty_core_load_plugins(array('plugins' => array(array('block', 'crmScope', 'CRM/Custom/Form/ContactReference.tpl', 1, false),array('block', 'ts', 'CRM/Custom/Form/ContactReference.tpl', 34, false),array('modifier', 'replace', 'CRM/Custom/Form/ContactReference.tpl', 31, false),)), $this); ?>
<?php $this->_tag_stack[] = array('crmScope', array('extensionKey' => "")); $_block_repeat=true;smarty_block_crmScope($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?><?php if (empty ( $this->_tpl_vars['form'][$this->_tpl_vars['element_name']]['frozen'] )): ?>
<?php echo '
<script type="text/javascript">
  CRM.$(function($) {
    var $field = $("'; ?>
#<?php echo ((is_array($_tmp=((is_array($_tmp=$this->_tpl_vars['element_name'])) ? $this->_run_mod_handler('replace', true, $_tmp, ']', '') : smarty_modifier_replace($_tmp, ']', '')))) ? $this->_run_mod_handler('replace', true, $_tmp, '[', '_') : smarty_modifier_replace($_tmp, '[', '_')); ?>
<?php echo '");

    $field.crmSelect2({
      placeholder: '; ?>
'<?php $this->_tag_stack[] = array('ts', array('escape' => 'js')); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>- select contact -<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>'<?php echo ',
      minimumInputLength: 1,
      ajax: {
        url: '; ?>
"<?php echo $this->_tpl_vars['customUrls'][$this->_tpl_vars['element_name']]; ?>
"<?php echo ',
        quietMillis: 300,
        data: function(term) {
          return {term: term};
        },
        results: function(response) {
          return {results: response};
        }
      },
      initSelection: function($el, callback) {
        callback($el.data(\'entity-value\'));
      }
    });
});
</script>
'; ?>

<?php endif; ?>
<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_crmScope($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>