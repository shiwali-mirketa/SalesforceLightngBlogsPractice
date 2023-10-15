public with sharing class sampleCustomMetadataUtility2 {
    
    public static Map<String, Schema.SObjectType> globalDescribe() {
        Map<String, Schema.SObjectType> gldesc=(Map<String, Schema.SObjectType>)Cache.Org.get('local.Schema.globalDescribe');
        system.debug('Cache called');
		if(gldesc==null)
        {
            gldesc = Schema.getGlobalDescribe();
            Cache.Org.put('local.Schema.globalDescribe', gldesc);
            system.debug('Cache set');
        }
        return gldesc;
    }
     public static List<sObject> getCustomSetting()
    {
        Map<String, Schema.SObjectType> getDescribe = globalDescribe();
        
        for(String objName :getDescribe.keySet()){
            Schema.SObjectType result = getDescribe.get(objName);
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
                //return records;
            }
        }
        return null;
    }
}