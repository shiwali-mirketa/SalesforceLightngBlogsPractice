public with sharing class GetAllOpportunities {
    
    @AuraEnabled(cacheable=true)
    public static List<Opportunity> getAllOpps() {
        return [SELECT Id, Name ,StageName, CloseDate FROM Opportunity Order By Name asc];
    }
    
    @AuraEnabled(cacheable=true)
    public static List<DataTableWrapper> getAllOpps1() {
        List<Opportunity> listOpp = [SELECT Id, Name ,StageName, CloseDate 
                                     FROM Opportunity Order By Name asc];
        
        List<DataTableWrapper> response = new List<DataTableWrapper>();
        for(Opportunity opp : listOpp){
            DataTableWrapper obj = new DataTableWrapper();
            obj.oppId = opp.Id;
            obj.name = opp.Name;
            obj.nameUrl = '/'+opp.Id;
            obj.stageName = opp.StageName;
            obj.closeDate = opp.CloseDate;
            response.add(obj);
        }

        return response;
    }
    
    private class DataTableWrapper {
        @AuraEnabled
        public Id oppId {get;set;}
        @AuraEnabled
        public String name {get;set;}
        @AuraEnabled
        public String nameUrl {get;set;}
        @AuraEnabled
        public String stageName {get;set;}
        @AuraEnabled
        public Date closeDate {get;set;}
    }


}