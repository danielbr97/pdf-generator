import { LightningElement, api, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getRecords from '@salesforce/apex/ControllerSetupObjects.getAllRecords';


const actions = [
    { label: 'Show details', name: 'show_details' },
    { label: 'Delete', name: 'delete' },
    { label: 'Activate', name: 'activate' },
];

const columns = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Object', fieldName: 'Object__c' },
    { label: 'Template', fieldName: 'TemplateName' },
    { label: 'Layout', fieldName: 'Layout__c' },
    { label: 'Last Modified Date', fieldName: 'LastModifiedDate', type: 'date' },
    { label: 'Created Date', fieldName: 'CreatedDate', type: 'date' },
    { label: 'Active', fieldName: 'Activate__c', type: 'boolean' },
    {
        type: 'action',
        typeAttributes: { rowActions: actions },
    },
];

export default class PdfGeneratorConfigObjects extends LightningElement {
    @track configuredObjectsData = [];
    columns = columns;
    isLoading = true;
    rowDelete;

    connectedCallback(){
        this.getRecords();
        this.isLoading = false;
    }

    //Actions back-end
    getRecords(){
        getRecords()
        .then(result => {
            if (result) {
                result.forEach(element => {
                    element.URLObject = 'https://' + window.location.host + '/' + element.Id;
                    element.TemplateName = element.Template__r.Name;
                });
                this.configuredObjectsData = result;
            }else{
                console.log('ERROR!');
                console.log('result: ',result);
            }
        })
        .catch((error) => {
            console.log(error);
        }); 
    }

    //Actions in such rows of datable
    handleRowAction(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;
        switch (actionName) {
            case 'delete':
                this.deleteAction(row);
                break;
            case 'show_details':
                this.showDetailsAction(row);
                break;
            case 'activate':
                this.activateAction(row);
                break;
            default:
        }
    }

    //Delete actions
    deleteAction(row) {
        this.rowDelete = row;
        this.template.querySelector('c-pdf-generator-config-objects-delete').openModalDelete();
    }

    //New action
    newAction(event){
        this.template.querySelector('c-pdf-generator-config-objects-new').openModalNew();
    }

    //Show Details action
    showDetailsAction(row) {
        window.location.href = row.URLObject;
    }

    //Activate action
    activateAction(row){

    }
    
    handleOnDatasChanged(event) {
        console.log('handleOnDatasChanged()');
        this.configuredObjectsData = event.detail;
    }
}