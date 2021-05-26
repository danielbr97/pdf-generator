import { LightningElement } from 'lwc';
import getRecords from '@salesforce/apex/ControllerSetupObjects.getAllRecords';
import { NavigationMixin } from 'lightning/navigation';

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

export default class PdfGeneratorConfigObjects extends NavigationMixin(LightningElement) {
    data = [];
    columns = columns;

    connectedCallback(){
        this.getRecords();
    }

    clickNew(event){

    }

    handleRowAction(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;
        switch (actionName) {
            case 'delete':
                this.deleteRow(row);
                break;
            case 'show_details':
                this.showRowDetails(row);
                break;
            default:
        }
    }

    deleteRow(row) {


        /*this[NavigationMixin.Navigate]({
            type: "standard__component",
            attributes: {
                componentName: "c__pdfGeneratorConfigObjectsDelete"
            },
            state: {
                c__propertyValue: '500'
            }
        });*/


        const { id } = row;
        const index = this.findRowIndexById(id);
        if (index !== -1) {
            this.data = this.data
                .slice(0, index)
                .concat(this.data.slice(index + 1));
        }
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

    showRowDetails(row) {
        console.log('ROW ',row.URLObject);
        window.location.href = row.URLObject;
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

}