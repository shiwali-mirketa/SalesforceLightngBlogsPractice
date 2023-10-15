public with sharing class APILimitController {
    public void getOrgLimit()
    {
        Map<String,System.OrgLimit> limitsMap = OrgLimits.getMap();
        System.OrgLimit apiRequestsLimit = limitsMap.get('DailyApiRequests');
        System.debug('Limit Name: ' + apiRequestsLimit.getName());
        System.debug('Usage Value: ' + apiRequestsLimit.getValue());
        System.debug('Maximum Limit: ' + apiRequestsLimit.getLimit());
    }
}