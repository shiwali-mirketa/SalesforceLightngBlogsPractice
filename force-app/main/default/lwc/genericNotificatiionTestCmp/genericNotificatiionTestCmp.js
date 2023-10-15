import { LightningElement } from 'lwc';

export default class GenericNotificatiionTestCmp extends LightningElement {

    notify()
    {
        //Use Generic Component to show alert
        //this.template.querySelector('c-generic-toast-message-cmp').showErrorToast();      
        this.template.querySelector('c-generic-toast-message-cmp').notify('Error', 'Some unexpected error','error','Toast Error');
        
        //Ask question using Prompt
        //this.template.querySelector('c-generic-toast-message-cmp').showSuccessToast();     
        this.template.querySelector('c-generic-toast-message-cmp').notify('Success', 'Opearion sucessful','success','Toast Success');
        
        //Ask Confirmation using confirm
        //this.template.querySelector('c-generic-toast-message-cmp').showWarningToast();       
        this.template.querySelector('c-generic-toast-message-cmp').notify('Warning', 'Some problem','warning','Toast Warning');

        //this.template.querySelector('c-generic-toast-message-cmp').showInfoToast();
        this.template.querySelector('c-generic-toast-message-cmp').notify('Info', 'Operation will run in background','info','Toast Info');

   }
}