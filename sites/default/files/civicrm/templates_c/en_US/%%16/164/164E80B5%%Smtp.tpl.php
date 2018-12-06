<?php /* Smarty version 2.6.30, created on 2018-12-06 11:01:24
         compiled from CRM/Admin/Form/Setting/Smtp.tpl */ ?>
<?php require_once(SMARTY_CORE_DIR . 'core.load_plugins.php');
smarty_core_load_plugins(array('plugins' => array(array('block', 'crmScope', 'CRM/Admin/Form/Setting/Smtp.tpl', 1, false),array('block', 'ts', 'CRM/Admin/Form/Setting/Smtp.tpl', 28, false),array('block', 'crmRegion', 'CRM/Admin/Form/Setting/Smtp.tpl', 36, false),array('function', 'help', 'CRM/Admin/Form/Setting/Smtp.tpl', 32, false),)), $this); ?>
<?php $this->_tag_stack[] = array('crmScope', array('extensionKey' => "")); $_block_repeat=true;smarty_block_crmScope($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?><div class="crm-block crm-form-block crm-smtp-form-block">
  <div>
  <h3><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>General<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></h3>
     <table class="form-layout-compressed">
       <tr class="crm-smtp-form-block-allow_mail_from_logged_in_contact">
         <td class="label"><?php echo $this->_tpl_vars['form']['allow_mail_from_logged_in_contact']['html']; ?>
</td>
         <td><?php echo $this->_tpl_vars['form']['allow_mail_from_logged_in_contact']['label']; ?>
 <?php echo smarty_function_help(array('id' => 'allow_mail_contact_email'), $this);?>
</td>
       </tr>
     </table>
  </div>
  <?php $this->_tag_stack[] = array('crmRegion', array('name' => "smtp-mailer-config")); $_block_repeat=true;smarty_block_crmRegion($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>
  <div class="crm-smtp-mailer-form-block">
  <h3><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Mailer Configuration<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></h3>
  <div class="help">
    <p><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>CiviCRM offers several options to send emails. You can send a test email to check your settings by clicking "Save and Send Test Email". If you're unsure of the correct values, check with your system administrator, ISP or hosting provider.<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></p>
    <p><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>If you do not want users to send outbound mail from CiviCRM, select "Disable Outbound Email". NOTE: If you disable outbound email, and you are using Online Contribution pages or online Event Registration - you will need to disable automated receipts and registration confirmations.<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></p>
    <p><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>If you choose Redirect to Database, all emails will be recorded as archived mailings instead of being sent out. They can be found in the civicrm_mailing_spool table in the CiviCRM database.<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></p>
  </div>
     <table>
           <tr class="crm-smtp-form-block-outBound_option">
              <td class="label"><?php echo $this->_tpl_vars['form']['outBound_option']['label']; ?>
</td>
              <td><?php echo $this->_tpl_vars['form']['outBound_option']['html']; ?>
</td>
           </tr>
        </table>
            <div id="bySMTP" class="mailoption">
            <fieldset>
                <legend><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>SMTP Configuration<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></legend>
                <table class="form-layout-compressed">
                    <tr class="crm-smtp-form-block-smtpServer">
                       <td class="label"><?php echo $this->_tpl_vars['form']['smtpServer']['label']; ?>
</td>
                       <td><?php echo $this->_tpl_vars['form']['smtpServer']['html']; ?>
<br  />
                            <span class="description"><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Enter the SMTP server (machine) name, such as "smtp.example.com".  If the server uses SSL, add "ssl://" to the beginning of the server name, such as "ssl://smtp.example.com".<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></span>
                       </td>
                    </tr>
                    <tr class="crm-smtp-form-block-smtpPort">
                       <td class="label"><?php echo $this->_tpl_vars['form']['smtpPort']['label']; ?>
</td>
                       <td><?php echo $this->_tpl_vars['form']['smtpPort']['html']; ?>
<br />
                           <span class="description"><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>The most common SMTP port possibilities are 25, 465, and 587.  Check with your mail provider for the appropriate one.<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></span>
                       </td>
                    </tr>
                    <tr class="crm-smtp-form-block-smtpAuth">
                       <td class="label"><?php echo $this->_tpl_vars['form']['smtpAuth']['label']; ?>
</td>
                       <td><?php echo $this->_tpl_vars['form']['smtpAuth']['html']; ?>
<br />
                         <span class="description"><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Does your SMTP server require authentication (user name + password)?<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></span>
                       </td>
                    </tr>
                    <tr class="crm-smtp-form-block-smtpUsername">
                       <td class="label"><?php echo $this->_tpl_vars['form']['smtpUsername']['label']; ?>
</td>
                       <td><?php echo $this->_tpl_vars['form']['smtpUsername']['html']; ?>
</td>
                    </tr>
                    <tr class="crm-smtp-form-block-smtpPassword">
                       <td class="label"><?php echo $this->_tpl_vars['form']['smtpPassword']['label']; ?>
</td>
                       <td><?php echo $this->_tpl_vars['form']['smtpPassword']['html']; ?>
<br />
                           <span class="description"><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>If your SMTP server requires authentication, enter your Username and Password here.<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></span>
                       </td>
                    </tr>
                </table>
           </fieldset>
        </div>
        <div id="bySendmail" class="mailoption">
            <fieldset>
                <legend><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Sendmail Configuration<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></legend>
                   <table class="form-layout-compressed">
                     <tr class="crm-smtp-form-block-sendmail_path">
                        <td class="label"><?php echo $this->_tpl_vars['form']['sendmail_path']['label']; ?>
</td>
                        <td><?php echo $this->_tpl_vars['form']['sendmail_path']['html']; ?>
<br />
                            <span class="description"><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Enter the Sendmail Path. EXAMPLE: /usr/sbin/sendmail<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></span>
                        </td>
                     </tr>
                     <tr class="crm-smtp-form-block-sendmail_args">
                        <td class="label"><?php echo $this->_tpl_vars['form']['sendmail_args']['label']; ?>
</td>
                        <td><?php echo $this->_tpl_vars['form']['sendmail_args']['html']; ?>
</td>
                     </tr>
                    </table>
            </fieldset>
        </div>
        <div class="spacer"></div>
        <div class="crm-submit-buttons">
            <?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "CRM/common/formButtons.tpl", 'smarty_include_vars' => array()));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?>
        </div>

