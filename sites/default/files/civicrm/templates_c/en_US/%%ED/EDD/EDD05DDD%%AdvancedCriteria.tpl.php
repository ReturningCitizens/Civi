<?php /* Smarty version 2.6.30, created on 2018-12-03 09:41:02
         compiled from CRM/Contact/Form/Search/AdvancedCriteria.tpl */ ?>
<?php require_once(SMARTY_CORE_DIR . 'core.load_plugins.php');
smarty_core_load_plugins(array('plugins' => array(array('block', 'crmScope', 'CRM/Contact/Form/Search/AdvancedCriteria.tpl', 1, false),array('block', 'ts', 'CRM/Contact/Form/Search/AdvancedCriteria.tpl', 50, false),array('function', 'crmURL', 'CRM/Contact/Form/Search/AdvancedCriteria.tpl', 88, false),array('function', 'help', 'CRM/Contact/Form/Search/AdvancedCriteria.tpl', 106, false),)), $this); ?>
<?php $this->_tag_stack[] = array('crmScope', array('extensionKey' => "")); $_block_repeat=true;smarty_block_crmScope($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?><?php echo '
<script type="text/javascript">
CRM.$(function($) {
  // Bind first click of accordion header to load crm-accordion-body with snippet
  // everything else is taken care of by crmAccordions()
  $(\'.crm-search_criteria_basic-accordion .crm-accordion-header\').addClass(\'active\');
  $(\'.crm-ajax-accordion\').on(\'click\', \'.crm-accordion-header:not(.active)\', function() {
    loadPanes($(this).attr(\'id\'));
  });
  $(\'.crm-ajax-accordion:not(.collapsed) .crm-accordion-header\').each(function() {
    loadPanes($(this).attr(\'id\'));
  });
  $(\'.crm-ajax-accordion\').on(\'click\', \'.crm-close-accordion\', function() {
    var header = $(this).parent();
    header.next().html(\'\');
    header.removeClass(\'active\');
    header.parent(\'.crm-ajax-accordion:not(.collapsed)\').crmAccordionToggle();
    // Reset results-display mode if it depends on this pane
    var mode = modes[$(\'#component_mode\').val()] || null;
    if (mode && header.attr(\'id\') == mode) {
      var oldMode = $(\'#component_mode :selected\').text();
      $(\'#component_mode\').val(\'1\');
      '; ?>

      var msg = '<?php $this->_tag_stack[] = array('ts', array('escape' => 'js')); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Displaying results as "%1" is not available without search criteria from the pane you just closed.<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>';
      msg = msg.replace('%1', oldMode);
      CRM.alert(msg, '<?php $this->_tag_stack[] = array('ts', array('escape' => 'js')); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Display Results have been Reset<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>');
      <?php echo '
    }
    $(this).remove();
    return false;
  });
  // TODO: Why are the modes numeric? If they used the string there would be no need for this map
  var modes = {
    \'2\': \'CiviContribute\',
    \'3\': \'CiviEvent\',
    \'4\': \'activity\',
    \'5\': \'CiviMember\',
    \'6\': \'CiviCase\',
    \'8\': \'CiviMail\'
  };
  // Handle change of results mode
  $(\'#component_mode\').change(function() {
    // Reset task dropdown
    $(\'#task\').val(\'\');
    var mode = modes[$(\'#component_mode\').val()] || null;
    if (mode) {
      $(\'.crm-\' + mode + \'-accordion.collapsed\').crmAccordionToggle();
      loadPanes(mode);
    }
    if ($(\'#component_mode\').val() == \'7\') {
      $(\'#crm-display_relationship_type\').show();
    }
    else {
      $(\'#display_relationship_type\').val(\'\');
      $(\'#crm-display_relationship_type\').hide();
    }
  }).change();
  /**
  * Loads snippet based on id of crm-accordion-header
  */
  function loadPanes(id) {
    var url = "'; ?>
<?php echo CRM_Utils_System::crmURL(array('p' => 'civicrm/contact/search/advanced','q' => "qfKey=".($this->_tpl_vars['qfKey'])."&searchPane=",'h' => 0), $this);?>
<?php echo '" + id;
    var header = $(\'#\' + id);
    var body = $(\'.crm-accordion-body.\' + id);
    if (header.length > 0 && body.length > 0 && !body.html()) {
      body.html(\'<div class="crm-loading-element"><span class="loading-text">'; ?>
<?php $this->_tag_stack[] = array('ts', array('escape' => 'js')); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Loading<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?><?php echo '...</span></div>\');
      header.append(\''; ?>
<a href="#" class="crm-close-accordion crm-hover-button css_right" title="<?php $this->_tag_stack[] = array('ts', array('escape' => 'js')); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Remove from search criteria<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>"><i class="crm-i fa-times"></i></a><?php echo '\');
      header.addClass(\'active\');
      CRM.loadPage(url, {target: body, block: false});
    }
  }
});
</script>
'; ?>


<?php if ($this->_tpl_vars['context'] == 'smog' || $this->_tpl_vars['context'] == 'amtg' || $this->_tpl_vars['savedSearch']): ?>
  <h3>
    <?php if ($this->_tpl_vars['context'] == 'smog'): ?><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Find Contacts within this Group<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>
    <?php elseif ($this->_tpl_vars['context'] == 'amtg'): ?><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Find Contacts to Add to this Group<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>
    <?php elseif ($this->_tpl_vars['savedSearch']): ?><?php $this->_tag_stack[] = array('ts', array('1' => $this->_tpl_vars['savedSearch']['name'])); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>%1 Smart Group Criteria<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?> &nbsp; <?php echo smarty_function_help(array('id' => 'id-advanced-smart'), $this);?>

    <?php endif; ?>
  </h3>
<?php endif; ?>

<?php echo '<div class="crm-accordion-wrapper crm-search_criteria_basic-accordion "><div class="crm-accordion-header">'; ?><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?><?php echo 'Display Settings For Results'; ?><?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?><?php echo '</div><div class="crm-accordion-body">'; ?><?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "CRM/Contact/Form/Search/Criteria/DisplaySettings.tpl", 'smarty_include_vars' => array()));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?><?php echo '</div></div><div class="crm-accordion-wrapper crm-search_criteria_basic-accordion "><div class="crm-accordion-header">'; ?><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?><?php echo 'Search Settings'; ?><?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?><?php echo '</div><div class="crm-accordion-body">'; ?><?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "CRM/Contact/Form/Search/Criteria/SearchSettings.tpl", 'smarty_include_vars' => array()));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?><?php echo '</div></div><div class="crm-accordion-wrapper crm-search_criteria_basic-accordion "><div class="crm-accordion-header">'; ?><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?><?php echo 'Basic Criteria'; ?><?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?><?php echo '</div><div class="crm-accordion-body">'; ?><?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "CRM/Contact/Form/Search/Criteria/Basic.tpl", 'smarty_include_vars' => array()));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?><?php echo '</div></div>'; ?><?php $_from = $this->_tpl_vars['allPanes']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['paneName'] => $this->_tpl_vars['paneValue']):
?><?php echo '<div class="crm-accordion-wrapper crm-ajax-accordion crm-'; ?><?php echo $this->_tpl_vars['paneValue']['id']; ?><?php echo '-accordion '; ?><?php if ($this->_tpl_vars['paneValue']['open'] == 'true' && $this->_tpl_vars['openedPanes'][$this->_tpl_vars['paneName']]): ?><?php echo ' '; ?><?php else: ?><?php echo 'collapsed'; ?><?php endif; ?><?php echo '"><div class="crm-accordion-header" id="'; ?><?php echo $this->_tpl_vars['paneValue']['id']; ?><?php echo '">'; ?><?php echo $this->_tpl_vars['paneName']; ?><?php echo '</div><div class="crm-accordion-body '; ?><?php echo $this->_tpl_vars['paneValue']['id']; ?><?php echo '"></div></div><!-- Surplus /div is required (not sure why but breakage is obvious when you remove it) -->'; ?><?php endforeach; endif; unset($_from); ?><?php echo '<div class="spacer"></div><table class="form-layout"><tr><td>'; ?><?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "CRM/common/formButtons.tpl", 'smarty_include_vars' => array('location' => 'bottom')));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?><?php echo '<div class="crm-submit-buttons reset-advanced-search"><a href="'; ?><?php echo CRM_Utils_System::crmURL(array('p' => 'civicrm/contact/search/advanced','q' => 'reset=1'), $this);?><?php echo '" id="resetAdvancedSearch" class="crm-hover-button" title="'; ?><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?><?php echo 'Clear all search criteria'; ?><?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?><?php echo '"><i class="crm-i fa-undo"></i>&nbsp;'; ?><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?><?php echo 'Reset Form'; ?><?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?><?php echo '</a></div></td></tr></table>'; ?>

<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_crmScope($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>