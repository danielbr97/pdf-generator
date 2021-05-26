//This script was created to register test records.
List<Configured_Object__c> listToInsert = new List<Configured_Object__c>();
final Integer NUMBER_RECORDS = 5;
Map<Integer, String> mapNameSObjects = new Map<Integer, String>();
mapNameSObjects.put(0, 'Account');
mapNameSObjects.put(1, 'Opportunity');
mapNameSObjects.put(2, 'Product2');
mapNameSObjects.put(3, 'Lead');
mapNameSObjects.put(4, 'Contact');
mapNameSObjects.put(3, 'Case');
for(Integer i = 0; i < NUMBER_RECORDS; i++){
    Integer numberRandom = Integer.valueof((Math.random() * 5));
    listToInsert.add(new Configured_Object__c(
        Name = '[TEST] Set up '+i,
        Object__c = mapNameSObjects.get(numberRandom),
        Template__c = 'LWC '+i
    ));
}

Database.insert(listToInsert);