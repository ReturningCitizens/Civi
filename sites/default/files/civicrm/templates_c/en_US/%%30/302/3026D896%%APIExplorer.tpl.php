<?php /* Smarty version 2.6.30, created on 2018-12-03 09:46:45
         compiled from CRM/Admin/Page/APIExplorer.tpl */ ?>
<?php require_once(SMARTY_CORE_DIR . 'core.load_plugins.php');
smarty_core_load_plugins(array('plugins' => array(array('block', 'crmScope', 'CRM/Admin/Page/APIExplorer.tpl', 1, false),array('block', 'ts', 'CRM/Admin/Page/APIExplorer.tpl', 232, false),array('function', 'crmAPI', 'CRM/Admin/Page/APIExplorer.tpl', 248, false),array('function', 'help', 'CRM/Admin/Page/APIExplorer.tpl', 270, false),array('modifier', 'htmlspecialchars', 'CRM/Admin/Page/APIExplorer.tpl', 378, false),)), $this); ?>
<?php $this->_tag_stack[] = array('crmScope', array('extensionKey' => "")); $_block_repeat=true;smarty_block_crmScope($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?><style>
  <?php echo '
  #mainTabContainer {
    background: transparent;
    border: 0 none;
  }
  #mainTabContainer pre {
    line-height: 14px;
    font-size: 11px;
    margin: 0;
    border: 0 none;
  }
  #mainTabContainer ul.ui-tabs-nav {
    font-size: 1.1em;
    margin-bottom: .6em;
  }
  pre#api-result {
    max-height: 50em;
  }
  pre#api-result,
  div#doc-result,
  pre#example-result {
    padding:1em;
    border: 1px solid lightgrey;
    margin-top: 1em;
    overflow: auto;
  }
  #api-params tr td {
    padding-top: 13px;
  }
  #api-params-table th:first-child,
  #api-params-table td:first-child {
    width: 35%;
    min-width: 190px;
  }
  #api-params-table td[colspan] {
    width: 100%;
  }
  #api-params-table td:first-child + td,
  #api-params-table th:first-child + th {
    width: 140px;
  }
  #api-params-table td:first-child + td select {
    width: 132px;
  }
  #api-params-table td:first-child + td + td,
  #api-params-table th:first-child + th + th {
    width: 65%
  }
  #api-params .api-sort-handle {
    margin-right: 10px;
    cursor: move;
  }
  #api-params tr td > .crm-i,
  #api-params tr td > a .crm-i {
    color: lightgrey;
  }
  #api-params tr:hover td > .crm-i,
  #api-params tr:hover td > a .crm-i {
    color: grey;
  }
  #api-params .api-and-or {
    margin-left: 1.2em;
    font-size: .8em;
    position: relative;
    top: 5px;
    width: 10em;
    margin-bottom: -9px;
  }
  #api-params .api-and-or > span {
    padding: 0 1em;
    background: white;
    cursor: pointer;
  }
  #api-params .api-or,
  #api-params tr.or .api-and {
    color: lightgrey;
  }
  #api-params tr.or .api-or {
    color: inherit;
  }
  #api-params .api-and-or .crm-i {
    transform: rotate(180deg);
  }
  #api-params tr.or .api-and-or .crm-i {
    transform: initial;
  }
  #api-params .api-and-or:hover .crm-i {
    color: #2786c2;
  }
  #api-params tr.or {
    border-top: 3px solid lightgrey;
    border-left: 3px solid lightgrey;
    border-right: 3px solid lightgrey;
  }
  #api-params tr.or + tr {
    border-left: 3px solid lightgrey;
    border-right: 3px solid lightgrey;
    border-bottom: 3px solid lightgrey;
  }
  #api-params tr.or + tr.or {
    border-top: none;
    border-bottom: none;
  }
  #api-generated td:first-child {
    width: 60px;
  }
  #api-params {
    min-height: 1em;
  }
  #api-params .red-icon {
    margin-top: .5em;
  }
  .api-param-remove {
    float: right;
  }
  #mainTabContainer label {
    display: inline;
    font-weight: bold;
  }
  #mainTabContainer label.api-checkbox-label {
    font-weight: normal;
  }
  #mainTabContainer h4 {
    font-weight: bold;
    font-size: 1.2em;
    margin: .2em .2em 0.5em;
  }
  #api-join {
    margin-top: 1em;
    font-size: .8em;
  }
  #api-join ul {
    margin: 0;
    padding: 0 0 0.25em 2.5em;
  }
  #api-join li > i {
    opacity: .5;
  }
  #api-join li.join-enabled > i {
    opacity: 1;
  }
  #api-join li.join-not-available {
    font-style: italic;
  }
  #api-generated-wraper,
  #api-result {
    overflow: auto;
  }
  #api-explorer .api-options-row + .api-options-row label {
    display: none;
  }
  .api-options-row td:first-child {
    text-align: right;
  }
  .select2-choice .icon {
    margin-top: .2em;
    background-image: url("'; ?>
<?php echo $this->_tpl_vars['config']->resourceBase; ?>
<?php echo '/i/icons/jquery-ui-2786C2.png");
  }
  .select2-default .icon {
    background-image: url("'; ?>
<?php echo $this->_tpl_vars['config']->resourceBase; ?>
<?php echo '/i/icons/jquery-ui-52534D.png");
    opacity: .8;
  }
  .api-field-desc {
    font-size: .8em;
    color: #828282;
    line-height: 1.3em;
  }
  .select2-highlighted .api-field-desc,
  .select2-highlighted .crm-marker {
    color: #fcfcfc;
  }
  .api-param-op[readonly] {
    width: 4em;
  }
  pre ol.linenums li {
    list-style-type: decimal;
    color: #CFCFCF;
  }
  pre ol.linenums li:hover {
    color: #828282;
    background-color: #f2f2f2;
  }
  pre li.L1, pre li.L3, pre li.L5, pre li.L7, pre li.L9,
  #api-generated td + td,
  #mainTabContainer pre {
    background-color: #f9f9f9;
  }
  .api-doc-code {
    margin-top: 1em;
    border-top: 1px solid #d3d3d3;
  }
  .api-doc-code .collapsible-title {
    font-weight: bold;
    margin-top: .5em;
  }
  .doc-filename {
    text-align: right;
    font-style: italic;
  }
  '; ?>

</style>

<div id="mainTabContainer">
  <ul>
    <li class="ui-corner-all" title="GUI to build and execute API calls">
      <a href="#explorer-tab"><i class="crm-i fa-search"></i> <?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Explorer<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></a>
    </li>
    <li class="ui-corner-all" title="Auto-generated examples from the test suite">
      <a href="#examples-tab"><i class="crm-i fa-book"></i> <?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Examples<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></a>
    </li>
    <li class="ui-corner-all" title="API source-code and code-level documentation">
      <a href="#docs-tab"><i class="crm-i fa-code"></i> <?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Code Docs<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></a>
    </li>
  </ul>

  <div id="explorer-tab">

    <form id="api-explorer">
      <label for="api-entity"><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Entity<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>:</label>
      <select class="crm-form-select big required" id="api-entity" name="entity">
        <option value="" selected="selected"><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Choose<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>...</option>
        <?php echo smarty_function_crmAPI(array('entity' => 'Entity','var' => 'entities'), $this);?>

        <?php $_from = $this->_tpl_vars['entities']['values']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['entity']):
