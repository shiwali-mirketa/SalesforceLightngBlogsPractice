public with sharing class AccountHelper {

    @AuraEnabled(Cacheable = TRUE)
    public static List<Account> getAccounts() {
 
        List<Account> accList = [SELECT Id, Name, Phone, Industry, TYPE, Website, Description FROM Account WHERE Phone != NULL AND Industry != NULL ORDER BY CreatedDate DESC ];
 
        RETURN accList;
    }    

    @AuraEnabled(cacheable=TRUE)
    public static List<Account> searchAccountNameMethod (String accStrName, String accStrPhone, String accStrWebsite, String accStrIndustry, String accStrDescription){
        String keyNameString = '%' +  accStrName + '%';
        RETURN [SELECT Id, Name, Phone, Website, Industry, Description FROM Account WHERE Name LIKE:keyNameString];
     }    
  
    @AuraEnabled (cacheable=true)
    public static List<Account> getAccountLocations1(){
        return[SELECT Id, Name, BillingStreet, BillingCity, 
    BillingState, BillingPostalCode, BillingCountry 
                FROM Account
                WHERE isDisplay__c = true];
    }

    @AuraEnabled (cacheable=true)
    public static List<Contact> getContacts(String accountId){
        return [SELECT Id, Name FROM Contact WHERE AccountId =:accountId];        
    }
    
    @AuraEnabled (cacheable=true)
    public static List<Account> getAccountLocations(){
        return [SELECT Id, Name, BillingStreet, BillingCity, BillingState, BillingPostalCode, BillingCountry FROM Account]; // WHERE isDisplay__c = true
    }
}