<?php /* Smarty version 2.6.30, created on 2018-12-03 09:51:47
         compiled from CRM/Activity/Form/Search/Common.tpl */ ?>
<?php require_once(SMARTY_CORE_DIR . 'core.load_plugins.php');
smarty_core_load_plugins(array('plugins' => array(array('block', 'crmScope', 'CRM/Activity/Form/Search/Common.tpl', 1, false),array('block', 'ts', 'CRM/Activity/Form/Search/Common.tpl', 63, false),array('function', 'cycle', 'CRM/Activity/Form/Search/Common.tpl', 81, false),array('function', 'help', 'CRM/Activity/Form/Search/Common.tpl', 114, false),array('modifier', 'crmAddClass', 'CRM/Activity/Form/Search/Common.tpl', 100, false),)), $this); ?>
<?php $this->_tag_stack[] = array('crmScope', array('extensionKey' => "")); $_block_repeat=true;smarty_block_crmScope($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?><tr>
  <td colspan="2">
    <?php echo $this->_tpl_vars['form']['activity_role']['html']; ?>

    </span>
  </td>
</tr>
<tr>
  <?php if ($this->_tpl_vars['form']['activity_type_id']): ?>
    <td><label><?php echo $this->_tpl_vars['form']['activity_type_id']['label']; ?>
</label>
       <br />
       <?php echo $this->_tpl_vars['form']['activity_type_id']['html']; ?>

    </td>
  <?php else: ?>
    <td>&nbsp;</td>
  <?php endif; ?>
  <?php if ($this->_tpl_vars['form']['activity_survey_id'] || $this->_tpl_vars['buildEngagementLevel']): ?>
    <td>
      <?php if ($this->_tpl_vars['form']['activity_survey_id']): ?>
        <label><?php echo $this->_tpl_vars['form']['activity_survey_id']['label']; ?>
</label>
        <br/>
        <?php echo $this->_tpl_vars['form']['activity_survey_id']['html']; ?>

      <?php endif; ?>
      <?php if ($this->_tpl_vars['buildEngagementLevel']): ?>
        <br
        / >
        <br/>
        <label><?php echo $this->_tpl_vars['form']['activity_engagement_level']['label']; ?>
</label>
        <br/>
        <?php echo $this->_tpl_vars['form']['activity_engagement_level']['html']; ?>

      <?php endif; ?>
    </td>
  <?php endif; ?>

  <td>
    <table>
      <tr><td>
        <?php if ($this->_tpl_vars['form']['parent_id']): ?>
          <label><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Has a Followup Activity?<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></label>
          <br/>
          <?php echo $this->_tpl_vars['form']['parent_id']['html']; ?>

        <?php endif; ?>
      </td></tr>
      <tr><td>
      <?php if ($this->_tpl_vars['form']['followup_parent_id']): ?>
          <label><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Is a Followup Activity?<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></label>
          <br/>
          <?php echo $this->_tpl_vars['form']['followup_parent_id']['html']; ?>

        <?php endif; ?>
      </td></tr>
    </table>
  </td>
  <?php if ($this->_tpl_vars['form']['activity_tags']): ?>
    <td><label><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Activity Tag(s)<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></label>
      <div id="Tags" class="listing-box">
        <?php $_from = $this->_tpl_vars['form']['activity_tags']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['tag_val']):
?>
          <div class="<?php echo smarty_function_cycle(array('values' => 'odd-row,even-row'), $this);?>
">
            <?php echo $this->_tpl_vars['tag_val']['html']; ?>

          </div>
        <?php endforeach; endif; unset($_from); ?>
    </td>
  <?php else: ?>
    <td>&nbsp;</td>
  <?php endif; ?>
</tr>

<tr>
  <td><label><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Activity Dates<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></label></td>
</tr>
<tr>
  <?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "CRM/Core/DateRange.tpl", 'smarty_include_vars' => array('fieldName' => 'activity_date','from' => '_low','to' => '_high')));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?>
</tr>
<tr>
  <td>
    <?php echo $this->_tpl_vars['form']['activity_text']['label']; ?>
<br/>
    <?php echo ((is_array($_tmp=$this->_tpl_vars['form']['activity_text']['html'])) ? $this->_run_mod_handler('crmAddClass', true, $_tmp, 'big') : smarty_modifier_crmAddClass($_tmp, 'big')); ?>
<br/>
    <?php echo $this->_tpl_vars['form']['activity_option']['html']; ?>
<br/>
  </td>
  <td colspan="2">
    <?php echo $this->_tpl_vars['form']['status_id']['label']; ?>
<br/>
    <?php echo $this->_tpl_vars['form']['status_id']['html']; ?>

  </td>
</tr>
<tr>
  <td>
    <?php echo $this->_tpl_vars['form']['priority_id']['label']; ?>
<br />
    <?php echo $this->_tpl_vars['form']['priority_id']['html']; ?>

  </td>
  <td colspan="2">
    <?php echo $this->_tpl_vars['form']['activity_test']['label']; ?>
 <?php echo smarty_function_help(array('id' => "is-test",'file' => "CRM/Contact/Form/Search/Advanced"), $this);?>

    &nbsp; <?php echo $this->_tpl_vars['form']['activity_test']['html']; ?>

  </td>
</tr>
<?php if ($this->_tpl_vars['buildSurveyResult']): ?>
  <tr>
    <td id="activityResult">
      <label><?php echo $this->_tpl_vars['form']['activity_result']['label']; ?>
