import { LightningElement, track, wire } from 'lwc';
import { getRecord } from "lightning/uiRecordApi";
const FIELDS = [
                    "Contact.Name",
                    "Contact.AccountId.Name",
                    "Contact.AccountId.AccountNumber",
               ];
export default class ComponentName extends LightningElement {
    debugger;
    objectRecords;
    relatedObjectRecords;
    @wire(getRecord, {
        recordId: "0032v00003uGZ2RAAW",//"$recordId",
        fields: FIELDS
    })
    acordFormDetails(result) {
        if (typeof result.data !== "undefined") 
        {
            this.objectRecords = result.data.fields;
            this.relatedObjectRecords = this.objectRecords.AccountId.value.fields.Name.value;
        }
    }
}