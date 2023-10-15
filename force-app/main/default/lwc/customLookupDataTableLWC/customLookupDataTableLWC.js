import LightningDatatable from 'lightning/datatable';
import datatableLookupColumn from './datatableLookupColumn.html';
 
export default class CustomLookupDataTableLWC extends LightningDatatable {
    debugger;
    static customTypes = {
        datatableLookupColumn: {
            template: datatableLookupColumn,
            standardCellLayout: true,
            typeAttributes: ['value', 'fieldName', 'object', 'context', 'name', 'fields', 'target']
        }
    };
}