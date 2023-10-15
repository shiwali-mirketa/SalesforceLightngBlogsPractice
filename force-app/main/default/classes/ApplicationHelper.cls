public with sharing class ApplicationHelper {

    @AuraEnabled(cacheable=true)
   public static List<Application__c> getApps(string jobId){
      return [SELECT Id,Name,Applicant__r.Name FROM Application__c  WHERE Applied_to_Job_Opening__c =: jobId  Order By Name asc];      
   }
}