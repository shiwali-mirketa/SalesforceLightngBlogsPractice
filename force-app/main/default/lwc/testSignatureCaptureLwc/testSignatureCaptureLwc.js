import { LightningElement } from 'lwc';
import saveSign from '@salesforce/apex/SignatureHelper.saveSign';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class TestSignatureCaptureLwc extends LightningElement {
    imgSrc;
    //canvasElement;  
  renderedCallback() {
    document.fonts.forEach((font) => {
      if (font.family === "Great Vibes" && font.status === "unloaded") {
        // Ensure that the font is loaded so that signature pad could use it.
        // If you are using a different font in your project, don't forget
        // to update the if-condition above to account for it.
        font.load();
      }
    });
  }

  saveSignature() {

    debugger;
    const pad = this.template.querySelector("c-test-signature-pad-lwc");
    if (pad) {
      const dataURL = pad.getSignature();
     // canvasElement = this.template.querySelector('canvas');
      if (dataURL) {
        // At this point you can consume the signature, for example by saving
        // it to disk or uploading it to a Salesforce org/record.
        // Here we just preview it in an image tag.
        //this.imgSrc = dataURL;

         //convert to png image as dataURL

        //  dataURL = this.canvasElement.toDataURL("image/png");
         this.imgSrc = dataURL;
         //convert that as base64 encoding
         let convertedDataURI = dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
         
         //call Apex method imperatively and use promise for handling sucess & failure
         saveSign({strSignElement: convertedDataURI})//
             .then(result => {
                 this.attachment = result;
                 console.log('attachment id=' + this.attachment.Id);
                 //show success message
                 this.dispatchEvent(
                     new ShowToastEvent({
                         title: 'Success',
                         message: 'Attachment created with Signature',
                         variant: 'success',
                     }),
                 );
             })
             .catch(error => {
                 //show error message
                 this.dispatchEvent(
                     new ShowToastEvent({
                         title: 'Error creating Attachment record',
                         message: error.body.message,
                         variant: 'error',
                     }),
                 );
             });
             
      }
    }
  }

  clearSignature() {
    const pad = this.template.querySelector("c-test-signature-pad-lwc");
    if (pad) {
      pad.clearSignature();
    }

    this.imgSrc = null;
  }
}