<?php /* Smarty version 2.6.30, created on 2018-12-04 11:27:10
         compiled from CRM/Civirules/Form/RuleBlocks/ActionBlock.tpl */ ?>
<?php require_once(SMARTY_CORE_DIR . 'core.load_plugins.php');
smarty_core_load_plugins(array('plugins' => array(array('block', 'crmScope', 'CRM/Civirules/Form/RuleBlocks/ActionBlock.tpl', 1, false),array('block', 'ts', 'CRM/Civirules/Form/RuleBlocks/ActionBlock.tpl', 10, false),)), $this); ?>
<?php $this->_tag_stack[] = array('crmScope', array('extensionKey' => "")); $_block_repeat=true;smarty_block_crmScope($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>
    
<h3>Linked Action(s)</h3>
<div class="crm-block crm-form-block crm-civirule-rule_action-block">
  <div class="crm-section">
    <div id="civirule_wrapper" class="dataTables_wrapper">
      <table id="civirule-table" class="display">
        <thead>
          <tr>
            <th><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Name<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></th>
            <th><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Extra parameters<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></th>
            <th class="nosort">&nbsp;</th>
            <th id="nosort">&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          <?php $this->assign('rowClass', 'odd_row'); ?>
          <?php $this->assign('rowNumber', 1); ?>
          <?php $_from = $this->_tpl_vars['ruleActions']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['action_id'] => $this->_tpl_vars['ruleAction']):
?>
            <tr id="row_<?php echo $this->_tpl_vars['rowNumber']; ?>
" class=<?php echo $this->_tpl_vars['rowClass']; ?>
>
              <td hidden="1" id="ruleActionId"><?php echo $this->_tpl_vars['ruleAction']['id']; ?>
</td>
              <td><?php echo $this->_tpl_vars['ruleAction']['label']; ?>
</td>
              <?php if (! empty ( $this->_tpl_vars['ruleAction']['formattedConditionParams'] )): ?>
                <td><?php echo $this->_tpl_vars['ruleAction']['formattedConditionParams']; ?>
</td>
              <?php else: ?>
                <td>&nbsp;</td>
              <?php endif; ?>
              <td>
                  <?php echo $this->_tpl_vars['ruleAction']['formattedDelay']; ?>

              </td>
              <td>
                <span>
                  <?php $_from = $this->_tpl_vars['ruleAction']['actions']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['actionLink']):
?>
                    <?php echo $this->_tpl_vars['actionLink']; ?>

                  <?php endforeach; endif; unset($_from); ?>
                </span>
              </td>
            </tr>
            <?php if ($this->_tpl_vars['row_class'] == 'odd_row'): ?>
              <?php $this->assign('rowClass', "even-row"); ?>
            <?php else: ?>
              <?php $this->assign('row_class', "odd-row"); ?>
            <?php endif; ?>
            <?php $this->assign('rowNumber', $this->_tpl_vars['rowNumber']+1); ?>
          <?php endforeach; endif; unset($_from); ?>
        </tbody>
      </table>
    </div>
  </div>
  <div class="crm-submit-buttons">
    <a class="add button" title="Add Action" href="<?php echo $this->_tpl_vars['ruleActionAddUrl']; ?>
">
      <span><div class="icon add-icon ui-icon-circle-plus"></div>Add Action</span></a>
  </div>
</div>

<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_crmScope($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>