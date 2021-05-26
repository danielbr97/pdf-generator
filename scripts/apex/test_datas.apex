//This script was created to register test records.
final Integer NUMBER_RECORDS_CONFIGURED = 5;
final Integer NUMBER_RECORDS_TEMPLATE = 5;
Integer counterAux = 0;

List<PDF_Template__c> listToInsertTemplate = new List<PDF_Template__c>();
List<Configured_Object__c> listToInsertConfigured = new List<Configured_Object__c>();
Map<Integer, Id> mapIdTemplateToRandom = new Map<Integer, Id>();
Map<Integer, String> mapNameSObjects = new Map<Integer, String>();
mapNameSObjects.put(0, 'Account');
mapNameSObjects.put(1, 'Opportunity');
mapNameSObjects.put(2, 'Product2');
mapNameSObjects.put(3, 'Lead');
mapNameSObjects.put(4, 'Contact');
mapNameSObjects.put(3, 'Case');

for(Integer i = 0; i < NUMBER_RECORDS_TEMPLATE; i++){
    listToInsertTemplate.add(new PDF_Template__c(
        Component__c = 'lwcTest'+i,
        Name = '[TEST] Template test '+i
    ));
}
Database.insert(listToInsertTemplate);

for(PDF_Template__c template : listToInsertTemplate){
    mapIdTemplateToRandom.put(counterAux, template.Id);
    counterAux++;
}

for(Integer i = 0; i < NUMBER_RECORDS_CONFIGURED; i++){
    Integer numberRandom = Integer.valueof((Math.random() * 5));
    listToInsertConfigured.add(new Configured_Object__c(
        Name = '[TEST] Configured test '+i,
        Object__c = mapNameSObjects.get(numberRandom),
        Template__c = mapIdTemplateToRandom.get(numberRandom),
        Layout__c = mapNameSObjects.get(numberRandom)+'-'+mapNameSObjects.get(numberRandom)+' Layout'
    ));
}
Database.insert(listToInsertConfigured);