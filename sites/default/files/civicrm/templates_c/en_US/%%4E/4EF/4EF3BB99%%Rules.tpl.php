<?php /* Smarty version 2.6.30, created on 2018-12-04 11:27:04
         compiled from CRM/Civirules/Form/Search/Rules.tpl */ ?>
<?php require_once(SMARTY_CORE_DIR . 'core.load_plugins.php');
smarty_core_load_plugins(array('plugins' => array(array('block', 'crmScope', 'CRM/Civirules/Form/Search/Rules.tpl', 1, false),array('block', 'ts', 'CRM/Civirules/Form/Search/Rules.tpl', 35, false),array('function', 'counter', 'CRM/Civirules/Form/Search/Rules.tpl', 52, false),array('function', 'cycle', 'CRM/Civirules/Form/Search/Rules.tpl', 54, false),array('function', 'crmURL', 'CRM/Civirules/Form/Search/Rules.tpl', 71, false),array('modifier', 'crmDate', 'CRM/Civirules/Form/Search/Rules.tpl', 59, false),)), $this); ?>
<?php $this->_tag_stack[] = array('crmScope', array('extensionKey' => "")); $_block_repeat=true;smarty_block_crmScope($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?><?php $this->assign('showBlock', "'searchForm'"); ?>
<?php $this->assign('hideBlock', "'searchForm_show','searchForm_hide'"); ?>

<div id="civirule_helptext_dialog-block">
  <p><label id="civirule_help_text-value"></label></p>
</div>

<?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "CRM/Civirules/Form/Search/RulesCriteria.tpl", 'smarty_include_vars' => array()));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?>

<?php if ($this->_tpl_vars['rowsEmpty']): ?>
    <?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "CRM/Contact/Form/Search/Custom/EmptyResults.tpl", 'smarty_include_vars' => array()));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?>
<?php endif; ?>

<?php if ($this->_tpl_vars['summary']): ?>
    <?php echo $this->_tpl_vars['summary']['summary']; ?>
: <?php echo $this->_tpl_vars['summary']['total']; ?>

<?php endif; ?>

<?php if ($this->_tpl_vars['rows']): ?>
        <?php $this->assign('showBlock', "'searchForm_show'"); ?>
    <?php $this->assign('hideBlock', "'searchForm'"); ?>

    <fieldset>

                <p>

            <?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "CRM/common/pager.tpl", 'smarty_include_vars' => array('location' => 'top')));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?>

            <?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "CRM/common/pagerAToZ.tpl", 'smarty_include_vars' => array()));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?>

            <?php echo '<table class="selector" summary="'; ?><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?><?php echo 'Search results listings.'; ?><?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?><?php echo '"><thead class="sticky">'; ?><?php $_from = $this->_tpl_vars['columnHeaders']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['header']):