?>
          <option value="<?php echo $this->_tpl_vars['entity']; ?>
" <?php if (! empty ( $this->_tpl_vars['entities']['deprecated'] ) && in_array ( $this->_tpl_vars['entity'] , $this->_tpl_vars['entities']['deprecated'] )): ?>class="strikethrough"<?php endif; ?>>
            <?php echo $this->_tpl_vars['entity']; ?>

          </option>
        <?php endforeach; endif; unset($_from); ?>
      </select>
      &nbsp;&nbsp;
      <label for="api-action"><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Action<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>:</label>
      <input class="crm-form-text" id="api-action" name="action" value="get">
      &nbsp;&nbsp;

      <label for="debug-checkbox" class="api-checkbox-label" title="<?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Display debug output with results.<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>">
        <input type="checkbox" class="crm-form-checkbox api-param-checkbox api-input" id="debug-checkbox" name="debug" value="1" >debug
      </label>
      &nbsp;|&nbsp;

      <label for="sequential-checkbox" class="api-checkbox-label" title="<?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Sequential is more compact format, well-suited for json and smarty.<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>">
        <input type="checkbox" class="crm-form-checkbox api-param-checkbox api-input" id="sequential-checkbox" name="sequential" checked="checked" value="1">sequential
      </label>

      <div id="api-join" class="crm-form-block crm-collapsible collapsed" style="display:none;">
        <h4 class="collapsible-title"><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Join on:<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?> <?php echo smarty_function_help(array('id' => 'api-join'), $this);?>
