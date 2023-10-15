public with sharing class DisplayMyMapController {
    @AuraEnabled (cacheable=true)
    public static List<Account> getOfficeLocations(String accountNameInitial){
        String str = accountNameInitial + '%';
        return [SELECT Id, Name, BillingStreet, BillingCity, BillingState, BillingPostalCode, BillingCountry ,
        ShippingCity, ShippingPostalCode, ShippingCountry, ShippingState , ShippingStreet
                FROM Account 
                WHERE Name LIKE :str];       
    }
}