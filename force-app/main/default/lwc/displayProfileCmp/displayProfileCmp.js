import { LightningElement } from 'lwc';
//import LightningDatatable from 'lightning/datatable';
const columns = [
    { label: 'SR#', fieldName: 'rowNumber',type:'text'},
    { label: 'Profile Pic', fieldName: 'profile_image', type:'image'},
    { label: 'Member Name', fieldName: 'display_name' },
    { label: 'Website', fieldName: 'website_url' , type:'url'},
    { label: 'Reputation', fieldName: 'reputation' },
    { label: 'Gold Badge', fieldName: 'gold', type:'text',cellAttributes: { class: 'slds-text-color_error slds-text-title_bold'}},
    { label: 'Silver Badge', fieldName: 'silver', type:'text',cellAttributes: { class: 'slds-text-color_warning slds-text-title_bold'}},
    { label: 'Bronze Badge', fieldName: 'bronze' , type:'text',cellAttributes: { class: 'slds-text-color_success slds-text-title_bold'}},
    { label: 'Is Employee', fieldName: 'is_employee' },
    { label: 'Created Date', fieldName: 'date', type: "date",
    typeAttributes:{
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    }},
];
export default class displayProfileCmp extends LightningElement  {
}
