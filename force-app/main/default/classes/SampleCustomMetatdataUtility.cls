public with sharing class SampleCustomMetatdataUtility {
     
    public static List<sObject> getCustomSetting()
    {
        Map<String, Schema.SObjectType> globalDesc = Schema.getGlobalDescribe();
        
        for(String objName :globalDesc.keySet()){
            Schema.SObjectType result=globalDesc.get(objName);
            //Check for custom setting
            if(result.getDescribe().isCustomSetting()){
                System.debug('Object:' + objName);
                String query = 'SELECT';
                // Get the fields from the describe method and append them to the queryString one by one to make SOQL.
                Map<String, Schema.SObjectField> objectFields =result.getDescribe().fields.getMap();
                
                for(String s : objectFields.keySet()) {
                    query += ' ' + s + ',';
                }
                //Query character lenght to remove last character
                integer len=query.Length();
                
                if (query.subString(len-1,len) == ','){
                    query = query.subString(0,len-1);
                }
                // Add FROM statement
                query += ' FROM ' + objName;
                
                List<sObject> records=Database.query(query);
                System.debug('records:'+records);
                return records;
            }
        }
        return null;
    }

   /**   static Map<String, Schema.SObjectType> globalDesc=null;

    public static Map<String, SObjectType> globalDesc 
    {
        get { if(globalDesc == null) 
        globalDesc = Schema.getGlobalDescribe();
        return globalDesc;
    }
}**/

}