<?php echo '
<script type="text/javascript">
    CRM.$(function($) {
      var mailSetting = $("input[name=\'outBound_option\']:checked").val( );

      var archiveWarning = "'; ?>
<?php $this->_tag_stack[] = array('ts', array('escape' => 'js')); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>WARNING: You are switching from a testing mode (Redirect to Database) to a live mode. Check Mailings > Archived Mailings, and delete any test mailings that are not in Completed status prior to running the mailing cron job for the first time. This will ensure that test mailings are not actually sent out.<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?><?php echo '"

        showHideMailOptions( $("input[name=\'outBound_option\']:checked").val( ) ) ;

        function showHideMailOptions( value ) {
            switch( value ) {
              case "0":
                $("#bySMTP").show( );
                $("#bySendmail").hide( );
                $("#_qf_Smtp_refresh_test").prop(\'disabled\', false);
                if (mailSetting == \'5\') {
                  alert(archiveWarning);
                }
              break;
              case "1":
                $("#bySMTP").hide( );
                $("#bySendmail").show( );
                $("#_qf_Smtp_refresh_test").prop(\'disabled\', false);
                if (mailSetting == \'5\') {
                  alert(archiveWarning);
                }
              break;
              case "3":
                $(\'.mailoption\').hide();
                $("#_qf_Smtp_refresh_test").prop(\'disabled\', false);
                if (mailSetting == \'5\') {
                  alert(archiveWarning);
                }
              break;
              default:
                $("#bySMTP").hide( );
                $("#bySendmail").hide( );
                $("#_qf_Smtp_refresh_test").prop(\'disabled\', true);
            }
        }

        $("input[name=\'outBound_option\']").click( function( ) {
            showHideMailOptions( $(this).val( ) );
        });
    });

</script>
'; ?>

  </div>
  <?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_crmRegion($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>
</div>
<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_crmScope($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>