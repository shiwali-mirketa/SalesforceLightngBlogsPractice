import { LightningElement, track } from 'lwc';

export default class ModalParentExampleCmp extends LightningElement {
  //Variables to control modal window
  @track showModal = false;
  @track showNegativeButton;
  @track showPositiveButton = true;
  @track positiveButtonLabel = 'Close';

  closeModal() {
    this.showModal = false;
  }

  showModalPopup() {
    this.showModal = true;
  }
}