import { LightningElement } from 'lwc';
import LightningDatatable from 'lightning/datatable';
import profilePicDataTable from './profilePicDataTable.html';

export default class SalesforceCodexDataTable extends LightningDatatable  {
    static customTypes = {
        image: {
            template: profilePicDataTable
        }
    };
}