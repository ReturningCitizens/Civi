<?php /* Smarty version 2.6.30, created on 2018-12-04 11:27:10
         compiled from CRM/Civirules/Form/RuleBlocks/ConditionBlock.tpl */ ?>
<?php require_once(SMARTY_CORE_DIR . 'core.load_plugins.php');
smarty_core_load_plugins(array('plugins' => array(array('block', 'crmScope', 'CRM/Civirules/Form/RuleBlocks/ConditionBlock.tpl', 1, false),array('block', 'ts', 'CRM/Civirules/Form/RuleBlocks/ConditionBlock.tpl', 10, false),)), $this); ?>
<?php $this->_tag_stack[] = array('crmScope', array('extensionKey' => "")); $_block_repeat=true;smarty_block_crmScope($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>
    
<h3>Linked Condition(s)</h3>
<div class="crm-block crm-form-block crm-civirule-rule_condition-block">
  <div class="crm-section">
    <div id="civirule_conditionBlock-wrapper" class="dataTables_wrapper">
      <table id="civirule-conditionBlock-table" class="display">
        <thead>
          <tr>
            <th><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Link operator<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></th>
            <th><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Condition<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></th>
            <th><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Description<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></th>
            <th>&nbsp;</th>
        </tr>
        </thead>
        <tbody>
          <?php $this->assign('row_class', "odd-row"); ?>
          <?php $_from = $this->_tpl_vars['ruleConditions']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['ruleConditionIid'] => $this->_tpl_vars['ruleCondition']):
?>
            <tr class=<?php echo $this->_tpl_vars['row_class']; ?>
>
              <td><?php echo $this->_tpl_vars['ruleCondition']['condition_link']; ?>
</td>
              <td><?php echo $this->_tpl_vars['ruleCondition']['name']; ?>
</td>
              <td>
                <?php if (! empty ( $this->_tpl_vars['ruleCondition']['formattedConditionParams'] )): ?>
                  <?php echo $this->_tpl_vars['ruleCondition']['formattedConditionParams']; ?>

                <?php endif; ?>
              </td>
              <td>
                <span>
                  <?php $_from = $this->_tpl_vars['ruleCondition']['actions']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['action_link']):
?>
                    <?php echo $this->_tpl_vars['action_link']; ?>

                  <?php endforeach; endif; unset($_from); ?>
                </span>
              </td>
            </tr>
            <?php if ($this->_tpl_vars['row_class'] == "odd-row"): ?>
              <?php $this->assign('row_class', "even-row"); ?>
            <?php else: ?>
              <?php $this->assign('row_class', "odd-row"); ?>
            <?php endif; ?>
          <?php endforeach; endif; unset($_from); ?>
        </tbody>
      </table>
    </div>
  </div>
  <div class="crm-submit-buttons">
    <a class="add button" title="Add Condition" href="<?php echo $this->_tpl_vars['ruleConditionAddUrl']; ?>
">
      <span><div class="icon add-icon ui-icon-circle-plus"></div>Add Condition</span></a>
  </div>
</div>
<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_crmScope($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>