import { LightningElement, wire } from "lwc";
import { getPicklistValues } from "lightning/uiObjectInfoApi";
import INDUSTRY_FIELD from "@salesforce/schema/Account.Industry";

export default class Example extends LightningElement {
  @wire(getPicklistValues, { recordTypeId: "012000000000000AAA", fieldApiName: INDUSTRY_FIELD })
  propertyOrFunction;

  
}