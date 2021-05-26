import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getRecords from '@salesforce/apex/ControllerSetupObjects.getAllRecords';
import deleteRecord from '@salesforce/apex/ControllerSetupObjects.deleteConfiguration';

const actions = [
    { label: 'Show details', name: 'show_details' },
    { label: 'Delete', name: 'delete' },
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
    data = [];
    columns = columns;
    modalNew = false;
    modalDelete = false;
    rowDelete;

    connectedCallback(){
        this.getRecords();
    }

    getRecords(){
        getRecords()
        .then(result => {
            if (result) {
                result.forEach(element => {
                    element.URLObject = 'https://' + window.location.host + '/' + element.Id;
                    element.TemplateName = element.Template__r.Name;
                });
                this.data = result
                console.log('DATA -> ',this.data);
            }else{
                console.log('ERROR!');
                console.log('result: ',result);
            }
        })
        .catch((error) => {
            console.log(error);
        }); 
    }

    deleteRecord(){
        deleteRecord({recordId : this.rowDelete.Id})
        .then(result => {
            if (result === 'SUCCESS') {
                const evt = new ShowToastEvent({
                    title: 'Delete',
                    message: 'Registration successfully deleted.',
                    variant: 'success',
                });
                this.dispatchEvent(evt);
            }else if(result === 'ERROR'){
                console.log('ERROR!');
            }
        })
        .catch((error) => {
            console.log(error);
        }); 
    }

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
            default:
        }
    }

    deleteAction(row) {
        this.modalDelete = true;
        this.rowDelete = row;
    }

    deleteRecordConfirm(){

        this.deleteRecord();
        const { id } = this.rowDelete;
        const index = this.findRowIndexById(id);
        if (index !== -1) {
            this.data = this.data
                .slice(0, index)
                .concat(this.data.slice(index + 1));
        }
        this.closeModalDelete();
    }

    showDetailsAction(row) {
        window.location.href = row.URLObject;
    }

    newAction(event){
        this.modalNew = true;
    }

    closeModalNew(event){
        this.modalNew = false;
    }

    closeModalDelete(event){
        this.modalDelete= false;
        this.rowDelete = null;
    }
    

    findRowIndexById(id) {
        let ret = -1;
        this.data.some((row, index) => {
            if (row.id === id) {
                ret = index;
                return true;
            }
            return false;
        });
        return ret;
    }
}