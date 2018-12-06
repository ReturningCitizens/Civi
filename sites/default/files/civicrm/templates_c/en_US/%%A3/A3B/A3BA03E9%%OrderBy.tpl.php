<?php /* Smarty version 2.6.30, created on 2018-12-03 09:40:15
         compiled from CRM/Report/Form/Tabs/OrderBy.tpl */ ?>
<?php require_once(SMARTY_CORE_DIR . 'core.load_plugins.php');
smarty_core_load_plugins(array('plugins' => array(array('block', 'crmScope', 'CRM/Report/Form/Tabs/OrderBy.tpl', 1, false),array('block', 'ts', 'CRM/Report/Form/Tabs/OrderBy.tpl', 32, false),array('function', 'cycle', 'CRM/Report/Form/Tabs/OrderBy.tpl', 40, false),)), $this); ?>
<?php $this->_tag_stack[] = array('crmScope', array('extensionKey' => "")); $_block_repeat=true;smarty_block_crmScope($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>

  <div id="report-tab-order-by-elements" class="civireport-criteria">
    <table id="optionField">
      <tr>
        <th>&nbsp;</th>
        <th> <?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Column<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></th>
        <th> <?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Order<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></th>
        <th> <?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Section Header / Group By<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></th>
        <th> <?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Page Break<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></th>
      </tr>

      <?php unset($this->_sections['rowLoop']);
$this->_sections['rowLoop']['name'] = 'rowLoop';
$this->_sections['rowLoop']['start'] = (int)1;
$this->_sections['rowLoop']['loop'] = is_array($_loop=6) ? count($_loop) : max(0, (int)$_loop); unset($_loop);
$this->_sections['rowLoop']['show'] = true;
$this->_sections['rowLoop']['max'] = $this->_sections['rowLoop']['loop'];
$this->_sections['rowLoop']['step'] = 1;
if ($this->_sections['rowLoop']['start'] < 0)
    $this->_sections['rowLoop']['start'] = max($this->_sections['rowLoop']['step'] > 0 ? 0 : -1, $this->_sections['rowLoop']['loop'] + $this->_sections['rowLoop']['start']);
else
    $this->_sections['rowLoop']['start'] = min($this->_sections['rowLoop']['start'], $this->_sections['rowLoop']['step'] > 0 ? $this->_sections['rowLoop']['loop'] : $this->_sections['rowLoop']['loop']-1);
if ($this->_sections['rowLoop']['show']) {
    $this->_sections['rowLoop']['total'] = min(ceil(($this->_sections['rowLoop']['step'] > 0 ? $this->_sections['rowLoop']['loop'] - $this->_sections['rowLoop']['start'] : $this->_sections['rowLoop']['start']+1)/abs($this->_sections['rowLoop']['step'])), $this->_sections['rowLoop']['max']);
    if ($this->_sections['rowLoop']['total'] == 0)
        $this->_sections['rowLoop']['show'] = false;
} else
    $this->_sections['rowLoop']['total'] = 0;
if ($this->_sections['rowLoop']['show']):

            for ($this->_sections['rowLoop']['index'] = $this->_sections['rowLoop']['start'], $this->_sections['rowLoop']['iteration'] = 1;
                 $this->_sections['rowLoop']['iteration'] <= $this->_sections['rowLoop']['total'];
                 $this->_sections['rowLoop']['index'] += $this->_sections['rowLoop']['step'], $this->_sections['rowLoop']['iteration']++):
$this->_sections['rowLoop']['rownum'] = $this->_sections['rowLoop']['iteration'];
$this->_sections['rowLoop']['index_prev'] = $this->_sections['rowLoop']['index'] - $this->_sections['rowLoop']['step'];
$this->_sections['rowLoop']['index_next'] = $this->_sections['rowLoop']['index'] + $this->_sections['rowLoop']['step'];
$this->_sections['rowLoop']['first']      = ($this->_sections['rowLoop']['iteration'] == 1);
$this->_sections['rowLoop']['last']       = ($this->_sections['rowLoop']['iteration'] == $this->_sections['rowLoop']['total']);
?>
        <?php $this->assign('index', $this->_sections['rowLoop']['index']); ?>
        <tr id="optionField_<?php echo $this->_tpl_vars['index']; ?>
" class="form-item <?php echo smarty_function_cycle(array('values' => "odd-row,even-row"), $this);?>
">
          <td>
            <?php if ($this->_tpl_vars['index'] > 1): ?>
              <a onclick="hideRow(<?php echo $this->_tpl_vars['index']; ?>
); return false;" name="orderBy_<?php echo $this->_tpl_vars['index']; ?>
" href="#" class="form-link"><img src="<?php echo $this->_tpl_vars['config']->resourceBase; ?>
i/TreeMinus.gif" class="action-icon" alt="<?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>hide field or section<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>"/></a>
            <?php endif; ?>
          </td>
          <td> <?php echo $this->_tpl_vars['form']['order_bys'][$this->_tpl_vars['index']]['column']['html']; ?>
</td>
          <td> <?php echo $this->_tpl_vars['form']['order_bys'][$this->_tpl_vars['index']]['order']['html']; ?>
</td>
          <td> <?php echo $this->_tpl_vars['form']['order_bys'][$this->_tpl_vars['index']]['section']['html']; ?>
</td>
          <td> <?php echo $this->_tpl_vars['form']['order_bys'][$this->_tpl_vars['index']]['pageBreak']['html']; ?>
</td>
        </tr>
      <?php endfor; endif; ?>
    </table>
    <div id="optionFieldLink" class="add-remove-link">
      <a onclick="showHideRow(); return false;" name="optionFieldLink" href="#" class="form-link"><img src="<?php echo $this->_tpl_vars['config']->resourceBase; ?>
i/TreePlus.gif" class="action-icon" alt="<?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>show field or section<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>"/><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>another column<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></a>
    </div>
    <script type="text/javascript">
      var showRows   = new Array(<?php echo $this->_tpl_vars['showBlocks']; ?>
);
      var hideBlocks = new Array(<?php echo $this->_tpl_vars['hideBlocks']; ?>
);
      var rowcounter = 0;
      <?php echo '
      if (navigator.appName == "Microsoft Internet Explorer") {
        for ( var count = 0; count < hideBlocks.length; count++ ) {
          var r = document.getElementById(hideBlocks[count]);
          r.style.display = \'none\';
        }
      }

      // hide and display the appropriate blocks as directed by the php code
      on_load_init_blocks( showRows, hideBlocks, \'\');

      cj(\'input[id^="order_by_section_"]\').click(disPageBreak).each(disPageBreak);

      function disPageBreak() {
        if (!cj(this).prop(\'checked\')) {
          cj(this).parent(\'td\').next(\'td\').children(\'input[id^="order_by_pagebreak_"]\').prop({checked: false, disabled: true});
        }
        else {
          cj(this).parent(\'td\').next(\'td\').children(\'input[id^="order_by_pagebreak_"]\').prop({disabled: false});
        }
      }

      function hideRow(i) {
        showHideRow(i);
        // clear values on hidden field, so they\'re not saved
        cj(\'select#order_by_column_\'+ i).val(\'\');
        cj(\'select#order_by_order_\'+ i).val(\'ASC\');
        cj(\'input#order_by_section_\'+ i).prop(\'checked\', false);
        cj(\'input#order_by_pagebreak_\'+ i).prop(\'checked\', false);
      }

      '; ?>

    </script>
  </div>
<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_crmScope($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>