public with sharing class CMSConnectApiHelper {
    public CMSConnectApiHelper() {

    }

    @AuraEnabled (cacheable=true)
    public static String retrieveMediaFromCMSStore(String channelName){
        String channelId = getChannelId(channelName);

        //get the image content
        ConnectApi.ManagedContentVersionCollection obj = 
            ConnectApi.ManagedContent.getAllContent(channelId, 0, 5, 'en_US', 
                                                    'cms_image',false,
                                                    '2020-09-29T18:24:31.000Z','2023-09-30T19:30:31.000Z',true);
        
        List<ReturnWrapper> wrapperList = new List<ReturnWrapper>();
        System.debug('json value=' + JSON.serialize(obj));

        //loop through each item and prepare a wrapper list
        for(ConnectApi.ManagedContentVersion versionObj: obj.items){
            ReturnWrapper wrapper = new ReturnWrapper();
            wrapper.title = versionObj.title;
            
            //get the url
            Map<String,ConnectApi.ManagedContentNodeValue> contentNodesMap = versionObj.contentNodes;
            for(String str:contentNodesMap.keySet()){                
                if(str=='source'){
                    wrapper.url= ((ConnectApi.ManagedContentMediaSourceNodeValue)contentNodesMap.get(str)).url;
                }		
            }
            wrapperList.add(wrapper);	
        }
        return JSON.serialize(wrapperList);
    }

    @AuraEnabled (cacheable=true)
    public static String getChannelId(String channelName){
        ConnectApi.ManagedContentChannelCollection channelRepObj = 
                ConnectApi.ManagedContent.getAllDeliveryChannels(0,2);        

        //loop through the channels and return the channel Id
        for(ConnectApi.ManagedContentChannel channelObj: channelRepObj.channels){
            if(channelObj.channelName == channelName){
                return channelObj.channelId;
            }
        }
        return null;
    }

    public class ReturnWrapper{
        String title {get;set;}
        String url {get;set;}
    }
}