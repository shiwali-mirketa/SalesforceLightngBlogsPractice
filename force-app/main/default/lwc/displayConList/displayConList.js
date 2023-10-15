import { LightningElement, api, wire, track } from 'lwc';

import getContacts from '@salesforce/apex/AccountHelper.getContacts';
let i=0;

export default class DisplayContact extends LightningElement {
     /** Id of record to display. */
    @api recordId; //this captures AccountId which is passed from Parent Component
    @track error;   //this holds errors

    @track items = []; //this holds the array for records with value & label
    @track ids = '';
    @track mymap ='';
    @track value = '';  //this displays selected value of combo box

    /* Load Contacts based on AccountId from Controller */
    @wire(getContacts, { accountId: '$recordId'})
    wiredContacts({ error, data }) {
        if (data) {
            let testMap = new Map();
            for(i=0; i<data.length; i++) {
                console.log('id=' + data[i].Id);
                this.items = [...this.items ,{value: data[i].Name , label: data[i].Name, id: data[i].Id }];  
                testMap.set( this.items[i].value,this.items[i].id);//create map of Name and  id                                         
            } 
            this.mymap = testMap;  
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.contacts = undefined;
        }
    }
   
    //getter property from statusOptions which return the items array
    get statusOptions() {
        console.log(this.items);
        return this.items;
    }

    handleChange(event) {
        // Get the string of the "value" attribute on the selected option
        debugger;
        const selectedOption = event.detail.value;
        const SelectedNameId =  this.mymap.get(selectedOption); //fetch from Map    
        console.log('selectedOption=' + selectedOption);//Name
        console.log('SelectedName=' + SelectedNameId);//Id
        debugger;
        //This is for event propagation
        
        const filterChangeEvent = new CustomEvent('filterchange', {
            detail: { attr1 : event.detail.value  ,attr2 : SelectedNameId}
           // detail: { selectedOption }
        });
               
        // Fire the custom event
        this.dispatchEvent(filterChangeEvent);
    }
    
}