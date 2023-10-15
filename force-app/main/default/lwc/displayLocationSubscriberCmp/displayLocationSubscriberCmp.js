import { LightningElement, wire, track} from 'lwc';
// Import message service features required for subscribing and the message channel
import {
    subscribe,
    unsubscribe,
    APPLICATION_SCOPE,
    MessageContext
} from 'lightning/messageService';
import selectedEntity from '@salesforce/messageChannel/Selected_EntityId__c';

let acct;
export default class DisplayLocationSubscriber extends LightningElement {
    subscription = null;
    record;

    isDisplayLocation=false;
    @track mapMarkers = []; //holds account location related attributes
    markersTitle = ''; //title of markers used in lightning map.
    zoomLevel = 4;   //initialize zoom level
    center; //location will be displayed in the center of the map

    selectedAccountName = '';

    @wire(MessageContext)
    messageContext;

    // Standard lifecycle hooks used to subscribe and unsubsubscribe to the message channel
    connectedCallback() {
        this.subscribeToMessageChannel();
        this.isDisplayLocation = false;
    }

    disconnectedCallback() {
        this.unsubscribeToMessageChannel();
    }

    // Encapsulate logic for Lightning message service subscribe and unsubsubscribe
    subscribeToMessageChannel() {
        if (!this.subscription) {
            this.subscription = subscribe(
                this.messageContext,
                selectedEntity,
                (message) => this.handleMessage(message),
                { scope: APPLICATION_SCOPE }
            );
        }
    }

    unsubscribeToMessageChannel() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }

    // Handler for message received by component
    handleMessage(message) {
        //assigns account records
        acct = message.record;

        this.selectedAccountName = acct.Name;
        
        //prepares information for the lightning map attribute values.
        this.markersTitle = acct.Name;
        
        this.mapMarkers = [
            {
                location: {
                    Street: acct.BillingStreet,
                    City: acct.BillingCity,
                    State: acct.BillingState,
                    Country: acct.BillingCountry,
                },
                icon: 'custom:custom26',
                title: acct.Name,
            }                                    
        ];
        this.center = {
            location: {
                City: acct.BillingCity,
            },
        };
        this.zoomLevel = 6;
        this.isDisplayLocation = true;
    }    
}
