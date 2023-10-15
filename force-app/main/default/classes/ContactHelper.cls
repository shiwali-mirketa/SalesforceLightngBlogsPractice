public with sharing class ContactHelper {

    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactsList(String accId) {
        return [
            SELECT AccountId, Id, FirstName, LastName, Title, Phone, Email
            FROM Contact
            WHERE AccountId = :accId
            WITH SECURITY_ENFORCED
        ];
    }
    
    @AuraEnabled 
    public static List<Contact> getContacts(){ 
        return [Select Name, Phone, Email From Contact limit 20]; 
    } 
}