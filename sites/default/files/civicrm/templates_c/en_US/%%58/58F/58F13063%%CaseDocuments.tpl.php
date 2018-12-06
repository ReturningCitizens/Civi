<?php /* Smarty version 2.6.30, created on 2018-12-03 10:25:56
         compiled from CRM/Documents/Page/CaseDocuments.tpl */ ?>
<?php require_once(SMARTY_CORE_DIR . 'core.load_plugins.php');
smarty_core_load_plugins(array('plugins' => array(array('block', 'crmScope', 'CRM/Documents/Page/CaseDocuments.tpl', 1, false),array('block', 'ts', 'CRM/Documents/Page/CaseDocuments.tpl', 10, false),array('function', 'crmURL', 'CRM/Documents/Page/CaseDocuments.tpl', 14, false),array('function', 'cycle', 'CRM/Documents/Page/CaseDocuments.tpl', 35, false),)), $this); ?>
<?php $this->_tag_stack[] = array('crmScope', array('extensionKey' => "")); $_block_repeat=true;smarty_block_crmScope($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>
<?php $this->_tag_stack[] = array('crmScope', array('extensionKey' => 'org.civicoop.documents')); $_block_repeat=true;smarty_block_crmScope($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>

<div id="case-documents" class="crm-accordion-wrapper collapsed">

<div class="crm-accordion-header"><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Documents<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></div>

<div class="crm-accordion-body">
<?php if ($this->_tpl_vars['permission'] == 'edit'): ?>
    <?php ob_start(); ?><?php echo CRM_Utils_System::crmURL(array('p' => "civicrm/documents/document",'q' => "reset=1&action=add&cid=".($this->_tpl_vars['clientId'])."&context=case&case_id=".($this->_tpl_vars['caseId'])), $this);?>
<?php $this->_smarty_vars['capture']['default'] = ob_get_contents();  $this->assign('newDocumentURL', ob_get_contents());ob_end_clean(); ?>
    <div class="action-link">
        <a accesskey="N" href="<?php echo $this->_tpl_vars['newDocumentURL']; ?>
" class="button">
            <span><div class="icon add-icon"></div><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>New document<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></span>
        </a>
    </div>

<?php endif; ?>
<table>
    <thead>
        <tr>
            <th class="ui-state-default"><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Subject<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></th>
            <th class="ui-state-default"><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Contacts<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></th>
            <th class="ui-state-default"><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Date modified<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></th>
            <th class="ui-state-default"><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Modified by<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></th>
            <th class="no-sort ui-state-default"></th>
        </tr>
     </thead>
     <tbody>
        
        <?php $_from = $this->_tpl_vars['documents']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['doc']):
?>
            <tr class="<?php echo smarty_function_cycle(array('values' => "odd,even"), $this);?>
">
                <td><?php echo $this->_tpl_vars['doc']->getSubject(); ?>
</td>
                <td><?php echo $this->_tpl_vars['doc']->getFormattedContacts(); ?>
</td>
                <td><?php echo $this->_tpl_vars['doc']->getFormattedDateUpdated(); ?>
</td>
                <td><?php echo $this->_tpl_vars['doc']->getFormattedUpdatedBy(); ?>
</td>
                <td>
                    <?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "CRM/Documents/actionlinks.tpl", 'smarty_include_vars' => array('contactId' => $this->_tpl_vars['clientId'])));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?>
                </td>
            </tr>
        <?php endforeach; endif; unset($_from); ?>
    </tbody>
</table>

</div>
</div>

<script type="text/javascript">
<?php echo '
cj(function() {
    var caseDocs = cj(\'#case-documents\').detach();
    '; ?>
<?php if (( $this->_tpl_vars['isCivi44'] )): ?><?php echo '
    cj(\'#view-related-cases\').after(caseDocs);
    '; ?>
<?php else: ?><?php echo '
    cj(\'#case_custom_edit\').after(caseDocs);
    '; ?>
<?php endif; ?><?php echo '
});
'; ?>

</script>

<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_crmScope($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>
<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_crmScope($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>