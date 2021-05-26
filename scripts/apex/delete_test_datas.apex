List<Configured_Object__c> listToDelete = [SELECT Id FROM Configured_Object__c WHERE Name LIKE '%[TEST]%'];
Database.delete(listToDelete);