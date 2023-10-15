import { LightningElement , api,track} from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class ToastNotificationExampleLWC extends LightningElement {

    @api notificationType;
    @api message;
    @api variant;
    @api title;
   
    showNotification(notificationType)
    {
        if(this.notificationType=='Error')
        {
            this.showErrorToast();
        }
        else if(this.notificationType=='Success')
        {
            this.showSuccessToast();
        }
        else if(this.notificationType=='Warning')
        {
            this.showWarningToast();
        }
        else if(this.notificationType=='Info')
        {
            this.showInfoToast();
        }
    }

    @api
    notify(type, message,variant,title) {
        this.notificationType = type;
        this.message = message;
        this.variant=variant;
        this.title=title;
        this.showNotification(this.notificationType);
    }

    showErrorToast() {
        const evt = new ShowToastEvent({
            title: 'Toast Error',
            message: 'Some unexpected error',
            variant: 'error',
            mode: 'dismissable'
        });
        this.dispatchEvent(evt);
    }
    showSuccessToast() {
        const evt = new ShowToastEvent({
            title: 'Toast Success',
            message: 'Opearion sucessful',
            variant: 'success',
            mode: 'dismissable'
        });
        this.dispatchEvent(evt);
    }
    showWarningToast() {
        const evt = new ShowToastEvent({
            title: this.title, //'Toast Warning',
            message:  this.message , //'Some problem',
            variant:  this.variant, //'warning',
            mode: 'dismissable'
        });
        this.dispatchEvent(evt);
    }
    showInfoToast() {
        const evt = new ShowToastEvent({
            title: this.title,//'Toast Info',
            message:  this.message,//'Operation will run in background',
            variant: this.variant,//'info',
            mode: 'dismissable'
        });
        this.dispatchEvent(evt);
    }
}