import { LightningElement, track, wire } from 'lwc';
import retreieveObjects from '@salesforce/apex/DescribeObjectHelper.retreieveObjects';
import getListOfFields from '@salesforce/apex/DescribeObjectHelper.getListOfFields';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

/** The delay used when debouncing event handlers before invoking Apex. */
const DELAY = 300;

// eslint-disable-next-line no-unused-vars

//define data table columns
const columns = [
    { label: 'Field Label', fieldName: 'FieldLabel' }, 
    { label: 'Field API Name', fieldName: 'FieldAPIName' },       
];

let i=0;
export default class DisplayObjectsAndFields extends LightningElement {

    //this is for showing toast message
    _title = 'Retrieve Records Error';
    message = 'Select atleast one field';
    variant = 'error';
    variantOptions = [
        { label: 'error', value: 'error' },
        { label: 'warning', value: 'warning' },
        { label: 'success', value: 'success' },
        { label: 'info', value: 'info' },
    ];
    
    @track value = '';  //this displays selected value of combo box
    @track items = []; //this holds the array for records with value & label
    @track fieldItems = []; //this holds the array for records with table data
    
    @track columns = columns;   //columns for List of fields datatable
    @track selectedFieldsValue=''; //fields selected in datatable
    @track tableData;   //data for list of fields datatable
    
    //retrieve object information to be displayed in combo box and prepare an array
    @wire(retreieveObjects)
    wiredObjects({ error, data }) {
        if (data) {
            //new efficient method with map, looking through each element
            data.map(element=>{
                this.items = [...this.items ,{value: element.QualifiedApiName, 
                    label: element.MasterLabel}];  
            });
            /*
            //previously used 'for' loop
            for(i=0; i<data.length; i++) {
                console.log('MasterLabel=' + data[i].MasterLabel + 'QualifiedApiName=' + data[i].QualifiedApiName);
                this.items = [...this.items ,{value: data[i].QualifiedApiName, 
                                              label: data[i].MasterLabel}];                                   
            } 
            */
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.data = undefined;
        }
    }

    //retrieve combo-box values as status options
    get statusOptions() {
        return this.items;
    }

    //retrieve field information based on selected object API name.
    @wire(getListOfFields,{objectAPIName: '$value'})
    wiredFields({ error, data }) {
        if (data) {            
            //first parse the data as entire map is stored as JSON string
            let objStr = JSON.parse(data);            
            //now loop through based on keys
            for(i of Object.keys(objStr)){
                console.log('FieldAPIName=' +i + 'FieldLabel=' + objStr[i]);
                //spread function is used to stored data and it is reversed order
                this.fieldItems = [
                    {FieldLabel: objStr[i], FieldAPIName: i},...this.fieldItems];  
            }
            this.tableData = this.fieldItems;
            this.error = undefined;            
        } else if (error) {
            this.error = error;
            this.data = undefined;
        }
    }

    //this method is fired based on combo-box item selection
    handleChange(event) {
        // get the string of the "value" attribute on the selected option
        const selectedOption = event.detail.value;
        this.value = selectedOption;
        this.fieldItems = []; //initialize fieldItems array 
        this.tableData = [];  //initialize list of fields datatable data

        //deplay the processing
        window.clearTimeout(this.delayTimeout);
        
        this.delayTimeout = setTimeout(() => {
            this.value = selectedOption;
        }, DELAY);
        
    }

    //this method is fired based on row selection of List of fields datatable
    handleRowAction(event){
        const selectedRows = event.detail.selectedRows;        
        this.selectedFieldsValue = '';  
 //newly efficient script
 // Display that fieldName of the selected rows in a comma delimited way
        selectedRows.map(element=>{
            if(this.selectedFieldsValue !=='' ){
                this.selectedFieldsValue = this.selectedFieldsValue + ',' + element.FieldAPIName;
            }
            else{
                this.selectedFieldsValue = element.FieldAPIName;
            }
        });
    }

    //this method is fired when retrieve records button is clicked
    handleRetrieveRecords(event){        
        const valueParam = this.value;
        const selectedFieldsValueParam = this.selectedFieldsValue;
        //show error if no rows have been selected
        if(selectedFieldsValueParam ===null || selectedFieldsValueParam===''){
            const evt = new ShowToastEvent({
                title: this._title,
                message: this.message,
                variant: this.variant,
            });
            this.dispatchEvent(evt);
        }
        else {
            //propage event to next component
            const evtCustomEvent = new CustomEvent('retreive', {   
                detail: {valueParam, selectedFieldsValueParam}
                });
            this.dispatchEvent(evtCustomEvent);
        }        
    } 
    
    //this method is fired when reset button is clicked.
    handleResetClick(event){
        this.value = '';
        this.tableData = [];
        const evtCustomEvent = new CustomEvent('reset');
        this.dispatchEvent(evtCustomEvent);
    }
}