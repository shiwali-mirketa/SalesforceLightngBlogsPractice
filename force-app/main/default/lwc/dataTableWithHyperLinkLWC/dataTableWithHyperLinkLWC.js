import { LightningElement , api ,wire, track} from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import getApps from "@salesforce/apex/ApplicationHelper.getApps";
// no need to track this

export default class DataTableWithHyperLinkLWC  extends NavigationMixin(LightningElement) {

    columns = [
        {
          label: 'Applicant',
          fieldName: 'applicantURL',
          type: 'url',
          typeAttributes: {
            label: { fieldName: 'applicantName' },
            target: '_blank'
          },
          sortable: true
        },
        {
          label: 'Application Name',
          fieldName: 'nameUrl',
          type: 'url',
          typeAttributes: {
            label: { fieldName: 'Name' }, 
            target: '_blank'
          },
          sortable: true
        },
    ];
    @api recordIdd = 'a0T2v00000hyCUGEA2';
    records;
  
    @track error;
    @track applications = [];

    @wire(getApps, { jobId: '$recordId'}) 
        wiredApps(result) {
        const {data, error} = result;
        if(data) {
          this.applications = data.map(row => {
            const nameUrl = `/lightning/r/${row.Id}/view`;
            const applicantURL = `/lightning/r/${row.Applicant__c}/view`;
            const applicantName = row.Applicant__r.Name;
            return {...row , nameUrl, applicantURL, applicantName };
          })
          this.error = null;
        }
        if(error) {
          this.error = error;
          this.applications = [];
        }
    }
}