?><?php echo '<th scope="col">'; ?><?php if ($this->_tpl_vars['header']['sort']): ?><?php echo ''; ?><?php if ($this->_tpl_vars['header']['name'] != 'RuleID' && $this->_tpl_vars['header']['name'] != 'Hidden Active' && $this->_tpl_vars['header']['name'] != 'Help Text'): ?><?php echo ''; ?><?php $this->assign('key', $this->_tpl_vars['header']['sort']); ?><?php echo ''; ?><?php echo $this->_tpl_vars['sort']->_response[$this->_tpl_vars['key']]['link']; ?><?php echo ''; ?><?php endif; ?><?php echo ''; ?><?php else: ?><?php echo ''; ?><?php echo $this->_tpl_vars['header']['name']; ?><?php echo ''; ?><?php endif; ?><?php echo '</th>'; ?><?php endforeach; endif; unset($_from); ?><?php echo '<th>&nbsp;</th></thead>'; ?><?php echo smarty_function_counter(array('start' => 0,'skip' => 1,'print' => false), $this);?><?php echo ''; ?><?php $_from = $this->_tpl_vars['rows']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['row']):
?><?php echo '<tr id=\'rowid'; ?><?php echo $this->_tpl_vars['row']['contact_id']; ?><?php echo '\' class="'; ?><?php echo smarty_function_cycle(array('values' => "odd-row,even-row"), $this);?><?php echo '">'; ?><?php $_from = $this->_tpl_vars['columnHeaders']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['header']):
?><?php echo ''; ?><?php $this->assign('fName', $this->_tpl_vars['header']['sort']); ?><?php echo ''; ?><?php if ($this->_tpl_vars['fName'] != 'rule_id' && $this->_tpl_vars['fName'] != 'rule_is_active' && $this->_tpl_vars['fName'] != 'rule_help_text'): ?><?php echo ''; ?><?php if ($this->_tpl_vars['fName'] == 'rule_created_date'): ?><?php echo '<td>'; ?><?php echo ((is_array($_tmp=$this->_tpl_vars['row'][$this->_tpl_vars['fName']])) ? $this->_run_mod_handler('crmDate', true, $_tmp) : smarty_modifier_crmDate($_tmp)); ?><?php echo '</td>'; ?><?php else: ?><?php echo '<td>'; ?><?php echo $this->_tpl_vars['row'][$this->_tpl_vars['fName']]; ?><?php echo ''; ?><?php if ($this->_tpl_vars['fName'] == 'rule_description' && ( ! empty ( $this->_tpl_vars['row']['rule_help_text'] ) )): ?><?php echo '<a id="civirule_help_text_icon" class="crm-popup medium-popup helpicon" onclick="showRuleHelp('; ?><?php echo $this->_tpl_vars['row']['rule_id']; ?><?php echo ')" href="#"></a>'; ?><?php endif; ?><?php echo '</td>'; ?><?php endif; ?><?php echo ''; ?><?php endif; ?><?php echo ''; ?><?php endforeach; endif; unset($_from); ?><?php echo '<td><span><a href="'; ?><?php echo CRM_Utils_System::crmURL(array('p' => 'civicrm/civirule/form/rule','q' => "reset=1&action=update&id=".($this->_tpl_vars['row']['rule_id'])), $this);?><?php echo '"class="action-item action-item-first" title="Edit Rule">Edit</a></span></td>'; ?><?php if ($this->_tpl_vars['row']['rule_is_active'] == 1): ?><?php echo '<td><span><a href="'; ?><?php echo CRM_Utils_System::crmURL(array('p' => 'civicrm/civirule/form/rule','q' => "reset=1&action=disable&id=".($this->_tpl_vars['row']['rule_id'])), $this);?><?php echo '"class="action-item action-item-first" title="Disable Rule">Disable</a></span></td>'; ?><?php else: ?><?php echo '<td><span><a href="'; ?><?php echo CRM_Utils_System::crmURL(array('p' => 'civicrm/civirule/form/rule','q' => "reset=1&action=enable&id=".($this->_tpl_vars['row']['rule_id'])), $this);?><?php echo '"class="action-item action-item-first" title="Enable Rule">Enable</a></span></td>'; ?><?php endif; ?><?php echo '<td><span><a href="'; ?><?php echo CRM_Utils_System::crmURL(array('p' => 'civicrm/civirule/form/ruledelete','q' => "reset=1&action=delete&id=".($this->_tpl_vars['row']['rule_id'])), $this);?><?php echo '"class="action-item action-item-first" title="Delete Rule">Delete</a></span></td></tr>'; ?><?php endforeach; endif; unset($_from); ?><?php echo '</table>'; ?>


        <?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "CRM/common/pager.tpl", 'smarty_include_vars' => array('location' => 'bottom')));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?>

        </p>
    </fieldset>
    <?php endif; ?>
<?php echo '
  <script>
    function showRuleHelp(ruleId) {
      CRM.api3(\'CiviRuleRule\', \'getsingle\', {"id": ruleId})
        .done(function(result) {
        cj("#civirule_helptext_dialog-block").dialog({
          width: 600,
          height: 300,
          title: "Help for Rule " + result.label,
          buttons: {
            "Done": function() {
              cj(this).dialog("close");
            }
          }
        });
        cj("#civirule_helptext_dialog-block").html(result.help_text);
      });
    };
  </script>
'; ?>





<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_crmScope($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>