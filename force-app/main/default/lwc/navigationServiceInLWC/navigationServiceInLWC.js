import { LightningElement, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
export default class NavigationExampleLWC extends NavigationMixin(LightningElement) {
    @api recordId='0012v00002pJCnxAAG';
    @api recordId1='5002v00003AFsIYAA1';
    // Navigate to New Account Page
    navigateToNewCasePage() {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Case',
                actionName: 'new'
            },
        });
    }
    // Navigate to View Account Page
    navigateToViewCasePage() {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.recordId1,
                objectApiName: 'Case',
                actionName: 'view'
            },
        });
    }
    // Navigate to Edit Account Page
    navigateToEditAccountPage() {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.recordId1,
                objectApiName: 'Case',
                actionName: 'edit'
            },
        });
    }
    // Navigation to Account List view(recent)
    navigateToAccountListView() {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Account',
                actionName: 'list'
            },
            state: {
                filterName: 'Recent'
            },
        });
    }
    // Navigation to Contact related list of account
    navigateToContactRelatedList() {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordRelationshipPage',
            attributes: {
                recordId: this.recordId,
                objectApiName: 'Account',
                relationshipApiName: 'Contacts',
                actionName: 'view'
            },
        });
    }
    //Navigate to home page
    navigateToHomePage() {
        this[NavigationMixin.Navigate]({
            type: 'standard__namedPage',
            attributes: {
                pageName: 'home'
            },
        });
    }
    // Navigation to contant object home page
    navigateToContactHome() {
        this[NavigationMixin.Navigate]({
            "type": "standard__objectPage",
            "attributes": {
                "objectApiName": "Contact",
                "actionName": "home"
            }
        });
    }
    //Navigate to chatter
    navigateToChatter() {
        this[NavigationMixin.Navigate]({
            type: 'standard__namedPage',
            attributes: {
                pageName: 'chatter'
            },
        });
    }
    //Navigate to Reports
    navigateToReports() {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Report',
                actionName: 'home'
            },
        });
    }
    //Navigate to Files home
    navigateToFilesHome() {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'ContentDocument',
                actionName: 'home'
            },
        });
    }
    // Navigation to lightning component
    navigateToLightningComponent() {
        debugger;
        this[NavigationMixin.Navigate]({
            "type": "standard__component",
            "attributes": {
                //Here customLabelExampleAura is name of lightning aura component
                //This aura component should implement lightning:isUrlAddressable
                "componentName": "c__MyLightningComponent"//"c__customLabelExampleAura"
            }
        });
    }
    // Navigation to web page 
    navigateToWebPage() {
        this[NavigationMixin.Navigate]({
            "type": "standard__webPage",
            "attributes": {
                "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript"
            }
        });
    }
    //Navigate to visualforce page
    navigateToVFPage() {
        this[NavigationMixin.GenerateUrl]({
            type: 'standard__webPage',
            attributes: {
                url: '/apex/AccountTestVf?id=' + this.recordId
            }
        }).then(generatedUrl => {
            window.open(generatedUrl);
        });
    }
    // Navigation to Custom Tab
    navigateToTab() {
        this[NavigationMixin.Navigate]({
            type: 'standard__navItemPage',
            attributes: {
                //Name of any CustomTab. Visualforce tabs, web tabs, Lightning Pages, and Lightning Component tabs
                apiName: 'Navigate_To_Goggle' //'CustomTabName'
            },
        });
    }
}