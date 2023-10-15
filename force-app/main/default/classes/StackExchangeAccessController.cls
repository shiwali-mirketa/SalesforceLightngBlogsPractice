public with sharing class StackExchangeAccessController {
    @AuraEnabled
	public static StackExchangeUserWrapper getUsers(integer pageNumber,integer pageSize,string sortdirection, string sortName, string sitename)
    {
        string url='page='+pageNumber+'&pagesize='+ pageSize+'&order='+sortdirection+'&sort='+sortName+'&site='+sitename;
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint('https://api.stackexchange.com/2.2/users?'+url);
        request.setMethod('GET');
        HttpResponse response = http.send(request);
        if (response.getStatusCode() == 200) {
            StackExchangeUserWrapper wrapper=StackExchangeUserWrapper.parse(response.getBody());
            return wrapper;
        }
        return null;
    }
}