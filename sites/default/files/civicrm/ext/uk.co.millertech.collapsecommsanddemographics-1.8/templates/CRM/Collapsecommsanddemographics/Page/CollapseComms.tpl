<div class="collapsedcommsanddemos ccnd-comms crm-collapsible collapsed ui-corner-all">
    <div class="collapsible-title">
        {ts}Communication Preferences{/ts}
        <span class="ccnd_demo_extra_content">
            {foreach from=$privacy key=privacy_key item=value}
                {if $privacy_key == 'do_not_phone' && $value == 1}
                    <span class="crm-i fa-phone" title="Do Not Phone"></span>

                {elseif $privacy_key == 'do_not_email' && $value == 1}

                    <span class="crm-i fa-envelope-o" title="Do Not Email"></span>

                {elseif $privacy_key == 'do_not_mail' && $value == 1}

                    <span class="crm-i fa-file-text-o" title="Do Not Mail"></span>

                {elseif $privacy_key == 'do_not_sms' && $value == 1}

                    <span class="crm-i fa-whatsapp" title="Do Not SMS"></span>

                {elseif $privacy_key == 'do_not_trade' && $value == 1}

                    <span class="crm-i fa-handshake-o" title="Do Not Trade"></span>
                {/if}
            {/foreach}
            {if $is_opt_out}
                <span class="icon privacy-flag" title="No Bulk Emails"></span>
            {/if}
        </span>
    </div>
    <div class="crm-summary-comm-pref-block">
        <div class="crm-summary-block" id="communication-pref-block">
            {include file="CRM/Contact/Page/Inline/CommunicationPreferences.tpl"}
        </div>
    </div>
</div>
{literal}
    <style>
        .collapsedcommsanddemos.ccnd-comms .ccnd_demo_extra_content {
            display: inline-block;
        }

        .collapsedcommsanddemos.ccnd-comms .ccnd_demo_extra_content .crm-i,
        .collapsedcommsanddemos.ccnd-comms .ccnd_demo_extra_content .icon.privacy-flag {
            margin: 0 0 0 3px;
            padding: 0;
            color: red;
            float: none !important;
            vertical-align: middle;
        }
    </style>
<script>
    CRM.$(function () {
        CRM.$("#communication-pref-block").on("crmLoad", function (event, data) {
            var privacy_values = CRM.$(".crm-contact-privacy_values").html().replace(/ +/g, ' ').trim();
            privacy_values = privacy_values.split("<br>");
            var newSigns = '';
            CRM.$.each(privacy_values, function (index, item) {
                item = item.trim().toLowerCase();
                if (item == '{/literal}{$ccnd_privacy_options.do_not_phone|lower}{literal}') {
                    newSigns += '<span class="crm-i fa-phone" title="Do Not Phone"></span> ';
                } else if (item == '{/literal}{$ccnd_privacy_options.do_not_email|lower}{literal}') {
                    newSigns += '<span class="crm-i fa-envelope-o" title="Do Not Email"></span> ';
                } else if (item == '{/literal}{$ccnd_privacy_options.do_not_mail|lower}{literal}') {
                    newSigns += '<span class="crm-i fa-file-text-o" title="Do Not Mail"></span> ';
                } else if (item == '{/literal}{$ccnd_privacy_options.do_not_sms|lower}{literal}') {
                    newSigns += '<span class="crm-i fa-whatsapp" title="Do Not SMS"></span> ';
                } else if (item == '{/literal}{$ccnd_privacy_options.do_not_trade|lower}{literal}') {
                    newSigns += '<span class="crm-i fa-handshake-o" title="Do Not Trade"></span> ';
                } else if (item == '{/literal}{$ccnd_privacy_options.is_opt_out|lower}{literal}') {
                    newSigns += '<span class="icon privacy-flag" title="No Bulk Emails"></span> ';
                }
            });
            CRM.$(".collapsedcommsanddemos.ccnd-comms .ccnd_demo_extra_content").html(newSigns);
        });
    });
</script>
{/literal}