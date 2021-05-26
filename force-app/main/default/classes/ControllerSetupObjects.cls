public with sharing class ControllerSetupObjects {

    @AuraEnabled
    public static List<Configured_Object__c> getAllRecords(){
        try {
            return [SELECT Id, Layout__c, Activate__c, Name, Object__c, Template__c, Template__r.Name, LastModifiedDate, CreatedDate FROM Configured_Object__c];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static String deleteConfiguration(String recordId){
        try {
            Database.delete([SELECT Id FROM Configured_Object__c WHERE Id = :recordId LIMIT 1]);
            return 'SUCCESS';
        } catch (Exception e) {
            System.debug(e.getMessage());
            return 'ERROR';
        }
    }

    /*@AuraEnabled
    public static List<String> getTemplatesLWC(){
        try {
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }*/
}
