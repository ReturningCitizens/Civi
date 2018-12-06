<?php /* Smarty version 2.6.30, created on 2018-12-03 09:36:16
         compiled from CRM/Collapsecommsanddemographics/Page/CollapseComms.tpl */ ?>
<?php require_once(SMARTY_CORE_DIR . 'core.load_plugins.php');
smarty_core_load_plugins(array('plugins' => array(array('block', 'crmScope', 'CRM/Collapsecommsanddemographics/Page/CollapseComms.tpl', 1, false),array('block', 'ts', 'CRM/Collapsecommsanddemographics/Page/CollapseComms.tpl', 3, false),array('modifier', 'lower', 'CRM/Collapsecommsanddemographics/Page/CollapseComms.tpl', 60, false),)), $this); ?>
<?php $this->_tag_stack[] = array('crmScope', array('extensionKey' => "")); $_block_repeat=true;smarty_block_crmScope($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?><div class="collapsedcommsanddemos ccnd-comms crm-collapsible collapsed ui-corner-all">
    <div class="collapsible-title">
        <?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Communication Preferences<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>
        <span class="ccnd_demo_extra_content">
            <?php $_from = $this->_tpl_vars['privacy']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['privacy_key'] => $this->_tpl_vars['value']):
?>
                <?php if ($this->_tpl_vars['privacy_key'] == 'do_not_phone' && $this->_tpl_vars['value'] == 1): ?>
                    <span class="crm-i fa-phone" title="Do Not Phone"></span>

                <?php elseif ($this->_tpl_vars['privacy_key'] == 'do_not_email' && $this->_tpl_vars['value'] == 1): ?>

                    <span class="crm-i fa-envelope-o" title="Do Not Email"></span>

                <?php elseif ($this->_tpl_vars['privacy_key'] == 'do_not_mail' && $this->_tpl_vars['value'] == 1): ?>

                    <span class="crm-i fa-file-text-o" title="Do Not Mail"></span>

                <?php elseif ($this->_tpl_vars['privacy_key'] == 'do_not_sms' && $this->_tpl_vars['value'] == 1): ?>

                    <span class="crm-i fa-whatsapp" title="Do Not SMS"></span>

                <?php elseif ($this->_tpl_vars['privacy_key'] == 'do_not_trade' && $this->_tpl_vars['value'] == 1): ?>

                    <span class="crm-i fa-handshake-o" title="Do Not Trade"></span>
                <?php endif; ?>
            <?php endforeach; endif; unset($_from); ?>
            <?php if ($this->_tpl_vars['is_opt_out']): ?>
                <span class="icon privacy-flag" title="No Bulk Emails"></span>
            <?php endif; ?>
        </span>
    </div>
    <div class="crm-summary-comm-pref-block">
        <div class="crm-summary-block" id="communication-pref-block">
            <?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "CRM/Contact/Page/Inline/CommunicationPreferences.tpl", 'smarty_include_vars' => array()));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?>
        </div>
    </div>
</div>
<?php echo '
    <style>
        .collapsedcommsanddemos.ccnd-comms .ccnd_demo_extra_content {
            display: inline-block;
        }

        .collapsedcommsanddemos.ccnd-comms .ccnd_demo_extra_content .crm-i,
        .collapsedcommsanddemos.ccnd-comms .ccnd_demo_extra_content .icon.privacy-flag {
            margin: 0 0 0 3px;
            padding: 0;
            color: red;
            float: none !important;
            vertical-align: middle;
        }
    </style>
<script>
    CRM.$(function () {
        CRM.$("#communication-pref-block").on("crmLoad", function (event, data) {
            var privacy_values = CRM.$(".crm-contact-privacy_values").html().replace(/ +/g, \' \').trim();
            privacy_values = privacy_values.split("<br>");
            var newSigns = \'\';
            CRM.$.each(privacy_values, function (index, item) {
                item = item.trim().toLowerCase();
                if (item == \''; ?>
<?php echo ((is_array($_tmp=$this->_tpl_vars['ccnd_privacy_options']['do_not_phone'])) ? $this->_run_mod_handler('lower', true, $_tmp) : smarty_modifier_lower($_tmp)); ?>
<?php echo '\') {
                    newSigns += \'<span class="crm-i fa-phone" title="Do Not Phone"></span> \';
                } else if (item == \''; ?>
<?php echo ((is_array($_tmp=$this->_tpl_vars['ccnd_privacy_options']['do_not_email'])) ? $this->_run_mod_handler('lower', true, $_tmp) : smarty_modifier_lower($_tmp)); ?>
<?php echo '\') {
                    newSigns += \'<span class="crm-i fa-envelope-o" title="Do Not Email"></span> \';
                } else if (item == \''; ?>
<?php echo ((is_array($_tmp=$this->_tpl_vars['ccnd_privacy_options']['do_not_mail'])) ? $this->_run_mod_handler('lower', true, $_tmp) : smarty_modifier_lower($_tmp)); ?>
<?php echo '\') {
                    newSigns += \'<span class="crm-i fa-file-text-o" title="Do Not Mail"></span> \';
                } else if (item == \''; ?>
<?php echo ((is_array($_tmp=$this->_tpl_vars['ccnd_privacy_options']['do_not_sms'])) ? $this->_run_mod_handler('lower', true, $_tmp) : smarty_modifier_lower($_tmp)); ?>
<?php echo '\') {
                    newSigns += \'<span class="crm-i fa-whatsapp" title="Do Not SMS"></span> \';
                } else if (item == \''; ?>
<?php echo ((is_array($_tmp=$this->_tpl_vars['ccnd_privacy_options']['do_not_trade'])) ? $this->_run_mod_handler('lower', true, $_tmp) : smarty_modifier_lower($_tmp)); ?>
<?php echo '\') {
                    newSigns += \'<span class="crm-i fa-handshake-o" title="Do Not Trade"></span> \';
                } else if (item == \''; ?>
<?php echo ((is_array($_tmp=$this->_tpl_vars['ccnd_privacy_options']['is_opt_out'])) ? $this->_run_mod_handler('lower', true, $_tmp) : smarty_modifier_lower($_tmp)); ?>
<?php echo '\') {
                    newSigns += \'<span class="icon privacy-flag" title="No Bulk Emails"></span> \';
                }
            });
            CRM.$(".collapsedcommsanddemos.ccnd-comms .ccnd_demo_extra_content").html(newSigns);
        });
    });
</script>
'; ?>
<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_crmScope($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>