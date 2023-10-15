import { LightningElement, wire, api } from 'lwc';
import { getRecord, getFieldValue, updateRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import ID_FIELD from '@salesforce/schema/Contact.Id';
import MY_CHECKBOX_FIELD from '@salesforce/schema/Contact.Test_Checkbox_Field__c';

export default class LwcDataserviceCmp extends LightningElement {
    @api recordId;

    @wire(getRecord, { recordId: '$recordId', 
                        fields: [ID_FIELD, MY_CHECKBOX_FIELD], 
                        optionalFields: []
                      })
    contact;
  
    get checkboxValue() {
      return getFieldValue(this.contact.data, MY_CHECKBOX_FIELD);
    }
  
    handleFieldChange(event) {
      const fields = {};
      fields[ID_FIELD.fieldApiName] = this.recordId;
      fields[MY_CHECKBOX_FIELD.fieldApiName] = event.target.checked;
      const contactToUpdate = { fields };
      this.updateContact(contactToUpdate);
    }
  
    updateContact(contactToUpdate) {
      updateRecord(contactToUpdate)
        .then(() => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'checkbox Updated',
                    variant: 'success'
                })
            );
        })
        .catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error occurred while updating checkbox',
                    message: error.body.message,
                    variant: 'error'
                })
            );
        });
    }
  

}