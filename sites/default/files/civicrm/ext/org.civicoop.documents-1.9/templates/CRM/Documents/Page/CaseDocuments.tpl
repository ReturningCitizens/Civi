{*
 * Template file to display documents on a case
 *
 *}

{crmScope extensionKey='org.civicoop.documents'}

<div id="case-documents" class="crm-accordion-wrapper collapsed">

<div class="crm-accordion-header">{ts}Documents{/ts}</div>

<div class="crm-accordion-body">
{if $permission EQ 'edit'}
    {capture assign=newDocumentURL}{crmURL p="civicrm/documents/document" q="reset=1&action=add&cid=`$clientId`&context=case&case_id=`$caseId`"}{/capture}
    <div class="action-link">
        <a accesskey="N" href="{$newDocumentURL}" class="button">
            <span><div class="icon add-icon"></div>{ts}New document{/ts}</span>
        </a>
    </div>

{/if}
<table>
    <thead>
        <tr>
            <th class="ui-state-default">{ts}Subject{/ts}</th>
            <th class="ui-state-default">{ts}Contacts{/ts}</th>
            <th class="ui-state-default">{ts}Date modified{/ts}</th>
            <th class="ui-state-default">{ts}Modified by{/ts}</th>
            <th class="no-sort ui-state-default"></th>
        </tr>
     </thead>
     <tbody>
        
        {foreach from=$documents item=doc}
            <tr class="{cycle values="odd,even"}">
                <td>{$doc->getSubject()}</td>
                <td>{$doc->getFormattedContacts()}</td>
                <td>{$doc->getFormattedDateUpdated()}</td>
                <td>{$doc->getFormattedUpdatedBy()}</td>
                <td>
                    {include file=CRM/Documents/actionlinks.tpl contactId=$clientId}
                </td>
            </tr>
        {/foreach}
    </tbody>
</table>

</div>
</div>

<script type="text/javascript">
{literal}
cj(function() {
    var caseDocs = cj('#case-documents').detach();
    {/literal}{if ($isCivi44)}{literal}
    cj('#view-related-cases').after(caseDocs);
    {/literal}{else}{literal}
    cj('#case_custom_edit').after(caseDocs);
    {/literal}{/if}{literal}
});
{/literal}
</script>

{/crmScope}