</h4>
        <div></div>
      </div>

      <table id="api-params-table">
        <thead style="display: none;">
          <tr>
            <th><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Name<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?> <?php echo smarty_function_help(array('id' => 'param-name'), $this);?>
</th>
            <th><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Operator<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?> <?php echo smarty_function_help(array('id' => 'param-op'), $this);?>
</th>
            <th><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Value<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?> <?php echo smarty_function_help(array('id' => 'param-value'), $this);?>
</th>
          </tr>
        </thead>
        <tbody id="api-params"></tbody>
      </table>
      <div id="api-param-buttons" style="display: none;">
        <a href="#" class="crm-hover-button" id="api-params-add"><i class="crm-i fa-plus"></i> <?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Add Parameter<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></a>
        <a href="#" class="crm-hover-button" id="api-option-add"><i class="crm-i fa-cog"></i> <?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Add Option<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></a>
        <a href="#" class="crm-hover-button" id="api-chain-add"><i class="crm-i fa-link"></i> <?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Chain API Call<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></a>
        <?php echo smarty_function_help(array('id' => "api-chain"), $this);?>

      </div>
      <div id="api-generated-wraper">
        <table id="api-generated" border=1>
          <caption><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Code<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?></caption>
          <tr><td>Rest</td><td><pre id="api-rest"></pre></td></tr>
          <tr><td>Smarty</td><td><pre class="linenums" id="api-smarty" title='smarty syntax (for get actions)'></pre></td></tr>
          <tr><td>Php</td><td><pre class="linenums" id="api-php" title='php syntax'></pre></td></tr>
          <tr><td>Javascript</td><td><pre class="linenums" id="api-json" title='javascript syntax'></pre></td></tr>
          <tr><td><a href="https://github.com/civicrm/cv" target="_blank">cv</a></td><td><pre id="api-cv" title='cv cli syntax'></pre></td></tr>
          <?php if ($this->_tpl_vars['config']->userSystem->is_drupal): ?>
            <tr><td><a href="http://www.drush.org/" target="_blank">drush</a></td><td><pre id="api-drush" title='drush syntax'></pre></td></tr>
          <?php endif; ?>
          <?php if ($this->_tpl_vars['config']->userSystem->is_wordpress): ?>
            <tr><td><a href="http://wp-cli.org/" target="_blank">wp-cli</a></td><td><pre id="api-wpcli" title='wp-cli syntax'></pre></td></tr>
          <?php endif; ?>
        </table>
      </div>
      <div class="crm-submit-buttons">
        <span class="crm-button crm-i-button">
          <i class="crm-i fa-bolt"></i><input type="submit" value="<?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Execute<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>" class="crm-form-submit" accesskey="S" title="<?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Execute API call and display results<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>"/>
        </span>
      </div>
<pre id="api-result" class="linenums">
<?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Results are displayed here.<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>
</pre>
    </form>
  </div>

  <div id="examples-tab">
    <form id="api-examples">
      <label for="example-entity"><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Entity<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>:</label>
      <select class="crm-form-select big required" id="example-entity" name="entity">
        <option value="" selected="selected"><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Choose<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>...</option>
        <?php $_from = $this->_tpl_vars['examples']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['entity']):
?>
          <option value="<?php echo $this->_tpl_vars['entity']; ?>
