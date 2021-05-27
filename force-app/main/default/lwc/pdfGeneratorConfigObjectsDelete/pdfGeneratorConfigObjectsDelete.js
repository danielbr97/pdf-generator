import { LightningElement, api, track } from 'lwc';
import deleteRecord from '@salesforce/apex/ControllerSetupObjects.deleteConfiguration';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class PdfGeneratorConfigObjectsDelete extends LightningElement {
    @track isLoading = false;
    @track modalDelete = false;

    @api rowDelete;
    @api configuredObjectsData;

    deleteRecordConfirm(){
        this.isLoading = true;
        this.deleteRecord();
        const id = this.rowDelete.Id;
        const index = this.findRowIndexById(id);
        if (index !== -1) {
            this.configuredObjectsData = this.configuredObjectsData
                .slice(0, index)
                .concat(this.configuredObjectsData.slice(index + 1));
        }
        this.closeModalDelete();
    }
    closeModalDelete(event){
        this.modalDelete = false;
        this.rowDelete = null;

        const eventToParent = new CustomEvent("dataschanged", {
            detail: this.configuredObjectsData
        });

        this.dispatchEvent(eventToParent);
        this.isLoading = false;
    }
    @api openModalDelete(){
        this.modalDelete = true;
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

    //Aux
    findRowIndexById(Id) {
        let ret = -1;
        this.configuredObjectsData.some((row, index) => {
            if (row.Id === Id) {
                ret = index;
                return true;
            }
            return false;
        });
        return ret;
    }
}