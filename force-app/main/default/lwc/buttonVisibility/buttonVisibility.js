import { LightningElement, track , wire} from 'lwc';
import getUserInfo from '@salesforce/apex/UserInfoController.getUserInfo';
import hasPermission from '@salesforce/customPermission/CanDeactivateXyz';

export default class ButtonComponent extends LightningElement {
    @track isButtonDisabled = false; // show button by default
    @track canDeactivate = false; // show button by default

    @wire(getUserInfo, {}) 
    userData({ error, data }) {
        if(data) {
            if(data.Profile.Name !== "System Administrator") {    
                this.isButtonDisabled = true;
            }
        } else if(error) {
            // error handling
            console.error(error.body.message);
        }
    }

    checkCutomPermission()
    {
        this.canDeactivate = hasPermission;
        console.log('Check  hasPermission '+hasPermission);
    }

    deactivateProcess(event)
    {
    }
}