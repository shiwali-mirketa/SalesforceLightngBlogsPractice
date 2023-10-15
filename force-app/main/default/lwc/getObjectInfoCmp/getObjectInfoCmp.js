import { LightningElement, wire } from "lwc";
//import { getObjectInfo } from "lightning/uiObjectInfoApi";
import { getObjectInfos } from "lightning/uiObjectInfoApi";
import ACCOUNT_OBJECT from "@salesforce/schema/Account";
import OPPORTUNITY_OBJECT from "@salesforce/schema/Opportunity";

export default class Example extends LightningElement {
 
    objectApiNames = [ACCOUNT_OBJECT, OPPORTUNITY_OBJECT];

    @wire(getObjectInfos, { objectApiNames: "$objectApiNames" })
    objectInfos;
  
    get objectInfosStr() {
      return this.objectInfos ? JSON.stringify(this.objectInfos.data, null, 2) : "";
    }
 
    //Single object
   /** @wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT })
  propertyOrFunction;

   // just to check what info we get.
   get propertyOrFunction1(){
        return JSON.stringify(this.propertyOrFunction);
    }  **/
}   