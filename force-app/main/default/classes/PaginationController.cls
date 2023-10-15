public with sharing class PaginationController {
    @AuraEnabled (cacheable=true)
    public static List<Account> retrieveAccounts(){
        return [SELECT Id, Name, Type, BillingCountry,AnnualRevenue,Phone,AccountSource
                FROM Account
                LIMIT 1000];
    }
}