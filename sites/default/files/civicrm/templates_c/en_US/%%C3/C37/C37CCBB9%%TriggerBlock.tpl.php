<?php /* Smarty version 2.6.30, created on 2018-12-04 11:27:10
         compiled from CRM/Civirules/Form/RuleBlocks/TriggerBlock.tpl */ ?>
<?php require_once(SMARTY_CORE_DIR . 'core.load_plugins.php');
smarty_core_load_plugins(array('plugins' => array(array('block', 'crmScope', 'CRM/Civirules/Form/RuleBlocks/TriggerBlock.tpl', 1, false),array('block', 'ts', 'CRM/Civirules/Form/RuleBlocks/TriggerBlock.tpl', 24, false),)), $this); ?>
<?php $this->_tag_stack[] = array('crmScope', array('extensionKey' => "")); $_block_repeat=true;smarty_block_crmScope($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?><h3>Linked Trigger</h3>
<div class="crm-block crm-form-block crm-civirule-trigger-block">
  <?php if (empty ( $this->_tpl_vars['form']['rule_trigger_label']['value'] )): ?>
    <div class="crm-section">
      <div class="label"><?php echo $this->_tpl_vars['form']['rule_trigger_select']['label']; ?>
</div>
      <div class="content"><?php echo $this->_tpl_vars['form']['rule_trigger_select']['html']; ?>
</div>
      <div class="clear"></div>
    </div>
  <?php else: ?>
    <div class="crm-section">
      <div id="civirule_triggerBlock-wrapper" class="dataTables_wrapper">
        <table id="civirule-triggerBlock-table" class="display">
          <tbody>
            <tr class="odd-row">
              <td>
                  <?php echo $this->_tpl_vars['form']['rule_trigger_label']['value']; ?>

                  <?php if ($this->_tpl_vars['triggerClass'] && $this->_tpl_vars['triggerClass']->getTriggerDescription()): ?>
                    <br><span class="description">
                        <?php echo $this->_tpl_vars['triggerClass']->getTriggerDescription(); ?>

                    </span>
                  <?php endif; ?>
                  <?php if ($this->_tpl_vars['trigger_edit_params']): ?>
                      <br><a href="<?php echo $this->_tpl_vars['trigger_edit_params']; ?>
"><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Edit trigger parameters<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></a>
                  <?php endif; ?>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  <?php endif; ?>
</div>

<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_crmScope($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>