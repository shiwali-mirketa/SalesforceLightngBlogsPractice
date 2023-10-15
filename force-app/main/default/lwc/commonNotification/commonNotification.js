import { LightningElement,api,track } from 'lwc';
import LightningConfirm from 'lightning/confirm';
import LightningPrompt from 'lightning/prompt';
import LightningAlert from 'lightning/alert';
import { FlowAttributeChangeEvent, FlowNavigationNextEvent } from 'lightning/flowSupport';

export default class CommonNotification extends LightningElement {    
    @api notificationType;
    @api message;
    @api variant;
    @api header;
    @api colorTheme;
    @api value;
    @api isCallerFlow=false;
    @api autoCloseTime = 5000;
    @track showToastBar=false;
    connectedCallback()
    {
        //If Flow then show modal when screen is shown
        if(this.isCallerFlow==true)
        {
            this.showNotification();
        }
    }
    showNotification()
    {
        if(this.notificationType=='Confirm')
        {
            this.handleConfirm();
        }
        else if(this.notificationType=='Prompt')
        {
            this.handlePrompt();
        }
        else if(this.notificationType=='Alert')
        {
            this.handleAlert();
        }
        else if(this.notificationType=='Toast')
        {
            this.handleToast();
        }
    }

    @api
    notify(type, message,variant,header,theme) {
        this.notificationType = type;
        this.message = message;
        this.variant=variant;
        this.header=header;
        this.colorTheme = theme;
        this.showNotification();
    }
    
    handleAlert(){
        LightningAlert.open({
            message: this.message,
            theme: this.colorTheme, 
            label: this.header, 
            variant: this.variant,
            }).then((result) => {
                if(this.isCallerFlow==true)
                {
                    var navigationEvent = new FlowNavigationNextEvent();
                    this.dispatchEvent(navigationEvent);
                }
            });
    }
    handlePrompt(){
        LightningPrompt.open({ 
                message: this.message,
                theme: this.colorTheme, 
                label: this.header, 
                variant: this.variant,
                defaultValue: '', 
        }).then((result) => {
            this.value=result;
            const selectedEvent = new CustomEvent('selection', { detail: result });
            // Dispatches the event
            this.dispatchEvent(selectedEvent);
    
            if(this.isCallerFlow==true)
            {
                const attributeChangeEvent = new FlowAttributeChangeEvent(
                    'value',result);
                this.dispatchEvent(attributeChangeEvent);
                
                var navigationEvent = new FlowNavigationNextEvent();
                this.dispatchEvent(navigationEvent);
            }
        });
    }

    handleConfirm(){
            LightningConfirm.open({
                message: this.message,
                theme: this.colorTheme, 
                label: this.header, 
                variant: this.variant,
            }).then((result) => {
                this.value=result;
                const selectedEvent = new CustomEvent('selection', { detail: result });
                // Dispatches the event
                this.dispatchEvent(selectedEvent);
                if(this.isCallerFlow==true)
                {
                    const attributeChangeEvent = new FlowAttributeChangeEvent(
                        'value',result);
                    this.dispatchEvent(attributeChangeEvent);

                    var navigationEvent = new FlowNavigationNextEvent();
                    this.dispatchEvent(navigationEvent);
                }
            });
    }

    //Toast Section
    closeModel() {
        this.showToastBar = false;
        if(this.isCallerFlow==true)
        {
            var navigationEvent = new FlowNavigationNextEvent();
            this.dispatchEvent(navigationEvent);
        }
    }
 
    get getIconName() {
        return 'utility:' + this.colorTheme;
    }
 
    get innerClass() {
        return 'slds-icon_container slds-icon-utility-' + this.colorTheme + ' slds-icon-utility-success slds-m-right_small slds-no-flex slds-align-top';
    }
 
    get outerClass() {
        return 'slds-notify slds-notify_toast slds-theme_' + this.colorTheme;
    }

    handleToast(){
        var that=this;
        that.showToastBar = true;
        setTimeout(() => {
            that.closeModel();
        }, that.autoCloseTime);
    }
}