//This script was created to delete all test records
List<Sobject> listToDelete = new List<Sobject>();
listToDelete.addAll([SELECT Id FROM Configured_Object__c WHERE Name LIKE '%[TEST]%']);
listToDelete.addAll([SELECT Id FROM PDF_Template__c WHERE Name LIKE '%[TEST]%']);
Database.delete(listToDelete);