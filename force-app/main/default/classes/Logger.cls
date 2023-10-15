public with sharing class Logger {
    static LogSetting__mdt log = LogSetting__mdt.getInstance('Log');
    public static void logInfo(string message)
    {
        if(log.Log_Enabled__c){
            System.debug(LoggingLevel.INFO, message);
        }
    }
    public static void logWarn(string message)
    {
        if(log.Log_Enabled__c){
            System.debug(LoggingLevel.WARN, message);
        }
    }
    public static void logError(string message)
    {
        if(log.Log_Enabled__c){
            System.debug(LoggingLevel.ERROR, message);
        }
    }
    }

   /**  public static void logging(){
    //For logging info
    Logger.logInfo('Test Accounts:',+accounts);
    //For logging warning message
    Logger.logWarn('Test Accounts Size:'+accounts.size());
    //For logging error message
    Logger.logError('Error in code'); 
    }   
    **/

