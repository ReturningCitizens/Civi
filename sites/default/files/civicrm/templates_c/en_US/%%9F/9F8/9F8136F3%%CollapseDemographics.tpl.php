<?php /* Smarty version 2.6.30, created on 2018-12-03 09:36:16
         compiled from CRM/Collapsecommsanddemographics/Page/CollapseDemographics.tpl */ ?>
<?php require_once(SMARTY_CORE_DIR . 'core.load_plugins.php');
smarty_core_load_plugins(array('plugins' => array(array('block', 'crmScope', 'CRM/Collapsecommsanddemographics/Page/CollapseDemographics.tpl', 1, false),array('block', 'ts', 'CRM/Collapsecommsanddemographics/Page/CollapseDemographics.tpl', 3, false),)), $this); ?>
<?php $this->_tag_stack[] = array('crmScope', array('extensionKey' => "")); $_block_repeat=true;smarty_block_crmScope($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?><div class="collapsedcommsanddemos ccnd-demos crm-collapsible collapsed ui-corner-all">
    <div class="collapsible-title">
        <?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Demographics<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?><span class="ccnd_demo_extra_content"> <span
                    class="crm-i <?php if ($this->_tpl_vars['ccnd_show_gender_icon'] == $this->_tpl_vars['ccnd_gender_options']['2']): ?>fa-male<?php elseif ($this->_tpl_vars['ccnd_show_gender_icon'] == $this->_tpl_vars['ccnd_gender_options']['1']): ?>fa-female<?php endif; ?>"></span>
            <span class="ccnd-demos-age"><?php if ($this->_tpl_vars['ccnd_show_age']): ?> <?php echo $this->_tpl_vars['ccnd_show_age']; ?>
<?php endif; ?></span> </span>
    </div>
    <div class="crm-summary-demographic-block">
        <div class="crm-summary-block" id="demographic-block">
            <?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "CRM/Contact/Page/Inline/Demographics.tpl", 'smarty_include_vars' => array()));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?>
        </div>
    </div>
</div>
<?php echo '
<script>
    CRM.$(function () {
        CRM.$("#demographic-block").on("crmLoad", function (event, data) {
            var gender_display = CRM.$(".crm-contact-gender_display").text().trim();
            var birthdate = CRM.$(".crm-contact-birth_date_display").text().trim();
            var deceased = CRM.$(".crm-contact-deceased_message").text().trim();
            var deceased_date = CRM.$(".crm-contact-deceased_date_display").text().trim();
            if (gender_display == \''; ?>
<?php echo $this->_tpl_vars['ccnd_gender_options']['2']; ?>
<?php echo '\') {
                CRM.$(".ccnd-demos .ccnd_demo_extra_content span.crm-i").removeClass("fa-female").addClass("fa-male");
            } else if (gender_display == \''; ?>
<?php echo $this->_tpl_vars['ccnd_gender_options']['1']; ?>
<?php echo '\') {
                CRM.$(".ccnd-demos .ccnd_demo_extra_content span.crm-i").removeClass("fa-male").addClass("fa-female");
            } else {
                CRM.$(".ccnd-demos .ccnd_demo_extra_content span.crm-i").removeClass("fa-male fa-female");
            }
            if (birthdate != "" && deceased == "" && deceased_date == "") {
                // remove date suffix
                var mapObj = {
                    nd: "",
                    st: "",
                    th: "",
                    rd: ""
                };
                birthdate = birthdate.replace(/nd|st|th|rd/gi, function (matched) {
                    return mapObj[matched];
                });
                var dob = new Date(birthdate);
                var today = new Date();
                var age = Math.floor((today - dob) / (365.25 * 24 * 60 * 60 * 1000));
                CRM.$(".ccnd-demos-age").text(age);
            } else {
                CRM.$(".ccnd-demos-age").text("");
            }
        });
    });
</script>
'; ?>
<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_crmScope($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>