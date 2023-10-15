import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class ChildLWC extends LightningElement {
  @track displayMessage = '';
  save() {
    this.dispatchEvent(new ShowToastEvent({
      title: 'Success',
      message: 'some message here.',
      variant: 'success',
    }));
    //this.dispatchEvent(new CustomEvent('close'));
  }
  cancel() {
    //this.dispatchEvent(new CustomEvent('close'));
  }
}