" <?php if (! empty ( $this->_tpl_vars['entities']['deprecated'] ) && in_array ( $this->_tpl_vars['entity'] , $this->_tpl_vars['entities']['deprecated'] )): ?>class="strikethrough"<?php endif; ?>>
            <?php echo $this->_tpl_vars['entity']; ?>

          </option>
        <?php endforeach; endif; unset($_from); ?>
      </select>
      &nbsp;&nbsp;
      <label for="example-action"><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Example<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>:</label>
      <select class="crm-form-select big crm-select2" id="example-action" name="action">
        <option value="" selected="selected"><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Choose<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>...</option>
      </select>
<pre id="example-result" class="linenums lang-php" placeholder="<?php $this->_tag_stack[] = array('ts', array('escape' => 'html')); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Results are displayed here.<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>">
<?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Results are displayed here.<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>
</pre>
    </form>
  </div>

  <div id="docs-tab">
    <form id="api-docs">
      <label for="doc-entity"><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Entity<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>:</label>
      <select class="crm-form-select big required" id="doc-entity" name="entity">
        <option value="" selected="selected"><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Choose<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>...</option>
        <?php $_from = $this->_tpl_vars['entities']['values']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['entity']):
?>
          <option value="<?php echo $this->_tpl_vars['entity']; ?>
" <?php if (! empty ( $this->_tpl_vars['entities']['deprecated'] ) && in_array ( $this->_tpl_vars['entity'] , $this->_tpl_vars['entities']['deprecated'] )): ?>class="strikethrough"<?php endif; ?>>
            <?php echo $this->_tpl_vars['entity']; ?>

          </option>
        <?php endforeach; endif; unset($_from); ?>
      </select>
      &nbsp;&nbsp;
      <label for="doc-action"><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Action<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>:</label>
      <select class="crm-form-select big crm-select2" id="doc-action" name="action">
        <option value="" selected="selected"><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Choose<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>...</option>
      </select>
      <div id="doc-result">
        <?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?>Results are displayed here.<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>
      </div>
    </form>
  </div>
</div>

<?php echo '<script type="text/template" id="api-param-tpl"><tr class="api-param-row"><td><i class="crm-i api-sort-handle fa-arrows"></i><input style="width: 90%;" class="crm-form-text api-param-name api-input" value="<%= name %>" placeholder="'; ?><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?><?php echo 'Parameter'; ?><?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?><?php echo '" /><div class="api-and-or"><span><span class="api-and">'; ?><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?><?php echo 'AND'; ?><?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?><?php echo '</span> <i class="crm-i fa-toggle-on"></i> <span class="api-or">'; ?><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?><?php echo 'OR'; ?><?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?><?php echo '</span></span></div></td><td>'; ?><?php echo '
      <% if (noOps) { %>
        <input class="crm-form-text api-param-op" value="=" readonly="true" title="'; ?><?php echo ''; ?><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?><?php echo 'Other operators not available for this action.'; ?><?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?><?php echo ''; ?><?php echo '" />
      <% } else { %>
      '; ?><?php echo '<select class="crm-form-select api-param-op">'; ?><?php $_from = $this->_tpl_vars['operators']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['op']):
?><?php echo '<option value="'; ?><?php echo ((is_array($_tmp=$this->_tpl_vars['op'])) ? $this->_run_mod_handler('htmlspecialchars', true, $_tmp) : htmlspecialchars($_tmp)); ?><?php echo '">'; ?><?php echo ((is_array($_tmp=$this->_tpl_vars['op'])) ? $this->_run_mod_handler('htmlspecialchars', true, $_tmp) : htmlspecialchars($_tmp)); ?><?php echo '</option>'; ?><?php endforeach; endif; unset($_from); ?><?php echo '</select>'; ?><?php echo '
      <% } %>
      '; ?><?php echo '</td><td><input style="width: 85%;" class="crm-form-text api-param-value api-input" placeholder="'; ?><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?><?php echo 'Value'; ?><?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?><?php echo '"/><a class="crm-hover-button api-param-remove" href="#"><i class="crm-i fa-times"></i></a></td></tr></script><script type="text/template" id="api-return-tpl"><tr class="api-return-row"><td colspan="3"><label for="api-return-value"><%- title %>:<% if(required) '; ?>{<?php echo ' %> <span class="crm-marker">*</span> <% '; ?>}<?php echo ' %></label> &nbsp;<input type="hidden" class="api-param-name" value="return" /><input style="width: 50%;" id="api-return-value" class="crm-form-text api-param-value api-input"/></td></tr></script><script type="text/template" id="api-options-tpl"><tr class="api-options-row"><td><label>'; ?><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?><?php echo 'Options'; ?><?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?><?php echo ': &nbsp;</label></td><td><input class="crm-form-text api-option-name api-input" style="width: 12em;" placeholder="'; ?><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?><?php echo 'Option'; ?><?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?><?php echo '"/></td><td><input style="width: 85%;" class="crm-form-text api-option-value api-input" placeholder="'; ?><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?><?php echo 'Value'; ?><?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?><?php echo '"/><a class="crm-hover-button api-param-remove" href="#"><i class="crm-i fa-times"></i></a></td></tr></script><script type="text/template" id="api-chain-tpl"><tr class="api-chain-row"><td><i class="crm-i api-sort-handle fa-arrows"></i><select style="width: 90%;" class="crm-form-select api-chain-entity"><option value=""></option>'; ?><?php $_from = $this->_tpl_vars['entities']['values']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['entity']):
