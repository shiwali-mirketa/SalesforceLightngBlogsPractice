import { LightningElement,track,api } from 'lwc';
import getUsers from '@salesforce/apex/StackExchangeAccessController.getUsers';

const columns = [
    { label: 'Member Name', fieldName: 'display_name' },
    { label: 'Website', fieldName: 'website_url' },
    { label: 'Reputation', fieldName: 'reputation' },
    { label: 'Gold Badge', fieldName: 'gold', cellAttributes: { class: 'gold'} },
    { label: 'Silver Badge', fieldName: 'silver' },
    { label: 'Bronze Badge', fieldName: 'bronze' },
    { label: 'Is Employee', fieldName: 'is_employee' },
    { label: 'Created Date', fieldName: 'date', type: "date",
    typeAttributes:{
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    }},
];

export default class StackExchngLWCCmp extends LightningElement {

 @track data = [];
    @track columns = columns;
    @track rowOffset = 0;
    @track message='';
    @track page = 1;
    @api stage;
    @api pageSize;
    @api sortdirection;
    @api sortName='reputation';
    @api sitename='salesforce';
    @track value = 'salesforce';
    get options() {
        return [
            { label: 'Salesforce', value: 'salesforce' },
            { label: 'Stackoverflow', value: 'stackoverflow' },
            { label: 'Freelancing', value: 'freelancing' },
        ];
    }
    get fields() {
        return [
            { label: 'Reputaion', value: 'reputation' },
            { label: 'Name', value: 'name' }
        ];
    }
    handleChange(event) {
        this.sitename = event.detail.value;
    }
    handleFieldChange(event) {
        this.sortName = event.detail.value;
    }
    handleClick() {
        debugger;
        getUsers({
            pageNumber:this.page,
            pageSize:10,
            sortdirection:'desc', 
            sortName:this.sortName, 
            sitename:this.sitename
        })
        .then(result => {
            for (let i = 0; i < result.items.length; i++) {
                let row = result.items[i];
                row.silver = row.badge_counts.silver;
                row.gold = row.badge_counts.gold;
                row.bronze = row.badge_counts.bronze;
                row.date = new Date(parseInt(row.creation_date.substr(6)));
            }
            this.data = result.items;
            this.error = undefined;
            console.log(result.items);
        })
        .catch(error => {
            console.log('error:' + JSON.stringify(error));
            this.error = error;
            this.data = undefined;
        });
    }
    previousHandler()
    {
        this.page=this.page-1;
        this.handleClick();
    }
    nextHandler()
    {
        this.page=this.page+1;
        this.handleClick();
    }
}