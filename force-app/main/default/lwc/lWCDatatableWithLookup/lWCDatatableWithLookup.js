import { LightningElement, track, wire } from 'lwc';
import fetchContact from '@salesforce/apex/AccountDataController.fetchContact';
import { updateRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';
 
const columns = [
    { label: 'Name', fieldName: 'Name', editable: true },
    { label: 'Email', fieldName: 'Email', type: 'email', editable: true },
    {
        label: 'Account Name',
        fieldName: 'AccountId', //lookup API field name 
        type: 'lookupColumn',
        typeAttributes: {
            object: 'Contact', //object name which have lookup field
            fieldName: 'AccountId',  //lookup API field name 
            value: { fieldName: 'AccountId' },  //lookup API field name 
            context: { fieldName: 'Id' }, 
            name: 'Account',  //lookup object API Name 
            fields: ['Account.Name'], //lookup objectAPIName.Name
            target: '_self'
        },
        editable: false,
    },
    /*{
        label: 'User',
        fieldName: 'User__c',
        type: 'lookupColumn',
        typeAttributes: {
          object: 'Contact',
          fieldName: 'User__c',
          value: { fieldName: 'User__c' },
          context: { fieldName: 'Id' },
          name: 'User',
          fields: ['User.Name'],
          target: '_self'
        },
        editable: false,
      }*/ //Note : If you have custom field then you can use this
]

export default class LWCDatatableWithLookup extends LightningElement {
    columns = columns;
    showSpinner = false;
    @track data = [];
    @track contactData;
    @track draftValues = [];
    lastSavedData = [];
 
    //here I pass picklist option so that this wire method call after above method
    @wire(fetchContact, {})
    wireData(result) {
        debugger;
        this.contactData = result;
        if (result.data) {
            this.data = JSON.parse(JSON.stringify(result.data));
            console.log(' this.data '+ this.data);
            console.log(this.data);
            this.data.forEach(ele => {
                ele.accountLink = ele.AccountId != undefined ? '/' + ele.AccountId : '';
                ele.accountName = ele.AccountId != undefined ? ele.Account.Name : '';
            })
 
            this.lastSavedData = JSON.parse(JSON.stringify(this.data));
            console.log(' this.lastSavedData '+ this.lastSavedData);
 
        } else if (result.error) {
            console.log(result.error);
            this.data = undefined;
        }
    };
 
    updateDataValues(updateItem) {
        debugger;
        let copyData = JSON.parse(JSON.stringify(this.data));
 
        copyData.forEach(item => {
            if (item.Id === updateItem.Id) {
                for (let field in updateItem) {
                    item[field] = updateItem[field];
                }
            }
        });
 
        //write changes back to original data
        this.data = [...copyData];
    }
 
    updateDraftValues(updateItem) {
        debugger;
        let draftValueChanged = false;
        let copyDraftValues = [...this.draftValues];
        //store changed value to do operations
        //on save. This will enable inline editing &
        //show standard cancel & save button
        copyDraftValues.forEach(item => {
            if (item.Id === updateItem.Id) {
                for (let field in updateItem) {
                    item[field] = updateItem[field];
                }
                draftValueChanged = true;
            }
        });
 
        if (draftValueChanged) {
            this.draftValues = [...copyDraftValues];
        } else {
            this.draftValues = [...copyDraftValues, updateItem];
        }
    }
 
    //listener handler to get the context and data
    //updates datatable, here I used AccountId you can use your look field API name
    lookupChanged(event) {
        debugger;
        console.log(event.detail.data);
        event.stopPropagation();
        let dataRecieved = event.detail.data;
        let accountIdVal = dataRecieved.value != undefined ? dataRecieved.value : null;
        let updatedItem = { Id: dataRecieved.context, AccountId: accountIdVal  };
        console.log(updatedItem);
        this.updateDraftValues(updatedItem);
        this.updateDataValues(updatedItem);
    }
 
    //handler to handle cell changes & update values in draft values
    handleCellChange(event) {
        debugger;
        this.updateDraftValues(event.detail.draftValues[0]);
    }
 
    handleSave(event) {
        debugger;
        this.showSpinner = true;
        this.saveDraftValues = this.draftValues;
 
        const recordInputs = this.saveDraftValues.slice().map(draft => {
            const fields = Object.assign({}, draft);
            return { fields };
        });
        debugger;
        // Updateing the records using the UiRecordAPi
        const promises = recordInputs.map(recordInput => updateRecord(recordInput));
        Promise.all(promises).then(res => {
            this.showToast('Success', 'Records Updated Successfully!', 'success', 'dismissable');
            this.draftValues = [];
            return this.refresh();
        }).catch(error => {
            console.log(error);
            this.showToast('Error', 'An Error Occured!!', 'error', 'dismissable');
        }).finally(() => {
            this.draftValues = [];
            this.showSpinner = false;
        });
    }
 
    handleCancel(event) {
        debugger;
        //remove draftValues & revert data changes
        this.data = JSON.parse(JSON.stringify(this.lastSavedData));
        this.draftValues = [];
    }
 
    showToast(title, message, variant, mode) {
        debugger;
        const evt = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
            mode: mode
        });
        this.dispatchEvent(evt);
    }
 
    // This function is used to refresh the table once data updated
    async refresh() {
        debugger;
        await refreshApex(this.accountData);
    }
}