</label><br />
      <?php echo $this->_tpl_vars['form']['activity_result']['html']; ?>

    </td>
    <td colspan="2"><?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "CRM/common/Tagset.tpl", 'smarty_include_vars' => array('tagsetType' => 'activity')));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?></td>
  </tr>
<?php else: ?>
  <tr>
    <td colspan="3"><?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "CRM/common/Tagset.tpl", 'smarty_include_vars' => array('tagsetType' => 'activity')));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?></td>
  </tr>
<?php endif; ?>

<?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "CRM/Campaign/Form/addCampaignToComponent.tpl", 'smarty_include_vars' => array('campaignContext' => 'componentSearch','campaignTrClass' => '','campaignTdClass' => '')));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?>

<?php if ($this->_tpl_vars['activityGroupTree']): ?>
  <tr id="activityCustom">
    <td id="activityCustomData" colspan="2">
      <?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "CRM/Custom/Form/Search.tpl", 'smarty_include_vars' => array('groupTree' => $this->_tpl_vars['activityGroupTree'],'showHideLinks' => false)));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?>
    </td>
  </tr>
<?php endif; ?>

<?php echo '
<script type="text/javascript">
  CRM.$(function($) {
    //Searchable activity custom fields which extend ALL activity types are always displayed in the form
    //hence hide remaining activity custom data
    $(\'#activityCustom\').children( ).each( function( ) {
      $(\'#\'+$(this).attr(\'id\')+\' div\').each( function( ) {
        if ($(this).children( ).attr(\'id\')) {
          var activityCustomdataGroup = $(this).attr(\'id\');  //div id
          var fieldsetId = $(this).children( ).attr(\'id\');  // fieldset id
          var splitFieldsetId = fieldsetId.split("");
          var splitFieldsetLength = splitFieldsetId.length;  //length of fieldset
          var show = 0;
          //setdefault activity custom data group if corresponding activity type is checked
          $(\'#Activity div\').each(function( ) {
            var checkboxId = $(this).children().attr(\'id\');  //activity type element name
            if (document.getElementById( checkboxId ).checked ) {
              var element = checkboxId.split(\'[\');
              var splitElement = element[1].split(\']\');  // get activity type id
              for (var i=0; i<splitFieldsetLength; i++) {
                var singleFieldset = splitFieldsetId[i];
                if (parseInt( singleFieldset)) {
                  if (singleFieldset == splitElement[0]) {
                    show++;
                  }
                }
              }
            }
          });
          if (show < 1) {
            $(\'#\'+activityCustomdataGroup).hide( );
          }
        }
      });
    });
  });

  function showCustomData(chkbox) {
  if (document.getElementById(chkbox).checked) {
    //inject Searchable activity custom fields according to activity type selected
    var element = chkbox.split("[");
    var splitElement = element[1].split("]");
    cj(\'#activityCustom\').children().each(function( ) {
      cj(\'#\'+cj(this).attr( \'id\' )+\' div\').each(function( ) {
        if (cj(this).children().attr(\'id\')) {
          if (cj(\'#\'+cj(this).attr(\'id\')+(\' fieldset\')).attr(\'id\')) {
            var fieldsetId = cj(\'#\' + cj(this).attr(\'id\')+(\' fieldset\')).attr(\'id\').split("");
            var activityTypeId = jQuery.inArray(splitElement[0], fieldsetId);
            if (fieldsetId[activityTypeId] == splitElement[0]) {
              cj(this).show();
            }
          }
        }
      });
    });
  }
  else {
    //hide activity custom fields if the corresponding activity type is unchecked
    var setcount = 0;
    var element = chkbox.split( "[" );
    var splitElement = element[1].split( "]" );
    cj(\'#activityCustom\').children().each( function( ) {
      cj(\'#\'+cj(this).attr( \'id\' )+\' div\').each(function() {
        if (cj(this).children().attr(\'id\')) {
          if (cj(\'#\'+cj(this).attr(\'id\')+(\' fieldset\')).attr(\'id\')) {
            var fieldsetId = cj( \'#\'+cj(this).attr(\'id\')+(\' fieldset\')).attr(\'id\').split("");
            var activityTypeId = jQuery.inArray( splitElement[0],fieldsetId);
            if (fieldsetId[activityTypeId] ==  splitElement[0]) {
              cj(\'#\'+cj(this).attr(\'id\')).each( function() {
                if (cj(this).children().attr(\'id\')) {
                  //if activity custom data extends more than one activity types then
                  //hide that only when all the extended activity types are unchecked
                  cj(\'#\'+cj(this).attr(\'id\')+(\' fieldset\')).each( function( ) {
                    var splitFieldsetId = cj( this ).attr(\'id\').split("");
                    var splitFieldsetLength = splitFieldsetId.length;
                    for( var i=0;i<splitFieldsetLength;i++ ) {
                      var setActivityTypeId = splitFieldsetId[i];
                      if (parseInt(setActivityTypeId)) {
                        var activityTypeId = \'activity_type_id[\'+setActivityTypeId+\']\';
                        if (document.getElementById(activityTypeId).checked) {
                          return false;
                        }
                        else {
                          setcount++;
                        }
                      }
                    }
                    if (setcount > 0) {
                      cj(\'#\'+cj(this).parent().attr(\'id\')).hide();
                    }
                  });
                }
              });
            }
          }
        }
      });
    });
  }
}
'; ?>

</script>
<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_crmScope($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>