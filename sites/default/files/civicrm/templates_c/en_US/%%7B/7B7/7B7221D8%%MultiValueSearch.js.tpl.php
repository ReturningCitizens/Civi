<?php /* Smarty version 2.6.30, created on 2018-12-03 09:51:48
         compiled from CRM/Custom/Form/MultiValueSearch.js.tpl */ ?>
<?php require_once(SMARTY_CORE_DIR . 'core.load_plugins.php');
smarty_core_load_plugins(array('plugins' => array(array('block', 'crmScope', 'CRM/Custom/Form/MultiValueSearch.js.tpl', 1, false),)), $this); ?>
<?php $this->_tag_stack[] = array('crmScope', array('extensionKey' => "")); $_block_repeat=true;smarty_block_crmScope($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?><?php echo '
  <script type="text/javascript">
    CRM.$(function($) {
      function showHideOperator() {
        var val = $(this).val();
        $(this).siblings("span.crm-multivalue-search-op").toggle(!!(val && val.length > 1));
      }
      $("span.crm-multivalue-search-op").siblings(\'select\')
        .off(\'.crmMultiValue\')
        .on(\'change.crmMultiValue\', showHideOperator)
        .each(showHideOperator);
    });
  </script>
'; ?>

<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_crmScope($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>