<?php /* Smarty version 2.6.30, created on 2018-12-03 09:41:02
         compiled from CRM/Contact/Form/Search/Criteria/Basic.tpl */ ?>
<?php require_once(SMARTY_CORE_DIR . 'core.load_plugins.php');
smarty_core_load_plugins(array('plugins' => array(array('block', 'crmScope', 'CRM/Contact/Form/Search/Criteria/Basic.tpl', 1, false),array('block', 'ts', 'CRM/Contact/Form/Search/Criteria/Basic.tpl', 28, false),array('function', 'help', 'CRM/Contact/Form/Search/Criteria/Basic.tpl', 97, false),)), $this); ?>
<?php $this->_tag_stack[] = array('crmScope', array('extensionKey' => "")); $_block_repeat=true;smarty_block_crmScope($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?><table class="form-layout">
  <tr>
    <td><label><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Complete OR Partial Name<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></label><br />
      <?php echo $this->_tpl_vars['form']['sort_name']['html']; ?>

    </td>
    <td>
      <label><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Complete OR Partial Email<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></label><br />
      <?php echo $this->_tpl_vars['form']['email']['html']; ?>

    </td>
    <?php if ($this->_tpl_vars['form']['contact_type']): ?>
      <td><label><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Contact Type(s)<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></label><br />
        <?php echo $this->_tpl_vars['form']['contact_type']['html']; ?>

      </td>
    <?php else: ?>
      <td>&nbsp;</td>
    <?php endif; ?>
  </tr>
  <tr>
  <?php if ($this->_tpl_vars['form']['group']): ?>
    <td>
      <div id='groupselect'><label><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Group(s)<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?> <span class="description">(<a href="#" id='searchbygrouptype'><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>search by group type<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></a>)</span></label>
        <br />
        <?php echo $this->_tpl_vars['form']['group']['html']; ?>

    </div>
    <div id='grouptypeselect'>
      <label><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Group Type(s)<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?> <span class="description"> (<a href="#" id='searchbygroup'><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>search by group<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></a>)</span></label>
      <br />
      <?php echo $this->_tpl_vars['form']['group_type']['html']; ?>

        <?php echo '
        <script type="text/javascript">
        CRM.$(function($) {
          function showGroupSearch() {
            $(\'#grouptypeselect\').hide();
            $(\'#groupselect\').show();
            $(\'#group_type\').select2(\'val\', \'\');
            return false;
          }
          function showGroupTypeSearch() {
            $(\'#groupselect\').hide();
            $(\'#grouptypeselect\').show();
            $(\'#group\').select2(\'val\', \'\');
            return false;
          }
          $(\'#searchbygrouptype\').click(showGroupTypeSearch);
          $(\'#searchbygroup\').click(showGroupSearch);

          if ($(\'#group_type\').val() ) {
            showGroupTypeSearch();
          }
          else {
            showGroupSearch();
          }

        });
        </script>
        '; ?>

    </div>
    </td>
  <?php else: ?>
    <td>&nbsp;</td>
  <?php endif; ?>
    <?php if ($this->_tpl_vars['form']['contact_tags']): ?>
      <td><label><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Select Tag(s)<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></label>
        <?php echo $this->_tpl_vars['form']['contact_tags']['html']; ?>

      </td>
    <?php else: ?>
      <td>&nbsp;</td>
    <?php endif; ?>
    <?php if ($this->_tpl_vars['isTagset']): ?>
      <td colspan="2"><?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "CRM/common/Tagset.tpl", 'smarty_include_vars' => array()));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?></td>
    <?php endif; ?>
    <td><?php echo $this->_tpl_vars['form']['tag_search']['label']; ?>
  <?php echo smarty_function_help(array('id' => "id-all-tags"), $this);?>
<br /><?php echo $this->_tpl_vars['form']['tag_search']['html']; ?>
</td>
    <?php if (! $this->_tpl_vars['isTagset']): ?>
      <td colspan="2">&nbsp;</td>
    <?php endif; ?>
    <td>&nbsp;</td>
  </tr>
  <?php if ($this->_tpl_vars['form']['all_tag_types']): ?>
    <tr>
      <td colspan="5">
          <?php echo $this->_tpl_vars['form']['all_tag_types']['html']; ?>
 <?php echo $this->_tpl_vars['form']['all_tag_types']['label']; ?>
 <?php echo smarty_function_help(array('id' => "id-all-tag-types"), $this);?>

      </td>
    </tr>
  <?php endif; ?>
  <tr>
    <td>
      <div>
        <?php echo $this->_tpl_vars['form']['phone_numeric']['label']; ?>
<br /><?php echo $this->_tpl_vars['form']['phone_numeric']['html']; ?>

      </div>
      <div class="description font-italic">
        <?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Punctuation and spaces are ignored.<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>
      </div>
    </td>
    <td><?php echo $this->_tpl_vars['form']['phone_location_type_id']['label']; ?>
<br /><?php echo $this->_tpl_vars['form']['phone_location_type_id']['html']; ?>
</td>
    <td><?php echo $this->_tpl_vars['form']['phone_phone_type_id']['label']; ?>
<br /><?php echo $this->_tpl_vars['form']['phone_phone_type_id']['html']; ?>
</td>
  </tr>
  <tr>
    <td colspan="2">
      <table class="form-layout-compressed">
      <tr>
        <td colspan="2">
            <?php echo $this->_tpl_vars['form']['privacy_toggle']['html']; ?>
 <?php echo smarty_function_help(array('id' => "id-privacy"), $this);?>

        </td>
      </tr>
      <tr>
        <td>
            <?php echo $this->_tpl_vars['form']['privacy_options']['html']; ?>

        </td>
        <td style="vertical-align:middle">
            <div id="privacy-operator-wrapper"><?php echo $this->_tpl_vars['form']['privacy_operator']['html']; ?>
 <?php echo smarty_function_help(array('id' => "privacy-operator"), $this);?>
</div>
        </td>
      </tr>
      </table>
      <?php echo '
        <script type="text/javascript">
          cj("select#privacy_options").change(function() {
            if (cj(this).val() && cj(this).val().length > 1) {
              cj(\'#privacy-operator-wrapper\').show();
            } else {
              cj(\'#privacy-operator-wrapper\').hide();
            }
          }).change();
        </script>
      '; ?>

    </td>
    <td colspan="3">
      <?php echo $this->_tpl_vars['form']['preferred_communication_method']['label']; ?>
<br />
      <?php echo $this->_tpl_vars['form']['preferred_communication_method']['html']; ?>
<br />
      <div class="spacer"></div>
      <?php echo $this->_tpl_vars['form']['email_on_hold']['html']; ?>
 <?php echo $this->_tpl_vars['form']['email_on_hold']['label']; ?>

    </td>
  </tr>
  <tr>
    <td>
      <?php echo $this->_tpl_vars['form']['contact_source']['label']; ?>
 <?php echo smarty_function_help(array('id' => "id-source",'file' => "CRM/Contact/Form/Contact"), $this);?>
<br />
      <?php echo $this->_tpl_vars['form']['contact_source']['html']; ?>

    </td>
    <td>
      <?php echo $this->_tpl_vars['form']['job_title']['label']; ?>
<br />
      <?php echo $this->_tpl_vars['form']['job_title']['html']; ?>

    </td>
    <td colspan="3">
      <?php echo $this->_tpl_vars['form']['preferred_language']['label']; ?>
<br />
      <?php echo $this->_tpl_vars['form']['preferred_language']['html']; ?>

    </td>
  </tr>
  <tr>
    <td>
       <?php echo $this->_tpl_vars['form']['contact_id']['label']; ?>
 <?php echo smarty_function_help(array('id' => "id-internal-id",'file' => "CRM/Contact/Form/Contact"), $this);?>
<br />
       <?php echo $this->_tpl_vars['form']['contact_id']['html']; ?>

    </td>
    <td>
       <?php echo $this->_tpl_vars['form']['external_identifier']['label']; ?>
 <?php echo smarty_function_help(array('id' => "id-external-id",'file' => "CRM/Contact/Form/Contact"), $this);?>
<br />
       <?php echo $this->_tpl_vars['form']['external_identifier']['html']; ?>

    </td>
    <td>
      <?php if ($this->_tpl_vars['form']['uf_user']): ?>
        <?php echo $this->_tpl_vars['form']['uf_user']['label']; ?>
 <?php echo $this->_tpl_vars['form']['uf_user']['html']; ?>

        <div class="description font-italic">
          <?php $this->_tag_stack[] = array('ts', array('1' => $this->_tpl_vars['config']->userFramework)); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Does the contact have a %1 Account?<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>
        </div>
      <?php else: ?>
        &nbsp;
      <?php endif; ?>
    </td>
  </tr>
</table>
<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_crmScope($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>