?><?php echo '<option value="'; ?><?php echo $this->_tpl_vars['entity']; ?><?php echo '" '; ?><?php if (! empty ( $this->_tpl_vars['entities']['deprecated'] ) && in_array ( $this->_tpl_vars['entity'] , $this->_tpl_vars['entities']['deprecated'] )): ?><?php echo 'class="strikethrough"'; ?><?php endif; ?><?php echo '>'; ?><?php echo $this->_tpl_vars['entity']; ?><?php echo '</option>'; ?><?php endforeach; endif; unset($_from); ?><?php echo '</select></td><td><select class="crm-form-select api-chain-action"><option value="get">get</option></select></td><td><input style="width: 85%;" class="crm-form-text api-param-value api-input" value="'; ?>{<?php echo ''; ?>}<?php echo '" placeholder="'; ?><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?><?php echo 'API Params'; ?><?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?><?php echo '"/><a class="crm-hover-button api-param-remove" href="#"><i class="crm-i fa-times"></i></a></td></tr></script><script type="text/template" id="doc-code-tpl"><div class="crm-collapsible collapsed api-doc-code"><div class="collapsible-title">'; ?><?php $this->_tag_stack[] = array('ts', array()); $_block_repeat=true;smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], null, $this, $_block_repeat);while ($_block_repeat) { ob_start(); ?><?php echo 'Source Code'; ?><?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_ts($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?><?php echo '</div><div><div class="doc-filename"><%- file %></div><pre class="lang-php linenums"><%- code %></pre></div></div></script><script type="text/template" id="join-tpl">'; ?><?php echo '
  <ul class="fa-ul">
    <% _.forEach(joins, function(join, name) { %>
      <li <% if(join.checked) { %>class="join-enabled"<% } if(join.disabled) { %>class="join-not-available"<% }%>>
        <i class="fa-li crm-i fa-reply fa-rotate-180"></i>
        <label for="select-join-<%= name %>" class="api-checkbox-label">
          <input type="checkbox" id="select-join-<%= name %>" value="<%= name %>" data-entity="<%= join.entity %>" <% if(join.checked) { %>checked<% } if(join.disabled) { %>disabled<% } %>/>
          <%- join.title %>
        </label>
      </li>
      <% if(join.children) print(tpl({joins: join.children, tpl: tpl})); %>
    <% }); %>
  </ul>
  '; ?><?php echo '</script>'; ?>

<?php $_block_content = ob_get_contents(); ob_end_clean(); $_block_repeat=false;echo smarty_block_crmScope($this->_tag_stack[count($this->_tag_stack)-1][1], $_block_content, $this, $_block_repeat); }  array_pop($this->_tag_stack); ?>