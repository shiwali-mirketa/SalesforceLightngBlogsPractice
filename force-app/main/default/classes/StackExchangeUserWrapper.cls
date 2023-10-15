public with sharing class StackExchangeUserWrapper {
    @AuraEnabled
    public List<Items> items;
    @AuraEnabled
    public Boolean has_more;
    @AuraEnabled
    public Integer quota_max;
    @AuraEnabled
    public Integer quota_remaining;
    
    public class Badge_counts {
        @Auraenabled public String bronze;
        @Auraenabled public String silver;
        @Auraenabled public String gold;
    }
    
    public class Items {
        @Auraenabled 
        public Badge_counts badge_counts;
        @Auraenabled 
        public String account_id;
        @Auraenabled 
        public String is_employee;
        @Auraenabled 
        public String last_modified_date;
        @Auraenabled 
        public String last_access_date;
        @Auraenabled 
        public String reputation_change_year;
        @Auraenabled 
        public String reputation_change_quarter;
        @Auraenabled 
        public String reputation_change_month;
        @Auraenabled 
        public String reputation_change_week;
        @Auraenabled 
        public String reputation_change_day;
        @Auraenabled 
        public String reputation;
        @Auraenabled 
        public String creation_date;
        @Auraenabled 
        public String user_type;
        @Auraenabled 
        public String user_id;
        @Auraenabled 
        public String accept_rate;
        @Auraenabled 
        public String location;
        @Auraenabled
        public String website_url;
        @Auraenabled
        public String link;
        @Auraenabled
        public String profile_image;
        @Auraenabled
        public String display_name;
    }
    
    
    public static StackExchangeUserWrapper parse(String json) {
        return (StackExchangeUserWrapper) System.JSON.deserialize(json, StackExchangeUserWrapper.class);
    }
}