import { LightningElement, wire} from 'lwc';
import getAccountLocations from '@salesforce/apex/AccountHelper.getAccountLocations1';

// Import message service features required for publishing and the message channel
import { publish, MessageContext } from 'lightning/messageService';
import selectedEntity from '@salesforce/messageChannel/Selected_EntityId__c';

export default class ShowAccountList extends LightningElement {
    
    @wire(MessageContext)
    messageContext;
    
    //retrieve account records from database via Apex class
    @wire(getAccountLocations) accounts;

    //clicking the div fires this event
    handleClick(event) {
        //retrieve AccountId from div
        let accountId = event.target.dataset.item;
        let arr = this.accounts.data.find(element => element.Id == accountId);
        let payload = { record: arr };
        publish(this.messageContext, selectedEntity, payload);       
    }       
}