import { LightningElement , wire, track, api} from 'lwc';
import getOfficeLocations from '@salesforce/apex/DisplayMyMapController.getOfficeLocations';

export default class DisplayLWCMap extends LightningElement {

    @api accountNameParam; 
    accountNameParam = 'University of Arizona';
    @track error;   //this holds errors
    @track mapMarkers = [];
    @track markersTitle = '';
    @track zoomLevel = 4;
    /* Load address information based on accountNameParam from Controller */
    @wire(getOfficeLocations, { accountNameInitial: '$accountNameParam'})
    wiredOfficeLocations({ error, data }) {
        if (data) {            
            data.forEach(dataItem => {
                this.mapMarkers = [...this.mapMarkers ,
                    {
                        location: {
                            City: dataItem.BillingCity,
                            Country: dataItem.BillingCountry,
                        },        
                        icon: 'custom:custom26',
                        title: dataItem.Name,
                    },
                    {
                        location: {
                            City: dataItem.ShippingCity,//'San Francisco',
                            PostalCode: dataItem.ShippingPostalCode ,//ShippingCountryCode,//'94105',
                            State: dataItem.ShippingState,//'CA',
                            Street: dataItem.ShippingStreet,//'30 Fremont St.',
                        },            
        
                        icon: 'custom:custom26',
                        title: dataItem.Name,
                    },                                       
                ];
              });            
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.contacts = undefined;
        }
    }

}