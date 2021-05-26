public with sharing class ControllerSetupObjects {
    
    public ControllerSetupObjects(){

    }

    @AuraEnabled
    public static List<Configured_Object__c> getAllRecords(){
        try {
            return [SELECT Id, Name, Object__c, Template__c, LastModifiedDate, CreatedDate FROM Configured_Object__c];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
