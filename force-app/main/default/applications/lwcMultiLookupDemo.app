<aura:application >
	<aura:attribute name="selectedRecords" type="lwcMultiLookupController.SObjectResult[]" description="text" ></aura:attribute>
<lightning:card title="">
    <c:lwcMultiLookup objectName="Account" fieldName="Name" 
                      iconName = "standard:account" onselected="{!c.selectedRecords}"/>

    <div class="slds-page-header">
        <div class="slds-media">
            <div class="slds-media__figure">
                <span class="slds-icon_container slds-icon-standard-opportunity" title="Account Record">
                </span>
            </div>
            <div class="slds-media__body">
                <h1 class="slds-page-header__title slds-truncate slds-align-middle" title="Account Record">Accounts</h1>
                <p class="slds-text-body_small slds-line-height_reset"></p>
            </div>
        </div>
    </div>
    <table class="slds-table slds-table_bordered slds-table_cell-buffer">
        <thead>
            <tr class="slds-text-title_caps">
                <th scope="col">
                    <div class="slds-truncate" title="Account Id">Account Id</div>
                </th>
                <th scope="col">
                    <div class="slds-truncate" title="Account Name">Account Name</div>
                </th>
            </tr>
        </thead>
        <tbody>
            <aura:iteration var="selectRec" items="{!v.selectedRecords}">
                <tr>
                    <th scope="row" data-label="Account Id">
                        <div class="slds-truncate" title="{!selectRec.recId}"><a id="{!selectRec.recId}">{!selectRec.recId}</a></div>
                    </th>
                    <td data-label="Account Name">
                        <div class="slds-truncate" title="{!selectRec.recName}">{!selectRec.recName}</div>
                    </td>
                </tr>
            </aura:iteration>
        </tbody>
    </table>
</lightning:card>
</aura:application>